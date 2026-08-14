'use client';

import React, { useState, useEffect } from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { HRMSService } from '@/services/hrms.service';
import { AuditLog } from '@/types/hrms';
import { ShieldAlert, Search, Activity, User, Store, ShoppingBag, RefreshCw, Filter } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function AuditLogsPage() {
  const [activeTab, setActiveTab] = useState<'ACTIVITY_FEED' | 'SECURITY_AUDIT'>('ACTIVITY_FEED');
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const [aLogs, actRes] = await Promise.all([
        HRMSService.getAuditLogs(),
        fetch('/api/admin/activity').then((r) => r.json()),
      ]);
      setAuditLogs(aLogs);
      if (actRes.success && actRes.data) {
        setActivities(actRes.data);
      }
    } catch {
      // Fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const filteredActivities = activities.filter(
    (a) =>
      a.actorName?.toLowerCase().includes(query.toLowerCase()) ||
      a.action?.toLowerCase().includes(query.toLowerCase()) ||
      a.details?.toLowerCase().includes(query.toLowerCase())
  );

  const filteredAuditLogs = auditLogs.filter(
    (l) =>
      l.user.toLowerCase().includes(query.toLowerCase()) ||
      l.action.toLowerCase().includes(query.toLowerCase()) ||
      l.details.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto space-y-8 text-zinc-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-white flex items-center gap-3">
              <Activity className="w-8 h-8 text-amber-400" /> Database Activity & Security Audit Trail
            </h1>
            <p className="text-xs text-zinc-400 mt-1">
              Permanent MySQL records tracking customer orders, vendor updates, inventory shifts & system security logs.
            </p>
          </div>

          <button
            onClick={fetchLogs}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-bold text-zinc-300 hover:text-white hover:border-zinc-700"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-amber-400 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh Feed</span>
          </button>
        </div>

        {/* Sub Navigation Tabs */}
        <div className="flex items-center gap-4 border-b border-zinc-800 pb-2">
          <button
            onClick={() => setActiveTab('ACTIVITY_FEED')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'ACTIVITY_FEED'
                ? 'bg-amber-400 text-zinc-950 shadow-md'
                : 'bg-zinc-900 text-zinc-400 hover:text-white'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Customer & Seller Activity Feed</span>
          </button>
          <button
            onClick={() => setActiveTab('SECURITY_AUDIT')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'SECURITY_AUDIT'
                ? 'bg-amber-400 text-zinc-950 shadow-md'
                : 'bg-zinc-900 text-zinc-400 hover:text-white'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Security Audit Logs</span>
          </button>
        </div>

        {/* Search Input */}
        <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by actor, action, module, order ID, or details..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 font-mono"
            />
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {activeTab === 'ACTIVITY_FEED' ? (
          /* Live Activity Feed List */
          <div className="space-y-3">
            {filteredActivities.map((act, index) => (
              <div
                key={act.id || index}
                className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                      act.actorRole === 'CUSTOMER'
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        : act.actorRole === 'SELLER'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                    }`}
                  >
                    {act.actorRole === 'CUSTOMER' ? (
                      <User className="w-5 h-5" />
                    ) : act.actorRole === 'SELLER' ? (
                      <Store className="w-5 h-5" />
                    ) : (
                      <ShoppingBag className="w-5 h-5" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{act.actorName || act.actorId}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-zinc-800 text-zinc-400">
                        {act.actorRole}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        {act.action}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-300">{act.details}</p>
                  </div>
                </div>

                <div className="text-xs text-zinc-500 font-mono text-right shrink-0">
                  {formatDate(act.createdAt || new Date())}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Security Audit Table */
          <div className="w-full overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-900">
            <table className="w-full text-left text-xs text-zinc-300">
              <thead className="bg-zinc-950 text-[11px] font-bold uppercase text-zinc-400 border-b border-zinc-800">
                <tr>
                  <th className="px-5 py-4">Timestamp</th>
                  <th className="px-5 py-4">User</th>
                  <th className="px-5 py-4">Action</th>
                  <th className="px-5 py-4">Module</th>
                  <th className="px-5 py-4">IP Address</th>
                  <th className="px-5 py-4">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 font-mono text-xs">
                {filteredAuditLogs.map((l) => (
                  <tr key={l.id} className="hover:bg-zinc-800/50 transition-colors">
                    <td className="px-5 py-4 text-zinc-400">{formatDate(l.timestamp)}</td>
                    <td className="px-5 py-4 font-bold text-white">{l.user}</td>
                    <td className="px-5 py-4 text-amber-400 font-bold">{l.action}</td>
                    <td className="px-5 py-4 text-purple-400">{l.module}</td>
                    <td className="px-5 py-4 text-zinc-500">{l.ipAddress}</td>
                    <td className="px-5 py-4 text-zinc-300 max-w-md font-sans">{l.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AppShell>
  );
}
