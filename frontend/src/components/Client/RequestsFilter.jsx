import React from 'react';
import { Search } from 'lucide-react';

const RequestsFilter = ({ searchTerm, setSearchTerm, statusFilter, setStatusFilter }) => {
    return (
        <div className="bg-white dark:bg-zinc-900 p-2 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm flex flex-col md:flex-row gap-4 md:gap-2">
            <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                    type="text"
                    placeholder="Rechercher par titre, description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-transparent border-none text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-0"
                />
            </div>
            <div className="h-px md:h-12 w-full md:w-px bg-gray-100 dark:bg-zinc-800 mx-2"></div>
            <div className="flex items-center gap-1 overflow-x-auto pb-2 md:pb-0 hide-scrollbar px-2">
                {['ALL', 'PENDING', 'ACTIVE', 'COMPLETED', 'CANCELED'].map(status => (
                    <button
                        key={status}
                        onClick={() => setStatusFilter(status)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${statusFilter === status
                            ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md'
                            : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-zinc-800'
                            }`}
                    >
                        {status === 'ALL' ? 'Tout' : status}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default RequestsFilter;
