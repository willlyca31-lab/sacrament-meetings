'use client';

import type { SacramentMeeting } from '@/lib/types';
import { PrintButton } from './PrintButton';

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-slate-200 py-6">
      <h2 className="mb-3 text-lg font-bold text-slate-900">
        {title}
      </h2>

      <div className="text-slate-700">{children}</div>
    </section>
  );
}

export default function MeetingDetail({
  meeting,
}: MeetingDetailProps) {
  return (
    <article className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-sm sm:p-10">
      {/* Meeting Header */}
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
          {meeting.meetingType} meeting
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          Sacrament Meeting
        </h1>

        <p className="mt-2 text-slate-500">
          {new Date(`${meeting.date}T12:00:00`).toLocaleDateString(
            'en-US',
            {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            }
          )}
        </p>
      </div>

      {/* Presiding and Conducting */}
      <div className="mt-8 grid gap-4 rounded-xl bg-slate-50 p-5 sm:grid-cols-2">
        <div>
          <p className="text-sm text-slate-500">Presiding</p>
          <p className="font-semibold text-slate-900">
            {meeting.presiding}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">Conducting</p>
          <p className="font-semibold text-slate-900">
            {meeting.conducting}
          </p>
        </div>
      </div>

      {/* Announcements */}
      <Section title="Announcements">
        {meeting.announcements &&
        meeting.announcements.length > 0 ? (
          <ul className="list-disc space-y-2 pl-5">
            {meeting.announcements.map((announcement, index) => (
              <li key={index}>{announcement}</li>
            ))}
          </ul>
        ) : (
          <p>No announcements.</p>
        )}
      </Section>

      {/* Opening Hymn */}
      <Section title="Opening Hymn">
        <p>
          Hymn #{meeting.openingHymn.number}:{' '}
          <strong>{meeting.openingHymn.title}</strong>
        </p>
      </Section>

      {/* Opening Prayer */}
      <Section title="Opening Prayer">
        <p>{meeting.openingPrayer}</p>
      </Section>

      {/* Ward Business */}
      <Section title="Ward Business">
        {meeting.wardBusiness.length > 0 ? (
          <ul className="list-disc space-y-2 pl-5">
            {meeting.wardBusiness.map((item, index) => (
              <li key={index}>{item.description}</li>
            ))}
          </ul>
        ) : (
          <p>No ward business.</p>
        )}
      </Section>

      {/* Stake Business */}
      <Section title="Stake Business">
        <p>
          {meeting.stakeBusiness
            ? 'Stake business will be conducted.'
            : 'No stake business.'}
        </p>
      </Section>

      {/* Sacrament Hymn */}
      <Section title="Sacrament Hymn">
        <p>
          Hymn #{meeting.sacramentHymn.number}:{' '}
          <strong>{meeting.sacramentHymn.title}</strong>
        </p>
      </Section>

      {/* Speakers */}
      <Section title="Speakers and Musical Numbers">
        <div className="space-y-4">
          {meeting.speakers.map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              className="rounded-lg border border-slate-200 p-4"
            >
              <p className="font-semibold text-slate-900">
                {item.name}
              </p>

              <p className="text-sm text-indigo-600">
                {item.type === 'speaker'
                  ? 'Speaker'
                  : 'Musical Number'}
              </p>

              {item.topic && (
                <p className="mt-1 text-slate-600">
                  {item.topic}
                </p>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* Closing Hymn */}
      <Section title="Closing Hymn">
        <p>
          Hymn #{meeting.closingHymn.number}:{' '}
          <strong>{meeting.closingHymn.title}</strong>
        </p>
      </Section>

      {/* Closing Prayer */}
      <Section title="Closing Prayer">
        <p>{meeting.closingPrayer}</p>
      </Section>

      {/* Print Button */}
      <div className="mt-8 print:hidden">
        <PrintButton />
      </div>
    </article>
  );
}