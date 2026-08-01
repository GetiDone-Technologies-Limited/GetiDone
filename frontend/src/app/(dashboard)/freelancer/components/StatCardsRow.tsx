'use client';

import { DollarSign, Send, FileSignature, Zap } from 'lucide-react';
import { useDashboardStats } from '@/features/dashboard/hooks/useDashboard';

export function StatCardsRow() {
  const { data: stats } = useDashboardStats();

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 fade-up">
      <div className="gd-card gd-stat-card p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: 'var(--muted)' }}>EARNINGS (MONTH)</span>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(16,185,129,0.12)', color: 'var(--primary)' }}>
            <DollarSign className="w-4 h-4" />
          </div>
        </div>
        <div className="text-3xl font-extrabold tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>
          ${stats?.earnings?.toLocaleString() || '4,560'}
        </div>
        <div className="text-[11px] mt-1" style={{ color: 'var(--soft)' }}>
          <span className="font-bold text-emerald-600">+12.4%</span> vs last month
        </div>
      </div>

      <div className="gd-card gd-stat-card p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: 'var(--muted)' }}>ACTIVE PROPOSALS</span>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(245,158,11,0.12)', color: 'var(--warning)' }}>
            <Send className="w-4 h-4" />
          </div>
        </div>
        <div className="text-3xl font-extrabold tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>
          {stats?.proposalsCount || 4}
        </div>
        <div className="text-[11px] mt-1" style={{ color: 'var(--soft)' }}>2 awaiting response</div>
      </div>

      <div className="gd-card gd-stat-card p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: 'var(--muted)' }}>ACTIVE CONTRACTS</span>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(20,184,166,0.12)', color: 'var(--secondary)' }}>
            <FileSignature className="w-4 h-4" />
          </div>
        </div>
        <div className="text-3xl font-extrabold tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>
          {stats?.activeProjects || 2}
        </div>
        <div className="text-[11px] mt-1" style={{ color: 'var(--soft)' }}>1 milestone due soon</div>
      </div>

      <div className="gd-card gd-stat-card p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: 'var(--muted)' }}>AVAILABLE CONNECTS</span>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(132,204,22,0.12)', color: 'var(--accent)' }}>
            <Zap className="w-4 h-4" />
          </div>
        </div>
        <div className="text-3xl font-extrabold tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>
          64
        </div>
        <div className="text-[11px] mt-1" style={{ color: 'var(--soft)' }}>Resets in 12 days</div>
      </div>
    </div>
  );
}
