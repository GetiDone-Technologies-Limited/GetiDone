'use client';

import { useQuery } from '@tanstack/react-query';
import { matchingApi } from '../api/matching.api';
import type { MatchFilters } from '../types/matching.types';

export function useMatches(filters?: MatchFilters) {
  return useQuery({
    queryKey: ['matching', 'matches', filters],
    queryFn: () => matchingApi.getMatches(filters),
    enabled: Boolean(filters?.jobId),
    staleTime: 5 * 60 * 1000,
  });
}

export function useFreelancers(params?: { search?: string; skills?: string; page?: number }) {
  return useQuery({
    queryKey: ['matching', 'freelancers', params],
    queryFn: () => matchingApi.getFreelancers(params),
    staleTime: 2 * 60 * 1000,
  });
}

export function useFreelancer(id: string) {
  return useQuery({
    queryKey: ['matching', 'freelancers', id],
    queryFn: () => matchingApi.getFreelancer(id),
    enabled: Boolean(id),
    staleTime: 5 * 60 * 1000,
  });
}

export function useMatching(filters?: MatchFilters) {
  const matches = useMatches(filters);
  const freelancers = useFreelancers();
  return { matches, freelancers };
}
