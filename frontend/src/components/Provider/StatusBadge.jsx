import { CheckCircle2, Clock, AlertCircle, XCircle } from 'lucide-react';

const StatusBadge = ({ status, showIcon = true }) => {
  const statusConfig = {
    // Service Statuses
    PLANNING: {
      label: "Planifié",
      styles: "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 border-blue-200 dark:border-blue-800",
      icon: Clock
    },
    ACTIVE: {
      label: "En cours", // Or "Actif" depending on context, "Actif" used for OfferedServices
      styles: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
      icon: CheckCircle2
    },
    ON_HOLD: {
      label: "En pause",
      styles: "bg-gray-100 text-gray-700 dark:bg-gray-500/20 dark:text-gray-400 border-gray-200 dark:border-gray-800",
      icon: Clock
    },
    COMPLETED: {
      label: "Terminé", // "Payé" for payments, handle overwrite via prop if needed? Or just context based labels? For now using generic verified ones.
      styles: "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800",
      icon: CheckCircle2
    },
    CANCELLED: {
      label: "Annulé",
      styles: "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400 border-red-200 dark:border-red-800",
      icon: XCircle
    },
    PENDING: {
      label: "En attente",
      styles: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 border-amber-200 dark:border-amber-800",
      icon: Clock
    },
    ACCEPTED: {
      label: "Accepté",
      styles: "bg-teal-100 text-teal-700 dark:bg-teal-500/20 dark:text-teal-400 border-teal-200 dark:border-teal-800",
      icon: CheckCircle2
    },
    REFUSED: {
      label: "Refusé",
      styles: "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400 border-rose-200 dark:border-rose-800",
      icon: XCircle
    },
    
    // Payment Specific (Overriding some duplicates if needed or adding new)
    FAILED: {
      label: "Échoué",
      styles: "bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400 border-rose-200 dark:border-rose-900/50",
      icon: AlertCircle
    },
    
    // General
    INACTIVE: {
      label: "Inactif",
      styles: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700",
      icon: XCircle
    }
  };

  // Special handling for shared keys with different meanings (e.g., COMPLETED for payment vs service)
  // We can pass a 'type' prop or just infer. For simplicity, we'll stick to a standard set.
  // If 'status' is not found, default to gray.

  const config = statusConfig[status] || {
    label: status,
    styles: "bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-slate-300",
    icon: null
  };

  // Override labels for Payment COMPLETED which usually means "Payé"
  if (status === 'COMPLETED' && config.label === 'Terminé') {
     // Check if context implies payment? Hard to know without prop. 
     // Let's rely on the caller to handle text if they want specific text, or just accept "Terminé" (Completed) is close enough to "Payé" (Paid).
     // Actually, in Services.jsx it was "Terminé", in Payment.jsx it was "Payé".
     // Let's add an optional label override prop.
  }

  const Icon = config.icon;

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 w-fit uppercase tracking-wide shadow-sm ${config.styles}`}>
      {showIcon && Icon && <Icon size={14} className="stroke-[2.5]" />}
      {config.label}
    </span>
  );
};

export default StatusBadge;
