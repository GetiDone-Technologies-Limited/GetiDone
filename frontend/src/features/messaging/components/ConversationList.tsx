'use client';

import { useMessagingStore } from '@/store/messaging.store';
import { Avatar } from '@/shared/components/ui/Avatar';

interface ConversationListProps {
  selectedId?: string;
  onSelect: (id: string) => void;
}

export function ConversationList({ selectedId, onSelect }: ConversationListProps) {
  const conversations = useMessagingStore((state) => state.conversations);
  const markAsRead = useMessagingStore((state) => state.markAsRead);

  const handleSelect = (id: string) => {
    markAsRead(id);
    onSelect(id);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 border-r border-slate-100">
      <div className="p-5 border-b border-slate-100 bg-white shrink-0">
        <h2 className="text-lg font-extrabold text-slate-900">Conversations</h2>
      </div>
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <ul className="divide-y divide-slate-100">
          {conversations.map((conv) => {
            const isSelected = conv.id === selectedId;
            return (
              <li key={conv.id}>
                <button
                  onClick={() => handleSelect(conv.id)}
                  className={`w-full flex items-center gap-4 px-5 py-4 text-left transition-all ${
                    isSelected ? 'bg-white border-l-4 border-[#00b259] shadow-[2px_0_10px_rgba(0,0,0,0.02)]' : 'bg-slate-50 border-l-4 border-transparent hover:bg-slate-100'
                  }`}
                >
                  <div className="relative">
                    <Avatar src={conv.participantAvatar} name={conv.participantName} size="lg" className="w-12 h-12 border-2 border-white shadow-sm" />
                    <span className={`absolute bottom-0 right-0 w-3.5 h-3.5 border-2 border-white rounded-full ${conv.participantStatus === 'online' ? 'bg-[#00b259]' : 'bg-slate-300'}`}></span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="text-[15px] font-bold text-slate-900 truncate">{conv.participantName}</span>
                      <span className={`text-[11px] font-bold ${conv.unreadCount > 0 ? 'text-[#00b259]' : 'text-slate-400'}`}>
                        {conv.lastMessageTime}
                      </span>
                    </div>
                    <p className={`text-[13px] truncate ${conv.unreadCount > 0 ? 'text-slate-900 font-bold' : 'text-slate-500 font-medium'}`}>
                      {conv.lastMessage}
                    </p>
                  </div>
                  {conv.unreadCount > 0 && (
                    <span className="flex-shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-[#00b259] text-[10px] font-black text-white shadow-sm">
                      {conv.unreadCount}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
