
import React from 'react';
import { LeadDetails } from '../types';
import { 
  ShieldCheck, 
  User, 
  Phone, 
  MapPin, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  FileText,
  BadgeAlert,
  Home,
  Waves,
  Cpu,
  TrendingUp,
  Building2,
  HardHat,
  ChevronRight,
  Activity,
  Database,
  Search,
  Navigation
} from 'lucide-react';

interface InfoPanelProps {
  lead: Partial<LeadDetails>;
  isConnected: boolean;
}

export const InfoPanel: React.FC<InfoPanelProps> = ({ lead, isConnected }) => {
  const isHeritage = lead.address?.toLowerCase().includes('heritage') || 
                     lead.heatingSource === 'oil';
  const isEmergency = lead.agentPersona === 'mike' || lead.type === 'emergency';
  const isCommercial = lead.marketType === 'commercial';

  return (
    <div className="flex flex-col bg-[#fcfdfe] relative">
      {/* Dynamic Intelligence Header */}
      <div className={`h-40 relative overflow-hidden flex flex-col justify-end p-8 transition-all duration-1000 ${isEmergency ? 'bg-rose-950' : 'bg-slate-900'}`}>
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none" style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '24px 24px' }} />
        <div className={`absolute top-0 right-0 w-80 h-80 blur-[100px] rounded-full -mr-40 -mt-40 transition-colors duration-1000 ${isEmergency ? 'bg-rose-500/40' : 'bg-blue-500/20'}`} />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
              <div className={`p-2 rounded-lg backdrop-blur-xl border ${isEmergency ? 'bg-rose-500/20 border-rose-500/30' : 'bg-blue-500/20 border-blue-500/30'}`}>
                <Database className={`w-3.5 h-3.5 ${isEmergency ? 'text-rose-400' : 'text-blue-400'}`} />
              </div>
              <h3 className={`text-[9px] font-black uppercase tracking-[0.5em] ${isEmergency ? 'text-rose-400/80' : 'text-blue-400/80'}`}>
                INTELLIGENCE TERMINAL
              </h3>
          </div>
          <h2 className="text-3xl font-black text-white tracking-tighter uppercase leading-none italic flex items-center gap-5">
              {isCommercial ? 'Asset Context' : 'Extraction Hub'}
              {isConnected && <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />}
          </h2>
        </div>
      </div>

      <div className="p-8 space-y-8">
        {/* Context Chip Array */}
        <div className="flex flex-wrap gap-2.5">
          <div className={`px-3.5 py-1.5 rounded-xl flex items-center gap-2.5 border transition-all duration-700 ${isCommercial ? 'bg-slate-900 border-slate-950 text-white shadow-xl' : 'bg-slate-100 border-slate-200 text-slate-700 shadow-sm'}`}>
            {isCommercial ? <Building2 className="w-3.5 h-3.5 text-blue-400" /> : <Home className="w-3.5 h-3.5 text-slate-400" />}
            <span className="text-[9px] font-black uppercase tracking-widest leading-none">{lead.marketType} UNIT</span>
          </div>
          {isHeritage && (
            <div className="px-3.5 py-1.5 bg-amber-50 text-amber-700 rounded-xl flex items-center gap-2.5 border border-amber-200 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="text-[9px] font-black uppercase tracking-widest leading-none">Heritage Protocol</span>
            </div>
          )}
          <div className="px-3.5 py-1.5 bg-white text-slate-400 rounded-xl flex items-center gap-2.5 border border-slate-100 shadow-sm">
            <Search className="w-3.5 h-3.5" />
            <span className="text-[9px] font-black uppercase tracking-widest leading-none">Neural Verification</span>
          </div>
        </div>

        {/* Primary Data Hub */}
        <div className="space-y-1">
          <TacticalField 
            label="Verified Entity Name" 
            value={lead.name} 
            icon={<User className="w-5 h-5" />} 
            active={isConnected}
          />
          <TacticalField 
            label="Secure Contact String" 
            value={lead.phone} 
            icon={<Phone className="w-5 h-5" />} 
            active={isConnected}
          />
          <TacticalField 
            label="Global Position Link" 
            value={lead.address} 
            icon={<MapPin className="w-5 h-5" />} 
            active={isConnected}
          />

          <div className="pt-6 grid grid-cols-2 gap-4">
               <StatusCard 
                  label="Inquiry Vector"
                  value={lead.type || 'SEARCHING...'}
                  icon={<BadgeAlert className="w-4 h-4" />}
                  isActive={!!lead.type}
                  isEmergency={isEmergency}
               />
               <StatusCard 
                  label="Energy Profile"
                  value={lead.heatingSource || 'ANALYZING...'}
                  icon={<Zap className="w-4 h-4" />}
                  isActive={!!lead.heatingSource}
                  isEmergency={false}
               />
          </div>
        </div>

        {/* Operational Logistics */}
        <div className="pt-4">
          <div className="flex items-center justify-between mb-5 border-b border-slate-100 pb-3">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">OPERATIONAL LOGISTICS</span>
            <TrendingUp className="w-4 h-4 text-slate-300" />
          </div>
          
          <div className="space-y-3">
            {isCommercial ? (
              <LogisticsTier 
                title="Commercial RTU Compliance"
                subtitle="Quarterly Diagnostic Eligibility"
                icon={<HardHat className="w-4 h-4" />}
                status={true}
              />
            ) : (
              <LogisticsTier 
                title="HRS Heat Pump Grant (2026)"
                subtitle="Qualified for Hybrid Incentive"
                icon={<CheckCircle2 className="w-4 h-4" />}
                status={lead.heatingSource === 'electric' || lead.heatingSource === 'oil'}
              />
            )}
            <LogisticsTier 
              title="Fixed Price Quote Assurance"
              subtitle="Toronto Air Systems Protocol Verified"
              icon={<ShieldCheck className="w-4 h-4" />}
              status={true}
            />
          </div>
        </div>

        {/* Fleet Metrics Dashboard (Integrated) */}
        <div className="pt-6">
           <div className="p-7 bg-slate-950 rounded-[2rem] shadow-xl relative overflow-hidden group border border-white/5">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-100" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                   <div>
                      <div className="text-[8px] font-black text-blue-500 uppercase tracking-[0.4em] mb-1.5">Fleet Metrics</div>
                      <h4 className="text-lg font-black text-white italic tracking-tighter uppercase leading-none">Regional Context</h4>
                   </div>
                   <Navigation className="w-5 h-5 text-white/20" />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                   <div className="bg-white/[0.04] p-4 rounded-xl border border-white/10 backdrop-blur-md">
                      <div className="text-[7px] font-black text-white/30 uppercase tracking-widest mb-2">Dispatcher ETA</div>
                      <div className="text-2xl font-black text-white font-mono tracking-tighter italic leading-none">38m <span className="text-[9px] text-emerald-400 not-italic tracking-normal font-bold">FAST</span></div>
                   </div>
                   <div className="bg-white/[0.04] p-4 rounded-xl border border-white/10 backdrop-blur-md">
                      <div className="text-[7px] font-black text-white/30 uppercase tracking-widest mb-2">Network Nodes</div>
                      <div className="text-2xl font-black text-white font-mono tracking-tighter italic leading-none">14 <span className="text-[10px] text-blue-400 not-italic tracking-normal font-bold">READY</span></div>
                   </div>
                </div>
              </div>
           </div>
        </div>

        {/* Dispatch Commitment Module */}
        <div className="relative pt-6 pb-12">
          <div className="relative bg-slate-900 border border-white/10 p-8 rounded-[2rem] shadow-2xl overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-[70px] -mr-16 -mt-16" />
              
              <div className="relative z-10 flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                      <div className="flex flex-col gap-1">
                        <span className="text-[9px] font-black text-blue-400 uppercase tracking-[0.4em]">Auth Signature</span>
                        <div className="flex items-center gap-3">
                           <ShieldCheck className="w-4 h-4 text-emerald-400" />
                           <span className="text-[10px] font-bold text-white uppercase tracking-[0.2em] font-mono">READY FOR DEPLOYMENT</span>
                        </div>
                      </div>
                      <Waves className="w-7 h-7 text-white/10" />
                  </div>

                  <button className={`w-full py-5 rounded-2xl text-[13px] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-4 transition-all active:scale-95 shadow-2xl ${
                    isEmergency 
                    ? 'bg-rose-600 text-white hover:bg-rose-500 shadow-rose-900/20' 
                    : 'bg-white text-slate-950 hover:bg-slate-100 shadow-blue-900/10'
                  }`}>
                    INITIATE DISPATCH <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
                  </button>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TacticalField = ({ label, value, icon, active }: { label: string, value?: string, icon: React.ReactNode, active: boolean }) => (
    <div className={`flex items-center justify-between py-5 transition-all duration-500 border-b border-slate-100 ${value ? 'bg-blue-50/20 px-4 rounded-xl -mx-2' : ''}`}>
        <div className="flex items-center gap-5">
            <div className={`w-11 h-11 rounded-[1.1rem] transition-all duration-700 flex items-center justify-center border ${
              value ? 'bg-slate-900 text-white border-slate-950 shadow-xl' : 'bg-slate-50 text-slate-300 border-slate-100'
            }`}>
                {React.cloneElement(icon as React.ReactElement, { className: 'w-5.5 h-5.5' })}
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.5em] mb-1 leading-none">{label}</span>
              <span className={`text-xl font-black tracking-tighter transition-all font-mono italic leading-none truncate max-w-[220px] ${
                value ? 'text-slate-950 not-italic' : active ? 'text-slate-200 animate-pulse' : 'text-slate-200'
              }`}>
                  {value || (active ? 'IDENTIFYING...' : 'STANDBY')}
              </span>
            </div>
        </div>
        {value && (
          <div className="flex items-center justify-center w-7 h-7 bg-emerald-50 text-emerald-500 rounded-full border border-emerald-100 shadow-sm shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        )}
    </div>
);

const StatusCard = ({ label, value, icon, isActive, isEmergency }: any) => (
  <div className={`p-5 rounded-[1.6rem] border-2 transition-all duration-700 relative overflow-hidden ${
    isActive 
      ? (isEmergency ? 'bg-rose-50 border-rose-100 shadow-sm' : 'bg-blue-50 border-blue-100 shadow-sm') 
      : 'bg-slate-50 border-slate-100'
  }`}>
    <div className="flex items-center gap-3 mb-4">
       <div className={`p-2 rounded-xl ${isActive ? (isEmergency ? 'bg-rose-100 text-rose-600' : 'bg-blue-100 text-blue-600') : 'bg-white text-slate-200 border border-slate-100'}`}>
          {React.cloneElement(icon, { className: 'w-3.5 h-3.5' })}
       </div>
       <div className="text-[9px] text-slate-400 uppercase font-black tracking-widest leading-none">{label}</div>
    </div>
    <div className={`text-lg font-black uppercase tracking-tight font-mono leading-none ${
      isActive 
        ? (isEmergency ? 'text-rose-600' : 'text-slate-950') 
        : 'text-slate-200 italic'
    }`}>
      {value}
    </div>
  </div>
);

const LogisticsTier = ({ title, subtitle, icon, status }: any) => (
  <div className={`p-5 rounded-[1.8rem] border-2 transition-all duration-500 flex items-center justify-between ${
    status ? 'bg-white border-blue-500 shadow-[0_8px_30px_rgba(59,130,246,0.15)] scale-[1.02]' : 'bg-slate-50 border-slate-100 opacity-60'
  }`}>
    <div className="flex items-center gap-4">
       <div className={`p-3 rounded-2xl ${status ? 'bg-blue-600 text-white shadow-xl' : 'bg-white text-slate-200 border border-slate-100'}`}>
          {icon}
       </div>
       <div className="flex flex-col gap-1">
          <span className={`text-[11px] font-black uppercase tracking-wider ${status ? 'text-slate-950' : 'text-slate-400'}`}>{title}</span>
          <span className={`text-[9px] font-bold ${status ? 'text-blue-600' : 'text-slate-300'}`}>{subtitle}</span>
       </div>
    </div>
    {status && (
      <div className="relative flex items-center justify-center w-3 h-3">
        <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-30" />
        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
      </div>
    )}
  </div>
);
