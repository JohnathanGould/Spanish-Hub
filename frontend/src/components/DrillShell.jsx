import React from 'react';
import { ArrowLeft } from 'lucide-react';

export default function DrillShell({ title, subtitle, current, total, onBack, children, footer }) {
  const pct = total > 0 ? Math.min((current / total) * 100, 100) : 0;
  return (
    <div className="flex flex-col min-h-screen">
      <div className="sticky top-0 z-30 px-4 py-3 border-b backdrop-blur-xl"
        style={{ background: 'hsl(var(--background) / 0.92)', borderColor: 'hsl(var(--border))' }}>
        <div className="flex items-center gap-2 mb-2">
          <button data-testid="drill-back-btn" onClick={onBack}
            className="p-1.5 rounded-lg transition-colors hover:bg-muted"
            style={{ color: 'hsl(var(--muted-foreground))' }}>
            <ArrowLeft size={16} />
          </button>
          <div className="flex-1 min-w-0">
            <div className="font-serif font-bold text-sm leading-tight truncate" style={{ color: 'hsl(var(--foreground))' }}>{title}</div>
            {subtitle && <div className="text-xs truncate" style={{ color: 'hsl(var(--muted-foreground))' }}>{subtitle}</div>}
          </div>
          <div className="text-xs font-bold tabular-nums" style={{ color: 'hsl(var(--muted-foreground))' }}>
            {current}/{total}
          </div>
        </div>
        <div className="drill-progress">
          <div className="drill-progress-fill" style={{ width: `${pct}%`, background: 'linear-gradient(90deg,#C60B1E,#F5C518)' }} />
        </div>
      </div>
      <div className="flex-1 px-4 py-5">{children}</div>
      {footer && <div className="px-4 pb-6">{footer}</div>}
    </div>
  );
}
