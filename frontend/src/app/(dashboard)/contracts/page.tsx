'use client';

import { useState, useRef } from 'react';
import {
  FileSignature, Search, Plus, Layers, CheckCircle2, Clock,
  PenTool, Flag, Tag, Check, X, Download, MessageSquare, Send,
  ChevronRight, ArrowUpRight
} from 'lucide-react';

/* ==================== TYPES ==================== */
type ContractStatus = 'active' | 'pending' | 'draft' | 'completed';
type ContractType = 'fixed' | 'hourly';

interface Contract {
  id: number;
  freelancer: string;
  role: string;
  avatar: string;
  title: string;
  type: ContractType;
  amount: number;
  duration: string;
  status: ContractStatus;
  date: string;
  terms: string;
}

interface ToastState {
  title: string;
  msg: string;
  visible: boolean;
}

const statusConfig: Record<ContractStatus, { bg: string; text: string; label: string }> = {
  active: { bg: 'rgba(16,185,129,0.12)', text: 'var(--primary)', label: 'Active' },
  pending: { bg: 'rgba(245,158,11,0.12)', text: 'var(--warning)', label: 'Pending' },
  draft: { bg: 'rgba(20,184,166,0.12)', text: 'var(--secondary)', label: 'Draft' },
  completed: { bg: 'rgba(132,204,22,0.12)', text: 'var(--accent)', label: 'Completed' },
};

/* ==================== MAIN COMPONENT ==================== */
export default function ContractsPage() {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [toastState, setToastState] = useState<ToastState>({ title: '', msg: '', visible: false });
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Form State
  const [newFreelancer, setNewFreelancer] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<ContractType>('fixed');
  const [newAmount, setNewAmount] = useState<number | ''>('');
  const [newDuration, setNewDuration] = useState('');
  const [newTerms, setNewTerms] = useState('');

  // Sample Contracts List
  const [contractsList, setContractsList] = useState<Contract[]>([
    {
      id: 1024,
      freelancer: 'Sarah Kim',
      role: 'Brand Designer',
      avatar: 'https://picsum.photos/seed/sarah/100/100.jpg',
      title: 'Brand Identity Design Package',
      type: 'fixed',
      amount: 2800,
      duration: '30 days',
      status: 'active',
      date: 'Dec 10, 2024',
      terms: 'Complete brand identity including logo variations, typography, color palette, and a comprehensive brand guidelines PDF. 3 initial concepts provided before final selection.',
    },
    {
      id: 1023,
      freelancer: 'Marcus Lee',
      role: 'Lead Developer',
      avatar: 'https://picsum.photos/seed/marcus/100/100.jpg',
      title: 'E-commerce Frontend Redesign',
      type: 'fixed',
      amount: 4500,
      duration: '45 days',
      status: 'active',
      date: 'Dec 05, 2024',
      terms: 'Redesign of the existing e-commerce storefront using React and Tailwind CSS. Includes product page templates, cart flow, and mobile optimization.',
    },
    {
      id: 1022,
      freelancer: 'Alex Chen',
      role: 'SEO Specialist',
      avatar: 'https://picsum.photos/seed/alex/100/100.jpg',
      title: 'Technical SEO Audit & Cleanup',
      type: 'fixed',
      amount: 1500,
      duration: '14 days',
      status: 'pending',
      date: 'Dec 12, 2024',
      terms: 'Full technical SEO audit, fixing indexing issues, optimizing page speed, and providing a content strategy document for Q1.',
    },
    {
      id: 1021,
      freelancer: 'Jenny Diaz',
      role: 'Content Strategist',
      avatar: 'https://picsum.photos/seed/jenny/100/100.jpg',
      title: 'Blog Content Writing (Hourly)',
      type: 'hourly',
      amount: 65,
      duration: 'Ongoing',
      status: 'active',
      date: 'Nov 28, 2024',
      terms: 'Hourly contract for writing and optimizing SEO blog posts. Estimated 10-15 hours per week. Bi-weekly payments released via escrow.',
    },
    {
      id: 1020,
      freelancer: 'Marcus Lee',
      role: 'Lead Developer',
      avatar: 'https://picsum.photos/seed/marcus/100/100.jpg',
      title: 'API Integration & Backend Setup',
      type: 'fixed',
      amount: 5800,
      duration: '60 days',
      status: 'draft',
      date: 'Dec 14, 2024',
      terms: 'Development of RESTful APIs, integration of Stripe payment gateway, and database optimization for the mobile app backend.',
    },
  ]);

  const showToast = (title: string, msg: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToastState({ title, msg, visible: true });
    toastTimer.current = setTimeout(() => setToastState(t => ({ ...t, visible: false })), 3200);
  };

  const handleCreateContract = (e: React.FormEvent, isDraft: boolean) => {
    e.preventDefault();
    if (!newFreelancer || !newTitle || !newAmount) {
      showToast('Error', 'Please fill in required fields');
      return;
    }

    const freelancerMap: Record<string, { role: string; avatar: string }> = {
      'Sarah Kim': { role: 'Brand Designer', avatar: 'https://picsum.photos/seed/sarah/100/100.jpg' },
      'Marcus Lee': { role: 'Lead Developer', avatar: 'https://picsum.photos/seed/marcus/100/100.jpg' },
      'Alex Chen': { role: 'SEO Specialist', avatar: 'https://picsum.photos/seed/alex/100/100.jpg' },
      'Jenny Diaz': { role: 'Content Strategist', avatar: 'https://picsum.photos/seed/jenny/100/100.jpg' },
    };

    const details = freelancerMap[newFreelancer] || { role: 'Freelancer', avatar: 'https://picsum.photos/seed/user/100/100.jpg' };

    const newContract: Contract = {
      id: Math.floor(1000 + Math.random() * 9000),
      freelancer: newFreelancer,
      role: details.role,
      avatar: details.avatar,
      title: newTitle,
      type: newType,
      amount: Number(newAmount),
      duration: newDuration || '30 days',
      status: isDraft ? 'draft' : 'pending',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      terms: newTerms || 'Standard project terms and milestone agreements apply.',
    };

    setContractsList(prev => [newContract, ...prev]);
    setIsCreateModalOpen(false);
    setNewFreelancer('');
    setNewTitle('');
    setNewAmount('');
    setNewDuration('');
    setNewTerms('');

    showToast(isDraft ? 'Draft Saved' : 'Contract Sent', isDraft ? 'Saved to contract drafts' : `Sent to ${newFreelancer} for signature`);
  };

  const filteredContracts = contractsList.filter(c => {
    const matchFilter = activeFilter === 'all' || c.status === activeFilter;
    const matchSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.freelancer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchFilter && matchSearch;
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
              <span className="font-semibold" style={{ color: 'var(--text)' }}>Contracts</span>
            </div>
            <h1 className="font-extrabold text-4xl tracking-tight" style={{ fontFamily: "'Sora', sans-serif", color: 'var(--text)' }}>
              Contracts & Agreements<span style={{ color: 'var(--primary)' }}>.</span>
            </h1>
            <p className="text-sm mt-1.5" style={{ color: 'var(--muted)' }}>
              Manage fixed-price and hourly agreements with your freelancers.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => showToast('Templates', 'Loading contract templates')}
              className="btn-ghost px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2"
            >
              <Layers className="w-4 h-4 text-xs" />
              <span>Templates</span>
            </button>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="btn-primary px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2"
            >
              <FileSignature className="w-4 h-4" />
              <span>Create Contract</span>
            </button>
          </div>
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
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>
              {contractsList.filter(c => c.status === 'active').length}
            </div>
            <div className="text-[11px] mt-1" style={{ color: 'var(--soft)' }}>Currently in progress</div>
          </div>

          <div
            onClick={() => setActiveFilter('pending')}
            className="gd-card gd-stat-card p-5 cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: 'var(--muted)' }}>PENDING</span>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(245,158,11,0.12)', color: 'var(--warning)' }}>
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>
              {contractsList.filter(c => c.status === 'pending').length}
            </div>
            <div className="text-[11px] mt-1" style={{ color: 'var(--soft)' }}>Awaiting signature</div>
          </div>

          <div
            onClick={() => setActiveFilter('draft')}
            className="gd-card gd-stat-card p-5 cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: 'var(--muted)' }}>DRAFTS</span>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(20,184,166,0.12)', color: 'var(--secondary)' }}>
                <PenTool className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>
              {contractsList.filter(c => c.status === 'draft').length}
            </div>
            <div className="text-[11px] mt-1" style={{ color: 'var(--soft)' }}>Not yet sent</div>
          </div>

          <div
            onClick={() => setActiveFilter('completed')}
            className="gd-card gd-stat-card p-5 cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: 'var(--muted)' }}>COMPLETED</span>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(132,204,22,0.12)', color: 'var(--accent)' }}>
                <Flag className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>
              {contractsList.filter(c => c.status === 'completed').length}
            </div>
            <div className="text-[11px] mt-1" style={{ color: 'var(--soft)' }}>Finished agreements</div>
          </div>
        </div>
      </section>

      {/* Contracts Table Section */}
      <section className="gd-card overflow-hidden fade-up">
        {/* Table Header Controls */}
        <div className="p-6 border-b flex items-center justify-between flex-wrap gap-4" style={{ borderColor: 'var(--border)' }}>
          <div>
            <h2 className="font-bold text-xl" style={{ fontFamily: "'Sora', sans-serif" }}>All Contracts</h2>
            <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>Click on a contract to view details or take action.</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--soft)]" />
              <input
                type="text"
                placeholder="Search contracts..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 rounded-xl text-xs outline-none transition-all focus:bg-white"
                style={{ background: 'var(--bg-alt)', border: '1px solid var(--border)' }}
              />
            </div>

            <div className="flex items-center gap-1 p-1 rounded-xl" style={{ background: 'var(--bg-alt)' }}>
              {(['all', 'draft', 'pending', 'active', 'completed'] as const).map(status => (
                <button
                  key={status}
                  onClick={() => setActiveFilter(status)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                    activeFilter === status
                      ? 'bg-[#0A0F0D] text-white shadow-sm'
                      : 'text-[var(--muted)] hover:text-[var(--text)]'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table Header Labels */}
        <div className="grid grid-cols-12 gap-4 px-6 py-3 text-[10px] font-bold tracking-widest uppercase border-b" style={{ color: 'var(--soft)', background: 'var(--bg-alt)', borderColor: 'var(--border)' }}>
          <div className="col-span-5">FREELANCER / TITLE</div>
          <div className="col-span-2">TYPE</div>
          <div className="col-span-2">AMOUNT</div>
          <div className="col-span-2">STATUS</div>
          <div className="col-span-1 text-right">ACTION</div>
        </div>

        {/* Contract Items */}
        <div className="divide-y max-h-[500px] overflow-y-auto" style={{ borderColor: 'var(--border)' }}>
          {filteredContracts.length === 0 ? (
            <div className="p-12 text-center">
              <FileSignature className="w-10 h-10 mx-auto mb-3 text-[var(--soft)]" />
              <p className="text-sm font-semibold" style={{ color: 'var(--muted)' }}>No contracts found</p>
            </div>
          ) : (
            filteredContracts.map(c => {
              const sc = statusConfig[c.status];
              return (
                <div
                  key={c.id}
                  onClick={() => setSelectedContract(c)}
                  className="grid grid-cols-12 gap-4 px-6 py-4 items-center transition-all hover:bg-[var(--bg-alt)] hover:translate-x-1 cursor-pointer"
                >
                  <div className="col-span-5 flex items-center gap-3 min-w-0">
                    <img src={c.avatar} className="w-9 h-9 rounded-full object-cover flex-shrink-0" alt={c.freelancer} />
                    <div className="min-w-0">
                      <div className="font-bold text-sm truncate" style={{ color: 'var(--text)' }}>{c.title}</div>
                      <div className="text-[11px] truncate" style={{ color: 'var(--muted)' }}>{c.freelancer} · {c.role}</div>
                    </div>
                  </div>

                  <div className="col-span-2 text-sm font-medium flex items-center gap-2" style={{ color: 'var(--text)' }}>
                    <Tag className="w-3.5 h-3.5 text-[var(--muted)]" />
                    <span className="capitalize">{c.type}</span>
                  </div>

                  <div className="col-span-2 text-sm font-bold" style={{ color: 'var(--text)' }}>
                    {c.type === 'fixed' ? `$${c.amount.toLocaleString()}` : `$${c.amount}/hr`}
                  </div>

                  <div className="col-span-2">
                    <span
                      className="status-pill inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full uppercase"
                      style={{ background: sc.bg, color: sc.text }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'currentColor' }} />
                      {sc.label}
                    </span>
                  </div>

                  <div className="col-span-1 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedContract(c);
                      }}
                      className="btn-ghost px-3 py-1.5 rounded-lg text-[11px] font-bold"
                    >
                      View
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* Create Contract Modal */}
      {isCreateModalOpen && (
        <div
          className="modal-backdrop active"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsCreateModalOpen(false);
          }}
        >
          <div className="modal-content p-7">
            <div className="flex items-start justify-between mb-5">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #10B981, #34D399)' }}>
                    <FileSignature className="w-4 h-4 text-white" />
                  </div>
                  <div className="getidone-text text-sm dark"><span class="geti">Geti</span><span class="done">Done</span></div>
                </div>
                <div className="text-[11px] font-bold tracking-widest uppercase mb-1" style={{ color: 'var(--primary)' }}>NEW AGREEMENT</div>
                <h2 className="font-extrabold text-2xl" style={{ fontFamily: "'Sora', sans-serif" }}>Create Contract</h2>
                <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>Define scope, terms, and payment for the freelancer.</p>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={(e) => handleCreateContract(e, false)} className="space-y-4">
              <div>
                <label className="text-xs font-bold tracking-wider mb-1.5 block uppercase" style={{ color: 'var(--muted)' }}>FREELANCER</label>
                <select
                  value={newFreelancer}
                  onChange={e => setNewFreelancer(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none cursor-pointer"
                  style={{ borderColor: 'var(--border)', background: 'var(--bg-alt)' }}
                  required
                >
                  <option value="">Select a freelancer</option>
                  <option value="Sarah Kim">Sarah Kim (Brand Designer)</option>
                  <option value="Marcus Lee">Marcus Lee (Lead Developer)</option>
                  <option value="Alex Chen">Alex Chen (SEO Specialist)</option>
                  <option value="Jenny Diaz">Jenny Diaz (Content Strategist)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold tracking-wider mb-1.5 block uppercase" style={{ color: 'var(--muted)' }}>CONTRACT TITLE</label>
                <input
                  type="text"
                  placeholder="e.g. Q4 Brand Identity Design"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none"
                  style={{ borderColor: 'var(--border)', background: 'var(--bg-alt)' }}
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold tracking-wider mb-1.5 block uppercase" style={{ color: 'var(--muted)' }}>CONTRACT TYPE</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setNewType('fixed')}
                    className={`p-3 rounded-xl border-2 text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                      newType === 'fixed'
                        ? 'border-[var(--primary)] bg-[rgba(16,185,129,0.05)] text-[var(--primary)]'
                        : 'border-[var(--border)] text-[var(--muted)]'
                    }`}
                  >
                    <Tag className="w-4 h-4" /> Fixed Price
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewType('hourly')}
                    className={`p-3 rounded-xl border-2 text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                      newType === 'hourly'
                        ? 'border-[var(--primary)] bg-[rgba(16,185,129,0.05)] text-[var(--primary)]'
                        : 'border-[var(--border)] text-[var(--muted)]'
                    }`}
                  >
                    <Clock className="w-4 h-4" /> Hourly Rate
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold tracking-wider mb-1.5 block uppercase" style={{ color: 'var(--muted)' }}>AMOUNT ($)</label>
                  <input
                    type="number"
                    placeholder="2500"
                    value={newAmount}
                    onChange={e => setNewAmount(e.target.value ? Number(e.target.value) : '')}
                    className="w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none"
                    style={{ borderColor: 'var(--border)', background: 'var(--bg-alt)' }}
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold tracking-wider mb-1.5 block uppercase" style={{ color: 'var(--muted)' }}>DURATION</label>
                  <input
                    type="text"
                    placeholder="e.g. 30 days"
                    value={newDuration}
                    onChange={e => setNewDuration(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none"
                    style={{ borderColor: 'var(--border)', background: 'var(--bg-alt)' }}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold tracking-wider mb-1.5 block uppercase" style={{ color: 'var(--muted)' }}>TERMS & DESCRIPTION</label>
                <textarea
                  rows={3}
                  placeholder="Outline deliverables, milestones, and specific requirements..."
                  value={newTerms}
                  onChange={e => setNewTerms(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none resize-none"
                  style={{ borderColor: 'var(--border)', background: 'var(--bg-alt)' }}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={(e) => handleCreateContract(e, true)}
                  className="flex-1 btn-ghost py-3 rounded-xl text-sm font-bold"
                >
                  Save Draft
                </button>
                <button
                  type="submit"
                  className="flex-1 btn-primary py-3 rounded-xl text-sm font-bold"
                >
                  Send for Signature
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Contract Details Modal */}
      {selectedContract && (
        <div
          className="modal-backdrop active"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedContract(null);
          }}
        >
          <div className="modal-content p-7">
            <div className="flex items-start justify-between mb-5">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #10B981, #34D399)' }}>
                    <FileSignature className="w-4 h-4 text-white" />
                  </div>
                  <div className="getidone-text text-sm dark"><span class="geti">Geti</span><span class="done">Done</span></div>
                </div>
                <div className="text-[11px] font-bold tracking-widest uppercase mb-1" style={{ color: 'var(--primary)' }}>
                  CONTRACT #{selectedContract.id}
                </div>
                <h2 className="font-extrabold text-2xl" style={{ fontFamily: "'Sora', sans-serif" }}>
                  {selectedContract.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedContract(null)}
                className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-xl mb-4" style={{ background: 'var(--bg-alt)' }}>
              <img src={selectedContract.avatar} className="w-12 h-12 rounded-full object-cover" alt={selectedContract.freelancer} />
              <div>
                <div className="font-bold text-sm">{selectedContract.freelancer}</div>
                <div className="text-xs" style={{ color: 'var(--muted)' }}>{selectedContract.role}</div>
              </div>
              <div className="ml-auto">
                <span
                  className="status-pill inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full uppercase"
                  style={{
                    background: statusConfig[selectedContract.status].bg,
                    color: statusConfig[selectedContract.status].text,
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'currentColor' }} />
                  {statusConfig[selectedContract.status].label}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="p-3 rounded-xl border" style={{ borderColor: 'var(--border)' }}>
                <div className="text-[10px] font-bold tracking-wider uppercase mb-1" style={{ color: 'var(--muted)' }}>TYPE</div>
                <div className="font-bold text-sm capitalize">{selectedContract.type}</div>
              </div>
              <div className="p-3 rounded-xl border" style={{ borderColor: 'var(--border)' }}>
                <div className="text-[10px] font-bold tracking-wider uppercase mb-1" style={{ color: 'var(--muted)' }}>AMOUNT</div>
                <div className="font-bold text-sm">
                  {selectedContract.type === 'fixed' ? `$${selectedContract.amount.toLocaleString()}` : `$${selectedContract.amount}/hr`}
                </div>
              </div>
              <div className="p-3 rounded-xl border" style={{ borderColor: 'var(--border)' }}>
                <div className="text-[10px] font-bold tracking-wider uppercase mb-1" style={{ color: 'var(--muted)' }}>DURATION</div>
                <div className="font-bold text-sm">{selectedContract.duration}</div>
              </div>
            </div>

            <div className="p-4 rounded-xl border mb-4" style={{ borderColor: 'var(--border)' }}>
              <div className="text-[10px] font-bold tracking-wider uppercase mb-2" style={{ color: 'var(--muted)' }}>TERMS & SCOPE</div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text)' }}>{selectedContract.terms}</p>
            </div>

            <div className="flex justify-between items-center text-xs mb-4" style={{ color: 'var(--muted)' }}>
              <span>Created on {selectedContract.date}</span>
              <button
                onClick={() => showToast('Download', 'Contract PDF downloaded successfully')}
                className="hover:text-emerald-600 font-bold flex items-center gap-1 transition-colors"
              >
                <Download className="w-3.5 h-3.5" /> Download PDF
              </button>
            </div>

            <div className="flex gap-3 pt-2">
              {selectedContract.status === 'pending' && (
                <button
                  onClick={() => {
                    setContractsList(prev => prev.map(x => x.id === selectedContract.id ? { ...x, status: 'active' } : x));
                    setSelectedContract(null);
                    showToast('Signed', 'Contract activated successfully');
                  }}
                  className="flex-1 btn-primary py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2"
                >
                  <FileSignature className="w-4 h-4" /> Sign Contract
                </button>
              )}
              {selectedContract.status === 'draft' && (
                <button
                  onClick={() => {
                    setContractsList(prev => prev.map(x => x.id === selectedContract.id ? { ...x, status: 'pending' } : x));
                    setSelectedContract(null);
                    showToast('Sent', 'Contract sent to freelancer for signature');
                  }}
                  className="flex-1 btn-primary py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" /> Send for Signature
                </button>
              )}
              <button
                onClick={() => {
                  setSelectedContract(null);
                  showToast('Message', `Opening chat with ${selectedContract.freelancer}`);
                }}
                className="flex-1 btn-ghost py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" /> Message
              </button>
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
