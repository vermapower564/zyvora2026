'use client';

import React from 'react';
import { Button } from '../components/ui/button';
import { AlertCircle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
      <div className="w-16 h-16 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center">
        <AlertCircle className="w-8 h-8" />
      </div>
      <h2 className="text-2xl font-extrabold text-zinc-100">Something went wrong</h2>
      <p className="text-sm text-zinc-400 max-w-md">
        {error.message || 'An unexpected error occurred while loading this page.'}
      </p>
      <Button onClick={() => reset()} variant="primary" className="mt-4">
        Try Again
      </Button>
    </div>
  );
}
