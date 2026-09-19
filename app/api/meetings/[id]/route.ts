import { NextResponse } from 'next/server';
import { getMeetingById } from '@/lib/meetings-db';

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(
  _request: Request,
  context: RouteContext
) {
  const { id } = await context.params;

  const meetingId = Number(id);

  if (!Number.isInteger(meetingId)) {
    return NextResponse.json(
      { error: 'Invalid meeting ID.' },
      { status: 400 }
    );
  }

  try {
    const meeting = await getMeetingById(meetingId);

    if (!meeting) {
      return NextResponse.json(
        { error: 'Meeting not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json(meeting);
  } catch (error) {
    console.error('GET /api/meetings/[id] error:', error);

    return NextResponse.json(
      { error: 'Failed to retrieve meeting.' },
      { status: 500 }
    );
  }
}