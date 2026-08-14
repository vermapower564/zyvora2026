import React from 'react';
import { Star } from 'lucide-react';

export interface RatingStarsProps {
  rating: number;
  count?: number;
  size?: 'sm' | 'md';
}

export const RatingStars: React.FC<RatingStarsProps> = ({ rating, count, size = 'sm' }) => {
  const iconSize = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4';

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center text-amber-400">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${iconSize} ${star <= Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'text-zinc-300 dark:text-zinc-700'}`}
          />
        ))}
      </div>
      <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{rating.toFixed(1)}</span>
      {count !== undefined && <span className="text-xs text-zinc-400">({count})</span>}
    </div>
  );
};
