'use client';

import { useState } from 'react';
import { Activity, Bell, Calendar, CheckCircle2, MessageSquare, Star, Wallet, Mail, Smartphone, BellRing } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Modal } from '@/shared/components/ui/Modal';

const activities = [
  { id: 1, type: 'payment', title: 'Payment Received', desc: 'Payment of $1,250 received from TechNova Inc. for Milestone 2.', time: '2 hours ago', icon: Wallet, color: 'bg-[#00b259]/10 text-[#00b259]' },
  { id: 2, type: 'project', title: 'Milestone Approved', desc: 'The client approved the "Frontend Development" milestone.', time: '5 hours ago', icon: CheckCircle2, color: 'bg-blue-100 text-blue-600' },
  { id: 3, type: 'system', title: 'New Message', desc: 'Sarah from HealthPlus sent you a message regarding the proposal.', time: 'Yesterday', icon: MessageSquare, color: 'bg-purple-100 text-purple-600' },
  { id: 4, type: 'system', title: '5-Star Review!', desc: 'You received a new 5-star review on your profile.', time: 'Yesterday', icon: Star, color: 'bg-amber-100 text-amber-500' },
  { id: 5, type: 'system', title: 'Profile Views', desc: 'Your profile appeared in 18 search results this week.', time: '2 days ago', icon: Activity, color: 'bg-slate-100 text-slate-600' },
];

export default function ActivityPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  // Notification Toggle State
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(true);
  const [smsNotifs, setSmsNotifs] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Notification preferences updated successfully');
    setIsSettingsOpen(false);
  };

  const filteredActivities = activities.filter(a => activeTab === 'all' || a.type === activeTab);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Recent Activity</h1>
        <p className="text-slate-500 font-medium mt-2">Everything that has happened on your account recently.</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="border-b border-slate-100 p-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-full text-sm font-bold shadow-sm transition-colors ${activeTab === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
            >
              All
            </button>
            <button 
              onClick={() => setActiveTab('payment')}
              className={`px-4 py-2 rounded-full text-sm font-bold shadow-sm transition-colors ${activeTab === 'payment' ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
            >
              Payments
            </button>
            <button 
              onClick={() => setActiveTab('project')}
              className={`px-4 py-2 rounded-full text-sm font-bold shadow-sm transition-colors ${activeTab === 'project' ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
            >
              Projects
            </button>
          </div>
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="text-sm font-bold text-slate-400 flex items-center gap-2 hover:text-slate-700 transition-colors"
          >
            <Bell className="w-4 h-4" /> Notification Settings
          </button>
        </div>

        <div className="divide-y divide-slate-100 min-h-[400px]">
          {filteredActivities.length === 0 ? (
            <div className="p-12 text-center text-slate-500 font-medium flex flex-col items-center justify-center h-full">
              <Activity className="w-8 h-8 text-slate-300 mb-3" />
              No activity found for this filter.
            </div>
          ) : (
            filteredActivities.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.id} className="p-6 sm:p-8 flex items-start gap-6 hover:bg-slate-50 transition-colors group">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-inner ${item.color}`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <div className="flex-1 min-w-0 pt-1">
                    <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                    <p className="text-slate-600 mt-1.5 leading-relaxed font-medium">{item.desc}</p>
                  </div>
                  <div className="shrink-0 pt-2 flex items-center gap-1.5 text-slate-400">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-bold">{item.time}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <Modal open={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} title="Notification Preferences" size="md">
        <form onSubmit={handleSaveSettings} className="space-y-6">
          <p className="text-sm text-slate-500 font-medium">Choose how and when you want to be notified about activity on your account.</p>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => setEmailNotifs(!emailNotifs)}>
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${emailNotifs ? 'bg-[#00b259]/10 text-[#00b259]' : 'bg-slate-100 text-slate-400'}`}>
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Email Notifications</h4>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">Receive daily digests and urgent alerts</p>
                </div>
              </div>
              <div className={`w-12 h-6 rounded-full transition-colors relative ${emailNotifs ? 'bg-[#00b259]' : 'bg-slate-200'}`}>
                <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${emailNotifs ? 'left-7' : 'left-1'}`} />
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => setPushNotifs(!pushNotifs)}>
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${pushNotifs ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-400'}`}>
                  <BellRing className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Push Notifications</h4>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">In-app alerts for real-time updates</p>
                </div>
              </div>
              <div className={`w-12 h-6 rounded-full transition-colors relative ${pushNotifs ? 'bg-[#00b259]' : 'bg-slate-200'}`}>
                <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${pushNotifs ? 'left-7' : 'left-1'}`} />
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => setSmsNotifs(!smsNotifs)}>
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${smsNotifs ? 'bg-purple-100 text-purple-600' : 'bg-slate-100 text-slate-400'}`}>
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">SMS Notifications</h4>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">Text messages for payments only</p>
                </div>
              </div>
              <div className={`w-12 h-6 rounded-full transition-colors relative ${smsNotifs ? 'bg-[#00b259]' : 'bg-slate-200'}`}>
                <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${smsNotifs ? 'left-7' : 'left-1'}`} />
              </div>
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <button type="button" onClick={() => setIsSettingsOpen(false)} className="flex-1 py-3 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl text-sm font-bold transition-colors">
              Cancel
            </button>
            <button type="submit" className="flex-1 py-3 bg-slate-900 text-white hover:bg-slate-800 rounded-xl text-sm font-bold transition-colors">
              Save Preferences
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
