import { NextResponse } from 'next/server';
import { getMeetingById } from '@/lib/meetings-db';

interface RouteContext {
  params: { id: string };
}

export async function GET(_request: Request, context: RouteContext) {
  const { id } = context.params;
  const meetingId = Number(id);

  if (!Number.isInteger(meetingId)) {
    return NextResponse.json(
      { error: 'Invalid meeting ID.' },
      { status: 400 }
    );
  }

  const meeting = await getMeetingById(meetingId);

  if (!meeting) {
    return NextResponse.json(
      { error: 'Meeting not found.' },
      { status: 404 }
    );
  }

  return NextResponse.json(meeting);
}
