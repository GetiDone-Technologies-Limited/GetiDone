'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { paymentApi } from '../api/payment.api';
import type { CreatePaymentRequest } from '../types/payment.types';

export function usePayments(projectId?: string) {
  return useQuery({
    queryKey: ['payments', projectId],
    queryFn: () => paymentApi.getPayments(projectId),
    staleTime: 5 * 60 * 1000,
  });
}

export function useEscrow(projectId: string) {
  return useQuery({
    queryKey: ['escrow', projectId],
    queryFn: () => paymentApi.getEscrow(projectId),
    enabled: Boolean(projectId),
    staleTime: 2 * 60 * 1000,
  });
}

export function useCreatePayment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreatePaymentRequest) => paymentApi.createPayment(data),
    onSuccess: (_, { projectId }) => {
      queryClient.invalidateQueries({ queryKey: ['payments', projectId] });
      queryClient.invalidateQueries({ queryKey: ['escrow', projectId] });
    },
  });
}

export function useReleaseEscrow() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (projectId: string) => paymentApi.releaseEscrow(projectId),
    onSuccess: (_, projectId) => {
      queryClient.invalidateQueries({ queryKey: ['escrow', projectId] });
      queryClient.invalidateQueries({ queryKey: ['payments', projectId] });
    },
  });
}

export function useVerifyPayment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ projectId, reference }: { projectId: string; reference: string }) => 
      paymentApi.verifyPayment(projectId, reference),
    onSuccess: (_, { projectId }) => {
      queryClient.invalidateQueries({ queryKey: ['escrow', projectId] });
      queryClient.invalidateQueries({ queryKey: ['payments', projectId] });
    },
  });
}

export function usePayment(projectId?: string) {
  const payments = usePayments(projectId);
  const escrow = useEscrow(projectId ?? '');
  const createPayment = useCreatePayment();
  const verifyPayment = useVerifyPayment();
  const releaseEscrow = useReleaseEscrow();
  return { payments, escrow, createPayment, verifyPayment, releaseEscrow };
}
