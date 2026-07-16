import type { ReviewCategory } from '@/shared/types/common.types';

export interface Review {
  id: string;
  rating: number;
  comment: string;
  category: ReviewCategory;
  projectId: string;
  reviewerId: string;
  revieweeId: string;
  createdAt: string;
  reviewer?: {
    id: string;
    name: string;
    avatarUrl?: string;
  };
  reviewee?: {
    id: string;
    name: string;
    avatarUrl?: string;
  };
}

export interface CreateReviewRequest {
  rating: number;
  comment: string;
  category: ReviewCategory;
  projectId: string;
  revieweeId: string;
}

export interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  breakdown: Record<ReviewCategory, number>;
}
