/** @type {import('next').NextConfig} */
import remotePatterns from './image-remote-patterns'

const nextConfig = {
  images: {
    remotePatterns
  },
}

module.exports = nextConfig
