import React from 'react';
import { motion } from 'framer-motion';
import { Home, RotateCcw, Trophy } from 'lucide-react';

const DRILL_NAMES = {
  flashcard: 'Flashcards', 'es-en': 'Spanish → English', 'en-es': 'English → Spanish',
  'type-es-en': 'Type Sp→En', 'type-en-es': 'Type En→Sp',
  conjugation: 'Conjugation', 'past-tense': 'Preterite', gender: 'Gender',
  matching: 'Matching', 'word-sort': 'Word Sort', 'en-word-sort': 'En Word Sort',
  'hear-choose': 'Hear & Choose', 'listen-type': 'Listen & Type',
  'sent-build': 'Sentence Builder', 'fill-blank': 'Fill the Blank',
};

export default function DoneScreen({ drillId, correct, total, sessions, onRetry, onHome }) {
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
  const greatJob = pct >= 80;
  const recent = (sessions || []).slice(0, 5);

  return (
    <div className="flex flex-col min-h-screen items-center justify-start px-6 pt-10 pb-6">
      <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200 }} className="text-center mb-8">
        <div className="text-7xl mb-4" data-testid="done-emoji">{greatJob ? '🎉' : '💪'}</div>
        <h2 className="font-serif text-3xl font-bold mb-2" style={{ color: 'hsl(var(--foreground))' }}>
          {greatJob ? '¡Excelente!' : '¡Sigue así!'}
        </h2>
        <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
          {DRILL_NAMES[drillId] || 'Drill'} complete
        </p>
      </motion.div>

      <div className="w-full max-w-sm rounded-3xl border p-6 mb-6"
        style={{ background: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', boxShadow: '0 4px 16px rgba(0,0,0,0.05)' }}>
        <div className="flex items-baseline justify-between mb-4">
          <div>
            <div className="text-5xl font-black tabular-nums" data-testid="done-score" style={{ color: 'hsl(var(--primary))' }}>
              {correct}<span className="text-xl" style={{ color: 'hsl(var(--muted-foreground))' }}>/{total}</span>
            </div>
            <div className="text-xs uppercase tracking-wider mt-1" style={{ color: 'hsl(var(--muted-foreground))' }}>Correct</div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-black tabular-nums" style={{ color: greatJob ? '#16A34A' : '#D97706' }}>
              {pct}%
            </div>
            <div className="text-xs uppercase tracking-wider mt-1" style={{ color: 'hsl(var(--muted-foreground))' }}>Accuracy</div>
          </div>
        </div>
        <div className="h-2 rounded-full mb-1" style={{ background: 'hsl(var(--muted))' }}>
          <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8, delay: 0.2 }}
            className="h-full rounded-full"
            style={{ background: greatJob ? 'linear-gradient(90deg,#16A34A,#22C55E)' : 'linear-gradient(90deg,#F5C518,#D97706)' }} />
        </div>
      </div>

      {recent.length > 0 && (
        <div className="w-full max-w-sm rounded-3xl border p-4 mb-6"
          style={{ background: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}>
          <div className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5"
            style={{ color: 'hsl(var(--muted-foreground))' }}>
            <Trophy size={12} /> Recent sessions
          </div>
          {recent.map((s, i) => {
            const sPct = s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0;
            return (
              <div key={i} className="flex items-center justify-between py-1.5 text-sm border-b last:border-b-0"
                style={{ borderColor: 'hsl(var(--border))' }}>
                <span style={{ color: 'hsl(var(--muted-foreground))' }}>{DRILL_NAMES[s.drillId] || s.drillId}</span>
                <span className="font-bold tabular-nums" style={{ color: sPct >= 80 ? '#16A34A' : 'hsl(var(--foreground))' }}>
                  {s.correct}/{s.total} · {sPct}%
                </span>
              </div>
            );
          })}
        </div>
      )}

      <div className="flex gap-3 w-full max-w-sm">
        <button data-testid="done-retry-btn" onClick={onRetry}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-semibold transition-all hover:-translate-y-0.5"
          style={{ background: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' }}>
          <RotateCcw size={14} /> Retry
        </button>
        <button data-testid="done-home-btn" onClick={onHome}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white transition-all hover:-translate-y-0.5"
          style={{ background: 'hsl(var(--primary))', boxShadow: '0 4px 14px rgba(198,11,30,0.35)' }}>
          <Home size={14} /> Home
        </button>
      </div>
    </div>
  );
}
