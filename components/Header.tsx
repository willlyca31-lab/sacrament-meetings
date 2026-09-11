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
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-slate-900"
        >
          Sacrament Meeting Planner
        </Link>

        <div className="text-sm text-slate-500">
          <p className="font-medium">El Marqués Ward</p>
          <p>{currentDate}</p>
        </div>
      </div>
    </header>
  );
}