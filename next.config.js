/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  scope: "/"
})

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['i.scdn.co', 't.scdn.co', 'user-images.githubusercontent.com']
  }
}

module.exports = withPWA(nextConfig)
