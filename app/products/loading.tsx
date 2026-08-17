export default function Loading() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-8">
        <div className="h-4 w-28 animate-pulse rounded bg-slate-200" />

        <div className="mt-3 h-9 w-56 animate-pulse rounded-lg bg-slate-200" />

        <div className="mt-3 h-5 w-96 max-w-full animate-pulse rounded bg-slate-200" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            key={item}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
          >
            <div className="h-52 animate-pulse bg-slate-200" />

            <div className="p-6">
              <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />

              <div className="mt-3 h-6 w-3/4 animate-pulse rounded bg-slate-200" />

              <div className="mt-5 space-y-2">
                <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
                <div className="h-4 w-5/6 animate-pulse rounded bg-slate-200" />
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div className="h-5 w-16 animate-pulse rounded bg-slate-200" />

                <div className="h-9 w-28 animate-pulse rounded-lg bg-slate-200" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
