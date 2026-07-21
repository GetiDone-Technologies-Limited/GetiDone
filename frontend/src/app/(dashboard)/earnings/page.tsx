import { Wallet, ArrowUpRight, ArrowDownRight, Download, Receipt } from 'lucide-react';

const mockTransactions = [
  { id: 'tx1', type: 'Credit', amount: '+$1,250.00', date: 'Oct 24, 2023', description: 'Milestone 2 - TechNova Inc.', status: 'Completed', statusColor: 'bg-[#00b259]/10 text-[#00b259]' },
  { id: 'tx2', type: 'Withdrawal', amount: '-$500.00', date: 'Oct 20, 2023', description: 'Withdrawal to Bank Account', status: 'Completed', statusColor: 'bg-slate-100 text-slate-700' },
  { id: 'tx3', type: 'Credit', amount: '+$800.00', date: 'Oct 15, 2023', description: 'Final Payment - HealthPlus', status: 'Pending', statusColor: 'bg-orange-100 text-orange-600' },
  { id: 'tx4', type: 'Fee', amount: '-$20.00', date: 'Oct 15, 2023', description: 'Platform Service Fee', status: 'Completed', statusColor: 'bg-slate-100 text-slate-700' },
];

export default function EarningsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Earnings & Wallet</h1>
          <p className="text-slate-500 font-medium mt-2">Manage your funds, track your earnings, and view transaction history.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 bg-[#00b259] text-white hover:bg-[#009e4f] rounded-xl text-sm font-bold transition-all shadow-sm">
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
           <button className="mt-4 w-full py-2.5 bg-slate-50 text-slate-700 hover:bg-slate-100 rounded-xl text-sm font-bold transition-colors">
             View Tax Forms
           </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Transaction History</h2>
          <button className="text-sm font-bold text-slate-500 flex items-center gap-1 hover:text-slate-900 transition-colors">
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
    </div>
  );
}
