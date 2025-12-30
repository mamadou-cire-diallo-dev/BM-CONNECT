import React from 'react';
import { Briefcase, Clock, CheckCircle, TrendingUp } from 'lucide-react';

const DashboardStats = ({ stats }) => {
    const { totalDemandes, activeDemandes, completedDemandes, totalDepenses } = stats;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all group">
                <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                        <Briefcase size={24} />
                    </div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total</span>
                </div>
                <div>
                    <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-1">{totalDemandes}</h3>
                    <p className="text-sm text-gray-500 font-medium">Demandes totales</p>
                </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all group">
                <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform">
                        <Clock size={24} />
                    </div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">En Cours</span>
                </div>
                <div>
                    <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-1">{activeDemandes}</h3>
                    <p className="text-sm text-gray-500 font-medium">Interventions actives</p>
                </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all group">
                <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
                        <CheckCircle size={24} />
                    </div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Terminées</span>
                </div>
                <div>
                    <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-1">{completedDemandes}</h3>
                    <p className="text-sm text-gray-500 font-medium">Services finalisés</p>
                </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all group">
                <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-500 group-hover:scale-110 transition-transform">
                        <TrendingUp size={24} />
                    </div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Dépenses</span>
                </div>
                <div>
                    <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-1">{totalDepenses} €</h3>
                    <p className="text-sm text-gray-500 font-medium">Total facturé</p>
                </div>
            </div>
        </div>
    );
};

export default DashboardStats;
