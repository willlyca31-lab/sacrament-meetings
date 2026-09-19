import Link from 'next/link';
import type { SacramentMeeting } from '@/lib/types';

export function MeetingCard({
  meeting,
}: {
  meeting: SacramentMeeting;
}) {
  return (
    <article className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
            {meeting.meetingType}
          </p>

          <h2 className="mt-1 text-2xl font-bold text-slate-900">
            {meeting.date}
          </h2>

          <div className="mt-3 space-y-1 text-slate-600">
            <p>
              <strong>Presiding:</strong>{' '}
              {meeting.presiding}
            </p>

            <p>
              <strong>Conducting:</strong>{' '}
              {meeting.conducting}
            </p>
          </div>
        </div>

        <Link
          href={`/meetings/${meeting.id}`}
          className="rounded-lg bg-slate-900 px-5 py-3 text-center font-semibold text-white hover:bg-slate-700"
        >
          View Meeting
        </Link>
      </div>
    </article>
  );
}