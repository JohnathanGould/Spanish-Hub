import React, { useRef } from 'react';

const CHARS = ['á', 'é', 'í', 'ó', 'ú', 'ñ', 'ü', '¿', '¡'];

export default function SpecialCharBar({ inputRef, value, onChange }) {
  const insertPos = useRef(null);

  const insert = (char) => {
    const el = inputRef?.current;
    const pos = insertPos.current ?? (el ? el.selectionStart ?? value.length : value.length);
    const end = el ? (el.selectionEnd ?? pos) : pos;
    const next = value.slice(0, pos) + char + value.slice(end);
    const cursor = pos + char.length;

    onChange(next);

    // Move cursor after React re-renders the controlled input
    requestAnimationFrame(() => {
      if (el) {
        el.focus();
        el.setSelectionRange(cursor, cursor);
        insertPos.current = cursor;
      }
    });
  };

  const savePos = () => {
    const el = inputRef?.current;
    if (el) insertPos.current = el.selectionStart;
  };

  return (
    <div
      className="flex flex-wrap gap-1 mb-2"
      onPointerDown={(e) => {
        // Save cursor position before the button press steals focus
        savePos();
        e.preventDefault();
      }}
    >
      {CHARS.map((ch) => (
        <button
          key={ch}
          type="button"
          onClick={() => insert(ch)}
          className="rounded-lg border font-bold text-sm transition-all active:scale-95"
          style={{
            minWidth: 36,
            minHeight: 36,
            padding: '0 10px',
            background: 'hsl(var(--muted))',
            color: 'hsl(var(--foreground))',
            borderColor: 'hsl(var(--border))',
          }}
        >
          {ch}
        </button>
      ))}
    </div>
  );
}
