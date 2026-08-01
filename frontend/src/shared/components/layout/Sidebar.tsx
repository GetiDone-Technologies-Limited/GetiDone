'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import { useUIStore } from '@/store/ui.store';
import { useMessagingStore } from '@/store/messaging.store';
import { Avatar } from '../ui/Avatar';
import { AddFundsModal } from '@/features/payment/components/AddFundsModal';
import { 
  Home, Folder, MessageSquare, CreditCard, Users, Star, 
  FileText, BarChart2, Users2, Settings, Plus, CheckCircle2, ChevronLeft,
  Search, Calendar, Image as ImageIcon, DollarSign, ChevronDown, Rocket, LogOut
} from 'lucide-react';

interface SidebarLink {
  href: string;
  label: string;
  icon: React.ReactNode;
  badge?: number | string;
  roles?: string[];
  section?: 'MAIN' | 'TOOLS';
}

const links: SidebarLink[] = [
  // MAIN section
  { href: '/client', label: 'Dashboard', icon: <Home className="w-5 h-5" />, roles: ['CLIENT'], section: 'MAIN' },
  { href: '/freelancer', label: 'Dashboard', icon: <Home className="w-5 h-5" />, roles: ['FREELANCER'], section: 'MAIN' },
  
  { href: '/jobs/search', label: 'Find Jobs', icon: <Search className="w-5 h-5" />, roles: ['FREELANCER'], section: 'MAIN' },
  { href: '/proposals', label: 'My Proposals', icon: <FileText className="w-5 h-5" />, badge: 12, roles: ['FREELANCER'], section: 'MAIN' },
  { href: '/freelancer/projects', label: 'Active Projects', icon: <Folder className="w-5 h-5" />, badge: 4, roles: ['FREELANCER'], section: 'MAIN' },
  
  { href: '/projects', label: 'My Projects', icon: <Folder className="w-5 h-5" />, roles: ['CLIENT'], section: 'MAIN' },
  
  { href: '/messages', label: 'Messages', icon: <MessageSquare className="w-5 h-5" />, badge: 8, section: 'MAIN' },
  { href: '/payments', label: 'Payments', icon: <CreditCard className="w-5 h-5" />, section: 'MAIN' },
  { href: '/contracts', label: 'Contracts', icon: <FileText className="w-5 h-5" />, section: 'MAIN' },
  
  { href: '/freelancers', label: 'Freelancers', icon: <Users className="w-5 h-5" />, roles: ['CLIENT'], section: 'MAIN' },
  { href: '/team', label: 'Team', icon: <Users2 className="w-5 h-5" />, roles: ['CLIENT'], section: 'MAIN' },
  { href: '/reports', label: 'Reports', icon: <BarChart2 className="w-5 h-5" />, section: 'MAIN' },
  
  // TOOLS section
  { href: '/schedule', label: 'Calendar', icon: <Calendar className="w-5 h-5" />, roles: ['FREELANCER'], section: 'TOOLS' },
  { href: '/saved', label: 'Saved Talents', icon: <Star className="w-5 h-5" />, roles: ['CLIENT'], section: 'TOOLS' },
  { href: '/portfolio', label: 'Portfolio', icon: <ImageIcon className="w-5 h-5" />, roles: ['FREELANCER'], section: 'TOOLS' },
  { href: '/reviews', label: 'Reviews', icon: <Star className="w-5 h-5" />, badge: 23, roles: ['FREELANCER'], section: 'TOOLS' },
  { href: '/earnings', label: 'Earnings', icon: <DollarSign className="w-5 h-5" />, roles: ['FREELANCER'], section: 'TOOLS' },
  { href: '/settings', label: 'Settings', icon: <Settings className="w-5 h-5" />, section: 'TOOLS' },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuthStore();
  const { sidebarOpen, toggleSidebar } = useUIStore();
  const { conversations } = useMessagingStore();

  const [isAddFundsOpen, setIsAddFundsOpen] = useState(false);

  const unreadMessagesCount = conversations.reduce((acc, conv) => acc + conv.unreadCount, 0);

  const visibleLinks = links
    .filter((l) => !l.roles || (user?.role && l.roles.includes(user.role)))
    .map((l) => {
      if (l.label === 'Messages' && unreadMessagesCount > 0) {
        return { ...l, badge: unreadMessagesCount };
      }
      return l;
    });

  const mainLinks = visibleLinks.filter(l => l.section === 'MAIN' || !l.section);
  const toolLinks = visibleLinks.filter(l => l.section === 'TOOLS');

  return (
    <aside className={`relative flex h-full flex-col text-slate-300 transition-all duration-300 z-50 ${sidebarOpen ? 'w-[280px]' : 'w-20 shrink-0'}`} style={{ background: 'radial-gradient(circle at top left, #131A16 0%, #0A0F0D 100%)', borderRight: '1px solid var(--border)' }}>
      {/* Collapse Toggle Button */}
      <button 
        onClick={toggleSidebar}
        className="absolute -right-3 top-8 z-50 flex h-6 w-6 items-center justify-center rounded-full bg-slate-800 text-white border border-slate-700 shadow-md hover:bg-primary hover:border-primary transition-colors lift"
      >
        <ChevronLeft className={`h-4 w-4 transition-transform duration-300 ${!sidebarOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {/* Logo Area */}
      <div className={`pt-6 px-6 pb-6 shrink-0 ${!sidebarOpen && 'px-2 flex flex-col items-center'}`}>
        <Link href="/" className="block">
          {sidebarOpen ? (
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-light to-primary-dark text-white text-xl font-black shadow-lg shadow-primary/20">
                  G
                </span>
                <span className="text-xl font-bold text-white tracking-tight">Geti<span style={{ color: 'var(--primary)' }}>Done</span></span>
              </div>
              <span className="text-[10px] font-bold text-slate-500 tracking-widest pl-10">CLIENT SPACE</span>
            </div>
          ) : (
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary-light to-primary-dark text-white text-xl font-black shadow-lg shadow-primary/20">
              G
            </span>
          )}
        </Link>
      </div>
      
      {/* Post Job Button (Client) */}
      {user?.role === 'CLIENT' && (
        <div className={`px-4 mb-6 shrink-0 ${!sidebarOpen && 'px-2 flex flex-col items-center'}`}>
          <Link href="/jobs/new" className={`flex items-center justify-center gap-2 rounded-xl btn-primary text-white py-3 font-semibold transition-all ${sidebarOpen ? 'w-full px-4' : 'w-12 h-12 rounded-full p-0'}`}>
            <Plus className="w-5 h-5" />
            {sidebarOpen && <span>Post a New Job</span>}
          </Link>
        </div>
      )}

      {/* Scrollable Area */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar flex flex-col px-3">
        {/* MAIN Nav Section */}
        {sidebarOpen && mainLinks.length > 0 && (
          <div className="text-[10px] font-bold text-slate-500 tracking-wider mb-2 px-3 mt-2">MAIN</div>
        )}
        <nav className="shrink-0 mb-6">
          <ul className="space-y-1">
            {mainLinks.map((link) => {
              const isActive = pathname === link.href || pathname === link.href + 's' || pathname.startsWith(link.href + '/');
              return (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className={`group flex items-center rounded-xl py-2.5 text-sm font-medium transition-all duration-300 relative ${
                      isActive
                        ? 'text-white bg-gradient-to-r from-primary/10 to-transparent'
                        : 'text-slate-400 hover:text-slate-200'
                    } ${sidebarOpen ? 'px-3 justify-between' : 'justify-center px-0'}`}
                    title={!sidebarOpen ? link.label : undefined}
                  >
                    {isActive && sidebarOpen && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-3/5 bg-primary rounded-r-full shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                    )}
                    <div className="flex items-center gap-3 transition-transform duration-200 group-hover:translate-x-1">
                      <div className={`${isActive ? 'text-primary' : 'text-slate-500 group-hover:text-slate-300'}`}>
                        {link.icon}
                      </div>
                      {sidebarOpen && <span className="truncate whitespace-nowrap">{link.label}</span>}
                    </div>
                    {link.badge && sidebarOpen && (
                      <span className="flex h-5 px-2 items-center justify-center rounded-full text-[10px] font-bold shrink-0 bg-primary/20 text-primary border border-primary/30">
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

        {/* TOOLS Nav Section */}
        {sidebarOpen && toolLinks.length > 0 && (
          <div className="text-[10px] font-bold text-slate-500 tracking-wider mb-2 px-3">TOOLS</div>
        )}
        <nav className="shrink-0 mb-6">
          <ul className="space-y-1">
            {toolLinks.map((link) => {
              const isActive = pathname === link.href || pathname === link.href + 's' || pathname.startsWith(link.href + '/');
              return (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className={`group flex items-center rounded-xl py-2.5 text-sm font-medium transition-all duration-300 relative ${
                      isActive
                        ? 'text-white bg-gradient-to-r from-primary/10 to-transparent'
                        : 'text-slate-400 hover:text-slate-200'
                    } ${sidebarOpen ? 'px-3 justify-between' : 'justify-center px-0'}`}
                    title={!sidebarOpen ? link.label : undefined}
                  >
                    {isActive && sidebarOpen && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-3/5 bg-primary rounded-r-full shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                    )}
                    <div className="flex items-center gap-3 transition-transform duration-200 group-hover:translate-x-1">
                      <div className={`${isActive ? 'text-primary' : 'text-slate-500 group-hover:text-slate-300'}`}>
                        {link.icon}
                      </div>
                      {sidebarOpen && <span className="truncate whitespace-nowrap">{link.label}</span>}
                    </div>
                    {link.badge && sidebarOpen && (
                      <span className="flex h-5 px-2 items-center justify-center rounded-full text-[10px] font-bold shrink-0 bg-primary/20 text-primary border border-primary/30">
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
        <div className={`mt-auto shrink-0 space-y-4 ${!sidebarOpen && 'flex flex-col items-center'}`}>
          
          {/* GetiDone Pro Banner */}
          {sidebarOpen && (
            <div className="bg-[#131A16] border border-primary/20 rounded-2xl p-4 relative overflow-hidden group mx-2 mb-4">
               <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-primary/20 blur-2xl rounded-full group-hover:bg-primary/30 transition-all duration-500"></div>
               <div className="relative z-10">
                 <div className="flex items-center gap-2 mb-2">
                   <h4 className="text-sm font-bold text-white">Upgrade to Pro</h4>
                   <Rocket className="w-4 h-4 text-primary" />
                 </div>
                 <p className="text-[11px] text-slate-400 mb-4 leading-relaxed pr-2">
                   Get priority support and advanced features.
                 </p>
                 <button className="w-full bg-primary/10 hover:bg-primary/20 text-primary py-2 rounded-xl text-xs font-bold transition-colors border border-primary/30">
                   Upgrade Now
                 </button>
               </div>
            </div>
          )}

        </div>
      </div>
      
      {/* User Profile Area (Bottom of Sidebar) */}
      <div className={`p-4 border-t border-slate-800 shrink-0 ${!sidebarOpen && 'px-2 flex flex-col items-center'}`}>
        <div className={`flex items-center bg-[#131A16] rounded-xl hover:bg-slate-800 transition-colors cursor-pointer ${sidebarOpen ? 'p-2.5 gap-3' : 'p-2 justify-center'}`}>
          <Avatar src={user?.avatarUrl} name={user?.name ?? 'User'} gender={user?.gender} size="sm" className="border border-slate-700" />
          
          {sidebarOpen && (
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-white">{user?.name || 'Daniel Benson'}</p>
              <p className="truncate text-xs text-slate-400">
                {user?.email || 'daniel@example.com'}
              </p>
            </div>
          )}
        </div>
        
        {/* Sign Out Button (Small/Icon only) */}
        {!sidebarOpen && (
           <button 
             onClick={() => {
               useAuthStore.getState().logout();
               window.location.href = '/login';
             }}
             className="mt-4 flex items-center justify-center gap-3 w-full rounded-xl text-slate-500 hover:text-red-500 hover:bg-red-500/10 py-2.5 transition-all"
             title="Sign Out"
           >
             <LogOut className="w-5 h-5 shrink-0" />
           </button>
        )}
      </div>

      <AddFundsModal isOpen={isAddFundsOpen} onClose={() => setIsAddFundsOpen(false)} />
    </aside>
  );
}

function ArrowRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}
