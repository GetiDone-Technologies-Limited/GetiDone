'use client';

import { useState } from 'react';
import { ConversationList } from '@/features/messaging/components/ConversationList';
import { ChatWindow } from '@/features/messaging/components/ChatWindow';
import { useAuthStore } from '@/store/auth.store';
import { MessageSquareDashed } from 'lucide-react';

export default function MessagesPage() {
  const { user } = useAuthStore();
  const [selectedConvId, setSelectedConvId] = useState<string | undefined>();
  const [selectedReceiverId, setSelectedReceiverId] = useState<string>('');

  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-140px)] flex flex-col space-y-4">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900">Messages</h1>
        <p className="text-slate-500 mt-1 font-medium">Communicate securely with your clients and freelancers.</p>
      </div>

      <div className="flex flex-1 rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden min-h-0">
        {/* Left: conversation list */}
        <div className="w-80 border-r border-slate-100 flex flex-col bg-slate-50/50 flex-shrink-0">
          <ConversationList
            selectedId={selectedConvId}
            onSelect={(id) => {
              setSelectedConvId(id);
              setSelectedReceiverId('');
            }}
          />
        </div>
        
        {/* Right: chat */}
        <div className="flex-1 flex flex-col bg-white">
          {selectedConvId && user ? (
            <ChatWindow conversationId={selectedConvId} receiverId={selectedReceiverId} />
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-slate-400 bg-slate-50/30">
              <div className="w-20 h-20 bg-[#00b259]/10 text-[#00b259] rounded-full flex items-center justify-center mb-6 shadow-sm border border-[#00b259]/20">
                <MessageSquareDashed className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Your Messages</h3>
              <p className="text-sm font-medium text-slate-500">Select a conversation from the sidebar to start chatting.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
