'use client';

import React, { useState, useEffect } from 'react';
import { AppShell } from '@/components/layout/app-shell';
import {
  MessageSquare,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertTriangle,
  UserCheck,
  RefreshCw,
  Mail,
  Phone,
  Tag,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ContactMsg {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  category: string;
  message: string;
  status: 'NEW' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  createdAt: string;
  updatedAt: string;
}

export default function AdminContactMessagesPage() {
  const [messages, setMessages] = useState<ContactMsg[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedMsg, setSelectedMsg] = useState<ContactMsg | null>(null);
  const [updating, setUpdating] = useState(false);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams();
      if (search) query.append('search', search);
      if (statusFilter) query.append('status', statusFilter);

      const res = await fetch(`/api/contact?${query.toString()}`);
      const data = await res.json();
      if (data.success) {
        setMessages(data.data);
      }
    } catch (error) {
      console.error('Failed to load contact messages', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [search, statusFilter]);

  const handleUpdateStatus = async (id: string, newStatus: string, newPriority?: string) => {
    setUpdating(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          status: newStatus,
          priority: newPriority,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setMessages((prev) =>
          prev.map((msg) => (msg.id === id ? { ...msg, ...data.data } : msg))
        );
        if (selectedMsg?.id === id) {
          setSelectedMsg({ ...selectedMsg, ...data.data });
        }
      }
    } catch (error) {
      console.error('Failed to update status', error);
    } finally {
      setUpdating(false);
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'URGENT':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-red-500/20 text-red-400 border border-red-500/30">URGENT</span>;
      case 'HIGH':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">HIGH</span>;
      case 'MEDIUM':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">MEDIUM</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-zinc-800 text-zinc-400 border border-zinc-700">LOW</span>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'NEW':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">NEW</span>;
      case 'IN_PROGRESS':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">IN PROGRESS</span>;
      case 'RESOLVED':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">RESOLVED</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-zinc-800 text-zinc-400 border border-zinc-700">CLOSED</span>;
    }
  };

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
              <MessageSquare className="w-8 h-8 text-amber-400" />
              <span>Contact Support Desk</span>
            </h1>
            <p className="text-sm text-zinc-400 mt-1">
              Review customer inquiries, seller onboarding requests, and technical tickets.
            </p>
          </div>

          <Button onClick={fetchMessages} variant="outline" size="sm" className="gap-2 self-start sm:self-auto">
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh Queue</span>
          </Button>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col sm:flex-row items-center gap-4 bg-zinc-900/60 p-4 rounded-2xl border border-zinc-800">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by sender name, email, or subject..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-zinc-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-amber-500"
            >
              <option value="">All Statuses</option>
              <option value="NEW">New</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="RESOLVED">Resolved</option>
              <option value="CLOSED">Closed</option>
            </select>
          </div>
        </div>

        {/* Data Table */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-950/80 text-zinc-400 text-xs font-semibold uppercase tracking-wider">
                  <th className="py-4 px-6">Sender Details</th>
                  <th className="py-4 px-6">Topic Category</th>
                  <th className="py-4 px-6">Subject</th>
                  <th className="py-4 px-6">Priority</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-zinc-500">
                      Loading support tickets...
                    </td>
                  </tr>
                ) : messages.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-zinc-500">
                      No contact messages found matching criteria.
                    </td>
                  </tr>
                ) : (
                  messages.map((msg) => (
                    <tr key={msg.id} className="hover:bg-zinc-800/40 transition-colors">
                      <td className="py-4 px-6">
                        <div className="font-bold text-white">{msg.name}</div>
                        <div className="text-xs text-zinc-400 flex items-center gap-1.5 mt-0.5">
                          <Mail className="w-3 h-3 text-zinc-500" />
                          <span>{msg.email}</span>
                        </div>
                      </td>

                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-950 border border-zinc-800 text-xs font-medium text-amber-400">
                          <Tag className="w-3 h-3" />
                          <span>{msg.category}</span>
                        </span>
                      </td>

                      <td className="py-4 px-6 max-w-xs truncate font-medium text-zinc-200">
                        {msg.subject}
                      </td>

                      <td className="py-4 px-6">{getPriorityBadge(msg.priority)}</td>

                      <td className="py-4 px-6">{getStatusBadge(msg.status)}</td>

                      <td className="py-4 px-6 text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedMsg(msg)}
                          className="text-xs border-zinc-700 hover:border-amber-500"
                        >
                          View & Reply
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Message Details Modal */}
        {selectedMsg && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-2xl w-full p-6 space-y-6 shadow-2xl overflow-y-auto max-h-[90vh]">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{selectedMsg.subject}</h3>
                  <p className="text-xs text-zinc-400 mt-1">Ticket ID: {selectedMsg.id}</p>
                </div>
                <button
                  onClick={() => setSelectedMsg(null)}
                  className="text-zinc-400 hover:text-white font-bold text-lg"
                >
                  ✕
                </button>
              </div>

              {/* Sender Details Header */}
              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-300">
                <div>
                  <span className="text-zinc-500 block">Sender Name:</span>
                  <span className="font-bold text-white text-sm">{selectedMsg.name}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block">Email Address:</span>
                  <span className="font-bold text-amber-400 text-sm">{selectedMsg.email}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block">Category Topic:</span>
                  <span className="font-semibold text-zinc-200">{selectedMsg.category}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block">Phone:</span>
                  <span className="font-semibold text-zinc-200">{selectedMsg.phone || 'N/A'}</span>
                </div>
              </div>

              {/* Body */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  Message Content:
                </label>
                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-zinc-200 leading-relaxed whitespace-pre-wrap">
                  {selectedMsg.message}
                </div>
              </div>

              {/* Status Controls */}
              <div className="space-y-3 pt-2">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  Update Ticket Status:
                </label>
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    disabled={updating}
                    onClick={() => handleUpdateStatus(selectedMsg.id, 'IN_PROGRESS')}
                    className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/40 text-xs"
                  >
                    Mark In Progress
                  </Button>
                  <Button
                    size="sm"
                    disabled={updating}
                    onClick={() => handleUpdateStatus(selectedMsg.id, 'RESOLVED')}
                    className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/40 text-xs"
                  >
                    Mark Resolved
                  </Button>
                  <Button
                    size="sm"
                    disabled={updating}
                    onClick={() => handleUpdateStatus(selectedMsg.id, 'CLOSED')}
                    className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs"
                  >
                    Close Ticket
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
