'use client';

import { useQuery } from '@tanstack/react-query';
import { matchingApi } from '../api/matching.api';

export function useJobMatches(freelancerId?: string) {
  return useQuery({
    queryKey: ['job-matches', freelancerId],
    queryFn: () => matchingApi.recommendJobsForFreelancer(freelancerId!),
    enabled: !!freelancerId,
    staleTime: 5 * 60 * 1000,
  });
}
