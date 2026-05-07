import React, { useState, useMemo, useEffect } from 'react';
import DrillShell from '../DrillShell';
import { spacedRepetitionSort, shuffle } from '../../utils/helpers';

export default function MatchingDrill({ words, progress, onAnswer, onDone, onBack }) {
  const PAIRS = 6;
  const pairs = useMemo(() => spacedRepetitionSort(words, progress).slice(0, PAIRS), [words, progress]);

  const [esTiles, setEsTiles] = useState([]);
  const [enTiles, setEnTiles] = useState([]);
  const [matched, setMatched] = useState(new Set()); // word.es ids
  const [selectedEs, setSelectedEs] = useState(null);
  const [selectedEn, setSelectedEn] = useState(null);
  const [wrongFlash, setWrongFlash] = useState(null);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);

  useEffect(() => {
    setEsTiles(shuffle(pairs.map(p => ({ id: p.es, text: p.es }))));
    setEnTiles(shuffle(pairs.map(p => ({ id: p.es, text: p.en }))));
  }, [pairs]);

  useEffect(() => {
    if (selectedEs && selectedEn) {
      if (selectedEs === selectedEn) {
        setMatched(prev => new Set([...prev, selectedEs]));
        const w = pairs.find(p => p.es === selectedEs);
        if (w) onAnswer(w.es, true);
        setCorrect(c => c + 1);
        setSelectedEs(null); setSelectedEn(null);
      } else {
        const w = pairs.find(p => p.es === selectedEs);
        if (w) onAnswer(w.es, false);
        setWrong(w => w + 1);
        setWrongFlash({ es: selectedEs, en: selectedEn });
        setTimeout(() => {
          setWrongFlash(null);
          setSelectedEs(null); setSelectedEn(null);
        }, 500);
      }
    }
  }, [selectedEs, selectedEn]); // eslint-disable-line

  useEffect(() => {
    if (matched.size > 0 && matched.size === pairs.length) {
      const total = correct + wrong;
      setTimeout(() => onDone(correct, Math.max(total, pairs.length)), 600);
    }
  }, [matched, pairs.length, correct, wrong]); // eslint-disable-line

  if (pairs.length === 0) {
    return <DrillShell title="Matching Game" current={0} total={0} onBack={onBack}>
      <div className="text-center py-10" style={{ color: 'hsl(var(--muted-foreground))' }}>No words available</div>
    </DrillShell>;
  }

  const tileClass = (id, text, side) => {
    if (matched.has(id)) return 'match-btn matched';
    if (wrongFlash && ((side === 'es' && wrongFlash.es === id) || (side === 'en' && wrongFlash.en === id))) return 'match-btn wrong-flash';
    if (side === 'es' && selectedEs === id) return 'match-btn selected';
    if (side === 'en' && selectedEn === id) return 'match-btn selected';
    return 'match-btn';
  };

  return (
    <DrillShell title="Matching Game" subtitle="Tap a Spanish word, then its English match"
      current={matched.size} total={pairs.length} onBack={onBack}>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          {esTiles.map(t => (
            <button key={t.id} data-testid={`match-es-${t.id}`}
              disabled={matched.has(t.id)} onClick={() => setSelectedEs(t.id)}
              className={tileClass(t.id, t.text, 'es')}>
              {t.text}
            </button>
          ))}
        </div>
        <div className="space-y-2">
          {enTiles.map(t => (
            <button key={t.id + '-en'} data-testid={`match-en-${t.id}`}
              disabled={matched.has(t.id)} onClick={() => setSelectedEn(t.id)}
              className={tileClass(t.id, t.text, 'en')}>
              {t.text}
            </button>
          ))}
        </div>
      </div>
      <div className="text-center text-xs mt-5" style={{ color: 'hsl(var(--muted-foreground))' }}>
        Matched: <strong style={{ color: '#16A34A' }}>{matched.size}</strong> · Misses: <strong style={{ color: '#D97706' }}>{wrong}</strong>
      </div>
    </DrillShell>
  );
}
