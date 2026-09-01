import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";

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

  if (!session?.user?.email) {
    return new Response("Unauthorized", { status: 401 });
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
      typeof description !== "string" ||
      !(image instanceof File)
    ) {
      return new Response("Invalid product data", { status: 400 });
    }

    const numericPrice = Number(price);

    if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
      return new Response("Price must be greater than zero", {
        status: 400,
      });
    }

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

    const safeFileName = image.name.replace(/[^a-zA-Z0-9._-]/g, "-");

    const blob = await put(`products/${safeFileName}`, image, {
      access: "public",
      addRandomSuffix: true,
    });

    const product = await prisma.product.create({
      data: {
        name: name.trim(),
        price: numericPrice,
        category: category.trim(),
        description: description.trim(),
        image: blob.url,
        featured,
        userEmail: session.user.email,
      },
    });

    revalidatePath("/products");

    return Response.json(product, {
      status: 201,
    });
  } catch (error) {
    console.error(error);

    return new Response("Failed to create product", {
      status: 500,
    });
  }
}
