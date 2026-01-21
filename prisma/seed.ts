import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding ...");

  // Cleanup existing data
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // 1. Electronics
  await prisma.category.create({
    data: {
      name: "Electronics",
      slug: "electronics",
      image:
        "https://images.unsplash.com/photo-1498049381961-a5d6a5e84928?w=800&q=80",
      products: {
        create: [
          {
            name: "Noise Cancelling Headphones",
            slug: "noise-cancelling-headphones",
            description:
              "Premium wireless headphones with industry-leading noise cancellation.",
            price: 299.99,
            stock: 50,
            images:
              "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
          },
          {
            name: "Smart Watch Series 5",
            slug: "smart-watch-series-5",
            description: "Advanced health monitoring and fitness tracking.",
            price: 399.0,
            stock: 30,
            images:
              "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80",
          },
          {
            name: "4K Action Camera",
            slug: "4k-action-camera",
            description: "Capture your adventures in stunning detail.",
            price: 199.5,
            stock: 15,
            images:
              "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80",
          },
        ],
      },
    },
  });

  // 2. Fashion
  await prisma.category.create({
    data: {
      name: "Fashion",
      slug: "fashion",
      image:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
      products: {
        create: [
          {
            name: "Classic Leather Jacket",
            slug: "classic-leather-jacket",
            description: "Timeless style made from genuine leather.",
            price: 149.99,
            stock: 20,
            images:
              "https://images.unsplash.com/photo-1551028919-ac6635f0e5c9?w=800&q=80",
          },
          {
            name: "Designer Sunglasses",
            slug: "designer-sunglasses",
            description: "Protect your eyes with style.",
            price: 120.0,
            stock: 45,
            images:
              "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80",
          },
          {
            name: "Running Sneakers",
            slug: "running-sneakers",
            description: "Lightweight and comfortable for daily runs.",
            price: 89.95,
            stock: 60,
            images:
              "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
          },
        ],
      },
    },
  });

  // 3. Home & Living
  await prisma.category.create({
    data: {
      name: "Home & Living",
      slug: "home-and-living",
      image:
        "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=800&q=80",
      products: {
        create: [
          {
            name: "Modern Desk Lamp",
            slug: "modern-desk-lamp",
            description: "Adjustable brightness and color temperature.",
            price: 45.0,
            stock: 100,
            images:
              "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80",
          },
          {
            name: "Ceramic Vase Set",
            slug: "ceramic-vase-set",
            description: "Minimalist design to enhance your home decor.",
            price: 34.5,
            stock: 25,
            images:
              "https://images.unsplash.com/photo-1581783342308-f792ca11df53?w=800&q=80",
          },
        ],
      },
    },
  });

  // 4. Beauty
  await prisma.category.create({
    data: {
      name: "Beauty",
      slug: "beauty",
      image:
        "https://images.unsplash.com/photo-1522335789203-abd65232121c?w=800&q=80",
      products: {
        create: [
          {
            name: "Hydrating Face Serum",
            slug: "hydrating-face-serum",
            description: "For glowing and healthy skin.",
            price: 29.0,
            stock: 50,
            images:
              "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80",
          },
        ],
      },
    },
  });

  // 5. Sports
  await prisma.category.create({
    data: {
      name: "Sports",
      slug: "sports",
      image:
        "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&q=80",
      products: {
        create: [
          {
            name: "Yoga Mat",
            slug: "yoga-mat",
            description: "Non-slip yoga mat for your daily practice.",
            price: 25.0,
            stock: 40,
            images:
              "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&q=80",
          },
        ],
      },
    },
  });

  console.log("Seeding finished.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
