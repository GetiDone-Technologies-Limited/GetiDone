'use client';

import { LoadingSpinner } from '@/shared/components/feedback/LoadingSpinner';

export default function GlobalLoading() {
  return <LoadingSpinner fullScreen label="PREPARING YOUR WORKSPACE" />;
}
