"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

type Props = {
  productId: number;
  isOwner: boolean;
};

export default function DeleteButton({ productId, isOwner }: Props) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmed) {
      return;
    }

    setIsDeleting(true);

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        alert(errorMessage || "Failed to delete product.");
        return;
      }

      router.push("/products");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to delete product.");
    } finally {
      setIsDeleting(false);
    }
  }

  if (status === "loading") {
    return null;
  }

  if (!session || !isOwner) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isDeleting}
      className="rounded-lg bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isDeleting ? "Deleting..." : "Delete Product"}
    </button>
  );
}
