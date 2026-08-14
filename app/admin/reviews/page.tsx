import React from 'react';
import { Sidebar } from '../../../components/layout/sidebar';

export default function AdminReviewsPage() {
  const reviews = [
    { id: 'rev_1', product: 'Zyvora Aura Noise-Cancelling Headphones', user: 'Alex Mercer', rating: 5, comment: 'Astonishing sound quality and spatial audio depth!' },
    { id: 'rev_2', product: 'Veloce Chronograph Automatic Watch', user: 'David Kim', rating: 5, comment: 'Exquisite craftmanship. Delivered in luxury packaging.' },
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar type="admin" />

      <main className="flex-1 p-8 space-y-8">
        <div>
          <h1 className="text-3xl font-black text-white">Review Moderation Center</h1>
          <p className="text-xs text-zinc-400 mt-1">Audit customer ratings and moderate flagged feedback.</p>
        </div>

        <div className="space-y-4">
          {reviews.map((r) => (
            <div key={r.id} className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">{r.product}</span>
                <span className="text-amber-400 font-bold text-xs">★ {r.rating}.0 / 5</span>
              </div>
              <p className="text-xs text-zinc-300">&ldquo;{r.comment}&rdquo;</p>
              <span className="text-[11px] text-zinc-500 block">Reviewed by {r.user}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
