'use client';

import React from 'react';
import { ArrowUp } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  fullScreen?: boolean;
}

export function LoadingSpinner({
  size = 'md',
  label = 'Preparing your workspace…',
  fullScreen = false,
}: LoadingSpinnerProps) {
  if (fullScreen || size === 'lg') {
    return (
      <div className="fixed inset-0 z-[9999] bg-[#0A0F0D] flex items-center justify-center overflow-hidden transition-opacity duration-500 text-white">
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none z-0 gd-loader-glow" style={{ background: 'radial-gradient(circle, rgba(16, 185, 129, 0.18) 0%, transparent 70%)', filter: 'blur(80px)' }} />

        <div className="relative z-10 text-center w-full max-w-[320px] px-5 flex flex-col items-center">
          {/* Logo & Arrow Icon */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-[70px] h-[70px] rounded-[18px] flex items-center justify-center text-white mb-6 shadow-[0_10px_30px_rgba(16,185,129,0.4)] gd-loader-bounce" style={{ background: 'linear-gradient(135deg, #10B981, #34D399)' }}>
              <ArrowUp className="w-8 h-8 stroke-[3]" />
            </div>
            <div className="font-extrabold text-3xl tracking-tight gd-loader-fade" style={{ fontFamily: "'Sora', sans-serif" }}>
              <span className="text-white">Geti</span>
              <span style={{ color: '#10B981' }}>Done</span>
            </div>
          </div>

          {/* Progress Track */}
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-4">
            <div className="h-full rounded-full gd-loader-bar" style={{ background: 'linear-gradient(90deg, #10B981, #34D399)' }} />
          </div>

          {/* Status Text */}
          <div className="text-[12px] font-semibold tracking-widest text-[#7A8A82] uppercase flex items-center gap-0.5 uppercase font-mono">
            <span>{label}</span>
            <span className="gd-dots"></span>
          </div>
        </div>
      </div>
    );
  }

  const sizeMap = { sm: 'h-4 w-4', md: 'h-8 w-8', lg: 'h-12 w-12' };

  return (
    <div className="flex flex-col items-center justify-center gap-2" role="status" aria-label={label}>
      <svg
        className={`animate-spin text-emerald-500 ${sizeMap[size]}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
      </svg>
      <span className="sr-only">{label}</span>
    </div>
  );
}
