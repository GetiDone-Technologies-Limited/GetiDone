'use client';

import { useState } from 'react';
import { Navbar } from '@/shared/components/layout/Navbar';
import { JobList } from '@/features/jobs/components/JobList';
import { Input } from '@/shared/components/ui/Input';
import { useDebounce } from '@/shared/hooks/useDebounce';
import Link from 'next/link';
import { Search, SlidersHorizontal, MapPin, Briefcase, DollarSign } from 'lucide-react';

export default function JobsBrowsePage() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 350);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">Find Work</h1>
              <p className="text-[15px] font-medium text-slate-500 mt-1">Discover opportunities that match your expertise.</p>
            </div>
            <Link
              href="/jobs/new"
              className="inline-flex items-center justify-center rounded-xl bg-[#00b259] px-6 py-3 text-[15px] font-bold text-white hover:bg-[#009b4d] transition-colors shadow-sm shrink-0"
            >
              Post a Job
            </Link>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-[320px] shrink-0">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm sticky top-[120px]">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
                <SlidersHorizontal className="w-5 h-5 text-slate-900" />
                <h2 className="text-lg font-bold text-slate-900">Filters</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="text-[13px] font-bold text-slate-900 uppercase tracking-wider mb-3 block">Category</label>
                  <div className="space-y-3">
                    {['Web Development', 'Mobile Apps', 'UI/UX Design', 'Smart Contracts'].map(cat => (
                      <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" className="w-5 h-5 rounded-md border-slate-300 text-[#00b259] focus:ring-[#00b259] transition-colors" />
                        <span className="text-[15px] font-medium text-slate-600 group-hover:text-slate-900 transition-colors">{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[13px] font-bold text-slate-900 uppercase tracking-wider mb-3 block">Project Type</label>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" className="w-5 h-5 rounded-md border-slate-300 text-[#00b259] focus:ring-[#00b259] transition-colors" />
                      <span className="text-[15px] font-medium text-slate-600 group-hover:text-slate-900 transition-colors">Fixed Price</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" className="w-5 h-5 rounded-md border-slate-300 text-[#00b259] focus:ring-[#00b259] transition-colors" />
                      <span className="text-[15px] font-medium text-slate-600 group-hover:text-slate-900 transition-colors">Hourly Rate</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="text-[13px] font-bold text-slate-900 uppercase tracking-wider mb-3 block">Experience Level</label>
                  <div className="space-y-3">
                    {['Entry Level', 'Intermediate', 'Expert'].map(level => (
                      <label key={level} className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" className="w-5 h-5 rounded-md border-slate-300 text-[#00b259] focus:ring-[#00b259] transition-colors" />
                        <span className="text-[15px] font-medium text-slate-600 group-hover:text-slate-900 transition-colors">{level}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div className="relative mb-8">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-slate-400" />
              </div>
              <input
                id="jobs-search"
                type="text"
                placeholder="Search jobs by title, skill, or keyword..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-4 text-[15px] font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#00b259] focus:ring-2 focus:ring-[#00b259]/20 transition-all shadow-sm"
              />
            </div>

            <div className="flex items-center justify-between mb-6">
               <h3 className="text-lg font-bold text-slate-900">Latest Jobs</h3>
               <span className="text-[14px] font-semibold text-slate-500">Showing 24 results</span>
            </div>

            <JobList filters={{ search: debouncedSearch || undefined }} />
          </div>

        </div>
      </main>
    </div>
  );
}
