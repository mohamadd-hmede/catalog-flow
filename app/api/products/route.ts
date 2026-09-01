import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        price: true,
        category: true,
        description: true,
        image: true,
        featured: true,
      },
      orderBy: {
        id: "asc",
      },
    });

    return Response.json(products);
  } catch (error) {
    console.log(error);

    return new Response("Failed to get products", {
      status: 500,
    });
  }
}

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const { name, price, category, description, image, featured } =
      await request.json();

    const product = await prisma.product.create({
      data: {
        name,
        price,
        category,
        description,
        image,
        featured,
        userEmail: session.user.email,
      },
    });

    return Response.json(product, {
      status: 201,
    });
  } catch (error) {
    console.log(error);

    return new Response("Failed to create product", {
      status: 500,
    });
  }
}
