import { languageConfig } from '../../config/languageConfig';
import React, { useState, useRef, useEffect } from 'react';
import { Volume2 } from 'lucide-react';
import DrillShell from '../DrillShell';
import { buildNoRepeatQueue, speak } from '../../utils/helpers';

export default function GenderDrill({ words, progress, onAnswer, onDone, onBack, drillLength = 10, skipControl }) {
  const total = drillLength;
  const nounsRef = useRef(null);
  if (!nounsRef.current) {
    nounsRef.current = buildNoRepeatQueue(
      words.filter(w => w.type === 'noun' && (w.gender === 'm' || w.gender === 'f')),
      progress,
      total
    );
  }
  const nouns = nounsRef.current;

  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState(null);
  const [correct, setCorrect] = useState(0);

  useEffect(() => {
    if (picked && nouns[idx]) {
      const n = nouns[idx];
      speak(`${n.gender === 'm' ? 'el' : 'la'} ${n.es}`, languageConfig.sourceLanguage);
    }
  }, [picked]); // eslint-disable-line react-hooks/exhaustive-deps

  if (nouns.length === 0) {
    return <DrillShell title="Gender Drill" current={0} total={0} onBack={onBack}>
      <div className="text-center py-10" style={{ color: 'hsl(var(--muted-foreground))' }}>No gendered nouns in active categories</div>
    </DrillShell>;
  }

  const word = nouns[idx];
  const correctLabel = word.gender === 'm' ? 'el' : 'la';

  const getPillStyle = (g) => {
    if (!picked) {
      return g === 'm'
        ? { background: '#DBEAFE', borderColor: '#1E40AF', color: '#1E40AF' }
        : { background: '#FCE7F3', borderColor: '#9D174D', color: '#9D174D' };
    }
    if (g === word.gender) return { background: '#DCFCE7', borderColor: '#16A34A', color: '#16A34A' };
    if (g === picked)      return { background: '#FEE2E2', borderColor: '#DC2626', color: '#DC2626' };
    return { background: 'hsl(var(--muted))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--muted-foreground))' };
  };

  const containerStyle = picked
    ? (word.gender === 'f'
        ? { background: '#FCE7F3', border: '1px solid #9D174D', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }
        : { background: '#DBEAFE', border: '1px solid #1E40AF', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' })
    : { background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' };

  const handlePick = (g) => {
    if (picked) return;
    const ok = g === word.gender;
    setPicked(g);
    onAnswer(word.es, ok);
    if (ok) setCorrect(c => c + 1);
  };

  const handleContinue = () => {
    if (idx + 1 >= nouns.length) onDone(correct, nouns.length);
    else { setIdx(idx + 1); setPicked(null); }
  };

  return (
    <DrillShell title="Gender Drill" subtitle="el (masculine) or la (feminine)?" current={idx + 1} total={nouns.length} onBack={onBack}
      skipControl={skipControl}
      footer={picked && (
        <button onClick={handleContinue} data-testid="gender-continue"
          className="w-full py-3 rounded-xl font-bold text-white text-sm"
          style={{ background: 'hsl(var(--primary))' }}>
          {idx + 1 >= nouns.length ? 'Finish ✓' : 'Continue →'}
        </button>
      )}>
      <div className="rounded-3xl p-8 mb-6 text-center transition-all duration-300"
        style={containerStyle}>
        <div className="text-xs uppercase tracking-wider mb-3"
          style={{ color: picked ? (word.gender === 'f' ? '#9D174D' : '#1E40AF') : 'hsl(var(--muted-foreground))' }}>
          {picked ? (word.gender === 'f' ? 'feminine' : 'masculine') : 'Noun'}
        </div>
        <div className="font-serif text-4xl font-black mb-2" data-testid="gender-prompt"
          style={{ color: picked ? (word.gender === 'f' ? '#9D174D' : '#1E40AF') : 'hsl(var(--foreground))' }}>
          {picked ? `${correctLabel} ${word.es}` : `____ ${word.es}`}
        </div>
        <div className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>= {word.en}</div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[
          { g: 'm', label: 'el', sub: 'masculine' },
          { g: 'f', label: 'la', sub: 'feminine' },
        ].map(({ g, label, sub }) => (
          <button key={g} data-testid={`gender-${g}`} disabled={!!picked} onClick={() => handlePick(g)}
            className="py-6 rounded-2xl border-2 transition-all hover:-translate-y-0.5"
            style={getPillStyle(g)}>
            <div className="font-serif text-3xl font-black mb-1">{label}</div>
            <div className="text-xs uppercase tracking-wider opacity-80">{sub}</div>
          </button>
        ))}
      </div>

      {picked && (
        <div className="mt-4 text-center">
          <div className="mb-3 text-sm font-medium" style={{ color: picked === word.gender ? '#16A34A' : '#DC2626' }}>
            {picked === word.gender ? 'Correct! ✓' : `Answer: ${correctLabel} ${word.es}`}
          </div>
          <button onClick={() => speak(`${correctLabel} ${word.es}`, languageConfig.sourceLanguage)} className="speak-btn mx-auto mb-3">
            <Volume2 size={12} /> Hear it
          </button>
        </div>
      )}
    </DrillShell>
  );
}
