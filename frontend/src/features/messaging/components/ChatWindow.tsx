'use client';

import { useState, useRef, useEffect } from 'react';
import { Avatar } from '@/shared/components/ui/Avatar';
import { useAuthStore } from '@/store/auth.store';
import { useMessagingStore } from '@/store/messaging.store';
import { MoreHorizontal, Paperclip, Send } from 'lucide-react';

interface ChatWindowProps {
  conversationId: string;
  receiverId: string;
}

export function ChatWindow({ conversationId, receiverId }: ChatWindowProps) {
  const { user } = useAuthStore();
  const rawMessages = useMessagingStore((state) => state.messages[conversationId]);
  const messages = rawMessages || [];
  const sendMessage = useMessagingStore((state) => state.sendMessage);
  const conversation = useMessagingStore((state) => state.conversations.find(c => c.id === conversationId));
  const [text, setText] = useState('');
  const [attachment, setAttachment] = useState<File | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if ((!text.trim() && !attachment) || !user) return;
    
    let messageContent = text.trim();
    if (attachment) {
      messageContent += messageContent ? `\n\n[Attachment: ${attachment.name}]` : `[Attachment: ${attachment.name}]`;
    }

    sendMessage(conversationId, user.id, receiverId, messageContent);
    setText('');
    setAttachment(null);
  };

  const handleAttachmentClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachment(e.target.files[0]);
    }
  };

  if (!conversation) return null;

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Chat Header */}
      <div className="p-5 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50">
        <div className="flex items-center gap-4">
          <div className="relative">
             <Avatar src={conversation.participantAvatar} name={conversation.participantName} size="lg" className="w-12 h-12 border-2 border-white shadow-sm" />
             <span className={`absolute bottom-0 right-0 w-3.5 h-3.5 border-2 border-white rounded-full ${conversation.participantStatus === 'online' ? 'bg-[#00b259]' : 'bg-slate-300'}`}></span>
          </div>
          <div>
            <h3 className="text-[16px] font-bold text-slate-900">{conversation.participantName}</h3>
            <p className={`text-[13px] font-medium flex items-center gap-1 ${conversation.participantStatus === 'online' ? 'text-[#00b259]' : 'text-slate-500'}`}>
               {conversation.participantStatus === 'online' ? 'Online' : 'Offline'}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="p-2.5 text-slate-500 hover:text-slate-900 hover:bg-slate-200 rounded-xl transition-colors">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white custom-scrollbar">
        {messages.map((msg, idx) => {
          const isOwn = msg.senderId === user?.id || msg.senderId === 'me';
          return (
            <div key={msg.id} className={`flex gap-4 ${isOwn ? 'flex-row-reverse' : ''}`}>
              {!isOwn && (
                <Avatar src={conversation.participantAvatar} name={conversation.participantName} size="sm" className="w-8 h-8 shrink-0 mt-1" />
              )}
              {isOwn && (
                 <div className="w-8 h-8 rounded-full bg-slate-200 shrink-0 mt-1 flex items-center justify-center font-bold text-xs text-slate-600">You</div>
              )}
              <div className={`flex flex-col max-w-[70%] ${isOwn ? 'items-end' : 'items-start'}`}>
                <div className={`px-5 py-3.5 text-[14px] leading-relaxed shadow-sm ${
                  isOwn 
                    ? 'bg-[#00b259] text-white rounded-2xl rounded-tr-sm' 
                    : 'bg-slate-100 text-slate-800 rounded-2xl rounded-tl-sm'
                }`}>
                  {msg.content}
                </div>
                <span className={`text-[11px] font-semibold text-slate-400 mt-1.5 ${isOwn ? 'mr-1' : 'ml-1'}`}>
                  {msg.createdAt}
                </span>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Chat Input */}
      <form onSubmit={handleSend} className="p-5 border-t border-slate-100 bg-white shrink-0 flex flex-col">
        {attachment && (
          <div className="mb-3 self-start flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200">
            <Paperclip className="w-4 h-4 text-slate-500" />
            <span className="text-sm font-medium text-slate-700">{attachment.name}</span>
            <button type="button" onClick={() => setAttachment(null)} className="ml-2 text-slate-400 hover:text-red-500 font-bold">×</button>
          </div>
        )}
        <div className="flex items-center gap-3">
          <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
          <button type="button" onClick={handleAttachmentClick} className="p-3 text-slate-400 hover:text-[#00b259] hover:bg-green-50 rounded-xl transition-colors">
            <Paperclip className="w-5 h-5" />
          </button>
          <input 
            type="text" 
            placeholder="Type your message here..." 
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 text-[14px] focus:outline-none focus:border-[#00b259] focus:ring-1 focus:ring-[#00b259] transition-all"
          />
          <button 
            type="submit"
            disabled={!text.trim() && !attachment}
            className="p-3.5 bg-[#00b259] hover:bg-[#009b4d] text-white rounded-xl transition-colors shadow-sm disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
