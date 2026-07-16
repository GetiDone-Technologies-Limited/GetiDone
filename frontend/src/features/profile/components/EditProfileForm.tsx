'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/shared/components/ui/Input';
import { Button } from '@/shared/components/ui/Button';
import { useProfile, useUpdateProfile } from '../hooks/useProfile';

export function EditProfileForm() {
  const { data: profile } = useProfile();
  const { mutate: update, isPending, error, isSuccess } = useUpdateProfile();
  const [form, setForm] = useState({
    name: '',
    bio: '',
    location: '',
    skills: '',
    hourlyRate: '',
    portfolioUrl: '',
  });

  useEffect(() => {
    if (profile) {
      setForm({
        name: profile.name ?? '',
        bio: profile.bio ?? '',
        location: profile.location ?? '',
        skills: profile.skills?.join(', ') ?? '',
        hourlyRate: profile.hourlyRate?.toString() ?? '',
        portfolioUrl: profile.portfolioUrl ?? '',
      });
    }
  }, [profile]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    update({
      name: form.name,
      bio: form.bio || undefined,
      location: form.location || undefined,
      skills: form.skills.split(',').map((s) => s.trim()).filter(Boolean),
      hourlyRate: form.hourlyRate ? parseFloat(form.hourlyRate) : undefined,
      portfolioUrl: form.portfolioUrl || undefined,
    });
  };

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [key]: e.target.value }));

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-lg">
      {isSuccess && (
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

      <div className="flex flex-col gap-1">
        <label htmlFor="edit-bio" className="text-sm font-medium text-slate-700">Bio</label>
        <textarea
          id="edit-bio"
          rows={3}
          placeholder="Tell clients or freelancers about yourself…"
          value={form.bio}
          onChange={set('bio')}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 focus:outline-none transition-all"
        />
      </div>

      <Input label="Location" id="edit-location" placeholder="New York, NY" value={form.location} onChange={set('location')} />
      <Input label="Skills (comma-separated)" id="edit-skills" placeholder="React, Node.js, PostgreSQL" value={form.skills} onChange={set('skills')} />
      <Input label="Hourly rate (USD)" id="edit-hourly" type="number" placeholder="75" value={form.hourlyRate} onChange={set('hourlyRate')} />
      <Input label="Portfolio URL" id="edit-portfolio" type="url" placeholder="https://your-portfolio.com" value={form.portfolioUrl} onChange={set('portfolioUrl')} />

      <Button type="submit" size="lg" loading={isPending}>Save changes</Button>
    </form>
  );
}
