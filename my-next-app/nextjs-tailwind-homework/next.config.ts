/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@whatwg-node/fetch'],
  },
};

module.exports = nextConfig;