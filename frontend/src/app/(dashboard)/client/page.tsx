'use client';

import { useAuthStore } from '@/store/auth.store';
import Link from 'next/link';
import { 
  FolderOpen, ClipboardCheck, Clock, Wallet, 
  MoreVertical, Plus, UserPlus, CreditCard, FileSignature, Headset 
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

const spendingData = [
  { name: 'May 1', value: 1000 },
  { name: 'May 5', value: 1500 },
  { name: 'May 10', value: 2000 },
  { name: 'May 15', value: 2500 },
  { name: 'May 20', value: 4260 },
  { name: 'May 25', value: 4800 },
  { name: 'May 31', value: 5500 },
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
  const firstName = user?.name ? user.name.split(' ')[0] : 'John';

  return (
    <div className="flex flex-col xl:flex-row gap-8">
      {/* Main Content Area */}
      <div className="flex-1 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Good morning, {firstName}! 👋</h1>
          <p className="text-slate-500 mt-1">Here&apos;s what&apos;s happening with your projects today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col justify-between">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                <FolderOpen className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-900">12</p>
              <p className="text-sm font-medium text-slate-500 mb-2">Active Projects</p>
              <p className="text-xs text-green-600 flex items-center font-medium">
                <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                20% <span className="text-slate-400 ml-1">from last month</span>
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col justify-between">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center">
                <ClipboardCheck className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-900">5</p>
              <p className="text-sm font-medium text-slate-500 mb-2">In Review</p>
              <p className="text-xs text-green-600 flex items-center font-medium">
                <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                12% <span className="text-slate-400 ml-1">from last month</span>
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col justify-between">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-500" />
              </div>
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-900">3</p>
              <p className="text-sm font-medium text-slate-500 mb-2">Pending Payments</p>
              <p className="text-xs text-red-500 flex items-center font-medium">
                <svg className="w-3 h-3 mr-1 transform rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                8% <span className="text-slate-400 ml-1">from last month</span>
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col justify-between">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                <Wallet className="w-6 h-6 text-blue-500" />
              </div>
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-900">$18,560</p>
              <p className="text-sm font-medium text-slate-500 mb-2">Total Spent</p>
              <p className="text-xs text-green-600 flex items-center font-medium">
                <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                15% <span className="text-slate-400 ml-1">from last month</span>
              </p>
            </div>
          </div>
        </div>

        {/* My Projects */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">My Projects</h2>
            <button className="text-sm font-semibold text-primary hover:text-primary-600">View All Projects →</button>
          </div>
          
          <div className="border-b border-slate-100 px-6 flex gap-6 text-sm font-medium">
            <button className="py-4 text-primary border-b-2 border-primary">All Projects</button>
            <button className="py-4 text-slate-500 hover:text-slate-700">In Progress</button>
            <button className="py-4 text-slate-500 hover:text-slate-700">In Review</button>
            <button className="py-4 text-slate-500 hover:text-slate-700">Completed</button>
            <button className="py-4 text-slate-500 hover:text-slate-700">Cancelled</button>
          </div>

          <div className="divide-y divide-slate-100">
            {projects.map(p => (
              <Link href="/projects/seed-project-1" key={p.id} className="p-6 flex flex-wrap sm:flex-nowrap items-center hover:bg-slate-50/50 transition-colors w-full">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${p.iconBg} mb-4 sm:mb-0`}>
                  <FolderOpen className={`w-5 h-5 ${p.iconColor}`} />
                </div>
                <div className="ml-0 sm:ml-4 flex-1 min-w-0 w-full sm:w-auto mb-4 sm:mb-0">
                  <h3 className="text-sm font-bold text-slate-900 truncate">{p.title}</h3>
                  <p className="text-xs text-slate-500 mt-1">With {p.freelancer}</p>
                </div>
                <div className="w-full sm:w-24 px-0 sm:px-4 mb-4 sm:mb-0">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold
                    ${p.status === 'In Progress' ? 'bg-green-50 text-green-700' : 
                      p.status === 'In Review' ? 'bg-purple-50 text-purple-700' : 
                      'bg-slate-100 text-slate-700'}`}
                  >
                    {p.status}
                  </span>
                </div>
                <div className="w-full sm:w-32 px-0 sm:px-4 hidden md:flex items-center gap-3">
                  <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${p.status === 'In Progress' ? 'bg-green-500' : p.status === 'In Review' ? 'bg-purple-500' : 'bg-slate-400'}`} 
                      style={{ width: `${p.progress}%` }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-slate-700">{p.progress}%</span>
                </div>
                <div className="w-1/2 sm:w-24 px-0 sm:px-4 text-left sm:text-right">
                  <p className="text-sm font-bold text-slate-900">${p.budget.toLocaleString()}</p>
                  <p className="text-[10px] text-slate-400">Budget</p>
                </div>
                <div className="w-1/2 sm:w-28 px-0 sm:px-4 text-right">
                  <p className="text-sm font-semibold text-slate-700">{p.due}</p>
                  <p className="text-[10px] text-slate-400">Due Date</p>
                </div>
              </Link>
            ))}
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
                <LineChart data={spendingData}>
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
                    formatter={(value: number) => [`$${value.toLocaleString()}`, 'Spent']}
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
            <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-slate-100 hover:border-primary/30 hover:bg-primary/5 transition-colors text-slate-600 hover:text-primary group">
              <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center group-hover:bg-primary/10">
                <Plus className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-xs font-semibold text-center">Post a New Job</span>
            </button>
            <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-slate-100 hover:border-purple-500/30 hover:bg-purple-50 transition-colors text-slate-600 hover:text-purple-600 group">
              <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center group-hover:bg-purple-100">
                <UserPlus className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-xs font-semibold text-center">Invite Freelancer</span>
            </button>
            <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-slate-100 hover:border-blue-500/30 hover:bg-blue-50 transition-colors text-slate-600 hover:text-blue-600 group">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center group-hover:bg-blue-100">
                <Wallet className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-xs font-semibold text-center">Add Funds</span>
            </button>
            <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-slate-100 hover:border-orange-500/30 hover:bg-orange-50 transition-colors text-slate-600 hover:text-orange-600 group">
              <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center group-hover:bg-orange-100">
                <FileSignature className="w-5 h-5 text-orange-500" />
              </div>
              <span className="text-xs font-semibold text-center">Create a Contract</span>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-900">Recent Activity</h2>
            <button className="text-sm font-semibold text-primary hover:text-primary-600">View All</button>
          </div>
          
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[19px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-slate-100">
            <div className="relative flex items-start gap-4 group">
              <div className="w-10 h-10 rounded-full bg-slate-200 border-4 border-white shadow-sm shrink-0 z-10 overflow-hidden flex items-center justify-center">
                <span className="text-xs font-bold text-slate-500">DB</span>
              </div>
              <div>
                <p className="text-sm text-slate-600"><span className="font-bold text-slate-900">Daniel B.</span> submitted work for <span className="font-bold text-slate-900">E-commerce Website Redesign</span></p>
                <p className="text-xs text-slate-400 mt-1">2 hours ago</p>
              </div>
              <div className="w-2 h-2 rounded-full bg-green-500 absolute right-0 top-2" />
            </div>

            <div className="relative flex items-start gap-4 group">
              <div className="w-10 h-10 rounded-full bg-slate-200 border-4 border-white shadow-sm shrink-0 z-10 overflow-hidden flex items-center justify-center">
                <span className="text-xs font-bold text-slate-500">EO</span>
              </div>
              <div>
                <p className="text-sm text-slate-600"><span className="font-bold text-slate-900">Esther O.</span> requested a milestone payment of <span className="font-bold text-slate-900">$1,600</span></p>
                <p className="text-xs text-slate-400 mt-1">5 hours ago</p>
              </div>
              <div className="w-2 h-2 rounded-full bg-yellow-500 absolute right-0 top-2" />
            </div>

            <div className="relative flex items-start gap-4 group">
              <div className="w-10 h-10 rounded-full bg-green-50 border-4 border-white shadow-sm shrink-0 z-10 overflow-hidden flex items-center justify-center">
                <CreditCard className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Payment of <span className="font-bold text-slate-900">$1,250</span> released to <span className="font-bold text-slate-900">Tunde A.</span></p>
                <p className="text-xs text-slate-400 mt-1">1 day ago</p>
              </div>
              <div className="w-2 h-2 rounded-full bg-green-500 absolute right-0 top-2" />
            </div>

            <div className="relative flex items-start gap-4 group">
              <div className="w-10 h-10 rounded-full bg-slate-200 border-4 border-white shadow-sm shrink-0 z-10 overflow-hidden flex items-center justify-center">
                <span className="text-xs font-bold text-slate-500">PU</span>
              </div>
              <div>
                <p className="text-sm text-slate-600"><span className="font-bold text-slate-900">Praise U.</span> sent a message regarding <span className="font-bold text-slate-900">Shopify Store</span></p>
                <p className="text-xs text-slate-400 mt-1">1 day ago</p>
              </div>
              <div className="w-2 h-2 rounded-full bg-blue-500 absolute right-0 top-2" />
            </div>

            <div className="relative flex items-start gap-4 group">
              <div className="w-10 h-10 rounded-full bg-purple-50 border-4 border-white shadow-sm shrink-0 z-10 overflow-hidden flex items-center justify-center">
                <FileSignature className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">New contract created for <span className="font-bold text-slate-900">Mobile App UI/UX Design</span></p>
                <p className="text-xs text-slate-400 mt-1">2 days ago</p>
              </div>
              <div className="w-2 h-2 rounded-full bg-purple-500 absolute right-0 top-2" />
            </div>
          </div>
        </div>

        {/* Support */}
        <div className="bg-[#0A0D0C] rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-primary/20 rounded-full blur-[40px] pointer-events-none"></div>
          <div className="relative z-10 flex flex-col gap-4">
            <h2 className="text-lg font-bold">Need Help?</h2>
            <p className="text-sm text-slate-300">Our support team is here to help you 24/7.</p>
            <div className="flex justify-between items-end">
              <button className="bg-primary hover:bg-primary-600 text-white font-semibold py-2 px-4 rounded-xl transition-colors text-sm">
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

