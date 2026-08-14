'use client';

import React from 'react';
import { AppShell } from '../../components/layout/app-shell';
import { Palette, Image, Plus, CheckCircle2, Clock } from 'lucide-react';
import { Button } from '../../components/ui/button';

export default function DesignAssetsPage() {
  const assets = [
    {
      id: 'dsg_1',
      title: 'Zyvora Q3 Social Campaign Kit',
      platform: 'Instagram & LinkedIn',
      format: 'Figma & PNG',
      designer: 'Chloe Bennet',
      status: 'APPROVED',
      assetUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800',
    },
    {
      id: 'dsg_2',
      title: 'Aura Sound Headphones Packaging Sleeve',
      platform: 'Print Media',
      format: 'AI Vector',
      designer: 'Chloe Bennet',
      status: 'IN_REVIEW',
      assetUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
    },
  ];

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-white">Design Assets Library</h1>
            <p className="text-sm text-zinc-400 mt-1">
              Store brand assets, marketing collaterals, social banners, and designer review sign-offs.
            </p>
          </div>

          <Button className="gap-2 text-xs">
            <Plus className="w-4 h-4" /> Upload Asset
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {assets.map((ast) => (
            <div key={ast.id} className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4 hover:border-zinc-700 transition-all">
              <img src={ast.assetUrl} alt={ast.title} className="w-full h-48 rounded-xl object-cover border border-zinc-800" />
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">{ast.title}</h3>
                  <div className="text-xs text-zinc-400 font-medium">{ast.platform} • {ast.format}</div>
                  <div className="text-xs text-zinc-500 mt-1">Designer: <strong className="text-white">{ast.designer}</strong></div>
                </div>

                <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${ast.status === 'APPROVED' ? 'bg-emerald-950 text-emerald-300 border-emerald-800' : 'bg-amber-950 text-amber-300 border-amber-800'}`}>
                  {ast.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
