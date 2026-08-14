'use client';

import React, { useState, useEffect } from 'react';
import { AppShell } from '../../components/layout/app-shell';
import { HRMSService } from '../../services/hrms.service';
import { DailyWork } from '../../types/hrms';
import { Plus, CheckCircle2, Clock, GitCommit, Link as LinkIcon } from 'lucide-react';
import { Button } from '../../components/ui/button';

export default function DailyWorkPage() {
  const [updates, setUpdates] = useState<DailyWork[]>([]);

  useEffect(() => {
    HRMSService.getDailyWork().then(setUpdates);
  }, []);

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-white">Daily Work Updates</h1>
            <p className="text-sm text-zinc-400 mt-1">
              Submit end-of-day task logs, git commits, drive attachments, and manager approval sign-offs.
            </p>
          </div>

          <Button className="gap-2 text-xs">
            <Plus className="w-4 h-4" /> Submit Work Update
          </Button>
        </div>

        {/* Work Updates Timeline List */}
        <div className="space-y-4">
          {updates.map((dw) => (
            <div key={dw.id} className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3 hover:border-zinc-700 transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-zinc-400 uppercase font-mono">{dw.date} • {dw.hoursSpent} hours</span>
                  <h2 className="text-lg font-bold text-white mt-0.5">{dw.taskTitle}</h2>
                  <span className="text-xs text-zinc-400 font-medium">Submitted by: <strong className="text-white">{dw.employeeName}</strong></span>
                </div>

                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-950 text-emerald-300 border border-emerald-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> APPROVED
                </span>
              </div>

              <p className="text-sm text-zinc-300 bg-zinc-950 p-4 rounded-xl border border-zinc-800/80 leading-relaxed">
                {dw.description}
              </p>

              {dw.gitCommits && (
                <div className="flex items-center gap-2 text-xs text-purple-400 font-mono">
                  <GitCommit className="w-4 h-4" /> {dw.gitCommits}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
