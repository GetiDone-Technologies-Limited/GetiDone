'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface JobProposal {
  id: number;
  title: string;
  client: string;
  location: string;
  postedAgo: string;
  type: 'Fixed Price' | 'Hourly';
  desc: string;
  skills: string[];
  budget: string;
  duration: string;
}

const jobs: JobProposal[] = [
  {
    id: 1,
    title: 'E-commerce Platform Redesign',
    client: 'TechNova Inc.',
    location: 'Lagos, Nigeria',
    postedAgo: '2 hours ago',
    type: 'Fixed Price',
    desc: 'We are looking for an experienced Frontend Developer to redesign our e-commerce platform. Must be proficient in React, Next.js, and Tailwind CSS.',
    skills: ['React', 'Next.js', 'Tailwind CSS'],
    budget: '$12,000',
    duration: '45 days',
  },
  {
    id: 2,
    title: 'Backend API Developer Needed',
    client: 'Innovatech',
    location: 'Remote',
    postedAgo: '5 hours ago',
    type: 'Hourly',
    desc: 'Need a robust RESTful API for a high-volume mobile app. Must integrate Stripe payments and handle high-traffic loads efficiently.',
    skills: ['Node.js', 'Express', 'MongoDB'],
    budget: '$70/hr',
    duration: '3 months',
  },
];

export function RecommendedJobs({ onSelectJob }: { onSelectJob?: (job: JobProposal) => void }) {
  return (
    <div className="gd-card p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="font-bold text-xl" style={{ fontFamily: "'Sora', sans-serif" }}>Recommended Jobs</h2>
          <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>Based on your skills (React, Next.js, Node.js, AWS)</p>
        </div>
        <Link href="/jobs/search" className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1">
          View All <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="space-y-4">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="p-4 rounded-xl border transition-all hover:border-emerald-500/40 hover:shadow-md"
            style={{ borderColor: 'var(--border)' }}
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-bold text-base" style={{ fontFamily: "'Sora', sans-serif", color: 'var(--text)' }}>
                  {job.title}
                </h3>
                <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>
                  {job.client} · {job.location} · {job.postedAgo}
                </p>
              </div>
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-md" style={{ background: 'rgba(16,185,129,0.1)', color: 'var(--primary-dark)' }}>
                {job.type}
              </span>
            </div>

            <p className="text-xs mb-3 line-clamp-2" style={{ color: 'var(--muted)' }}>
              {job.desc}
            </p>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {job.skills.map((s) => (
                <span key={s} className="text-[11px] font-semibold px-2 py-0.5 rounded" style={{ background: 'rgba(16,185,129,0.08)', color: 'var(--primary-dark)' }}>
                  {s}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: 'var(--border)' }}>
              <div className="text-sm font-extrabold" style={{ fontFamily: "'Sora', sans-serif" }}>
                {job.budget} <span className="text-xs font-normal" style={{ color: 'var(--muted)' }}>· {job.duration}</span>
              </div>
              <button
                onClick={() => onSelectJob?.(job)}
                className="btn-primary px-4 py-2 rounded-lg text-xs font-bold"
              >
                Submit Proposal
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
