/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: process.env.FILE_API_PROTOCOL,
        hostname: process.env.FILE_API_HOSTNAME,
        port: process.env.FILE_API_PORT,
        pathname:  process.env.PATHNAME
      }
    ]
  }
}

module.exports = nextConfig
