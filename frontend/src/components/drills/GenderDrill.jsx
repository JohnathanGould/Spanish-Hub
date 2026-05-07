import React, { useState, useMemo } from 'react';
import DrillShell from '../DrillShell';
import { spacedRepetitionSort } from '../../utils/helpers';

export default function GenderDrill({ words, progress, onAnswer, onDone, onBack }) {
  const total = 10;
  const nouns = useMemo(
    () => spacedRepetitionSort(words.filter(w => w.type === 'noun' && (w.gender === 'm' || w.gender === 'f')), progress).slice(0, total),
    [words, progress]
  );
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState(null);
  const [correct, setCorrect] = useState(0);

  if (nouns.length === 0) {
    return <DrillShell title="Gender Drill" current={0} total={0} onBack={onBack}>
      <div className="text-center py-10" style={{ color: 'hsl(var(--muted-foreground))' }}>No gendered nouns in active categories</div>
    </DrillShell>;
  }

  const word = nouns[idx];

  const handlePick = (g) => {
    if (picked) return;
    const ok = g === word.gender;
    setPicked(g);
    onAnswer(word.es, ok);
    if (ok) setCorrect(c => c + 1);
    setTimeout(() => {
      if (idx + 1 >= nouns.length) onDone(correct + (ok ? 1 : 0), nouns.length);
      else { setIdx(idx + 1); setPicked(null); }
    }, 800);
  };

  return (
    <DrillShell title="Gender Drill" subtitle="el (m) or la (f)?" current={idx + 1} total={nouns.length} onBack={onBack}>
      <div className="rounded-3xl p-8 mb-6 text-center"
        style={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
        <div className="text-xs uppercase tracking-wider mb-3" style={{ color: 'hsl(var(--muted-foreground))' }}>Noun</div>
        <div className="font-serif text-4xl font-black mb-2" data-testid="gender-prompt" style={{ color: 'hsl(var(--foreground))' }}>
          ____ {word.es}
        </div>
        <div className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>= {word.en}</div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[
          { g: 'm', label: 'el', sub: 'masculine', col: '#1E40AF', bg: '#DBEAFE' },
          { g: 'f', label: 'la', sub: 'feminine', col: '#9D174D', bg: '#FCE7F3' },
        ].map(({ g, label, sub, col, bg }) => {
          const isCorrect = picked && g === word.gender;
          const isWrong = picked === g && g !== word.gender;
          return (
            <button key={g} data-testid={`gender-${g}`} disabled={!!picked} onClick={() => handlePick(g)}
              className={`py-6 rounded-2xl border-2 transition-all hover:-translate-y-0.5 ${isCorrect ? 'correct' : ''} ${isWrong ? 'wrong' : ''}`}
              style={{
                background: picked ? undefined : bg,
                borderColor: picked ? undefined : col,
                color: picked ? undefined : col,
              }}>
              <div className="font-serif text-3xl font-black mb-1">{label}</div>
              <div className="text-xs uppercase tracking-wider opacity-80">{sub}</div>
            </button>
          );
        })}
      </div>
    </DrillShell>
  );
}
