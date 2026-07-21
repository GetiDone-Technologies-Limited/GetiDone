import { apiClient } from '@/shared/lib/api-client';
import type { MatchScore, FreelancerProfile, MatchFilters } from '../types/matching.types';

export const matchingApi = {
  getMatches(filters?: MatchFilters): Promise<MatchScore[]> {
    return apiClient.get<MatchScore[]>('/matching', filters as Record<string, string | number | boolean | undefined>);
  },

  getFreelancers(params?: { search?: string; skills?: string; page?: number }): Promise<FreelancerProfile[]> {
    return apiClient.get<FreelancerProfile[]>('/matching/freelancers', params as Record<string, string | number | boolean | undefined>);
  },

  getFreelancer(id: string): Promise<FreelancerProfile> {
    return apiClient.get<FreelancerProfile>(`/matching/freelancers/${id}`);
  },

  recommendJobsForFreelancer(freelancerId: string): Promise<import('../types/matching.types').JobMatch[]> {
    return apiClient.get<import('../types/matching.types').JobMatch[]>(`/matching/jobs-for-freelancer/${freelancerId}`);
  },
};
