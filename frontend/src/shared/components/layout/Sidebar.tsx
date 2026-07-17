'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import { useUIStore } from '@/store/ui.store';
import { Avatar } from '../ui/Avatar';

interface SidebarLink {
  href: string;
  label: string;
  icon: React.ReactNode;
  roles?: string[];
}

function BriefcaseIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7H4a2 2 0 00-2 2v9a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zm0 0V5a2 2 0 00-2-2H6a2 2 0 00-2 2v2" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
}

const links: SidebarLink[] = [
  { href: '/dashboard/client', label: 'Dashboard', icon: <HomeIcon />, roles: ['CLIENT'] },
  { href: '/dashboard/freelancer', label: 'Dashboard', icon: <HomeIcon />, roles: ['FREELANCER'] },
  { href: '/jobs', label: 'Jobs', icon: <BriefcaseIcon /> },
  { href: '/messages', label: 'Messages', icon: <ChatIcon /> },
  { href: '/profile', label: 'Profile', icon: <UserIcon /> },
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
    <aside className="flex h-full w-64 flex-col border-r border-slate-200 bg-white">
      {/* User info */}
      <div className="flex items-center gap-3 border-b border-slate-100 p-4">
        <Avatar src={user?.avatarUrl} name={user?.name ?? ''} size="md" />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-900">{user?.name}</p>
          <p className="truncate text-xs text-slate-500">{user?.role}</p>
        </div>
      </div>

      {/* Links */}
      <nav className="flex-1 overflow-y-auto p-3">
        <ul className="space-y-1">
          {visibleLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
            return (
              <li key={link.href + link.label}>
                <Link
                  href={link.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <span className={isActive ? 'text-primary-600' : 'text-slate-400'}>{link.icon}</span>
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* DoneScore */}
      {user && (
        <div className="border-t border-slate-100 p-4">
          <div className="rounded-lg bg-primary-50 p-3">
            <p className="text-xs text-slate-500 mb-1">DoneScore™</p>
            <p className="text-2xl font-bold text-primary-700">{user.doneScore}</p>
          </div>
        </div>
      )}
    </aside>
  );
}

