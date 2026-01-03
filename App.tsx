
import React, { useState, useEffect } from 'react';
import { useGeminiLive } from './hooks/useGeminiLive';
import { WaveVisualizer } from './components/WaveVisualizer';
import { InfoPanel } from './components/InfoPanel';
import { Transcript } from './components/Transcript';
import { LeadDetails } from './types';
import { 
  MicOff, 
  PhoneCall, 
  Snowflake, 
  Loader2, 
  Activity, 
  ShieldCheck, 
  Clock, 
  UserCircle2,
  AlertTriangle,
  Building2,
  Home,
  ChevronRight,
  Globe,
  Radio
} from 'lucide-react';

const App: React.FC = () => {
  const [leadDetails, setLeadDetails] = useState<Partial<LeadDetails>>({
    agentPersona: 'sarah',
    marketType: 'residential'
  });
  const [sessionDuration, setSessionDuration] = useState<number>(0);
  
  const handleLeadUpdate = (details: Partial<LeadDetails>) => {
    setLeadDetails(prev => ({ ...prev, ...details }));
  };

  const { 
    connect, 
    disconnect, 
    isConnected, 
    isConnecting,
    isSpeaking, 
    volume, 
    messages
  } = useGeminiLive({
    onLeadCaptured: handleLeadUpdate
  });

  const isEmergency = leadDetails.agentPersona === 'mike' || leadDetails.type === 'emergency';

  useEffect(() => {
    let interval: number | undefined;
    if (isConnected) {
      const startTime = Date.now();
      interval = window.setInterval(() => {
        setSessionDuration(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    } else {
      setSessionDuration(0);
      if (interval) clearInterval(interval);
    }
    return () => { if (interval) clearInterval(interval); };
  }, [isConnected]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`min-h-screen transition-all duration-1000 font-sans selection:bg-blue-200 overflow-hidden relative ${isEmergency ? 'bg-[#0f0404]' : 'bg-[#000d1a]'}`}>
      
      {/* Cinematic Background Map Overlay */}
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] grayscale invert animate-pulse-slow">
           <svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path d="M0 500 L1000 500 M500 0 L500 1000" stroke="white" strokeWidth="1" />
              <circle cx="500" cy="500" r="200" fill="none" stroke="white" strokeWidth="0.5" />
              <circle cx="500" cy="500" r="400" fill="none" stroke="white" strokeWidth="0.5" />
           </svg>
        </div>
      </div>

      <header className="fixed top-0 left-0 right-0 z-50 h-24 border-b border-white/10 bg-[#001f3f]/80 backdrop-blur-2xl px-12 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-10">
           <div className="flex items-center gap-5 border-r border-white/10 pr-10">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-all duration-700 ${isEmergency ? 'bg-[#cc0000] rotate-3' : 'bg-[#003366]'}`}>
                 <Snowflake className="w-8 h-8 text-white animate-spin-slow" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-2xl font-black tracking-tighter text-white uppercase italic leading-none">
                    Toronto Air <span className={`${isEmergency ? 'text-[#ff3333]' : 'text-[#0099cc]'} font-bold tracking-normal not-italic`}>Systems</span>
                </h1>
                <div className="flex items-center gap-2 mt-2">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                   <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.4em]">Operations Link: Active</span>
                </div>
              </div>
           </div>
           
           {/* Persona Switcher UI */}
           <div className="flex items-center gap-4 bg-black/30 p-1.5 rounded-2xl border border-white/5">
              <AgentPill 
                name="Sarah" 
                role="Comfort Advisor" 
                active={leadDetails.agentPersona === 'sarah'} 
                icon={<UserCircle2 className="w-3.5 h-3.5" />}
                color="blue"
              />
              <ChevronRight className="w-3 h-3 text-white/20" />
              <AgentPill 
                name="Mike" 
                role="Emergency Dispatch" 
                active={leadDetails.agentPersona === 'mike'} 
                icon={<AlertTriangle className="w-3.5 h-3.5" />}
                color="red"
              />
           </div>
        </div>

        <div className="flex items-center gap-10">
           {isConnected && (
             <div className="flex items-center gap-12 pr-12 border-r border-white/10">
                <div className="text-right">
                    <div className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-1.5 flex items-center justify-end gap-2">
                      <Clock className={`w-3.5 h-3.5 ${isEmergency ? 'text-[#ff3333]' : 'text-[#0099cc]'}`} /> Signal Uptime
                    </div>
                    <div className="text-2xl font-mono font-black text-white tabular-nums tracking-tighter">
                      {formatDuration(sessionDuration)}
                    </div>
                </div>
                <div className="hidden lg:flex flex-col items-end">
                    <div className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-1.5">Market Target</div>
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-wider transition-all duration-700 ${leadDetails.marketType === 'commercial' ? 'bg-amber-500/10 border-amber-500/30 text-amber-500' : 'bg-blue-500/10 border-blue-500/30 text-blue-400'}`}>
                      {leadDetails.marketType === 'commercial' ? <Building2 className="w-3 h-3" /> : <Home className="w-3 h-3" />}
                      {leadDetails.marketType}
                    </div>
                </div>
             </div>
           )}

           <button 
              disabled={isConnecting}
              onClick={() => isConnected ? disconnect() : connect()}
              className={`group relative flex items-center gap-3 px-10 py-5 rounded-2xl font-black text-[11px] transition-all active:scale-95 uppercase tracking-[0.25em] shadow-2xl overflow-hidden ${
                  isConnected 
                  ? 'bg-black/40 text-[#ff3333] border border-[#ff3333]/50 hover:bg-[#ff3333]/10' 
                  : isConnecting
                    ? 'bg-white/5 text-white/20 cursor-not-allowed border-white/5 border'
                    : 'bg-white text-[#001f3f] hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]'
              }`}
           >
              {isConnecting ? <Loader2 className="w-5 h-5 animate-spin" /> : isConnected ? <Radio className="w-5 h-5" /> : <PhoneCall className="w-5 h-5" />}
              {isConnecting ? 'Syncing...' : isConnected ? 'Terminate Link' : 'Establish Link'}
           </button>
        </div>
      </header>

      <main className="pt-24 h-screen flex relative z-10">
        
        {/* Left: Tactical Audio Lab */}
        <section className="flex-1 flex flex-col border-r border-white/5 bg-black/10">
            
            <div className={`h-[45%] relative flex items-center justify-center overflow-hidden border-b border-white/5 transition-all duration-1000 ${isEmergency ? 'bg-[#2a0000]' : 'bg-[#001326]'}`}>
                {/* Visualizer Grid Overlays */}
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ 
                  backgroundImage: `linear-gradient(#ffffff08 1.5px, transparent 1.5px), linear-gradient(90deg, #ffffff08 1.5px, transparent 1.5px)`, 
                  backgroundSize: '40px 40px' 
                }} />
                
                <div className="w-full h-full relative z-10">
                    <WaveVisualizer isConnected={isConnected} isSpeaking={isSpeaking} volume={volume} isEmergency={isEmergency} />
                </div>
                
                {/* HUD Elements */}
                <div className={`absolute top-10 left-10 flex flex-col gap-4`}>
                   <div className={`flex items-center gap-4 px-5 py-2.5 rounded-xl backdrop-blur-xl border ${isEmergency ? 'bg-rose-500/10 border-rose-500/20' : 'bg-blue-500/10 border-blue-500/20'}`}>
                      <Activity className={`w-4 h-4 animate-pulse ${isEmergency ? 'text-rose-500' : 'text-[#0099cc]'}`} />
                      <span className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Signal Diagnostic</span>
                   </div>
                   <div className="flex items-center gap-3 text-[9px] font-mono text-white/30 uppercase">
                      <Globe className="w-3 h-3" /> Lat: 43.6532° N | Lon: 79.3832° W
                   </div>
                </div>

                <div className="absolute bottom-10 right-10 flex flex-col items-end gap-3">
                    <div className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em]">Audio Decibel Map</div>
                    <div className="flex gap-1 h-12 items-end">
                       {[...Array(12)].map((_, i) => (
                         <div key={i} className={`w-1 rounded-full transition-all duration-300 ${isSpeaking ? (isEmergency ? 'bg-rose-500' : 'bg-blue-400') : 'bg-white/10'}`} style={{ height: isSpeaking ? `${Math.random() * 100}%` : '4px' }} />
                       ))}
                    </div>
                </div>
            </div>

            {/* Transcript Log with modern styling */}
            <div className="flex-1 flex flex-col min-h-0 bg-black/20 overflow-hidden">
                <Transcript messages={messages} persona={leadDetails.agentPersona} />
            </div>
        </section>

        {/* Right: Lead Processor & Market IQ */}
        <aside className="w-[680px] flex flex-col bg-white z-20 overflow-hidden shadow-[-40px_0_80px_rgba(0,0,0,0.5)]">
            <div className="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/50">
                <InfoPanel lead={leadDetails} isConnected={isConnected} />
                
                {/* Tactical Market Intelligence Footer */}
                <div className="px-10 pb-16 pt-4">
                   <div className="p-10 bg-[#001f3f] rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] -mr-32 -mt-32" />
                      
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-10">
                           <div>
                              <div className="text-[11px] font-black text-blue-400 uppercase tracking-[0.5em] mb-2">Fleet Diagnostics</div>
                              <h4 className="text-2xl font-black text-white italic tracking-tighter uppercase leading-none">GTA Coverage Hub</h4>
                           </div>
                           <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                             <Radio className="w-6 h-6 text-white/40" />
                           </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-8 mb-10">
                           <MetricItem label="Avg Response" value="2.4 Hrs" sub="In-Field" />
                           <MetricItem label="Tech Density" value="94%" sub="Active Areas" />
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center justify-between text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">
                            <span>System Throughput</span>
                            <span>Optimal</span>
                          </div>
                          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-blue-600 to-blue-400 w-[88%]" />
                          </div>
                        </div>
                      </div>
                   </div>
                </div>
            </div>
        </aside>

      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 20px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow { animation: spin-slow 12s linear infinite; }
      `}</style>
    </div>
  );
};

const MetricItem = ({ label, value, sub }: any) => (
  <div className="flex flex-col border-l-2 border-white/10 pl-5">
    <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">{label}</span>
    <span className="text-2xl font-black text-white font-mono tracking-tighter">{value}</span>
    <span className="text-[9px] font-bold text-blue-400 uppercase tracking-widest mt-0.5">{sub}</span>
  </div>
);

const AgentPill = ({ name, role, active, icon, color }: any) => (
  <div className={`flex items-center gap-3 px-5 py-3 rounded-xl transition-all duration-700 cursor-default ${
    active 
    ? (color === 'red' ? 'bg-[#cc0000] text-white shadow-[0_0_20px_rgba(204,0,0,0.3)] scale-105' : 'bg-white text-[#001f3f] shadow-lg scale-105')
    : 'text-white/20 opacity-50 grayscale hover:grayscale-0 hover:opacity-100'
  }`}>
    <div className={`p-1.5 rounded-lg ${active ? (color === 'red' ? 'bg-white/20' : 'bg-[#001f3f]/10') : 'bg-white/5'}`}>
      {icon}
    </div>
    <div className="flex flex-col leading-none">
       <span className="text-[10px] font-black uppercase tracking-widest">{name}</span>
       <span className={`text-[8px] font-bold uppercase tracking-tight mt-0.5 ${active ? (color === 'red' ? 'text-white/60' : 'text-[#001f3f]/60') : 'text-white/20'}`}>{role}</span>
    </div>
  </div>
);

export default App;
