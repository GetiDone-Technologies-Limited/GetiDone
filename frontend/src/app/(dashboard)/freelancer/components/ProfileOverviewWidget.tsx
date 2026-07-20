import Link from 'next/link';
import { ArrowRight, Star, ShieldCheck, Sparkles } from 'lucide-react';

export function ProfileOverviewWidget() {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-slate-900">Profile Overview</h2>
        <Link href="/profile" className="text-sm font-bold text-[#00b259] hover:underline flex items-center gap-1">
          View Profile <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-100">
        <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
           <div className="flex items-center gap-2 mb-1">
             <h3 className="text-sm font-bold text-slate-900">Top Rated</h3>
           </div>
           <div className="flex items-center gap-2">
             <span className="flex items-center gap-1 text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100">
               <ShieldCheck className="w-3 h-3" /> Badge
             </span>
             <span className="flex items-center gap-1 text-[10px] font-bold text-[#00b259] bg-[#00b259]/10 px-2 py-0.5 rounded-full border border-[#00b259]/20">
               <Sparkles className="w-3 h-3" /> Rising Talent
             </span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-slate-100 text-center">
        <div>
          <p className="text-xl font-black text-slate-900">97%</p>
          <p className="text-[10px] font-semibold text-slate-500 uppercase mt-1">Job Success</p>
        </div>
        <div>
          <p className="text-xl font-black text-slate-900 flex items-center justify-center gap-1">4.9 <Star className="w-4 h-4 text-amber-400 fill-amber-400" /></p>
          <p className="text-[10px] font-semibold text-slate-500 uppercase mt-1">Average Rating</p>
        </div>
        <div>
          <p className="text-xl font-black text-slate-900">23</p>
          <p className="text-[10px] font-semibold text-slate-500 uppercase mt-1">Total Reviews</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6 pb-6 border-b border-slate-100">
        <span className="text-sm font-bold text-slate-900">Availability</span>
        <div className="flex items-center gap-2">
           <span className="text-xs font-bold text-[#00b259]">Available</span>
           <div className="w-10 h-6 bg-[#00b259] rounded-full relative cursor-pointer">
             <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
           </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-bold text-slate-900">Profile Strength</span>
          <span className="text-sm font-bold text-[#00b259]">85%</span>
        </div>
        <div className="w-full bg-slate-100 h-2 rounded-full mb-3 overflow-hidden">
          <div className="bg-[#00b259] h-full rounded-full w-[85%]"></div>
        </div>
        <Link href="/profile" className="text-xs font-bold text-[#00b259] hover:underline flex items-center gap-1">
          Improve Profile <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
