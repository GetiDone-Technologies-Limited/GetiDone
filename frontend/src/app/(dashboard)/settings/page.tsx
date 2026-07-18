'use client';

import { useState } from 'react';
import { Settings as SettingsIcon, Bell, Lock, CreditCard, User, Globe, Shield, Smartphone, Key } from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'account' | 'security' | 'notifications' | 'billing' | 'preferences'>('account');

  const tabs = [
    { id: 'account', label: 'Account Details', icon: User },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'billing', label: 'Billing & Payments', icon: CreditCard },
    { id: 'preferences', label: 'Preferences', icon: Globe },
  ] as const;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900">Settings</h1>
        <p className="text-slate-500 mt-2 font-medium">Manage your account preferences and configurations.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Tabs */}
        <div className="w-full md:w-64 shrink-0 space-y-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive 
                    ? 'bg-[#00b259]/10 text-[#00b259] font-bold' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-semibold'
                }`}
              >
                <Icon className="w-5 h-5" /> {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white rounded-3xl border border-slate-200 shadow-sm p-8 min-h-[500px]">
          
          {/* Account Details Tab */}
          {activeTab === 'account' && (
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <SettingsIcon className="w-5 h-5 text-slate-400" /> General Information
              </h2>
              
              <div className="space-y-6 max-w-2xl">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-bold text-slate-700 block mb-2">First Name</label>
                    <input type="text" className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#00b259] focus:ring-1 focus:ring-[#00b259] transition-all bg-slate-50 text-slate-900 font-medium" defaultValue="John" />
                  </div>
                  <div>
                    <label className="text-sm font-bold text-slate-700 block mb-2">Last Name</label>
                    <input type="text" className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#00b259] focus:ring-1 focus:ring-[#00b259] transition-all bg-slate-50 text-slate-900 font-medium" defaultValue="Maxwell" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-bold text-slate-700 block mb-2">Email Address</label>
                  <input type="email" className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#00b259] focus:ring-1 focus:ring-[#00b259] transition-all bg-slate-50 text-slate-900 font-medium" defaultValue="you@getidone.com" />
                </div>

                <div>
                  <label className="text-sm font-bold text-slate-700 block mb-2">Timezone</label>
                  <select className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#00b259] focus:ring-1 focus:ring-[#00b259] transition-all bg-slate-50 appearance-none text-slate-900 font-medium">
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
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Shield className="w-5 h-5 text-slate-400" /> Security Settings
              </h2>
              
              <div className="space-y-8 max-w-2xl">
                <div>
                  <h3 className="text-lg font-bold text-slate-800 mb-4">Change Password</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-bold text-slate-700 block mb-2">Current Password</label>
                      <input type="password" placeholder="••••••••" className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#00b259] focus:ring-1 focus:ring-[#00b259] transition-all bg-slate-50" />
                    </div>
                    <div>
                      <label className="text-sm font-bold text-slate-700 block mb-2">New Password</label>
                      <input type="password" placeholder="••••••••" className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#00b259] focus:ring-1 focus:ring-[#00b259] transition-all bg-slate-50" />
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-slate-800">Two-Factor Authentication (2FA)</h3>
                      <p className="text-sm text-slate-500 font-medium mt-1">Add an extra layer of security to your account.</p>
                    </div>
                    <button className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg transition-colors text-sm">
                      Enable
                    </button>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex justify-end">
                  <button className="px-6 py-3 bg-[#00b259] hover:bg-[#009b4d] text-white font-bold rounded-xl shadow-sm transition-colors">
                    Update Security
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Bell className="w-5 h-5 text-slate-400" /> Notification Preferences
              </h2>
              
              <div className="space-y-6 max-w-2xl">
                {[
                  { title: 'New Messages', desc: 'Receive alerts when you get a new chat message.' },
                  { title: 'Project Updates', desc: 'Alerts regarding milestones, file uploads, and status changes.' },
                  { title: 'Payment Alerts', desc: 'Notifications about escrow releases, invoices, and bonuses.' },
                  { title: 'Marketing Emails', desc: 'Tips, newsletters, and promotional offers from GetiDone.' }
                ].map((item, i) => (
                  <div key={i} className="flex items-start justify-between py-4 border-b border-slate-100 last:border-0">
                    <div>
                      <p className="font-bold text-slate-800">{item.title}</p>
                      <p className="text-sm text-slate-500 font-medium mt-1">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                      <input type="checkbox" value="" className="sr-only peer" defaultChecked={i !== 3} />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00b259]"></div>
                    </label>
                  </div>
                ))}

                <div className="pt-6 mt-6 flex justify-end">
                  <button className="px-6 py-3 bg-[#00b259] hover:bg-[#009b4d] text-white font-bold rounded-xl shadow-sm transition-colors">
                    Save Preferences
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Billing & Payments Tab */}
          {activeTab === 'billing' && (
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-slate-400" /> Billing & Payments
              </h2>
              
              <div className="space-y-8 max-w-2xl">
                <div>
                  <h3 className="text-lg font-bold text-slate-800 mb-4">Payment Methods</h3>
                  <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-8 bg-slate-900 rounded flex items-center justify-center text-white text-[10px] font-bold shadow-sm">VISA</div>
                      <div>
                        <p className="font-bold text-slate-900">Visa ending in 4242</p>
                        <p className="text-xs font-medium text-slate-500">Expires 12/2028</p>
                      </div>
                    </div>
                    <button className="text-sm font-bold text-red-500 hover:text-red-700">Remove</button>
                  </div>
                  <button className="mt-4 text-sm font-bold text-[#00b259] hover:text-[#009b4d] flex items-center gap-2">
                    + Add new payment method
                  </button>
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <h3 className="text-lg font-bold text-slate-800 mb-4">Billing Address</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="text-sm font-bold text-slate-700 block mb-2">Street Address</label>
                      <input type="text" className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#00b259] focus:ring-1 focus:ring-[#00b259] transition-all bg-slate-50 text-slate-900" defaultValue="123 Innovation Drive" />
                    </div>
                    <div>
                      <label className="text-sm font-bold text-slate-700 block mb-2">City</label>
                      <input type="text" className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#00b259] focus:ring-1 focus:ring-[#00b259] transition-all bg-slate-50 text-slate-900" defaultValue="San Francisco" />
                    </div>
                    <div>
                      <label className="text-sm font-bold text-slate-700 block mb-2">Postal Code</label>
                      <input type="text" className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#00b259] focus:ring-1 focus:ring-[#00b259] transition-all bg-slate-50 text-slate-900" defaultValue="94103" />
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex justify-end">
                  <button className="px-6 py-3 bg-[#00b259] hover:bg-[#009b4d] text-white font-bold rounded-xl shadow-sm transition-colors">
                    Update Billing
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Globe className="w-5 h-5 text-slate-400" /> Platform Preferences
              </h2>
              
              <div className="space-y-6 max-w-2xl">
                <div>
                  <label className="text-sm font-bold text-slate-700 block mb-2">Language</label>
                  <select className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#00b259] focus:ring-1 focus:ring-[#00b259] transition-all bg-slate-50 appearance-none font-medium text-slate-900">
                    <option>English (US)</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-bold text-slate-700 block mb-2">Default Currency</label>
                  <select className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#00b259] focus:ring-1 focus:ring-[#00b259] transition-all bg-slate-50 appearance-none font-medium text-slate-900">
                    <option>USD ($) - US Dollar</option>
                    <option>EUR (€) - Euro</option>
                    <option>GBP (£) - British Pound</option>
                  </select>
                  <p className="text-xs text-slate-500 font-medium mt-2">All project budgets and payments will be displayed in this currency.</p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex justify-end">
                  <button className="px-6 py-3 bg-[#00b259] hover:bg-[#009b4d] text-white font-bold rounded-xl shadow-sm transition-colors">
                    Save Preferences
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
