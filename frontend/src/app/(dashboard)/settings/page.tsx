'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/store/auth.store';
import {
  User, Shield, Bell, DollarSign, Globe, Check, Plus, Trash2,
  Lock, Building2, ChevronRight, Upload, X, Eye, EyeOff,
  Landmark, Smartphone, CreditCard
} from 'lucide-react';

interface ToastState { title: string; msg: string; visible: boolean }
interface Toggle { [key: string]: boolean }

interface PayoutMethod {
  id: string;
  type: 'bank' | 'paypal' | 'mobile';
  label: string;
  detail: string;
  isPrimary?: boolean;
}

const initialPayoutMethods: PayoutMethod[] = [
  { id: 'pm1', type: 'bank', label: 'Bank Account (USD)', detail: 'Chase ****4242', isPrimary: true },
  { id: 'pm2', type: 'paypal', label: 'PayPal', detail: 'd.benson@email.com' },
  { id: 'pm3', type: 'mobile', label: 'Mobile Money (NGN)', detail: 'GTBank ****1234' },
];

export default function SettingsPage() {
  const { user } = useAuthStore();
  const [activeSection, setActiveSection] = useState('general');
  const [balancesVisible, setBalancesVisible] = useState(true);
  const [isPayoutModalOpen, setIsPayoutModalOpen] = useState(false);
  const [payoutMethods, setPayoutMethods] = useState<PayoutMethod[]>(initialPayoutMethods);
  const [newPayoutType, setNewPayoutType] = useState<'bank' | 'paypal' | 'mobile'>('bank');
  const [newHolder, setNewHolder] = useState('');
  const [newAccNum, setNewAccNum] = useState('');
  const [newRouting, setNewRouting] = useState('');

  const [toast, setToast] = useState<ToastState>({ title: '', msg: '', visible: false });
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Toggle states */
  const [toggles, setToggles] = useState<Toggle>({
    twoFA: true,
    jobRecs: true,
    proposalUpdates: true,
    paymentAlerts: true,
    marketingEmails: false,
  });

  /* General form */
  const [general, setGeneral] = useState({
    firstName: user?.name?.split(' ')[0] || 'Daniel',
    lastName: user?.name?.split(' ')[1] || 'Benson',
    email: user?.email || 'daniel.benson@getidone.io',
    timezone: 'GMT+01:00 West Africa Time (Lagos)',
  });

  /* Security form */
  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  /* Scroll spy */
  const sectionIds = ['general', 'security', 'notifications', 'payout', 'platform'];
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleScroll = () => {
      let current = 'general';
      sectionIds.forEach((id) => {
        const el = document.getElementById(`settings-${id}`);
        if (el && container.scrollTop >= el.offsetTop - 80) current = id;
      });
      setActiveSection(current);
    };
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(`settings-${id}`);
    if (el && containerRef.current) {
      containerRef.current.scrollTo({ top: el.offsetTop - 24, behavior: 'smooth' });
    }
    setActiveSection(id);
  };

  const showToast = (title: string, msg: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ title, msg, visible: true });
    toastTimer.current = setTimeout(() => setToast(t => ({ ...t, visible: false })), 3200);
  };

  const flipToggle = (key: string) => setToggles(prev => ({ ...prev, [key]: !prev[key] }));

  const removePayoutMethod = (id: string) => {
    setPayoutMethods(prev => prev.filter(p => p.id !== id));
    showToast('Removed', 'Payout method removed successfully');
  };

  const handleAddPayout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHolder || !newAccNum) {
      showToast('Error', 'Please fill in account details');
      return;
    }

    const typeLabels = { bank: 'Bank Account (USD)', paypal: 'PayPal Account', mobile: 'Mobile Money' };
    const masked = newAccNum.length > 4 ? `****${newAccNum.slice(-4)}` : newAccNum;

    const newMethod: PayoutMethod = {
      id: `pm_${Date.now()}`,
      type: newPayoutType,
      label: typeLabels[newPayoutType],
      detail: `${newHolder} (${masked})`
    };

    setPayoutMethods(prev => [...prev, newMethod]);
    setIsPayoutModalOpen(false);
    setNewHolder('');
    setNewAccNum('');
    setNewRouting('');
    showToast('Method Added', 'Your new payout method is pending verification');
  };

  const navItems = [
    { id: 'general',       label: 'General Information',      icon: User,       color: 'rgba(16,185,129,0.12)',  iconColor: 'var(--primary)' },
    { id: 'security',      label: 'Security Settings',        icon: Shield,     color: 'rgba(239,68,68,0.12)',   iconColor: 'var(--danger)' },
    { id: 'notifications', label: 'Notification Preferences', icon: Bell,       color: 'rgba(245,158,11,0.12)',  iconColor: 'var(--warning)' },
    { id: 'payout',        label: 'Payout Settings',          icon: DollarSign, color: 'rgba(20,184,166,0.12)',  iconColor: 'var(--secondary)' },
    { id: 'platform',      label: 'Platform Preferences',     icon: Globe,      color: 'rgba(132,204,22,0.12)',  iconColor: 'var(--accent)' },
  ];

  const Toggle = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
    <button
      onClick={onChange}
      className="relative flex-shrink-0 w-11 h-6 rounded-full transition-all duration-200 focus:outline-none"
      style={{ background: checked ? 'var(--primary)' : 'var(--border)' }}
      role="switch"
      aria-checked={checked}
    >
      <span
        className="absolute top-[3px] left-[3px] w-[18px] h-[18px] bg-white rounded-full shadow-sm transition-transform duration-200"
        style={{ transform: checked ? 'translateX(20px)' : 'translateX(0)' }}
      />
    </button>
  );

  const inputCls = `w-full rounded-xl px-4 py-3 text-sm font-medium outline-none transition-all duration-200`;
  const inputStyle = { background: 'var(--bg-alt)', border: '1px solid var(--border)', color: 'var(--text)' };

  const SectionHeader = ({ label, subtitle, iconColor, iconBg, Icon, extraAction }: {
    label: string; subtitle: string; iconColor: string; iconBg: string; Icon: React.ElementType; extraAction?: React.ReactNode;
  }) => (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: iconBg, color: iconColor }}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <h2 className="font-bold text-xl" style={{ fontFamily: "'Sora', sans-serif", color: 'var(--text)' }}>{label}</h2>
          <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{subtitle}</p>
        </div>
      </div>
      {extraAction}
    </div>
  );

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      {/* Page Header */}
      <div className="mb-6 flex-shrink-0 fade-up">
        <div className="flex items-center gap-1.5 text-xs mb-2" style={{ color: 'var(--muted)' }}>
          <Link href="/freelancer" className="hover:text-emerald-600 transition-colors">Dashboard</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="font-semibold" style={{ color: 'var(--text)' }}>Account Settings</span>
        </div>
        <h1 className="font-extrabold text-4xl tracking-tight" style={{ fontFamily: "'Sora', sans-serif", color: 'var(--text)' }}>
          Account Settings<span style={{ color: 'var(--primary)' }}>.</span>
        </h1>
        <p className="text-sm mt-1.5" style={{ color: 'var(--muted)' }}>
          Manage your profile, security, payout options, and platform preferences.
        </p>
      </div>

      {/* Two-column layout */}
      <div className="flex gap-8 flex-1 min-h-0 fade-up">
        {/* ====== LEFT: Sticky Settings Nav ====== */}
        <aside className="w-56 flex-shrink-0 hidden lg:block">
          <div className="sticky top-0 space-y-1">
            {navItems.map(({ id, label, icon: Icon }) => {
              const isActive = activeSection === id;
              return (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="settings-nav-item w-full text-left"
                  style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    padding: '12px 16px', borderRadius: '12px',
                    cursor: 'pointer', transition: 'all 0.2s',
                    fontWeight: 600, fontSize: '14px',
                    background: isActive ? 'var(--primary)' : 'transparent',
                    color: isActive ? 'white' : 'var(--muted)',
                    boxShadow: isActive ? '0 4px 12px -2px rgba(16,185,129,0.4)' : 'none',
                  }}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{label}</span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* ====== RIGHT: Scrollable Sections ====== */}
        <div ref={containerRef} className="flex-1 overflow-y-auto space-y-6 pr-1 min-h-0 pb-8">
          {/* ====== 1. GENERAL INFORMATION ====== */}
          <section id="settings-general" className="gd-card p-8">
            <SectionHeader
              label="General Information"
              subtitle="Update your personal details and contact info."
              Icon={User} iconBg="rgba(16,185,129,0.12)" iconColor="var(--primary)"
            />

            <div className="flex items-center gap-6 mb-8 pb-8" style={{ borderBottom: '1px solid var(--border)' }}>
              <img
                src={user?.avatarUrl || `https://picsum.photos/seed/danielbenson/200/200.jpg`}
                className="w-24 h-24 rounded-full object-cover flex-shrink-0"
                style={{ border: '4px solid var(--card)', boxShadow: '0 0 0 1px var(--border)' }}
                alt="Profile"
              />
              <div>
                <h3 className="font-bold text-lg" style={{ fontFamily: "'Sora', sans-serif" }}>Profile Photo</h3>
                <p className="text-xs mb-3" style={{ color: 'var(--muted)' }}>JPG, PNG, or GIF. Max size 2MB.</p>
                <div className="flex gap-2">
                  <button className="btn-ghost flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold">
                    <Upload className="w-3.5 h-3.5" /> Upload New
                  </button>
                  <button
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all"
                    style={{ background: 'rgba(239,68,68,0.1)', color: 'var(--danger)', border: '1px solid transparent' }}
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Remove
                  </button>
                </div>
              </div>
            </div>

            <form onSubmit={e => { e.preventDefault(); showToast('Saved', 'General information updated successfully'); }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--muted)' }}>First Name</label>
                <input type="text" className={inputCls} style={inputStyle}
                  value={general.firstName} onChange={e => setGeneral(g => ({ ...g, firstName: e.target.value }))} required />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--muted)' }}>Last Name</label>
                <input type="text" className={inputCls} style={inputStyle}
                  value={general.lastName} onChange={e => setGeneral(g => ({ ...g, lastName: e.target.value }))} required />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--muted)' }}>Email Address</label>
                <input type="email" className={inputCls} style={inputStyle}
                  value={general.email} onChange={e => setGeneral(g => ({ ...g, email: e.target.value }))} required />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--muted)' }}>Timezone</label>
                <select className={`${inputCls} cursor-pointer`} style={inputStyle}
                  value={general.timezone} onChange={e => setGeneral(g => ({ ...g, timezone: e.target.value }))}>
                  <option>GMT-08:00 Pacific Time (US & Canada)</option>
                  <option>GMT+01:00 West Africa Time (Lagos)</option>
                  <option>GMT+00:00 Greenwich Mean Time</option>
                  <option>GMT+01:00 Central European Time</option>
                </select>
              </div>
              <div className="md:col-span-2 flex justify-end">
                <button type="submit" className="btn-primary px-6 py-3 rounded-xl text-sm font-bold">
                  Save Changes
                </button>
              </div>
            </form>
          </section>

          {/* ====== 2. SECURITY ====== */}
          <section id="settings-security" className="gd-card p-8">
            <SectionHeader
              label="Security Settings"
              subtitle="Keep your account secure with a strong password and 2FA."
              Icon={Shield} iconBg="rgba(239,68,68,0.12)" iconColor="var(--danger)"
            />

            <form onSubmit={e => { e.preventDefault(); showToast('Security Updated', 'Your security settings have been saved'); }}
              className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--muted)' }}>Current Password</label>
                  <input type="password" className={inputCls} style={inputStyle}
                    placeholder="••••••••" value={security.currentPassword}
                    onChange={e => setSecurity(s => ({ ...s, currentPassword: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--muted)' }}>New Password</label>
                  <input type="password" className={inputCls} style={inputStyle}
                    placeholder="••••••••" value={security.newPassword}
                    onChange={e => setSecurity(s => ({ ...s, newPassword: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--muted)' }}>Confirm New Password</label>
                  <input type="password" className={inputCls} style={inputStyle}
                    placeholder="••••••••" value={security.confirmPassword}
                    onChange={e => setSecurity(s => ({ ...s, confirmPassword: e.target.value }))} />
                </div>
              </div>

              <div className="p-5 rounded-xl flex items-center justify-between gap-4" style={{ background: 'var(--bg-alt)', border: '1px solid var(--border)' }}>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'var(--card)', color: 'var(--primary)' }}>
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">Two-Factor Authentication (2FA)</h3>
                    <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>Add an extra layer of security to your account.</p>
                  </div>
                </div>
                <Toggle checked={toggles.twoFA} onChange={() => flipToggle('twoFA')} />
              </div>

              <div className="flex justify-end">
                <button type="submit" className="btn-primary px-6 py-3 rounded-xl text-sm font-bold">
                  Update Security
                </button>
              </div>
            </form>
          </section>

          {/* ====== 3. NOTIFICATIONS ====== */}
          <section id="settings-notifications" className="gd-card p-8">
            <SectionHeader
              label="Notification Preferences"
              subtitle="Choose how you want to be notified about activity."
              Icon={Bell} iconBg="rgba(245,158,11,0.12)" iconColor="var(--warning)"
            />

            <form onSubmit={e => { e.preventDefault(); showToast('Preferences Saved', 'Notification settings updated'); }}
              className="space-y-2">
              {[
                { key: 'jobRecs',         title: 'New Job Recommendations', desc: 'Get notified when new jobs matching your skills are posted.' },
                { key: 'proposalUpdates', title: 'Proposal Updates',        desc: 'Notifications about proposal views, interview requests, and declines.' },
                { key: 'paymentAlerts',   title: 'Payment Alerts',           desc: 'Notifications about escrow releases, withdrawals, and invoices.' },
                { key: 'marketingEmails', title: 'Marketing Emails',        desc: 'Tips, newsletters, and promotional offers from GetiDone.' },
              ].map(({ key, title, desc }) => (
                <div key={key} className="flex items-center justify-between p-4 rounded-xl hover:bg-[var(--bg-alt)] transition-colors">
                  <div className="pr-8">
                    <h3 className="font-bold text-sm" style={{ color: 'var(--text)' }}>{title}</h3>
                    <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>{desc}</p>
                  </div>
                  <Toggle checked={toggles[key]} onChange={() => flipToggle(key)} />
                </div>
              ))}

              <div className="flex justify-end pt-4">
                <button type="submit" className="btn-primary px-6 py-3 rounded-xl text-sm font-bold">
                  Save Preferences
                </button>
              </div>
            </form>
          </section>

          {/* ====== 4. PAYOUT SETTINGS (FREELANCER) ====== */}
          <section id="settings-payout" className="gd-card p-8">
            <SectionHeader
              label="Payout Settings"
              subtitle="Manage how you receive your earnings."
              Icon={DollarSign} iconBg="rgba(20,184,166,0.12)" iconColor="var(--secondary)"
              extraAction={
                <button
                  onClick={() => setBalancesVisible(!balancesVisible)}
                  className="p-2 text-slate-400 hover:text-emerald-500 transition-colors"
                  title={balancesVisible ? 'Hide Account Details' : 'Show Account Details'}
                >
                  {balancesVisible ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5 text-emerald-500" />}
                </button>
              }
            />

            <form onSubmit={e => { e.preventDefault(); showToast('Payout Updated', 'Your payout settings have been saved'); }}
              className="space-y-8">
              {/* Active Payout Methods */}
              <div>
                <h3 className="font-bold text-sm mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>Active Payout Methods</h3>
                <div className="space-y-3">
                  {payoutMethods.map(pm => (
                    <div key={pm.id} className="flex items-center gap-4 p-4 rounded-[14px] transition-all"
                      style={{ border: '1px solid var(--border)', background: 'var(--bg-alt)' }}>
                      <div className="w-12 h-8 rounded-md flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                        style={{ background: pm.type === 'bank' ? '#1a1a1a' : pm.type === 'paypal' ? 'var(--primary)' : 'var(--secondary)' }}>
                        {pm.type === 'bank' && <Landmark className="w-4 h-4" />}
                        {pm.type === 'paypal' && <CreditCard className="w-4 h-4" />}
                        {pm.type === 'mobile' && <Smartphone className="w-4 h-4" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-sm" style={{ color: 'var(--text)' }}>{pm.label}</div>
                        <div className="text-xs font-mono" style={{ color: 'var(--muted)' }}>
                          {balancesVisible ? pm.detail : '••••••••'}
                        </div>
                      </div>
                      {pm.isPrimary && (
                        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase" style={{ background: 'rgba(16,185,129,0.12)', color: 'var(--primary)' }}>
                          Primary
                        </span>
                      )}
                      <button type="button" onClick={() => removePayoutMethod(pm.id)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-md text-[11px] font-bold transition-all ml-2"
                        style={{ background: 'rgba(239,68,68,0.1)', color: 'var(--danger)' }}>
                        <Trash2 className="w-3 h-3" /> Remove
                      </button>
                    </div>
                  ))}
                </div>
                <button type="button" onClick={() => setIsPayoutModalOpen(true)}
                  className="btn-ghost mt-4 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">
                  <Plus className="w-3.5 h-3.5" /> Add new payout method
                </button>
              </div>

              {/* Payout Schedule */}
              <div className="pt-6 border-t" style={{ borderColor: 'var(--border)' }}>
                <h3 className="font-bold text-sm mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>Payout Schedule</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--muted)' }}>Minimum Payout Threshold</label>
                    <select className={`${inputCls} cursor-pointer`} style={inputStyle} defaultValue="$500.00">
                      <option>$100.00</option>
                      <option>$500.00</option>
                      <option>$1,000.00</option>
                      <option>No minimum (Instant)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--muted)' }}>Automatic Payout Schedule</label>
                    <select className={`${inputCls} cursor-pointer`} style={inputStyle} defaultValue="Monthly (1st of every month)">
                      <option>Weekly (Every Monday)</option>
                      <option>Monthly (1st of every month)</option>
                      <option>Manual (I will request payouts)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-6 border-t" style={{ borderColor: 'var(--border)' }}>
                <button type="submit" className="btn-primary px-6 py-3 rounded-xl text-sm font-bold">
                  Save Payout Settings
                </button>
              </div>
            </form>
          </section>

          {/* ====== 5. PLATFORM PREFERENCES ====== */}
          <section id="settings-platform" className="gd-card p-8">
            <SectionHeader
              label="Platform Preferences"
              subtitle="Customize your regional and language settings."
              Icon={Globe} iconBg="rgba(132,204,22,0.12)" iconColor="var(--accent)"
            />

            <form onSubmit={e => { e.preventDefault(); showToast('Preferences Saved', 'Platform settings updated'); }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--muted)' }}>Language</label>
                <select className={`${inputCls} cursor-pointer`} style={inputStyle}>
                  <option>English (US)</option>
                  <option>English (UK)</option>
                  <option>French (France)</option>
                  <option>Spanish (Spain)</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--muted)' }}>Default Currency</label>
                <select className={`${inputCls} cursor-pointer`} style={inputStyle}>
                  <option>USD - US Dollar ($)</option>
                  <option>EUR - Euro (€)</option>
                  <option>GBP - British Pound (£)</option>
                  <option>NGN - Nigerian Naira (₦)</option>
                </select>
                <p className="text-[11px] mt-2" style={{ color: 'var(--muted)' }}>All project budgets and earnings will be displayed in this currency.</p>
              </div>
              <div className="md:col-span-2 flex justify-end">
                <button type="submit" className="btn-primary px-6 py-3 rounded-xl text-sm font-bold">
                  Save Preferences
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>

      {/* Add Payout Method Modal */}
      {isPayoutModalOpen && (
        <div
          className="modal-backdrop active"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsPayoutModalOpen(false);
          }}
        >
          <div className="modal-content p-7">
            <div className="flex items-start justify-between mb-5 pb-4 border-b" style={{ borderColor: 'var(--border)' }}>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-emerald-500">
                    <DollarSign className="w-4 h-4 text-white" />
                  </div>
                  <div className="getidone-text text-sm dark"><span className="geti">Geti</span><span className="done">Done</span></div>
                </div>
                <div className="text-[11px] font-bold tracking-widest uppercase mb-1" style={{ color: 'var(--primary)' }}>NEW METHOD</div>
                <h2 className="font-extrabold text-2xl" style={{ fontFamily: "'Sora', sans-serif" }}>Add Payout Method</h2>
              </div>
              <button
                onClick={() => setIsPayoutModalOpen(false)}
                className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddPayout} className="space-y-4">
              <div>
                <label className="text-xs font-bold tracking-wider mb-1.5 block uppercase" style={{ color: 'var(--muted)' }}>PAYOUT TYPE</label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setNewPayoutType('bank')}
                    className={`p-3 rounded-xl border-2 text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                      newPayoutType === 'bank'
                        ? 'border-[var(--primary)] bg-[rgba(16,185,129,0.05)] text-[var(--primary)]'
                        : 'border-[var(--border)] text-[var(--muted)]'
                    }`}
                  >
                    <Landmark className="w-5 h-5" />
                    <span>Bank</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewPayoutType('paypal')}
                    className={`p-3 rounded-xl border-2 text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                      newPayoutType === 'paypal'
                        ? 'border-[var(--primary)] bg-[rgba(16,185,129,0.05)] text-[var(--primary)]'
                        : 'border-[var(--border)] text-[var(--muted)]'
                    }`}
                  >
                    <CreditCard className="w-5 h-5" />
                    <span>PayPal</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewPayoutType('mobile')}
                    className={`p-3 rounded-xl border-2 text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                      newPayoutType === 'mobile'
                        ? 'border-[var(--primary)] bg-[rgba(16,185,129,0.05)] text-[var(--primary)]'
                        : 'border-[var(--border)] text-[var(--muted)]'
                    }`}
                  >
                    <Smartphone className="w-5 h-5" />
                    <span>Mobile</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold tracking-wider mb-1.5 block uppercase" style={{ color: 'var(--muted)' }}>ACCOUNT HOLDER NAME</label>
                <input
                  type="text"
                  placeholder="e.g. Daniel Benson"
                  value={newHolder}
                  onChange={e => setNewHolder(e.target.value)}
                  className={inputCls} style={inputStyle}
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold tracking-wider mb-1.5 block uppercase" style={{ color: 'var(--muted)' }}>ACCOUNT NUMBER / EMAIL / PHONE</label>
                <input
                  type="text"
                  placeholder="e.g. 0123456789 or email@domain.com"
                  value={newAccNum}
                  onChange={e => setNewAccNum(e.target.value)}
                  className={inputCls} style={inputStyle}
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold tracking-wider mb-1.5 block uppercase" style={{ color: 'var(--muted)' }}>ROUTING NUMBER / SWIFT CODE (OPTIONAL)</label>
                <input
                  type="text"
                  placeholder="e.g. 987654321"
                  value={newRouting}
                  onChange={e => setNewRouting(e.target.value)}
                  className={inputCls} style={inputStyle}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsPayoutModalOpen(false)}
                  className="flex-1 btn-ghost py-3 rounded-xl text-sm font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 btn-primary py-3 rounded-xl text-sm font-bold"
                >
                  Add Method
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      <div
        className="fixed bottom-6 right-6 flex items-center gap-3 px-5 py-4 rounded-[14px] z-50 transition-all duration-[400ms]"
        style={{
          background: 'var(--sidebar)',
          border: '1px solid rgba(16,185,129,0.2)',
          boxShadow: '0 16px 40px -12px rgba(15,26,20,0.4)',
          color: 'white',
          maxWidth: 360,
          transform: toast.visible ? 'translateX(0)' : 'translateX(140%)',
        }}
      >
        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'var(--primary)' }}>
          <Check className="w-4 h-4 text-white" />
        </div>
        <div>
          <div className="text-sm font-bold">{toast.title}</div>
          <div className="text-xs" style={{ color: 'var(--sidebar-text)' }}>{toast.msg}</div>
        </div>
        <button
          onClick={() => setToast(t => ({ ...t, visible: false }))}
          className="ml-auto opacity-60 hover:opacity-100 transition-opacity"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
