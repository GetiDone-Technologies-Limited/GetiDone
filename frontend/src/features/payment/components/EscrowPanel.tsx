'use client';

import { useState } from 'react';
import { usePayment } from '../hooks/usePayment';
import { Badge, statusToBadgeVariant } from '@/shared/components/ui/Badge';
import { Button } from '@/shared/components/ui/Button';
import { LoadingSpinner } from '@/shared/components/feedback/LoadingSpinner';
import { formatCurrency, formatDate } from '@/shared/lib/utils';
import { useAuthStore } from '@/store/auth.store';
import { CreditCard, Wallet, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface EscrowPanelProps {
  projectId: string;
}

export function EscrowPanel({ projectId }: EscrowPanelProps) {
  const { escrow: { data: escrow, isLoading }, createPayment, verifyPayment, releaseEscrow } = usePayment(projectId);
  
  // BYPASS AUTH FOR MVP DEMO
  const user = { role: 'CLIENT' }; // Mock client session
  
  const [selectedGateway, setSelectedGateway] = useState<'stripe' | 'paystack' | 'flutterwave'>('stripe');
  const [isVerifying, setIsVerifying] = useState(false);

  if (isLoading) return <LoadingSpinner size="sm" />;
  if (!escrow) return <div className="text-sm text-slate-500">Escrow data not found.</div>;

  const isClient = user?.role === 'CLIENT';
  const canFund = isClient && escrow.status === 'UNFUNDED';
  const canRelease = isClient && escrow.status === 'FUNDED';

  const handleFund = () => {
    createPayment.mutate({
      projectId,
      amount: escrow.amount,
      gateway: selectedGateway
    }, {
      onSuccess: (data) => {
        // In a real app, we would redirect the user to data.authorization_url
        // window.location.href = data.authorization_url;
        
        // For the MVP Mock, we simulate the user returning from the gateway immediately
        setIsVerifying(true);
        setTimeout(() => {
          verifyPayment.mutate({ projectId, reference: data.mockReference }, {
            onSettled: () => setIsVerifying(false)
          });
        }, 1500);
      }
    });
  };

  return (
    <div className="rounded-2xl border border-outline bg-surface p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-on-surface">Escrow Protection</h3>
        <Badge variant={statusToBadgeVariant(escrow.status)}>{escrow.status}</Badge>
      </div>

      <div className="text-3xl font-bold text-primary mb-4">
        {formatCurrency(escrow.amount)}
      </div>

      <div className="space-y-1 text-sm text-on-surface-variant mb-6">
        <p className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-primary" /> Funds are securely held</p>
        {escrow.heldAt && <p>Held: {formatDate(escrow.heldAt)}</p>}
        {escrow.releasedAt && <p>Released: {formatDate(escrow.releasedAt)}</p>}
      </div>

      {canFund && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-2">
            <button 
              onClick={() => setSelectedGateway('stripe')}
              className={`p-3 border rounded-xl flex flex-col items-center gap-2 transition-all ${selectedGateway === 'stripe' ? 'border-primary bg-primary/5 text-primary' : 'border-outline hover:border-primary/50'}`}
            >
              <CreditCard className="w-5 h-5" />
              <span className="text-xs font-semibold">Stripe</span>
            </button>
            <button 
              onClick={() => setSelectedGateway('paystack')}
              className={`p-3 border rounded-xl flex flex-col items-center gap-2 transition-all ${selectedGateway === 'paystack' ? 'border-primary bg-primary/5 text-primary' : 'border-outline hover:border-primary/50'}`}
            >
              <Wallet className="w-5 h-5" />
              <span className="text-xs font-semibold">Paystack</span>
            </button>
            <button 
              onClick={() => setSelectedGateway('flutterwave')}
              className={`p-3 border rounded-xl flex flex-col items-center gap-2 transition-all ${selectedGateway === 'flutterwave' ? 'border-primary bg-primary/5 text-primary' : 'border-outline hover:border-primary/50'}`}
            >
              <CreditCard className="w-5 h-5" />
              <span className="text-xs font-semibold">Flutterwave</span>
            </button>
          </div>
          
          <Button
            className="w-full"
            loading={createPayment.isPending || isVerifying}
            onClick={handleFund}
          >
            {isVerifying ? 'Verifying Payment...' : `Fund via ${selectedGateway.charAt(0).toUpperCase() + selectedGateway.slice(1)}`}
          </Button>
        </div>
      )}

      {canRelease && (
        <Button
          className="w-full"
          loading={releaseEscrow.isPending}
          onClick={() => releaseEscrow.mutate(projectId)}
        >
          <CheckCircle2 className="w-4 h-4 mr-2" />
          Release to freelancer
        </Button>
      )}
    </div>
  );
}

