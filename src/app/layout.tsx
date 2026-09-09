import type { ReactNode } from 'react';
import './globals.css';

/**
 * Root layout is intentionally thin. The real <html>/<body> shell with the
 * correct `lang` and `dir` lives in `[locale]/layout.tsx`.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
