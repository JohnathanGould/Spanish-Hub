import React, { useState, useMemo } from 'react';
import DrillShell from '../DrillShell';
import { shuffle } from '../../utils/helpers';
import { CONJ, PRETERITE } from '../../data/drillData';

// mode: 'present' | 'past'
export default function ConjugationDrill({ mode, onAnswer, onDone, onBack }) {
  const total = 10;
  const pool = mode === 'past' ? PRETERITE : CONJ;
  const queue = useMemo(() => shuffle(pool).slice(0, total), [pool]);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState(null);
  const [correct, setCorrect] = useState(0);

  const item = queue[idx];
  const choices = useMemo(() => {
    const distractors = shuffle(item.pool.filter(p => p !== item.ans)).slice(0, 5);
    return shuffle([item.ans, ...distractors]);
  }, [item]);

  const handlePick = (ans) => {
    if (picked) return;
    const ok = ans === item.ans;
    setPicked(ans);
    onAnswer(item.ans, ok);
    if (ok) setCorrect(c => c + 1);
  };

  const handleContinue = () => {
    if (idx + 1 >= queue.length) onDone(correct, queue.length);
    else { setIdx(idx + 1); setPicked(null); }
  };

  const titles = {
    present: { title: 'Conjugation — Present', sub: 'Pick the right verb form' },
    past: { title: 'Preterite — Past', sub: 'Pick the right past tense form' },
  };

  return (
    <DrillShell title={titles[mode].title} subtitle={titles[mode].sub} current={idx + 1} total={queue.length} onBack={onBack}>
      <div className="rounded-3xl p-7 mb-5 text-center"
        style={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
        <div className="text-xs uppercase tracking-wider mb-3" style={{ color: 'hsl(var(--muted-foreground))' }}>
          Conjugate
        </div>
        <div className="font-serif text-2xl sm:text-3xl font-black mb-2" data-testid="conj-prompt" style={{ color: 'hsl(var(--foreground))' }}>
          {item.q}
        </div>
        <div className="text-xs italic mt-2" style={{ color: 'hsl(var(--muted-foreground))' }}>
          {item.hint}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {choices.map((c, i) => {
          const isCorrect = picked && c === item.ans;
          const isWrong = picked === c && c !== item.ans;
          return (
            <button key={c + i} data-testid={`conj-choice-${i}`} disabled={!!picked} onClick={() => handlePick(c)}
              className={`choice-btn ${isCorrect ? 'correct' : ''} ${isWrong ? 'wrong' : ''}`}>
              {c}
            </button>
          );
        })}
      </div>

      {picked && (
        <div className="mt-4 text-center">
          <div className="mb-3 text-sm font-medium" style={{ color: picked === item.ans ? '#16A34A' : '#DC2626' }}>
            {picked === item.ans ? '¡Correcto! ✓' : `Correcto: ${item.ans}`}
          </div>
          <button
            onClick={handleContinue}
            data-testid="conj-continue"
            className="w-full py-3 rounded-xl font-bold text-white text-sm"
            style={{ background: 'hsl(var(--primary))' }}
          >
            {idx + 1 >= queue.length ? 'Finish ✓' : 'Continue →'}
          </button>
        </div>
      )}
    </DrillShell>
  );
}
