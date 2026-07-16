'use client';

import { useState } from 'react';
import { Navbar } from '@/shared/components/layout/Navbar';
import { ProfileCard } from '@/features/profile/components/ProfileCard';
import { EditProfileForm } from '@/features/profile/components/EditProfileForm';
import { ReviewList } from '@/features/reviews/components/ReviewList';
import { useAuthStore } from '@/store/auth.store';
import { Button } from '@/shared/components/ui/Button';

export default function ProfilePage() {
  const { user } = useAuthStore();
  const [editing, setEditing] = useState(false);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-slate-900">My profile</h1>
          <Button variant="outline" size="sm" onClick={() => setEditing(!editing)}>
            {editing ? 'Cancel' : 'Edit profile'}
          </Button>
        </div>

        {editing ? (
          <div className="rounded-2xl bg-white border border-slate-200 p-8 shadow-sm mb-6">
            <EditProfileForm />
          </div>
        ) : (
          <div className="mb-6">
            <ProfileCard />
          </div>
        )}

        <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
          <h2 className="text-base font-semibold text-slate-900 mb-4">Reviews</h2>
          <ReviewList userId={user.id} />
        </div>
      </main>
    </div>
  );
}
