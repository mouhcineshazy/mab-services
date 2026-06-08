import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

// 'unsafe-inline' is required by Next.js App Router (RSC payload + hydration inline scripts).
// 'unsafe-eval' is intentionally omitted — not needed in production builds.
// Cal.com embed requires: script-src for embed.js, frame-src for the popup iframe,
// connect-src for its internal API calls, img-src for user avatars.
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://app.cal.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://cal.com https://app.cal.com",
  "font-src 'self' data:",
  "connect-src 'self' https://cal.com https://app.cal.com https://api.cal.com",
  "frame-src https://cal.com https://app.cal.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join('; ');

const SECURITY_HEADERS = [
  { key: 'Content-Security-Policy',   value: CSP },
  { key: 'X-Frame-Options',           value: 'DENY' },
  { key: 'X-Content-Type-Options',    value: 'nosniff' },
  { key: 'Referrer-Policy',           value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy',        value: 'camera=(), microphone=(), geolocation=()' },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [{ source: '/(.*)', headers: SECURITY_HEADERS }];
  },
};

export default withNextIntl(nextConfig);
