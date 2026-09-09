import Link from 'next/link';

/**
 * Global fallback for unmatched paths outside the [locale] segment.
 * Self-contained shell because the root layout is a pass-through.
 */
export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'ui-sans-serif, system-ui, sans-serif',
          background: '#FBFBF9',
          color: '#161615',
          textAlign: 'center',
          padding: '2rem'
        }}
      >
        <p style={{ letterSpacing: '0.22em', textTransform: 'uppercase', fontSize: 12, color: '#9B9B93' }}>
          Mountiva
        </p>
        <h1 style={{ fontSize: '1.75rem', margin: '1rem 0 0.5rem' }}>This page has run dry</h1>
        <p style={{ color: '#5B5B54', maxWidth: 420 }}>
          The link may be old or mistyped. Everything still flows from the home page.
        </p>
        <Link
          href="/"
          style={{
            marginTop: '1.5rem',
            background: '#161615',
            color: '#FBFBF9',
            padding: '0.75rem 1.5rem',
            borderRadius: 4,
            textDecoration: 'none',
            fontSize: 14
          }}
        >
          Return home
        </Link>
      </body>
    </html>
  );
}
