/**
 * Form submission targets. On the normal (Vercel/Node) build these are the
 * built-in Next.js API routes. On the static-export build for Hostinger
 * (see scripts/build-static.mjs) there is no Node server, so the same forms
 * post to plain PHP scripts uploaded alongside the static files instead —
 * set at build time via NEXT_PUBLIC_FORM_BACKEND=php.
 */
const isPhp = process.env.NEXT_PUBLIC_STATIC_EXPORT === '1';

export const endpoints = {
  wholesale: isPhp ? '/php/wholesale.php' : '/api/wholesale',
  contact: isPhp ? '/php/contact.php' : '/api/contact'
} as const;
