import { neon } from '@neondatabase/serverless';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    'DATABASE_URL environment variable is not set. Add it to .env.local (and your Vercel project) using the value from your Neon integration.'
  );
}

export const sql = neon(connectionString);

interface SeedMeeting {
  date: string;
  meetingType: string;
  presiding: string;
  conducting: string;
  announcements: string[];
  openingHymn: { number: number; title: string };
  openingPrayer: string;
  wardBusiness: { description: string }[];
  stakeBusiness: boolean;
  sacramentHymn: { number: number; title: string };
  speakers: { name: string; topic: string; type: string }[];
  closingHymn: { number: number; title: string };
  closingPrayer: string;
}

const seedMeetings: SeedMeeting[] = [
  {
    date: '2026-09-06',
    meetingType: 'regular',
    presiding: 'Bishop Johnson',
    conducting: 'Brother Williams',
    announcements: [
      'Ward temple night will be September 18.',
      'Youth activity Wednesday at 6:30 PM.'
    ],
    openingHymn: { number: 2, title: 'The Spirit of God' },
    openingPrayer: 'Sister Garcia',
    wardBusiness: [
      { description: 'Sustaining of new Primary teachers' }
    ],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: 'In Remembrance of Thy Suffering' },
    speakers: [
      { name: 'Sister Brown', topic: 'Faith in Jesus Christ', type: 'speaker' },
      { name: 'Elder Martinez', topic: 'Following the Savior', type: 'speaker' },
      { name: 'Ward Choir', topic: 'Come, Follow Me', type: 'musical-number' }
    ],
    closingHymn: { number: 31, title: 'O God, Our Help in Ages Past' },
    closingPrayer: 'Brother Davis'
  },
  {
    date: '2026-08-30',
    meetingType: 'testimony',
    presiding: 'Bishop Johnson',
    conducting: 'Brother Carter',
    announcements: [
      'Fast Sunday donations may be submitted after the meeting.'
    ],
    openingHymn: { number: 81, title: 'Press Forward, Saints' },
    openingPrayer: 'Sister Anderson',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: 'In Remembrance of Thy Suffering' },
    speakers: [],
    closingHymn: { number: 227, title: 'There Is Sunshine in My Soul Today' },
    closingPrayer: 'Brother Miller'
  },
  {
    date: '2026-08-23',
    meetingType: 'regular',
    presiding: 'Bishop Johnson',
    conducting: 'Sister Wilson',
    announcements: [
      'Primary activity will be held Saturday morning.'
    ],
    openingHymn: { number: 85, title: 'How Firm a Foundation' },
    openingPrayer: 'Brother Smith',
    wardBusiness: [
      { description: 'Sustaining of new Relief Society presidency' }
    ],
    stakeBusiness: true,
    sacramentHymn: { number: 190, title: 'In Memory of the Crucified' },
    speakers: [
      { name: 'Brother Thompson', topic: 'Service in the Kingdom', type: 'speaker' },
      { name: 'Sister Lopez', topic: 'The Power of Prayer', type: 'speaker' }
    ],
    closingHymn: { number: 152, title: 'God Be with You Till We Meet Again' },
    closingPrayer: 'Sister Adams'
  },
  {
    date: '2026-08-16',
    meetingType: 'stake',
    presiding: 'President Roberts',
    conducting: 'President Green',
    announcements: [
      'Stake conference will be held next month.'
    ],
    openingHymn: { number: 27, title: 'Praise to the Man' },
    openingPrayer: 'Sister Taylor',
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: { number: 193, title: 'I Stand All Amazed' },
    speakers: [
      { name: 'President Roberts', topic: 'Strengthening Families', type: 'speaker' },
      { name: 'Sister Young', topic: 'Serving Others', type: 'speaker' }
    ],
    closingHymn: { number: 219, title: 'Because I Have Been Given Much' },
    closingPrayer: 'Brother Clark'
  },
  {
    date: '2026-08-09',
    meetingType: 'general',
    presiding: 'President Anderson',
    conducting: 'Brother Lewis',
    announcements: [
      'General meeting announcements will be shared by the stake.'
    ],
    openingHymn: { number: 3, title: 'Now We Sing with One Accord' },
    openingPrayer: 'Brother Evans',
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: { number: 193, title: 'I Stand All Amazed' },
    speakers: [
      { name: 'President Anderson', topic: 'Jesus Christ Is Our Savior', type: 'speaker' }
    ],
    closingHymn: { number: 85, title: 'How Firm a Foundation' },
    closingPrayer: 'Sister Moore'
  }
];

async function seedIfEmpty(): Promise<void> {
  const rows = await sql`SELECT COUNT(*)::int AS count FROM meetings`;
  const count = (rows[0] as { count: number }).count;

  if (count > 0) {
    return;
  }

  for (const meeting of seedMeetings) {
    await sql`
      INSERT INTO meetings (
        date, meeting_type, presiding, conducting, announcements,
        opening_hymn_number, opening_hymn_title, opening_prayer,
        ward_business, stake_business, sacrament_hymn_number, sacrament_hymn_title,
        speakers, closing_hymn_number, closing_hymn_title, closing_prayer
      ) VALUES (
        ${meeting.date}, ${meeting.meetingType}, ${meeting.presiding}, ${meeting.conducting},
        ${JSON.stringify(meeting.announcements)}::jsonb,
        ${meeting.openingHymn.number}, ${meeting.openingHymn.title}, ${meeting.openingPrayer},
        ${JSON.stringify(meeting.wardBusiness)}::jsonb, ${meeting.stakeBusiness},
        ${meeting.sacramentHymn.number}, ${meeting.sacramentHymn.title},
        ${JSON.stringify(meeting.speakers)}::jsonb,
        ${meeting.closingHymn.number}, ${meeting.closingHymn.title}, ${meeting.closingPrayer}
      )
    `;
  }
}

// Cache the setup promise so we only create the table / seed once per
// warm server instance instead of on every request.
let setupPromise: Promise<void> | null = null;

export function ensureDb(): Promise<void> {
  if (!setupPromise) {
    setupPromise = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS meetings (
          id SERIAL PRIMARY KEY,
          date TEXT NOT NULL,
          meeting_type TEXT NOT NULL,
          presiding TEXT NOT NULL,
          conducting TEXT NOT NULL,
          announcements JSONB NOT NULL DEFAULT '[]'::jsonb,
          opening_hymn_number INTEGER NOT NULL,
          opening_hymn_title TEXT NOT NULL,
          opening_prayer TEXT NOT NULL,
          ward_business JSONB NOT NULL DEFAULT '[]'::jsonb,
          stake_business BOOLEAN NOT NULL DEFAULT false,
          sacrament_hymn_number INTEGER NOT NULL,
          sacrament_hymn_title TEXT NOT NULL,
          speakers JSONB NOT NULL DEFAULT '[]'::jsonb,
          closing_hymn_number INTEGER NOT NULL,
          closing_hymn_title TEXT NOT NULL,
          closing_prayer TEXT NOT NULL
        )
      `;

      await seedIfEmpty();
    })();
  }

  return setupPromise;
}
