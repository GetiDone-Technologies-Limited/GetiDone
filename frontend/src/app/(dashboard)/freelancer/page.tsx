'use client';

import { useState, useRef } from 'react';
import {
  DollarSign, Send, FileText, Zap, Search, Eye, EyeOff, ArrowUpRight,
  CheckCircle2, MessageSquare, Clock, Plus, X, Check, TrendingUp,
  FileSignature, ChevronRight, Award, ShieldCheck
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts';
import Link from 'next/link';
import { useAuthStore } from '@/store/auth.store';
import { useUIStore } from '@/store/ui.store';

/* ==================== MOCK CHART DATA ==================== */
const earningsTrendData = [
  { month: 'Jul', earnings: 2800 },
  { month: 'Aug', earnings: 3200 },
  { month: 'Sep', earnings: 3100 },
  { month: 'Oct', earnings: 4100 },
  { month: 'Nov', earnings: 3900 },
  { month: 'Dec', earnings: 4560 },
];

const performanceData = [
  { day: 'Mon', views: 18, invites: 1 },
  { day: 'Tue', views: 24, invites: 2 },
  { day: 'Wed', views: 32, invites: 3 },
  { day: 'Thu', views: 28, invites: 1 },
  { day: 'Fri', views: 40, invites: 1 },
];

interface ToastState {
  title: string;
  msg: string;
  visible: boolean;
}

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

const recommendedJobs: JobProposal[] = [
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

export default function FreelancerDashboardPage() {
  const { user } = useAuthStore();
  const { balancesVisible, toggleBalancesVisible } = useUIStore();
  const [selectedJob, setSelectedJob] = useState<JobProposal | null>(null);
  const [proposalRate, setProposalRate] = useState<number | ''>(75);
  const [proposalDays, setProposalDays] = useState<number | ''>(30);
  const [proposalCover, setProposalCover] = useState('');
  const [toastState, setToastState] = useState<ToastState>({ title: '', msg: '', visible: false });
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (title: string, msg: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToastState({ title, msg, visible: true });
    toastTimer.current = setTimeout(() => setToastState(t => ({ ...t, visible: false })), 3200);
  };

  const handleProposalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!proposalCover) {
      showToast('Error', 'Please enter a cover letter');
      return;
    }
    showToast('Proposal Sent!', `Your proposal for ${selectedJob?.title || 'the job'} has been submitted`);
    setSelectedJob(null);
    setProposalCover('');
  };

  return (
    <div className="space-y-8 pb-8">
      {/* Greeting Section */}
      <section className="fade-up">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <h1 className="font-extrabold text-4xl tracking-tight" style={{ fontFamily: "'Sora', sans-serif", color: 'var(--text)' }}>
              Good morning, {user?.name?.split(' ')[0] || 'Daniel'}!<span style={{ color: 'var(--primary)' }}>.</span>
            </h1>
            <p className="text-sm mt-1.5" style={{ color: 'var(--muted)' }}>
              You have <span className="font-bold" style={{ color: 'var(--text)' }}>4 active proposals</span> and <span className="font-bold" style={{ color: 'var(--text)' }}>2 ongoing contracts</span>.
            </p>
          </div>

          <Link
            href="/jobs/search"
            className="btn-primary px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span>Browse New Jobs</span>
          </Link>
        </div>
      </section>

      {/* Stats Mini Grid (4 cards) */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 fade-up">
        <div className="gd-card gd-stat-card p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: 'var(--muted)' }}>EARNINGS (MONTH)</span>
            <button
              onClick={toggleBalancesVisible}
              className="p-1 rounded text-slate-400 hover:text-emerald-500 transition-colors"
              title={balancesVisible ? 'Hide Balances' : 'Show Balances'}
            >
              {balancesVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4 text-emerald-500" />}
            </button>
          </div>
          <div className="text-3xl font-extrabold tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>
            {balancesVisible ? '$4,560' : '•••••'}
          </div>
          <div className="text-[11px] mt-1" style={{ color: 'var(--soft)' }}>
            <span className="font-bold text-emerald-600">+12.4%</span> vs last month
          </div>
        </div>

        <div className="gd-card gd-stat-card p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: 'var(--muted)' }}>DONESCORE™ RANK</span>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-emerald-500/10 text-emerald-500">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold tracking-tight text-emerald-600 flex items-center gap-1.5" style={{ fontFamily: "'Sora', sans-serif" }}>
            <span>98.4%</span>
          </div>
          <div className="text-[11px] mt-1 font-extrabold text-emerald-600 flex items-center gap-1">
            <span>VERIFIED EXECUTIONER</span>
          </div>
        </div>

        <div className="gd-card gd-stat-card p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: 'var(--muted)' }}>ACTIVE CONTRACTS</span>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(20,184,166,0.12)', color: 'var(--secondary)' }}>
              <FileSignature className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>
            2
          </div>
          <div className="text-[11px] mt-1" style={{ color: 'var(--soft)' }}>1 milestone due soon</div>
        </div>

        <div className="gd-card gd-stat-card p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: 'var(--muted)' }}>ACTIVE PROPOSALS</span>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(245,158,11,0.12)', color: 'var(--warning)' }}>
              <Send className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>
            4
          </div>
          <div className="text-[11px] mt-1" style={{ color: 'var(--soft)' }}>2 awaiting response</div>
        </div>
      </section>

      {/* Charts Row */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 fade-up">
        {/* Earnings Overview AreaChart */}
        <div className="lg:col-span-2 gd-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-bold text-lg" style={{ fontFamily: "'Sora', sans-serif" }}>Earnings Overview</h2>
              <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>Last 6 months · Updated 2h ago</p>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="w-2.5 h-2.5 rounded bg-emerald-500" />
              <span style={{ color: 'var(--muted)' }}>Monthly Income</span>
            </div>
          </div>

          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={earningsTrendData}>
                <defs>
                  <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: 'var(--muted)', fontSize: 12 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: 'var(--muted)', fontSize: 12 }} tickFormatter={val => `$${val}`} />
                <Tooltip
                  contentStyle={{ background: '#0A0F0D', border: '1px solid #10B981', borderRadius: 12, color: 'white', fontSize: 12 }}
                  formatter={(val: number) => [`$${val}`, 'Earned']}
                />
                <Area type="monotone" dataKey="earnings" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorEarnings)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Profile Performance BarChart */}
        <div className="gd-card p-6 flex flex-col justify-between">
          <div>
            <h2 className="font-bold text-lg" style={{ fontFamily: "'Sora', sans-serif" }}>Profile Performance</h2>
            <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>Views vs Direct Invitations</p>
          </div>

          <div className="h-[170px] w-full my-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: 'var(--muted)', fontSize: 11 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: 'var(--muted)', fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ background: '#0A0F0D', border: '1px solid var(--border)', borderRadius: 12, color: 'white', fontSize: 11 }}
                />
                <Bar dataKey="views" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="invites" fill="#84CC16" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t" style={{ borderColor: 'var(--border)' }}>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-emerald-500" />
              <span style={{ color: 'var(--muted)' }}>Profile Views</span>
              <span className="ml-auto font-bold">142</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-lime-500" />
              <span style={{ color: 'var(--muted)' }}>Invitations</span>
              <span className="ml-auto font-bold">8</span>
            </div>
          </div>
        </div>
      </section>

      {/* DoneScore™ Performance & Telemetry Analysis Widget */}
      <section className="gd-card p-6 border shadow-sm fade-up" style={{ borderColor: 'rgba(16,185,129,0.3)', background: 'linear-gradient(135deg, var(--card) 0%, rgba(16,185,129,0.03) 100%)' }}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 pb-4 border-b" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-500 border border-emerald-500/30 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-extrabold text-xl" style={{ fontFamily: "'Sora', sans-serif" }}>DoneScore™ Performance Breakdown</h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500 text-white shadow-sm">TOP 2% TIER</span>
              </div>
              <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>
                Real-time telemetry analysis derived from Playwright QA test suites, Git commits, and milestone timeliness.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-2xl font-black text-emerald-500" style={{ fontFamily: "'Sora', sans-serif" }}>98.4 / 100</div>
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Verified Rank</div>
            </div>
          </div>
        </div>

        {/* 4 Pillars Breakdown Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl border bg-[var(--bg-alt)] space-y-2" style={{ borderColor: 'var(--border)' }}>
            <div className="flex items-center justify-between text-xs font-extrabold">
              <span className="text-[var(--text)]">1. QA Test Pass Rate</span>
              <span className="text-emerald-500 font-bold">99.2%</span>
            </div>
            <div className="progress-track h-2">
              <div className="progress-fill bg-emerald-500" style={{ width: '99.2%' }} />
            </div>
            <p className="text-[10px] text-[var(--muted)]">48 / 49 Playwright & Jest sandbox test suites passed on first run</p>
          </div>

          <div className="p-4 rounded-xl border bg-[var(--bg-alt)] space-y-2" style={{ borderColor: 'var(--border)' }}>
            <div className="flex items-center justify-between text-xs font-extrabold">
              <span className="text-[var(--text)]">2. Milestone Timeliness</span>
              <span className="text-teal-500 font-bold">97.8%</span>
            </div>
            <div className="progress-track h-2">
              <div className="progress-fill bg-teal-500" style={{ width: '97.8%' }} />
            </div>
            <p className="text-[10px] text-[var(--muted)]">Avg deliverable submitted 1.4 days before milestone deadline</p>
          </div>

          <div className="p-4 rounded-xl border bg-[var(--bg-alt)] space-y-2" style={{ borderColor: 'var(--border)' }}>
            <div className="flex items-center justify-between text-xs font-extrabold">
              <span className="text-[var(--text)]">3. Git Telemetry Sync</span>
              <span className="text-cyan-500 font-bold">98.0%</span>
            </div>
            <div className="progress-track h-2">
              <div className="progress-fill bg-cyan-500" style={{ width: '98.0%' }} />
            </div>
            <p className="text-[10px] text-[var(--muted)]">Active daily commit logging verified across 14 connected repos</p>
          </div>

          <div className="p-4 rounded-xl border bg-[var(--bg-alt)] space-y-2" style={{ borderColor: 'var(--border)' }}>
            <div className="flex items-center justify-between text-xs font-extrabold">
              <span className="text-[var(--text)]">4. Client Reviews</span>
              <span className="text-amber-500 font-bold">4.95 / 5</span>
            </div>
            <div className="progress-track h-2">
              <div className="progress-fill bg-amber-500" style={{ width: '99%' }} />
            </div>
            <p className="text-[10px] text-[var(--muted)]">24 5-star ratings with 100% recommendation score</p>
          </div>
        </div>
      </section>

      {/* Main Content Grid (Recommended Jobs + Active Contracts & Activity) */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 fade-up">
        {/* Left Column: Recommended Jobs (2 Cols) */}
        <div className="lg:col-span-2 gd-card p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-bold text-xl" style={{ fontFamily: "'Sora', sans-serif" }}>Recommended Jobs</h2>
              <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>Based on your skills (React, Next.js, Node.js, AWS)</p>
            </div>
            <Link href="/jobs/search" className="text-xs font-bold text-emerald-600 hover:underline">
              View All
            </Link>
          </div>

          <div className="space-y-4">
            {recommendedJobs.map((job) => (
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
                    onClick={() => setSelectedJob(job)}
                    className="btn-primary px-4 py-2 rounded-lg text-xs font-bold"
                  >
                    Submit Proposal
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Active Contracts & Recent Activity */}
        <div className="space-y-6 flex flex-col">
          {/* Active Contracts Card */}
          <div className="gd-card p-6">
            <h2 className="font-bold text-lg mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>Active Contracts</h2>
            <div className="space-y-4">
              <div className="p-4 rounded-xl" style={{ background: 'var(--bg-alt)' }}>
                <div className="flex items-center gap-2 mb-1.5">
                  <img src="https://picsum.photos/seed/technovalogo/100/100.jpg" className="w-6 h-6 rounded-full object-cover" alt="Client" />
                  <span className="text-xs font-bold" style={{ color: 'var(--text)' }}>TechNova Inc.</span>
                </div>
                <h3 className="font-bold text-sm mb-2">Real-Time Analytics Dashboard</h3>

                <div className="mb-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span style={{ color: 'var(--muted)' }}>Milestone 2 of 3</span>
                    <span className="font-bold text-emerald-600">65%</span>
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill bg-gradient-to-r from-emerald-500 to-teal-400" style={{ width: '65%' }} />
                  </div>
                </div>

                <div className="text-xs font-extrabold mt-2" style={{ fontFamily: "'Sora', sans-serif" }}>
                  $2,800 Escrow
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="gd-card p-6 flex-1">
            <h2 className="font-bold text-lg mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>Recent Activity</h2>
            <div className="space-y-3.5">
              {[
                { actor: 'TechNova Inc.', text: 'released $1,500 payment', time: '2 hours ago', icon: <Check className="w-3.5 h-3.5 text-emerald-500" /> },
                { actor: 'Innovatech', text: 'sent you a new message', time: 'Yesterday', icon: <MessageSquare className="w-3.5 h-3.5 text-teal-500" /> },
                { actor: 'You', text: 'submitted a proposal for API Developer', time: '2 days ago', icon: <Send className="w-3.5 h-3.5 text-lime-600" /> },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-3 text-xs p-2 rounded-xl hover:bg-[var(--bg-alt)] transition-colors">
                  <div className="w-8 h-8 rounded-full bg-[var(--bg-alt)] border flex items-center justify-center flex-shrink-0">
                    {item.icon}
                  </div>
                  <div className="pt-0.5">
                    <div>
                      <span className="font-bold">{item.actor}</span> {item.text}
                    </div>
                    <div className="text-[10px] mt-0.5" style={{ color: 'var(--soft)' }}>{item.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
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
                  rows={4}
                  placeholder="Hi! I reviewed your requirements and I believe my experience with React & Next.js aligns perfectly..."
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
