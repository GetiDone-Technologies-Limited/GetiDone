'use client';

import { useJob } from '../hooks/useJobs';
import { Badge, statusToBadgeVariant } from '@/shared/components/ui/Badge';
import { Avatar } from '@/shared/components/ui/Avatar';
import { Button } from '@/shared/components/ui/Button';
import { LoadingSpinner } from '@/shared/components/feedback/LoadingSpinner';
import { formatCurrency, formatDate } from '@/shared/lib/utils';
import { useAuthStore } from '@/store/auth.store';

interface JobDetailProps {
  jobId: string;
  onApply?: () => void;
}

export function JobDetail({ jobId, onApply }: JobDetailProps) {
  const { data: job, isLoading, error } = useJob(jobId);
  const { user } = useAuthStore();

  if (isLoading) return <LoadingSpinner size="lg" />;
  if (error || !job) return <p className="text-red-600">{error?.message ?? 'Job not found'}</p>;

  const canApply = user?.role === 'FREELANCER' && job.status === 'OPEN';

  return (
    <div className="max-w-3xl">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{job.title}</h1>
          {job.client && (
            <div className="mt-2 flex items-center gap-2">
              <Avatar src={job.client.avatarUrl} name={job.client.name} size="sm" />
              <span className="text-sm text-slate-600">
                by <strong>{job.client.name}</strong> · DoneScore {job.client.doneScore}
              </span>
            </div>
          )}
        </div>
        <Badge variant={statusToBadgeVariant(job.status)} className="text-sm px-3 py-1">
          {job.status}
        </Badge>
      </div>

      {/* Meta */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-xs text-slate-500">Budget</p>
          <p className="mt-0.5 text-xl font-bold text-violet-700">{formatCurrency(job.budget)}</p>
        </div>
        {job.deadline && (
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs text-slate-500">Deadline</p>
            <p className="mt-0.5 text-sm font-semibold text-slate-800">{formatDate(job.deadline)}</p>
          </div>
        )}
        {job._count && (
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs text-slate-500">Applications</p>
            <p className="mt-0.5 text-xl font-bold text-slate-800">{job._count.applications}</p>
          </div>
        )}
      </div>

      {/* Description */}
      <div className="mt-6">
        <h2 className="text-base font-semibold text-slate-900 mb-2">About this job</h2>
        <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">{job.description}</p>
      </div>

      {/* Skills */}
      {job.skills?.length > 0 && (
        <div className="mt-6">
          <h2 className="text-base font-semibold text-slate-900 mb-2">Required skills</h2>
          <div className="flex flex-wrap gap-2">
            {job.skills.map((s) => (
              <Badge key={s.id} variant="violet">{s.name}</Badge>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      {canApply && onApply && (
        <div className="mt-8">
          <Button size="lg" onClick={onApply}>Apply for this job</Button>
        </div>
      )}
    </div>
  );
}
