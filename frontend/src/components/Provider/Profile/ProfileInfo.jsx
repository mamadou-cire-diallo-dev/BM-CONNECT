import React from 'react';
import { MapPin, Globe, Calendar } from 'lucide-react';

export default function ProfileInfo({ user }) {
  return (
    <div className="space-y-6">
      {/* Intro Card */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-slate-100 dark:border-zinc-800 p-6">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">À propos</h3>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">{user.bio}</p>

        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400 text-sm">
            <MapPin size={18} className="text-slate-400 dark:text-slate-500" />
            {user.location}
          </div>
          <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400 text-sm">
            <Globe size={18} className="text-slate-400 dark:text-slate-500" />
            <a href="#" className="text-orange-500 hover:underline">{user.website}</a>
          </div>
          <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400 text-sm">
            <Calendar size={18} className="text-slate-400 dark:text-slate-500" />
            Membre depuis {user.joinDate}
          </div>
        </div>
      </div>

      {/* Stats Card (Optional) */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-zinc-950 dark:to-zinc-900 rounded-2xl shadow-lg p-6 text-white border border-slate-700/50 dark:border-zinc-800">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-white/5 rounded-xl border border-white/10">
            <div className="text-2xl font-bold text-orange-400">24</div>
            <div className="text-xs text-slate-400 mt-1">Services complétés</div>
          </div>
          <div className="p-3 bg-white/5 rounded-xl border border-white/10">
            <div className="text-2xl font-bold text-orange-400">4.9</div>
            <div className="text-xs text-slate-400 mt-1">Note moyenne</div>
          </div>
        </div>
      </div>
    </div>
  );
}
