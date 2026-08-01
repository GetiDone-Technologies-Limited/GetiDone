'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Users, UserPlus, Download, Star, StarHalf, MessageSquare, 
  Link as LinkIcon, Code, Palette, Megaphone, ChevronDown, 
  X, Check, Search, Plus
} from 'lucide-react';
import { InviteMemberModal } from '@/features/team/components/InviteMemberModal';

const mockPODs = [
  { id: 'pod1', name: 'Design POD Alpha', project: 'E-commerce Redesign', status: 'Active', type: 'design', progress: 75, members: [{ name: 'Sarah Kim', avatar: 'https://picsum.photos/seed/sarah/100/100.jpg' }, { name: 'Marcus Lee', avatar: 'https://picsum.photos/seed/marcus/100/100.jpg' }, { name: 'Alex Chen', avatar: 'https://picsum.photos/seed/alex/100/100.jpg' }], capacity: 5 },
  { id: 'pod2', name: 'Dev POD Beta', project: 'Mobile App Development', status: 'Active', type: 'dev', progress: 45, members: [{ name: 'Marcus Lee', avatar: 'https://picsum.photos/seed/marcus/100/100.jpg' }, { name: 'Tunde A.', avatar: 'https://picsum.photos/seed/tunde/100/100.jpg' }], capacity: 4 },
  { id: 'pod3', name: 'Marketing POD', project: 'SEO Campaign', status: 'On Hold', type: 'marketing', progress: 30, members: [{ name: 'Jenny Diaz', avatar: 'https://picsum.photos/seed/jenny/100/100.jpg' }, { name: 'Praise U.', avatar: 'https://picsum.photos/seed/praise/100/100.jpg' }], capacity: 3 },
];

const mockMembers = [
  { id: 'm1', name: 'Sarah Kim', role: 'Brand Designer', avatar: 'https://picsum.photos/seed/sarah/100/100.jpg', rating: 4.9, status: 'online', project: 'E-commerce Redesign' },
  { id: 'm2', name: 'Marcus Lee', role: 'Lead Developer', avatar: 'https://picsum.photos/seed/marcus/100/100.jpg', rating: 4.8, status: 'online', project: 'Mobile App' },
  { id: 'm3', name: 'Alex Chen', role: 'SEO Specialist', avatar: 'https://picsum.photos/seed/alex/100/100.jpg', rating: 4.7, status: 'away', project: 'SEO Campaign' },
  { id: 'm4', name: 'Jenny Diaz', role: 'Content Strategist', avatar: 'https://picsum.photos/seed/jenny/100/100.jpg', rating: 4.6, status: 'offline', project: 'Marketing Campaign' },
  { id: 'm5', name: 'Tunde A.', role: 'Full-Stack Developer', avatar: 'https://picsum.photos/seed/tunde/100/100.jpg', rating: 4.9, status: 'online', project: 'Shopify Store' },
];

export default function TeamPage() {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [activePodFilter, setActivePodFilter] = useState('All');

  const stats = [
    { label: 'TOTAL MEMBERS', value: '15', sub: '4 active right now', icon: Users, color: 'text-emerald-500', bg: 'bg-emerald-500/10', glow: 'rgba(16, 185, 129, 0.15)' },
    { label: 'ACTIVE PODs', value: '4', sub: '12 members assigned', icon: Users, color: 'text-teal-500', bg: 'bg-teal-500/10', glow: 'rgba(20, 184, 166, 0.15)' },
    { label: 'FREELANCERS HIRED', value: '6', sub: 'Ready for deployment', icon: Check, color: 'text-lime-500', bg: 'bg-lime-500/10', glow: 'rgba(132, 204, 22, 0.15)' },
    { label: 'AVG RATING', value: '4.8', sub: 'Based on 48 reviews', icon: Star, color: 'text-amber-500', bg: 'bg-amber-500/10', glow: 'rgba(245, 158, 11, 0.15)' }
  ];

  const filteredPods = activePodFilter === 'All' ? mockPODs : mockPODs.filter(p => {
    if (activePodFilter === 'Dev' && p.type === 'dev') return true;
    if (activePodFilter === 'Design' && p.type === 'design') return true;
    if (activePodFilter === 'Marketing' && p.type === 'marketing') return true;
    return false;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-emerald-500';
      case 'away': return 'bg-amber-500';
      case 'offline': return 'bg-slate-300';
      default: return 'bg-slate-300';
    }
  };

  const getPodTypeConfig = (type: string) => {
    switch(type) {
      case 'dev': return { bg: 'bg-emerald-500/10', text: 'text-emerald-500', label: 'Development', icon: Code };
      case 'design': return { bg: 'bg-teal-500/10', text: 'text-teal-500', label: 'Design', icon: Palette };
      case 'marketing': return { bg: 'bg-lime-500/10', text: 'text-lime-500', label: 'Marketing', icon: Megaphone };
      default: return { bg: 'bg-slate-500/10', text: 'text-slate-500', label: 'General', icon: Users };
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
            <span className="text-slate-900 font-semibold">Teams & PODs</span>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight" style={{ fontFamily: 'Sora, sans-serif' }}>
            Teams & PODs<span style={{ color: 'var(--primary, #10B981)' }}>.</span>
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Manage your talent pool and organize specialized PODs for projects.</p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button className="px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-emerald-600 hover:border-emerald-200 transition-all shadow-sm">
            <Download className="w-4 h-4" /> Export Team
          </button>
          <button onClick={() => setIsInviteModalOpen(true)} className="px-5 py-2.5 rounded-xl text-sm font-bold text-white flex items-center gap-2 shadow-lg hover:-translate-y-0.5 transition-all" style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', boxShadow: '0 8px 24px -6px rgba(16, 185, 129, 0.5)' }}>
            <UserPlus className="w-4 h-4" /> Invite Member
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
            <div className="text-3xl font-extrabold tracking-tight" style={{ fontFamily: 'Sora, sans-serif' }}>{stat.value}</div>
            <div className="text-[11px] mt-1 text-slate-500">{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 fade-up">
        
        {/* Left: PODs Grid (2 cols) */}
        <div className="lg:col-span-2">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
            <h2 className="text-xl font-extrabold text-slate-900" style={{ fontFamily: 'Sora, sans-serif' }}>Active PODs</h2>
            <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-50 border border-slate-100">
              {['All', 'Dev', 'Design', 'Marketing'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActivePodFilter(tab)}
                  className={`px-4 py-1.5 rounded-lg text-[13px] font-bold transition-colors ${
                    activePodFilter === tab 
                      ? 'bg-slate-900 text-white shadow-sm' 
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPods.map(pod => {
              const typeConfig = getPodTypeConfig(pod.type);
              const TypeIcon = typeConfig.icon;
              return (
                <div key={pod.id} className="group relative bg-white border border-slate-200 rounded-[18px] p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-16px_rgba(15,26,20,0.18)] hover:border-emerald-400 overflow-hidden flex flex-col cursor-pointer">
                  <div className="absolute top-0 left-0 right-0 h-1 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" style={{ background: 'linear-gradient(90deg, #10B981, #84CC16)' }} />
                  
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center bg-slate-50 border border-slate-100 ${typeConfig.text}`}>
                      <TypeIcon className="w-5 h-5" />
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${typeConfig.bg} ${typeConfig.text}`}>
                      {typeConfig.label}
                    </span>
                  </div>
                  
                  <h3 className="text-base font-extrabold text-slate-900 mb-1 group-hover:text-emerald-600 transition-colors" style={{ fontFamily: 'Sora, sans-serif' }}>
                    {pod.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-4">
                    <LinkIcon className="w-3 h-3" />
                    <span className="truncate">{pod.project}</span>
                  </div>
                  
                  <div className="mb-4 flex-1">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-bold tracking-wider text-slate-500">PROGRESS</span>
                      <span className={`text-xs font-bold ${typeConfig.text}`}>{pod.progress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all duration-1000 ${typeConfig.bg.replace('/10', '')}`} style={{ width: `${pod.progress}%`, backgroundColor: 'currentColor', color: 'var(--primary, #10B981)' }}></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                    <div className="flex -space-x-2">
                      {pod.members.map((m, idx) => (
                        <img key={idx} src={m.avatar} alt={m.name} className="w-7 h-7 rounded-full border-2 border-white object-cover" />
                      ))}
                      <div className="w-7 h-7 rounded-full border-2 border-white bg-slate-50 flex items-center justify-center text-[10px] font-bold text-slate-500">
                        {pod.members.length}/{pod.capacity}
                      </div>
                    </div>
                    <button className="text-[11px] font-bold flex items-center gap-1.5 text-emerald-600 hover:text-emerald-700 transition-colors">
                      <MessageSquare className="w-3.5 h-3.5" /> Message
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Team Members List (1 col) */}
        <div className="bg-white rounded-[18px] border border-slate-200 shadow-sm flex flex-col overflow-hidden lg:h-[600px]">
          <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
            <h3 className="text-base font-extrabold text-slate-900" style={{ fontFamily: 'Sora, sans-serif' }}>All Members</h3>
            <button className="text-[11px] font-bold text-emerald-600 hover:text-emerald-700 transition-colors flex items-center gap-1">
              <Search className="w-3.5 h-3.5" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-2">
            {mockMembers.map(m => (
              <div key={m.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group">
                <div className="relative shrink-0">
                  <img src={m.avatar} alt={m.name} className="w-10 h-10 rounded-full object-cover border border-slate-200" />
                  <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white ${getStatusColor(m.status)}`}></span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-slate-900 truncate group-hover:text-emerald-600 transition-colors">{m.name}</div>
                  <div className="text-[11px] text-slate-500 truncate">{m.role}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xs font-bold flex items-center justify-end gap-1 text-slate-700">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" /> {m.rating}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate w-24 text-right" title={m.project}>{m.project}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <InviteMemberModal 
        open={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        onInvite={() => setIsInviteModalOpen(false)}
      />
    </div>
  );
}
