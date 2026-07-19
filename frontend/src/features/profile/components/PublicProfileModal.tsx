'use client';

import * as React from 'react';
import { Modal } from '@/shared/components/ui/Modal';
import { useProfile } from '../hooks/useProfile';
import { ProfileCard } from './ProfileCard';
import { ReviewList } from '@/features/reviews/components/ReviewList';
import { LoadingSpinner } from '@/shared/components/feedback/LoadingSpinner';

interface PublicProfileModalProps {
  userId: string;
  open: boolean;
  onClose: () => void;
}

export function PublicProfileModal({ userId, open, onClose }: PublicProfileModalProps) {
  const { data: profile, isLoading } = useProfile(userId);

  if (!open) return null;

  return (
    <Modal open={open} onClose={onClose} title={profile?.name ? `${profile.name}'s Profile` : 'Loading Profile...'} size="xl">
      {isLoading || !profile ? (
        <div className="h-64 flex items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
      ) : (
        <div className="flex flex-col pb-8 bg-slate-50 -mx-6 sm:-mx-8">
          {/* Banner */}
          <div 
            className="h-48 w-full relative bg-slate-800"
            style={profile.bannerUrl ? { backgroundImage: `url(${profile.bannerUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
          >
            {!profile.bannerUrl && (
              <>
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-[#00b259]/20 mix-blend-multiply" />
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
              </>
            )}
          </div>

          <div className="px-6 sm:px-8 -mt-16 relative z-10 max-h-[60vh] overflow-y-auto custom-scrollbar">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left Column: Core Identity */}
              <div className="w-full lg:w-[350px] shrink-0">
                 <ProfileCard userId={userId} />
              </div>

              {/* Right Column: Portfolio & Reviews */}
              <div className="flex-1 min-w-0 space-y-6 pt-16 lg:pt-0">
                 {/* Stats Overview */}
                 <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
                      <span className="text-2xl font-black text-[#00b259]">100%</span>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1">Job Success</span>
                    </div>
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
                      <span className="text-2xl font-black text-slate-900">42</span>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1">Total Jobs</span>
                    </div>
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
                      <span className="text-2xl font-black text-slate-900">3,120</span>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1">Hours</span>
                    </div>
                 </div>

                 {/* Portfolio Grid */}
                 <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                   <div className="flex items-center justify-between mb-5">
                      <h2 className="text-lg font-bold text-slate-900">Portfolio</h2>
                      <button className="text-xs font-bold text-[#00b259] hover:underline">View All</button>
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                      {[1, 2].map(i => (
                        <div key={i} className="group relative aspect-video rounded-xl overflow-hidden bg-slate-100 cursor-pointer">
                          <img 
                            src={`https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=500&q=80`} 
                            alt="Portfolio item" 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      ))}
                   </div>
                 </div>

                 {/* Work History & Reviews */}
                 <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                   <h2 className="text-lg font-bold text-slate-900 mb-5">Work History & Reviews</h2>
                   <ReviewList userId={userId} />
                 </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
