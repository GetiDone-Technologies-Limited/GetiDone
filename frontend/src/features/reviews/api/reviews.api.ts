import { apiClient } from '@/shared/lib/api-client';
import type { Review, CreateReviewRequest, ReviewStats } from '../types/reviews.types';

export const reviewsApi = {
  getReviews(userId: string): Promise<Review[]> {
    return apiClient.get<Review[]>(`/reviews/user/${userId}`);
  },

  getProjectReviews(projectId: string): Promise<Review[]> {
    return apiClient.get<Review[]>(`/reviews/project/${projectId}`);
  },

  getReviewStats(userId: string): Promise<ReviewStats> {
    return apiClient.get<ReviewStats>(`/reviews/stats/${userId}`);
  },

  createReview(data: CreateReviewRequest): Promise<Review> {
    return apiClient.post<Review>('/reviews', data);
  },
};
