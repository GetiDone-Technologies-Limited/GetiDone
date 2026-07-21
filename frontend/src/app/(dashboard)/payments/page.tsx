'use client';

import { CreditCard, ArrowUpRight, Clock, Download } from 'lucide-react';
import { useGlobalPaymentHistory } from '@/features/payment/hooks/useGlobalPaymentHistory';

export default function PaymentsPage() {
  const { data: payments, isLoading } = useGlobalPaymentHistory();

  // Derived mock stats for top cards
  const totalSpent = payments?.filter(p => p.status === 'COMPLETED').reduce((acc, curr) => acc + curr.amount, 0) || 0;
  const inEscrow = payments?.filter(p => p.status === 'PENDING').reduce((acc, curr) => acc + curr.amount, 0) || 0;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900">Payments & Invoices</h1>
        <p className="text-slate-500 mt-2 font-medium">Manage your transactions, escrow funds, and billing history.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="w-12 h-12 rounded-2xl bg-[#00b259]/10 text-[#00b259] flex items-center justify-center mb-4">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500 mb-1">Available Balance</p>
            <p className="text-3xl font-black text-slate-900">$2,450.00</p>
          </div>
        </div>
        
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mb-4">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500 mb-1">In Escrow</p>
            <p className="text-3xl font-black text-slate-900">${inEscrow.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
          </div>
        </div>

        <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-xl flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#00b259] opacity-20 blur-[50px] rounded-full"></div>
          <div className="w-12 h-12 rounded-2xl bg-white/10 text-white flex items-center justify-center mb-4 relative z-10">
            <ArrowUpRight className="w-6 h-6" />
          </div>
          <div className="relative z-10">
            <p className="text-sm font-semibold text-slate-400 mb-1">Total Spent</p>
            <p className="text-3xl font-black text-white">${totalSpent.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Recent Transactions</h2>
          <button className="text-sm font-semibold text-[#00b259] hover:text-[#009b4d] flex items-center gap-1.5 bg-[#00b259]/10 px-3 py-1.5 rounded-lg transition-colors">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>

        {isLoading ? (
          <div className="p-12 space-y-4">
             {[1, 2, 3].map(i => <div key={i} className="h-12 bg-slate-50 rounded-xl animate-pulse"></div>)}
          </div>
        ) : payments && payments.length > 0 ? (
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="py-4 px-6 text-[12px] font-bold text-slate-500 uppercase tracking-wider">Reference</th>
                <th className="py-4 px-6 text-[12px] font-bold text-slate-500 uppercase tracking-wider">Type</th>
                <th className="py-4 px-6 text-[12px] font-bold text-slate-500 uppercase tracking-wider">Date</th>
                <th className="py-4 px-6 text-[12px] font-bold text-slate-500 uppercase tracking-wider text-right">Amount</th>
                <th className="py-4 px-6 text-[12px] font-bold text-slate-500 uppercase tracking-wider text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {payments.map(payment => (
                <tr key={payment.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6 text-sm font-bold text-slate-900">{payment.id}</td>
                  <td className="py-4 px-6 text-sm font-medium text-slate-600">Escrow</td>
                  <td className="py-4 px-6 text-sm font-medium text-slate-500">{new Date(payment.createdAt).toLocaleDateString()}</td>
                  <td className="py-4 px-6 text-sm font-black text-slate-900 text-right">${payment.amount.toLocaleString()}</td>
                  <td className="py-4 px-6 text-right">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider
                      ${payment.status === 'COMPLETED' ? 'bg-green-100 text-green-700' : 
                        payment.status === 'PENDING' ? 'bg-orange-100 text-orange-700' : 
                        'bg-red-100 text-red-700'}`}>
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-12 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-4 border border-slate-100 shadow-sm">
              <CreditCard className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">No recent transactions</h3>
            <p className="text-slate-500 text-sm">Your payment history will appear here once you start funding projects.</p>
          </div>
        )}
      </div>
    </div>
  );
}
