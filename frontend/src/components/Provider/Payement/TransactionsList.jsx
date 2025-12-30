import React from 'react';
import { Search, Filter, Calendar, MoreHorizontal } from 'lucide-react';
import StatusBadge from '../StatusBadge';
import SearchBar from '../SearchBar';

export default function TransactionsList({ filteredTransactions = [], searchTerm = '', setSearchTerm = () => {} }) {
  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-slate-100 dark:border-zinc-800 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden min-h-[600px]">
        <div className="p-8 py-3 border-b border-slate-100 dark:border-zinc-800/50 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Historique des Transactions</h3>
          </div>

          <div className="flex items-center gap-3 w-full lg:w-auto">
            <div className="relative flex-1 lg:flex-none group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors" size={18} />
              <input
                type="text"
                placeholder="Rechercher une transaction..."
                className="pl-11 pr-5 py-3 bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-700/50 rounded-2xl text-sm font-medium focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none w-full lg:w-80 transition-all placeholder:text-slate-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="p-3 bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-700/50 rounded-2xl hover:bg-slate-100 dark:hover:bg-zinc-700 transition-all text-slate-600 dark:text-slate-300">
              <Filter size={20} />
            </button>
          </div>
        </div>

        <div className="block sm:hidden p-4 space-y-4">
          {filteredTransactions.map((transaction) => (
            <div key={transaction.id} className="bg-white dark:bg-zinc-800 p-5 rounded-2xl border border-slate-100 dark:border-zinc-700 shadow-sm active:scale-[0.98] transition-transform">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${transaction.avatarColor} bg-opacity-10 flex items-center justify-center text-white font-bold text-sm shadow-sm ring-2 ring-white dark:ring-zinc-700`}>
                    {getInitials(transaction.client)}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white text-sm">{transaction.client}</p>
                    <p className="text-xs text-slate-400">{transaction.datePaiement}</p>
                  </div>
                </div>
                <StatusBadge status={transaction.statut} />
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Service</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">{transaction.service}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Référence</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">{transaction.factureRef}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-zinc-700 flex justify-between items-center">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-slate-100 dark:bg-zinc-700/50 px-2 py-1 rounded-lg">
                  {transaction.modePaye}
                </div>
                <span className="text-lg font-black text-slate-900 dark:text-white tracking-tight">{transaction.montant.toLocaleString()} GNF</span>
              </div>
            </div>
          ))}
          {filteredTransactions.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                <Search size={24} />
              </div>
              <p className="text-slate-500 font-medium">Aucune transaction trouvée.</p>
            </div>
          )}
        </div>

        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-800">
                <th className="px-8 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Client & contact</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Détails Service</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Date</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Statut</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-right">Montant</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="group hover:bg-slate-50/80 dark:hover:bg-zinc-800/40 transition-colors duration-200">
                  <td className="px-8 py-2">
                    <div className="flex items-center gap-4">
                      <div className={`w-11 h-11 rounded-full ${transaction.avatarColor} flex items-center justify-center text-white font-bold text-sm shadow-md ring-4 ring-white dark:ring-zinc-900 group-hover:scale-105 transition-transform duration-300`}>
                        {getInitials(transaction.client)}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white text-[15px]">{transaction.client}</div>
                        <div className="text-xs text-slate-500 font-medium mt-0.5 opacity- group-hover:opacity-100 transition-opacity duration-300">{transaction.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-2">
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-slate-800 dark:text-slate-200 text-sm">{transaction.service}</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-zinc-800 text-slate-500 font-mono border border-slate-200 dark:border-zinc-700">
                          {transaction.factureRef}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-2">
                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 font-medium">
                      <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-400">
                        <Calendar size={14} />
                      </div>
                      {new Date(transaction.datePaiement).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>
                  </td>
                  <td className="px-6 py-2">
                    <StatusBadge status={transaction.statut} />
                  </td>
                  <td className="px-6 py-2 text-right">
                    <div className="font-black text-slate-900 dark:text-white text-sm tracking-tight">{transaction.montant.toLocaleString()} GNF</div>
                    <div className="text-xs text-slate-400 font-medium mt-0.5">{transaction.modePaye}</div>
                  </td>
                  <td className="px-6 py-2 text-center">
                    <button className="p-2 rounded-xl text-slate-400 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-500/10 transition-all opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 duration-200">
                      <MoreHorizontal size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-6 py-2.5 border-t border-slate-100 dark:border-zinc-800 flex justify-between items-center bg-slate-50/30 dark:bg-zinc-800/20">
          <span className="text-sm text-slate-500 max-sm:hidden font-medium">
            Affichage de 1 à {filteredTransactions.length} sur {filteredTransactions.length} entrées
          </span>
          <div className="flex gap-2">
            <button className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 dark:border-zinc-700 text-slate-400 hover:border-slate-300 hover:text-slate-600 dark:hover:text-slate-200 transition-all disabled:opacity-50" disabled>
              ‹
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-900 dark:bg-orange-600 text-white shadow-md shadow-slate-900/10 font-bold text-sm">
              1
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 dark:border-zinc-700 text-slate-500 hover:bg-white hover:shadow-sm transition-all text-sm font-medium">
              2
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 dark:border-zinc-700 text-slate-500 hover:bg-white hover:shadow-sm transition-all text-sm font-medium">
              3
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 dark:border-zinc-700 text-slate-400 hover:border-slate-300 hover:text-slate-600 dark:hover:text-slate-200 transition-all">
              ›
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
