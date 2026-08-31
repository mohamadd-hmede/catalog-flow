import { prisma } from "@/lib/prisma";
import { Prisma } from "@/app/generated/prisma/client";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
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

    return Response.json(product);
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
  try {
    const { id } = await params;

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
  try {
    const { id } = await params;

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
