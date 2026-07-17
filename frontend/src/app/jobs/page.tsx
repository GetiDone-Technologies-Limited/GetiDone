'use client';

import { useState } from 'react';
import { Navbar } from '@/shared/components/layout/Navbar';
import { JobList } from '@/features/jobs/components/JobList';
import { Input } from '@/shared/components/ui/Input';
import { useDebounce } from '@/shared/hooks/useDebounce';
import Link from 'next/link';

export default function JobsBrowsePage() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 350);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-10">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Browse jobs</h1>
            <p className="text-sm text-slate-500 mt-0.5">Find your next opportunity</p>
          </div>
          <Link
            href="/jobs/new"
            className="inline-flex items-center rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 transition-all self-start"
          >
            + Post a job
          </Link>
        </div>

        <div className="mb-6">
          <Input
            id="jobs-search"
            placeholder="Search jobs by title or skill…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <JobList filters={{ search: debouncedSearch || undefined }} />
      </main>
    </div>
  );
}

