'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/shared/components/ui/Input';
import { Button } from '@/shared/components/ui/Button';
import { useAuth } from '../hooks/useAuth';
import type { UserRole } from '@/shared/types/common.types';

export function RegisterForm() {
  const router = useRouter();
  const { register, isRegistering, registerError } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'FREELANCER' as UserRole });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await register(form);
      if (result.user.role === 'CLIENT') router.push('/dashboard/client');
      else router.push('/dashboard/freelancer');
    } catch {
      // error shown via registerError
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {registerError && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {registerError.message}
        </div>
      )}

      <Input
        label="Full name"
        id="reg-name"
        placeholder="Jane Smith"
        autoComplete="name"
        required
        value={form.name}
        onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
      />

      <Input
        label="Email address"
        type="email"
        id="reg-email"
        placeholder="you@example.com"
        autoComplete="email"
        required
        value={form.email}
        onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
      />

      <Input
        label="Password"
        type="password"
        id="reg-password"
        placeholder="At least 8 characters"
        autoComplete="new-password"
        required
        minLength={8}
        value={form.password}
        onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
      />

      {/* Role selector */}
      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium text-slate-700">I want to…</span>
        <div className="grid grid-cols-2 gap-3">
          {(['CLIENT', 'FREELANCER'] as UserRole[]).map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => setForm((p) => ({ ...p, role }))}
              className={`rounded-xl border-2 p-3 text-sm font-medium transition-all ${
                form.role === role
                  ? 'border-violet-500 bg-violet-50 text-violet-700'
                  : 'border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              {role === 'CLIENT' ? '🏢 Hire talent' : '💼 Find work'}
            </button>
          ))}
        </div>
      </div>

      <Button type="submit" size="lg" loading={isRegistering} className="w-full">
        Create account
      </Button>
    </form>
  );
}
