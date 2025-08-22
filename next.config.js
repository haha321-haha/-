const withNextIntl = require('next-intl/plugin')('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // �� Core Web Vitals 优化配置
  images: {
    unoptimized: false,
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512, 640, 750, 828],
    minimumCacheTTL: 31536000,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    loader: 'default',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'periodhub.health',
        port: '',
        pathname: '/**',
      },
    ]
  },

  // �� 性能优化
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  
  // 🚀 实验性功能 - 整合你的建议
  experimental: {
    // �� 包导入优化：包含国际化相关包
    optimizePackageImports: ['next-intl', 'lucide-react'],
    // �� CSS优化
    optimizeCss: true,
    // 📜 滚动恢复
    scrollRestoration: true,
  },

  // 🚀 包转译优化
  transpilePackages: ['lucide-react', 'next-intl'],

  // 🚀 缓存策略优化
  generateEtags: true,
  
  // 🚀 压缩优化
  swcMinify: true,
  
  // 🚀 输出优化
  output: 'standalone',
  
  // 🚀 环境变量配置
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  
  // 🚀 头部配置
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, must-revalidate',
          },
        ],
      },
    ];
  },
};

module.exports = withNextIntl(nextConfig);
