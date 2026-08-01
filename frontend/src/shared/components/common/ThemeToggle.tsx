'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-[var(--border)] bg-[var(--card)] ${className}`} />;
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-[var(--border)] bg-[var(--card)] flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-sm lift ${className}`}
      title={resolvedTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      aria-label="Toggle Theme"
    >
      {resolvedTheme === 'dark' ? (
        <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
      ) : (
        <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600 dark:text-slate-300" />
      )}
    </button>
  );
}
