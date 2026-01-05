
import React, { useState, useEffect } from 'react';
import { LeadDetails } from '../types';
import { 
  ShieldCheck, 
  User, 
  Phone, 
  MapPin, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  BadgeAlert,
  Home,
  Building2,
  Navigation,
  FileText,
  RefreshCw
} from 'lucide-react';

interface InfoPanelProps {
  lead: Partial<LeadDetails>;
  isConnected: boolean;
}

export const InfoPanel: React.FC<InfoPanelProps> = ({ lead, isConnected }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const isHeritage = lead.address?.toLowerCase().includes('heritage') || 
                     lead.heatingSource === 'oil';
  const isMarcus = lead.agentPersona === 'marcus';
  const isEmergency = isMarcus || lead.type === 'emergency';
  const isCommercial = lead.marketType === 'commercial';

  useEffect(() => {
    setIsRefreshing(true);
    const timer = setTimeout(() => setIsRefreshing(false), 800);
    return () => clearTimeout(timer);
  }, [lead.agentPersona]);

  return (
    <div className="flex flex-col bg-white relative min-h-full font-sans overflow-hidden">
      
      {/* Scanning Line Effect during refresh */}
      {isRefreshing && (
        <div className="absolute inset-0 z-50 pointer-events-none overflow-hidden">
           <div className={`absolute top-0 left-0 w-full h-[4px] blur-[2px] animate-scan-down ${isEmergency ? 'bg-rose-500 shadow-[0_0_30px_rgba(225,29,72,1)]' : 'bg-blue-600 shadow-[0_0_30px_rgba(37,99,235,1)]'}`} />
           <div className="absolute inset-0 bg-white/40 backdrop-blur-[4px] animate-pulse-fast" />
        </div>
      )}

      {/* Professional Service Header */}
      <div className={`h-48 relative overflow-hidden flex flex-col justify-end p-10 transition-all duration-1000 ${isEmergency ? 'bg-rose-950' : 'bg-slate-900'}`}>
        <div className="absolute inset-0 opacity-[0.2] pointer-events-none" style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
        
        <div className={`relative z-10 transition-all duration-500 ${isRefreshing ? 'translate-y-4 opacity-0 scale-90' : 'translate-y-0 opacity-100 scale-100'}`}>
          <div className="flex items-center gap-5 mb-4">
              <div className="p-3 rounded-2xl bg-white/20 backdrop-blur-xl border-2 border-white/40 shadow-2xl">
                <FileText className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-[13px] font-black uppercase tracking-[0.5em] text-white flex items-center gap-3 drop-shadow-lg">
                MISSION CRITICAL DATA
              </h3>
          </div>
          <h2 className="text-5xl font-black text-white tracking-tighter uppercase leading-none italic drop-shadow-2xl">
              {isMarcus ? 'DISPATCH MASTER' : 'REBATE STRATEGY'}
          </h2>
        </div>
      </div>

      <div className={`p-10 space-y-12 transition-all duration-700 ${isRefreshing ? 'blur-[8px] opacity-40 grayscale scale-95' : 'blur-0 opacity-100 grayscale-0 scale-100'}`}>
        {/* Status Badges */}
        <div className="flex flex-wrap gap-4">
          <div className={`px-6 py-3 rounded-2xl flex items-center gap-4 border-2 transition-all shadow-xl ${isCommercial ? 'bg-slate-950 border-slate-900 text-white' : 'bg-slate-100 border-slate-300 text-slate-950'}`}>
            {isCommercial ? <Building2 className="w-6 h-6" /> : <Home className="w-6 h-6" />}
            <span className="text-[13px] font-black uppercase tracking-widest">{lead.marketType} UNIT</span>
          </div>
          {isHeritage && (
            <div className="px-6 py-3 bg-amber-500 text-white rounded-2xl flex items-center gap-4 border-2 border-amber-400 shadow-xl">
              <ShieldCheck className="w-6 h-6" />
              <span className="text-[13px] font-black uppercase tracking-widest">HERITAGE ASSET</span>
            </div>
          )}
        </div>

        {/* Customer Details */}
        <div className="space-y-4">
          <TacticalField 
            label="CUSTOMER NAME" 
            value={lead.name} 
            icon={<User />} 
            active={isConnected}
          />
          <TacticalField 
            label="PHONE NUMBER" 
            value={lead.phone} 
            icon={<Phone />} 
            active={isConnected}
          />
          <TacticalField 
            label="SERVICE ADDRESS" 
            value={lead.address} 
            icon={<MapPin />} 
            active={isConnected}
          />
        </div>

        {/* Service Type & Energy Profile */}
        <div className="grid grid-cols-2 gap-6">
           <StatusCard 
              label="DISPATCH TYPE"
              value={lead.type || (isRefreshing ? '...' : 'SCANNING')}
              icon={<BadgeAlert />}
              isActive={!!lead.type}
              isEmergency={isEmergency}
           />
           <StatusCard 
              label="CORE FUEL"
              value={lead.heatingSource || (isRefreshing ? '...' : 'SCANNING')}
              icon={<Zap />}
              isActive={!!lead.heatingSource}
              isEmergency={false}
           />
        </div>

        {/* Dispatch Commitment */}
        <div className="pt-8">
          <div className="p-10 bg-slate-950 rounded-[3rem] shadow-[0_30px_70px_rgba(0,0,0,0.4)] relative overflow-hidden border-4 border-white/10 group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[60px] rounded-full" />
              <div className="relative z-10 space-y-10">
                  <div className="flex items-center justify-between border-b border-white/10 pb-10">
                      <div className="flex flex-col gap-3">
                        <span className="text-[12px] font-black text-blue-400 uppercase tracking-[0.4em]">DEPLOYMENT STATUS</span>
                        <div className="flex items-center gap-5">
                           <CheckCircle2 className={`w-8 h-8 ${isEmergency ? 'text-rose-400' : 'text-emerald-400'} animate-pulse`} />
                           <span className="text-2xl font-black text-white uppercase tracking-tight">
                              {isMarcus ? 'PRIORITY 1' : 'READY TO BOOK'}
                           </span>
                        </div>
                      </div>
                      <Navigation className="w-10 h-10 text-white/30" />
                  </div>

                  <button className={`w-full py-8 rounded-3xl text-xl font-black uppercase tracking-[0.25em] flex items-center justify-center gap-6 transition-all active:scale-95 shadow-2xl border-4 ${
                    isEmergency 
                    ? 'bg-rose-600 border-rose-400 text-white hover:bg-rose-500 shadow-rose-900/40' 
                    : 'bg-white border-white text-slate-950 hover:bg-slate-50 shadow-blue-900/10'
                  }`}>
                    DECOUPLE DISPATCH <ArrowRight className="w-8 h-8" />
                  </button>
              </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scan-down {
          0% { top: -20%; }
          100% { top: 120%; }
        }
        .animate-scan-down {
          animation: scan-down 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        @keyframes pulse-fast {
          0%, 100% { opacity: 0; }
          50% { opacity: 0.3; }
        }
        .animate-pulse-fast {
          animation: pulse-fast 0.15s infinite;
        }
      `}</style>
    </div>
  );
};

const TacticalField = ({ label, value, icon, active }: { label: string, value?: string, icon: React.ReactNode, active: boolean }) => (
    <div className={`flex items-center justify-between py-8 border-b-4 border-slate-50 transition-all duration-500 ${value ? 'bg-slate-900 -mx-10 px-10 rounded-[2rem] shadow-2xl border-b-0 my-2' : ''}`}>
        <div className="flex items-center gap-10">
            <div className={`w-16 h-16 rounded-3xl flex items-center justify-center border-4 transition-all shadow-xl ${
              value ? 'bg-white text-slate-950 border-white scale-110' : 'bg-slate-50 text-slate-400 border-slate-200'
            }`}>
                {React.cloneElement(icon as React.ReactElement, { className: 'w-8 h-8' })}
            </div>
            <div className="flex flex-col">
              <span className={`text-[12px] font-black uppercase tracking-[0.3em] mb-2 ${value ? 'text-white/60' : 'text-slate-900'}`}>{label}</span>
              <span className={`text-2xl font-black truncate max-w-[320px] transition-all duration-700 ${
                value ? 'text-white' : active ? 'text-slate-400 animate-pulse italic' : 'text-slate-300'
              }`}>
                  {value || (active ? 'LISTENING...' : 'WAITING')}
              </span>
            </div>
        </div>
    </div>
);

const StatusCard = ({ label, value, icon, isActive, isEmergency }: any) => (
  <div className={`p-8 rounded-[2.5rem] border-4 transition-all duration-700 shadow-2xl ${
    isActive 
      ? (isEmergency ? 'bg-rose-50 border-rose-200' : 'bg-blue-50 border-blue-200') 
      : 'bg-slate-50 border-slate-100'
  }`}>
    <div className="flex items-center gap-5 mb-6">
       <div className={`p-3 rounded-2xl border-2 transition-all ${isActive ? (isEmergency ? 'bg-rose-600 text-white border-rose-400' : 'bg-blue-600 text-white border-blue-400') : 'bg-white text-slate-300 border-slate-200'}`}>
          {React.cloneElement(icon, { className: 'w-6 h-6' })}
       </div>
       <div className="text-[11px] text-slate-900 uppercase font-black tracking-[0.4em] leading-none">{label}</div>
    </div>
    <div className={`text-2xl font-black uppercase tracking-tight italic ${
      isActive 
        ? (isEmergency ? 'text-rose-700' : 'text-slate-950') 
        : 'text-slate-300'
    }`}>
      {value}
    </div>
  </div>
);
