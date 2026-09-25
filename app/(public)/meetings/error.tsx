
'use client';

import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16 text-center">
      <h1 className="text-3xl font-bold">
        Something went wrong
      </h1>

      <p className="mt-4 text-gray-600">
        We could not load the meetings right now. Please try again.
      </p>

      {error.digest && (
        <p className="mt-2 text-sm text-gray-500">
          Error ID: {error.digest}
        </p>
      )}

      <div className="mt-8 flex justify-center gap-4">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
        >
          Try Again
        </button>

        <Link
          href="/meetings"
          className="rounded-md border border-gray-300 px-4 py-2 font-medium hover:bg-gray-100"
        >
          View Meetings
        </Link>
      </div>
    </main>
  );
}