
import React, { useEffect, useRef } from 'react';
import { Message } from '../types';
import { 
  User, 
  Headset, 
  Zap, 
  Activity, 
  Info,
  ShieldCheck,
  AlertTriangle,
  Waves
} from 'lucide-react';

interface TranscriptProps {
  messages: Message[];
  persona?: 'sarah' | 'marcus' | 'mike';
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
          icon: <User className="w-6 h-6" />,
          avatarUrl: null,
          avatarClass: 'bg-white/90 text-slate-900 border-2 border-white w-16 h-16 rounded-2xl shadow-xl',
          contentClass: 'text-white font-medium bg-white/5 border border-white/20 p-8 rounded-[2rem] backdrop-blur-md border-l-4 border-l-white shadow-lg'
        };
      case 'agent':
        const isMike = persona === 'marcus' || persona === 'mike';
        return {
          label: isMike ? 'MIKE (EMERGENCY DISPATCH)' : 'SARAH (COMFORT ADVISOR)',
          icon: isMike ? <Zap className="w-5 h-5 fill-current" /> : <Waves className="w-5 h-5" />,
          avatarUrl: isMike 
            ? "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=240&h=240&auto=format&fit=crop" 
            : "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=240&h=240&auto=format&fit=crop",
          avatarClass: isMike 
            ? 'border-4 border-red-600 shadow-[0_0_30px_rgba(220,38,38,0.4)] w-20 h-20 rounded-3xl overflow-hidden bg-red-950 animate-agent-pulse-red' 
            : 'border-4 border-blue-600 shadow-[0_0_30px_rgba(37,99,235,0.4)] w-20 h-20 rounded-3xl overflow-hidden bg-blue-950 animate-agent-pulse-blue',
          contentClass: isMike
            ? 'text-white font-bold bg-red-950/40 border border-red-500/30 p-10 rounded-[2rem] border-l-8 border-l-red-600 shadow-xl backdrop-blur-xl'
            : 'text-white font-bold bg-blue-950/40 border border-blue-500/30 p-10 rounded-[2rem] border-l-8 border-l-blue-600 shadow-xl backdrop-blur-xl'
        };
      case 'system':
        return {
          label: 'SYSTEM PROTOCOL',
          icon: <Info className="w-5 h-5" />,
          avatarUrl: null,
          avatarClass: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 w-12 h-12 rounded-xl flex items-center justify-center',
          contentClass: 'text-emerald-400 font-mono text-lg pl-6 border-l-4 border-emerald-500/50 py-4 bg-emerald-500/5 rounded-r-2xl'
        };
    }
  };

  return (
    <div className="h-full flex flex-col overflow-hidden bg-[#000d1a]">
      <div className="flex-1 overflow-y-auto px-12 py-12 space-y-12 custom-scrollbar">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center space-y-8 opacity-40">
             <Activity className="w-16 h-16 text-white animate-pulse" />
             <span className="text-xs font-black uppercase tracking-[0.8em] text-white text-center">AWAITING VOICE COMMAND</span>
          </div>
        )}
        
        {messages.map((msg) => {
          const config = getRoleConfig(msg.role);
          const isAgent = msg.role === 'agent';
          const isSystem = msg.role === 'system';
          const isMike = persona === 'marcus' || persona === 'mike';

          return (
            <div key={msg.id} className={`flex gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700 ${isSystem ? 'opacity-60 scale-95' : ''}`}>
              <div className="flex flex-col items-center shrink-0">
                 <div className={`relative flex items-center justify-center transition-all ${config.avatarClass}`}>
                   {config.avatarUrl ? (
                     <img 
                       src={config.avatarUrl} 
                       alt={config.label} 
                       className="w-full h-full object-cover"
                     />
                   ) : (
                     <div className="relative z-10">
                      {config.icon}
                     </div>
                   )}
                   
                   {isAgent && (
                     <div className={`absolute -bottom-2 -right-2 p-2 rounded-xl shadow-lg flex items-center justify-center ring-2 ring-[#000d1a] z-20 ${isMike ? 'bg-red-600' : 'bg-blue-600'}`}>
                       <span className="text-white scale-90">
                         {config.icon}
                       </span>
                     </div>
                   )}
                 </div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-3 px-2">
                   <div className="flex items-center gap-4">
                      <span className={`text-[11px] font-black uppercase tracking-widest ${
                        isAgent ? (isMike ? 'text-red-400' : 'text-blue-400') : 
                        isSystem ? 'text-emerald-400' : 'text-white'
                      }`}>
                        {config.label}
                      </span>
                   </div>
                   <span className="text-[10px] text-white/30 font-mono uppercase tracking-tighter">
                     {new Date(msg.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                   </span>
                </div>
                
                <div className={`transition-all duration-500 relative leading-tight ${
                  isSystem ? 'text-base' : 'text-2xl'
                } ${config.contentClass}`}>
                  <span className="relative z-10 block">{msg.text}</span>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      <style>{`
        @keyframes agent-pulse-blue {
          0%, 100% { border-color: #2563eb; box-shadow: 0 0 20px rgba(37, 99, 235, 0.4); }
          50% { border-color: #60a5fa; box-shadow: 0 0 40px rgba(37, 99, 235, 0.6); }
        }
        @keyframes agent-pulse-red {
          0%, 100% { border-color: #dc2626; box-shadow: 0 0 20px rgba(220, 38, 38, 0.4); }
          50% { border-color: #f87171; box-shadow: 0 0 40px rgba(220, 38, 38, 0.6); }
        }
        .animate-agent-pulse-blue { animation: agent-pulse-blue 3s ease-in-out infinite; }
        .animate-agent-pulse-red { animation: agent-pulse-red 2s ease-in-out infinite; }
      `}</style>
    </div>
  );
};
