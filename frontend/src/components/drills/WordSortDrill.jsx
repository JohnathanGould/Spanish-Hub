import React, { useState, useMemo } from 'react';
import DrillShell from '../DrillShell';
import { spacedRepetitionSort, shuffle } from '../../utils/helpers';
import { EN_POOL, EN_TYPES } from '../../data/drillData';

const TYPE_LABELS = {
  noun: 'Noun', verb: 'Verb', adj: 'Adjective', adv: 'Adverb',
  pronoun: 'Pronoun', article: 'Article', phrase: 'Phrase', other: 'Other',
};
const ES_TYPES = ['noun', 'verb', 'adj', 'adv', 'pronoun'];

// mode: 'es' | 'en'
export default function WordSortDrill({ mode, words, progress, onAnswer, onDone, onBack }) {
  const total = 10;
  const queue = useMemo(() => {
    if (mode === 'en') return shuffle(EN_POOL).slice(0, total);
    return spacedRepetitionSort(words.filter(w => ES_TYPES.includes(w.type)), progress).slice(0, total);
  }, [mode, words, progress]);

  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState(null);
  const [correct, setCorrect] = useState(0);

  if (queue.length === 0) {
    return <DrillShell title="Word Sort" current={0} total={0} onBack={onBack}>
      <div className="text-center py-10" style={{ color: 'hsl(var(--muted-foreground))' }}>No words available</div>
    </DrillShell>;
  }

  const item = queue[idx];
  const correctType = mode === 'en' ? item.type : item.type;
  const types = mode === 'en' ? EN_TYPES : ES_TYPES;

  const handlePick = (t) => {
    if (picked) return;
    const ok = t === correctType;
    setPicked(t);
    onAnswer(mode === 'en' ? item.w : item.es, ok);
    if (ok) setCorrect(c => c + 1);
    setTimeout(() => {
      if (idx + 1 >= queue.length) onDone(correct + (ok ? 1 : 0), queue.length);
      else { setIdx(idx + 1); setPicked(null); }
    }, 800);
  };

  const renderEnSentence = (s) => {
    const parts = s.split(/\[\[(.+?)\]\]/);
    return parts.map((p, i) =>
      i % 2 === 1
        ? <strong key={i} style={{ color: 'hsl(var(--primary))' }}>{p}</strong>
        : <span key={i}>{p}</span>
    );
  };

  return (
    <DrillShell title={mode === 'en' ? 'Word Sort — English' : 'Word Sort — Spanish'}
      subtitle="What part of speech?" current={idx + 1} total={queue.length} onBack={onBack}>
      <div className="rounded-3xl p-7 mb-5 text-center"
        style={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
        {mode === 'en' ? (
          <>
            <div className="font-serif text-xl mb-2" data-testid="sort-prompt" style={{ color: 'hsl(var(--foreground))', lineHeight: 1.5 }}>
              {renderEnSentence(item.sentence)}
            </div>
          </>
        ) : (
          <>
            <div className="text-xs uppercase tracking-wider mb-3" style={{ color: 'hsl(var(--muted-foreground))' }}>Spanish word</div>
            <div className="font-serif text-3xl font-black mb-1" data-testid="sort-prompt" style={{ color: 'hsl(var(--foreground))' }}>
              {item.es}
            </div>
            <div className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>= {item.en}</div>
          </>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {types.map((t, i) => {
          const isCorrect = picked && t === correctType;
          const isWrong = picked === t && t !== correctType;
          return (
            <button key={t} data-testid={`sort-choice-${t}`} disabled={!!picked} onClick={() => handlePick(t)}
              className={`choice-btn ${isCorrect ? 'correct' : ''} ${isWrong ? 'wrong' : ''}`}>
              {mode === 'en' ? t.charAt(0).toUpperCase() + t.slice(1) : (TYPE_LABELS[t] || t)}
            </button>
          );
        })}
      </div>
    </DrillShell>
  );
}
