'use client';

import { useAuthStore } from '@/store/auth.store';
import { Search } from 'lucide-react';
import Link from 'next/link';

export function WelcomeHeader() {
  const { user } = useAuthStore();
  const firstName = user?.name ? user.name.split(' ')[0] : 'Daniel';

  return (
    <div className="flex items-end justify-between flex-wrap gap-4 mb-8 fade-up">
      <div>
        <h1 className="font-extrabold text-4xl tracking-tight" style={{ fontFamily: "'Sora', sans-serif", color: 'var(--text)' }}>
          Good morning, {firstName}!<span style={{ color: 'var(--primary)' }}>.</span>
        </h1>
        <p className="text-sm mt-1.5" style={{ color: 'var(--muted)' }}>
          You have <span className="font-bold" style={{ color: 'var(--text)' }}>4 active proposals</span> and <span className="font-bold" style={{ color: 'var(--text)' }}>2 ongoing contracts</span>.
        </p>
      </div>

      <Link
        href="/jobs/search"
        className="btn-primary px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2"
      >
        <Search className="w-4 h-4" />
        <span>Browse New Jobs</span>
      </Link>
    </div>
  );
}
