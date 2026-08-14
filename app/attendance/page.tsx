'use client';

import React, { useState, useEffect } from 'react';
import { AppShell } from '../../components/layout/app-shell';
import { HRMSService } from '../../services/hrms.service';
import { AttendanceRecord } from '../../types/hrms';
import { Clock, Play, Square, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
import { Button } from '../../components/ui/button';

export default function AttendancePage() {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [isCheckedIn, setIsCheckedIn] = useState(true);

  useEffect(() => {
    HRMSService.getAttendance().then(setRecords);
  }, []);

  const handleClockToggle = () => {
    setIsCheckedIn(!isCheckedIn);
  };

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-white">Attendance Management</h1>
            <p className="text-sm text-zinc-400 mt-1">
              Track daily employee clock-in/out hours, late logs, work duration, and department attendance metrics.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={handleClockToggle}
              variant={isCheckedIn ? 'danger' : 'primary'}
              className="gap-2 text-xs font-bold"
            >
              {isCheckedIn ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isCheckedIn ? 'Clock Out (09:00 AM)' : 'Clock In Now'}
            </Button>
          </div>
        </div>

        {/* Quick Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-1">
            <span className="text-xs font-bold text-zinc-400 uppercase">Present Today</span>
            <div className="text-2xl font-black text-emerald-400">4 Employees</div>
          </div>
          <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-1">
            <span className="text-xs font-bold text-zinc-400 uppercase">Late Check-Ins</span>
            <div className="text-2xl font-black text-amber-400">2 Employees</div>
          </div>
          <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-1">
            <span className="text-xs font-bold text-zinc-400 uppercase">Avg Work Hours</span>
            <div className="text-2xl font-black text-white">8.95 Hours</div>
          </div>
          <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-1">
            <span className="text-xs font-bold text-zinc-400 uppercase">Attendance Rate</span>
            <div className="text-2xl font-black text-blue-400">80.0%</div>
          </div>
        </div>

        {/* Attendance Records Table */}
        <div className="w-full overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-900">
          <table className="w-full text-left text-sm text-zinc-300">
            <thead className="bg-zinc-950 text-xs font-bold uppercase text-zinc-400 border-b border-zinc-800">
              <tr>
                <th className="px-5 py-4">Employee</th>
                <th className="px-5 py-4">Date</th>
                <th className="px-5 py-4">Clock In</th>
                <th className="px-5 py-4">Clock Out</th>
                <th className="px-5 py-4">Work Hours</th>
                <th className="px-5 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {records.map((r) => (
                <tr key={r.id} className="hover:bg-zinc-800/50 transition-colors">
                  <td className="px-5 py-4 font-bold text-white">{r.employeeName}</td>
                  <td className="px-5 py-4 text-xs font-mono text-zinc-400">{r.date}</td>
                  <td className="px-5 py-4 text-xs font-mono text-emerald-400 font-bold">{r.clockIn}</td>
                  <td className="px-5 py-4 text-xs font-mono text-zinc-400">{r.clockOut || 'Active'}</td>
                  <td className="px-5 py-4 font-bold text-white">{r.workHours} hrs</td>
                  <td className="px-5 py-4">
                    {r.status === 'PRESENT' ? (
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                        PRESENT
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-950 text-amber-300 border border-amber-800 flex items-center gap-1 w-max">
                        <AlertTriangle className="w-3 h-3" /> LATE
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
