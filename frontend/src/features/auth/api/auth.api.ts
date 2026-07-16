import { apiClient } from '@/shared/lib/api-client';
import type { AuthResponse, LoginRequest, RegisterRequest } from '../types/auth.types';

export const authApi = {
  login(data: LoginRequest): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>('/auth/login', data);
  },

  register(data: RegisterRequest): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>('/auth/register', data);
  },

  logout(): Promise<void> {
    return apiClient.post<void>('/auth/logout');
  },

  me(): Promise<AuthResponse['user']> {
    return apiClient.get<AuthResponse['user']>('/auth/me');
  },
};
