'use client';

import React from 'react';
import { AppShell } from '../../components/layout/app-shell';
import { GitCommit, GitBranch, GitPullRequest, Code } from 'lucide-react';

export default function DeveloperActivityPage() {
  const commits = [
    {
      id: 'cmt_1',
      developer: 'Marcus Vance',
      repository: 'zyvora/zyvora-oms',
      branch: 'main',
      commitHash: 'a4f81b2',
      message: 'feat: Add Prisma schema models & RBAC permission helpers',
      linesAdded: 240,
      linesDeleted: 12,
      timestamp: '10 min ago',
    },
    {
      id: 'cmt_2',
      developer: 'Roushan Verma',
      repository: 'zyvora/zyvora-oms',
      branch: 'main',
      commitHash: 'c9d201f',
      message: 'refactor: Upgrade AppShell & Executive Command Center components',
      linesAdded: 450,
      linesDeleted: 35,
      timestamp: '1 hour ago',
    },
  ];

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-black text-white">Developer Activity & Git Commits</h1>
          <p className="text-sm text-zinc-400 mt-1">
            Real-time commit telemetry, repository activity logs, lines added/deleted metrics, and developer contributions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-1">
            <span className="text-xs font-bold text-zinc-400 uppercase">Total Commits (This Week)</span>
            <div className="text-2xl font-black text-purple-400">142 Commits</div>
          </div>
          <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-1">
            <span className="text-xs font-bold text-zinc-400 uppercase">Lines Added</span>
            <div className="text-2xl font-black text-emerald-400">+12,450 Lines</div>
          </div>
          <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-1">
            <span className="text-xs font-bold text-zinc-400 uppercase">Active Repositories</span>
            <div className="text-2xl font-black text-white">6 Repos</div>
          </div>
        </div>

        {/* Commit Log Stream */}
        <div className="space-y-3">
          {commits.map((c) => (
            <div key={c.id} className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-purple-950/60 text-purple-400 border border-purple-800 shrink-0">
                <GitCommit className="w-5 h-5" />
              </div>

              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-purple-300">{c.commitHash} • {c.branch}</span>
                  <span className="text-zinc-500 font-mono text-[10px]">{c.timestamp}</span>
                </div>
                <h3 className="text-sm font-bold text-white truncate">{c.message}</h3>
                <div className="flex items-center gap-3 text-xs text-zinc-400">
                  <span>Author: <strong className="text-white">{c.developer}</strong></span>
                  <span className="font-mono text-emerald-400">+{c.linesAdded}</span>
                  <span className="font-mono text-rose-400">-{c.linesDeleted}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
