import { BarChart3, TrendingUp } from 'lucide-react';

export default function ReportsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Reports & Analytics</h1>
          <p className="text-slate-500 mt-2 font-medium">Insights into your project performance and spending.</p>
        </div>
        <button className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-sm transition-colors flex items-center gap-2">
          <TrendingUp className="w-4 h-4" /> Export Report
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-16 text-center flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-20 h-20 rounded-full bg-purple-50 flex items-center justify-center mb-6">
          <BarChart3 className="w-10 h-10 text-purple-500" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Analytics Dashboard Coming Soon</h3>
        <p className="text-slate-500 max-w-md">
          We&apos;re building powerful analytics tools to help you track ROI, time-to-completion, and team performance metrics.
        </p>
      </div>
    </div>
  );
}
