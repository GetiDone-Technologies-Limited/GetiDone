'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import {
  CheckCircle2, MapPin, Clock, DollarSign, Star, Send, MessageSquare,
  Bookmark, MoreHorizontal, Briefcase, Calendar, ShieldCheck, Award,
  ThumbsUp, Share2, Plus, ExternalLink, X, Check, Edit3, Eye, User
} from 'lucide-react';
import { useAuthStore } from '@/store/auth.store';

interface ToastState {
  title: string;
  msg: string;
  visible: boolean;
}

export default function ProfilePage() {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'portfolio' | 'reviews' | 'employment'>('overview');
  const [toastState, setToastState] = useState<ToastState>({ title: '', msg: '', visible: false });
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (title: string, msg: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToastState({ title, msg, visible: true });
    toastTimer.current = setTimeout(() => setToastState(t => ({ ...t, visible: false })), 3200);
  };

  const isClientRole = user?.role === 'CLIENT';

  return (
    <div className="space-y-6 pb-8">
      {/* Profile Header Card */}
      <div className="gd-card overflow-hidden fade-up">
        {/* Cover Photo Banner */}
        <div className="h-64 sm:h-72 bg-slate-900 relative overflow-hidden">
          <img
            src="https://picsum.photos/seed/profilecover/1600/500"
            className="w-full h-full object-cover opacity-80"
            alt="Cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
        </div>

        {/* Avatar Wrap */}
        <div className="flex flex-col items-center -mt-16 sm:-mt-20 relative z-10 px-6">
          <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full p-1.5 bg-white shadow-xl relative">
            <img
              src={user?.avatarUrl || 'https://picsum.photos/seed/danielbenson/200/200.jpg'}
              className="w-full h-full rounded-full object-cover"
              alt={user?.name || 'Daniel Benson'}
            />
          </div>
        </div>

        {/* Profile Info */}
        <div className="text-center px-6 pt-4 pb-6">
          <h1 className="text-3xl font-extrabold flex items-center justify-center gap-2" style={{ fontFamily: "'Sora', sans-serif" }}>
            <span>{user?.name || (isClientRole ? 'TechNova Inc.' : 'Daniel Benson')}</span>
            <CheckCircle2 className="w-6 h-6 text-emerald-500 fill-emerald-500/20" />
          </h1>

          <p className="text-base mt-1.5 max-w-2xl mx-auto" style={{ color: 'var(--muted)' }}>
            {isClientRole
              ? 'Pioneering next-generation enterprise SaaS and mobile application solutions.'
              : 'Senior Full Stack Developer specializing in scalable web applications, React ecosystem, and cloud architecture.'}
          </p>

          {/* Meta Details */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm font-medium mt-3" style={{ color: 'var(--muted)' }}>
            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-[var(--soft)]" /> Lagos, Nigeria</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-[var(--soft)]" /> Avg Response: &lt; 1hr</span>
            {!isClientRole && (
              <span className="flex items-center gap-1.5"><DollarSign className="w-4 h-4 text-emerald-600" /> Rate: $85/hr</span>
            )}
            <span className="flex items-center gap-1.5"><Star className="w-4 h-4 fill-amber-400 text-amber-400" /> 4.9 (32 reviews)</span>
          </div>

          {/* Actions Bar */}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <Link
              href="/settings"
              className="btn-primary px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit Profile</span>
            </Link>

            <button
              onClick={() => showToast('Share', 'Profile link copied to clipboard')}
              className="btn-ghost px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Profile</span>
            </button>

            <button
              onClick={() => showToast('Public View', 'Viewing profile as client sees it')}
              className="btn-ghost px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              <span>Preview</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center border-t px-4 flex-wrap" style={{ borderColor: 'var(--border)' }}>
          {(['overview', 'portfolio', 'reviews', 'employment'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3.5 text-sm font-bold capitalize transition-all border-b-2 ${
                activeTab === tab
                  ? 'border-[var(--primary)] text-[var(--primary)]'
                  : 'border-transparent text-[var(--muted)] hover:text-[var(--text)]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 fade-up">
        {/* Left Column: Intro, Skills, Verifications */}
        <div className="space-y-6">
          {/* Intro Card */}
          <div className="gd-card p-6">
            <h2 className="font-extrabold text-xl mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>Intro</h2>
            <div className="space-y-3.5 text-xs sm:text-sm font-medium">
              <div className="flex items-center gap-3">
                <Briefcase className="w-4 h-4 text-[var(--muted)]" />
                <span>{isClientRole ? 'Verified Enterprise Client' : 'Senior Full Stack Developer'}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[var(--muted)]" />
                <span>Based in Lagos, Nigeria</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-[var(--muted)]" />
                <span>Member since January 2021</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[var(--muted)]" />
                <span>Avg Response Time: Under 1 hour</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span className="text-emerald-600 font-bold">Available for new projects</span>
              </div>
            </div>
          </div>

          {/* Top Skills Card */}
          <div className="gd-card p-6">
            <h2 className="font-extrabold text-xl mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>
              {isClientRole ? 'Company Stats' : 'Top Skills'}
            </h2>
            {isClientRole ? (
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between py-2 border-b" style={{ borderColor: 'var(--border)' }}>
                  <span style={{ color: 'var(--muted)' }}>Total Spent</span>
                  <span className="font-extrabold">$142,500</span>
                </div>
                <div className="flex justify-between py-2 border-b" style={{ borderColor: 'var(--border)' }}>
                  <span style={{ color: 'var(--muted)' }}>Jobs Posted</span>
                  <span className="font-extrabold">28 Jobs</span>
                </div>
                <div className="flex justify-between py-2 border-b" style={{ borderColor: 'var(--border)' }}>
                  <span style={{ color: 'var(--muted)' }}>Hire Rate</span>
                  <span className="font-extrabold text-emerald-600">89%</span>
                </div>
                <div className="flex justify-between py-2">
                  <span style={{ color: 'var(--muted)' }}>Active Contracts</span>
                  <span className="font-extrabold">5 Active</span>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {[
                  { name: 'React & Next.js', pct: 95 },
                  { name: 'Node.js & Express', pct: 90 },
                  { name: 'TypeScript', pct: 85 },
                  { name: 'AWS & Cloud Infrastructure', pct: 80 },
                  { name: 'GraphQL & REST APIs', pct: 75 },
                ].map(skill => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span>{skill.name}</span>
                      <span style={{ color: 'var(--muted)' }}>{skill.pct}%</span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden bg-[var(--bg-alt)]">
                      <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full" style={{ width: `${skill.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Verifications Card */}
          <div className="gd-card p-6">
            <h2 className="font-extrabold text-xl mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>Verifications</h2>
            <div className="space-y-3">
              {[
                { label: 'Identity Verified', desc: 'Government ID confirmed' },
                { label: 'Payment Verified', desc: 'Escrow payment method active' },
                { label: 'Phone & Email Verified', desc: '2FA security enabled' },
              ].map(ver => (
                <div key={ver.label} className="flex items-center gap-3 p-2.5 rounded-xl bg-[var(--bg-alt)]">
                  <ShieldCheck className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <div>
                    <div className="text-xs font-bold">{ver.label}</div>
                    <div className="text-[10px]" style={{ color: 'var(--muted)' }}>{ver.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Work Feed / Timeline */}
        <div className="lg:col-span-2 space-y-6">
          {/* Milestone Completed Post */}
          <div className="gd-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={user?.avatarUrl || 'https://picsum.photos/seed/danielbenson/200/200.jpg'}
                  className="w-11 h-11 rounded-full object-cover"
                  alt="Avatar"
                />
                <div>
                  <div className="font-bold text-sm flex items-center gap-1.5">
                    <span>{user?.name || 'Daniel Benson'}</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div className="text-xs" style={{ color: 'var(--muted)' }}>Posted 3 days ago · Milestone Completed</div>
                </div>
              </div>
            </div>

            <p className="text-sm leading-relaxed" style={{ color: 'var(--text)' }}>
              Excited to announce the successful release of the <span className="font-bold">E-commerce Website Redesign</span> project! Delivered 100% on time with full unit testing and verified mobile responsiveness.
            </p>

            <img
              src="https://picsum.photos/seed/projectdemo/800/400"
              className="w-full h-64 object-cover rounded-xl border border-[var(--border)]"
              alt="Project Demo"
            />

            <div className="flex items-center justify-between pt-3 border-t text-xs font-semibold" style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}>
              <button onClick={() => showToast('Liked', 'Post liked')} className="flex items-center gap-1.5 hover:text-emerald-600">
                <ThumbsUp className="w-4 h-4" /> 24 Likes
              </button>
              <button onClick={() => showToast('Share', 'Link copied to clipboard')} className="flex items-center gap-1.5 hover:text-emerald-600">
                <Share2 className="w-4 h-4" /> Share Project
              </button>
            </div>
          </div>

          {/* Client Review Feature Card */}
          <div className="gd-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={user?.avatarUrl || 'https://picsum.photos/seed/danielbenson/200/200.jpg'}
                  className="w-11 h-11 rounded-full object-cover"
                  alt="Avatar"
                />
                <div>
                  <div className="font-bold text-sm flex items-center gap-1.5">
                    <span>{user?.name || 'Daniel Benson'}</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div className="text-xs" style={{ color: 'var(--muted)' }}>Posted 1 week ago · Verified Client Review</div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[var(--bg-alt)] border-l-4 border-l-emerald-500 space-y-2" style={{ borderTop: '1px solid var(--border)', borderRight: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star key={star} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
                <span className="text-xs font-bold ml-2">5.0 Star Rating</span>
              </div>
              <p className="text-xs italic leading-relaxed" style={{ color: 'var(--text)' }}>
                "Daniel is one of the most reliable engineers we have worked with on GetiDone. He built our full React architecture cleanly and handled all API edge cases."
              </p>
              <div className="text-[11px] font-semibold text-[var(--muted)]">— TechNova Product Lead</div>
            </div>
          </div>
        </div>
      </div>

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
