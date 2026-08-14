import React from 'react';
import { Sidebar } from '../../../components/layout/sidebar';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';

export default function AdminSettingsPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar type="admin" />

      <main className="flex-1 p-8 space-y-8">
        <div>
          <h1 className="text-3xl font-black text-white">System Settings</h1>
          <p className="text-xs text-zinc-400 mt-1">Configure site name, tax rates, currency, and maintenance mode.</p>
        </div>

        <div className="p-8 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-6 max-w-2xl">
          <Input label="Platform Name" defaultValue="Zyvora Multi-Vendor Marketplace" />
          <Input label="Support Email" defaultValue="support@zyvora.com" />
          <Input label="Default Currency" defaultValue="USD ($)" />
          <Input label="Tax Rate (%)" defaultValue="8.0" />

          <Button size="lg" className="w-full">Save System Configuration</Button>
        </div>
      </main>
    </div>
  );
}
