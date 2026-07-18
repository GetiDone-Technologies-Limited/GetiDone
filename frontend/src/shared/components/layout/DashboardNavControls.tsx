'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export function DashboardNavControls() {
  const router = useRouter();

  return (
    <div className="flex items-center gap-1 mr-4 hidden sm:flex">
      <button 
        onClick={() => router.back()}
        className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
        title="Go back"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>
      <button 
        onClick={() => router.forward()}
        className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
        title="Go forward"
      >
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}
