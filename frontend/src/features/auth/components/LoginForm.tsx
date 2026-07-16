'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/shared/components/ui/Input';
import { Button } from '@/shared/components/ui/Button';
import { useAuth } from '../hooks/useAuth';

export function LoginForm() {
  const router = useRouter();
  const { login, isLoggingIn, loginError } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await login(form);
      if (result.user.role === 'CLIENT') router.push('/dashboard/client');
      else if (result.user.role === 'FREELANCER') router.push('/dashboard/freelancer');
      else router.push('/');
    } catch {
      // error shown via loginError
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {loginError && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {loginError.message}
        </div>
      )}

      <Input
        label="Email address"
        type="email"
        id="login-email"
        placeholder="you@example.com"
        autoComplete="email"
        required
        value={form.email}
        onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
      />

      <Input
        label="Password"
        type="password"
        id="login-password"
        placeholder="••••••••"
        autoComplete="current-password"
        required
        value={form.password}
        onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
      />

      <Button type="submit" size="lg" loading={isLoggingIn} className="w-full">
        Sign in
      </Button>
    </form>
  );
}
