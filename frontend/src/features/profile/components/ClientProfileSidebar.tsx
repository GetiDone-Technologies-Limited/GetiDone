'use client';

import { Building2, Users, MapPin, Globe, Mail, MessageSquare, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Avatar } from '@/shared/components/ui/Avatar';

export function ClientProfileSidebar() {
  return (
    <div className="w-full lg:w-[320px] shrink-0 space-y-6">
      
      {/* About Section */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
        <h2 className="text-sm font-bold text-slate-900 mb-4">About TechNova Inc.</h2>
        <p className="text-sm text-slate-600 mb-6 leading-relaxed">
          TechNova Inc. is a technology company focused on building innovative web and mobile solutions. We partner with talented freelancers to bring our ideas to life.
        </p>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-sm">
            <Building2 className="w-4 h-4 text-slate-400" />
            <span className="text-slate-500 w-28">Industry</span>
            <span className="font-semibold text-slate-900">Technology</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Users className="w-4 h-4 text-slate-400" />
            <span className="text-slate-500 w-28">Company Size</span>
            <span className="font-semibold text-slate-900">10 - 50 employees</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <MapPin className="w-4 h-4 text-slate-400" />
            <span className="text-slate-500 w-28">Location</span>
            <span className="font-semibold text-slate-900">Lagos, Nigeria</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Globe className="w-4 h-4 text-slate-400" />
            <span className="text-slate-500 w-28">Website</span>
            <a href="#" className="font-semibold text-[#00b259] hover:underline">www.technova.com</a>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Mail className="w-4 h-4 text-slate-400" />
            <span className="text-slate-500 w-28">Email</span>
            <a href="#" className="font-semibold text-[#00b259] hover:underline">hello@technova.com</a>
          </div>
        </div>
      </div>

      {/* Account Manager */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
        <h2 className="text-sm font-bold text-slate-900 mb-4">Account Manager</h2>
        <div className="flex items-center gap-3 mb-4">
          <Avatar src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&q=80" name="Temilade A." size="md" />
          <div>
            <h3 className="text-sm font-bold text-slate-900">Temilade A.</h3>
            <p className="text-xs text-slate-500 font-medium">Account Manager</p>
          </div>
        </div>
        <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors">
          <MessageSquare className="w-4 h-4" /> Send Message
        </button>
      </div>

      {/* Verification & Badges */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
        <h2 className="text-sm font-bold text-slate-900 mb-4">Verification & Badges</h2>
        <div className="grid grid-cols-4 gap-2">
          <div className="flex flex-col items-center justify-center text-center">
             <div className="w-10 h-10 rounded-full bg-[#00b259]/10 text-[#00b259] flex items-center justify-center mb-1">
               <ShieldCheck className="w-5 h-5" />
             </div>
             <span className="text-[10px] font-bold text-slate-600 leading-tight">Email<br/>Verified</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center">
             <div className="w-10 h-10 rounded-full bg-[#00b259]/10 text-[#00b259] flex items-center justify-center mb-1">
               <ShieldCheck className="w-5 h-5" />
             </div>
             <span className="text-[10px] font-bold text-slate-600 leading-tight">Phone<br/>Verified</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center">
             <div className="w-10 h-10 rounded-full bg-[#00b259]/10 text-[#00b259] flex items-center justify-center mb-1">
               <ShieldCheck className="w-5 h-5" />
             </div>
             <span className="text-[10px] font-bold text-slate-600 leading-tight">Payment<br/>Verified</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center">
             <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mb-1">
               <ShieldCheck className="w-5 h-5" />
             </div>
             <span className="text-[10px] font-bold text-slate-600 leading-tight">Corporate<br/>Verified</span>
          </div>
        </div>
      </div>
      
    </div>
  );
}
