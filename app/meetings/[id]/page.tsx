import Link from 'next/link';
import { notFound } from 'next/navigation';

import MeetingDetail from '@/components/MeetingDetail';
import { getMeetingById } from '@/lib/meetings-db';

interface MeetingPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function MeetingPage({
  params
}: MeetingPageProps) {
  const { id } = await params;

  const meetingId = Number(id);

  if (!Number.isInteger(meetingId)) {
    notFound();
  }

  const meeting = getMeetingById(meetingId);

  if (!meeting) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <div className="mb-5">
        <Link
          href="/meetings"
          className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
        >
          ← Back to meetings
        </Link>
      </div>

      <MeetingDetail meeting={meeting} />
    </div>
  );
}