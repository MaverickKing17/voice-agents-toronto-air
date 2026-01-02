import React, { useState } from 'react';
import { useGeminiLive } from './hooks/useGeminiLive';
import { WaveVisualizer } from './components/WaveVisualizer';
import { InfoPanel } from './components/InfoPanel';
import { DashboardCharts } from './components/DashboardCharts';
import { LeadDetails } from './types';
import { Mic, MicOff, PhoneCall, AlertCircle, Snowflake, Flame, Activity } from 'lucide-react';

const App: React.FC = () => {
  const [leadDetails, setLeadDetails] = useState<Partial<LeadDetails>>({});
  
  const handleLeadUpdate = (details: Partial<LeadDetails>) => {
    setLeadDetails(prev => ({ ...prev, ...details }));
  };

  const { connect, disconnect, isConnected, isSpeaking, volume, error } = useGeminiLive({
    onLeadCaptured: handleLeadUpdate
  });

  const toggleConnection = () => {
    if (isConnected) {
      disconnect();
    } else {
      connect();
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-sky-500/30">
      
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center">
                <Snowflake className="w-5 h-5 text-white" />
             </div>
             <div>
                <h1 className="text-lg font-bold tracking-tight text-white">Toronto Air Systems</h1>
                <p className="text-xs text-slate-400">Dispatch & Triage AI • v2.5</p>
             </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2 text-xs font-medium text-slate-500">
                <span className="flex items-center gap-1.5"><Flame className="w-3 h-3" /> Heritage Specialist</span>
                <span className="w-1 h-1 rounded-full bg-slate-700" />
                <span>GTA 2026 Rebate Ready</span>
            </div>
            <button 
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-lg text-sm transition-colors border border-slate-700"
                onClick={() => window.open('https://ai.google.dev/gemini-api/docs/billing', '_blank')}
            >
                API Info
            </button>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-12 px-6 max-w-7xl mx-auto h-[calc(100vh)] flex flex-col gap-6">
        
        {/* Error Banner */}
        {error && (
            <div className="bg-rose-500/10 border border-rose-500/20 text-rose-200 px-4 py-3 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                <AlertCircle className="w-5 h-5" />
                <span>{error}</span>
            </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0">
            
            {/* Left Col: Main Interface */}
            <div className="lg:col-span-8 flex flex-col gap-6">
                
                {/* Visualizer Card */}
                <div className="relative flex-1 bg-gradient-to-b from-slate-900 to-slate-900/50 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                    <div className="absolute top-6 left-6 flex items-center gap-2 z-10">
                        <div className={`w-2 h-2 rounded-full ${isSpeaking ? 'bg-sky-400 animate-pulse' : 'bg-slate-600'}`} />
                        <span className="text-xs font-medium text-slate-400 tracking-widest uppercase">
                            {isConnected ? (isSpeaking ? 'Marcus Speaking...' : 'Listening') : 'Standby'}
                        </span>
                    </div>

                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="w-full h-2/3 px-12">
                            <WaveVisualizer isConnected={isConnected} isSpeaking={isSpeaking} volume={volume} />
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="absolute bottom-8 left-0 right-0 flex justify-center z-20">
                        <button
                            onClick={toggleConnection}
                            className={`
                                group relative flex items-center justify-center w-20 h-20 rounded-full transition-all duration-300 shadow-lg border-4
                                ${isConnected 
                                    ? 'bg-rose-500 hover:bg-rose-600 border-rose-900/30 shadow-rose-900/20' 
                                    : 'bg-sky-500 hover:bg-sky-600 border-sky-900/30 shadow-sky-900/20 animate-pulse-slow'}
                            `}
                        >
                            {isConnected ? (
                                <MicOff className="w-8 h-8 text-white" />
                            ) : (
                                <PhoneCall className="w-8 h-8 text-white" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Lower Stats Row */}
                <div className="h-48 grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6 flex flex-col justify-between">
                         <div className="flex items-center justify-between">
                             <div className="flex items-center gap-2 text-slate-400">
                                 <Activity className="w-4 h-4" />
                                 <span className="text-sm font-medium">System Load</span>
                             </div>
                             <span className="text-emerald-400 text-xs font-bold bg-emerald-500/10 px-2 py-1 rounded">NORMAL</span>
                         </div>
                         <div className="mt-4">
                             <div className="text-3xl font-bold text-white mb-1">98.2%</div>
                             <div className="text-xs text-slate-500">Uptime guarantee met</div>
                         </div>
                     </div>
                     
                     <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6">
                        <DashboardCharts />
                     </div>
                </div>
            </div>

            {/* Right Col: Info Panel */}
            <div className="lg:col-span-4 h-full">
                <InfoPanel lead={leadDetails} isConnected={isConnected} />
            </div>
        </div>
      </main>
    </div>
  );
};

export default App;
