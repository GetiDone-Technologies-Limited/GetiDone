import Link from 'next/link';
import { ArrowRight, CheckCircle2, Eye, Star } from 'lucide-react';

const mockActivity = [
  { id: 'act1', type: 'payment', content: 'Payment of $1,250 received from TechNova Inc.', time: '2 hours ago', icon: <CheckCircle2 className="w-4 h-4 text-white" />, iconBg: 'bg-[#00b259]' },
  { id: 'act2', type: 'milestone', content: 'Milestone "Frontend Development" approved', time: '5 hours ago', icon: <CheckCircle2 className="w-4 h-4 text-white" />, iconBg: 'bg-[#00b259]' },
  { id: 'act3', type: 'review', content: 'New review received', rating: 5, time: '1 day ago', icon: <CheckCircle2 className="w-4 h-4 text-white" />, iconBg: 'bg-[#00b259]' },
  { id: 'act4', type: 'view', content: 'Profile viewed by 18 clients', time: '1 day ago', icon: <Eye className="w-4 h-4 text-white" />, iconBg: 'bg-slate-400' },
];

import { useMyProjects } from '@/features/dashboard/hooks/useDashboard';
import { LoadingSpinner } from '@/shared/components/feedback/LoadingSpinner';

export function RecentActivityWidget() {
  const { data: myProjects, isLoading } = useMyProjects();

  if (isLoading) {
    return <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 mb-6 h-64 flex items-center justify-center"><LoadingSpinner /></div>;
  }

  const actualActivities = (myProjects || []).slice(0, 3).map((p, idx) => ({
    id: `actual-${p.id}-${idx}`,
    type: 'project',
    content: `Project "${p.job?.title}" status changed to ${p.status}`,
    time: 'Just now',
    icon: <CheckCircle2 className="w-4 h-4 text-white" />,
    iconBg: 'bg-blue-500'
  }));

  const displayActivity = [...actualActivities, ...mockActivity];

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-slate-900">Recent Activity</h2>
        <Link href="/activity" className="text-sm font-bold text-[#00b259] hover:underline flex items-center gap-1">
          View All <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="space-y-5">
        {displayActivity.map((activity) => (
          <div key={activity.id} className="flex items-start gap-4">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${activity.iconBg}`}>
              {activity.icon}
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-700 leading-relaxed">
                {activity.content}
                {activity.rating && (
                  <span className="inline-flex items-center gap-0.5 ml-1">
                    {[1, 2, 3, 4, 5].map(i => (
                      <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
                    ))}
                  </span>
                )}
              </p>
            </div>
            
            <div className="text-right shrink-0 pt-0.5">
              <span className="text-[10px] font-semibold text-slate-400">{activity.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
