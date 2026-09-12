import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

// Set only by scripts/build-static.mjs, for the Hostinger static-export
// build. The normal `npm run build` (Vercel/Node) never sets this.
const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === '1';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
    // Static export has no server to run the image optimizer; the images
    // ship at their saved size instead. Equivalent security headers for
    // that build live in public/.htaccess (Apache) since `headers()` below
    // has no server to enforce it either.
    ...(isStaticExport ? { unoptimized: true } : {})
  },
  ...(isStaticExport
    ? {
        output: 'export',
        // Emit dir/index.html per route instead of dir.html + dir/ siblings,
        // so Apache's default DirectoryIndex serves clean URLs with no
        // rewrite rules and no filename/directory collisions.
        trailingSlash: true
      }
    : {
        async headers() {
          const securityHeaders = [
            { key: 'X-Content-Type-Options', value: 'nosniff' },
            { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
            { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
            { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' }
          ];
          return [{ source: '/:path*', headers: securityHeaders }];
        }
      })
};

export default withNextIntl(nextConfig);
