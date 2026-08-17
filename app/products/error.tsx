"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <section className="rounded-2xl border border-red-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-red-600">
          Error
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          Something went wrong
        </h1>

        <p className="mt-3 text-slate-600">{error.message}</p>

        <button
          type="button"
          onClick={reset}
          className="mt-6 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Try Again
        </button>
      </section>
    </main>
  );
}
