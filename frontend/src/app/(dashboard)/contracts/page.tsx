'use client';

import { FileSignature, Download, MoreVertical, Search, FileText } from 'lucide-react';
import { toast } from 'react-hot-toast';

const mockContracts = [
  { id: 'c1', title: 'SaaS Dashboard Development', client: 'TechNova Inc.', date: 'Oct 15, 2023', status: 'Active', value: '$3,500', type: 'Fixed Price' },
  { id: 'c2', title: 'Mobile App Support', client: 'HealthPlus', date: 'Sep 01, 2023', status: 'Active', value: '$45/hr', type: 'Hourly' },
  { id: 'c3', title: 'Website Redesign', client: 'Bright Solutions', date: 'Jul 10, 2023', status: 'Completed', value: '$1,200', type: 'Fixed Price' },
];

export default function ContractsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Contracts</h1>
          <p className="text-slate-500 font-medium mt-2">Manage your active agreements and past contracts.</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search contracts..." 
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#00b259] focus:border-transparent font-medium"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {mockContracts.map((contract) => (
          <div key={contract.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 group hover:shadow-md transition-all">
            <div className="flex items-start gap-5">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-inner ${
                contract.status === 'Active' ? 'bg-[#00b259]/10 text-[#00b259]' : 'bg-slate-100 text-slate-500'
              }`}>
                <FileSignature className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">{contract.title}</h3>
                <p className="text-sm font-semibold text-slate-500 mt-1">Client: <span className="text-slate-700">{contract.client}</span></p>
                <div className="flex items-center gap-4 mt-3">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest ${
                    contract.status === 'Active' ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {contract.status}
                  </span>
                  <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5" /> Signed {contract.date}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-8 w-full sm:w-auto border-t sm:border-t-0 border-slate-100 pt-4 sm:pt-0">
              <div className="text-left sm:text-right">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{contract.type}</p>
                <p className="text-2xl font-black text-slate-900">{contract.value}</p>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => toast.success(`Downloading PDF for ${contract.title}...`)}
                  className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-[#00b259] hover:text-white transition-colors" title="Download PDF"
                >
                  <Download className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => toast.success(`Managing contract options for ${contract.title}`)}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors"
                >
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
