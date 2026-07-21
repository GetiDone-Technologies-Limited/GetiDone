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
        className="flex items-center gap-2 hover:bg-slate-100 p-1.5 rounded-xl transition-colors"
      >
        <Avatar src={user.avatarUrl} name={user.name} size="sm" />
        <div className="hidden md:flex flex-col items-start mr-1">
          <span className="text-sm font-bold text-slate-900 leading-none">{user.name?.split(' ')[0] || 'User'}</span>
          <span className="text-[10px] font-semibold text-slate-500 capitalize leading-none mt-1">{user.role?.toLowerCase()}</span>
        </div>
        <ChevronDown className="w-4 h-4 text-slate-400 hidden md:block" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 z-50 overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50">
            <p className="text-sm font-bold text-slate-900 truncate">{user.name}</p>
            <p className="text-xs font-semibold text-slate-500 truncate">{user.email}</p>
          </div>
          <div className="p-2 flex flex-col gap-1">
            <Link 
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-[#00b259] transition-colors"
            >
              <User className="w-4 h-4" /> My Profile
            </Link>
            <Link 
              href="/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-[#00b259] transition-colors"
            >
              <Settings className="w-4 h-4" /> Settings
            </Link>
            <div className="w-full h-px bg-slate-100 my-1"></div>
            <button 
              onClick={handleLogout}
              className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
