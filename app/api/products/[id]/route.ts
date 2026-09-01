import { prisma } from "@/lib/prisma";
import { Prisma } from "@/app/generated/prisma/client";
import { auth } from "@/auth";
import { put, del } from "@vercel/blob";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth();
    const { id } = await params;

    const product = await prisma.product.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!product) {
      return new Response("Product not found", {
        status: 404,
      });
    }

    return Response.json({
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description,
      image: product.image,
      featured: product.featured,
      isOwner: session?.user?.email === product.userEmail,
    });
  } catch (error) {
    console.log(error);

    return new Response("Failed to get product", {
      status: 500,
    });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();

  if (!session?.user?.email) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { id } = await params;
  const productId = Number(id);

  if (!Number.isInteger(productId)) {
    return new Response("Invalid product ID", { status: 400 });
  }

  const existingProduct = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!existingProduct) {
    return new Response("Product not found", { status: 404 });
  }

  if (existingProduct.userEmail !== session.user.email) {
    return new Response("Forbidden", { status: 403 });
  }

  try {
    const formData = await request.formData();

    const name = formData.get("name");
    const price = formData.get("price");
    const category = formData.get("category");
    const description = formData.get("description");
    const image = formData.get("image");
    const featured = formData.get("featured") === "true";

    if (
      typeof name !== "string" ||
      typeof price !== "string" ||
      typeof category !== "string" ||
      typeof description !== "string"
    ) {
      return new Response("Invalid product data", { status: 400 });
    }

    const numericPrice = Number(price);

    if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
      return new Response("Price must be greater than zero", {
        status: 400,
      });
    }

    let imageUrl = existingProduct.image;
    let oldImageToDelete: string | null = null;

    if (image instanceof File && image.size > 0) {
      const allowedImageTypes = ["image/jpeg", "image/png", "image/webp"];

      if (!allowedImageTypes.includes(image.type)) {
        return new Response("Only JPEG, PNG, and WebP images are allowed", {
          status: 400,
        });
      }

      if (image.size > 4 * 1024 * 1024) {
        return new Response("Image must be smaller than 4 MB", {
          status: 400,
        });
      }

      const safeFileName = image.name.replace(/[^a-zA-Z0-9.-]/g, "-");

      const blob = await put(`products/${safeFileName}`, image, {
        access: "public",
        addRandomSuffix: true,
      });

      imageUrl = blob.url;
      oldImageToDelete = existingProduct.image;
    }

    const product = await prisma.product.update({
      where: { id: productId },
      data: {
        name,
        price: numericPrice,
        category,
        description,
        image: imageUrl,
        featured,
      },
    });

    if (oldImageToDelete) {
      await del(oldImageToDelete);
    }

    return Response.json(product);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return new Response("Product not found", { status: 404 });
    }

    console.log(error);

    return new Response("Failed to update product", {
      status: 500,
    });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();

  if (!session?.user?.email) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { id } = await params;
  const productId = Number(id);

  if (!Number.isInteger(productId)) {
    return new Response("Invalid product ID", { status: 400 });
  }

  const existingProduct = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!existingProduct) {
    return new Response("Product not found", { status: 404 });
  }

  if (existingProduct.userEmail !== session.user.email) {
    return new Response("Forbidden", { status: 403 });
  }

  try {
    const product = await prisma.product.delete({
      where: {
        id: Number(id),
      },
    });

    if (product.image) {
      await del(product.image);
    }

    return Response.json(product);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return new Response("Product not found", {
        status: 404,
      });
    }

    console.log(error);

    return new Response("Failed to delete product", {
      status: 500,
    });
  }
}
