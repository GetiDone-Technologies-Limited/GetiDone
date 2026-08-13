'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import {
  FileSignature, Search, Plus, Layers, CheckCircle2, Clock,
  Hourglass, CheckCheck, Eye, EyeOff, Tag, Check, X, Download,
  MessageSquare, UploadCloud, ChevronDown
} from 'lucide-react';
import { useAuthStore } from '@/store/auth.store';
import { useUIStore } from '@/store/ui.store';

type ContractStatus = 'active' | 'pending' | 'completed';
type ContractType = 'fixed' | 'hourly';

interface Milestone {
  name: string;
  status: 'completed' | 'active' | 'pending';
}

interface ContractItem {
  id: number;
  title: string;
  client: string;
  clientAvatar: string;
  verified: boolean;
  type: ContractType;
  amount: number;
  duration: string;
  status: ContractStatus;
  date: string;
  desc: string;
  milestones: Milestone[];
}

const initialContracts: ContractItem[] = [
  {
    id: 1024,
    title: 'E-commerce Platform Redesign',
    client: 'TechNova Inc.',
    clientAvatar: 'https://picsum.photos/seed/technovalogo/100/100.jpg',
    verified: true,
    type: 'fixed',
    amount: 12000,
    duration: '45 days',
    status: 'active',
    date: 'Dec 10, 2024',
    desc: 'Redesign of the existing e-commerce storefront using React and Tailwind CSS. Includes product page templates, cart flow, and mobile optimization.',
    milestones: [
      { name: 'Discovery & Wireframes', status: 'completed' },
      { name: 'UI Design System', status: 'completed' },
      { name: 'Frontend Development', status: 'active' },
      { name: 'Backend Integration', status: 'pending' },
      { name: 'QA & Launch', status: 'pending' }
    ]
  },
  {
    id: 1023,
    title: 'Backend API Developer',
    client: 'Innovatech',
    clientAvatar: 'https://picsum.photos/seed/innovatech/100/100.jpg',
    verified: true,
    type: 'hourly',
    amount: 70,
    duration: '3 months',
    status: 'active',
    date: 'Dec 05, 2024',
    desc: 'Need a robust RESTful API for a mobile app. Must integrate Stripe and handle high-traffic loads efficiently.',
    milestones: []
  },
  {
    id: 1022,
    title: 'Real-Time Analytics Dashboard',
    client: 'Frame.io',
    clientAvatar: 'https://picsum.photos/seed/frameio/100/100.jpg',
    verified: false,
    type: 'fixed',
    amount: 12000,
    duration: '30 days',
    status: 'active',
    date: 'Dec 01, 2024',
    desc: 'Build a real-time analytics dashboard to track user engagement and revenue metrics using WebSockets and React.',
    milestones: [
      { name: 'Architecture Setup', status: 'completed' },
      { name: 'WebSocket Integration', status: 'active' },
      { name: 'UI Components', status: 'pending' }
    ]
  },
  {
    id: 1021,
    title: 'Mobile Banking App UI',
    client: 'Paystack',
    clientAvatar: 'https://picsum.photos/seed/paystack/100/100.jpg',
    verified: true,
    type: 'fixed',
    amount: 8500,
    duration: '20 days',
    status: 'pending',
    date: 'Dec 14, 2024',
    desc: 'Design a seamless and secure mobile banking interface. Must include user flow for transfers, bill payments, and account management.',
    milestones: []
  }
];

interface ToastState {
  title: string;
  msg: string;
  visible: boolean;
}

export default function ContractsPage() {
  const { user } = useAuthStore();
  const { balancesVisible, toggleBalancesVisible } = useUIStore();
  const [contractsList, setContractsList] = useState<ContractItem[]>(initialContracts);
  const [activeFilter, setActiveFilter] = useState<'all' | ContractStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContract, setSelectedContract] = useState<ContractItem | null>(null);
  const [toastState, setToastState] = useState<ToastState>({ title: '', msg: '', visible: false });
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (title: string, msg: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToastState({ title, msg, visible: true });
    toastTimer.current = setTimeout(() => setToastState(t => ({ ...t, visible: false })), 3000);
  };

  const filteredContracts = contractsList.filter(c => {
    const q = searchQuery.toLowerCase();
    const matchSearch = !q || c.title.toLowerCase().includes(q) || c.client.toLowerCase().includes(q);
    const matchStatus = activeFilter === 'all' || c.status === activeFilter;
    return matchSearch && matchStatus;
  });

  const counts = {
    active: contractsList.filter(c => c.status === 'active').length,
    pending: contractsList.filter(c => c.status === 'pending').length,
    completed: contractsList.filter(c => c.status === 'completed').length,
  };

  const statusConfig: Record<ContractStatus, { bg: string; text: string; label: string }> = {
    active: { bg: 'rgba(16,185,129,0.12)', text: 'var(--primary)', label: 'Active' },
    pending: { bg: 'rgba(245,158,11,0.12)', text: 'var(--warning)', label: 'Pending' },
    completed: { bg: 'rgba(132,204,22,0.12)', text: 'var(--accent)', label: 'Completed' },
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Page Header */}
      <section className="fade-up">
        <div className="flex items-center gap-2 mb-2 text-xs" style={{ color: 'var(--muted)' }}>
          <Link href="/freelancer" className="hover:text-emerald-600 transition-colors">Dashboard</Link>
          <ChevronDown className="w-3 h-3 -rotate-90" />
          <span className="font-semibold" style={{ color: 'var(--text)' }}>My Contracts</span>
        </div>

        <div className="flex items-end justify-between flex-wrap gap-4 mb-6">
          <div>
            <h1 className="font-extrabold text-4xl tracking-tight" style={{ fontFamily: "'Sora', sans-serif", color: 'var(--text)' }}>
              My Contracts<span style={{ color: 'var(--primary)' }}>.</span>
            </h1>
            <p className="text-sm mt-1.5" style={{ color: 'var(--muted)' }}>
              Manage your active, pending, and completed legal agreements.
            </p>
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
                <FileSignature className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>{counts.active}</div>
            <div className="text-[11px] mt-1" style={{ color: 'var(--soft)' }}>Currently in progress</div>
          </div>

          <div
            onClick={() => setActiveFilter('pending')}
            className="gd-card gd-stat-card p-5 cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: 'var(--muted)' }}>PENDING</span>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(245,158,11,0.12)', color: 'var(--warning)' }}>
                <Hourglass className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>{counts.pending}</div>
            <div className="text-[11px] mt-1" style={{ color: 'var(--soft)' }}>Awaiting client signature</div>
          </div>

          <div
            onClick={() => setActiveFilter('completed')}
            className="gd-card gd-stat-card p-5 cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: 'var(--muted)' }}>COMPLETED</span>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(132,204,22,0.12)', color: 'var(--accent)' }}>
                <CheckCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>{counts.completed || 12}</div>
            <div className="text-[11px] mt-1" style={{ color: 'var(--soft)' }}>Successfully finished</div>
          </div>

          <div className="gd-card gd-stat-card p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: 'var(--muted)' }}>IN ESCROW</span>
              <button
                onClick={toggleBalancesVisible}
                className="p-1 text-slate-400 hover:text-emerald-500 transition-colors"
                title={balancesVisible ? 'Hide Balances' : 'Show Balances'}
              >
                {balancesVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4 text-emerald-500" />}
              </button>
            </div>
            <div className="text-3xl font-extrabold tracking-tight text-emerald-600" style={{ fontFamily: "'Sora', sans-serif" }}>
              {balancesVisible ? '$9,200' : '•••••'}
            </div>
            <div className="text-[11px] mt-1" style={{ color: 'var(--soft)' }}>Funds secured in escrow</div>
          </div>
        </div>
      </section>

      {/* Filter Tabs & Search */}
      <section className="space-y-4 fade-up">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          {/* Filter Tabs */}
          <div className="flex items-center gap-1 p-1 rounded-xl" style={{ background: 'var(--bg-alt)' }}>
            {(['all', 'active', 'pending', 'completed'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
                  activeFilter === tab ? 'bg-[var(--sidebar)] text-white shadow-sm' : 'text-[var(--muted)] hover:text-[var(--text)]'
                }`}
              >
                {tab === 'all' ? 'All Contracts' : tab}
              </button>
            ))}
          </div>

          <div className="text-xs" style={{ color: 'var(--muted)' }}>
            Showing <span className="font-bold" style={{ color: 'var(--text)' }}>{filteredContracts.length}</span> contracts
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--soft)' }} />
          <input
            type="text"
            placeholder="Search contracts, clients..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="search-input w-full pl-11 pr-4 py-2.5 rounded-xl text-sm"
          />
        </div>
      </section>

      {/* Contracts Table */}
      <section className="gd-card overflow-hidden fade-up">
        {/* Table Header Labels */}
        <div className="grid grid-cols-12 gap-4 px-6 py-3 text-[10px] font-bold tracking-widest uppercase border-b" style={{ color: 'var(--soft)', background: 'var(--bg-alt)', borderColor: 'var(--border)' }}>
          <div className="col-span-5">PROJECT / CLIENT</div>
          <div className="col-span-2">TYPE</div>
          <div className="col-span-2">AMOUNT</div>
          <div className="col-span-2">STATUS</div>
          <div className="col-span-1 text-right">ACTION</div>
        </div>

        {/* Contract Items List */}
        <div className="divide-y overflow-y-auto max-h-[480px]" style={{ borderColor: 'var(--border)' }}>
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
                    <img src={c.clientAvatar} className="w-9 h-9 rounded-full object-cover flex-shrink-0" alt={c.client} />
                    <div className="min-w-0">
                      <div className="font-bold text-sm truncate" style={{ color: 'var(--text)' }}>{c.title}</div>
                      <div className="text-[11px] truncate flex items-center gap-1.5" style={{ color: 'var(--muted)' }}>
                        {c.client}
                        {c.verified && (
                          <span title="Verified Client">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500/20" />
                          </span>
                        )}
                      </div>
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
                      className="text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5"
                      style={{ background: sc.bg, color: sc.text }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
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

      {/* Contract Details Modal */}
      {selectedContract && (
        <div
          className="modal-backdrop active"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedContract(null);
          }}
        >
          <div className="modal-content p-7">
            <div className="flex items-start justify-between mb-5 pb-4 border-b" style={{ borderColor: 'var(--border)' }}>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-emerald-500">
                    <FileSignature className="w-4 h-4 text-white" />
                  </div>
                  <div className="getidone-text text-sm dark"><span className="geti">Geti</span><span className="done">Done</span></div>
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

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 rounded-xl" style={{ background: 'var(--bg-alt)' }}>
                <img src={selectedContract.clientAvatar} className="w-12 h-12 rounded-full object-cover" alt={selectedContract.client} />
                <div>
                  <div className="font-bold text-sm flex items-center gap-1.5">
                    {selectedContract.client}
                    {selectedContract.verified && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                  </div>
                  <div className="text-xs" style={{ color: 'var(--muted)' }}>Started on {selectedContract.date}</div>
                </div>
                <div className="ml-auto">
                  <span
                    className="text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5"
                    style={{ background: statusConfig[selectedContract.status].bg, color: statusConfig[selectedContract.status].text }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    {statusConfig[selectedContract.status].label}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl border" style={{ borderColor: 'var(--border)' }}>
                  <div className="text-[10px] font-bold tracking-wider uppercase mb-1" style={{ color: 'var(--muted)' }}>TYPE</div>
                  <div className="font-extrabold text-sm capitalize" style={{ fontFamily: "'Sora', sans-serif" }}>{selectedContract.type}</div>
                </div>
                <div className="p-3.5 rounded-xl border" style={{ borderColor: 'var(--border)' }}>
                  <div className="text-[10px] font-bold tracking-wider uppercase mb-1" style={{ color: 'var(--muted)' }}>AMOUNT</div>
                  <div className="font-extrabold text-sm" style={{ fontFamily: "'Sora', sans-serif" }}>
                    {selectedContract.type === 'fixed' ? `$${selectedContract.amount.toLocaleString()}` : `$${selectedContract.amount}/hr`}
                  </div>
                </div>
                <div className="p-3.5 rounded-xl border" style={{ borderColor: 'var(--border)' }}>
                  <div className="text-[10px] font-bold tracking-wider uppercase mb-1" style={{ color: 'var(--muted)' }}>DURATION</div>
                  <div className="font-extrabold text-sm" style={{ fontFamily: "'Sora', sans-serif" }}>{selectedContract.duration}</div>
                </div>
              </div>

              <div className="p-4 rounded-xl border" style={{ borderColor: 'var(--border)' }}>
                <div className="text-[10px] font-bold tracking-wider uppercase mb-2" style={{ color: 'var(--muted)' }}>PROJECT DESCRIPTION</div>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>{selectedContract.desc}</p>
              </div>

              {selectedContract.milestones.length > 0 && (
                <div className="p-4 rounded-xl border" style={{ borderColor: 'var(--border)' }}>
                  <div className="text-[10px] font-bold tracking-wider uppercase mb-3" style={{ color: 'var(--muted)' }}>MILESTONES</div>
                  <div className="space-y-2">
                    {selectedContract.milestones.map((m, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 rounded-xl border" style={{ borderColor: 'var(--border)', background: m.status === 'active' ? 'rgba(16,185,129,0.06)' : 'transparent' }}>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                          m.status === 'completed' ? 'bg-emerald-500 border-emerald-500 text-white' : m.status === 'active' ? 'border-emerald-500 bg-emerald-500/10' : 'border-slate-300'
                        }`}>
                          {m.status === 'completed' && <Check className="w-3.5 h-3.5" />}
                          {m.status === 'active' && <span className="w-2 h-2 rounded-full bg-emerald-500" />}
                        </div>
                        <span className={`text-xs font-semibold ${m.status === 'pending' ? 'text-slate-400' : 'text-slate-800 dark:text-white'}`}>
                          {m.name}
                        </span>
                        {m.status === 'active' && <span className="ml-auto text-[10px] font-bold text-emerald-600 uppercase">IN PROGRESS</span>}
                        {m.status === 'completed' && <span className="ml-auto text-[10px] font-bold text-lime-600 uppercase">DONE</span>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                {selectedContract.status === 'active' && (
                  <button
                    onClick={() => {
                      setSelectedContract(null);
                      showToast('Work Submitted', 'Client has been notified for deliverable review');
                    }}
                    className="flex-1 btn-primary py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2"
                  >
                    <UploadCloud className="w-4 h-4" /> Submit Work
                  </button>
                )}

                <button
                  onClick={() => {
                    setSelectedContract(null);
                    showToast('Message', `Opening chat with ${selectedContract.client}`);
                  }}
                  className="flex-1 btn-ghost py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" /> Message Client
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
