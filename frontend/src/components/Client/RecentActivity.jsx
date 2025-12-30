import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Clock, FileText, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

const RecentActivity = ({ recentDemandes, latestInvoice }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Requests List */}
            <div className="lg:col-span-2 bg-white dark:bg-zinc-900 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-zinc-800 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">Demandes Récentes</h2>
                    <Link to="/client/requests" className="text-sm text-orange-600 font-semibold hover:text-orange-700 transition-colors">
                        Voir tout
                    </Link>
                </div>
                <div className="divide-y divide-gray-100 dark:divide-zinc-800">
                    {recentDemandes.length > 0 ? (
                        recentDemandes.map((demande) => (
                            <div key={demande.id} className="p-4 hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${demande.statut === 'COMPLETED' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30' :
                                    demande.statut === 'PENDING' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30' :
                                        'bg-blue-100 text-blue-600 dark:bg-blue-900/30'
                                    }`}>
                                    {demande.statut === 'COMPLETED' ? <CheckCircle size={18} /> : <Clock size={18} />}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-gray-900 dark:text-white truncate">{demande.service.titre}</h4>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{demande.description}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-gray-900 dark:text-white">{demande.service.prix} €</p>
                                    <p className="text-xs text-gray-400">{format(new Date(demande.date), "dd MMM")}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-8 text-center text-gray-500">Aucune demande récente.</div>
                    )}
                </div>
            </div>

            {/* Latest Invoice Card */}
            <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Dernière Facture</h2>
                {latestInvoice ? (
                    <div className="bg-gray-50 dark:bg-zinc-800/50 rounded-2xl p-5 border border-gray-100 dark:border-zinc-700">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-10 h-10 bg-white dark:bg-zinc-800 rounded-full flex items-center justify-center text-gray-400 shadow-sm border border-gray-100 dark:border-zinc-700">
                                <FileText size={20} />
                            </div>
                            <span className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 px-3 py-1 rounded-full text-xs font-bold">
                                PAYÉE
                            </span>
                        </div>
                        <div className="mb-4">
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Montant</p>
                            <h3 className="text-3xl font-black text-gray-900 dark:text-white">{latestInvoice.montantTotal} €</h3>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-zinc-700 pt-4 mt-2">
                            <span>{format(new Date(latestInvoice.dateEmission), "dd MMM yyyy")}</span>
                            <span className="font-mono">{latestInvoice.numero}</span>
                        </div>
                        <Link to="/client/invoices" className="mt-4 w-full py-2.5 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl text-sm font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors flex items-center justify-center">
                            Voir les factures
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-40 text-center text-gray-500">
                        <AlertCircle className="mb-2 text-gray-300" size={32} />
                        Pas de facture récente
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecentActivity;
