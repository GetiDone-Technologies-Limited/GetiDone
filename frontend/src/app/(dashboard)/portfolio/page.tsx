'use client';

import { useState } from 'react';
import { Plus, LayoutGrid, Image as ImageIcon, ExternalLink, UploadCloud } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Modal } from '@/shared/components/ui/Modal';

const mockPortfolio = [
  { id: 1, title: 'Modern SaaS Dashboard UI', category: 'UI/UX Design', image: 'bg-blue-100', iconColor: 'text-blue-500' },
  { id: 2, title: 'E-commerce Mobile App', category: 'Mobile App', image: 'bg-orange-100', iconColor: 'text-orange-500' },
  { id: 3, title: 'Real Estate Website', category: 'Web Development', image: 'bg-purple-100', iconColor: 'text-purple-500' },
  { id: 4, title: 'Financial Analytics Tool', category: 'Dashboard', image: 'bg-[#00b259]/10', iconColor: 'text-[#00b259]' },
];

export default function PortfolioPage() {
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [projectTitle, setProjectTitle] = useState('');
  const [projectCategory, setProjectCategory] = useState('');

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectTitle || !projectCategory) return;
    toast.success(`Project "${projectTitle}" added to your portfolio!`);
    setIsAddProjectOpen(false);
    setProjectTitle('');
    setProjectCategory('');
  };

  const handleViewDetails = (title: string) => {
    toast.success(`Opening details for ${title}...`);
  };

  const handleExternalLink = (title: string) => {
    toast.success(`Opening live link for ${title}...`);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Portfolio</h1>
          <p className="text-slate-500 font-medium mt-2">Showcase your best work to potential clients.</p>
        </div>
        <button 
          onClick={() => setIsAddProjectOpen(true)}
          className="px-5 py-2.5 bg-[#00b259] text-white hover:bg-[#009e4f] rounded-xl text-sm font-bold transition-all shadow-sm flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockPortfolio.map((item) => (
          <div key={item.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden group hover:shadow-md transition-shadow">
            <div className={`h-48 w-full ${item.image} flex items-center justify-center relative`}>
              <ImageIcon className={`w-12 h-12 opacity-50 ${item.iconColor}`} />
              <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                 <button 
                   onClick={() => handleViewDetails(item.title)}
                   className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-900 hover:scale-110 transition-transform"
                   title="View Details"
                 >
                   <LayoutGrid className="w-4 h-4" />
                 </button>
                 <button 
                   onClick={() => handleExternalLink(item.title)}
                   className="w-10 h-10 bg-[#00b259] text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                   title="Visit Live Site"
                 >
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

      <Modal open={isAddProjectOpen} onClose={() => setIsAddProjectOpen(false)} title="Add Portfolio Project" size="md">
        <form onSubmit={handleAddProject} className="space-y-6">
          
          <div className="border-2 border-dashed border-slate-200 rounded-3xl p-8 flex flex-col items-center justify-center text-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform">
              <UploadCloud className="w-8 h-8 text-slate-400" />
            </div>
            <p className="text-sm font-bold text-slate-900 mb-1">Click to upload thumbnail</p>
            <p className="text-xs text-slate-500 font-medium">PNG, JPG or GIF (max. 5MB)</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-900">Project Title</label>
              <input 
                type="text" 
                required
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#00b259] focus:border-transparent"
                placeholder="e.g. Modern E-commerce App"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-900">Category</label>
              <select 
                required
                value={projectCategory}
                onChange={(e) => setProjectCategory(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#00b259] focus:border-transparent appearance-none"
              >
                <option value="" disabled>Select a category...</option>
                <option value="web">Web Development</option>
                <option value="mobile">Mobile App</option>
                <option value="ui">UI/UX Design</option>
                <option value="marketing">Marketing</option>
              </select>
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <button type="button" onClick={() => setIsAddProjectOpen(false)} className="flex-1 py-3 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl text-sm font-bold transition-colors">
              Cancel
            </button>
            <button type="submit" className="flex-1 py-3 bg-[#00b259] text-white hover:bg-[#009e4f] rounded-xl text-sm font-bold transition-colors">
              Save Project
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
