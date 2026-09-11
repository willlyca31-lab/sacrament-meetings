import MeetingCard from '@/components/MeetingCard';
import type { SacramentMeeting } from '@/lib/types';

async function getMeetings(): Promise<SacramentMeeting[]> {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    'http://localhost:3000';

  const response = await fetch(`${baseUrl}/api/meetings`, {
    cache: 'no-store'
  });

  if (!response.ok) {
    throw new Error('Failed to fetch meetings.');
  }

  return response.json() as Promise<SacramentMeeting[]>;
}

export default async function MeetingsPage() {
  const meetings = await getMeetings();

  return (
    <div>
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