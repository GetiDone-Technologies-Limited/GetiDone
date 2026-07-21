'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, MoreVertical } from 'lucide-react';
import { Avatar } from '@/shared/components/ui/Avatar';

const tabs = [
  { id: 'all', label: 'All', count: 18 },
  { id: 'pending', label: 'Pending', count: 6 },
  { id: 'viewed', label: 'Viewed', count: 7 },
  { id: 'interview', label: 'Interview', count: 2 },
  { id: 'offer', label: 'Offer', count: 3 },
  { id: 'declined', label: 'Declined', count: 0 },
];

const mockProposals = [
  {
    id: 'p1',
    title: 'SaaS Dashboard Development',
    client: 'TechNova Inc.',
    price: '$3,500',
    type: 'Fixed Price',
    status: 'Interview',
    statusColor: 'bg-purple-100 text-purple-600',
    iconColor: 'bg-purple-100 text-purple-600',
  },
  {
    id: 'p2',
    title: 'Mobile App Development',
    client: 'HealthPlus',
    price: '$2,800',
    type: 'Fixed Price',
    status: 'Viewed',
    statusColor: 'bg-blue-100 text-blue-600',
    iconColor: 'bg-[#00b259]/10 text-[#00b259]',
  },
  {
    id: 'p3',
    title: 'Website Maintenance',
    client: 'Bright Solutions',
    price: '$500',
    type: 'Fixed Price',
    status: 'Pending',
    statusColor: 'bg-orange-100 text-orange-600',
    iconColor: 'bg-blue-100 text-blue-600',
  },
  {
    id: 'p4',
    title: 'API Integration Project',
    client: 'DataSync Solutions',
    price: '$1,600',
    type: 'Fixed Price',
    status: 'Offer',
    statusColor: 'bg-[#00b259]/10 text-[#00b259]',
    iconColor: 'bg-purple-100 text-purple-600',
  }
];

export function MyProposalsWidget() {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-slate-900">My Proposals</h2>
        <Link href="/jobs" className="text-sm font-bold text-[#00b259] hover:underline flex items-center gap-1">
          Find Jobs <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="flex items-center gap-6 border-b border-slate-100 mb-6 overflow-x-auto custom-scrollbar pb-1">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 text-sm font-bold whitespace-nowrap transition-colors border-b-2 ${
              activeTab === tab.id 
                ? 'border-[#00b259] text-[#00b259]' 
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {mockProposals
          .filter(p => activeTab === 'all' || p.status.toLowerCase() === activeTab)
          .map((proposal) => (
          <div key={proposal.id} className="flex items-center justify-between p-4 -mx-4 hover:bg-slate-50 rounded-2xl transition-colors group">
            <div className="flex items-center gap-5">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-inner ${proposal.iconColor}`}>
                <span className="font-black text-xl">{proposal.title.charAt(0)}</span>
              </div>
              <div>
                <Link href="/proposals">
                  <h4 className="text-base font-extrabold text-slate-900 group-hover:text-[#00b259] transition-colors">
                    {proposal.title}
                  </h4>
                </Link>
                <p className="text-[12px] font-semibold text-slate-500 mt-1">{proposal.client}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-8">
              <div className="text-right hidden sm:block">
                <p className="text-base font-black text-slate-900">{proposal.price}</p>
                <p className="text-[11px] font-bold text-slate-400 mt-1 uppercase tracking-widest">{proposal.type}</p>
              </div>
              
              <div className="w-28 text-right">
                <span className={`inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-bold shadow-sm ${proposal.statusColor}`}>
                  {proposal.status}
                </span>
              </div>
              
              <button className="w-10 h-10 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
