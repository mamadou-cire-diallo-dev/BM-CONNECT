import React from 'react';
import SearchBar from '../SearchBar.jsx';
import { ChevronDown } from 'lucide-react';

export default function ServicesControls({ searchTerm, setSearchTerm, filters, setFilters, viewMode, setViewMode }) {
  return (
    <div className="sticky top-0 z-40 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-lg shadow-slate-200/50 dark:shadow-black/20">
      <div className="flex flex-col md:flex-row gap-4 items-center p-2">
        <SearchBar value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Rechercher par client, service, description..." onFilter={() => {}} />

        <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          {/* Status Filter */}
          <div className="relative flex-shrink-0">
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="appearance-none bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl py-3 pl-4 pr-10 text-slate-700 dark:text-slate-200 font-medium focus:outline-none cursor-pointer min-w-[160px]"
            >
              <option value="ALL">Tous les statuts</option>
              <option value="ACTIVE">En cours</option>
              <option value="PENDING">En attente</option>
              <option value="COMPLETED">Terminé</option>
              <option value="CANCELLED">Annulé</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
          </div>

          {/* View Toggles */}
          <div className="flex bg-slate-50 dark:bg-zinc-800 p-1 rounded-xl flex-shrink-0">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2.5 rounded-lg transition-all ${viewMode === "grid"
                ? "bg-white dark:bg-zinc-700 text-orange-600 shadow-md"
                : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2.5 rounded-lg transition-all ${viewMode === "list"
                ? "bg-white dark:bg-zinc-700 text-orange-600 shadow-md"
                : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 5a1 1 0 012 0v10a1 1 0 11-2 0V5zm4 0a1 1 0 012 0v10a1 1 0 11-2 0V5zm4 0a1 1 0 012 0v10a1 1 0 11-2 0V5z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
