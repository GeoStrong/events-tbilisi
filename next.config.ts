import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["ycrkhovgeuhxqbclfkjr.supabase.co"],
    // Enable automatic WebP conversion and responsive image optimization
    formats: ["image/avif", "image/webp"],
    // Cache optimized images for 1 year (they have content hashes)
    // cacheControl:
    //   "public, max-age=31536000, immutable, stale-while-revalidate=31536000",
    // Optimize device sizes for common breakpoints
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Image sizes for responsive images
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [50, 55, 60, 65, 75, 85, 95],
    // Enable static imports
    // staticDir: true,
  },
  /* Compression settings for optimal performance */
  compress: true,
  /* Optimize production builds */
  productionBrowserSourceMaps: false,
};

export default nextConfig;
