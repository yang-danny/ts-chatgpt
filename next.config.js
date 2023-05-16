/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    reactStrictMode: true,
    images: {
        domains: ['links.papareact.com'],
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'lh3.googleusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'cdn-1.webcatalog.io',
              },
          ],
    },
    experimental: {
        appDir:true,
    },
}

module.exports = nextConfig
