'use client';

import { JobCard } from './JobCard';
import { LoadingSpinner } from '@/shared/components/feedback/LoadingSpinner';
import { EmptyState } from '@/shared/components/feedback/EmptyState';
import { useJobs } from '../hooks/useJobs';
import type { JobFilters } from '../types/jobs.types';
import { Button } from '@/shared/components/ui/Button';
import Link from 'next/link';

interface JobListProps {
  filters?: JobFilters;
}

export function JobList({ filters }: JobListProps) {
  const { data, isLoading, error } = useJobs(filters);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl bg-red-50 border border-red-200 p-6 text-center text-sm text-red-700">
        Failed to load jobs: {error.message}
      </div>
    );
  }

  if (!data?.data?.length) {
    return (
      <EmptyState
        title="No jobs found"
        description="Try adjusting your filters or be the first to post a job."
        action={
          <Link href="/jobs/new">
            <Button size="md">Post a job</Button>
          </Link>
        }
      />
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
      {data.data.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}

