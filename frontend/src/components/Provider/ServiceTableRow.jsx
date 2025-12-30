import { Eye, Edit3, Trash2, ArrowRight } from 'lucide-react';

const ServiceTableRow = ({ service, index }) => (
    <tr className="group hover:bg-slate-50/80 dark:hover:bg-zinc-800/30 transition-all duration-300 border-b border-slate-50 dark:border-zinc-800/50">
        <td className="py-5 px-4 text-xs font-bold text-slate-400 dark:text-zinc-500">
            {String(index + 1).padStart(2, '0')}
        </td>
        <td className="py-5 px-4">
            <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-slate-100 dark:border-zinc-800 shadow-sm flex-shrink-0">
                    <img src={service.image} alt={service.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="min-w-0">
                    <h3 className="font-bold text-slate-800 dark:text-white truncate max-w-[200px] leading-tight mb-1">
                        {service.title}
                    </h3>
                    <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest bg-orange-50 dark:bg-orange-500/10 px-2 py-0.5 rounded-md">
                        {service.category}
                    </span>
                </div>
            </div>
        </td>
        <td className="py-5 px-4 text-sm font-bold text-slate-700 dark:text-zinc-200">
            {service.price} {service.currency}
            {service.unit && <span className="block text-[10px] font-normal text-slate-400 lowercase">{service.unit}</span>}
        </td>
        <td className="py-5 px-4">
            <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-slate-700 dark:text-zinc-200">{service.bookings}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Ventes Totales</span>
            </div>
        </td>
        <td className="py-5 px-4">
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${service.status === 'ACTIVE'
                    ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400'
                    : 'bg-slate-100 text-slate-500 dark:bg-zinc-800 dark:text-zinc-500'
                }`}>
                <div className={`w-1 h-1 rounded-full ${service.status === 'ACTIVE' ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                {service.status === 'ACTIVE' ? 'Actif' : 'Inactif'}
            </div>
        </td>
        <td className="py-5 px-4 text-right">
            <div className="flex items-center justify-end gap-1">
                <button className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all shadow-sm hover:shadow-md border border-transparent hover:border-slate-200">
                    <Eye size={16} />
                </button>
                <button className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-400 hover:text-orange-500 transition-all shadow-sm hover:shadow-md border border-transparent hover:border-slate-200">
                    <Edit3 size={16} />
                </button>
                <button className="p-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/30 text-slate-400 hover:text-red-500 transition-all shadow-sm hover:shadow-md border border-transparent hover:border-red-100">
                    <Trash2 size={16} />
                </button>
                <button className="ml-2 w-8 h-8 rounded-full bg-slate-900 dark:bg-orange-500 text-white flex items-center justify-center transform hover:translate-x-1 transition-all shadow-lg active:scale-95">
                    <ArrowRight size={14} />
                </button>
            </div>
        </td>
    </tr>
);

export default ServiceTableRow;
