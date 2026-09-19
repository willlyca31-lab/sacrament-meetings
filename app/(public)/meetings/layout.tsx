import Link from 'next/link';

export default function MeetingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link
            href="/meetings"
            className="text-lg font-bold text-slate-900"
          >
            Sacrament Meetings
          </Link>

          <nav
            aria-label="Meeting navigation"
            className="flex gap-4"
          >
            <Link
              href="/meetings"
              className="font-medium text-slate-600 hover:text-slate-900"
            >
              Meetings
            </Link>

            <Link
              href="/meetings/current"
              className="font-medium text-slate-600 hover:text-slate-900"
            >
              Current Meeting
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        {children}
      </main>
    </div>
  );
}