import React from 'react';
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';

export default function RevenueCharts({ revenueData = [], statusData = [] }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-slate-100 dark:border-zinc-800 shadow-sm">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Analyse des Revenus</h3>
          <button className="text-sm font-medium text-orange-600 hover:text-orange-700">Voir détails</button>
        </div>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueData} barSize={48}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F97316" stopOpacity={1} />
                  <stop offset="95%" stopColor="#F97316" stopOpacity={0.7} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f055" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <Tooltip
                cursor={{ fill: '#f1f5f922' }}
                contentStyle={{
                  backgroundColor: 'white',
                  borderRadius: '16px',
                  border: '1px solid #f1f5f9',
                  boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1)',
                  padding: '12px 16px'
                }}
                itemStyle={{ color: '#1e293b', fontWeight: 600 }}
              />
              <Bar dataKey="revenue" fill="url(#colorRevenue)" radius={[12, 12, 12, 12]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-slate-100 dark:border-zinc-800 shadow-sm flex flex-col">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-8">Répartition</h3>
        <div className="flex-1 min-h-[250px] relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={85}
                paddingAngle={6}
                dataKey="value"
                stroke="none"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} cornerRadius={10} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none flex-col">
            <span className="text-4xl font-extrabold text-slate-800 dark:text-white tracking-tight">100%</span>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Total</span>
          </div>
        </div>
        <div className="mt-6 space-y-4">
          {statusData.map((item) => (
            <div key={item.name} className="flex items-center justify-between text-sm group cursor-default">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full shadow-sm ring-2 ring-white dark:ring-zinc-900" style={{ backgroundColor: item.color }} />
                <span className="text-slate-600 dark:text-slate-300 font-medium group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{item.name}</span>
              </div>
              <span className="font-bold text-slate-900 dark:text-white">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
