import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/home',
      },
      {
        source: '/contact-us',
        destination: '/home/contact-us',
      },
    ];
  },
};

export default nextConfig;
