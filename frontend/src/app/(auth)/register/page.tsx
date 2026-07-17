import type { Metadata } from 'next';
import Link from 'next/link';
import { RegisterForm } from '@/features/auth/components/RegisterForm';
import Image from 'next/image';

export const metadata: Metadata = { title: 'Create account' };

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-950 to-accent-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-white p-8 shadow-2xl">
          <div className="mb-8 text-center flex flex-col items-center">
            <Image src="/logo.png" alt="GetiDone" width={200} height={56} className="h-14 w-auto mb-4" />
            <h1 className="text-2xl font-bold text-slate-900">Create an account</h1>
            <p className="text-sm text-slate-500 mt-1">Create your GetiDone account in seconds</p>
          </div>
          <RegisterForm />
          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-primary-600 hover:text-primary-800">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

