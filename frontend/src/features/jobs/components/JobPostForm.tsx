'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/shared/components/ui/Input';
import { Button } from '@/shared/components/ui/Button';
import { useCreateJob } from '../hooks/useJobs';

export function JobPostForm() {
  const router = useRouter();
  const { mutateAsync: createJob, isPending, error } = useCreateJob();
  const [form, setForm] = useState({
    title: '',
    description: '',
    budget: '',
    skills: '',
    location: '',
    deadline: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const job = await createJob({
      title: form.title,
      description: form.description,
      budget: parseFloat(form.budget),
      skills: form.skills.split(',').map((s) => s.trim()).filter(Boolean),
      location: form.location || undefined,
      deadline: form.deadline || undefined,
    });
    router.push(`/jobs/${job.id}`);
  };

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [key]: e.target.value }));

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-2xl">
      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {error.message}
        </div>
      )}

      <Input label="Job title" id="job-title" placeholder="e.g. React developer for SaaS dashboard" required value={form.title} onChange={set('title')} />

      <div className="flex flex-col gap-1">
        <label htmlFor="job-description" className="text-sm font-medium text-slate-700">Description</label>
        <textarea
          id="job-description"
          rows={5}
          required
          placeholder="Describe the project, requirements, and deliverables…"
          value={form.description}
          onChange={set('description')}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:outline-none transition-all"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input label="Budget (USD)" id="job-budget" type="number" placeholder="500" min="1" required value={form.budget} onChange={set('budget')} />
        <Input label="Deadline" id="job-deadline" type="date" value={form.deadline} onChange={set('deadline')} />
      </div>

      <Input label="Skills (comma-separated)" id="job-skills" placeholder="React, TypeScript, Node.js" value={form.skills} onChange={set('skills')} hint="Enter skills separated by commas" />
      <Input label="Location (optional)" id="job-location" placeholder="Remote / New York, NY" value={form.location} onChange={set('location')} />

      <div className="flex gap-3 pt-2">
        <Button type="submit" size="lg" loading={isPending}>Post job</Button>
        <Button type="button" variant="outline" size="lg" onClick={() => router.back()}>Cancel</Button>
      </div>
    </form>
  );
}

