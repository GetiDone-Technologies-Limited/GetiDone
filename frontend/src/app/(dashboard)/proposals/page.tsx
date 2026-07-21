import { Search, SlidersHorizontal, MoreVertical } from 'lucide-react';
import Link from 'next/link';

const mockProposals = [
  { id: 'p1', title: 'SaaS Dashboard Development', client: 'TechNova Inc.', price: '$3,500', type: 'Fixed Price', status: 'Interview', statusColor: 'bg-purple-100 text-purple-600', iconColor: 'bg-purple-100 text-purple-600', date: 'Oct 12, 2023' },
  { id: 'p2', title: 'Mobile App Development', client: 'HealthPlus', price: '$2,800', type: 'Fixed Price', status: 'Viewed', statusColor: 'bg-blue-100 text-blue-600', iconColor: 'bg-[#00b259]/10 text-[#00b259]', date: 'Oct 10, 2023' },
  { id: 'p3', title: 'Website Maintenance', client: 'Bright Solutions', price: '$500', type: 'Fixed Price', status: 'Pending', statusColor: 'bg-orange-100 text-orange-600', iconColor: 'bg-blue-100 text-blue-600', date: 'Oct 08, 2023' },
  { id: 'p4', title: 'API Integration Project', client: 'DataSync Solutions', price: '$1,600', type: 'Fixed Price', status: 'Offer', statusColor: 'bg-[#00b259]/10 text-[#00b259]', iconColor: 'bg-purple-100 text-purple-600', date: 'Oct 05, 2023' },
  { id: 'p5', title: 'Landing Page Redesign', client: 'Acme Corp', price: '$900', type: 'Fixed Price', status: 'Declined', statusColor: 'bg-slate-100 text-slate-600', iconColor: 'bg-orange-100 text-orange-600', date: 'Oct 01, 2023' }
];

export default function ProposalsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Proposals</h1>
          <p className="text-slate-500 font-medium mt-2">Manage all your active and past job proposals.</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search proposals..." 
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#00b259] focus:border-transparent transition-shadow font-medium"
            />
          </div>
          <button className="px-4 py-2.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-sm font-bold transition-all shadow-sm flex items-center justify-center shrink-0">
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="p-6 text-xs font-bold text-slate-500 uppercase tracking-widest w-1/2">Project & Client</th>
                <th className="p-6 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Budget</th>
                <th className="p-6 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Submitted</th>
                <th className="p-6 text-xs font-bold text-slate-500 uppercase tracking-widest text-center">Status</th>
                <th className="p-6 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockProposals.map((proposal) => (
                <tr key={proposal.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="p-6">
                    <div className="flex items-center gap-5">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-inner ${proposal.iconColor}`}>
                        <span className="font-black text-xl">{proposal.title.charAt(0)}</span>
                      </div>
                      <div>
                        <Link href="#">
                          <h4 className="text-base font-extrabold text-slate-900 group-hover:text-[#00b259] transition-colors">
                            {proposal.title}
                          </h4>
                        </Link>
                        <p className="text-[12px] font-semibold text-slate-500 mt-1">{proposal.client}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6 text-right">
                    <p className="text-base font-black text-slate-900">{proposal.price}</p>
                    <p className="text-[11px] font-bold text-slate-400 mt-1 uppercase tracking-widest">{proposal.type}</p>
                  </td>
                  <td className="p-6 text-right">
                    <p className="text-sm font-bold text-slate-700">{proposal.date}</p>
                  </td>
                  <td className="p-6 text-center">
                    <span className={`inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-bold shadow-sm ${proposal.statusColor}`}>
                      {proposal.status}
                    </span>
                  </td>
                  <td className="p-6 text-right">
                     <button className="w-10 h-10 inline-flex items-center justify-center rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
