import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  pool: Pool | undefined;
};

const prismaClientSingleton = () => {
  // Reuse existing pool if available
  if (globalForPrisma.pool) {
    const adapter = new PrismaPg(globalForPrisma.pool);
    return new PrismaClient({ adapter });
  }

  // Create new pool
  const connectionString = process.env.DATABASE_URL!;
  const pool = new Pool({
    connectionString,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  });

  // Store pool globally to prevent garbage collection
  globalForPrisma.pool = pool;

  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
};

// Reuse existing instance if available, otherwise create a new one
export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}