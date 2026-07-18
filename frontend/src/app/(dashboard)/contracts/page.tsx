import { FileSignature, ShieldCheck } from 'lucide-react';

export default function ContractsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Contracts</h1>
          <p className="text-slate-500 mt-2 font-medium">Manage your active and past legal agreements.</p>
        </div>
        <button className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-sm transition-colors flex items-center gap-2">
          <FileSignature className="w-4 h-4" /> New Contract
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {['All Contracts', 'Active', 'Pending Signature', 'Completed'].map((tab, i) => (
          <button key={tab} className={`py-3 rounded-xl font-bold text-sm transition-all border-2 ${i === 0 ? 'border-slate-900 bg-slate-900 text-white' : 'border-transparent bg-white text-slate-600 shadow-sm hover:border-slate-200'}`}>
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-16 text-center flex flex-col items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mb-6">
          <ShieldCheck className="w-10 h-10 text-blue-500" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Secure Agreements</h3>
        <p className="text-slate-500 max-w-md">
          Your contracts will be generated and stored securely here once a project is initiated and terms are accepted by both parties.
        </p>
      </div>
    </div>
  );
}
