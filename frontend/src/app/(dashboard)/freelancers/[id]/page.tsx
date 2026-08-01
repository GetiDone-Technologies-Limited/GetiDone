'use client';

import { useState, useRef, use } from 'react';
import {
  CheckCircle2, MapPin, Clock, DollarSign, Star, Send, MessageSquare,
  Bookmark, MoreHorizontal, Briefcase, Calendar, ShieldCheck, Award,
  ThumbsUp, Share2, ArrowLeft, Check, X, Briefcase as JobIcon
} from 'lucide-react';
import Link from 'next/link';

interface ToastState {
  title: string;
  msg: string;
  visible: boolean;
}

export default function FreelancerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const freelancerId = resolvedParams.id;

  const [activeTab, setActiveTab] = useState<'overview' | 'portfolio' | 'reviews' | 'employment'>('overview');
  const [isSaved, setIsSaved] = useState(false);
  const [isHireModalOpen, setIsHireModalOpen] = useState(false);
  const [toastState, setToastState] = useState<ToastState>({ title: '', msg: '', visible: false });
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Hire Form State
  const [hireProject, setHireProject] = useState('');
  const [hireBudget, setHireBudget] = useState<number | ''>('');
  const [hireDeadline, setHireDeadline] = useState('');
  const [hireNote, setHireNote] = useState('');

  const showToast = (title: string, msg: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToastState({ title, msg, visible: true });
    toastTimer.current = setTimeout(() => setToastState(t => ({ ...t, visible: false })), 3200);
  };

  const handleSendOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hireProject || !hireBudget) {
      showToast('Error', 'Please select a project and enter budget');
      return;
    }
    setIsHireModalOpen(false);
    showToast('Offer Sent!', `Job offer sent to Daniel Benson for ${hireProject}`);
    setHireProject('');
    setHireBudget('');
    setHireDeadline('');
    setHireNote('');
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Back Link */}
      <div className="fade-up">
        <Link
          href="/freelancers"
          className="inline-flex items-center gap-2 text-xs font-bold text-[var(--muted)] hover:text-[var(--primary)] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Freelancers Directory</span>
        </Link>
      </div>

      {/* Profile Header Card */}
      <div className="gd-card overflow-hidden fade-up">
        {/* Cover Photo */}
        <div className="h-64 sm:h-72 bg-slate-200 relative overflow-hidden">
          <img
            src="https://picsum.photos/seed/danielcover/1600/500"
            className="w-full h-full object-cover"
            alt="Cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>

        {/* Avatar Wrap */}
        <div className="flex flex-col items-center -mt-16 sm:-mt-20 relative z-10 px-6">
          <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full p-1.5 bg-white shadow-xl relative">
            <img
              src="https://picsum.photos/seed/danielbenson/200/200.jpg"
              className="w-full h-full rounded-full object-cover"
              alt="Daniel Benson"
            />
          </div>
        </div>

        {/* Profile Info */}
        <div className="text-center px-6 pt-4 pb-6">
          <h1 className="text-3xl font-extrabold flex items-center justify-center gap-2" style={{ fontFamily: "'Sora', sans-serif" }}>
            <span>Daniel Benson</span>
            <CheckCircle2 className="w-6 h-6 text-emerald-500 fill-emerald-500 text-white" />
          </h1>

          <p className="text-base mt-1.5 max-w-2xl mx-auto" style={{ color: 'var(--muted)' }}>
            Senior Full Stack Developer specializing in scalable web applications, React architectures, and cloud services.
          </p>

          {/* Meta Details */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm font-medium mt-3" style={{ color: 'var(--muted)' }}>
            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-[var(--soft)]" /> Lagos, Nigeria</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-[var(--soft)]" /> Avg Response: &lt; 1hr</span>
            <span className="flex items-center gap-1.5"><DollarSign className="w-4 h-4 text-[var(--soft)]" /> Rate: $85/hr</span>
            <span className="flex items-center gap-1.5"><Star className="w-4 h-4 fill-amber-400 text-amber-400" /> 4.9 (32 reviews)</span>
          </div>

          {/* Actions Bar */}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <button
              onClick={() => setIsHireModalOpen(true)}
              className="btn-primary px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Invite to Job</span>
            </button>

            <button
              onClick={() => showToast('Message', 'Opening direct chat window')}
              className="btn-ghost px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Message</span>
            </button>

            <button
              onClick={() => {
                setIsSaved(!isSaved);
                showToast('Shortlist', !isSaved ? 'Daniel added to your saved talent' : 'Removed from saved talent');
              }}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all border ${
                isSaved ? 'bg-amber-500/10 text-amber-600 border-amber-500/30' : 'btn-ghost'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-500' : ''}`} />
              <span>{isSaved ? 'Saved' : 'Save'}</span>
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
        {/* Left Column: Intro, Top Skills, Verifications */}
        <div className="space-y-6">
          {/* Intro Card */}
          <div className="gd-card p-6">
            <h2 className="font-extrabold text-xl mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>Intro</h2>
            <div className="space-y-3.5 text-xs sm:text-sm font-medium">
              <div className="flex items-center gap-3">
                <Briefcase className="w-4 h-4 text-[var(--muted)]" />
                <span>Senior Full Stack Developer</span>
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
                <span className="text-emerald-600 font-bold">Available for contracts</span>
              </div>
            </div>
          </div>

          {/* Top Skills Card */}
          <div className="gd-card p-6">
            <h2 className="font-extrabold text-xl mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>Top Skills</h2>
            <div className="space-y-4">
              {[
                { name: 'React & Next.js', pct: 95 },
                { name: 'Node.js & Express', pct: 90 },
                { name: 'TypeScript', pct: 85 },
                { name: 'AWS & Cloud Services', pct: 80 },
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
          </div>

          {/* Verifications Card */}
          <div className="gd-card p-6">
            <h2 className="font-extrabold text-xl mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>Verifications</h2>
            <div className="space-y-3">
              {[
                { label: 'Identity Verified', desc: 'Government ID confirmed' },
                { label: 'Payment Verified', desc: 'Verified payout bank account' },
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

        {/* Right Column: Work Feed / Portfolio Posts */}
        <div className="lg:col-span-2 space-y-6">
          <div className="gd-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="https://picsum.photos/seed/danielbenson/200/200.jpg"
                  className="w-11 h-11 rounded-full object-cover"
                  alt="Daniel Benson"
                />
                <div>
                  <div className="font-bold text-sm flex items-center gap-1.5">
                    <span>Daniel Benson</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div className="text-xs" style={{ color: 'var(--muted)' }}>Posted 3 days ago · Completed Project</div>
                </div>
              </div>
            </div>

            <p className="text-sm leading-relaxed" style={{ color: 'var(--text)' }}>
              Completed the full <span className="font-bold">SaaS Dashboard Redesign</span> project. Architected clean React state management with real-time WebSocket notifications and high-performance charts.
            </p>

            <img
              src="https://picsum.photos/seed/projectdemo/800/400"
              className="w-full h-64 object-cover rounded-xl border border-[var(--border)]"
              alt="Project Showcase"
            />

            <div className="flex items-center justify-between pt-3 border-t text-xs font-semibold" style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}>
              <button onClick={() => showToast('Liked', 'Project liked')} className="flex items-center gap-1.5 hover:text-emerald-600">
                <ThumbsUp className="w-4 h-4" /> 38 Likes
              </button>
              <button onClick={() => showToast('Share', 'Link copied to clipboard')} className="flex items-center gap-1.5 hover:text-emerald-600">
                <Share2 className="w-4 h-4" /> Share Showcase
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hire Modal */}
      {isHireModalOpen && (
        <div
          className="modal-backdrop active"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsHireModalOpen(false);
          }}
        >
          <div className="modal-content p-7">
            <div className="flex items-start justify-between mb-5">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-emerald-500">
                    <JobIcon className="w-4 h-4 text-white" />
                  </div>
                  <div className="getidone-text text-sm dark"><span className="geti">Geti</span><span className="done">Done</span></div>
                </div>
                <div className="text-[11px] font-bold tracking-widest uppercase mb-1" style={{ color: 'var(--primary)' }}>NEW OFFER</div>
                <h2 className="font-extrabold text-2xl" style={{ fontFamily: "'Sora', sans-serif" }}>Hire Freelancer</h2>
                <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>Send a job offer to <span className="font-bold">Daniel Benson</span>.</p>
              </div>
              <button
                onClick={() => setIsHireModalOpen(false)}
                className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSendOffer} className="space-y-4">
              <div>
                <label className="text-xs font-bold tracking-wider mb-1.5 block uppercase" style={{ color: 'var(--muted)' }}>SELECT PROJECT</label>
                <select
                  value={hireProject}
                  onChange={e => setHireProject(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none appearance-none cursor-pointer"
                  style={{ borderColor: 'var(--border)', background: 'var(--bg-alt)' }}
                  required
                >
                  <option value="">Choose a project...</option>
                  <option value="E-commerce Website Redesign">E-commerce Website Redesign</option>
                  <option value="Mobile App Development">Mobile App Development</option>
                  <option value="Brand Identity Design">Brand Identity Design</option>
                  <option value="SEO Optimization">SEO Optimization</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold tracking-wider mb-1.5 block uppercase" style={{ color: 'var(--muted)' }}>BUDGET ($)</label>
                  <input
                    type="number"
                    placeholder="2500"
                    value={hireBudget}
                    onChange={e => setHireBudget(e.target.value ? Number(e.target.value) : '')}
                    className="w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none"
                    style={{ borderColor: 'var(--border)', background: 'var(--bg-alt)' }}
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold tracking-wider mb-1.5 block uppercase" style={{ color: 'var(--muted)' }}>DEADLINE</label>
                  <input
                    type="date"
                    value={hireDeadline}
                    onChange={e => setHireDeadline(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none"
                    style={{ borderColor: 'var(--border)', background: 'var(--bg-alt)' }}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold tracking-wider mb-1.5 block uppercase" style={{ color: 'var(--muted)' }}>COVER NOTE</label>
                <textarea
                  rows={3}
                  placeholder="We loved your portfolio! We'd like to offer you this project because..."
                  value={hireNote}
                  onChange={e => setHireNote(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none resize-none"
                  style={{ borderColor: 'var(--border)', background: 'var(--bg-alt)' }}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsHireModalOpen(false)}
                  className="flex-1 btn-ghost py-3 rounded-xl text-sm font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 btn-primary py-3 rounded-xl text-sm font-bold"
                >
                  Send Offer
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
