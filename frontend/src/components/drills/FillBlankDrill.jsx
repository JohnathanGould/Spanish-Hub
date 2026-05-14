import React, { useState, useMemo } from 'react';
import DrillShell from '../DrillShell';
import { shuffle } from '../../utils/helpers';
import { FITB_POOL } from '../../data/drillData';

export default function FillBlankDrill({ onAnswer, onDone, onBack }) {
  const total = 10;
  const queue = useMemo(() => shuffle(FITB_POOL).slice(0, total), []);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState(null);
  const [correct, setCorrect] = useState(0);

  const item = queue[idx];
  const choices = useMemo(() => shuffle([...item.choices]), [item]);

  const handlePick = (c) => {
    if (picked) return;
    const ok = c === item.blank;
    setPicked(c);
    onAnswer(item.blank, ok);
    if (ok) setCorrect(x => x + 1);
  };

  const handleContinue = () => {
    if (idx + 1 >= queue.length) onDone(correct, queue.length);
    else { setIdx(idx + 1); setPicked(null); }
  };

  return (
    <DrillShell title="Fill in the Blank" subtitle="Pick the missing word"
      current={idx + 1} total={queue.length} onBack={onBack}>
      <div className="rounded-3xl p-7 mb-4 text-center"
        style={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
        <div className="font-serif text-xl sm:text-2xl font-bold leading-relaxed" data-testid="fitb-prompt" style={{ color: 'hsl(var(--foreground))' }}>
          {item.before}{' '}
          <span className="inline-block px-3 py-0.5 rounded-lg mx-1 align-middle"
            style={{
              background: picked ? (picked === item.blank ? '#DCFCE7' : '#FEE2E2') : 'hsl(var(--muted))',
              color: picked ? (picked === item.blank ? '#14532D' : '#991B1B') : 'hsl(var(--muted-foreground))',
              minWidth: 80,
              fontSize: '0.95em',
            }}>
            {picked || '____'}
          </span>{' '}
          {item.after}
        </div>
        {item.hint && (
          <div className="text-xs italic mt-3" style={{ color: 'hsl(var(--muted-foreground))' }}>
            {item.hint}
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {choices.map((c, i) => {
          const isCorrect = picked && c === item.blank;
          const isWrong = picked === c && c !== item.blank;
          return (
            <button key={c + i} data-testid={`fitb-choice-${i}`} disabled={!!picked} onClick={() => handlePick(c)}
              className={`choice-btn ${isCorrect ? 'correct' : ''} ${isWrong ? 'wrong' : ''}`}>
              {c}
            </button>
          );
        })}
      </div>

      {picked && (
        <div className="mt-4 text-center">
          <div className="mb-3 text-sm font-medium" style={{ color: picked === item.blank ? '#16A34A' : '#DC2626' }}>
            {picked === item.blank ? '¡Correcto! ✓' : `Correcto: ${item.blank}`}
          </div>
          <button
            onClick={handleContinue}
            data-testid="fitb-continue"
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
