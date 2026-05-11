import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',      // generates /out folder of pure static files
  trailingSlash: true,   // cPanel needs /about/ not /about
  images: {
    unoptimized: true,   // static export can't use Next.js image server
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
