import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import DeleteButton from "./delete-button";

type Props = {
  params: Promise<{ productId: string }>;
};

type Product = {
  id: number;
  name: string;
  price: string;
  category: string;
  description: string;
  image: string;
  featured: boolean;
};

async function getProduct(productId: string): Promise<Product | null> {
  const response = await fetch(
    `http://localhost:5000/api/products/${productId}`,
    {
      cache: "no-store",
    },
  );

  if (response.status === 404) {
    return null;
  }

  return response.json();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { productId } = await params;

  const product = await getProduct(productId);

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

  const product = await getProduct(productId);

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
          {product.image && (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          )}
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

            <div className="mt-6 flex gap-3">
              <Link
                href={`/products/${product.id}/edit`}
                className="inline-flex rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Edit Product
              </Link>

              <DeleteButton productId={product.id} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
