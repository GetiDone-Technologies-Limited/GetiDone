import type { JobStatus } from '@/shared/types/common.types';

export interface Skill {
  id: string;
  name: string;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  budget: number;
  status: JobStatus;
  clientId: string;
  skills: Skill[];
  location?: string;
  deadline?: string;
  createdAt: string;
  updatedAt: string;
  client?: {
    id: string;
    name: string;
    avatarUrl?: string;
    doneScore: number;
  };
  _count?: {
    applications: number;
  };
}

export interface CreateJobRequest {
  title: string;
  description: string;
  budget: number;
  skills: string[];
  location?: string;
  deadline?: string;
}

export interface UpdateJobRequest extends Partial<CreateJobRequest> {
  status?: JobStatus;
}

export interface JobFilters {
  search?: string;
  status?: JobStatus;
  minBudget?: number;
  maxBudget?: number;
  skills?: string[];
  page?: number;
  pageSize?: number;
}
