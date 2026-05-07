import React from 'react';

// Inline Spanish flag — renders identically on every OS / browser, unlike the 🇪🇸 emoji
// which falls back to "ES" text on Windows. Use this everywhere we'd reach for the flag.
export default function SpanishFlag({ size = 24, className = '', style = {} }) {
  const w = size;
  const h = Math.round(size * (40 / 60));
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 60 40"
      width={w}
      height={h}
      className={className}
      style={{ display: 'inline-block', flexShrink: 0, ...style }}
      aria-label="Spanish flag"
      role="img"
    >
      <defs>
        <clipPath id={`flag-clip-${size}`}>
          <rect width="60" height="40" rx="4" ry="4" />
        </clipPath>
      </defs>
      <g clipPath={`url(#flag-clip-${size})`}>
        <rect width="60" height="40" fill="#C60B1E" />
        <rect y="10" width="60" height="20" fill="#F5C518" />
        {/* Tiny crest glyph */}
        <circle cx="22" cy="20" r="2.5" fill="#C60B1E" />
        <rect x="20.5" y="19" width="3" height="2" fill="#7C2D12" opacity="0.5" />
      </g>
      <rect x="0.5" y="0.5" width="59" height="39" rx="3.5" ry="3.5"
        fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="1" />
    </svg>
  );
}
