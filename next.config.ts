import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: true,  // Enable experimental server actions if needed
  },
  serverActions: {
    bodySizeLimit: '50mb',  // Set the body size limit here
  },
};

export default nextConfig;
