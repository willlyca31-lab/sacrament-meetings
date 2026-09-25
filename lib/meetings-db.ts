import { ensureDb, sql } from './db';
import type {
  MeetingType,
  SacramentMeeting,
  SpeakerItem,
  WardBusinessItem,
} from './types';

const ITEMS_PER_PAGE = 5;

interface MeetingRow {
  id: number;
  date: string;
  meeting_type: string;
  presiding: string;
  conducting: string;
  announcements: string[] | null;
  opening_hymn_number: number;
  opening_hymn_title: string;
  opening_prayer: string;
  ward_business: WardBusinessItem[] | null;
  stake_business: boolean | null;
  sacrament_hymn_number: number;
  sacrament_hymn_title: string;
  speakers: SpeakerItem[] | null;
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
  openingHymn: {
    number: number;
    title: string;
  };
  openingPrayer: string;
  wardBusiness: WardBusinessItem[];
  stakeBusiness: boolean;
  sacramentHymn: {
    number: number;
    title: string;
  };
  speakers: SpeakerItem[];
  closingHymn: {
    number: number;
    title: string;
  };
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
      title: row.opening_hymn_title,
    },

    openingPrayer: row.opening_prayer,

    wardBusiness: row.ward_business ?? [],

    stakeBusiness: row.stake_business ?? false,

    sacramentHymn: {
      number: row.sacrament_hymn_number,
      title: row.sacrament_hymn_title,
    },

    speakers: row.speakers ?? [],

    closingHymn: {
      number: row.closing_hymn_number,
      title: row.closing_hymn_title,
    },

    closingPrayer: row.closing_prayer,
  };
}

/**
 * Get meetings with search and pagination.
 */
export async function getMeetings(
  query: string = '',
  currentPage: number = 1
): Promise<SacramentMeeting[]> {
  await ensureDb();

  const searchTerm = `%${query}%`;
  const safePage = Math.max(1, currentPage);
  const offset = (safePage - 1) * ITEMS_PER_PAGE;

  const rows = await sql`
    SELECT *
    FROM meetings
    WHERE
      presiding ILIKE ${searchTerm}
      OR conducting ILIKE ${searchTerm}
      OR meeting_type ILIKE ${searchTerm}
      OR speakers::text ILIKE ${searchTerm}
    ORDER BY date DESC, id DESC
    LIMIT ${ITEMS_PER_PAGE}
    OFFSET ${offset}
  `;

  return (rows as unknown as MeetingRow[]).map(rowToMeeting);
}

/**
 * Get the total number of pages for search results.
 */
export async function getMeetingsTotalPages(
  query: string = ''
): Promise<number> {
  await ensureDb();

  const searchTerm = `%${query}%`;

  const rows = await sql`
    SELECT COUNT(*)::int AS count
    FROM meetings
    WHERE
      presiding ILIKE ${searchTerm}
      OR conducting ILIKE ${searchTerm}
      OR meeting_type ILIKE ${searchTerm}
      OR speakers::text ILIKE ${searchTerm}
  `;

  const total = Number(
    (rows as Array<{ count: number }>)[0]?.count ?? 0
  );

  return Math.max(1, Math.ceil(total / ITEMS_PER_PAGE));
}

/**
 * Get one meeting by its ID.
 */
export async function getMeetingById(
  id: number
): Promise<SacramentMeeting | null> {
  await ensureDb();

  const rows = await sql`
    SELECT *
    FROM meetings
    WHERE id = ${id}
  `;

  const row = (rows as unknown as MeetingRow[])[0];

  return row ? rowToMeeting(row) : null;
}

/**
 * Get one meeting by its date.
 */
export async function getMeetingByDate(
  date: string
): Promise<SacramentMeeting | null> {
  await ensureDb();

  const rows = await sql`
    SELECT *
    FROM meetings
    WHERE date = ${date}
    ORDER BY id DESC
    LIMIT 1
  `;

  const row = (rows as unknown as MeetingRow[])[0];

  return row ? rowToMeeting(row) : null;
}

/**
 * Create a meeting.
 */
export async function createMeetingRecord(
  input: MeetingInput
): Promise<SacramentMeeting> {
  await ensureDb();

  const rows = await sql`
    INSERT INTO meetings (
      date,
      meeting_type,
      presiding,
      conducting,
      announcements,
      opening_hymn_number,
      opening_hymn_title,
      opening_prayer,
      ward_business,
      stake_business,
      sacrament_hymn_number,
      sacrament_hymn_title,
      speakers,
      closing_hymn_number,
      closing_hymn_title,
      closing_prayer
    )
    VALUES (
      ${input.date},
      ${input.meetingType},
      ${input.presiding},
      ${input.conducting},
      ${JSON.stringify(input.announcements)}::jsonb,
      ${input.openingHymn.number},
      ${input.openingHymn.title},
      ${input.openingPrayer},
      ${JSON.stringify(input.wardBusiness)}::jsonb,
      ${input.stakeBusiness},
      ${input.sacramentHymn.number},
      ${input.sacramentHymn.title},
      ${JSON.stringify(input.speakers)}::jsonb,
      ${input.closingHymn.number},
      ${input.closingHymn.title},
      ${input.closingPrayer}
    )
    RETURNING *
  `;

  const row = (rows as unknown as MeetingRow[])[0];

  if (!row) {
    throw new Error(
      'Meeting was created but could not be loaded.'
    );
  }

  return rowToMeeting(row);
}

/**
 * Update a meeting.
 */
export async function updateMeetingRecord(
  id: number,
  input: MeetingInput
): Promise<SacramentMeeting | null> {
  await ensureDb();

  const rows = await sql`
    UPDATE meetings
    SET
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

  const row = (rows as unknown as MeetingRow[])[0];

  return row ? rowToMeeting(row) : null;
}

/**
 * Delete a meeting.
 */
export async function deleteMeetingRecord(
  id: number
): Promise<boolean> {
  await ensureDb();

  const rows = await sql`
    DELETE FROM meetings
    WHERE id = ${id}
    RETURNING id
  `;

  return (rows as Array<{ id: number }>).length > 0;
}

/**
 * Compatibility wrapper for existing code.
 */
export async function addMeeting(
  data: Omit<SacramentMeeting, 'id'>
): Promise<SacramentMeeting> {
  return createMeetingRecord({
    date: data.date,
    meetingType: data.meetingType,
    presiding: data.presiding,
    conducting: data.conducting,

    announcements: data.announcements ?? [],

    openingHymn: data.openingHymn,
    openingPrayer: data.openingPrayer,

    wardBusiness: data.wardBusiness ?? [],

    stakeBusiness: data.stakeBusiness ?? false,

    sacramentHymn: data.sacramentHymn,

    speakers: data.speakers ?? [],

    closingHymn: data.closingHymn,
    closingPrayer: data.closingPrayer,
  });
}

/**
 * Compatibility wrapper for existing code.
 */
export async function updateMeeting(
  id: number,
  updates: Partial<SacramentMeeting>
): Promise<SacramentMeeting | null> {
  const existing = await getMeetingById(id);

  if (!existing) {
    return null;
  }

  const input: MeetingInput = {
    date: updates.date ?? existing.date,

    meetingType:
      updates.meetingType ?? existing.meetingType,

    presiding:
      updates.presiding ?? existing.presiding,

    conducting:
      updates.conducting ?? existing.conducting,

    announcements:
      updates.announcements ??
      existing.announcements ??
      [],

    openingHymn:
      updates.openingHymn ??
      existing.openingHymn,

    openingPrayer:
      updates.openingPrayer ??
      existing.openingPrayer,

    wardBusiness:
      updates.wardBusiness ??
      existing.wardBusiness ??
      [],

    stakeBusiness:
      updates.stakeBusiness ??
      existing.stakeBusiness ??
      false,

    sacramentHymn:
      updates.sacramentHymn ??
      existing.sacramentHymn,

    speakers:
      updates.speakers ??
      existing.speakers ??
      [],

    closingHymn:
      updates.closingHymn ??
      existing.closingHymn,

    closingPrayer:
      updates.closingPrayer ??
      existing.closingPrayer,
  };

  return updateMeetingRecord(id, input);
}

/**
 * Compatibility wrapper for existing code.
 */
export async function deleteMeeting(
  id: number
): Promise<boolean> {
  return deleteMeetingRecord(id);
}