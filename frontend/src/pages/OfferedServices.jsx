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
    Award
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
        tags: ["Populaire", "Entreprise"]
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
        tags: ["Urgence"]
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
        tags: ["Saisonnier"]
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
        tags: ["Certifié"]
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
        tags: ["Déco"]
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
        tags: [" Assurance incluse"]
    },
];

const ServiceCard = ({ service }) => (
    <div className="group relative bg-white dark:bg-zinc-900 rounded-[2rem] border border-slate-100 dark:border-zinc-800 overflow-hidden hover:shadow-2xl hover:shadow-slate-200/50 dark:hover:shadow-black/50 transition-all duration-500 h-full flex flex-col">
        {/* Floating Action Buttons (Hidden by default, appear on hover) */}
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

        {/* Image Section with Overlay */}
        <div className="relative h-64 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
            <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
            />

            <div className="absolute top-4 left-4 z-20">
                <span className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-md border border-white/10 ${service.status === 'ACTIVE'
                    ? 'bg-emerald-500/90 text-white'
                    : 'bg-slate-500/90 text-white'
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

export default function OfferedServices() {
    const [services, setServices] = useState(initialServices);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Tous");
    const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'list'

    const categories = ["Tous", ...new Set(initialServices.map(s => s.category))];

    const filteredServices = services.filter(service => {
        const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "Tous" || service.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className=" space-y-6 max-w-7xl mx-auto">

            {/* Hero Header */}
            <div className="relative rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-orange-600 dark:via-orange-700 dark:to-orange-900 overflow-hidden shadow-2xl shadow-slate-900/20">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 p-20 opacity-10">
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-96 h-96 fill-white">
                        <path d="M47.5,-73.2C61.5,-63.9,72.6,-51.9,80.1,-38.6C87.6,-25.3,91.4,-10.7,89.3,3.1C87.2,16.9,79.2,29.9,69.5,41.2C59.9,52.5,48.6,62,36.2,68.9C23.8,75.8,10.3,80.1,-1.9,83.1C-14.1,86.1,-26.8,87.8,-38.3,83.2C-49.8,78.6,-60.1,67.7,-68.9,55.5C-77.7,43.3,-84.9,29.8,-86.3,15.6C-87.8,1.4,-83.4,-13.5,-75.4,-26.4C-67.4,-39.3,-55.8,-50.2,-42.9,-59.8C-30,-69.4,-15.8,-77.7,-0.7,-76.6C14.4,-75.5,28.8,-65,47.5,-73.2Z" transform="translate(100 100)" />
                    </svg>
                </div>

                <div className="relative z-10 px-8 py-12 md:px-12 md:py-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
                    <div className="space-y-4 max-w-2xl">
                        <div className="flex items-center gap-2 text-orange-400 dark:text-orange-200 font-bold uppercase tracking-widest text-sm animate-in slide-in-from-bottom-2 fade-in duration-500">
                            <Award size={18} />
                            <span>Catalogue Premium</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-white leading-tight animate-in slide-in-from-bottom-4 fade-in duration-700 delay-100">
                            Gérez vos <span className="text-orange-500 dark:text-white decoration-4 underline decoration-orange-500/30 underline-offset-8">Services</span> avec Élégance.
                        </h1>
                        <p className="text-lg text-slate-300 dark:text-orange-100 max-w-xl animate-in slide-in-from-bottom-4 fade-in duration-700 delay-200">
                            Mettez en valeur votre expertise. Un catalogue bien organisé attire jusqu'à 2x plus de clients potentiels.
                        </p>

                        <div className="flex flex-wrap gap-4 pt-4 animate-in slide-in-from-bottom-6 fade-in duration-700 delay-300">
                            <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-orange-500/30 transform hover:-translate-y-1">
                                <Plus size={20} strokeWidth={3} />
                                <span>Nouveau Service</span>
                            </button>
                            <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-4 rounded-2xl font-bold backdrop-blur-md transition-all border border-white/10">
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

            {/* Control Bar */}
            <div className="sticky top-2 z-30 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border border-slate-200 dark:border-zinc-800 rounded-2xl p-4 shadow-lg shadow-slate-200/20 dark:shadow-black/20 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-4">

                    {/* Filter Tabs */}
                    <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto hide-scrollbar pb-1 lg:pb-0">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-300 ${selectedCategory === cat
                                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md transform scale-105'
                                    : 'bg-transparent text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-zinc-800'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 w-full lg:w-auto">
                        <div className="relative flex-1 lg:flex-none group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Rechercher..."
                                className="w-full lg:w-72 pl-11 pr-4 py-3 bg-slate-100 dark:bg-zinc-800 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-orange-500/50 outline-none transition-all"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="h-8 w-px bg-slate-200 dark:bg-zinc-800 mx-1 hidden lg:block" />

                        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-zinc-800 rounded-xl">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded-lg transition-all ${viewMode === 'grid'
                                    ? 'bg-white dark:bg-zinc-700 shadow-sm text-slate-900 dark:text-white'
                                    : 'text-slate-400 hover:text-slate-600'
                                    }`}
                            >
                                <Grid size={18} />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-lg transition-all ${viewMode === 'list'
                                    ? 'bg-white dark:bg-zinc-700 shadow-sm text-slate-900 dark:text-white'
                                    : 'text-slate-400 hover:text-slate-600'
                                    }`}
                            >
                                <List size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Grid Content */}
            <div className={`grid gap-6 sm:gap-8 ${viewMode === 'grid'
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                : 'grid-cols-1'
                } animate-in slide-in-from-bottom-8 fade-in duration-700 delay-500`}>

                {/* Add New Card */}
                <button className="group relative border-2 border-dashed border-slate-200 dark:border-zinc-800 rounded-[2rem] flex flex-col items-center justify-center p-8 hover:border-orange-500 dark:hover:border-orange-500 hover:bg-orange-50/50 dark:hover:bg-orange-900/10 transition-all duration-300 min-h-[400px]">
                    <div className="absolute inset-0 bg-dot-pattern opacity-5 pointer-events-none" />
                    <div className="w-20 h-20 rounded-full bg-slate-50 dark:bg-zinc-800 group-hover:bg-orange-100 dark:group-hover:bg-orange-900/40 flex items-center justify-center text-slate-400 group-hover:text-orange-600 transition-all duration-300 mb-6 group-hover:scale-110 shadow-sm">
                        <Plus size={36} strokeWidth={2.5} />
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-xl mb-2">Ajouter un service</h3>
                    <p className="text-slate-500 text-center max-w-[200px] leading-relaxed">
                        Créez une nouvelle fiche service pour développer votre offre.
                    </p>
                </button>

                {/* Service Cards */}
                {filteredServices.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                ))}
            </div>

            {filteredServices.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in duration-500">
                    <div className="w-24 h-24 bg-slate-50 dark:bg-zinc-900 rounded-full flex items-center justify-center text-slate-300 mb-6 font-bold text-5xl">
                        ?
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Aucun service trouvé</h2>
                    <p className="text-slate-500 max-w-md mx-auto">
                        Nous n'avons trouvé aucun service correspondant à votre recherche. Essayez de changer de catégorie ou de mot-clé.
                    </p>
                    <button
                        onClick={() => { setSearchTerm(""); setSelectedCategory("Tous") }}
                        className="mt-8 text-orange-600 font-bold hover:underline"
                    >
                        Réinitialiser les filtres
                    </button>
                </div>
            )}

        </div>
    );
}
