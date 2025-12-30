import { useState } from "react";
import { ChevronDown } from "lucide-react";

const OrderStatus = {
    ORDER_PLACED: "ORDER_PLACED",
    PROCESSING: "PROCESSING",
    SHIPPED: "SHIPPED",
    DELIVERED: "DELIVERED",
};

const OrderTableRow = ({ order, index }) => {
    const [status, setStatus] = useState(order.status);

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
        // Logic to update status in the backend/store would go here
    };

    return (
        <tr className="border-b border-slate-100 dark:border-zinc-800/50 hover:bg-slate-50/50 dark:hover:bg-zinc-800/30 transition-colors">
            <td className="py-4 px-4 text-sm font-medium text-[#10B981]">
                {index + 1}
            </td>
            <td className="py-4 px-4">
                <p className="text-sm font-medium text-slate-700 dark:text-zinc-200">{order.user.name}</p>
            </td>
            <td className="py-4 px-4 text-sm font-bold text-slate-800 dark:text-white">
                ${order.total}
            </td>
            <td className="py-4 px-4 text-xs font-bold text-slate-500 dark:text-zinc-400">
                {order.paymentMethod}
            </td>
            <td className="py-4 px-4 text-sm text-slate-400">
                —
            </td>
            <td className="py-4 px-4">
                <div className="relative group min-w-[140px]">
                    <select
                        value={status}
                        onChange={handleStatusChange}
                        className={`appearance-none w-full bg-transparent pr-8 py-1 text-[11px] font-bold uppercase tracking-wider outline-none cursor-pointer transition-colors ${status === 'DELIVERED' ? 'text-green-500' :
                                status === 'SHIPPED' ? 'text-orange-500' :
                                    status === 'PROCESSING' ? 'text-blue-500' : 'text-slate-500'
                            }`}
                    >
                        {Object.values(OrderStatus).map((s) => (
                            <option key={s} value={s} className="bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 font-medium">
                                {s.replace('_', ' ')}
                            </option>
                        ))}
                    </select>
                    <ChevronDown
                        size={14}
                        className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-slate-600 transition-colors"
                    />
                </div>
            </td>
            <td className="py-4 px-4 text-xs text-slate-500 dark:text-zinc-400">
                <p>{new Date(order.createdAt).toLocaleDateString('fr-FR')}</p>
                <p className="text-[10px] opacity-70">{new Date(order.createdAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</p>
            </td>
        </tr>
    );
};

export default OrderTableRow;
