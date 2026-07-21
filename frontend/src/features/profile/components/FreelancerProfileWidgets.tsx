'use client';

import { ShieldCheck, Star, Sparkles, CheckCircle2 } from 'lucide-react';

export function FreelancerProfileWidgets() {
  return (
    <div className="w-full lg:w-[320px] shrink-0 space-y-6">
      
      {/* Professional Summary */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-slate-900">Professional Summary</h2>
          <button className="text-[11px] font-bold text-blue-600 hover:underline">Edit</button>
        </div>
        
        <p className="text-sm text-slate-600 mb-4 leading-relaxed font-medium">
          I help businesses turn ideas into robust digital products with clean code and exceptional user experience.
        </p>
        
        <ul className="space-y-2">
          <li className="flex items-center gap-2 text-sm text-slate-700">
            <div className="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center"><CheckCircle2 className="w-3 h-3 text-slate-400" /></div> Web Development
          </li>
          <li className="flex items-center gap-2 text-sm text-slate-700">
            <div className="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center"><CheckCircle2 className="w-3 h-3 text-slate-400" /></div> API Development
          </li>
          <li className="flex items-center gap-2 text-sm text-slate-700">
            <div className="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center"><CheckCircle2 className="w-3 h-3 text-slate-400" /></div> Database Design
          </li>
          <li className="flex items-center gap-2 text-sm text-slate-700">
            <div className="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center"><CheckCircle2 className="w-3 h-3 text-slate-400" /></div> Performance Optimization
          </li>
          <li className="flex items-center gap-2 text-sm text-slate-700">
            <div className="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center"><CheckCircle2 className="w-3 h-3 text-slate-400" /></div> Problem Solving
          </li>
        </ul>
      </div>

      {/* Verified & Badges */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-slate-900">Verified & Badges</h2>
          <button className="text-[11px] font-bold text-blue-600 hover:underline">See All</button>
        </div>
        <div className="grid grid-cols-4 gap-2">
          <div className="flex flex-col items-center justify-center text-center">
             <div className="w-10 h-10 rounded-full bg-[#00b259]/10 text-[#00b259] flex items-center justify-center mb-1">
               <ShieldCheck className="w-5 h-5" />
             </div>
             <span className="text-[10px] font-bold text-slate-600 leading-tight">Identity<br/>Verified</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center">
             <div className="w-10 h-10 rounded-full bg-[#00b259]/10 text-[#00b259] flex items-center justify-center mb-1">
               <ShieldCheck className="w-5 h-5" />
             </div>
             <span className="text-[10px] font-bold text-slate-600 leading-tight">Payment<br/>Verified</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center">
             <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-500 flex items-center justify-center mb-1">
               <Star className="w-5 h-5 fill-amber-500" />
             </div>
             <span className="text-[10px] font-bold text-slate-600 leading-tight">Top Rated</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center">
             <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-1">
               <Sparkles className="w-5 h-5" />
             </div>
             <span className="text-[10px] font-bold text-slate-600 leading-tight">Rising<br/>Talent</span>
          </div>
        </div>
      </div>

      {/* My Services */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-slate-900">My Services</h2>
          <button className="text-[11px] font-bold text-blue-600 hover:underline">Edit</button>
        </div>
        <div className="space-y-4">
           <div className="flex justify-between items-center pb-3 border-b border-slate-100">
             <span className="text-xs font-semibold text-slate-700">Full Stack Web Development</span>
             <span className="text-sm font-bold text-slate-900">$45 / hr</span>
           </div>
           <div className="flex justify-between items-center pb-3 border-b border-slate-100">
             <span className="text-xs font-semibold text-slate-700">API Integration & Development</span>
             <span className="text-sm font-bold text-slate-900">$40 / hr</span>
           </div>
           <div className="flex justify-between items-center pb-3 border-b border-slate-100">
             <span className="text-xs font-semibold text-slate-700">Database Design & Optimization</span>
             <span className="text-sm font-bold text-slate-900">$35 / hr</span>
           </div>
        </div>
        <button className="w-full mt-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors">
          See All Services
        </button>
      </div>

      {/* Languages */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-slate-900">Languages</h2>
          <button className="text-[11px] font-bold text-blue-600 hover:underline">Edit</button>
        </div>
        <div className="space-y-4">
           <div className="flex justify-between items-center">
             <span className="text-xs font-semibold text-slate-700">English <span className="text-slate-400 font-medium">(Fluent)</span></span>
             <div className="flex gap-1">
               <div className="w-2 h-2 rounded-full bg-[#00b259]"></div>
               <div className="w-2 h-2 rounded-full bg-[#00b259]"></div>
               <div className="w-2 h-2 rounded-full bg-[#00b259]"></div>
               <div className="w-2 h-2 rounded-full bg-[#00b259]"></div>
               <div className="w-2 h-2 rounded-full bg-[#00b259]"></div>
             </div>
           </div>
           <div className="flex justify-between items-center">
             <span className="text-xs font-semibold text-slate-700">Yoruba <span className="text-slate-400 font-medium">(Native)</span></span>
             <div className="flex gap-1">
               <div className="w-2 h-2 rounded-full bg-[#00b259]"></div>
               <div className="w-2 h-2 rounded-full bg-[#00b259]"></div>
               <div className="w-2 h-2 rounded-full bg-[#00b259]"></div>
               <div className="w-2 h-2 rounded-full bg-[#00b259]"></div>
               <div className="w-2 h-2 rounded-full bg-[#00b259]"></div>
             </div>
           </div>
        </div>
      </div>
      
    </div>
  );
}
