import type { Metadata } from 'next';
import { AIMatchList } from '@/features/matching/components/AIMatchList';

export const metadata: Metadata = { title: 'Freelancer Dashboard' };

export default function FreelancerDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Your AI Matches</h1>
          <p className="mt-1 text-sm text-slate-500">
            Jobs ranked by our AI engine based on your skills and DoneScore™.
          </p>
        </div>
      </div>

      <AIMatchList />
    </div>
  );
}
