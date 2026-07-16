import { apiClient } from '@/shared/lib/api-client';
import type { Message, Conversation, SendMessageRequest, CreateConversationRequest } from '../types/messaging.types';

export const messagingApi = {
  getConversations(): Promise<Conversation[]> {
    return apiClient.get<Conversation[]>('/messages/conversations');
  },

  getConversation(id: string): Promise<Conversation> {
    return apiClient.get<Conversation>(`/messages/conversations/${id}`);
  },

  getMessages(conversationId: string, params?: { page?: number; pageSize?: number }): Promise<Message[]> {
    return apiClient.get<Message[]>(`/messages/conversations/${conversationId}/messages`, params as Record<string, string | number | boolean | undefined>);
  },

  sendMessage(data: SendMessageRequest): Promise<Message> {
    return apiClient.post<Message>('/messages', data);
  },

  createConversation(data: CreateConversationRequest): Promise<Conversation> {
    return apiClient.post<Conversation>('/messages/conversations', data);
  },

  markAsRead(conversationId: string): Promise<void> {
    return apiClient.patch<void>(`/messages/conversations/${conversationId}/read`);
  },
};
