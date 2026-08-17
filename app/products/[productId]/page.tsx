import { products } from "../data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

type Props = {
  params: Promise<{ productId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { productId } = await params;

  const product = products.find((product) => product.id === Number(productId));

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.name} | CatalogFlow`,
    description: `View details for ${product.name}.`,
  };
}

export default async function ProductDetailsPage({ params }: Props) {
  const { productId } = await params;

  const product = products.find((product) => product.id === Number(productId));

  if (!product) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <Link
        href="/products"
        className="mb-6 inline-flex text-sm font-medium text-blue-600 transition hover:text-blue-700"
      >
        ← Back to Products
      </Link>

      <section className="grid gap-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:grid-cols-2">
        <div className="relative min-h-[320px] overflow-hidden rounded-2xl bg-slate-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            {product.category}
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            {product.name}
          </h1>

          <p className="mt-4 text-3xl font-bold text-slate-900">
            ${product.price}
          </p>

          <div className="mt-6">
            <h2 className="text-lg font-semibold text-slate-900">
              Description
            </h2>

            <p className="mt-2 leading-7 text-slate-600">
              {product.description}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
