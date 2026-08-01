'use client';

import { useState, useEffect, useRef } from 'react';
import { useAuthStore } from '@/store/auth.store';
import {
  User, Shield, Bell, CreditCard, Globe, Check, Plus, Trash2,
  Lock, Building2, ChevronRight, Upload, X,
} from 'lucide-react';

/* ==================== TYPES ==================== */
interface ToastState { title: string; msg: string; visible: boolean }
interface Toggle { [key: string]: boolean }

/* ==================== COMPONENT ==================== */
export default function SettingsPage() {
  const { user } = useAuthStore();
  const [activeSection, setActiveSection] = useState('general');
  const [toast, setToast] = useState<ToastState>({ title: '', msg: '', visible: false });
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Toggle states */
  const [toggles, setToggles] = useState<Toggle>({
    twoFA: true,
    newMessages: true,
    projectUpdates: true,
    paymentAlerts: true,
    marketingEmails: false,
  });

  /* General form */
  const [general, setGeneral] = useState({
    firstName: user?.name?.split(' ')[0] || 'John',
    lastName: user?.name?.split(' ')[1] || 'Carter',
    email: user?.email || 'john@getidone.io',
    timezone: 'GMT-05:00 Eastern Time (US & Canada)',
  });

  /* Security form */
  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  /* Payment methods */
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 'pm1', type: 'VISA', label: 'Visa ending in 4242', expires: 'Expires 09/27 · Primary', color: 'linear-gradient(135deg,#1a1a1a,#333)' },
    { id: 'pm2', type: 'MC', label: 'Mastercard ending in 5555', expires: 'Expires 04/26', color: 'linear-gradient(135deg,#eb001b,#f79e1b)' },
    { id: 'pm3', type: '🏦', label: 'Bank Deposit (Chase ****1234)', expires: 'Verified', color: 'var(--primary)' },
  ]);

  /* ==================== SCROLL SPY ==================== */
  const sectionIds = ['general', 'security', 'notifications', 'billing', 'platform'];
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

  /* ==================== HELPERS ==================== */
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

  const flipToggle = (key: string) =>
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));

  const removePayment = (id: string) => {
    setPaymentMethods(prev => prev.filter(p => p.id !== id));
    showToast('Removed', 'Payment method removed successfully');
  };

  /* ==================== NAV ITEMS ==================== */
  const navItems = [
    { id: 'general',       label: 'General Information',      icon: User,       color: 'rgba(16,185,129,0.12)',  iconColor: 'var(--primary)' },
    { id: 'security',      label: 'Security Settings',        icon: Shield,     color: 'rgba(239,68,68,0.12)',   iconColor: 'var(--danger)' },
    { id: 'notifications', label: 'Notification Preferences', icon: Bell,       color: 'rgba(245,158,11,0.12)',  iconColor: 'var(--warning)' },
    { id: 'billing',       label: 'Billing & Payments',       icon: CreditCard, color: 'rgba(20,184,166,0.12)',  iconColor: 'var(--secondary)' },
    { id: 'platform',      label: 'Platform Preferences',     icon: Globe,      color: 'rgba(132,204,22,0.12)',  iconColor: 'var(--accent)' },
  ];

  /* ==================== TOGGLE COMPONENT ==================== */
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

  /* ==================== FORM INPUT STYLE ==================== */
  const inputCls = `w-full rounded-xl px-4 py-3 text-sm font-medium outline-none transition-all duration-200`;
  const inputStyle = {
    background: 'var(--bg-alt)',
    border: '1px solid var(--border)',
    color: 'var(--text)',
  };

  /* ==================== SECTION HEADER ==================== */
  const SectionHeader = ({ id, label, subtitle, iconColor, iconBg, Icon }: {
    id: string; label: string; subtitle: string;
    iconColor: string; iconBg: string; Icon: React.ElementType;
  }) => (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: iconBg, color: iconColor }}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <h2 className="font-bold text-xl" style={{ fontFamily: "'Sora', sans-serif", color: 'var(--text)' }}>{label}</h2>
        <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{subtitle}</p>
      </div>
    </div>
  );

  /* ==================== RENDER ==================== */
  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">

      {/* Page Header */}
      <div className="mb-8 flex-shrink-0 fade-up">
        <div className="flex items-center gap-1.5 text-xs mb-2" style={{ color: 'var(--muted)' }}>
          <span className="hover:text-emerald-600 cursor-pointer transition-colors">Dashboard</span>
          <ChevronRight className="w-3 h-3" />
          <span className="font-semibold" style={{ color: 'var(--text)' }}>Settings</span>
        </div>
        <h1 className="font-extrabold text-4xl tracking-tight" style={{ fontFamily: "'Sora', sans-serif", color: 'var(--text)' }}>
          Account Settings<span style={{ color: 'var(--primary)' }}>.</span>
        </h1>
        <p className="text-sm mt-1.5" style={{ color: 'var(--muted)' }}>
          Manage your profile, security, and platform preferences.
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
              id="general" label="General Information"
              subtitle="Update your personal details and contact info."
              Icon={User} iconBg="rgba(16,185,129,0.12)" iconColor="var(--primary)"
            />

            {/* Profile Photo */}
            <div className="flex items-center gap-6 mb-8 pb-8" style={{ borderBottom: '1px solid var(--border)' }}>
              <img
                src={user?.avatarUrl || `https://picsum.photos/seed/johnavatar/200/200.jpg`}
                className="w-24 h-24 rounded-full object-cover flex-shrink-0"
                style={{ border: '4px solid var(--card)', boxShadow: '0 0 0 1px var(--border)' }}
                alt="Profile"
              />
              <div>
                <h3 className="font-bold text-lg" style={{ fontFamily: "'Sora', sans-serif" }}>Profile Photo</h3>
                <p className="text-xs mb-3" style={{ color: 'var(--muted)' }}>JPG, PNG, or GIF. Max size 2MB.</p>
                <div className="flex gap-2">
                  <button className="btn-ghost flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold">
                    <Upload className="w-3 h-3" /> Upload New
                  </button>
                  <button
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all"
                    style={{ background: 'rgba(239,68,68,0.1)', color: 'var(--danger)', border: '1px solid transparent' }}
                  >
                    <Trash2 className="w-3 h-3" /> Remove
                  </button>
                </div>
              </div>
            </div>

            {/* Form */}
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
                  <option>GMT-05:00 Eastern Time (US & Canada)</option>
                  <option>GMT+00:00 Greenwich Mean Time</option>
                  <option>GMT+01:00 Central European Time</option>
                  <option>GMT+01:00 West Africa Time (Lagos)</option>
                </select>
              </div>
              <div className="md:col-span-2 flex justify-end">
                <button type="submit" className="btn-primary px-6 py-3 rounded-xl text-sm font-bold">
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </section>

          {/* ====== 2. SECURITY ====== */}
          <section id="settings-security" className="gd-card p-8">
            <SectionHeader
              id="security" label="Security Settings"
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

              {/* 2FA Toggle */}
              <div className="p-5 rounded-xl flex items-center justify-between gap-4"
                style={{ background: 'var(--bg-alt)', border: '1px solid var(--border)' }}>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: 'var(--card)', color: 'var(--primary)' }}>
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
                  <span>Update Security</span>
                </button>
              </div>
            </form>
          </section>

          {/* ====== 3. NOTIFICATIONS ====== */}
          <section id="settings-notifications" className="gd-card p-8">
            <SectionHeader
              id="notifications" label="Notification Preferences"
              subtitle="Choose how you want to be notified about activity."
              Icon={Bell} iconBg="rgba(245,158,11,0.12)" iconColor="var(--warning)"
            />

            <form onSubmit={e => { e.preventDefault(); showToast('Preferences Saved', 'Notification settings updated'); }}
              className="space-y-2">
              {[
                { key: 'newMessages',     title: 'New Messages',    desc: 'Get notified when you receive a new message from a freelancer or team.' },
                { key: 'projectUpdates',  title: 'Project Updates', desc: 'Notifications about milestone completions, file uploads, and status changes.' },
                { key: 'paymentAlerts',   title: 'Payment Alerts',  desc: 'Notifications about escrow releases, invoices, and bonuses.' },
                { key: 'marketingEmails', title: 'Marketing Emails',desc: 'Tips, newsletters, and promotional offers from GetiDone.' },
              ].map(({ key, title, desc }) => (
                <div key={key}
                  className="flex items-center justify-between p-4 rounded-xl transition-colors"
                  style={{ cursor: 'default' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-alt)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <div className="pr-8">
                    <h3 className="font-bold text-sm" style={{ color: 'var(--text)' }}>{title}</h3>
                    <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>{desc}</p>
                  </div>
                  <Toggle checked={toggles[key]} onChange={() => flipToggle(key)} />
                </div>
              ))}

              <div className="flex justify-end pt-4">
                <button type="submit" className="btn-primary px-6 py-3 rounded-xl text-sm font-bold">
                  <span>Save Preferences</span>
                </button>
              </div>
            </form>
          </section>

          {/* ====== 4. BILLING ====== */}
          <section id="settings-billing" className="gd-card p-8">
            <SectionHeader
              id="billing" label="Billing & Payments"
              subtitle="Manage your payment methods and billing address."
              Icon={CreditCard} iconBg="rgba(20,184,166,0.12)" iconColor="var(--secondary)"
            />

            <form onSubmit={e => { e.preventDefault(); showToast('Billing Updated', 'Billing information saved successfully'); }}
              className="space-y-8">
              {/* Payment Methods */}
              <div>
                <h3 className="font-bold text-sm mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>Payment Methods</h3>
                <div className="space-y-3">
                  {paymentMethods.map(pm => (
                    <div key={pm.id} className="flex items-center gap-4 p-4 rounded-[14px] transition-all"
                      style={{ border: '1px solid var(--border)', background: 'var(--bg-alt)' }}
                      onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--primary)')}
                      onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                    >
                      <div className="w-12 h-8 rounded-md flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                        style={{ background: pm.color }}>
                        {pm.type === '🏦' ? <Building2 className="w-4 h-4" /> : pm.type}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-sm" style={{ color: 'var(--text)' }}>{pm.label}</div>
                        <div className="text-xs" style={{ color: 'var(--muted)' }}>{pm.expires}</div>
                      </div>
                      <button type="button" onClick={() => removePayment(pm.id)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-md text-[11px] font-bold transition-all"
                        style={{ background: 'rgba(239,68,68,0.1)', color: 'var(--danger)' }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'var(--danger)'; e.currentTarget.style.color = 'white'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.1)'; e.currentTarget.style.color = 'var(--danger)'; }}
                      >
                        <Trash2 className="w-3 h-3" /> Remove
                      </button>
                    </div>
                  ))}
                </div>
                <button type="button" className="btn-ghost mt-4 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 lift"
                  onClick={() => showToast('Coming Soon', 'Payment method management coming soon')}>
                  <Plus className="w-3.5 h-3.5" /> Add new payment method
                </button>
              </div>

              {/* Billing Address */}
              <div className="pt-6" style={{ borderTop: '1px solid var(--border)' }}>
                <h3 className="font-bold text-sm mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>Billing Address</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--muted)' }}>Street Address</label>
                    <input type="text" className={inputCls} style={inputStyle} defaultValue="123 Innovation Drive" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--muted)' }}>City</label>
                    <input type="text" className={inputCls} style={inputStyle} defaultValue="San Francisco" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--muted)' }}>State / Province</label>
                    <input type="text" className={inputCls} style={inputStyle} defaultValue="CA" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--muted)' }}>ZIP / Postal Code</label>
                    <input type="text" className={inputCls} style={inputStyle} defaultValue="94107" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--muted)' }}>Country</label>
                    <select className={`${inputCls} cursor-pointer`} style={inputStyle}>
                      <option>United States</option>
                      <option>United Kingdom</option>
                      <option>Nigeria</option>
                      <option>Canada</option>
                      <option>Australia</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button type="submit" className="btn-primary px-6 py-3 rounded-xl text-sm font-bold">
                  <span>Update Billing</span>
                </button>
              </div>
            </form>
          </section>

          {/* ====== 5. PLATFORM PREFERENCES ====== */}
          <section id="settings-platform" className="gd-card p-8">
            <SectionHeader
              id="platform" label="Platform Preferences"
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
                  <option>Spanish (Spain)</option>
                  <option>French (France)</option>
                  <option>German (Germany)</option>
                  <option>Portuguese (Brasil)</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--muted)' }}>Default Currency</label>
                <select className={`${inputCls} cursor-pointer`} style={inputStyle}>
                  <option>USD - US Dollar ($)</option>
                  <option>EUR - Euro (€)</option>
                  <option>GBP - British Pound (£)</option>
                  <option>NGN - Nigerian Naira (₦)</option>
                  <option>CAD - Canadian Dollar (C$)</option>
                  <option>AUD - Australian Dollar (A$)</option>
                </select>
                <p className="text-[11px] mt-2" style={{ color: 'var(--muted)' }}>All project budgets and payments will be displayed in this currency.</p>
              </div>
              <div className="md:col-span-2 flex justify-end">
                <button type="submit" className="btn-primary px-6 py-3 rounded-xl text-sm font-bold">
                  <span>Save Preferences</span>
                </button>
              </div>
            </form>
          </section>

        </div>
      </div>

      {/* ====== TOAST ====== */}
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
        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: 'var(--primary)' }}>
          <Check className="w-4 h-4 text-white" />
        </div>
        <div>
          <div className="text-sm font-bold">{toast.title}</div>
          <div className="text-xs" style={{ color: 'var(--sidebar-text)' }}>{toast.msg}</div>
        </div>
        <button onClick={() => setToast(t => ({ ...t, visible: false }))}
          className="ml-auto opacity-60 hover:opacity-100 transition-opacity">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
