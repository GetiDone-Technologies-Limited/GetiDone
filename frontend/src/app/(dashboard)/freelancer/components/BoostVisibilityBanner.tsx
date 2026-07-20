import { Star, CheckCircle2, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export function BoostVisibilityBanner() {
  return (
    <div className="bg-gradient-to-r from-[#00b259]/10 to-[#00b259]/5 border border-[#00b259]/20 rounded-3xl p-6 mt-8 flex flex-col md:flex-row items-center gap-8">
      
      <div className="flex items-start gap-4 flex-1">
        <div className="w-12 h-12 rounded-2xl bg-[#00b259] flex items-center justify-center shrink-0 shadow-md shadow-[#00b259]/20">
          <Star className="w-6 h-6 text-white fill-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">Boost your visibility and win more jobs!</h3>
          <p className="text-sm text-slate-600">Complete a few steps to increase your chances of getting hired.</p>
        </div>
      </div>

      <div className="flex items-center gap-8 md:border-l border-[#00b259]/20 md:pl-8">
        {/* Circular Progress */}
        <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-white/50"
              strokeWidth="3"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-[#00b259]"
              strokeWidth="3"
              strokeDasharray="60, 100"
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-sm font-black text-slate-900 leading-none">3/5</span>
            <span className="text-[9px] font-bold text-slate-500 uppercase">Done</span>
          </div>
        </div>

        {/* Checklist */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm font-medium">
           <Link href="/profile" className="flex items-center justify-between gap-4 group">
             <div className="flex items-center gap-2 text-slate-700 group-hover:text-slate-900 transition-colors">
               <CheckCircle2 className="w-4 h-4 text-[#00b259]" /> Complete your profile
             </div>
             <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-colors" />
           </Link>
           <Link href="/profile" className="flex items-center justify-between gap-4 group">
             <div className="flex items-center gap-2 text-slate-700 group-hover:text-slate-900 transition-colors">
               <div className="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center text-[8px] font-bold text-slate-400 group-hover:border-slate-400"></div> 
               Add skills (8/10)
             </div>
             <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-colors" />
           </Link>
           <Link href="/portfolio" className="flex items-center justify-between gap-4 group">
             <div className="flex items-center gap-2 text-slate-700 group-hover:text-slate-900 transition-colors">
               <CheckCircle2 className="w-4 h-4 text-[#00b259]" /> Add portfolio projects (2/3)
             </div>
             <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-colors" />
           </Link>
           <Link href="/profile" className="flex items-center justify-between gap-4 group">
             <div className="flex items-center gap-2 text-slate-700 group-hover:text-slate-900 transition-colors">
               <div className="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center text-[8px] font-bold text-slate-400 group-hover:border-slate-400"></div> 
               Upload profile video
             </div>
             <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-colors" />
           </Link>
           <Link href="/settings" className="flex items-center justify-between gap-4 group">
             <div className="flex items-center gap-2 text-slate-700 group-hover:text-slate-900 transition-colors">
               <CheckCircle2 className="w-4 h-4 text-[#00b259]" /> Get verified
             </div>
             <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-colors" />
           </Link>
        </div>
      </div>

    </div>
  );
}
