import { languageConfig } from '../../config/languageConfig';
import React, { useState, useMemo } from 'react';
import { ArrowRight, Volume2 } from 'lucide-react';
import DrillShell from '../DrillShell';
import { shuffle, speak } from '../../utils/helpers';
import { SENT_POOL } from '../../content/es-en/drillData';
import { MASTER } from '../../content/es-en/words';

export default function SentenceBuilderDrill({ onAnswer, onDone, onBack, drillLength = 10 }) {
  const total = Math.min(drillLength, SENT_POOL.length);
  const queue = useMemo(() => shuffle(SENT_POOL).slice(0, total), [total]);
  const [idx, setIdx] = useState(0);
  const [pool, setPool] = useState([]);
  const [placed, setPlaced] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [correct, setCorrect] = useState(0);

  const genderMap = useMemo(() => {
    const map = {};
    MASTER.forEach(w => {
      if (w.gender) map[w.es.toLowerCase()] = w.gender;
    });
    return map;
  }, []);

  React.useEffect(() => {
    if (queue[idx]) {
      const targetWords = queue[idx].words;
      const targetSet = new Set(targetWords.map(w => w.toLowerCase()));
      const correct = targetWords.map((w, i) => ({ id: i, text: w }));

      const distractors = [];
      if (queue.length > 1) {
        const otherIdxs = shuffle(queue.map((_, i) => i).filter(i => i !== idx)).slice(0, 2);
        otherIdxs.forEach((qi, di) => {
          const candidates = queue[qi].words.filter(w => !targetSet.has(w.toLowerCase()));
          if (candidates.length > 0) {
            const word = candidates[Math.floor(Math.random() * candidates.length)];
            distractors.push({ id: `d-${di}`, text: word });
          }
        });
      }

      setPool(shuffle([...correct, ...distractors]));
      setPlaced([]);
      setFeedback(null);
    }
  }, [idx, queue]);

  React.useEffect(() => {
    if (feedback) speak(feedback.target, languageConfig.sourceLanguage, 0.72);
  }, [feedback]); // eslint-disable-line react-hooks/exhaustive-deps

  if (queue.length === 0) {
    return <DrillShell title="Sentence Builder" current={0} total={0} onBack={onBack}>
      <div className="text-center py-10" style={{ color: 'hsl(var(--muted-foreground))' }}>No sentences available</div>
    </DrillShell>;
  }

  const sentence = queue[idx];
  const targetSentence = sentence.words.join(' ');

  const placeWord = (w) => {
    if (feedback) return;
    setPool(p => p.filter(x => x.id !== w.id));
    setPlaced(p => [...p, w]);
  };

  const removeWord = (w) => {
    if (feedback) return;
    setPlaced(p => p.filter(x => x.id !== w.id));
    setPool(p => [...p, w]);
  };

  const check = () => {
    if (feedback) return;
    const built = placed.map(p => p.text).join(' ');
    const ok = built === targetSentence;
    setFeedback({ ok, target: targetSentence });
    onAnswer(targetSentence, ok);
    if (ok) setCorrect(c => c + 1);
  };

  const next = () => {
    if (idx + 1 >= queue.length) onDone(correct, queue.length);
    else setIdx(idx + 1);
  };

  const feedbackBg    = feedback?.ok ? '#DCFCE7' : '#FEE2E2';
  const feedbackColor = feedback?.ok ? '#14532D' : '#991B1B';

  return (
    <DrillShell title="Sentence Builder" subtitle="Tap words to build the Spanish sentence"
      current={idx + 1} total={queue.length} onBack={onBack}>
      <div className="rounded-2xl p-4 mb-4 text-center"
        style={{ background: 'hsl(var(--muted))', border: '1px solid hsl(var(--border))' }}>
        <div className="text-xs uppercase tracking-wider mb-2" style={{ color: 'hsl(var(--muted-foreground))' }}>Translate</div>
        <div className="font-serif text-lg font-bold" data-testid="sent-hint" style={{ color: 'hsl(var(--foreground))' }}>
          {sentence.hint}
        </div>
      </div>

      <div className="drop-zone mb-4" data-testid="sent-dropzone">
        {placed.length === 0 && (
          <div className="w-full text-center text-xs py-4" style={{ color: 'hsl(var(--muted-foreground))' }}>
            Tap words below to add them here
          </div>
        )}
        {placed.map(w => {
          const gender = genderMap[w.text.toLowerCase()];
          const pillStyle = gender ? {
            background: gender === 'm' ? '#DBEAFE' : '#FCE7F3',
            color: gender === 'm' ? '#1E40AF' : '#9D174D',
            fontWeight: 'bold',
            padding: '0.125rem 0.375rem',
            borderRadius: '9999px',
            display: 'inline-block',
          } : {};
          return (
            <button key={w.id} data-testid={`sent-placed-${w.id}`} onClick={() => removeWord(w)} className="word-tile placed">
              <span style={pillStyle}>{w.text}</span>
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        {pool.map(w => {
          const gender = genderMap[w.text.toLowerCase()];
          const pillStyle = gender ? {
            background: gender === 'm' ? '#DBEAFE' : '#FCE7F3',
            color: gender === 'm' ? '#1E40AF' : '#9D174D',
            fontWeight: 'bold',
            padding: '0.125rem 0.375rem',
            borderRadius: '9999px',
            display: 'inline-block',
          } : {};
          return (
            <button key={w.id} data-testid={`sent-pool-${w.id}`} onClick={() => placeWord(w)} className="word-tile">
              <span style={pillStyle}>{w.text}</span>
            </button>
          );
        })}
      </div>

      {feedback ? (
        <div className="space-y-3">
          <div className="text-center py-3 px-4 rounded-xl"
            style={{ background: feedbackBg, color: feedbackColor }}>
            <div className="font-bold text-sm" data-testid="sent-feedback">
              {feedback.ok ? 'Perfect! ✓' : 'Not quite — here\'s the answer:'}
            </div>
            <div className="text-sm font-bold mt-1" style={{ color: feedbackColor }}>
              {feedback.target}
            </div>
            <button onClick={() => speak(feedback.target, languageConfig.sourceLanguage, 0.72)}
              className="speak-btn mt-2 mx-auto"><Volume2 size={11} /> Hear it</button>
          </div>
          <button data-testid="sent-next" onClick={next}
            className="w-full py-3 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2"
            style={{ background: 'hsl(var(--primary))', boxShadow: '0 4px 14px rgba(198,11,30,0.3)' }}>
            Next <ArrowRight size={16} />
          </button>
        </div>
      ) : (
        <button data-testid="sent-check" onClick={check} disabled={placed.length === 0}
          className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all disabled:opacity-50"
          style={{ background: 'hsl(var(--primary))', boxShadow: '0 4px 14px rgba(198,11,30,0.3)' }}>
          Check sentence
        </button>
      )}
    </DrillShell>
  );
}
