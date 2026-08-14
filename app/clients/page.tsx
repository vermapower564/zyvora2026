'use client';

import React, { useState, useEffect } from 'react';
import { AppShell } from '../../components/layout/app-shell';
import { HRMSService } from '../../services/hrms.service';
import { Client } from '../../types/hrms';
import { formatCurrency } from '../../lib/utils';
import { Building, Mail, Phone, Plus, Briefcase, DollarSign } from 'lucide-react';
import { Button } from '../../components/ui/button';

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    HRMSService.getClients().then(setClients);
  }, []);

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-white">Client Management CRM</h1>
            <p className="text-sm text-zinc-400 mt-1">
              Manage client organizations, billing contacts, active project contracts, and total revenue accrued.
            </p>
          </div>

          <Button className="gap-2 text-xs">
            <Plus className="w-4 h-4" /> Add Client Profile
          </Button>
        </div>

        {/* Client Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((c) => (
            <div key={c.id} className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4 hover:border-zinc-700 transition-all">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">{c.name}</h2>
                  <span className="text-xs text-zinc-400 font-medium">{c.company}</span>
                </div>
                <div className="p-2 rounded-xl bg-zinc-800 text-blue-400">
                  <Building className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-2 text-xs text-zinc-300 bg-zinc-950 p-4 rounded-xl border border-zinc-800">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-zinc-500" /> {c.email}
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-zinc-500" /> {c.phone}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-zinc-800 text-xs">
                <span className="text-zinc-400">Active Projects: <strong className="text-white">{c.activeProjects}</strong></span>
                <span className="text-emerald-400 font-bold">Total Spent: {formatCurrency(c.totalSpent)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
