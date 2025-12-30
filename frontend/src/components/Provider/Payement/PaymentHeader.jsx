import React from 'react';
import { Calendar, Download } from 'lucide-react';

export default function PaymentHeader({ title = 'Paiements', subtitle = 'Gérez vos flux financiers en toute simplicité.', children }) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">{title}</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">{subtitle}</p>
      </div>
      <div className="flex items-center gap-3">
        {children ? children : (
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
      </div>
    </div>
  );
}
