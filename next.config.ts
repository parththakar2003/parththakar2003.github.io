import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '',
  trailingSlash: true,
  // Security: Removed specific dev origins to prevent exposing internal IPs in public repo
  // Configure your dev origins in local environment variables if needed
};

export default nextConfig;
