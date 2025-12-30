import React from "react";
import { ArrowLeft, Clock, Briefcase, TrendingUp, CheckCircle2, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const RequestHero = ({ demand, navigate }) => {
    const statusConfig = {
        PENDING: { color: "text-amber-600 bg-amber-100 dark:bg-amber-500/20 dark:text-amber-400", icon: Clock, label: "En Attente" },
        ACTIVE: { color: "text-blue-600 bg-blue-100 dark:bg-blue-500/20 dark:text-blue-400", icon: TrendingUp, label: "En Cours" },
        COMPLETED: { color: "text-emerald-600 bg-emerald-100 dark:bg-emerald-500/20 dark:text-emerald-400", icon: CheckCircle2, label: "Terminée" },
        CANCELED: { color: "text-red-600 bg-red-100 dark:bg-red-500/20 dark:text-red-400", icon: AlertCircle, label: "Annulée" },
        ACCEPTED: { color: "text-teal-600 bg-teal-100 dark:bg-teal-500/20 dark:text-teal-400", icon: CheckCircle2, label: "Acceptée" },
    };

    const statusInfo = statusConfig[demand.statut] || statusConfig.PENDING;
    const StatusIcon = statusInfo.icon;

    return (
        <div className="relative min-h-[300px] md:min-h-[320px] overflow-hidden rounded-2xl mx-4 mt-4 flex flex-col">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-orange-950 dark:via-zinc-900 dark:to-zinc-950" />

            {/* Abstract Shapes */}
            <div className="absolute top-0 right-0 p-10 opacity-10">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-96 h-96 fill-white">
                    <path d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,79.6,-46.3C87.4,-33.5,90.1,-18,88.5,-3.3C86.9,11.4,81,25.3,71.8,37.6C62.6,49.9,50.1,60.6,36.4,68.6C22.7,76.6,7.8,81.9,-5.8,80.4C-19.4,78.9,-31.7,70.6,-43.3,61.4C-54.9,52.2,-65.8,42.1,-73.9,29.9C-82,17.7,-87.3,3.4,-85.5,-10.1C-83.7,-23.6,-74.8,-36.3,-64,-46.8C-53.2,-57.3,-40.5,-65.6,-27.1,-73.2C-13.7,-80.8,0.4,-87.7,14.6,-87.8C28.8,-87.9,43.3,-81.2,44.7,-76.4Z" transform="translate(100 100)" />
                </svg>
            </div>

            <div className="relative z-10 max-w-7xl px-4 h-full flex flex-col justify-end pb-8 md:pb-12 pt-20">
                {/* Breadcrumb / Back */}
                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-6 left-4 md:left-8 flex items-center gap-2 text-white/60 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm"
                >
                    <ArrowLeft size={18} />
                    <span className="text-sm font-medium">Retour mes demandes</span>
                </button>

                <div className="flex flex-col pl-4 md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 relative">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md border border-white/10 shadow-lg ${statusInfo.color.replace('bg-', 'bg-white/10 ').replace('text-', 'text-white ')}`}>
                                <StatusIcon size={14} />
                                {statusInfo.label}
                            </span>

                            <span className="text-slate-400 text-sm font-medium flex items-center gap-1">
                                <Clock size={14} />
                                Mis à jour le {format(new Date(), "d MMM", { locale: fr })}
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
                            {demand.service.titre}
                        </h1>

                        <div className="flex items-center gap-4 text-slate-300">
                            <span className="flex items-center gap-2 text-sm md:text-base bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                                <Briefcase size={16} className="text-orange-400" />
                                Service Général
                            </span>
                            <span className="flex items-center gap-2 text-sm md:text-base font-mono text-orange-400 bg-orange-500/10 px-3 py-1.5 rounded-lg border border-orange-500/20">
                                ID: #{demand.id?.substring(0, 6).toUpperCase()}
                            </span>
                        </div>
                    </div>

                    {/* Price Tag */}
                    <div className="flex flex-col items-start md:items-end gap-2 bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-2xl">
                        <span className="text-slate-400 text-sm font-medium uppercase tracking-wider">Montant Estimé</span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-3xl md:text-4xl font-black text-white">{demand.service.prix}</span>
                            <span className="text-lg font-bold text-orange-400">GNF</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RequestHero;
