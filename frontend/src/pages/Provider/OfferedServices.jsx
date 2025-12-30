import React, { useState } from 'react';
import {
    Plus,
    Search,
    Star,
    Filter,
    Grid,
    List,
    TrendingUp,
    Award,
    ChevronDown,
    Download,
    Share2,
    X
} from 'lucide-react';

import OfferedServiceCard from '../../components/Provider/OfferedServiceCard';
import ServiceTableRow from '../../components/Provider/ServiceTableRow';

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
        <div className="space-y-6 max-w-7xl mx-auto ">
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

            {/* Control Bar - Design Épuré */}
            <div className="sticky top-4 z-40 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                    <div className="relative bg-white dark:bg-zinc-900 rounded-2xl p-2 border border-slate-200 dark:border-zinc-800 shadow-lg shadow-slate-100/50 dark:shadow-black/20">
                        <div className="flex flex-col md:flex-row gap-4">
                            {/* Search Input */}
                            <div className="flex-1 relative">
                                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400">
                                    <Search size={18} />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Rechercher un service..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 bg-transparent border-0 focus:outline-none text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400"
                                />
                                {searchTerm && (
                                    <button
                                        onClick={() => setSearchTerm("")}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                    >
                                        <X size={16} />
                                    </button>
                                )}
                            </div>

                            {/* Divider */}
                            <div className="hidden md:block self-stretch w-px bg-slate-100 dark:bg-zinc-800" />

                            {/* Filters Row */}
                            <div className="flex items-center gap-2 p-1 md:p-0">
                                {/* Category Filter */}
                                <div className="relative flex-1 md:flex-none">
                                    <select
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                        className="w-full md:w-auto appearance-none bg-slate-50 dark:bg-zinc-800 border-0 rounded-xl pl-4 pr-10 py-3 text-[11px] font-black uppercase tracking-wider text-slate-700 dark:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-orange-500/20 cursor-pointer min-w-[140px] transition-all"
                                    >
                                        {categories.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
                                </div>

                                {/* Status Filter */}
                                <div className="relative flex-1 md:flex-none">
                                    <select
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                        className="w-full md:w-auto appearance-none bg-slate-50 dark:bg-zinc-800 border-0 rounded-xl pl-4 pr-10 py-3 text-[11px] font-black uppercase tracking-wider text-slate-700 dark:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-orange-500/20 cursor-pointer min-w-[140px] transition-all"
                                    >
                                        {statuses.map(status => (
                                            <option key={status} value={status}>
                                                {status === "TOUS" ? "TOUTES" : status === "ACTIVE" ? "ACTIFS" : "INACTIFS"}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
                                </div>

                                {/* View Toggle */}
                                <div className="flex items-center bg-slate-50 dark:bg-zinc-800 rounded-xl p-1 ml-2">
                                    <button
                                        onClick={() => setViewMode("grid")}
                                        className={`p-2 rounded-lg transition-all ${viewMode === "grid"
                                            ? "bg-white dark:bg-zinc-700 text-orange-600 shadow-sm"
                                            : "text-slate-400 hover:text-slate-600"
                                            }`}
                                    >
                                        <Grid size={18} />
                                    </button>
                                    <button
                                        onClick={() => setViewMode("list")}
                                        className={`p-2 rounded-lg transition-all ${viewMode === "list"
                                            ? "bg-white dark:bg-zinc-700 text-orange-600 shadow-sm"
                                            : "text-slate-400 hover:text-slate-600"
                                            }`}
                                    >
                                        <List size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Quick Stats Summary */}
                        <div className="mt-2 pt-2 border-t border-slate-50 dark:border-zinc-800 flex items-center justify-between px-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                            <div className="flex items-center gap-4">
                                <span className="flex items-center gap-1.5">
                                    <span className="text-slate-900 dark:text-white">{filteredServices.length}</span> SERVICES
                                </span>
                                <span className="w-1 h-1 rounded-full bg-slate-200" />
                                <span className="flex items-center gap-1.5">
                                    <span className="text-emerald-500">{services.filter(s => s.status === 'ACTIVE').length}</span> EN LIGNE
                                </span>
                            </div>
                            <span className="hidden md:block">
                                GESTION DU CATALOGUE
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            {viewMode === 'grid' ? (
                /* Grid View */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in slide-in-from-bottom-8 fade-in duration-700">
                    {filteredServices.map((service) => (
                        <OfferedServiceCard key={service.id} service={service} />
                    ))}
                </div>
            ) : (
                /* Table View */
                <div className="animate-in slide-in-from-bottom-8 fade-in duration-700">
                    <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200 dark:border-zinc-800 overflow-hidden shadow-xl shadow-slate-200/50 dark:shadow-black/40">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-[800px]">
                                <thead>
                                    <tr className="bg-slate-50/50 dark:bg-zinc-800/50 border-b border-slate-100 dark:border-zinc-800">
                                        <th className="py-5 px-4 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-zinc-500 w-16">
                                            No.
                                        </th>
                                        <th className="py-5 px-4 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-zinc-500">
                                            Informations Service
                                        </th>
                                        <th className="py-5 px-4 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-zinc-500">
                                            Prix / Tarif
                                        </th>
                                        <th className="py-5 px-4 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-zinc-500">
                                            Engagement
                                        </th>
                                        <th className="py-5 px-4 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-zinc-500">
                                            Visibilité
                                        </th>
                                        <th className="py-5 px-4 text-right pr-10 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-zinc-500">
                                            Actions Rapides
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50 dark:divide-zinc-800">
                                    {filteredServices.map((service, index) => (
                                        <ServiceTableRow key={service.id} service={service} index={index} />
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Table Footer */}
                        <div className="px-6 py-4 border-t border-slate-100 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-900/50 flex items-center justify-between">
                            <div className="text-sm text-slate-500">
                                Affichage de <span className="font-bold">{filteredServices.length}</span> services
                            </div>
                            <div className="flex items-center gap-4">
                                <button className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
                                    ← Précédent
                                </button>
                                <div className="flex items-center gap-2">
                                    {[1, 2, 3].map(page => (
                                        <button
                                            key={page}
                                            className={`w-8 h-8 rounded-lg text-sm font-medium ${page === 1
                                                ? 'bg-orange-600 text-white'
                                                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-800'
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                    <span className="text-slate-400">...</span>
                                    <button className="w-8 h-8 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-800">
                                        5
                                    </button>
                                </div>
                                <button className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
                                    Suivant →
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

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