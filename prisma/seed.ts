import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


async function main() {
  console.log("Start seeding...");

  // Clear DB to avoid duplicates
  await prisma.contactInquiry.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.product.deleteMany();

  await prisma.product.createMany({
    data: [
      // --- OIL ---
      {
        title: "Crimson Silence",
        description: "Oil on canvas. A deep study of red hues.",
        price: 1200.00,
        category: "OIL",
        stock: 1, 
        featured: true,
        images: ["/images/gallery-1.jpg"] // <--- Local Path
      },
      {
        title: "The Old Harbor",
        description: "Oil on linen. Textured strokes.",
        price: 950.00,
        category: "OIL",
        stock: 1,
        featured: false,
        images: ["/images/gallery-1.jpg"] 
      },

      // --- ACRYLIC ---
      {
        title: "Neon City Abstract",
        description: "Heavy body acrylics on canvas.",
        price: 600.00,
        category: "ACRYLIC",
        stock: 3,
        featured: true,
        images: ["/images/gallery-1.jpg"]
      },
      {
        title: "Fluid Motion III",
        description: "Acrylic pour on round canvas.",
        price: 350.00,
        category: "ACRYLIC",
        stock: 2,
        featured: false,
        images: ["/images/gallery-1.jpg"]
      },

      // --- WATERCOLOR ---
      {
        title: "Misty Mountains",
        description: "Watercolor on cold press paper.",
        price: 180.00,
        category: "WATERCOLOR",
        stock: 5,
        featured: false,
        images: ["/images/gallery-1.jpg"]
      },

       // --- SKETCH ---
       {
        title: "Figure Study No. 5",
        description: "Charcoal on toned paper.",
        price: 120.00,
        category: "SKETCH",
        stock: 1,
        featured: false,
        images: ["/images/gallery-1.jpg"]
      },
    ],
  });

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
