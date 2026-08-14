'use client';

import React from 'react';
import { AppShell } from '../../components/layout/app-shell';
import { FileText, Download, Eye, Plus, ShieldCheck } from 'lucide-react';
import { Button } from '../../components/ui/button';

export default function DocumentsPage() {
  const docs = [
    { id: 'doc_1', fileName: 'Global_FinTech_Master_Services_Contract_2026.pdf', category: 'CONTRACT', fileSize: '2.4 MB', uploadedBy: 'Elena Rostova', verification: 'VERIFIED', createdAt: '2026-08-10' },
    { id: 'doc_2', fileName: 'Zyvora_Staff_Payroll_Disbursal_Ledger_Aug2026.pdf', category: 'PAYROLL', fileSize: '1.1 MB', uploadedBy: 'David Sterling', verification: 'VERIFIED', createdAt: '2026-08-01' },
    { id: 'doc_3', fileName: 'Aura_Sound_Labs_SLA_Agreement.pdf', category: 'PROJECT', fileSize: '3.8 MB', uploadedBy: 'Roushan Verma', verification: 'VERIFIED', createdAt: '2026-07-20' },
  ];

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-white">PDF Document Center</h1>
            <p className="text-sm text-zinc-400 mt-1">
              Centralized repository for HR contracts, payroll ledgers, client SLAs, and legal verification documents.
            </p>
          </div>

          <Button className="gap-2 text-xs">
            <Plus className="w-4 h-4" /> Upload Document
          </Button>
        </div>

        <div className="w-full overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-900">
          <table className="w-full text-left text-sm text-zinc-300">
            <thead className="bg-zinc-950 text-xs font-bold uppercase text-zinc-400 border-b border-zinc-800">
              <tr>
                <th className="px-5 py-4">Document File Name</th>
                <th className="px-5 py-4">Category</th>
                <th className="px-5 py-4">File Size</th>
                <th className="px-5 py-4">Uploaded By</th>
                <th className="px-5 py-4">Verification</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {docs.map((d) => (
                <tr key={d.id} className="hover:bg-zinc-800/50 transition-colors">
                  <td className="px-5 py-4 font-bold text-white flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-rose-400 shrink-0" />
                    <span className="truncate max-w-sm">{d.fileName}</span>
                  </td>
                  <td className="px-5 py-4 text-xs font-mono font-bold text-zinc-400">{d.category}</td>
                  <td className="px-5 py-4 text-xs font-mono text-zinc-500">{d.fileSize}</td>
                  <td className="px-5 py-4 text-xs font-medium text-white">{d.uploadedBy}</td>
                  <td className="px-5 py-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-950 text-emerald-300 border border-emerald-800 flex items-center gap-1 w-max">
                      <ShieldCheck className="w-3.5 h-3.5" /> VERIFIED
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800" title="Preview PDF">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800" title="Download Document">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
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
