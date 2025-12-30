import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

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

export default StatCard;
