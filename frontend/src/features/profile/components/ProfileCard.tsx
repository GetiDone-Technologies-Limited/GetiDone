'use client';

import { useProfile } from '../hooks/useProfile';
import { Avatar } from '@/shared/components/ui/Avatar';
import { ShieldCheck, MapPin, Mail, Link as LinkIcon, DollarSign } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/shared/components/ui/Tabs';
import { LoadingSpinner } from '@/shared/components/feedback/LoadingSpinner';

interface ProfileCardProps {
  userId?: string;
}

export function ProfileCard({ userId }: ProfileCardProps) {
  const { data: profile, isLoading } = useProfile(userId);

  if (isLoading) return <LoadingSpinner size="md" />;
  if (!profile) return null;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm relative pt-12 flex flex-col h-[520px]">
      {/* Absolute Avatar Header */}
      <div className="absolute -top-12 left-6 z-20">
        <div className="rounded-full p-1 bg-white shadow-sm border border-slate-100">
          <Avatar src={profile.avatarUrl} name={profile.name} size="xl" className="w-20 h-20 sm:w-24 sm:h-24 border-2 border-white" />
          <div className="absolute bottom-1 right-1 w-4 h-4 bg-[#00b259] border-2 border-white rounded-full"></div>
        </div>
      </div>

      {/* Header Info */}
      <div className="flex flex-col gap-1 shrink-0 mb-4 z-10 relative mt-2">
        <div className="flex items-center gap-2">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 truncate">{profile.name}</h2>
          {profile.kycStatus === 'VERIFIED' && (
            <ShieldCheck className="w-5 h-5 text-[#00b259] shrink-0" />
          )}
        </div>
        <p className="text-sm font-bold text-slate-600 truncate">{profile.role === 'FREELANCER' ? 'Senior UI/UX Designer & Frontend Developer' : 'Client'}</p>
        
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs font-semibold text-slate-500">
          {profile.location && <p className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-slate-400" /> {profile.location}</p>}
          <p className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-slate-400" /> {profile.email}</p>
        </div>
      </div>

      {/* Tabs Area */}
      <Tabs defaultValue="about" className="flex-1 min-h-0 flex flex-col relative z-10">
        <TabsList className="mb-2 shrink-0 border-slate-100">
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="stats">Stats</TabsTrigger>
        </TabsList>

        <TabsContent value="about" className="pr-2">
          {profile.bio ? (
             <p className="text-[13px] text-slate-600 leading-relaxed font-medium">
                {profile.bio}
             </p>
          ) : (
             <p className="text-xs font-semibold text-slate-400 italic">No bio provided.</p>
          )}
        </TabsContent>

        <TabsContent value="skills" className="pr-2">
          <div className="flex flex-wrap gap-2">
            {profile.skills?.map((s: { id: string; name: string }) => (
              <span key={s.id} className="bg-slate-50 text-slate-700 text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-200">
                {s.name}
              </span>
            ))}
            {(!profile.skills || profile.skills.length === 0) && (
              <p className="text-xs font-semibold text-slate-400 italic">No skills listed.</p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="stats" className="pr-2 space-y-3">
           {profile.hourlyRate && (
             <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-sm font-bold text-slate-600">Hourly Rate</span>
                <span className="text-lg font-black text-slate-900 flex items-center"><DollarSign className="w-4 h-4 text-[#00b259]" />{profile.hourlyRate}<span className="text-xs font-bold text-slate-500 ml-1">/hr</span></span>
             </div>
           )}
           <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#00b259]/5 border border-[#00b259]/20">
              <span className="text-sm font-bold text-[#00b259]">DoneScore™</span>
              <span className="text-lg font-black text-[#00b259]">{profile.doneScore}</span>
           </div>
           <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-sm font-bold text-slate-600">Profile URL</span>
              <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5"><LinkIcon className="w-3 h-3 text-slate-400" /> {profile.name.toLowerCase().replace(' ', '')}.getidone.com</span>
           </div>
        </TabsContent>
      </Tabs>

      {/* Footer Actions */}
      <div className="pt-4 mt-auto border-t border-slate-100 flex gap-3 relative z-10 shrink-0">
        <button className="flex-1 bg-[#00b259] hover:bg-[#009b4d] text-white py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors">
          Hire Me
        </button>
        <button className="flex-1 bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors">
          Message
        </button>
      </div>
    </div>
  );
}
