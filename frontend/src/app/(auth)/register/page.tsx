import type { Metadata } from 'next';
import Link from 'next/link';
import { RegisterForm } from '@/features/auth/components/RegisterForm';

export const metadata: Metadata = { title: 'Create account' };

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-950 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-white p-8 shadow-2xl">
          <div className="mb-8 text-center">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-600 text-white font-black text-2xl mb-4">G</div>
            <h1 className="text-2xl font-bold text-slate-900">Get started free</h1>
            <p className="text-sm text-slate-500 mt-1">Create your GetiDone account in seconds</p>
          </div>
          <RegisterForm />
          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-violet-600 hover:text-violet-800">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
