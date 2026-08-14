'use client';

import React from 'react';
import { AppShell } from '../../../components/layout/app-shell';
import { Activity, ShieldAlert, CheckCircle2, AlertTriangle, Clock, Zap, ArrowUpRight } from 'lucide-react';
import { formatCurrency } from '../../../lib/utils';

export default function CommandCenterPage() {
  const alerts = [
    { type: 'WARNING', title: 'Late Attendance Alert', message: 'Marcus Vance and David Sterling clocked in late today.', time: '10 min ago' },
    { type: 'INFO', title: 'Leave Approval Pending', message: 'David Sterling submitted a sick leave request requiring HR sign-off.', time: '45 min ago' },
    { type: 'SUCCESS', title: 'Project Milestone Reached', message: 'Zyvora Next.js OMS Platform completed Sprint 14 milestone (78%).', time: '2 hours ago' },
    { type: 'DANGER', title: 'Project Risk Warning', message: 'Aura Sound Labs E-Commerce Store deadline is in 10 days.', time: '3 hours ago' },
  ];

  const activityFeed = [
    { user: 'Roushan Verma', action: 'Approved August Staff Payroll Batch ($175,000)', time: 'Just now' },
    { user: 'Elena Rostova', action: 'Uploaded Client Contract: Global FinTech Payment Gateway', time: '12 min ago' },
    { user: 'Marcus Vance', action: 'Submitted Daily Work Update: Prisma ORM Integration', time: '1 hour ago' },
    { user: 'Sarah Connor', action: 'Updated Employee File: EMP-1004 (Sarah Connor)', time: '2 hours ago' },
    { user: 'David Sterling', action: 'Recorded Finance Income Transaction: $110,000', time: '3 hours ago' },
  ];

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
              <Zap className="w-4 h-4 fill-emerald-400" /> CEO & Director Control Center
            </div>
            <h1 className="text-3xl font-black text-white mt-1">Executive Command Center</h1>
            <p className="text-sm text-zinc-400">
              Live operational feed, system alerts, company health matrix, and real-time execution oversight.
            </p>
          </div>
        </div>

        {/* Company Health Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
            <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Workforce Utilization</div>
            <div className="text-3xl font-black text-white">92.4%</div>
            <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
              <div className="h-full bg-emerald-400 rounded-full" style={{ width: '92.4%' }} />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
            <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Attendance Rate</div>
            <div className="text-3xl font-black text-emerald-400">80.0%</div>
            <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
              <div className="h-full bg-emerald-400 rounded-full" style={{ width: '80%' }} />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
            <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Project On-Time Rate</div>
            <div className="text-3xl font-black text-purple-400">88.5%</div>
            <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
              <div className="h-full bg-purple-400 rounded-full" style={{ width: '88.5%' }} />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
            <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Open Pipeline Value</div>
            <div className="text-3xl font-black text-white">{formatCurrency(520000)}</div>
            <div className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" /> 4 active opportunities
            </div>
          </div>
        </div>

        {/* Operational Alerts & Live Activity Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Operational Alerts */}
          <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
            <div className="flex items-center gap-2 text-base font-bold text-white">
              <ShieldAlert className="w-5 h-5 text-amber-400" /> Operational System Alerts
            </div>

            <div className="space-y-3">
              {alerts.map((al, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border flex items-start gap-3 text-xs ${
                    al.type === 'DANGER'
                      ? 'bg-rose-950/40 border-rose-800 text-rose-300'
                      : al.type === 'WARNING'
                      ? 'bg-amber-950/40 border-amber-800 text-amber-300'
                      : al.type === 'SUCCESS'
                      ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-300'
                  }`}
                >
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <div className="flex-1 space-y-0.5">
                    <div className="font-bold text-white flex items-center justify-between">
                      <span>{al.title}</span>
                      <span className="text-[10px] opacity-70 font-mono">{al.time}</span>
                    </div>
                    <p className="leading-relaxed opacity-90">{al.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Live Activity Feed */}
          <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
            <div className="flex items-center gap-2 text-base font-bold text-white">
              <Activity className="w-5 h-5 text-blue-400" /> Live Audit & Operational Activity
            </div>

            <div className="space-y-4 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-zinc-800">
              {activityFeed.map((act, idx) => (
                <div key={idx} className="flex items-start gap-3 pl-8 relative">
                  <div className="absolute left-1.5 top-1.5 w-3 h-3 rounded-full bg-blue-500 border-2 border-zinc-900" />
                  <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/80 w-full text-xs space-y-0.5">
                    <div className="flex items-center justify-between font-bold text-white">
                      <span>{act.user}</span>
                      <span className="text-[10px] text-zinc-500 font-mono">{act.time}</span>
                    </div>
                    <p className="text-zinc-400 text-[11px] leading-snug">{act.action}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
