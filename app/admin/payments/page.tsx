import React from 'react';
import { Sidebar } from '../../../components/layout/sidebar';
import { formatCurrency } from '../../../lib/utils';
import { CreditCard, CheckCircle2 } from 'lucide-react';

export default function AdminPaymentsPage() {
  const transactions = [
    { id: 'txn_stripe_101', order: 'ZYV-881920', method: 'Credit Card (Stripe)', amount: 293.99, status: 'PAID', date: '2026-02-01 14:20' },
    { id: 'txn_paypal_102', order: 'ZYV-881921', method: 'PayPal Wallet', amount: 592.92, status: 'PAID', date: '2026-02-10 09:15' },
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar type="admin" />

      <main className="flex-1 p-8 space-y-8">
        <div>
          <h1 className="text-3xl font-black text-white">Payment Gateway Ledger</h1>
          <p className="text-xs text-zinc-400 mt-1">Audit Stripe & PayPal gateway logs, transaction IDs, and settlement statuses.</p>
        </div>

        <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-zinc-300">
              <thead className="bg-zinc-950 text-xs font-bold uppercase text-zinc-400 border-b border-zinc-800">
                <tr>
                  <th className="px-4 py-3">Transaction ID</th>
                  <th className="px-4 py-3">Order Number</th>
                  <th className="px-4 py-3">Gateway</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {transactions.map((t) => (
                  <tr key={t.id} className="hover:bg-zinc-800/40">
                    <td className="px-4 py-3 font-mono text-xs text-amber-400 font-bold">{t.id}</td>
                    <td className="px-4 py-3 font-bold text-white">{t.order}</td>
                    <td className="px-4 py-3">{t.method}</td>
                    <td className="px-4 py-3 font-bold text-white">{formatCurrency(t.amount)}</td>
                    <td className="px-4 py-3">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-950 text-emerald-300">
                        {t.status}
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
