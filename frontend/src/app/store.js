import { configureStore } from '@reduxjs/toolkit'
import themeReducer from '../features/themeSlice'

export const store = configureStore({
    reducer: {
        theme: themeReducer,
    },
})


// import React, { useState } from 'react';
// import {
//   PieChart,
//   Pie,
//   Cell,
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   Legend
// } from 'recharts';
// import {
//   LayoutDashboard,
//   Users,
//   ShoppingBag,
//   Settings,
//   LogOut,
//   Bell,
//   Search,
//   Menu,
//   TrendingUp,
//   Package,
//   CreditCard,
//   Activity
// } from 'lucide-react';

// // --- Mock Data ---
// const distributionData = [
//   { name: 'Services', value: 45 },
//   { name: 'Produits', value: 30 },
//   { name: 'Utilisateurs', value: 25 },
// ];

// const activityData = [
//   { name: 'Jan', revenue: 4000, users: 2400 },
//   { name: 'Feb', revenue: 3000, users: 1398 },
//   { name: 'Mar', revenue: 2000, users: 9800 },
//   { name: 'Apr', revenue: 2780, users: 3908 },
//   { name: 'May', revenue: 1890, users: 4800 },
//   { name: 'Jun', revenue: 2390, users: 3800 },
//   { name: 'Jul', revenue: 3490, users: 4300 },
// ];

// const providerData = [
//   { name: 'Transport', value: 85 },
//   { name: 'Nettoyage', value: 65 },
//   { name: 'Jardinage', value: 45 },
//   { name: 'Bricolage', value: 30 },
//   { name: 'Cuisine', value: 20 },
// ];

// const COLORS = ['#F97316', '#0F172A', '#64748B']; // Orange, Dark Blue, Gray

// const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
//   <button
//     onClick={onClick}
//     className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all duration-200 group ${active
//         ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
//         : 'text-slate-400 hover:bg-slate-800 hover:text-white'
//       }`}
//   >
//     <Icon size={20} />
//     <span className="font-medium">{label}</span>
//     {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white" />}
//   </button>
// );

// const StatCard = ({ title, value, change, icon: Icon, color }) => (
//   <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
//     <div className="flex justify-between items-start mb-4">
//       <div className={`p-3 rounded-xl ${color}`}>
//         <Icon size={22} className="text-white" />
//       </div>
//       <span className={`text-xs font-semibold px-2 py-1 rounded-full ${change >= 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
//         }`}>
//         {change >= 0 ? '+' : ''}{change}%
//       </span>
//     </div>
//     <h3 className="text-slate-500 text-sm font-medium mb-1">{title}</h3>
//     <p className="text-2xl font-bold text-slate-800">{value}</p>
//   </div>
// );

// const DashboardClient = () => {
//   const [activeTab, setActiveTab] = useState('dashboard');
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   return (
//     <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">

//       {/* Sidebar */}
//       <aside
//         className={`bg-[#0F172A] flex flex-col transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'
//           } h-screen fixed lg:static z-50`}
//       >
//         <div className="p-6 flex items-center justify-between">
//           <div className={`flex items-center gap-3 ${!isSidebarOpen && 'justify-center w-full'}`}>
//             {/* Logo Placeholder - You can replace with an img tag */}
//             <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center shrink-0">
//               <span className="text-white font-bold text-xs">BM</span>
//             </div>
//             {isSidebarOpen && <span className="text-white font-bold text-xl tracking-tight">CONNECT</span>}
//           </div>
//         </div>

//         <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
//           <SidebarItem icon={LayoutDashboard} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
//           <SidebarItem icon={ShoppingBag} label="Commandes" active={activeTab === 'orders'} onClick={() => setActiveTab('orders')} />
//           <SidebarItem icon={Users} label="Utilisateurs" active={activeTab === 'users'} onClick={() => setActiveTab('users')} />
//           <SidebarItem icon={Package} label="Services" active={activeTab === 'services'} onClick={() => setActiveTab('services')} />
//           <SidebarItem icon={CreditCard} label="Finance" active={activeTab === 'finance'} onClick={() => setActiveTab('finance')} />
//           <div className="pt-8 pb-2">
//             <p className={`px-4 text-xs text-slate-500 font-semibold uppercase tracking-wider mb-2 ${!isSidebarOpen && 'hidden'}`}>
//               Support
//             </p>
//             <SidebarItem icon={Settings} label="Paramètres" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
//           </div>
//         </nav>

//         <div className="p-4 border-t border-slate-800">
//           <button className="flex items-center gap-3 w-full px-4 py-3 text-slate-400 hover:text-white transition-colors">
//             <LogOut size={20} />
//             {isSidebarOpen && <span className="font-medium">Déconnexion</span>}
//           </button>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 flex flex-col h-screen overflow-hidden relative">

//         {/* Header */}
//         <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 lg:px-8 z-40">
//           <div className="flex items-center gap-4">
//             <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-slate-100 rounded-lg lg:hidden">
//               <Menu size={20} className="text-slate-600" />
//             </button>
//             <div className="relative hidden md:block w-96">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
//               <input
//                 type="text"
//                 placeholder="Rechercher..."
//                 className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-full focus:ring-2 focus:ring-orange-500/20 text-sm outline-none transition-all placeholder:text-slate-400"
//               />
//             </div>
//           </div>

//           <div className="flex items-center gap-4">
//             <button className="relative p-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors">
//               <Bell size={20} />
//               <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full border-2 border-white"></span>
//             </button>
//             <div className="h-8 w-8 rounded-full bg-slate-200 overflow-hidden border-2 border-white shadow-sm">
//               <div className="w-full h-full bg-gradient-to-tr from-orange-400 to-orange-600 flex items-center justify-center text-white text-xs font-bold">
//                 AD
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* Scrollable Content */}
//         <div className="flex-1 overflow-y-auto p-6 lg:p-8">
//           <div className="max-w-7xl mx-auto space-y-8">

//             {/* Header Section */}
//             <div>
//               <h1 className="text-2xl font-bold text-slate-900">Vue d'ensemble</h1>
//               <p className="text-slate-500">Bienvenue sur votre tableau de bord BM-CONNECT.</p>
//             </div>

//             {/* Stats Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//               <StatCard title="Revenu Total" value="24 500 €" change={12.5} icon={TrendingUp} color="bg-orange-500" />
//               <StatCard title="Commandes" value="1,240" change={-2.4} icon={ShoppingBag} color="bg-blue-600" />
//               <StatCard title="Nouveaux Users" value="340" change={8.1} icon={Users} color="bg-indigo-500" />
//               <StatCard title="Fournisseurs" value="48" change={4.3} icon={Activity} color="bg-emerald-500" />
//             </div>

//             {/* Charts Section 1 */}
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//               {/* Activity Area Chart */}
//               <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
//                 <h3 className="text-lg font-bold text-slate-800 mb-6">Activité & Revenus</h3>
//                 <div className="h-80 w-full">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <AreaChart data={activityData}>
//                       <defs>
//                         <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
//                           <stop offset="5%" stopColor="#F97316" stopOpacity={0.2} />
//                           <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
//                         </linearGradient>
//                         <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
//                           <stop offset="5%" stopColor="#0F172A" stopOpacity={0.2} />
//                           <stop offset="95%" stopColor="#0F172A" stopOpacity={0} />
//                         </linearGradient>
//                       </defs>
//                       <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} />
//                       <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} />
//                       <CartesianGrid vertical={false} stroke="#f1f5f9" />
//                       <Tooltip
//                         contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
//                       />
//                       <Area type="monotone" dataKey="revenue" stroke="#F97316" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
//                       <Area type="monotone" dataKey="users" stroke="#0F172A" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" />
//                     </AreaChart>
//                   </ResponsiveContainer>
//                 </div>
//               </div>

//               {/* Donut Chart */}
//               <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
//                 <h3 className="text-lg font-bold text-slate-800 mb-6">Répartition</h3>
//                 <div className="h-64 w-full relative">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <PieChart>
//                       <Pie
//                         data={distributionData}
//                         cx="50%"
//                         cy="50%"
//                         innerRadius={60}
//                         outerRadius={80}
//                         paddingAngle={5}
//                         dataKey="value"
//                       >
//                         {distributionData.map((entry, index) => (
//                           <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                         ))}
//                       </Pie>
//                       <Tooltip />
//                     </PieChart>
//                   </ResponsiveContainer>
//                   {/* Center Text */}
//                   <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
//                     <span className="text-3xl font-bold text-slate-800">100%</span>
//                     <span className="text-xs text-slate-400">Total</span>
//                   </div>
//                 </div>
//                 <div className="mt-6 space-y-3">
//                   {distributionData.map((item, index) => (
//                     <div key={item.name} className="flex items-center justify-between">
//                       <div className="flex items-center gap-2">
//                         <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
//                         <span className="text-sm text-slate-600">{item.name}</span>
//                       </div>
//                       <span className="text-sm font-semibold text-slate-900">{item.value}%</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Charts Section 2 - Provider Categories */}
//             <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
//               <h3 className="text-lg font-bold text-slate-800 mb-6">Catégories les plus populaires</h3>
//               <div className="h-64 w-full">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <BarChart data={providerData} layout="vertical" barSize={20} margin={{ left: 20 }}>
//                     <XAxis type="number" hide />
//                     <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={100} tick={{ fill: '#475569', fontWeight: 500 }} />
//                     <CartesianGrid horizontal={false} stroke="#f1f5f9" />
//                     <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
//                     <Bar dataKey="value" radius={[0, 4, 4, 0]}>
//                       {providerData.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={index === 0 ? '#F97316' : '#E2E8F0'} />
//                       ))}
//                     </Bar>
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>

//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default DashboardClient;
