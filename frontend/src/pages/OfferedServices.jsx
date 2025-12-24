import React, { useState } from 'react';
import {
    Plus,
    Search,
    Star,
    Edit3,
    Trash2,
    Eye,
    Filter,
    Grid,
    List,
    MoreHorizontal,
    ArrowRight,
    TrendingUp,
    Zap,
    Award,
    ChevronDown,
    Download,
    Share2,
    X
} from 'lucide-react';

// --- Mock Data ---
const initialServices = [
    {
        id: 1,
        title: "Nettoyage de Bureau",
        description: "Service de nettoyage premium pour espaces professionnels. Sols, vitres, sanitaires et désinfection complète.",
        price: "250 000",
        currency: "GNF",
        unit: "par passage",
        rating: 4.9,
        reviews: 124,
        status: "ACTIVE",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
        category: "Nettoyage",
        tags: ["Populaire", "Entreprise"],
        bookings: 156,
        revenue: "39 000 000",
        dateAdded: "15/03/2024"
    },
    {
        id: 2,
        title: "Réparation Plomberie",
        description: "Intervention rapide (24h/7j) pour fuites, débouchage et installation sanitaire d'urgence.",
        price: "150 000",
        currency: "GNF",
        unit: "heure",
        rating: 4.8,
        reviews: 85,
        status: "ACTIVE",
        image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&q=80&w=800",
        category: "Plomberie",
        tags: ["Urgence"],
        bookings: 89,
        revenue: "13 350 000",
        dateAdded: "22/02/2024"
    },
    {
        id: 3,
        title: "Jardinage & Paysagisme",
        description: "Entretien des espaces verts, tonte de pelouse et taille de haies. Design paysager sur mesure.",
        price: "Sur devis",
        currency: "",
        unit: "",
        rating: 4.7,
        reviews: 42,
        status: "INACTIVE",
        image: "https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&q=80&w=800",
        category: "Jardinage",
        tags: ["Saisonnier"],
        bookings: 31,
        revenue: "4 200 000",
        dateAdded: "10/01/2024"
    },
    {
        id: 4,
        title: "Installation Électrique",
        description: "Mise aux normes, installation de luminaires LED et dépannage électrique domestique et commercial.",
        price: "200 000",
        currency: "GNF",
        unit: "heure",
        rating: 5.0,
        reviews: 215,
        status: "ACTIVE",
        image: "https://images.unsplash.com/photo-1621905476438-5a4a39771564?auto=format&fit=crop&q=80&w=800",
        category: "Électricité",
        tags: ["Certifié"],
        bookings: 178,
        revenue: "35 600 000",
        dateAdded: "05/03/2024"
    },
    {
        id: 5,
        title: "Peinture & Rénovation",
        description: "Travaux de peinture intérieure et extérieure. Finitions soignées, stuc et papiers peints.",
        price: "35 000",
        currency: "GNF",
        unit: "m²",
        rating: 4.6,
        reviews: 38,
        status: "ACTIVE",
        image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&q=80&w=800",
        category: "Rénovation",
        tags: ["Déco"],
        bookings: 47,
        revenue: "6 580 000",
        dateAdded: "28/02/2024"
    },
    {
        id: 6,
        title: "Déménagement Pro",
        description: "Service complet avec camion, emballage et équipe de manutention expérimentée.",
        price: "1 500 000",
        currency: "GNF",
        unit: "forfait",
        rating: 4.8,
        reviews: 63,
        status: "ACTIVE",
        image: "https://images.unsplash.com/photo-1600585152220-9036cfa24723?auto=format&fit=crop&q=80&w=800",
        category: "Déménagement",
        tags: [" Assurance incluse"],
        bookings: 72,
        revenue: "108 000 000",
        dateAdded: "14/03/2024"
    },
];

const ServiceCard = ({ service }) => (
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
        <div className="relative h-64 overflow-hidden">
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
                        <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{service.price}</span>
                        <span className="text-sm font-bold text-slate-500">{service.currency}</span>
                    </p>
                    {service.unit && <p className="text-xs text-slate-400 font-medium">{service.unit}</p>}
                </div>

                <button className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-900 dark:text-white group-hover:bg-orange-600 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:shadow-orange-500/30">
                    <ArrowRight size={20} className="-ml-0.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
            </div>
        </div>
    </div>
);

const ServiceTableRow = ({ service }) => (
    <tr className="group hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-all duration-300 border-b border-slate-100 dark:border-zinc-800 last:border-0">
        <td className="py-4 px-6">
            <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden">
                    <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                    <div className={`absolute top-1 right-1 w-2 h-2 rounded-full ${service.status === 'ACTIVE' ? 'bg-emerald-500' : 'bg-slate-500'}`} />
                </div>
                <div>
                    <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-orange-600 transition-colors">
                        {service.title}
                    </h3>
                    <p className="text-xs text-slate-500">{service.category}</p>
                </div>
            </div>
        </td>
        <td className="py-4 px-6">
            <div className="flex items-center gap-1.5">
                <Star size={14} className="text-amber-500 fill-amber-500" />
                <span className="font-bold text-slate-900 dark:text-white">{service.rating}</span>
                <span className="text-xs text-slate-500">({service.reviews})</span>
            </div>
        </td>
        <td className="py-4 px-6">
            <div className="flex flex-col">
                <span className="font-bold text-slate-900 dark:text-white">{service.price} {service.currency}</span>
                {service.unit && <span className="text-xs text-slate-500">{service.unit}</span>}
            </div>
        </td>
        <td className="py-4 px-6">
            <div className="flex flex-col">
                <span className="font-bold text-slate-900 dark:text-white">{service.bookings}</span>
                <span className="text-xs text-slate-500">réservations</span>
            </div>
        </td>
        <td className="py-4 px-6">
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${service.status === 'ACTIVE'
                ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-400'
                }`}>
                {service.status === 'ACTIVE' ? 'Actif' : 'Inactif'}
            </span>
        </td>
        <td className="py-4 px-6">
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-600 dark:text-slate-400">
                    <Eye size={18} />
                </button>
                <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-600 dark:text-slate-400">
                    <Edit3 size={18} />
                </button>
                <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 text-red-500">
                    <Trash2 size={18} />
                </button>
                <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-600 dark:text-slate-400">
                    <MoreHorizontal size={18} />
                </button>
            </div>
        </td>
    </tr>
);


export default function OfferedServices() {
    const [services, setServices] = useState(initialServices);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Tous");
    const [viewMode, setViewMode] = useState("grid");
    const [showFilters, setShowFilters] = useState(false);
    const [statusFilter, setStatusFilter] = useState("TOUS");

    const categories = ["Tous", ...new Set(initialServices.map(s => s.category))];
    const statuses = ["TOUS", "ACTIVE", "INACTIVE"];

    const filteredServices = services.filter(service => {
        const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            service.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "Tous" || service.category === selectedCategory;
        const matchesStatus = statusFilter === "TOUS" || service.status === statusFilter;
        return matchesSearch && matchesCategory && matchesStatus;
    });

    return (
        <div className="space-y-6 max-w-7xl mx-auto px-4 md:px-6">
            {/* Hero Header */}
            <div className="relative rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-orange-600 dark:via-orange-700 dark:to-orange-900 overflow-hidden shadow-2xl shadow-slate-900/20">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 p-20 opacity-10">
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-96 h-96 fill-white">
                        <path d="M47.5,-73.2C61.5,-63.9,72.6,-51.9,80.1,-38.6C87.6,-25.3,91.4,-10.7,89.3,3.1C87.2,16.9,79.2,29.9,69.5,41.2C59.9,52.5,48.6,62,36.2,68.9C23.8,75.8,10.3,80.1,-1.9,83.1C-14.1,86.1,-26.8,87.8,-38.3,83.2C-49.8,78.6,-60.1,67.7,-68.9,55.5C-77.7,43.3,-84.9,29.8,-86.3,15.6C-87.8,1.4,-83.4,-13.5,-75.4,-26.4C-67.4,-39.3,-55.8,-50.2,-42.9,-59.8C-30,-69.4,-15.8,-77.7,-0.7,-76.6C14.4,-75.5,28.8,-65,47.5,-73.2Z" transform="translate(100 100)" />
                    </svg>
                </div>

                <div className="relative z-10 p-8 md:px-12 md:py-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
                    <div className="space-y-4 max-w-2xl">
                        <div className="flex items-center gap-2 text-orange-400 dark:text-orange-200 font-bold uppercase tracking-widest text-sm animate-in slide-in-from-bottom-2 fade-in duration-500">
                            <Award size={18} />
                            <span>Catalogue Premium</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-white leading-tight animate-in slide-in-from-bottom-4 fade-in duration-700 delay-100">
                            Gérez vos <span className="text-orange-500 dark:text-slate-900 decoration-4 underline decoration-orange-500/30 dark:decoration-slate-400/40 underline-offset-8">Services</span> avec Élégance.
                        </h1>
                        <p className="text-lg text-slate-300 dark:text-orange-100 max-w-xl animate-in slide-in-from-bottom-4 fade-in duration-700 delay-200">
                            Mettez en valeur votre expertise. Un catalogue bien organisé attire jusqu'à 2x plus de clients potentiels.
                        </p>

                        <div className="flex flex-wrap gap-4 pt-4 animate-in slide-in-from-bottom-6 fade-in duration-700 delay-300">
                            <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg shadow-orange-500/30 transform hover:-translate-y-1 active:scale-95">
                                <Plus size={20} strokeWidth={3} />
                                <span>Nouveau Service</span>
                            </button>
                            <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full font-bold backdrop-blur-md transition-all border border-white/10">
                                <TrendingUp size={20} />
                                <span>Voir les tendances</span>
                            </button>
                        </div>
                    </div>

                    {/* Stats Pills */}
                    <div className="flex items-center gap-4 animate-in fade-in slide-in-from-right-8 duration-1000">
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center min-w-[100px]">
                            <span className="block text-2xl font-bold text-white">12</span>
                            <span className="text-xs text-slate-300 uppercase font-bold tracking-wider">Actifs</span>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center min-w-[100px]">
                            <span className="block text-2xl font-bold text-white">4.8</span>
                            <span className="text-xs text-slate-300 uppercase font-bold tracking-wider">Note Moy.</span>
                        </div>
                    </div>
                </div>
            </div>

          

            {/* Empty State */}
            {filteredServices.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in duration-500">
                    <div className="w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-zinc-800 dark:to-zinc-900 rounded-full flex items-center justify-center text-slate-300 mb-6 font-bold text-5xl">
                        <Search size={48} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Aucun service trouvé</h2>
                    <p className="text-slate-500 max-w-md mx-auto mb-6">
                        Aucun service ne correspond à vos critères de recherche. Essayez de modifier vos filtres ou votre recherche.
                    </p>
                    <button
                        onClick={() => {
                            setSearchTerm("");
                            setSelectedCategory("Tous");
                            setStatusFilter("TOUS");
                        }}
                        className="px-6 py-3 bg-orange-600 text-white rounded-full font-bold hover:bg-orange-700 transition-all shadow-lg shadow-orange-500/30"
                    >
                        Réinitialiser tous les filtres
                    </button>
                </div>
            )}

            {/* Floating Action Button */}
            <button className="fixed bottom-8 right-8 w-14 h-14 bg-orange-600 text-white rounded-full flex items-center justify-center shadow-xl shadow-orange-500/30 hover:scale-110 hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 z-50 animate-in slide-in-from-bottom-12 fade-in duration-1000 delay-1000">
                <Plus size={24} />
            </button>
        </div>
    );
}