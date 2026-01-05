
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const DATA = [
  { name: 'MON', calls: 24 },
  { name: 'TUE', calls: 30 },
  { name: 'WED', calls: 45 },
  { name: 'THU', calls: 28 },
  { name: 'FRI', calls: 35 },
  { name: 'SAT', calls: 15 },
  { name: 'SUN', calls: 12 },
];

export const DashboardCharts: React.FC = () => {
  return (
    <div className="h-full w-full flex flex-col">
       <div className="flex items-center justify-between mb-10">
          <div>
            <h4 className="text-[12px] font-black text-blue-400 uppercase tracking-[0.4em] mb-2 drop-shadow-md">ANALYTICS ENGINE</h4>
            <div className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none shadow-sm">System Velocity</div>
          </div>
          <div className="flex flex-col items-end">
            <div className="text-2xl font-black text-emerald-400 font-mono tracking-tighter drop-shadow-lg">+12.4%</div>
            <div className="text-[10px] text-white/50 font-bold uppercase tracking-widest">Efficiency Delta</div>
          </div>
       </div>

       <div className="flex-1 min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={1} />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.8} />
                  </linearGradient>
                </defs>
                <XAxis 
                    dataKey="name" 
                    tick={{ fill: '#ffffff', fontSize: 13, fontWeight: 900, letterSpacing: '0.1em' }} 
                    axisLine={false} 
                    tickLine={false} 
                    dy={16}
                />
                <YAxis hide domain={[0, 'dataMax + 10']} />
                <Tooltip 
                    cursor={{ fill: 'rgba(255,255,255,0.08)', radius: 12 }}
                    contentStyle={{ 
                      backgroundColor: '#000814', 
                      borderRadius: '24px', 
                      border: '2px solid rgba(255,255,255,0.2)',
                      boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.8)',
                      padding: '16px 24px'
                    }}
                    labelStyle={{ display: 'none' }}
                    itemStyle={{ color: '#fff', fontSize: '14px', fontWeight: '900', textTransform: 'uppercase', fontFamily: 'Inter' }}
                />
                <Bar 
                  dataKey="calls" 
                  radius={[12, 12, 0, 0]}
                  animationDuration={2500}
                >
                    {DATA.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.calls > 30 ? 'url(#barGrad)' : 'rgba(255, 255, 255, 0.15)'} 
                          className="hover:opacity-100 transition-all duration-500 cursor-pointer"
                        />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
       </div>
    </div>
  );
};
