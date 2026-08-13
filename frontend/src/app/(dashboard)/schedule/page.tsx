'use client';

import { useState, useRef } from 'react';
import {
  ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, Clock,
  Check, X, Link as LinkIcon, AlertCircle, Sparkles, CheckCircle2,
  Globe, RefreshCw, ExternalLink, Download, ShieldCheck, Bell, Radio
} from 'lucide-react';

/* ==================== TYPES & CONFIG ==================== */
type EventType = 'meeting' | 'deadline' | 'milestone' | 'personal';

interface CalendarEvent {
  id: number;
  title: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  type: EventType;
  project?: string;
  googleSynced?: boolean;
}

interface ToastState {
  title: string;
  msg: string;
  visible: boolean;
}

interface TimezoneOption {
  code: string;
  label: string;
  offset: number; // offset in hours relative to UTC
}

const timezones: TimezoneOption[] = [
  { code: 'PST', label: 'Pacific Time (UTC-8)', offset: -8 },
  { code: 'EST', label: 'Eastern Time (UTC-5)', offset: -5 },
  { code: 'GMT', label: 'Greenwich Mean Time (UTC+0)', offset: 0 },
  { code: 'CET', label: 'Central European Time (UTC+1)', offset: 1 },
  { code: 'WAT', label: 'West Africa Time (UTC+1 / Lagos)', offset: 1 },
  { code: 'JST', label: 'Japan Standard Time (UTC+9)', offset: 9 },
  { code: 'AEST', label: 'Australian Eastern Time (UTC+10)', offset: 10 },
];

const eventTypeConfig: Record<EventType, { bg: string; text: string; label: string; dotColor: string }> = {
  meeting: { bg: 'rgba(16,185,129,0.15)', text: 'var(--primary)', label: 'Meeting', dotColor: '#10B981' },
  deadline: { bg: 'rgba(239,68,68,0.15)', text: 'var(--danger)', label: 'Deadline', dotColor: '#EF4444' },
  milestone: { bg: 'rgba(132,204,22,0.15)', text: 'var(--accent)', label: 'Milestone', dotColor: '#84CC16' },
  personal: { bg: 'rgba(20,184,166,0.15)', text: 'var(--secondary)', label: 'Personal', dotColor: '#14B8A6' },
};

/* ==================== COMPONENT ==================== */
export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEventType, setSelectedEventType] = useState<EventType>('meeting');
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [toastState, setToastState] = useState<ToastState>({ title: '', msg: '', visible: false });
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Google Calendar & Timezone State
  const [isGoogleConnected, setIsGoogleConnected] = useState(true);
  const [lastSyncedTime, setLastSyncedTime] = useState('2 minutes ago');
  const [isSyncing, setIsSyncing] = useState(false);
  const [selectedTz, setSelectedTz] = useState<TimezoneOption>(timezones[1]); // Default EST (UTC-5)

  // Sync Preferences
  const [syncPreferences, setSyncPreferences] = useState({
    deadlines: true,
    milestones: true,
    meetings: true,
    escrowAlerts: true,
    autoReminders: true,
  });

  // Form State
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('09:00');
  const [eventProject, setEventProject] = useState('');

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Initial Events with Google Sync Status
  const [events, setEvents] = useState<CalendarEvent[]>([
    { id: 1, title: 'Team Standup', date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-12`, time: '09:00', type: 'meeting', project: 'E-commerce Redesign', googleSynced: true },
    { id: 2, title: 'Logo Concepts Review', date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-15`, time: '14:30', type: 'milestone', project: 'Brand Identity Design', googleSynced: true },
    { id: 3, title: 'SEO Audit Due', date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-18`, time: '17:00', type: 'deadline', project: 'SEO Optimization', googleSynced: true },
    { id: 4, title: 'Client Demo', date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-20`, time: '11:00', type: 'meeting', project: 'Mobile App Development', googleSynced: true },
    { id: 5, title: 'Gym Session', date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-22`, time: '18:00', type: 'personal', googleSynced: false },
    { id: 6, title: 'API Integration Complete', date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-28`, time: '12:00', type: 'milestone', project: 'E-commerce Redesign', googleSynced: true },
  ]);

  const showToast = (title: string, msg: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToastState({ title, msg, visible: true });
    toastTimer.current = setTimeout(() => setToastState(t => ({ ...t, visible: false })), 3200);
  };

  const changeMonth = (dir: number) => {
    setCurrentDate(new Date(currentYear, currentMonth + dir, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
    showToast('Calendar', 'Jumped to today');
  };

  const handleManualGoogleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setLastSyncedTime('Just now');
      setEvents(prev => prev.map(e => ({ ...e, googleSynced: true })));
      showToast('Google Calendar Synced', `All ${events.length} events synced across ${selectedTz.code} timezone`);
    }, 1200);
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitle || !eventDate) {
      showToast('Error', 'Please enter title and date');
      return;
    }

    const newEv: CalendarEvent = {
      id: Date.now(),
      title: eventTitle,
      date: eventDate,
      time: eventTime || '09:00',
      type: selectedEventType,
      project: eventProject || undefined,
      googleSynced: isGoogleConnected,
    };

    setEvents(prev => [...prev, newEv]);
    setEventTitle('');
    setEventDate('');
    setEventTime('09:00');
    setEventProject('');
    setIsModalOpen(false);

    showToast(
      'Event Created',
      isGoogleConnected
        ? `${eventTitle} added & synced with Google Calendar (${selectedTz.code})`
        : `${eventTitle} added to your local calendar`
    );

    // Change month to created event's date
    const d = new Date(eventDate);
    setCurrentDate(new Date(d.getFullYear(), d.getMonth(), 1));
  };

  // Calendar Grid Calculation
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const firstDay = new Date(currentYear, currentMonth, 1).getDay(); // 0 = Sun
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();
  const offset = firstDay === 0 ? 6 : firstDay - 1; // Mon = first day

  const todayObj = new Date();
  const isCurrentMonth = todayObj.getMonth() === currentMonth && todayObj.getFullYear() === currentYear;

  // Upcoming events
  const now = new Date();
  const upcomingEvents = [...events]
    .filter(e => new Date(e.date) >= new Date(now.getFullYear(), now.getMonth(), now.getDate()))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6 pb-8">
      {/* Page Header */}
      <div className="flex items-end justify-between flex-wrap gap-4 fade-up">
        <div>
          <div className="flex items-center gap-1.5 text-xs mb-2" style={{ color: 'var(--muted)' }}>
            <span className="hover:text-emerald-600 cursor-pointer transition-colors">Dashboard</span>
            <ChevronRight className="w-3 h-3" />
            <span className="font-semibold" style={{ color: 'var(--text)' }}>Calendar</span>
          </div>
          <h1 className="font-extrabold text-4xl tracking-tight" style={{ fontFamily: "'Sora', sans-serif", color: 'var(--text)' }}>
            Calendar & Schedule<span style={{ color: 'var(--primary)' }}>.</span>
          </h1>
          <p className="text-sm mt-1.5" style={{ color: 'var(--muted)' }}>
            Manage meetings, deadlines, and milestones synced with Google Calendar and timezones.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Timezone Selector */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[var(--bg-alt)] border border-[var(--border)]">
            <Globe className="w-4 h-4 text-[var(--primary)]" />
            <select
              value={selectedTz.code}
              onChange={(e) => {
                const tz = timezones.find(t => t.code === e.target.value) || timezones[1];
                setSelectedTz(tz);
                showToast('Timezone Updated', `Displaying all project deadlines in ${tz.label}`);
              }}
              className="bg-transparent text-xs font-bold outline-none cursor-pointer text-[var(--text)]"
            >
              {timezones.map(t => (
                <option key={t.code} value={t.code}>{t.code} ({t.label.split(' ')[0]})</option>
              ))}
            </select>
          </div>

          {/* Google Sync Button */}
          <button
            onClick={() => setIsSyncModalOpen(true)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all border ${
              isGoogleConnected
                ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30 hover:bg-emerald-500/20'
                : 'btn-ghost'
            }`}
          >
            <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-500" />
            <span>Google Sync: {isGoogleConnected ? 'Active' : 'Off'}</span>
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-primary px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create Event</span>
          </button>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 fade-up">
        {/* Left: Main Calendar View (2 Cols) */}
        <div className="lg:col-span-2 gd-card overflow-hidden flex flex-col min-h-[560px]">
          {/* Calendar Header Controls */}
          <div className="p-5 border-b flex items-center justify-between flex-wrap gap-3" style={{ borderColor: 'var(--border)' }}>
            <div className="flex items-center gap-3">
              <h2 className="font-extrabold text-xl" style={{ fontFamily: "'Sora', sans-serif", color: 'var(--text)' }}>
                {monthNames[currentMonth]} {currentYear}
              </h2>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => changeMonth(-1)}
                  className="btn-ghost w-8 h-8 rounded-lg flex items-center justify-center text-xs"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => changeMonth(1)}
                  className="btn-ghost w-8 h-8 rounded-lg flex items-center justify-center text-xs"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={goToToday}
                className="btn-ghost px-3 py-1.5 rounded-lg text-xs font-bold"
              >
                Today
              </button>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-[var(--bg-alt)] text-[var(--muted)] flex items-center gap-1">
                <Clock className="w-3 h-3 text-[var(--primary)]" /> Timezone: {selectedTz.code}
              </span>

              <div className="flex bg-[var(--bg-alt)] p-1 rounded-xl">
                {(['month', 'week', 'day'] as const).map(mode => (
                  <button
                    key={mode}
                    onClick={() => {
                      setViewMode(mode);
                      showToast('View Switch', `Switched to ${mode} view`);
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-bold capitalize transition-all ${
                      viewMode === mode
                        ? 'bg-white text-[var(--primary)] shadow-sm'
                        : 'text-[var(--muted)] hover:text-[var(--text)]'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Weekday Labels Header */}
          <div className="grid grid-cols-7 border-b text-center" style={{ borderColor: 'var(--border)', background: 'var(--bg-alt)' }}>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <div key={day} className="py-2.5 text-[11px] font-bold uppercase tracking-wider" style={{ color: 'var(--muted)' }}>
                {day}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 flex-1 auto-rows-fr">
            {/* Prev month days */}
            {Array.from({ length: offset }).map((_, idx) => {
              const dayNum = daysInPrevMonth - offset + idx + 1;
              return (
                <div key={`prev-${idx}`} className="p-2 border-r border-b text-[var(--soft)] bg-[var(--bg-alt)] min-h-[90px]" style={{ borderColor: 'var(--border)' }}>
                  <div className="text-xs font-bold w-7 h-7 flex items-center justify-center rounded-full opacity-60">
                    {dayNum}
                  </div>
                </div>
              );
            })}

            {/* Current month days */}
            {Array.from({ length: daysInMonth }).map((_, idx) => {
              const dayNum = idx + 1;
              const isToday = isCurrentMonth && dayNum === todayObj.getDate();
              const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
              const dayEvents = events.filter(e => e.date === dateStr);

              return (
                <div
                  key={`day-${dayNum}`}
                  onClick={() => {
                    setEventDate(dateStr);
                    setIsModalOpen(true);
                  }}
                  className={`p-2 border-r border-b cursor-pointer transition-all hover:bg-[var(--bg-alt)] min-h-[90px] flex flex-col gap-1 ${
                    isToday ? 'bg-[rgba(16,185,129,0.03)]' : ''
                  }`}
                  style={{ borderColor: 'var(--border)' }}
                >
                  <div
                    className={`text-xs font-bold w-7 h-7 flex items-center justify-center rounded-full ${
                      isToday
                        ? 'bg-[var(--primary)] text-white shadow-md shadow-[var(--primary)]/30'
                        : 'text-[var(--text)]'
                    }`}
                  >
                    {dayNum}
                  </div>

                  <div className="space-y-1 overflow-hidden">
                    {dayEvents.slice(0, 3).map(e => {
                      const cfg = eventTypeConfig[e.type];
                      return (
                        <div
                          key={e.id}
                          onClick={(evt) => {
                            evt.stopPropagation();
                            showToast(e.title, `${e.date} at ${e.time} (${selectedTz.code}) · ${e.project || cfg.label}`);
                          }}
                          className="px-2 py-0.5 rounded text-[10px] font-semibold flex items-center gap-1 truncate transition-transform hover:scale-[1.02]"
                          style={{ background: cfg.bg, color: cfg.text }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: cfg.dotColor }}></span>
                          <span className="truncate">{e.time} {e.title}</span>
                          {e.googleSynced && (
                            <span title="Synced with Google Calendar" className="ml-auto flex-shrink-0">
                              <Sparkles className="w-2.5 h-2.5 text-emerald-500" />
                            </span>
                          )}
                        </div>
                      );
                    })}
                    {dayEvents.length > 3 && (
                      <div className="text-[10px] font-bold text-[var(--muted)] px-1 hover:text-[var(--primary)]">
                        +{dayEvents.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Side Panel */}
        <div className="space-y-6 flex flex-col">
          {/* Google Sync Status Box */}
          <div className="gd-card p-5 bg-gradient-to-br from-[#0A0F0D] to-[#131A16] text-white">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  G
                </div>
                <div>
                  <h3 className="font-bold text-sm" style={{ fontFamily: "'Sora', sans-serif" }}>Google Calendar Sync</h3>
                  <p className="text-[11px] text-slate-400">Timezone: {selectedTz.label}</p>
                </div>
              </div>
              <button
                onClick={handleManualGoogleSync}
                disabled={isSyncing}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all text-emerald-400"
                title="Sync Now"
              >
                <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
              </button>
            </div>

            <div className="flex items-center justify-between text-xs pt-2 border-t border-white/10">
              <span className="text-slate-400">Status: <span className="text-emerald-400 font-bold">Connected</span></span>
              <span className="text-slate-400">Last sync: {lastSyncedTime}</span>
            </div>
          </div>

          {/* Mini Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="gd-card p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: 'var(--muted)' }}>EVENTS TODAY</span>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(16,185,129,0.12)', color: 'var(--primary)' }}>
                  <CalendarIcon className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-extrabold" style={{ fontFamily: "'Sora', sans-serif" }}>3</div>
              <div className="text-[11px] mt-1" style={{ color: 'var(--soft)' }}>2 meetings, 1 deadline</div>
            </div>

            <div className="gd-card p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: 'var(--muted)' }}>THIS WEEK</span>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(20,184,166,0.12)', color: 'var(--secondary)' }}>
                  <Clock className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-extrabold" style={{ fontFamily: "'Sora', sans-serif" }}>12</div>
              <div className="text-[11px] mt-1" style={{ color: 'var(--soft)' }}>Scheduled items</div>
            </div>
          </div>

          {/* Upcoming Events List */}
          <div className="gd-card p-5 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-base" style={{ fontFamily: "'Sora', sans-serif" }}>Upcoming Events</h3>
                <button
                  onClick={() => showToast('Events', 'Viewing all upcoming schedule items')}
                  className="text-[11px] font-semibold hover:underline"
                  style={{ color: 'var(--primary)' }}
                >
                  View All
                </button>
              </div>

              <div className="space-y-3">
                {upcomingEvents.length === 0 ? (
                  <div className="text-center py-8">
                    <CalendarIcon className="w-8 h-8 mx-auto mb-2 text-[var(--soft)]" />
                    <p className="text-xs font-semibold" style={{ color: 'var(--muted)' }}>No upcoming events</p>
                  </div>
                ) : (
                  upcomingEvents.map((e) => {
                    const cfg = eventTypeConfig[e.type];
                    const d = new Date(e.date);
                    return (
                      <div
                        key={e.id}
                        onClick={() => showToast(e.title, `${e.date} at ${e.time} (${selectedTz.code})`)}
                        className="p-3 rounded-xl bg-[var(--bg-alt)] border border-transparent hover:border-[var(--primary)] hover:-translate-y-0.5 transition-all cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="flex flex-col items-center justify-center w-11 h-11 rounded-xl flex-shrink-0"
                            style={{ background: cfg.bg, color: cfg.text }}
                          >
                            <span className="text-[9px] font-bold uppercase">{monthNames[d.getMonth()].slice(0, 3)}</span>
                            <span className="text-base font-extrabold leading-none" style={{ fontFamily: "'Sora', sans-serif" }}>{d.getDate()}</span>
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-bold truncate flex items-center gap-1.5">
                              <span>{e.title}</span>
                              {e.googleSynced && (
                                <span title="Google Synced" className="flex-shrink-0">
                                  <Sparkles className="w-3 h-3 text-emerald-500" />
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] mt-0.5 flex items-center gap-2" style={{ color: 'var(--muted)' }}>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3 text-[var(--soft)]" /> {e.time} ({selectedTz.code})
                              </span>
                              {e.project && (
                                <span className="truncate flex items-center gap-1">
                                  <LinkIcon className="w-3 h-3 text-[var(--soft)]" /> {e.project}
                                </span>
                              )}
                            </div>
                          </div>

                          <span
                            className="text-[10px] font-bold px-2 py-0.5 rounded-md flex-shrink-0"
                            style={{ background: cfg.bg, color: cfg.text }}
                          >
                            {cfg.label}
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Google Calendar Sync Settings Modal */}
      {isSyncModalOpen && (
        <div
          className="modal-backdrop active"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsSyncModalOpen(false);
          }}
        >
          <div className="modal-content p-7">
            <div className="flex items-start justify-between mb-5">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center font-black text-white bg-emerald-500">
                    G
                  </div>
                  <div className="getidone-text text-sm dark"><span className="geti">Geti</span><span className="done">Done</span></div>
                </div>
                <div className="text-[11px] font-bold tracking-widest uppercase mb-1" style={{ color: 'var(--primary)' }}>GOOGLE CALENDAR INTEGRATION</div>
                <h2 className="font-extrabold text-2xl" style={{ fontFamily: "'Sora', sans-serif" }}>Google Calendar & Timezone Sync</h2>
                <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>Automatically sync deadlines, milestones, and meetings across timezones.</p>
              </div>
              <button
                onClick={() => setIsSyncModalOpen(false)}
                className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Connected Account */}
              <div className="p-4 rounded-2xl bg-[var(--bg-alt)] border border-[var(--border)] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-600 flex items-center justify-center font-bold">
                    G
                  </div>
                  <div>
                    <div className="text-sm font-bold flex items-center gap-1.5">
                      <span>john.carter@gmail.com</span>
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    </div>
                    <div className="text-xs text-[var(--muted)]">Status: Connected & Auto-syncing</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsGoogleConnected(!isGoogleConnected);
                    showToast(isGoogleConnected ? 'Disconnected' : 'Connected', isGoogleConnected ? 'Google Calendar sync paused' : 'Google Calendar connected');
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                    isGoogleConnected ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100' : 'btn-primary'
                  }`}
                >
                  {isGoogleConnected ? 'Disconnect' : 'Connect'}
                </button>
              </div>

              {/* Primary Timezone Setting */}
              <div>
                <label className="text-xs font-bold tracking-wider mb-1.5 block uppercase" style={{ color: 'var(--muted)' }}>
                  PRIMARY SYNC TIMEZONE
                </label>
                <div className="relative">
                  <Globe className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--primary)]" />
                  <select
                    value={selectedTz.code}
                    onChange={(e) => {
                      const tz = timezones.find(t => t.code === e.target.value) || timezones[1];
                      setSelectedTz(tz);
                    }}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border focus:outline-none cursor-pointer"
                    style={{ borderColor: 'var(--border)', background: 'var(--bg-alt)' }}
                  >
                    {timezones.map(t => (
                      <option key={t.code} value={t.code}>{t.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Notification Sync Preferences */}
              <div>
                <label className="text-xs font-bold tracking-wider mb-2 block uppercase" style={{ color: 'var(--muted)' }}>
                  AUTOMATICALLY SYNC TO GOOGLE CALENDAR
                </label>
                <div className="space-y-2">
                  {[
                    { key: 'deadlines', label: 'Project Deadlines & Deliverable Dates' },
                    { key: 'milestones', label: 'Milestone Review & Escrow Release Days' },
                    { key: 'meetings', label: 'Team Standups & Client Video Calls' },
                    { key: 'autoReminders', label: 'Google Push Notifications (15m before event)' },
                  ].map(pref => (
                    <label key={pref.key} className="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-alt)] border border-[var(--border)] cursor-pointer hover:border-[var(--primary)] transition-colors">
                      <input
                        type="checkbox"
                        checked={(syncPreferences as any)[pref.key]}
                        onChange={(e) => setSyncPreferences(p => ({ ...p, [pref.key]: e.target.checked }))}
                        className="rounded text-emerald-500 focus:ring-emerald-400 w-4 h-4"
                      />
                      <span className="text-xs font-semibold" style={{ color: 'var(--text)' }}>{pref.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Feed Link / ICS Export */}
              <div className="pt-2">
                <label className="text-xs font-bold tracking-wider mb-1.5 block uppercase" style={{ color: 'var(--muted)' }}>
                  ICAL / WEBCAL SUBSCRIPTION LINK
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value="webcal://getidone.io/calendar/feed.ics?token=usr_7f8a92"
                    className="flex-1 px-3 py-2 rounded-xl text-xs font-mono border"
                    style={{ borderColor: 'var(--border)', background: 'var(--bg-alt)' }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText('webcal://getidone.io/calendar/feed.ics?token=usr_7f8a92');
                      showToast('Copied!', 'iCal subscription URL copied to clipboard');
                    }}
                    className="btn-ghost px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1"
                  >
                    Copy Link
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsSyncModalOpen(false)}
                  className="flex-1 btn-ghost py-3 rounded-xl text-sm font-bold"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleManualGoogleSync();
                    setIsSyncModalOpen(false);
                  }}
                  className="flex-1 btn-primary py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Sync Now</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Event Modal */}
      {isModalOpen && (
        <div
          className="modal-backdrop active"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsModalOpen(false);
          }}
        >
          <div className="modal-content p-7">
            <div className="flex items-start justify-between mb-5">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #10B981, #34D399)' }}>
                    <CalendarIcon className="w-4 h-4 text-white" />
                  </div>
                  <div className="getidone-text text-sm dark"><span className="geti">Geti</span><span className="done">Done</span></div>
                </div>
                <div className="text-[11px] font-bold tracking-widest uppercase mb-1" style={{ color: 'var(--primary)' }}>SCHEDULE</div>
                <h2 className="font-extrabold text-2xl" style={{ fontFamily: "'Sora', sans-serif" }}>Create New Event</h2>
                <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>Add a meeting, deadline, or milestone to your calendar.</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateEvent} className="space-y-4">
              <div>
                <label className="text-xs font-bold tracking-wider mb-1.5 block uppercase" style={{ color: 'var(--muted)' }}>EVENT TITLE</label>
                <input
                  type="text"
                  placeholder="e.g. Design Review Meeting"
                  value={eventTitle}
                  onChange={e => setEventTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:border-emerald-400"
                  style={{ borderColor: 'var(--border)', background: 'var(--bg-alt)' }}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold tracking-wider mb-1.5 block uppercase" style={{ color: 'var(--muted)' }}>DATE</label>
                  <input
                    type="date"
                    value={eventDate}
                    onChange={e => setEventDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none"
                    style={{ borderColor: 'var(--border)', background: 'var(--bg-alt)' }}
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold tracking-wider mb-1.5 block uppercase" style={{ color: 'var(--muted)' }}>TIME ({selectedTz.code})</label>
                  <input
                    type="time"
                    value={eventTime}
                    onChange={e => setEventTime(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none"
                    style={{ borderColor: 'var(--border)', background: 'var(--bg-alt)' }}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold tracking-wider mb-1.5 block uppercase" style={{ color: 'var(--muted)' }}>EVENT TYPE</label>
                <div className="grid grid-cols-4 gap-2">
                  {(['meeting', 'deadline', 'milestone', 'personal'] as const).map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setSelectedEventType(type)}
                      className={`p-2.5 rounded-xl border-2 text-xs font-semibold capitalize flex items-center gap-1.5 transition-all ${
                        selectedEventType === type
                          ? 'border-[var(--primary)] bg-[rgba(16,185,129,0.05)] text-[var(--primary)]'
                          : 'border-[var(--border)] text-[var(--muted)]'
                      }`}
                    >
                      <span className="w-2.5 h-2.5 rounded-full" style={{ background: eventTypeConfig[type].dotColor }} />
                      <span className="truncate">{type}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold tracking-wider mb-1.5 block uppercase" style={{ color: 'var(--muted)' }}>LINK TO PROJECT (OPTIONAL)</label>
                <select
                  value={eventProject}
                  onChange={e => setEventProject(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none appearance-none cursor-pointer"
                  style={{ borderColor: 'var(--border)', background: 'var(--bg-alt)' }}
                >
                  <option value="">None</option>
                  <option value="E-commerce Website Redesign">E-commerce Website Redesign</option>
                  <option value="Mobile App Development">Mobile App Development</option>
                  <option value="Brand Identity Package">Brand Identity Package</option>
                  <option value="SEO Optimization Campaign">SEO Optimization Campaign</option>
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 btn-ghost py-3 rounded-xl text-sm font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 btn-primary py-3 rounded-xl text-sm font-bold"
                >
                  Add Event & Sync
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
          transform: toastState.visible ? 'translateX(0)' : 'translateX(140%)',
        }}
      >
        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'var(--primary)' }}>
          <Check className="w-4 h-4 text-white" />
        </div>
        <div>
          <div className="text-sm font-bold">{toastState.title}</div>
          <div className="text-xs" style={{ color: 'var(--sidebar-text)' }}>{toastState.msg}</div>
        </div>
        <button
          onClick={() => setToastState(t => ({ ...t, visible: false }))}
          className="ml-auto opacity-60 hover:opacity-100 transition-opacity"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
