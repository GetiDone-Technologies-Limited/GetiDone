import type { Metadata } from 'next';
import { JobList } from '@/features/jobs/components/JobList';

export const metadata: Metadata = { title: 'Freelancer Dashboard' };

export default function FreelancerDashboardPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Find your next project</h1>
        <p className="text-sm text-slate-500 mt-1">Browse open jobs and apply with a tailored proposal</p>
      </div>
      <JobList filters={{ status: 'OPEN' }} />
    </div>
  );
}
