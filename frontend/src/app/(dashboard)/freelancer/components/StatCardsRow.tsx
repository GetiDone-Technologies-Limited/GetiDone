import { Wallet, Briefcase, Send, Eye, TrendingUp } from 'lucide-react';
import { useDashboardStats } from '@/features/dashboard/hooks/useDashboard';
import { LoadingSpinner } from '@/shared/components/feedback/LoadingSpinner';

interface StatCardProps {
  title: string;
  value: string;
  trend: string;
  trendUp: boolean;
  icon: React.ReactNode;
  iconBgColor: string;
  iconColor: string;
}

function StatCard({ title, value, trend, trendUp, icon, iconBgColor, iconColor }: StatCardProps) {
  return (
    <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-start gap-3 sm:gap-4">
      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shrink-0 ${iconBgColor}`}>
        <div className={iconColor}>{icon}</div>
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 truncate" title={title}>{title}</p>
        <p className="text-xl sm:text-2xl font-black text-slate-900 mb-1 truncate" title={value}>{value}</p>
        <p className={`flex items-center gap-1 text-[10px] sm:text-xs font-semibold ${trendUp ? 'text-[#00b259]' : 'text-red-500'} truncate`} title={`${trend} from last month`}>
          {trendUp ? <TrendingUp className="w-3.5 h-3.5 shrink-0" /> : <TrendingUp className="w-3.5 h-3.5 rotate-180 shrink-0" />}
          <span className="truncate">{trend} from last month</span>
        </p>
      </div>
    </div>
  );
}

export function StatCardsRow() {
  const { data: stats, isLoading } = useDashboardStats();

  if (isLoading) {
    return <div className="h-32 flex items-center justify-center"><LoadingSpinner size="md" /></div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard 
        title="Total Earnings"
        value={`$${stats?.earnings?.toLocaleString() || 0}`}
        trend="↑ 18%"
        trendUp={true}
        icon={<Wallet className="w-6 h-6" />}
        iconBgColor="bg-[#00b259]/10"
        iconColor="text-[#00b259]"
      />
      <StatCard 
        title="Active Projects"
        value={(stats?.activeProjects || 0).toString()}
        trend="↑ 2"
        trendUp={true}
        icon={<Briefcase className="w-6 h-6" />}
        iconBgColor="bg-purple-100"
        iconColor="text-purple-600"
      />
      <StatCard 
        title="Proposals Sent"
        value={(stats?.proposalsCount || 0).toString()}
        trend="↑ 6"
        trendUp={true}
        icon={<Send className="w-6 h-6" />}
        iconBgColor="bg-orange-100"
        iconColor="text-orange-500"
      />
      <StatCard 
        title="Jobs Completed"
        value={(stats?.jobsCompleted || 0).toString()}
        trend="↑ 32%"
        trendUp={true}
        icon={<Eye className="w-6 h-6" />}
        iconBgColor="bg-blue-100"
        iconColor="text-blue-500"
      />
    </div>
  );
}

