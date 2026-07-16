'use client';

import { useEscrow, useReleaseEscrow } from '../hooks/usePayment';
import { Badge, statusToBadgeVariant } from '@/shared/components/ui/Badge';
import { Button } from '@/shared/components/ui/Button';
import { LoadingSpinner } from '@/shared/components/feedback/LoadingSpinner';
import { formatCurrency, formatDate } from '@/shared/lib/utils';
import { useAuthStore } from '@/store/auth.store';

interface EscrowPanelProps {
  projectId: string;
}

export function EscrowPanel({ projectId }: EscrowPanelProps) {
  const { data: escrow, isLoading } = useEscrow(projectId);
  const { mutate: release, isPending } = useReleaseEscrow();
  const { user } = useAuthStore();

  if (isLoading) return <LoadingSpinner size="sm" />;
  if (!escrow) return null;

  const canRelease = user?.role === 'CLIENT' && escrow.status === 'HELD';

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-900">Escrow</h3>
        <Badge variant={statusToBadgeVariant(escrow.status)}>{escrow.status}</Badge>
      </div>

      <div className="text-3xl font-bold text-violet-700 mb-4">
        {formatCurrency(escrow.amount)}
      </div>

      <div className="space-y-1 text-sm text-slate-500">
        {escrow.heldAt && <p>Held: {formatDate(escrow.heldAt)}</p>}
        {escrow.releasedAt && <p>Released: {formatDate(escrow.releasedAt)}</p>}
        {escrow.refundedAt && <p>Refunded: {formatDate(escrow.refundedAt)}</p>}
      </div>

      {canRelease && (
        <Button
          className="mt-5 w-full"
          loading={isPending}
          onClick={() => release(projectId)}
        >
          Release to freelancer
        </Button>
      )}
    </div>
  );
}
