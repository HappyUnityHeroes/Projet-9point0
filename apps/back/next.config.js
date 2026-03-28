/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@9point0/ui', '@9point0/db', '@9point0/ai', '@9point0/billing'],
}

module.exports = nextConfig
