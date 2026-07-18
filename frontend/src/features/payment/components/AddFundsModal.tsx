'use client';

import { useState } from 'react';
import { X, CreditCard, DollarSign } from 'lucide-react';
import { Button } from '@/shared/components/ui/Button';

interface AddFundsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddFundsModal({ isOpen, onClose }: AddFundsModalProps) {
  const [amount, setAmount] = useState('500');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleFund = () => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 2000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden transform transition-all">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
            Add Funds to Wallet
          </h3>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-10 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-4 border-4 border-white shadow-sm">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h4 className="text-2xl font-black text-slate-900 mb-2">Funds Added!</h4>
            <p className="text-slate-500 font-medium">Successfully added ${amount} to your wallet.</p>
          </div>
        ) : (
          <div className="p-6 space-y-6">
            <div>
              <label className="text-sm font-bold text-slate-700 block mb-2">Select Amount</label>
              <div className="grid grid-cols-3 gap-3">
                {['100', '500', '1000'].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setAmount(amt)}
                    className={`py-3 rounded-xl border-2 font-bold transition-all ${
                      amount === amt 
                        ? 'border-primary bg-primary/5 text-primary' 
                        : 'border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    ${amt}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-bold text-slate-700 block mb-2">Or enter custom amount</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-slate-400 font-bold">$</span>
                </div>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-slate-900 font-bold"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-slate-400" /> Payment Method
                </span>
                <span className="text-xs font-bold text-primary cursor-pointer hover:underline">Change</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-6 bg-slate-800 rounded flex items-center justify-center text-white text-[10px] font-bold">VISA</div>
                <span className="text-sm font-bold text-slate-900">•••• 4242</span>
              </div>
            </div>

            <Button 
              className="w-full py-4 rounded-xl text-base font-bold bg-primary hover:bg-primary-600 border-none shadow-lg shadow-primary/20"
              onClick={handleFund}
              loading={isProcessing}
            >
              Add ${amount}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
