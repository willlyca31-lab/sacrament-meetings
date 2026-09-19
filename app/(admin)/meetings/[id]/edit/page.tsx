export default async function EditMeetingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="rounded-2xl bg-white p-8 shadow-sm">
      <h1 className="text-3xl font-bold text-slate-900">
        Edit Meeting — Coming in Week 04
      </h1>

      <p className="mt-4 text-slate-600">
        Meeting ID: {id}
      </p>

      <p className="mt-2 text-slate-600">
        The edit form will be implemented in Week 04.
      </p>
    </div>
  );
}