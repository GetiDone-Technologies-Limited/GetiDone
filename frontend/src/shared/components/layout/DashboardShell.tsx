import { Sidebar } from './Sidebar';
import { useUIStore } from '@/store/ui.store';
import { Search, Bell, MessageSquare, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { NotificationDropdown } from './NotificationDropdown';
import { MessageDropdown } from './MessageDropdown';
import { UserDropdown } from './UserDropdown';
import { DashboardNavControls } from './DashboardNavControls';

interface DashboardShellProps {
  children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  const { toggleSidebar } = useUIStore();

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 font-sans">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden bg-[#f4f7f6]">
        {/* Top bar */}
        <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8">
          <div className="flex items-center flex-1">
            <button
              onClick={toggleSidebar}
              className="mr-2 rounded-lg p-2 text-slate-500 hover:bg-slate-100 transition-colors"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <DashboardNavControls />
            
            {/* Search */}
            <div className="relative w-full max-w-md hidden md:block">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search for projects, freelancers..."
                className="block w-full rounded-xl border-slate-200 bg-slate-50 py-2.5 pl-10 pr-12 text-sm placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <div className="flex items-center rounded border border-slate-200 bg-white px-1.5 py-0.5">
                  <span className="text-[10px] font-semibold text-slate-500">⌘K</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Icons */}
            <MessageDropdown />
            <NotificationDropdown />
            <div className="w-px h-8 bg-slate-200 mx-2 hidden md:block"></div>
            <UserDropdown />
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-8">
          <div className="w-full h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

