'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import {
  FolderOpen, Hourglass, CheckCircle2, DollarSign, Eye, EyeOff,
  ChevronDown, Search, MessageSquare, UploadCloud, X, Check, Clock,
  Tag, ShieldCheck
} from 'lucide-react';
import { useAuthStore } from '@/store/auth.store';
import { useUIStore } from '@/store/ui.store';

type ProjectStatus = 'active' | 'review' | 'completed';

interface Milestone {
  name: string;
  status: 'completed' | 'active' | 'pending';
}

interface FreelancerProject {
  id: number;
  title: string;
  client: string;
  clientAvatar: string;
  verified: boolean;
  status: ProjectStatus;
  rate: string;
  earned: string;
  totalBudget: string;
  deadline: string;
  progress: number;
  currentMilestone: string;
  milestones: Milestone[];
  desc: string;
}

const initialProjects: FreelancerProject[] = [
  {
    id: 1,
    title: 'E-commerce Platform Redesign',
    client: 'TechNova Inc.',
    clientAvatar: 'https://picsum.photos/seed/technovalogo/100/100.jpg',
    verified: true,
    status: 'active',
    rate: '$80/hr',
    earned: '$3,200',
    totalBudget: '$12,000',
    deadline: 'Jan 15, 2025',
    progress: 65,
    currentMilestone: 'Frontend Development',
    milestones: [
      { name: 'Discovery & Wireframes', status: 'completed' },
      { name: 'UI Design System', status: 'completed' },
      { name: 'Frontend Development', status: 'active' },
      { name: 'Backend Integration', status: 'pending' },
      { name: 'QA & Launch', status: 'pending' }
    ],
    desc: 'Redesign of the existing e-commerce storefront using React and Tailwind CSS. Includes product page templates, cart flow, and mobile optimization.'
  },
  {
    id: 2,
    title: 'Real-Time Analytics Dashboard',
    client: 'Frame.io',
    clientAvatar: 'https://picsum.photos/seed/frameio/100/100.jpg',
    verified: false,
    status: 'review',
    rate: '$12,000',
    earned: '$9,000',
    totalBudget: '$12,000',
    deadline: 'Dec 20, 2024',
    progress: 90,
    currentMilestone: 'Final Review',
    milestones: [
      { name: 'Architecture Setup', status: 'completed' },
      { name: 'WebSocket Integration', status: 'completed' },
      { name: 'UI Components', status: 'completed' },
      { name: 'Final Review', status: 'active' }
    ],
    desc: 'Build a real-time analytics dashboard to track user engagement and revenue metrics using WebSockets and React.'
  },
  {
    id: 3,
    title: 'Backend API Developer',
    client: 'Innovatech',
    clientAvatar: 'https://picsum.photos/seed/innovatech/100/100.jpg',
    verified: true,
    status: 'active',
    rate: '$70/hr',
    earned: '$5,600',
    totalBudget: '$15,000',
    deadline: 'Feb 28, 2025',
    progress: 35,
    currentMilestone: 'Stripe Integration',
    milestones: [
      { name: 'Database Schema', status: 'completed' },
      { name: 'Auth & Users', status: 'completed' },
      { name: 'Stripe Integration', status: 'active' },
      { name: 'Testing & Deploy', status: 'pending' }
    ],
    desc: 'Need a robust RESTful API for a mobile app. Must integrate Stripe and handle high-traffic loads efficiently.'
  }
];

interface ToastState {
  title: string;
  msg: string;
  visible: boolean;
}

export default function FreelancerActiveProjectsPage() {
  const { balancesVisible, toggleBalancesVisible } = useUIStore();
  const [projectsList, setProjectsList] = useState<FreelancerProject[]>(initialProjects);
  const [activeFilter, setActiveFilter] = useState<'all' | ProjectStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<FreelancerProject | null>(null);
  const [toastState, setToastState] = useState<ToastState>({ title: '', msg: '', visible: false });
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (title: string, msg: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToastState({ title, msg, visible: true });
    toastTimer.current = setTimeout(() => setToastState(t => ({ ...t, visible: false })), 3000);
  };

  const submitWork = (id: number) => {
    setProjectsList(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, status: 'review' as ProjectStatus };
      }
      return p;
    }));
    showToast('Work Submitted', 'Client has been notified for final review');
    if (selectedProject?.id === id) {
      setSelectedProject(prev => prev ? { ...prev, status: 'review' } : null);
    }
  };

  const filteredProjects = projectsList.filter(p => {
    const q = searchQuery.toLowerCase();
    const matchSearch = !q || p.title.toLowerCase().includes(q) || p.client.toLowerCase().includes(q);
    const matchStatus = activeFilter === 'all' || p.status === activeFilter;
    return matchSearch && matchStatus;
  });

  const counts = {
    active: projectsList.filter(p => p.status === 'active').length,
    review: projectsList.filter(p => p.status === 'review').length,
    completed: projectsList.filter(p => p.status === 'completed').length,
  };

  const statusConfig: Record<ProjectStatus, { bg: string; text: string; label: string }> = {
    active: { bg: 'rgba(16,185,129,0.12)', text: 'var(--primary)', label: 'Active' },
    review: { bg: 'rgba(245,158,11,0.12)', text: 'var(--warning)', label: 'In Review' },
    completed: { bg: 'rgba(132,204,22,0.12)', text: 'var(--accent)', label: 'Completed' },
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Page Header */}
      <section className="fade-up">
        <div className="flex items-center gap-2 mb-2 text-xs" style={{ color: 'var(--muted)' }}>
          <Link href="/freelancer" className="hover:text-emerald-600 transition-colors">Dashboard</Link>
          <ChevronDown className="w-3 h-3 -rotate-90" />
          <span className="font-semibold" style={{ color: 'var(--text)' }}>Active Projects</span>
        </div>

        <div className="flex items-end justify-between flex-wrap gap-4 mb-6">
          <div>
            <h1 className="font-extrabold text-4xl tracking-tight" style={{ fontFamily: "'Sora', sans-serif", color: 'var(--text)' }}>
              Active Projects<span style={{ color: 'var(--primary)' }}>.</span>
            </h1>
            <p className="text-sm mt-1.5" style={{ color: 'var(--muted)' }}>
              Manage your ongoing work, track milestones, and submit deliverables.
            </p>
          </div>

          <Link href="/jobs/search" className="btn-primary px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2">
            <Search className="w-4 h-4" />
            <span>Find New Work</span>
          </Link>
        </div>

        {/* Stats Mini Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            onClick={() => setActiveFilter('active')}
            className="gd-card gd-stat-card p-5 cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: 'var(--muted)' }}>ACTIVE PROJECTS</span>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(16,185,129,0.12)', color: 'var(--primary)' }}>
                <FolderOpen className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>{counts.active}</div>
            <div className="text-[11px] mt-1" style={{ color: 'var(--soft)' }}>Currently in progress</div>
          </div>

          <div
            onClick={() => setActiveFilter('review')}
            className="gd-card gd-stat-card p-5 cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: 'var(--muted)' }}>PENDING REVIEW</span>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(245,158,11,0.12)', color: 'var(--warning)' }}>
                <Hourglass className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>{counts.review}</div>
            <div className="text-[11px] mt-1" style={{ color: 'var(--soft)' }}>Awaiting client approval</div>
          </div>

          <div
            onClick={() => setActiveFilter('completed')}
            className="gd-card gd-stat-card p-5 cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: 'var(--muted)' }}>COMPLETED</span>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(132,204,22,0.12)', color: 'var(--accent)' }}>
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>{counts.completed || 12}</div>
            <div className="text-[11px] mt-1" style={{ color: 'var(--soft)' }}>Successfully delivered</div>
          </div>

          <div className="gd-card gd-stat-card p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: 'var(--muted)' }}>TOTAL EARNED</span>
              <button
                onClick={toggleBalancesVisible}
                className="p-1 rounded text-slate-400 hover:text-emerald-500 transition-colors"
                title={balancesVisible ? 'Hide Balances' : 'Show Balances'}
              >
                {balancesVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4 text-emerald-500" />}
              </button>
            </div>
            <div className="text-3xl font-extrabold tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>
              {balancesVisible ? '$48,250' : '•••••'}
            </div>
            <div className="text-[11px] mt-1" style={{ color: 'var(--soft)' }}>All-time earnings</div>
          </div>
        </div>
      </section>

      {/* Filter Tabs & Search */}
      <section className="space-y-4 fade-up">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          {/* Filter Tabs */}
          <div className="flex items-center gap-1 p-1 rounded-xl" style={{ background: 'var(--bg-alt)' }}>
            {(['all', 'active', 'review', 'completed'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
                  activeFilter === tab ? 'bg-[var(--sidebar)] text-white shadow-sm' : 'text-[var(--muted)] hover:text-[var(--text)]'
                }`}
              >
                {tab === 'all' ? 'All Projects' : tab === 'review' ? 'In Review' : tab}
              </button>
            ))}
          </div>

          <div className="text-xs" style={{ color: 'var(--muted)' }}>
            Showing <span className="font-bold" style={{ color: 'var(--text)' }}>{filteredProjects.length}</span> projects
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--soft)' }} />
          <input
            type="text"
            placeholder="Search projects, clients..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="search-input w-full pl-11 pr-4 py-2.5 rounded-xl text-sm"
          />
        </div>
      </section>

      {/* Projects List Feed */}
      <section className="space-y-4 fade-up">
        {filteredProjects.length === 0 ? (
          <div className="gd-card p-12 text-center">
            <FolderOpen className="w-10 h-10 mx-auto mb-3 text-[var(--soft)]" />
            <p className="text-sm font-semibold" style={{ color: 'var(--muted)' }}>No projects found</p>
          </div>
        ) : (
          filteredProjects.map((p) => {
            const sc = statusConfig[p.status];
            const progColor = p.progress >= 75 ? 'var(--accent)' : p.progress >= 50 ? 'var(--primary)' : 'var(--warning)';

            return (
              <div
                key={p.id}
                onClick={() => setSelectedProject(p)}
                className="gd-card p-6 flex flex-col justify-between group relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 cursor-pointer"
              >
                {/* Top Accent Gradient Bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <img src={p.clientAvatar} className="w-10 h-10 rounded-full object-cover" alt={p.client} />
                      <div>
                        <div className="text-xs font-bold flex items-center gap-1.5" style={{ color: 'var(--muted)' }}>
                          {p.client}
                          {p.verified && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500/20" title="Verified Client" />
                          )}
                        </div>
                        <div className="text-[11px] mt-0.5" style={{ color: 'var(--soft)' }}>Deadline: {p.deadline}</div>
                      </div>
                    </div>

                    <span
                      className="text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5"
                      style={{ background: sc.bg, color: sc.text }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {sc.label}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-lg mb-2" style={{ fontFamily: "'Sora', sans-serif" }}>{p.title}</h3>
                  <p className="text-sm mb-4 line-clamp-2" style={{ color: 'var(--muted)' }}>{p.desc}</p>

                  {/* Progress Tracker */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--muted)' }}>
                        PROGRESS - {p.currentMilestone}
                      </span>
                      <span className="text-xs font-extrabold" style={{ color: progColor }}>{p.progress}%</span>
                    </div>
                    <div className="progress-track">
                      <div
                        className="progress-fill"
                        style={{ width: `${p.progress}%`, background: progColor }}
                      />
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="flex items-center justify-between pt-4 border-t flex-wrap gap-4" style={{ borderColor: 'var(--border)' }}>
                  <div className="flex items-center gap-4 text-xs font-semibold" style={{ color: 'var(--muted)' }}>
                    <span className="flex items-center gap-1"><Tag className="w-3.5 h-3.5 text-emerald-500" />{p.rate}</span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
                      Earned: {balancesVisible ? p.earned : '•••••'}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        showToast('Message', `Opening chat with ${p.client}`);
                      }}
                      className="btn-ghost px-4 py-2 rounded-lg text-xs font-bold"
                    >
                      Message
                    </button>

                    {p.status === 'active' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          submitWork(p.id);
                        }}
                        className="btn-primary px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5"
                      >
                        <UploadCloud className="w-3.5 h-3.5" />
                        <span>Submit Work</span>
                      </button>
                    )}

                    {p.status === 'review' && (
                      <button
                        disabled
                        className="btn-ghost px-4 py-2 rounded-lg text-xs font-bold opacity-60 cursor-not-allowed"
                      >
                        Awaiting Review
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </section>

      {/* Project Details Modal */}
      {selectedProject && (
        <div
          className="modal-backdrop active"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedProject(null);
          }}
        >
          <div className="modal-content p-7">
            <div className="flex items-start justify-between mb-5 pb-4 border-b" style={{ borderColor: 'var(--border)' }}>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-emerald-500">
                    <FolderOpen className="w-4 h-4 text-white" />
                  </div>
                  <div className="getidone-text text-sm dark"><span className="geti">Geti</span><span className="done">Done</span></div>
                </div>
                <div className="text-[11px] font-bold tracking-widest uppercase mb-1" style={{ color: 'var(--primary)' }}>
                  PROJECT #{2000 + selectedProject.id}
                </div>
                <h2 className="font-extrabold text-2xl" style={{ fontFamily: "'Sora', sans-serif" }}>{selectedProject.title}</h2>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 rounded-xl" style={{ background: 'var(--bg-alt)' }}>
                <img src={selectedProject.clientAvatar} className="w-12 h-12 rounded-full object-cover" alt={selectedProject.client} />
                <div>
                  <div className="font-bold text-sm flex items-center gap-1.5">
                    {selectedProject.client}
                    {selectedProject.verified && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                  </div>
                  <div className="text-xs" style={{ color: 'var(--muted)' }}>Deadline: {selectedProject.deadline}</div>
                </div>
                <div className="ml-auto">
                  <span
                    className="text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5"
                    style={{ background: statusConfig[selectedProject.status].bg, color: statusConfig[selectedProject.status].text }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    {statusConfig[selectedProject.status].label}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl border" style={{ borderColor: 'var(--border)' }}>
                  <div className="text-[10px] font-bold tracking-wider uppercase mb-1" style={{ color: 'var(--muted)' }}>RATE / BUDGET</div>
                  <div className="font-extrabold text-sm" style={{ fontFamily: "'Sora', sans-serif" }}>{selectedProject.rate}</div>
                </div>
                <div className="p-3.5 rounded-xl border" style={{ borderColor: 'var(--border)' }}>
                  <div className="text-[10px] font-bold tracking-wider uppercase mb-1" style={{ color: 'var(--muted)' }}>EARNED SO FAR</div>
                  <div className="font-extrabold text-sm" style={{ fontFamily: "'Sora', sans-serif" }}>
                    {balancesVisible ? selectedProject.earned : '•••••'}
                  </div>
                </div>
                <div className="p-3.5 rounded-xl border" style={{ borderColor: 'var(--border)' }}>
                  <div className="text-[10px] font-bold tracking-wider uppercase mb-1" style={{ color: 'var(--muted)' }}>PROGRESS</div>
                  <div className="font-extrabold text-sm text-emerald-600" style={{ fontFamily: "'Sora', sans-serif" }}>{selectedProject.progress}%</div>
                </div>
              </div>

              <div className="p-4 rounded-xl border" style={{ borderColor: 'var(--border)' }}>
                <div className="text-[10px] font-bold tracking-wider uppercase mb-2" style={{ color: 'var(--muted)' }}>PROJECT DESCRIPTION</div>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>{selectedProject.desc}</p>
              </div>

              <div className="p-4 rounded-xl border" style={{ borderColor: 'var(--border)' }}>
                <div className="text-[10px] font-bold tracking-wider uppercase mb-3" style={{ color: 'var(--muted)' }}>MILESTONES</div>
                <div className="space-y-2">
                  {selectedProject.milestones.map((m, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 rounded-xl border" style={{ borderColor: 'var(--border)', background: m.status === 'active' ? 'rgba(16,185,129,0.06)' : 'transparent' }}>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                        m.status === 'completed' ? 'bg-emerald-500 border-emerald-500 text-white' : m.status === 'active' ? 'border-emerald-500 bg-emerald-500/10' : 'border-slate-300'
                      }`}>
                        {m.status === 'completed' && <Check className="w-3.5 h-3.5" />}
                        {m.status === 'active' && <span className="w-2 h-2 rounded-full bg-emerald-500" />}
                      </div>
                      <span className={`text-xs font-semibold ${m.status === 'pending' ? 'text-slate-400' : 'text-slate-800 dark:text-white'}`}>
                        {m.name}
                      </span>
                      {m.status === 'active' && <span className="ml-auto text-[10px] font-bold text-emerald-600 uppercase">IN PROGRESS</span>}
                      {m.status === 'completed' && <span className="ml-auto text-[10px] font-bold text-lime-600 uppercase">DONE</span>}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                {selectedProject.status === 'active' && (
                  <button
                    onClick={() => submitWork(selectedProject.id)}
                    className="flex-1 btn-primary py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2"
                  >
                    <UploadCloud className="w-4 h-4" />
                    <span>Submit Work</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    setSelectedProject(null);
                    showToast('Message', `Opening chat with ${selectedProject.client}`);
                  }}
                  className="flex-1 btn-ghost py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Message Client</span>
                </button>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="flex-1 btn-ghost py-3 rounded-xl text-sm font-bold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      <div
        className="fixed bottom-6 right-6 flex items-center gap-3 px-5 py-4 rounded-[14px] z-50 transition-all duration-[400ms]"
        style={{
          background: 'var(--sidebar)',
          border: '1px solid rgba(16,185,129,0.2)',
          boxShadow: '0 16px 40px -12px rgba(15,26,20,0.4)',
          color: 'white',
          maxWidth: 360,
          transform: toastState.visible ? 'translateX(0)' : 'translateX(140%)',
        }}
      >
        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'var(--primary)' }}>
          <Check className="w-4 h-4 text-white" />
        </div>
        <div>
          <div className="text-sm font-bold">{toastState.title}</div>
          <div className="text-xs" style={{ color: 'var(--sidebar-text)' }}>{toastState.msg}</div>
        </div>
        <button
          onClick={() => setToastState(t => ({ ...t, visible: false }))}
          className="ml-auto opacity-60 hover:opacity-100 transition-opacity"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
