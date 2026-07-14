import { languageConfig } from '../../config/languageConfig';
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Volume2 } from 'lucide-react';
import DrillShell from '../DrillShell';
import SpecialCharBar from '../SpecialCharBar';
import { shuffle, speak, gradeTypedAnswer } from '../../utils/helpers';
import { FITB_POOL } from '../../content/es-en/drillData';
import { VERB_TABLE } from '../../content/es-en/words';

export default function FillBlankDrill({ onAnswer, onDone, onBack, drillLength = 10, mode = 'choice', strictMode = false }) {
  const total = drillLength;
  const queue = useMemo(() => shuffle(FITB_POOL).slice(0, total), [total]);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState(null);
  const [correct, setCorrect] = useState(0);
  const [typedValue, setTypedValue] = useState('');
  const [typedOk, setTypedOk] = useState(false);
  const inputRef = useRef(null);

  const item = queue[idx];
  const choices = useMemo(() => shuffle([...item.choices]), [item]);

  useEffect(() => {
    if (mode === 'typed' && !picked) {
      inputRef.current?.focus();
    }
  }, [idx, mode, picked]);

  const getEnglishMeaning = (blankWord) => {
    for (const verb of VERB_TABLE) {
      for (const conj of verb.conj) {
        if (conj.es === blankWord) return verb.en;
      }
    }
    return null;
  };

  const handlePick = (c) => {
    if (picked) return;
    const ok = c === item.blank;
    setPicked(c);
    onAnswer(item.blank, ok);
    if (ok) setCorrect(x => x + 1);
  };

  const handleTypedSubmit = () => {
    if (!typedValue.trim() || picked) return;
    const answer = typedValue.trim();
    const { ok, displayTarget } = gradeTypedAnswer(answer, item.blank, strictMode);
    setTypedOk(ok);
    setPicked(ok ? item.blank : answer);
    onAnswer(item.blank, ok);
    if (ok) setCorrect(x => x + 1);
  };

  const handleContinue = () => {
    if (idx + 1 >= queue.length) onDone(correct, queue.length);
    else { setIdx(idx + 1); setPicked(null); setTypedValue(''); setTypedOk(false); }
  };

  useEffect(() => {
    if (picked) speak(`${item.before} ${item.blank} ${item.after}`, languageConfig.sourceLanguage, 0.72);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [picked]);

  let blankBg = 'hsl(var(--muted))';
  let blankColor = 'hsl(var(--muted-foreground))';
  if (picked) {
    const isCorrect = mode === 'typed' ? typedOk : picked === item.blank;
    blankBg = isCorrect ? '#DCFCE7' : '#FEE2E2';
    blankColor = isCorrect ? '#14532D' : '#991B1B';
  }

  const isCorrectAnswer = picked && (mode === 'typed' ? typedOk : picked === item.blank);

  return (
    <DrillShell
      title="Fill in the Blank"
      subtitle={mode === 'typed' ? 'Type the missing word' : 'Pick the missing word'}
      current={idx + 1} total={queue.length} onBack={onBack}
      footer={picked && (
        <button onClick={handleContinue} data-testid="fitb-continue"
          className="w-full py-3 rounded-xl font-bold text-white text-sm"
          style={{ background: 'hsl(var(--primary))' }}>
          {idx + 1 >= queue.length ? 'Finish ✓' : 'Continue →'}
        </button>
      )}>
      <div className="rounded-3xl p-7 mb-4 text-center"
        style={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
        <div className="font-serif text-xl sm:text-2xl font-bold leading-relaxed" data-testid="fitb-prompt" style={{ color: 'hsl(var(--foreground))' }}>
          {item.before}{' '}
          {mode === 'typed' && !picked ? (
            <input
              ref={inputRef}
              type="text"
              value={typedValue}
              onChange={e => setTypedValue(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleTypedSubmit(); }}
              data-testid="fitb-typed-input"
              style={{
                display: 'inline-block',
                background: blankBg,
                color: 'hsl(var(--foreground))',
                minWidth: 80,
                width: Math.max(80, (typedValue.length + 2) * 20) + 'px',
                fontSize: '0.95em',
                fontFamily: 'inherit',
                fontWeight: 700,
                textAlign: 'center',
                border: '2px solid hsl(var(--primary))',
                borderRadius: 8,
                padding: '2px 8px',
                outline: 'none',
                verticalAlign: 'middle',
              }}
            />
          ) : (
            <span className="inline-block px-3 py-0.5 rounded-lg mx-1 align-middle"
              style={{ background: blankBg, color: blankColor, minWidth: 80, fontSize: '0.95em' }}>
              {picked ? (mode === 'typed' ? picked : item.blank) : '____'}
            </span>
          )}{' '}
          {item.after}
        </div>
        {mode === 'typed' && !picked && strictMode && (
          <div className="mt-3">
            <SpecialCharBar inputRef={inputRef} value={typedValue} onChange={setTypedValue} />
          </div>
        )}
        {item.hint && (
          <div className="text-xs italic mt-3" style={{ color: 'hsl(var(--muted-foreground))' }}>
            {item.hint}
          </div>
        )}
      </div>

      {mode === 'choice' ? (
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
      ) : (
        <div className="flex flex-col gap-2">
          {!picked && (
            <button
              onClick={handleTypedSubmit}
              disabled={!typedValue.trim()}
              data-testid="fitb-typed-submit"
              className="w-full py-3 rounded-xl font-bold text-sm"
              style={{ background: typedValue.trim() ? 'hsl(var(--primary))' : 'hsl(var(--muted))', color: typedValue.trim() ? 'white' : 'hsl(var(--muted-foreground))' }}>
              Check
            </button>
          )}
        </div>
      )}

      {picked && (
        <div className="mt-4 text-center">
          <div className="mb-3 text-sm font-medium" style={{ color: isCorrectAnswer ? '#16A34A' : '#DC2626' }}>
            {isCorrectAnswer ? 'Correct! ✓' : `Answer: ${item.blank}`}
            {isCorrectAnswer && (
              <div className="text-xs mt-1 opacity-70">{getEnglishMeaning(item.blank)}</div>
            )}
          </div>
          {item.en && <div className="text-xs mb-3" style={{ color: '#374151' }}>{item.en}</div>}
          <button onClick={() => speak(`${item.before} ${item.blank} ${item.after}`, languageConfig.sourceLanguage, 0.72)} className="speak-btn mx-auto mb-3">
            <Volume2 size={12} /> Hear it
          </button>
        </div>
      )}
    </DrillShell>
  );
}
