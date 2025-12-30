import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, ChevronRight } from 'lucide-react';

const DashboardHero = () => {
    return (
        <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-slate-900/10">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 dark:from-orange-900 dark:via-orange-800 dark:to-orange-900"></div>

            {/* Abstract Pattern */}
            <div className="absolute top-0 right-0 p-10 opacity-10">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-96 h-96 fill-white">
                    <path d="M42.7,-72.5C54.6,-66.1,63.1,-53.4,70.9,-40.8C78.7,-28.2,85.8,-15.7,83.9,-4.1C82,7.5,71.1,18.2,61.9,28.6C52.7,39,45.3,49.1,35.4,56.3C25.5,63.5,13.1,67.8,0.3,67.3C-12.5,66.8,-25.9,61.5,-37.6,54.1C-49.3,46.7,-59.3,37.2,-67.6,25.6C-75.9,14,-82.5,0.3,-80.3,-12.3C-78.1,-24.9,-67.1,-36.4,-55.8,-43.3C-44.5,-50.2,-32.9,-52.5,-21.5,-59.2C-10.1,-65.9,1.1,-77,13.6,-79.1C26.1,-81.2,30.8,-69.1,42.7,-72.5Z" transform="translate(100 100)" />
                </svg>
            </div>

            <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-start justify-between gap-6">
                <div className="space-y-4 max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                        <Briefcase size={14} />
                        Espace Client
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
                        Bienvenue, <br />
                        <span className="text-white/90">Aissatou Barry</span>
                    </h1>
                    <p className="text-orange-50 text-lg max-w-xl font-medium">
                        Gérez vos demandes de services et suivez vos interventions en toute simplicité.
                    </p>
                </div>

                <div className="flex flex-col gap-3">
                    <Link to="/client/requests" className="px-6 py-3 bg-white text-orange-600 rounded-xl font-bold shadow-lg hover:bg-orange-50 transition-colors flex items-center justify-center gap-2">
                        Nouvelle Demande
                        <ChevronRight size={18} />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default DashboardHero;
