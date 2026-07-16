'use client';

import { usePayments } from '../hooks/usePayment';
import { LoadingSpinner } from '@/shared/components/feedback/LoadingSpinner';
import { EmptyState } from '@/shared/components/feedback/EmptyState';
import { Badge, statusToBadgeVariant } from '@/shared/components/ui/Badge';
import { formatCurrency, formatDate } from '@/shared/lib/utils';

interface PaymentHistoryProps {
  projectId?: string;
}

export function PaymentHistory({ projectId }: PaymentHistoryProps) {
  const { data: payments, isLoading } = usePayments(projectId);

  if (isLoading) return <LoadingSpinner size="sm" />;
  if (!payments?.length) return <EmptyState title="No payments yet" description="Payments will appear here once made." />;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50">
            <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">Date</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">Amount</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {payments.map((p) => (
            <tr key={p.id} className="hover:bg-slate-50">
              <td className="px-4 py-3 text-slate-600">{formatDate(p.createdAt)}</td>
              <td className="px-4 py-3 font-semibold text-slate-900">{formatCurrency(p.amount, p.currency)}</td>
              <td className="px-4 py-3">
                <Badge variant={statusToBadgeVariant(p.status)}>{p.status}</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
