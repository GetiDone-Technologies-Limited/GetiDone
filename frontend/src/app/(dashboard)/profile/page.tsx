'use client';

import { useAuthStore } from '@/store/auth.store';
import { ClientProfileView } from '@/features/profile/components/ClientProfileView';
import { FreelancerProfileView } from '@/features/profile/components/FreelancerProfileView';
import { LoadingSpinner } from '@/shared/components/feedback/LoadingSpinner';

export default function ProfilePage() {
  const { user } = useAuthStore();

  if (!user) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <>
      {user.role === 'CLIENT' ? (
        <ClientProfileView />
      ) : (
        <FreelancerProfileView />
      )}
    </>
  );
}
