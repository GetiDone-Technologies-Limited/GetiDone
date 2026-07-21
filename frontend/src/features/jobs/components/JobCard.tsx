import Link from 'next/link';
import type { Job } from '../types/jobs.types';
import { Badge } from '@/shared/components/ui/Badge';
import { Avatar } from '@/shared/components/ui/Avatar';
import { formatCurrency, formatRelativeTime } from '@/shared/lib/utils';
import { ShieldCheck, MapPin, Clock, ArrowRight } from 'lucide-react';

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  return (
    <Link
      href={`/jobs/${job.id}`}
      className="group flex flex-col bg-white rounded-3xl p-6 shadow-sm border border-slate-200 transition-all duration-300 hover:shadow-xl hover:border-[#00b259]/30 hover:-translate-y-1 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#00b259]/5 to-transparent rounded-bl-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="flex justify-between items-start mb-4 relative z-10 gap-4">
        <div className="flex gap-3 sm:gap-4 items-center min-w-0 flex-1">
          {job.client && (
            <div className="shrink-0">
              <Avatar src={job.client.avatarUrl} name={job.client.name} size="lg" className="w-12 h-12 sm:w-14 sm:h-14 border border-slate-100 shadow-sm" />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#00b259] transition-colors truncate" title={job.title}>
              {job.title}
            </h3>
            {job.client && (
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 mt-1 min-w-0">
                <span className="text-sm font-semibold text-slate-600 truncate" title={job.client.name}>{job.client.name}</span>
                <span className="shrink-0 flex items-center gap-1 text-[10px] font-bold text-[#00b259] bg-green-50 px-2 py-0.5 rounded-full whitespace-nowrap">
                  <ShieldCheck className="w-3 h-3" /> <span className="hidden sm:inline">Payment Verified</span>
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="text-right shrink-0">
          <p className="text-lg sm:text-xl font-black text-slate-900">{formatCurrency(job.budget)}</p>
          <p className="text-[10px] sm:text-xs font-semibold text-slate-500 mt-0.5">Fixed Price</p>
        </div>
      </div>

      <p className="text-[14px] text-slate-600 leading-relaxed line-clamp-2 mb-5 relative z-10 flex-grow">
        {job.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-6 relative z-10">
        {job.skills?.slice(0, 4).map((s) => (
          <span key={s.id} className="bg-slate-100 text-slate-600 text-xs font-semibold px-2.5 py-1 rounded-lg border border-slate-200">
            {s.name}
          </span>
        ))}
        {job.skills?.length > 4 && (
           <span className="bg-slate-100 text-slate-600 text-xs font-semibold px-2.5 py-1 rounded-lg border border-slate-200">
             +{job.skills.length - 4} more
           </span>
        )}
      </div>

      <div className="pt-5 mt-auto border-t border-slate-100 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
          <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-slate-400" /> {formatRelativeTime(job.createdAt)}</span>
          <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-slate-400" /> Remote</span>
          {job._count?.applications !== undefined && (
             <span className="flex items-center gap-1.5">
               <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
               {job._count.applications} Proposal{job._count.applications !== 1 ? 's' : ''}
             </span>
          )}
        </div>
        <button className="flex items-center gap-1.5 text-sm font-bold text-[#00b259] group-hover:translate-x-1 transition-transform">
          View Details <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </Link>
  );
}
