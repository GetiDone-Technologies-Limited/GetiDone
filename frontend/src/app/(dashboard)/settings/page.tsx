import { Settings as SettingsIcon, Bell, Lock, CreditCard, User, Globe } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900">Settings</h1>
        <p className="text-slate-500 mt-2 font-medium">Manage your account preferences and configurations.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Tabs */}
        <div className="w-full md:w-64 shrink-0 space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-[#00b259]/10 text-[#00b259] font-bold rounded-xl transition-colors">
            <User className="w-5 h-5" /> Account Details
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-semibold rounded-xl transition-colors">
            <Lock className="w-5 h-5" /> Security
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-semibold rounded-xl transition-colors">
            <Bell className="w-5 h-5" /> Notifications
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-semibold rounded-xl transition-colors">
            <CreditCard className="w-5 h-5" /> Billing & Payments
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-semibold rounded-xl transition-colors">
            <Globe className="w-5 h-5" /> Preferences
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <SettingsIcon className="w-5 h-5 text-slate-400" /> General Information
          </h2>
          
          <div className="space-y-6 max-w-2xl">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-bold text-slate-700 block mb-2">First Name</label>
                <input type="text" className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#00b259] focus:ring-1 focus:ring-[#00b259] transition-all bg-slate-50" defaultValue="John" />
              </div>
              <div>
                <label className="text-sm font-bold text-slate-700 block mb-2">Last Name</label>
                <input type="text" className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#00b259] focus:ring-1 focus:ring-[#00b259] transition-all bg-slate-50" defaultValue="Maxwell" />
              </div>
            </div>

            <div>
              <label className="text-sm font-bold text-slate-700 block mb-2">Email Address</label>
              <input type="email" className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#00b259] focus:ring-1 focus:ring-[#00b259] transition-all bg-slate-50" defaultValue="you@getidone.com" />
            </div>

            <div>
              <label className="text-sm font-bold text-slate-700 block mb-2">Timezone</label>
              <select className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#00b259] focus:ring-1 focus:ring-[#00b259] transition-all bg-slate-50 appearance-none">
                <option>UTC (Universal Coordinated Time)</option>
                <option>EST (Eastern Standard Time)</option>
                <option>PST (Pacific Standard Time)</option>
              </select>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 flex justify-end">
              <button className="px-6 py-3 bg-[#00b259] hover:bg-[#009b4d] text-white font-bold rounded-xl shadow-sm transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
