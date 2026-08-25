import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../app/generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.product.createMany({
    data: [
      {
        name: "Wireless Headphones",
        price: 79.99,
        category: "Electronics",
        description:
          "Comfortable wireless headphones with clear sound, soft ear cushions, and long battery life.",
        image: "/products/headphones.jpg",
        featured: true,
      },
      {
        name: "Smart Watch",
        price: 129.99,
        category: "Electronics",
        description:
          "A modern smart watch for activity tracking, notifications, and everyday use.",
        image: "/products/smart-watch1.jpg",
        featured: true,
      },
      {
        name: "Running Shoes",
        price: 89.99,
        category: "Fashion",
        description:
          "Lightweight running shoes designed for comfort, support, and everyday training.",
        image: "/products/running-shoes.jpg",
        featured: true,
      },
      {
        name: "Coffee Maker",
        price: 59.99,
        category: "Home",
        description:
          "A compact coffee maker that makes preparing fresh coffee simple and convenient.",
        image: "/products/coffee-maker1.jpg",
        featured: false,
      },
    ],
  });

  console.log("Products seeded successfully");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
