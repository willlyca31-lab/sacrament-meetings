import Link from 'next/link';

export default function EditMeetingNotFound() {
  return (
    <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
      <h1 className="text-3xl font-bold text-slate-900">
        Meeting Not Found
      </h1>

      <p className="mt-4 text-slate-600">
        The meeting you are trying to edit does not exist.
      </p>

      <Link
        href="/meetings"
        className="mt-6 inline-block rounded-lg bg-slate-900 px-5 py-3 font-medium text-white hover:bg-slate-700"
      >
        Back to Meetings
      </Link>
    </div>
  );
}