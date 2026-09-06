import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    // Portrait and any project screenshots dropped into /public.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
