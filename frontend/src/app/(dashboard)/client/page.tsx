import type { Metadata } from 'next';
import Link from 'next/link';
import { JobList } from '@/features/jobs/components/JobList';

export const metadata: Metadata = { title: 'Client Dashboard' };

export default function ClientDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Premium Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-900 to-primary-800 p-6 shadow-lg text-white">
          <div className="absolute top-0 right-0 -mr-8 -mt-8 h-32 w-32 rounded-full bg-primary-700/50 blur-2xl"></div>
          <div className="relative z-10">
            <p className="text-sm font-medium text-primary-200">Active Jobs</p>
            <p className="mt-2 text-4xl font-bold tracking-tight">3</p>
            <div className="mt-4 flex items-center text-sm">
              <span className="flex items-center text-accent-400 font-semibold">
                <svg className="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                +2 
              </span>
              <span className="ml-2 text-primary-300">this week</span>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
          <div className="relative z-10">
            <p className="text-sm font-medium text-slate-500">Total Spend</p>
            <p className="mt-2 text-4xl font-bold tracking-tight text-slate-900">$12,450</p>
            <div className="mt-4 flex items-center text-sm">
              <span className="flex items-center text-accent-600 font-semibold">
                Escrow Secured
              </span>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
          <div className="relative z-10">
            <p className="text-sm font-medium text-slate-500">Hired Freelancers</p>
            <p className="mt-2 text-4xl font-bold tracking-tight text-slate-900">8</p>
            <div className="mt-4 flex items-center text-sm">
              <span className="flex items-center text-slate-500">
                Across 5 projects
              </span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">My posted jobs</h2>
            <p className="text-sm text-slate-500 mt-1">Manage your active job postings and applications</p>
          </div>
          <Link
            href="/jobs/new"
            className="inline-flex items-center rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-primary-700 hover:-translate-y-0.5 transition-all"
          >
            + Post a job
          </Link>
        </div>
        <JobList />
      </div>
    </div>
  );
}

