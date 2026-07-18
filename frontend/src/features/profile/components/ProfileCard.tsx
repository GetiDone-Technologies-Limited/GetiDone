'use client';

import { useProfile } from '../hooks/useProfile';
import { Avatar } from '@/shared/components/ui/Avatar';
import { Badge, statusToBadgeVariant } from '@/shared/components/ui/Badge';
import { LoadingSpinner } from '@/shared/components/feedback/LoadingSpinner';
import { MapPin, ShieldCheck, Mail, Link as LinkIcon, DollarSign } from 'lucide-react';

interface ProfileCardProps {
  userId?: string;
}

export function ProfileCard({ userId }: ProfileCardProps) {
  const { data: profile, isLoading } = useProfile(userId);

  if (isLoading) return <LoadingSpinner size="md" />;
  if (!profile) return null;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm relative pt-16">
      <div className="absolute -top-16 left-8">
        <div className="rounded-full p-1.5 bg-white shadow-sm border border-slate-100">
          <Avatar src={profile.avatarUrl} name={profile.name} size="xl" className="w-28 h-28 border-2 border-white" />
          <div className="absolute bottom-2 right-2 w-5 h-5 bg-[#00b259] border-4 border-white rounded-full"></div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-2xl font-black text-slate-900">{profile.name}</h2>
            {profile.kycStatus === 'VERIFIED' && (
              <ShieldCheck className="w-5 h-5 text-[#00b259]" />
            )}
          </div>
          <p className="text-[16px] font-bold text-slate-600">{profile.role === 'FREELANCER' ? 'Senior UI/UX Designer & Frontend Developer' : 'Client'}</p>
          
          <div className="flex flex-col gap-2 mt-4 text-sm font-semibold text-slate-500">
            {profile.location && <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-slate-400" /> {profile.location}</p>}
            <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-slate-400" /> {profile.email}</p>
            <p className="flex items-center gap-2"><LinkIcon className="w-4 h-4 text-slate-400" /> https://{profile.name.toLowerCase().replace(' ', '')}.getidone.com</p>
          </div>
        </div>

        <div className="w-full h-px bg-slate-100"></div>

        {profile.bio && (
          <div>
             <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">About Me</h3>
             <p className="text-[14px] text-slate-600 leading-relaxed font-medium">
                {profile.bio}
             </p>
          </div>
        )}

        <div className="w-full h-px bg-slate-100"></div>

        <div className="flex flex-col gap-4">
           {profile.hourlyRate && (
             <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-sm font-bold text-slate-600">Hourly Rate</span>
                <span className="text-xl font-black text-slate-900 flex items-center"><DollarSign className="w-5 h-5 text-[#00b259]" />{profile.hourlyRate}<span className="text-sm font-bold text-slate-500 ml-1">/hr</span></span>
             </div>
           )}

           <div className="flex items-center justify-between p-4 rounded-2xl bg-[#00b259]/5 border border-[#00b259]/20">
              <span className="text-sm font-bold text-[#00b259]">DoneScore™</span>
              <span className="text-xl font-black text-[#00b259]">{profile.doneScore}</span>
           </div>
        </div>

        {profile.skills && profile.skills.length > 0 && (
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 mt-2">Top Skills</h3>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((s) => (
                <span key={s} className="bg-slate-100 text-slate-600 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200">
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-4 flex gap-3">
          <button className="flex-1 bg-[#00b259] hover:bg-[#009b4d] text-white py-3.5 rounded-xl text-sm font-bold shadow-sm transition-colors">
            Hire Me
          </button>
          <button className="flex-1 bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 py-3.5 rounded-xl text-sm font-bold shadow-sm transition-colors">
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
}
