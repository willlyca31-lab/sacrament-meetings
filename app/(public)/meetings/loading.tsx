export default function Loading() {
  return (
    <div
      aria-label="Loading meetings"
      className="space-y-6"
    >
      <div className="h-10 w-64 animate-pulse rounded bg-slate-200" />

      <div className="h-12 w-full animate-pulse rounded-lg bg-slate-200" />

      {[1, 2, 3, 4, 5].map((item) => (
        <div
          key={item}
          className="h-40 animate-pulse rounded-2xl bg-white shadow-sm"
        />
      ))}
    </div>
  );
}