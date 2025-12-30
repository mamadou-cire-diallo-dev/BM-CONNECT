import React from "react";
import { User, CheckCircle2, Star, MapPin, Phone, MessageSquare } from "lucide-react";

const ProviderCard = () => {
    return (
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-xl shadow-slate-200/50 dark:shadow-black/50 border border-slate-100 dark:border-zinc-800 flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-bl-[100px] pointer-events-none" />

            <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/50 dark:to-indigo-900/50 flex items-center justify-center text-blue-500 dark:text-blue-400 shadow-inner">
                    <User size={32} />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1 rounded-full border-[3px] border-white dark:border-zinc-900">
                    <CheckCircle2 size={12} fill="currentColor" />
                </div>
            </div>

            <div className="flex-1 text-center md:text-left space-y-1">
                <div className="flex items-center justify-center md:justify-start gap-2">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Prestataire Pro</h3>
                    <div className="flex items-center gap-0.5 text-amber-500 text-sm font-bold bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100 dark:bg-amber-900/20 dark:border-amber-800">
                        <Star size={12} fill="currentColor" /> 4.9
                    </div>
                </div>

                <p className="text-slate-500 dark:text-slate-400 text-sm flex items-center justify-center md:justify-start gap-2">
                    <MapPin size={14} />
                    Conakry, Guinée
                </p>

                <div className="flex items-center justify-center md:justify-start gap-3 pt-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-700 dark:text-slate-200 rounded-xl text-sm font-bold transition-all">
                        <Phone size={16} />
                        <span>Appeler</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl text-sm font-bold transition-all border border-blue-100 dark:border-blue-800/30">
                        <MessageSquare size={16} />
                        <span>Message</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProviderCard;
