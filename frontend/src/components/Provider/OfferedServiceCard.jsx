import { Edit3, Eye, Trash2, Star, ArrowRight } from 'lucide-react';

const OfferedServiceCard = ({ service }) => (
    <div className="group relative bg-white dark:bg-zinc-900 rounded-[2rem] border border-slate-100 dark:border-zinc-800 overflow-hidden hover:shadow-2xl hover:shadow-slate-200/50 dark:hover:shadow-black/50 transition-all duration-500 h-full flex flex-col">
        {/* Floating Action Buttons */}
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 translate-x-12 group-hover:translate-x-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
            <button className="p-3 bg-white/95 backdrop-blur-md rounded-full shadow-lg text-slate-700 hover:text-orange-500 hover:scale-110 transition-all border border-slate-100">
                <Edit3 size={18} />
            </button>
            <button className="p-3 bg-white/95 backdrop-blur-md rounded-full shadow-lg text-slate-700 hover:text-blue-500 hover:scale-110 transition-all border border-slate-100">
                <Eye size={18} />
            </button>
            <button className="p-3 bg-white/95 backdrop-blur-md rounded-full shadow-lg text-slate-700 hover:text-red-500 hover:scale-110 transition-all border border-slate-100">
                <Trash2 size={18} />
            </button>
        </div>

        {/* Image Section */}
        <div className="relative h-40 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
            <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
            />

            <div className="absolute top-4 left-4 z-20">
                <span className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-md border ${service.status === 'ACTIVE'
                    ? 'bg-emerald-500/90 text-white border-emerald-600'
                    : 'bg-slate-500/90 text-white border-slate-600'
                    }`}>
                    {service.status === 'ACTIVE' ? 'Actif' : 'Inactif'}
                </span>
            </div>

            <div className="absolute bottom-4 left-4 z-20">
                <div className="flex flex-wrap gap-2">
                    {service.tags && service.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 rounded-lg bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider border border-white/20">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>

        {/* Content Section */}
        <div className="p-6 flex-1 flex flex-col">
            <div className="flex justify-between items-start mb-3">
                <span className="text-xs font-bold text-orange-600 uppercase tracking-widest">{service.category}</span>
                <div className="flex items-center gap-1.5 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded-lg border border-amber-100 dark:border-amber-900/50">
                    <Star size={14} className="text-amber-500 fill-amber-500" />
                    <span className="text-sm font-bold text-amber-700 dark:text-amber-400">{service.rating}</span>
                </div>
            </div>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-orange-600 transition-colors duration-300">
                {service.title}
            </h3>

            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6 line-clamp-2">
                {service.description}
            </p>

            <div className="mt-auto pt-6 border-t border-slate-100 dark:border-zinc-800 flex items-end justify-between">
                <div>
                    <p className="text-xs text-slate-400 font-medium mb-0.5">À partir de</p>
                    <p className="flex items-baseline gap-1">
                        <span className="text-xl font-black text-slate-900 dark:text-white tracking-tight">{service.price}</span>
                        <span className="text-sm font-bold text-slate-500">{service.currency}</span>
                    </p>
                    {/* {service.unit && <p className="text-xs text-slate-400 font-medium">{service.unit}</p>} */}
                </div>

                <button className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-900 dark:text-white group-hover:bg-orange-600 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:shadow-orange-500/30">
                    <ArrowRight size={20} className="-ml-0.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
            </div>
        </div>
    </div>
);

export default OfferedServiceCard;
