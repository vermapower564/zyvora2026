import React from 'react';
import { cn } from '../../lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({ className, children, hoverEffect = false, ...props }) => {
  return (
    <div
      className={cn(
        'rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 shadow-sm p-6 overflow-hidden transition-all duration-300',
        hoverEffect && 'hover:shadow-xl hover:-translate-y-1 hover:border-zinc-300 dark:hover:border-zinc-700',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
