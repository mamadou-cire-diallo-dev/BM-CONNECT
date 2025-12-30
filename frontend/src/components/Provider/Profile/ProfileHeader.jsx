import React from 'react';
import { Camera, Briefcase, Edit3 } from 'lucide-react';

export default function ProfileHeader({ user, isEditing, onToggleEdit }) {
  return (
    <div>
      {/* Header / Cover Section */}
      <div className="relative h-64 md:h-80 w-full rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10" />
        <img src={user.cover} alt="Cover" className="w-full h-full object-cover" />
        <button className="absolute bottom-4 right-4 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all border border-white/30">
          <Camera size={18} />
          <span className="text-sm font-medium">Modifier la couverture</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
        <div className="flex flex-col md:flex-row items-start md:items-end gap-6 mb-8">
          {/* Avatar */}
          <div className="relative group">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white dark:border-zinc-900 shadow-2xl overflow-hidden bg-white dark:bg-zinc-800">
              <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <button className="absolute bottom-2 right-2 p-2 bg-orange-500 text-white rounded-full shadow-lg hover:bg-orange-600 transition-colors">
              <Camera size={18} />
            </button>
          </div>

          {/* User Identify Header */}
          <div className="flex-1 text-white md:text-zinc-800 dark:md:text-white mb-2 md:mb-4">
            <h1 className="text-3xl font-bold md:text-4xl text-white md:text-zinc-900 dark:text-white drop-shadow-md md:drop-shadow-none">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-white/90 md:text-slate-500 dark:text-slate-400 font-medium flex items-center gap-2 mt-1">
              <Briefcase size={16} />
              {user.role}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-4 md:mt-0 pb-4">
            <button onClick={onToggleEdit} className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-full shadow-lg shadow-orange-500/20 transition-all flex items-center gap-2">
              <Edit3 size={18} />
              {isEditing ? 'Annuler' : 'Editer le profil'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
