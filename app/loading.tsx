import React from 'react';
import { Spinner } from '../components/ui/spinner';

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
      <Spinner size="lg" />
      <p className="text-sm font-semibold text-zinc-400">Loading Zyvora Marketplace...</p>
    </div>
  );
}
