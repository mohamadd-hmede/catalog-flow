import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import EditForm from "./edit-form";

type Props = {
  params: Promise<{ productId: string }>;
};

export default async function EditProductPage({ params }: Props) {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/api/auth/signin");
  }

  const { productId } = await params;

  const product = await prisma.product.findUnique({
    where: {
      id: Number(productId),
    },
  });

  if (!product) {
    notFound();
  }

  if (product.userEmail !== session.user.email) {
    redirect(`/products/${productId}`);
  }

  return (
    <EditForm
      product={{
        id: product.id,
        name: product.name,
        price: product.price.toString(),
        category: product.category,
        description: product.description,
        image: product.image,
        featured: product.featured,
      }}
    />
  );
}
