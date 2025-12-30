import { Trash2, XCircle } from "lucide-react";

const CouponTableRow = ({ coupon, index }) => {
    return (
        <tr className="border-b border-slate-100 dark:border-zinc-800/50 hover:bg-slate-50/50 dark:hover:bg-zinc-800/30 transition-colors">
            <td className="py-4 px-4">
                <span className="font-bold text-slate-700 dark:text-white uppercase tracking-wider">{coupon.code}</span>
            </td>
            <td className="py-4 px-4">
                <p className="text-sm text-slate-600 dark:text-zinc-400 truncate max-w-[200px]">{coupon.description}</p>
            </td>
            <td className="py-4 px-4 text-sm font-medium text-slate-700 dark:text-zinc-300">
                {coupon.discount}%
            </td>
            <td className="py-4 px-4 text-sm text-slate-500 dark:text-zinc-400">
                {new Date(coupon.expiresAt).toLocaleDateString('fr-FR')}
            </td>
            <td className="py-4 px-4">
                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${coupon.forNewUser ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400'}`}>
                    {coupon.forNewUser ? 'Yes' : 'No'}
                </span>
            </td>
            <td className="py-4 px-4">
                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${coupon.forMember ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'}`}>
                    {coupon.forMember ? 'Yes' : 'No'}
                </span>
            </td>
            <td className="py-4 px-4 text-right">
                <button className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors">
                    <Trash2 size={16} />
                </button>
            </td>
        </tr>
    );
};

export default CouponTableRow;
