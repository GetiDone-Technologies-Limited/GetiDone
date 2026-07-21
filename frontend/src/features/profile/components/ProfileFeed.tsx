'use client';

import { Image, Video, Smile, MoreHorizontal, ThumbsUp, MessageCircle, Share2 } from 'lucide-react';
import { Avatar } from '@/shared/components/ui/Avatar';

export function ProfileFeed() {
  return (
    <div className="flex-1 min-w-0 space-y-6">
      
      {/* Create Post Input */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Avatar src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&q=80" name="TechNova" size="sm" />
          <input 
            type="text" 
            placeholder="What would you like to share?" 
            className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-4 py-2.5 text-sm outline-none focus:border-[#00b259] transition-colors"
          />
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
           <button className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-50">
             <Image className="w-4 h-4 text-[#00b259]" /> Post an Update
           </button>
           <button className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-50">
             <Video className="w-4 h-4 text-purple-500" /> Share a Project
           </button>
           <button className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-50">
             <Smile className="w-4 h-4 text-amber-500" /> Write a Review
           </button>
        </div>
      </div>

      {/* Post 1 */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
             <Avatar src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&q=80" name="TechNova" size="sm" />
             <div>
               <h3 className="text-sm font-bold text-slate-900">TechNova Inc.</h3>
               <p className="text-xs font-semibold text-slate-500">May 12 at 10:30 AM • 🌍</p>
             </div>
          </div>
          <button className="text-slate-400 hover:text-slate-600">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
        
        <p className="text-sm text-slate-700 leading-relaxed mb-4">
          Excited to announce the launch of our new e-commerce platform!<br/>
          Big thanks to the amazing freelancer <a href="#" className="font-bold text-[#00b259] hover:underline">@Daniel B.</a> for the outstanding work. 🚀
        </p>

        <div className="rounded-2xl overflow-hidden border border-slate-200 mb-4 bg-slate-50 flex items-center justify-center p-4">
           {/* Mock image content matching the design */}
           <div className="w-full aspect-[4/3] bg-white rounded-xl shadow-sm border border-slate-100 flex flex-col p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-black text-slate-900">Next-gen E-commerce Experience</h4>
                <div className="flex gap-2">
                  <div className="w-16 h-20 bg-slate-100 rounded-lg"></div>
                  <div className="w-16 h-20 bg-slate-100 rounded-lg"></div>
                  <div className="w-16 h-20 bg-slate-100 rounded-lg"></div>
                </div>
              </div>
              <div className="mt-auto">
                 <button className="bg-slate-900 text-white text-xs font-bold px-4 py-2 rounded-lg">Shop Now</button>
              </div>
           </div>
        </div>

        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-4 pb-4 border-b border-slate-100">
           <div className="flex items-center gap-1">
              <div className="w-5 h-5 rounded-full bg-[#00b259] flex items-center justify-center text-white"><ThumbsUp className="w-3 h-3" /></div>
              <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white -ml-2"><Smile className="w-3 h-3" /></div>
              <span className="ml-1">45</span>
           </div>
           <div className="flex gap-3">
              <span>8 Comments</span>
              <span>2 Shares</span>
           </div>
        </div>

        <div className="flex items-center justify-between">
           <button className="flex-1 flex items-center justify-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 py-2 rounded-xl transition-colors">
             <ThumbsUp className="w-4 h-4" /> Like
           </button>
           <button className="flex-1 flex items-center justify-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 py-2 rounded-xl transition-colors">
             <MessageCircle className="w-4 h-4" /> Comment
           </button>
           <button className="flex-1 flex items-center justify-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 py-2 rounded-xl transition-colors">
             <Share2 className="w-4 h-4" /> Share
           </button>
        </div>
      </div>

      {/* Post 2 */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
             <Avatar src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&q=80" name="TechNova" size="sm" />
             <div>
               <h3 className="text-sm font-bold text-slate-900">TechNova Inc. <span className="font-medium text-slate-500">posted a new project</span></h3>
               <p className="text-xs font-semibold text-slate-500">May 8 at 2:15 PM • 🌍</p>
             </div>
          </div>
          <button className="text-slate-400 hover:text-slate-600">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>

        <div className="border border-slate-200 rounded-2xl p-4 hover:border-[#00b259] transition-colors cursor-pointer">
           <div className="flex items-center justify-between mb-2">
             <h4 className="text-base font-bold text-slate-900">Mobile Banking App Development</h4>
             <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full border border-blue-100">In Progress</span>
           </div>
           <p className="text-sm text-slate-600 mb-4">We&apos;re building a secure and user-friendly mobile banking solution...</p>
           
           <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
              <span>Frontend, React Native, FinTech</span>
              <span>•</span>
              <span className="font-bold text-slate-900">$4,500</span>
           </div>
        </div>
      </div>

    </div>
  );
}
