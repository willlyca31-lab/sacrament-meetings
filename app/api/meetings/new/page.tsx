import MeetingForm from '@/components/MeetingForm';
import { createMeeting } from '@/lib/actions';

export default function NewMeetingPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
          New meeting
        </p>

        <h2 className="mt-1 text-3xl font-bold text-slate-900">
          Create Sacrament Meeting
        </h2>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
        <MeetingForm action={createMeeting} submitLabel="Create meeting" />
      </div>
    </div>
  );
}
