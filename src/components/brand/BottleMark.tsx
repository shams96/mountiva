import { cn } from '@/lib/cn';

/**
 * Line-art bottle used as hero/product imagery until real photography is
 * dropped into /public/images (see src/lib/media.ts). Mirrors the label:
 * slim silhouette, white label panel, red mountain range down the side,
 * the wordmark, and "PURITY YOU CAN TRUST" in tracked caps.
 */
export function BottleMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 440"
      fill="none"
      role="img"
      aria-label="Mountiva bottle"
      className={cn('text-ink', className)}
    >
      <path
        d="M62 12h36c1.6 0 3 1.3 3 3v22c0 6 2.2 8.6 6.4 12.6C118 66 126 78 126 104v300c0 13.8-11.2 25-25 25H59c-13.8 0-25-11.2-25-25V104c0-26 8-38 18.6-54.4C56.8 45.6 59 43 59 37V15c0-1.7 1.3-3 3-3Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      {/* cap + red band */}
      <rect x="60" y="2" width="40" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
      <rect x="60" y="14" width="40" height="4" fill="#D42E24" />

      {/* label panel */}
      <rect x="46" y="150" width="68" height="150" rx="3" fill="#ffffff" stroke="currentColor" strokeWidth="1.5" />

      {/* red mountain range down the label edge */}
      <path
        d="M50 300 L54 288 L58 296 L63 282 L68 298 L73 286 L78 300"
        stroke="#D42E24"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M52 172l12-14 8 9 9-12 13 16"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text
        x="80"
        y="212"
        textAnchor="middle"
        className="wordmark"
        fill="currentColor"
        style={{ fontSize: '15px', letterSpacing: '0.14em' }}
      >
        MOUNTIVA
      </text>
      <text
        x="80"
        y="234"
        textAnchor="middle"
        fill="currentColor"
        style={{ fontSize: '6px', letterSpacing: '0.24em', opacity: 0.7 }}
      >
        PURITY YOU CAN TRUST
      </text>
      <rect x="60" y="250" width="40" height="10" rx="2" fill="#D42E24" opacity="0.9" />
    </svg>
  );
}
