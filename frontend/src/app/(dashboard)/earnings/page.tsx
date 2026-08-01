'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import {
  DollarSign, Hourglass, Sack, CalendarCheck, Eye, EyeOff,
  ChevronDown, Building2, Download, Plus, Trash2, ArrowUpRight,
  ArrowDownRight, Check, X, ShieldCheck, FileText
} from 'lucide-react';
import { useAuthStore } from '@/store/auth.store';

type TxnStatus = 'all' | 'deposit' | 'withdrawal';

interface TransactionItem {
  id: number;
  project: string;
  client: string;
  avatar: string;
  date: string;
  status: 'deposit' | 'withdrawal';
  amount: number;
}

const initialTransactions: TransactionItem[] = [
  { id: 1, project: 'E-commerce Platform Redesign', client: 'TechNova Inc.', avatar: 'https://picsum.photos/seed/technovalogo/100/100.jpg', date: 'Dec 12, 2024', status: 'deposit', amount: 1500 },
  { id: 2, project: 'Bank Account Withdrawal', client: 'Chase ****4242', avatar: 'https://picsum.photos/seed/chase/100/100.jpg', date: 'Dec 10, 2024', status: 'withdrawal', amount: 2000 },
  { id: 3, project: 'Real-Time Analytics Dashboard', client: 'Frame.io', avatar: 'https://picsum.photos/seed/frameio/100/100.jpg', date: 'Dec 05, 2024', status: 'deposit', amount: 3000 },
  { id: 4, project: 'Backend API Developer', client: 'Innovatech', avatar: 'https://picsum.photos/seed/innovatech/100/100.jpg', date: 'Dec 01, 2024', status: 'deposit', amount: 2800 },
  { id: 5, project: 'PayPal Withdrawal', client: 'd.benson@email.com', avatar: 'https://picsum.photos/seed/paypal/100/100.jpg', date: 'Nov 28, 2024', status: 'withdrawal', amount: 1500 },
  { id: 6, project: 'SEO Specialist for SaaS', client: 'Flutterwave', avatar: 'https://picsum.photos/seed/flutterwave/100/100.jpg', date: 'Nov 20, 2024', status: 'deposit', amount: 1100 }
];

interface ToastState {
  title: string;
  msg: string;
  visible: boolean;
}

export default function EarningsPage() {
  const { user } = useAuthStore();
  const [txnList, setTxnList] = useState<TransactionItem[]>(initialTransactions);
  const [activeFilter, setActiveFilter] = useState<TxnStatus>('all');
  const [balancesVisible, setBalancesVisible] = useState(true);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [isAddPayoutOpen, setIsAddPayoutOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawMethod, setWithdrawMethod] = useState('Bank Account (Chase ****4242)');
  const [toastState, setToastState] = useState<ToastState>({ title: '', msg: '', visible: false });
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (title: string, msg: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToastState({ title, msg, visible: true });
    toastTimer.current = setTimeout(() => setToastState(t => ({ ...t, visible: false })), 3000);
  };

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!withdrawAmount) return;
    showToast('Withdrawal Initiated', `Your withdrawal of $${withdrawAmount} will arrive in 1-3 business days`);
    setIsWithdrawOpen(false);
    setWithdrawAmount('');
  };

  const handleAddPayoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Payout Method Added', 'Your new payout method has been verified');
    setIsAddPayoutOpen(false);
  };

  const filteredTxns = txnList.filter(t => {
    if (activeFilter === 'deposit') return t.status === 'deposit';
    if (activeFilter === 'withdrawal') return t.status === 'withdrawal';
    return true;
  });

  return (
    <div className="space-y-6 pb-8">
      {/* Page Header */}
      <section className="fade-up">
        <div className="flex items-center gap-2 mb-2 text-xs" style={{ color: 'var(--muted)' }}>
          <Link href="/freelancer" className="hover:text-emerald-600 transition-colors">Dashboard</Link>
          <ChevronDown className="w-3 h-3 -rotate-90" />
          <span className="font-semibold" style={{ color: 'var(--text)' }}>Payments & Earnings</span>
        </div>

        <div className="flex items-end justify-between flex-wrap gap-4 mb-6">
          <div>
            <h1 className="font-extrabold text-4xl tracking-tight" style={{ fontFamily: "'Sora', sans-serif", color: 'var(--text)' }}>
              Payments & Earnings<span style={{ color: 'var(--primary)' }}>.</span>
            </h1>
            <p className="text-sm mt-1.5" style={{ color: 'var(--muted)' }}>
              Manage your balance, view transaction history, and withdraw funds.
            </p>
          </div>

          <button
            onClick={() => setIsWithdrawOpen(true)}
            className="btn-primary px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2"
          >
            <DollarSign className="w-4 h-4" />
            <span>Withdraw Funds</span>
          </button>
        </div>

        {/* Stats Mini Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="gd-card gd-stat-card p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: 'var(--muted)' }}>AVAILABLE</span>
              <button
                onClick={() => setBalancesVisible(!balancesVisible)}
                className="p-1 text-slate-400 hover:text-emerald-500 transition-colors"
                title={balancesVisible ? 'Hide Balances' : 'Show Balances'}
              >
                {balancesVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4 text-emerald-500" />}
              </button>
            </div>
            <div className="text-3xl font-extrabold tracking-tight text-emerald-600" style={{ fontFamily: "'Sora', sans-serif" }}>
              {balancesVisible ? '$4,560' : '•••••'}
            </div>
            <div className="text-[11px] mt-1" style={{ color: 'var(--soft)' }}>Ready for withdrawal</div>
          </div>

          <div className="gd-card gd-stat-card p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: 'var(--muted)' }}>PENDING CLEARANCE</span>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(245,158,11,0.12)', color: 'var(--warning)' }}>
                <Hourglass className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>
              {balancesVisible ? '$1,200' : '•••••'}
            </div>
            <div className="text-[11px] mt-1" style={{ color: 'var(--soft)' }}>Escrow releasing in 3 days</div>
          </div>

          <div className="gd-card gd-stat-card p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: 'var(--muted)' }}>TOTAL EARNED</span>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(20,184,166,0.12)', color: 'var(--secondary)' }}>
                <Sack className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>
              {balancesVisible ? '$48,250' : '•••••'}
            </div>
            <div className="text-[11px] mt-1" style={{ color: 'var(--soft)' }}>All-time earnings</div>
          </div>

          <div className="gd-card gd-stat-card p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: 'var(--muted)' }}>THIS MONTH</span>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(132,204,22,0.12)', color: 'var(--accent)' }}>
                <CalendarCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>
              {balancesVisible ? '$8,400' : '•••••'}
            </div>
            <div className="text-[11px] mt-1" style={{ color: 'var(--soft)' }}>Earned this month</div>
          </div>
        </div>
      </section>

      {/* Main Content Grid (Transactions + Payout & Tax Info) */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 fade-up">
        {/* Left Column: Transaction History (2 Cols) */}
        <div className="lg:col-span-2 gd-card flex flex-col overflow-hidden">
          <div className="p-6 border-b" style={{ borderColor: 'var(--border)' }}>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h2 className="font-extrabold text-xl" style={{ fontFamily: "'Sora', sans-serif" }}>Transaction History</h2>
                <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>All payments and withdrawals</p>
              </div>

              <div className="flex items-center gap-1 p-1 rounded-xl" style={{ background: 'var(--bg-alt)' }}>
                {(['all', 'deposit', 'withdrawal'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveFilter(tab)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
                      activeFilter === tab ? 'bg-[var(--sidebar)] text-white shadow-sm' : 'text-[var(--muted)] hover:text-[var(--text)]'
                    }`}
                  >
                    {tab === 'all' ? 'All' : tab === 'deposit' ? 'Earnings' : 'Withdrawals'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-3 text-[10px] font-bold tracking-widest uppercase border-b" style={{ background: 'var(--bg-alt)', color: 'var(--soft)', borderColor: 'var(--border)' }}>
            <div className="col-span-6">PROJECT / CLIENT</div>
            <div className="col-span-3">DATE</div>
            <div className="col-span-3 text-right">AMOUNT</div>
          </div>

          {/* Transaction Items List */}
          <div className="divide-y overflow-y-auto max-h-[480px]" style={{ borderColor: 'var(--border)' }}>
            {filteredTxns.length === 0 ? (
              <div className="p-8 text-center" style={{ color: 'var(--muted)' }}>No transactions found</div>
            ) : (
              filteredTxns.map((t) => {
                const isDeposit = t.status === 'deposit';
                return (
                  <div key={t.id} className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-[var(--bg-alt)] transition-all cursor-pointer">
                    <div className="col-span-6 flex items-center gap-3 min-w-0">
                      <img src={t.avatar} className="w-9 h-9 rounded-full object-cover flex-shrink-0" alt={t.project} />
                      <div className="min-w-0">
                        <div className="font-bold text-sm truncate" style={{ color: 'var(--text)' }}>{t.project}</div>
                        <div className="text-[11px] truncate" style={{ color: 'var(--muted)' }}>{t.client}</div>
                      </div>
                    </div>

                    <div className="col-span-3 text-xs font-medium" style={{ color: 'var(--muted)' }}>{t.date}</div>

                    <div className="col-span-3 text-right">
                      <div className="font-extrabold text-sm" style={{ fontFamily: "'Sora', sans-serif", color: isDeposit ? 'var(--primary)' : 'var(--text)' }}>
                        {isDeposit ? '+' : '-'}${t.amount.toLocaleString()}
                      </div>
                      <div className="text-[10px] uppercase font-bold tracking-wider" style={{ color: 'var(--soft)' }}>{t.status}</div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Payout Methods & Tax Information */}
        <div className="space-y-6 flex flex-col">
          {/* Payout Methods Card */}
          <div className="gd-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-base" style={{ fontFamily: "'Sora', sans-serif" }}>Payout Methods</h3>
              <button
                onClick={() => setIsAddPayoutOpen(true)}
                className="text-xs font-bold text-emerald-600 hover:underline"
              >
                Add New
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-xl border flex items-center gap-3 bg-[var(--bg-alt)]" style={{ borderColor: 'var(--border)' }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-slate-900 text-white font-bold flex-shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-xs truncate">Bank Account (USD)</div>
                  <div className="text-[11px] truncate" style={{ color: 'var(--muted)' }}>Chase ****4242</div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase bg-emerald-500/10 text-emerald-600">Active</span>
              </div>

              <div className="p-4 rounded-xl border flex items-center gap-3 bg-[var(--bg-alt)]" style={{ borderColor: 'var(--border)' }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-emerald-500 text-white font-bold flex-shrink-0">
                  <Sack className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-xs truncate">PayPal</div>
                  <div className="text-[11px] truncate" style={{ color: 'var(--muted)' }}>d.benson@email.com</div>
                </div>
                <button
                  onClick={() => showToast('Removed', 'PayPal account unlinked')}
                  className="btn-danger px-2.5 py-1 rounded text-[10px] font-bold"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>

          {/* Tax Information Card */}
          <div className="gd-card p-6 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-base" style={{ fontFamily: "'Sora', sans-serif" }}>Tax Information</h3>
                <FileText className="w-4 h-4 text-[var(--soft)]" />
              </div>

              <div className="p-4 rounded-xl space-y-2 mb-4 bg-[var(--bg-alt)]">
                <div className="flex items-center justify-between text-xs">
                  <span style={{ color: 'var(--muted)' }}>VAT / TAX ID</span>
                  <span className="font-bold">NG-12345678</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span style={{ color: 'var(--muted)' }}>WITHHELD THIS YEAR</span>
                  <span className="font-bold">$2,400</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => showToast('Download', 'Downloading 1099 Tax Form...')}
              className="w-full btn-ghost py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download 1099 Form</span>
            </button>
          </div>

          {/* Escrow & Payment Protection Banner */}
          <div className="p-5 rounded-2xl relative overflow-hidden text-white" style={{ background: 'linear-gradient(135deg, #0A0F0D 0%, #131A16 100%)', border: '1px solid rgba(16,185,129,0.2)' }}>
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold tracking-wider text-emerald-400 uppercase">GETIDONE ESCROW PROTECTION</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              All project funds are deposited into verified Escrow before work begins. Your payouts are 100% guaranteed upon milestone approval.
            </p>
            <div className="flex items-center gap-2 text-[11px] font-semibold text-emerald-400">
              <Check className="w-3.5 h-3.5" />
              <span>Zero Transaction Fee Payouts</span>
            </div>
          </div>
        </div>
      </section>

      {/* Withdraw Modal */}
      {isWithdrawOpen && (
        <div
          className="modal-backdrop active"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsWithdrawOpen(false);
          }}
        >
          <div className="modal-content p-7">
            <div className="flex items-start justify-between mb-5 pb-4 border-b" style={{ borderColor: 'var(--border)' }}>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-emerald-500">
                    <DollarSign className="w-4 h-4 text-white" />
                  </div>
                  <div className="getidone-text text-sm dark"><span className="geti">Geti</span><span className="done">Done</span></div>
                </div>
                <div className="text-[11px] font-bold tracking-widest uppercase mb-1" style={{ color: 'var(--primary)' }}>PAYOUT</div>
                <h2 className="font-extrabold text-2xl" style={{ fontFamily: "'Sora', sans-serif" }}>Withdraw Funds</h2>
                <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>Transfer your available balance to your bank or PayPal.</p>
              </div>
              <button
                onClick={() => setIsWithdrawOpen(false)}
                className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleWithdrawSubmit} className="space-y-4">
              <div className="p-4 rounded-xl flex items-center justify-between bg-[var(--bg-alt)]">
                <span className="text-xs font-bold" style={{ color: 'var(--muted)' }}>Available Balance</span>
                <span className="text-xl font-extrabold text-emerald-600" style={{ fontFamily: "'Sora', sans-serif" }}>$4,560</span>
              </div>

              <div>
                <label className="text-xs font-bold tracking-wider mb-1.5 block uppercase" style={{ color: 'var(--muted)' }}>AMOUNT TO WITHDRAW ($)</label>
                <input
                  type="number"
                  placeholder="e.g. 1000"
                  value={withdrawAmount}
                  onChange={e => setWithdrawAmount(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none"
                  style={{ borderColor: 'var(--border)', background: 'var(--bg-alt)' }}
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold tracking-wider mb-1.5 block uppercase" style={{ color: 'var(--muted)' }}>SELECT PAYOUT METHOD</label>
                <select
                  value={withdrawMethod}
                  onChange={e => setWithdrawMethod(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none cursor-pointer"
                  style={{ borderColor: 'var(--border)', background: 'var(--bg-alt)', color: 'var(--text)' }}
                >
                  <option>Bank Account (Chase ****4242)</option>
                  <option>PayPal (d.benson@email.com)</option>
                </select>
              </div>

              <div className="p-4 rounded-xl flex items-center gap-3 bg-[var(--bg-alt)]">
                <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <p className="text-xs" style={{ color: 'var(--muted)' }}>
                  Transfers typically take 1-3 business days to appear in your account.
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsWithdrawOpen(false)}
                  className="flex-1 btn-ghost py-3 rounded-xl text-sm font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 btn-primary py-3 rounded-xl text-sm font-bold"
                >
                  Confirm Withdrawal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Payout Method Modal */}
      {isAddPayoutOpen && (
        <div
          className="modal-backdrop active"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsAddPayoutOpen(false);
          }}
        >
          <div className="modal-content p-7">
            <div className="flex items-start justify-between mb-5 pb-4 border-b" style={{ borderColor: 'var(--border)' }}>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-emerald-500">
                    <Building2 className="w-4 h-4 text-white" />
                  </div>
                  <div className="getidone-text text-sm dark"><span className="geti">Geti</span><span className="done">Done</span></div>
                </div>
                <div className="text-[11px] font-bold tracking-widest uppercase mb-1" style={{ color: 'var(--primary)' }}>NEW METHOD</div>
                <h2 className="font-extrabold text-2xl" style={{ fontFamily: "'Sora', sans-serif" }}>Add Payout Method</h2>
              </div>
              <button
                onClick={() => setIsAddPayoutOpen(false)}
                className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddPayoutSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold tracking-wider mb-1.5 block uppercase" style={{ color: 'var(--muted)' }}>ACCOUNT HOLDER NAME</label>
                <input
                  type="text"
                  placeholder="Daniel Benson"
                  className="w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none"
                  style={{ borderColor: 'var(--border)', background: 'var(--bg-alt)' }}
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold tracking-wider mb-1.5 block uppercase" style={{ color: 'var(--muted)' }}>ACCOUNT NUMBER</label>
                <input
                  type="text"
                  placeholder="0123456789"
                  className="w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none"
                  style={{ borderColor: 'var(--border)', background: 'var(--bg-alt)' }}
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold tracking-wider mb-1.5 block uppercase" style={{ color: 'var(--muted)' }}>ROUTING NUMBER</label>
                <input
                  type="text"
                  placeholder="987654321"
                  className="w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none"
                  style={{ borderColor: 'var(--border)', background: 'var(--bg-alt)' }}
                  required
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddPayoutOpen(false)}
                  className="flex-1 btn-ghost py-3 rounded-xl text-sm font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 btn-primary py-3 rounded-xl text-sm font-bold"
                >
                  Add Method
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
