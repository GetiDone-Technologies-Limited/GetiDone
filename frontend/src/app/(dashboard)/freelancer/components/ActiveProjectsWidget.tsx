'use client';

import Link from 'next/link';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { useMyProjects } from '@/features/dashboard/hooks/useDashboard';
import { LoadingSpinner } from '@/shared/components/feedback/LoadingSpinner';

const mockProjects = [
  {
    id: 'pr1',
    title: 'E-commerce Website Redesign',
    client: 'TechNova Inc.',
    progress: 60,
    iconColor: 'bg-[#00b259]/10 text-[#00b259]',
  },
  {
    id: 'pr2',
    title: 'Mobile App Development',
    client: 'HealthPlus',
    progress: 75,
    iconColor: 'bg-orange-100 text-orange-500',
  },
  {
    id: 'pr3',
    title: 'API Integration & Backend',
    client: 'DataSync Solutions',
    progress: 30,
    iconColor: 'bg-blue-100 text-blue-500',
  },
  {
    id: 'pr4',
    title: 'Dashboard Development',
    client: 'Analytics Pro',
    progress: 90,
    iconColor: 'bg-purple-100 text-purple-500',
  }
];

export function ActiveProjectsWidget() {
  const { data: myProjects, isLoading } = useMyProjects();

  if (isLoading) {
    return <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 h-64 flex items-center justify-center"><LoadingSpinner /></div>;
  }

  const activeRealProjects = (myProjects || [])
    .filter(p => p.status === 'IN_PROGRESS')
    .map(p => ({
      id: p.id,
      title: p.job?.title || 'Unknown Job',
      client: p.client?.name || 'Unknown Client',
      progress: 50, // mock progress for real projects
      iconColor: 'bg-[#00b259]/10 text-[#00b259]'
    }));

  const displayProjects = [...activeRealProjects, ...mockProjects].slice(0, 5);

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-slate-900">Active Projects</h2>
        <Link href="/projects" className="text-sm font-bold text-[#00b259] hover:underline flex items-center gap-1">
          View All <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="space-y-6 flex-1 mt-2">
        {displayProjects.map((project) => (
          <div key={project.id} className="flex flex-wrap sm:flex-nowrap items-center justify-between group p-3 -mx-3 rounded-2xl hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-5 flex-1 min-w-0 mb-3 sm:mb-0">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-inner ${project.iconColor}`}>
                <span className="font-black text-xl">{project.title.charAt(0)}</span>
              </div>
              <div className="flex-1 min-w-0 pr-4">
                <Link href={`/projects/${project.id.replace('actual-', '')}`}>
                  <h4 className="text-base font-extrabold text-slate-900 group-hover:text-[#00b259] transition-colors truncate">
                    {project.title}
                  </h4>
                </Link>
                <p className="text-[12px] font-semibold text-slate-500 mt-1 truncate">{project.client}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-5 w-full sm:w-auto sm:justify-end">
               <div className="w-28 bg-slate-100 h-2 rounded-full overflow-hidden hidden sm:block shadow-inner">
                 <div className="bg-[#00b259] h-full rounded-full transition-all duration-1000" style={{ width: `${project.progress}%` }}></div>
               </div>
               <span className="text-[12px] font-bold text-slate-700 w-10 text-right">{project.progress}%</span>
               <Link href={`/projects/${project.id.replace('actual-', '')}`}>
                 <button className="w-10 h-10 rounded-full border-2 border-transparent hover:border-[#00b259]/20 flex items-center justify-center text-slate-400 hover:text-[#00b259] hover:bg-[#00b259]/10 transition-all bg-slate-50">
                   <MessageSquare className="w-4 h-4" />
                 </button>
               </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
