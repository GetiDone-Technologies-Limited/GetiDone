'use client';

import { useState, useRef, useEffect } from 'react';
import { useMessages, useSendMessage } from '../hooks/useMessaging';
import { MessageBubble } from './MessageBubble';
import { LoadingSpinner } from '@/shared/components/feedback/LoadingSpinner';
import { Button } from '@/shared/components/ui/Button';
import { useAuthStore } from '@/store/auth.store';

interface ChatWindowProps {
  conversationId: string;
  receiverId: string;
}

export function ChatWindow({ conversationId, receiverId }: ChatWindowProps) {
  const { user } = useAuthStore();
  const { data: messages, isLoading } = useMessages(conversationId);
  const sendMessage = useSendMessage();
  const [text, setText] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    await sendMessage.mutateAsync({ conversationId, content: text.trim(), receiverId });
    setText('');
  };

  if (isLoading) return <LoadingSpinner size="md" />;

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages?.map((msg) => (
          <MessageBubble key={msg.id} message={msg} isOwn={msg.senderId === user?.id} />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="border-t border-slate-200 p-3 flex gap-2">
        <input
          type="text"
          placeholder="Type a message…"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:outline-none"
        />
        <Button
          type="submit"
          size="sm"
          loading={sendMessage.isPending}
          disabled={!text.trim()}
        >
          Send
        </Button>
      </form>
    </div>
  );
}

