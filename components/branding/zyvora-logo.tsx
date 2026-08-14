'use client';

import React from 'react';
import Link from 'next/link';

export interface ZyvoraLogoProps {
  variant?: 'full' | 'mark' | 'compact';
  theme?: 'dark' | 'light';
  className?: string;
  showLink?: boolean;
}

export const ZyvoraLogo: React.FC<ZyvoraLogoProps> = ({
  variant = 'full',
  theme = 'dark',
  className = '',
  showLink = true,
}) => {
  const isDark = theme === 'dark';

  const markGraphic = (
    <div className="relative w-9 h-9 flex items-center justify-center shrink-0 group">
      {/* Background Glow */}
      <div className="absolute inset-0 rounded-xl bg-amber-500/20 blur-sm group-hover:bg-amber-500/40 transition-all" />
      
      {/* Metallic Badge Container */}
      <div className={`relative w-full h-full rounded-xl border flex items-center justify-center font-black text-xl tracking-tighter shadow-lg transition-transform group-hover:scale-105 ${
        isDark 
          ? 'bg-gradient-to-br from-zinc-900 via-zinc-950 to-black border-amber-500/30 text-white' 
          : 'bg-gradient-to-br from-white via-zinc-50 to-zinc-100 border-amber-400/40 text-zinc-950'
      }`}>
        {/* Orbital Swoosh */}
        <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-amber-400/80 border-t-transparent -rotate-45" />
        
        {/* Monogram Z */}
        <span className="bg-gradient-to-b from-white via-zinc-200 to-amber-400 bg-clip-text text-transparent drop-shadow-sm font-black">
          Z
        </span>

        {/* Four-Point Gold Sparkle */}
        <span className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-amber-400 rotate-45 rounded-[1px] shadow-[0_0_6px_#F59E0B]" />
      </div>
    </div>
  );

  const wordmark = (
    <div className="flex flex-col leading-none">
      <span className={`text-xl font-black tracking-tight font-sans ${isDark ? 'text-white' : 'text-zinc-950'}`}>
        ZYV<span className="text-amber-400">O</span>R<span className="text-amber-400 font-extrabold">A</span>
      </span>
      <span className="text-[9px] font-bold tracking-[0.2em] text-amber-500/90 uppercase">
        LUXURY MARKETPLACE
      </span>
    </div>
  );

  const content = (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {markGraphic}
      {variant !== 'mark' && wordmark}
    </div>
  );

  if (showLink) {
    return (
      <Link href="/" className="inline-flex items-center group">
        {content}
      </Link>
    );
  }

  return content;
};
