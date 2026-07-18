import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/shared/lib/api-client';
import type { Payment } from '../types/payment.types';

// Mock data fallback
const mockGlobalPayments: Payment[] = [
  {
    id: 'pay_1',
    amount: 1200,
    currency: 'USD',
    status: 'COMPLETED',
    type: 'MILESTONE',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    projectId: 'proj_1',
    reference: 'REF-123456',
  },
  {
    id: 'pay_2',
    amount: 450,
    currency: 'USD',
    status: 'PENDING',
    type: 'DEPOSIT',
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    projectId: 'proj_2',
    reference: 'REF-789012',
  },
  {
    id: 'pay_3',
    amount: 800,
    currency: 'USD',
    status: 'COMPLETED',
    type: 'MILESTONE',
    createdAt: new Date(Date.now() - 259200000).toISOString(),
    projectId: 'proj_1',
    reference: 'REF-345678',
  }
];

export function useGlobalPaymentHistory() {
  return useQuery({
    queryKey: ['global_payments'],
    queryFn: async () => {
      try {
        const response = await apiClient.get<Payment[]>('/payment/history');
        if (response && response.length > 0) return response;
        return mockGlobalPayments;
      } catch (error) {
        console.warn('Failed to fetch global payment history from API, falling back to mock data.', error);
        return mockGlobalPayments;
      }
    },
  });
}
