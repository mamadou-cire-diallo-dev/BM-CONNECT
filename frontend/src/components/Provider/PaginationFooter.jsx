import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function PaginationFooter({ from, to, total, page = 1, onPageChange }) {
  return (
    <div className="p-6 py-2.5 border-t border-slate-100 dark:border-zinc-800 flex justify-between items-center bg-slate-50/30 dark:bg-zinc-800/20">
      <span className="text-sm text-slate-500 max-sm:hidden font-medium">Affichage de {from} à {to} sur {total} entrées</span>
      <div className="flex gap-2">
        <button onClick={() => onPageChange && onPageChange(page - 1)} className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 dark:border-zinc-700 text-slate-400 hover:border-slate-300 hover:text-slate-600 dark:hover:text-slate-200 transition-all disabled:opacity-50" disabled={page <= 1}>
          <ChevronLeft size={18} />
        </button>
        <button onClick={() => onPageChange && onPageChange(1)} className={`w-9 h-9 flex items-center justify-center rounded-xl ${page === 1 ? 'bg-slate-900 dark:bg-orange-600 text-white shadow-md font-bold text-sm' : 'border border-slate-200 dark:border-zinc-700 text-slate-500 hover:bg-white hover:shadow-sm transition-all text-sm font-medium'}`}>
          1
        </button>
        <button onClick={() => onPageChange && onPageChange(2)} className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 dark:border-zinc-700 text-slate-500 hover:bg-white hover:shadow-sm transition-all text-sm font-medium">2</button>
        <button onClick={() => onPageChange && onPageChange(3)} className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 dark:border-zinc-700 text-slate-500 hover:bg-white hover:shadow-sm transition-all text-sm font-medium">3</button>
        <button onClick={() => onPageChange && onPageChange(page + 1)} className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 dark:border-zinc-700 text-slate-400 hover:border-slate-300 hover:text-slate-600 dark:hover:text-slate-200 transition-all" disabled={page >= 3}>
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
