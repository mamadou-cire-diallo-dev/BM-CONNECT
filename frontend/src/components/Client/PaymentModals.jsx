import React from "react";
import { Wallet, ShieldCheck, CheckCircle2 } from "lucide-react";

const PaymentModals = ({
    isDiagnosticModalOpen,
    setIsDiagnosticModalOpen,
    isServicePaymentModalOpen,
    setIsServicePaymentModalOpen,
    demand,
    handleDiagnosticPayment,
    handleServicePayment
}) => {
    return (
        <>
            {/* Diagnostic Payment Modal */}
            {isDiagnosticModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl scale-100 animate-in zoom-in-95 duration-200 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-2 bg-orange-600"></div>

                        <div className="mb-6 text-center">
                            <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Wallet size={32} />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Payer le diagnostic</h3>
                            <p className="text-slate-500 text-sm">Des frais de déplacement et de diagnostic s'appliquent.</p>
                        </div>

                        <div className="bg-slate-50 dark:bg-zinc-800/50 p-4 rounded-xl mb-8 flex justify-between items-center border border-slate-100 dark:border-zinc-800">
                            <span className="font-bold text-slate-700 dark:text-slate-300">Montant à payer</span>
                            <span className="font-black text-xl text-slate-900 dark:text-white">{demand.fraisDiagnostique?.toLocaleString()} GNF</span>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setIsDiagnosticModalOpen(false)}
                                className="flex-1 py-3 rounded-xl font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={handleDiagnosticPayment}
                                className="flex-1 py-3 rounded-xl font-bold text-white bg-orange-600 hover:bg-orange-700 shadow-lg shadow-orange-500/30 transition-all"
                            >
                                Payer maintenant
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Service Payment Modal (MOMO) */}
            {isServicePaymentModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl scale-100 animate-in zoom-in-95 duration-200 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500"></div>

                        <div className="mb-6 text-center">
                            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <ShieldCheck size={32} />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Paiement Sécurisé</h3>
                            <p className="text-slate-500 text-sm">Réglez la prestation via Mobile Money.</p>
                        </div>

                        <div className="space-y-4 mb-8">
                            <div className="bg-slate-50 dark:bg-zinc-800/50 p-4 rounded-xl flex justify-between items-center border border-slate-100 dark:border-zinc-800">
                                <span className="font-bold text-slate-700 dark:text-slate-300">Montant Total</span>
                                <span className="font-black text-xl text-slate-900 dark:text-white">{demand.service.prix?.toLocaleString()} GNF</span>
                            </div>

                            <div className="p-4 rounded-xl border-2 border-orange-500 bg-orange-50 dark:bg-orange-900/10 flex items-center gap-4 cursor-pointer relative overflow-hidden">
                                <div className="absolute top-0 right-0 bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-bl-lg">RECOMMANDÉ</div>
                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                                    <span className="font-black text-orange-600 text-xs">OM</span>
                                </div>
                                <div className="flex-1">
                                    <p className="font-bold text-slate-900 dark:text-white">Orange Money</p>
                                    <p className="text-xs text-slate-500">Paiement rapide et sécurisé</p>
                                </div>
                                <CheckCircle2 size={20} className="text-orange-500" fill="currentColor" />
                            </div>

                            <div className="p-4 rounded-xl border border-slate-200 dark:border-zinc-700 hover:border-yellow-400 bg-white dark:bg-zinc-800/30 flex items-center gap-4 cursor-pointer transition-colors opacity-60">
                                <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center shadow-sm">
                                    <span className="font-black text-white text-xs">MTN</span>
                                </div>
                                <div className="flex-1">
                                    <p className="font-bold text-slate-900 dark:text-white">MTN MoMo</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setIsServicePaymentModalOpen(false)}
                                className="flex-1 py-3 rounded-xl font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={handleServicePayment}
                                className="flex-1 py-3 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-500/30 transition-all"
                            >
                                Confirmer (Simulation)
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PaymentModals;
