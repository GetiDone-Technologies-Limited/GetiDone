'use client';

import { useAuthStore } from '@/store/auth.store';

export function WelcomeHeader() {
  const { user } = useAuthStore();
  
  // Extract first name
  const firstName = user?.name ? user.name.split(' ')[0] : 'Freelancer';

  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold text-slate-900 mb-2">
        Welcome back, {firstName}! 👋
      </h1>
      <p className="text-sm font-medium text-slate-500">
        Here&apos;s what&apos;s happening with your freelance career.
      </p>
    </div>
  );
}
