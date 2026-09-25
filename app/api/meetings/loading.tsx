export default function Loading() {
  return (
    <div className="space-y-5" aria-label="Loading meetings">
      <div className="h-8 w-48 animate-pulse rounded bg-slate-200" />

      <div className="h-48 animate-pulse rounded-2xl bg-white shadow-sm" />

      <div className="h-48 animate-pulse rounded-2xl bg-white shadow-sm" />

      <div className="h-48 animate-pulse rounded-2xl bg-white shadow-sm" />
    </div>
  );
}