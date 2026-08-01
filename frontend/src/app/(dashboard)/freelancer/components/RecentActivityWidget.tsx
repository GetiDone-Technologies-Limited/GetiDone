'use client';

import { Check, MessageSquare, Send } from 'lucide-react';

export function RecentActivityWidget() {
  const activities = [
    { actor: 'TechNova Inc.', text: 'released $1,500 payment', time: '2 hours ago', icon: <Check className="w-3.5 h-3.5 text-emerald-500" /> },
    { actor: 'Innovatech', text: 'sent you a new message', time: 'Yesterday', icon: <MessageSquare className="w-3.5 h-3.5 text-teal-500" /> },
    { actor: 'You', text: 'submitted a proposal for API Developer', time: '2 days ago', icon: <Send className="w-3.5 h-3.5 text-lime-600" /> },
  ];

  return (
    <div className="gd-card p-6">
      <h2 className="font-bold text-lg mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>Recent Activity</h2>
      <div className="space-y-3.5">
        {activities.map((item, idx) => (
          <div key={idx} className="flex gap-3 text-xs p-2 rounded-xl hover:bg-[var(--bg-alt)] transition-colors">
            <div className="w-8 h-8 rounded-full bg-[var(--bg-alt)] border flex items-center justify-center flex-shrink-0">
              {item.icon}
            </div>
            <div className="pt-0.5">
              <div>
                <span className="font-bold">{item.actor}</span> {item.text}
              </div>
              <div className="text-[10px] mt-0.5" style={{ color: 'var(--soft)' }}>{item.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
