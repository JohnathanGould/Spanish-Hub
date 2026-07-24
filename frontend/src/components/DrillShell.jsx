import React, { useState, useEffect, createContext } from 'react';
import { ArrowLeft } from 'lucide-react';

export const DrillKeyboardContext = createContext(false);

export default function DrillShell({ title, subtitle, current, total, onBack, children, footer, skipControl, headerOffset = 0, counterOverride, contentRef }) {
  const pct = total > 0 ? Math.min((current / total) * 100, 100) : 0;

  const [viewportHeight, setViewportHeight] = useState(
    typeof window !== 'undefined' && window.visualViewport
      ? window.visualViewport.height
      : window.innerHeight
  );

  const [fullHeight] = useState(
    typeof window !== 'undefined' ? window.innerHeight : 800
  );

  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    const updateHeight = () => setViewportHeight(vv.height);
    vv.addEventListener('resize', updateHeight);
    return () => vv.removeEventListener('resize', updateHeight);
  }, []);

  const keyboardOpen = fullHeight - viewportHeight > 150;

  return (
    <DrillKeyboardContext.Provider value={keyboardOpen}>
    <div className="flex flex-col" style={{ maxHeight: `${viewportHeight - 60 - headerOffset}px` }}>
      <div className="flex-shrink-0 px-4 py-2 border-b backdrop-blur-xl"
        style={{ background: 'hsl(var(--background) / 0.92)', borderColor: 'hsl(var(--border))' }}>
        <div className="flex items-center gap-2 mb-1.5">
          <button data-testid="drill-back-btn" onClick={onBack}
            className="p-1.5 rounded-lg transition-colors hover:bg-muted"
            style={{ color: 'hsl(var(--muted-foreground))' }}>
            <ArrowLeft size={16} />
          </button>
          <div className="flex-1 min-w-0">
            <div className="font-serif font-bold text-xs leading-tight truncate"
              style={{ color: 'hsl(var(--foreground))' }}>
              {title}
              {subtitle && (
                <span className="font-sans font-normal ml-1" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  · {subtitle}
                </span>
              )}
            </div>
          </div>
          <div className="text-xs font-bold tabular-nums" style={{ color: 'hsl(var(--muted-foreground))' }}>
            {counterOverride ?? `${current}/${total}`}
          </div>
        </div>
        <div className="drill-progress">
          <div className="drill-progress-fill"
            style={{ width: `${pct}%`, background: 'linear-gradient(90deg,#C60B1E,#F5C518)' }} />
        </div>
      </div>
      <div ref={contentRef} className="px-4 py-5 pb-4 overflow-y-auto flex-1" style={{ minHeight: 0 }}>
        {children}
      </div>
      <div className="flex-shrink-0 px-4 pb-10 pt-2 flex items-center gap-2">
        {skipControl}
        {footer && <div className="flex-1">{footer}</div>}
      </div>
    </div>
    </DrillKeyboardContext.Provider>
  );
}
