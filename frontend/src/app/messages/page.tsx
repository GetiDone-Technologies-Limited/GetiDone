'use client';

import { useState } from 'react';
import { Navbar } from '@/shared/components/layout/Navbar';
import { ConversationList } from '@/features/messaging/components/ConversationList';
import { ChatWindow } from '@/features/messaging/components/ChatWindow';
import { useAuthStore } from '@/store/auth.store';

export default function MessagesPage() {
  const { user } = useAuthStore();
  const [selectedConvId, setSelectedConvId] = useState<string | undefined>();
  const [selectedReceiverId, setSelectedReceiverId] = useState<string>('');

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="mx-auto max-w-6xl px-4 py-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Messages</h1>
        <div className="flex rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden" style={{ height: '70vh' }}>
          {/* Left: conversation list */}
          <div className="w-80 border-r border-slate-100 overflow-y-auto flex-shrink-0">
            <ConversationList
              selectedId={selectedConvId}
              onSelect={(id) => {
                setSelectedConvId(id);
                // receiverId resolved from conversation; placeholder for now
                setSelectedReceiverId('');
              }}
            />
          </div>
          {/* Right: chat */}
          <div className="flex-1">
            {selectedConvId && user ? (
              <ChatWindow conversationId={selectedConvId} receiverId={selectedReceiverId} />
            ) : (
              <div className="flex h-full items-center justify-center text-slate-400 text-sm">
                Select a conversation to start chatting
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

