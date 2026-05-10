import React from 'react';
// Milo icon — drop-in replacement for the Spanish flag.
// Keeps the same props interface (size, className, style) so all existing
// imports and usages continue to work without any other changes.
export default function SpanishFlag({ size = 24, className = '', style = {} }) {
  return (
    <img
      src="/milo-icon.jpg"
      alt="Milo"
      width={size}
      height={size}
      className={className}
      style={{
        display: 'inline-block',
        flexShrink: 0,
        borderRadius: '50%',
        objectFit: 'cover',
        border: '2px solid #D97706',
        ...style,
      }}
    />
  );
}
