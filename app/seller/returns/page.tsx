import React from 'react';
import { Sidebar } from '../../../components/layout/sidebar';

export default function SellerReturnsPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar type="seller" />

      <main className="flex-1 p-8 space-y-8">
        <div>
          <h1 className="text-3xl font-black text-white">Returns & Refund Requests</h1>
          <p className="text-xs text-zinc-400 mt-1">Review buyer return claims and approve refunds.</p>
        </div>

        <div className="p-12 text-center rounded-3xl bg-zinc-900 border border-zinc-800 space-y-3">
          <h3 className="text-lg font-bold text-white">No active return requests</h3>
          <p className="text-sm text-zinc-400">All customer orders have been delivered without return disputes.</p>
        </div>
      </main>
    </div>
  );
}
