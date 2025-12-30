import React, { useState } from "react";
import { FileText, Calendar, Clock, MapPin, Wallet, CreditCard, TrendingUp } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const RequestTabs = ({ demand, relevantPayments }) => {
    const [activeTab, setActiveTab] = useState("overview");

    return (
        <>
            {/* Tabs Navigation */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {['overview', 'timeline', 'invoices'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${activeTab === tab
                            ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-lg shadow-slate-900/20'
                            : 'bg-white dark:bg-zinc-900 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-zinc-800 border border-slate-100 dark:border-zinc-800'
                            }`}
                    >
                        {tab === 'overview' && 'Détails & Infos'}
                        {tab === 'timeline' && 'Suivi & Statut'}
                        {tab === 'invoices' && 'Factures & Paiements'}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-200/50 dark:shadow-black/50 border border-slate-100 dark:border-zinc-800 min-h-[400px]">
                {activeTab === 'overview' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                <FileText className="text-orange-500" size={20} />
                                Description du besoin
                            </h3>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm md:text-base bg-slate-50 dark:bg-zinc-800/50 p-6 rounded-2xl border border-slate-100 dark:border-zinc-800">
                                {demand.description || "Aucune description fournie pour ce projet."}
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                <Calendar className="text-orange-500" size={20} />
                                Détails de la demande
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-100 dark:border-zinc-800">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                        <Clock size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Date souhaitée</p>
                                        <p className="text-slate-900 dark:text-white font-medium">{format(new Date(demand.date), "dd MMMM yyyy", { locale: fr })}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-100 dark:border-zinc-800">
                                    <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Lieu</p>
                                        <p className="text-slate-900 dark:text-white font-medium">À domicile</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'invoices' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <Wallet className="text-orange-500" size={20} />
                            Historique des Paiements
                        </h3>

                        {relevantPayments.length === 0 ? (
                            <div className="text-center py-8 text-slate-400 italic bg-slate-50 dark:bg-zinc-800/30 rounded-2xl border border-dashed border-slate-200 dark:border-zinc-800">
                                Aucun paiement enregistré pour ce projet.
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {relevantPayments.map((paiement) => (
                                    <div key={paiement.id} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-100 dark:border-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${paiement.statut === 'PAYE' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-amber-100 text-amber-600'
                                                }`}>
                                                <CreditCard size={18} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900 dark:text-white">{paiement.montant.toLocaleString()} GNF</p>
                                                <p className="text-xs text-slate-500">{format(new Date(paiement.datePaiement), "dd MMM yyyy", { locale: fr })} • {paiement.modePaiement}</p>
                                            </div>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${paiement.statut === 'PAYE' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-amber-100 text-amber-700'
                                            }`}>
                                            {paiement.statut}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'timeline' && (
                    <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                        <TrendingUp size={48} className="mb-4 opacity-20" />
                        <p>Le suivi détaillé sera disponible bientôt.</p>
                    </div>
                )}
            </div>
        </>
    );
};

export default RequestTabs;
