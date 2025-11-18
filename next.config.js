/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
  env: {
    NEXT_PUBLIC_APP_NAME: 'Restaurant Intelligence Platform',
    NEXT_PUBLIC_APP_VERSION: '0.1.0',
  },
};

module.exports = nextConfig;
