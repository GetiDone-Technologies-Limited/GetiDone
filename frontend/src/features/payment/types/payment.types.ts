import type { EscrowStatus } from '@/shared/types/common.types';

export interface Payment {
  id: string;
  projectId: string;
  amount: number;
  currency: string;
  status: 'PENDING' | 'COMPLETED' | 'REFUNDED' | 'FAILED';
  stripePaymentIntentId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Escrow {
  id: string;
  projectId: string;
  amount: number;
  status: EscrowStatus;
  heldAt?: string;
  releasedAt?: string;
  refundedAt?: string;
}

export interface CreatePaymentRequest {
  projectId: string;
  amount: number;
  currency?: string;
}

export interface ReleaseEscrowRequest {
  projectId: string;
}
