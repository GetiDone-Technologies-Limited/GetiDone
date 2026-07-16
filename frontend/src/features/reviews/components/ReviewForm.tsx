'use client';

import { useState } from 'react';
import { Button } from '@/shared/components/ui/Button';
import { useCreateReview } from '../hooks/useReviews';
import type { ReviewCategory } from '@/shared/types/common.types';

interface ReviewFormProps {
  projectId: string;
  revieweeId: string;
  onSuccess?: () => void;
}

const CATEGORIES: ReviewCategory[] = ['COMMUNICATION', 'QUALITY', 'TIMELINESS', 'OVERALL'];

export function ReviewForm({ projectId, revieweeId, onSuccess }: ReviewFormProps) {
  const { mutate: createReview, isPending, error, isSuccess } = useCreateReview();
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [category, setCategory] = useState<ReviewCategory>('OVERALL');
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating) return;
    createReview({ rating, comment, category, projectId, revieweeId }, { onSuccess });
  };

  if (isSuccess) {
    return (
      <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-5 text-center text-emerald-700 font-medium">
        ✓ Review submitted!
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {error.message}
        </div>
      )}

      {/* Star rating */}
      <div>
        <p className="text-sm font-medium text-slate-700 mb-1.5">Rating</p>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(0)}
              onClick={() => setRating(star)}
              className="text-2xl leading-none transition-transform hover:scale-110"
            >
              {star <= (hovered || rating) ? '⭐' : '☆'}
            </button>
          ))}
        </div>
      </div>

      {/* Category */}
      <div className="flex flex-col gap-1.5">
        <p className="text-sm font-medium text-slate-700">Category</p>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                category === c
                  ? 'bg-violet-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Comment */}
      <div className="flex flex-col gap-1">
        <label htmlFor="review-comment" className="text-sm font-medium text-slate-700">Comment</label>
        <textarea
          id="review-comment"
          rows={3}
          required
          placeholder="Share your experience…"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 focus:outline-none transition-all"
        />
      </div>

      <Button type="submit" loading={isPending} disabled={!rating}>Submit review</Button>
    </form>
  );
}
