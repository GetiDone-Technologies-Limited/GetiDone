'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import {
  FolderOpen, Eye, PieChart, Mail, Plus, Search, ChevronDown,
  ExternalLink, Code2, Edit2, Trash2, Check, X, Code, Image as ImageIcon
} from 'lucide-react';
import { useAuthStore } from '@/store/auth.store';

interface PortfolioProject {
  id: number;
  title: string;
  category: 'Web Development' | 'UI/UX Design' | 'Mobile App' | 'Digital Marketing';
  image: string;
  desc: string;
  skills: string[];
  demoUrl?: string;
  repoUrl?: string;
}

const initialProjects: PortfolioProject[] = [
  {
    id: 1,
    title: 'E-commerce Platform Redesign',
    category: 'Web Development',
    image: 'https://picsum.photos/seed/ecommerceapp/600/400.jpg',
    desc: 'Complete frontend architecture redesign for a high-traffic e-commerce platform handling 50k+ daily users.',
    skills: ['React', 'Next.js', 'Tailwind CSS'],
    demoUrl: 'https://demo.getidone.io/ecommerce',
    repoUrl: 'https://github.com/getidone/ecommerce'
  },
  {
    id: 2,
    title: 'Real-Time Analytics Dashboard',
    category: 'Web Development',
    image: 'https://picsum.photos/seed/saasdashboard/600/400.jpg',
    desc: 'Built a real-time analytics dashboard for a B2B SaaS company to track user engagement and revenue metrics.',
    skills: ['React', 'Node.js', 'WebSocket', 'Recharts'],
    demoUrl: 'https://demo.getidone.io/analytics',
    repoUrl: 'https://github.com/getidone/analytics'
  },
  {
    id: 3,
    title: 'Mobile Banking App UI',
    category: 'UI/UX Design',
    image: 'https://picsum.photos/seed/bankingapp/600/400.jpg',
    desc: 'Designed a seamless and secure mobile banking interface including user flow for transfers and bill payments.',
    skills: ['Figma', 'Prototyping', 'UI/UX', 'Design System'],
    demoUrl: 'https://figma.com/@getidone/banking',
  },
  {
    id: 4,
    title: 'Cross-Platform Mobile App',
    category: 'Mobile App',
    image: 'https://picsum.photos/seed/mobileapp/600/400.jpg',
    desc: 'Built a cross-platform mobile app from scratch using React Native. Integrated biometric auth and push notifications.',
    skills: ['React Native', 'Firebase', 'TypeScript'],
    demoUrl: 'https://demo.getidone.io/mobile',
    repoUrl: 'https://github.com/getidone/mobile-app'
  }
];

interface ToastState {
  title: string;
  msg: string;
  visible: boolean;
}

export default function PortfolioPage() {
  const { user } = useAuthStore();
  const [projectsList, setProjectsList] = useState<PortfolioProject[]>(initialProjects);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<PortfolioProject | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'Web Development' | 'UI/UX Design' | 'Mobile App' | 'Digital Marketing'>('Web Development');
  const [imageUrl, setImageUrl] = useState('');
  const [desc, setDesc] = useState('');
  const [skillsStr, setSkillsStr] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [repoUrl, setRepoUrl] = useState('');

  const [toastState, setToastState] = useState<ToastState>({ title: '', msg: '', visible: false });
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (title: string, msg: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToastState({ title, msg, visible: true });
    toastTimer.current = setTimeout(() => setToastState(t => ({ ...t, visible: false })), 3000);
  };

  const handleOpenAdd = () => {
    setEditingProject(null);
    setTitle('');
    setCategory('Web Development');
    setImageUrl('https://picsum.photos/seed/newproject/600/400.jpg');
    setDesc('');
    setSkillsStr('React, Tailwind CSS');
    setDemoUrl('');
    setRepoUrl('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: PortfolioProject) => {
    setEditingProject(p);
    setTitle(p.title);
    setCategory(p.category);
    setImageUrl(p.image);
    setDesc(p.desc);
    setSkillsStr(p.skills.join(', '));
    setDemoUrl(p.demoUrl || '');
    setRepoUrl(p.repoUrl || '');
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setProjectsList(prev => prev.filter(p => p.id !== id));
    showToast('Project Removed', 'Project has been deleted from your portfolio');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !desc) {
      showToast('Error', 'Please fill in required fields');
      return;
    }

    const skillsArr = skillsStr.split(',').map(s => s.trim()).filter(Boolean);

    if (editingProject) {
      setProjectsList(prev => prev.map(p => p.id === editingProject.id ? {
        ...p,
        title,
        category,
        image: imageUrl || p.image,
        desc,
        skills: skillsArr,
        demoUrl,
        repoUrl
      } : p));
      showToast('Project Updated', `"${title}" has been updated`);
    } else {
      const newProj: PortfolioProject = {
        id: Date.now(),
        title,
        category,
        image: imageUrl || 'https://picsum.photos/seed/project/600/400.jpg',
        desc,
        skills: skillsArr.length ? skillsArr : ['React'],
        demoUrl,
        repoUrl
      };
      setProjectsList(prev => [newProj, ...prev]);
      showToast('Project Added', `"${title}" added to your portfolio`);
    }

    setIsModalOpen(false);
  };

  const filteredProjects = projectsList.filter(p => {
    const q = searchQuery.toLowerCase();
    const matchSearch = !q || p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q) || p.skills.some(s => s.toLowerCase().includes(q));
    const matchCategory = activeFilter === 'all' || p.category === activeFilter;
    return matchSearch && matchCategory;
  });

  return (
    <div className="space-y-6 pb-8">
      {/* Page Header */}
      <section className="fade-up">
        <div className="flex items-center gap-2 mb-2 text-xs" style={{ color: 'var(--muted)' }}>
          <Link href="/freelancer" className="hover:text-emerald-600 transition-colors">Dashboard</Link>
          <ChevronDown className="w-3 h-3 -rotate-90" />
          <span className="font-semibold" style={{ color: 'var(--text)' }}>My Portfolio</span>
        </div>

        <div className="flex items-end justify-between flex-wrap gap-4 mb-6">
          <div>
            <h1 className="font-extrabold text-4xl tracking-tight" style={{ fontFamily: "'Sora', sans-serif", color: 'var(--text)' }}>
              My Portfolio<span style={{ color: 'var(--primary)' }}>.</span>
            </h1>
            <p className="text-sm mt-1.5" style={{ color: 'var(--muted)' }}>
              Showcase your best work to attract high-quality clients.
            </p>
          </div>

          <button onClick={handleOpenAdd} className="btn-primary px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2">
            <Plus className="w-4 h-4" />
            <span>Add Project</span>
          </button>
        </div>

        {/* Stats Mini Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Projects */}
          <div className="gd-card gd-stat-card p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: 'var(--muted)' }}>TOTAL PROJECTS</span>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(16,185,129,0.12)', color: 'var(--primary)' }}>
                <FolderOpen className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>
              {projectsList.length}
            </div>
            <div className="text-[11px] mt-1" style={{ color: 'var(--soft)' }}>Published projects</div>
          </div>

          {/* Profile Views */}
          <div className="gd-card gd-stat-card p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: 'var(--muted)' }}>PROFILE VIEWS</span>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(245,158,11,0.12)', color: 'var(--warning)' }}>
                <Eye className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>
              1.2k
            </div>
            <div className="text-[11px] mt-1" style={{ color: 'var(--soft)' }}>
              <span className="font-bold text-emerald-600">+12%</span> vs last month
            </div>
          </div>

          {/* Profile Completeness */}
          <div className="gd-card gd-stat-card p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: 'var(--muted)' }}>COMPLETENESS</span>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(20,184,166,0.12)', color: 'var(--secondary)' }}>
                <PieChart className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <div className="progress-track flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="progress-fill h-full rounded-full bg-gradient-to-r from-emerald-500 to-lime-500" style={{ width: '85%' }} />
              </div>
              <span className="text-sm font-bold">85%</span>
            </div>
            <div className="text-[11px] mt-1.5" style={{ color: 'var(--soft)' }}>Add 2 more projects to hit 100%</div>
          </div>

          {/* Invites Received */}
          <div className="gd-card gd-stat-card p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: 'var(--muted)' }}>INVITES RECEIVED</span>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(132,204,22,0.12)', color: 'var(--accent)' }}>
                <Mail className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>
              24
            </div>
            <div className="text-[11px] mt-1" style={{ color: 'var(--soft)' }}>From profile views</div>
          </div>
        </div>
      </section>

      {/* Filter Tabs & Search */}
      <section className="space-y-4 fade-up">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          {/* Filter Tabs */}
          <div className="flex items-center gap-1 p-1 rounded-xl" style={{ background: 'var(--bg-alt)' }}>
            {[
              { id: 'all', label: 'All Projects' },
              { id: 'Web Development', label: 'Web Dev' },
              { id: 'UI/UX Design', label: 'UI/UX' },
              { id: 'Mobile App', label: 'Mobile' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeFilter === tab.id ? 'bg-[var(--sidebar)] text-white shadow-sm' : 'text-[var(--muted)] hover:text-[var(--text)]'
                }`}
              >
                {tab.label}
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
            placeholder="Search projects, technologies..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="search-input w-full pl-11 pr-4 py-2.5 rounded-xl text-sm"
          />
        </div>
      </section>

      {/* Projects Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 fade-up">
        {filteredProjects.length === 0 ? (
          <div className="col-span-full gd-card p-12 text-center">
            <FolderOpen className="w-10 h-10 mx-auto mb-3 text-[var(--soft)]" />
            <p className="text-sm font-semibold" style={{ color: 'var(--muted)' }}>No portfolio items found</p>
          </div>
        ) : (
          filteredProjects.map((p) => (
            <div key={p.id} className="gd-card group relative overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40">
              {/* Image Container with Hover Overlay */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  {p.demoUrl && (
                    <a
                      href={p.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="w-10 h-10 rounded-xl bg-white text-slate-900 flex items-center justify-center transition-transform hover:scale-110 shadow-lg"
                      title="Live Demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  {p.repoUrl && (
                    <a
                      href={p.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center transition-transform hover:scale-110 shadow-lg"
                      title="Source Code"
                    >
                      <Code2 className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-600">
                      {p.category}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEdit(p)}
                        className="text-xs text-slate-400 hover:text-emerald-600 transition-colors p-1"
                        title="Edit Project"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="text-xs text-slate-400 hover:text-red-500 transition-colors p-1"
                        title="Delete Project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <h3 className="font-extrabold text-lg mb-2" style={{ fontFamily: "'Sora', sans-serif" }}>
                    {p.title}
                  </h3>
                  <p className="text-xs line-clamp-2" style={{ color: 'var(--muted)' }}>
                    {p.desc}
                  </p>
                </div>

                {/* Skill Pills */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {p.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-semibold px-2.5 py-0.5 rounded-md"
                      style={{ background: 'rgba(16,185,129,0.08)', color: 'var(--primary-dark)' }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </section>

      {/* Add / Edit Project Modal */}
      {isModalOpen && (
        <div
          className="modal-backdrop active"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsModalOpen(false);
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
                  PORTFOLIO ITEM
                </div>
                <h2 className="font-extrabold text-2xl" style={{ fontFamily: "'Sora', sans-serif" }}>
                  {editingProject ? 'Edit Project' : 'Add New Project'}
                </h2>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold tracking-wider mb-1.5 block uppercase" style={{ color: 'var(--muted)' }}>PROJECT TITLE</label>
                <input
                  type="text"
                  placeholder="e.g. E-commerce Redesign"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none"
                  style={{ borderColor: 'var(--border)', background: 'var(--bg-alt)' }}
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold tracking-wider mb-1.5 block uppercase" style={{ color: 'var(--muted)' }}>CATEGORY</label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value as any)}
                  className="w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none cursor-pointer"
                  style={{ borderColor: 'var(--border)', background: 'var(--bg-alt)' }}
                  required
                >
                  <option value="Web Development">Web Development</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                  <option value="Mobile App">Mobile App</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold tracking-wider mb-1.5 block uppercase" style={{ color: 'var(--muted)' }}>IMAGE URL</label>
                <input
                  type="url"
                  placeholder="https://image-link.jpg"
                  value={imageUrl}
                  onChange={e => setImageUrl(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none"
                  style={{ borderColor: 'var(--border)', background: 'var(--bg-alt)' }}
                />
              </div>

              <div>
                <label className="text-xs font-bold tracking-wider mb-1.5 block uppercase" style={{ color: 'var(--muted)' }}>DESCRIPTION</label>
                <textarea
                  rows={3}
                  placeholder="Briefly describe the project, your role, and the impact..."
                  value={desc}
                  onChange={e => setDesc(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none resize-none"
                  style={{ borderColor: 'var(--border)', background: 'var(--bg-alt)' }}
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold tracking-wider mb-1.5 block uppercase" style={{ color: 'var(--muted)' }}>TECH STACK / SKILLS (Comma Separated)</label>
                <input
                  type="text"
                  placeholder="React, Node.js, AWS"
                  value={skillsStr}
                  onChange={e => setSkillsStr(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none"
                  style={{ borderColor: 'var(--border)', background: 'var(--bg-alt)' }}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold tracking-wider mb-1.5 block uppercase" style={{ color: 'var(--muted)' }}>LIVE DEMO URL</label>
                  <input
                    type="url"
                    placeholder="https://demo-link.com"
                    value={demoUrl}
                    onChange={e => setDemoUrl(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none"
                    style={{ borderColor: 'var(--border)', background: 'var(--bg-alt)' }}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold tracking-wider mb-1.5 block uppercase" style={{ color: 'var(--muted)' }}>GITHUB URL</label>
                  <input
                    type="url"
                    placeholder="https://github.com/user/repo"
                    value={repoUrl}
                    onChange={e => setRepoUrl(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none"
                    style={{ borderColor: 'var(--border)', background: 'var(--bg-alt)' }}
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 btn-ghost py-3 rounded-xl text-sm font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 btn-primary py-3 rounded-xl text-sm font-bold"
                >
                  Save Project
                </button>
              </div>
            </form>
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
