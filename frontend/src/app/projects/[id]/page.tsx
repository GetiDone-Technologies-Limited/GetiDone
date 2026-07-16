import type { Metadata } from 'next';
import { Navbar } from '@/shared/components/layout/Navbar';
import { EscrowPanel } from '@/features/payment/components/EscrowPanel';
import { PaymentHistory } from '@/features/payment/components/PaymentHistory';

export const metadata: Metadata = { title: 'Project workspace' };

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Project workspace</h1>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <EscrowPanel projectId={id} />
          </div>
          <div className="lg:col-span-2">
            <PaymentHistory projectId={id} />
          </div>
        </div>
      </main>
    </div>
  );
}
