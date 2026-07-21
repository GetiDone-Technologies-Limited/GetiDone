'use client';

import { useState } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { useDashboardStats, useMyProjects } from '@/features/dashboard/hooks/useDashboard';
import { LoadingSpinner } from '@/shared/components/feedback/LoadingSpinner';
import { AddFundsModal } from '@/features/payment/components/AddFundsModal';
import { toast } from 'react-hot-toast';
import { 
  FolderOpen, ClipboardCheck, Clock, Wallet, 
  MoreVertical, Plus, UserPlus, CreditCard, FileSignature, Headset 
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

const mockSpendingData = [
  { name: 'May 1', value: 1000 },
  { name: 'May 5', value: 1500 },
  { name: 'May 10', value: 2000 },
  { name: 'May 15', value: 2500 },
  { name: 'May 20', value: 4260 },
  { name: 'May 25', value: 4800 },
  { name: 'May 31', value: 5500 },
];

const mockActivities = [
  {
    id: 'm1',
    initials: 'DB',
    bgColor: 'bg-slate-200',
    title: <><span className="font-bold text-slate-900">Daniel B.</span> submitted work for <span className="font-bold text-slate-900">E-commerce Website Redesign</span></>,
    time: '2 hours ago',
    dotColor: 'bg-green-500'
  },
  {
    id: 'm2',
    initials: 'EO',
    bgColor: 'bg-slate-200',
    title: <><span className="font-bold text-slate-900">Esther O.</span> requested a milestone payment of <span className="font-bold text-slate-900">$1,600</span></>,
    time: '5 hours ago',
    dotColor: 'bg-yellow-500'
  },
  {
    id: 'm3',
    icon: <CreditCard className="w-4 h-4 text-green-600" />,
    bgColor: 'bg-green-50',
    title: <>Payment of <span className="font-bold text-slate-900">$1,250</span> released to <span className="font-bold text-slate-900">Tunde A.</span></>,
    time: '1 day ago',
    dotColor: 'bg-green-500'
  },
  {
    id: 'm4',
    initials: 'PU',
    bgColor: 'bg-slate-200',
    title: <><span className="font-bold text-slate-900">Praise U.</span> sent a message regarding <span className="font-bold text-slate-900">Shopify Store</span></>,
    time: '1 day ago',
    dotColor: 'bg-blue-500'
  },
  {
    id: 'm5',
    icon: <FileSignature className="w-4 h-4 text-purple-600" />,
    bgColor: 'bg-purple-50',
    title: <>New contract created for <span className="font-bold text-slate-900">Mobile App UI/UX Design</span></>,
    time: '2 days ago',
    dotColor: 'bg-purple-500'
  }
];

const statusData = [
  { name: 'In Progress', value: 12, color: '#10b981' }, // green
  { name: 'In Review', value: 5, color: '#8b5cf6' },   // purple
  { name: 'Pending', value: 3, color: '#f59e0b' },     // orange
  { name: 'Completed', value: 4, color: '#94a3b8' },   // slate
];

const projects = [
  { 
    id: 1, title: 'E-commerce Website Redesign', freelancer: 'Daniel B.', 
    status: 'In Progress', progress: 60, budget: 2500, due: 'May 24, 2025', 
    iconBg: 'bg-slate-800', iconColor: 'text-white' 
  },
  { 
    id: 2, title: 'Shopify Store Development', freelancer: 'Praise U.', 
    status: 'In Progress', progress: 40, budget: 1800, due: 'May 28, 2025',
    iconBg: 'bg-green-100', iconColor: 'text-green-600'
  },
  { 
    id: 3, title: 'Mobile App UI/UX Design', freelancer: 'Esther O.', 
    status: 'In Review', progress: 90, budget: 3200, due: 'May 18, 2025',
    iconBg: 'bg-purple-100', iconColor: 'text-purple-600'
  },
  { 
    id: 4, title: 'Digital Marketing Campaign', freelancer: 'Tunde A.', 
    status: 'Completed', progress: 100, budget: 1250, due: 'May 10, 2025',
    iconBg: 'bg-yellow-100', iconColor: 'text-yellow-600'
  },
];

export default function ClientDashboardPage() {
  const { user } = useAuthStore();
  const firstName = user?.name ? user.name.split(' ')[0] : 'Client';
  const [isAddFundsOpen, setIsAddFundsOpen] = useState(false);
  
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: myProjects, isLoading: projectsLoading } = useMyProjects();

  const combinedSpendingData = [...mockSpendingData];
  if (stats?.totalSpent && stats.totalSpent > 0) {
    combinedSpendingData.push({ name: 'Current', value: stats.totalSpent });
  }

  const actualActivities = (myProjects || []).slice(0, 3).map((p, idx) => {
    const initials = p.freelancer?.name ? p.freelancer.name.substring(0, 2).toUpperCase() : 'FL';
    return {
      id: `actual-${p.id}-${idx}`,
      initials,
      bgColor: 'bg-blue-50',
      title: <><span className="font-bold text-slate-900">Project update:</span> {p.job?.title} is now <span className="font-bold text-slate-900">{p.status}</span></>,
      time: 'Just now',
      dotColor: 'bg-blue-500'
    };
  });
  
  const displayActivities = [...actualActivities, ...mockActivities];

  if (statsLoading || projectsLoading) {
    return <div className="flex h-[80vh] items-center justify-center"><LoadingSpinner size="lg" /></div>;
  }

  return (
    <div className="flex flex-col xl:flex-row gap-8">
      {/* Modals */}
      <AddFundsModal isOpen={isAddFundsOpen} onClose={() => setIsAddFundsOpen(false)} />
      {/* Main Content Area */}
      <div className="flex-1 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Good morning, {firstName}! 👋</h1>
          <p className="text-slate-500 mt-1">Here&apos;s what&apos;s happening with your projects today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="w-14 h-14 rounded-2xl bg-green-50/80 shadow-inner shadow-green-100 flex items-center justify-center">
                <FolderOpen className="w-7 h-7 text-[#00b259]" />
              </div>
            </div>
            <div>
              <p className="text-4xl font-black text-slate-900 tracking-tight">{stats?.activeProjects || 0}</p>
              <p className="text-sm font-semibold text-slate-500 mb-3 mt-1">Active Projects</p>
              <p className="text-xs text-[#00b259] flex items-center font-bold">
                <svg className="w-3.5 h-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                20% <span className="text-slate-400 font-medium ml-1.5">from last month</span>
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="w-14 h-14 rounded-2xl bg-purple-50/80 shadow-inner shadow-purple-100 flex items-center justify-center">
                <ClipboardCheck className="w-7 h-7 text-purple-600" />
              </div>
            </div>
            <div>
              <p className="text-4xl font-black text-slate-900 tracking-tight">{stats?.inReview || 0}</p>
              <p className="text-sm font-semibold text-slate-500 mb-3 mt-1">In Review</p>
              <p className="text-xs text-[#00b259] flex items-center font-bold">
                <svg className="w-3.5 h-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                12% <span className="text-slate-400 font-medium ml-1.5">from last month</span>
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="w-14 h-14 rounded-2xl bg-orange-50/80 shadow-inner shadow-orange-100 flex items-center justify-center">
                <Clock className="w-7 h-7 text-orange-500" />
              </div>
            </div>
            <div>
              <p className="text-4xl font-black text-slate-900 tracking-tight">{stats?.hiredCount || 0}</p>
              <p className="text-sm font-semibold text-slate-500 mb-3 mt-1">Freelancers Hired</p>
              <p className="text-xs text-red-500 flex items-center font-bold">
                <svg className="w-3.5 h-3.5 mr-1 transform rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                8% <span className="text-slate-400 font-medium ml-1.5">from last month</span>
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-50/80 shadow-inner shadow-blue-100 flex items-center justify-center">
                <Wallet className="w-7 h-7 text-blue-500" />
              </div>
            </div>
            <div>
              <p className="text-4xl font-black text-slate-900 tracking-tight">${stats?.totalSpent?.toLocaleString() || 0}</p>
              <p className="text-sm font-semibold text-slate-500 mb-3 mt-1">Total Spent</p>
              <p className="text-xs text-[#00b259] flex items-center font-bold">
                <svg className="w-3.5 h-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                15% <span className="text-slate-400 font-medium ml-1.5">from last month</span>
              </p>
            </div>
          </div>
        </div>

        {/* My Projects */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">My Projects</h2>
            <Link href="/projects" className="text-sm font-semibold text-primary hover:text-primary-600">View All Projects →</Link>
          </div>
          <div className="divide-y divide-slate-100">
            {myProjects && myProjects.length > 0 ? myProjects.slice(0, 4).map((project) => (
              <div key={project.id} className="p-8 flex flex-wrap sm:flex-nowrap items-center hover:bg-slate-50 transition-all w-full group">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 mb-4 sm:mb-0 ${
                  project.status === 'IN_PROGRESS' ? 'bg-blue-50/80 shadow-inner shadow-blue-100' : 
                  project.status === 'COMPLETED' ? 'bg-green-50/80 shadow-inner shadow-green-100' : 
                  'bg-slate-50 shadow-inner shadow-slate-100'
                }`}>
                  <FolderOpen className={`w-6 h-6 ${
                    project.status === 'IN_PROGRESS' ? 'text-blue-600' : 
                    project.status === 'COMPLETED' ? 'text-[#00b259]' : 
                    'text-slate-500'
                  }`} />
                </div>
                <div className="ml-0 sm:ml-6 flex-1 min-w-0 w-full sm:w-auto mb-4 sm:mb-0">
                  <Link href={`/projects/${project.id}`}>
                    <h3 className="text-base font-extrabold text-slate-900 group-hover:text-[#00b259] transition-colors truncate">
                      {project.job?.title || 'Untitled Project'}
                    </h3>
                  </Link>
                  <p className="text-sm font-medium text-slate-500 mt-1 truncate">
                    Freelancer: <span className="text-slate-700">{project.freelancer?.name || 'Unassigned'}</span>
                  </p>
                </div>
                <div className="w-full sm:w-40 px-0 sm:px-6 text-left sm:text-right border-l border-transparent sm:border-slate-100">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Budget</p>
                  <p className="text-lg font-black text-slate-800">${project.budget?.toLocaleString()}</p>
                </div>
                <div className="w-full sm:w-40 px-0 sm:px-6 text-right flex justify-end">
                  <span className={`inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-bold tracking-wide shadow-sm ${
                    project.status === 'IN_PROGRESS' ? 'bg-blue-500 text-white' :
                    project.status === 'COMPLETED' ? 'bg-[#00b259] text-white' :
                    'bg-slate-200 text-slate-700'
                  }`}>
                    {project.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
            )) : (
              <div className="p-12 text-center text-sm font-bold text-slate-400">No active projects yet.</div>
            )}
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-900">Spending Overview</h2>
              <select className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 bg-white text-slate-600 outline-none">
                <option>This Month</option>
                <option>Last Month</option>
              </select>
            </div>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={combinedSpendingData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8', fontSize: 12 }} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8', fontSize: 12 }} 
                    tickFormatter={(val) => `$${val / 1000}k`}
                    dx={-10}
                  />
                  <RechartsTooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    formatter={(value) => [`$${Number(value || 0).toLocaleString()}`, 'Spent']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#10b981" 
                    strokeWidth={3} 
                    dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }} 
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col">
            <h2 className="text-lg font-bold text-slate-900 mb-6">Project Status</h2>
            <div className="flex-1 flex items-center justify-center relative">
              <div className="h-[200px] w-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                      stroke="none"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              {/* Legend overlay for design match */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 space-y-3">
                {statusData.map((s, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }}></div>
                    <div>
                      <p className="text-sm font-semibold text-slate-700">{s.name}</p>
                      <p className="text-xs text-slate-400">{s.value} ({(s.value/24*100).toFixed(0)}%)</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-full xl:w-[320px] space-y-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link href="/jobs/new" className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-slate-100 hover:border-primary/30 hover:bg-primary/5 transition-colors text-slate-600 hover:text-primary group">
              <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center group-hover:bg-primary/10">
                <Plus className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-xs font-semibold text-center">Post a New Job</span>
            </Link>
            <Link href="/freelancers" className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-slate-100 hover:border-purple-500/30 hover:bg-purple-50 transition-colors text-slate-600 hover:text-purple-600 group">
              <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center group-hover:bg-purple-100">
                <UserPlus className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-xs font-semibold text-center">Invite Freelancer</span>
            </Link>
            <button onClick={() => setIsAddFundsOpen(true)} className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-slate-100 hover:border-blue-500/30 hover:bg-blue-50 transition-colors text-slate-600 hover:text-blue-600 group">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center group-hover:bg-blue-100">
                <Wallet className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-xs font-semibold text-center">Add Funds</span>
            </button>
            <Link href="/contracts" className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-slate-100 hover:border-orange-500/30 hover:bg-orange-50 transition-colors text-slate-600 hover:text-orange-600 group">
              <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center group-hover:bg-orange-100">
                <FileSignature className="w-5 h-5 text-orange-500" />
              </div>
              <span className="text-xs font-semibold text-center">Create a Contract</span>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-900">Recent Activity</h2>
            <Link href="/reports" className="text-sm font-semibold text-primary hover:text-primary-600">View All</Link>
          </div>
          
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[19px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-slate-100">
            {displayActivities.map((act) => (
              <div key={act.id} className="relative flex items-start gap-4 group">
                <div className={`w-10 h-10 rounded-full border-4 border-white shadow-sm shrink-0 z-10 overflow-hidden flex items-center justify-center ${act.bgColor}`}>
                  {act.icon ? act.icon : <span className="text-xs font-bold text-slate-500">{act.initials}</span>}
                </div>
                <div>
                  <p className="text-sm text-slate-600">{act.title}</p>
                  <p className="text-xs text-slate-400 mt-1">{act.time}</p>
                </div>
                <div className={`w-2 h-2 rounded-full absolute right-0 top-2 ${act.dotColor}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Support */}
        <div className="bg-[#0A0D0C] rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-primary/20 rounded-full blur-[40px] pointer-events-none"></div>
          <div className="relative z-10 flex flex-col gap-4">
            <h2 className="text-lg font-bold">Need Help?</h2>
            <p className="text-sm text-slate-300">Our support team is here to help you 24/7.</p>
            <div className="flex justify-between items-end">
              <button 
                onClick={() => toast.success('Connecting you to a support agent...')}
                className="bg-primary hover:bg-primary-600 text-white font-semibold py-2 px-4 rounded-xl transition-colors text-sm"
              >
                Contact Support
              </button>
              <Headset className="w-12 h-12 text-primary opacity-80" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

