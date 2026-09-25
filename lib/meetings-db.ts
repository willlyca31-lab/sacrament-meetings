import { ensureDb, sql } from './db';
import type {
  MeetingType,
  SacramentMeeting,
  SpeakerItem,
  WardBusinessItem
} from './types';

interface MeetingRow {
  id: number;
  date: string;
  meeting_type: string;
  presiding: string;
  conducting: string;
  announcements: string[];
  opening_hymn_number: number;
  opening_hymn_title: string;
  opening_prayer: string;
  ward_business: WardBusinessItem[];
  stake_business: boolean;
  sacrament_hymn_number: number;
  sacrament_hymn_title: string;
  speakers: SpeakerItem[];
  closing_hymn_number: number;
  closing_hymn_title: string;
  closing_prayer: string;
}

export interface MeetingInput {
  date: string;
  meetingType: MeetingType;
  presiding: string;
  conducting: string;
  announcements: string[];
  openingHymn: { number: number; title: string };
  openingPrayer: string;
  wardBusiness: WardBusinessItem[];
  stakeBusiness: boolean;
  sacramentHymn: { number: number; title: string };
  speakers: SpeakerItem[];
  closingHymn: { number: number; title: string };
  closingPrayer: string;
}

function rowToMeeting(row: MeetingRow): SacramentMeeting {
  return {
    id: row.id,
    date: row.date,
    meetingType: row.meeting_type as MeetingType,
    presiding: row.presiding,
    conducting: row.conducting,
    announcements: row.announcements ?? [],
    openingHymn: {
      number: row.opening_hymn_number,
      title: row.opening_hymn_title
    },
    openingPrayer: row.opening_prayer,
    wardBusiness: row.ward_business ?? [],
    stakeBusiness: row.stake_business,
    sacramentHymn: {
      number: row.sacrament_hymn_number,
      title: row.sacrament_hymn_title
    },
    speakers: row.speakers ?? [],
    closingHymn: {
      number: row.closing_hymn_number,
      title: row.closing_hymn_title
    },
    closingPrayer: row.closing_prayer
  };
}

export async function getMeetings(
  date?: string | null
): Promise<SacramentMeeting[]> {
  await ensureDb();

  const rows = date
    ? await sql`
        SELECT * FROM meetings
        WHERE date = ${date}
        ORDER BY date DESC, id DESC
      `
    : await sql`
        SELECT * FROM meetings
        ORDER BY date DESC, id DESC
      `;

  return (rows as MeetingRow[]).map(rowToMeeting);
}

export async function getMeetingById(
  id: number
): Promise<SacramentMeeting | null> {
  await ensureDb();

  const rows = await sql`SELECT * FROM meetings WHERE id = ${id}`;
  const row = (rows as MeetingRow[])[0];

  return row ? rowToMeeting(row) : null;
}

export async function createMeetingRecord(
  input: MeetingInput
): Promise<SacramentMeeting> {
  await ensureDb();

  const rows = await sql`
    INSERT INTO meetings (
      date, meeting_type, presiding, conducting, announcements,
      opening_hymn_number, opening_hymn_title, opening_prayer,
      ward_business, stake_business, sacrament_hymn_number, sacrament_hymn_title,
      speakers, closing_hymn_number, closing_hymn_title, closing_prayer
    ) VALUES (
      ${input.date}, ${input.meetingType}, ${input.presiding}, ${input.conducting},
      ${JSON.stringify(input.announcements)}::jsonb,
      ${input.openingHymn.number}, ${input.openingHymn.title}, ${input.openingPrayer},
      ${JSON.stringify(input.wardBusiness)}::jsonb, ${input.stakeBusiness},
      ${input.sacramentHymn.number}, ${input.sacramentHymn.title},
      ${JSON.stringify(input.speakers)}::jsonb,
      ${input.closingHymn.number}, ${input.closingHymn.title}, ${input.closingPrayer}
    )
    RETURNING *
  `;

  const row = (rows as MeetingRow[])[0];

  if (!row) {
    throw new Error('Meeting was created but could not be loaded.');
  }

  return rowToMeeting(row);
}

export async function updateMeetingRecord(
  id: number,
  input: MeetingInput
): Promise<SacramentMeeting | null> {
  await ensureDb();

  const rows = await sql`
    UPDATE meetings SET
      date = ${input.date},
      meeting_type = ${input.meetingType},
      presiding = ${input.presiding},
      conducting = ${input.conducting},
      announcements = ${JSON.stringify(input.announcements)}::jsonb,
      opening_hymn_number = ${input.openingHymn.number},
      opening_hymn_title = ${input.openingHymn.title},
      opening_prayer = ${input.openingPrayer},
      ward_business = ${JSON.stringify(input.wardBusiness)}::jsonb,
      stake_business = ${input.stakeBusiness},
      sacrament_hymn_number = ${input.sacramentHymn.number},
      sacrament_hymn_title = ${input.sacramentHymn.title},
      speakers = ${JSON.stringify(input.speakers)}::jsonb,
      closing_hymn_number = ${input.closingHymn.number},
      closing_hymn_title = ${input.closingHymn.title},
      closing_prayer = ${input.closingPrayer}
    WHERE id = ${id}
    RETURNING *
  `;

  const row = (rows as MeetingRow[])[0];

  return row ? rowToMeeting(row) : null;
}

export async function deleteMeetingRecord(id: number): Promise<boolean> {
  await ensureDb();

  const rows = await sql`
    DELETE FROM meetings WHERE id = ${id} RETURNING id
  `;

  return (rows as { id: number }[]).length > 0;
}
