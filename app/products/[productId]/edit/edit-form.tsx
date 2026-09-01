"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  product: {
    id: number;
    name: string;
    price: string;
    category: string;
    description: string;
    image: string;
    featured: boolean;
  };
};

export default function EditForm({ product }: Props) {
  const router = useRouter();

  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [category, setCategory] = useState(product.category);
  const [description, setDescription] = useState(product.description);
  const [image, setImage] = useState<File | null>(null);
  const [featured, setFeatured] = useState(product.featured);
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    const formData = new FormData();

    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("featured", String(featured));

    if (image) {
      formData.append("image", image);
    }

    const response = await fetch(`/api/products/${product.id}`, {
      method: "PUT",
      body: formData,
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      setMessage(errorMessage || "Failed to update product.");
      return;
    }

    router.push(`/products/${product.id}`);
    router.refresh();
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
          Product Management
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-900">Edit Product</h1>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-3"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Price
            </label>
            <input
              type="number"
              step="0.01"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-3"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Category
            </label>
            <input
              type="text"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-3"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Description
            </label>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              required
              rows={4}
              className="w-full rounded-lg border border-slate-300 px-4 py-3"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Replace Image
            </label>

            <p className="mb-3 text-sm text-slate-500">
              Leave this empty to keep the current image.
            </p>

            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(event) => setImage(event.target.files?.[0] ?? null)}
              className="w-full rounded-lg border border-slate-300 px-4 py-3"
            />
          </div>

          <label className="flex items-center gap-3 text-sm font-medium text-slate-700">
            <input
              type="checkbox"
              checked={featured}
              onChange={(event) => setFeatured(event.target.checked)}
            />
            Featured product
          </label>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Update Product
          </button>
        </form>

        {message && (
          <p className="mt-5 text-center font-medium text-slate-700">
            {message}
          </p>
        )}
      </div>
    </main>
  );
}
