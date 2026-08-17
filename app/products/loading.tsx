export default function Loading() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
          Products
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          Loading products...
        </h1>

        <p className="mt-2 text-slate-600">
          Please wait while we prepare the catalog.
        </p>
      </div>
    </main>
  );
}
