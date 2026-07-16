import type { Metadata } from 'next';
import Link from 'next/link';
import { JobList } from '@/features/jobs/components/JobList';

export const metadata: Metadata = { title: 'Client Dashboard' };

export default function ClientDashboardPage() {
  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My posted jobs</h1>
          <p className="text-sm text-slate-500 mt-1">Manage your active job postings and applications</p>
        </div>
        <Link
          href="/jobs/new"
          className="inline-flex items-center rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-violet-700 transition-all"
        >
          + Post a job
        </Link>
      </div>
      <JobList />
    </div>
  );
}
