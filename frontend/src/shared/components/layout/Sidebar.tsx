'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import { useUIStore } from '@/store/ui.store';
import { Avatar } from '../ui/Avatar';
import Image from 'next/image';
import { 
  Home, Folder, MessageSquare, CreditCard, Users, Star, 
  FileText, BarChart2, Users2, Settings, Plus, Eye 
} from 'lucide-react';

interface SidebarLink {
  href: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
  roles?: string[];
}

const links: SidebarLink[] = [
  { href: '/client', label: 'Dashboard', icon: <Home className="w-5 h-5" />, roles: ['CLIENT'] },
  { href: '/freelancer', label: 'Dashboard', icon: <Home className="w-5 h-5" />, roles: ['FREELANCER'] },
  { href: '/projects', label: 'My Projects', icon: <Folder className="w-5 h-5" /> },
  { href: '/messages', label: 'Messages', icon: <MessageSquare className="w-5 h-5" />, badge: 8 },
  { href: '/payments', label: 'Payments', icon: <CreditCard className="w-5 h-5" /> },
  { href: '/freelancers', label: 'Freelancers', icon: <Users className="w-5 h-5" /> },
  { href: '/saved', label: 'Saved Talents', icon: <Star className="w-5 h-5" /> },
  { href: '/contracts', label: 'Contracts', icon: <FileText className="w-5 h-5" /> },
  { href: '/reports', label: 'Reports & Analytics', icon: <BarChart2 className="w-5 h-5" /> },
  { href: '/team', label: 'Team Members', icon: <Users2 className="w-5 h-5" /> },
  { href: '/settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuthStore();
  const { sidebarOpen } = useUIStore();

  const visibleLinks = links.filter(
    (l) => !l.roles || (user?.role && l.roles.includes(user.role)),
  );

  if (!sidebarOpen) return null;

  return (
    <aside className="flex h-full w-[260px] flex-col bg-[#0A0D0C] text-slate-300">
      {/* Logo & Post Job */}
      <div className="p-6 pb-2">
        <Link href="/" className="flex items-center gap-2 font-bold text-2xl text-white mb-8">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white text-sm font-black">
            G
          </span>
          Geti<span className="text-primary">Done</span>
        </Link>

        {user?.role === 'CLIENT' && (
          <Link href="/jobs/new" className="flex items-center justify-center gap-2 w-full rounded-xl bg-primary hover:bg-primary-600 text-white py-3 px-4 font-semibold transition-colors">
            <Plus className="w-5 h-5" />
            Post a New Job
          </Link>
        )}
      </div>

      {/* Links */}
      <nav className="flex-1 overflow-y-auto px-4 py-4 custom-scrollbar">
        <ul className="space-y-1">
          {visibleLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
            return (
              <li key={link.href + link.label}>
                <Link
                  href={link.href}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {link.icon}
                    {link.label}
                  </div>
                  {link.badge && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                      {link.badge}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Section */}
      <div className="p-4 space-y-4">
        {/* Balance Card */}
        <div className="rounded-2xl border border-white/10 p-4 relative overflow-hidden">
          <div className="relative z-10 flex items-center justify-between mb-1">
            <p className="text-xs font-medium text-slate-400">Available Balance</p>
            <Eye className="w-4 h-4 text-slate-500" />
          </div>
          <p className="relative z-10 text-2xl font-bold text-white mb-4">$2,450.00</p>
          <button className="relative z-10 w-full py-2 text-sm font-semibold text-primary border border-primary/30 rounded-lg hover:bg-primary/10 transition-colors">
            Add Funds
          </button>
        </div>

        {/* User Profile */}
        <div className="flex items-center justify-between bg-white/5 rounded-2xl p-3">
          <div className="flex items-center gap-3">
            <Avatar src={user?.avatarUrl} name={user?.name ?? 'User'} size="sm" />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">{user?.name || 'John Maxwell'}</p>
              <p className="flex items-center text-xs text-slate-400">
                {user?.role === 'CLIENT' ? 'Client' : 'Freelancer'}
                <CheckCircle2 className="w-3 h-3 text-primary ml-1" />
              </p>
            </div>
          </div>
          <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </aside>
  );
}

