import { apiClient } from '@/shared/lib/api-client';
import type { Payment, Escrow, CreatePaymentRequest } from '../types/payment.types';

export const paymentApi = {
  getPayments(projectId?: string): Promise<Payment[]> {
    return apiClient.get<Payment[]>('/payments', projectId ? { projectId } : undefined);
  },

  createPayment(data: CreatePaymentRequest): Promise<{ clientSecret: string; payment: Payment }> {
    return apiClient.post<{ clientSecret: string; payment: Payment }>('/payments', data);
  },

  getEscrow(projectId: string): Promise<Escrow> {
    return apiClient.get<Escrow>(`/payments/escrow/${projectId}`);
  },

  releaseEscrow(projectId: string): Promise<Escrow> {
    return apiClient.post<Escrow>(`/payments/escrow/${projectId}/release`);
  },

  refundEscrow(projectId: string): Promise<Escrow> {
    return apiClient.post<Escrow>(`/payments/escrow/${projectId}/refund`);
  },
};
