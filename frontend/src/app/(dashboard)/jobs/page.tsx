'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import {
  Search, SlidersHorizontal, MapPin, Zap, Send, Eye, Mail,
  Bookmark, CheckCircle2, DollarSign, Clock, ArrowRight, X,
  Check, Filter, ChevronDown, FileEdit, Tag
} from 'lucide-react';
import { useJobs } from '@/features/jobs/hooks/useJobs';

interface JobItem {
  id: number;
  title: string;
  client: string;
  clientAvatar: string;
  verified: boolean;
  location: string;
  posted: string;
  type: 'Fixed Price' | 'Hourly';
  budget: string;
  duration: string;
  desc: string;
  skills: string[];
  proposals: number;
  saved: boolean;
  category: string;
}

const initialJobs: JobItem[] = [
  {
    id: 1,
    title: 'E-commerce Platform Redesign',
    client: 'TechNova Inc.',
    clientAvatar: 'https://picsum.photos/seed/technovalogo/100/100.jpg',
    verified: true,
    location: 'Lagos, Nigeria',
    posted: '2 hours ago',
    type: 'Fixed Price',
    budget: '$12,000',
    duration: '45 days',
    desc: 'We are looking for an experienced Frontend Developer to redesign our e-commerce platform. Must be proficient in React, Next.js, and Tailwind CSS. You will work closely with our backend team to integrate APIs.',
    skills: ['React', 'Next.js', 'Tailwind CSS', 'REST API'],
    proposals: 12,
    saved: false,
    category: 'Web Development',
  },
  {
    id: 2,
    title: 'Backend API Developer Needed',
    client: 'Innovatech',
    clientAvatar: 'https://picsum.photos/seed/innovatech/100/100.jpg',
    verified: true,
    location: 'Remote',
    posted: '5 hours ago',
    type: 'Hourly',
    budget: '$70/hr',
    duration: '3 months',
    desc: 'Need a robust RESTful API for a mobile app. Must integrate Stripe and handle high-traffic loads efficiently. Experience with MongoDB and AWS is required.',
    skills: ['Node.js', 'Express', 'MongoDB', 'AWS', 'Stripe'],
    proposals: 8,
    saved: true,
    category: 'Web Development',
  },
  {
    id: 3,
    title: 'Mobile Banking App UI/UX',
    client: 'Paystack',
    clientAvatar: 'https://picsum.photos/seed/paystack/100/100.jpg',
    verified: true,
    location: 'Remote',
    posted: '1 day ago',
    type: 'Fixed Price',
    budget: '$8,500',
    duration: '30 days',
    desc: 'Design a seamless and secure mobile banking interface. Must include user flow for transfers, bill payments, and account management. Figma file required for handoff.',
    skills: ['Figma', 'UI/UX', 'Prototyping', 'Mobile Design'],
    proposals: 24,
    saved: false,
    category: 'UI/UX Design',
  },
  {
    id: 4,
    title: 'SEO Specialist for SaaS',
    client: 'Frame.io',
    clientAvatar: 'https://picsum.photos/seed/frameio/100/100.jpg',
    verified: false,
    location: 'New York, USA',
    posted: '2 days ago',
    type: 'Hourly',
    budget: '$55/hr',
    duration: 'Ongoing',
    desc: 'We need an expert to handle technical SEO, keyword research, and content optimization for our SaaS platform. Must provide monthly performance reports.',
    skills: ['SEO', 'Content Strategy', 'Google Analytics', 'Ahrefs'],
    proposals: 15,
    saved: false,
    category: 'Digital Marketing',
  },
  {
    id: 5,
    title: 'React Native App Development',
    client: 'Flutterwave',
    clientAvatar: 'https://picsum.photos/seed/flutterwave/100/100.jpg',
    verified: true,
    location: 'Remote',
    posted: '3 days ago',
    type: 'Fixed Price',
    budget: '$15,000',
    duration: '60 days',
    desc: 'Build a cross-platform mobile app from scratch using React Native. Must integrate biometric authentication and push notifications.',
    skills: ['React Native', 'Firebase', 'TypeScript', 'Mobile'],
    proposals: 32,
    saved: true,
    category: 'Mobile App',
  },
];

interface ToastState {
  title: string;
  msg: string;
  visible: boolean;
}

export default function JobsBrowsePage() {
  const { data: apiJobs, isLoading } = useJobs();
  const [jobsList, setJobsList] = useState<JobItem[]>(initialJobs);
  const [activeTab, setActiveTab] = useState<'all' | 'saved' | 'best'>('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [budgetFilter, setBudgetFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJob, setSelectedJob] = useState<JobItem | null>(null);
  const [proposalRate, setProposalRate] = useState<number | ''>(75);
  const [proposalDays, setProposalDays] = useState<number | ''>(30);
  const [proposalCover, setProposalCover] = useState('');
  const [toastState, setToastState] = useState<ToastState>({ title: '', msg: '', visible: false });
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (title: string, msg: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToastState({ title, msg, visible: true });
    toastTimer.current = setTimeout(() => setToastState(t => ({ ...t, visible: false })), 3000);
  };

  const toggleSave = (id: number) => {
    setJobsList(prev => prev.map(j => {
      if (j.id === id) {
        const nextSaved = !j.saved;
        showToast(
          nextSaved ? 'Job Saved' : 'Job Removed',
          nextSaved ? `${j.title} added to your saved list` : `${j.title} removed from your saved list`
        );
        return { ...j, saved: nextSaved };
      }
      return j;
    }));
  };

  const filteredJobs = jobsList.filter(j => {
    const q = searchQuery.toLowerCase();
    const matchSearch = !q || j.title.toLowerCase().includes(q) || j.desc.toLowerCase().includes(q) || j.skills.some(s => s.toLowerCase().includes(q));
    const matchCategory = categoryFilter === 'all' || j.category === categoryFilter;
    const matchBudget = budgetFilter === 'all' || (budgetFilter === 'fixed' && j.type === 'Fixed Price') || (budgetFilter === 'hourly' && j.type === 'Hourly');

    if (activeTab === 'saved') return matchSearch && matchCategory && matchBudget && j.saved;
    if (activeTab === 'best') return matchSearch && matchCategory && matchBudget && (j.skills.includes('React') || j.skills.includes('Next.js'));
    return matchSearch && matchCategory && matchBudget;
  });

  const handleProposalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!proposalCover) {
      showToast('Error', 'Please enter a cover letter');
      return;
    }
    showToast('Proposal Sent!', `Your proposal for ${selectedJob?.title} has been submitted successfully`);
    setSelectedJob(null);
    setProposalCover('');
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Page Header */}
      <section className="fade-up">
        <div className="flex items-center gap-2 mb-2 text-xs" style={{ color: 'var(--muted)' }}>
          <Link href="/freelancer" className="hover:text-emerald-600 transition-colors">Dashboard</Link>
          <ChevronDown className="w-3 h-3 -rotate-90" />
          <span className="font-semibold" style={{ color: 'var(--text)' }}>Find Work</span>
        </div>

        <div className="flex items-end justify-between flex-wrap gap-4 mb-6">
          <div>
            <h1 className="font-extrabold text-4xl tracking-tight" style={{ fontFamily: "'Sora', sans-serif", color: 'var(--text)' }}>
              Find Work<span style={{ color: 'var(--primary)' }}>.</span>
            </h1>
            <p className="text-sm mt-1.5" style={{ color: 'var(--muted)' }}>
              Browse projects that match your skills and submit proposals.
            </p>
          </div>

          <Link href="/jobs/new" className="btn-primary px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2">
            <FileEdit className="w-4 h-4" />
            <span>Post a Job</span>
          </Link>
        </div>

        {/* Stats Mini Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="gd-card gd-stat-card p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: 'var(--muted)' }}>AVAILABLE CONNECTS</span>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(16,185,129,0.12)', color: 'var(--primary)' }}>
                <Zap className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>64</div>
            <div className="text-[11px] mt-1" style={{ color: 'var(--soft)' }}>Resets in 12 days</div>
          </div>

          <div className="gd-card gd-stat-card p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: 'var(--muted)' }}>ACTIVE PROPOSALS</span>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(245,158,11,0.12)', color: 'var(--warning)' }}>
                <Send className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>4</div>
            <div className="text-[11px] mt-1" style={{ color: 'var(--soft)' }}>2 awaiting response</div>
          </div>

          <div className="gd-card gd-stat-card p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: 'var(--muted)' }}>PROFILE VIEWS</span>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(20,184,166,0.12)', color: 'var(--secondary)' }}>
                <Eye className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>142</div>
            <div className="text-[11px] mt-1" style={{ color: 'var(--soft)' }}>+24 this week</div>
          </div>

          <div className="gd-card gd-stat-card p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: 'var(--muted)' }}>INVITATIONS</span>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(132,204,22,0.12)', color: 'var(--accent)' }}>
                <Mail className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>8</div>
            <div className="text-[11px] mt-1" style={{ color: 'var(--soft)' }}>3 new this week</div>
          </div>
        </div>
      </section>

      {/* Filter Bar & Search */}
      <section className="space-y-4 fade-up">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          {/* Filter Tabs */}
          <div className="flex items-center gap-1 p-1 rounded-xl" style={{ background: 'var(--bg-alt)' }}>
            {(['all', 'saved', 'best'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
                  activeTab === tab ? 'bg-[var(--sidebar)] text-white shadow-sm' : 'text-[var(--muted)] hover:text-[var(--text)]'
                }`}
              >
                {tab === 'all' ? 'All Jobs' : tab === 'saved' ? 'Saved Jobs' : 'Best Matches'}
              </button>
            ))}
          </div>

          {/* Category & Budget Selectors */}
          <div className="flex items-center gap-3 flex-wrap">
            <select
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
              className="px-4 py-2 text-xs font-semibold rounded-lg border focus:outline-none cursor-pointer"
              style={{ background: 'var(--card)', borderColor: 'var(--border)', color: 'var(--text)' }}
            >
              <option value="all">All Categories</option>
              <option value="Web Development">Web Development</option>
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="Mobile App">Mobile App</option>
              <option value="Digital Marketing">Digital Marketing</option>
            </select>

            <select
              value={budgetFilter}
              onChange={e => setBudgetFilter(e.target.value)}
              className="px-4 py-2 text-xs font-semibold rounded-lg border focus:outline-none cursor-pointer"
              style={{ background: 'var(--card)', borderColor: 'var(--border)', color: 'var(--text)' }}
            >
              <option value="all">Any Budget</option>
              <option value="fixed">Fixed Price</option>
              <option value="hourly">Hourly Rate</option>
            </select>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--soft)' }} />
          <input
            type="text"
            placeholder="Search by job title, skill, or keyword..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="search-input w-full pl-11 pr-4 py-2.5 rounded-xl text-sm"
          />
        </div>
      </section>

      {/* Job Feed Cards */}
      <section className="space-y-4 fade-up">
        {filteredJobs.length === 0 ? (
          <div className="gd-card p-12 text-center">
            <Search className="w-10 h-10 mx-auto mb-3 text-[var(--soft)]" />
            <p className="text-sm font-semibold" style={{ color: 'var(--muted)' }}>No jobs found matching your criteria</p>
          </div>
        ) : (
          filteredJobs.map((j) => (
            <div
              key={j.id}
              className="gd-card p-6 flex flex-col justify-between group relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40"
            >
              {/* Top Accent Gradient Bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img src={j.clientAvatar} className="w-10 h-10 rounded-full object-cover" alt={j.client} />
                    <div>
                      <div className="text-xs font-bold flex items-center gap-1.5" style={{ color: 'var(--muted)' }}>
                        {j.client}
                        {j.verified && (
                          <span title="Verified Client">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500/20" />
                          </span>
                        )}
                        <span>·</span>
                        <MapPin className="w-3 h-3 text-[var(--soft)]" /> {j.location}
                      </div>
                      <div className="text-[11px] mt-0.5" style={{ color: 'var(--soft)' }}>Posted {j.posted}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleSave(j.id)}
                    className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
                    style={{
                      background: j.saved ? 'rgba(16,185,129,0.1)' : 'var(--bg-alt)',
                      color: j.saved ? 'var(--primary)' : 'var(--soft)'
                    }}
                    title={j.saved ? 'Remove Bookmark' : 'Save Job'}
                  >
                    <Bookmark className={`w-4 h-4 ${j.saved ? 'fill-emerald-500' : ''}`} />
                  </button>
                </div>

                <h3 className="font-extrabold text-lg mb-2" style={{ fontFamily: "'Sora', sans-serif" }}>{j.title}</h3>
                <p className="text-sm mb-4 line-clamp-3" style={{ color: 'var(--muted)' }}>{j.desc}</p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {j.skills.map(s => (
                    <span
                      key={s}
                      className="text-[11px] font-semibold px-2.5 py-1 rounded-md"
                      style={{ background: 'rgba(16,185,129,0.08)', color: 'var(--primary-dark)' }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="flex items-center justify-between pt-4 border-t flex-wrap gap-4" style={{ borderColor: 'var(--border)' }}>
                <div className="flex items-center gap-4 text-xs font-semibold" style={{ color: 'var(--muted)' }}>
                  <span className="flex items-center gap-1"><Tag className="w-3.5 h-3.5 text-emerald-500" />{j.type}</span>
                  <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5 text-emerald-500" />{j.budget}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-emerald-500" />{j.duration}</span>
                  <span className="flex items-center gap-1"><Send className="w-3.5 h-3.5 text-emerald-500" />{j.proposals} proposals</span>
                </div>

                <button
                  onClick={() => setSelectedJob(j)}
                  className="btn-primary px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5"
                >
                  <span>Submit Proposal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </section>

      {/* Submit Proposal Modal */}
      {selectedJob && (
        <div
          className="modal-backdrop active"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedJob(null);
          }}
        >
          <div className="modal-content p-7">
            <div className="flex items-start justify-between mb-5 pb-4 border-b" style={{ borderColor: 'var(--border)' }}>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-emerald-500">
                    <Send className="w-4 h-4 text-white" />
                  </div>
                  <div className="getidone-text text-sm dark"><span className="geti">Geti</span><span className="done">Done</span></div>
                </div>
                <div className="text-[11px] font-bold tracking-widest uppercase mb-1" style={{ color: 'var(--primary)' }}>NEW PROPOSAL</div>
                <h2 className="font-extrabold text-2xl" style={{ fontFamily: "'Sora', sans-serif" }}>Submit Proposal</h2>
                <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>Applying to: <span className="font-bold">{selectedJob.title}</span></p>
              </div>
              <button
                onClick={() => setSelectedJob(null)}
                className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleProposalSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold tracking-wider mb-1.5 block uppercase" style={{ color: 'var(--muted)' }}>YOUR RATE ($)</label>
                  <input
                    type="number"
                    value={proposalRate}
                    onChange={e => setProposalRate(e.target.value ? Number(e.target.value) : '')}
                    className="w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none"
                    style={{ borderColor: 'var(--border)', background: 'var(--bg-alt)' }}
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold tracking-wider mb-1.5 block uppercase" style={{ color: 'var(--muted)' }}>EST. DURATION (DAYS)</label>
                  <input
                    type="number"
                    value={proposalDays}
                    onChange={e => setProposalDays(e.target.value ? Number(e.target.value) : '')}
                    className="w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none"
                    style={{ borderColor: 'var(--border)', background: 'var(--bg-alt)' }}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold tracking-wider mb-1.5 block uppercase" style={{ color: 'var(--muted)' }}>COVER LETTER</label>
                <textarea
                  rows={5}
                  placeholder="Hi! I reviewed your requirements and I believe my experience makes me a great fit for this project..."
                  value={proposalCover}
                  onChange={e => setProposalCover(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none resize-none"
                  style={{ borderColor: 'var(--border)', background: 'var(--bg-alt)' }}
                  required
                />
              </div>

              <div className="p-4 rounded-xl flex items-center gap-3 bg-[var(--bg-alt)]">
                <Zap className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <p className="text-xs" style={{ color: 'var(--muted)' }}>
                  Submitting this proposal will cost <span className="font-bold" style={{ color: 'var(--text)' }}>16 Connects</span>. You have 64 connects remaining.
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedJob(null)}
                  className="flex-1 btn-ghost py-3 rounded-xl text-sm font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 btn-primary py-3 rounded-xl text-sm font-bold"
                >
                  Submit Proposal
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
