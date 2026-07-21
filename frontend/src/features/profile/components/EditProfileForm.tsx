'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/shared/components/ui/Input';
import { Button } from '@/shared/components/ui/Button';
import { useProfile, useUpdateProfile } from '../hooks/useProfile';
import { useAuthStore } from '@/store/auth.store';

export function EditProfileForm({ onClose }: { onClose?: () => void }) {
  const { user } = useAuthStore();
  const { data: profile } = useProfile(user?.id);
  const { mutate: update, isPending, error, isSuccess } = useUpdateProfile();
  
  const [form, setForm] = useState({
    name: '',
    title: '',
    bio: '',
    location: '',
    hourlyRate: '',
    avatarUrl: '',
    bannerUrl: '',
  });

  useEffect(() => {
    if (profile) {
      setForm({
        name: profile.name ?? '',
        title: profile.title ?? '',
        bio: profile.bio ?? '',
        location: profile.location ?? '',
        hourlyRate: profile.hourlyRate?.toString() ?? '',
        avatarUrl: profile.avatarUrl ?? '',
        bannerUrl: profile.bannerUrl ?? '',
      });
    }
  }, [profile]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    update({
      name: form.name,
      title: form.title || undefined,
      bio: form.bio || undefined,
      location: form.location || undefined,
      hourlyRate: form.hourlyRate ? parseFloat(form.hourlyRate) : undefined,
      avatarUrl: form.avatarUrl || undefined,
      bannerUrl: form.bannerUrl || undefined,
    }, {
      onSuccess: () => {
        if (onClose) onClose();
      }
    });
  };

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [key]: e.target.value }));

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-lg w-full">
      {isSuccess && !onClose && (
        <div className="rounded-lg bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm text-emerald-700">
          Profile updated successfully!
        </div>
      )}
      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {error.message}
        </div>
      )}

      <Input label="Full name" id="edit-name" required value={form.name} onChange={set('name')} />
      <Input label="Professional Title" id="edit-title" placeholder="Senior Full Stack Developer" value={form.title} onChange={set('title')} />

      <div className="flex flex-col gap-1">
        <label htmlFor="edit-bio" className="text-sm font-medium text-slate-700">Bio</label>
        <textarea
          id="edit-bio"
          rows={4}
          placeholder="Tell clients about yourself…"
          value={form.bio}
          onChange={set('bio')}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input label="Location" id="edit-location" placeholder="New York, NY" value={form.location} onChange={set('location')} />
        <Input label="Hourly rate (USD)" id="edit-hourly" type="number" placeholder="75" value={form.hourlyRate} onChange={set('hourlyRate')} />
      </div>

      <Input label="Avatar URL" id="edit-avatar" type="url" placeholder="https://..." value={form.avatarUrl} onChange={set('avatarUrl')} />
      <Input label="Banner URL" id="edit-banner" type="url" placeholder="https://..." value={form.bannerUrl} onChange={set('bannerUrl')} />

      <div className="flex gap-3 justify-end mt-2">
        {onClose && (
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
        )}
        <Button type="submit" loading={isPending}>Save changes</Button>
      </div>
    </form>
  );
}

