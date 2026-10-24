import { create } from 'zustand';

export interface MobileUser {
  id: string;
  name: string;
  email: string;
  role: 'CLIENT' | 'FREELANCER' | 'ADMIN';
  doneScore: number;
  avatarUrl?: string;
}

interface MobileAuthState {
  user: MobileUser | null;
  token: string | null;
  setUser: (user: MobileUser | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
}

export const useMobileAuthStore = create<MobileAuthState>((set) => ({
  user: {
    id: 'mobile-user-1',
    name: 'Sarah Kim',
    email: 'sarah@getidone.com',
    role: 'FREELANCER',
    doneScore: 98.4,
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
  },
  token: 'mock-mobile-jwt-token-2026',
  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
  logout: () => set({ user: null, token: null }),
}));
