'use client';

import React, { useState, useEffect } from 'react';
import { AppShell } from '../../components/layout/app-shell';
import { HRMSService } from '../../services/hrms.service';
import { Employee } from '../../types/hrms';
import { Plus, Search, Shield, Mail, Phone, Building } from 'lucide-react';
import { Button } from '../../components/ui/button';

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('ALL');

  useEffect(() => {
    HRMSService.getEmployees().then(setEmployees);
  }, []);

  const filtered = employees.filter((e) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      if (!e.name.toLowerCase().includes(q) && !e.email.toLowerCase().includes(q) && !e.employeeCode.toLowerCase().includes(q)) {
        return false;
      }
    }
    if (deptFilter !== 'ALL' && e.department !== deptFilter) return false;
    return true;
  });

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-white">Employee Directory</h1>
            <p className="text-sm text-zinc-400 mt-1">
              Manage organization staff, roles, departments, salary details, and operational credentials.
            </p>
          </div>
          <Button className="gap-2 text-xs">
            <Plus className="w-4 h-4" /> Add Employee
          </Button>
        </div>

        {/* Filters */}
        <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-wrap items-center justify-between gap-4">
          <div className="relative flex-1 min-w-[240px]">
            <input
              type="text"
              placeholder="Search employee by name, code or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl text-sm bg-zinc-950 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="px-3 py-2 rounded-xl text-xs font-semibold bg-zinc-950 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-white"
          >
            <option value="ALL">All Departments</option>
            <option value="Executive Management">Executive Management</option>
            <option value="Software Engineering">Software Engineering</option>
            <option value="Human Resources">Human Resources</option>
            <option value="Finance & Accounting">Finance & Accounting</option>
          </select>
        </div>

        {/* Employee Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((emp) => (
            <div key={emp.id} className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4 hover:border-zinc-700 transition-all">
              <div className="flex items-start gap-4">
                <img
                  src={emp.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400'}
                  alt={emp.name}
                  className="w-14 h-14 rounded-2xl object-cover border border-zinc-700 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <div className="text-base font-bold text-white truncate">{emp.name}</div>
                  <div className="text-xs text-zinc-400 font-medium truncate">{emp.designation}</div>
                  <span className="mt-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-zinc-800 text-zinc-300 inline-block">
                    {emp.employeeCode}
                  </span>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-zinc-800 text-xs text-zinc-400">
                <div className="flex items-center gap-2">
                  <Building className="w-3.5 h-3.5 text-zinc-500" /> {emp.department}
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-zinc-500" /> {emp.email}
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-zinc-500" /> {emp.phone || '+1 (555) 000-0000'}
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 text-blue-400" /> <strong className="text-white">{emp.role}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
