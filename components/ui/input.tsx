import React from 'react';
import { cn } from '../../lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, type = 'text', ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label className="text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
            {label}
          </label>
        )}
        <input
          ref={ref}
          type={type}
          className={cn(
            'w-full px-4 py-2.5 rounded-xl text-sm transition-all duration-200 border bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white focus:border-transparent',
            error && 'border-rose-500 focus:ring-rose-500',
            className
          )}
          {...props}
        />
        {error && <span className="text-xs text-rose-500 font-medium">{error}</span>}
        {helperText && !error && <span className="text-xs text-zinc-500 dark:text-zinc-400">{helperText}</span>}
      </div>
    );
  }
);
Input.displayName = 'Input';
