/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@whatwg-node/fetch'],
  },
};

export default nextConfig;