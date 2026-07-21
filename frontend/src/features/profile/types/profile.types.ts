import type { UserRole, KycStatus } from '@/shared/types/common.types';

export interface PortfolioItem {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  link?: string;
  createdAt: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  price: string | number;
  deliveryTime?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  doneScore: number;
  kycStatus: KycStatus;
  avatarUrl?: string;
  bannerUrl?: string;
  title?: string;
  bio?: string;
  location?: string;
  createdAt: string;
  updatedAt: string;
  // Freelancer-specific
  skills?: { id: string; name: string }[];
  hourlyRate?: number;
  portfolioItems?: PortfolioItem[];
  services?: Service[];
  reviewsReceived?: Record<string, unknown>[];
}

export interface UpdateProfileRequest {
  name?: string;
  title?: string;
  bio?: string;
  location?: string;
  avatarUrl?: string;
  bannerUrl?: string;
  // Freelancer-specific
  skillIds?: string[];
  hourlyRate?: number;
}
