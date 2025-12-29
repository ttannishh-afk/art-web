import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // 1. Clear existing data (optional, prevents duplicates)
  await prisma.product.deleteMany()

  // 2. Create Sample Products
  await prisma.product.createMany({
    data: [
      {
        title: "The Midnight Bloom",
        description: "An oil painting depicting the quiet solitude of night.",
        price: 450.00,
        category: "ORIGINAL",
        images: ["https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=800"],
        stock: 1,
        featured: true
      },
      {
        title: "Neon Dreams",
        description: "A digital print exploring cyberpunk aesthetics.",
        price: 45.00,
        category: "PRINT",
        images: ["https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800"],
        stock: 50,
        featured: true
      },
      {
        title: "Abstract Chaos",
        description: "Limited edition print. Signed by the artist.",
        price: 120.00,
        category: "PRINT",
        images: ["https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&w=800"],
        stock: 10,
        featured: false
      },
      {
        title: "Golden Hour Study",
        description: "Sketch on archival paper.",
        price: 85.00,
        category: "ORIGINAL",
        images: ["https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=800"],
        stock: 1,
        featured: true
      }
    ]
  })

  console.log('✅ Seed finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })