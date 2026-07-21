import { apiClient } from '@/shared/lib/api-client';
import { DashboardStats, DashboardProject, DashboardProposal } from '../types/dashboard.types';

export const dashboardApi = {
  getStats: async (): Promise<DashboardStats> => {
    const { data } = await apiClient.get<DashboardStats>('/dashboard/stats');
    return data;
  },

  getProjects: async (): Promise<DashboardProject[]> => {
    const { data } = await apiClient.get<DashboardProject[]>('/dashboard/projects');
    return data;
  },

  getProposals: async (): Promise<DashboardProposal[]> => {
    const { data } = await apiClient.get<DashboardProposal[]>('/dashboard/proposals');
    return data;
  },
};
