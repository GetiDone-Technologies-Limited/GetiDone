import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '../api/dashboard.api';
import { useAuthStore } from '@/store/auth.store';

export function useDashboardStats() {
  const { user } = useAuthStore();
  return useQuery({
    queryKey: ['dashboard-stats', user?.id],
    queryFn: dashboardApi.getStats,
    enabled: !!user,
  });
}

export function useMyProjects() {
  const { user } = useAuthStore();
  return useQuery({
    queryKey: ['dashboard-projects', user?.id],
    queryFn: dashboardApi.getProjects,
    enabled: !!user,
  });
}

export function useMyProposals() {
  const { user } = useAuthStore();
  return useQuery({
    queryKey: ['dashboard-proposals', user?.id],
    queryFn: dashboardApi.getProposals,
    enabled: !!user && user.role === 'FREELANCER',
  });
}
