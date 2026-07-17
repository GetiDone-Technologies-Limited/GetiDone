'use client';

import { useReviews } from '../hooks/useReviews';
import { Avatar } from '@/shared/components/ui/Avatar';
import { LoadingSpinner } from '@/shared/components/feedback/LoadingSpinner';
import { EmptyState } from '@/shared/components/feedback/EmptyState';
import { formatDate } from '@/shared/lib/utils';

interface ReviewListProps {
  userId: string;
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} className={s <= rating ? 'text-amber-400' : 'text-slate-300'}>★</span>
      ))}
    </div>
  );
}

export function ReviewList({ userId }: ReviewListProps) {
  const { data: reviews, isLoading } = useReviews(userId);

  if (isLoading) return <LoadingSpinner size="sm" />;
  if (!reviews?.length) return <EmptyState title="No reviews yet" description="Reviews will appear here after project completion." />;

  return (
    <div className="space-y-4">
      {reviews.map((r) => (
        <div key={r.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-start gap-3">
            <Avatar src={r.reviewer?.avatarUrl} name={r.reviewer?.name ?? ''} size="sm" />
            <div className="flex-1">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-semibold text-slate-900">{r.reviewer?.name}</span>
                <span className="text-xs text-slate-400">{formatDate(r.createdAt)}</span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <Stars rating={r.rating} />
                <span className="text-xs text-slate-500">{r.category}</span>
              </div>
              <p className="mt-2 text-sm text-slate-700">{r.comment}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

