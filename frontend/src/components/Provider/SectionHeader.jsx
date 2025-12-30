import React from 'react';

export default function SectionHeader({ title, actionText, onAction }) {
  return (
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h3>
      {actionText && (
        <button onClick={onAction} className="text-sm font-medium text-orange-600 hover:text-orange-700">{actionText}</button>
      )}
    </div>
  );
}
