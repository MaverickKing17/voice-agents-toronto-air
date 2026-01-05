
import React, { useEffect, useRef } from 'react';
import { Message } from '../types';
import { 
  User, 
  Headset, 
  Zap, 
  Activity, 
  Info,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';

interface TranscriptProps {
  messages: Message[];
  persona?: 'sarah' | 'marcus';
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
          label: 'CUSTOMER',
          icon: <User className="w-7 h-7" />,
          avatarUrl: null,
          avatarClass: 'bg-white/90 text-slate-900 border-4 border-white w-20 h-20 rounded-3xl shadow-2xl',
          contentClass: 'text-white font-bold bg-white/10 border-2 border-white/40 p-10 rounded-[2.5rem] backdrop-blur-xl border-l-[16px] border-l-white/80 shadow-[0_20px_50px_rgba(0,0,0,0.3)]'
        };
      case 'agent':
        const isMarcus = persona === 'marcus';
        return {
          label: isMarcus ? 'MARCUS (DISPATCH)' : 'SARAH (ADVISOR)',
          icon: isMarcus ? <Zap className="w-5 h-5 fill-current" /> : <Headset className="w-5 h-5" />,
          avatarUrl: isMarcus 
            ? "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=240&h=240&auto=format&fit=crop" 
            : "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=240&h=240&auto=format&fit=crop",
          avatarClass: isMarcus 
            ? 'border-4 border-rose-500 shadow-[0_0_40px_rgba(225,29,72,0.5)] w-24 h-24 rounded-3xl overflow-hidden bg-rose-950' 
            : 'border-4 border-blue-500 shadow-[0_0_40px_rgba(59,130,246,0.5)] w-24 h-24 rounded-3xl overflow-hidden bg-blue-950',
          contentClass: isMarcus
            ? 'text-white font-black bg-rose-900/40 border-2 border-rose-400/50 p-12 rounded-[2.5rem] border-l-[24px] border-l-rose-600 shadow-[0_25px_60px_rgba(0,0,0,0.5)] backdrop-blur-2xl'
            : 'text-white font-black bg-blue-900/40 border-2 border-blue-400/50 p-12 rounded-[2.5rem] border-l-[24px] border-l-blue-600 shadow-[0_25px_60px_rgba(0,0,0,0.5)] backdrop-blur-2xl'
        };
      case 'system':
        return {
          label: 'SYSTEM PROTOCOL',
          icon: <Info className="w-6 h-6" />,
          avatarUrl: null,
          avatarClass: 'bg-emerald-500/20 text-emerald-400 border-2 border-emerald-500/50 w-14 h-14 rounded-2xl mt-4 flex items-center justify-center',
          contentClass: 'text-emerald-400 font-mono text-xl pl-8 border-l-8 border-emerald-500/60 py-5 bg-emerald-500/10 rounded-r-3xl shadow-xl'
        };
    }
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto px-16 py-16 space-y-16 custom-scrollbar">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center space-y-10 opacity-80">
             <Activity className="w-24 h-24 text-white animate-pulse" />
             <span className="text-[16px] font-black uppercase tracking-[1em] text-white/60 ml-[1em] text-center">SYSTEM IDLE // AWAITING VOICE INPUT</span>
          </div>
        )}
        
        {messages.map((msg) => {
          const config = getRoleConfig(msg.role);
          const isAgent = msg.role === 'agent';
          const isSystem = msg.role === 'system';
          const isMarcus = persona === 'marcus';

          return (
            <div key={msg.id} className={`flex gap-10 animate-in fade-in slide-in-from-bottom-12 duration-1000 ${isSystem ? 'scale-[0.95] origin-left' : ''}`}>
              <div className="flex flex-col items-center shrink-0">
                 <div className={`relative flex items-center justify-center transition-all ${config.avatarClass}`}>
                   {config.avatarUrl ? (
                     <img 
                       src={config.avatarUrl} 
                       alt={config.label} 
                       className="w-full h-full object-cover transition-all duration-700"
                     />
                   ) : (
                     <div className="relative z-10 scale-125">
                      {config.icon}
                     </div>
                   )}
                   
                   {isAgent && (
                     <div className={`absolute -top-4 -right-4 p-3 rounded-2xl shadow-2xl flex items-center justify-center ring-4 ring-black z-20 ${isMarcus ? 'bg-rose-600' : 'bg-blue-600'}`}>
                       <span className="text-white scale-125">
                         {config.icon}
                       </span>
                     </div>
                   )}
                 </div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-5">
                   <div className="flex items-center gap-5">
                      <span className={`text-[14px] font-black uppercase tracking-[0.25em] ${
                        isAgent ? (isMarcus ? 'text-rose-400' : 'text-blue-300') : 
                        isSystem ? 'text-emerald-400' : 'text-white'
                      }`}>
                        {config.label}
                      </span>
                      {isAgent && (
                        <div className={`flex items-center gap-4 px-5 py-2 rounded-full border-2 transition-all ${isMarcus ? 'bg-rose-500/30 border-rose-500/60' : 'bg-blue-500/30 border-blue-500/60'}`}>
                           <div className={`w-2.5 h-2.5 rounded-full animate-pulse ${isMarcus ? 'bg-rose-400 shadow-[0_0_10px_#fb7185]' : 'bg-blue-400 shadow-[0_0_10px_#60a5fa]'}`} />
                           <span className="text-[11px] font-black text-white uppercase tracking-widest">LIVE AUDIO LINK</span>
                        </div>
                      )}
                   </div>
                   <span className="text-[12px] text-white/40 font-mono font-bold uppercase tracking-widest tabular-nums bg-white/5 px-3 py-1 rounded-lg">
                     {new Date(msg.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                   </span>
                </div>
                
                <div className={`transition-all duration-1000 relative leading-snug drop-shadow-2xl ${
                  isSystem ? 'text-2xl' : 'text-4xl'
                } ${config.contentClass}`}>
                  <span className="relative z-10 leading-tight block">{msg.text}</span>
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
