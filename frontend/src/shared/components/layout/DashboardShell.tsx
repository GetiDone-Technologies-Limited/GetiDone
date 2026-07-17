import { Sidebar } from './Sidebar';
import { useUIStore } from '@/store/ui.store';
import { ThemeToggle } from '../ui/ThemeToggle';
import Image from 'next/image';

interface DashboardShellProps {
  children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  const { toggleSidebar } = useUIStore();

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <div className="flex h-14 items-center border-b border-slate-200 bg-white px-4">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="mr-3 rounded-lg p-1.5 text-on-surface-variant hover:bg-surface-container transition-colors"
              aria-label="Toggle sidebar"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <Image src="/logo.png" alt="GetiDone" width={160} height={40} className="h-10 w-auto" />
          </div>
          <ThemeToggle />
        </div>
        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

