'use client';

import { useState } from 'react';
import { usePayment } from '../hooks/usePayment';
import { Badge, statusToBadgeVariant } from '@/shared/components/ui/Badge';
import { Button } from '@/shared/components/ui/Button';
import { LoadingSpinner } from '@/shared/components/feedback/LoadingSpinner';
import { formatCurrency, formatDate } from '@/shared/lib/utils';
import { useAuthStore } from '@/store/auth.store';
import { CreditCard, Wallet, ShieldCheck, CheckCircle2, LockKeyhole, ArrowRight } from 'lucide-react';

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
  const canFund = isClient && escrow.status === 'PENDING';
  const canRelease = isClient && escrow.status === 'HELD';

  const handleFund = () => {
    createPayment.mutate({
      projectId,
      amount: escrow.amount,
      gateway: selectedGateway
    }, {
      onSuccess: (data) => {
        setIsVerifying(true);
        setTimeout(() => {
          verifyPayment.mutate({ projectId, reference: data.mockReference }, {
            onSettled: () => setIsVerifying(false)
          });
        }, 1500);
      }
    });
  };

  const steps = [
    { label: 'Unfunded', status: escrow.status === 'PENDING' ? 'current' : 'complete' },
    { label: 'In Escrow', status: escrow.status === 'HELD' ? 'current' : escrow.status === 'RELEASED' ? 'complete' : 'upcoming' },
    { label: 'Released', status: escrow.status === 'RELEASED' ? 'complete' : 'upcoming' },
  ];

  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="bg-slate-900 p-8 text-white relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-[#00b259]/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
         
         <div className="flex items-center justify-between mb-6 relative z-10">
           <div className="flex items-center gap-2">
             <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/10">
               <LockKeyhole className="w-5 h-5 text-[#00b259]" />
             </div>
             <h3 className="font-bold text-lg">Secure Escrow</h3>
           </div>
           <Badge variant={escrow.status === 'RELEASED' ? 'success' : escrow.status === 'HELD' ? 'default' : 'warning'} className="bg-white/10 text-white border-white/20 backdrop-blur-md">
             {escrow.status}
           </Badge>
         </div>

         <div className="mb-8 relative z-10">
           <p className="text-sm font-semibold text-slate-400 mb-1 uppercase tracking-wider">Total Amount</p>
           <div className="text-5xl font-black text-white tracking-tight">
             {formatCurrency(escrow.amount)}
           </div>
         </div>

         {/* Visual Ledger Progress */}
         <div className="relative z-10 flex items-center justify-between">
           {steps.map((step, idx) => (
             <div key={step.label} className="flex flex-col items-center gap-2 relative z-10 w-1/3">
               <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-500 z-10 ${
                 step.status === 'complete' ? 'bg-[#00b259] text-white shadow-[0_0_15px_rgba(0,178,89,0.4)]' :
                 step.status === 'current' ? 'bg-white text-slate-900 border-2 border-[#00b259]' :
                 'bg-slate-800 text-slate-500 border border-slate-700'
               }`}>
                 {step.status === 'complete' ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
               </div>
               <span className={`text-[11px] font-bold uppercase tracking-wider ${
                 step.status === 'complete' || step.status === 'current' ? 'text-white' : 'text-slate-500'
               }`}>{step.label}</span>
             </div>
           ))}
           <div className="absolute top-4 left-1/6 right-1/6 h-1 bg-slate-800 -z-0">
             <div className="h-full bg-[#00b259] transition-all duration-1000" style={{ width: escrow.status === 'PENDING' ? '0%' : escrow.status === 'HELD' ? '50%' : '100%' }}></div>
           </div>
         </div>
      </div>

      <div className="p-8 bg-white">
        <div className="space-y-3 mb-8">
          <div className="flex items-center justify-between py-3 border-b border-slate-100">
             <span className="text-sm font-semibold text-slate-500">Held At</span>
             <span className="text-sm font-bold text-slate-900">{escrow.heldAt ? formatDate(escrow.heldAt) : '—'}</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-slate-100">
             <span className="text-sm font-semibold text-slate-500">Released At</span>
             <span className="text-sm font-bold text-slate-900">{escrow.releasedAt ? formatDate(escrow.releasedAt) : '—'}</span>
          </div>
          <div className="flex items-center gap-2 py-2 text-sm font-bold text-[#00b259] bg-green-50 px-4 rounded-xl">
            <ShieldCheck className="w-5 h-5" /> Funds are securely held by GetiDone.
          </div>
        </div>

        {canFund && (
          <div className="space-y-6">
            <div>
              <p className="text-sm font-bold text-slate-900 mb-3">Select Payment Method</p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'stripe', icon: CreditCard, label: 'Stripe' },
                  { id: 'paystack', icon: Wallet, label: 'Paystack' },
                  { id: 'flutterwave', icon: CreditCard, label: 'Flutterwave' }
                ].map((gateway) => (
                  <button 
                    key={gateway.id}
                    onClick={() => setSelectedGateway(gateway.id as 'stripe' | 'paystack' | 'flutterwave')}
                    className={`p-4 border-2 rounded-2xl flex flex-col items-center gap-2 transition-all duration-300 ${
                      selectedGateway === gateway.id 
                        ? 'border-[#00b259] bg-[#00b259]/5 text-[#00b259] shadow-sm' 
                        : 'border-slate-100 text-slate-500 hover:border-[#00b259]/30 hover:bg-slate-50'
                    }`}
                  >
                    <gateway.icon className={`w-6 h-6 ${selectedGateway === gateway.id ? 'text-[#00b259]' : 'text-slate-400'}`} />
                    <span className="text-xs font-bold">{gateway.label}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <button
              onClick={handleFund}
              disabled={createPayment.isPending || isVerifying}
              className="w-full flex items-center justify-center gap-2 bg-[#00b259] hover:bg-[#009b4d] text-white py-4 rounded-xl text-[15px] font-bold shadow-md transition-colors disabled:opacity-50"
            >
              {isVerifying ? <LoadingSpinner size="sm" /> : <LockKeyhole className="w-5 h-5" />}
              {isVerifying ? 'Securing Funds...' : `Fund ${formatCurrency(escrow.amount)} Securely`}
            </button>
          </div>
        )}

        {canRelease && (
          <div className="space-y-4">
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
               <h4 className="text-sm font-bold text-amber-900 mb-1">Ready to Release?</h4>
               <p className="text-xs font-medium text-amber-800 leading-relaxed">Only release funds if you are 100% satisfied with the delivered work. This action is irreversible.</p>
            </div>
            <button
              onClick={() => releaseEscrow.mutate(projectId)}
              disabled={releaseEscrow.isPending}
              className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-black text-white py-4 rounded-xl text-[15px] font-bold shadow-md transition-colors disabled:opacity-50"
            >
              {releaseEscrow.isPending ? <LoadingSpinner size="sm" /> : <CheckCircle2 className="w-5 h-5" />}
              Approve & Release Funds
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
