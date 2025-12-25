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
  
  // Note: Custom headers are not supported with static export (output: 'export')
  // Security headers should be configured at the hosting level:
  // - For GitHub Pages: Configure via GitHub Pages settings or use a service like Cloudflare
  // - For Vercel: Use vercel.json or Vercel dashboard
  // - For Netlify: Use _headers file in public directory
  // See SECURITY.md for recommended security header configuration
};

export default nextConfig;
