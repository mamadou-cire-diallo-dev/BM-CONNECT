import React, { useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import {
  
  Users,
  ShoppingBag,
  
  TrendingUp,

  Activity
} from 'lucide-react';

// --- Mock Data ---
const distributionData = [
  { name: 'Services', value: 45 },
  { name: 'Produits', value: 30 },
  { name: 'Utilisateurs', value: 25 },
];

const activityData = [
  { name: 'Jan', revenue: 4000, users: 2400 },
  { name: 'Feb', revenue: 3000, users: 1398 },
  { name: 'Mar', revenue: 2000, users: 9800 },
  { name: 'Apr', revenue: 2780, users: 3908 },
  { name: 'May', revenue: 1890, users: 4800 },
  { name: 'Jun', revenue: 2390, users: 3800 },
  { name: 'Jul', revenue: 3490, users: 4300 },
];

const providerData = [
  { name: 'Transport', value: 85 },
  { name: 'Nettoyage', value: 65 },
  { name: 'Jardinage', value: 45 },
  { name: 'Bricolage', value: 30 },
  { name: 'Cuisine', value: 20 },
];

const COLORS = ['#F97316', '#0F172A', '#64748B']; // Orange, Dark Blue, Gray



const StatCard = ({ title, value, change, icon: Icon, color }) => (
  <div className="p-6 rounded-2xl shadow-sm border bg-white dark:bg-zinc-900 dark:border-zinc-800 border-slate-100 hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl ${color}`}>
        <Icon size={22} className="text-white" />
      </div>
      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${change >= 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
        }`}>
        {change >= 0 ? '+' : ''}{change}%
      </span>
    </div>
    {/* <h3 className="text-slate-500 text-sm font-medium mb-1">{title}</h3> */}
    <p className="text-2xl font-bold dark:text-white text-slate-800">{value}</p>
  </div>
);

const DashboardClient = () => {

  return (
    <div className="flex text-slate-900 transition-all  overflow-hidden">


      {/* Main Content */}
      <main className="flex-1 flex flex-col relative">

       

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-hidden">
          <div className="max-w-7xl mx-auto space-y-6">
            <div >
              <p className="text-2xl font-bold dark:text-white" >Bon retour Oumar</p>
              <p> </p>
            </div>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard title="Revenu Total" value="24 500 €" change={12.5} icon={TrendingUp} color="bg-orange-500" />
              <StatCard title="Commandes" value="1,240" change={-2.4} icon={ShoppingBag} color="bg-blue-600" />
              <StatCard title="Nouveaux Users" value="340" change={8.1} icon={Users} color="bg-indigo-500" />
              <StatCard title="Fournisseurs" value="48" change={4.3} icon={Activity} color="bg-emerald-500" />
            </div>

            {/* Charts Section 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Activity Area Chart */}
              <div className="lg:col-span-2 bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border dark:border-zinc-800 border-slate-100">
                <h3 className="text-lg font-bold dark:text-white text-slate-800 mb-6">Activité & Revenus</h3>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={activityData}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#F97316" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#f2F52C" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="#0F172A" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} />
                      <CartesianGrid vertical={false} stroke="#f1f5f9" />
                      <Tooltip
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      />
                      <Area type="monotone" dataKey="revenue" stroke="#F97316" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                      <Area type="monotone" dataKey="users" stroke="#0F172A" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Donut Chart */}
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
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                        <span className="text-sm text-slate-600">{item.name}</span>
                      </div>
                      <span className="text-sm font-semibold text-slate-900">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Charts Section 2 - Provider Categories */}
            {/* <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 mb-6">Catégories les plus populaires</h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={providerData} layout="vertical" barSize={20} margin={{ left: 20 }}>
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={100} tick={{ fill: '#475569', fontWeight: 500 }} />
                    <CartesianGrid horizontal={false} stroke="#f1f5f9" />
                    <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                      {providerData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 0 ? '#F97316' : '#E2E8F0'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div> */}

          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardClient;
