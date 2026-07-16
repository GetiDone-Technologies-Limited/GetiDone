'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { jobsApi } from '../api/jobs.api';
import type { CreateJobRequest, UpdateJobRequest, JobFilters } from '../types/jobs.types';

const JOBS_KEY = 'jobs';

export function useJobs(filters?: JobFilters) {
  return useQuery({
    queryKey: [JOBS_KEY, filters],
    queryFn: () => jobsApi.getJobs(filters),
    staleTime: 2 * 60 * 1000,
  });
}

export function useJob(id: string) {
  return useQuery({
    queryKey: [JOBS_KEY, id],
    queryFn: () => jobsApi.getJob(id),
    enabled: Boolean(id),
    staleTime: 2 * 60 * 1000,
  });
}

export function useMyJobs() {
  return useQuery({
    queryKey: [JOBS_KEY, 'my'],
    queryFn: () => jobsApi.getMyJobs(),
    staleTime: 2 * 60 * 1000,
  });
}

export function useCreateJob() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateJobRequest) => jobsApi.createJob(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [JOBS_KEY] }),
  });
}

export function useUpdateJob() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateJobRequest }) => jobsApi.updateJob(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: [JOBS_KEY, id] });
      queryClient.invalidateQueries({ queryKey: [JOBS_KEY] });
    },
  });
}

export function useDeleteJob() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => jobsApi.deleteJob(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [JOBS_KEY] }),
  });
}
