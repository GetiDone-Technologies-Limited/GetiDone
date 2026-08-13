'use client';

import Link from 'next/link';
import { useMyProjects } from '@/features/dashboard/hooks/useDashboard';

export function ActiveProjectsWidget() {
  const { data: myProjects } = useMyProjects();

  const activeProjects = (myProjects && myProjects.length > 0)
    ? myProjects.filter(p => p.status === 'IN_PROGRESS')
    : [
        {
          id: '1',
          title: 'Real-Time Analytics Dashboard',
          client: 'TechNova Inc.',
          progress: 65,
          escrow: '$2,800',
          avatar: 'https://picsum.photos/seed/technovalogo/100/100.jpg',
        },
      ];

  return (
    <div className="gd-card p-6">
      <h2 className="font-bold text-lg mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>Active Contracts</h2>
      <div className="space-y-4">
        {activeProjects.map((project) => (
          <div key={project.id} className="p-4 rounded-xl" style={{ background: 'var(--bg-alt)' }}>
            <div className="flex items-center gap-2 mb-1.5">
              <img src={(project as any).avatar || 'https://picsum.photos/seed/technovalogo/100/100.jpg'} className="w-6 h-6 rounded-full object-cover" alt="Client" />
              <span className="text-xs font-bold" style={{ color: 'var(--text)' }}>
                {typeof (project as any).client === 'string' ? (project as any).client : (project as any).client?.name || 'TechNova Inc.'}
              </span>
            </div>
            <h3 className="font-bold text-sm mb-2">{(project as any).title || (project as any).job?.title || 'Active Project'}</h3>

            <div className="mb-2">
              <div className="flex justify-between text-xs mb-1">
                <span style={{ color: 'var(--muted)' }}>Milestone 2 of 3</span>
                <span className="font-bold text-emerald-600">{(project as any).progress || 65}%</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill bg-gradient-to-r from-emerald-500 to-teal-400" style={{ width: `${(project as any).progress || 65}%` }} />
              </div>
            </div>

            <div className="text-xs font-extrabold mt-2" style={{ fontFamily: "'Sora', sans-serif" }}>
              {(project as any).escrow || '$2,800'} Escrow
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
