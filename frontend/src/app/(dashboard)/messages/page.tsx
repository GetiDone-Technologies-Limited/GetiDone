'use client';

import { useState } from 'react';
import { ConversationList } from '@/features/messaging/components/ConversationList';
import { ChatWindow } from '@/features/messaging/components/ChatWindow';
import { useAuthStore } from '@/store/auth.store';
import { Search, HelpCircle, Bell, ChevronDown, MessageSquareDashed } from 'lucide-react';
import Image from 'next/image';

export default function MessagesPage() {
  const { user } = useAuthStore();
  const [selectedConvId, setSelectedConvId] = useState<string | undefined>();
  const [selectedReceiverId, setSelectedReceiverId] = useState<string>('');

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between mb-4">
        <div className="relative flex-1 max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--soft)]" />
          <input 
            type="text" 
            placeholder="Search messages, files, freelancers..." 
            className="w-full pl-11 pr-4 py-2.5 rounded-xl text-sm outline-none transition-all focus:bg-[var(--card)] focus:border-[var(--primary)]"
            style={{ backgroundColor: 'var(--bg-alt)', border: '1px solid transparent' }} 
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] px-1.5 py-0.5 rounded border" style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}>⌘K</kbd>
        </div>
        <div className="flex items-center gap-3 ml-6">
          <button className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform hover:-translate-y-px" style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', color: 'var(--text)' }}>
            <HelpCircle className="w-4 h-4" />
          </button>
          <button className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform hover:-translate-y-px relative" style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', color: 'var(--text)' }}>
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--primary)', border: '2px solid var(--card)' }}></span>
          </button>
          <div className="w-px h-8" style={{ backgroundColor: 'var(--border)' }}></div>
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-xl transition-transform hover:-translate-y-px">
            {user?.photoURL ? (
              <img src={user.photoURL} className="w-8 h-8 rounded-full object-cover" alt="Profile" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                {user?.displayName?.[0] || 'U'}
              </div>
            )}
            <ChevronDown className="w-3 h-3" style={{ color: 'var(--muted)' }} />
          </button>
        </div>
      </header>

      {/* Chat Container */}
      <div className="flex-1 flex rounded-[18px] overflow-hidden border min-h-0" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--card)' }}>
        {/* Left: conversation list panel */}
        <div className="w-[340px] flex-shrink-0 border-r flex flex-col" style={{ borderColor: 'var(--border)' }}>
          <div className="p-5 border-b" style={{ borderColor: 'var(--border)' }}>
            <h2 className="text-2xl font-extrabold" style={{ fontFamily: "'Sora', sans-serif" }}>Messages</h2>
            <div className="mt-4 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3 h-3" style={{ color: 'var(--soft)' }} />
              <input type="text" placeholder="Search conversations..." className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none transition-all focus:bg-[var(--card)] focus:border-[var(--primary)]" style={{ backgroundColor: 'var(--bg-alt)', border: '1px solid transparent' }} />
            </div>
          </div>
          
          <div className="flex gap-2 px-5 pt-3 border-b" style={{ borderColor: 'var(--border)' }}>
            <div className="py-2 px-3 text-xs font-bold cursor-pointer border-b-2 flex items-center gap-1.5 -mb-[1px]" style={{ color: 'var(--primary)', borderColor: 'var(--primary)' }}>All</div>
            <div className="py-2 px-3 text-xs font-bold cursor-pointer border-b-2 flex items-center gap-1.5 -mb-[1px] border-transparent transition-colors hover:text-[var(--text)]" style={{ color: 'var(--muted)' }}>
              Unread
              <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded-full" style={{ backgroundColor: 'var(--primary)', color: 'white' }}>3</span>
            </div>
            <div className="py-2 px-3 text-xs font-bold cursor-pointer border-b-2 flex items-center gap-1.5 -mb-[1px] border-transparent transition-colors hover:text-[var(--text)]" style={{ color: 'var(--muted)' }}>Starred</div>
            <div className="py-2 px-3 text-xs font-bold cursor-pointer border-b-2 flex items-center gap-1.5 -mb-[1px] border-transparent transition-colors hover:text-[var(--text)]" style={{ color: 'var(--muted)' }}>Groups</div>
          </div>
          
          <div className="flex-1 overflow-y-auto overflow-x-hidden min-h-0">
             <ConversationList
                selectedId={selectedConvId}
                onSelect={(id) => {
                  setSelectedConvId(id);
                  setSelectedReceiverId('');
                }}
              />
          </div>
        </div>
        
        {/* Right: chat window */}
        <div className="flex-1 flex flex-col" style={{ backgroundColor: 'var(--bg-alt)' }}>
          {selectedConvId && user ? (
            <ChatWindow conversationId={selectedConvId} receiverId={selectedReceiverId} />
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-slate-400 bg-[var(--bg-alt)]">
              <div className="w-20 h-20 rounded-[16px] flex items-center justify-center mb-6" style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}>
                <MessageSquareDashed className="w-8 h-8" style={{ color: 'var(--primary)' }} />
              </div>
              <h3 className="text-lg font-extrabold mb-1" style={{ color: 'var(--text)', fontFamily: "'Sora', sans-serif" }}>Your Messages</h3>
              <p className="text-sm font-medium" style={{ color: 'var(--muted)' }}>Select a conversation to start chatting.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
