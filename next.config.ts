import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "gacservices.com" },
      { hostname: "www.gacservices.com" },
      { hostname: "bizeleven.com" },
      { hostname: "www.bizeleven.com" },
      { hostname: "sipltraining.com" },
      { hostname: "www.sipltraining.com" },
      { hostname: "cleaningkarigar.com" },
      { hostname: "www.cleaningkarigar.com" },
      { hostname: "images.unsplash.com" },
    ],
  },
}

export default nextConfig
