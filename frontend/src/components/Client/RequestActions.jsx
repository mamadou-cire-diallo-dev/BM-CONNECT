import React from "react";
import { Wallet, ChevronRight, CheckCircle2, Download, AlertCircle } from "lucide-react";

const RequestActions = ({ demand, setIsDiagnosticModalOpen, setIsServicePaymentModalOpen }) => {
    return (
        <div className="space-y-6">

            {/* Actions Box */}
            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-xl shadow-slate-200/50 dark:shadow-black/50 border border-slate-100 dark:border-zinc-800">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">Actions</h3>
                <div className="space-y-3">
                    {/* DIAGNOSTIC PAYMENT */}
                    {demand.statut === 'ACCEPTED' && !demand.isDiagnosticPaid && (
                        <button
                            onClick={() => setIsDiagnosticModalOpen(true)}
                            className="w-full flex items-center justify-between p-4 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold transition-all shadow-lg shadow-orange-500/30 group animate-pulse"
                        >
                            <span className="flex items-center gap-2">
                                <Wallet size={18} />
                                Payer Diagnostic
                            </span>
                            <div className="flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded text-xs">
                                {demand.fraisDiagnostique?.toLocaleString()} GNF
                            </div>
                        </button>
                    )}

                    {/* SERVICE PAYMENT */}
                    {demand.isDiagnosticPaid && demand.service.prix && !demand.isServicePaid && (
                        <button
                            onClick={() => setIsServicePaymentModalOpen(true)}
                            className="w-full flex items-center justify-between p-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-all shadow-lg shadow-emerald-500/30 group"
                        >
                            <span className="flex items-center gap-2">
                                <Wallet size={18} />
                                Payer Service (Momo)
                            </span>
                            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    )}

                    {demand.isServicePaid && (
                        <div className="w-full flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-zinc-800 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-100 dark:border-emerald-900/30">
                            <span className="flex items-center gap-2">
                                <CheckCircle2 size={18} />
                                Tout est payé
                            </span>
                        </div>
                    )}

                    <button className="w-full flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-700 text-slate-700 dark:text-slate-300 font-medium transition-all group border border-slate-100 dark:border-zinc-700">
                        <span className="flex items-center gap-2">
                            <Download size={18} />
                            Télécharger facture
                        </span>
                    </button>

                    <button className="w-full flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-zinc-800 text-red-600 dark:text-red-400 font-medium transition-all group border border-slate-100 dark:border-zinc-700 hover:bg-red-50 dark:hover:bg-red-900/20">
                        <span className="flex items-center gap-2">
                            <AlertCircle size={18} />
                            Signaler un problème
                        </span>
                    </button>
                </div>
            </div>

            {/* Support Info */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-zinc-900 dark:to-black rounded-3xl p-6 shadow-xl shadow-slate-200/50 dark:shadow-black/50 text-white border border-slate-700 dark:border-zinc-800">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-4">Besoin d'aide ?</h3>
                <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                    Notre équipe est disponible 24/7 pour vous assister en cas de problème avec votre prestataire.
                </p>
                <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold transition-all border border-white/10">
                    Contactez le support
                </button>
            </div>

        </div>
    );
};

export default RequestActions;
