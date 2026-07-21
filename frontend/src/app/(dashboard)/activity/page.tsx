import { Activity, Bell, Calendar, CheckCircle2, MessageSquare, Star, Wallet } from 'lucide-react';

const activities = [
  { id: 1, type: 'payment', title: 'Payment Received', desc: 'Payment of $1,250 received from TechNova Inc. for Milestone 2.', time: '2 hours ago', icon: Wallet, color: 'bg-[#00b259]/10 text-[#00b259]' },
  { id: 2, type: 'milestone', title: 'Milestone Approved', desc: 'The client approved the "Frontend Development" milestone.', time: '5 hours ago', icon: CheckCircle2, color: 'bg-blue-100 text-blue-600' },
  { id: 3, type: 'message', title: 'New Message', desc: 'Sarah from HealthPlus sent you a message regarding the proposal.', time: 'Yesterday', icon: MessageSquare, color: 'bg-purple-100 text-purple-600' },
  { id: 4, type: 'review', title: '5-Star Review!', desc: 'You received a new 5-star review on your profile.', time: 'Yesterday', icon: Star, color: 'bg-amber-100 text-amber-500' },
  { id: 5, type: 'system', title: 'Profile Views', desc: 'Your profile appeared in 18 search results this week.', time: '2 days ago', icon: Activity, color: 'bg-slate-100 text-slate-600' },
];

export default function ActivityPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Recent Activity</h1>
        <p className="text-slate-500 font-medium mt-2">Everything that has happened on your account recently.</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="border-b border-slate-100 p-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-slate-900 text-white rounded-full text-sm font-bold shadow-sm">All</button>
            <button className="px-4 py-2 bg-slate-50 text-slate-600 hover:bg-slate-100 rounded-full text-sm font-bold transition-colors">Payments</button>
            <button className="px-4 py-2 bg-slate-50 text-slate-600 hover:bg-slate-100 rounded-full text-sm font-bold transition-colors">Projects</button>
          </div>
          <button className="text-sm font-bold text-slate-400 flex items-center gap-2 hover:text-slate-700">
            <Bell className="w-4 h-4" /> Notification Settings
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {activities.map((item) => {
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
          })}
        </div>
      </div>
    </div>
  );
}
