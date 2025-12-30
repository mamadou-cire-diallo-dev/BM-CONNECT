import React from 'react';
import { FileText, CheckCircle, Clock, Download } from 'lucide-react';
import { format } from 'date-fns';
import { demandesServicesPrestataire } from '../../assets/data';

const InvoicesTable = ({ factures }) => {
    return (
        <div className="space-y-4">
            {/* Desktop View: Table */}
            <div className="hidden md:block bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 dark:bg-zinc-800/50 text-xs uppercase text-gray-500 dark:text-gray-400 font-semibold">
                            <tr>
                                <th className="px-6 py-4">Facture #</th>
                                <th className="px-6 py-4">Service</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Montant</th>
                                <th className="px-6 py-4">Statut</th>
                                <th className="px-6 py-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
                            {factures.length > 0 ? factures.map((facture) => {
                                const demande = demandesServicesPrestataire.find(d => d.id === facture.demandeServiceId);

                                return (
                                    <tr key={facture.id} className="hover:bg-gray-50 dark:hover:bg-zinc-800/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-500">
                                                    <FileText size={16} />
                                                </div>
                                                <span className="font-mono font-medium text-gray-900 dark:text-white">{facture.numero}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">{demande?.service.titre || "Service Inconnu"}</p>
                                            <p className="text-xs text-gray-500">Prestataire ID: {demande?.prestataireId}</p>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {format(new Date(facture.dateEmission), "dd MMM yyyy")}
                                        </td>
                                        <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">
                                            {facture.montantTotal} €
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${facture.statut === 'PAYEE'
                                                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                                                : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                                                }`}>
                                                {facture.statut === 'PAYEE' ? <CheckCircle size={12} /> : <Clock size={12} />}
                                                {facture.statut}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-gray-400 hover:text-indigo-600 transition-colors p-2 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg">
                                                <Download size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            }) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                                        Aucune facture trouvée.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Mobile View: Modern Cards */}
            <div className="md:hidden space-y-4">
                {factures.length > 0 ? factures.map((facture) => {
                    const demande = demandesServicesPrestataire.find(d => d.id === facture.demandeServiceId);
                    return (
                        <div key={facture.id} className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm flex flex-col gap-4">
                            {/* Header: Invoice # and Status */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-500">
                                        <FileText size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase font-semibold">Facture</p>
                                        <p className="font-mono font-bold text-gray-900 dark:text-white">{facture.numero}</p>
                                    </div>
                                </div>
                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${facture.statut === 'PAYEE'
                                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                                    : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                                    }`}>
                                    {facture.statut === 'PAYEE' ? <CheckCircle size={12} /> : <Clock size={12} />}
                                    {facture.statut}
                                </span>
                            </div>

                            {/* Divider */}
                            <div className="h-px bg-gray-100 dark:bg-zinc-800 w-full" />

                            {/* Details: Service & Date */}
                            <div className="space-y-2">
                                <div className="flex justify-between items-start">
                                    <span className="text-sm text-gray-500">Service</span>
                                    <span className="text-sm font-medium text-gray-900 dark:text-white text-right line-clamp-1 max-w-[60%]">
                                        {demande?.service.titre || "Service Inconnu"}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500">Date</span>
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                                        {format(new Date(facture.dateEmission), "dd MMM yyyy")}
                                    </span>
                                </div>
                            </div>

                            {/* Footer: Amount & Action */}
                            <div className="pt-2 flex items-center justify-between mt-auto">
                                <div>
                                    <p className="text-xs text-gray-500 mb-0.5">Montant Total</p>
                                    <p className="text-xl font-black text-gray-900 dark:text-white">{facture.montantTotal} €</p>
                                </div>
                                <button className="p-2.5 bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-300 rounded-xl hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white transition-all shadow-sm">
                                    <Download size={20} />
                                </button>
                            </div>
                        </div>
                    );
                }) : (
                    <div className="text-center py-12 text-gray-500 bg-white dark:bg-zinc-900 rounded-2xl border border-dashed border-gray-200 dark:border-zinc-800">
                        <FileText size={48} className="mx-auto text-gray-300 mb-4" />
                        <p>Aucune facture trouvée.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InvoicesTable;
