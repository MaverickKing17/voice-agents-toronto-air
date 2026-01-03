
import React, { useState } from 'react';
import { useGeminiLive } from './hooks/useGeminiLive';
import { WaveVisualizer } from './components/WaveVisualizer';
import { InfoPanel } from './components/InfoPanel';
import { Transcript } from './components/Transcript';
import { LeadDetails } from './types';
import { MicOff, PhoneCall, AlertCircle, Snowflake, Cpu, Zap, Loader2, Activity } from 'lucide-react';

const App: React.FC = () => {
  const [leadDetails, setLeadDetails] = useState<Partial<LeadDetails>>({});
  
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
    error,
    micSensitivity,
    setMicSensitivity,
    messages
  } = useGeminiLive({
    onLeadCaptured: handleLeadUpdate
  });

  return (
    <div className="min-h-screen bg-[#020408] text-slate-200 font-sans selection:bg-blue-500/30 overflow-hidden relative">
      
      {/* Dynamic Ambient Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#1e293b_0%,transparent_50%)] opacity-30 pointer-events-none" />
      
      {/* Precision Header */}
      <header className="fixed top-0 left-0 right-0 z-50 h-20 border-b border-white/5 bg-[#020408]/90 backdrop-blur-2xl px-10 flex items-center justify-between">
        <div className="flex items-center gap-5">
           <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.3)]">
              <Snowflake className="w-6 h-6 text-white" />
           </div>
           <div>
              <h1 className="text-lg font-black tracking-tight text-white uppercase italic leading-none">
                  Toronto Air <span className="text-blue-500 font-normal">Systems</span>
              </h1>
           </div>
           
           {/* Telemetry HUD - Only visible when connected */}
           {isConnected && (
             <div className="hidden lg:flex items-center gap-6 ml-8 pl-8 border-l border-white/10">
                <div className="flex flex-col">
                    <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-0.5">Latency</span>
                    <span className="text-[10px] font-mono font-bold text-emerald-400">42ms</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-0.5">Sample Rate</span>
                    <span className="text-[10px] font-mono font-bold text-slate-300">24kHz PCM</span>
                </div>
             </div>
           )}
        </div>

        <div className="flex items-center gap-6">
           {isConnected && (
             <div className="flex items-center gap-2.5 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-md">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest">Marcus Linked</span>
             </div>
           )}
           <button 
              disabled={isConnecting}
              onClick={() => isConnected ? disconnect() : connect()}
              className={`group flex items-center gap-2.5 px-6 py-2.5 rounded-md font-black text-[10px] transition-all active:scale-95 border uppercase tracking-widest ${
                  isConnected 
                  ? 'bg-rose-500/5 border-rose-500/30 text-rose-400 hover:bg-rose-500/10' 
                  : isConnecting
                    ? 'bg-slate-900 border-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-blue-600 border-blue-500 text-white hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(37,99,235,0.2)]'
              }`}
           >
              {isConnecting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : isConnected ? <MicOff className="w-3.5 h-3.5" /> : <PhoneCall className="w-3.5 h-3.5" />}
              {isConnecting ? 'Initializing...' : isConnected ? 'Kill Link' : 'Establish Link'}
           </button>
        </div>
      </header>

      <main className="pt-20 h-screen flex relative z-10">
        
        {/* Left: The Performance Area */}
        <section className="flex-1 flex flex-col border-r border-white/5 overflow-hidden">
            
            {/* Minimal Visualizer - Reduced Height */}
            <div className="h-1/3 relative flex items-center justify-center bg-black/40">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#1e293b33_0%,transparent_70%)] opacity-50" />
                <div className="w-full h-full max-w-md scale-90">
                    <WaveVisualizer isConnected={isConnected} isSpeaking={isSpeaking} volume={volume} />
                </div>
                <div className="absolute bottom-6 flex items-center gap-4 px-4 py-2 bg-black/60 border border-white/5 rounded-full backdrop-blur-md">
                   <Activity className="w-3 h-3 text-blue-500" />
                   <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Neural Frequency Response</span>
                </div>
            </div>

            {/* Tactical Log */}
            <div className="flex-1 flex flex-col min-h-0 bg-black/20">
                <div className="flex-1 overflow-hidden">
                    <Transcript messages={messages} />
                </div>
            </div>
        </section>

        {/* Right: Data Acquisition Area */}
        <aside className="w-[420px] flex flex-col bg-black/40 border-l border-white/5">
            <InfoPanel lead={leadDetails} isConnected={isConnected} />
        </aside>

      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.03); border-radius: 20px; }
      `}</style>
    </div>
  );
};

export default App;
