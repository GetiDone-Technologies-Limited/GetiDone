export interface DashboardStats {
  activeProjects: number;
  inReview?: number;
  hiredCount?: number;
  totalSpent?: number;
  
  proposalsCount?: number;
  earnings?: number;
  successRate?: number;
  jobsCompleted?: number;
}

export interface DashboardProject {
  id: string;
  jobId: string;
  clientId: string;
  freelancerId: string;
  status: 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  escrowStatus: 'UNFUNDED' | 'FUNDED' | 'RELEASED';
  budget: number;
  createdAt: string;
  updatedAt: string;
  job: {
    id: string;
    title: string;
    budget: number;
  };
  client: {
    name: string;
    avatarUrl: string | null;
  };
  freelancer: {
    name: string;
    avatarUrl: string | null;
  };
}

export interface DashboardProposal {
  id: string;
  jobId: string;
  freelancerId: string;
  proposal: string;
  bidAmount: number;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  createdAt: string;
  updatedAt: string;
  job: {
    title: string;
    budget: number;
    client: {
      name: string;
    };
  };
}
