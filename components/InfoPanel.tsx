
import React from 'react';
import { LeadDetails } from '../types';
import { ShieldCheck, User, Phone, MapPin, Search } from 'lucide-react';

interface InfoPanelProps {
  lead: Partial<LeadDetails>;
  isConnected: boolean;
}

export const InfoPanel: React.FC<InfoPanelProps> = ({ lead, isConnected }) => {
  return (
    <div className="h-full flex flex-col p-10 relative overflow-hidden">
      
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
            <h3 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em]">Data Acquisition</h3>
        </div>
        <h2 className="text-2xl font-black text-white tracking-tighter uppercase leading-none italic">
            Lead Analysis
        </h2>
      </div>

      <div className="space-y-1 flex-1">
        <LeadField 
          label="Subject Identity" 
          value={lead.name} 
          icon={<User className="w-4 h-4" />} 
          active={isConnected}
        />
        <LeadField 
          label="Contact Link" 
          value={lead.phone} 
          icon={<Phone className="w-4 h-4" />} 
          active={isConnected}
        />
        <LeadField 
          label="Sector Address" 
          value={lead.address} 
          icon={<MapPin className="w-4 h-4" />} 
          active={isConnected}
        />

        <div className="pt-6 grid grid-cols-2 gap-3">
             <div className={`p-5 rounded-lg border transition-all duration-500 ${lead.type ? 'bg-blue-600/10 border-blue-500/30' : 'bg-white/[0.01] border-white/5'}`}>
                <div className="text-[8px] text-slate-600 uppercase font-black tracking-widest mb-1.5">Inquiry Class</div>
                <div className={`text-xs font-black uppercase tracking-tight ${lead.type === 'emergency' ? 'text-rose-400' : 'text-slate-400'}`}>
                  {lead.type || (isConnected ? 'SCANNING...' : 'PENDING')}
                </div>
             </div>
             
             <div className={`p-5 rounded-lg border transition-all duration-500 ${lead.heatingSource ? 'bg-blue-600/10 border-blue-500/30' : 'bg-white/[0.01] border-white/5'}`}>
                <div className="text-[8px] text-slate-600 uppercase font-black tracking-widest mb-1.5">Thermal Unit</div>
                <div className="text-xs font-black text-slate-400 uppercase tracking-tight">
                  {lead.heatingSource || (isConnected ? 'DETECTING...' : 'PENDING')}
                </div>
             </div>
        </div>
      </div>

      {/* High-Fi Rebate Card */}
      <div className="mt-8 bg-gradient-to-br from-blue-700 to-blue-900 p-6 rounded-xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl" />
        <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
                <span className="text-[9px] font-black text-blue-200 uppercase tracking-widest">2026 HRS Incentive</span>
                <ShieldCheck className="w-4 h-4 text-blue-200 opacity-50" />
            </div>
            <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-white tracking-tighter">$7,500</span>
                <span className="text-[10px] text-blue-200 font-bold uppercase tracking-widest opacity-60">Verified</span>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-[8px] font-bold text-blue-100/60 uppercase">Primary Heat: {lead.heatingSource || 'Electric'}</span>
                <div className="flex gap-1">
                    {[1,2,3,4].map(i => <div key={i} className="w-1 h-1 rounded-full bg-white/20" />)}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

const LeadField = ({ label, value, icon, active }: { label: string, value?: string, icon: React.ReactNode, active: boolean }) => (
    <div className={`group flex items-center justify-between py-4 transition-all duration-500 border-b border-white/5`}>
        <div className="flex items-center gap-5">
            <div className={`transition-colors ${value ? 'text-blue-500' : 'text-slate-800'}`}>
                {icon}
            </div>
            <div className="flex flex-col">
              <span className="text-[8px] font-black text-slate-600 uppercase tracking-[0.2em] mb-0.5">{label}</span>
              <span className={`text-[13px] font-bold transition-all ${value ? 'text-white' : active ? 'text-slate-700 animate-pulse-slow' : 'text-slate-800'}`}>
                  {value || (active ? 'Listening...' : 'Inactive')}
              </span>
            </div>
        </div>
        {value && (
          <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
        )}
    </div>
);
