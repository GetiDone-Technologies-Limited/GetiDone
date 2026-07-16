'use client';

import { FreelancerCard } from './FreelancerCard';
import { LoadingSpinner } from '@/shared/components/feedback/LoadingSpinner';
import { EmptyState } from '@/shared/components/feedback/EmptyState';
import { useFreelancers } from '../hooks/useMatching';

interface MatchListProps {
  search?: string;
  onHire?: (userId: string) => void;
}

export function MatchList({ search, onHire }: MatchListProps) {
  const { data: freelancers, isLoading, error } = useFreelancers({ search });

  if (isLoading) return <div className="flex justify-center py-16"><LoadingSpinner size="lg" /></div>;
  if (error) return <p className="text-red-600 text-sm">{error.message}</p>;
  if (!freelancers?.length) return <EmptyState title="No freelancers found" description="Try a different search." />;

  return (
    <div className="grid gap-4">
      {freelancers.map((f) => (
        <FreelancerCard key={f.userId} freelancer={f} onHire={onHire} />
      ))}
    </div>
  );
}
