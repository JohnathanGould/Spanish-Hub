import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Volume2, ArrowRight } from 'lucide-react';
import DrillShell from '../DrillShell';
import { spacedRepetitionSort, levenshtein, speak } from '../../utils/helpers';

// mode: 'type-es-en' | 'type-en-es' | 'listen-type'
export default function TypeDrill({ mode, words, progress, onAnswer, onDone, onBack, drillLength = 10}) {
  const total = drillLength;
  const queueRef = useRef(null);
  if (!queueRef.current) {
    queueRef.current = spacedRepetitionSort(words, progress).slice(0, total);
  }
  const queue = queueRef.current;
  const [idx, setIdx] = useState(0);
  const [val, setVal] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [correct, setCorrect] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => { inputRef.current?.focus(); }, [idx]);
  const currentWord = queue[idx];
useEffect(() => {
  if (mode === 'listen-type' && currentWord) {
    setTimeout(() => speak(currentWord.es, 'es'), 200);
  }
}, [idx, mode, currentWord]);

  if (queue.length === 0) {
    return <DrillShell title="Drill" current={0} total={0} onBack={onBack}>
      <div className="text-center py-10" style={{ color: 'hsl(var(--muted-foreground))' }}>No words available</div>
    </DrillShell>;
  }

  const word = queue[idx];
  const isPromptEs = mode === 'type-es-en';
  const target = (mode === 'type-es-en') ? word.en : word.es;
  const promptText = mode === 'listen-type' ? '' : (isPromptEs ? word.es : word.en);

  const titles = {
    'type-es-en': { title: 'Type — Sp → En', sub: 'See Spanish — type English' },
    'type-en-es': { title: 'Type — En → Sp', sub: 'See English — type Spanish' },
    'listen-type': { title: 'Listen & Type', sub: 'Hear Spanish — spell it back' },
  };

  const submit = () => {
    if (feedback || !val.trim()) return;
    const ans = val.trim().toLowerCase();
    const tgt = target.toLowerCase();
    const dist = levenshtein(ans, tgt);
    const ok = dist <= Math.max(1, Math.floor(tgt.length / 6));
    setFeedback({ ok, target });
    onAnswer(word.es, ok);
    if (ok) setCorrect(c => c + 1);
  };

  const next = () => {
    if (idx + 1 >= queue.length) onDone(correct, queue.length);
    else { setIdx(idx + 1); setVal(''); setFeedback(null); }
  };

  return (
    <DrillShell title={titles[mode].title} subtitle={titles[mode].sub} current={idx + 1} total={queue.length} onBack={onBack}>
      <div className="rounded-3xl p-7 mb-5 text-center"
        style={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
        {mode === 'listen-type' ? (
          <button data-testid="listen-type-replay" onClick={() => speak(word.es, 'es')}
            className="mx-auto rounded-full w-20 h-20 flex items-center justify-center text-white"
            style={{ background: 'hsl(var(--primary))', boxShadow: '0 6px 20px rgba(198,11,30,0.35)' }}>
            <Volume2 size={28} />
          </button>
        ) : (
          <>
            <div className="text-xs uppercase tracking-wider mb-3" style={{ color: 'hsl(var(--muted-foreground))' }}>
              {isPromptEs ? 'Spanish' : 'English'}
            </div>
            <div className="font-serif text-3xl font-black" data-testid="type-prompt" style={{ color: 'hsl(var(--foreground))' }}>
              {promptText}
            </div>
            {isPromptEs && (
              <button data-testid="type-speak" onClick={() => speak(promptText, 'es')} className="speak-btn mt-4">
                <Volume2 size={12} /> Hear it
              </button>
            )}
          </>
        )}
      </div>

      <input ref={inputRef} data-testid="type-input"
        value={val} onChange={e => setVal(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter') feedback ? next() : submit(); }}
        placeholder={isPromptEs ? 'Type English…' : 'Type Spanish…'}
        disabled={!!feedback} autoCapitalize="none" autoCorrect="off" spellCheck={false}
        className="w-full p-4 rounded-xl border-2 text-center text-xl font-bold mb-4 transition-colors"
        style={{
          background: 'hsl(var(--card))', color: 'hsl(var(--foreground))',
          borderColor: feedback ? (feedback.ok ? '#86EFAC' : '#FCA5A5') : 'hsl(var(--border))',
        }} />

      {feedback ? (
        <div className="space-y-3">
          <div className="text-center py-3 rounded-xl"
            style={{ background: feedback.ok ? '#DCFCE7' : '#FEE2E2', color: feedback.ok ? '#14532D' : '#991B1B' }}>
            <div className="font-bold text-sm" data-testid="type-feedback">
              {feedback.ok ? '¡Correcto!' : `Answer: ${feedback.target}`}
            </div>
          </div>
          <button data-testid="type-next" onClick={next}
            className="w-full py-3 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-all"
            style={{ background: 'hsl(var(--primary))', boxShadow: '0 4px 14px rgba(198,11,30,0.3)' }}>
            Continue → <ArrowRight size={16} />
          </button>
        </div>
      ) : (
        <button data-testid="type-submit" onClick={submit} disabled={!val.trim()}
          className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all disabled:opacity-50"
          style={{ background: 'hsl(var(--primary))', boxShadow: '0 4px 14px rgba(198,11,30,0.3)' }}>
          Check
        </button>
      )}
    </DrillShell>
  );
}
