/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '*.blob.core.windows.net',
          port: '',
          pathname: '**',
        },
      ],
    },
  }
  
