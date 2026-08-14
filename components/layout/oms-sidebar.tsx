'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ZyvoraLogo } from '../branding/zyvora-logo';
import {
  LayoutDashboard,
  Activity,
  Users,
  CalendarCheck,
  ClipboardList,
  CalendarX,
  FileCheck2,
  DollarSign,
  GraduationCap,
  Briefcase,
  GitCommit,
  Palette,
  Video,
  Building,
  TrendingUp,
  Receipt,
  Search,
  Megaphone,
  HardDrive,
  FileText,
  ShieldAlert,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

export interface OMSSidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export const OMSSidebar: React.FC<OMSSidebarProps> = ({ collapsed, onToggleCollapse }) => {
  const pathname = usePathname();

  const navGroups = [
    {
      title: 'OVERVIEW',
      items: [
        { label: 'Executive Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { label: 'Command Center', path: '/dashboard/command-center', icon: Activity },
      ],
    },
    {
      title: 'PEOPLE',
      items: [
        { label: 'Employees', path: '/employees', icon: Users },
        { label: 'Attendance', path: '/attendance', icon: CalendarCheck },
        { label: 'Daily Work Updates', path: '/daily-work', icon: ClipboardList },
        { label: 'Leave Requests', path: '/leave', icon: CalendarX },
        { label: 'Resignations', path: '/resignations', icon: FileCheck2 },
        { label: 'Payroll', path: '/payroll', icon: DollarSign },
        { label: 'Interns', path: '/interns', icon: GraduationCap },
      ],
    },
    {
      title: 'WORK',
      items: [
        { label: 'Projects', path: '/projects', icon: Briefcase },
        { label: 'Developer Activity', path: '/developer-activity', icon: GitCommit },
        { label: 'Design Assets', path: '/design-assets', icon: Palette },
        { label: 'Video Production', path: '/video-production', icon: Video },
      ],
    },
    {
      title: 'BUSINESS',
      items: [
        { label: 'Clients CRM', path: '/clients', icon: Building },
        { label: 'Sales Pipeline', path: '/sales-pipeline', icon: TrendingUp },
        { label: 'Finance Ledger', path: '/finance', icon: Receipt },
      ],
    },
    {
      title: 'MARKETING',
      items: [
        { label: 'SEO Keywords', path: '/seo', icon: Search },
        { label: 'Digital Marketing', path: '/digital-marketing', icon: Megaphone },
      ],
    },
    {
      title: 'ASSETS',
      items: [
        { label: 'IT Assets', path: '/it-assets', icon: HardDrive },
        { label: 'PDF Documents', path: '/documents', icon: FileText },
      ],
    },
    {
      title: 'SYSTEM',
      items: [
        { label: 'Audit Logs', path: '/admin/audit-logs', icon: ShieldAlert },
        { label: 'Settings', path: '/settings', icon: Settings },
      ],
    },
  ];

  return (
    <aside
      className={`h-screen sticky top-0 bg-zinc-950 border-r border-zinc-800 transition-all duration-300 flex flex-col z-40 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 px-4 border-b border-zinc-800 flex items-center justify-between shrink-0">
        {!collapsed ? (
          <ZyvoraLogo theme="dark" variant="full" />
        ) : (
          <ZyvoraLogo theme="dark" variant="mark" />
        )}

        <button
          onClick={onToggleCollapse}
          className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
          title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 scrollbar-thin">
        {navGroups.map((group) => (
          <div key={group.title} className="space-y-1">
            {!collapsed && (
              <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-mono">
                {group.title}
              </div>
            )}
            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path));

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  title={collapsed ? item.label : undefined}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all group ${
                    isActive
                      ? 'bg-zinc-900 text-white border border-zinc-700 shadow-sm'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-zinc-400 group-hover:text-white'}`} />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      {/* Footer Tagline */}
      {!collapsed && (
        <div className="p-4 border-t border-zinc-800/80 bg-zinc-950 text-[10px] text-zinc-500 font-medium">
          <div className="flex items-center gap-1 text-zinc-400 font-bold mb-0.5">
            <Sparkles className="w-3 h-3 text-amber-400" /> Zyvora Enterprise
          </div>
          One platform. Every operation.
        </div>
      )}
    </aside>
  );
};
