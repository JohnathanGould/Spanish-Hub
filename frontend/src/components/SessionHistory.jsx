import React, { useState } from 'react';
import { Calendar, ChevronDown, ChevronUp } from 'lucide-react';

const DRILL_NAMES = {
  flashcard: 'Flashcards', 'es-en': 'Sp → En', 'en-es': 'En → Sp',
  'type-es-en': 'Type Sp→En', 'type-en-es': 'Type En→Sp',
  conjugation: 'Conjugation', 'past-tense': 'Preterite', gender: 'Gender',
  matching: 'Matching', 'word-sort': 'Word Sort', 'en-word-sort': 'En Word Sort',
  'hear-choose': 'Hear & Choose', 'listen-type': 'Listen & Type',
  'sent-build': 'Sentence Builder', 'fill-blank': 'Fill the Blank',
  'daily-weak': '🔥 Daily Weak', 'daily-theme': '✨ Daily Theme',
};

function relativeDate(ts) {
  const now = Date.now();
  const diff = Math.floor((now - ts) / 1000);
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return new Date(ts).toLocaleDateString();
}

export default function SessionHistory({ sessions = [] }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? sessions : sessions.slice(0, 8);

  if (sessions.length === 0) {
    return (
      <div className="rounded-2xl border p-5 text-center" data-testid="session-history-empty"
        style={{ background: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}>
        <Calendar size={20} className="mx-auto mb-2" style={{ color: 'hsl(var(--muted-foreground))' }} />
        <div className="text-sm font-medium" style={{ color: 'hsl(var(--muted-foreground))' }}>
          No drill sessions yet — finish your first drill to start logging.
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border overflow-hidden" data-testid="session-history"
      style={{ background: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}>
      <div className="px-4 py-3 border-b flex items-center gap-2"
        style={{ borderColor: 'hsl(var(--border))', background: 'hsl(var(--muted))' }}>
        <Calendar size={14} style={{ color: 'hsl(var(--muted-foreground))' }} />
        <span className="text-xs font-bold uppercase tracking-wider flex-1" style={{ color: 'hsl(var(--muted-foreground))' }}>
          Session History · {sessions.length} drill{sessions.length !== 1 ? 's' : ''}
        </span>
      </div>
      <div className="divide-y" style={{ borderColor: 'hsl(var(--border))' }}>
        {visible.map((s, i) => {
          const pct = s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0;
          const color = pct >= 80 ? '#16A34A' : pct >= 50 ? '#D97706' : '#DC2626';
          return (
            <div key={`${s.ts}-${i}`} className="px-4 py-2.5 flex items-center gap-3 text-sm"
              style={{ borderColor: 'hsl(var(--border))' }}>
              <div className="flex-1 min-w-0">
                <div className="font-semibold truncate" style={{ color: 'hsl(var(--foreground))' }}>
                  {DRILL_NAMES[s.drillId] || s.drillId}
                </div>
                <div className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  {relativeDate(s.ts)}
                </div>
              </div>
              <div className="text-right tabular-nums">
                <div className="font-bold" style={{ color }}>{s.correct}/{s.total}</div>
                <div className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>{pct}%</div>
              </div>
            </div>
          );
        })}
      </div>
      {sessions.length > 8 && (
        <button data-testid="session-history-toggle" onClick={() => setExpanded(!expanded)}
          className="w-full py-2.5 text-xs font-bold flex items-center justify-center gap-1 border-t transition-colors hover:bg-muted"
          style={{ borderColor: 'hsl(var(--border))', color: 'hsl(var(--muted-foreground))' }}>
          {expanded ? <>Show less <ChevronUp size={12} /></> : <>Show all {sessions.length} <ChevronDown size={12} /></>}
        </button>
      )}
    </div>
  );
}
