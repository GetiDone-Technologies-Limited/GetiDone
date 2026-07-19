'use client';

import { FileSignature, Plus, Download, Eye, FileText } from 'lucide-react';
import { useState } from 'react';

export default function ContractsPage() {
  const [contracts, setContracts] = useState([
    { id: 'cnt_1', title: 'Senior Developer Agreement', freelancer: 'Sarah Jenkins', project: 'Fintech Mobile App', amount: 4500, status: 'Signed', date: '2026-07-15' },
    { id: 'cnt_2', title: 'UI/UX Design Retainer', freelancer: 'Daniel Benson', project: 'Marketing Website', amount: 2000, status: 'Pending Signature', date: '2026-07-17' },
    { id: 'cnt_3', title: 'Smart Contract Audit', freelancer: 'Alex Chen', project: 'DeFi Protocol', amount: 8000, status: 'Draft', date: '2026-07-18' },
  ]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateContract = () => {
    setIsGenerating(true);
    // Simulate generation delay
    setTimeout(() => {
      const newContract = {
        id: `cnt_${Math.floor(Math.random() * 1000)}`,
        title: 'New Freelancer Agreement',
        freelancer: 'Pending Assignment...',
        project: 'TBD',
        amount: 0,
        status: 'Draft',
        date: new Date().toISOString().split('T')[0]
      };
      setContracts([newContract, ...contracts]);
      setIsGenerating(false);
    }, 1200);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Contracts & Legal</h1>
          <p className="text-slate-500 mt-2 font-medium">Manage your active agreements, NDAs, and project contracts.</p>
        </div>
        <button 
          onClick={handleGenerateContract}
          disabled={isGenerating}
          className="px-5 py-2.5 bg-[#00b259] hover:bg-[#009b4d] text-white font-bold rounded-xl shadow-sm transition-colors flex items-center gap-2 disabled:opacity-70"
        >
          {isGenerating ? (
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
          ) : (
            <Plus className="w-5 h-5" />
          )}
          {isGenerating ? 'Generating...' : 'Generate Contract'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Active Contracts', value: '12', color: 'text-slate-900' },
          { label: 'Pending Signatures', value: '3', color: 'text-orange-500' },
          { label: 'Drafts', value: '2', color: 'text-slate-400' },
          { label: 'Completed', value: '45', color: 'text-[#00b259]' },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <p className="text-sm font-semibold text-slate-500 mb-1">{stat.label}</p>
            <p className={`text-3xl font-black ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="py-4 px-6 text-[12px] font-bold text-slate-500 uppercase tracking-wider">Contract Title</th>
              <th className="py-4 px-6 text-[12px] font-bold text-slate-500 uppercase tracking-wider">Freelancer</th>
              <th className="py-4 px-6 text-[12px] font-bold text-slate-500 uppercase tracking-wider">Project</th>
              <th className="py-4 px-6 text-[12px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="py-4 px-6 text-[12px] font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {contracts.map(contract => (
              <tr key={contract.id} className="hover:bg-slate-50 transition-colors group">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-sm font-bold text-slate-900">{contract.title}</span>
                      <span className="block text-[11px] font-semibold text-slate-500 mt-0.5">Created {contract.date}</span>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6 text-sm font-bold text-slate-700">{contract.freelancer}</td>
                <td className="py-4 px-6 text-sm font-medium text-slate-600">{contract.project}</td>
                <td className="py-4 px-6">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider
                    ${contract.status === 'Signed' ? 'bg-green-100 text-green-700' : 
                      contract.status === 'Pending Signature' ? 'bg-orange-100 text-orange-700' : 
                      'bg-slate-100 text-slate-600'}`}>
                    {contract.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-slate-400 hover:text-[#00b259] hover:bg-green-50 rounded-lg transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-[#00b259] hover:bg-green-50 rounded-lg transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
