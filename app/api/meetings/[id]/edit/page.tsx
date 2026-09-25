import { notFound } from 'next/navigation';

import MeetingForm from '@/components/MeetingForm';
import { updateMeeting } from '@/lib/actions';
import { getMeetingById } from '@/lib/meetings-db';

interface EditMeetingPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditMeetingPage({
  params
}: EditMeetingPageProps) {
  const { id } = await params;
  const meetingId = Number(id);

  if (!Number.isInteger(meetingId)) {
    notFound();
  }

  const meeting = await getMeetingById(meetingId);

  if (!meeting) {
    notFound();
  }

  const updateMeetingWithId = updateMeeting.bind(null, meetingId);

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
          Edit meeting
        </p>

        <h2 className="mt-1 text-3xl font-bold text-slate-900">
          Edit Sacrament Meeting
        </h2>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
        <MeetingForm
          action={updateMeetingWithId}
          meeting={meeting}
          submitLabel="Save changes"
        />
      </div>
    </div>
  );
}
