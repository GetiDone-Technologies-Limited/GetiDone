'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { reviewsApi } from '../api/reviews.api';
import type { CreateReviewRequest } from '../types/reviews.types';

export function useReviews(userId: string) {
  return useQuery({
    queryKey: ['reviews', 'user', userId],
    queryFn: () => reviewsApi.getReviews(userId),
    enabled: Boolean(userId),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
}

export function useProjectReviews(projectId: string) {
  return useQuery({
    queryKey: ['reviews', 'project', projectId],
    queryFn: () => reviewsApi.getProjectReviews(projectId),
    enabled: Boolean(projectId),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
}

export function useReviewStats(userId: string) {
  return useQuery({
    queryKey: ['reviews', 'stats', userId],
    queryFn: () => reviewsApi.getReviewStats(userId),
    enabled: Boolean(userId),
    staleTime: 10 * 60 * 1000,
    retry: false,
  });
}

export function useCreateReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateReviewRequest) => reviewsApi.createReview(data),
    onSuccess: (review) => {
      queryClient.invalidateQueries({ queryKey: ['reviews', 'user', review.revieweeId] });
      queryClient.invalidateQueries({ queryKey: ['reviews', 'project', review.projectId] });
      queryClient.invalidateQueries({ queryKey: ['reviews', 'stats', review.revieweeId] });
    },
  });
}
