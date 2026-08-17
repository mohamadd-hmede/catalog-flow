import Link from "next/link";

export default function ProductNotFound() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <section className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
          404
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          Product Not Found
        </h1>

        <p className="mt-3 text-slate-600">
          The product you are looking for does not exist.
        </p>

        <Link
          href="/products"
          className="mt-6 inline-flex rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Back to Products
        </Link>
      </section>
    </main>
  );
}
