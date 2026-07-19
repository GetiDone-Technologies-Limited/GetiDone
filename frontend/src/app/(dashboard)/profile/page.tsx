'use client';

import { useState } from 'react';
import { ProfileCard } from '@/features/profile/components/ProfileCard';
import { EditProfileForm } from '@/features/profile/components/EditProfileForm';
import { ReviewList } from '@/features/reviews/components/ReviewList';
import { useAuthStore } from '@/store/auth.store';
import { Button } from '@/shared/components/ui/Button';
import { Settings, Share2 } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useAuthStore();
  const [editing, setEditing] = useState(false);

  if (!user) return null;

  return (
    <div className="pb-10">
      
      {/* Cover Photo */}
      <div className="h-64 w-full bg-slate-800 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-[#00b259]/20 mix-blend-multiply" />
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        
        {/* Profile Actions Over Cover */}
        <div className="absolute top-6 right-6 flex gap-3">
           <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl text-white text-sm font-semibold transition-colors border border-white/10">
             <Share2 className="w-4 h-4" /> Share Profile
           </button>
           <button 
             onClick={() => setEditing(!editing)}
             className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl text-white text-sm font-semibold transition-colors border border-white/10"
           >
             <Settings className="w-4 h-4" /> {editing ? 'Cancel Editing' : 'Edit Profile'}
           </button>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-20 relative z-10 pb-20">
        {editing ? (
          <div className="rounded-3xl bg-white border border-slate-200 p-8 shadow-sm">
            <EditProfileForm />
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column: Core Identity */}
            <div className="w-full lg:w-[380px] shrink-0">
               <ProfileCard />
            </div>

            {/* Right Column: Portfolio & Reviews */}
            <div className="flex-1 min-w-0 space-y-8">
               {/* Stats Overview */}
               <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
                    <span className="text-3xl font-black text-[#00b259]">100%</span>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Job Success</span>
                  </div>
                  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
                    <span className="text-3xl font-black text-slate-900">42</span>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Total Jobs</span>
                  </div>
                  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
                    <span className="text-3xl font-black text-slate-900">3,120</span>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Hours Worked</span>
                  </div>
               </div>

               {/* Portfolio Grid */}
               <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                 <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-slate-900">Portfolio</h2>
                    <button className="text-sm font-bold text-[#00b259] hover:underline">View All</button>
                 </div>
                 <div className="grid grid-cols-2 gap-6">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="group relative aspect-video rounded-2xl overflow-hidden bg-slate-100 cursor-pointer">
                        <img 
                          src={`https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&q=80`} 
                          alt="Portfolio item" 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                          <div>
                            <h4 className="text-white font-bold text-sm">Fintech Dashboard</h4>
                            <p className="text-white/80 text-xs font-medium mt-0.5">UI/UX Design</p>
                          </div>
                        </div>
                      </div>
                    ))}
                 </div>
               </div>

               {/* Work History & Reviews */}
               <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                 <h2 className="text-xl font-bold text-slate-900 mb-6">Work History & Reviews</h2>
                 <ReviewList userId={user.id} />
               </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
