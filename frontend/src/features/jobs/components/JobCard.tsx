'use client';

import Link from 'next/link';
import type { Job } from '../types/jobs.types';
import { Badge } from '@/shared/components/ui/Badge';
import { Avatar } from '@/shared/components/ui/Avatar';
import { formatCurrency, formatRelativeTime } from '@/shared/lib/utils';
import { ShieldCheck, MapPin, Clock, ArrowRight, Users } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/shared/components/ui/Tabs';

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  return (
    <div className="group flex flex-col bg-white rounded-3xl p-6 shadow-sm border border-slate-200 transition-all duration-300 hover:shadow-xl hover:border-[#00b259]/30 hover:-translate-y-1 relative overflow-hidden h-[340px]">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#00b259]/5 to-transparent rounded-bl-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>

      {/* Header */}
      <div className="flex justify-between items-start mb-4 relative z-10 gap-4 shrink-0">
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

      {/* Tabs Area */}
      <Tabs defaultValue="overview" className="flex-1 min-h-0 flex flex-col relative z-10">
        <TabsList className="mb-2 shrink-0 border-slate-100">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="pr-2 text-[13px] text-slate-600 leading-relaxed font-medium">
          {job.description}
        </TabsContent>
        
        <TabsContent value="skills" className="pr-2">
          <div className="flex flex-wrap gap-2">
            {job.skills?.map((s) => (
              <span key={s.id} className="bg-slate-50 text-slate-600 text-xs font-bold px-2.5 py-1.5 rounded-lg border border-slate-200">
                {s.name}
              </span>
            ))}
            {(!job.skills || job.skills.length === 0) && (
              <p className="text-sm font-semibold text-slate-400 italic">No specific skills listed.</p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="details" className="pr-2 space-y-3">
          <div className="flex items-center gap-3 text-sm font-semibold text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            <Clock className="w-4 h-4 text-slate-400 shrink-0" />
            <span>Posted {formatRelativeTime(job.createdAt)}</span>
          </div>
          <div className="flex items-center gap-3 text-sm font-semibold text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
            <span>Remote (Worldwide)</span>
          </div>
          {job._count?.applications !== undefined && (
            <div className="flex items-center gap-3 text-sm font-semibold text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <Users className="w-4 h-4 text-slate-400 shrink-0" />
              <span>{job._count.applications} Proposal{job._count.applications !== 1 ? 's' : ''} Received</span>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Footer */}
      <div className="pt-4 mt-auto border-t border-slate-100 flex items-center justify-end relative z-10 shrink-0">
        <Link href={`/jobs/${job.id}`}>
          <button className="flex items-center justify-center gap-1.5 w-full sm:w-auto px-5 py-2.5 bg-slate-900 text-white hover:bg-[#00b259] text-sm font-bold rounded-xl shadow-sm group-hover:bg-[#00b259] transition-colors">
            View Details <ArrowRight className="w-4 h-4" />
          </button>
        </Link>
      </div>
    </div>
  );
}
