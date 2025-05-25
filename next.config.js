/** @type {import('next').NextConfig} */
const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: false, // Enable PWA in development for testing
  cacheOnFrontEndNav: true,
  reloadOnOnline: true,
  swcMinify: true,
  workboxOptions: {
    disableDevLogs: true,
  }
})

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.example.com"],
    unoptimized: true,
  },
  // Increase chunk size limit
  experimental: {
    largePageDataBytes: 128 * 100000, // 128MB
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Disable static optimization for pages that use server-side data
  unstable_runtimeJS: true,
  unstable_JsPreload: false,
  // Disable static optimization for pages that use server-side data
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
      {
        source: "/sw.js",
        headers: [
          {
            key: "Content-Type",
            value: "application/javascript; charset=utf-8",
          },
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self'",
          },
        ],
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: "/manifest.json",
        destination: "/api/manifest",
      },
    ]
  },
  webpack: (config, { isServer }) => {
    // Fix for the build error
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      }
    }
    return config
  },
}

module.exports = withPWA(nextConfig)
