import { useState } from "react";
import { Edit2, Trash2, CheckCircle2, XCircle } from "lucide-react";

const ProductTableRow = ({ product, index }) => {
    const [inStock, setInStock] = useState(product.inStock);

    const toggleStock = () => {
        setInStock(!inStock);
        // API call logic would go here
    };

    return (
        <tr className="border-b border-slate-100 dark:border-zinc-800/50 hover:bg-slate-50/50 dark:hover:bg-zinc-800/30 transition-colors">
            <td className="py-4 px-4 text-sm font-medium text-slate-500 dark:text-zinc-500">
                {index + 1}
            </td>
            <td className="py-4 px-4">
                <div className="flex items-center gap-3">
                    <div className="size-10 rounded-lg bg-slate-100 dark:bg-zinc-800 overflow-hidden flex-shrink-0 border border-slate-200 dark:border-zinc-700">
                        <img
                            src={product.images[0] || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&q=80"}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="min-w-0">
                        <p className="font-semibold text-slate-700 dark:text-white truncate max-w-[180px]">{product.name}</p>
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{product.category}</p>
                    </div>
                </div>
            </td>

            <td className="py-4 px-4 hidden lg:table-cell text-sm text-slate-400 line-through">
                {product.mrp.toLocaleString()} €
            </td>

            <td className="py-4 px-4 text-sm font-bold text-slate-700 dark:text-zinc-200">
                {product.price.toLocaleString()} €
            </td>

            <td className="py-4 px-4">
                <button
                    onClick={toggleStock}
                    className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors focus:outline-none ${inStock ? 'bg-orange-500' : 'bg-slate-200 dark:bg-zinc-700'
                        }`}
                >
                    <span
                        className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${inStock ? 'translate-x-[22px]' : 'translate-x-1'
                            }`}
                    />
                </button>
            </td>

            <td className="py-4 px-4 hidden sm:table-cell text-sm text-slate-500 dark:text-zinc-400">
                {new Date(product.createdAt).toLocaleDateString('fr-FR')}
            </td>

            <td className="py-4 px-4 text-right">
                <div className="flex items-center justify-end gap-1">
                    <button className="p-1.5 rounded-lg hover:bg-orange-50 text-orange-500 transition-colors">
                        <Edit2 size={16} />
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors">
                        <Trash2 size={16} />
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default ProductTableRow;
