
'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import {
  createMeeting,
  initialMeetingFormState,
} from '@/lib/actions';

function FieldError({
  id,
  errors,
}: {
  id: string;
  errors?: string[];
}) {
  return (
    <div
      id={`${id}-error`}
      aria-live="polite"
      className="mt-1 text-sm text-red-600"
    >
      {errors?.map((error) => (
        <p key={error}>{error}</p>
      ))}
    </div>
  );
}

export default function CreateMeetingForm() {
  const [state, formAction, isPending] = useActionState(
    createMeeting,
    initialMeetingFormState
  );

  // Safely handle the form state during prerendering and after validation.
  const errors = state?.errors ?? {};

  return (
    <form
      action={formAction}
      className="space-y-8 rounded-2xl bg-white p-8 shadow-sm"
    >
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Create Meeting
        </h1>

        <p className="mt-2 text-slate-600">
          Create a new sacrament meeting record.
        </p>
      </div>

      {state?.message && (
        <div
          aria-live="polite"
          className="rounded-lg bg-red-50 p-4 text-sm text-red-700"
        >
          {state.message}
        </div>
      )}

      {/* Basic Information */}
      <section className="space-y-5">
        <h2 className="text-xl font-semibold text-slate-900">
          Meeting Information
        </h2>

        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-slate-700"
          >
            Date
          </label>

          <input
            id="date"
            name="date"
            type="date"
            required
            aria-describedby="date-error"
            className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2"
          />

          <FieldError
            id="date"
            errors={errors.date}
          />
        </div>

        <div>
          <label
            htmlFor="meetingType"
            className="block text-sm font-medium text-slate-700"
          >
            Meeting Type
          </label>

          <select
            id="meetingType"
            name="meetingType"
            required
            aria-describedby="meetingType-error"
            className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2"
            defaultValue="regular"
          >
            <option value="regular">Regular</option>
            <option value="testimony">Testimony</option>
            <option value="stake">Stake</option>
            <option value="general">General</option>
          </select>

          <FieldError
            id="meetingType"
            errors={errors.meetingType}
          />
        </div>

        <div>
          <label
            htmlFor="presiding"
            className="block text-sm font-medium text-slate-700"
          >
            Presiding Officer
          </label>

          <input
            id="presiding"
            name="presiding"
            type="text"
            required
            aria-describedby="presiding-error"
            className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2"
            placeholder="Bishop Johnson"
          />

          <FieldError
            id="presiding"
            errors={errors.presiding}
          />
        </div>

        <div>
          <label
            htmlFor="conducting"
            className="block text-sm font-medium text-slate-700"
          >
            Conducting Officer
          </label>

          <input
            id="conducting"
            name="conducting"
            type="text"
            required
            aria-describedby="conducting-error"
            className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2"
            placeholder="Brother Williams"
          />

          <FieldError
            id="conducting"
            errors={errors.conducting}
          />
        </div>

        <div>
          <label
            htmlFor="announcements"
            className="block text-sm font-medium text-slate-700"
          >
            Announcements
          </label>

          <textarea
            id="announcements"
            name="announcements"
            rows={4}
            aria-describedby="announcements-error"
            className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2"
            placeholder="One announcement per line"
          />

          <FieldError
            id="announcements"
            errors={errors.announcements}
          />
        </div>
      </section>

      {/* Opening */}
      <section className="space-y-5">
        <h2 className="text-xl font-semibold text-slate-900">
          Opening
        </h2>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label
              htmlFor="openingHymnNumber"
              className="block text-sm font-medium text-slate-700"
            >
              Opening Hymn Number
            </label>

            <input
              id="openingHymnNumber"
              name="openingHymnNumber"
              type="number"
              min="1"
              required
              aria-describedby="openingHymnNumber-error"
              className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2"
            />

            <FieldError
              id="openingHymnNumber"
              errors={errors.openingHymnNumber}
            />
          </div>

          <div>
            <label
              htmlFor="openingHymnTitle"
              className="block text-sm font-medium text-slate-700"
            >
              Opening Hymn Title
            </label>

            <input
              id="openingHymnTitle"
              name="openingHymnTitle"
              type="text"
              required
              aria-describedby="openingHymnTitle-error"
              className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2"
              placeholder="The Spirit of God"
            />

            <FieldError
              id="openingHymnTitle"
              errors={errors.openingHymnTitle}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="openingPrayer"
            className="block text-sm font-medium text-slate-700"
          >
            Opening Prayer
          </label>

          <input
            id="openingPrayer"
            name="openingPrayer"
            type="text"
            required
            aria-describedby="openingPrayer-error"
            className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2"
            placeholder="Sister Garcia"
          />

          <FieldError
            id="openingPrayer"
            errors={errors.openingPrayer}
          />
        </div>
      </section>

      {/* Business */}
      <section className="space-y-5">
        <h2 className="text-xl font-semibold text-slate-900">
          Ward Business
        </h2>

        <div>
          <label
            htmlFor="wardBusiness"
            className="block text-sm font-medium text-slate-700"
          >
            Ward Business
          </label>

          <textarea
            id="wardBusiness"
            name="wardBusiness"
            rows={4}
            aria-describedby="wardBusiness-error"
            className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2"
            placeholder="One item per line"
          />

          <FieldError
            id="wardBusiness"
            errors={errors.wardBusiness}
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            id="stakeBusiness"
            name="stakeBusiness"
            type="checkbox"
            aria-describedby="stakeBusiness-error"
            className="h-4 w-4 rounded border-slate-300"
          />

          <label
            htmlFor="stakeBusiness"
            className="text-sm font-medium text-slate-700"
          >
            Includes stake business
          </label>

          <FieldError
            id="stakeBusiness"
            errors={errors.stakeBusiness}
          />
        </div>
      </section>

      {/* Sacrament */}
      <section className="space-y-5">
        <h2 className="text-xl font-semibold text-slate-900">
          Sacrament
        </h2>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label
              htmlFor="sacramentHymnNumber"
              className="block text-sm font-medium text-slate-700"
            >
              Sacrament Hymn Number
            </label>

            <input
              id="sacramentHymnNumber"
              name="sacramentHymnNumber"
              type="number"
              min="1"
              required
              aria-describedby="sacramentHymnNumber-error"
              className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2"
            />

            <FieldError
              id="sacramentHymnNumber"
              errors={errors.sacramentHymnNumber}
            />
          </div>

          <div>
            <label
              htmlFor="sacramentHymnTitle"
              className="block text-sm font-medium text-slate-700"
            >
              Sacrament Hymn Title
            </label>

            <input
              id="sacramentHymnTitle"
              name="sacramentHymnTitle"
              type="text"
              required
              aria-describedby="sacramentHymnTitle-error"
              className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2"
              placeholder="In Remembrance of Thy Suffering"
            />

            <FieldError
              id="sacramentHymnTitle"
              errors={errors.sacramentHymnTitle}
            />
          </div>
        </div>
      </section>

      {/* Speakers */}
      <section className="space-y-5">
        <h2 className="text-xl font-semibold text-slate-900">
          Speakers
        </h2>

        <div>
          <label
            htmlFor="speakers"
            className="block text-sm font-medium text-slate-700"
          >
            Speakers
          </label>

          <textarea
            id="speakers"
            name="speakers"
            rows={5}
            aria-describedby="speakers-error"
            className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2"
            placeholder="Name | Topic | speaker"
          />

          <p className="mt-1 text-xs text-slate-500">
            One speaker per line. Example: Sister Brown | Faith in Jesus
            Christ | speaker
          </p>

          <FieldError
            id="speakers"
            errors={errors.speakers}
          />
        </div>
      </section>

      {/* Closing */}
      <section className="space-y-5">
        <h2 className="text-xl font-semibold text-slate-900">
          Closing
        </h2>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label
              htmlFor="closingHymnNumber"
              className="block text-sm font-medium text-slate-700"
            >
              Closing Hymn Number
            </label>

            <input
              id="closingHymnNumber"
              name="closingHymnNumber"
              type="number"
              min="1"
              required
              aria-describedby="closingHymnNumber-error"
              className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2"
            />

            <FieldError
              id="closingHymnNumber"
              errors={errors.closingHymnNumber}
            />
          </div>

          <div>
            <label
              htmlFor="closingHymnTitle"
              className="block text-sm font-medium text-slate-700"
            >
              Closing Hymn Title
            </label>

            <input
              id="closingHymnTitle"
              name="closingHymnTitle"
              type="text"
              required
              aria-describedby="closingHymnTitle-error"
              className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2"
              placeholder="O God, Our Help in Ages Past"
            />

            <FieldError
              id="closingHymnTitle"
              errors={errors.closingHymnTitle}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="closingPrayer"
            className="block text-sm font-medium text-slate-700"
          >
            Closing Prayer
          </label>

          <input
            id="closingPrayer"
            name="closingPrayer"
            type="text"
            required
            aria-describedby="closingPrayer-error"
            className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2"
            placeholder="Brother Davis"
          />

          <FieldError
            id="closingPrayer"
            errors={errors.closingPrayer}
          />
        </div>
      </section>

      {/* Actions */}
      <div className="flex items-center gap-4 border-t border-slate-200 pt-6">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? 'Creating Meeting...' : 'Create Meeting'}
        </button>

        <Link
          href="/meetings"
          className="rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
