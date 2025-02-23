const nextConfig: NextConfig = {
  experimental: {}, // Remove serverActions from here
  serverActions: {
    bodySizeLimit: "50mb", // Set proper configuration
  },
};

export default nextConfig;
