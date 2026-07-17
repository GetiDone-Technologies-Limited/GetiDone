'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardShell } from '@/shared/components/layout/DashboardShell';
import { useAuthStore } from '@/store/auth.store';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Check if already hydrated
    if (useAuthStore.persist.hasHydrated()) {
      setIsHydrated(true);
    } else {
      // Wait for hydration
      const unsub = useAuthStore.persist.onFinishHydration(() => setIsHydrated(true));
      return () => unsub();
    }
  }, []);

  useEffect(() => {
    if (isHydrated && !isAuthenticated) {
      router.replace('/login');
    }
  }, [isHydrated, isAuthenticated, router]);

  if (!isHydrated) return null; // Wait for hydration
  if (!isAuthenticated) return null; // Avoid rendering until redirect happens

  return <DashboardShell>{children}</DashboardShell>;
}

