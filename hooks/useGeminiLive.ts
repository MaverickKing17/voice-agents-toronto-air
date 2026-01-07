
import { useState, useCallback } from 'react';
import { LeadDetails, Message } from '../types';

// Gemini AI Voice logic removed at user request (No Cloud Billing).
// This hook is now a simplified state manager for UI demo purposes.

interface UseGeminiLiveProps {
  onLeadCaptured: (details: Partial<LeadDetails>) => void;
}

export const useGeminiLive = ({ onLeadCaptured }: UseGeminiLiveProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [volume, setVolume] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);

  const connect = useCallback(async () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
    }, 1000);
  }, []);

  const disconnect = useCallback(async () => {
    setIsConnected(false);
  }, []);

  return { 
    connect, 
    disconnect, 
    isConnected, 
    isConnecting, 
    isSpeaking, 
    volume, 
    messages 
  };
};
