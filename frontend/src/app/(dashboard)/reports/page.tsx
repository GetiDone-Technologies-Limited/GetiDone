'use client';

import { useState, useRef } from 'react';
import {
  ChevronRight, Eye, EyeOff, Calculator, Clock, Users, FileText,
  FileSpreadsheet, FileCode, Check, X, ArrowUpRight
} from 'lucide-react';
import {
  ResponsiveContainer, AreaChart, Area, LineChart, Line, XAxis, YAxis,
  Tooltip as RechartsTooltip, CartesianGrid, PieChart, Pie, Cell, BarChart, Bar
} from 'recharts';

/* ==================== TYPES & MOCK DATA ==================== */
interface ToastState {
  title: string;
  msg: string;
  visible: boolean;
}

const spendingTrendData = [
  { month: 'Jan', budget: 3000, spent: 2400 },
  { month: 'Feb', budget: 3000, spent: 2800 },
  { month: 'Mar', budget: 4000, spent: 3200 },
  { month: 'Apr', budget: 4000, spent: 3800 },
  { month: 'May', budget: 5000, spent: 4200 },
  { month: 'Jun', budget: 5000, spent: 3900 },
  { month: 'Jul', budget: 5000, spent: 4800 },
  { month: 'Aug', budget: 6000, spent: 5200 },
  { month: 'Sep', budget: 6000, spent: 4600 },
  { month: 'Oct', budget: 7000, spent: 6100 },
  { month: 'Nov', budget: 7000, spent: 5800 },
  { month: 'Dec', budget: 7000, spent: 4560 },
];

const projectStatusData = [
  { name: 'Active', value: 12, color: '#10B981' },
  { name: 'Review', value: 5, color: '#F59E0B' },
  { name: 'Payment', value: 3, color: '#14B8A6' },
  { name: 'Done', value: 8, color: '#84CC16' },
];

const categoryData = [
  { category: 'Web Dev', budget: 8000, spent: 6500 },
  { category: 'Design', budget: 4000, spent: 3800 },
  { category: 'Marketing', budget: 5600, spent: 5200 },
  { category: 'Mobile', budget: 8200, spent: 3690 },
  { category: 'SEO', budget: 1500, spent: 450 },
];

const performersData = [
  { id: 1, name: 'Sarah Kim', role: 'Brand Designer', avatar: 'https://picsum.photos/seed/sarah/100/100.jpg', milestones: 12, progress: 92 },
  { id: 2, name: 'Marcus Lee', role: 'Lead Developer', avatar: 'https://picsum.photos/seed/marcus/100/100.jpg', milestones: 10, progress: 85 },
  { id: 3, name: 'Alex Chen', role: 'SEO Specialist', avatar: 'https://picsum.photos/seed/alex/100/100.jpg', milestones: 8, progress: 74 },
  { id: 4, name: 'Jenny Diaz', role: 'Content Strategist', avatar: 'https://picsum.photos/seed/jenny/100/100.jpg', milestones: 7, progress: 68 },
  { id: 5, name: 'David Wilson', role: 'QA Tester', avatar: 'https://picsum.photos/seed/david/100/100.jpg', milestones: 5, progress: 55 },
];

/* ==================== MAIN COMPONENT ==================== */
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
        <div className="flex items-end justify-between flex-wrap gap-4 mb-6">
          <div>
            <div className="flex items-center gap-1.5 text-xs mb-2" style={{ color: 'var(--muted)' }}>
              <span className="hover:text-emerald-600 cursor-pointer transition-colors">Dashboard</span>
              <ChevronRight className="w-3 h-3" />
              <span className="font-semibold" style={{ color: 'var(--text)' }}>Reports</span>
            </div>
            <h1 className="font-extrabold text-4xl tracking-tight" style={{ fontFamily: "'Sora', sans-serif", color: 'var(--text)' }}>
              Reports & Analytics<span style={{ color: 'var(--primary)' }}>.</span>
            </h1>
            <p className="text-sm mt-1.5" style={{ color: 'var(--muted)' }}>
              Track spending, project velocity, and team performance.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsExportModalOpen(true)}
              className="btn-primary px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2"
            >
              <ArrowUpRight className="w-4 h-4" />
              <span>Generate Report</span>
            </button>

            <div className="flex items-center gap-1 p-1 rounded-xl" style={{ background: 'var(--bg-alt)' }}>
              {(['7d', '30d', '90d', 'ytd'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => handleTimeRangeChange(range)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase transition-all ${
                    timeRange === range
                      ? 'bg-[#0A0F0D] text-white shadow-sm'
                      : 'text-[var(--muted)] hover:text-[var(--text)]'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Mini Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Spend */}
          <div className="gd-card gd-stat-card p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: 'var(--muted)' }}>TOTAL SPEND</span>
              <button
                onClick={() => setBalancesVisible(!balancesVisible)}
                className="text-[var(--muted)] hover:text-[var(--primary)] transition-all p-1"
                title="Hide/Show Balances"
              >
                {balancesVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4 text-[var(--primary)]" />}
              </button>
            </div>
            <div className="text-3xl font-extrabold tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>
              {balancesVisible ? '$28,600' : '•••••'}
            </div>
            <div className="text-[11px] mt-1" style={{ color: 'var(--soft)' }}>
              <span className="font-bold" style={{ color: 'var(--success)' }}>+18.2%</span> vs last period
            </div>
          </div>

          {/* Avg Project Cost */}
          <div className="gd-card gd-stat-card p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: 'var(--muted)' }}>AVG PROJECT COST</span>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(20,184,166,0.12)', color: 'var(--secondary)' }}>
                <Calculator className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>
              {balancesVisible ? '$2,383' : '•••••'}
            </div>
            <div className="text-[11px] mt-1" style={{ color: 'var(--soft)' }}>
              <span className="font-bold" style={{ color: 'var(--danger)' }}>-3.1%</span> vs last period
            </div>
          </div>

          {/* On-Time Delivery */}
          <div className="gd-card gd-stat-card p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: 'var(--muted)' }}>ON-TIME DELIVERY</span>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(132,204,22,0.12)', color: 'var(--accent)' }}>
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>
              94%
            </div>
            <div className="text-[11px] mt-1" style={{ color: 'var(--soft)' }}>
              <span className="font-bold" style={{ color: 'var(--success)' }}>+4.0%</span> vs last period
            </div>
          </div>

          {/* Active Freelancers */}
          <div className="gd-card gd-stat-card p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: 'var(--muted)' }}>ACTIVE FREELANCERS</span>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(245,158,11,0.12)', color: 'var(--warning)' }}>
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>
              15
            </div>
            <div className="text-[11px] mt-1" style={{ color: 'var(--soft)' }}>
              4 added this month
            </div>
          </div>
        </div>
      </section>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 fade-up">
        {/* Spending Trend (2 cols) */}
        <div className="lg:col-span-2 gd-card p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-bold text-lg" style={{ fontFamily: "'Sora', sans-serif" }}>Spending Trend</h2>
              <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>Monthly expenditure over time</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm" style={{ background: 'var(--primary)' }}></span> Spent
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm" style={{ background: 'var(--bg-alt)', border: '1px solid var(--border)' }}></span> Budget
              </div>
            </div>
          </div>

          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={spendingTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="spentGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.04)" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#5A6B62' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#5A6B62' }} tickFormatter={(val) => `$${val / 1000}k`} />
                <RechartsTooltip
                  contentStyle={{ backgroundColor: '#0A0F0D', border: 'none', borderRadius: '8px', color: '#FFF' }}
                  formatter={(val: any) => [`$${val}`, '']}
                />
                <Area type="monotone" dataKey="spent" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#spentGradient)" />
                <Line type="monotone" dataKey="budget" stroke="#94A39A" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Project Status (1 col) */}
        <div className="gd-card p-6 flex flex-col justify-between">
          <div>
            <h2 className="font-bold text-lg" style={{ fontFamily: "'Sora', sans-serif" }}>Project Status</h2>
            <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>Current distribution</p>
          </div>

          <div className="h-[220px] w-full relative my-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={projectStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {projectStatusData.map((entry, index) => (
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
            {projectStatusData.map((item) => (
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
        {/* Budget vs Spent by Category */}
        <div className="gd-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-bold text-lg" style={{ fontFamily: "'Sora', sans-serif" }}>Budget vs Spent by Category</h2>
              <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>Allocation efficiency</p>
            </div>
          </div>

          <div className="h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.04)" />
                <XAxis dataKey="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#5A6B62' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#5A6B62' }} tickFormatter={(val) => `$${val / 1000}k`} />
                <RechartsTooltip
                  contentStyle={{ backgroundColor: '#0A0F0D', border: 'none', borderRadius: '8px', color: '#FFF' }}
                  formatter={(val: any) => [`$${val}`, '']}
                />
                <Bar dataKey="budget" fill="#E2EAE5" radius={[6, 6, 0, 0]} barSize={16} />
                <Bar dataKey="spent" fill="#10B981" radius={[6, 6, 0, 0]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Performers */}
        <div className="gd-card p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-bold text-lg" style={{ fontFamily: "'Sora', sans-serif" }}>Top Performers</h2>
              <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>Based on delivered milestones</p>
            </div>
            <button
              onClick={() => showToast('Team', 'Viewing full team performance list')}
              className="text-[11px] font-semibold hover:underline"
              style={{ color: 'var(--primary)' }}
            >
              View All
            </button>
          </div>

          <div className="space-y-2">
            {performersData.map((p, i) => (
              <div
                key={p.id}
                className="flex items-center gap-3 p-2.5 rounded-xl transition-all hover:bg-[var(--bg-alt)] hover:translate-x-1"
              >
                <div className="text-xs font-bold w-4 text-center" style={{ color: i === 0 ? 'var(--warning)' : 'var(--soft)' }}>
                  {i + 1}
                </div>
                <img src={p.avatar} className="w-9 h-9 rounded-full object-cover flex-shrink-0" alt={p.name} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold truncate">{p.name}</div>
                  <div className="progress-track mt-1.5 h-1.5">
                    <div
                      className="progress-fill h-full rounded-full"
                      style={{ width: `${p.progress}%`, background: 'linear-gradient(90deg, var(--primary), var(--accent))' }}
                    />
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-sm font-bold">{p.milestones}</div>
                  <div className="text-[10px]" style={{ color: 'var(--soft)' }}>done</div>
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
            <div className="flex items-start justify-between mb-5">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #10B981, #34D399)' }}>
                    <ArrowUpRight className="w-4 h-4 text-white font-bold" />
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
                    <span className="text-sm">Financial Summary</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded text-emerald-500 focus:ring-emerald-400" />
                    <span className="text-sm">Project Statuses</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded text-emerald-500 focus:ring-emerald-400" />
                    <span className="text-sm">Team Performance</span>
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
