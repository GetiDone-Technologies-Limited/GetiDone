'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import {
  Star, Trophy, Handshake, MessageSquare, Search, ChevronDown,
  Check, X, Share2, CornerDownRight, Info, MessageCircle
} from 'lucide-react';
import { useAuthStore } from '@/store/auth.store';

interface ReviewItem {
  id: number;
  client: string;
  clientAvatar: string;
  project: string;
  rating: number;
  date: string;
  text: string;
  replied: boolean;
  reply?: string;
}

const initialReviews: ReviewItem[] = [
  {
    id: 1,
    client: 'John Carter',
    clientAvatar: 'https://picsum.photos/seed/johnavatar/100/100.jpg',
    project: 'E-commerce Platform Redesign',
    rating: 5,
    date: 'Dec 12, 2024',
    text: "Daniel is an exceptional developer. He took our complex requirements, simplified them, and delivered an outstanding platform ahead of schedule. His communication was top-notch. Will definitely rehire.",
    replied: true,
    reply: "Thank you John! I really enjoyed working on this project. Looking forward to collaborating again."
  },
  {
    id: 2,
    client: 'Sarah Kim',
    clientAvatar: 'https://picsum.photos/seed/sarah/100/100.jpg',
    project: 'Real-Time Analytics Dashboard',
    rating: 5,
    date: 'Dec 05, 2024',
    text: "Great work on the backend API integration. Very professional and easy to collaborate with. Highly recommended for complex Node.js projects.",
    replied: false
  },
  {
    id: 3,
    client: 'Marcus Lee',
    clientAvatar: 'https://picsum.photos/seed/marcus/100/100.jpg',
    project: 'Mobile Banking App UI',
    rating: 4,
    date: 'Nov 28, 2024',
    text: "Good work overall. The design was clean and modern. There were some minor delays in the initial wireframes, but the final result was great.",
    replied: true,
    reply: "Thanks for the feedback Marcus! I've streamlined my wireframing process to ensure faster delivery in the future."
  },
  {
    id: 4,
    client: 'TechNova Inc.',
    clientAvatar: 'https://picsum.photos/seed/technovalogo/100/100.jpg',
    project: 'API Integration & Backend',
    rating: 5,
    date: 'Nov 15, 2024',
    text: "Excellent freelancer to work with. Clear requirements and prompt communication. Daniel delivered exactly what we needed for our scalable architecture.",
    replied: false
  }
];

interface ToastState {
  title: string;
  msg: string;
  visible: boolean;
}

export default function ReviewsPage() {
  const { user } = useAuthStore();
  const [reviewsList, setReviewsList] = useState<ReviewItem[]>(initialReviews);
  const [activeFilter, setActiveFilter] = useState<'all' | '5' | '4' | 'replied'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [replyingReview, setReplyingReview] = useState<ReviewItem | null>(null);
  const [replyText, setReplyText] = useState('');
  const [toastState, setToastState] = useState<ToastState>({ title: '', msg: '', visible: false });
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (title: string, msg: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToastState({ title, msg, visible: true });
    toastTimer.current = setTimeout(() => setToastState(t => ({ ...t, visible: false })), 3000);
  };

  const handlePostReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyingReview || !replyText.trim()) return;

    setReviewsList(prev => prev.map(r => r.id === replyingReview.id ? {
      ...r,
      replied: true,
      reply: replyText.trim()
    } : r));

    showToast('Reply Posted', `Your response to ${replyingReview.client} has been published`);
    setReplyingReview(null);
    setReplyText('');
  };

  const filteredReviews = reviewsList.filter(r => {
    const q = searchQuery.toLowerCase();
    const matchSearch = !q || r.client.toLowerCase().includes(q) || r.project.toLowerCase().includes(q) || r.text.toLowerCase().includes(q);
    if (!matchSearch) return false;

    if (activeFilter === 'all') return true;
    if (activeFilter === 'replied') return r.replied;
    return r.rating === parseInt(activeFilter);
  });

  return (
    <div className="space-y-8 pb-8">
      {/* Page Header */}
      <section className="fade-up">
        <div className="flex items-center gap-2 mb-2 text-xs" style={{ color: 'var(--muted)' }}>
          <Link href="/freelancer" className="hover:text-emerald-600 transition-colors">Dashboard</Link>
          <ChevronDown className="w-3 h-3 -rotate-90" />
          <span className="font-semibold" style={{ color: 'var(--text)' }}>Reviews & Feedback</span>
        </div>

        <div className="flex items-end justify-between flex-wrap gap-4 mb-6">
          <div>
            <h1 className="font-extrabold text-4xl tracking-tight" style={{ fontFamily: "'Sora', sans-serif", color: 'var(--text)' }}>
              Reviews & Feedback<span style={{ color: 'var(--primary)' }}>.</span>
            </h1>
            <p className="text-sm mt-1.5" style={{ color: 'var(--muted)' }}>
              See what clients are saying about your work and manage public responses.
            </p>
          </div>
        </div>

        {/* Stats Mini Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Overall Rating */}
          <div className="gd-card gd-stat-card p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: 'var(--muted)' }}>OVERALL RATING</span>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(245,158,11,0.12)', color: 'var(--warning)' }}>
                <Star className="w-4 h-4 fill-current" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <div className="text-3xl font-extrabold tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>4.9</div>
              <span className="text-sm font-semibold" style={{ color: 'var(--muted)' }}>/ 5.0</span>
            </div>
            <div className="text-[11px] mt-1" style={{ color: 'var(--soft)' }}>Based on 32 reviews</div>
          </div>

          {/* 5-Star Reviews */}
          <div className="gd-card gd-stat-card p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: 'var(--muted)' }}>5-STAR REVIEWS</span>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(16,185,129,0.12)', color: 'var(--primary)' }}>
                <Trophy className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold tracking-tight text-emerald-600" style={{ fontFamily: "'Sora', sans-serif" }}>
              28
            </div>
            <div className="text-[11px] mt-1" style={{ color: 'var(--soft)' }}>88% of total reviews</div>
          </div>

          {/* Repeat Clients */}
          <div className="gd-card gd-stat-card p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: 'var(--muted)' }}>REPEAT CLIENTS</span>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(20,184,166,0.12)', color: 'var(--secondary)' }}>
                <Handshake className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>
              12
            </div>
            <div className="text-[11px] mt-1" style={{ color: 'var(--soft)' }}>Clients who returned</div>
          </div>

          {/* Response Rate */}
          <div className="gd-card gd-stat-card p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: 'var(--muted)' }}>RESPONSE RATE</span>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(132,204,22,0.12)', color: 'var(--accent)' }}>
                <MessageSquare className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>
              85%
            </div>
            <div className="text-[11px] mt-1" style={{ color: 'var(--soft)' }}>Reviews you replied to</div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 fade-up">
        {/* Left Column (Reviews Feed & Filters) */}
        <div className="lg:col-span-2 space-y-4">
          {/* Search & Filter Controls */}
          <div className="gd-card p-4 space-y-4">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-1 p-1 rounded-xl" style={{ background: 'var(--bg-alt)' }}>
                {(['all', '5', '4', 'replied'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
                      activeFilter === filter ? 'bg-[var(--sidebar)] text-white shadow-sm' : 'text-[var(--muted)] hover:text-[var(--text)]'
                    }`}
                  >
                    {filter === 'all' ? 'All Reviews' : filter === 'replied' ? 'Replied' : `${filter} Stars`}
                  </button>
                ))}
              </div>

              <div className="text-xs" style={{ color: 'var(--muted)' }}>
                Showing <span className="font-bold" style={{ color: 'var(--text)' }}>{filteredReviews.length}</span> reviews
              </div>
            </div>

            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--soft)' }} />
              <input
                type="text"
                placeholder="Search reviews by client, project, or content..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="search-input w-full pl-11 pr-4 py-2.5 rounded-xl text-sm"
              />
            </div>
          </div>

          {/* Reviews List */}
          <div className="space-y-4">
            {filteredReviews.length === 0 ? (
              <div className="gd-card p-12 text-center">
                <Star className="w-10 h-10 mx-auto mb-3 text-[var(--soft)]" />
                <p className="text-sm font-semibold" style={{ color: 'var(--muted)' }}>No reviews found matching criteria</p>
              </div>
            ) : (
              filteredReviews.map((r) => (
                <div key={r.id} className="gd-card p-6 flex flex-col justify-between transition-all hover:border-emerald-500/40">
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <img src={r.clientAvatar} className="w-12 h-12 rounded-full object-cover" alt={r.client} />
                        <div>
                          <div className="font-bold text-sm" style={{ color: 'var(--text)' }}>{r.client}</div>
                          <div className="text-xs font-medium" style={{ color: 'var(--muted)' }}>{r.project}</div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="flex gap-1 mb-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${star <= r.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-100'}`}
                            />
                          ))}
                        </div>
                        <div className="text-[11px]" style={{ color: 'var(--soft)' }}>{r.date}</div>
                      </div>
                    </div>

                    <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text)' }}>{r.text}</p>

                    {/* Freelancer Response Block */}
                    {r.replied && (
                      <div className="p-4 rounded-xl border mt-4 space-y-2" style={{ borderColor: 'var(--border)', background: 'var(--bg-alt)' }}>
                        <div className="flex items-center gap-2 text-xs font-bold" style={{ color: 'var(--primary)' }}>
                          <CornerDownRight className="w-3.5 h-3.5" />
                          <span>Your Response</span>
                        </div>
                        <p className="text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>{r.reply}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-4 mt-4 border-t" style={{ borderColor: 'var(--border)' }}>
                    <button
                      onClick={() => showToast('Share', 'Review link copied to clipboard')}
                      className="btn-ghost px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Share</span>
                    </button>

                    {!r.replied ? (
                      <button
                        onClick={() => {
                          setReplyingReview(r);
                          setReplyText('');
                        }}
                        className="btn-primary px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Reply</span>
                      </button>
                    ) : (
                      <button
                        disabled
                        className="btn-ghost px-4 py-2 rounded-lg text-xs font-bold opacity-60 cursor-not-allowed"
                      >
                        Replied
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column (Rating Breakdown & Metrics) */}
        <div className="space-y-6">
          {/* Rating Breakdown */}
          <div className="gd-card p-6">
            <h3 className="font-bold text-base mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>Rating Breakdown</h3>
            <div className="space-y-3">
              {[
                { stars: '5★', percent: 88, count: 28, color: 'var(--primary)' },
                { stars: '4★', percent: 9, count: 3, color: 'var(--accent)' },
                { stars: '3★', percent: 3, count: 1, color: 'var(--warning)' },
                { stars: '2★', percent: 0, count: 0, color: 'var(--danger)' },
                { stars: '1★', percent: 0, count: 0, color: 'var(--danger)' },
              ].map((item) => (
                <div key={item.stars} className="flex items-center gap-3">
                  <span className="text-xs font-bold w-6">{item.stars}</span>
                  <div className="flex-1 bg-[var(--bg-alt)] h-2 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${item.percent}%`, background: item.color }} />
                  </div>
                  <span className="text-xs font-bold w-6 text-right" style={{ color: 'var(--muted)' }}>{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="gd-card p-6">
            <h3 className="font-bold text-base mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>Performance Metrics</h3>
            <div className="space-y-4">
              {[
                { label: 'Quality of Work', score: '5.0', percent: 100 },
                { label: 'Communication', score: '4.8', percent: 96 },
                { label: 'On-Time Delivery', score: '4.9', percent: 98 },
                { label: 'Value for Money', score: '4.9', percent: 98 },
              ].map((metric) => (
                <div key={metric.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold" style={{ color: 'var(--muted)' }}>{metric.label}</span>
                    <span className="font-bold" style={{ color: 'var(--text)' }}>{metric.score}</span>
                  </div>
                  <div className="bg-[var(--bg-alt)] h-2 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-emerald-500" style={{ width: `${metric.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Reply Modal */}
      {replyingReview && (
        <div
          className="modal-backdrop active"
          onClick={(e) => {
            if (e.target === e.currentTarget) setReplyingReview(null);
          }}
        >
          <div className="modal-content p-7">
            <div className="flex items-start justify-between mb-5 pb-4 border-b" style={{ borderColor: 'var(--border)' }}>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-emerald-500">
                    <MessageCircle className="w-4 h-4 text-white" />
                  </div>
                  <div className="getidone-text text-sm dark"><span className="geti">Geti</span><span className="done">Done</span></div>
                </div>
                <div className="text-[11px] font-bold tracking-widest uppercase mb-1" style={{ color: 'var(--primary)' }}>REPLY TO REVIEW</div>
                <h2 className="font-extrabold text-2xl" style={{ fontFamily: "'Sora', sans-serif" }}>Leave a Response</h2>
                <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>Replying to <span className="font-bold" style={{ color: 'var(--text)' }}>{replyingReview.client}</span></p>
              </div>
              <button
                onClick={() => setReplyingReview(null)}
                className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePostReply} className="space-y-4">
              <div>
                <label className="text-xs font-bold tracking-wider mb-1.5 block uppercase" style={{ color: 'var(--muted)' }}>YOUR PUBLIC REPLY</label>
                <textarea
                  rows={5}
                  required
                  placeholder="Thank you for the kind words! It was a pleasure working with you on this project..."
                  value={replyText}
                  onChange={e => setReplyText(e.target.value)}
                  className="w-full p-4 rounded-xl text-sm border focus:outline-none resize-none"
                  style={{ borderColor: 'var(--border)', background: 'var(--bg-alt)' }}
                />
              </div>

              <div className="p-4 rounded-xl flex items-center gap-3" style={{ background: 'var(--bg-alt)' }}>
                <Info className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <p className="text-xs" style={{ color: 'var(--muted)' }}>
                  Your reply will be publicly displayed on your profile. Keep it professional and polite.
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setReplyingReview(null)}
                  className="flex-1 btn-ghost py-3 rounded-xl text-sm font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 btn-primary py-3 rounded-xl text-sm font-bold"
                >
                  Post Reply
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
