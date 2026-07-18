import { CreditCard, ArrowUpRight, ArrowDownRight, Clock } from 'lucide-react';

export default function PaymentsPage() {
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
            <p className="text-3xl font-black text-slate-900">$4,800.00</p>
          </div>
        </div>

        <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-xl flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#00b259] opacity-20 blur-[50px] rounded-full"></div>
          <div className="w-12 h-12 rounded-2xl bg-white/10 text-white flex items-center justify-center mb-4 relative z-10">
            <ArrowUpRight className="w-6 h-6" />
          </div>
          <div className="relative z-10">
            <p className="text-sm font-semibold text-slate-400 mb-1">Total Spent</p>
            <p className="text-3xl font-black text-white">$12,050.00</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Recent Transactions</h2>
          <button className="text-sm font-semibold text-[#00b259] hover:text-[#009b4d]">Download CSV</button>
        </div>
        <div className="p-12 text-center flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-4">
            <ArrowDownRight className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">No recent transactions</h3>
          <p className="text-slate-500 text-sm">Your payment history will appear here once you start funding projects.</p>
        </div>
      </div>
    </div>
  );
}
