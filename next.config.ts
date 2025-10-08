import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'upa-cdn.s3.eu-west-2.amazonaws.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
