import { languageConfig } from '../../config/languageConfig';
import React, { useState, useRef, useContext } from 'react';
import { ArrowRight } from 'lucide-react';
import DrillShell from '../DrillShell';
import { DrillKeyboardContext } from '../DrillShell';
import SpecialCharBar from '../SpecialCharBar';
import { shuffle, speak, stripAccents, gradeTypedAnswer, sanitiseForTTS } from '../../utils/helpers';
import { VERB_TABLE } from '../../content/es-en/words';

// Field order matches the requested table layout:
// English clue (infinitive) -> Yo -> Tú -> Él/Ella -> Nosotros -> Ustedes/Ellos
const FIELD_DEFS = [
  { key: 'inf',      label: 'Infinitive',      getTarget: v => v.inf },
  { key: 'yo',       label: 'Yo',               getTarget: v => v.conj.find(c => c.subj === 'Yo').es },
  { key: 'tu',       label: 'Tú',               getTarget: v => v.conj.find(c => c.subj === 'Tú').es },
  { key: 'el_ella',  label: 'Él / Ella',        getTarget: v => v.conj.find(c => c.subj === 'Él/Ella').es },
  { key: 'nosotros', label: 'Nosotros',         getTarget: v => v.conj.find(c => c.subj === 'Nosotros').es },
  { key: 'ustedes',  label: 'Ustedes / Ellos',  getTarget: v => v.conj.find(c => c.subj === 'Ustedes/Ellos').es },
];

const EMPTY_VALUES = FIELD_DEFS.reduce((acc, f) => ({ ...acc, [f.key]: '' }), {});

export default function ConjugationTableDrill({
  onAnswer, onDone, onBack, drillLength = 6,
  headerOffset = 0, bottomOffset = 60, counterOverride, strictMode = false, skipControl,
}) {
  const total = drillLength;
  const queueRef = useRef(null);
  if (!queueRef.current) queueRef.current = shuffle(VERB_TABLE).slice(0, total);
  const queue = queueRef.current;

  const [idx, setIdx] = useState(0);
  const [values, setValues] = useState(EMPTY_VALUES);
  const [feedback, setFeedback] = useState(null); // { [key]: {ok, closeEnough, target} }
  const [activeKey, setActiveKey] = useState('inf');
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const inputRefs = useRef({});
  const keyboardOpen = useContext(DrillKeyboardContext);

  if (queue.length === 0) {
    return (
      <DrillShell title="Conjugation Table" current={0} total={0} onBack={onBack} headerOffset={headerOffset}>
        <div className="text-center py-10" style={{ color: 'hsl(var(--muted-foreground))' }}>
          No verbs available
        </div>
      </DrillShell>
    );
  }

  const verb = queue[idx];
  const allFilled = FIELD_DEFS.every(f => values[f.key].trim().length > 0);

  const submit = () => {
    if (feedback || !allFilled) return;
    const nextFeedback = {};
    let correctCount = 0;

    FIELD_DEFS.forEach(f => {
      const target = f.getTarget(verb);
      const { ok, closeEnough, displayTarget } = gradeTypedAnswer(values[f.key], target, strictMode);
      nextFeedback[f.key] = { ok, closeEnough, target: displayTarget };
      if (ok) correctCount++;
      onAnswer(target, ok);
    });

    setFeedback(nextFeedback);
    setSessionCorrect(c => c + correctCount);
    setTimeout(() => speak(sanitiseForTTS(verb.inf), languageConfig.sourceLanguage), 50);
  };

  const next = () => {
    if (idx + 1 >= queue.length) {
      onDone(sessionCorrect, queue.length * FIELD_DEFS.length);
    } else {
      setIdx(idx + 1);
      setValues(EMPTY_VALUES);
      setFeedback(null);
      setActiveKey('inf');
    }
  };

  const setFieldValue = (key, val) => setValues(prev => ({ ...prev, [key]: val }));

  const activeInputRef = { current: inputRefs.current[activeKey] || null };

  return (
    <DrillShell
      title="Conjugation Table"
      subtitle="Fill in the full present-tense paradigm"
      current={idx + 1}
      total={queue.length}
      onBack={onBack}
      headerOffset={headerOffset}
      bottomOffset={bottomOffset}
      counterOverride={counterOverride}
      skipControl={skipControl}
      footer={feedback ? (
        <button data-testid="conjtable-next" onClick={next}
          className={`w-full ${keyboardOpen ? 'py-2' : 'py-3'} rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-all`}
          style={{ background: 'hsl(var(--primary))', boxShadow: '0 4px 14px rgba(198,11,30,0.3)' }}>
          {idx + 1 >= queue.length
            ? `Finish — ${sessionCorrect}/${(idx + 1) * FIELD_DEFS.length} ✓`
            : 'Continue →'} <ArrowRight size={16} />
        </button>
      ) : (
        <button data-testid="conjtable-submit" onClick={submit} disabled={!allFilled}
          className={`w-full ${keyboardOpen ? 'py-2' : 'py-3'} rounded-xl text-sm font-bold text-white transition-all disabled:opacity-50`}
          style={{ background: 'hsl(var(--primary))', boxShadow: '0 4px 14px rgba(198,11,30,0.3)' }}>
          Check
        </button>
      )}>

      {/* English clue card */}
      <div className={`rounded-2xl ${keyboardOpen ? 'p-2 mb-2' : 'p-4 mb-3'} text-center`}
        style={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <div className="text-xs uppercase tracking-wider mb-1" style={{ color: 'hsl(var(--muted-foreground))' }}>
          English Clue
        </div>
        <div className="font-serif text-xl font-black" style={{ color: 'hsl(var(--foreground))' }}>
          {verb.en}
        </div>
      </div>

      {!feedback && strictMode && (
        <SpecialCharBar
          inputRef={activeInputRef}
          value={values[activeKey]}
          onChange={(v) => setFieldValue(activeKey, v)}
        />
      )}

      {/* 6-field table */}
      <div className="flex flex-col gap-2 mb-3">
        {FIELD_DEFS.map(f => {
          const fb = feedback?.[f.key];
          let borderColor = 'hsl(var(--border))';
          if (fb) borderColor = fb.ok ? '#86EFAC' : '#FCA5A5';
          return (
            <div key={f.key} className="flex items-center gap-2">
              <div className="w-24 flex-shrink-0 text-xs font-bold uppercase tracking-wide text-right"
                style={{ color: 'hsl(var(--muted-foreground))' }}>
                {f.label}
              </div>
              <div className="flex-1 flex flex-col">
                <input
                  ref={el => { inputRefs.current[f.key] = el; }}
                  data-testid={`conjtable-input-${f.key}`}
                  value={values[f.key]}
                  onChange={e => setFieldValue(f.key, e.target.value)}
                  onFocus={() => setActiveKey(f.key)}
                  onKeyDown={e => { if (e.key === 'Enter') feedback ? next() : submit(); }}
                  disabled={!!feedback}
                  autoCapitalize="none" autoCorrect="off" spellCheck={false}
                  className={`w-full ${keyboardOpen ? 'p-1.5' : 'p-2.5'} rounded-lg border-2 text-center font-bold transition-colors`}
                  style={{ background: 'hsl(var(--card))', color: 'hsl(var(--foreground))', borderColor }}
                />
                {fb && !fb.ok && (
                  <div className="text-xs mt-0.5 text-center font-semibold" style={{ color: fb.closeEnough ? '#D97706' : '#991B1B' }}>
                    → {fb.target}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {feedback && (
        <div className="text-center py-2 rounded-xl font-bold text-sm"
          style={{
            background: Object.values(feedback).every(f => f.ok) ? '#DCFCE7' : '#FEF3C7',
            color: Object.values(feedback).every(f => f.ok) ? '#14532D' : '#92400E',
          }}>
          {Object.values(feedback).filter(f => f.ok).length}/{FIELD_DEFS.length} correct
        </div>
      )}
    </DrillShell>
  );
}
