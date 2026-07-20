import { Wallet, Briefcase, Send, Eye, TrendingUp } from 'lucide-react';

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
    <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-start gap-4">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${iconBgColor}`}>
        <div className={iconColor}>{icon}</div>
      </div>
      <div>
        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">{title}</p>
        <p className="text-2xl font-black text-slate-900 mb-1">{value}</p>
        <p className={`flex items-center gap-1 text-xs font-semibold ${trendUp ? 'text-[#00b259]' : 'text-red-500'}`}>
          {trendUp ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingUp className="w-3.5 h-3.5 rotate-180" />}
          {trend} from last month
        </p>
      </div>
    </div>
  );
}

export function StatCardsRow() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard 
        title="Total Earnings"
        value="$24,560"
        trend="↑ 18%"
        trendUp={true}
        icon={<Wallet className="w-6 h-6" />}
        iconBgColor="bg-[#00b259]/10"
        iconColor="text-[#00b259]"
      />
      <StatCard 
        title="Active Projects"
        value="4"
        trend="↑ 2"
        trendUp={true}
        icon={<Briefcase className="w-6 h-6" />}
        iconBgColor="bg-purple-100"
        iconColor="text-purple-600"
      />
      <StatCard 
        title="Proposals Sent"
        value="18"
        trend="↑ 6"
        trendUp={true}
        icon={<Send className="w-6 h-6" />}
        iconBgColor="bg-orange-100"
        iconColor="text-orange-500"
      />
      <StatCard 
        title="Profile Views"
        value="1,248"
        trend="↑ 32%"
        trendUp={true}
        icon={<Eye className="w-6 h-6" />}
        iconBgColor="bg-blue-100"
        iconColor="text-blue-500"
      />
    </div>
  );
}
