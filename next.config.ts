import type { NextConfig } from "next";

import { routeRedirects } from "./src/lib/route-redirects";

const cloudinaryCloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "djhqowk67";

const nextConfig: NextConfig = {
  cacheComponents: true,
  env: {
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: cloudinaryCloudName,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: `/${cloudinaryCloudName}/image/upload/**`,
      },
    ],
  },
  reactCompiler: true,
  async redirects() {
    return routeRedirects;
  },
};

export default nextConfig;
