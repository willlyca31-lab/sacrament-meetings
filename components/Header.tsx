import Link from 'next/link';

export default function Header() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-slate-900"
          >
            Sacrament Meeting Planner
          </Link>

          <nav className="flex gap-4 text-sm font-medium">
            <Link
              href="/meetings"
              className="text-slate-600 hover:text-indigo-600"
            >
              Meetings
            </Link>

            <Link
              href="/meetings/current"
              className="text-slate-600 hover:text-indigo-600"
            >
              Current Meeting
            </Link>
          </nav>
        </div>

        <div className="text-sm text-slate-500">
          <p className="font-medium">El Marqués Ward</p>
          <p>{currentDate}</p>
        </div>
      </div>
    </header>
  );
}