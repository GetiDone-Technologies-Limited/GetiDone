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
  Search, Calendar, Image as ImageIcon, DollarSign, ChevronDown, Rocket
} from 'lucide-react';

interface SidebarLink {
  href: string;
  label: string;
  icon: React.ReactNode;
  badge?: number | string;
  roles?: string[];
  badgeColor?: string;
}

const links: SidebarLink[] = [
  { href: '/client', label: 'Dashboard', icon: <Home className="w-5 h-5" />, roles: ['CLIENT'] },
  { href: '/freelancer', label: 'Dashboard', icon: <Home className="w-5 h-5" />, roles: ['FREELANCER'] },
  
  // Freelancer specific links
  { href: '/jobs/search', label: 'Find Jobs', icon: <Search className="w-5 h-5" />, roles: ['FREELANCER'] },
  { href: '/proposals', label: 'My Proposals', icon: <FileText className="w-5 h-5" />, badge: 12, roles: ['FREELANCER'] },
  { href: '/freelancer/projects', label: 'Active Projects', icon: <Folder className="w-5 h-5" />, badge: 4, roles: ['FREELANCER'] },
  
  // Shared links
  { href: '/messages', label: 'Messages', icon: <MessageSquare className="w-5 h-5" />, badge: 8 },
  { href: '/payments', label: 'Payments', icon: <CreditCard className="w-5 h-5" /> },
  { href: '/contracts', label: 'Contracts', icon: <FileText className="w-5 h-5" /> },
  
  // Freelancer specific links
  { href: '/schedule', label: 'Schedule', icon: <Calendar className="w-5 h-5" />, roles: ['FREELANCER'] },
  { href: '/portfolio', label: 'Portfolio', icon: <ImageIcon className="w-5 h-5" />, roles: ['FREELANCER'] },
  { href: '/reviews', label: 'Reviews', icon: <Star className="w-5 h-5" />, badge: 23, roles: ['FREELANCER'] },
  { href: '/earnings', label: 'Earnings', icon: <DollarSign className="w-5 h-5" />, roles: ['FREELANCER'] },
  
  // Client specific links
  { href: '/projects', label: 'My Projects', icon: <Folder className="w-5 h-5" />, roles: ['CLIENT'] },
  { href: '/freelancers', label: 'Freelancers', icon: <Users className="w-5 h-5" />, roles: ['CLIENT'] },
  { href: '/saved', label: 'Saved Talents', icon: <Star className="w-5 h-5" />, roles: ['CLIENT'] },
  { href: '/team', label: 'Team Members', icon: <Users2 className="w-5 h-5" />, roles: ['CLIENT'] },
  
  // Common
  { href: '/reports', label: 'Reports & Analytics', icon: <BarChart2 className="w-5 h-5" /> },
  { href: '/settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
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

  return (
    <aside className={`relative flex h-full flex-col bg-[#0A0D0C] text-slate-300 transition-all duration-300 ${sidebarOpen ? 'w-[260px]' : 'w-20 shrink-0'}`}>
      {/* Collapse Toggle Button */}
      <button 
        onClick={toggleSidebar}
        className="absolute -right-3 top-8 z-50 flex h-6 w-6 items-center justify-center rounded-full bg-slate-800 text-white border border-slate-700 shadow-md hover:bg-primary hover:border-primary transition-colors"
      >
        <ChevronLeft className={`h-4 w-4 transition-transform duration-300 ${!sidebarOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {/* Logo Area */}
      <div className={`pt-6 px-6 pb-4 shrink-0 ${!sidebarOpen && 'px-2 flex flex-col items-center'}`}>
        <Link href="/" className="block">
          {sidebarOpen ? (
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white text-xl font-black">
                G
              </span>
              <span className="text-xl font-bold text-white tracking-tight">Geti<span className="text-primary">Done</span></span>
            </div>
          ) : (
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white text-xl font-black">
              G
            </span>
          )}
        </Link>
      </div>

      {/* User Profile Area (Top of Sidebar) */}
      <div className={`px-4 pb-4 shrink-0 ${!sidebarOpen && 'px-2 flex flex-col items-center'}`}>
        <div className={`flex items-center bg-white/5 rounded-2xl ${sidebarOpen ? 'p-3 gap-3' : 'p-2 justify-center'}`}>
          <Avatar src={user?.avatarUrl} name={user?.name ?? 'User'} gender={user?.gender} size="md" className="border-2 border-slate-800" />
          
          {sidebarOpen && (
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <p className="truncate text-sm font-bold text-white">{user?.name || 'Daniel Benson'}</p>
                <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
              </div>
              <p className="truncate text-xs text-slate-400">
                {user?.role === 'CLIENT' ? 'Client' : 'Full Stack Developer'}
              </p>
            </div>
          )}
        </div>
        
        {/* Availability Toggle */}
        {sidebarOpen && user?.role === 'FREELANCER' && (
           <div className="mt-3 bg-[#00b259]/10 border border-[#00b259]/20 rounded-xl px-3 py-2 flex items-center justify-between cursor-pointer hover:bg-[#00b259]/20 transition-colors">
             <div className="flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-primary relative">
                 <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75"></span>
               </span>
               <span className="text-xs font-semibold text-primary">Available for work</span>
             </div>
             <ChevronDown className="w-4 h-4 text-primary" />
           </div>
        )}
      </div>

      {/* Scrollable Area */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar flex flex-col">
        {/* Links */}
        <nav className="px-4 py-2 shrink-0">
          <ul className="space-y-1">
            {visibleLinks.map((link) => {
              const isActive = pathname === link.href || pathname === link.href + 's' || pathname.startsWith(link.href + '/');
              return (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className={`flex items-center rounded-xl py-2.5 text-sm font-medium transition-all ${
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
                      <span className={`flex h-5 w-auto px-1.5 items-center justify-center rounded-full text-[10px] font-bold shrink-0 ${isActive ? 'bg-primary text-white' : 'bg-slate-800 text-slate-300'}`}>
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
        <div className={`p-4 mt-auto shrink-0 space-y-4 ${!sidebarOpen && 'px-2 flex flex-col items-center'}`}>
          
          {/* Post Job Button (Client) */}
          {user?.role === 'CLIENT' && (
            <Link href="/jobs/new" className={`flex items-center justify-center gap-2 rounded-xl bg-primary hover:bg-primary-600 text-white py-3 font-semibold transition-colors ${sidebarOpen ? 'w-full px-4' : 'w-12 h-12 rounded-full p-0'}`}>
              <Plus className="w-5 h-5" />
              {sidebarOpen && <span>Post a New Job</span>}
            </Link>
          )}

          {/* Profile Completion (Freelancer) */}
          {sidebarOpen && user?.role === 'FREELANCER' && (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
               <div className="flex items-center justify-between mb-2">
                 <span className="text-xs font-semibold text-slate-300">Profile Completion</span>
                 <span className="text-xs font-bold text-white">85% Complete</span>
               </div>
               <div className="w-full bg-slate-800 h-1.5 rounded-full mb-3 overflow-hidden">
                 <div className="bg-primary h-full rounded-full w-[85%]"></div>
               </div>
               <p className="text-[10px] text-slate-400 mb-3 leading-relaxed">
                 Complete your profile to get more jobs
               </p>
               <button className="text-xs font-bold text-primary flex items-center gap-1 hover:underline">
                 Complete Profile <ArrowRight className="w-3 h-3" />
               </button>
            </div>
          )}

          {/* GetiDone Pro Banner */}
          {sidebarOpen && (
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-4 relative overflow-hidden group">
               <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-primary/20 blur-2xl rounded-full group-hover:bg-primary/30 transition-all duration-500"></div>
               <div className="relative z-10">
                 <div className="flex items-center gap-2 mb-2">
                   <h4 className="text-sm font-bold text-white">GetiDone Pro</h4>
                   <Rocket className="w-4 h-4 text-primary" />
                 </div>
                 <p className="text-[11px] text-slate-400 mb-4 leading-relaxed pr-4">
                   Increase your visibility and win more projects.
                 </p>
                 <button className="w-full bg-primary/20 hover:bg-primary text-primary hover:text-white py-2 rounded-xl text-xs font-bold transition-colors">
                   Upgrade Now
                 </button>
               </div>
            </div>
          )}

        </div>
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
