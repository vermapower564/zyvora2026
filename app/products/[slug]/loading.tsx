import React from 'react';

export default function ProductDetailLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="aspect-square w-full rounded-3xl bg-zinc-900 border border-zinc-800" />
        <div className="space-y-6">
          <div className="h-6 w-32 bg-zinc-800 rounded-full" />
          <div className="h-10 w-3/4 bg-zinc-800 rounded-xl" />
          <div className="h-6 w-40 bg-zinc-800 rounded-lg" />
          <div className="h-12 w-48 bg-zinc-800 rounded-xl" />
          <div className="h-24 w-full bg-zinc-800 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
