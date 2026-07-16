'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { messagingApi } from '../api/messaging.api';
import type { SendMessageRequest } from '../types/messaging.types';

const CONV_KEY = 'conversations';
const MSG_KEY = 'messages';

export function useConversations() {
  return useQuery({
    queryKey: [CONV_KEY],
    queryFn: () => messagingApi.getConversations(),
    refetchInterval: 15000, // poll every 15s
    staleTime: 0,
  });
}

export function useMessages(conversationId: string) {
  return useQuery({
    queryKey: [MSG_KEY, conversationId],
    queryFn: () => messagingApi.getMessages(conversationId),
    enabled: Boolean(conversationId),
    refetchInterval: 5000,
    staleTime: 0,
  });
}

export function useSendMessage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: SendMessageRequest) => messagingApi.sendMessage(data),
    onSuccess: (msg) => {
      queryClient.invalidateQueries({ queryKey: [MSG_KEY, msg.conversationId] });
      queryClient.invalidateQueries({ queryKey: [CONV_KEY] });
    },
  });
}

export function useMessaging(conversationId?: string) {
  const conversations = useConversations();
  const messages = useMessages(conversationId ?? '');
  const sendMessage = useSendMessage();
  return { conversations, messages, sendMessage };
}
