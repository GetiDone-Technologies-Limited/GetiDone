import { Calendar } from 'lucide-react';

export default function SchedulePage() {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[60vh] text-center">
      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-6">
        <Calendar className="w-8 h-8 text-slate-400" />
      </div>
      <h1 className="text-2xl font-bold text-slate-900 mb-2">Schedule</h1>
      <p className="text-slate-500 max-w-md">
        Manage your upcoming meetings and project deadlines.
      </p>
    </div>
  );
}
