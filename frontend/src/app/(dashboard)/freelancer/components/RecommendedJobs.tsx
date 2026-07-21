import { JobCard } from '@/features/jobs/components/JobCard';
import type { Job } from '@/features/jobs/types/jobs.types';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const mockRecommendedJobs: Job[] = [
  {
    id: 'job-1',
    title: 'Full Stack Developer for SaaS Platform',
    description: 'We need a full stack developer to build a modern SaaS platform. You will be responsible for both frontend and backend development.',
    budget: 3250,
    status: 'OPEN',
    clientId: 'c1',
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    skills: [{ id: 's1', name: 'React' }, { id: 's2', name: 'Node.js' }, { id: 's3', name: 'PostgreSQL' }],
    client: {
      id: 'c1',
      name: 'TechNova Inc.',
      avatarUrl: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&q=80',
      doneScore: 95,
    },
    _count: { applications: 12 }
  },
  {
    id: 'job-2',
    title: 'E-commerce Website Development',
    description: 'Looking for an experienced Next.js developer to build a scalable e-commerce platform with Stripe integration.',
    budget: 2150,
    status: 'OPEN',
    clientId: 'c2',
    updatedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    skills: [{ id: 's4', name: 'Next.js' }, { id: 's5', name: 'Tailwind CSS' }, { id: 's6', name: 'Stripe' }],
    client: {
      id: 'c2',
      name: 'ShopEase',
      avatarUrl: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=100&q=80',
      doneScore: 88,
    },
    _count: { applications: 5 }
  },
  {
    id: 'job-3',
    title: 'API Integration & Backend Development',
    description: 'Need a backend expert to integrate multiple third-party APIs and build a robust Express backend.',
    budget: 1600,
    status: 'OPEN',
    clientId: 'c3',
    updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    skills: [{ id: 's2', name: 'Node.js' }, { id: 's7', name: 'Express' }, { id: 's8', name: 'MongoDB' }],
    client: {
      id: 'c3',
      name: 'DataSync Solutions',
      avatarUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=100&q=80',
      doneScore: 92,
    },
    _count: { applications: 8 }
  }
];

export function RecommendedJobs() {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-slate-900">Recommended Jobs for You</h2>
        <Link href="/jobs/search" className="text-sm font-bold text-[#00b259] hover:underline flex items-center gap-1">
          View All Jobs <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {mockRecommendedJobs.map(job => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}
