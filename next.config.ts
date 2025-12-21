import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '',
  trailingSlash: true,
  allowedDevOrigins: [
    'http://localhost:3000',
    'http://192.168.29.73:3000',
  ],
};

export default nextConfig;
