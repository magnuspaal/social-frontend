/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '192.168.10.225',
        port: '8082',
        pathname: '/media/**'
      }
    ]
  },
}

module.exports = nextConfig
