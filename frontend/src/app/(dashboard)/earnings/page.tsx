'use client';

import { useState } from 'react';
import { Wallet, ArrowUpRight, ArrowDownRight, Download, Receipt, Building2, Banknote } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Modal } from '@/shared/components/ui/Modal';

const mockTransactions = [
  { id: 'tx1', type: 'Credit', amount: '+$1,250.00', date: 'Oct 24, 2023', description: 'Milestone 2 - TechNova Inc.', status: 'Completed', statusColor: 'bg-[#00b259]/10 text-[#00b259]' },
  { id: 'tx2', type: 'Withdrawal', amount: '-$500.00', date: 'Oct 20, 2023', description: 'Withdrawal to Bank Account', status: 'Completed', statusColor: 'bg-slate-100 text-slate-700' },
  { id: 'tx3', type: 'Credit', amount: '+$800.00', date: 'Oct 15, 2023', description: 'Final Payment - HealthPlus', status: 'Pending', statusColor: 'bg-orange-100 text-orange-600' },
  { id: 'tx4', type: 'Fee', amount: '-$20.00', date: 'Oct 15, 2023', description: 'Platform Service Fee', status: 'Completed', statusColor: 'bg-slate-100 text-slate-700' },
];

export default function EarningsPage() {
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [isTaxFormsOpen, setIsTaxFormsOpen] = useState(false);
  const [withdrawMethod, setWithdrawMethod] = useState('bank');
  const [withdrawAmount, setWithdrawAmount] = useState('');

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    if (!withdrawAmount) return;
    toast.success(`Processing withdrawal of $${withdrawAmount} to ${withdrawMethod === 'bank' ? 'Bank Account' : 'PayPal'}`);
    setIsWithdrawOpen(false);
    setWithdrawAmount('');
  };

  const handleDownloadStatement = () => {
    toast.success('Preparing your statement for download...');
  };

  const handleDownloadTaxForm = (year: string) => {
    toast.success(`Downloading ${year} 1099-K form...`);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Earnings & Wallet</h1>
          <p className="text-slate-500 font-medium mt-2">Manage your funds, track your earnings, and view transaction history.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setIsWithdrawOpen(true)}
            className="px-5 py-2.5 bg-[#00b259] text-white hover:bg-[#009e4f] rounded-xl text-sm font-bold transition-all shadow-sm"
          >
            Withdraw Funds
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900 rounded-3xl p-8 text-white shadow-md relative overflow-hidden flex flex-col justify-between min-h-[220px]">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Wallet className="w-48 h-48" />
          </div>
          <div className="relative z-10">
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-2">Available Balance</p>
            <p className="text-5xl font-black tracking-tight">$3,450.00</p>
          </div>
          <div className="relative z-10 flex gap-8 mt-8">
            <div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">In Escrow</p>
              <p className="text-xl font-bold">$1,200.00</p>
            </div>
            <div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Pending Clearance</p>
              <p className="text-xl font-bold">$800.00</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
           <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center shadow-inner text-blue-600 mb-4">
             <Receipt className="w-7 h-7" />
           </div>
           <div>
             <p className="text-slate-500 font-bold text-sm mb-1">Lifetime Earnings</p>
             <p className="text-3xl font-black text-slate-900 tracking-tight">$45,231.00</p>
           </div>
           <button 
             onClick={() => setIsTaxFormsOpen(true)}
             className="mt-4 w-full py-2.5 bg-slate-50 text-slate-700 hover:bg-slate-100 rounded-xl text-sm font-bold transition-colors"
           >
             View Tax Forms
           </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Transaction History</h2>
          <button 
            onClick={handleDownloadStatement}
            className="text-sm font-bold text-slate-500 flex items-center gap-1 hover:text-slate-900 transition-colors"
          >
            <Download className="w-4 h-4" /> Download Statement
          </button>
        </div>
        <div className="divide-y divide-slate-100">
          {mockTransactions.map((tx) => (
            <div key={tx.id} className="p-6 flex flex-wrap sm:flex-nowrap items-center justify-between hover:bg-slate-50 transition-colors gap-4">
              <div className="flex items-center gap-4 flex-1">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-inner ${
                  tx.type === 'Credit' ? 'bg-[#00b259]/10 text-[#00b259]' : 'bg-red-50 text-red-500'
                }`}>
                  {tx.type === 'Credit' ? <ArrowUpRight className="w-6 h-6" /> : <ArrowDownRight className="w-6 h-6" />}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{tx.description}</h4>
                  <p className="text-xs font-semibold text-slate-500 mt-1">{tx.date}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6 w-full sm:w-auto justify-end">
                <p className={`text-lg font-black ${tx.type === 'Credit' ? 'text-[#00b259]' : 'text-slate-900'}`}>
                  {tx.amount}
                </p>
                <div className="w-24 text-right hidden sm:block">
                  <span className={`inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-bold shadow-sm ${tx.statusColor}`}>
                    {tx.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Withdraw Modal */}
      <Modal open={isWithdrawOpen} onClose={() => setIsWithdrawOpen(false)} title="Withdraw Funds" size="sm">
        <form onSubmit={handleWithdraw} className="space-y-6">
          <div className="p-4 bg-slate-50 rounded-2xl text-center mb-6">
            <p className="text-sm font-medium text-slate-500 mb-1">Available to withdraw</p>
            <p className="text-3xl font-black text-slate-900">$3,450.00</p>
          </div>
          
          <div className="space-y-4">
            <label className="block text-sm font-bold text-slate-900">Select Destination</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setWithdrawMethod('bank')}
                className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${withdrawMethod === 'bank' ? 'border-[#00b259] bg-[#00b259]/5 text-[#00b259]' : 'border-slate-200 text-slate-500 hover:bg-slate-50'}`}
              >
                <Building2 className="w-6 h-6" />
                <span className="text-sm font-bold">Bank Transfer</span>
              </button>
              <button
                type="button"
                onClick={() => setWithdrawMethod('paypal')}
                className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${withdrawMethod === 'paypal' ? 'border-[#00b259] bg-[#00b259]/5 text-[#00b259]' : 'border-slate-200 text-slate-500 hover:bg-slate-50'}`}
              >
                <Banknote className="w-6 h-6" />
                <span className="text-sm font-bold">PayPal</span>
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-900">Amount</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
              <input 
                type="number" 
                max="3450"
                required
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                className="w-full pl-8 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#00b259] focus:border-transparent"
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <button type="button" onClick={() => setIsWithdrawOpen(false)} className="flex-1 py-3 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl text-sm font-bold transition-colors">
              Cancel
            </button>
            <button type="submit" className="flex-1 py-3 bg-[#00b259] text-white hover:bg-[#009e4f] rounded-xl text-sm font-bold transition-colors">
              Withdraw
            </button>
          </div>
        </form>
      </Modal>

      {/* Tax Forms Modal */}
      <Modal open={isTaxFormsOpen} onClose={() => setIsTaxFormsOpen(false)} title="Tax Documents" size="md">
        <div className="space-y-4">
          <p className="text-sm text-slate-500 font-medium mb-6">Download your official tax forms for the current and previous years.</p>
          
          <div className="space-y-3">
            {[2023, 2022, 2021].map((year) => (
              <div key={year} className="flex items-center justify-between p-4 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                    <Receipt className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Form 1099-K ({year})</h4>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">Issued Jan 31, {year + 1}</p>
                  </div>
                </div>
                <button 
                  onClick={() => handleDownloadTaxForm(year.toString())}
                  className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors"
                >
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
}
