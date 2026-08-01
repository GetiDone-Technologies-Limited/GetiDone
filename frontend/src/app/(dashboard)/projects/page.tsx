'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Plus, Search, Filter, MoreHorizontal, CheckCircle2, 
  Clock, AlertCircle, ShoppingCart, Activity, FileText, ArrowRight,
  Download, Briefcase, FileCheck, CheckSquare, ListTodo, X
} from 'lucide-react';

const mockProjects = [
  { id: 'p1', title: 'E-commerce Website Redesign', desc: 'Complete overhaul of the online store including new product pages, checkout flow, and mobile optimization.', freelancer: 'Sarah Kim', avatar: 'https://picsum.photos/seed/sarah/100/100.jpg', status: 'In Progress', progress: 72, budget: 2500, due: 'Dec 20, 2025', category: 'Web Design', role: 'Brand Designer' },
  { id: 'p2', title: 'Mobile App UI/UX Design', desc: 'Design all screens for the iOS and Android app including onboarding, dashboard, and settings flows.', freelancer: 'Marcus Lee', avatar: 'https://picsum.photos/seed/marcus/100/100.jpg', status: 'In Review', progress: 90, budget: 3200, due: 'Dec 18, 2025', category: 'Mobile', role: 'Lead Developer' },
  { id: 'p3', title: 'Brand Identity Package', desc: 'Logo, color palette, typography system, and brand guidelines document for the new product line.', freelancer: 'Alex Chen', avatar: 'https://picsum.photos/seed/alex/100/100.jpg', status: 'In Progress', progress: 45, budget: 1800, due: 'Jan 5, 2026', category: 'Branding', role: 'SEO Specialist' },
  { id: 'p4', title: 'SEO Optimization Campaign', desc: 'Technical SEO audit, keyword strategy, and content optimization across 50+ pages.', freelancer: 'Jenny Diaz', avatar: 'https://picsum.photos/seed/jenny/100/100.jpg', status: 'On Hold', progress: 30, budget: 1200, due: 'Jan 15, 2026', category: 'Marketing', role: 'Content Strategist' },
  { id: 'p5', title: 'Shopify Store Development', desc: 'Build a custom Shopify theme with product filtering, variant selection, and integrated payment gateway.', freelancer: 'Tunde A.', avatar: 'https://picsum.photos/seed/tunde/100/100.jpg', status: 'Completed', progress: 100, budget: 4500, due: 'Nov 30, 2025', category: 'E-commerce', role: 'Full-Stack Developer' },
  { id: 'p6', title: 'Digital Marketing Campaign', desc: 'Multi-channel digital marketing strategy including social media, email, and PPC across Q4.', freelancer: 'Praise U.', avatar: 'https://picsum.photos/seed/praise/100/100.jpg', status: 'Completed', progress: 100, budget: 2800, due: 'Dec 1, 2025', category: 'Marketing', role: 'Marketing Strategist' },
];

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredProjects = activeTab === 'All' 
    ? mockProjects 
    : mockProjects.filter(p => {
        if (activeTab === 'Active' && p.status === 'In Progress') return true;
        if (activeTab === 'In Review' && p.status === 'In Review') return true;
        if (activeTab === 'On Hold' && p.status === 'On Hold') return true;
        if (activeTab === 'Completed' && p.status === 'Completed') return true;
        return false;
      });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress': return 'text-emerald-600 bg-emerald-100 border-emerald-200';
      case 'In Review': return 'text-amber-600 bg-amber-100 border-amber-200';
      case 'Completed': return 'text-blue-600 bg-blue-100 border-blue-200';
      case 'On Hold': return 'text-slate-600 bg-slate-100 border-slate-200';
      default: return 'text-slate-600 bg-slate-100 border-slate-200';
    }
  };

  const getStatusDot = (status: string) => {
    switch (status) {
      case 'In Progress': return 'bg-emerald-500';
      case 'In Review': return 'bg-amber-500';
      case 'Completed': return 'bg-blue-500';
      case 'On Hold': return 'bg-slate-500';
      default: return 'bg-slate-500';
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full pb-10">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 fade-up">
        <div>
          <div className="flex items-center gap-2 mb-2 text-xs text-slate-500">
            <Link href="/dashboard" className="cursor-pointer hover:text-emerald-600 transition">Dashboard</Link>
            <span className="text-[10px]">/</span>
            <span className="text-slate-900 font-semibold">My Projects</span>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight" style={{ fontFamily: 'Sora, sans-serif' }}>
            My Projects<span style={{ color: 'var(--primary, #10B981)' }}>.</span>
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Manage and track all your ongoing and completed work in one place.</p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button className="px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-emerald-600 hover:border-emerald-200 transition-all shadow-sm">
            <Download className="w-4 h-4" /> Export
          </button>
          <button onClick={() => setIsModalOpen(true)} className="px-5 py-2.5 rounded-xl text-sm font-bold text-white flex items-center gap-2 shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', boxShadow: '0 8px 24px -6px rgba(16, 185, 129, 0.5)' }}>
            <Plus className="w-4 h-4" /> New Project
          </button>
        </div>
      </div>

      {/* Stats Mini Row Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'TOTAL PROJECTS', value: '24', sub: 'All time created', icon: Briefcase, color: 'text-blue-500', bg: 'bg-blue-500/10', glow: 'rgba(59, 130, 246, 0.15)' },
          { label: 'ACTIVE', value: '12', sub: 'In progress now', icon: Activity, color: 'text-emerald-500', bg: 'bg-emerald-500/10', glow: 'rgba(16, 185, 129, 0.15)' },
          { label: 'IN REVIEW', value: '5', sub: 'Awaiting feedback', icon: FileCheck, color: 'text-amber-500', bg: 'bg-amber-500/10', glow: 'rgba(245, 158, 11, 0.15)' },
          { label: 'COMPLETED', value: '8', sub: 'Successfully delivered', icon: CheckSquare, color: 'text-lime-500', bg: 'bg-lime-500/10', glow: 'rgba(132, 204, 22, 0.15)' }
        ].map((stat, i) => (
          <div key={i} className="group relative bg-white border border-slate-200 rounded-[18px] p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_-12px_rgba(15,26,20,0.12)] hover:border-emerald-300 overflow-hidden cursor-pointer">
            <div className="absolute top-[-50%] right-[-50%] w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `radial-gradient(circle, ${stat.glow} 0%, transparent 70%)` }} />
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold tracking-wider text-slate-500">{stat.label}</span>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-extrabold" style={{ fontFamily: 'Sora, sans-serif' }}>{stat.value}</div>
            <div className="text-[11px] mt-0.5 text-slate-400">{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* Filter/search bar */}
      <div className="bg-white rounded-[18px] border border-slate-200 p-2 shadow-sm flex flex-col md:flex-row justify-between gap-4">
        {/* Tabs */}
        <div className="flex gap-1 overflow-x-auto custom-scrollbar p-1">
          {['All', 'Active', 'In Review', 'On Hold', 'Completed'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-[13px] font-bold transition-colors whitespace-nowrap flex items-center gap-2 ${
                activeTab === tab 
                  ? 'bg-slate-900 text-white shadow-md' 
                  : 'text-slate-500 hover:text-emerald-600 hover:bg-emerald-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search & Sort */}
        <div className="flex gap-2 p-1">
          <div className="relative group flex-1 md:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search projects..." 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-[13px] font-medium focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all h-full min-h-[38px]"
            />
          </div>
          <div className="relative">
            <select className="appearance-none bg-white border border-slate-200 rounded-xl pl-4 pr-10 py-2 text-[13px] font-bold text-slate-700 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all h-full min-h-[38px] cursor-pointer hover:border-emerald-300">
              <option>Sort by: Newest</option>
              <option>Sort by: Oldest</option>
              <option>Sort by: Budget (High)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <div key={project.id} className="group relative bg-white rounded-[18px] border border-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-16px_rgba(15,26,20,0.18)] hover:border-emerald-400 overflow-hidden flex flex-col h-full cursor-pointer">
            {/* Top Border Gradient Line */}
            <div className="absolute top-0 left-0 right-0 h-1 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" style={{ background: 'linear-gradient(90deg, #10B981, #84CC16)' }} />
            
            <div className="p-5 flex-1 flex flex-col">
              {/* Top: Category Badge, Status Pill, Menu */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wide">
                    {project.category}
                  </span>
                  <span className={`px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${getStatusColor(project.status)}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${getStatusDot(project.status)}`} />
                    {project.status}
                  </span>
                </div>
                <button className="text-slate-400 hover:text-slate-900 transition-colors">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-extrabold text-slate-900 mb-1.5 group-hover:text-emerald-600 transition-colors" style={{ fontFamily: 'Sora, sans-serif' }}>
                {project.title}
              </h3>
              <p className="text-[13px] text-slate-500 leading-relaxed line-clamp-2 mb-5">
                {project.desc}
              </p>

              {/* Freelancer Row */}
              <div className="flex items-center gap-3 mb-5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <img src={project.avatar} alt={project.freelancer} className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" />
                <div>
                  <div className="text-[13px] font-bold text-slate-900">{project.freelancer}</div>
                  <div className="text-[11px] text-slate-500">{project.role}</div>
                </div>
              </div>

              {/* Progress */}
              <div className="mt-auto mb-5">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Progress</span>
                  <span className="text-[12px] font-black text-slate-900">{project.progress}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden relative">
                  <div 
                    className="h-full rounded-full transition-all duration-1000 relative overflow-hidden"
                    style={{ 
                      width: `${project.progress}%`,
                      background: 'linear-gradient(90deg, #34D399, #10B981)' 
                    }}
                  >
                    <div className="absolute inset-0 w-full h-full animate-[shimmer_2s_infinite]" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-5 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <div className="flex gap-6">
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-0.5">Budget</div>
                  <div className="text-[14px] font-black text-slate-900">${project.budget.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-0.5">Deadline</div>
                  <div className="text-[13px] font-bold text-slate-700">{project.due}</div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 rounded-lg border border-slate-200 text-[12px] font-bold text-slate-600 bg-white hover:border-emerald-400 hover:text-emerald-600 transition-colors shadow-sm">
                  View
                </button>
                <button className="px-3 py-1.5 rounded-lg text-[12px] font-bold text-white transition-colors shadow-sm" style={{ background: 'var(--primary, #10B981)' }}>
                  Message
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Post Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h2 className="text-xl font-extrabold text-slate-900" style={{ fontFamily: 'Sora, sans-serif' }}>Post a New Project</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 flex flex-col gap-4">
              <div>
                <label className="block text-[12px] font-bold text-slate-700 mb-1.5">Project Title</label>
                <input type="text" placeholder="e.g. Redesign e-commerce website" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all" />
              </div>
              <div>
                <label className="block text-[12px] font-bold text-slate-700 mb-1.5">Description</label>
                <textarea rows={3} placeholder="Describe the scope of work..." className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all resize-none"></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-bold text-slate-700 mb-1.5">Category</label>
                  <select className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all appearance-none bg-white">
                    <option>Web Design</option>
                    <option>Mobile Development</option>
                    <option>Branding</option>
                    <option>Marketing</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-slate-700 mb-1.5">Budget ($)</label>
                  <input type="number" placeholder="2500" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-[12px] font-bold text-slate-700 mb-1.5">Deadline</label>
                <input type="date" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all" />
              </div>
            </div>
            <div className="p-4 border-t border-slate-100 flex justify-end gap-2 bg-slate-50/50">
              <button onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-200 transition-colors">Cancel</button>
              <button className="px-5 py-2.5 rounded-xl text-sm font-bold text-white shadow-md hover:-translate-y-0.5 transition-all" style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)' }}>Post Project</button>
            </div>
          </div>
        </div>
      )}
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}} />
    </div>
  );
}
