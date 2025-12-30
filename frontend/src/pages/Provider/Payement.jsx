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
  Calendar,
  Download,
  Search,
  Filter,
  DollarSign,
  LayoutDashboard,
  History,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal
} from 'lucide-react';

import StatCard from '../../components/Provider/StatCard';
import StatusBadge from '../../components/Provider/StatusBadge';
import PaymentHeader from '../../components/Provider/Payement/PaymentHeader';
import RevenueCharts from '../../components/Provider/Payement/RevenueCharts';
import TransactionsList from '../../components/Provider/Payement/TransactionsList';
import PageHeader from '../../components/Provider/PageHeader';
import SectionHeader from '../../components/Provider/SectionHeader';
import SearchBar from '../../components/Provider/SearchBar';
import EmptyState from '../../components/Provider/EmptyState';
import PaginationFooter from '../../components/Provider/PaginationFooter';

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
      <PageHeader
        title="Paiements"
        subtitle="Gérez vos flux financiers en toute simplicité."
        actions={(
          <>
            <button className="flex items-center gap-2 bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 hover:bg-slate-50 dark:hover:bg-zinc-700 text-slate-700 dark:text-slate-200 px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all shadow-sm">
              <Calendar size={18} />
              <span>Cette Semaine</span>
            </button>
            <button className="flex items-center gap-2 bg-slate-900 dark:bg-orange-600 hover:bg-slate-800 dark:hover:bg-orange-700 text-white px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all shadow-lg hover:shadow-xl shadow-slate-900/20 dark:shadow-orange-600/20">
              <Download size={18} />
              Exporter
            </button>
          </>
        )}
      />

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
          <RevenueCharts revenueData={revenueData} statusData={statusData} />
        </div>
      )}

      {activeTab === 'transactions' && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <TransactionsList filteredTransactions={filteredTransactions} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
      )}

    </div>
  );
}
