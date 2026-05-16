import React, { useState, useMemo, useRef } from 'react';
import { Volume2 } from 'lucide-react';
import DrillShell from '../DrillShell';
import { spacedRepetitionSort, shuffle, speak } from '../../utils/helpers';

// mode: 'es-en' | 'en-es' | 'hear-choose'
export default function ChoiceDrill({ mode, words, progress, onAnswer, onDone, onBack, drillLength = 10 }) {
  const total = drillLength;
  const queueRef = useRef(null);
  if (!queueRef.current) {
    queueRef.current = spacedRepetitionSort(words, progress).slice(0, total);
  }
  const queue = queueRef.current;
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState(null);
  const [correct, setCorrect] = useState(0);

  const word = queue[idx] || { es: '', en: '' };
  const isAsk = mode === 'es-en' || mode === 'hear-choose';
  const correctText = isAsk ? word.en : word.es;
  const promptText = isAsk ? word.es : word.en;

  const choices = useMemo(() => {
    if (!word.es) return [];
    const others = words.filter(w => w.es !== word.es);
    const distractors = shuffle(others).slice(0, 3).map(w => isAsk ? w.en : w.es);
    return shuffle([correctText, ...distractors]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [word.es, isAsk]);

  if (queue.length === 0) {
    return <DrillShell title="Drill" current={0} total={0} onBack={onBack}>
      <div className="text-center py-10" style={{ color: 'hsl(var(--muted-foreground))' }}>No words available</div>
    </DrillShell>;
  }

  const titles = {
    'es-en': { title: 'Spanish → English', sub: 'Pick the English meaning' },
    'en-es': { title: 'English → Spanish', sub: 'Pick the Spanish translation' },
    'hear-choose': { title: 'Hear & Choose', sub: 'Listen — pick the meaning' },
  };

  const handlePick = (ans) => {
    if (picked) return;
    const ok = ans === correctText;
    setPicked(ans);
    onAnswer(word.es, ok);
    if (ok) setCorrect(c => c + 1);
  };

  const handleContinue = () => {
    if (idx + 1 >= queue.length) onDone(correct, queue.length);
    else { setIdx(idx + 1); setPicked(null); }
  };

  return (
    <DrillShell title={titles[mode].title} subtitle={titles[mode].sub} current={idx + 1} total={queue.length} onBack={onBack}>
      <div className="rounded-3xl p-8 mb-5 text-center"
        style={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
        {mode === 'hear-choose' ? (
          <button data-testid="choice-listen-btn" onClick={() => speak(promptText, 'es')}
            className="mx-auto rounded-full w-20 h-20 flex items-center justify-center text-white"
            style={{ background: 'hsl(var(--primary))', boxShadow: '0 6px 20px rgba(198,11,30,0.35)' }}>
            <Volume2 size={28} />
          </button>
        ) : (
          <>
            <div className="text-xs uppercase tracking-wider mb-3" style={{ color: 'hsl(var(--muted-foreground))' }}>
              {isAsk ? 'Spanish' : 'English'}
            </div>
            <div className="font-serif text-4xl font-black" data-testid="choice-prompt" style={{ color: 'hsl(var(--foreground))' }}>
              {promptText}
            </div>
            {isAsk && (
              <button data-testid="choice-speak" onClick={() => speak(promptText, 'es')} className="speak-btn mt-4">
                <Volume2 size={12} /> Hear it
              </button>
            )}
          </>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {choices.map((c, i) => {
          const isCorrect = picked && c === correctText;
          const isWrong = picked === c && c !== correctText;
          return (
            <button key={c + i} data-testid={`choice-btn-${i}`} disabled={!!picked} onClick={() => handlePick(c)}
              className={`choice-btn ${isCorrect ? 'correct' : ''} ${isWrong ? 'wrong' : ''}`}>
              {c}
            </button>
          );
        })}
      </div>

      {picked && (
        <div className="mt-4 text-center">
          <div className="mb-3 text-sm font-medium" style={{ color: picked === correctText ? '#16A34A' : '#DC2626' }}>
            {picked === correctText ? 'Correct! ✓' : `Answer: ${correctText}`}
          </div>
          <button onClick={handleContinue} data-testid="choice-continue"
            className="w-full py-3 rounded-xl font-bold text-white text-sm"
            style={{ background: 'hsl(var(--primary))' }}>
            {idx + 1 >= queue.length ? 'Finish ✓' : 'Continue →'}
          </button>
        </div>
      )}
    </DrillShell>
  );
}
