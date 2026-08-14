'use client';

import React, { useState, useEffect } from 'react';
import { AppShell } from '../../components/layout/app-shell';
import { HRMSService } from '../../services/hrms.service';
import { PayrollRecord } from '../../types/hrms';
import { formatCurrency } from '../../lib/utils';
import { DollarSign, CheckCircle2, Clock, Plus } from 'lucide-react';
import { Button } from '../../components/ui/button';

export default function PayrollPage() {
  const [payroll, setPayroll] = useState<PayrollRecord[]>([]);

  useEffect(() => {
    HRMSService.getPayroll().then(setPayroll);
  }, []);

  const totalDisbursed = payroll.filter((p) => p.status === 'APPROVED' || p.status === 'DISBURSED').reduce((sum, p) => sum + p.netPay, 0);

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-white">Payroll & Compensation</h1>
            <p className="text-sm text-zinc-400 mt-1">
              Process monthly salary disbursals, bonuses, tax deductions, and executive payroll sign-offs.
            </p>
          </div>

          <Button className="gap-2 text-xs">
            <Plus className="w-4 h-4" /> Process Batch Payroll
          </Button>
        </div>

        {/* Total Payroll KPI */}
        <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase text-zinc-400">Total Monthly Disbursal</span>
            <div className="text-3xl font-black text-emerald-400">{formatCurrency(totalDisbursed)}</div>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
            August 2026 Batch
          </span>
        </div>

        {/* Payroll Table */}
        <div className="w-full overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-900">
          <table className="w-full text-left text-sm text-zinc-300">
            <thead className="bg-zinc-950 text-xs font-bold uppercase text-zinc-400 border-b border-zinc-800">
              <tr>
                <th className="px-5 py-4">Employee</th>
                <th className="px-5 py-4">Month / Cycle</th>
                <th className="px-5 py-4">Base Salary</th>
                <th className="px-5 py-4">Bonuses</th>
                <th className="px-5 py-4">Deductions</th>
                <th className="px-5 py-4">Net Payable</th>
                <th className="px-5 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {payroll.map((p) => (
                <tr key={p.id} className="hover:bg-zinc-800/50 transition-colors">
                  <td className="px-5 py-4 font-bold text-white">{p.employeeName}</td>
                  <td className="px-5 py-4 text-xs font-mono text-zinc-400">{p.monthYear}</td>
                  <td className="px-5 py-4 font-mono text-zinc-300">{formatCurrency(p.baseSalary)}</td>
                  <td className="px-5 py-4 font-mono text-emerald-400">+{formatCurrency(p.bonuses)}</td>
                  <td className="px-5 py-4 font-mono text-rose-400">-{formatCurrency(p.deductions)}</td>
                  <td className="px-5 py-4 font-bold text-white">{formatCurrency(p.netPay)}</td>
                  <td className="px-5 py-4">
                    {p.status === 'APPROVED' || p.status === 'DISBURSED' ? (
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                        APPROVED
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-950 text-amber-300 border border-amber-800">
                        PENDING
                      </span>
                    )}
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
