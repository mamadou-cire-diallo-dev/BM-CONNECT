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
import SectionHeader from '../../components/Provider/SectionHeader';
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

import ActivityCharts from '../../components/Provider/Dashboard/ActivityCharts';
import DistributionPanel from '../../components/Provider/Dashboard/DistributionPanel';



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

const Dashboard = () => {

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
              <ActivityCharts activityData={activityData} />
              <DistributionPanel distributionData={distributionData} colors={COLORS} />
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

export default Dashboard;
