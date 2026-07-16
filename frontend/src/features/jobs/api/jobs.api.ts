import { apiClient } from '@/shared/lib/api-client';
import type { Job, CreateJobRequest, UpdateJobRequest, JobFilters } from '../types/jobs.types';
import type { PaginatedResponse } from '@/shared/types/common.types';

export const jobsApi = {
  getJobs(filters?: JobFilters): Promise<PaginatedResponse<Job>> {
    return apiClient.get<PaginatedResponse<Job>>('/jobs', filters as Record<string, string | number | boolean | undefined>);
  },

  getJob(id: string): Promise<Job> {
    return apiClient.get<Job>(`/jobs/${id}`);
  },

  createJob(data: CreateJobRequest): Promise<Job> {
    return apiClient.post<Job>('/jobs', data);
  },

  updateJob(id: string, data: UpdateJobRequest): Promise<Job> {
    return apiClient.patch<Job>(`/jobs/${id}`, data);
  },

  deleteJob(id: string): Promise<void> {
    return apiClient.delete<void>(`/jobs/${id}`);
  },

  getMyJobs(): Promise<Job[]> {
    return apiClient.get<Job[]>('/jobs/my');
  },
};
