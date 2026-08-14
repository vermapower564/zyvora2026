'use client';

import React from 'react';
import { AppShell } from '../../components/layout/app-shell';
import { FileCheck2, AlertTriangle, Plus } from 'lucide-react';
import { Button } from '../../components/ui/button';

export default function ResignationsPage() {
  const resignations = [
    {
      id: 'res_1',
      employeeName: 'Alexander Hayes',
      department: 'Software Engineering',
      role: 'Full Stack Engineer',
      resignationDate: '2026-08-01',
      noticePeriod: 30,
      lastWorkingDay: '2026-08-31',
      reason: 'Pursuing higher studies abroad',
      status: 'UNDER_REVIEW',
    },
  ];

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-white">Resignation Management</h1>
            <p className="text-sm text-zinc-400 mt-1">
              Track employee exit requests, notice periods, exit interviews, and asset handover checklists.
            </p>
          </div>

          <Button className="gap-2 text-xs">
            <Plus className="w-4 h-4" /> Submit Resignation Request
          </Button>
        </div>

        <div className="w-full overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-900">
          <table className="w-full text-left text-sm text-zinc-300">
            <thead className="bg-zinc-950 text-xs font-bold uppercase text-zinc-400 border-b border-zinc-800">
              <tr>
                <th className="px-5 py-4">Employee</th>
                <th className="px-5 py-4">Department & Role</th>
                <th className="px-5 py-4">Submitted Date</th>
                <th className="px-5 py-4">Notice Period</th>
                <th className="px-5 py-4">Last Working Day</th>
                <th className="px-5 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {resignations.map((r) => (
                <tr key={r.id} className="hover:bg-zinc-800/50 transition-colors">
                  <td className="px-5 py-4 font-bold text-white">{r.employeeName}</td>
                  <td className="px-5 py-4 text-xs">
                    <div className="font-bold text-zinc-200">{r.department}</div>
                    <div className="text-zinc-500">{r.role}</div>
                  </td>
                  <td className="px-5 py-4 text-xs font-mono text-zinc-400">{r.resignationDate}</td>
                  <td className="px-5 py-4 text-xs font-bold text-white">{r.noticePeriod} days</td>
                  <td className="px-5 py-4 text-xs font-mono text-amber-400 font-bold">{r.lastWorkingDay}</td>
                  <td className="px-5 py-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-950 text-amber-300 border border-amber-800">
                      {r.status}
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
