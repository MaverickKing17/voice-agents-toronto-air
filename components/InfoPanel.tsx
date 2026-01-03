
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
  History
} from 'lucide-react';

interface InfoPanelProps {
  lead: Partial<LeadDetails>;
  isConnected: boolean;
}

export const InfoPanel: React.FC<InfoPanelProps> = ({ lead, isConnected }) => {
  const isHeritage = lead.address?.toLowerCase().includes('heritage') || 
                     lead.heatingSource === 'oil';
  const isEmergency = lead.agentPersona === 'mike' || lead.type === 'emergency';

  return (
    <div className="flex flex-col h-full bg-white relative overflow-hidden">
      {/* Dynamic Header Banner */}
      <div className={`h-48 relative overflow-hidden flex flex-col justify-end p-10 transition-colors duration-1000 ${isEmergency ? 'bg-[#1a0505]' : 'bg-[#001f3f]'}`}>
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ 
          backgroundImage: `linear-gradient(#ffffff08 1.5px, transparent 1.5px), linear-gradient(90deg, #ffffff08 1.5px, transparent 1.5px)`, 
          backgroundSize: '20px 20px' 
        }} />
        <div className={`absolute top-0 right-0 w-64 h-64 blur-[100px] rounded-full -mr-20 -mt-20 transition-colors duration-1000 ${isEmergency ? 'bg-rose-500/20' : 'bg-blue-500/20'}`} />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-lg backdrop-blur-md border ${isEmergency ? 'bg-rose-500/20 border-rose-500/30' : 'bg-blue-500/20 border-blue-500/30'}`}>
                <FileText className={`w-4 h-4 ${isEmergency ? 'text-rose-400' : 'text-blue-400'}`} />
              </div>
              <h3 className={`text-[10px] font-black uppercase tracking-[0.5em] ${isEmergency ? 'text-rose-400/70' : 'text-blue-400/70'}`}>
                Dispatch Core Authorization
              </h3>
          </div>
          <h2 className="text-5xl font-black text-white tracking-tighter uppercase leading-none italic flex items-center gap-4">
              Active Ticket
              <span className={`inline-block w-3 h-3 rounded-full animate-pulse ${isConnected ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'bg-slate-600'}`} />
          </h2>
        </div>
      </div>

      <div className="p-10 space-y-12">
        {/* Profile Badges */}
        <div className="flex flex-wrap gap-3">
          {isHeritage && (
            <div className="px-4 py-2 bg-[#003366] text-white rounded-xl flex items-center gap-2.5 shadow-xl shadow-blue-900/10 animate-in zoom-in duration-500">
              <Home className="w-3.5 h-3.5" />
              <span className="text-[10px] font-black uppercase tracking-widest">Heritage Specialist Profile</span>
            </div>
          )}
          <div className="px-4 py-2 bg-slate-100 text-slate-500 rounded-xl flex items-center gap-2.5 border border-slate-200">
            <Cpu className="w-3.5 h-3.5" />
            <span className="text-[10px] font-black uppercase tracking-widest">Real-time Analysis</span>
          </div>
          {lead.marketType === 'commercial' && (
             <div className="px-4 py-2 bg-amber-50 text-amber-700 rounded-xl flex items-center gap-2.5 border border-amber-100 shadow-sm animate-in fade-in duration-700">
                <TrendingUp className="w-3.5 h-3.5" />
                <span className="text-[10px] font-black uppercase tracking-widest">Enterprise Priority</span>
             </div>
          )}
        </div>

        {/* Lead Details Grid */}
        <div className="space-y-1">
          <LeadField 
            label="Customer Identity" 
            value={lead.name} 
            icon={<User className="w-5 h-5" />} 
            active={isConnected}
          />
          <LeadField 
            label="Verified Contact" 
            value={lead.phone} 
            icon={<Phone className="w-5 h-5" />} 
            active={isConnected}
          />
          <LeadField 
            label="Property Coordinates" 
            value={lead.address} 
            icon={<MapPin className="w-5 h-5" />} 
            active={isConnected}
          />

          <div className="pt-10 grid grid-cols-2 gap-6">
               <StatusCard 
                  label="Inquiry Classification"
                  value={lead.type || 'Monitoring...'}
                  icon={<BadgeAlert className="w-4 h-4" />}
                  isActive={!!lead.type}
                  isEmergency={isEmergency}
               />
               <StatusCard 
                  label="Primary Energy Vector"
                  value={lead.heatingSource || 'Awaiting Sensor Data'}
                  icon={<Zap className="w-4 h-4" />}
                  isActive={!!lead.heatingSource}
                  isEmergency={false}
               />
          </div>
        </div>

        {/* Premium Rebate Section */}
        <div className="pt-4">
          <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-4">
            <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em]">Incentive Qualification Engine</span>
            <History className="w-4 h-4 text-slate-300" />
          </div>
          
          <div className="grid grid-cols-1 gap-5">
            <RebateTier 
              title="HRS Heat Pump Program"
              amount="$7,500"
              status={lead.heatingSource === 'electric' || lead.heatingSource === 'oil'}
              description="Maximum Grant Tier - Heritage & Electric Conversion"
            />
            <RebateTier 
              title="High-Efficiency Hybrid Incentive"
              amount="$2,000"
              status={lead.heatingSource === 'gas'}
              description="Tier 2 Optimization Grant - Gas Conversion"
            />
          </div>
        </div>

        {/* Submission Action Area */}
        <div className="relative group pt-6">
          <div className={`absolute -inset-2 rounded-[2.5rem] blur-2xl opacity-10 transition duration-1000 ${isEmergency ? 'bg-rose-600' : 'bg-[#003366]'}`}></div>
          <div className="relative bg-[#001f3f] border border-white/5 p-10 rounded-[2.5rem] shadow-2xl overflow-hidden group/btn">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10" />
              
              <div className="relative z-10 flex flex-col gap-8">
                  <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em] mb-1">Authorization Status</span>
                        <div className="flex items-center gap-2">
                           <ShieldCheck className="w-4 h-4 text-emerald-400" />
                           <span className="text-xs font-bold text-white uppercase tracking-wider">Ready for Dispatch</span>
                        </div>
                      </div>
                      <Waves className="w-6 h-6 text-white/10" />
                  </div>

                  <div className="flex items-baseline gap-4 border-l-2 border-white/10 pl-6 py-2">
                      <span className="text-5xl font-black text-white tracking-tighter leading-none font-mono">
                        {lead.heatingSource === 'gas' ? '$2,000' : lead.heatingSource ? '$7,500' : 'TBD'}
                      </span>
                      <span className="text-[11px] text-white/40 font-bold uppercase tracking-[0.2em]">Estimated Credit</span>
                  </div>

                  <button className={`w-full py-6 rounded-2xl text-[13px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all shadow-xl group-active:scale-95 ${
                    isEmergency 
                    ? 'bg-[#cc0000] text-white hover:bg-rose-700 shadow-rose-900/20' 
                    : 'bg-white text-[#001f3f] hover:bg-slate-100 shadow-blue-900/20'
                  }`}>
                    Execute Booking Sequence <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
                  </button>
                  
                  <div className="text-[10px] text-white/30 text-center leading-relaxed font-bold uppercase tracking-widest px-8">
                    Certified Toronto Air Systems Professional Dispatch Protocol
                  </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatusCard = ({ label, value, icon, isActive, isEmergency }: any) => (
  <div className={`group p-6 rounded-2xl border-2 transition-all duration-700 relative overflow-hidden ${
    isActive 
      ? (isEmergency ? 'bg-rose-50 border-rose-200 shadow-sm' : 'bg-blue-50/50 border-blue-200 shadow-sm') 
      : 'bg-slate-50 border-slate-100'
  }`}>
    <div className="flex items-center gap-3 mb-4">
       <div className={`p-2 rounded-lg ${isActive ? (isEmergency ? 'bg-rose-100 text-rose-600' : 'bg-blue-100 text-blue-600') : 'bg-slate-200 text-slate-400'}`}>
          {icon}
       </div>
       <div className="text-[9px] text-slate-400 uppercase font-black tracking-widest leading-tight">{label}</div>
    </div>
    <div className={`text-lg font-black uppercase tracking-tighter font-mono ${
      isActive 
        ? (isEmergency ? 'text-rose-600' : 'text-[#001f3f]') 
        : 'text-slate-300 italic'
    }`}>
      {value}
    </div>
  </div>
);

const RebateTier = ({ title, amount, status, description }: any) => (
  <div className={`p-6 rounded-2xl border-2 transition-all duration-500 flex items-center justify-between group ${
    status ? 'bg-[#003366] border-[#003366] shadow-xl translate-x-1' : 'bg-white border-slate-100'
  }`}>
    <div className="flex flex-col gap-1">
      <span className={`text-[10px] font-black uppercase tracking-widest ${status ? 'text-blue-300' : 'text-[#003366]'}`}>{title}</span>
      <p className={`text-[10px] font-bold ${status ? 'text-white/40' : 'text-slate-400'}`}>{description}</p>
    </div>
    <div className="flex flex-col items-end gap-1">
      <div className={`text-2xl font-black font-mono tracking-tighter ${status ? 'text-white' : 'text-slate-900'}`}>{amount}</div>
      {status ? (
        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-500/10 rounded-md border border-emerald-500/20">
          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
          <span className="text-[8px] font-black text-emerald-400 uppercase tracking-widest">Qualified</span>
        </div>
      ) : (
        <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest italic">Not Detected</span>
      )}
    </div>
  </div>
);

const LeadField = ({ label, value, icon, active }: { label: string, value?: string, icon: React.ReactNode, active: boolean }) => (
    <div className="group relative">
        <div className={`flex items-center justify-between py-8 transition-all duration-500 border-b border-slate-100 ${value ? 'border-blue-100' : ''}`}>
            <div className="flex items-center gap-10">
                <div className={`p-4 rounded-2xl transition-all duration-700 flex items-center justify-center ${
                  value ? 'bg-[#003366] text-white shadow-2xl scale-110' : 'bg-slate-100 text-slate-300'
                }`}>
                    {React.cloneElement(icon as React.ReactElement, { className: 'w-6 h-6' })}
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-2">{label}</span>
                  <span className={`text-2xl font-bold tracking-tight transition-all font-mono ${
                    value ? 'text-[#001f3f]' : active ? 'text-slate-300 italic animate-pulse' : 'text-slate-200'
                  }`}>
                      {value || (active ? 'Monitoring Audio Stream...' : 'Protocol Offline')}
                  </span>
                </div>
            </div>
            {value && (
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-end">
                   <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">Identity Lock</span>
                   <span className="text-[9px] font-bold text-slate-300">Auth: 0x82...</span>
                </div>
                <div className="p-2 bg-emerald-50 text-emerald-500 rounded-full border border-emerald-100 shadow-sm animate-in zoom-in duration-500">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              </div>
            )}
        </div>
    </div>
);
