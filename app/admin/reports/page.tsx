import React from 'react';
import { Sidebar } from '../../../components/layout/sidebar';
import { FileText, Download } from 'lucide-react';
import { Button } from '../../../components/ui/button';

export default function AdminReportsPage() {
  const reports = [
    { title: 'Q1 Financial & Sales Performance Report', date: '2026-02-01', size: '2.4 MB' },
    { title: 'Vendor Growth & Commission Ledger', date: '2026-01-31', size: '1.8 MB' },
    { title: 'HR Employee Attendance & Payroll Audit', date: '2026-01-31', size: '3.1 MB' },
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar type="admin" />

      <main className="flex-1 p-8 space-y-8">
        <div>
          <h1 className="text-3xl font-black text-white">Exportable Analytics & Reports</h1>
          <p className="text-xs text-zinc-400 mt-1">Download official CSV & PDF business intelligence reports.</p>
        </div>

        <div className="space-y-4">
          {reports.map((r) => (
            <div key={r.title} className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-zinc-800 text-amber-400">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">{r.title}</h3>
                  <span className="text-xs text-zinc-400">Generated on {r.date} • {r.size}</span>
                </div>
              </div>

              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" /> Download Report
              </Button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
