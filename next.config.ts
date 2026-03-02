import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.tildacdn.com",
      },
      {
        protocol: "http",
        hostname: "dreamagic.art",
      },
      {
        protocol: "https",
        hostname: "dreamagic.art",
      },
    ],
  },
};

export default nextConfig;
