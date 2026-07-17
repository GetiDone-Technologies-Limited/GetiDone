'use client';

import { use } from 'react';
import { EscrowPanel } from '@/features/payment/components/EscrowPanel';
import { Badge } from '@/shared/components/ui/Badge';
import { Briefcase, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useAuthStore } from '@/store/auth.store';

export default function ProjectWorkspacePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const projectId = resolvedParams.id;
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-surface py-12">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-8">
          <Link href="/dashboard/client" className="inline-flex items-center text-sm font-medium text-on-surface-variant hover:text-primary transition-colors mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
          </Link>
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Briefcase className="w-5 h-5" />
                </div>
                <h1 className="text-3xl font-bold text-on-surface">MVP Web Application</h1>
              </div>
              <p className="text-on-surface-variant ml-13">Project ID: {projectId}</p>
            </div>
            <Badge variant="warning">In Progress</Badge>
          </div>
        </div>

        {/* Warning if not authenticated */}
        {!user && (
          <div className="bg-orange-50 text-orange-800 p-4 rounded-xl border border-orange-200 mb-8">
            <p className="font-semibold">You are not logged in.</p>
            <p className="text-sm mt-1">To test the Escrow functions, you need to be logged in as the Client who owns this project. For testing purposes, make sure the backend endpoint authenticates you properly or disables the guard.</p>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Main Content Area */}
            <div className="bg-surface-container border border-outline rounded-2xl p-6">
              <h2 className="text-xl font-bold text-on-surface mb-4">Project Workspace</h2>
              <p className="text-on-surface-variant mb-4">
                This is where the Freelancer and Client collaborate. Deliverables are uploaded here and reviewed by the Client.
              </p>
              
              <div className="border-t border-outline pt-4 mt-8">
                <h3 className="font-semibold text-on-surface mb-4">Deliverables</h3>
                <div className="p-8 border border-dashed border-outline rounded-xl flex items-center justify-center text-on-surface-variant">
                  No deliverables submitted yet.
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Sidebar Tools */}
            <EscrowPanel projectId={projectId} />
          </div>
        </div>
      </div>
    </div>
  );
}
