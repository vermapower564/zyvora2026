'use client';

import React from 'react';
import { AppShell } from '../../components/layout/app-shell';
import { Search, ArrowUp, ArrowDown, Minus, Plus } from 'lucide-react';
import { Button } from '../../components/ui/button';

export default function SeoPage() {
  const keywords = [
    { id: 'seo_1', keyword: 'multi vendor ecommerce platform', searchVolume: 18500, currentRank: 2, previousRank: 5, rankChange: 'IMPROVED', targetUrl: '/products' },
    { id: 'seo_2', keyword: 'enterprise operations software', searchVolume: 9200, currentRank: 4, previousRank: 4, rankChange: 'STABLE', targetUrl: '/' },
    { id: 'seo_3', keyword: 'nextjs ERP solution', searchVolume: 12400, currentRank: 1, previousRank: 3, rankChange: 'IMPROVED', targetUrl: '/dashboard' },
  ];

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-white">SEO Keyword Rank Tracker</h1>
            <p className="text-sm text-zinc-400 mt-1">
              Monitor Google search engine keyword rankings, search volumes, rank changes, and target page URLs.
            </p>
          </div>

          <Button className="gap-2 text-xs">
            <Plus className="w-4 h-4" /> Add Target Keyword
          </Button>
        </div>

        <div className="w-full overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-900">
          <table className="w-full text-left text-sm text-zinc-300">
            <thead className="bg-zinc-950 text-xs font-bold uppercase text-zinc-400 border-b border-zinc-800">
              <tr>
                <th className="px-5 py-4">Keyword</th>
                <th className="px-5 py-4">Monthly Search Volume</th>
                <th className="px-5 py-4">Current Rank</th>
                <th className="px-5 py-4">Previous Rank</th>
                <th className="px-5 py-4">Trend</th>
                <th className="px-5 py-4">Target Landing URL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {keywords.map((k) => (
                <tr key={k.id} className="hover:bg-zinc-800/50 transition-colors">
                  <td className="px-5 py-4 font-bold text-white">{k.keyword}</td>
                  <td className="px-5 py-4 font-mono text-zinc-400">{k.searchVolume.toLocaleString()} / mo</td>
                  <td className="px-5 py-4 font-bold text-emerald-400">#{k.currentRank}</td>
                  <td className="px-5 py-4 font-mono text-zinc-500">#{k.previousRank}</td>
                  <td className="px-5 py-4">
                    {k.rankChange === 'IMPROVED' ? (
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-950 text-emerald-300 border border-emerald-800 flex items-center gap-1 w-max">
                        <ArrowUp className="w-3.5 h-3.5" /> Improved (+{k.previousRank - k.currentRank})
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-zinc-800 text-zinc-400 flex items-center gap-1 w-max">
                        <Minus className="w-3.5 h-3.5" /> Stable
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-xs font-mono text-blue-400 hover:underline">{k.targetUrl}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
