import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
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
