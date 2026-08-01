'use client';

import type { FreelancerProfile } from '../types/matching.types';
import { Avatar } from '@/shared/components/ui/Avatar';
import { ShieldCheck, MapPin, Briefcase, Star, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { PublicProfileModal } from '@/features/profile/components/PublicProfileModal';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/shared/components/ui/Tabs';

interface FreelancerCardProps {
  freelancer: FreelancerProfile;
  score?: number;
  onHire?: (id: string) => void;
  reasoning?: string;
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <Star className={`w-3.5 h-3.5 ${filled ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200'}`} />
  );
}

export function FreelancerCard({ freelancer, score, onHire, reasoning }: FreelancerCardProps) {
  const { user } = freelancer;
  const stars = Array.from({ length: 5 }, (_, i) => i < Math.round(freelancer.avgRating));
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <>
      <div className="group bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#00b259]/30 transition-all duration-300 relative overflow-hidden flex flex-col h-[400px]">
        {score !== undefined && (
          <div className="absolute top-0 right-0 bg-gradient-to-bl from-[#00b259]/10 to-transparent p-4 rounded-bl-3xl border-l border-b border-[#00b259]/10 z-10">
            <div className="flex flex-col items-center">
              <span className="text-xl font-black text-[#00b259]">{Math.round(score * 100)}%</span>
              <span className="text-[10px] font-bold text-[#00b259] uppercase tracking-wider">Match</span>
            </div>
          </div>
        )}

        {/* Header Section */}
        <div className="shrink-0 flex flex-col items-center text-center mb-4 relative z-10 cursor-pointer" onClick={() => setIsProfileOpen(true)}>
           <Avatar src={user.avatarUrl} name={user.name} size="xl" className="w-16 h-16 shadow-sm border border-slate-100 mb-2" />
           <h3 className="text-base sm:text-lg font-black text-slate-900 hover:text-[#00b259] transition-colors truncate w-full">
              {user.name}
           </h3>
           <div className="flex items-center gap-1.5 mt-0.5 text-xs font-semibold text-slate-500">
             {freelancer.availability ? (
               <span className="flex items-center gap-1.5 text-[#00b259]"><span className="w-1.5 h-1.5 rounded-full bg-[#00b259]"></span> Available now</span>
             ) : (
               <span className="flex items-center gap-1.5 text-slate-400"><span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span> Unavailable</span>
             )}
           </div>
        </div>

        <div className="shrink-0 flex items-center justify-center gap-4 sm:gap-6 mb-4 pb-4 border-b border-slate-100 relative z-10">
           <div className="flex flex-col items-center">
             <span className="text-sm font-bold text-slate-900 flex items-center gap-0.5">
               {stars.map((filled, i) => <StarIcon key={i} filled={filled} />)}
             </span>
             <span className="text-[10px] font-bold text-slate-500 mt-1 uppercase tracking-wider">{freelancer.reviewCount} Reviews</span>
           </div>
           <div className="w-px h-6 bg-slate-200"></div>
           <div className="flex flex-col items-center">
             <span className="text-sm font-bold text-slate-900">${freelancer.hourlyRate}/hr</span>
             <span className="text-[10px] font-bold text-slate-500 mt-1 uppercase tracking-wider">Rate</span>
           </div>
           <div className="w-px h-6 bg-slate-200"></div>
           <div className="flex flex-col items-center">
             <span className="text-sm font-bold text-[#00b259]">{user.doneScore}</span>
             <span className="text-[10px] font-bold text-[#00b259] mt-1 uppercase tracking-wider">DoneScore™</span>
           </div>
        </div>

        {/* Tabs Area */}
        <Tabs defaultValue="bio" className="flex-1 min-h-0 flex flex-col relative z-10">
          <TabsList className="mb-2 shrink-0 border-slate-100">
            <TabsTrigger value="bio">Bio</TabsTrigger>
            <TabsTrigger value="expertise">Expertise</TabsTrigger>
            {reasoning && <TabsTrigger value="match">Match</TabsTrigger>}
          </TabsList>
          
          <TabsContent value="bio" className="pr-2 text-[13px] text-slate-600 font-medium leading-relaxed">
            {freelancer.bio}
          </TabsContent>

          <TabsContent value="expertise" className="pr-2">
            <div className="flex flex-wrap gap-1.5">
              {freelancer.skills.map((s) => (
                <span key={s} className="bg-slate-50 text-slate-700 text-[11px] font-bold px-2.5 py-1.5 rounded-lg border border-slate-200">
                  {s}
                </span>
              ))}
              {(!freelancer.skills || freelancer.skills.length === 0) && (
                <p className="text-xs font-semibold text-slate-400 italic">No skills listed.</p>
              )}
            </div>
          </TabsContent>

          {reasoning && (
            <TabsContent value="match" className="pr-2">
              <div className="bg-[#00b259]/5 border border-[#00b259]/20 rounded-xl p-3 flex items-start gap-2 h-full">
                <Sparkles className="w-4 h-4 text-[#00b259] shrink-0 mt-0.5" />
                <p className="text-[13px] text-[#00b259] font-semibold leading-relaxed italic">{reasoning}</p>
              </div>
            </TabsContent>
          )}
        </Tabs>

        {/* Footer Area */}
        <div className="mt-4 pt-4 border-t border-slate-100 relative z-10 shrink-0">
          <button 
            onClick={() => onHire && onHire(freelancer.userId)}
            className="w-full bg-slate-900 hover:bg-[#00b259] text-white py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors group-hover:bg-[#00b259]"
          >
            Invite to Job
          </button>
        </div>
      </div>

      <PublicProfileModal 
        userId={freelancer.userId}
        open={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />
    </>
  );
}
