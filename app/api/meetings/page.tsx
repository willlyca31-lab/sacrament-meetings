import Link from 'next/link';

import MeetingCard from '@/components/MeetingCard';
import { getMeetings } from '@/lib/meetings-db';

export default async function MeetingsPage() {
  const meetings = await getMeetings();

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            Meeting history
          </p>

          <h2 className="mt-1 text-3xl font-bold text-slate-900">
            Sacrament Meetings
          </h2>

          <p className="mt-2 text-slate-600">
            Browse current and previous meeting programs.
          </p>
        </div>

        <Link
          href="/meetings/new"
          className="inline-flex shrink-0 rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          + New meeting
        </Link>
      </div>

      {meetings.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
          No meetings yet. Create your first meeting to get started.
        </p>
      ) : (
        <div className="grid gap-5">
          {meetings.map((meeting) => (
            <MeetingCard
              key={meeting.id}
              meeting={meeting}
            />
          ))}
        </div>
      )}
    </div>
  );
}
