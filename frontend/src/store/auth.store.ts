import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserRole, KycStatus } from '@/shared/types/common.types';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  doneScore: number;
  kycStatus: KycStatus;
  avatarUrl?: string;
  bannerUrl?: string;
  gender?: 'male' | 'female';
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: AuthUser) => void;
  setToken: (token: string) => void;
  login: (user: AuthUser, token: string) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      setUser: (user) => set({ user, isAuthenticated: true }),

      setToken: (token) => {
        if (typeof window !== 'undefined') {
          localStorage.setItem('geti_token', token);
        }
        set({ token });
      },

      login: (user, token) => {
        if (typeof window !== 'undefined') {
          localStorage.setItem('geti_token', token);
        }
        set({ user, token, isAuthenticated: true });
      },

      logout: () => {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('geti_token');
        }
        set({ user: null, token: null, isAuthenticated: false });
      },

      setLoading: (isLoading) => set({ isLoading }),
    }),
    {
      name: 'geti-auth',
      partialize: (state) => ({ user: state.user, token: state.token, isAuthenticated: state.isAuthenticated }),
    },
  ),
);
