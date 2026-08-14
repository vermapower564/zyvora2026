import React from 'react';
import { Sidebar } from '../../../components/layout/sidebar';

export default function AdminReturnsPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar type="admin" />

      <main className="flex-1 p-8 space-y-8">
        <div>
          <h1 className="text-3xl font-black text-white">System Returns & Dispute Resolution</h1>
          <p className="text-xs text-zinc-400 mt-1">Platform-wide return disputes oversight.</p>
        </div>

        <div className="p-12 text-center rounded-3xl bg-zinc-900 border border-zinc-800 space-y-3">
          <h3 className="text-lg font-bold text-white">No active platform disputes</h3>
          <p className="text-sm text-zinc-400">Buyer protection claims are currently clear.</p>
        </div>
      </main>
    </div>
  );
}
