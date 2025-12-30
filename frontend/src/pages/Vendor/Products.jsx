import { Search, Plus, Filter, ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";
import ProductTableRow from "../../components/Vendor/ProductTableRow";

// Test data based on Prisma Schema
const mockProducts = [
    {
        id: "prod_1",
        name: "iPhone 15 Pro Max",
        description: "Le dernier iPhone avec processeur A17 Pro.",
        mrp: 1499,
        price: 1399,
        images: ["https://images.unsplash.com/photo-1696446701796-da61225697cc?w=400&q=80"],
        category: "ELECTRONICS",
        inStock: true,
        createdAt: "2025-12-15T10:00:00Z",
    },
    {
        id: "prod_2",
        name: "MacBook Air M2",
        description: "Puissance et portabilité extrêmes.",
        mrp: 1299,
        price: 1149,
        images: ["https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=400&q=80"],
        category: "ELECTRONICS",
        inStock: true,
        createdAt: "2025-12-20T14:30:00Z",
    },
    {
        id: "prod_3",
        name: "Casque Bose QuietComfort",
        description: "Réduction de bruit inégalée.",
        mrp: 349,
        price: 299,
        images: ["https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&q=80"],
        category: "AUDIO",
        inStock: false,
        createdAt: "2025-12-28T09:15:00Z",
    },
    {
        id: "prod_4",
        name: "Nike Air Force 1",
        description: "Le classique indémodable.",
        mrp: 110,
        price: 95,
        images: ["https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&q=80"],
        category: "FASHION",
        inStock: true,
        createdAt: "2025-12-29T11:20:00Z",
    },
    {
        id: "prod_5",
        name: "Samsung Galaxy Watch 6",
        description: "Votre compagnon santé au quotidien.",
        mrp: 299,
        price: 249,
        images: ["https://images.unsplash.com/photo-1544117518-30dd54b99bbd?w=400&q=80"],
        category: "ELECTRONICS",
        inStock: true,
        createdAt: "2025-12-28T18:45:00Z",
    },
];

const Products = () => {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Mes Produits</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Gérez votre inventaire avec précision.</p>
                </div>
                <button className="flex items-center justify-center gap-2 bg-[#0F172A] hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-sm active:scale-95">
                    <Plus size={18} />
                    Ajouter un Produit
                </button>
            </div>

            {/* Products Table Container */}
            <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
                {/* Search & Filter Bar */}
                <div className="p-4 border-b border-slate-100 dark:border-zinc-800 flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-50/50 dark:bg-zinc-900/50">
                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                            type="text"
                            placeholder="Rechercher un produit..."
                            className="w-full pl-9 pr-4 py-2 text-sm bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg outline-none focus:ring-1 focus:ring-orange-500 transition-all dark:text-white"
                        />
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                        <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 hover:bg-slate-50 transition-colors">
                            <Filter size={14} />
                            Filtres
                        </button>
                        <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-lg text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 hover:bg-slate-50 transition-colors">
                            <ArrowUpDown size={14} />
                            Trier
                        </button>
                    </div>
                </div>

                {/* Table Render */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[600px]">
                        <thead>
                            <tr className="bg-slate-50/80 dark:bg-zinc-800/80">
                                <th className="py-4 px-4 text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-zinc-400 w-16">No.</th>
                                <th className="py-4 px-4 text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-zinc-400">Produit</th>
                                <th className="py-4 px-4 text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-zinc-400 hidden lg:table-cell">MRP</th>
                                <th className="py-4 px-4 text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-zinc-400">Prix</th>
                                <th className="py-4 px-4 text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-zinc-400">Stock</th>
                                <th className="py-4 px-4 text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-zinc-400 hidden sm:table-cell">Date</th>
                                <th className="py-4 px-4 text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-zinc-400 text-right pr-6">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 dark:divide-zinc-800">
                            {mockProducts.map((product, index) => (
                                <ProductTableRow key={product.id} product={product} index={index} />
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination inspired by modern dashboards */}
                <div className="p-4 bg-slate-50/30 dark:bg-zinc-900/30 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-500 dark:text-zinc-400">
                        Affichage de <span className="text-slate-800 dark:text-white font-bold">5</span> sur <span className="text-slate-800 dark:text-white font-bold">5</span> produits
                    </span>
                    <div className="flex gap-1">
                        <button className="p-1.5 rounded-md border border-slate-200 dark:border-zinc-800 text-slate-400 hover:bg-white transition-colors disabled:opacity-30" disabled>
                            <ChevronLeft size={16} />
                        </button>
                        <button className="flex items-center justify-center size-8 rounded-md bg-orange-500 text-white text-xs font-bold">1</button>
                        <button className="p-1.5 rounded-md border border-slate-200 dark:border-zinc-800 text-slate-400 hover:bg-white transition-colors disabled:opacity-30" disabled>
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;
