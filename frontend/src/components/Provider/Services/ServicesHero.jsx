import React from 'react';
import { Briefcase, Users, TrendingUp, Clock, FolderOpen } from 'lucide-react';

export default function ServicesHero({ total = 0, active = 0, pending = 0, completed = 0 }) {
  return (
    <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-slate-900/10">
      {/* Abstract Shapes */}
      <div className="absolute top-0 right-0 p-10 opacity-10">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-96 h-96 fill-white">
          <path d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,79.6,-46.3C87.4,-33.5,90.1,-18,88.5,-3.3C86.9,11.4,81,25.3,71.8,37.6C62.6,49.9,50.1,60.6,36.4,68.6C22.7,76.6,7.8,81.9,-5.8,80.4C-19.4,78.9,-31.7,70.6,-43.3,61.4C-54.9,52.2,-65.8,42.1,-73.9,29.9C-82,17.7,-87.3,3.4,-85.5,-10.1C-83.7,-23.6,-74.8,-36.3,-64,-46.8C-53.2,-57.3,-40.5,-65.6,-27.1,-73.2C-13.7,-80.8,0.4,-87.7,14.6,-87.8C28.8,-87.9,43.3,-81.2,44.7,-76.4Z" transform="translate(100 100)" />
        </svg>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-zinc-900 dark:via-zinc-950 dark:to-black"></div>
      <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
        <div className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-orange-400 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            <Briefcase size={14} />
            Gestion des demandes
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Vos Prestations & <br /> Suivi de <span className="text-orange-500 dark:text-slate-900 decoration-4 underline decoration-orange-500/30 dark:decoration-slate-400/40 underline-offset-8">Services</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl">
            Pilotez votre activité en temps réel. Suivez l'avancement de vos demandes et gérez vos interventions avec efficacité.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm min-w-[140px]">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                <Users size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{total}</p>
                <p className="text-xs text-slate-400 font-bold uppercase">Total</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm min-w-[140px]">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <TrendingUp size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{active}</p>
                <p className="text-xs text-slate-400 font-bold uppercase">Actifs</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm min-w-[140px]">
              <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400">
                <Clock size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{pending}</p>
                <p className="text-xs text-slate-400 font-bold uppercase">En Attente</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm min-w-[140px]">
              <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                <FolderOpen size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{completed}</p>
                <p className="text-xs text-slate-400 font-bold uppercase">Terminés</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
