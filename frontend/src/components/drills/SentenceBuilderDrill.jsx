import React, { useState, useMemo } from 'react';
import { ArrowRight, Volume2 } from 'lucide-react';
import DrillShell from '../DrillShell';
import { shuffle, speak, playCorrect } from '../../utils/helpers';
import { SENT_POOL } from '../../data/drillData';

export default function SentenceBuilderDrill({ onAnswer, onDone, onBack, drillLength = 10 }) {
  const total = Math.min(drillLength, SENT_POOL.length);
  const queue = useMemo(() => shuffle(SENT_POOL).slice(0, total), [total]);
  const [idx, setIdx] = useState(0);
  const [pool, setPool] = useState([]);
  const [placed, setPlaced] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [correct, setCorrect] = useState(0);

  React.useEffect(() => {
    if (queue[idx]) {
      setPool(shuffle(queue[idx].words.map((w, i) => ({ id: i, text: w }))));
      setPlaced([]);
      setFeedback(null);
    }
  }, [idx, queue]);

  React.useEffect(() => {
    if (feedback) speak(feedback.target, 'es', 0.72);
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
    if (ok) playCorrect();
    setFeedback({ ok, target: targetSentence });
    onAnswer(targetSentence, ok);
    if (ok) setCorrect(c => c + 1);
  };

  const next = () => {
    if (idx + 1 >= queue.length) onDone(correct, queue.length);
    else setIdx(idx + 1);
  };

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
        {placed.map(w => (
          <button key={w.id} data-testid={`sent-placed-${w.id}`} onClick={() => removeWord(w)} className="word-tile placed">
            {w.text}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        {pool.map(w => (
          <button key={w.id} data-testid={`sent-pool-${w.id}`} onClick={() => placeWord(w)} className="word-tile">
            {w.text}
          </button>
        ))}
      </div>

      {feedback ? (
        <div className="space-y-3">
          <div className="text-center py-3 px-4 rounded-xl"
            style={{ background: feedback.ok ? '#DCFCE7' : '#FEE2E2', color: feedback.ok ? '#14532D' : '#991B1B' }}>
            <div className="font-bold text-sm" data-testid="sent-feedback">
              {feedback.ok ? 'Perfect! ✓' : 'Not quite — here\'s the answer:'}
            </div>
            <div className="text-sm font-bold mt-1" style={{ color: feedback.ok ? '#14532D' : '#991B1B' }}>
              {feedback.target}
            </div>
            <button onClick={() => speak(feedback.target, 'es', 0.72)}
              className="speak-btn mt-2 mx-auto"><Volume2 size={11} /> Hear it</button>
          </div>
          <button data-testid="sent-next" onClick={next}
            className="w-full py-3 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2"
            style={{ background: 'hsl(var(--primary))', boxShadow: '0 4px 14px rgba(198,11,30,0.3)' }}>
            Next <ArrowRight size={16} />
          </button>
        </div>
      ) : (
        <button data-testid="sent-check" onClick={check} disabled={pool.length > 0}
          className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all disabled:opacity-50"
          style={{ background: 'hsl(var(--primary))', boxShadow: '0 4px 14px rgba(198,11,30,0.3)' }}>
          Check sentence
        </button>
      )}
    </DrillShell>
  );
}
