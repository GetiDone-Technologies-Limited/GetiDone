import type { UserRole, KycStatus } from '@/shared/types/common.types';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  doneScore: number;
  kycStatus: KycStatus;
  avatarUrl?: string;
  bannerUrl?: string;
  gender?: 'male' | 'female';
  bio?: string;
  location?: string;
  createdAt: string;
  updatedAt: string;
  // Freelancer-specific
  skills?: string[];
  hourlyRate?: number;
  portfolioUrl?: string;
  availability?: boolean;
}

export interface UpdateProfileRequest {
  name?: string;
  bio?: string;
  location?: string;
  avatarUrl?: string;
  bannerUrl?: string;
  gender?: 'male' | 'female';
  // Freelancer-specific
  skills?: string[];
  hourlyRate?: number;
  portfolioUrl?: string;
  availability?: boolean;
}
