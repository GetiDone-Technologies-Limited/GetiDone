import type { Message } from '../types/messaging.types';
import { Avatar } from '@/shared/components/ui/Avatar';
import { formatRelativeTime } from '@/shared/lib/utils';

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
}

export function MessageBubble({ message, isOwn }: MessageBubbleProps) {
  return (
    <div className={`flex items-end gap-2 ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}>
      {!isOwn && (
        <Avatar src={message.sender?.avatarUrl} name={message.sender?.name ?? ''} size="xs" />
      )}
      <div
        className={`max-w-xs sm:max-w-md rounded-2xl px-4 py-2.5 ${
          isOwn
            ? 'rounded-br-sm bg-violet-600 text-white'
            : 'rounded-bl-sm bg-slate-100 text-slate-900'
        }`}
      >
        <p className="text-sm leading-relaxed">{message.content}</p>
        <p className={`mt-1 text-xs ${isOwn ? 'text-violet-200' : 'text-slate-400'}`}>
          {formatRelativeTime(message.createdAt)}
        </p>
      </div>
    </div>
  );
}
