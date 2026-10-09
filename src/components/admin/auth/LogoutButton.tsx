'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function LogoutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogout = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/admin/auth/logout', { method: 'POST' });
      if (!response.ok) throw new Error('Unable to log out. Please try again.');
      router.push('/admin/login');
      router.refresh();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unable to log out.');
      setIsLoading(false);
    }
  };

  return (
    <div><button
      onClick={handleLogout}
      disabled={isLoading}
      className="w-full flex min-h-11 items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium text-slate-500 hover:text-red-600 bg-white border border-slate-200 hover:border-red-200 hover:bg-red-50 rounded-xl transition-colors focus-visible:outline-2 focus-visible:outline-primary disabled:opacity-50"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
        />
      </svg>
      {isLoading ? 'Logging out...' : 'Sign out'}
    </button>{error && <p role="alert" className="mt-2 text-sm text-red-600">{error}</p>}</div>
  );
}
