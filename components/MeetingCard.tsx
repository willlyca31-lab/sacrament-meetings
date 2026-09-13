import Link from 'next/link';
import type { SacramentMeeting } from '@/lib/types';

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({
  meeting
}: MeetingCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-indigo-600">
            {meeting.meetingType} meeting
          </p>

          <h2 className="mt-1 text-xl font-bold text-slate-900">
            {new Date(
              `${meeting.date}T12:00:00`
            ).toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}
          </h2>
        </div>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
          Meeting #{meeting.id}
        </span>
      </div>

      <div className="mt-5 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
        <p>
          <strong className="text-slate-900">Presiding:</strong>{' '}
          {meeting.presiding}
        </p>

        <p>
          <strong className="text-slate-900">Conducting:</strong>{' '}
          {meeting.conducting}
        </p>

        <p>
          <strong className="text-slate-900">Opening Hymn:</strong>{' '}
          #{meeting.openingHymn.number} — {meeting.openingHymn.title}
        </p>

        <p>
          <strong className="text-slate-900">Speakers:</strong>{' '}
          {meeting.speakers.filter(
            (speaker) => speaker.type === 'speaker'
          ).length}
        </p>
      </div>

      <div className="mt-6">
        <Link
          href={`/meetings/${meeting.id}`}
          className="inline-flex rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          View meeting
        </Link>
      </div>
    </article>
  );
}