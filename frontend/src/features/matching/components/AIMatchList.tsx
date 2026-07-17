'use client';

import { useAuthStore } from '@/store/auth.store';
import { useJobMatches } from '../hooks/useJobMatches';
import { formatCurrency } from '@/shared/lib/utils';
import Link from 'next/link';

export function AIMatchList() {
  const { user } = useAuthStore();
  const { data: matches, isLoading, error } = useJobMatches(user?.id);

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 rounded-2xl bg-slate-100" />
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-sm text-red-500 bg-red-50 p-4 rounded-xl">Failed to load AI recommendations.</div>;
  }

  if (!matches || matches.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center">
        <p className="text-sm text-slate-500">No matching jobs found right now.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {matches.map((match) => (
        <Link 
          key={match.job.id} 
          href={`/jobs/${match.job.id}`}
          className="group block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-accent-400 hover:shadow-md relative overflow-hidden"
        >
          {/* AI Match Badge */}
          <div className="absolute top-0 right-0 bg-gradient-to-bl from-accent-100 to-white px-4 py-2 rounded-bl-2xl border-b border-l border-slate-100">
            <div className="flex items-center gap-2">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-accent-50">
                <svg className="absolute h-full w-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-200"
                    strokeDasharray="100, 100"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                  />
                  <path
                    className={match.matchPercentage >= 80 ? 'text-accent-500' : match.matchPercentage >= 50 ? 'text-amber-400' : 'text-slate-400'}
                    strokeDasharray={`${match.matchPercentage}, 100`}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                  />
                </svg>
                <span className="text-[10px] font-bold text-slate-700">{match.matchPercentage}%</span>
              </div>
              <span className="text-xs font-semibold text-accent-600">AI Match</span>
            </div>
          </div>

          <div className="pr-24">
            <h3 className="font-semibold text-slate-900 group-hover:text-primary-700 transition-colors truncate">
              {match.job.title}
            </h3>
            <p className="mt-1 text-sm text-slate-500 line-clamp-2">{match.job.description}</p>
            
            {/* AI Reasoning */}
            <div className="mt-3 rounded-lg bg-slate-50 p-3 border border-slate-100">
              <div className="flex items-start gap-2">
                <span className="text-lg leading-none">✨</span>
                <p className="text-xs text-slate-600 italic">{match.aiReason}</p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
              <div className="flex items-center gap-1.5 text-sm text-slate-600">
                <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {new Date(match.job.createdAt).toLocaleDateString()}
              </div>
              <div className="flex gap-1.5">
                {match.job.skills.slice(0, 3).map((skill) => {
                  const isMatched = match.matchedSkills.includes(skill.name);
                  return (
                    <span 
                      key={skill.id} 
                      className={`rounded-md px-2 py-0.5 text-xs font-medium border ${
                        isMatched 
                          ? 'bg-accent-50 text-accent-700 border-accent-200' 
                          : 'bg-slate-50 text-slate-600 border-slate-200'
                      }`}
                    >
                      {skill.name}
                    </span>
                  );
                })}
                {match.job.skills.length > 3 && (
                  <span className="rounded-md bg-slate-50 px-2 py-0.5 text-xs font-medium text-slate-600 border border-slate-200">
                    +{match.job.skills.length - 3}
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
            <span className="text-base font-bold text-primary-700">{formatCurrency(Number(match.job.budget))}</span>
            <span className="text-sm font-medium text-primary-600 group-hover:underline">View details →</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
