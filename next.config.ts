import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "yrrzp4zqlhg33gdn.public.blob.vercel-storage.com",
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
