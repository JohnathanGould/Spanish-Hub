import { languageConfig } from '../../config/languageConfig';
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Volume2 } from 'lucide-react';
import DrillShell from '../DrillShell';
import { buildNoRepeatQueue, shuffle, speak } from '../../utils/helpers';

// mode: languageConfig.drillDirectionId | languageConfig.reverseDrillDirectionId | 'hear-choose'
export default function ChoiceDrill({ mode, words, progress, onAnswer, onDone, onBack, drillLength = 10, headerOffset = 0 }) {
  const total = drillLength;
  const queueRef = useRef(null);
  if (!queueRef.current) {
    queueRef.current = buildNoRepeatQueue(words, progress, total);
  }
  const queue = queueRef.current;
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState(null);
  const [correct, setCorrect] = useState(0);

  const word = queue[idx] || { es: '', en: '' };
  const isAsk = mode === languageConfig.drillDirectionId || mode === 'hear-choose';
  const correctText = isAsk ? word.en : word.es;
  const promptText = isAsk ? word.es : word.en;

  const choices = useMemo(() => {
    if (!word.es) return [];
    const others = words.filter(w => w.es !== word.es);
    const distractors = shuffle(others).slice(0, 3).map(w => isAsk ? w.en : w.es);
    return shuffle([correctText, ...distractors]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [word.es, isAsk]);

  useEffect(() => {
    if (!picked) return;
    const t = setTimeout(() => {
      if (mode === 'hear-choose-en-es') speak(word.en, languageConfig.targetLanguage);
      else speak(word.es, languageConfig.sourceLanguage);
    }, 50);
    return () => clearTimeout(t);
  }, [picked]); // eslint-disable-line react-hooks/exhaustive-deps

  if (queue.length === 0) {
    return <DrillShell title="Drill" current={0} total={0} onBack={onBack} headerOffset={headerOffset}>
      <div className="text-center py-10" style={{ color: 'hsl(var(--muted-foreground))' }}>No words available</div>
    </DrillShell>;
  }

  const titles = {
    [languageConfig.drillDirectionId]: { title: `${languageConfig.sourceLanguageName} → ${languageConfig.targetLanguageName}`, sub: `Pick the ${languageConfig.targetLanguageName} meaning` },
    [languageConfig.reverseDrillDirectionId]: { title: `${languageConfig.targetLanguageName} → ${languageConfig.sourceLanguageName}`, sub: `Pick the ${languageConfig.sourceLanguageName} translation` },
    'hear-choose': { title: 'Hear & Choose', sub: 'Listen — pick the meaning' },
    'hear-choose-en-es': { title: 'Hear & Choose', sub: `Listen — pick the ${languageConfig.sourceLanguageName} word` },
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
    <DrillShell title={titles[mode].title} subtitle={titles[mode].sub} current={idx + 1} total={queue.length} onBack={onBack} headerOffset={headerOffset}
      footer={picked && (
        <button onClick={handleContinue} data-testid="choice-continue"
          className="w-full py-3 rounded-xl font-bold text-white text-sm"
          style={{ background: 'hsl(var(--primary))' }}>
          {idx + 1 >= queue.length ? 'Finish ✓' : 'Continue →'}
        </button>
      )}>
      <div className="rounded-3xl p-4 mb-2 text-center"
        style={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
        {(mode === 'hear-choose' || mode === 'hear-choose-en-es') ? (
          <button data-testid="choice-listen-btn"
            onClick={() => mode === 'hear-choose-en-es'
              ? speak(word.en, languageConfig.targetLanguage)
              : speak(promptText, languageConfig.sourceLanguage)}
            className="mx-auto rounded-full w-20 h-20 flex items-center justify-center text-white"
            style={{ background: 'hsl(var(--primary))', boxShadow: '0 6px 20px rgba(198,11,30,0.35)' }}>
            <Volume2 size={28} />
          </button>
        ) : (
          <>
            <div className="text-xs uppercase tracking-wider mb-3" style={{ color: 'hsl(var(--muted-foreground))' }}>
              {isAsk ? languageConfig.sourceLanguageName : languageConfig.targetLanguageName}
            </div>
            <div className="font-serif text-2xl font-black leading-tight break-words w-full" data-testid="choice-prompt" style={{ color: 'hsl(var(--foreground))' }}>
              {promptText}
            </div>
            {isAsk && (
              <button data-testid="choice-speak" onClick={() => speak(promptText, languageConfig.sourceLanguage)} className="speak-btn mt-2">
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
        <div className="mt-2 text-center">
          {picked === correctText && (
            <div className="mb-3 text-sm font-medium" style={{ color: '#16A34A' }}>
              Correct! ✓
            </div>
          )}
          {(mode === 'hear-choose' || mode === 'hear-choose-en-es') && (
            <div className="mb-3 py-3 rounded-lg" style={{ background: 'hsl(var(--muted))' }}>
              <div className="font-serif text-2xl font-black flex items-center justify-center gap-1" style={{ color: 'hsl(var(--foreground))' }}>
                {mode === 'hear-choose-en-es' ? word.en : word.es}
                <button
                  onClick={() => mode === 'hear-choose-en-es'
                    ? speak(word.en, languageConfig.targetLanguage)
                    : speak(word.es, languageConfig.sourceLanguage)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}>🔊</button>
              </div>
              <div className="text-xs mt-2" style={{ color: picked === correctText ? '#16A34A' : '#DC2626' }}>
                {picked === correctText ? (mode === 'hear-choose-en-es' ? word.es : word.en) : `Answer: ${correctText}`}
              </div>
            </div>
          )}
        </div>
      )}
    </DrillShell>
  );
}
