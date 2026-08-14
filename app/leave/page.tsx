'use client';

import React, { useState, useEffect } from 'react';
import { AppShell } from '../../components/layout/app-shell';
import { HRMSService } from '../../services/hrms.service';
import { LeaveRequest } from '../../types/hrms';
import { Plus, Calendar, CheckCircle2, Clock, XCircle } from 'lucide-react';
import { Button } from '../../components/ui/button';

export default function LeavePage() {
  const [requests, setRequests] = useState<LeaveRequest[]>([]);

  useEffect(() => {
    HRMSService.getLeaveRequests().then(setRequests);
  }, []);

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-white">Leave Management</h1>
            <p className="text-sm text-zinc-400 mt-1">
              Apply for leaves, track approval status, check team calendars, and process HR sign-offs.
            </p>
          </div>

          <Button className="gap-2 text-xs">
            <Plus className="w-4 h-4" /> Apply for Leave
          </Button>
        </div>

        {/* Leave Requests Table */}
        <div className="w-full overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-900">
          <table className="w-full text-left text-sm text-zinc-300">
            <thead className="bg-zinc-950 text-xs font-bold uppercase text-zinc-400 border-b border-zinc-800">
              <tr>
                <th className="px-5 py-4">Employee</th>
                <th className="px-5 py-4">Type</th>
                <th className="px-5 py-4">Dates</th>
                <th className="px-5 py-4">Reason</th>
                <th className="px-5 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {requests.map((r) => (
                <tr key={r.id} className="hover:bg-zinc-800/50 transition-colors">
                  <td className="px-5 py-4 font-bold text-white">{r.employeeName}</td>
                  <td className="px-5 py-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-zinc-800 text-zinc-300">
                      {r.type}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-xs font-mono text-zinc-400">
                    {r.startDate} to {r.endDate}
                  </td>
                  <td className="px-5 py-4 text-xs text-zinc-300 max-w-xs truncate">{r.reason}</td>
                  <td className="px-5 py-4">
                    {r.status === 'APPROVED' ? (
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                        APPROVED
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-950 text-amber-300 border border-amber-800">
                        PENDING
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
