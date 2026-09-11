import { getMeetings } from '@/lib/meetings-db';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const date = url.searchParams.get('date');

  return Response.json(getMeetings(date));
}