'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { useState, Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { NavigationTransition } from '@/shared/components/feedback/NavigationTransition';
import { LoadingSpinner } from '@/shared/components/feedback/LoadingSpinner';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            retry: 1,
          },
        },
      }),
  );

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<LoadingSpinner fullScreen label="PREPARING YOUR WORKSPACE" />}>
          <NavigationTransition>
            {children}
          </NavigationTransition>
        </Suspense>
        <Toaster position="bottom-right" toastOptions={{ className: 'font-bold text-sm text-slate-800 shadow-lg rounded-2xl border border-slate-100' }} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
