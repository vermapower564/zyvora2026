'use client';

import React, { useState } from 'react';
import { OMSSidebar } from './oms-sidebar';
import { OMSTopbar } from './oms-topbar';
import { CommandPalette } from '../ui/command-palette';

export interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Left Sidebar */}
      <OMSSidebar
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content Column */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <OMSTopbar onOpenCommandPalette={() => setCommandPaletteOpen(true)} />

        {/* Main Body View */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Global Command Palette Modal */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />
    </div>
  );
};
