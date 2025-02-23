import { NextConfig } from 'next';

/** @type {NextConfig} */
const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb',
    },
  },
};

export default nextConfig;
