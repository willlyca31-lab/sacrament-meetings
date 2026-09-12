import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <section className="bg-slate-900 text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-300">
              Ward Administration
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
              Sacrament Meeting Planner
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">
              Plan, organize, review, and print sacrament meeting
              programs for your ward or branch.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/meetings"
                className="rounded-lg bg-white px-5 py-3 font-semibold text-slate-900 hover:bg-slate-100"
              >
                View Meetings
              </Link>

              <Link
                href="/meetings/current"
                className="rounded-lg border border-slate-600 px-5 py-3 font-semibold text-white hover:bg-slate-800"
              >
                Current Meeting
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl bg-white shadow-2xl">
            <Image
              src="/meeting-house.svg"
              alt="Illustration representing a meeting house"
              width={800}
              height={500}
              className="h-auto w-full"
              priority
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold">Plan</h2>
            <p className="mt-3 text-slate-600">
              Keep hymns, prayers, speakers, announcements, and
              ward business organized.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold">Review</h2>
            <p className="mt-3 text-slate-600">
              Browse current and previous sacrament meeting
              programs.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold">Print</h2>
            <p className="mt-3 text-slate-600">
              Open any meeting program and print a clean version
              for members and leaders.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
