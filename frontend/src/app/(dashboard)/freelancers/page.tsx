'use client';

import { useState, useRef } from 'react';
import {
  ChevronRight, Search, SlidersHorizontal, UserPlus, Star, MapPin,
  MessageSquare, DollarSign, Handshake, Bookmark, Users, Check, X,
  Briefcase
} from 'lucide-react';
import { useFreelancers } from '@/features/matching/hooks/useFreelancers';

/* ==================== TYPES ==================== */
type FreelancerStatus = 'online' | 'away' | 'offline';

interface FreelancerItem {
  id: string | number;
  name: string;
  role: string;
  avatar: string;
  status: FreelancerStatus;
  rating: number;
  rate: number;
  location: string;
  skills: string[];
  bio: string;
  hired: boolean;
  saved: boolean;
}

interface ToastState {
  title: string;
  msg: string;
  visible: boolean;
}

/* ==================== MOCK FALLBACK DATA ==================== */
const mockFreelancers: FreelancerItem[] = [
  {
    id: 1,
    name: 'Sarah Kim',
    role: 'Brand Designer',
    avatar: 'https://picsum.photos/seed/sarah/100/100.jpg',
    status: 'online',
    rating: 4.9,
    rate: 75,
    location: 'San Francisco, US',
    skills: ['Branding', 'Logo Design', 'Figma', 'Illustrator'],
    bio: 'Passionate brand designer with 8 years of experience creating visual identities for startups and Fortune 500s. I help businesses find their unique voice through clean, memorable design.',
    hired: true,
    saved: false,
  },
  {
    id: 2,
    name: 'Marcus Lee',
    role: 'Lead Developer',
    avatar: 'https://picsum.photos/seed/marcus/100/100.jpg',
    status: 'online',
    rating: 4.8,
    rate: 95,
    location: 'London, UK',
    skills: ['React', 'Node.js', 'AWS', 'TypeScript'],
    bio: 'Full-stack developer specializing in scalable e-commerce and SaaS platforms. I write clean, maintainable code and have a passion for UI/UX implementation.',
    hired: true,
    saved: false,
  },
  {
    id: 3,
    name: 'Alex Chen',
    role: 'SEO Specialist',
    avatar: 'https://picsum.photos/seed/alex/100/100.jpg',
    status: 'away',
    rating: 4.7,
    rate: 60,
    location: 'Toronto, CA',
    skills: ['SEO', 'Content Strategy', 'Google Analytics', 'Ahrefs'],
    bio: 'Data-driven SEO strategist helping brands increase organic traffic and conversions. I focus on technical SEO and high-quality content alignment.',
    hired: false,
    saved: true,
  },
  {
    id: 4,
    name: 'Jenny Diaz',
    role: 'Content Strategist',
    avatar: 'https://picsum.photos/seed/jenny/100/100.jpg',
    status: 'offline',
    rating: 5.0,
    rate: 55,
    location: 'Madrid, ES',
    skills: ['Copywriting', 'Blogging', 'Editing', 'Storytelling'],
    bio: 'Wordsmith and content strategist. I craft compelling narratives that engage audiences and drive action. 6+ years of experience in B2B and B2C content.',
    hired: false,
    saved: true,
  },
  {
    id: 5,
    name: 'David Wilson',
    role: 'QA Tester',
    avatar: 'https://picsum.photos/seed/david/100/100.jpg',
    status: 'online',
    rating: 4.6,
    rate: 45,
    location: 'Austin, US',
    skills: ['Manual Testing', 'Cypress', 'Jira', 'Bug Reporting'],
    bio: 'Detail-oriented QA engineer ensuring flawless software delivery. I catch the bugs your users would have found. Available for short-term and long-term contracts.',
    hired: false,
    saved: false,
  },
  {
    id: 6,
    name: 'Emma Watson',
    role: 'UI/UX Designer',
    avatar: 'https://picsum.photos/seed/emma/100/100.jpg',
    status: 'online',
    rating: 4.9,
    rate: 85,
    location: 'Berlin, DE',
    skills: ['Figma', 'Webflow', 'Prototyping', 'User Research'],
    bio: 'I design intuitive digital products that users love. My process involves deep user research, rapid prototyping, and pixel-perfect handoff.',
    hired: false,
    saved: false,
  },
];

/* ==================== MAIN COMPONENT ==================== */
export default function FreelancersPage() {
  const { data: apiFreelancers, isLoading } = useFreelancers();

  // Active filter state
  const [activeFilter, setActiveFilter] = useState<'all' | 'hired' | 'saved' | 'available'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [selectedHireTalent, setSelectedHireTalent] = useState<FreelancerItem | null>(null);
  const [toastState, setToastState] = useState<ToastState>({ title: '', msg: '', visible: false });
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Invite Form State
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteName, setInviteName] = useState('');
  const [inviteMessage, setInviteMessage] = useState('');

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

  // Combine real API data with fallback
  const displayFreelancers: FreelancerItem[] = (apiFreelancers && apiFreelancers.length > 0)
    ? apiFreelancers.map((f: any, idx: number) => {
        const fallback = mockFreelancers[idx % mockFreelancers.length];
        return {
          id: f.id || fallback.id,
          name: f.name || f.user?.name || fallback.name,
          role: f.title || f.role || fallback.role,
          avatar: f.avatarUrl || f.user?.avatarUrl || fallback.avatar,
          status: (f.status as FreelancerStatus) || fallback.status,
          rating: f.rating || fallback.rating,
          rate: f.hourlyRate || fallback.rate,
          location: f.location || fallback.location,
          skills: (f.skills && f.skills.length > 0) ? f.skills : fallback.skills,
          bio: f.bio || fallback.bio,
          hired: f.hired ?? fallback.hired,
          saved: f.saved ?? fallback.saved,
        };
      })
    : mockFreelancers;

  const filteredFreelancers = displayFreelancers.filter(f => {
    const matchSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase())
      || f.role.toLowerCase().includes(searchQuery.toLowerCase())
      || f.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    if (activeFilter === 'hired') return matchSearch && f.hired;
    if (activeFilter === 'saved') return matchSearch && f.saved;
    if (activeFilter === 'available') return matchSearch && !f.hired;
    return matchSearch;
  });

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail) return;
    setIsInviteModalOpen(false);
    setInviteEmail('');
    setInviteName('');
    setInviteMessage('');
    showToast('Invitation Sent', "We've emailed the invite link to the freelancer");
  };

  const handleSendOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedHireTalent || !hireProject || !hireBudget) {
      showToast('Error', 'Please fill in the project and budget');
      return;
    }
    showToast('Offer Sent!', `Job offer sent to ${selectedHireTalent.name}`);
    setSelectedHireTalent(null);
    setHireProject('');
    setHireBudget('');
    setHireDeadline('');
    setHireNote('');
  };

  return (
    <div className="space-y-8 pb-8">
      {/* Page Header */}
      <section className="fade-up">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-6">
          <div>
            <div className="flex items-center gap-1.5 text-xs mb-2" style={{ color: 'var(--muted)' }}>
              <span className="hover:text-emerald-600 cursor-pointer transition-colors">Dashboard</span>
              <ChevronRight className="w-3 h-3" />
              <span className="font-semibold" style={{ color: 'var(--text)' }}>Freelancers</span>
            </div>
            <h1 className="font-extrabold text-4xl tracking-tight" style={{ fontFamily: "'Sora', sans-serif", color: 'var(--text)' }}>
              Talent Directory<span style={{ color: 'var(--primary)' }}>.</span>
            </h1>
            <p className="text-sm mt-1.5" style={{ color: 'var(--muted)' }}>
              Browse your hired talent and discover new freelancers for your projects.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => showToast('Filters', 'Opening advanced search filters')}
              className="btn-ghost px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Advanced Filters</span>
            </button>

            <button
              onClick={() => setIsInviteModalOpen(true)}
              className="btn-primary px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>Invite Freelancer</span>
            </button>
          </div>
        </div>

        {/* Stats Mini Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            onClick={() => setActiveFilter('all')}
            className="gd-card gd-stat-card p-5 cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: 'var(--muted)' }}>TOTAL TALENT</span>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(16,185,129,0.12)', color: 'var(--primary)' }}>
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>
              {displayFreelancers.length}
            </div>
            <div className="text-[11px] mt-1" style={{ color: 'var(--soft)' }}>
              {displayFreelancers.filter(f => f.status === 'online').length} currently active
            </div>
          </div>

          <div
            onClick={() => setActiveFilter('hired')}
            className="gd-card gd-stat-card p-5 cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: 'var(--muted)' }}>HIRED</span>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(20,184,166,0.12)', color: 'var(--secondary)' }}>
                <Handshake className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>
              {displayFreelancers.filter(f => f.hired).length}
            </div>
            <div className="text-[11px] mt-1" style={{ color: 'var(--soft)' }}>Under contract</div>
          </div>

          <div
            onClick={() => setActiveFilter('saved')}
            className="gd-card gd-stat-card p-5 cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: 'var(--muted)' }}>SAVED</span>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(245,158,11,0.12)', color: 'var(--warning)' }}>
                <Bookmark className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>
              {displayFreelancers.filter(f => f.saved).length}
            </div>
            <div className="text-[11px] mt-1" style={{ color: 'var(--soft)' }}>Shortlisted candidates</div>
          </div>

          <div
            onClick={() => showToast('Avg Rate', '$65/hr average across network')}
            className="gd-card gd-stat-card p-5 cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: 'var(--muted)' }}>AVG RATE</span>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(132,204,22,0.12)', color: 'var(--accent)' }}>
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>
              $65<span className="text-base font-normal" style={{ color: 'var(--muted)' }}>/hr</span>
            </div>
            <div className="text-[11px] mt-1" style={{ color: 'var(--soft)' }}>Network average</div>
          </div>
        </div>
      </section>

      {/* Filter Bar & Search */}
      <section className="fade-up">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3 flex-1 max-w-lg">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--soft)]" />
              <input
                type="text"
                placeholder="Search by name, role, or skill..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none transition-all focus:bg-white"
                style={{ background: 'var(--bg-alt)', border: '1px solid var(--border)' }}
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 p-1 rounded-xl" style={{ background: 'var(--bg-alt)' }}>
              {(['all', 'hired', 'saved', 'available'] as const).map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                    activeFilter === filter
                      ? 'bg-[#0A0F0D] text-white shadow-sm'
                      : 'text-[var(--muted)] hover:text-[var(--text)]'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="text-xs" style={{ color: 'var(--muted)' }}>
              Showing <span className="font-bold" style={{ color: 'var(--text)' }}>{filteredFreelancers.length}</span> freelancers
            </div>
          </div>
        </div>
      </section>

      {/* Freelancers Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 fade-up">
        {isLoading ? (
          [1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="gd-card p-6 h-64 animate-pulse bg-white/60"></div>
          ))
        ) : filteredFreelancers.length === 0 ? (
          <div className="col-span-full gd-card p-12 text-center">
            <Users className="w-10 h-10 mx-auto mb-3 text-[var(--soft)]" />
            <p className="text-sm font-semibold" style={{ color: 'var(--muted)' }}>No freelancers found</p>
          </div>
        ) : (
          filteredFreelancers.map((f) => (
            <div
              key={f.id}
              className="gd-card p-6 flex flex-col justify-between relative overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40"
            >
              {/* Top Accent Gradient Bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="relative">
                    <img src={f.avatar} className="w-16 h-16 rounded-full object-cover" alt={f.name} />
                    <span
                      className={`w-3 h-3 rounded-full absolute bottom-0 right-0 border-2 border-white ${
                        f.status === 'online' ? 'bg-emerald-500' : f.status === 'away' ? 'bg-amber-500' : 'bg-slate-400'
                      }`}
                    />
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-1 text-sm font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{f.rating}</span>
                    </div>
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-md capitalize"
                      style={{
                        background: f.status === 'online' ? 'rgba(34,197,94,0.1)' : f.status === 'away' ? 'rgba(245,158,11,0.1)' : 'rgba(148,163,154,0.1)',
                        color: f.status === 'online' ? 'var(--success)' : f.status === 'away' ? 'var(--warning)' : 'var(--soft)',
                      }}
                    >
                      {f.status}
                    </span>
                  </div>
                </div>

                <h3 className="font-extrabold text-lg leading-tight" style={{ fontFamily: "'Sora', sans-serif" }}>
                  {f.name}
                </h3>
                <p className="text-sm font-semibold mb-2" style={{ color: 'var(--primary)' }}>
                  {f.role}
                </p>
                <p className="text-[11px] mb-4 flex items-center gap-1" style={{ color: 'var(--muted)' }}>
                  <MapPin className="w-3 h-3 text-[var(--soft)]" /> {f.location}
                </p>

                {/* Skill tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {f.skills.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="text-[11px] font-semibold px-2.5 py-1 rounded-md"
                      style={{ background: 'rgba(16,185,129,0.08)', color: 'var(--primary-dark)' }}
                    >
                      {skill}
                    </span>
                  ))}
                  {f.skills.length > 3 && (
                    <span
                      className="text-[11px] font-semibold px-2 py-1 rounded-md"
                      style={{ background: 'rgba(16,185,129,0.08)', color: 'var(--primary-dark)' }}
                    >
                      +{f.skills.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Card Footer */}
              <div className="flex items-center justify-between pt-4 mt-auto border-t" style={{ borderColor: 'var(--border)' }}>
                <div>
                  <div className="text-lg font-extrabold" style={{ fontFamily: "'Sora', sans-serif" }}>
                    ${f.rate}<span className="text-xs font-medium" style={{ color: 'var(--muted)' }}>/hr</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => showToast('Message', `Opening chat with ${f.name}`)}
                    className="btn-ghost w-9 h-9 rounded-lg flex items-center justify-center text-xs"
                    title="Message"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setSelectedHireTalent(f)}
                    className="btn-primary px-4 py-2 rounded-lg text-xs font-bold"
                  >
                    Hire
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </section>

      {/* Invite Modal */}
      {isInviteModalOpen && (
        <div
          className="modal-backdrop active"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsInviteModalOpen(false);
          }}
        >
          <div className="modal-content p-7">
            <div className="flex items-start justify-between mb-5">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #10B981, #34D399)' }}>
                    <UserPlus className="w-4 h-4 text-white" />
                  </div>
                  <div className="getidone-text text-sm dark"><span class="geti">Geti</span><span class="done">Done</span></div>
                </div>
                <div className="text-[11px] font-bold tracking-widest uppercase mb-1" style={{ color: 'var(--primary)' }}>TALENT INVITE</div>
                <h2 className="font-extrabold text-2xl" style={{ fontFamily: "'Sora', sans-serif" }}>Invite Freelancer</h2>
                <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>Bring a specific freelancer into your GetiDone network.</p>
              </div>
              <button
                onClick={() => setIsInviteModalOpen(false)}
                className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSendInvite} className="space-y-4">
              <div>
                <label className="text-xs font-bold tracking-wider mb-1.5 block uppercase" style={{ color: 'var(--muted)' }}>EMAIL ADDRESS</label>
                <input
                  type="email"
                  placeholder="freelancer@email.com"
                  value={inviteEmail}
                  onChange={e => setInviteEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none"
                  style={{ borderColor: 'var(--border)', background: 'var(--bg-alt)' }}
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold tracking-wider mb-1.5 block uppercase" style={{ color: 'var(--muted)' }}>FREELANCER NAME (OPTIONAL)</label>
                <input
                  type="text"
                  placeholder="Jane Doe"
                  value={inviteName}
                  onChange={e => setInviteName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none"
                  style={{ borderColor: 'var(--border)', background: 'var(--bg-alt)' }}
                />
              </div>
              <div>
                <label className="text-xs font-bold tracking-wider mb-1.5 block uppercase" style={{ color: 'var(--muted)' }}>PERSONAL MESSAGE</label>
                <textarea
                  rows={3}
                  placeholder="Hi! I'd love to work with you on GetiDone..."
                  value={inviteMessage}
                  onChange={e => setInviteMessage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none resize-none"
                  style={{ borderColor: 'var(--border)', background: 'var(--bg-alt)' }}
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsInviteModalOpen(false)}
                  className="flex-1 btn-ghost py-3 rounded-xl text-sm font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 btn-primary py-3 rounded-xl text-sm font-bold"
                >
                  Send Invite
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Hire Modal */}
      {selectedHireTalent && (
        <div
          className="modal-backdrop active"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedHireTalent(null);
          }}
        >
          <div className="modal-content p-7">
            <div className="flex items-start justify-between mb-5">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #10B981, #34D399)' }}>
                    <Briefcase className="w-4 h-4 text-white" />
                  </div>
                  <div className="getidone-text text-sm dark"><span class="geti">Geti</span><span class="done">Done</span></div>
                </div>
                <div className="text-[11px] font-bold tracking-widest uppercase mb-1" style={{ color: 'var(--primary)' }}>NEW OFFER</div>
                <h2 className="font-extrabold text-2xl" style={{ fontFamily: "'Sora', sans-serif" }}>Hire Freelancer</h2>
                <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
                  Send a job offer to <span className="font-bold" style={{ color: 'var(--text)' }}>{selectedHireTalent.name}</span>.
                </p>
              </div>
              <button
                onClick={() => setSelectedHireTalent(null)}
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
                  className="w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none cursor-pointer"
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
                  onClick={() => setSelectedHireTalent(null)}
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
