import Link from 'next/link';
import type { Job } from '../types/jobs.types';
import { Badge, statusToBadgeVariant } from '@/shared/components/ui/Badge';
import { Avatar } from '@/shared/components/ui/Avatar';
import { formatCurrency, formatRelativeTime } from '@/shared/lib/utils';

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  return (
    <Link
      href={`/jobs/${job.id}`}
      className="group block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-primary-300 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-slate-900 group-hover:text-primary-700 transition-colors truncate">
            {job.title}
          </h3>
          {job.client && (
            <div className="mt-1 flex items-center gap-1.5">
              <Avatar src={job.client.avatarUrl} name={job.client.name} size="xs" />
              <span className="text-xs text-slate-500">{job.client.name}</span>
            </div>
          )}
        </div>
        <Badge variant={statusToBadgeVariant(job.status)}>{job.status}</Badge>
      </div>

      <p className="mt-3 text-sm text-slate-600 line-clamp-2">{job.description}</p>

      {/* Skills */}
      {job.skills?.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {job.skills.slice(0, 5).map((s) => (
            <Badge key={s.id} variant="violet">
              {s.name}
            </Badge>
          ))}
          {job.skills.length > 5 && (
            <Badge variant="default">+{job.skills.length - 5}</Badge>
          )}
        </div>
      )}

      <div className="mt-4 flex items-center justify-between">
        <span className="text-base font-bold text-primary-700">{formatCurrency(job.budget)}</span>
        <div className="flex items-center gap-3 text-xs text-slate-400">
          {job._count?.applications !== undefined && (
            <span>{job._count.applications} applicant{job._count.applications !== 1 ? 's' : ''}</span>
          )}
          <span>{formatRelativeTime(job.createdAt)}</span>
        </div>
      </div>
    </Link>
  );
}

