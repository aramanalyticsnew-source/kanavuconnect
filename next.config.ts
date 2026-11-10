import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Representative photography is served from Unsplash until official
    // event photography is available. Replace the URLs in src/content/media.ts.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

export default nextConfig;
