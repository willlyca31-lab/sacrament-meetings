import MeetingCard from '@/components/MeetingCard';
import { getMeetings } from '@/lib/meetings-db';

export default function MeetingsPage() {
  const meetings = getMeetings();

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <div className="mb-6">
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

      <div className="grid gap-5">
        {meetings.map((meeting) => (
          <MeetingCard
            key={meeting.id}
            meeting={meeting}
          />
        ))}
      </div>
    </div>
  );
}