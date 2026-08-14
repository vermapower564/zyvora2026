import React from 'react';
import { Sidebar } from '../../../components/layout/sidebar';
import { SellerService } from '../../../services/seller.service';

export default async function AdminSellersPage() {
  const sellers = await SellerService.getSellers();

  return (
    <div className="flex min-h-screen">
      <Sidebar type="admin" />

      <main className="flex-1 p-8 space-y-8">
        <div>
          <h1 className="text-3xl font-black text-white">Vendor Approval & Management</h1>
          <p className="text-xs text-zinc-400 mt-1">Verify business documents, configure commission rates, and review vendor status.</p>
        </div>

        <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-zinc-300">
              <thead className="bg-zinc-950 text-xs font-bold uppercase text-zinc-400 border-b border-zinc-800">
                <tr>
                  <th className="px-4 py-3">Store Name</th>
                  <th className="px-4 py-3">Rating</th>
                  <th className="px-4 py-3">Total Sales</th>
                  <th className="px-4 py-3">Commission Fee</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {sellers.map((s) => (
                  <tr key={s.id} className="hover:bg-zinc-800/40">
                    <td className="px-4 py-3 font-bold text-white">{s.storeName}</td>
                    <td className="px-4 py-3 font-bold text-amber-400">★ {s.rating}</td>
                    <td className="px-4 py-3 font-bold text-white">{s.totalSales} items</td>
                    <td className="px-4 py-3 text-emerald-400 font-bold">{(s.commissionRate * 100).toFixed(0)}%</td>
                    <td className="px-4 py-3">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-950 text-emerald-300">
                        {s.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
