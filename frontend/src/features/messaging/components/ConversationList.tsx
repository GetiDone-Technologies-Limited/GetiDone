'use client';

import { useConversations } from '../hooks/useMessaging';
import { Avatar } from '@/shared/components/ui/Avatar';
import { LoadingSpinner } from '@/shared/components/feedback/LoadingSpinner';
import { EmptyState } from '@/shared/components/feedback/EmptyState';
import { formatRelativeTime, truncate } from '@/shared/lib/utils';
import { useAuthStore } from '@/store/auth.store';

interface ConversationListProps {
  selectedId?: string;
  onSelect: (id: string) => void;
}

export function ConversationList({ selectedId, onSelect }: ConversationListProps) {
  const { data: conversations, isLoading } = useConversations();
  const { user } = useAuthStore();

  if (isLoading) return <LoadingSpinner size="sm" />;
  if (!conversations?.length) return <EmptyState title="No conversations yet" description="Start chatting with a client or freelancer." />;

  return (
    <ul className="divide-y divide-slate-100">
      {conversations.map((conv) => {
        const other = conv.participants.find((p) => p.id !== user?.id);
        const isSelected = conv.id === selectedId;
        return (
          <li key={conv.id}>
            <button
              onClick={() => onSelect(conv.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                isSelected ? 'bg-violet-50' : 'hover:bg-slate-50'
              }`}
            >
              <Avatar src={other?.avatarUrl} name={other?.name ?? ''} size="md" />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm font-semibold text-slate-900 truncate">{other?.name}</span>
                  {conv.lastMessage && (
                    <span className="text-xs text-slate-400 flex-shrink-0 ml-2">
                      {formatRelativeTime(conv.lastMessage.createdAt)}
                    </span>
                  )}
                </div>
                {conv.lastMessage && (
                  <p className="text-xs text-slate-500 truncate">
                    {truncate(conv.lastMessage.content, 40)}
                  </p>
                )}
              </div>
              {conv.unreadCount > 0 && (
                <span className="flex-shrink-0 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-violet-600 px-1.5 text-xs font-bold text-white">
                  {conv.unreadCount}
                </span>
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
