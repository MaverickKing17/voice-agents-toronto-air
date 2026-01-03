
import React, { useEffect, useRef } from 'react';
import { Message } from '../types';
import { 
  User, 
  Terminal, 
  Hash, 
  Headset, 
  Zap, 
  Activity,
  ShieldCheck,
  PhoneForwarded,
  Sparkles,
  AlertTriangle,
  Heart
} from 'lucide-react';

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
          icon: <User className="w-5 h-5" />,
          avatarClass: 'bg-white/5 text-white/60 border border-white/10 shadow-inner ring-1 ring-white/5',
          contentClass: 'text-white/80 font-medium bg-white/5 border border-white/10 p-7 rounded-3xl backdrop-blur-md shadow-lg border-l-4 border-l-white/20'
        };
      case 'agent':
        const isMike = persona === 'mike';
        return {
          label: isMike ? 'DISPATCH: MIKE' : 'ADVISOR: SARAH',
          icon: isMike ? <Zap className="w-5 h-5 fill-current" /> : <Headset className="w-5 h-5" />,
          avatarClass: isMike 
            ? 'bg-gradient-to-tr from-rose-950 via-rose-600 to-rose-400 text-white shadow-[0_0_35px_rgba(225,29,72,0.7)] border border-rose-400/50 animate-emergency-strobe' 
            : 'bg-gradient-to-tr from-[#001f3f] via-[#0056b3] to-[#00d4ff] text-white shadow-[0_0_35px_rgba(0,153,255,0.5)] border border-blue-400/40 animate-calm-glow',
          contentClass: isMike
            ? 'text-white font-black bg-gradient-to-r from-rose-950/30 to-transparent border border-rose-500/20 p-8 rounded-[2.5rem] shadow-2xl border-l-[12px] border-l-rose-600 relative group overflow-hidden'
            : 'text-white font-bold bg-gradient-to-r from-blue-950/20 to-transparent border border-blue-500/20 p-8 rounded-[2.5rem] shadow-2xl border-l-[12px] border-l-blue-600 relative group overflow-hidden'
        };
      case 'system':
        return {
          label: 'SYSTEM KERNEL',
          icon: <Hash className="w-3.5 h-3.5" />,
          avatarClass: 'bg-white/5 text-white/20 border border-white/5',
          contentClass: 'text-white/30 italic font-mono text-[10px] pl-6 border-l-2 border-white/5 uppercase tracking-[0.2em] py-2'
        };
    }
  };

  return (
    <div className="h-full flex flex-col font-mono overflow-hidden">
      <div className="flex-1 overflow-y-auto px-10 py-12 space-y-12 custom-scrollbar">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center space-y-6 opacity-20">
             <div className="relative">
                <Terminal className="w-12 h-12 text-white" />
                <div className="absolute inset-0 animate-ping opacity-50"><Terminal className="w-12 h-12 text-white" /></div>
             </div>
             <span className="text-[10px] font-black uppercase tracking-[1em] text-white">Standby for Link</span>
          </div>
        )}
        
        {messages.map((msg) => {
          const config = getRoleConfig(msg.role);
          const isAgent = msg.role === 'agent';
          const isMike = persona === 'mike';

          return (
            <div key={msg.id} className="flex gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <div className="flex flex-col items-center pt-2 shrink-0">
                 <div className={`relative flex items-center justify-center w-16 h-16 rounded-2xl transition-all duration-700 ${config.avatarClass}`}>
                   {isAgent && (
                     <>
                        {/* Advanced HUD Frame */}
                        <div className={`absolute -inset-3 border-[3px] rounded-[1.8rem] opacity-20 transition-all duration-500 ${isMike ? 'border-rose-500 animate-pulse' : 'border-blue-500 opacity-10'}`} />
                        <div className={`absolute -top-1.5 -right-1.5 p-1.5 bg-white rounded-full shadow-2xl scale-[0.85] ring-4 ring-black/80 flex items-center justify-center`}>
                          {isMike ? <AlertTriangle className="w-4 h-4 text-rose-600" /> : <ShieldCheck className="w-4 h-4 text-blue-600" />}
                        </div>
                        {/* Role Micro-Indicator */}
                        <div className="absolute -bottom-2 px-2 py-0.5 bg-black/60 backdrop-blur-md border border-white/10 rounded-md">
                           <span className="text-[7px] font-black uppercase tracking-widest text-white/60">
                             {isMike ? 'CRITICAL' : 'ADVISORY'}
                           </span>
                        </div>
                     </>
                   )}
                   <div className="relative z-10 flex flex-col items-center">
                    {config.icon}
                   </div>
                 </div>
              </div>
              
              <div className="flex-1 pb-4">
                <div className="flex items-center justify-between mb-4">
                   <div className="flex items-center gap-4">
                      <span className={`text-[11px] font-black uppercase tracking-[0.4em] ${msg.role === 'agent' ? (isMike ? 'text-rose-400' : 'text-blue-400') : 'text-white/40'}`}>
                        {config.label}
                      </span>
                      {isAgent && (
                        <div className={`flex items-center gap-2 px-3 py-1 rounded-full border transition-all ${isMike ? 'bg-rose-500/10 border-rose-500/40' : 'bg-blue-500/10 border-blue-500/40 shadow-[0_0_15px_rgba(59,130,246,0.2)]'}`}>
                           <Activity className={`w-3.5 h-3.5 animate-pulse ${isMike ? 'text-rose-500' : 'text-blue-400'}`} />
                           <span className={`text-[9px] font-black uppercase tracking-widest ${isMike ? 'text-rose-400' : 'text-blue-300'}`}>Transmitting...</span>
                        </div>
                      )}
                      {msg.role === 'user' && (
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                          <PhoneForwarded className="w-3.5 h-3.5 text-white/30" />
                          <span className="text-[9px] font-black text-white/30 uppercase tracking-widest">Active Link</span>
                        </div>
                      )}
                   </div>
                   <span className="text-[10px] text-white/10 font-black uppercase tracking-[0.3em] font-mono tabular-nums">
                     {new Date(msg.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                   </span>
                </div>
                
                <div className={`text-[22px] leading-[1.6] transition-all duration-1000 shadow-[0_20px_80px_rgba(0,0,0,0.5)] relative ${config.contentClass}`}>
                  {isAgent && (
                    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[2.2rem]">
                       <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-[120px] -mr-32 -mt-32 opacity-20 transition-all duration-1000 ${isMike ? 'bg-rose-400' : 'bg-blue-400'}`} />
                       <div className="absolute top-6 right-8 opacity-[0.05] group-hover:opacity-10 transition-opacity">
                         <Sparkles className={`w-20 h-20 ${isMike ? 'text-rose-200' : 'text-blue-200'}`} />
                       </div>
                    </div>
                  )}
                  <span className="relative z-10 tracking-tight font-sans font-medium">{msg.text}</span>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      <style>{`
        @keyframes emergency-strobe {
          0%, 100% { transform: scale(1); box-shadow: 0 0 25px rgba(225, 29, 72, 0.5); filter: brightness(1); }
          50% { transform: scale(1.05); box-shadow: 0 0 50px rgba(225, 29, 72, 0.8); filter: brightness(1.2); }
        }
        @keyframes calm-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(37, 99, 235, 0.3); transform: scale(1); }
          50% { box-shadow: 0 0 40px rgba(37, 99, 235, 0.5); transform: scale(1.02); }
        }
        .animate-emergency-strobe {
          animation: emergency-strobe 1s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .animate-calm-glow {
          animation: calm-glow 4s ease-in-out infinite;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.01);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.08);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};
