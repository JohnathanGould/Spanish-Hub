import { languageConfig } from '../../config/languageConfig';
import React, { useState, useRef, useEffect } from 'react';
import DrillShell from '../DrillShell';
import { buildNoRepeatQueue, shuffle, playCorrect, speak } from '../../utils/helpers';

export default function MatchingDrill({ words, progress, onAnswer, onDone, onBack, drillLength = 6 }) {
  const PAIRS = Math.min(drillLength, words.length);
  const pairsRef = useRef(null);
  if (!pairsRef.current) {
    pairsRef.current = buildNoRepeatQueue(words, progress, PAIRS);
  }
  const pairs = pairsRef.current;

  const [esTiles] = useState(() => shuffle(pairs.map(p => ({ id: p.es, text: p.es }))));
  const [enTiles] = useState(() => shuffle(pairs.map(p => ({ id: p.es, text: p.en }))));
  const [matched, setMatched] = useState(new Set());
  const [selectedEs, setSelectedEs] = useState(null);
  const [selectedEn, setSelectedEn] = useState(null);
  const [wrongFlash, setWrongFlash] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (selectedEs && selectedEn) {
      if (selectedEs === selectedEn) {
        const w = pairs.find(p => p.es === selectedEs);
        if (w) onAnswer(w.es, true);
        setMatched(prev => new Set([...prev, selectedEs]));
        setCorrect(c => c + 1);
        playCorrect();
        setFeedback({ ok: true, msg: 'Correct! ✓' });
        setSelectedEs(null);
        setSelectedEn(null);
      } else {
        const w = pairs.find(p => p.es === selectedEs);
        const correctEn = w ? w.en : '';
        if (w) onAnswer(w.es, false);
        setWrong(x => x + 1);
        setFeedback({ ok: false, msg: `${selectedEs} = ${correctEn}` });
        setWrongFlash({ es: selectedEs, en: selectedEn });
        setTimeout(() => {
          setWrongFlash(null);
          setSelectedEs(null);
          setSelectedEn(null);
        }, 600);
      }
    }
  }, [selectedEs, selectedEn]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (matched.size > 0 && matched.size === pairs.length) {
      setFinished(true);
    }
  }, [matched, pairs.length]);

  if (pairs.length === 0) {
    return (
      <DrillShell title="Matching Game" current={0} total={0} onBack={onBack}>
        <div className="text-center py-10" style={{ color: 'hsl(var(--muted-foreground))' }}>
          No words available
        </div>
      </DrillShell>
    );
  }

  const tileClass = (id, side) => {
    if (matched.has(id)) return 'match-btn w-full matched';
    if (wrongFlash && ((side === 'es' && wrongFlash.es === id) || (side === 'en' && wrongFlash.en === id))) return 'match-btn w-full wrong-flash';
    if (side === 'es' && selectedEs === id) return 'match-btn w-full selected';
    if (side === 'en' && selectedEn === id) return 'match-btn w-full selected';
    return 'match-btn w-full';
  };

  return (
    <DrillShell title="Matching Game" subtitle="Tap a Spanish word, then its English match"
      current={matched.size} total={pairs.length} onBack={onBack}>
      {matched.size > 0 && (
        <div className="mb-3 flex flex-col gap-1.5">
          {[...matched].map(id => {
            const pair = pairs.find(p => p.es === id);
            return (
              <div key={id} className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium"
                style={{ background: '#DCFCE7' }}>
                <span style={{ color: '#16A34A', fontWeight: 'bold' }}>{id}</span>
                <button onClick={() => speak(id, languageConfig.sourceLanguage)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', padding: 0 }}>
                  🔊
                </button>
                <span style={{ color: '#374151' }}>= {pair?.en}</span>
              </div>
            );
          })}
        </div>
      )}
      <div className="grid grid-cols-2 gap-3 items-start">
        <div className="flex flex-col gap-2">
          {esTiles.filter(t => !matched.has(t.id)).map(t => (
            <button key={t.id} data-testid={`match-es-${t.id}`}
              disabled={finished} onClick={() => setSelectedEs(t.id)}
              className={tileClass(t.id, languageConfig.sourceLanguage)}>
              {t.text}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {enTiles.filter(t => !matched.has(t.id)).map(t => (
            <button key={t.id + '-en'} data-testid={`match-en-${t.id}`}
              disabled={finished} onClick={() => setSelectedEn(t.id)}
              className={tileClass(t.id, 'en')}>
              {t.text}
            </button>
          ))}
        </div>
      </div>

      {feedback && !finished && (
        <div className="mt-4 text-center text-sm font-medium"
          style={{ color: feedback.ok ? '#16A34A' : '#DC2626' }}>
          {feedback.ok ? feedback.msg : `Answer: ${feedback.msg}`}
        </div>
      )}

      {finished && (
        <div className="mt-4 text-center">
          <div className="mb-3 text-sm font-medium" style={{ color: '#16A34A' }}>
            All matched! 🐾
          </div>
          <button onClick={() => onDone(correct, Math.max(correct + wrong, pairs.length))}
            data-testid="match-finish"
            className="w-full py-3 rounded-xl font-bold text-white text-sm"
            style={{ background: 'hsl(var(--primary))' }}>
            Finish ✓
          </button>
        </div>
      )}
    </DrillShell>
  );
}
