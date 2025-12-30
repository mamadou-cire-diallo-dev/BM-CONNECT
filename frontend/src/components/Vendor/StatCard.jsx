const StatCard = ({ title, value, change, icon: Icon, color }) => (
    <div className="p-6 rounded-2xl shadow-sm border bg-white dark:bg-zinc-900 dark:border-zinc-800 border-slate-100 hover:shadow-md transition-all duration-300">
        <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-xl ${color}`}>
                <Icon size={22} className="text-white" />
            </div>
            {change !== undefined && (
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${change >= 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                    }`}>
                    {change >= 0 ? '+' : ''}{change}%
                </span>
            )}
        </div>
        <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">{title}</h3>
        <p className="text-2xl font-bold dark:text-white text-slate-800">{value}</p>
    </div>
);

export default StatCard;
