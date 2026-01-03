
import React, { useEffect, useRef } from 'react';
import { Message } from '../types';
import { Bot, User, Terminal, Sparkles, Cpu, ShieldCheck, UserCircle2, AlertTriangle, Hash } from 'lucide-react';

interface TranscriptProps {
  messages: Message[];
  persona?: 'sarah' | 'mike';
}

export const Transcript: React.FC<TranscriptProps> = ({ messages, persona }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getRoleConfig = (role: 'user' | 'agent' | 'system') => {
    switch (role) {
      case 'user':
        return {
          label: 'INCOMING CALLER',
          icon: <User className="w-4 h-4" />,
          avatarClass: 'bg-white/5 text-white/40 border border-white/10',
          contentClass: 'text-white/80 font-medium bg-white/5 border border-white/10 p-7 rounded-3xl backdrop-blur-md'
        };
      case 'agent':
        const isMike = persona === 'mike';
        return {
          label: isMike ? 'DISPATCH: MIKE' : 'ADVISOR: SARAH',
          icon: isMike ? <AlertTriangle className="w-4 h-4" /> : <UserCircle2 className="w-4 h-4" />,
          avatarClass: isMike 
            ? 'bg-[#cc0000] text-white shadow-[0_0_20px_rgba(204,0,0,0.4)]' 
            : 'bg-[#003366] text-white shadow-[0_0_20px_rgba(0,51,102,0.4)]',
          contentClass: isMike
            ? 'text-white font-black bg-[#cc0000]/10 border border-[#cc0000]/20 p-8 rounded-[2rem] shadow-xl border-l-8 border-l-[#cc0000] relative overflow-hidden'
            : 'text-white font-bold bg-[#003366]/20 border border-[#003366]/30 p-8 rounded-[2rem] shadow-xl border-l-8 border-l-[#0099cc] relative overflow-hidden'
        };
      case 'system':
        return {
          label: 'SYSTEM KERNEL',
          icon: <Hash className="w-3.5 h-3.5" />,
          avatarClass: 'bg-white/5 text-white/20',
          contentClass: 'text-white/30 italic font-mono text-[10px] pl-6 border-l-2 border-white/5 uppercase tracking-[0.2em] py-2'
        };
    }
  };

  return (
    <div className="h-full flex flex-col font-mono overflow-hidden">
      <div className="flex-1 overflow-y-auto px-12 py-12 space-y-12 custom-scrollbar">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center space-y-6 opacity-20">
             <div className="relative">
                <Terminal className="w-14 h-14 text-white" />
                <div className="absolute inset-0 animate-ping opacity-50"><Terminal className="w-14 h-14 text-white" /></div>
             </div>
             <span className="text-[11px] font-black uppercase tracking-[0.8em] text-white">Standby for Link</span>
          </div>
        )}
        
        {messages.map((msg) => {
          const config = getRoleConfig(msg.role);
          const isAgent = msg.role === 'agent';

          return (
            <div key={msg.id} className="flex gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="flex flex-col items-center pt-1 shrink-0">
                 <div className={`flex items-center justify-center w-11 h-11 rounded-2xl ${config.avatarClass}`}>
                   {config.icon}
                 </div>
              </div>
              
              <div className="flex-1 pb-4">
                <div className="flex items-center justify-between mb-4">
                   <div className="flex items-center gap-4">
                      <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${msg.role === 'agent' ? (persona === 'mike' ? 'text-rose-500' : 'text-[#00ccff]') : 'text-white/30'}`}>
                        {config.label}
                      </span>
                      {isAgent && (
                        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-white/5 rounded-md border border-white/5">
                           <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                           <span className="text-[8px] font-black text-white/40 uppercase tracking-widest">Live Voice Output</span>
                        </div>
                      )}
                   </div>
                   <span className="text-[10px] text-white/10 font-black uppercase tracking-widest">
                     {new Date(msg.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                   </span>
                </div>
                
                <div className={`text-[19px] leading-[1.6] transition-all duration-700 shadow-2xl ${config.contentClass}`}>
                  {isAgent && (
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
                  )}
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
