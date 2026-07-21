'use client';

import { useState } from 'react';
import { BarChart3, Download, TrendingUp, Filter, Calendar as CalendarIcon } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Modal } from '@/shared/components/ui/Modal';

export default function ReportsPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [dateRange, setDateRange] = useState('ytd');

  const handleExport = () => {
    toast.success('Exporting report as CSV...');
  };

  const handleApplyFilter = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Filters applied successfully');
    setIsFilterOpen(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Analytics & Reports</h1>
          <p className="text-slate-500 font-medium mt-2">Comprehensive insights into your performance and earnings.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsFilterOpen(true)}
            className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-sm font-bold transition-all shadow-sm flex items-center gap-2"
          >
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button 
            onClick={handleExport}
            className="px-5 py-2.5 bg-slate-900 text-white hover:bg-slate-800 rounded-xl text-sm font-bold transition-all shadow-sm flex items-center gap-2"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between min-h-[140px]">
          <p className="text-sm font-semibold text-slate-500 mb-2">Total Revenue ({dateRange === 'ytd' ? 'YTD' : dateRange === '30d' ? '30 Days' : 'All Time'})</p>
          <p className="text-4xl font-black text-slate-900 tracking-tight">$45,231.00</p>
          <p className="text-xs font-bold text-[#00b259] mt-3 flex items-center">
            <TrendingUp className="w-3.5 h-3.5 mr-1" /> +24% vs previous period
          </p>
        </div>
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between min-h-[140px]">
          <p className="text-sm font-semibold text-slate-500 mb-2">Project Success Rate</p>
          <p className="text-4xl font-black text-slate-900 tracking-tight">98.5%</p>
          <p className="text-xs font-bold text-[#00b259] mt-3 flex items-center">
            <TrendingUp className="w-3.5 h-3.5 mr-1" /> +2.1% vs last month
          </p>
        </div>
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between min-h-[140px]">
          <p className="text-sm font-semibold text-slate-500 mb-2">Avg. Completion Time</p>
          <p className="text-4xl font-black text-slate-900 tracking-tight">14 Days</p>
          <p className="text-xs font-bold text-slate-400 mt-3 flex items-center">
            Stable across last 6 months
          </p>
        </div>
      </div>

      {/* Chart Placeholder Area */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8 min-h-[400px] flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mb-6 shadow-inner">
          <BarChart3 className="w-10 h-10 text-slate-300" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">Detailed Charts Coming Soon</h3>
        <p className="text-slate-500 max-w-md font-medium">
          We are currently integrating advanced charting libraries to bring you beautiful, interactive visualizations of your data.
        </p>
      </div>

      {/* Filter Modal */}
      <Modal open={isFilterOpen} onClose={() => setIsFilterOpen(false)} title="Filter Reports" size="sm">
        <form onSubmit={handleApplyFilter} className="space-y-6">
          <div className="space-y-4">
            <label className="block text-sm font-bold text-slate-900">Date Range</label>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setDateRange('7d')}
                className={`w-full p-4 rounded-xl border flex items-center gap-3 transition-all ${dateRange === '7d' ? 'border-[#00b259] bg-[#00b259]/5 text-[#00b259]' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}
              >
                <CalendarIcon className="w-5 h-5" />
                <span className="text-sm font-bold">Last 7 Days</span>
              </button>
              <button
                type="button"
                onClick={() => setDateRange('30d')}
                className={`w-full p-4 rounded-xl border flex items-center gap-3 transition-all ${dateRange === '30d' ? 'border-[#00b259] bg-[#00b259]/5 text-[#00b259]' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}
              >
                <CalendarIcon className="w-5 h-5" />
                <span className="text-sm font-bold">Last 30 Days</span>
              </button>
              <button
                type="button"
                onClick={() => setDateRange('ytd')}
                className={`w-full p-4 rounded-xl border flex items-center gap-3 transition-all ${dateRange === 'ytd' ? 'border-[#00b259] bg-[#00b259]/5 text-[#00b259]' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}
              >
                <CalendarIcon className="w-5 h-5" />
                <span className="text-sm font-bold">Year to Date (YTD)</span>
              </button>
              <button
                type="button"
                onClick={() => setDateRange('all')}
                className={`w-full p-4 rounded-xl border flex items-center gap-3 transition-all ${dateRange === 'all' ? 'border-[#00b259] bg-[#00b259]/5 text-[#00b259]' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}
              >
                <CalendarIcon className="w-5 h-5" />
                <span className="text-sm font-bold">All Time</span>
              </button>
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <button type="button" onClick={() => setIsFilterOpen(false)} className="flex-1 py-3 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl text-sm font-bold transition-colors">
              Cancel
            </button>
            <button type="submit" className="flex-1 py-3 bg-[#00b259] text-white hover:bg-[#009e4f] rounded-xl text-sm font-bold transition-colors">
              Apply Filter
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
