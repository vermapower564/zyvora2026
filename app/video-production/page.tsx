'use client';

import React from 'react';
import { AppShell } from '../../components/layout/app-shell';
import { Video, Film, Plus, Camera } from 'lucide-react';
import { Button } from '../../components/ui/button';

export default function VideoProductionPage() {
  const items = [
    { id: 'vid_1', projectTitle: 'Zyvora Brand Story 4K Commercial', shootLocation: 'Studio A, NY', cameraLead: 'Harrison Ford', editor: 'Leo Miller', renderStage: 'EDITING', status: 'IN_PROGRESS', version: 'v1.2' },
    { id: 'vid_2', projectTitle: 'Aura Studio Headphones Product Unboxing', shootLocation: 'Studio B, LA', cameraLead: 'Sam Rockwell', editor: 'Leo Miller', renderStage: 'FINAL_APPROVED', status: 'COMPLETED', version: 'v2.0' },
  ];

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-white">Video Production Pipeline</h1>
            <p className="text-sm text-zinc-400 mt-1">
              Manage video projects, camera leads, editing revisions, 4K rendering stages, and final client sign-offs.
            </p>
          </div>

          <Button className="gap-2 text-xs">
            <Plus className="w-4 h-4" /> New Video Project
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((v) => (
            <div key={v.id} className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4 hover:border-zinc-700 transition-all">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">{v.projectTitle}</h3>
                  <div className="text-xs text-zinc-400 font-medium">Location: {v.shootLocation}</div>
                </div>

                <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-950 text-blue-300 border border-blue-800">
                  {v.renderStage}
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-zinc-300 bg-zinc-950 p-4 rounded-xl border border-zinc-800 font-mono">
                <div>Camera Lead: <strong className="text-white">{v.cameraLead}</strong></div>
                <div>Video Editor: <strong className="text-white">{v.editor}</strong></div>
                <div>Export Revision: <span className="text-purple-400 font-bold">{v.version}</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
