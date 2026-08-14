'use client';

import React, { useState } from 'react';
import { Search, Bell, Shield, Sun, Moon, CheckCircle2, User, ArrowLeft, ArrowRight } from 'lucide-react';
import { useAuthStore } from '../../store/auth-store';
import { HRMSService } from '../../services/hrms.service';
import { Notification } from '../../types/hrms';

export interface OMSTopbarProps {
  onOpenCommandPalette: () => void;
}

export const OMSTopbar: React.FC<OMSTopbarProps> = ({ onOpenCommandPalette }) => {
  const { user } = useAuthStore();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  React.useEffect(() => {
    HRMSService.getNotifications().then(setNotifications);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    if (next === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  return (
    <header className="h-16 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Left: Back & Forward Controls + Command Search Bar */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-xl border border-zinc-800 shrink-0">
          <button
            onClick={() => window.history.back()}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            title="Go Back"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => window.history.forward()}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            title="Go Forward"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <button
          onClick={onOpenCommandPalette}
          className="w-full flex items-center justify-between px-3.5 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:border-zinc-700 transition-all group"
        >

          <div className="flex items-center gap-2.5">
            <Search className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
            <span className="text-xs font-medium">Search operations, employees, projects...</span>
          </div>
          <kbd className="px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-[10px] font-mono text-zinc-400">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right: Environment Indicator, Theme, Notifications & User Avatar */}
      <div className="flex items-center gap-4">
        {/* Environment Badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-800 text-[11px] font-bold text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Production
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all"
          title="Toggle Theme"
        >
          {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-400" />}
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all relative"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-black flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown Popover */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl p-3 z-50 animate-fade-in space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                <span className="text-xs font-bold text-white uppercase tracking-wider">Notifications</span>
                <span className="text-[10px] text-zinc-500 font-mono">{unreadCount} unread</span>
              </div>
              <div className="space-y-1.5 max-h-64 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800/80 text-xs space-y-1">
                    <div className="flex items-center justify-between font-bold text-white">
                      <span>{n.title}</span>
                      <span className="text-[10px] text-zinc-500 font-normal">{n.timestamp}</span>
                    </div>
                    <p className="text-[11px] text-zinc-400 leading-snug">{n.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Info */}
        <div className="flex items-center gap-3 pl-2 border-l border-zinc-800">
          <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 text-white font-bold flex items-center justify-center text-xs overflow-hidden shrink-0">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              user?.name?.charAt(0) || 'U'
            )}
          </div>
          <div className="hidden md:block text-left">
            <div className="text-xs font-bold text-white leading-tight">{user?.name || 'Roushan Verma'}</div>
            <div className="flex items-center gap-1 text-[10px] text-zinc-400 font-mono">
              <Shield className="w-2.5 h-2.5 text-blue-400" /> {user?.role || 'SUPER_ADMIN'}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
