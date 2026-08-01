'use client';

import { useState, useRef, useEffect } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { LogOut, User, Settings, ChevronDown } from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 hover:opacity-80 p-1.5 rounded-xl transition-all lift"
      >
        <Avatar src={user.avatarUrl} name={user.name} size="sm" />
        <ChevronDown className="w-4 h-4" style={{ color: 'var(--muted)' }} />
      </button>

      {isOpen && (
        <div 
          className="absolute right-0 top-full mt-2 w-60 rounded-[18px] border shadow-[0_16px_40px_-12px_rgba(15,26,20,0.2)] z-50 overflow-hidden"
          style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
        >
          <div className="p-4 border-b flex flex-col items-center justify-center gap-2" style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}>
            <Avatar src={user.avatarUrl} name={user.name} className="w-11 h-11" />
            <div className="text-center">
              <p className="text-sm font-display font-bold truncate" style={{ color: 'var(--text)' }}>{user.name}</p>
              <p className="text-xs truncate" style={{ color: 'var(--muted)' }}>{user.email}</p>
            </div>
            <div className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase mt-1" style={{ background: 'var(--bg-alt)', color: 'var(--primary)' }}>
              {user.role}
            </div>
          </div>
          <div className="p-2 flex flex-col gap-1">
            <Link 
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-colors hover:bg-[var(--bg-alt)]"
              style={{ color: 'var(--text)' }}
            >
              <User className="w-4 h-4" style={{ color: 'var(--muted)' }} /> My Profile
            </Link>
            <Link 
              href="/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-colors hover:bg-[var(--bg-alt)]"
              style={{ color: 'var(--text)' }}
            >
              <Settings className="w-4 h-4" style={{ color: 'var(--muted)' }} /> Settings
            </Link>
            <div className="w-full h-px my-1" style={{ background: 'var(--border)' }}></div>
            <button 
              onClick={handleLogout}
              className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
