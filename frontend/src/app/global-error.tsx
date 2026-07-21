'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global Error Boundary caught:', error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-slate-50">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 max-w-md text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Something went wrong!</h2>
            <p className="text-slate-500 mb-6 text-sm">
              An unexpected error occurred. We have been notified and are looking into it.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => reset()}
                className="px-4 py-2 bg-[#00b259] text-white rounded-lg font-bold hover:bg-[#009f4f] transition-colors"
              >
                Try again
              </button>
              <Link href="/" className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg font-bold hover:bg-slate-50 transition-colors">
                Go Home
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
