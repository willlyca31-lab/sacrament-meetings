'use client';

import { useActionState } from 'react';
import Link from 'next/link';

import type { SacramentMeeting } from '@/lib/types';
import {
  initialMeetingFormState,
  type MeetingFormState
} from '@/lib/actions';

interface MeetingFormProps {
  action: (
    state: MeetingFormState,
    formData: FormData
  ) => Promise<MeetingFormState>;
  meeting?: SacramentMeeting;
  submitLabel: string;
}

const MEETING_TYPE_OPTIONS: { value: string; label: string }[] = [
  { value: 'regular', label: 'Regular' },
  { value: 'testimony', label: 'Testimony' },
  { value: 'stake', label: 'Stake' },
  { value: 'general', label: 'General' }
];

function toLines(items?: string[]): string {
  return items && items.length > 0 ? items.join('\n') : '';
}

function wardBusinessToLines(meeting?: SacramentMeeting): string {
  if (!meeting) return '';
  return meeting.wardBusiness.map((item) => item.description).join('\n');
}

function speakersToLines(meeting?: SacramentMeeting): string {
  if (!meeting) return '';
  return meeting.speakers
    .map((speaker) => `${speaker.name} | ${speaker.topic} | ${speaker.type}`)
    .join('\n');
}

function FieldError({
  id,
  errors
}: {
  id: string;
  errors?: string[];
}) {
  return (
    <div id={id} aria-live="polite" className="mt-1 min-h-[1.25rem] text-sm text-red-600">
      {errors?.map((error) => (
        <p key={error}>{error}</p>
      ))}
    </div>
  );
}

export default function MeetingForm({
  action,
  meeting,
  submitLabel
}: MeetingFormProps) {
  const [state, formAction, isPending] = useActionState(
    action,
    initialMeetingFormState
  );

  return (
    <form action={formAction} className="space-y-6" noValidate>
      {state.message && (
        <div
          role="alert"
          aria-live="polite"
          className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          {state.message}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-slate-900">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            defaultValue={meeting?.date}
            aria-describedby="date-error"
            aria-invalid={state.errors.date ? true : undefined}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          <FieldError id="date-error" errors={state.errors.date} />
        </div>

        <div>
          <label htmlFor="meetingType" className="block text-sm font-medium text-slate-900">
            Meeting Type
          </label>
          <select
            id="meetingType"
            name="meetingType"
            defaultValue={meeting?.meetingType ?? 'regular'}
            aria-describedby="meetingType-error"
            aria-invalid={state.errors.meetingType ? true : undefined}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            {MEETING_TYPE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <FieldError id="meetingType-error" errors={state.errors.meetingType} />
        </div>

        <div>
          <label htmlFor="presiding" className="block text-sm font-medium text-slate-900">
            Presiding
          </label>
          <input
            type="text"
            id="presiding"
            name="presiding"
            defaultValue={meeting?.presiding}
            aria-describedby="presiding-error"
            aria-invalid={state.errors.presiding ? true : undefined}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          <FieldError id="presiding-error" errors={state.errors.presiding} />
        </div>

        <div>
          <label htmlFor="conducting" className="block text-sm font-medium text-slate-900">
            Conducting
          </label>
          <input
            type="text"
            id="conducting"
            name="conducting"
            defaultValue={meeting?.conducting}
            aria-describedby="conducting-error"
            aria-invalid={state.errors.conducting ? true : undefined}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          <FieldError id="conducting-error" errors={state.errors.conducting} />
        </div>
      </div>

      <div>
        <label htmlFor="announcements" className="block text-sm font-medium text-slate-900">
          Announcements{' '}
          <span className="font-normal text-slate-500">(one per line)</span>
        </label>
        <textarea
          id="announcements"
          name="announcements"
          rows={3}
          defaultValue={toLines(meeting?.announcements)}
          aria-describedby="announcements-error"
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
        <FieldError id="announcements-error" errors={state.errors.announcements} />
      </div>

      <fieldset className="rounded-lg border border-slate-200 p-4">
        <legend className="px-1 text-sm font-semibold text-slate-900">
          Opening Hymn
        </legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="openingHymnNumber"
              className="block text-sm font-medium text-slate-900"
            >
              Number
            </label>
            <input
              type="number"
              id="openingHymnNumber"
              name="openingHymnNumber"
              defaultValue={meeting?.openingHymn.number}
              aria-describedby="openingHymnNumber-error"
              aria-invalid={state.errors.openingHymnNumber ? true : undefined}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <FieldError
              id="openingHymnNumber-error"
              errors={state.errors.openingHymnNumber}
            />
          </div>

          <div>
            <label
              htmlFor="openingHymnTitle"
              className="block text-sm font-medium text-slate-900"
            >
              Title
            </label>
            <input
              type="text"
              id="openingHymnTitle"
              name="openingHymnTitle"
              defaultValue={meeting?.openingHymn.title}
              aria-describedby="openingHymnTitle-error"
              aria-invalid={state.errors.openingHymnTitle ? true : undefined}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <FieldError
              id="openingHymnTitle-error"
              errors={state.errors.openingHymnTitle}
            />
          </div>
        </div>
      </fieldset>

      <div>
        <label htmlFor="openingPrayer" className="block text-sm font-medium text-slate-900">
          Opening Prayer
        </label>
        <input
          type="text"
          id="openingPrayer"
          name="openingPrayer"
          defaultValue={meeting?.openingPrayer}
          aria-describedby="openingPrayer-error"
          aria-invalid={state.errors.openingPrayer ? true : undefined}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
        <FieldError id="openingPrayer-error" errors={state.errors.openingPrayer} />
      </div>

      <div>
        <label htmlFor="wardBusiness" className="block text-sm font-medium text-slate-900">
          Ward Business{' '}
          <span className="font-normal text-slate-500">(one item per line)</span>
        </label>
        <textarea
          id="wardBusiness"
          name="wardBusiness"
          rows={2}
          defaultValue={wardBusinessToLines(meeting)}
          aria-describedby="wardBusiness-error"
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
        <FieldError id="wardBusiness-error" errors={state.errors.wardBusiness} />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="stakeBusiness"
          name="stakeBusiness"
          defaultChecked={meeting?.stakeBusiness}
          className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
        />
        <label htmlFor="stakeBusiness" className="text-sm font-medium text-slate-900">
          Stake business will be conducted
        </label>
      </div>

      <fieldset className="rounded-lg border border-slate-200 p-4">
        <legend className="px-1 text-sm font-semibold text-slate-900">
          Sacrament Hymn
        </legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="sacramentHymnNumber"
              className="block text-sm font-medium text-slate-900"
            >
              Number
            </label>
            <input
              type="number"
              id="sacramentHymnNumber"
              name="sacramentHymnNumber"
              defaultValue={meeting?.sacramentHymn.number}
              aria-describedby="sacramentHymnNumber-error"
              aria-invalid={
                state.errors.sacramentHymnNumber ? true : undefined
              }
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <FieldError
              id="sacramentHymnNumber-error"
              errors={state.errors.sacramentHymnNumber}
            />
          </div>

          <div>
            <label
              htmlFor="sacramentHymnTitle"
              className="block text-sm font-medium text-slate-900"
            >
              Title
            </label>
            <input
              type="text"
              id="sacramentHymnTitle"
              name="sacramentHymnTitle"
              defaultValue={meeting?.sacramentHymn.title}
              aria-describedby="sacramentHymnTitle-error"
              aria-invalid={
                state.errors.sacramentHymnTitle ? true : undefined
              }
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <FieldError
              id="sacramentHymnTitle-error"
              errors={state.errors.sacramentHymnTitle}
            />
          </div>
        </div>
      </fieldset>

      <div>
        <label htmlFor="speakers" className="block text-sm font-medium text-slate-900">
          Speakers &amp; Musical Numbers{' '}
          <span className="font-normal text-slate-500">
            (one per line: Name | Topic | speaker or musical-number)
          </span>
        </label>
        <textarea
          id="speakers"
          name="speakers"
          rows={3}
          defaultValue={speakersToLines(meeting)}
          aria-describedby="speakers-error"
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
        <FieldError id="speakers-error" errors={state.errors.speakers} />
      </div>

      <fieldset className="rounded-lg border border-slate-200 p-4">
        <legend className="px-1 text-sm font-semibold text-slate-900">
          Closing Hymn
        </legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="closingHymnNumber"
              className="block text-sm font-medium text-slate-900"
            >
              Number
            </label>
            <input
              type="number"
              id="closingHymnNumber"
              name="closingHymnNumber"
              defaultValue={meeting?.closingHymn.number}
              aria-describedby="closingHymnNumber-error"
              aria-invalid={state.errors.closingHymnNumber ? true : undefined}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <FieldError
              id="closingHymnNumber-error"
              errors={state.errors.closingHymnNumber}
            />
          </div>

          <div>
            <label
              htmlFor="closingHymnTitle"
              className="block text-sm font-medium text-slate-900"
            >
              Title
            </label>
            <input
              type="text"
              id="closingHymnTitle"
              name="closingHymnTitle"
              defaultValue={meeting?.closingHymn.title}
              aria-describedby="closingHymnTitle-error"
              aria-invalid={state.errors.closingHymnTitle ? true : undefined}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <FieldError
              id="closingHymnTitle-error"
              errors={state.errors.closingHymnTitle}
            />
          </div>
        </div>
      </fieldset>

      <div>
        <label htmlFor="closingPrayer" className="block text-sm font-medium text-slate-900">
          Closing Prayer
        </label>
        <input
          type="text"
          id="closingPrayer"
          name="closingPrayer"
          defaultValue={meeting?.closingPrayer}
          aria-describedby="closingPrayer-error"
          aria-invalid={state.errors.closingPrayer ? true : undefined}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
        <FieldError id="closingPrayer-error" errors={state.errors.closingPrayer} />
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-indigo-600 px-5 py-3 font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? 'Saving…' : submitLabel}
        </button>

        <Link
          href="/meetings"
          className="rounded-lg border border-slate-300 px-5 py-3 font-medium text-slate-700 hover:bg-slate-50"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
