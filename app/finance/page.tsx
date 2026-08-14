'use client';

import React, { useState, useEffect } from 'react';
import { AppShell } from '../../components/layout/app-shell';
import { HRMSService } from '../../services/hrms.service';
import { FinanceTransaction } from '../../types/hrms';
import { formatCurrency } from '../../lib/utils';
import { Receipt, ArrowUpRight, ArrowDownRight, Plus } from 'lucide-react';
import { Button } from '../../components/ui/button';

export default function FinancePage() {
  const [transactions, setTransactions] = useState<FinanceTransaction[]>([]);

  useEffect(() => {
    HRMSService.getFinanceTransactions().then(setTransactions);
  }, []);

  const totalIncome = transactions.filter((t) => t.type === 'INCOME').reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions.filter((t) => t.type === 'EXPENSE').reduce((sum, t) => sum + t.amount, 0);
  const netBalance = totalIncome - totalExpense;

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-white">Finance Ledger & Cash Flow</h1>
            <p className="text-sm text-zinc-400 mt-1">
              Track revenue streams, operational expenses, client invoices, cloud infrastructure costs, and net balance.
            </p>
          </div>

          <Button className="gap-2 text-xs">
            <Plus className="w-4 h-4" /> Record Transaction
          </Button>
        </div>

        {/* Finance KPI Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-1">
            <span className="text-xs font-bold text-zinc-400 uppercase">Total Revenue (Income)</span>
            <div className="text-2xl font-black text-emerald-400">{formatCurrency(totalIncome)}</div>
          </div>
          <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-1">
            <span className="text-xs font-bold text-zinc-400 uppercase">Total Expenses</span>
            <div className="text-2xl font-black text-rose-400">{formatCurrency(totalExpense)}</div>
          </div>
          <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-1">
            <span className="text-xs font-bold text-zinc-400 uppercase">Net Balance</span>
            <div className="text-2xl font-black text-white">{formatCurrency(netBalance)}</div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="w-full overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-900">
          <table className="w-full text-left text-sm text-zinc-300">
            <thead className="bg-zinc-950 text-xs font-bold uppercase text-zinc-400 border-b border-zinc-800">
              <tr>
                <th className="px-5 py-4">Transaction Title</th>
                <th className="px-5 py-4">Category</th>
                <th className="px-5 py-4">Date</th>
                <th className="px-5 py-4">Type</th>
                <th className="px-5 py-4">Amount</th>
                <th className="px-5 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {transactions.map((t) => (
                <tr key={t.id} className="hover:bg-zinc-800/50 transition-colors">
                  <td className="px-5 py-4 font-bold text-white">{t.title}</td>
                  <td className="px-5 py-4 text-xs">
                    <span className="px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-300 font-medium">
                      {t.category}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-xs font-mono text-zinc-400">{t.date}</td>
                  <td className="px-5 py-4">
                    {t.type === 'INCOME' ? (
                      <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                        <ArrowUpRight className="w-3.5 h-3.5" /> INCOME
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-rose-400 flex items-center gap-1">
                        <ArrowDownRight className="w-3.5 h-3.5" /> EXPENSE
                      </span>
                    )}
                  </td>
                  <td className={`px-5 py-4 font-bold font-mono ${t.type === 'INCOME' ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {t.type === 'INCOME' ? '+' : '-'}{formatCurrency(t.amount)}
                  </td>
                  <td className="px-5 py-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
