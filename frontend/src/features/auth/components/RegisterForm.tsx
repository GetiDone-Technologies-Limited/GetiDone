'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/shared/components/ui/Button';
import { useAuth } from '../hooks/useAuth';
import type { UserRole } from '@/shared/types/common.types';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

export function RegisterForm() {
  const router = useRouter();
  const { register, isRegistering, registerError } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'FREELANCER' as UserRole });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await register(form);
      if (result.user.role === 'CLIENT') router.push('/client');
      else router.push('/freelancer');
    } catch {
      // error shown via registerError
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {registerError && (
          <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
            {registerError.message}
          </div>
        )}

        <div className="space-y-1">
          <label className="text-sm font-semibold text-slate-900">Full name</label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Jane Smith"
              required
              className="block w-full rounded-xl border border-slate-200 py-3 pl-10 pr-3 text-sm placeholder:text-slate-400 focus:border-[#00b259] focus:outline-none focus:ring-1 focus:ring-[#00b259]"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-semibold text-slate-900">Email address</label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <input
              type="email"
              placeholder="you@example.com"
              required
              className="block w-full rounded-xl border border-slate-200 py-3 pl-10 pr-3 text-sm placeholder:text-slate-400 focus:border-[#00b259] focus:outline-none focus:ring-1 focus:ring-[#00b259]"
              value={form.email}
              onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-semibold text-slate-900">Password</label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="At least 8 characters"
              required
              minLength={8}
              className="block w-full rounded-xl border border-slate-200 py-3 pl-10 pr-10 text-sm placeholder:text-slate-400 focus:border-[#00b259] focus:outline-none focus:ring-1 focus:ring-[#00b259]"
              value={form.password}
              onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Role selector */}
        <div className="flex flex-col gap-1 mt-2">
          <span className="text-sm font-semibold text-slate-900 mb-1">I want to…</span>
          <div className="grid grid-cols-2 gap-3">
            {(['CLIENT', 'FREELANCER'] as UserRole[]).map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => setForm((p) => ({ ...p, role }))}
                className={`rounded-xl border-2 p-3 text-sm font-bold transition-all ${
                  form.role === role
                    ? 'border-[#00b259] bg-[#00b259]/5 text-[#00b259]'
                    : 'border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {role === 'CLIENT' ? '🏢 Hire talent' : '💼 Find work'}
              </button>
            ))}
          </div>
        </div>

        <Button 
          type="submit" 
          loading={isRegistering} 
          disabled={isRegistering}
          className="w-full mt-4 py-6 text-base font-bold rounded-xl bg-[#00b259] hover:bg-[#009b4d] text-white shadow-lg shadow-[#00b259]/20 transition-all border-none"
        >
          Create Account →
        </Button>

        <p className="text-center text-[13px] text-slate-500 mt-2">
          By signing up, you agree to our <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>.
        </p>
      </form>
    </div>
  );
}
