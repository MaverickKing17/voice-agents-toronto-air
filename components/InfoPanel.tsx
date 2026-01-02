import React from 'react';
import { LeadDetails } from '../types';
import { CheckCircle, Clock, Thermometer, User, Phone, ClipboardList, MapPin } from 'lucide-react';

interface InfoPanelProps {
  lead: Partial<LeadDetails>;
  isConnected: boolean;
}

export const InfoPanel: React.FC<InfoPanelProps> = ({ lead, isConnected }) => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm h-full flex flex-col">
      <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
        <ClipboardList className="w-5 h-5 text-sky-400" />
        Live Lead Capture
      </h3>

      <div className="space-y-6 flex-1">
        {/* Connection Status */}
        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
           <div className="flex items-center justify-between mb-2">
             <span className="text-slate-400 text-sm">System Status</span>
             <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${isConnected ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                {isConnected ? 'ONLINE' : 'OFFLINE'}
             </span>
           </div>
           <div className="flex items-center gap-2">
             <Clock className="w-4 h-4 text-sky-400" />
             <span className="text-white text-sm">Response Guarantee: 4 Hours</span>
           </div>
        </div>

        {/* Lead Details */}
        <div className="space-y-4">
            <div className={`p-4 rounded-lg border transition-colors duration-300 ${lead.name ? 'bg-sky-900/20 border-sky-500/30' : 'bg-slate-800/30 border-slate-700/30'}`}>
                <div className="flex items-center gap-3 mb-1">
                    <User className="w-4 h-4 text-slate-400" />
                    <span className="text-xs text-slate-400 uppercase tracking-wider">Customer Name</span>
                </div>
                <div className="text-lg text-white font-medium pl-7 min-h-[1.75rem]">
                    {lead.name || '---'}
                </div>
            </div>

            <div className={`p-4 rounded-lg border transition-colors duration-300 ${lead.phone ? 'bg-sky-900/20 border-sky-500/30' : 'bg-slate-800/30 border-slate-700/30'}`}>
                <div className="flex items-center gap-3 mb-1">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <span className="text-xs text-slate-400 uppercase tracking-wider">Contact</span>
                </div>
                <div className="text-lg text-white font-medium pl-7 min-h-[1.75rem]">
                    {lead.phone || '---'}
                </div>
            </div>

            <div className={`p-4 rounded-lg border transition-colors duration-300 ${lead.address ? 'bg-sky-900/20 border-sky-500/30' : 'bg-slate-800/30 border-slate-700/30'}`}>
                <div className="flex items-center gap-3 mb-1">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span className="text-xs text-slate-400 uppercase tracking-wider">Address</span>
                </div>
                <div className="text-lg text-white font-medium pl-7 min-h-[1.75rem]">
                    {lead.address || '---'}
                </div>
            </div>

            <div className={`p-4 rounded-lg border transition-colors duration-300 ${lead.type ? 'bg-sky-900/20 border-sky-500/30' : 'bg-slate-800/30 border-slate-700/30'}`}>
                <div className="flex items-center gap-3 mb-1">
                    <Thermometer className="w-4 h-4 text-slate-400" />
                    <span className="text-xs text-slate-400 uppercase tracking-wider">Inquiry Type</span>
                </div>
                <div className="text-lg text-white font-medium pl-7 min-h-[1.75rem] capitalize">
                    {lead.type || '---'}
                </div>
                {lead.heatingSource && (
                    <div className="mt-2 ml-7 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-sky-500/20 text-sky-300 text-xs border border-sky-500/20">
                        <CheckCircle className="w-3 h-3" />
                        {lead.heatingSource} Heating
                    </div>
                )}
            </div>
        </div>
      </div>
      
      {/* Rebate Footer */}
      <div className="mt-6 pt-6 border-t border-white/10">
        <div className="text-xs text-slate-400 mb-2">Current Promotion</div>
        <div className="text-sm text-emerald-400 font-medium">
          2026 GTA Heat Pump Rebate Active
        </div>
        <div className="text-2xl font-bold text-white tracking-tight">
          Up to $7,500
        </div>
      </div>
    </div>
  );
};