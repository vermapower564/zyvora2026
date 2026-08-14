import React from 'react';
import { Sidebar } from '../../../components/layout/sidebar';
import { Plus, Tag } from 'lucide-react';
import { Button } from '../../../components/ui/button';

export default function AdminCouponsPage() {
  const coupons = [
    { code: 'ZYVORA10', discount: '10% OFF', active: true, used: 142 },
    { code: 'WELCOME10', discount: '10% OFF', active: true, used: 89 },
    { code: 'SUPER20', discount: '20% OFF', active: true, used: 54 },
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar type="admin" />

      <main className="flex-1 p-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-white">Coupons & Promo Codes Manager</h1>
            <p className="text-xs text-zinc-400 mt-1">Create promotional discount codes and track usage statistics.</p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" /> Create Coupon
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {coupons.map((c) => (
            <div key={c.code} className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-lg font-black text-amber-400 flex items-center gap-2">
                  <Tag className="w-5 h-5" /> {c.code}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-950 text-emerald-300">
                  Active
                </span>
              </div>
              <h3 className="text-2xl font-black text-white">{c.discount}</h3>
              <span className="text-xs text-zinc-400 block">Redeemed {c.used} times</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
