import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['xzxpcaugzojssxfsgmiw.supabase.co'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'xzxpcaugzojssxfsgmiw.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;

