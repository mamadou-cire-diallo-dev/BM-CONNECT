import OrderTableRow from "../../components/Vendor/OrderTableRow";

const mockOrders = [
    { id: "1", user: { name: "Hrishabh Shrivastava" }, total: 234, paymentMethod: "STRIPE", status: "ORDER_PLACED", createdAt: "2025-12-28T18:12:38Z" },
    { id: "2", user: { name: "vasuki talluri" }, total: 234, paymentMethod: "STRIPE", status: "ORDER_PLACED", createdAt: "2025-12-28T11:27:11Z" },
    { id: "3", user: { name: "Khushal Kalsariya" }, total: 104, paymentMethod: "STRIPE", status: "ORDER_PLACED", createdAt: "2025-12-28T06:35:08Z" },
    { id: "4", user: { name: "Khushal Kalsariya" }, total: 234, paymentMethod: "COD", status: "ORDER_PLACED", createdAt: "2025-12-28T06:25:23Z" },
    { id: "5", user: { name: "Hamza Akif" }, total: 234, paymentMethod: "COD", status: "SHIPPED", createdAt: "2025-12-25T15:46:08Z" },
];

const Orders = () => {
    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-slate-50/80 dark:bg-zinc-800/80">
                                <th className="py-4 px-4 text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-zinc-400">SR. NO.</th>
                                <th className="py-4 px-4 text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-zinc-400">CUSTOMER</th>
                                <th className="py-4 px-4 text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-zinc-400">TOTAL</th>
                                <th className="py-4 px-4 text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-zinc-400">PAYMENT</th>
                                <th className="py-4 px-4 text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-zinc-400">COUPON</th>
                                <th className="py-4 px-4 text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-zinc-400">STATUS</th>
                                <th className="py-4 px-4 text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-zinc-400">DATE</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
                            {mockOrders.map((order, index) => (
                                <OrderTableRow key={order.id} order={order} index={index} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Orders;
