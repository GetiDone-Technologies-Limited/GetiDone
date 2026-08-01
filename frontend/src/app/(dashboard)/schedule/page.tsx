'use client';

import { useState, useRef } from 'react';
import {
  ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, Clock,
  Check, X, Link as LinkIcon, AlertCircle, Sparkles, CheckCircle2
} from 'lucide-react';

/* ==================== TYPES & CONFIG ==================== */
type EventType = 'meeting' | 'deadline' | 'milestone' | 'personal';

interface CalendarEvent {
  id: number;
  title: string;
  date: string; // YYYY-MM-DD
  time: string;
  type: EventType;
  project?: string;
}

interface ToastState {
  title: string;
  msg: string;
  visible: boolean;
}

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
  const [toastState, setToastState] = useState<ToastState>({ title: '', msg: '', visible: false });
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Form State
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('09:00');
  const [eventProject, setEventProject] = useState('');

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Initial Events
  const [events, setEvents] = useState<CalendarEvent[]>([
    { id: 1, title: 'Team Standup', date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-12`, time: '09:00', type: 'meeting', project: 'E-commerce Redesign' },
    { id: 2, title: 'Logo Concepts Review', date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-15`, time: '14:30', type: 'milestone', project: 'Brand Identity Design' },
    { id: 3, title: 'SEO Audit Due', date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-18`, time: '17:00', type: 'deadline', project: 'SEO Optimization' },
    { id: 4, title: 'Client Demo', date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-20`, time: '11:00', type: 'meeting', project: 'Mobile App Development' },
    { id: 5, title: 'Gym Session', date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-22`, time: '18:00', type: 'personal' },
    { id: 6, title: 'API Integration Complete', date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-28`, time: '12:00', type: 'milestone', project: 'E-commerce Redesign' },
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
    };

    setEvents(prev => [...prev, newEv]);
    setEventTitle('');
    setEventDate('');
    setEventTime('09:00');
    setEventProject('');
    setIsModalOpen(false);
    showToast('Event Created', `${eventTitle} added to your calendar`);

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
            Manage meetings, deadlines, and milestones across projects.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-primary px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Create Event</span>
        </button>
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
                            showToast(e.title, `${e.date} at ${e.time} · ${e.project || cfg.label}`);
                          }}
                          className="px-2 py-0.5 rounded text-[10px] font-semibold flex items-center gap-1 truncate transition-transform hover:scale-[1.02]"
                          style={{ background: cfg.bg, color: cfg.text }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: cfg.dotColor }}></span>
                          <span className="truncate">{e.time} {e.title}</span>
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
                        onClick={() => showToast(e.title, `${e.date} at ${e.time}`)}
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
                            <div className="text-sm font-bold truncate">{e.title}</div>
                            <div className="text-[11px] mt-0.5 flex items-center gap-2" style={{ color: 'var(--muted)' }}>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3 text-[var(--soft)]" /> {e.time}
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
                  <label className="text-xs font-bold tracking-wider mb-1.5 block uppercase" style={{ color: 'var(--muted)' }}>TIME</label>
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
                  Add Event
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
