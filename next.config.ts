import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { 
    remotePatterns: [{ 
      protocol: "https", 
      hostname: "images.unsplash.com" 
    }] 
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    // Ignore ESLint during build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;