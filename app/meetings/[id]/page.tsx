import Link from 'next/link';
import { notFound } from 'next/navigation';

import MeetingDetail from '@/components/MeetingDetail';
import type { SacramentMeeting } from '@/lib/types';

interface MeetingPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getMeeting(
  id: string
): Promise<SacramentMeeting | null> {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    'http://localhost:3000';

  const response = await fetch(
    `${baseUrl}/api/meetings/${id}`,
    {
      cache: 'no-store'
    }
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error('Failed to fetch meeting.');
  }

  return response.json() as Promise<SacramentMeeting>;
}

export default async function MeetingPage({
  params
}: MeetingPageProps) {
  const { id } = await params;

  const meeting = await getMeeting(id);

  if (!meeting) {
    notFound();
  }

  return (
    <div>
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