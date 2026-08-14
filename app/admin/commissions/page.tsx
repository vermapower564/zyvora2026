import React from 'react';
import { Sidebar } from '../../../components/layout/sidebar';
import { SellerService } from '../../../services/seller.service';
import { formatCurrency } from '../../../lib/utils';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';

export default async function AdminCommissionsPage() {
  const sellers = await SellerService.getSellers();

  return (
    <div className="flex min-h-screen">
      <Sidebar type="admin" />

      <main className="flex-1 p-8 space-y-8">
        <div>
          <h1 className="text-3xl font-black text-white">Platform Commission Rates</h1>
          <p className="text-xs text-zinc-400 mt-1">Configure default marketplace commission rates (e.g. 10%) per vendor category.</p>
        </div>

        <div className="p-8 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-6 max-w-2xl">
          <Input label="Default Platform Commission (%)" defaultValue="10" />
          <Button className="w-full">Update Global Rate</Button>
        </div>

        <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-4">
          <h3 className="text-lg font-bold text-white">Per-Vendor Custom Rate Settings</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-zinc-300">
              <thead className="bg-zinc-950 text-xs font-bold uppercase text-zinc-400 border-b border-zinc-800">
                <tr>
                  <th className="px-4 py-3">Store Name</th>
                  <th className="px-4 py-3">Commission Rate</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {sellers.map((s) => (
                  <tr key={s.id}>
                    <td className="px-4 py-3 font-bold text-white">{s.storeName}</td>
                    <td className="px-4 py-3 font-bold text-emerald-400">{(s.commissionRate * 100).toFixed(0)}%</td>
                    <td className="px-4 py-3">
                      <button className="text-xs font-bold text-amber-400 hover:underline">Edit Rate</button>
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
