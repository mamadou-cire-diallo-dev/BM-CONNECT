import React from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({ value, onChange, placeholder = 'Rechercher...', onFilter }) {
  return (
    <div className="flex items-center gap-3 w-full lg:w-auto">
      <div className="relative flex-1 lg:flex-none group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors" size={18} />
        <input
          type="text"
          placeholder={placeholder}
          className="pl-11 pr-5 py-3 bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-700/50 rounded-2xl text-sm font-medium focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none w-full lg:w-80 transition-all placeholder:text-slate-400"
          value={value}
          onChange={onChange}
        />
      </div>
      <button onClick={onFilter} className="p-3 bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-700/50 rounded-2xl hover:bg-slate-100 dark:hover:bg-zinc-700 transition-all text-slate-600 dark:text-slate-300">
        Filter
      </button>
    </div>
  );
}
