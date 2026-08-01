'use client';

import { useState, useRef } from 'react';
import {
  ChevronRight, Search, Download, Users, Bookmark, CheckCircle2,
  Handshake, DollarSign, MessageSquare, Briefcase, Trash2, Check, X,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

/* ==================== TYPES ==================== */
type FreelancerStatus = 'online' | 'away' | 'offline';

interface SavedTalentItem {
  id: number;
  name: string;
  role: string;
  avatar: string;
  status: FreelancerStatus;
  rate: number;
  skills: string[];
  savedDate: string;
  hired: boolean;
}

interface ToastState {
  title: string;
  msg: string;
  visible: boolean;
}

/* ==================== MOCK DATA ==================== */
const initialSavedTalent: SavedTalentItem[] = [
  { id: 1, name: 'Sarah Kim', role: 'Brand Designer', avatar: 'https://picsum.photos/seed/sarah/100/100.jpg', status: 'online', rate: 75, skills: ['Branding', 'Figma', 'Logo Design'], savedDate: 'Dec 10, 2024', hired: true },
  { id: 2, name: 'Marcus Lee', role: 'Lead Developer', avatar: 'https://picsum.photos/seed/marcus/100/100.jpg', status: 'online', rate: 95, skills: ['React', 'Node.js', 'AWS'], savedDate: 'Dec 08, 2024', hired: true },
  { id: 3, name: 'Alex Chen', role: 'SEO Specialist', avatar: 'https://picsum.photos/seed/alex/100/100.jpg', status: 'away', rate: 60, skills: ['SEO', 'Content', 'Analytics'], savedDate: 'Nov 28, 2024', hired: false },
  { id: 4, name: 'Jenny Diaz', role: 'Content Strategist', avatar: 'https://picsum.photos/seed/jenny/100/100.jpg', status: 'offline', rate: 55, skills: ['Copywriting', 'Blogging'], savedDate: 'Nov 15, 2024', hired: false },
  { id: 5, name: 'David Wilson', role: 'QA Tester', avatar: 'https://picsum.photos/seed/david/100/100.jpg', status: 'online', rate: 45, skills: ['Cypress', 'Jira', 'QA'], savedDate: 'Oct 30, 2024', hired: false },
  { id: 6, name: 'Emma Watson', role: 'UI/UX Designer', avatar: 'https://picsum.photos/seed/emma/100/100.jpg', status: 'online', rate: 85, skills: ['Figma', 'Webflow', 'User Research'], savedDate: 'Oct 12, 2024', hired: true }
];

/* ==================== MAIN COMPONENT ==================== */
export default function SavedTalentsPage() {
  const [talentList, setTalentList] = useState<SavedTalentItem[]>(initialSavedTalent);
  const [activeFilter, setActiveFilter] = useState<'all' | 'online' | 'hired'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHireTalent, setSelectedHireTalent] = useState<SavedTalentItem | null>(null);
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

  const handleRemoveTalent = (id: number, name: string) => {
    setTalentList(prev => prev.filter(item => item.id !== id));
    showToast('Removed', `${name} removed from saved talent`);
  };

  const handleSendOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedHireTalent || !hireProject || !hireBudget) {
      showToast('Error', 'Please select a project and budget');
      return;
    }
    showToast('Offer Sent!', `Job offer sent to ${selectedHireTalent.name}`);
    setSelectedHireTalent(null);
    setHireProject('');
    setHireBudget('');
    setHireDeadline('');
    setHireNote('');
  };

  const filteredTalent = talentList.filter(item => {
    const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
      || item.role.toLowerCase().includes(searchQuery.toLowerCase())
      || item.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    if (activeFilter === 'online') return matchSearch && item.status === 'online';
    if (activeFilter === 'hired') return matchSearch && item.hired;
    return matchSearch;
  });

  return (
    <div className="space-y-8 pb-8">
      {/* Page Header */}
      <section className="fade-up">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-6">
          <div>
            <div className="flex items-center gap-1.5 text-xs mb-2" style={{ color: 'var(--muted)' }}>
              <span className="hover:text-emerald-600 cursor-pointer transition-colors">Dashboard</span>
              <ChevronRight className="w-3 h-3" />
              <span className="font-semibold" style={{ color: 'var(--text)' }}>Saved Talent</span>
            </div>
            <h1 className="font-extrabold text-4xl tracking-tight" style={{ fontFamily: "'Sora', sans-serif", color: 'var(--text)' }}>
              Saved Talent<span style={{ color: 'var(--primary)' }}>.</span>
            </h1>
            <p className="text-sm mt-1.5" style={{ color: 'var(--muted)' }}>
              Your curated shortlist of freelancers for future and ongoing projects.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => showToast('Export', 'Exporting saved talent list as CSV')}
              className="btn-ghost px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Export List</span>
            </button>

            <Link
              href="/freelancers"
              className="btn-primary px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>Browse More Talent</span>
            </Link>
          </div>
        </div>

        {/* Stats Mini Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            onClick={() => setActiveFilter('all')}
            className="gd-card gd-stat-card p-5 cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: 'var(--muted)' }}>TOTAL SAVED</span>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(245,158,11,0.12)', color: 'var(--warning)' }}>
                <Bookmark className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>
              {talentList.length}
            </div>
            <div className="text-[11px] mt-1" style={{ color: 'var(--soft)' }}>Talent shortlisted</div>
          </div>

          <div
            onClick={() => setActiveFilter('online')}
            className="gd-card gd-stat-card p-5 cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: 'var(--muted)' }}>AVAILABLE NOW</span>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(16,185,129,0.12)', color: 'var(--primary)' }}>
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>
              {talentList.filter(f => f.status === 'online').length}
            </div>
            <div className="text-[11px] mt-1" style={{ color: 'var(--soft)' }}>Currently online</div>
          </div>

          <div
            onClick={() => setActiveFilter('hired')}
            className="gd-card gd-stat-card p-5 cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: 'var(--muted)' }}>PREVIOUSLY HIRED</span>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(20,184,166,0.12)', color: 'var(--secondary)' }}>
                <Handshake className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>
              {talentList.filter(f => f.hired).length}
            </div>
            <div className="text-[11px] mt-1" style={{ color: 'var(--soft)' }}>Re-hire ready</div>
          </div>

          <div
            onClick={() => showToast('Avg Saved Rate', '$68/hr average shortlist rate')}
            className="gd-card gd-stat-card p-5 cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: 'var(--muted)' }}>AVG SAVED RATE</span>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(132,204,22,0.12)', color: 'var(--accent)' }}>
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>
              $68<span className="text-base font-normal" style={{ color: 'var(--muted)' }}>/hr</span>
            </div>
            <div className="text-[11px] mt-1" style={{ color: 'var(--soft)' }}>Average shortlist rate</div>
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
                placeholder="Search saved talent by name, role, or skill..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none transition-all focus:bg-white"
                style={{ background: 'var(--bg-alt)', border: '1px solid var(--border)' }}
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 p-1 rounded-xl" style={{ background: 'var(--bg-alt)' }}>
              {(['all', 'online', 'hired'] as const).map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                    activeFilter === filter
                      ? 'bg-[#0A0F0D] text-white shadow-sm'
                      : 'text-[var(--muted)] hover:text-[var(--text)]'
                  }`}
                >
                  {filter === 'all' ? 'All Saved' : filter === 'online' ? 'Available Now' : 'Previously Hired'}
                </button>
              ))}
            </div>

            <div className="text-xs" style={{ color: 'var(--muted)' }}>
              Showing <span className="font-bold" style={{ color: 'var(--text)' }}>{filteredTalent.length}</span> freelancers
            </div>
          </div>
        </div>
      </section>

      {/* Talent List Table */}
      <section className="gd-card overflow-hidden fade-up">
        <div className="grid grid-cols-12 gap-4 px-6 py-3 text-[10px] font-bold tracking-widest uppercase border-b" style={{ color: 'var(--soft)', background: 'var(--bg-alt)', borderColor: 'var(--border)' }}>
          <div className="col-span-5">FREELANCER</div>
          <div className="col-span-3">SKILLS</div>
          <div className="col-span-1">RATE</div>
          <div className="col-span-2">SAVED ON</div>
          <div className="col-span-1 text-right">ACTIONS</div>
        </div>

        <div className="divide-y max-h-[520px] overflow-y-auto" style={{ borderColor: 'var(--border)' }}>
          {filteredTalent.length === 0 ? (
            <div className="p-12 text-center">
              <Bookmark className="w-10 h-10 mx-auto mb-3 text-[var(--soft)]" />
              <p className="text-sm font-semibold" style={{ color: 'var(--muted)' }}>No saved talent found</p>
              <Link href="/freelancers" className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:underline">
                Browse Freelancers Directory <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            filteredTalent.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-12 gap-4 px-6 py-4 items-center transition-all hover:bg-[var(--bg-alt)] hover:translate-x-1"
              >
                <div className="col-span-5 flex items-center gap-3 min-w-0">
                  <div className="relative flex-shrink-0">
                    <img src={item.avatar} className="w-10 h-10 rounded-full object-cover" alt={item.name} />
                    <span
                      className={`w-2.5 h-2.5 rounded-full absolute bottom-0 right-0 border-2 border-white ${
                        item.status === 'online' ? 'bg-emerald-500' : item.status === 'away' ? 'bg-amber-500' : 'bg-slate-400'
                      }`}
                    />
                  </div>

                  <div className="min-w-0">
                    <div className="font-bold text-sm truncate flex items-center gap-2" style={{ color: 'var(--text)' }}>
                      <span>{item.name}</span>
                      {item.hired && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded uppercase" style={{ background: 'rgba(20,184,166,0.12)', color: 'var(--secondary)' }}>
                          HIRED BEFORE
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] truncate" style={{ color: 'var(--muted)' }}>{item.role}</div>
                  </div>
                </div>

                <div className="col-span-3 flex flex-wrap gap-1.5">
                  {item.skills.slice(0, 2).map((skill) => (
                    <span
                      key={skill}
                      className="text-[11px] font-semibold px-2 py-0.5 rounded"
                      style={{ background: 'rgba(16,185,129,0.08)', color: 'var(--primary-dark)' }}
                    >
                      {skill}
                    </span>
                  ))}
                  {item.skills.length > 2 && (
                    <span
                      className="text-[11px] font-semibold px-1.5 py-0.5 rounded"
                      style={{ background: 'rgba(16,185,129,0.08)', color: 'var(--primary-dark)' }}
                    >
                      +{item.skills.length - 2}
                    </span>
                  )}
                </div>

                <div className="col-span-1 text-sm font-bold" style={{ color: 'var(--text)' }}>
                  ${item.rate}<span className="text-[10px] font-normal" style={{ color: 'var(--muted)' }}>/hr</span>
                </div>

                <div className="col-span-2 text-xs" style={{ color: 'var(--muted)' }}>
                  {item.savedDate}
                </div>

                <div className="col-span-1 flex items-center justify-end gap-1.5">
                  <button
                    onClick={() => showToast('Message', `Opening chat with ${item.name}`)}
                    className="btn-ghost w-8 h-8 rounded-lg flex items-center justify-center text-xs"
                    title="Message"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => setSelectedHireTalent(item)}
                    className="btn-primary w-8 h-8 rounded-lg flex items-center justify-center text-xs"
                    title="Hire"
                  >
                    <Handshake className="w-3.5 h-3.5 text-white" />
                  </button>

                  <button
                    onClick={() => handleRemoveTalent(item.id, item.name)}
                    className="btn-danger w-8 h-8 rounded-lg flex items-center justify-center text-xs"
                    title="Remove from Saved"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

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
                  <div className="getidone-text text-sm dark"><span className="geti">Geti</span><span className="done">Done</span></div>
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
