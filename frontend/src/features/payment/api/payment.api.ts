import { apiClient } from '@/shared/lib/api-client';
import type { Payment, Escrow, CreatePaymentRequest } from '../types/payment.types';

export const paymentApi = {
  getPayments(projectId?: string): Promise<Payment[]> {
    return apiClient.get<Payment[]>(`/payment/projects/${projectId}/history`);
  },

  createPayment(data: CreatePaymentRequest): Promise<{ authorization_url: string; mockReference: string; gateway: string }> {
    return apiClient.post<{ authorization_url: string; mockReference: string; gateway: string }>(`/payment/projects/${data.projectId}/fund`, { gateway: data.gateway });
  },

  verifyPayment(projectId: string, reference: string): Promise<{ payment: Payment; project: unknown }> {
    return apiClient.post<{ payment: Payment; project: unknown }>(`/payment/projects/${projectId}/verify`, { reference });
  },

  getEscrow(projectId: string): Promise<Escrow> {
    return apiClient.get<Escrow>(`/payment/projects/${projectId}/escrow`);
  },

  releaseEscrow(projectId: string): Promise<Escrow> {
    return apiClient.post<Escrow>(`/payment/projects/${projectId}/release`);
  },
};
