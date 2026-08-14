'use client';

import React, { useState } from 'react';
import { AppShell } from '../../components/layout/app-shell';
import { Settings, Shield, Bell, Moon, Sun, Monitor, Check } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { useUIStore } from '../../store/ui-store';

export default function SettingsPage() {
  const { addToast } = useUIStore();
  const [themeMode, setThemeMode] = useState<'dark' | 'light' | 'system'>('dark');

  const handleSave = () => {
    addToast('System preferences saved successfully', 'success');
  };

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-black text-white">System Settings & Preferences</h1>
          <p className="text-sm text-zinc-400 mt-1">
            Manage your account security, notification triggers, system appearance, and enterprise preferences.
          </p>
        </div>

        {/* Appearance Settings */}
        <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Moon className="w-5 h-5 text-purple-400" /> Appearance Theme
          </h2>

          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={() => setThemeMode('dark')}
              className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                themeMode === 'dark' ? 'bg-zinc-800 border-white text-white' : 'bg-zinc-950 border-zinc-800 text-zinc-400'
              }`}
            >
              <Moon className="w-6 h-6 text-purple-400" />
              <span className="text-xs font-bold">Dark Mode</span>
            </button>

            <button
              onClick={() => setThemeMode('light')}
              className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                themeMode === 'light' ? 'bg-zinc-800 border-white text-white' : 'bg-zinc-950 border-zinc-800 text-zinc-400'
              }`}
            >
              <Sun className="w-6 h-6 text-amber-400" />
              <span className="text-xs font-bold">Light Mode</span>
            </button>

            <button
              onClick={() => setThemeMode('system')}
              className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                themeMode === 'system' ? 'bg-zinc-800 border-white text-white' : 'bg-zinc-950 border-zinc-800 text-zinc-400'
              }`}
            >
              <Monitor className="w-6 h-6 text-blue-400" />
              <span className="text-xs font-bold">System Default</span>
            </button>
          </div>
        </div>

        {/* Security & Organization Preferences */}
        <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-400" /> Security & Session Management
          </h2>

          <div className="space-y-3 text-xs text-zinc-300">
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-950 border border-zinc-800">
              <div>
                <div className="font-bold text-white">Two-Factor Authentication (2FA)</div>
                <div className="text-zinc-500">Require authenticator app code on login</div>
              </div>
              <input type="checkbox" defaultChecked className="toggle shrink-0" />
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-950 border border-zinc-800">
              <div>
                <div className="font-bold text-white">Audit Log Recording</div>
                <div className="text-zinc-500">Log all data mutation actions for compliance</div>
              </div>
              <input type="checkbox" defaultChecked className="toggle shrink-0" />
            </div>
          </div>

          <Button onClick={handleSave} className="gap-2 text-xs">
            <Check className="w-4 h-4" /> Save Preferences
          </Button>
        </div>
      </div>
    </AppShell>
  );
}
