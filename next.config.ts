/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // disable ESLint during build
  },
  typescript: {
    ignoreBuildErrors: true, // disable TypeScript type checking during build
  },
};

module.exports = nextConfig;
