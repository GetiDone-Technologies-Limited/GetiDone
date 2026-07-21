'use client';

import { useState } from 'react';
import { MapPin, ShieldCheck, Clock, MoreHorizontal, Eye, Star, Sparkles, Briefcase, FileText, CheckCircle2 } from 'lucide-react';
import { useAuthStore } from '@/store/auth.store';
import { useProfile } from '../hooks/useProfile';
import { FreelancerProfileSidebar } from './FreelancerProfileSidebar';
import { ProfileFeed } from './ProfileFeed';
import { FreelancerProfileWidgets } from './FreelancerProfileWidgets';
import { ReviewList } from '@/features/reviews/components/ReviewList';
import { LoadingSpinner } from '@/shared/components/feedback/LoadingSpinner';
import { EditProfileForm } from './EditProfileForm';
import { Modal } from '@/shared/components/ui/Modal';

const tabs = [
  { id: 'posts', label: 'Posts' },
  { id: 'about', label: 'About' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'services', label: 'Services' },
];

export function SharedProfileView({ userId }: { userId: string }) {
  const { user: currentUser } = useAuthStore();
  const { data: profile, isLoading } = useProfile(userId);
  const [activeTab, setActiveTab] = useState('posts');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  if (isLoading || !profile) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const isOwnProfile = currentUser?.id === userId;

  return (
    <div className="pb-10 w-full">
      {/* Cover Photo */}
      <div 
        className="h-64 w-full relative bg-slate-900 rounded-b-[40px] overflow-hidden"
        style={{ backgroundImage: `url('${profile.bannerUrl || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1600&q=80'}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
      </div>

      <div className="mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10 w-full max-w-7xl">
        
        {/* Profile Header Block */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-8">
           <div className="flex flex-col md:flex-row gap-6 sm:gap-8 items-start">
             
             {/* Avatar */}
             <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-slate-900 flex items-center justify-center border-4 border-white shadow-md shrink-0 -mt-20 overflow-hidden relative group">
                <img src={profile.avatarUrl || 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=300&q=80'} alt={profile.name} className="w-full h-full object-cover" />
                <div className="absolute bottom-3 right-3 w-6 h-6 bg-[#00b259] border-4 border-white rounded-full"></div>
             </div>

             {/* Info */}
             <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 truncate">{profile.name}</h1>
                  {profile.kycStatus === 'APPROVED' && <ShieldCheck className="w-6 h-6 text-[#00b259] shrink-0" />}
                </div>
                
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <p className="text-sm font-bold text-slate-700">
                    {profile.title || 'Freelancer'}
                  </p>
                  {profile.doneScore > 80 && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">
                      <Star className="w-3 h-3 fill-amber-500" /> Top Rated
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500 mb-6">
                  {profile.location && (
                    <>
                      <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {profile.location}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                    </>
                  )}
                  {profile.hourlyRate && (
                    <>
                      <span className="flex items-center gap-1.5 font-bold text-slate-700">${profile.hourlyRate}/hr</span>
                      <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                    </>
                  )}
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Active recently</span>
                </div>
                
                <p className="text-sm font-medium text-slate-600 mb-6 max-w-2xl leading-relaxed line-clamp-2">
                  {profile.bio || 'No bio provided yet.'}
                </p>
             </div>

             {/* Actions */}
             <div className="flex items-center gap-3 w-full md:w-auto">
                {isOwnProfile ? (
                  <>
                    <button 
                      onClick={() => setIsEditModalOpen(true)}
                      className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm flex-1 md:flex-none"
                    >
                      Edit Profile
                    </button>
                    <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-slate-700 border border-slate-200 hover:bg-slate-50 transition-colors bg-white shadow-sm flex-1 md:flex-none justify-center">
                      <Eye className="w-4 h-4" /> View as Client
                    </button>
                  </>
                ) : (
                  <>
                    <button className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-slate-900 hover:bg-[#00b259] transition-colors shadow-sm flex-1 md:flex-none">
                      Invite to Job
                    </button>
                    <button className="px-5 py-2.5 rounded-xl text-sm font-bold text-slate-700 border border-slate-200 hover:bg-slate-50 transition-colors bg-white shadow-sm flex-1 md:flex-none">
                      Message
                    </button>
                  </>
                )}
             </div>

           </div>
           
           {/* Tabs */}
           <div className="flex items-center gap-8 mt-4 border-t border-slate-100 pt-2 overflow-x-auto custom-scrollbar">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-4 pt-2 text-sm font-bold whitespace-nowrap transition-colors border-b-2 relative ${
                    activeTab === tab.id 
                      ? 'border-blue-600 text-blue-600' 
                      : 'border-transparent text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
           </div>
        </div>

        {/* Content Area */}
        {activeTab === 'posts' && (
          <div className="flex flex-col lg:flex-row gap-8">
            <FreelancerProfileSidebar />
            <ProfileFeed />
            <FreelancerProfileWidgets />
          </div>
        )}

        {activeTab === 'about' && (
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-4">About {profile.name?.split(' ')[0] || 'User'}</h3>
            <p className="text-slate-600 leading-relaxed whitespace-pre-wrap mb-8">
              {profile.bio || 'This freelancer has not added a bio yet.'}
            </p>
            
            <h4 className="text-lg font-bold text-slate-900 mb-4">Skills & Expertise</h4>
            <div className="flex flex-wrap gap-2">
              {profile.skills && profile.skills.length > 0 ? profile.skills.map((skill: { id: string; name: string }) => (
                <span key={skill.id} className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-sm font-semibold">
                  {skill.name}
                </span>
              )) : (
                <span className="text-slate-500 text-sm">No skills listed.</span>
              )}
            </div>
          </div>
        )}

        {activeTab === 'portfolio' && (
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900">Portfolio</h3>
              {isOwnProfile && <button className="text-sm font-bold text-blue-600 hover:underline">Add Item</button>}
            </div>
            
            {profile.portfolioItems && profile.portfolioItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {profile.portfolioItems.map((item: import('../types/profile.types').PortfolioItem) => (
                  <div key={item.id} className="group rounded-2xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
                    <div className="aspect-video bg-slate-100 relative">
                      {item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                          <Briefcase className="w-12 h-12" />
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-slate-900">{item.title}</h4>
                      {item.description && <p className="text-sm text-slate-500 mt-1 line-clamp-2">{item.description}</p>}
                      {item.link && (
                        <a href={item.link} target="_blank" rel="noreferrer" className="text-sm font-bold text-blue-600 hover:underline mt-3 inline-block">
                          View Project
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                  <Briefcase className="w-8 h-8 text-slate-300" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">No portfolio items yet</h4>
                <p className="text-sm text-slate-500">
                  {isOwnProfile ? "Showcase your best work to attract more clients." : "This freelancer hasn't uploaded any portfolio items."}
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'services' && (
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900">Services</h3>
              {isOwnProfile && <button className="text-sm font-bold text-blue-600 hover:underline">Add Service</button>}
            </div>
            
            {profile.services && profile.services.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {profile.services.map((service: import('../types/profile.types').Service) => (
                  <div key={service.id} className="rounded-2xl border border-slate-200 p-6 hover:shadow-md transition-shadow flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <h4 className="font-bold text-slate-900 text-lg">{service.title}</h4>
                      <span className="font-black text-[#00b259]">${service.price}</span>
                    </div>
                    <p className="text-sm text-slate-600 mb-6 flex-1 line-clamp-3">{service.description}</p>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                      <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" /> {service.deliveryTime || 'Varies'} delivery
                      </span>
                      {!isOwnProfile && (
                        <button className="text-sm font-bold text-blue-600 hover:underline">
                          Buy Service
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                  <CheckCircle2 className="w-8 h-8 text-slate-300" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">No predefined services</h4>
                <p className="text-sm text-slate-500">
                  {isOwnProfile ? "Create fixed-price services for clients to buy instantly." : "This freelancer hasn't added any services yet."}
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Client Reviews</h3>
            <ReviewList userId={userId} />
          </div>
        )}

      </div>

      <Modal open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Profile" size="lg">
        <EditProfileForm onClose={() => setIsEditModalOpen(false)} />
      </Modal>
    </div>
  );
}
