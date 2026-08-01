'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageSquare, Check, Circle } from 'lucide-react';
import { useMessagingStore } from '@/store/messaging.store';
import { Avatar } from '@/shared/components/ui/Avatar';
import Link from 'next/link';

export function MessageDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { conversations, markAsRead, markAsUnread } = useMessagingStore();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = conversations.reduce((acc, conv) => acc + conv.unreadCount, 0);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAllAsRead = () => {
    conversations.forEach(conv => markAsRead(conv.id));
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-xl btn-ghost flex items-center justify-center lift relative"
      >
        <MessageSquare className="h-5 w-5" style={{ color: 'var(--muted)' }} />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold text-white border-2 border-white" style={{ background: 'var(--primary)' }}>
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div 
          className="absolute right-0 top-full mt-2 w-80 rounded-[18px] border shadow-[0_16px_40px_-12px_rgba(15,26,20,0.2)] z-50 overflow-hidden"
          style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
        >
          <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}>
            <h3 className="font-display font-bold text-base" style={{ color: 'var(--text)' }}>Messages</h3>
            <Link 
              href="/messages"
              onClick={() => setIsOpen(false)}
              className="text-xs font-semibold hover:opacity-80 transition-opacity"
              style={{ color: 'var(--primary)' }}
            >
              View All
            </Link>
          </div>
          <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
            {conversations.length === 0 ? (
              <div className="p-8 text-center text-sm" style={{ color: 'var(--muted)' }}>No messages</div>
            ) : (
              conversations.map((conv) => {
                const isUnread = conv.unreadCount > 0;
                return (
                  <div 
                    key={conv.id} 
                    className="p-4 border-b hover:bg-[var(--bg-alt)] transition-colors"
                    style={{ borderColor: 'var(--border)', background: isUnread ? 'rgba(16,185,129,0.05)' : 'transparent' }}
                  >
                    <div className="flex justify-between items-start gap-3">
                      <Link href="/messages" onClick={() => setIsOpen(false)} className="flex-1 flex gap-3">
                        <div className="relative">
                          <Avatar src={conv.participantAvatar} name={conv.participantName} size="sm" className="w-10 h-10 shrink-0" />
                          {isUnread && (
                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white" style={{ background: 'var(--primary)' }}></span>
                          )}
                        </div>
                        <div>
                          <p className="text-sm" style={{ fontWeight: isUnread ? 'bold' : '600', color: 'var(--text)' }}>
                            {conv.participantName}
                          </p>
                          <p className="text-xs mt-0.5 line-clamp-1" style={{ fontWeight: isUnread ? '600' : 'normal', color: isUnread ? 'var(--text)' : 'var(--muted)' }}>
                            {conv.lastMessage}
                          </p>
                          <p className="text-[10px] font-medium mt-1" style={{ color: 'var(--muted)', opacity: 0.8 }}>{conv.lastMessageTime}</p>
                        </div>
                      </Link>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          if (isUnread) {
                            markAsRead(conv.id);
                          } else {
                            markAsUnread(conv.id);
                          }
                        }}
                        className="shrink-0 p-1.5 rounded-lg transition-colors hover:bg-[var(--bg-alt)]"
                        style={{ color: 'var(--muted)' }}
                        title={isUnread ? "Mark as read" : "Mark as unread"}
                      >
                        {isUnread ? (
                          <div className="w-2 h-2 rounded-full" style={{ background: 'var(--primary)' }}></div>
                        ) : (
                          <Circle className="w-2 h-2" />
                        )}
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          {unreadCount > 0 && (
            <div className="p-3 bg-[var(--bg-alt)] border-t text-center" style={{ borderColor: 'var(--border)' }}>
              <button onClick={markAllAsRead} className="text-xs font-semibold" style={{ color: 'var(--primary)' }}>
                Mark all as read
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
