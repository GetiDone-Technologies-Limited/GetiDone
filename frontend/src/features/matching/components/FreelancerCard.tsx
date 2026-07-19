import type { FreelancerProfile } from '../types/matching.types';
import { Avatar } from '@/shared/components/ui/Avatar';
import { ShieldCheck, MapPin, Briefcase, Star, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { PublicProfileModal } from '@/features/profile/components/PublicProfileModal';

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
      <div className="group bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#00b259]/30 transition-all duration-300 relative overflow-hidden flex flex-col h-full">
      {score !== undefined && (
        <div className="absolute top-0 right-0 bg-gradient-to-bl from-[#00b259]/10 to-transparent p-4 rounded-bl-3xl border-l border-b border-[#00b259]/10 z-10">
          <div className="flex flex-col items-center">
            <span className="text-xl font-black text-[#00b259]">{Math.round(score * 100)}%</span>
            <span className="text-[10px] font-bold text-[#00b259] uppercase tracking-wider">Match</span>
          </div>
        </div>
      )}

      <div className="flex flex-col items-center text-center mb-5 relative z-10 cursor-pointer" onClick={() => setIsProfileOpen(true)}>
         <Avatar src={user.avatarUrl} name={user.name} gender={user.gender} size="xl" className="w-20 h-20 shadow-sm border border-slate-100 mb-3" />
         <h3 className="text-lg font-black text-slate-900 hover:text-[#00b259] transition-colors">
            {user.name}
         </h3>
         <div className="flex items-center gap-1.5 mt-1 text-sm font-semibold text-slate-500">
           {freelancer.availability ? (
             <span className="flex items-center gap-1.5 text-[#00b259]"><span className="w-1.5 h-1.5 rounded-full bg-[#00b259]"></span> Available now</span>
           ) : (
             <span className="flex items-center gap-1.5 text-slate-400"><span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span> Unavailable</span>
           )}
         </div>
      </div>

      <div className="flex items-center justify-center gap-6 mb-5 pb-5 border-b border-slate-100 relative z-10">
         <div className="flex flex-col items-center">
           <span className="text-sm font-bold text-slate-900 flex items-center gap-1">
             {stars.map((filled, i) => <StarIcon key={i} filled={filled} />)}
           </span>
           <span className="text-[11px] font-semibold text-slate-500 mt-1 uppercase tracking-wider">{freelancer.reviewCount} Reviews</span>
         </div>
         <div className="w-px h-8 bg-slate-200"></div>
         <div className="flex flex-col items-center">
           <span className="text-sm font-bold text-slate-900">${freelancer.hourlyRate}/hr</span>
           <span className="text-[11px] font-semibold text-slate-500 mt-1 uppercase tracking-wider">Rate</span>
         </div>
         <div className="w-px h-8 bg-slate-200"></div>
         <div className="flex flex-col items-center">
           <span className="text-sm font-bold text-[#00b259]">{user.doneScore}</span>
           <span className="text-[11px] font-semibold text-[#00b259] mt-1 uppercase tracking-wider">DoneScore™</span>
         </div>
      </div>

      <div className="flex-1 min-h-0 relative z-10">
        <p className="text-[13px] text-slate-600 font-medium leading-relaxed line-clamp-3 mb-4">
          {freelancer.bio}
        </p>

        {reasoning && (
          <div className="bg-[#00b259]/5 border border-[#00b259]/20 rounded-xl p-3 mb-4 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-[#00b259] shrink-0 mt-0.5" />
            <p className="text-xs text-[#00b259] font-medium italic">{reasoning}</p>
          </div>
        )}

        <div className="flex flex-wrap gap-1.5 mb-2">
          {freelancer.skills.slice(0, 5).map((s) => (
            <span key={s} className="bg-slate-100 text-slate-600 text-[11px] font-bold px-2 py-1 rounded-md border border-slate-200">
              {s}
            </span>
          ))}
          {freelancer.skills.length > 5 && (
            <span className="bg-slate-50 text-slate-400 text-[11px] font-bold px-2 py-1 rounded-md border border-slate-100">
              +{freelancer.skills.length - 5}
            </span>
          )}
        </div>
      </div>

      <div className="mt-5 pt-5 border-t border-slate-100 relative z-10">
        <button 
          onClick={() => onHire && onHire(freelancer.userId)}
          className="w-full bg-slate-900 hover:bg-[#00b259] text-white py-3 rounded-xl text-sm font-bold shadow-sm transition-colors group-hover:bg-[#00b259]"
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
