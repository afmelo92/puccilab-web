/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'randomuser.me',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'app-pucci-dental-lab.s3.amazonaws.com',
        port: '',
      },
    ],
  },
};

module.exports = nextConfig;
