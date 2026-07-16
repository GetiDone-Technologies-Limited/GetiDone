import type { Metadata } from 'next';
import { Navbar } from '@/shared/components/layout/Navbar';
import { ReviewList } from '@/features/reviews/components/ReviewList';
import { ReviewForm } from '@/features/reviews/components/ReviewForm';

export const metadata: Metadata = { title: 'Project deliverables' };

export default async function DeliverablesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Deliverables &amp; Reviews</h1>
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-base font-semibold text-slate-800 mb-4">Project reviews</h2>
            {/* ReviewList shows reviews for the project */}
            <ReviewList userId={id} />
          </div>
          <div>
            <h2 className="text-base font-semibold text-slate-800 mb-4">Leave a review</h2>
            <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
              <ReviewForm projectId={id} revieweeId="" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
