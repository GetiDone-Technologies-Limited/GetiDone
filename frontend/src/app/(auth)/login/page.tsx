import type { Metadata } from 'next';
import Link from 'next/link';
import { LoginForm } from '@/features/auth/components/LoginForm';

import Image from 'next/image';

export const metadata: Metadata = { title: 'Sign in' };

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-950 to-accent-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-white p-8 shadow-2xl">
          <div className="mb-8 text-center flex flex-col items-center">
            <Image src="/logo.png" alt="GetiDone" width={200} height={56} className="h-14 w-auto mb-4" />
            <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>
            <p className="text-sm text-slate-500 mt-1">Sign in to your GetiDone account</p>
          </div>
          <LoginForm />
          <p className="mt-6 text-center text-sm text-slate-500">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="font-semibold text-primary-600 hover:text-primary-800">
              Sign up free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

