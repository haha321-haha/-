const withNextIntl = require('next-intl/plugin')('./i18n.ts');

const nextConfig = {
  // 图片优化配置
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
  
  // 基础配置
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  
  // 性能优化实验功能
  experimental: {
    optimizePackageImports: ['next-intl', 'lucide-react'],
    optimizeCss: true,
    scrollRestoration: true,
  },
  
  // 包转译优化
  transpilePackages: ['lucide-react', 'next-intl'],
  generateEtags: true,
  
  // 安全头部配置
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=3600, must-revalidate' },
        ],
      },
    ];
  },
};

module.exports = withNextIntl(nextConfig);
