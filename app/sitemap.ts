import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { siteUrl } from "@/lib/env";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/about",
    "/contact",
    "/for-self",
    "/for-work",
    "/gallery",
    "/impact",
    "/shop",
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }));

  const products = await prisma.product.findMany({
    select: {
      id: true,
      createdAt: true,
    },
  });

  const productRoutes = products.map((product) => ({
    url: `${siteUrl}/product/${product.id}`,
    lastModified: product.createdAt,
  }));

  return [...staticRoutes, ...productRoutes];
}
