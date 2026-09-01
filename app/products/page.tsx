import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";

export default async function ProductsPage() {
  const products = await prisma.product.findMany();

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Product Catalog
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Browse Products
          </h1>

          <p className="mt-2 text-slate-600">
            Explore our available products and open any item to view its
            details.
          </p>
        </div>

        <Link
          href="/products/new"
          className="w-fit shrink-0 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Add Product
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <article
            key={product.id}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="relative mb-5 h-48 overflow-hidden rounded-xl bg-slate-100">
              {product.image && (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              )}
            </div>

            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-blue-600">
                  {product.category}
                </p>

                <h2 className="mt-1 text-xl font-semibold text-slate-900">
                  {product.name}
                </h2>
              </div>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
                ${product.price.toString()}{" "}
              </span>
            </div>

            <div className="flex justify-center">
              <Link
                href={`/products/${product.id}`}
                className="inline-flex rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                View Details
              </Link>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
