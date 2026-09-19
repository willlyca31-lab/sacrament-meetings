import { NextRequest, NextResponse } from 'next/server';
import { getMeetings } from '@/lib/meetings-db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const query = searchParams.get('query') ?? '';
    const date = searchParams.get('date');

    if (date) {
      const meetings = await getMeetings('', 1);

      const filtered = meetings.filter(
        (meeting) => meeting.date === date
      );

      return NextResponse.json(filtered);
    }

    const meetings = await getMeetings(query, 1);

    return NextResponse.json(meetings);
  } catch (error) {
    console.error('GET /api/meetings error:', error);

    return NextResponse.json(
      { error: 'Failed to retrieve meetings.' },
      { status: 500 }
    );
  }
}