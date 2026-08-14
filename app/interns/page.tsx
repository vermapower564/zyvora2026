'use client';

import React from 'react';
import { AppShell } from '../../components/layout/app-shell';
import { GraduationCap, GitBranch, Plus, Star } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { formatCurrency } from '../../lib/utils';

export default function InternsPage() {
  const interns = [
    {
      id: 'int_1',
      name: 'Sophia Chen',
      university: 'Stanford University',
      degree: 'B.S. Computer Science',
      department: 'Software Engineering',
      mentor: 'Marcus Vance',
      stipend: 4500,
      startDate: '2026-06-01',
      endDate: '2026-08-31',
      performance: 94,
      tasksCompleted: 28,
      githubRepo: 'https://github.com/sophia-chen/zyvora-intern-modules',
      fullTimeOfferStatus: 'RECOMMENDED',
    },
    {
      id: 'int_2',
      name: 'Liam O’Connor',
      university: 'MIT',
      degree: 'B.S. Artificial Intelligence',
      department: 'Data Science & AI',
      mentor: 'Roushan Verma',
      stipend: 4800,
      startDate: '2026-06-15',
      endDate: '2026-09-15',
      performance: 89,
      tasksCompleted: 22,
      githubRepo: 'https://github.com/liam-oc/zyvora-ml-pipeline',
      fullTimeOfferStatus: 'UNDER_REVIEW',
    },
  ];

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-white">Intern Management</h1>
            <p className="text-sm text-zinc-400 mt-1">
              Track active university interns, mentor assignments, project deliverables, and full-time hiring offers.
            </p>
          </div>

          <Button className="gap-2 text-xs">
            <Plus className="w-4 h-4" /> Add New Intern
          </Button>
        </div>

        {/* Intern Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {interns.map((int) => (
            <div key={int.id} className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4 hover:border-zinc-700 transition-all">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xl font-bold text-white">{int.name}</div>
                  <div className="text-xs text-zinc-400 font-medium">{int.degree} • {int.university}</div>
                </div>

                <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-950 text-purple-300 border border-purple-800 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-purple-400 text-purple-400" /> {int.performance}% Score
                </span>
              </div>

              <div className="space-y-2 text-xs text-zinc-300 bg-zinc-950 p-4 rounded-xl border border-zinc-800">
                <div>Department: <strong className="text-white">{int.department}</strong></div>
                <div>Assigned Mentor: <strong className="text-white">{int.mentor}</strong></div>
                <div>Stipend: <strong className="text-emerald-400">{formatCurrency(int.stipend)} / mo</strong></div>
                <div>Duration: <span className="font-mono text-zinc-400">{int.startDate} to {int.endDate}</span></div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-zinc-800 text-xs">
                <a href={int.githubRepo} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-zinc-400 hover:text-white font-mono">
                  <GitBranch className="w-4 h-4" /> Repository
                </a>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-emerald-950 text-emerald-400 border border-emerald-800">
                  Offer: {int.fullTimeOfferStatus}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
