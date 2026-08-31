import Image from "next/image";
import Link from "next/link";

type Product = {
  id: number;
  name: string;
  price: string;
  category: string;
  description: string;
  image: string;
  featured: boolean;
};

export default async function Home() {
  const response = await fetch(`${process.env.APP_URL}/api/products`, {
    cache: "no-store",
  });

  const products: Product[] = await response.json();

  const featuredProducts = products.filter((product) => product.featured);

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <section className="rounded-3xl bg-white p-10 shadow-sm">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-600">
          Discover what fits your needs
        </p>

        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Explore products in a simple, modern catalog.
        </h1>

        <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
          Browse a curated collection of products, open detailed product pages,
          and get in touch if you have any questions.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/products"
            className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Browse Products
          </Link>

          <Link
            href="/contact"
            className="rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Contact Us
          </Link>
        </div>
      </section>

      <section className="mt-14">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Featured
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            Featured Products
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <article
              key={product.id}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative h-52 bg-slate-100">
                {product.image && (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                )}
              </div>

              <div className="p-6">
                <p className="text-sm font-medium text-blue-600">
                  {product.category}
                </p>

                <h3 className="mt-1 text-xl font-semibold text-slate-900">
                  {product.name}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {product.description}
                </p>

                <div className="mt-5 flex items-center justify-between">
                  <span className="font-semibold text-slate-900">
                    ${product.price}
                  </span>

                  <Link
                    href={`/products/${product.id}`}
                    className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
