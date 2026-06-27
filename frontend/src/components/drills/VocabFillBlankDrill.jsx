import { languageConfig } from '../../config/languageConfig';
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import DrillShell from '../DrillShell';
import SpecialCharBar from '../SpecialCharBar';
import { buildNoRepeatQueue, shuffle, speak, gradeTypedAnswer, sanitiseForTTS } from '../../utils/helpers';

const BLANK = '_____';

function buildBlank(sentence, targetEs) {
  if (typeof sentence !== 'string' || !sentence.trim()) return null;
  const target = (targetEs || '').trim();
  if (!target) return { kind: 'plain', sentence };
  const i = sentence.toLowerCase().indexOf(target.toLowerCase());
  if (i === -1) return { kind: 'plain', sentence };
  return {
    kind: 'blank',
    before: sentence.slice(0, i),
    after: sentence.slice(i + target.length),
  };
}

export default function VocabFillBlankDrill({
  mode = 'typed', words, progress, onAnswer, onDone, onBack,
  drillLength = 10, headerOffset = 0, counterOverride, strictMode = false,
}) {
  const isTyped = mode === 'typed';

  const pool = useMemo(
    () => (Array.isArray(words)
      ? words.filter(w => w && w.es && typeof w.contextSentence === 'string' && w.contextSentence.trim())
      : []),
    [words],
  );

  const queueRef = useRef(null);
  if (!queueRef.current) {
    queueRef.current = buildNoRepeatQueue(pool, progress, drillLength);
  }
  const queue = queueRef.current;

  const [idx, setIdx] = useState(0);
  const [val, setVal] = useState('');
  const [picked, setPicked] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [correct, setCorrect] = useState(0);
  const inputRef = useRef(null);

  const word = queue[idx];

  useEffect(() => { if (isTyped) inputRef.current?.focus(); }, [idx, isTyped]);

  const choices = useMemo(() => {
    if (isTyped || !word) return [];
    const others = pool.filter(w => w.es !== word.es);
    const distractors = shuffle(others).slice(0, 3).map(w => w.es);
    return shuffle([word.es, ...distractors]);
  }, [word && word.es, isTyped]);

  if (!queue.length) {
    return (
      <DrillShell title="Vocab Fill in the Blank" current={0} total={0} onBack={onBack} headerOffset={headerOffset}>
        <div className="text-center py-10" style={{ color: 'hsl(var(--muted-foreground))' }}>
          No words available
        </div>
      </DrillShell>
    );
  }

  const parts = buildBlank(word.contextSentence, word.es);
  const answered = isTyped ? !!feedback : !!picked;
  const wasCorrect = isTyped ? (feedback && feedback.ok) : (picked === word.es);

  const submit = () => {
    if (feedback || !val.trim()) return;
    const { ok, closeEnough, displayTarget } = gradeTypedAnswer(val, word.es, strictMode);
    setFeedback({ ok, closeEnough, target: displayTarget });
    onAnswer(word.es, ok);
    if (ok) setCorrect(c => c + 1);
  };

  const handlePick = (ans) => {
    if (picked) return;
    const ok = ans === word.es;
    setPicked(ans);
    onAnswer(word.es, ok);
    if (ok) setCorrect(c => c + 1);
  };

  const next = () => {
    if (idx + 1 >= queue.length) { onDone(correct, queue.length); return; }
    setIdx(idx + 1); setVal(''); setPicked(null); setFeedback(null);
  };

  const blankBg = !answered ? 'hsl(var(--muted))' : (wasCorrect ? '#DCFCE7' : '#FEE2E2');
  const blankColor = !answered ? 'hsl(var(--muted-foreground))' : (wasCorrect ? '#14532D' : '#991B1B');

  return (
    <DrillShell
      title="Vocab Fill in the Blank"
      subtitle={isTyped ? 'Read the sentence — type the missing word' : 'Read the sentence — pick the missing word'}
      current={idx + 1} total={queue.length} onBack={onBack}
      headerOffset={headerOffset} counterOverride={counterOverride}
      footer={answered && (
        <button onClick={next} data-testid="vfb-continue"
          className="w-full py-3 rounded-xl font-bold text-white text-sm flex items-center justify-center gap-2"
          style={{ background: 'hsl(var(--primary))' }}>
          {idx + 1 >= queue.length ? 'Finish ✓' : 'Continue →'} <ArrowRight size={16} />
        </button>
      )}>

      <div className="rounded-2xl p-4 mb-2 text-center"
        style={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}>
        <div className="font-serif text-xl font-black leading-relaxed flex items-center justify-center gap-1 flex-wrap"
          style={{ color: 'hsl(var(--foreground))' }} data-testid="vfb-sentence">
          {parts.kind === 'blank' ? (
            <>
              <span>{parts.before}</span>
              <span className="px-2 rounded-md" style={{ background: blankBg, color: blankColor }}>
                {answered ? word.es : BLANK}
              </span>
              <span>{parts.after}</span>
            </>
          ) : (
            <span>{parts.sentence}</span>
          )}
        </div>
        {parts.kind === 'plain' && (
          <div className="mt-2 inline-block text-sm font-bold px-2 py-0.5 rounded-full"
            style={{ background: blankBg, color: blankColor }}>
            {answered ? word.es : '???'}
          </div>
        )}
        <div className="text-xs mt-2" style={{ color: 'hsl(var(--muted-foreground))' }} data-testid="vfb-hint">
          {word.en}
        </div>
      </div>

      {isTyped ? (
        <>
          {!feedback && <SpecialCharBar inputRef={inputRef} value={val} onChange={setVal} />}
          <input ref={inputRef} data-testid="vfb-input"
            value={val} onChange={e => setVal(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') feedback ? next() : submit(); }}
            placeholder="Type Spanish…"
            disabled={!!feedback} autoCapitalize="none" autoCorrect="off" spellCheck={false}
            className="w-full p-3 rounded-xl border-2 text-center text-lg font-bold mb-3 transition-colors"
            style={{ background: 'hsl(var(--card))', color: 'hsl(var(--foreground))',
              borderColor: feedback ? (feedback.ok ? '#86EFAC' : '#FCA5A5') : 'hsl(var(--border))' }} />
          {feedback ? (
            <div className="text-center py-2.5 rounded-xl mb-1"
              style={{ background: feedback.ok ? '#DCFCE7' : '#FEE2E2', color: feedback.ok ? '#14532D' : '#991B1B' }}>
              <div className="font-bold text-sm" data-testid="vfb-feedback">
                {feedback.ok ? (feedback.closeEnough ? 'Almost! ✓' : 'Correct! ✓') : 'Answer:'}
              </div>
              <div className="text-base font-black mt-1 flex items-center justify-center gap-2">
                {feedback.target}
                <button onClick={() => speak(sanitiseForTTS(word.es), languageConfig.sourceLanguage)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}>🔊</button>
              </div>
            </div>
          ) : (
            <button data-testid="vfb-check" onClick={submit} disabled={!val.trim()}
              className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all disabled:opacity-50"
              style={{ background: 'hsl(var(--primary))' }}>
              Check
            </button>
          )}
        </>
      ) : (
        <div className="grid grid-cols-2 gap-2.5">
          {choices.map((c, i) => {
            const isCorrect = picked && c === word.es;
            const isWrong = picked === c && c !== word.es;
            return (
              <button key={c + i} data-testid={`vfb-choice-${i}`} disabled={!!picked} onClick={() => handlePick(c)}
                className={`choice-btn ${isCorrect ? 'correct' : ''} ${isWrong ? 'wrong' : ''}`}>
                {c}
              </button>
            );
          })}
        </div>
      )}
    </DrillShell>
  );
}
