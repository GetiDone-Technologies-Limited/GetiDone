'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import {
  ChevronRight, Eye, EyeOff, Send, Target, DollarSign,
  Download, FileText, FileSpreadsheet, FileCode, Check, X,
  ChevronDown, BarChart2, TrendingUp, Users
} from 'lucide-react';
import {
  ResponsiveContainer, AreaChart, Area, Line, XAxis, YAxis,
  Tooltip as RechartsTooltip, CartesianGrid, PieChart, Pie, Cell, BarChart, Bar
} from 'recharts';

/* ==================== TYPES & MOCK DATA ==================== */
interface ToastState {
  title: string;
  msg: string;
  visible: boolean;
}

const earningsTrendData = [
  { month: 'Jul', earned: 3200, escrow: 1000 },
  { month: 'Aug', earned: 4100, escrow: 1500 },
  { month: 'Sep', earned: 3800, escrow: 1200 },
  { month: 'Oct', earned: 5200, escrow: 2000 },
  { month: 'Nov', earned: 4800, escrow: 1800 },
  { month: 'Dec', earned: 6100, escrow: 1200 },
];

const proposalStatusData = [
  { name: 'Hired', value: 10, color: '#10B981' },
  { name: 'Pending', value: 4, color: '#F59E0B' },
  { name: 'Interview', value: 2, color: '#14B8A6' },
  { name: 'Declined', value: 8, color: '#EF4444' },
];

const categoryEarningsData = [
  { category: 'Web Dev', earned: 25000 },
  { category: 'UI/UX', earned: 8000 },
  { category: 'Mobile', earned: 10000 },
  { category: 'SEO', earned: 3000 },
  { category: 'DevOps', earned: 2250 },
];

const topClientsData = [
  { id: 1, name: 'TechNova Inc.', role: 'E-commerce Platform', avatar: 'https://picsum.photos/seed/technovalogo/100/100.jpg', earnings: 12000, progress: 92 },
  { id: 2, name: 'Innovatech', role: 'Backend API Dev', avatar: 'https://picsum.photos/seed/innovatech/100/100.jpg', earnings: 8500, progress: 85 },
  { id: 3, name: 'Frame.io', role: 'Analytics Dashboard', avatar: 'https://picsum.photos/seed/frameio/100/100.jpg', earnings: 6000, progress: 74 },
  { id: 4, name: 'Paystack', role: 'Mobile App UI', avatar: 'https://picsum.photos/seed/paystack/100/100.jpg', earnings: 4500, progress: 55 },
];

export default function ReportsPage() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | 'ytd'>('30d');
  const [balancesVisible, setBalancesVisible] = useState(true);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState<'pdf' | 'excel' | 'csv'>('pdf');
  const [toastState, setToastState] = useState<ToastState>({ title: '', msg: '', visible: false });
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (title: string, msg: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToastState({ title, msg, visible: true });
    toastTimer.current = setTimeout(() => setToastState(t => ({ ...t, visible: false })), 3200);
  };

  const handleTimeRangeChange = (range: '7d' | '30d' | '90d' | 'ytd') => {
    setTimeRange(range);
    showToast('Range Updated', `Showing data for ${range.toUpperCase()}`);
  };

  return (
    <div className="space-y-8 pb-8">
      {/* Page Header */}
      <section className="fade-up">
        <div className="flex items-center gap-2 mb-2 text-xs" style={{ color: 'var(--muted)' }}>
          <Link href="/freelancer" className="hover:text-emerald-600 transition-colors">Dashboard</Link>
          <ChevronDown className="w-3 h-3 -rotate-90" />
          <span className="font-semibold" style={{ color: 'var(--text)' }}>Reports & Analytics</span>
        </div>

        <div className="flex items-end justify-between flex-wrap gap-4 mb-6">
          <div>
            <h1 className="font-extrabold text-4xl tracking-tight" style={{ fontFamily: "'Sora', sans-serif", color: 'var(--text)' }}>
              Reports & Analytics<span style={{ color: 'var(--primary)' }}>.</span>
            </h1>
            <p className="text-sm mt-1.5" style={{ color: 'var(--muted)' }}>
              Track your earnings, proposal success rate, and top performing categories.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 p-1 rounded-xl" style={{ background: 'var(--bg-alt)' }}>
              {(['7d', '30d', '90d', 'ytd'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => handleTimeRangeChange(range)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase transition-all ${
                    timeRange === range
                      ? 'bg-[var(--sidebar)] text-white shadow-sm'
                      : 'text-[var(--muted)] hover:text-[var(--text)]'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsExportModalOpen(true)}
              className="btn-ghost px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-xs" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Stats Mini Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Earned */}
          <div className="gd-card gd-stat-card p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: 'var(--muted)' }}>TOTAL EARNED</span>
              <button
                onClick={() => setBalancesVisible(!balancesVisible)}
                className="text-[var(--muted)] hover:text-[var(--primary)] transition-all p-1"
                title="Hide/Show Balances"
              >
                {balancesVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4 text-[var(--primary)]" />}
              </button>
            </div>
            <div className="text-3xl font-extrabold tracking-tight text-emerald-600" style={{ fontFamily: "'Sora', sans-serif" }}>
              {balancesVisible ? '$48,250' : '•••••'}
            </div>
            <div className="text-[11px] mt-1" style={{ color: 'var(--soft)' }}>
              <span className="font-bold text-emerald-600">+18.2%</span> vs last period
            </div>
          </div>

          {/* Proposals Sent */}
          <div className="gd-card gd-stat-card p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: 'var(--muted)' }}>PROPOSALS SENT</span>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(20,184,166,0.12)', color: 'var(--secondary)' }}>
                <Send className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>
              24
            </div>
            <div className="text-[11px] mt-1" style={{ color: 'var(--soft)' }}>
              <span className="font-bold text-emerald-600">+4</span> this month
            </div>
          </div>

          {/* Success Rate */}
          <div className="gd-card gd-stat-card p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: 'var(--muted)' }}>SUCCESS RATE</span>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(132,204,22,0.12)', color: 'var(--accent)' }}>
                <Target className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>
              42%
            </div>
            <div className="text-[11px] mt-1" style={{ color: 'var(--soft)' }}>
              10 hired out of 24
            </div>
          </div>

          {/* Avg Hourly Rate */}
          <div className="gd-card gd-stat-card p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: 'var(--muted)' }}>AVG HOURLY RATE</span>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(245,158,11,0.12)', color: 'var(--warning)' }}>
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>
              {balancesVisible ? '$85/hr' : '•••••'}
            </div>
            <div className="text-[11px] mt-1" style={{ color: 'var(--soft)' }}>
              <span className="font-bold text-emerald-600">+$5</span> vs last period
            </div>
          </div>
        </div>
      </section>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 fade-up">
        {/* Earnings Trend (2 cols) */}
        <div className="lg:col-span-2 gd-card p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-bold text-lg" style={{ fontFamily: "'Sora', sans-serif" }}>Earnings Trend</h2>
              <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>Monthly earnings vs pending escrow</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500"></span> Earned
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-lime-500"></span> Pending Escrow
              </div>
            </div>
          </div>

          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={earningsTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="earnedGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="escrowGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#84CC16" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#84CC16" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.04)" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#5A6B62' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#5A6B62' }} tickFormatter={(val) => `$${val / 1000}k`} />
                <RechartsTooltip
                  contentStyle={{ backgroundColor: '#0A0F0D', border: 'none', borderRadius: '8px', color: '#FFF' }}
                  formatter={(val: any) => [`$${val.toLocaleString()}`, '']}
                />
                <Area type="monotone" dataKey="earned" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#earnedGradient)" />
                <Line type="monotone" dataKey="escrow" stroke="#84CC16" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Proposal Status (1 col) */}
        <div className="gd-card p-6 flex flex-col justify-between">
          <div>
            <h2 className="font-bold text-lg" style={{ fontFamily: "'Sora', sans-serif" }}>Proposal Status</h2>
            <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>Success rate breakdown</p>
          </div>

          <div className="h-[220px] w-full relative my-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={proposalStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {proposalStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="#FFFFFF" strokeWidth={3} />
                  ))}
                </Pie>
                <RechartsTooltip
                  contentStyle={{ backgroundColor: '#0A0F0D', border: 'none', borderRadius: '8px', color: '#FFF' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs pt-2">
            {proposalStatusData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: item.color }}></span>
                <span style={{ color: 'var(--muted)' }}>{item.name}</span>
                <span className="ml-auto font-bold" style={{ color: 'var(--text)' }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 fade-up">
        {/* Earnings by Category */}
        <div className="gd-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-bold text-lg" style={{ fontFamily: "'Sora', sans-serif" }}>Earnings by Category</h2>
              <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>Which skills pay the most</p>
            </div>
          </div>

          <div className="h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryEarningsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.04)" />
                <XAxis dataKey="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#5A6B62' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#5A6B62' }} tickFormatter={(val) => `$${val / 1000}k`} />
                <RechartsTooltip
                  contentStyle={{ backgroundColor: '#0A0F0D', border: 'none', borderRadius: '8px', color: '#FFF' }}
                  formatter={(val: any) => [`$${val.toLocaleString()}`, '']}
                />
                <Bar dataKey="earned" fill="#10B981" radius={[6, 6, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Clients */}
        <div className="gd-card p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-bold text-lg" style={{ fontFamily: "'Sora', sans-serif" }}>Top Clients</h2>
              <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>Based on total revenue generated</p>
            </div>
            <button
              onClick={() => showToast('Clients', 'Viewing all clients')}
              className="text-[11px] font-semibold hover:underline text-emerald-600"
            >
              View All
            </button>
          </div>

          <div className="space-y-2">
            {topClientsData.map((p, i) => (
              <div
                key={p.id}
                className="flex items-center gap-3 p-2.5 rounded-xl transition-all hover:bg-[var(--bg-alt)] hover:translate-x-1 cursor-pointer"
              >
                <div className="text-xs font-bold w-4 text-center text-amber-500">
                  {i + 1}
                </div>
                <img src={p.avatar} className="w-9 h-9 rounded-full object-cover flex-shrink-0" alt={p.name} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold truncate">{p.name}</div>
                  <div className="progress-track mt-1.5 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="progress-fill h-full rounded-full bg-gradient-to-r from-emerald-500 to-lime-500"
                      style={{ width: `${p.progress}%` }}
                    />
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-sm font-bold" style={{ fontFamily: "'Sora', sans-serif" }}>
                    {balancesVisible ? `$${p.earnings.toLocaleString()}` : '•••••'}
                  </div>
                  <div className="text-[10px]" style={{ color: 'var(--soft)' }}>earned</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Export / Generate Report Modal */}
      {isExportModalOpen && (
        <div
          className="modal-backdrop active"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsExportModalOpen(false);
          }}
        >
          <div className="modal-content p-7">
            <div className="flex items-start justify-between mb-5 pb-4 border-b" style={{ borderColor: 'var(--border)' }}>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-emerald-500">
                    <BarChart2 className="w-4 h-4 text-white" />
                  </div>
                  <div className="getidone-text text-sm dark"><span className="geti">Geti</span><span className="done">Done</span></div>
                </div>
                <div className="text-[11px] font-bold tracking-widest uppercase mb-1" style={{ color: 'var(--primary)' }}>REPORTING</div>
                <h2 className="font-extrabold text-2xl" style={{ fontFamily: "'Sora', sans-serif" }}>Generate Report</h2>
                <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>Select format and date range to export.</p>
              </div>
              <button
                onClick={() => setIsExportModalOpen(false)}
                className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold tracking-wider mb-1.5 block uppercase" style={{ color: 'var(--muted)' }}>FORMAT</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setExportFormat('pdf')}
                    className={`p-4 rounded-xl border-2 flex flex-col items-center gap-1 transition-all ${
                      exportFormat === 'pdf' ? 'border-[var(--primary)] bg-[rgba(16,185,129,0.05)]' : 'border-[var(--border)]'
                    }`}
                  >
                    <FileText className="w-6 h-6 text-red-500" />
                    <span className="text-xs font-bold">PDF</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setExportFormat('excel')}
                    className={`p-4 rounded-xl border-2 flex flex-col items-center gap-1 transition-all ${
                      exportFormat === 'excel' ? 'border-[var(--primary)] bg-[rgba(16,185,129,0.05)]' : 'border-[var(--border)]'
                    }`}
                  >
                    <FileSpreadsheet className="w-6 h-6 text-emerald-500" />
                    <span className="text-xs font-bold">Excel</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setExportFormat('csv')}
                    className={`p-4 rounded-xl border-2 flex flex-col items-center gap-1 transition-all ${
                      exportFormat === 'csv' ? 'border-[var(--primary)] bg-[rgba(16,185,129,0.05)]' : 'border-[var(--border)]'
                    }`}
                  >
                    <FileCode className="w-6 h-6 text-teal-500" />
                    <span className="text-xs font-bold">CSV</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold tracking-wider mb-1.5 block uppercase" style={{ color: 'var(--muted)' }}>DATE RANGE</label>
                <div className="grid grid-cols-2 gap-3">
                  <input type="date" className="w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none" style={{ borderColor: 'var(--border)', background: 'var(--bg-alt)' }} />
                  <input type="date" className="w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none" style={{ borderColor: 'var(--border)', background: 'var(--bg-alt)' }} />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold tracking-wider mb-1.5 block uppercase" style={{ color: 'var(--muted)' }}>INCLUDE</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded text-emerald-500 focus:ring-emerald-400" />
                    <span className="text-sm">Earnings Summary</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded text-emerald-500 focus:ring-emerald-400" />
                    <span className="text-sm">Proposal Statistics</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded text-emerald-500 focus:ring-emerald-400" />
                    <span className="text-sm">Client Demographics</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsExportModalOpen(false)}
                  className="flex-1 btn-ghost py-3 rounded-xl text-sm font-bold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsExportModalOpen(false);
                    showToast('Generating', `Your ${exportFormat.toUpperCase()} report is being prepared`);
                  }}
                  className="flex-1 btn-primary py-3 rounded-xl text-sm font-bold"
                >
                  Export Now
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
