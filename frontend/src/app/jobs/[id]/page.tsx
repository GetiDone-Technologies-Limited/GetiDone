import type { Metadata } from 'next';
import { Navbar } from '@/shared/components/layout/Navbar';
import { JobDetail } from '@/features/jobs/components/JobDetail';

export const metadata: Metadata = { title: 'Job detail' };

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 py-10">
        <JobDetail jobId={id} />
      </main>
    </div>
  );
}
