import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

export default function DistributionPanel({ distributionData = [], colors = [] }) {
  return (
    <div className=" bg-white dark:bg-zinc-900  p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-zinc-800">
      <h3 className="text-lg font-bold dark:text-white text-slate-800 mb-6">Répartition</h3>
      <div className="h-64 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={distributionData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {distributionData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        {/* Center Text */}
        <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
          <span className="text-3xl font-bold dark:text-white text-slate-800">100%</span>
          <span className="text-xs text-slate-400">Total</span>
        </div>
      </div>
      <div className="mt-6 space-y-3">
        {distributionData.map((item, index) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[index] }}></div>
              <span className="text-sm text-slate-600">{item.name}</span>
            </div>
            <span className="text-sm font-semibold text-slate-900">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
