"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

type Props = {
  productId: number;
  isOwner: boolean;
};

export default function DeleteButton({ productId, isOwner }: Props) {
  const router = useRouter();
  const { data: session, status } = useSession();

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

  if (status === "loading") {
    return null;
  }

  if (!session || !isOwner) {
    return null;
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
