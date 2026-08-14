'use client';

import React from 'react';
import { AppShell } from '../../components/layout/app-shell';
import { HardDrive, Laptop, Monitor, Plus, CheckCircle2, Shield } from 'lucide-react';
import { Button } from '../../components/ui/button';

export default function ITAssetsPage() {
  const assets = [
    { id: 'ast_1', assetTag: 'AST-LAP-01', name: 'MacBook Pro 16" M3 Max', category: 'LAPTOP', assignedTo: 'Roushan Verma', serialNumber: 'C02GX921MD6R', status: 'ASSIGNED', purchaseDate: '2024-01-15' },
    { id: 'ast_2', assetTag: 'AST-LAP-02', name: 'Dell XPS 15 9530', category: 'LAPTOP', assignedTo: 'Marcus Vance', serialNumber: '8910-XPS-2024', status: 'ASSIGNED', purchaseDate: '2024-02-10' },
    { id: 'ast_3', assetTag: 'AST-MON-01', name: 'Apple Studio Display 27" 5K', category: 'MONITOR', assignedTo: 'Elena Rostova', serialNumber: 'F4HKL0192M', status: 'ASSIGNED', purchaseDate: '2024-03-01' },
    { id: 'ast_4', assetTag: 'AST-LAP-03', name: 'Lenovo ThinkPad P1 Gen 6', category: 'LAPTOP', assignedTo: undefined, serialNumber: 'PF-49129-LNV', status: 'AVAILABLE', purchaseDate: '2024-05-20' },
  ];

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-white">IT Asset Management</h1>
            <p className="text-sm text-zinc-400 mt-1">
              Track company hardware inventory, serial numbers, employee assignments, and warranty maintenance status.
            </p>
          </div>

          <Button className="gap-2 text-xs">
            <Plus className="w-4 h-4" /> Add Hardware Asset
          </Button>
        </div>

        <div className="w-full overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-900">
          <table className="w-full text-left text-sm text-zinc-300">
            <thead className="bg-zinc-950 text-xs font-bold uppercase text-zinc-400 border-b border-zinc-800">
              <tr>
                <th className="px-5 py-4">Asset Tag</th>
                <th className="px-5 py-4">Hardware Item</th>
                <th className="px-5 py-4">Category</th>
                <th className="px-5 py-4">Serial Number</th>
                <th className="px-5 py-4">Assigned Employee</th>
                <th className="px-5 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {assets.map((a) => (
                <tr key={a.id} className="hover:bg-zinc-800/50 transition-colors">
                  <td className="px-5 py-4 font-mono font-bold text-white">{a.assetTag}</td>
                  <td className="px-5 py-4 font-bold text-white">{a.name}</td>
                  <td className="px-5 py-4 text-xs font-mono text-zinc-400">{a.category}</td>
                  <td className="px-5 py-4 text-xs font-mono text-zinc-500">{a.serialNumber}</td>
                  <td className="px-5 py-4 text-xs text-zinc-300 font-medium">{a.assignedTo || 'Unassigned (Stock)'}</td>
                  <td className="px-5 py-4">
                    {a.status === 'ASSIGNED' ? (
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-950 text-blue-300 border border-blue-800">
                        ASSIGNED
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                        AVAILABLE
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
