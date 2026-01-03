
import React, { useEffect, useRef } from 'react';
import { Message } from '../types';
import { Bot, User, Info, Terminal } from 'lucide-react';

interface TranscriptProps {
  messages: Message[];
}

export const Transcript: React.FC<TranscriptProps> = ({ messages }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getRoleConfig = (role: 'user' | 'agent' | 'system') => {
    switch (role) {
      case 'user':
        return {
          label: 'CALLER',
          icon: <User className="w-3.5 h-3.5" />,
          avatarClass: 'bg-slate-800 text-slate-400 border border-slate-700',
          contentClass: 'text-slate-300'
        };
      case 'agent':
        return {
          label: 'MARCUS',
          icon: <Bot className="w-3.5 h-3.5" />,
          avatarClass: 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)] border border-blue-400/50',
          contentClass: 'text-white font-semibold bg-blue-600/[0.03] border border-blue-500/10 p-4 rounded-xl shadow-[inset_0_0_20px_rgba(37,99,235,0.02)]'
        };
      case 'system':
        return {
          label: 'SECURE',
          icon: <Terminal className="w-3 h-3" />,
          avatarClass: 'bg-slate-900 text-slate-600 border border-white/5',
          contentClass: 'text-slate-600 italic font-sans text-[12px]'
        };
    }
  };

  return (
    <div className="h-full flex flex-col font-mono overflow-hidden">
      <div className="flex-1 overflow-y-auto px-10 py-8 space-y-8 custom-scrollbar">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center opacity-10 space-y-4">
             <div className="w-px h-12 bg-blue-500" />
             <span className="text-[10px] font-black uppercase tracking-[0.6em] text-blue-500">Secure Uplink Standby</span>
          </div>
        )}
        
        {messages.map((msg) => {
          const config = getRoleConfig(msg.role);
          return (
            <div key={msg.id} className="flex gap-6 animate-in fade-in slide-in-from-left-2 duration-500 group">
              {/* Left Column: Avatars & Chronology Line */}
              <div className="flex flex-col items-center gap-3 pt-1">
                 <div className={`flex items-center justify-center w-8 h-8 rounded-full transition-transform group-hover:scale-110 ${config.avatarClass}`}>
                   {config.icon}
                 </div>
                 <div className="w-px flex-1 bg-gradient-to-b from-white/10 to-transparent min-h-[20px]" />
              </div>
              
              {/* Right Column: Content */}
              <div className="flex-1 pb-2">
                <div className="flex items-center gap-3 mb-2">
                   <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${msg.role === 'agent' ? 'text-blue-400' : 'text-slate-500'}`}>
                     {config.label}
                   </span>
                   <span className="w-1 h-1 rounded-full bg-white/5" />
                   <span className="text-[8px] text-slate-700 font-bold uppercase tracking-widest">
                     {new Date(msg.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                   </span>
                </div>
                
                <div className={`text-[13px] leading-relaxed tracking-tight transition-colors ${config.contentClass}`}>
                  {msg.text}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};
