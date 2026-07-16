import type { UserRole, KycStatus } from '@/shared/types/common.types';

export interface FreelancerProfile {
  id: string;
  userId: string;
  bio: string;
  skills: string[];
  hourlyRate?: number;
  portfolioUrl?: string;
  availability: boolean;
  user: {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
    doneScore: number;
    role: UserRole;
    kycStatus: KycStatus;
  };
  reviewCount: number;
  avgRating: number;
}

export interface MatchScore {
  freelancer: FreelancerProfile;
  score: number;
  reasons: string[];
}

export interface MatchFilters {
  jobId?: string;
  minScore?: number;
  limit?: number;
}
