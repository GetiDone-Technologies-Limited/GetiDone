'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import { useUIStore } from '@/store/ui.store';
import { Avatar } from '../ui/Avatar';
import Image from 'next/image';
import { 
  Home, Folder, MessageSquare, CreditCard, Users, Star, 
  FileText, BarChart2, Users2, Settings, Plus, Eye, EyeOff, CheckCircle2, ChevronLeft
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
  const { sidebarOpen, toggleSidebar } = useUIStore();

  const [isBalanceHidden, setIsBalanceHidden] = useState(false);

  const visibleLinks = links.filter(
    (l) => !l.roles || (user?.role && l.roles.includes(user.role)),
  );

  return (
    <aside className={`relative flex h-full flex-col bg-[#0A0D0C] text-slate-300 transition-all duration-300 ${sidebarOpen ? 'w-[260px]' : 'w-20 shrink-0'}`}>
      {/* Collapse Toggle Button */}
      <button 
        onClick={toggleSidebar}
        className="absolute -right-3 top-8 z-50 flex h-6 w-6 items-center justify-center rounded-full bg-slate-800 text-white border border-slate-700 shadow-md hover:bg-primary hover:border-primary transition-colors"
      >
        <ChevronLeft className={`h-4 w-4 transition-transform duration-300 ${!sidebarOpen ? 'rotate-180' : ''}`} />
      </button>
      {/* Logo & Post Job */}
      <div className={`p-6 pb-2 shrink-0 ${!sidebarOpen && 'px-2 flex flex-col items-center'}`}>
        <Link href="/" className="block mb-8">
          {sidebarOpen ? (
            <Image 
              src="/logo.png" 
              alt="GetiDone Logo" 
              width={400} 
              height={100} 
              className="w-full h-auto max-h-24 object-contain transition-all" 
              priority
            />
          ) : (
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white text-xl font-black">
              G
            </span>
          )}
        </Link>

        {user?.role === 'CLIENT' && (
          <Link href="/jobs/new" className={`flex items-center justify-center gap-2 rounded-xl bg-primary hover:bg-primary-600 text-white py-3 font-semibold transition-colors ${sidebarOpen ? 'w-full px-4' : 'w-12 h-12 rounded-full p-0'}`}>
            <Plus className="w-5 h-5" />
            {sidebarOpen && <span>Post a New Job</span>}
          </Link>
        )}
      </div>

      {/* Scrollable Area */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar flex flex-col">
        {/* Links */}
        <nav className="px-4 py-4 shrink-0">
          <ul className="space-y-2">
            {visibleLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
              return (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className={`flex items-center rounded-xl py-3 text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                    } ${sidebarOpen ? 'px-4 justify-between' : 'justify-center px-0'}`}
                    title={!sidebarOpen ? link.label : undefined}
                  >
                    <div className="flex items-center gap-3">
                      {link.icon}
                      {sidebarOpen && <span className="truncate whitespace-nowrap">{link.label}</span>}
                    </div>
                    {link.badge && sidebarOpen && (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white shrink-0">
                        {link.badge}
                      </span>
                    )}
                    {link.badge && !sidebarOpen && (
                      <div className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-primary shrink-0" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom Section */}
        <div className={`p-4 space-y-4 mt-auto shrink-0 ${!sidebarOpen && 'px-2 flex flex-col items-center'}`}>
          {/* Balance Card */}
          {sidebarOpen && (
            <div className="rounded-2xl border border-white/10 p-4 relative overflow-hidden">
              <div className="relative z-10 flex items-center justify-between mb-1">
                <p className="text-xs font-medium text-slate-400">Available Balance</p>
                <button onClick={() => setIsBalanceHidden(!isBalanceHidden)} className="text-slate-500 hover:text-slate-300 transition-colors">
                  {isBalanceHidden ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="relative z-10 text-2xl font-bold text-white mb-4">
                {isBalanceHidden ? '****' : '$2,450.00'}
              </p>
              <button className="relative z-10 w-full py-2 text-sm font-semibold text-primary border border-primary/30 rounded-lg hover:bg-primary/10 transition-colors">
                Add Funds
              </button>
            </div>
          )}

          {/* User Profile */}
          <div className={`flex items-center justify-between bg-white/5 rounded-2xl ${sidebarOpen ? 'p-3' : 'p-2 justify-center'}`}>
            <div className="flex items-center gap-3">
              <Avatar src={user?.avatarUrl} name={user?.name ?? 'User'} size="sm" />
              {sidebarOpen && (
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white">{user?.name || 'John Maxwell'}</p>
                  <p className="flex items-center text-xs text-slate-400">
                    {user?.role === 'CLIENT' ? 'Client' : 'Freelancer'}
                    <CheckCircle2 className="w-3 h-3 text-primary ml-1 shrink-0" />
                  </p>
                </div>
              )}
            </div>
            {sidebarOpen && (
              <svg className="w-4 h-4 text-slate-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            )}
          </div>

          {/* Copyright */}
          {sidebarOpen && (
            <div className="pt-2 text-center pb-4">
              <p className="text-[10px] text-slate-500 leading-relaxed">
                &copy; {new Date().getFullYear()} GetiDone Technologies.<br />
                A product of{' '}
                <a 
                  href="https://wa.me/2348101811993" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-400 transition-colors font-medium hover:underline"
                >
                  Benniechat TechWealth Solutions
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

