'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Briefcase, Plus, Search, Filter, MoreHorizontal, CheckCircle2, 
  Clock, AlertCircle, ShoppingCart, Activity, FileText, ArrowRight
} from 'lucide-react';
import { Avatar } from '@/shared/components/ui/Avatar';
import { Badge } from '@/shared/components/ui/Badge';

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState('All Projects');

  const projects = [
    {
      id: '#GTD-2505-0012',
      title: 'E-commerce Website Redesign',
      status: 'In Progress',
      statusColor: 'green',
      progress: 60,
      budget: '$2,500',
      dueDate: 'May 24, 2025',
      freelancer: 'Daniel Benson',
      type: 'Website Development',
      icon: <ShoppingCart className="w-6 h-6 text-[#00b259]" />,
      bg: 'bg-green-50/50',
      iconBg: 'bg-[#0A0D0C]'
    },
    {
      id: '#GTD-2505-0018',
      title: 'Mobile App Wireframes',
      status: 'Pending Review',
      statusColor: 'orange',
      progress: 95,
      budget: '$1,200',
      dueDate: 'May 18, 2025',
      freelancer: 'Sarah Jenkins',
      type: 'UI/UX Design',
      icon: <Activity className="w-6 h-6 text-orange-500" />,
      bg: 'bg-orange-50/50',
      iconBg: 'bg-white border border-orange-100'
    },
    {
      id: '#GTD-2504-0092',
      title: 'Brand Identity & Logo',
      status: 'Completed',
      statusColor: 'blue',
      progress: 100,
      budget: '$850',
      dueDate: 'May 05, 2025',
      freelancer: 'Alex Chen',
      type: 'Graphic Design',
      icon: <Briefcase className="w-6 h-6 text-blue-500" />,
      bg: 'bg-slate-50',
      iconBg: 'bg-white border border-slate-200'
    },
    {
      id: '#GTD-2505-0024',
      title: 'SEO Audit & Content Strategy',
      status: 'Not Started',
      statusColor: 'slate',
      progress: 0,
      budget: '$600',
      dueDate: 'Jun 02, 2025',
      freelancer: 'Unassigned',
      type: 'Marketing',
      icon: <FileText className="w-6 h-6 text-slate-500" />,
      bg: 'bg-slate-50/50',
      iconBg: 'bg-white border border-slate-200'
    }
  ];

  const filteredProjects = activeTab === 'All Projects' 
    ? projects 
    : projects.filter(p => 
        (activeTab === 'In Progress' && p.status === 'In Progress') ||
        (activeTab === 'Pending Review' && p.status === 'Pending Review') ||
        (activeTab === 'Completed' && p.status === 'Completed')
      );

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">My Projects</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Manage all your active and past projects in one place.</p>
        </div>
        <Link href="/jobs/new" className="px-5 py-3 text-[14px] font-bold text-white bg-[#00b259] hover:bg-[#009b4d] rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-[#00b259]/20 shrink-0">
          <Plus className="w-5 h-5" /> Post a New Job
        </Link>
      </div>

      {/* Controls Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-2 shadow-sm flex flex-col md:flex-row justify-between gap-4">
        {/* Tabs */}
        <div className="flex gap-1 overflow-x-auto custom-scrollbar p-1">
          {['All Projects', 'In Progress', 'Pending Review', 'Completed'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-xl text-[14px] font-bold transition-colors whitespace-nowrap ${
                activeTab === tab 
                  ? 'bg-slate-100 text-slate-900' 
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search & Filter */}
        <div className="flex gap-2 p-1">
          <div className="relative group flex-1 md:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#00b259] transition-colors" />
            <input 
              type="text" 
              placeholder="Search projects..." 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-[14px] font-medium focus:outline-none focus:border-[#00b259] focus:ring-1 focus:ring-[#00b259] transition-all"
            />
          </div>
          <button className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold flex items-center gap-2 transition-colors bg-white shadow-sm shrink-0">
            <Filter className="w-4 h-4" /> <span className="hidden sm:inline">Filter</span>
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Link href={`/projects/seed-project-1`} key={project.id} className="group">
            <div className={`rounded-3xl border border-slate-200 p-6 ${project.bg} hover:border-[#00b259] hover:shadow-md transition-all flex flex-col h-full`}>
              
              <div className="flex justify-between items-start mb-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${project.iconBg}`}>
                  {project.icon}
                </div>
                <Badge className={`
                  border-none font-bold shadow-none text-xs px-2.5 py-1
                  ${project.statusColor === 'green' ? 'bg-green-100 text-green-700' : ''}
                  ${project.statusColor === 'orange' ? 'bg-orange-100 text-orange-700' : ''}
                  ${project.statusColor === 'blue' ? 'bg-blue-100 text-blue-700' : ''}
                  ${project.statusColor === 'slate' ? 'bg-slate-200 text-slate-700' : ''}
                `}>
                  {project.status === 'In Progress' && <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5"></span>}
                  {project.status === 'Pending Review' && <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mr-1.5"></span>}
                  {project.status}
                </Badge>
              </div>

              <div>
                <p className="text-[12px] font-bold text-slate-400 mb-1">{project.type}</p>
                <h3 className="text-[20px] font-extrabold text-slate-900 leading-tight mb-2 group-hover:text-[#00b259] transition-colors">{project.title}</h3>
                <p className="text-[13px] font-medium text-slate-500">{project.id}</p>
              </div>

              <div className="mt-8 mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[12px] font-bold text-slate-500 uppercase tracking-wide">Progress</span>
                  <span className="text-[14px] font-black text-slate-900">{project.progress}%</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${
                      project.statusColor === 'green' ? 'bg-[#00b259]' : 
                      project.statusColor === 'orange' ? 'bg-orange-400' : 
                      project.statusColor === 'blue' ? 'bg-blue-500' : 'bg-slate-300'
                    }`}
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-auto border-t border-slate-200 pt-5">
                <div>
                  <p className="text-[12px] font-semibold text-slate-400 mb-0.5">Budget</p>
                  <p className="text-[15px] font-black text-slate-900">{project.budget}</p>
                </div>
                <div>
                  <p className="text-[12px] font-semibold text-slate-400 mb-0.5">Due Date</p>
                  <p className="text-[14px] font-bold text-slate-900">{project.dueDate}</p>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between pt-5 border-t border-slate-200">
                <div className="flex items-center gap-2">
                  {project.freelancer !== 'Unassigned' ? (
                    <>
                      <Avatar src="" name={project.freelancer} size="sm" className="w-8 h-8" />
                      <span className="text-[13px] font-bold text-slate-700">{project.freelancer}</span>
                    </>
                  ) : (
                    <span className="text-[13px] font-semibold text-slate-400 italic">Unassigned</span>
                  )}
                </div>
                <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-[#00b259] group-hover:text-white group-hover:border-[#00b259] transition-all shadow-sm">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>

            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
