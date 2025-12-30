import React from 'react';

export default function EmptyState({ icon: Icon, title = 'Aucun élément', description = '' }) {
  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
        {Icon ? <Icon size={24} /> : null}
      </div>
      <p className="text-slate-500 font-medium">{title}</p>
      {description && <p className="text-sm text-slate-400 mt-2">{description}</p>}
    </div>
  );
}
