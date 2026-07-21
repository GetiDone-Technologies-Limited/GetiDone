'use client';

import { CheckCircle2, ChevronDown } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const recentProjects = [
  { id: '1', title: 'E-commerce Platform', freelancer: 'Daniel B.', status: 'Completed', statusColor: 'text-[#00b259] bg-[#00b259]/10 border-[#00b259]/20' },
  { id: '2', title: 'Mobile Banking App', freelancer: 'Sarah K.', status: 'In Progress', statusColor: 'text-blue-600 bg-blue-50 border-blue-100' },
  { id: '3', title: 'Company Website Redesign', freelancer: 'Esther O.', status: 'Completed', statusColor: 'text-[#00b259] bg-[#00b259]/10 border-[#00b259]/20' },
  { id: '4', title: 'CRM Dashboard', freelancer: 'David A.', status: 'In Review', statusColor: 'text-orange-600 bg-orange-50 border-orange-100' },
  { id: '5', title: 'API Integration Project', freelancer: 'Michael T.', status: 'In Progress', statusColor: 'text-blue-600 bg-blue-50 border-blue-100' },
];

const recentActivity = [
  { id: '1', content: 'Payment of $1,800 released to Sarah K.', time: '2 hours ago' },
  { id: '2', content: 'Project "Mobile Banking App" updated', time: '5 hours ago' },
  { id: '3', content: 'Left a 5-star review for Daniel B.', time: '1 day ago' },
  { id: '4', content: 'New project "AI Chatbot Integration" posted', time: '2 days ago' },
  { id: '5', content: 'Contract signed with Michael T.', time: '3 days ago' },
];

const chartData = [
  { name: 'Jan', value: 15000 },
  { name: 'Feb', value: 16000 },
  { name: 'Mar', value: 18000 },
  { name: 'Apr', value: 17500 },
  { name: 'May', value: 20000 },
  { name: 'Jun', value: 24000 },
  { name: 'Jul', value: 28450 },
];

export function ClientProfileWidgets() {
  return (
    <div className="w-full lg:w-[320px] shrink-0 space-y-6">
      
      {/* Recent Projects */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-slate-900">Recent Projects</h2>
          <button className="text-[11px] font-bold text-[#00b259] hover:underline">View All</button>
        </div>
        <div className="space-y-4">
          {recentProjects.map(project => (
            <div key={project.id} className="flex items-center justify-between group cursor-pointer">
               <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0">
                   {project.title.charAt(0)}
                 </div>
                 <div>
                   <h3 className="text-[12px] font-bold text-slate-900 group-hover:text-[#00b259] transition-colors truncate w-32">{project.title}</h3>
                   <p className="text-[10px] font-semibold text-slate-500">{project.freelancer}</p>
                 </div>
               </div>
               <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${project.statusColor} shrink-0`}>
                 {project.status}
               </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-slate-900">Recent Activity</h2>
          <button className="text-[11px] font-bold text-[#00b259] hover:underline">View All</button>
        </div>
        <div className="space-y-4">
          {recentActivity.map(activity => (
            <div key={activity.id} className="flex items-start gap-3">
              <div className="mt-0.5 w-4 h-4 rounded-full bg-[#00b259]/10 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-2.5 h-2.5 text-[#00b259]" />
              </div>
              <div className="flex-1">
                <p className="text-[11px] font-semibold text-slate-700 leading-tight mb-1">{activity.content}</p>
              </div>
              <span className="text-[9px] font-semibold text-slate-400 shrink-0">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Total Spent Overview */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-sm font-bold text-slate-900 mb-1">Total Spent Overview</h2>
            <p className="text-2xl font-black text-slate-900">$28,450</p>
            <p className="text-[10px] font-bold text-[#00b259] flex items-center gap-1">↑ 16% <span className="text-slate-500">from last year</span></p>
          </div>
          <button className="flex items-center gap-1 text-[11px] font-bold text-slate-600 bg-slate-50 px-2 py-1 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors">
            This Year <ChevronDown className="w-3 h-3" />
          </button>
        </div>
        
        <div className="h-32 w-full ml-[-10px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00b259" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#00b259" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 600 }} dy={10} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                itemStyle={{ color: '#00b259', fontWeight: 'bold' }}
                formatter={(value) => [`$${Number(value || 0).toLocaleString()}`, 'Spent']}
              />
              <Area type="monotone" dataKey="value" stroke="#00b259" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      
    </div>
  );
}
