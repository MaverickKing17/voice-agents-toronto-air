import { useState, useRef, useEffect, useCallback } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { SYSTEM_INSTRUCTION, CAPTURE_LEAD_TOOL } from '../constants';
import { createPcmBlob, decodeAudioData, base64ToArrayBuffer } from '../utils/audioUtils';
import { LeadDetails } from '../types';

interface UseGeminiLiveProps {
  onLeadCaptured: (details: Partial<LeadDetails>) => void;
}

export const useGeminiLive = ({ onLeadCaptured }: UseGeminiLiveProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [volume, setVolume] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [micSensitivity, setMicSensitivity] = useState(0.8); // 0 to 1 range

  // Refs for audio handling to avoid re-renders
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const inputSourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const outputNodeRef = useRef<GainNode | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const activeSourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const sessionPromiseRef = useRef<Promise<any> | null>(null);
  const micSensitivityRef = useRef(micSensitivity);
  
  // Analyzer for visualization
  const analyzerRef = useRef<AnalyserNode | null>(null);

  // Update ref when state changes
  useEffect(() => {
    micSensitivityRef.current = micSensitivity;
  }, [micSensitivity]);

  const connect = useCallback(async () => {
    try {
      setError(null);
      
      // Initialize Audio Contexts
      inputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      outputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      
      // Setup Output
      if (outputAudioContextRef.current) {
          outputNodeRef.current = outputAudioContextRef.current.createGain();
          outputNodeRef.current.connect(outputAudioContextRef.current.destination);
          
          // Setup Analyzer for output visualization
          analyzerRef.current = outputAudioContextRef.current.createAnalyser();
          analyzerRef.current.fftSize = 256;
          outputNodeRef.current.connect(analyzerRef.current);
      }

      // Initialize Gemini Client
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } }, // Deep, authoritative voice
          },
          systemInstruction: SYSTEM_INSTRUCTION,
          tools: [{ functionDeclarations: [CAPTURE_LEAD_TOOL] }],
        },
        callbacks: {
          onopen: async () => {
            console.log('Gemini Live Connected');
            setIsConnected(true);
            
            // Start Microphone Stream
            try {
              const stream = await navigator.mediaDevices.getUserMedia({ 
                  audio: { 
                      echoCancellation: true,
                      noiseSuppression: true,
                      autoGainControl: true
                  } 
              });
              
              if (inputAudioContextRef.current) {
                  inputSourceRef.current = inputAudioContextRef.current.createMediaStreamSource(stream);
                  processorRef.current = inputAudioContextRef.current.createScriptProcessor(4096, 1, 1);
                  
                  processorRef.current.onaudioprocess = (e) => {
                    const inputData = e.inputBuffer.getChannelData(0);
                    
                    // Noise Gate Logic
                    let sum = 0;
                    const len = inputData.length;
                    for (let i = 0; i < len; i++) {
                        sum += inputData[i] * inputData[i];
                    }
                    const rms = Math.sqrt(sum / len);
                    
                    // Threshold calculation: 
                    // Sensitivity 1.0 (max) -> Threshold 0.0 (allow all)
                    // Sensitivity 0.0 (min) -> Threshold 0.05 (block noise)
                    const threshold = (1 - micSensitivityRef.current) * 0.05;

                    if (rms < threshold) {
                         // Silence the buffer if below threshold
                         inputData.fill(0);
                    }

                    const pcmBlob = createPcmBlob(inputData);
                    
                    if (sessionPromiseRef.current) {
                        sessionPromiseRef.current.then((session) => {
                            session.sendRealtimeInput({ media: pcmBlob });
                        });
                    }
                  };
                  
                  inputSourceRef.current.connect(processorRef.current);
                  processorRef.current.connect(inputAudioContextRef.current.destination);
              }
            } catch (err) {
                setError("Microphone access denied or unavailable.");
                console.error(err);
            }
          },
          onmessage: async (message: LiveServerMessage) => {
            // Handle Tool Calls (Lead Capture)
            if (message.toolCall) {
                for (const fc of message.toolCall.functionCalls) {
                    if (fc.name === 'captureLeadDetails') {
                        console.log('Lead Captured:', fc.args);
                        onLeadCaptured(fc.args as unknown as Partial<LeadDetails>);
                        
                        // Send success response back
                        sessionPromiseRef.current?.then((session) => {
                             session.sendToolResponse({
                                functionResponses: {
                                    id: fc.id,
                                    name: fc.name,
                                    response: { result: "Lead details captured successfully." }
                                }
                             });
                        });
                    }
                }
            }

            // Handle Audio Output
            const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (base64Audio && outputAudioContextRef.current && outputNodeRef.current) {
                setIsSpeaking(true);
                const audioData = new Uint8Array(base64ToArrayBuffer(base64Audio));
                const audioBuffer = await decodeAudioData(
                    audioData, 
                    outputAudioContextRef.current, 
                    24000
                );
                
                nextStartTimeRef.current = Math.max(
                    nextStartTimeRef.current,
                    outputAudioContextRef.current.currentTime
                );
                
                const source = outputAudioContextRef.current.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(outputNodeRef.current);
                
                source.addEventListener('ended', () => {
                    activeSourcesRef.current.delete(source);
                    if (activeSourcesRef.current.size === 0) {
                        setIsSpeaking(false);
                    }
                });
                
                source.start(nextStartTimeRef.current);
                nextStartTimeRef.current += audioBuffer.duration;
                activeSourcesRef.current.add(source);
            }
            
            // Handle Interruption
            if (message.serverContent?.interrupted) {
                console.log('Model interrupted');
                activeSourcesRef.current.forEach(source => {
                    try { source.stop(); } catch(e) {}
                });
                activeSourcesRef.current.clear();
                nextStartTimeRef.current = 0;
                setIsSpeaking(false);
            }
          },
          onclose: () => {
            console.log('Connection closed');
            setIsConnected(false);
            setIsSpeaking(false);
          },
          onerror: (err) => {
            console.error('Gemini Live Error:', err);
            setError(err.message || 'Unknown error occurred');
            setIsConnected(false);
          }
        }
      });
      
      sessionPromiseRef.current = sessionPromise;

    } catch (err: any) {
      setError(err.message);
      setIsConnected(false);
    }
  }, [onLeadCaptured]);

  const disconnect = useCallback(async () => {
    if (sessionPromiseRef.current) {
        const session = await sessionPromiseRef.current;
        session.close();
    }
    
    // Cleanup Audio
    inputSourceRef.current?.disconnect();
    processorRef.current?.disconnect();
    if (inputAudioContextRef.current?.state !== 'closed') {
        inputAudioContextRef.current?.close();
    }
    
    activeSourcesRef.current.forEach(s => s.stop());
    activeSourcesRef.current.clear();
    
    if (outputAudioContextRef.current?.state !== 'closed') {
        outputAudioContextRef.current?.close();
    }

    setIsConnected(false);
    setIsSpeaking(false);
    sessionPromiseRef.current = null;
  }, []);

  // Visualization Loop
  useEffect(() => {
    let animationFrame: number;
    const updateVolume = () => {
        if (analyzerRef.current && isSpeaking) {
            const dataArray = new Uint8Array(analyzerRef.current.frequencyBinCount);
            analyzerRef.current.getByteFrequencyData(dataArray);
            
            // Calculate average volume
            let sum = 0;
            for (let i = 0; i < dataArray.length; i++) {
                sum += dataArray[i];
            }
            const average = sum / dataArray.length;
            setVolume(average);
        } else if (!isSpeaking) {
            setVolume(0);
        }
        animationFrame = requestAnimationFrame(updateVolume);
    };
    updateVolume();
    return () => cancelAnimationFrame(animationFrame);
  }, [isSpeaking]);

  return { 
    connect, 
    disconnect, 
    isConnected, 
    isSpeaking, 
    volume, 
    error,
    micSensitivity,
    setMicSensitivity
  };
};