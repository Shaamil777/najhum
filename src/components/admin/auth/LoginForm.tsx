"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { loginSchema, type LoginData } from '@/lib/validation/auth-schemas';
import { ArrowRight, Eye, EyeOff, LoaderCircle, LockKeyhole, UserRound } from 'lucide-react';

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginData) => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Invalid credentials');
      }

      router.push('/admin/dashboard');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" aria-label="Admin sign in" aria-busy={isLoading}>
      {error && (
        <div role="alert" className="bg-red-50 text-red-700 p-3 rounded-xl text-sm border border-red-200">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="username" className="block text-xs font-semibold text-slate-700">
          Username
        </label>
        <div className="relative mt-2">
          <UserRound size={17} aria-hidden="true" className="pointer-events-none absolute top-4 left-4 text-slate-400" />
          <input
            id="username"
            type="text"
            autoComplete="username"
            autoCapitalize="none"
            spellCheck={false}
            placeholder="Enter your username"
            aria-invalid={!!errors.username}
            aria-describedby={errors.username ? 'username-error' : undefined}
            {...register('username')}
            className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/70 pr-4 pl-11 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 focus:outline-none disabled:opacity-60"
            disabled={isLoading}
          />
          {errors.username && (
            <p id="username-error" role="alert" className="mt-2 text-xs text-red-600">{errors.username.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-xs font-semibold text-slate-700">
          Password
        </label>
        <div className="relative mt-2">
          <LockKeyhole size={17} aria-hidden="true" className="pointer-events-none absolute top-4 left-4 text-slate-400" />
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            placeholder="Enter your password"
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? 'password-error' : undefined}
            {...register('password')}
            className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/70 pr-12 pl-11 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 focus:outline-none disabled:opacity-60"
            disabled={isLoading}
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)} disabled={isLoading} aria-label={showPassword ? 'Hide password' : 'Show password'} aria-pressed={showPassword} className="absolute top-1 right-1 flex h-10 w-10 items-center justify-center rounded-lg text-slate-400 transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-primary">
            {showPassword ? <EyeOff size={17} aria-hidden="true" /> : <Eye size={17} aria-hidden="true" />}
          </button>
          {errors.password && (
            <p id="password-error" role="alert" className="mt-2 text-xs text-red-600">{errors.password.message}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-white shadow-[0_6px_20px_-6px_rgba(59,130,246,0.6)] transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? 'Signing in...' : 'Sign in'}
        {isLoading ? <LoaderCircle size={17} aria-hidden="true" className="animate-spin" /> : <ArrowRight size={17} aria-hidden="true" />}
      </button>
    </form>
  );
}
