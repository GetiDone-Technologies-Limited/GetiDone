'use client';

import { useProfile } from '../hooks/useProfile';
import { Avatar } from '@/shared/components/ui/Avatar';
import { Badge, statusToBadgeVariant } from '@/shared/components/ui/Badge';
import { LoadingSpinner } from '@/shared/components/feedback/LoadingSpinner';

interface ProfileCardProps {
  userId?: string;
}

export function ProfileCard({ userId }: ProfileCardProps) {
  const { data: profile, isLoading } = useProfile(userId);

  if (isLoading) return <LoadingSpinner size="md" />;
  if (!profile) return null;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start gap-5">
        <Avatar src={profile.avatarUrl} name={profile.name} size="xl" />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-slate-900">{profile.name}</h2>
              <p className="text-sm text-slate-500">{profile.email}</p>
              {profile.location && <p className="mt-0.5 text-sm text-slate-500">📍 {profile.location}</p>}
            </div>
            <div className="flex flex-col gap-1.5 items-end">
              <Badge variant={statusToBadgeVariant(profile.role)}>{profile.role}</Badge>
              <Badge variant={statusToBadgeVariant(profile.kycStatus)}>{profile.kycStatus}</Badge>
            </div>
          </div>

          {profile.bio && <p className="mt-3 text-sm text-slate-700 leading-relaxed">{profile.bio}</p>}

          <div className="mt-4 flex items-center gap-4 text-sm">
            <div className="rounded-lg bg-primary-50 px-3 py-2">
              <p className="text-xs text-slate-500">DoneScore™</p>
              <p className="text-xl font-bold text-primary-700">{profile.doneScore}</p>
            </div>
            {profile.hourlyRate && (
              <div className="rounded-lg bg-slate-50 px-3 py-2">
                <p className="text-xs text-slate-500">Hourly rate</p>
                <p className="text-xl font-bold text-slate-800">${profile.hourlyRate}/hr</p>
              </div>
            )}
          </div>

          {profile.skills && profile.skills.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {profile.skills.map((s) => (
                <Badge key={s} variant="violet">{s}</Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

