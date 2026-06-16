import React, { useRef } from 'react';

const ROW1 = ['á', 'é', 'í', 'ó', 'ú', 'ü'];
const ROW2 = ['ñ', '¿', '¡'];

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

  const btnStyle = {
    minWidth: 36,
    minHeight: 36,
    padding: '0 10px',
    background: 'hsl(var(--muted))',
    color: 'hsl(var(--foreground))',
    borderColor: 'hsl(var(--border))',
  };

  const renderRow = (chars) =>
    chars.map((ch) => (
      <button
        key={ch}
        type="button"
        onClick={() => insert(ch)}
        className="rounded-lg border font-bold text-sm transition-all active:scale-95"
        style={btnStyle}
      >
        {ch}
      </button>
    ));

  return (
    <div
      className="flex flex-col gap-1 mb-2"
      onPointerDown={(e) => {
        savePos();
        e.preventDefault();
      }}
    >
      <div className="flex justify-center gap-1">{renderRow(ROW1)}</div>
      <div className="flex justify-center gap-1">{renderRow(ROW2)}</div>
    </div>
  );
}
