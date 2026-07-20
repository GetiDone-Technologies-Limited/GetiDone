import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const mockSchedule = [
  { id: 'ev1', date: 'MAY 24', title: 'Project Meeting', subtitle: 'E-commerce Website', time: '10:00 AM' },
  { id: 'ev2', date: 'MAY 24', title: 'Logo Review', subtitle: 'Brand Identity Design', time: '2:00 PM' },
  { id: 'ev3', date: 'MAY 25', title: 'API Documentation', subtitle: 'DataSync Solutions', time: '11:00 AM' },
  { id: 'ev4', date: 'MAY 26', title: 'Client Call', subtitle: 'Mobile App Development', time: '3:00 PM' },
];

export function UpcomingScheduleWidget() {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-slate-900">Upcoming Schedule</h2>
        <Link href="/schedule" className="text-sm font-bold text-[#00b259] hover:underline flex items-center gap-1">
          View Calendar <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="space-y-5">
        {mockSchedule.map((event) => (
          <div key={event.id} className="flex items-start gap-4 group">
            <div className="flex flex-col items-center justify-center shrink-0 w-10">
              <span className="text-[10px] font-bold text-[#00b259] uppercase">{event.date.split(' ')[0]}</span>
              <span className="text-sm font-black text-slate-900">{event.date.split(' ')[1]}</span>
            </div>
            
            <div className="flex-1 min-w-0 pt-0.5">
              <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#00b259] transition-colors cursor-pointer truncate">
                {event.title}
              </h4>
              <p className="text-[11px] font-semibold text-slate-500 truncate">{event.subtitle}</p>
            </div>
            
            <div className="text-right shrink-0 pt-0.5">
              <span className="text-xs font-bold text-slate-600">{event.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
