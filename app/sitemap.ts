import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { siteUrl } from "@/lib/env";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/about",
    "/commissioned-canvases",
    "/contact",
    "/corporate-art-experiences",
    "/for-self",
    "/for-work",
    "/gallery",
    "/impact",
    "/murals-spatial-art",
    "/murals-spatial-art/corporate",
    "/murals-spatial-art/residential",
    "/shop",
    "/weddings-private-events",
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }));

  let productRoutes: MetadataRoute.Sitemap = [];

  try {
    const products = await prisma.product.findMany({
      select: {
        id: true,
        createdAt: true,
      },
    });

    productRoutes = products.map((product) => ({
      url: `${siteUrl}/product/${product.id}`,
      lastModified: product.createdAt,
    }));
  } catch (error) {
    // Silently handle database errors during build
    console.debug("Sitemap: Unable to fetch products", error);
  }

  return [...staticRoutes, ...productRoutes];
}
