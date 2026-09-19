import { redirect } from 'next/navigation';
import { getMeetings } from '@/lib/meetings-db';

function getSundayDate(): string {
  const today = new Date();

  const day = today.getDay();

  const difference = day === 0 ? 0 : -day;

  const sunday = new Date(today);

  sunday.setDate(today.getDate() + difference);

  return sunday.toISOString().split('T')[0];
}

export default async function CurrentMeetingPage() {
  const sunday = getSundayDate();

  const meetings = await getMeetings('', 1);

  const currentMeeting = meetings.find(
    (meeting) => meeting.date === sunday
  );

  if (currentMeeting) {
    redirect(`/meetings/${currentMeeting.id}`);
  }

  return (
    <div className="rounded-2xl bg-white p-8 shadow-sm">
      <h1 className="text-3xl font-bold">
        No Meeting Found
      </h1>

      <p className="mt-3 text-slate-600">
        There is no meeting scheduled for this Sunday.
      </p>
    </div>
  );
}