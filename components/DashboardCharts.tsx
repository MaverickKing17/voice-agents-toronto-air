import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const DATA = [
  { name: 'Mon', calls: 24, emergency: 4 },
  { name: 'Tue', calls: 30, emergency: 7 },
  { name: 'Wed', calls: 45, emergency: 12 }, // Spike due to cold snap maybe
  { name: 'Thu', calls: 28, emergency: 5 },
  { name: 'Fri', calls: 35, emergency: 8 },
  { name: 'Sat', calls: 15, emergency: 3 },
  { name: 'Sun', calls: 12, emergency: 2 },
];

export const DashboardCharts: React.FC = () => {
  return (
    <div className="h-full w-full flex flex-col">
       <h4 className="text-sm font-medium text-slate-400 mb-4 px-2">Weekly Call Volume</h4>
       <div className="flex-1 min-h-[150px]">
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={DATA}>
                <XAxis 
                    dataKey="name" 
                    tick={{ fill: '#94a3b8', fontSize: 10 }} 
                    axisLine={false} 
                    tickLine={false} 
                />
                <YAxis hide />
                <Tooltip 
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
                />
                <Bar dataKey="calls" radius={[4, 4, 0, 0]}>
                    {DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.calls > 30 ? '#0ea5e9' : '#334155'} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
       </div>
    </div>
  );
};
