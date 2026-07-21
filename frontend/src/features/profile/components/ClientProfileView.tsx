'use client';

import { useAuthStore } from '@/store/auth.store';
import { SharedProfileView } from './SharedProfileView';

export function ClientProfileView() {
  const { user } = useAuthStore();

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50">
      <SharedProfileView userId={user.id} />
    </div>
  );
}
