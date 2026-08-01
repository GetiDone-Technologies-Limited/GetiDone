'use client';

import { useState, useMemo } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { useDashboardStats, useMyProjects } from '@/features/dashboard/hooks/useDashboard';
import { LoadingSpinner } from '@/shared/components/feedback/LoadingSpinner';
import { AddFundsModal } from '@/features/payment/components/AddFundsModal';
import { toast } from 'react-hot-toast';
import { 
  Rocket, ClipboardCheck, Wallet, ArrowUpRight, Plus, 
  ArrowDownToLine, Palette, Search, Smartphone, Code,
  UserPlus, FileSignature, Video, Check, DollarSign,
  MessageSquare, Flag, User, MessageCircle, X, MoreVertical
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

const mockProjects = [
  { id: 'p1', title: 'E-commerce Website Redesign', freelancer: 'Sarah Kim', avatar: 'https://picsum.photos/seed/sarah/100/100.jpg', status: 'In Progress', progress: 72, budget: 2500, due: 'Dec 20, 2025', category: 'Web Design' },
  { id: 'p2', title: 'Mobile App UI/UX Design', freelancer: 'Marcus Lee', avatar: 'https://picsum.photos/seed/marcus/100/100.jpg', status: 'In Review', progress: 90, budget: 3200, due: 'Dec 18, 2025', category: 'Mobile' },
  { id: 'p3', title: 'Brand Identity Package', freelancer: 'Alex Chen', avatar: 'https://picsum.photos/seed/alex/100/100.jpg', status: 'In Progress', progress: 45, budget: 1800, due: 'Jan 5, 2026', category: 'Branding' },
  { id: 'p4', title: 'SEO Optimization Campaign', freelancer: 'Jenny Diaz', avatar: 'https://picsum.photos/seed/jenny/100/100.jpg', status: 'On Hold', progress: 30, budget: 1200, due: 'Jan 15, 2026', category: 'Marketing' },
];

const mockSpendingData = [
  { name: 'Jul', value: 2400 },
  { name: 'Aug', value: 3100 },
  { name: 'Sep', value: 2800 },
  { name: 'Oct', value: 3500 },
  { name: 'Nov', value: 4200 },
  { name: 'Dec', value: 4560 },
];

const statusData = [
  { name: 'Active', value: 12, color: '#10B981' },
  { name: 'Review', value: 5, color: '#F59E0B' },
  { name: 'Payment', value: 3, color: '#14B8A6' },
  { name: 'Completed', value: 8, color: '#84CC16' },
];

// Reusable Button components based on SampleAssets CSS
const PrimaryButton = ({ children, onClick, className = '', type = 'button' }: any) => (
  <button 
    type={type}
    onClick={onClick}
    className={`relative overflow-hidden transition-all duration-300 transform hover:-translate-y-[1px] hover:shadow-[0_8px_24px_-6px_rgba(16,185,129,0.5)] rounded-xl text-white font-bold group ${className}`}
    style={{ background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)' }}
  >
    <div 
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      style={{ background: 'linear-gradient(135deg, var(--primary-light) 0%, var(--primary) 100%)' }}
    />
    <div className="relative z-10 flex items-center justify-center gap-2">
      {children}
    </div>
  </button>
);

const GhostButton = ({ children, onClick, className = '', type = 'button' }: any) => (
  <button 
    type={type}
    onClick={onClick}
    className={`transition-all duration-200 transform hover:-translate-y-[1px] border rounded-xl font-semibold flex items-center justify-center gap-2 ${className}`}
    style={{ 
      background: 'var(--card)', 
      borderColor: 'var(--border)',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = 'var(--primary)';
      e.currentTarget.style.color = 'var(--primary)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = 'var(--border)';
      e.currentTarget.style.color = 'inherit';
    }}
  >
    {children}
  </button>
);

export default function ClientDashboardPage() {
  const { user } = useAuthStore();
  const firstName = user?.name ? user.name.split(' ')[0] : 'Client';
  const [isAddFundsOpen, setIsAddFundsOpen] = useState(false);
  const [isPostJobModalOpen, setIsPostJobModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: myProjects, isLoading: projectsLoading } = useMyProjects();

  const combinedSpendingData = [...mockSpendingData];
  if (stats?.totalSpent && stats.totalSpent > 0) {
    combinedSpendingData[combinedSpendingData.length - 1] = { name: 'Current', value: stats.totalSpent };
  }

  // Combine real and mock projects
  const displayProjects = useMemo(() => {
    let combined = [...(myProjects || [])].map(p => ({
      id: p.id,
      title: p.job?.title || 'Untitled Project',
      freelancer: p.freelancer?.name || 'Unassigned',
      avatar: 'https://picsum.photos/seed/' + p.id + '/100/100.jpg',
      status: p.status === 'IN_PROGRESS' ? 'In Progress' : p.status === 'COMPLETED' ? 'Completed' : 'In Review',
      progress: p.status === 'COMPLETED' ? 100 : p.status === 'IN_PROGRESS' ? 60 : 85,
      budget: p.budget || 0,
      due: 'May 24, 2025',
      category: 'Development',
      isReal: true
    }));
    
    // Add mocks if not enough real projects
    if (combined.length < 4) {
      combined = [...combined, ...mockProjects.slice(0, 4 - combined.length)];
    }
    
    // Filter based on tab
    if (activeTab === 'active') return combined.filter(p => p.status === 'In Progress');
    if (activeTab === 'review') return combined.filter(p => p.status === 'In Review');
    if (activeTab === 'hold') return combined.filter(p => p.status === 'On Hold');
    return combined;
  }, [myProjects, activeTab]);

  if (statsLoading || projectsLoading) {
    return <div className="flex h-[80vh] items-center justify-center"><LoadingSpinner size="lg" /></div>;
  }
  
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Web Design':
      case 'Design': return <Palette className="w-5 h-5" />;
      case 'Marketing': return <Search className="w-5 h-5" />;
      case 'Mobile': return <Smartphone className="w-5 h-5" />;
      default: return <Code className="w-5 h-5" />;
    }
  };

  const getStatusColors = (status: string) => {
    if (status === 'In Progress') return { bg: 'rgba(16,185,129,0.12)', text: 'var(--primary)', label: 'Active', progColor: 'var(--primary)' };
    if (status === 'In Review') return { bg: 'rgba(245,158,11,0.12)', text: 'var(--warning)', label: 'In Review', progColor: 'var(--warning)' };
    if (status === 'Completed') return { bg: 'rgba(132,204,22,0.12)', text: 'var(--accent)', label: 'Done', progColor: 'var(--accent)' };
    return { bg: 'rgba(148,163,154,0.15)', text: 'var(--muted)', label: 'On Hold', progColor: 'var(--warning)' };
  };

  return (
    <div className="flex flex-col xl:flex-row gap-8">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes live-pulse {
          0% { transform: scale(1); opacity: 0.4; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes pulse-glow {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.2); opacity: 1; }
        }
      `}} />
      {/* Modals */}
      <AddFundsModal isOpen={isAddFundsOpen} onClose={() => setIsAddFundsOpen(false)} />
      
      {/* Post Job Modal */}
      {isPostJobModalOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-300 opacity-100"
          style={{ background: 'rgba(6, 10, 8, 0.6)', backdropFilter: 'blur(8px)' }}
          onClick={(e) => e.target === e.currentTarget && setIsPostJobModalOpen(false)}
        >
          <div className="p-7 rounded-[24px] max-w-[540px] w-[calc(100%-32px)] max-h-[88vh] overflow-y-auto shadow-[0_30px_80px_-20px_rgba(15,26,20,0.4)] animate-in zoom-in-95 duration-300" style={{ background: 'var(--card)' }}>
            <div className="flex items-start justify-between mb-5">
              <div>
                <div className="text-[11px] font-bold tracking-widest mb-1" style={{ color: 'var(--primary)' }}>NEW PROJECT</div>
                <h2 className="font-display font-extrabold text-2xl">Post a New Job</h2>
                <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>Tell us what you need — we&apos;ll match you with the right talent.</p>
              </div>
              <button onClick={() => setIsPostJobModalOpen(false)} className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              setIsPostJobModalOpen(false);
              toast.success('Your project is now live and visible to freelancers');
            }} className="space-y-4">
              <div>
                <label className="text-xs font-bold tracking-wider mb-1.5 block" style={{ color: 'var(--muted)' }}>PROJECT TITLE</label>
                <input type="text" placeholder="e.g. E-commerce Website Redesign" className="w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:border-emerald-400" style={{ borderColor: 'var(--border)', background: 'var(--bg-alt)' }} required />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold tracking-wider mb-1.5 block" style={{ color: 'var(--muted)' }}>CATEGORY</label>
                  <select className="w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:border-emerald-400" style={{ borderColor: 'var(--border)', background: 'var(--bg-alt)' }}>
                    <option>Web Development</option>
                    <option>Design</option>
                    <option>Marketing</option>
                    <option>Mobile</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold tracking-wider mb-1.5 block" style={{ color: 'var(--muted)' }}>BUDGET</label>
                  <input type="text" placeholder="$5,000" className="w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:border-emerald-400" style={{ borderColor: 'var(--border)', background: 'var(--bg-alt)' }} />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold tracking-wider mb-1.5 block" style={{ color: 'var(--muted)' }}>DESCRIPTION</label>
                <textarea rows={3} placeholder="Describe your project goals, scope, and deliverables..." className="w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:border-emerald-400 resize-none" style={{ borderColor: 'var(--border)', background: 'var(--bg-alt)' }} required></textarea>
              </div>
              <div>
                <label className="text-xs font-bold tracking-wider mb-1.5 block" style={{ color: 'var(--muted)' }}>DEADLINE</label>
                <input type="date" className="w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:border-emerald-400" style={{ borderColor: 'var(--border)', background: 'var(--bg-alt)' }} />
              </div>
              <div className="flex gap-3 pt-2">
                <GhostButton onClick={(e: any) => { e.preventDefault(); setIsPostJobModalOpen(false); }} className="flex-1 py-3">Save Draft</GhostButton>
                <PrimaryButton type="submit" className="flex-1 py-3">Publish Job</PrimaryButton>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 min-w-0">
        
        {/* Greeting */}
        <section className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="relative w-2 h-2 rounded-full" style={{ background: 'var(--success)' }}>
                  <div className="absolute -inset-[3px] rounded-full opacity-40" style={{ background: 'var(--success)', animation: 'live-pulse 1.8s infinite' }}></div>
                </div>
                <span className="text-xs font-bold tracking-widest uppercase" style={{ color: 'var(--secondary)' }}>
                  LIVE · {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                </span>
              </div>
              <h1 className="font-display font-extrabold text-4xl tracking-tight text-slate-900">
                Good morning, {firstName}<span style={{ color: 'var(--primary)' }}>.</span>
              </h1>
              <p className="text-sm mt-1.5" style={{ color: 'var(--muted)' }}>
                You have <span className="font-bold text-slate-900">{stats?.inReview || 5} projects</span> needing review and <span className="font-bold text-slate-900">3 pending payments</span> today.
              </p>
            </div>
            <div className="flex gap-2">
              <GhostButton className="px-4 py-2.5 text-sm" onClick={() => toast.success('Generating CSV report')}>
                <ArrowDownToLine className="w-4 h-4" /> Export Report
              </GhostButton>
              <PrimaryButton className="px-5 py-2.5 text-sm" onClick={() => setIsPostJobModalOpen(true)}>
                <Plus className="w-4 h-4" /> New Project
              </PrimaryButton>
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div 
            className="p-5 group cursor-pointer relative overflow-hidden transition-all duration-300 rounded-[18px] border hover:-translate-y-[2px] shadow-sm"
            style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.3)';
              e.currentTarget.style.boxShadow = '0 12px 40px -12px rgba(15, 26, 20, 0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            onClick={() => toast.success('12 projects currently in progress')}
          >
            <div className="absolute -top-1/2 -right-1/2 w-full h-full rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)' }}></div>
            <div className="flex items-start justify-between mb-3 relative z-10">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(16,185,129,0.12)', color: 'var(--primary)' }}>
                <Rocket className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold px-2 py-1 rounded-md" style={{ background: 'rgba(132,204,22,0.12)', color: 'var(--accent)' }}>+3</span>
            </div>
            <div className="text-3xl font-display font-extrabold relative z-10 text-slate-900">{stats?.activeProjects || 12}</div>
            <div className="text-xs font-semibold mt-1 relative z-10" style={{ color: 'var(--muted)' }}>Active Projects</div>
          </div>

          <div 
            className="p-5 group cursor-pointer relative overflow-hidden transition-all duration-300 rounded-[18px] border hover:-translate-y-[2px] shadow-sm"
            style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.3)';
              e.currentTarget.style.boxShadow = '0 12px 40px -12px rgba(15, 26, 20, 0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            onClick={() => toast.success('5 submissions awaiting your feedback')}
          >
            <div className="absolute -top-1/2 -right-1/2 w-full h-full rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, transparent 70%)' }}></div>
            <div className="flex items-start justify-between mb-3 relative z-10">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(245,158,11,0.12)', color: 'var(--warning)' }}>
                <ClipboardCheck className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold px-2 py-1 rounded-md" style={{ background: 'rgba(245,158,11,0.15)', color: 'var(--warning)' }}>URGENT</span>
            </div>
            <div className="text-3xl font-display font-extrabold relative z-10 text-slate-900">{stats?.inReview || 5}</div>
            <div className="text-xs font-semibold mt-1 relative z-10" style={{ color: 'var(--muted)' }}>Pending Review</div>
          </div>

          <div 
            className="p-5 group cursor-pointer relative overflow-hidden transition-all duration-300 rounded-[18px] border hover:-translate-y-[2px] shadow-sm"
            style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(20, 184, 166, 0.3)';
              e.currentTarget.style.boxShadow = '0 12px 40px -12px rgba(15, 26, 20, 0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            onClick={() => toast.success('$3,250 total pending across 3 invoices')}
          >
            <div className="absolute -top-1/2 -right-1/2 w-full h-full rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(20, 184, 166, 0.15) 0%, transparent 70%)' }}></div>
            <div className="flex items-start justify-between mb-3 relative z-10">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(20,184,166,0.12)', color: 'var(--secondary)' }}>
                <Wallet className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold px-2 py-1 rounded-md" style={{ background: 'rgba(20,184,166,0.15)', color: 'var(--secondary)' }}>DUE SOON</span>
            </div>
            <div className="text-3xl font-display font-extrabold relative z-10 text-slate-900">3</div>
            <div className="text-xs font-semibold mt-1 relative z-10" style={{ color: 'var(--muted)' }}>Pending Payment</div>
          </div>

          <div 
            className="p-5 group cursor-pointer relative overflow-hidden transition-all duration-300 rounded-[18px] border hover:-translate-y-[2px] shadow-sm"
            style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(132, 204, 22, 0.3)';
              e.currentTarget.style.boxShadow = '0 12px 40px -12px rgba(15, 26, 20, 0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            onClick={() => toast.success('$18,560 spent across all projects')}
          >
            <div className="absolute -top-1/2 -right-1/2 w-full h-full rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(132, 204, 22, 0.15) 0%, transparent 70%)' }}></div>
            <div className="flex items-start justify-between mb-3 relative z-10">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(132,204,22,0.12)', color: 'var(--accent)' }}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
              </div>
              <span className="text-[11px] font-bold px-2 py-1 rounded-md" style={{ background: 'rgba(132,204,22,0.12)', color: 'var(--accent)' }}>+12.4%</span>
            </div>
            <div className="text-3xl font-display font-extrabold relative z-10 text-slate-900">${stats?.totalSpent?.toLocaleString() || '18,560'}</div>
            <div className="text-xs font-semibold mt-1 relative z-10" style={{ color: 'var(--muted)' }}>Total Spending</div>
          </div>
        </section>

        {/* Active Projects */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-display font-bold text-xl text-slate-900">Active Projects</h2>
              <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>Track progress across all ongoing work</p>
            </div>
            <div className="flex items-center gap-1 p-1 rounded-xl" style={{ background: 'var(--bg-alt)' }}>
              {['all', 'active', 'review', 'hold'].map(tab => (
                <button 
                  key={tab}
                  className={`px-4 py-2 rounded-[10px] text-[13px] font-semibold transition-all duration-200 ${
                    activeTab === tab ? 'text-white' : 'text-slate-500 hover:text-slate-900'
                  }`}
                  style={{ background: activeTab === tab ? 'var(--sidebar)' : 'transparent' }}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === 'all' ? 'All' : tab === 'active' ? 'Active' : tab === 'review' ? 'Review' : 'On Hold'}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {displayProjects.map((p, i) => {
              const sc = getStatusColors(p.status);
              
              return (
                <div 
                  key={p.id} 
                  className="p-5 group cursor-pointer relative overflow-hidden transition-all duration-350 rounded-[18px] border hover:-translate-y-[3px] shadow-sm bg-white"
                  style={{ borderColor: 'var(--border)', background: 'var(--card)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.4)';
                    e.currentTarget.style.boxShadow = '0 16px 50px -16px rgba(15, 26, 20, 0.18)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${sc.progColor}22, ${sc.progColor}11)`, color: sc.progColor }}>
                        {getCategoryIcon(p.category)}
                      </div>
                      <div>
                        <div className="text-[10px] font-bold tracking-wider" style={{ color: 'var(--muted)' }}>{p.category.toUpperCase()}</div>
                        <div className="font-display font-bold text-base leading-tight text-slate-900">{p.title}</div>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-emerald-500" style={{ color: 'var(--soft)' }} />
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-bold tracking-wider" style={{ color: 'var(--muted)' }}>PROGRESS</span>
                      <span className="text-xs font-bold" style={{ color: sc.progColor }}>{p.progress}%</span>
                    </div>
                    <div className="h-2 rounded-full relative overflow-hidden" style={{ background: 'var(--bg-alt)' }}>
                      <div 
                        className="h-full rounded-full relative transition-all duration-1000 ease-in-out" 
                        style={{ width: `${p.progress}%`, background: `linear-gradient(90deg, ${sc.progColor}, ${sc.progColor}cc)` }}
                      >
                        <div className="absolute inset-0 w-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)', animation: 'shimmer 2.5s infinite' }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div>
                      <div className="text-[10px] font-bold tracking-wider mb-0.5" style={{ color: 'var(--muted)' }}>BUDGET</div>
                      <div className="text-sm font-bold text-slate-900">
                        ${(p.budget * (p.progress/100)).toLocaleString(undefined, {maximumFractionDigits: 0})} 
                        <span className="text-[11px] font-medium ml-1" style={{ color: 'var(--soft)' }}>/ ${p.budget.toLocaleString()}</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold tracking-wider mb-0.5" style={{ color: 'var(--muted)' }}>DEADLINE</div>
                      <div className="text-sm font-bold text-slate-900">{p.due}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid var(--border)' }}>
                    <div className="flex -space-x-2 overflow-hidden">
                      <img src={p.avatar} alt={p.freelancer} className="inline-block h-7 w-7 rounded-full border-2 border-white" style={{ background: 'var(--bg-alt)' }} />
                      <div className="inline-flex h-7 w-7 rounded-full border-2 border-white items-center justify-center text-[10px] font-bold" style={{ background: 'var(--bg-alt)', color: 'var(--muted)' }}>+1</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider" style={{ background: sc.bg, color: sc.text }}>
                        {sc.label}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Charts Row */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
          <div className="lg:col-span-2 p-6 rounded-[18px] border bg-white shadow-sm" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
            <div className="flex items-start justify-between mb-5">
              <div>
                <h3 className="font-display font-bold text-lg text-slate-900">Spending Overview</h3>
                <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>Last 6 months · Updated 2h ago</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-[11px] font-semibold tracking-wider" style={{ color: 'var(--muted)' }}>THIS MONTH</div>
                  <div className="text-xl font-display font-extrabold" style={{ color: 'var(--primary)' }}>$4,560</div>
                </div>
                <GhostButton className="w-9 h-9 !rounded-lg" onClick={() => toast.success('Customizing spending view')}>
                  <MoreVertical className="w-4 h-4" />
                </GhostButton>
              </div>
            </div>
            <div className="h-[220px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={combinedSpendingData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.04)" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#5A6B62', fontSize: 11, fontWeight: 600 }} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#5A6B62', fontSize: 11 }} 
                    tickFormatter={(val) => `$${val >= 1000 ? val/1000 + 'k' : val}`}
                    dx={-10}
                  />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: '#0A0F0D', borderRadius: '10px', border: 'none', color: '#fff', padding: '12px' }}
                    itemStyle={{ color: '#fff', fontSize: '13px', fontWeight: '600' }}
                    formatter={(value: any) => [`$${Number(value).toLocaleString()} spent`, '']}
                    labelStyle={{ fontSize: '12px', fontWeight: 'bold', color: '#94A39A' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="var(--primary)" 
                    strokeWidth={3}
                    dot={{ fill: 'var(--primary)', strokeWidth: 2, r: 4 }} 
                    activeDot={{ r: 6, strokeWidth: 0, fill: 'var(--accent)' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="p-6 rounded-[18px] border bg-white shadow-sm" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
            <div className="flex items-start justify-between mb-5">
              <div>
                <h3 className="font-display font-bold text-lg text-slate-900">Project Status</h3>
                <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>28 total projects</p>
              </div>
            </div>
            <div className="h-[140px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius="68%"
                    outerRadius="100%"
                    paddingAngle={0}
                    dataKey="value"
                    stroke="#FFFFFF"
                    strokeWidth={3}
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: '#0A0F0D', borderRadius: '10px', border: 'none', color: '#fff', padding: '12px' }}
                    itemStyle={{ color: '#fff' }}
                    formatter={(value: any, name: any) => [`${value} projects`, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
              {statusData.map(s => (
                <div key={s.name} className="flex items-center gap-2 cursor-pointer hover:opacity-80">
                  <span className="w-2.5 h-2.5 rounded-sm" style={{ background: s.color }}></span>
                  <span style={{ color: 'var(--muted)' }}>{s.name}</span>
                  <span className="ml-auto font-bold text-slate-900">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>

      {/* Right Column (Sidebar layout handled by Grid/Flex) */}
      <div className="w-full xl:w-[320px] shrink-0 xl:border-l xl:pl-6 space-y-7" style={{ borderColor: 'var(--border)' }}>
        
        {/* Quick Actions */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-base text-slate-900">Quick Actions</h3>
            <button className="text-[11px] font-semibold transition-transform hover:-translate-y-[1px]" style={{ color: 'var(--primary)' }}>Customize</button>
          </div>
          <div className="space-y-1">
            <div 
              className="group flex items-center gap-3 p-2.5 rounded-xl cursor-pointer transition-all duration-250 hover:translate-x-1"
              style={{ background: 'transparent' }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-alt)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              onClick={() => setIsPostJobModalOpen(true)}
            >
              <div className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-250 group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-[#10B981] group-hover:text-white" style={{ background: 'rgba(16,185,129,0.12)', color: 'var(--primary)' }}>
                <Plus className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-slate-900">Post a New Job</div>
                <div className="text-[11px]" style={{ color: 'var(--muted)' }}>Hire talent in minutes</div>
              </div>
              <ChevronRight className="w-3 h-3 transition-colors group-hover:text-slate-900" style={{ color: 'var(--soft)' }} />
            </div>

            <div 
              className="group flex items-center gap-3 p-2.5 rounded-xl cursor-pointer transition-all duration-250 hover:translate-x-1"
              style={{ background: 'transparent' }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-alt)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              onClick={() => toast.success('Send team invitation')}
            >
              <div className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-250 group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-[#14B8A6] group-hover:text-white" style={{ background: 'rgba(20,184,166,0.12)', color: 'var(--secondary)' }}>
                <UserPlus className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-slate-900">Invite Team Member</div>
                <div className="text-[11px]" style={{ color: 'var(--muted)' }}>Collaborate on projects</div>
              </div>
              <ChevronRight className="w-3 h-3 transition-colors group-hover:text-slate-900" style={{ color: 'var(--soft)' }} />
            </div>

            <div 
              className="group flex items-center gap-3 p-2.5 rounded-xl cursor-pointer transition-all duration-250 hover:translate-x-1"
              style={{ background: 'transparent' }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-alt)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              onClick={() => toast.success('Creating new invoice')}
            >
              <div className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-250 group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-[#F59E0B] group-hover:text-white" style={{ background: 'rgba(245,158,11,0.12)', color: 'var(--warning)' }}>
                <FileSignature className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-slate-900">Create Invoice</div>
                <div className="text-[11px]" style={{ color: 'var(--muted)' }}>Bill for completed work</div>
              </div>
              <ChevronRight className="w-3 h-3 transition-colors group-hover:text-slate-900" style={{ color: 'var(--soft)' }} />
            </div>

            <div 
              className="group flex items-center gap-3 p-2.5 rounded-xl cursor-pointer transition-all duration-250 hover:translate-x-1"
              style={{ background: 'transparent' }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-alt)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              onClick={() => toast.success('Opening meeting scheduler')}
            >
              <div className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-250 group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-[#84CC16] group-hover:text-white" style={{ background: 'rgba(132,204,22,0.12)', color: 'var(--accent)' }}>
                <Video className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-slate-900">Schedule Meeting</div>
                <div className="text-[11px]" style={{ color: 'var(--muted)' }}>Sync with your team</div>
              </div>
              <ChevronRight className="w-3 h-3 transition-colors group-hover:text-slate-900" style={{ color: 'var(--soft)' }} />
            </div>
          </div>
        </section>

        {/* Recent Activity */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-base text-slate-900">Recent Activity</h3>
            <button className="text-[11px] font-semibold transition-transform hover:-translate-y-[1px]" style={{ color: 'var(--primary)' }}>View All</button>
          </div>
          <div className="relative">
            <div className="absolute left-[18px] top-2 bottom-2 w-px" style={{ background: 'var(--border)' }}></div>
            <div className="space-y-1">
              {[
                { icon: Check, color: 'var(--primary)', title: <><span className="font-bold">Sarah Kim</span> submitted final designs for <span className="font-semibold">Brand Identity</span></>, time: '12 minutes ago' },
                { icon: DollarSign, color: 'var(--secondary)', title: <>Payment of <span className="font-bold">$1,200</span> released to <span className="font-semibold">Marcus Lee</span></>, time: '2 hours ago' },
                { icon: MessageSquare, color: 'var(--warning)', title: <><span className="font-bold">Alex Chen</span> sent a message about <span className="font-semibold">SEO Optimization</span></>, time: '4 hours ago' },
                { icon: Flag, color: 'var(--accent)', title: <>Milestone <span className="font-bold">"API Integration"</span> marked complete</>, time: 'Yesterday, 5:42 PM' },
                { icon: User, color: 'var(--muted)', title: <>3 new freelancers applied to <span className="font-semibold">Mobile App</span></>, time: '2 days ago' },
              ].map((act, i) => (
                <div key={i} className="flex gap-3 p-2.5 rounded-xl cursor-pointer transition-colors hover:bg-slate-50" onClick={() => toast.success('Opening activity details')}>
                  <div className="relative z-10 w-9 h-9 rounded-full flex items-center justify-center shrink-0 border-2" style={{ background: 'var(--card)', borderColor: act.color }}>
                    <act.icon className="w-3 h-3" style={{ color: act.color }} />
                  </div>
                  <div className="flex-1 pt-0.5">
                    <div className="text-xs text-slate-800">{act.title}</div>
                    <div className="text-[10px] mt-1" style={{ color: 'var(--soft)' }}>{act.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Support Widget */}
        <section 
          className="rounded-2xl p-5 cursor-pointer relative overflow-hidden transition-all duration-300 transform hover:-translate-y-[2px] shadow-sm hover:shadow-[0_16px_40px_-12px_rgba(16,185,129,0.3)]"
          style={{ background: 'linear-gradient(135deg, #0A0F0D 0%, #131A16 100%)' }}
          onClick={() => toast.success('Connecting you to a support agent...')}
        >
          <div className="absolute -top-[50%] -right-[30%] w-[200px] h-[200px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(16, 185, 129, 0.4) 0%, transparent 70%)', animation: 'pulse-glow 4s ease-in-out infinite' }}></div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full relative" style={{ background: 'var(--success)' }}>
                <div className="absolute -inset-[3px] rounded-full opacity-40" style={{ background: 'var(--success)', animation: 'live-pulse 1.8s infinite' }}></div>
              </div>
              <span className="text-[10px] font-bold tracking-widest text-white uppercase">24/7 AVAILABLE</span>
            </div>
            <h4 className="font-display font-bold text-white text-lg leading-tight mb-1">Need a hand?<br/>We&apos;re here to help.</h4>
            <p className="text-xs mb-4" style={{ color: 'var(--sidebar-text)' }}>Average response time: under 2 minutes</p>
            <div className="flex items-center justify-between">
              <div className="flex -space-x-2">
                <img src="https://picsum.photos/seed/support1/100/100.jpg" className="w-7 h-7 rounded-full border-2 border-[#131A16]" />
                <img src="https://picsum.photos/seed/support2/100/100.jpg" className="w-7 h-7 rounded-full border-2 border-[#131A16]" />
                <div className="w-7 h-7 rounded-full border-2 border-[#131A16] flex items-center justify-center text-[10px] font-bold text-white z-10" style={{ background: 'var(--primary)' }}>+5</div>
              </div>
              <div className="bg-white/10 backdrop-blur px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                <MessageCircle className="w-3 h-3 text-white" />
                <span className="text-xs font-bold text-white">Chat Now</span>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

// Chevron Right Icon to match
function ChevronRight(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
}
