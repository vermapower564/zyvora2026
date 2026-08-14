'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AppShell } from '../../components/layout/app-shell';
import { HRMSService } from '../../services/hrms.service';
import { Employee, AttendanceRecord, Project, SalesDeal, FinanceTransaction } from '../../types/hrms';
import { formatCurrency } from '../../lib/utils';
import {
  Users,
  CalendarCheck,
  Briefcase,
  TrendingUp,
  Clock,
  DollarSign,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

export default function ExecutiveDashboardPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [deals, setDeals] = useState<SalesDeal[]>([]);
  const [transactions, setTransactions] = useState<FinanceTransaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      HRMSService.getEmployees(),
      HRMSService.getAttendance(),
      HRMSService.getProjects(),
      HRMSService.getSalesDeals(),
      HRMSService.getFinanceTransactions(),
    ]).then(([empList, attList, projList, dealList, txList]) => {
      setEmployees(empList);
      setAttendance(attList);
      setProjects(projList);
      setDeals(dealList);
      setTransactions(txList);
      setLoading(false);
    });
  }, []);

  const totalEmployees = employees.length;
  const presentToday = attendance.filter((a) => a.status === 'PRESENT' || a.status === 'LATE').length;
  const activeProjects = projects.filter((p) => p.status === 'IN_PROGRESS').length;
  const totalRevenue = transactions.filter((t) => t.type === 'INCOME').reduce((sum, t) => sum + t.amount, 0);
  const pendingApprovals = 3;
  const openDealsCount = deals.filter((d) => d.stage !== 'WON' && d.stage !== 'LOST').length;

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-white">Executive Dashboard</h1>
            <p className="text-sm text-zinc-400 mt-1">
              Real-time operational visibility across workforce, active projects, sales pipeline, and financial health.
            </p>
          </div>

          <Link href="/dashboard/command-center">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-black font-bold text-xs hover:bg-zinc-200 transition-colors shadow-md">
              <Activity className="w-4 h-4" /> Open Command Center
            </button>
          </Link>
        </div>

        {/* Top 6 KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {/* Card 1: Total Employees */}
          <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2 hover:border-zinc-700 transition-all">
            <div className="flex items-center justify-between text-zinc-400">
              <span className="text-xs font-bold uppercase tracking-wider">Total Staff</span>
              <Users className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl font-black text-white">{totalEmployees}</div>
            <div className="flex items-center text-[10px] text-emerald-400 font-semibold gap-0.5">
              <ArrowUpRight className="w-3 h-3" /> +8.4% vs last month
            </div>
          </div>

          {/* Card 2: Present Today */}
          <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2 hover:border-zinc-700 transition-all">
            <div className="flex items-center justify-between text-zinc-400">
              <span className="text-xs font-bold uppercase tracking-wider">Present Today</span>
              <CalendarCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-emerald-400">{presentToday}</div>
            <div className="flex items-center text-[10px] text-emerald-400 font-semibold gap-0.5">
              <CheckCircle2 className="w-3 h-3" /> 80% Attendance Rate
            </div>
          </div>

          {/* Card 3: Active Projects */}
          <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2 hover:border-zinc-700 transition-all">
            <div className="flex items-center justify-between text-zinc-400">
              <span className="text-xs font-bold uppercase tracking-wider">Active Projects</span>
              <Briefcase className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-black text-white">{activeProjects}</div>
            <div className="flex items-center text-[10px] text-purple-400 font-semibold gap-0.5">
              <ArrowUpRight className="w-3 h-3" /> 2 milestones due
            </div>
          </div>

          {/* Card 4: Total Revenue */}
          <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2 hover:border-zinc-700 transition-all">
            <div className="flex items-center justify-between text-zinc-400">
              <span className="text-xs font-bold uppercase tracking-wider">Revenue</span>
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-emerald-400">{formatCurrency(totalRevenue)}</div>
            <div className="flex items-center text-[10px] text-emerald-400 font-semibold gap-0.5">
              <ArrowUpRight className="w-3 h-3" /> +14.2% Q3 Growth
            </div>
          </div>

          {/* Card 5: Pending Approvals */}
          <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2 hover:border-zinc-700 transition-all">
            <div className="flex items-center justify-between text-zinc-400">
              <span className="text-xs font-bold uppercase tracking-wider">Approvals</span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-black text-amber-400">{pendingApprovals}</div>
            <div className="flex items-center text-[10px] text-amber-400 font-semibold gap-0.5">
              <AlertTriangle className="w-3 h-3" /> Action required
            </div>
          </div>

          {/* Card 6: Open Deals */}
          <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2 hover:border-zinc-700 transition-all">
            <div className="flex items-center justify-between text-zinc-400">
              <span className="text-xs font-bold uppercase tracking-wider">Open Deals</span>
              <TrendingUp className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl font-black text-white">{openDealsCount}</div>
            <div className="flex items-center text-[10px] text-cyan-400 font-semibold gap-0.5">
              <ArrowUpRight className="w-3 h-3" /> $300k Pipeline
            </div>
          </div>
        </div>

        {/* Two-Column Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Active Projects Tracker */}
          <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white">Active Projects Health</h2>
              <Link href="/projects" className="text-xs text-zinc-400 hover:text-white underline">
                View All Projects
              </Link>
            </div>

            <div className="space-y-3">
              {projects.map((p) => (
                <div key={p.id} className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800/80 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-white">
                    <span>{p.name}</span>
                    <span className="text-emerald-400">{p.completionPercentage}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                      style={{ width: `${p.completionPercentage}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-zinc-400">
                    <span>Client: {p.clientName}</span>
                    <span>Deadline: {p.deadline}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sales Pipeline Summary */}
          <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white">Sales CRM Opportunities</h2>
              <Link href="/sales-pipeline" className="text-xs text-zinc-400 hover:text-white underline">
                Open Sales Board
              </Link>
            </div>

            <div className="space-y-3">
              {deals.map((d) => (
                <div key={d.id} className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800/80 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white">{d.title}</div>
                    <div className="text-[10px] text-zinc-500 font-mono">
                      Client: {d.clientName} • Close: {d.closeDate}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-black text-emerald-400">{formatCurrency(d.value)}</div>
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-zinc-800 text-zinc-300">
                      {d.stage}
                    </span>
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
