import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }] },
  typescript: {
    // ✅ This disables type checking at build time
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
