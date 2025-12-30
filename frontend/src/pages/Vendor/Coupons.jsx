import { Plus, Search, Filter, ArrowUpDown } from "lucide-react";
import CouponTableRow from "../../components/Vendor/CouponTableRow";

const mockCoupons = [
    { code: "NEW20", description: "20% Off for New Users", discount: 20, expiresAt: "2026-12-31", forNewUser: true, forMember: false },
    { code: "NEW10", description: "10% Off for New Users", discount: 10, expiresAt: "2026-12-31", forNewUser: true, forMember: false },
    { code: "OFF20", description: "20% Off for All Users", discount: 20, expiresAt: "2026-12-31", forNewUser: false, forMember: false },
    { code: "OFF10", description: "10% Off for All Users", discount: 10, expiresAt: "2026-12-31", forNewUser: false, forMember: false },
    { code: "PLUS10", description: "20% Off for Members", discount: 10, expiresAt: "2027-03-06", forNewUser: false, forMember: true },
];

const Coupons = () => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-slate-800 dark:text-white">List <span className="text-slate-500 font-medium">Coupons</span></h1>
                <button className="bg-[#0F172A] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-800 transition-all flex items-center gap-2">
                    <Plus size={16} />
                    Create Coupon
                </button>
            </div>

            <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[700px]">
                        <thead>
                            <tr className="bg-slate-50/80 dark:bg-zinc-800/80">
                                <th className="py-4 px-4 text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-zinc-400">Code</th>
                                <th className="py-4 px-4 text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-zinc-400">Description</th>
                                <th className="py-4 px-4 text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-zinc-400">Discount</th>
                                <th className="py-4 px-4 text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-zinc-400">Expires At</th>
                                <th className="py-4 px-4 text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-zinc-400">New User</th>
                                <th className="py-4 px-4 text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-zinc-400">For Member</th>
                                <th className="py-4 px-4 text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-zinc-400 text-right pr-6">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
                            {mockCoupons.map((coupon, index) => (
                                <CouponTableRow key={coupon.code} coupon={coupon} index={index} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Coupons;
