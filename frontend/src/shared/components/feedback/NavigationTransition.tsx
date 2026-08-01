'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

export function NavigationTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isNavigating, setIsNavigating] = useState(false);
  const prevPathRef = useRef(pathname + searchParams.toString());

  useEffect(() => {
    const currentPath = pathname + searchParams.toString();
    if (prevPathRef.current !== currentPath) {
      prevPathRef.current = currentPath;
      setIsNavigating(true);
      const timer = setTimeout(() => {
        setIsNavigating(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [pathname, searchParams]);

  return (
    <>
      {isNavigating && <LoadingSpinner fullScreen label="PREPARING YOUR WORKSPACE" />}
      {children}
    </>
  );
}
