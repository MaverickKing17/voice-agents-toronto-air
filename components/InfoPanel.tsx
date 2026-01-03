
import React from 'react';
import { LeadDetails } from '../types';
import { ShieldCheck, User, Phone, MapPin, Database, Zap, Cpu } from 'lucide-react';

interface InfoPanelProps {
  lead: Partial<LeadDetails>;
  isConnected: boolean;
}

export const InfoPanel: React.FC<InfoPanelProps> = ({ lead, isConnected }) => {
  return (
    <div className="h-full flex flex-col p-12 relative overflow-hidden">
      
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-3">
            <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.8)]" />
            <h3 className="text-[11px] font-black text-blue-500 uppercase tracking-[0.4em]">Live Data Acquisition</h3>
        </div>
        <h2 className="text-3xl font-black text-white tracking-tighter uppercase leading-none italic">
            Lead Extraction
        </h2>
      </div>

      <div className="space-y-3 flex-1">
        <LeadField 
          label="Subject Identity" 
          value={lead.name} 
          icon={<User className="w-5 h-5" />} 
          active={isConnected}
        />
        <LeadField 
          label="Secure Contact Link" 
          value={lead.phone} 
          icon={<Phone className="w-5 h-5" />} 
          active={isConnected}
        />
        <LeadField 
          label="Geospatial Address" 
          value={lead.address} 
          icon={<MapPin className="w-5 h-5" />} 
          active={isConnected}
        />

        <div className="pt-8 grid grid-cols-2 gap-4">
             <div className={`group p-6 rounded-2xl border transition-all duration-700 ${lead.type ? 'bg-blue-600/10 border-blue-500/30' : 'bg-white/[0.01] border-white/5'}`}>
                <div className="flex items-center gap-2 mb-2">
                   <Database className="w-3 h-3 text-slate-600 group-hover:text-blue-400 transition-colors" />
                   <div className="text-[9px] text-slate-600 uppercase font-black tracking-widest">Inquiry Vector</div>
                </div>
                <div className={`text-sm font-black uppercase tracking-tight ${lead.type === 'emergency' ? 'text-rose-400' : lead.type ? 'text-white' : 'text-slate-800 italic'}`}>
                  {lead.type || (isConnected ? 'SCANNING...' : 'OFFLINE')}
                </div>
             </div>
             
             <div className={`group p-6 rounded-2xl border transition-all duration-700 ${lead.heatingSource ? 'bg-blue-600/10 border-blue-500/30' : 'bg-white/[0.01] border-white/5'}`}>
                <div className="flex items-center gap-2 mb-2">
                   <Zap className="w-3 h-3 text-slate-600 group-hover:text-amber-400 transition-colors" />
                   <div className="text-[9px] text-slate-600 uppercase font-black tracking-widest">Energy Grid</div>
                </div>
                <div className={`text-sm font-black uppercase tracking-tight ${lead.heatingSource ? 'text-white' : 'text-slate-800 italic'}`}>
                  {lead.heatingSource || (isConnected ? 'DETECTING...' : 'OFFLINE')}
                </div>
             </div>
        </div>
      </div>

      {/* Verified Rebate Asset Card */}
      <div className="mt-10 relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl blur opacity-10 group-hover:opacity-30 transition duration-1000"></div>
        <div className="relative bg-[#0a0f1d] border border-white/10 p-8 rounded-3xl overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
               <Cpu className="w-32 h-32 text-blue-500" />
            </div>
            
            <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em]">2026 HRS Incentive Program</span>
                    <ShieldCheck className="w-5 h-5 text-emerald-500" />
                </div>
                <div className="flex items-baseline gap-3">
                    <span className="text-5xl font-black text-white tracking-tighter">
                      ${lead.heatingSource === 'electric' ? '7,500' : lead.heatingSource === 'gas' ? '2,000' : '7,500'}
                    </span>
                    <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">Potential CAP</span>
                </div>
                <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
                    <div className="flex flex-col">
                       <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest mb-1">Status</span>
                       <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-1.5">
                          <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                          Qualified
                       </span>
                    </div>
                    <div className="h-8 w-px bg-white/5" />
                    <div className="flex flex-col text-right">
                       <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest mb-1">Verify Via</span>
                       <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Enbridge HRS-V2</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

const LeadField = ({ label, value, icon, active }: { label: string, value?: string, icon: React.ReactNode, active: boolean }) => (
    <div className={`group flex items-center justify-between py-5 transition-all duration-500 border-b border-white/[0.03]`}>
        <div className="flex items-center gap-6">
            <div className={`transition-all duration-500 ${value ? 'text-blue-500 scale-110' : 'text-slate-800'}`}>
                {icon}
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.25em] mb-1 group-hover:text-slate-400 transition-colors">{label}</span>
              <span className={`text-base font-bold transition-all ${value ? 'text-white' : active ? 'text-slate-700 italic animate-pulse-slow' : 'text-slate-800'}`}>
                  {value || (active ? 'Waiting for voice trigger...' : 'Terminal Inactive')}
              </span>
            </div>
        </div>
        {value && (
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)] animate-in zoom-in" />
        )}
    </div>
);
