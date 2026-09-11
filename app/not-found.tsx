import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
        404
      </p>

      <h1 className="mt-2 text-3xl font-bold text-slate-900">
        Meeting not found
      </h1>

      <p className="mt-3 text-slate-600">
        The sacrament meeting you requested does not exist.
      </p>

      <Link
        href="/meetings"
        className="mt-6 inline-block rounded-lg bg-slate-900 px-5 py-3 font-medium text-white hover:bg-slate-700"
      >
        View all meetings
      </Link>
    </div>
  );
}