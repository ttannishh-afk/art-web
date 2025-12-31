import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '2eaou7boguk2zwwg.public.blob.vercel-storage.com', // 👈 The URL from your error
        port: '',
      },
    ],
  },
};

export default nextConfig;