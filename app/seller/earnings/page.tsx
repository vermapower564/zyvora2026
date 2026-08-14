import React from 'react';
import { Sidebar } from '../../../components/layout/sidebar';
import { SellerService } from '../../../services/seller.service';
import { formatCurrency } from '../../../lib/utils';
import { DollarSign, TrendingUp, CreditCard } from 'lucide-react';

export default async function SellerEarningsPage() {
  const seller = await SellerService.getSellerById('sel_tech');
  const payouts = await SellerService.getPayouts('sel_tech');

  const grossSales = 18450.0;
  const commissionPaid = grossSales * (seller?.commissionRate || 0.1);
  const netEarnings = grossSales - commissionPaid;

  return (
    <div className="flex min-h-screen">
      <Sidebar type="seller" />

      <main className="flex-1 p-8 space-y-8">
        <div>
          <h1 className="text-3xl font-black text-white">Earnings & Revenue Breakdown</h1>
          <p className="text-xs text-zinc-400 mt-1">Detailed financial ledger, commission deductions, and net revenue balance.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-2">
            <span className="text-xs font-bold uppercase text-zinc-400">Gross Sales</span>
            <span className="text-2xl font-black text-white block">{formatCurrency(grossSales)}</span>
          </div>

          <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-2">
            <span className="text-xs font-bold uppercase text-zinc-400">Platform Commission ({((seller?.commissionRate || 0.1) * 100).toFixed(0)}%)</span>
            <span className="text-2xl font-black text-rose-400 block">-{formatCurrency(commissionPaid)}</span>
          </div>

          <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-2">
            <span className="text-xs font-bold uppercase text-zinc-400">Net Earned Payout Balance</span>
            <span className="text-2xl font-black text-emerald-400 block">{formatCurrency(netEarnings)}</span>
          </div>
        </div>
      </main>
    </div>
  );
}
