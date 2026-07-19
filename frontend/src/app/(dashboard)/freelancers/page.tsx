'use client';

import { Users, Search, Filter } from 'lucide-react';
import Link from 'next/link';
import { useFreelancers } from '@/features/matching/hooks/useFreelancers';
import { FreelancerCard } from '@/features/matching/components/FreelancerCard';

export default function FreelancersPage() {
  const { data: freelancers, isLoading } = useFreelancers();

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Find Freelancers</h1>
          <p className="text-slate-500 mt-2 font-medium">Browse our top-tier network of verified professionals.</p>
        </div>
        <Link href="/jobs/new" className="px-5 py-2.5 bg-[#00b259] hover:bg-[#009b4d] text-white font-bold rounded-xl shadow-sm transition-colors inline-block">
          Post a Job Instead
        </Link>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search by skill, name, or role..." 
            className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-[#00b259] focus:ring-1 focus:ring-[#00b259] font-medium text-slate-900 shadow-sm"
          />
        </div>
        <button className="px-6 py-4 bg-white border border-slate-200 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 shadow-sm flex items-center gap-2">
          <Filter className="w-5 h-5" /> Filters
        </button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-80 bg-white rounded-3xl border border-slate-100 shadow-sm animate-pulse"></div>
          ))}
        </div>
      ) : freelancers && freelancers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {freelancers.map((freelancer) => (
            <FreelancerCard 
              key={freelancer.id} 
              freelancer={freelancer} 
              score={Math.random() > 0.5 ? 0.85 + Math.random() * 0.14 : undefined} // Mocking score for demo
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-16 text-center flex flex-col items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mb-6">
            <Users className="w-10 h-10 text-[#00b259]" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">No Talent Found</h3>
          <p className="text-slate-500 max-w-md">
            We couldn't find any freelancers matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
}
