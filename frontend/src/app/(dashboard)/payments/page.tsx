'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Plus, Search, Download, TrendingUp, Clock, CheckDouble, Wallet,
  Eye, EyeOff, MoreHorizontal, FileText, ArrowRight, X
} from 'lucide-react';
import { useGlobalPaymentHistory } from '@/features/payment/hooks/useGlobalPaymentHistory';

const mockTransactions = [
  { id: 't1', project: 'E-commerce Website Redesign', freelancer: 'Sarah Kim', role: 'Brand Designer', amount: 1250, date: 'Dec 8, 2025', status: 'Released', avatar: 'https://picsum.photos/seed/sarah/100/100.jpg' },
  { id: 't2', project: 'Mobile App UI/UX Design', freelancer: 'Marcus Lee', role: 'Lead Developer', amount: 1600, date: 'Dec 7, 2025', status: 'Pending', avatar: 'https://picsum.photos/seed/marcus/100/100.jpg' },
  { id: 't3', project: 'Brand Identity Package', freelancer: 'Alex Chen', role: 'SEO Specialist', amount: 900, date: 'Dec 5, 2025', status: 'Escrow', avatar: 'https://picsum.photos/seed/alex/100/100.jpg' },
  { id: 't4', project: 'SEO Optimization', freelancer: 'Jenny Diaz', role: 'Content Strategist', amount: 600, date: 'Dec 3, 2025', status: 'Released', avatar: 'https://picsum.photos/seed/jenny/100/100.jpg' },
  { id: 't5', project: 'Shopify Store Development', freelancer: 'Tunde A.', role: 'Full-Stack Developer', amount: 2250, date: 'Nov 30, 2025', status: 'Released', avatar: 'https://picsum.photos/seed/tunde/100/100.jpg' },
  { id: 't6', project: 'Digital Marketing Campaign', freelancer: 'Praise U.', role: 'Marketing Strategist', amount: 1400, date: 'Nov 28, 2025', status: 'Escrow', avatar: 'https://picsum.photos/seed/praise/100/100.jpg' },
];

export default function PaymentsPage() {
  const { data: apiPayments, isLoading } = useGlobalPaymentHistory();
  const [activeTab, setActiveTab] = useState('All');
  const [balancesVisible, setBalancesVisible] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredTransactions = activeTab === 'All' 
    ? mockTransactions 
    : mockTransactions.filter(t => t.status === activeTab);

  // Stats
  const stats = [
    { label: 'TOTAL SPENT', value: '$18,560', sub: '+12.4% vs last month', subColor: 'text-emerald-500', icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-500/10', glow: 'rgba(16, 185, 129, 0.15)' },
    { label: 'PENDING', value: '$3,250', sub: '3 invoices awaiting payment', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-500/10', glow: 'rgba(245, 158, 11, 0.15)' },
    { label: 'RELEASED THIS MONTH', value: '$15,310', sub: '45 total transactions', icon: CheckDouble, color: 'text-teal-500', bg: 'bg-teal-500/10', glow: 'rgba(20, 184, 166, 0.15)' },
    { label: 'ESCROW BALANCE', value: '$5,120', sub: 'Escrow & available funds', icon: Wallet, color: 'text-lime-500', bg: 'bg-lime-500/10', glow: 'rgba(132, 204, 22, 0.15)', toggleable: true }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Released': return 'text-emerald-600 bg-emerald-100 border-emerald-200';
      case 'Pending': return 'text-amber-600 bg-amber-100 border-amber-200';
      case 'Escrow': return 'text-teal-600 bg-teal-100 border-teal-200';
      default: return 'text-slate-600 bg-slate-100 border-slate-200';
    }
  };

  const getStatusDot = (status: string) => {
    switch (status) {
      case 'Released': return 'bg-emerald-500';
      case 'Pending': return 'bg-amber-500';
      case 'Escrow': return 'bg-teal-500';
      default: return 'bg-slate-500';
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full pb-10">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 fade-up">
        <div>
          <div className="flex items-center gap-2 mb-2 text-xs text-slate-500">
            <Link href="/dashboard" className="cursor-pointer hover:text-emerald-600 transition">Dashboard</Link>
            <span className="text-[10px]">/</span>
            <span className="text-slate-900 font-semibold">Payments</span>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight" style={{ fontFamily: 'Sora, sans-serif' }}>
            Payments<span style={{ color: 'var(--primary, #10B981)' }}>.</span>
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Manage your balance, transactions, and payment methods.</p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button className="px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-emerald-600 hover:border-emerald-200 transition-all shadow-sm">
            <Download className="w-4 h-4" /> Export Statement
          </button>
          <button onClick={() => setIsModalOpen(true)} className="px-5 py-2.5 rounded-xl text-sm font-bold text-white flex items-center gap-2 shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', boxShadow: '0 8px 24px -6px rgba(16, 185, 129, 0.5)' }}>
            <Plus className="w-4 h-4" /> Add Funds
          </button>
        </div>
      </div>

      {/* Stats Mini Row Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="group relative bg-white border border-slate-200 rounded-[18px] p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_-12px_rgba(15,26,20,0.12)] hover:border-emerald-300 overflow-hidden cursor-pointer">
            <div className="absolute top-[-50%] right-[-50%] w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `radial-gradient(circle, ${stat.glow} 0%, transparent 70%)` }} />
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold tracking-wider text-slate-500">{stat.label}</span>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-3xl font-extrabold tracking-tight transition-all" style={{ fontFamily: 'Sora, sans-serif', letterSpacing: !balancesVisible && stat.toggleable ? '2px' : 'normal' }}>
                {stat.toggleable && !balancesVisible ? '•••••' : stat.value}
              </div>
              {stat.toggleable && (
                <button onClick={(e) => { e.stopPropagation(); setBalancesVisible(!balancesVisible); }} className="text-slate-400 hover:text-emerald-500 transition-colors p-1 hover:scale-110">
                  {balancesVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4 text-emerald-500" />}
                </button>
              )}
            </div>
            <div className="text-[11px] mt-1 text-slate-500">
              {stat.subColor ? <span className={`font-bold ${stat.subColor}`}>{stat.sub.split(' ')[0]}</span> : null}
              {stat.subColor ? stat.sub.substring(stat.sub.indexOf(' ')) : stat.sub}
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-[18px] border border-slate-200 flex flex-col shadow-sm overflow-hidden fade-up">
        {/* Header / Tabs */}
        <div className="p-6 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900" style={{ fontFamily: 'Sora, sans-serif' }}>Transaction History</h2>
            <p className="text-xs text-slate-500 mt-0.5">All payments and payouts</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            {/* Filter Tabs */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-50 border border-slate-100">
              {['All', 'Released', 'Pending', 'Escrow'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 rounded-lg text-[13px] font-bold transition-colors ${
                    activeTab === tab 
                      ? 'bg-slate-900 text-white shadow-sm' 
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            {/* Search */}
            <div className="relative group w-full sm:w-64">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Search transactions..." 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-[13px] font-medium focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all h-full min-h-[38px]"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="py-3 px-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest w-[40%]">Freelancer / Project</th>
                <th className="py-3 px-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Date</th>
                <th className="py-3 px-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Status</th>
                <th className="py-3 px-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">Amount</th>
                <th className="py-3 px-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTransactions.map((t, idx) => (
                <tr key={t.id} className="hover:bg-slate-50/80 transition-transform duration-200 hover:translate-x-1 cursor-pointer group">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img src={t.avatar} alt={t.freelancer} className="w-10 h-10 rounded-full object-cover shrink-0 border border-slate-200" />
                      <div className="min-w-0">
                        <div className="text-sm font-bold text-slate-900 truncate">{t.freelancer}</div>
                        <div className="text-[11px] text-slate-500 truncate flex items-center gap-1.5">
                          <span>{t.role}</span>
                          <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                          <span className="font-medium text-slate-600">{t.project}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-slate-700 whitespace-nowrap">{t.date}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusColor(t.status)}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${getStatusDot(t.status)}`} />
                      {t.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right whitespace-nowrap">
                    <div className="text-sm font-bold text-slate-900">${t.amount.toLocaleString()}</div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase">USD</div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    {t.status === 'Pending' ? (
                      <button className="px-3 py-1.5 rounded-lg text-xs font-bold text-white shadow-sm hover:shadow-md transition-all bg-emerald-500 hover:bg-emerald-600">
                        Release
                      </button>
                    ) : (
                      <button className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-600 bg-white hover:border-emerald-400 hover:text-emerald-600 transition-colors shadow-sm">
                        View
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredTransactions.length === 0 && (
            <div className="p-12 text-center">
              <div className="w-12 h-12 rounded-xl bg-slate-50 mx-auto mb-3 flex items-center justify-center">
                <FileText className="w-5 h-5 text-slate-400" />
              </div>
              <p className="text-sm font-semibold text-slate-500">No transactions found</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Funds Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-[500px] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-7 py-5 flex items-start justify-between border-b border-slate-100 bg-slate-50/50">
              <div>
                <div className="text-[11px] font-bold tracking-widest mb-1" style={{ color: 'var(--primary, #10B981)' }}>FUNDS & BILLING</div>
                <h2 className="text-2xl font-extrabold text-slate-900" style={{ fontFamily: 'Sora, sans-serif' }}>Add Funds to Escrow</h2>
                <p className="text-sm text-slate-500 mt-1">Securely add funds to your account balance.</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-7 flex flex-col gap-5">
              <div>
                <label className="block text-[12px] font-bold text-slate-500 tracking-wider mb-2">AMOUNT TO ADD (USD)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                  <input type="number" placeholder="1000.00" className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 text-base font-bold text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all" />
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-bold text-slate-500 tracking-wider mb-2">PAYMENT METHOD</label>
                <select className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all appearance-none">
                  <option>Visa ending in 4242</option>
                  <option>Mastercard ending in 5555</option>
                  <option>+ Add New Card</option>
                </select>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100 mt-2">
                <Wallet className="w-5 h-5 text-emerald-500 shrink-0" />
                <span className="text-xs text-slate-500 leading-relaxed">Funds will be added to your balance immediately and can be used to fund milestones in escrow.</span>
              </div>
            </div>

            <div className="p-5 border-t border-slate-100 flex gap-3 bg-slate-50/50">
              <button onClick={() => setIsModalOpen(false)} className="flex-1 py-3 rounded-xl text-sm font-bold text-slate-700 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors">Cancel</button>
              <button className="flex-1 py-3 rounded-xl text-sm font-bold text-white shadow-md hover:-translate-y-0.5 transition-all" style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)' }}>Add Funds</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
