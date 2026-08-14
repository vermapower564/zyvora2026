import React from 'react';
import { Sidebar } from '../../../components/layout/sidebar';
import { SellerService } from '../../../services/seller.service';
import { formatCurrency, formatDate } from '../../../lib/utils';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '../../../components/ui/button';

export default async function AdminPayoutsPage() {
  const payouts = await SellerService.getPayouts('sel_tech');

  return (
    <div className="flex min-h-screen">
      <Sidebar type="admin" />

      <main className="flex-1 p-8 space-y-8">
        <div>
          <h1 className="text-3xl font-black text-white">Vendor Payout Approvals</h1>
          <p className="text-xs text-zinc-400 mt-1">Approve pending vendor payout requests and trigger ACH bank transfers.</p>
        </div>

        <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-zinc-300">
              <thead className="bg-zinc-950 text-xs font-bold uppercase text-zinc-400 border-b border-zinc-800">
                <tr>
                  <th className="px-4 py-3">Payout ID</th>
                  <th className="px-4 py-3">Requested Date</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Approval Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {payouts.map((p) => (
                  <tr key={p.id} className="hover:bg-zinc-800/40">
                    <td className="px-4 py-3 font-bold text-white">{p.id}</td>
                    <td className="px-4 py-3 text-xs text-zinc-400">{formatDate(p.requestedAt)}</td>
                    <td className="px-4 py-3 font-bold text-white">{formatCurrency(p.amount)}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${p.status === 'PROCESSED' ? 'bg-emerald-950 text-emerald-300' : 'bg-amber-950 text-amber-300'}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {p.status === 'PENDING' ? (
                        <Button size="sm" className="text-xs py-1">Approve Payout</Button>
                      ) : (
                        <span className="text-xs text-zinc-500 font-mono">Completed</span>
                      )}
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
