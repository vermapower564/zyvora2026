'use client';

import React from 'react';
import { AppShell } from '../../components/layout/app-shell';
import { Megaphone, TrendingUp, Plus } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { formatCurrency } from '../../lib/utils';

export default function DigitalMarketingPage() {
  const campaigns = [
    { id: 'ad_1', name: 'Google Ads — Enterprise OMS Search', platform: 'Google Ads', budget: 15000, adSpend: 11200, leads: 340, cpl: 32.94, roas: 4.8, ctr: 3.85, impressions: 85000 },
    { id: 'ad_2', name: 'LinkedIn B2B Decision Maker Campaign', platform: 'LinkedIn Ads', budget: 20000, adSpend: 16500, leads: 180, cpl: 91.66, roas: 3.2, ctr: 2.15, impressions: 42000 },
  ];

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-white">Digital Marketing & ROAS</h1>
            <p className="text-sm text-zinc-400 mt-1">
              Track paid acquisition campaigns, ad spend budget utilization, Cost-Per-Lead (CPL), and Return-On-Ad-Spend (ROAS).
            </p>
          </div>

          <Button className="gap-2 text-xs">
            <Plus className="w-4 h-4" /> Create Ad Campaign
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {campaigns.map((cmp) => (
            <div key={cmp.id} className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4 hover:border-zinc-700 transition-all">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white">{cmp.name}</h3>
                  <span className="text-xs text-zinc-400 font-medium">{cmp.platform}</span>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                  ROAS {cmp.roas}x
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-zinc-950 p-4 rounded-xl border border-zinc-800 font-mono">
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase block">Ad Spend</span>
                  <strong className="text-white">{formatCurrency(cmp.adSpend)}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase block">Leads</span>
                  <strong className="text-emerald-400">{cmp.leads}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase block">CPL</span>
                  <strong className="text-white">${cmp.cpl}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase block">CTR</span>
                  <strong className="text-purple-400">{cmp.ctr}%</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
