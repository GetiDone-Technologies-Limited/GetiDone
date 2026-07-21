'use client';

import { Briefcase, CalendarDays, Globe, MapPin, DollarSign, CheckCircle2 } from 'lucide-react';

export function FreelancerProfileSidebar() {
  return (
    <div className="w-full lg:w-[320px] shrink-0 space-y-6">
      
      {/* Intro Section */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-bold text-slate-900">Intro</h2>
          <button className="text-[11px] font-bold text-blue-600 hover:underline">Edit</button>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-sm">
            <Briefcase className="w-4 h-4 text-slate-400" />
            <span className="font-semibold text-slate-700">Senior Full Stack Developer</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <CalendarDays className="w-4 h-4 text-slate-400" />
            <span className="font-semibold text-slate-700">7+ Years Experience</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Globe className="w-4 h-4 text-slate-400" />
            <span className="font-semibold text-slate-700">Fluent in English, Yoruba</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <MapPin className="w-4 h-4 text-slate-400" />
            <span className="font-semibold text-slate-700">From Lagos, Nigeria</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <DollarSign className="w-4 h-4 text-slate-400" />
            <span className="font-semibold text-slate-700">$45.00 / hr</span>
          </div>
          
          <div className="pt-2">
            <div className="flex items-center gap-2 bg-[#00b259]/10 text-[#00b259] px-3 py-2 rounded-xl border border-[#00b259]/20 font-bold text-xs">
              <CheckCircle2 className="w-4 h-4" /> Available for new projects
            </div>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-bold text-slate-900">Skills</h2>
          <button className="text-[11px] font-bold text-blue-600 hover:underline">Edit</button>
        </div>
        
        <div className="space-y-5">
           <div>
             <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1.5">
               <span>React</span>
               <span>95%</span>
             </div>
             <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
               <div className="bg-blue-600 h-full rounded-full" style={{ width: '95%' }}></div>
             </div>
           </div>
           <div>
             <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1.5">
               <span>Node.js</span>
               <span>90%</span>
             </div>
             <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
               <div className="bg-blue-600 h-full rounded-full" style={{ width: '90%' }}></div>
             </div>
           </div>
           <div>
             <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1.5">
               <span>JavaScript</span>
               <span>95%</span>
             </div>
             <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
               <div className="bg-blue-600 h-full rounded-full" style={{ width: '95%' }}></div>
             </div>
           </div>
           <div>
             <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1.5">
               <span>TypeScript</span>
               <span>85%</span>
             </div>
             <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
               <div className="bg-blue-600 h-full rounded-full" style={{ width: '85%' }}></div>
             </div>
           </div>
           <div>
             <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1.5">
               <span>Next.js</span>
               <span>90%</span>
             </div>
             <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
               <div className="bg-blue-600 h-full rounded-full" style={{ width: '90%' }}></div>
             </div>
           </div>
        </div>

        <button className="w-full mt-6 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors">
          See All Skills
        </button>
      </div>
      
    </div>
  );
}
