import { redirect } from 'next/navigation';
import { getMeetingByDate } from '@/lib/meetings-db';

function getSundayDate(): string {
  const today = new Date();

  const sunday = new Date(today);
  sunday.setDate(today.getDate() + (7 - today.getDay()) % 7);

  return sunday.toISOString().split('T')[0];
}

export default async function CurrentMeetingPage() {
  const sunday = getSundayDate();

  const meeting = await getMeetingByDate(sunday);

  if (meeting) {
    redirect(`/meetings/${meeting.id}?current=true`);
  }

  return (
    <div className="rounded-2xl bg-white p-8 shadow-sm">
      <h1 className="text-3xl font-bold text-slate-900">
        No Meeting Found
      </h1>

      <p className="mt-3 text-slate-600">
        There is no meeting scheduled for this Sunday.
      </p>
    </div>
  );
}