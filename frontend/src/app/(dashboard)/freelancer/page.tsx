import type { Metadata } from 'next';
import { WelcomeHeader } from './components/WelcomeHeader';
import { StatCardsRow } from './components/StatCardsRow';
import { RecommendedJobs } from './components/RecommendedJobs';
import { MyProposalsWidget } from './components/MyProposalsWidget';
import { ActiveProjectsWidget } from './components/ActiveProjectsWidget';
import { BoostVisibilityBanner } from './components/BoostVisibilityBanner';
import { ProfileOverviewWidget } from './components/ProfileOverviewWidget';
import { UpcomingScheduleWidget } from './components/UpcomingScheduleWidget';
import { RecentActivityWidget } from './components/RecentActivityWidget';

export const metadata: Metadata = { title: 'Freelancer Dashboard' };

export default function FreelancerDashboardPage() {
  return (
    <div className="flex flex-col xl:flex-row gap-8">
      {/* Main Content Column */}
      <div className="flex-1 min-w-0">
        <WelcomeHeader />
        <StatCardsRow />
        <RecommendedJobs />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MyProposalsWidget />
          <ActiveProjectsWidget />
        </div>
        
        <BoostVisibilityBanner />
      </div>
      
      {/* Right Sidebar Column */}
      <div className="w-full xl:w-[320px] shrink-0">
        <ProfileOverviewWidget />
        <UpcomingScheduleWidget />
        <RecentActivityWidget />
      </div>
    </div>
  );
}
