import { useState, useRef, useEffect, useCallback } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { SYSTEM_INSTRUCTION, CAPTURE_LEAD_TOOL } from '../constants';
import { createPcmBlob, decodeAudioData, base64ToArrayBuffer } from '../utils/audioUtils';
import { LeadDetails, Message } from '../types';

interface UseGeminiLiveProps {
  onLeadCaptured: (details: Partial<LeadDetails>) => void;
}

export const useGeminiLive = ({ onLeadCaptured }: UseGeminiLiveProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [volume, setVolume] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [micSensitivity, setMicSensitivity] = useState(0.8);
  const [messages, setMessages] = useState<Message[]>([]);

  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const inputSourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const outputNodeRef = useRef<GainNode | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const activeSourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const sessionPromiseRef = useRef<Promise<any> | null>(null);
  const micSensitivityRef = useRef(micSensitivity);
  const analyzerRef = useRef<AnalyserNode | null>(null);

  useEffect(() => {
    micSensitivityRef.current = micSensitivity;
  }, [micSensitivity]);

  const addMessage = (role: 'user' | 'agent' | 'system', text: string) => {
    setMessages(prev => [...prev, {
      id: Math.random().toString(36).substring(7),
      role,
      text,
      timestamp: new Date()
    }]);
  };

  const connect = useCallback(async () => {
    try {
      setError(null);
      setMessages([]); // Clear chat on new connection
      
      if (!process.env.API_KEY) {
        throw new Error("API Key is missing.");
      }

      inputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      outputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      
      if (outputAudioContextRef.current) {
          outputNodeRef.current = outputAudioContextRef.current.createGain();
          outputNodeRef.current.connect(outputAudioContextRef.current.destination);
          analyzerRef.current = outputAudioContextRef.current.createAnalyser();
          analyzerRef.current.fftSize = 256;
          outputNodeRef.current.connect(analyzerRef.current);
      }

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          inputAudioTranscription: { model: "google-1.5-flash" }, // Enable User Transcription
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } },
          },
          systemInstruction: SYSTEM_INSTRUCTION,
          tools: [{ functionDeclarations: [CAPTURE_LEAD_TOOL] }],
        },
        callbacks: {
          onopen: async () => {
            console.log('Gemini Live Connected');
            setIsConnected(true);
            addMessage('system', 'System Online. Connected to Dispatch.');
            
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
                    let sum = 0;
                    const len = inputData.length;
                    for (let i = 0; i < len; i++) sum += inputData[i] * inputData[i];
                    const rms = Math.sqrt(sum / len);
                    const threshold = (1 - micSensitivityRef.current) * 0.05;

                    if (rms < threshold) inputData.fill(0);

                    const pcmBlob = createPcmBlob(inputData);
                    sessionPromiseRef.current?.then((session) => {
                        session.sendRealtimeInput({ media: pcmBlob });
                    });
                  };
                  
                  inputSourceRef.current.connect(processorRef.current);
                  processorRef.current.connect(inputAudioContextRef.current.destination);
              }
            } catch (err) {
                setError("Microphone access denied.");
            }
          },
          onmessage: async (message: LiveServerMessage) => {
            // Handle Tool Calls
            if (message.toolCall) {
                for (const fc of message.toolCall.functionCalls) {
                    if (fc.name === 'captureLeadDetails') {
                        onLeadCaptured(fc.args as unknown as Partial<LeadDetails>);
                        addMessage('system', `Data Captured: ${JSON.stringify(fc.args)}`);
                        sessionPromiseRef.current?.then((session) => {
                             session.sendToolResponse({
                                functionResponses: {
                                    id: fc.id,
                                    name: fc.name,
                                    response: { result: "Success" }
                                }
                             });
                        });
                    }
                }
            }

            // Handle Audio
            const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (base64Audio && outputAudioContextRef.current && outputNodeRef.current) {
                setIsSpeaking(true);
                const audioData = new Uint8Array(base64ToArrayBuffer(base64Audio));
                const audioBuffer = await decodeAudioData(audioData, outputAudioContextRef.current, 24000);
                
                nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputAudioContextRef.current.currentTime);
                const source = outputAudioContextRef.current.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(outputNodeRef.current);
                source.addEventListener('ended', () => {
                    activeSourcesRef.current.delete(source);
                    if (activeSourcesRef.current.size === 0) setIsSpeaking(false);
                });
                source.start(nextStartTimeRef.current);
                nextStartTimeRef.current += audioBuffer.duration;
                activeSourcesRef.current.add(source);
            }

            // Handle Transcription (User Input)
            const inputTranscript = message.serverContent?.inputTranscription?.text;
            if (inputTranscript) {
               // We might get partials, but for simplicity in this demo, we'll wait for turnComplete or stable text
               // Ideally, we debounce or update the last message.
               // For now, we will just log it. In a full production app, we'd handle partial updates.
            }
            
            // Handle Turn Complete (Use this to finalize transcripts if available in future API updates)
            if (message.serverContent?.turnComplete) {
               // Logic to finalize turn
            }
          },
          onclose: () => {
            setIsConnected(false);
            setIsSpeaking(false);
            addMessage('system', 'Connection Terminated.');
          },
          onerror: (err) => {
            setError(err.message);
            setIsConnected(false);
            addMessage('system', `Error: ${err.message}`);
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
    inputSourceRef.current?.disconnect();
    processorRef.current?.disconnect();
    inputAudioContextRef.current?.close();
    activeSourcesRef.current.forEach(s => s.stop());
    outputAudioContextRef.current?.close();
    setIsConnected(false);
    setIsSpeaking(false);
    sessionPromiseRef.current = null;
  }, []);

  useEffect(() => {
    let animationFrame: number;
    const updateVolume = () => {
        if (analyzerRef.current && isSpeaking) {
            const dataArray = new Uint8Array(analyzerRef.current.frequencyBinCount);
            analyzerRef.current.getByteFrequencyData(dataArray);
            let sum = 0;
            for (let i = 0; i < dataArray.length; i++) sum += dataArray[i];
            setVolume(sum / dataArray.length);
        } else if (!isSpeaking) {
            setVolume(0);
        }
        animationFrame = requestAnimationFrame(updateVolume);
    };
    updateVolume();
    return () => cancelAnimationFrame(animationFrame);
  }, [isSpeaking]);

  return { connect, disconnect, isConnected, isSpeaking, volume, error, micSensitivity, setMicSensitivity, messages };
};
