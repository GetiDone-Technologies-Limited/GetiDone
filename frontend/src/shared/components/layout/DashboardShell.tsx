import { Sidebar } from './Sidebar';
import { useUIStore } from '@/store/ui.store';
import { Search, HelpCircle, Sun, Moon } from 'lucide-react';
import { NotificationDropdown } from './NotificationDropdown';
import { MessageDropdown } from './MessageDropdown';
import { UserDropdown } from './UserDropdown';
import { DashboardNavControls } from './DashboardNavControls';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface DashboardShellProps {
  children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  const { toggleSidebar } = useUIStore();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--bg)' }}>
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex h-16 items-center justify-between px-4 sm:px-8 flex-shrink-0" style={{ background: 'var(--card)', borderBottom: '1px solid var(--border)' }}>
          <div className="flex items-center flex-1 gap-3 sm:gap-4">
            <button
              onClick={toggleSidebar}
              className="rounded-lg p-2 transition-colors lift hover:bg-[var(--bg-alt)]"
              style={{ color: 'var(--muted)' }}
              title="Toggle Menu"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <DashboardNavControls />

            {/* Search */}
            <div className="relative w-full max-w-md hidden md:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--muted)' }} />
              <input
                type="text"
                placeholder="Search projects, files, freelancers..."
                className="search-input w-full pl-11 pr-14 py-2.5 rounded-xl text-sm"
              />
              <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] px-1.5 py-0.5 rounded border" style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}>⌘K</kbd>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
              className="btn-ghost w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center lift"
              title={mounted && resolvedTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {mounted && resolvedTheme === 'dark' ? (
                <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600 dark:text-slate-300" />
              )}
            </button>
            <button className="btn-ghost w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center lift">
              <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: 'var(--muted)' }} />
            </button>
            <MessageDropdown />
            <NotificationDropdown />
            <div className="w-px h-8 hidden md:block mx-1" style={{ background: 'var(--border)' }} />
            <UserDropdown />
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8" style={{ background: 'var(--bg)' }}>
          <div className="w-full h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
