import { languageConfig } from '../../config/languageConfig';
import React, { useState, useMemo, useEffect } from 'react';
import { Volume2 } from 'lucide-react';
import DrillShell from '../DrillShell';
import { shuffle, speak } from '../../utils/helpers';
import { CONJ, PRETERITE } from '../../data/drillData';
import { VERB_TABLE } from '../../data/words';

const _PRONOUN_EN = { yo: 'I', tu: 'you', el_ella: 'he/she', nosotros: 'we', ustedes: 'they' };

function getConjEnglish(item) {
  const conjEntry = VERB_TABLE.find(v => v.inf === item.verb)?.conj.find(c => c.es === item.ans);
  if (conjEntry) return conjEntry.en;
  const subj = _PRONOUN_EN[item.pronoun] || '';
  const base = (item.hint || '').replace(/^to /, '');
  return subj ? `${subj} ${base}` : base;
}

// mode: 'present' | 'past'
export default function ConjugationDrill({ mode, onAnswer, onDone, onBack, drillLength = 10 }) {
  const total = drillLength;
  const pool = mode === 'past' ? PRETERITE : CONJ;
  const queue = useMemo(() => shuffle(pool).slice(0, total), [pool, total]);
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

  useEffect(() => {
    if (!picked) return;
    const t = setTimeout(() => speak(item.ans, languageConfig.sourceLanguage), 50);
    return () => clearTimeout(t);
  }, [picked]); // eslint-disable-line react-hooks/exhaustive-deps

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
        <div className="text-xs italic mt-2 mb-3" style={{ color: 'hsl(var(--muted-foreground))' }}>
          {item.hint}
        </div>
        <button onClick={() => speak(item.verb, languageConfig.sourceLanguage)} className="speak-btn mx-auto">
          <Volume2 size={12} /> Hear it
        </button>
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
          <div className="mb-3 text-sm font-medium flex items-center justify-center gap-1" style={{ color: picked === item.ans ? '#16A34A' : '#DC2626' }}>
            {picked === item.ans ? 'Correct! ✓' : `Answer: ${item.ans}`}
            <button onClick={() => speak(item.ans, languageConfig.sourceLanguage)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', lineHeight: 1 }}>🔊</button>
          </div>
          <div className="text-xs mb-3" style={{ color: '#374151' }}>
            {getConjEnglish(item)}
          </div>
          <button onClick={handleContinue} data-testid="conj-continue"
            className="w-full py-3 rounded-xl font-bold text-white text-sm"
            style={{ background: 'hsl(var(--primary))' }}>
            {idx + 1 >= queue.length ? 'Finish ✓' : 'Continue →'}
          </button>
        </div>
      )}
    </DrillShell>
  );
}
