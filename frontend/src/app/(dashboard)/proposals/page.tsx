'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import {
  Send, Video, Handshake, XCircle, Search, ChevronDown,
  DollarSign, Clock, MessageSquare, Trash2, X, CheckCircle2,
  Check, FileText, Search as SearchIcon
} from 'lucide-react';
import { useAuthStore } from '@/store/auth.store';

type ProposalStatus = 'active' | 'interview' | 'hired' | 'declined';

interface ProposalItem {
  id: number;
  jobTitle: string;
  client: string;
  clientAvatar: string;
  verified: boolean;
  status: ProposalStatus;
  submitted: string;
  proposedRate: string;
  proposedDuration: string;
  coverLetter: string;
  jobDesc: string;
}

const initialProposals: ProposalItem[] = [
  {
    id: 1,
    jobTitle: 'E-commerce Platform Redesign',
    client: 'TechNova Inc.',
    clientAvatar: 'https://picsum.photos/seed/technovalogo/100/100.jpg',
    verified: true,
    status: 'interview',
    submitted: 'Dec 10, 2024',
    proposedRate: '$80/hr',
    proposedDuration: '40 days',
    coverLetter: "Hi TechNova team, I reviewed your e-commerce redesign requirements and I believe my 7+ years of experience in React and Next.js make me a great fit. I recently worked on a similar platform for Paystack, increasing their conversion rate by 35%. I can deliver this ahead of schedule.",
    jobDesc: "We are looking for an experienced Frontend Developer to redesign our e-commerce platform. Must be proficient in React, Next.js, and Tailwind CSS."
  },
  {
    id: 2,
    jobTitle: 'Backend API Developer Needed',
    client: 'Innovatech',
    clientAvatar: 'https://picsum.photos/seed/innovatech/100/100.jpg',
    verified: true,
    status: 'active',
    submitted: 'Dec 12, 2024',
    proposedRate: '$70/hr',
    proposedDuration: '3 months',
    coverLetter: "Hello, I have extensive experience building scalable REST APIs with Node.js and Express. I can integrate Stripe and set up the AWS infrastructure you need. Let's chat about the technical requirements.",
    jobDesc: "Need a robust RESTful API for a mobile app. Must integrate Stripe and handle high-traffic loads efficiently."
  },
  {
    id: 3,
    jobTitle: 'Real-time Analytics Dashboard',
    client: 'Frame.io',
    clientAvatar: 'https://picsum.photos/seed/frameio/100/100.jpg',
    verified: false,
    status: 'active',
    submitted: 'Dec 14, 2024',
    proposedRate: '$12,000',
    proposedDuration: '30 days',
    coverLetter: "I specialize in building real-time dashboards using WebSockets and React. I can create a highly responsive interface for your SaaS platform.",
    jobDesc: "Build a real-time analytics dashboard to track user engagement and revenue metrics."
  },
  {
    id: 4,
    jobTitle: 'SEO Specialist for SaaS',
    client: 'Flutterwave',
    clientAvatar: 'https://picsum.photos/seed/flutterwave/100/100.jpg',
    verified: true,
    status: 'declined',
    submitted: 'Nov 28, 2024',
    proposedRate: '$55/hr',
    proposedDuration: 'Ongoing',
    coverLetter: "I am a data-driven SEO strategist. I can help increase your organic traffic.",
    jobDesc: "We need an expert to handle technical SEO, keyword research, and content optimization."
  },
  {
    id: 5,
    jobTitle: 'React Native App Development',
    client: 'Paystack',
    clientAvatar: 'https://picsum.photos/seed/paystack/100/100.jpg',
    verified: true,
    status: 'hired',
    submitted: 'Nov 15, 2024',
    proposedRate: '$15,000',
    proposedDuration: '60 days',
    coverLetter: "I have built multiple cross-platform apps. I can integrate biometric auth and push notifications seamlessly.",
    jobDesc: "Build a cross-platform mobile app from scratch using React Native."
  }
];

interface ToastState {
  title: string;
  msg: string;
  visible: boolean;
}

export default function ProposalsPage() {
  const [proposalsList, setProposalsList] = useState<ProposalItem[]>(initialProposals);
  const [activeFilter, setActiveFilter] = useState<'all' | ProposalStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProposal, setSelectedProposal] = useState<ProposalItem | null>(null);
  const [toastState, setToastState] = useState<ToastState>({ title: '', msg: '', visible: false });
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (title: string, msg: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToastState({ title, msg, visible: true });
    toastTimer.current = setTimeout(() => setToastState(t => ({ ...t, visible: false })), 3000);
  };

  const withdrawProposal = (id: number) => {
    const target = proposalsList.find(p => p.id === id);
    if (target) {
      setProposalsList(prev => prev.filter(p => p.id !== id));
      if (selectedProposal?.id === id) setSelectedProposal(null);
      showToast('Proposal Withdrawn', `Your proposal for ${target.jobTitle} has been withdrawn`);
    }
  };

  const filteredProposals = proposalsList.filter(p => {
    const q = searchQuery.toLowerCase();
    const matchSearch = !q || p.jobTitle.toLowerCase().includes(q) || p.client.toLowerCase().includes(q);
    const matchStatus = activeFilter === 'all' || p.status === activeFilter;
    return matchSearch && matchStatus;
  });

  const counts = {
    active: proposalsList.filter(p => p.status === 'active').length,
    interview: proposalsList.filter(p => p.status === 'interview').length,
    hired: proposalsList.filter(p => p.status === 'hired').length,
    declined: proposalsList.filter(p => p.status === 'declined').length,
  };

  const statusConfig: Record<ProposalStatus, { bg: string; text: string; label: string }> = {
    active: { bg: 'rgba(20,184,166,0.12)', text: 'var(--secondary)', label: 'Active' },
    interview: { bg: 'rgba(245,158,11,0.12)', text: 'var(--warning)', label: 'Interview' },
    hired: { bg: 'rgba(132,204,22,0.12)', text: 'var(--accent)', label: 'Hired' },
    declined: { bg: 'rgba(239,68,68,0.12)', text: 'var(--danger)', label: 'Declined' },
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Page Header */}
      <section className="fade-up">
        <div className="flex items-center gap-2 mb-2 text-xs" style={{ color: 'var(--muted)' }}>
          <Link href="/freelancer" className="hover:text-emerald-600 transition-colors">Dashboard</Link>
          <ChevronDown className="w-3 h-3 -rotate-90" />
          <span className="font-semibold" style={{ color: 'var(--text)' }}>My Proposals</span>
        </div>

        <div className="flex items-end justify-between flex-wrap gap-4 mb-6">
          <div>
            <h1 className="font-extrabold text-4xl tracking-tight" style={{ fontFamily: "'Sora', sans-serif", color: 'var(--text)' }}>
              My Proposals<span style={{ color: 'var(--primary)' }}>.</span>
            </h1>
            <p className="text-sm mt-1.5" style={{ color: 'var(--muted)' }}>
              Track the status of your submitted proposals and interview invitations.
            </p>
          </div>

          <Link href="/jobs/search" className="btn-primary px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2">
            <SearchIcon className="w-4 h-4" />
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
              <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: 'var(--muted)' }}>ACTIVE</span>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(16,185,129,0.12)', color: 'var(--primary)' }}>
                <Send className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>{counts.active}</div>
            <div className="text-[11px] mt-1" style={{ color: 'var(--soft)' }}>Currently under review</div>
          </div>

          <div
            onClick={() => setActiveFilter('interview')}
            className="gd-card gd-stat-card p-5 cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: 'var(--muted)' }}>INTERVIEWS</span>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(245,158,11,0.12)', color: 'var(--warning)' }}>
                <Video className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>{counts.interview}</div>
            <div className="text-[11px] mt-1" style={{ color: 'var(--soft)' }}>Clients want to chat</div>
          </div>

          <div
            onClick={() => setActiveFilter('all')}
            className="gd-card gd-stat-card p-5 cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: 'var(--muted)' }}>HIRED</span>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(132,204,22,0.12)', color: 'var(--accent)' }}>
                <Handshake className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>{counts.hired}</div>
            <div className="text-[11px] mt-1" style={{ color: 'var(--soft)' }}>Converted to contracts</div>
          </div>

          <div
            onClick={() => setActiveFilter('declined')}
            className="gd-card gd-stat-card p-5 cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: 'var(--muted)' }}>DECLINED</span>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(239,68,68,0.12)', color: 'var(--danger)' }}>
                <XCircle className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>{counts.declined}</div>
            <div className="text-[11px] mt-1" style={{ color: 'var(--soft)' }}>Not selected by client</div>
          </div>
        </div>
      </section>

      {/* Filter Tabs & Search */}
      <section className="space-y-4 fade-up">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          {/* Filter Tabs */}
          <div className="flex items-center gap-1 p-1 rounded-xl" style={{ background: 'var(--bg-alt)' }}>
            {(['all', 'active', 'interview', 'declined'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
                  activeFilter === tab ? 'bg-[var(--sidebar)] text-white shadow-sm' : 'text-[var(--muted)] hover:text-[var(--text)]'
                }`}
              >
                {tab === 'all' ? 'All Proposals' : tab}
              </button>
            ))}
          </div>

          <div className="text-xs" style={{ color: 'var(--muted)' }}>
            Showing <span className="font-bold" style={{ color: 'var(--text)' }}>{filteredProposals.length}</span> proposals
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--soft)' }} />
          <input
            type="text"
            placeholder="Search proposals by title, client..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="search-input w-full pl-11 pr-4 py-2.5 rounded-xl text-sm"
          />
        </div>
      </section>

      {/* Proposals List Feed */}
      <section className="space-y-4 fade-up">
        {filteredProposals.length === 0 ? (
          <div className="gd-card p-12 text-center">
            <FileText className="w-10 h-10 mx-auto mb-3 text-[var(--soft)]" />
            <p className="text-sm font-semibold" style={{ color: 'var(--muted)' }}>No proposals found</p>
          </div>
        ) : (
          filteredProposals.map((p) => {
            const sc = statusConfig[p.status];
            return (
              <div
                key={p.id}
                onClick={() => setSelectedProposal(p)}
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
                            <span title="Verified Client">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500/20" />
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] mt-0.5" style={{ color: 'var(--soft)' }}>Submitted on {p.submitted}</div>
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

                  <h3 className="font-extrabold text-lg mb-2" style={{ fontFamily: "'Sora', sans-serif" }}>{p.jobTitle}</h3>
                  <p className="text-sm mb-4 line-clamp-2" style={{ color: 'var(--muted)' }}>{p.coverLetter}</p>
                </div>

                {/* Card Footer */}
                <div className="flex items-center justify-between pt-4 border-t flex-wrap gap-4" style={{ borderColor: 'var(--border)' }}>
                  <div className="flex items-center gap-4 text-xs font-semibold" style={{ color: 'var(--muted)' }}>
                    <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5 text-emerald-500" />{p.proposedRate}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-emerald-500" />{p.proposedDuration}</span>
                  </div>

                  <div className="flex gap-2">
                    {p.status === 'interview' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          showToast('Message', `Opening chat with ${p.client}`);
                        }}
                        className="btn-primary px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Message Client</span>
                      </button>
                    )}

                    {p.status === 'active' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          withdrawProposal(p.id);
                        }}
                        className="btn-danger px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Withdraw</span>
                      </button>
                    )}

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProposal(p);
                      }}
                      className="btn-ghost px-4 py-2 rounded-lg text-xs font-bold"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </section>

      {/* Proposal Details Modal */}
      {selectedProposal && (
        <div
          className="modal-backdrop active"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedProposal(null);
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
                <div className="text-[11px] font-bold tracking-widest uppercase mb-1" style={{ color: 'var(--primary)' }}>
                  PROPOSAL #{1000 + selectedProposal.id}
                </div>
                <h2 className="font-extrabold text-2xl" style={{ fontFamily: "'Sora', sans-serif" }}>{selectedProposal.jobTitle}</h2>
              </div>
              <button
                onClick={() => setSelectedProposal(null)}
                className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 rounded-xl" style={{ background: 'var(--bg-alt)' }}>
                <img src={selectedProposal.clientAvatar} className="w-12 h-12 rounded-full object-cover" alt={selectedProposal.client} />
                <div>
                  <div className="font-bold text-sm flex items-center gap-1.5">
                    {selectedProposal.client}
                    {selectedProposal.verified && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                  </div>
                  <div className="text-xs" style={{ color: 'var(--muted)' }}>Submitted on {selectedProposal.submitted}</div>
                </div>
                <div className="ml-auto">
                  <span
                    className="text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5"
                    style={{ background: statusConfig[selectedProposal.status].bg, color: statusConfig[selectedProposal.status].text }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    {statusConfig[selectedProposal.status].label}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl border" style={{ borderColor: 'var(--border)' }}>
                  <div className="text-[10px] font-bold tracking-wider uppercase mb-1" style={{ color: 'var(--muted)' }}>PROPOSED RATE</div>
                  <div className="font-extrabold text-sm" style={{ fontFamily: "'Sora', sans-serif" }}>{selectedProposal.proposedRate}</div>
                </div>
                <div className="p-3.5 rounded-xl border" style={{ borderColor: 'var(--border)' }}>
                  <div className="text-[10px] font-bold tracking-wider uppercase mb-1" style={{ color: 'var(--muted)' }}>EST. DURATION</div>
                  <div className="font-extrabold text-sm" style={{ fontFamily: "'Sora', sans-serif" }}>{selectedProposal.proposedDuration}</div>
                </div>
              </div>

              <div className="p-4 rounded-xl border" style={{ borderColor: 'var(--border)' }}>
                <div className="text-[10px] font-bold tracking-wider uppercase mb-2" style={{ color: 'var(--muted)' }}>ORIGINAL JOB DESCRIPTION</div>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>{selectedProposal.jobDesc}</p>
              </div>

              <div className="p-4 rounded-xl border" style={{ borderColor: 'var(--border)' }}>
                <div className="text-[10px] font-bold tracking-wider uppercase mb-2" style={{ color: 'var(--muted)' }}>YOUR COVER LETTER</div>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text)' }}>{selectedProposal.coverLetter}</p>
              </div>

              <div className="flex gap-3 pt-2">
                {selectedProposal.status === 'active' && (
                  <button
                    onClick={() => withdrawProposal(selectedProposal.id)}
                    className="flex-1 btn-danger py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Withdraw Proposal</span>
                  </button>
                )}

                {selectedProposal.status === 'interview' && (
                  <button
                    onClick={() => {
                      setSelectedProposal(null);
                      showToast('Message', `Opening chat with ${selectedProposal.client}`);
                    }}
                    className="flex-1 btn-primary py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Message Client</span>
                  </button>
                )}

                <button
                  onClick={() => setSelectedProposal(null)}
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
