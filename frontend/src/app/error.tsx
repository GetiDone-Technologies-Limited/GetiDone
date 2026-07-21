'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Route Error Boundary caught:', error);
  }, [error]);

  return (
    <div className="flex h-[50vh] w-full flex-col items-center justify-center gap-4">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 max-w-sm text-center">
        <h2 className="text-xl font-bold text-slate-900 mb-2">Something went wrong</h2>
        <p className="text-slate-500 mb-6 text-sm">
          A part of this page failed to load.
        </p>
        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-[#00b259] text-white rounded-lg font-bold hover:bg-[#009f4f] transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
