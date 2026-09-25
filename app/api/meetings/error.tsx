'use client';

import { useEffect } from 'react';
import Link from 'next/link';

interface MeetingsErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function MeetingsError({
  error,
  reset
}: MeetingsErrorProps) {
  useEffect(() => {
    console.error('Meetings route error:', error);
  }, [error]);

  return (
    <div className="mx-auto max-w-2xl px-6 py-20 text-center" role="alert">
      <p className="text-sm font-semibold uppercase tracking-wider text-red-600">
        Something went wrong
      </p>

      <h1 className="mt-2 text-3xl font-bold text-slate-900">
        We couldn&apos;t load this page
      </h1>

      <p className="mt-3 text-slate-600">
        {error.message ||
          'An unexpected error occurred while loading meeting data.'}
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-lg bg-indigo-600 px-5 py-3 font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Try Again
        </button>

        <Link
          href="/meetings"
          className="rounded-lg border border-slate-300 px-5 py-3 font-medium text-slate-700 hover:bg-slate-50"
        >
          Back to meetings
        </Link>
      </div>
    </div>
  );
}
