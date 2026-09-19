
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getMeetingById } from '@/lib/meetings-db';
import { PrintButton } from '@/components/PrintButton';

export default async function MeetingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const meetingId = Number(id);

  if (!Number.isInteger(meetingId) || meetingId <= 0) {
    notFound();
  }

  const meeting = await getMeetingById(meetingId);

  if (!meeting) {
    notFound();
  }

  return (
    <article className="rounded-2xl bg-white p-8 shadow-sm">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
            {meeting.meetingType}
          </p>

          <h1 className="mt-1 text-4xl font-bold text-slate-900">
            Sacrament Meeting
          </h1>

          <p className="mt-2 text-slate-600">
            {meeting.date}
          </p>
        </div>

        {/* Client Component handles the onClick event */}
        <PrintButton />
      </div>

      <section className="space-y-6">
        {/* Meeting Leadership */}
        <div>
          <h2 className="text-xl font-bold">
            Meeting Leadership
          </h2>

          <p className="mt-2">
            <strong>Presiding:</strong>{' '}
            {meeting.presiding}
          </p>

          <p>
            <strong>Conducting:</strong>{' '}
            {meeting.conducting}
          </p>
        </div>

        {/* Opening */}
        <div>
          <h2 className="text-xl font-bold">
            Opening
          </h2>

          <p className="mt-2">
            <strong>Hymn:</strong>{' '}
            {meeting.openingHymn.number} —{' '}
            {meeting.openingHymn.title}
          </p>

          <p>
            <strong>Prayer:</strong>{' '}
            {meeting.openingPrayer}
          </p>
        </div>

        {/* Announcements */}
        {meeting.announcements.length > 0 && (
          <div>
            <h2 className="text-xl font-bold">
              Announcements
            </h2>

            <ul className="mt-2 list-disc pl-6">
              {meeting.announcements.map(
                (announcement, index) => (
                  <li key={`${announcement}-${index}`}>
                    {announcement}
                  </li>
                )
              )}
            </ul>
          </div>
        )}

        {/* Ward Business */}
        {meeting.wardBusiness.length > 0 && (
          <div>
            <h2 className="text-xl font-bold">
              Ward Business
            </h2>

            <ul className="mt-2 list-disc pl-6">
              {meeting.wardBusiness.map(
                (business, index) => (
                  <li key={`${business.description}-${index}`}>
                    {business.description}
                  </li>
                )
              )}
            </ul>
          </div>
        )}

        {/* Sacrament */}
        <div>
          <h2 className="text-xl font-bold">
            Sacrament
          </h2>

          <p className="mt-2">
            {meeting.sacramentHymn.number} —{' '}
            {meeting.sacramentHymn.title}
          </p>
        </div>

        {/* Speakers */}
        {meeting.speakers.length > 0 && (
          <div>
            <h2 className="text-xl font-bold">
              Speakers
            </h2>

            <div className="mt-3 space-y-3">
              {meeting.speakers.map((speaker, index) => (
                <div
                  key={`${speaker.name}-${index}`}
                  className="rounded-lg bg-slate-50 p-4"
                >
                  <p className="font-semibold">
                    {speaker.name}
                  </p>

                  {speaker.topic && (
                    <p className="text-slate-600">
                      {speaker.topic}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Closing */}
        <div>
          <h2 className="text-xl font-bold">
            Closing
          </h2>

          <p className="mt-2">
            <strong>Hymn:</strong>{' '}
            {meeting.closingHymn.number} —{' '}
            {meeting.closingHymn.title}
          </p>

          <p>
            <strong>Prayer:</strong>{' '}
            {meeting.closingPrayer}
          </p>
        </div>
      </section>

      {/* Back to Meetings */}
      <div className="mt-10">
        <Link
          href="/meetings"
          className="font-semibold text-indigo-600 hover:text-indigo-800"
        >
          ← Back to Meetings
        </Link>
      </div>
    </article>
  );
}