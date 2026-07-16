export interface Message {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  conversationId: string;
  read: boolean;
  createdAt: string;
  sender?: {
    id: string;
    name: string;
    avatarUrl?: string;
  };
}

export interface Conversation {
  id: string;
  participantIds: string[];
  lastMessage?: Message;
  unreadCount: number;
  updatedAt: string;
  participants: Array<{
    id: string;
    name: string;
    avatarUrl?: string;
  }>;
}

export interface SendMessageRequest {
  conversationId: string;
  content: string;
  receiverId: string;
}

export interface CreateConversationRequest {
  participantId: string;
  initialMessage?: string;
}
