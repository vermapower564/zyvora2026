'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Users, Briefcase, Building, DollarSign, FileText, ArrowRight, X } from 'lucide-react';

export interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open handled by parent or shortcut
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickLinks = [
    { label: 'Employees Directory', path: '/employees', category: 'PEOPLE', icon: Users },
    { label: 'Attendance Tracker', path: '/attendance', category: 'PEOPLE', icon: Users },
    { label: 'Projects Dashboard', path: '/projects', category: 'WORK', icon: Briefcase },
    { label: 'Daily Work Updates', path: '/daily-work', category: 'WORK', icon: Briefcase },
    { label: 'Client CRM', path: '/clients', category: 'BUSINESS', icon: Building },
    { label: 'Sales Deal Pipeline', path: '/sales-pipeline', category: 'BUSINESS', icon: DollarSign },
    { label: 'PDF Document Center', path: '/documents', category: 'ASSETS', icon: FileText },
    { label: 'System Audit Logs', path: '/admin/audit-logs', category: 'SYSTEM', icon: FileText },
  ];

  const filteredLinks = quickLinks.filter(
    (item) =>
      item.label.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleNavigate = (path: string) => {
    router.push(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl overflow-hidden">
        {/* Search Header */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-zinc-800">
          <Search className="w-5 h-5 text-zinc-400 mr-3 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Type a command or search employees, projects, clients, documents... (ESC to close)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none"
          />
          <button onClick={onClose} className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-zinc-800/50">
          {filteredLinks.length === 0 ? (
            <div className="p-8 text-center text-xs text-zinc-500">No command or route matching "{query}"</div>
          ) : (
            filteredLinks.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavigate(item.path)}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-zinc-800/60 transition-colors text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-zinc-800 text-zinc-300 group-hover:bg-white group-hover:text-black transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white group-hover:text-white">{item.label}</div>
                      <div className="text-[10px] font-mono text-zinc-500 uppercase">{item.category}</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-transform group-hover:translate-x-1" />
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 bg-zinc-950 border-t border-zinc-800 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
          <span>Navigate with mouse or click</span>
          <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">ESC to close</span>
        </div>
      </div>
    </div>
  );
};
