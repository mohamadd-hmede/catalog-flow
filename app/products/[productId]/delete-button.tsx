"use client";

import { useRouter } from "next/navigation";

type Props = {
  productId: number;
};

export default function DeleteButton({ productId }: Props) {
  const router = useRouter();

  async function handleDelete() {
    const response = await fetch(`/api/products/${productId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      alert("Failed to delete product.");
      return;
    }

    router.push("/products");
    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      className="rounded-lg bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
    >
      Delete Product
    </button>
  );
}
