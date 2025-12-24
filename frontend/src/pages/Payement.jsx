import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  CreditCard,
  AlertCircle,
  CheckCircle2,
  Calendar,
  Download,
  Search,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  LayoutDashboard,
  History,
  User,
  FileText,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal
} from 'lucide-react';

// --- Mock Data ---
const transactionsData = [
  {
    id: "PAY-001",
    factureRef: "FAC-2024-001",
    service: "Réparation Plomberie",
    client: "Jean Dupont",
    email: "jean.d@example.com",
    datePaiement: "2024-03-15",
    montant: 150000,
    modePaye: "Orange Money",
    statut: "COMPLETED",
    avatarColor: "bg-blue-500"
  },
  {
    id: "PAY-002",
    factureRef: "FAC-2024-002",
    service: "Installation Électrique",
    client: "Marie Curie",
    email: "m.curie@science.org",
    datePaiement: "2024-03-14",
    montant: 450000,
    modePaye: "Cash",
    statut: "PENDING",
    avatarColor: "bg-purple-500"
  },
  {
    id: "PAY-003",
    factureRef: "FAC-2024-003",
    service: "Jardinage Complet",
    client: "Paul Pogba",
    email: "p.pogba@football.fr",
    datePaiement: "2024-03-12",
    montant: 75000,
    modePaye: "Mobile Money",
    statut: "COMPLETED",
    avatarColor: "bg-green-500"
  },
  {
    id: "PAY-004",
    factureRef: "FAC-2024-004",
    service: "Nettoyage Bureau",
    client: "Tech Solutions",
    email: "contact@techsol.com",
    datePaiement: "2024-03-10",
    montant: 200000,
    modePaye: "Virement",
    statut: "FAILED",
    avatarColor: "bg-orange-500"
  },
  {
    id: "PAY-005",
    factureRef: "FAC-2024-005",
    service: "Déménagement",
    client: "Alice Wonderland",
    email: "alice@wonder.land",
    datePaiement: "2024-03-08",
    montant: 300000,
    modePaye: "Orange Money",
    statut: "COMPLETED",
    avatarColor: "bg-pink-500"
  },
  { id: "PAY-006", factureRef: "FAC-2024-006", service: "Peinture", client: "Moussa Camara", email: "moussa.c@mail.gn", datePaiement: "2024-03-07", montant: 500000, modePaye: "Cash", statut: "COMPLETED", avatarColor: "bg-indigo-500" },
  { id: "PAY-007", factureRef: "FAC-2024-007", service: "Climatisation", client: "Fatou Diop", email: "f.diop@senegal.sn", datePaiement: "2024-03-06", montant: 250000, modePaye: "Orange Money", statut: "PENDING", avatarColor: "bg-teal-500" },
];

const revenueData = [
  { name: 'Lun', revenue: 450000 },
  { name: 'Mar', revenue: 320000 },
  { name: 'Mer', revenue: 550000 },
  { name: 'Jeu', revenue: 480000 },
  { name: 'Ven', revenue: 600000 },
  { name: 'Sam', revenue: 750000 },
  { name: 'Dim', revenue: 300000 },
];

const statusData = [
  { name: 'Payé', value: 65, color: '#22c55e' },
  { name: 'En attente', value: 25, color: '#f97316' },
  { name: 'Échoué', value: 10, color: '#ef4444' },
];

// Helper to get initials
const getInitials = (name) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const PaymentStatusBadge = ({ status }) => {
  const styles = {
    COMPLETED: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/50",
    PENDING: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border-amber-200 dark:border-amber-900/50",
    FAILED: "bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400 border-rose-200 dark:border-rose-900/50",
  };

  const label = {
    COMPLETED: "Payé",
    PENDING: "En attente",
    FAILED: "Échoué",
  };

  const icon = {
    COMPLETED: <CheckCircle2 size={14} className="stroke-[2.5]" />,
    PENDING: <ClockIcon size={14} className="stroke-[2.5]" />,
    FAILED: <AlertCircle size={14} className="stroke-[2.5]" />
  }

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 w-fit shadow-sm ${styles[status] || styles.PENDING}`}>
      {icon[status]}
      {label[status] || status}
    </span>
  );
};

// Helper for icon
const ClockIcon = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
);

const StatCard = ({ title, amount, percentage, icon: Icon, colorClass, trend }) => (
  <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-slate-100 dark:border-zinc-800 shadow-[0_2px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-lg transition-all duration-300 group">
    <div className="flex justify-between items-start mb-6">
      <div className={`p-3.5 rounded-2xl ${colorClass} bg-opacity-10 dark:bg-opacity-20 group-hover:scale-110 transition-transform duration-300`}>
        <Icon size={24} className={colorClass.replace("bg-", "text-")} />
      </div>
      <div className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 border ${trend === 'up'
          ? 'text-emerald-600 bg-emerald-50 border-emerald-100 dark:bg-emerald-900/20 dark:border-emerald-900'
          : 'text-rose-600 bg-rose-50 border-rose-100 dark:bg-rose-900/20 dark:border-rose-900'
        }`}>
        {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        {percentage}%
      </div>
    </div>
    <div>
      <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">{title}</p>
      <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">{amount}</h3>
    </div>
  </div>
);

export default function Payement() {
  const [activeTab, setActiveTab] = useState('overview'); // Defaulting to transactions for presentation
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTransactions = transactionsData.filter(t =>
    t.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.factureRef.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Paiements</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">Gérez vos flux financiers en toute simplicité.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 hover:bg-slate-50 dark:hover:bg-zinc-700 text-slate-700 dark:text-slate-200 px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all shadow-sm">
            <Calendar size={18} />
            <span>Cette Semaine</span>
          </button>
          <button className="flex items-center gap-2 bg-slate-900 dark:bg-orange-600 hover:bg-slate-800 dark:hover:bg-orange-700 text-white px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all shadow-lg hover:shadow-xl shadow-slate-900/20 dark:shadow-orange-600/20">
            <Download size={18} />
            Exporter
          </button>
        </div>
      </div>

      {/* Modern Tabs */}
      <div className="flex p-1 bg-slate-100 dark:bg-zinc-900/50 rounded-2xl w-fit">
        {['overview', 'transactions'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${activeTab === tab
                ? 'bg-white dark:bg-zinc-800 text-slate-900 dark:text-white shadow-sm scale-100'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 scale-95'
              }`}
          >
            {tab === 'overview' ? <LayoutDashboard size={18} /> : <History size={18} />}
            {tab === 'overview' ? 'Tableau de bord' : 'Historique'}
          </button>
        ))}
      </div>

      {/* Overview Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              title="Revenu Total (Mois)"
              amount="3 450 000 GNF"
              percentage={12.5}
              icon={DollarSign}
              colorClass="text-emerald-600 bg-emerald-100"
              trend="up"
            />
            <StatCard
              title="En Attente"
              amount="850 000 GNF"
              percentage={4.2}
              icon={AlertCircle}
              colorClass="text-amber-500 bg-amber-100"
              trend="down"
            />
            <StatCard
              title="Transactions Réussies"
              amount="145"
              percentage={8.1}
              icon={CreditCard}
              colorClass="text-blue-600 bg-blue-100"
              trend="up"
            />
          </div>

          {/* Charts Section */}
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
        </div>
      )}

      {activeTab === 'transactions' && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-slate-100 dark:border-zinc-800 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden min-h-[600px]">

            {/* Table Header Controls */}
            <div className="p-8 py-3 border-b border-slate-100 dark:border-zinc-800/50 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Historique des Transactions</h3>
                {/* <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                  Affiche les <span className="font-semibold text-slate-800 dark:text-slate-200">{filteredTransactions.length}</span> transactions récentes
                </p> */}
              </div>

              <div className="flex items-center gap-3 w-full lg:w-auto">
                <div className="relative flex-1 lg:flex-none group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors" size={18} />
                  <input
                    type="text"
                    placeholder="Rechercher une transaction..."
                    className="pl-11 pr-5 py-3 bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-700/50 rounded-2xl text-sm font-medium focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none w-full lg:w-80 transition-all placeholder:text-slate-400"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button className="p-3 bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-700/50 rounded-2xl hover:bg-slate-100 dark:hover:bg-zinc-700 transition-all text-slate-600 dark:text-slate-300">
                  <Filter size={20} />
                </button>
              </div>
            </div>

            {/* Mobile View (Enhanced Cards) */}
            <div className="block sm:hidden p-4 space-y-4">
              {filteredTransactions.map((transaction) => (
                <div key={transaction.id} className="bg-white dark:bg-zinc-800 p-5 rounded-2xl border border-slate-100 dark:border-zinc-700 shadow-sm active:scale-[0.98] transition-transform">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full ${transaction.avatarColor} bg-opacity-10 flex items-center justify-center text-white font-bold text-sm shadow-sm ring-2 ring-white dark:ring-zinc-700`}>
                        {getInitials(transaction.client)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white text-sm">{transaction.client}</p>
                        <p className="text-xs text-slate-400">{transaction.datePaiement}</p>
                      </div>
                    </div>
                    <PaymentStatusBadge status={transaction.statut} />
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Service</span>
                      <span className="font-medium text-slate-800 dark:text-slate-200">{transaction.service}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Référence</span>
                      <span className="font-medium text-slate-800 dark:text-slate-200">{transaction.factureRef}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-zinc-700 flex justify-between items-center">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-slate-100 dark:bg-zinc-700/50 px-2 py-1 rounded-lg">
                      {transaction.modePaye}
                    </div>
                    <span className="text-lg font-black text-slate-900 dark:text-white tracking-tight">{transaction.montant.toLocaleString()} GNF</span>
                  </div>
                </div>
              ))}
              {filteredTransactions.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                    <Search size={24} />
                  </div>
                  <p className="text-slate-500 font-medium">Aucune transaction trouvée.</p>
                </div>
              )}
            </div>

            {/* Desktop View (Award Winning Table) */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-800">
                    <th className="px-8 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Client & contact</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Détails Service</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Date</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Statut</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-right">Montant</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
                  {filteredTransactions.map((transaction) => (
                    <tr key={transaction.id} className="group hover:bg-slate-50/80 dark:hover:bg-zinc-800/40 transition-colors duration-200">
                      <td className="px-8 py-2">
                        <div className="flex items-center gap-4">
                          <div className={`w-11 h-11 rounded-full ${transaction.avatarColor} flex items-center justify-center text-white font-bold text-sm shadow-md ring-4 ring-white dark:ring-zinc-900 group-hover:scale-105 transition-transform duration-300`}>
                            {getInitials(transaction.client)}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 dark:text-white text-[15px]">{transaction.client}</div>
                            <div className="text-xs text-slate-500 font-medium mt-0.5 opacity- group-hover:opacity-100 transition-opacity duration-300">{transaction.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-2">
                        <div className="flex flex-col gap-1">
                          <span className="font-semibold text-slate-800 dark:text-slate-200 text-sm">{transaction.service}</span>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[11px] px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-zinc-800 text-slate-500 font-mono border border-slate-200 dark:border-zinc-700">
                              {transaction.factureRef}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-2">
                        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 font-medium">
                          <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-400">
                            <Calendar size={14} />
                          </div>
                          {new Date(transaction.datePaiement).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
                        </div>
                      </td>
                      <td className="px-6 py-2">
                        <PaymentStatusBadge status={transaction.statut} />
                      </td>
                      <td className="px-6 py-2 text-right">
                        <div className="font-black text-slate-900 dark:text-white text-sm tracking-tight">{transaction.montant.toLocaleString()} GNF</div>
                        <div className="text-xs text-slate-400 font-medium mt-0.5">{transaction.modePaye}</div>
                      </td>
                      <td className="px-6 py-2 text-center">
                        <button className="p-2 rounded-xl text-slate-400 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-500/10 transition-all opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 duration-200">
                          <MoreHorizontal size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Modern Pagination Footer */}
            <div className="p-6 py-2.5 border-t border-slate-100 dark:border-zinc-800 flex justify-between items-center bg-slate-50/30 dark:bg-zinc-800/20">
              <span className="text-sm text-slate-500 max-sm:hidden font-medium">
                Affichage de 1 à {filteredTransactions.length} sur {filteredTransactions.length} entrées
              </span>
              <div className="flex gap-2">
                <button className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 dark:border-zinc-700 text-slate-400 hover:border-slate-300 hover:text-slate-600 dark:hover:text-slate-200 transition-all disabled:opacity-50" disabled>
                  <ChevronLeft size={18} />
                </button>
                <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-900 dark:bg-orange-600 text-white shadow-md shadow-slate-900/10 font-bold text-sm">
                  1
                </button>
                <button className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 dark:border-zinc-700 text-slate-500 hover:bg-white hover:shadow-sm transition-all text-sm font-medium">
                  2
                </button>
                <button className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 dark:border-zinc-700 text-slate-500 hover:bg-white hover:shadow-sm transition-all text-sm font-medium">
                  3
                </button>
                <button className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 dark:border-zinc-700 text-slate-400 hover:border-slate-300 hover:text-slate-600 dark:hover:text-slate-200 transition-all">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
