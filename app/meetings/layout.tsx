import Link from 'next/link';

export default function MeetingsLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <div className="mb-8 flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            Meeting Programs
          </h1>

          <p className="text-sm text-slate-500">
            View current and past sacrament meetings.
          </p>
        </div>

        <Link
          href="/meetings/current"
          className="rounded-lg bg-indigo-600 px-4 py-2 text-center font-medium text-white hover:bg-indigo-700"
        >
          Current Sunday
        </Link>
      </div>

      {children}
    </div>
  );
}