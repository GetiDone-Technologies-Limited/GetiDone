import type { Metadata } from 'next';
import { Navbar } from '@/shared/components/layout/Navbar';
import { JobPostForm } from '@/features/jobs/components/JobPostForm';

export const metadata: Metadata = { title: 'Post a job' };

export default function NewJobPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Post a new job</h1>
          <p className="text-sm text-slate-500 mt-1">Fill in the details and start receiving applications</p>
        </div>
        <div className="rounded-2xl bg-white p-8 shadow-sm border border-slate-200">
          <JobPostForm />
        </div>
      </main>
    </div>
  );
}

