'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/store/auth.store';
import { Avatar } from '@/shared/components/ui/Avatar';

export function LandingAuthButtons() {
  const { isAuthenticated, user } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-[150px] h-10"></div>; // Placeholder to prevent layout shift
  }

  if (isAuthenticated && user) {
    return (
      <div className="flex items-center gap-4">
        <Link href={user.role === 'CLIENT' ? '/client' : '/freelancer'} className="text-sm font-semibold text-white hover:text-[#00b259] transition-colors">
          Dashboard
        </Link>
        <Link href="/profile">
           <Avatar src={user.avatarUrl} name={user.name} size="sm" className="w-10 h-10 border-2 border-[#00b259]" />
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-6">
      <Link href="/login" className="text-sm font-semibold text-white hover:text-[#00b259] transition-colors">
        Log in
      </Link>
      <Link href="/register" className="inline-flex items-center rounded-lg bg-[#00b259] px-5 py-2.5 text-sm font-semibold text-white hover:brightness-110 transition-all shadow-[0_0_15px_rgba(0,178,89,0.3)]">
        Sign Up
      </Link>
    </div>
  );
}
