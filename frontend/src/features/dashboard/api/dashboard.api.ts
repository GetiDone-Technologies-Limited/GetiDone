import { apiClient } from '@/shared/lib/api-client';
import { DashboardStats, DashboardProject, DashboardProposal } from '../types/dashboard.types';

export const dashboardApi = {
  getStats: async (): Promise<DashboardStats> => {
    return apiClient.get<DashboardStats>('/dashboard/stats');
  },

  getProjects: async (): Promise<DashboardProject[]> => {
    return apiClient.get<DashboardProject[]>('/dashboard/projects');
  },

  getProposals: async (): Promise<DashboardProposal[]> => {
    return apiClient.get<DashboardProposal[]>('/dashboard/proposals');
  },
};
