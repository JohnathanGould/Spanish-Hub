import { languageConfig } from '../../config/languageConfig';
import React, { useState, useRef, useEffect } from 'react';
import { Volume2, ArrowRight } from 'lucide-react';
import DrillShell from '../DrillShell';
import SpecialCharBar from '../SpecialCharBar';
import { buildNoRepeatQueue, speak, stripAccents, gradeTypedAnswer, sanitiseForTTS } from '../../utils/helpers';

// mode: 'type-es-en' | 'type-en-es' | 'listen-type'
export default function TypeDrill({ mode, words, progress, onAnswer, onDone, onBack, drillLength = 10, headerOffset = 0, counterOverride, strictMode = false }) {
  const total = drillLength;
  const queueRef = useRef(null);
  if (!queueRef.current) {
    queueRef.current = buildNoRepeatQueue(words, progress, total);
  }
  const queue = queueRef.current;
  const [idx, setIdx] = useState(0);
  const [val, setVal] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [correct, setCorrect] = useState(0);
  const inputRef = useRef(null);
  const hasSpokenRef = useRef(false);

  useEffect(() => { inputRef.current?.focus(); }, [idx]);

  useEffect(() => {
    if (!feedback) return;
    const t = setTimeout(() => speak(sanitiseForTTS(word.es), languageConfig.sourceLanguage), 50);
    return () => clearTimeout(t);
  }, [feedback]); // eslint-disable-line react-hooks/exhaustive-deps

  const currentWord = queue[idx];

  // Only speak when idx changes and word hasn't been spoken yet
  // Prevents audio replaying after a correct answer on Listen & Type
  useEffect(() => {
    const isListenMode = mode === 'listen-type' || mode === 'listen-type-sentence' || mode === 'listen-type-en-es' || mode === 'listen-type-sentence-en-es';
    if (isListenMode && currentWord && !hasSpokenRef.current) {
      hasSpokenRef.current = true;
      const isEnMode = mode === 'listen-type-en-es' || mode === 'listen-type-sentence-en-es';
      if (isEnMode) setTimeout(() => speak(sanitiseForTTS(currentWord.en), languageConfig.targetLanguage), 200);
      else setTimeout(() => speak(sanitiseForTTS(currentWord.es), languageConfig.sourceLanguage), 200);
    }
  }, [idx, mode, currentWord]);

  if (queue.length === 0) {
    return (
      <DrillShell title="Drill" current={0} total={0} onBack={onBack} headerOffset={headerOffset}>
        <div className="text-center py-10" style={{ color: 'hsl(var(--muted-foreground))' }}>
          No words available
        </div>
      </DrillShell>
    );
  }

  const word = queue[idx];
  const isRelaxed = !strictMode;
  const isPromptEs = mode === 'type-es-en';
  const target = (mode === 'type-es-en') ? word.en : word.es;
  const isListenMode = mode === 'listen-type' || mode === 'listen-type-sentence' || mode === 'listen-type-en-es' || mode === 'listen-type-sentence-en-es';
  let promptText = '';
  if (!isListenMode) promptText = isPromptEs ? word.es : word.en;
  let inputBorderColor = 'hsl(var(--border))';
  if (feedback) inputBorderColor = feedback.ok ? '#86EFAC' : '#FCA5A5';
  const feedbackBg    = feedback?.ok ? '#DCFCE7' : '#FEE2E2';
  const feedbackColor = feedback?.ok ? '#14532D' : '#991B1B';
  let feedbackType = 'wrong';
  if (feedback?.ok) feedbackType = feedback.closeEnough ? 'almost' : 'correct';

  const titles = {
    'type-es-en': { title: `Type — ${languageConfig.drillDirectionLabel}`, sub: `See ${languageConfig.sourceLanguageName} — type ${languageConfig.targetLanguageName}` },
    'type-en-es': { title: `Type — ${languageConfig.reverseDrillDirectionLabel}`, sub: `See ${languageConfig.targetLanguageName} — type ${languageConfig.sourceLanguageName}` },
    'listen-type': { title: 'Listen & Type', sub: `Hear ${languageConfig.sourceLanguageName} — spell it back` },
    'listen-type-sentence': { title: 'Listen & Type', sub: `Hear ${languageConfig.sourceLanguageName} — type it back` },
    'listen-type-en-es': { title: 'Listen & Type', sub: `Hear ${languageConfig.targetLanguageName} — type ${languageConfig.sourceLanguageName}` },
    'listen-type-sentence-en-es': { title: 'Listen & Type', sub: `Hear ${languageConfig.targetLanguageName} — type ${languageConfig.sourceLanguageName}` },
  };
  if (!titles[mode]) return null;

  const submit = () => {
    if (feedback || !val.trim()) return;

    const { ok, closeEnough, displayTarget, matchedTarget } = gradeTypedAnswer(val, target, strictMode);

    setFeedback({ ok, closeEnough, target: displayTarget, matchedTarget, ans: stripAccents(val.trim().toLowerCase()) });
    onAnswer(word.es, ok);
    if (ok) setCorrect(c => c + 1);
  };

  const next = () => {
    hasSpokenRef.current = false;
    if (idx + 1 >= queue.length) {
      onDone(correct, queue.length);
    } else {
      setIdx(idx + 1);
      setVal('');
      setFeedback(null);
    }
  };

  return (
    <DrillShell
      title={titles[mode].title}
      subtitle={titles[mode].sub}
      current={idx + 1}
      total={queue.length}
      onBack={onBack}
      headerOffset={headerOffset}
      counterOverride={counterOverride}>

      {/* Word card — compact padding for mobile */}
      <div className="rounded-2xl p-4 mb-2 text-center"
        style={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        {isListenMode ? (
          <button data-testid="listen-type-replay"
            onClick={() => (mode === 'listen-type-en-es' || mode === 'listen-type-sentence-en-es')
              ? speak(sanitiseForTTS(word.en), languageConfig.targetLanguage)
              : speak(sanitiseForTTS(word.es), languageConfig.sourceLanguage)}
            className="mx-auto rounded-full w-16 h-16 flex items-center justify-center text-white"
            style={{ background: 'hsl(var(--primary))', boxShadow: '0 4px 14px rgba(198,11,30,0.35)' }}>
            <Volume2 size={24} />
          </button>
        ) : (
          <>
            <div className="text-xs uppercase tracking-wider mb-1" style={{ color: 'hsl(var(--muted-foreground))' }}>
              {isPromptEs ? languageConfig.sourceLanguageName : languageConfig.targetLanguageName}
            </div>
            <div className="flex items-center justify-center gap-2 flex-wrap"
              data-testid="type-prompt">
              {isPromptEs && word.gender ? (
                <div className="font-serif text-2xl font-black px-2 py-0.5 rounded-full"
                  style={{
                    background: word.gender === 'm' ? '#DBEAFE' : '#FCE7F3',
                    color: word.gender === 'm' ? '#1E40AF' : '#9D174D',
                  }}>
                  {word.gender === 'm' ? 'el' : 'la'} {promptText}
                </div>
              ) : (
                <div className="font-serif text-2xl font-black"
                  style={{ color: 'hsl(var(--foreground))' }}>
                  {promptText}
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {!feedback && <SpecialCharBar inputRef={inputRef} value={val} onChange={setVal} />}

      {/* Input — compact for mobile */}
      <input ref={inputRef} data-testid="type-input"
        value={val} onChange={e => setVal(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter') feedback ? next() : submit(); }}
        placeholder={mode === 'type-es-en' ? `Type ${languageConfig.targetLanguageName}…` : `Type ${languageConfig.sourceLanguageName}…`}
        disabled={!!feedback} autoCapitalize="none" autoCorrect="off" spellCheck={false}
        className="w-full p-3 rounded-xl border-2 text-center text-lg font-bold mb-3 transition-colors"
        style={{
          background: 'hsl(var(--card))',
          color: 'hsl(var(--foreground))',
          borderColor: inputBorderColor,
        }} />

      {feedback ? (
        <div className="space-y-2">
          <div className="text-center py-2.5 rounded-xl"
            style={{
              background: feedbackBg,
              color: feedbackColor,
            }}>
            <div className="font-bold text-sm" data-testid="type-feedback">
              {feedbackType === 'correct' && (
                <span>Correct! ✓{mode === 'type-en-es' && <button onClick={() => speak(sanitiseForTTS(word.es), languageConfig.sourceLanguage)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', marginLeft: '6px' }}>🔊</button>}</span>
              )}
              {feedbackType === 'almost' && (
                <>
                  <div>Almost! ✓</div>
                  {mode !== 'type-es-en' && (
                    <div className="text-base font-black mt-1 flex items-center justify-center gap-2 flex-wrap" style={{ color: '#D97706' }}>
                      →
                      {mode === 'type-en-es' && word.gender ? (
                        <span className="px-2 py-0.5 rounded-full" style={{
                          background: word.gender === 'm' ? '#DBEAFE' : '#FCE7F3',
                          color: word.gender === 'm' ? '#1E40AF' : '#9D174D',
                        }}>
                          {word.gender === 'm' ? 'el' : 'la'} {feedback.target}
                        </span>
                      ) : (
                        <span>{feedback.target}</span>
                      )}
                      {mode === 'type-en-es' && <button onClick={() => speak(sanitiseForTTS(word.es), languageConfig.sourceLanguage)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}>🔊</button>}
                    </div>
                  )}
                </>
              )}
              {feedbackType === 'wrong' && (
                <>
                  <div>Answer:</div>
                  {mode !== 'type-es-en' && (
                    <div className="text-base font-black mt-1 flex items-center justify-center gap-2 flex-wrap">
                      {mode === 'type-en-es' && word.gender ? (
                        <span className="px-2 py-0.5 rounded-full" style={{
                          background: word.gender === 'm' ? '#DBEAFE' : '#FCE7F3',
                          color: word.gender === 'm' ? '#1E40AF' : '#9D174D',
                        }}>
                          {word.gender === 'm' ? 'el' : 'la'} {feedback.target}
                        </span>
                      ) : (
                        <span>{feedback.target}</span>
                      )}
                      {mode === 'type-en-es' && <button onClick={() => speak(sanitiseForTTS(word.es), languageConfig.sourceLanguage)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}>🔊</button>}
                    </div>
                  )}
                </>
              )}
            </div>
            {mode === 'type-es-en' && (
              <div className="text-base font-black mt-1" style={{ color: '#14532D' }}>{word.en}</div>
            )}
            {(mode === 'listen-type' || mode === 'listen-type-sentence') && (
              <div className="text-xs mt-2 opacity-70">{word.en}</div>
            )}
            {(mode === 'listen-type-en-es' || mode === 'listen-type-sentence-en-es') && (
              <div className="text-xs mt-2 opacity-70 flex items-center justify-center gap-1 flex-wrap">
                {word.gender ? (
                  <span className="font-bold px-1.5 py-0.5 rounded-full" style={{
                    background: word.gender === 'm' ? '#DBEAFE' : '#FCE7F3',
                    color: word.gender === 'm' ? '#1E40AF' : '#9D174D',
                  }}>
                    {word.gender === 'm' ? 'el' : 'la'} {word.es}
                  </span>
                ) : (
                  <span>{word.es}</span>
                )}
              </div>
            )}
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
