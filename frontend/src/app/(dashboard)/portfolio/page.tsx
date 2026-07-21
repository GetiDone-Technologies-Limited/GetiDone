import { Plus, LayoutGrid, Image as ImageIcon, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const mockPortfolio = [
  { id: 1, title: 'Modern SaaS Dashboard UI', category: 'UI/UX Design', image: 'bg-blue-100', iconColor: 'text-blue-500' },
  { id: 2, title: 'E-commerce Mobile App', category: 'Mobile App', image: 'bg-orange-100', iconColor: 'text-orange-500' },
  { id: 3, title: 'Real Estate Website', category: 'Web Development', image: 'bg-purple-100', iconColor: 'text-purple-500' },
  { id: 4, title: 'Financial Analytics Tool', category: 'Dashboard', image: 'bg-[#00b259]/10', iconColor: 'text-[#00b259]' },
];

export default function PortfolioPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Portfolio</h1>
          <p className="text-slate-500 font-medium mt-2">Showcase your best work to potential clients.</p>
        </div>
        <button className="px-5 py-2.5 bg-[#00b259] text-white hover:bg-[#009e4f] rounded-xl text-sm font-bold transition-all shadow-sm flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockPortfolio.map((item) => (
          <div key={item.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden group hover:shadow-md transition-shadow">
            <div className={`h-48 w-full ${item.image} flex items-center justify-center relative`}>
              <ImageIcon className={`w-12 h-12 opacity-50 ${item.iconColor}`} />
              <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                 <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-900 hover:scale-110 transition-transform">
                   <LayoutGrid className="w-4 h-4" />
                 </button>
                 <button className="w-10 h-10 bg-[#00b259] text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                   <ExternalLink className="w-4 h-4" />
                 </button>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#00b259] transition-colors">{item.title}</h3>
              <p className="text-sm font-medium text-slate-500 mt-1">{item.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
