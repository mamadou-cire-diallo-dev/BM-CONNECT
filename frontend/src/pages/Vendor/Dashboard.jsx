import { TrendingUp, ShoppingBag, Package, Users, BarChart3, Clock } from "lucide-react";
import StatCard from "../../components/Vendor/StatCard";
import {
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

const salesData = [
    { name: 'Lun', sales: 4000, orders: 24 },
    { name: 'Mar', sales: 3000, orders: 18 },
    { name: 'Mer', sales: 2000, orders: 15 },
    { name: 'Jeu', sales: 2780, orders: 22 },
    { name: 'Ven', sales: 1890, orders: 12 },
    { name: 'Sam', sales: 2390, orders: 20 },
    { name: 'Dim', sales: 3490, orders: 30 },
];

const topProducts = [
    { name: 'Product A', sales: 120, revenue: 2400 },
    { name: 'Product B', sales: 98, revenue: 1960 },
    { name: 'Product C', sales: 86, revenue: 1720 },
    { name: 'Product D', sales: 72, revenue: 1440 },
    { name: 'Product E', sales: 45, revenue: 900 },
];

const Dashboard = () => {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold dark:text-white">Tableau de Bord Vendeur</h1>
                <p className="text-slate-500 dark:text-slate-400">Bienvenue, voici un aperçu de votre boutique aujourd'hui.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Ventes Totales" value="12,450 €" change={15.2} icon={TrendingUp} color="bg-orange-500" />
                <StatCard title="Commandes" value="156" change={8.4} icon={ShoppingBag} color="bg-blue-600" />
                <StatCard title="Produits Actifs" value="48" change={2.1} icon={Package} color="bg-indigo-500" />
                <StatCard title="Clients" value="1.2k" change={5.7} icon={Users} color="bg-emerald-500" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Sales Chart */}
                <div className="lg:col-span-2 bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-zinc-800">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold dark:text-white flex items-center gap-2">
                            <BarChart3 className="text-orange-500" size={20} />
                            Aperçu des Ventes
                        </h3>
                        <select className="bg-slate-50 dark:bg-zinc-800 border-none rounded-lg text-sm px-3 py-1 dark:text-white outline-none">
                            <option>7 derniers jours</option>
                            <option>30 derniers jours</option>
                        </select>
                    </div>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={salesData}>
                                <defs>
                                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#F97316" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" className="dark:stroke-zinc-800" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', backgroundColor: '#fff' }}
                                />
                                <Area type="monotone" dataKey="sales" stroke="#F97316" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Recent Orders / Performance */}
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-zinc-800">
                    <h3 className="text-lg font-bold dark:text-white mb-6 flex items-center gap-2">
                        <Clock className="text-orange-500" size={20} />
                        Top Produits
                    </h3>
                    <div className="space-y-6">
                        {topProducts.map((product, index) => (
                            <div key={index} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-zinc-800 flex items-center justify-center font-bold text-slate-500">
                                        {index + 1}
                                    </div>
                                    <div>
                                        <p className="font-medium dark:text-white text-sm">{product.name}</p>
                                        <p className="text-xs text-slate-500">{product.sales} ventes</p>
                                    </div>
                                </div>
                                <p className="font-bold text-orange-500">{product.revenue} €</p>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-8 py-3 rounded-xl border border-slate-100 dark:border-zinc-800 text-sm font-medium hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors">
                        Voir tous les produits
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
