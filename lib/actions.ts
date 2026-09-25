'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import {
  createMeetingRecord,
  deleteMeetingRecord,
  updateMeetingRecord,
  type MeetingInput,
} from './meetings-db';

import type { MeetingType, SpeakerItem } from './types';

const MeetingFormSchema = z.object({
  date: z
    .string()
    .min(1, 'Date is required.')
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Enter a valid date.'),

  meetingType: z.enum(['regular', 'testimony', 'stake', 'general'], {
    message: 'Select a valid meeting type.',
  }),

  presiding: z
    .string()
    .trim()
    .min(1, 'Presiding officer is required.'),

  conducting: z
    .string()
    .trim()
    .min(1, 'Conducting officer is required.'),

  announcements: z.string().optional(),

  openingHymnNumber: z.coerce
    .number()
    .int('Hymn number must be a whole number.')
    .positive('Hymn number must be greater than zero.'),

  openingHymnTitle: z
    .string()
    .trim()
    .min(1, 'Opening hymn title is required.'),

  openingPrayer: z
    .string()
    .trim()
    .min(1, 'Opening prayer is required.'),

  wardBusiness: z.string().optional(),

  stakeBusiness: z.string().optional(),

  sacramentHymnNumber: z.coerce
    .number()
    .int('Hymn number must be a whole number.')
    .positive('Hymn number must be greater than zero.'),

  sacramentHymnTitle: z
    .string()
    .trim()
    .min(1, 'Sacrament hymn title is required.'),

  speakers: z.string().optional(),

  closingHymnNumber: z.coerce
    .number()
    .int('Hymn number must be a whole number.')
    .positive('Hymn number must be greater than zero.'),

  closingHymnTitle: z
    .string()
    .trim()
    .min(1, 'Closing hymn title is required.'),

  closingPrayer: z
    .string()
    .trim()
    .min(1, 'Closing prayer is required.'),
});

export type MeetingFormValues = z.infer<typeof MeetingFormSchema>;

export interface MeetingFormState {
  message: string | null;
  errors: Partial<Record<keyof MeetingFormValues, string[]>>;
}

export const initialMeetingFormState: MeetingFormState = {
  message: null,
  errors: {},
};

function parseLines(value: string | undefined): string[] {
  if (!value) {
    return [];
  }

  return value
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

function parseSpeakers(value: string | undefined): SpeakerItem[] {
  return parseLines(value).map((line) => {
    const [name = '', topic = '', type = 'speaker'] = line
      .split('|')
      .map((part) => part.trim());

    return {
      name,
      topic,
      type: type === 'musical-number' ? 'musical-number' : 'speaker',
    };
  });
}

function buildMeetingInput(data: MeetingFormValues): MeetingInput {
  return {
    date: data.date,

    meetingType: data.meetingType as MeetingType,

    presiding: data.presiding,

    conducting: data.conducting,

    announcements: parseLines(data.announcements),

    openingHymn: {
      number: data.openingHymnNumber,
      title: data.openingHymnTitle,
    },

    openingPrayer: data.openingPrayer,

    wardBusiness: parseLines(data.wardBusiness).map((description) => ({
      description,
    })),

    stakeBusiness: data.stakeBusiness === 'on',

    sacramentHymn: {
      number: data.sacramentHymnNumber,
      title: data.sacramentHymnTitle,
    },

    speakers: parseSpeakers(data.speakers),

    closingHymn: {
      number: data.closingHymnNumber,
      title: data.closingHymnTitle,
    },

    closingPrayer: data.closingPrayer,
  };
}

export async function createMeeting(
  _prevState: MeetingFormState,
  formData: FormData
): Promise<MeetingFormState> {
  const validated = MeetingFormSchema.safeParse(
    Object.fromEntries(formData)
  );

  if (!validated.success) {
    return {
      message: 'Please fix the errors below and try again.',
      errors: validated.error.flatten().fieldErrors,
    };
  }

  const input = buildMeetingInput(validated.data);

  try {
    await createMeetingRecord(input);
  } catch (error) {
    console.error('Failed to create meeting:', error);

    return {
      message:
        'Something went wrong while creating the meeting. Please try again.',
      errors: {},
    };
  }

  revalidatePath('/meetings');

  redirect('/meetings');
}

export async function updateMeeting(
  id: number,
  _prevState: MeetingFormState,
  formData: FormData
): Promise<MeetingFormState> {
  const validated = MeetingFormSchema.safeParse(
    Object.fromEntries(formData)
  );

  if (!validated.success) {
    return {
      message: 'Please fix the errors below and try again.',
      errors: validated.error.flatten().fieldErrors,
    };
  }

  const input = buildMeetingInput(validated.data);

  let updated;

  try {
    updated = await updateMeetingRecord(id, input);
  } catch (error) {
    console.error('Failed to update meeting:', error);

    return {
      message:
        'Something went wrong while updating the meeting. Please try again.',
      errors: {},
    };
  }

  if (!updated) {
    return {
      message: 'This meeting no longer exists. It may have been deleted.',
      errors: {},
    };
  }

  revalidatePath('/meetings');
  revalidatePath(`/meetings/${id}`);

  redirect('/meetings');
}

export async function deleteMeeting(formData: FormData): Promise<void> {
  const rawId = formData.get('id');

  const id = Number(rawId);

  if (!Number.isInteger(id)) {
    console.error('Failed to delete meeting: invalid id', rawId);
    throw new Error('Invalid meeting ID.');
  }

  try {
    const deleted = await deleteMeetingRecord(id);

    if (!deleted) {
      throw new Error('Meeting not found.');
    }
  } catch (error) {
    console.error('Failed to delete meeting:', error);

    throw new Error(
      'Unable to delete the meeting. Please try again.'
    );
  }

  revalidatePath('/meetings');
}