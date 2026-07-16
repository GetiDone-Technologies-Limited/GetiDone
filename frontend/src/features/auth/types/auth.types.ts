import type { UserRole, KycStatus } from '@/shared/types/common.types';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  doneScore: number;
  kycStatus: KycStatus;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  role: UserRole;
}

export interface AuthResponse {
  user: AuthUser;
  accessToken: string;
}
