import Link from 'next/link';
import { getMeetings, getMeetingsTotalPages } from '@/lib/meetings-db';
import { MeetingSearch } from '@/components/MeetingSearch';
import { Pagination } from '@/components/Pagination';
import MeetingCard from '@/components/MeetingCard';

type MeetingsPageProps = {
  searchParams: Promise<{
    query?: string;
    page?: string;
  }>;
};

export default async function MeetingsPage({
  searchParams,
}: MeetingsPageProps) {
  const params = await searchParams;

  const query = params.query ?? '';
  const page = Math.max(1, Number(params.page) || 1);

  const [meetings, totalPages] = await Promise.all([
    getMeetings(query, page),
    getMeetingsTotalPages(query),
  ]);

  return (
    <section>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
            Meetings
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Sacrament Meetings
          </h1>
          <p className="mt-2 text-slate-600">
            Browse and review scheduled sacrament meeting programs.
          </p>
        </div>

        <Link
          href="/meetings/current"
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          Current Meeting
        </Link>
      </div>

      <div className="mb-6">
        <MeetingSearch />
      </div>

      {meetings.length === 0 ? (
        <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            No Meetings Found
          </h2>
          <p className="mt-2 text-slate-600">
            Try another search or page.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {meetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </div>
      )}

      <div className="mt-8">
        <Pagination totalPages={totalPages} />
      </div>
    </section>
  );
}