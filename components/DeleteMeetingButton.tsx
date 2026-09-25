'use client';

import { deleteMeeting } from '@/lib/actions';

interface DeleteMeetingButtonProps {
  id: number;
}

export default function DeleteMeetingButton({
  id
}: DeleteMeetingButtonProps) {
  return (
    <form
      action={deleteMeeting}
      onSubmit={(event) => {
        const confirmed = window.confirm(
          'Delete this meeting? This cannot be undone.'
        );

        if (!confirmed) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="inline-flex rounded-lg border border-red-200 px-4 py-2 font-medium text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
      >
        Delete
        <span className="sr-only"> meeting #{id}</span>
      </button>
    </form>
  );
}
