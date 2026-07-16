import * as React from 'react';

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'violet';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-slate-100 text-slate-700',
  success: 'bg-emerald-100 text-emerald-700',
  warning: 'bg-amber-100 text-amber-700',
  danger: 'bg-red-100 text-red-700',
  info: 'bg-blue-100 text-blue-700',
  violet: 'bg-violet-100 text-violet-700',
};

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

// Helper to map job/project statuses to badge variants
export function statusToBadgeVariant(status: string): BadgeVariant {
  const map: Record<string, BadgeVariant> = {
    OPEN: 'success',
    IN_PROGRESS: 'info',
    COMPLETED: 'violet',
    CANCELLED: 'danger',
    PENDING: 'warning',
    ACCEPTED: 'success',
    REJECTED: 'danger',
    HELD: 'warning',
    RELEASED: 'success',
    REFUNDED: 'default',
    ACTIVE: 'info',
    DISPUTED: 'danger',
    VERIFIED: 'success',
  };
  return map[status] ?? 'default';
}
