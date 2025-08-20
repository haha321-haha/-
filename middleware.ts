import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale, localePrefix } from './i18n';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix
});

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 将根路径与语言根路径统一指向原有交互工具首页（保留 home-clean 作为备用页）
  if (pathname === '/') {
    const url = request.nextUrl.clone();
    url.pathname = '/zh/interactive-tools';
    return NextResponse.redirect(url, 308);
  }

  // 兼容无语言前缀的 /home-clean（含尾随斜杠）
  if (pathname === '/home-clean' || pathname === '/home-clean/') {
    const url = request.nextUrl.clone();
    url.pathname = '/zh/home-clean';
    return NextResponse.redirect(url, 308);
  }

  if (pathname === '/zh') {
    const url = request.nextUrl.clone();
    url.pathname = '/zh/interactive-tools';
    return NextResponse.redirect(url, 308);
  }

  if (pathname === '/en') {
    const url = request.nextUrl.clone();
    url.pathname = '/en/interactive-tools';
    return NextResponse.redirect(url, 308);
  }

  return intlMiddleware(request);
}

// 避免在静态资源与内部路径上运行中间件
export const config = {
  matcher: ['/((?!_next|api|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)']
};


