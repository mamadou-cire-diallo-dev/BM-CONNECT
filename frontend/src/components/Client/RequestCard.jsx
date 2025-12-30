import React from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const StatusBadge = ({ status }) => {
    const styles = {
        PENDING: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800",
        ACTIVE: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800",
        COMPLETED: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800",
        CANCELED: "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800",
    };

    const translations = {
        PENDING: "En Attente",
        ACTIVE: "En Cours",
        COMPLETED: "Terminée",
        CANCELED: "Annulée",
        ACCEPTED: "Acceptée"
    };

    return (
        <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold border ${styles[status] || "bg-gray-100 text-gray-600 border-gray-200"} uppercase tracking-wide`}>
            {translations[status] || status}
        </span>
    );
};

const RequestCard = ({ demande, navigate }) => {
    return (
        <div className="group flex flex-col bg-white dark:bg-zinc-900 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:border-orange-100 dark:hover:border-orange-900/30 hover:-translate-y-1 transition-all duration-300 overflow-hidden relative">
            {/* Decorative gradient line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>

            <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 bg-gray-50 dark:bg-zinc-800 rounded-2xl flex items-center justify-center text-gray-900 dark:text-white font-black text-xl shadow-inner">
                        {demande.service.titre.charAt(0)}
                    </div>
                    <StatusBadge status={demande.statut} />
                </div>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-orange-600 transition-colors line-clamp-1">
                    {demande.service.titre}
                </h3>

                <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-6 flex-1">
                    {demande.description}
                </p>

                <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 font-medium bg-gray-50 dark:bg-zinc-800/50 p-2 rounded-lg">
                        <Calendar size={14} className="text-orange-500" />
                        {format(new Date(demande.date), "dd MMMM yyyy", { locale: fr })}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 font-medium bg-gray-50 dark:bg-zinc-800/50 p-2 rounded-lg">
                        <Clock size={14} className="text-orange-500" />
                        {format(new Date(demande.date), "HH:mm", { locale: fr })}
                    </div>
                </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-800/30 flex items-center justify-between mt-auto">
                <span className="font-black text-lg text-gray-900 dark:text-white">
                    {demande.service.prix} €
                </span>

                <button
                    onClick={() => navigate(`/client/requests/${demande.id}`)}
                    className="flex items-center gap-2 text-sm font-bold text-gray-600 dark:text-gray-300 group-hover:text-orange-600 transition-colors"
                >
                    Détails <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    );
};

export default RequestCard;
