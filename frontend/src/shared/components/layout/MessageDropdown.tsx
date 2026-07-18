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
        className="relative rounded-full p-2 text-slate-500 hover:bg-slate-100 transition-colors"
      >
        <MessageSquare className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-[#00b259] text-[9px] font-bold text-white border-2 border-white">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 z-50 overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <h3 className="font-bold text-slate-900">Messages</h3>
            {unreadCount > 0 && (
              <button 
                onClick={markAllAsRead}
                className="text-xs font-semibold text-[#00b259] hover:text-[#009b4d]"
              >
                Mark all as read
              </button>
            )}
          </div>
          <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
            {conversations.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-sm">No messages</div>
            ) : (
              conversations.map((conv) => {
                const isUnread = conv.unreadCount > 0;
                return (
                  <div 
                    key={conv.id} 
                    className={`p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors ${isUnread ? 'bg-green-50/30' : ''}`}
                  >
                    <div className="flex justify-between items-start gap-3">
                      <Link href="/messages" onClick={() => setIsOpen(false)} className="flex-1 flex gap-3">
                        <Avatar src={conv.participantAvatar} name={conv.participantName} size="sm" className="w-10 h-10 shrink-0" />
                        <div>
                          <p className={`text-sm ${isUnread ? 'font-bold text-slate-900' : 'font-semibold text-slate-700'}`}>
                            {conv.participantName}
                          </p>
                          <p className={`text-xs mt-0.5 line-clamp-1 ${isUnread ? 'font-semibold text-slate-800' : 'text-slate-500'}`}>
                            {conv.lastMessage}
                          </p>
                          <p className="text-[10px] font-medium text-slate-400 mt-1">{conv.lastMessageTime}</p>
                        </div>
                      </Link>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          isUnread ? markAsRead(conv.id) : markAsUnread(conv.id);
                        }}
                        className="shrink-0 p-1.5 text-slate-400 hover:text-[#00b259] hover:bg-green-50 rounded-lg transition-colors"
                        title={isUnread ? "Mark as read" : "Mark as unread"}
                      >
                        {isUnread ? <Circle className="w-4 h-4 fill-[#00b259] text-[#00b259]" /> : <Check className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          <Link 
            href="/messages"
            onClick={() => setIsOpen(false)}
            className="block p-3 text-center text-sm font-semibold text-slate-600 hover:text-[#00b259] bg-slate-50 border-t border-slate-100 transition-colors"
          >
            View all messages
          </Link>
        </div>
      )}
    </div>
  );
}
