import { prisma } from "@/lib/prisma";
import { Prisma } from "@/app/generated/prisma/client";
import { auth } from "@/auth";

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

  if (!session?.user) {
    return new Response("Unauthorized", { status: 401 });
  }
  const { id } = await params;

  const existingProduct = await prisma.product.findUnique({
    where: { id: Number(id) },
  });

  if (!existingProduct) {
    return new Response("Product not found", { status: 404 });
  }

  if (existingProduct.userEmail !== session.user.email) {
    return new Response("Forbidden", { status: 403 });
  }

  try {
    const { name, price, category, description, image, featured } =
      await request.json();

    const product = await prisma.product.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        price,
        category,
        description,
        image,
        featured,
      },
    });

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

  if (!session?.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { id } = await params;

  const existingProduct = await prisma.product.findUnique({
    where: {
      id: Number(id),
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
