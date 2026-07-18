'use client';

import { FreelancerCard } from './FreelancerCard';
import { LoadingSpinner } from '@/shared/components/feedback/LoadingSpinner';
import { EmptyState } from '@/shared/components/feedback/EmptyState';
import { useFreelancers } from '../hooks/useMatching';
import { Sparkles } from 'lucide-react';

interface MatchListProps {
  search?: string;
  onHire?: (userId: string) => void;
}

export function MatchList({ search, onHire }: MatchListProps) {
  const { data: freelancers, isLoading, error } = useFreelancers({ search });

  if (isLoading) return <div className="flex justify-center py-24"><LoadingSpinner size="lg" /></div>;
  if (error) return <div className="p-4 bg-red-50 text-red-600 rounded-xl font-medium">{error.message}</div>;
  if (!freelancers?.length) return <EmptyState title="No matches found" description="Adjust your filters to see more results." />;

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
         <Sparkles className="w-5 h-5 text-[#00b259]" />
         <h2 className="text-xl font-bold text-slate-900">AI Smart Matches</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {freelancers.map((f, i) => (
          <FreelancerCard 
            key={f.userId} 
            freelancer={f} 
            onHire={onHire} 
            score={0.98 - (i * 0.05)} // Mocking decreasing match scores
            reasoning={i === 0 ? "Perfect match for your required React and Next.js skills." : i === 1 ? "Strong history with similar Fintech projects." : "Matches your budget and availability perfectly."}
          />
        ))}
      </div>
    </div>
  );
}
