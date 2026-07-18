import { create } from 'zustand';

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string;
  status?: 'sent' | 'delivered' | 'read';
}

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  participantStatus: 'online' | 'offline';
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

interface MessagingState {
  conversations: Conversation[];
  messages: Record<string, Message[]>; // Keyed by conversationId
  sendMessage: (conversationId: string, senderId: string, receiverId: string, content: string) => void;
  markAsRead: (conversationId: string) => void;
  markAsUnread: (conversationId: string) => void;
}

const mockConversations: Conversation[] = [
  {
    id: 'conv_1',
    participantId: 'user_daniel',
    participantName: 'Daniel Benson',
    participantAvatar: 'https://i.pravatar.cc/150?u=daniel',
    participantStatus: 'online',
    lastMessage: 'I have just uploaded the initial wireframes for your review. Check out the Files tab!',
    lastMessageTime: '9:15 AM',
    unreadCount: 2,
  },
  {
    id: 'conv_2',
    participantId: 'user_sarah',
    participantName: 'Sarah Jenkins',
    participantAvatar: 'https://i.pravatar.cc/150?u=sarah',
    participantStatus: 'offline',
    lastMessage: 'Sure, I can have that done by Tuesday.',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
  },
  {
    id: 'conv_3',
    participantId: 'user_alex',
    participantName: 'Alex Chen',
    participantAvatar: 'https://i.pravatar.cc/150?u=alex',
    participantStatus: 'online',
    lastMessage: 'Thanks for the quick payment!',
    lastMessageTime: 'May 10',
    unreadCount: 0,
  }
];

const mockMessages: Record<string, Message[]> = {
  'conv_1': [
    {
      id: 'msg_1',
      conversationId: 'conv_1',
      senderId: 'user_daniel',
      receiverId: 'me',
      content: 'Hi there! I\'ve accepted the contract and am ready to get started. I\'ll begin by working on the wireframes for the homepage as discussed.',
      createdAt: 'May 10, 10:45 AM',
      status: 'read'
    },
    {
      id: 'msg_2',
      conversationId: 'conv_1',
      senderId: 'me',
      receiverId: 'user_daniel',
      content: 'Sounds great, Daniel! Let me know if you need any additional brand assets from us.',
      createdAt: 'May 10, 11:02 AM',
      status: 'read'
    },
    {
      id: 'msg_3',
      conversationId: 'conv_1',
      senderId: 'user_daniel',
      receiverId: 'me',
      content: 'I\'ve just uploaded the initial wireframes for your review. Check out the Files tab! Let me know your thoughts before I proceed to the high-fidelity designs.',
      createdAt: 'Today, 9:15 AM',
      status: 'delivered'
    }
  ]
};

export const useMessagingStore = create<MessagingState>((set) => ({
  conversations: mockConversations,
  messages: mockMessages,
  
  sendMessage: (conversationId, senderId, receiverId, content) => set((state) => {
    const newMessage: Message = {
      id: `msg_${Date.now()}`,
      conversationId,
      senderId,
      receiverId,
      content,
      createdAt: 'Just now',
      status: 'sent'
    };

    // Update messages
    const existingMessages = state.messages[conversationId] || [];
    const newMessages = { ...state.messages, [conversationId]: [...existingMessages, newMessage] };

    // Update conversation last message
    const updatedConversations = state.conversations.map(conv => {
      if (conv.id === conversationId) {
        return { ...conv, lastMessage: content, lastMessageTime: 'Just now' };
      }
      return conv;
    });

    return { messages: newMessages, conversations: updatedConversations };
  }),

  markAsRead: (conversationId) => set((state) => {
    const updatedConversations = state.conversations.map(conv => {
      if (conv.id === conversationId) {
        return { ...conv, unreadCount: 0 };
      }
      return conv;
    });
    return { conversations: updatedConversations };
  }),

  markAsUnread: (conversationId) => set((state) => {
    const updatedConversations = state.conversations.map(conv => {
      if (conv.id === conversationId) {
        return { ...conv, unreadCount: 1 };
      }
      return conv;
    });
    return { conversations: updatedConversations };
  })
}));
