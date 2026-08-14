'use client';

import React, { useState, useEffect } from 'react';
import { AppShell } from '../../components/layout/app-shell';
import { HRMSService } from '../../services/hrms.service';
import { SalesDeal } from '../../types/hrms';
import { formatCurrency } from '../../lib/utils';
import { Plus, TrendingUp, DollarSign } from 'lucide-react';
import { Button } from '../../components/ui/button';

export default function SalesPipelinePage() {
  const [deals, setDeals] = useState<SalesDeal[]>([]);

  useEffect(() => {
    HRMSService.getSalesDeals().then(setDeals);
  }, []);

  const stages = ['PROSPECT', 'QUALIFIED', 'PROPOSAL', 'NEGOTIATION', 'WON', 'LOST'];

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-white">Sales Pipeline CRM</h1>
            <p className="text-sm text-zinc-400 mt-1">
              Kanban deal pipeline tracking, expected close dates, win probability, and weighted revenue metrics.
            </p>
          </div>

          <Button className="gap-2 text-xs">
            <Plus className="w-4 h-4" /> Add Opportunity
          </Button>
        </div>

        {/* Pipeline Kanban Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 overflow-x-auto">
          {stages.map((stg) => {
            const stageDeals = deals.filter((d) => d.stage === stg);
            const totalVal = stageDeals.reduce((sum, d) => sum + d.value, 0);

            return (
              <div key={stg} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-3.5 space-y-3 min-w-[200px]">
                <div className="flex items-center justify-between pb-2 border-b border-zinc-800 text-xs font-bold text-white uppercase tracking-wider">
                  <span>{stg}</span>
                  <span className="text-[10px] text-zinc-500 font-mono">({stageDeals.length})</span>
                </div>
                <div className="text-xs font-mono font-bold text-emerald-400">{formatCurrency(totalVal)}</div>

                <div className="space-y-3">
                  {stageDeals.map((d) => (
                    <div key={d.id} className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2 hover:border-zinc-700 transition-all">
                      <div className="text-xs font-bold text-white leading-tight">{d.title}</div>
                      <div className="text-[10px] text-zinc-400">Client: {d.clientName}</div>
                      <div className="flex items-center justify-between pt-1 border-t border-zinc-800/80 text-[11px] font-mono">
                        <span className="font-bold text-emerald-400">{formatCurrency(d.value)}</span>
                        <span className="text-zinc-500">{d.probability}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
