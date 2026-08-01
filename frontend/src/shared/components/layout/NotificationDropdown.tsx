'use client';

import { useState, useRef, useEffect } from 'react';
import { Bell, Check, Circle } from 'lucide-react';
import { useNotificationStore } from '@/store/notification.store';

export function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, markAsRead, markAsUnread, markAllAsRead } = useNotificationStore();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Mock notifications if empty
  const displayNotifications = notifications.length > 0 ? notifications : [
    { id: 'n1', title: 'Sarah Kim submitted work', description: 'E-commerce Website Redesign milestone delivered', time: '2 hours ago', read: false },
    { id: 'n2', title: 'Payment released', description: '$1,250 released to Tunde A. for Shopify Store', time: '5 hours ago', read: false },
    { id: 'n3', title: 'New proposal received', description: 'Marcus Lee sent a proposal for Mobile App Development', time: '1 day ago', read: true }
  ] as any[]; // cast to any for mock compat

  const unreadCount = displayNotifications.filter(n => !n.read).length;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-xl btn-ghost flex items-center justify-center lift relative"
      >
        <Bell className="h-5 w-5" style={{ color: 'var(--muted)' }} />
        {unreadCount > 0 && (
          <span className="notif-dot"></span>
        )}
      </button>

      {isOpen && (
        <div 
          className="absolute right-0 top-full mt-2 w-80 rounded-[18px] border shadow-[0_16px_40px_-12px_rgba(15,26,20,0.2)] z-50 overflow-hidden"
          style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
        >
          <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}>
            <h3 className="font-display font-bold text-base" style={{ color: 'var(--text)' }}>Notifications</h3>
            {unreadCount > 0 && (
              <button 
                onClick={markAllAsRead}
                className="text-xs font-semibold hover:opacity-80 transition-opacity"
                style={{ color: 'var(--primary)' }}
              >
                Mark all read
              </button>
            )}
          </div>
          <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
            {displayNotifications.length === 0 ? (
              <div className="p-8 text-center text-sm" style={{ color: 'var(--muted)' }}>No notifications</div>
            ) : (
              displayNotifications.map((notif) => (
                <div 
                  key={notif.id} 
                  className="p-4 border-b hover:bg-[var(--bg-alt)] transition-colors"
                  style={{ 
                    borderColor: 'var(--border)',
                    background: !notif.read ? 'rgba(16,185,129,0.05)' : 'transparent'
                  }}
                >
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex-1">
                      <p className="text-sm" style={{ fontWeight: !notif.read ? 'bold' : '600', color: 'var(--text)' }}>
                        {notif.title}
                      </p>
                      <p className="text-xs mt-0.5 line-clamp-2" style={{ color: 'var(--muted)' }}>{notif.description}</p>
                      <p className="text-[10px] font-medium mt-2" style={{ color: 'var(--muted)', opacity: 0.8 }}>{notif.time}</p>
                    </div>
                    <button 
                      onClick={() => notif.read ? markAsUnread(notif.id) : markAsRead(notif.id)}
                      className="shrink-0 p-1.5 rounded-lg transition-colors hover:bg-[var(--bg-alt)]"
                      style={{ color: 'var(--muted)' }}
                      title={notif.read ? "Mark as unread" : "Mark as read"}
                    >
                      {notif.read ? (
                        <Circle className="w-2 h-2" />
                      ) : (
                        <div className="w-2 h-2 rounded-full" style={{ background: 'var(--primary)' }}></div>
                      )}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
