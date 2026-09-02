"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function NewProductPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [featured, setFeatured] = useState(false);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    router.push("/api/auth/signin");
    return null;
  }

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!image) {
      setMessage("Please select a product image.");
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData();

    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("featured", String(featured));

    setIsSubmitting(true);
    setMessage("Uploading product...");

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        setMessage(errorMessage || "Failed to add product.");
        return;
      }

      setMessage("Product added successfully.");

      router.push("/products");
      router.refresh();
    } catch (error) {
      console.error(error);
      setMessage("Failed to add product.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
          Product Management
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-900">Add Product</h1>

        <p className="mt-2 text-slate-600">
          Add a new product to the CatalogFlow database.
        </p>

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
              disabled={isSubmitting}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 disabled:cursor-not-allowed disabled:bg-slate-100"
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
              disabled={isSubmitting}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 disabled:cursor-not-allowed disabled:bg-slate-100"
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
              disabled={isSubmitting}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 disabled:cursor-not-allowed disabled:bg-slate-100"
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
              disabled={isSubmitting}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 disabled:cursor-not-allowed disabled:bg-slate-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Product Image
            </label>

            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(event) => setImage(event.target.files?.[0] ?? null)}
              required
              disabled={isSubmitting}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 disabled:cursor-not-allowed disabled:bg-slate-100"
            />

            <p className="mt-2 text-sm text-slate-500">
              JPEG, PNG, or WebP. Maximum size: 4 MB.
            </p>
          </div>

          <label className="flex items-center gap-3 text-sm font-medium text-slate-700">
            <input
              type="checkbox"
              checked={featured}
              onChange={(event) => setFeatured(event.target.checked)}
              disabled={isSubmitting}
            />
            Featured product
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Adding Product..." : "Add Product"}
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
