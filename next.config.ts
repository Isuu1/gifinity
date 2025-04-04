import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.giphy.com",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "1.3mb",
    },
  },
};

export default nextConfig;
