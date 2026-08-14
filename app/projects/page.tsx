'use client';

import React, { useState, useEffect } from 'react';
import { AppShell } from '../../components/layout/app-shell';
import { HRMSService } from '../../services/hrms.service';
import { Project } from '../../types/hrms';
import { formatCurrency } from '../../lib/utils';
import { Plus, Briefcase, Calendar, CheckCircle2, AlertTriangle, Layers } from 'lucide-react';
import { Button } from '../../components/ui/button';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    HRMSService.getProjects().then(setProjects);
  }, []);

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-white">Project Management</h1>
            <p className="text-sm text-zinc-400 mt-1">
              Track client deliverables, milestone completion percentages, budget allocations, and project risk indicators.
            </p>
          </div>

          <Button className="gap-2 text-xs">
            <Plus className="w-4 h-4" /> Create Project
          </Button>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p) => {
            const isCompleted = p.completionPercentage === 100;
            const isAtRisk = p.completionPercentage < 70 && p.status === 'IN_PROGRESS';

            return (
              <div key={p.id} className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4 hover:border-zinc-700 transition-all">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-white">{p.name}</h2>
                    <span className="text-xs text-zinc-400 font-medium">Client: <strong className="text-white">{p.clientName}</strong></span>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold border ${
                      isCompleted
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                        : isAtRisk
                        ? 'bg-amber-950 text-amber-300 border-amber-800'
                        : 'bg-blue-950 text-blue-300 border-blue-800'
                    }`}
                  >
                    {isCompleted ? 'COMPLETED' : isAtRisk ? 'AT RISK' : p.status}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-zinc-400">Milestone Progress</span>
                    <span className="text-emerald-400">{p.completionPercentage}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                      style={{ width: `${p.completionPercentage}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-zinc-800 text-xs text-zinc-400">
                  <span>Budget: <strong className="text-white">{formatCurrency(p.budget)}</strong></span>
                  <span className="font-mono">Deadline: {p.deadline}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
