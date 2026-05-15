import React, { useState, useMemo } from 'react';
import { Volume2, Check, X, Image as ImageIcon } from 'lucide-react';
import DrillShell from '../DrillShell';
import WordImage from '../WordImage';
import { spacedRepetitionSort, speak } from '../../utils/helpers';

export default function FlashcardDrill({ words, progress, onAnswer, onDone, onBack, drillLength = 10 }) {
  const queue = useMemo(() => spacedRepetitionSort(words, progress).slice(0, drillLength), [words, progress, drillLength]);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [correct, setCorrect] = useState(0);

  if (queue.length === 0) {
    return <DrillShell title="Flashcards" current={0} total={0} onBack={onBack}>
      <div className="text-center py-10" style={{ color: 'hsl(var(--muted-foreground))' }}>No words available</div>
    </DrillShell>;
  }

  const word = queue[idx];
  const article = word.gender === 'm' ? 'el ' : word.gender === 'f' ? 'la ' : '';
  const canHint = word.type === 'noun' || word.type === 'phrase';

  const next = (knew) => {
    onAnswer(word.es, knew);
    if (knew) setCorrect(c => c + 1);
    if (idx + 1 >= queue.length) {
      onDone(correct + (knew ? 1 : 0), queue.length);
    } else {
      setIdx(idx + 1);
      setFlipped(false);
      setShowHint(false);
    }
  };

  return (
    <DrillShell title="Flashcards" subtitle="Tap to flip · mark as known or learning"
      current={idx + 1} total={queue.length} onBack={onBack}>
      <div className="flip-card mb-5" style={{ minHeight: 280 }}>
        <div className={`flip-inner ${flipped ? 'flipped' : ''}`} style={{ minHeight: 280 }}
          onClick={() => { setFlipped(!flipped); if (!flipped) speak(word.es, 'es'); }}
          data-testid="flashcard-flip">
          <div className="flip-front rounded-3xl p-6 flex flex-col items-center justify-center text-center cursor-pointer"
            style={{ minHeight: 280, background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
            <div className="text-xs uppercase tracking-wider mb-3" style={{ color: 'hsl(var(--muted-foreground))' }}>Spanish</div>
            <div className="font-serif text-4xl font-black mb-3" style={{ color: 'hsl(var(--foreground))' }} data-testid="flashcard-front">
              {article}{word.es}
            </div>
            {showHint && canHint && (
              <div className="w-3/4 max-w-[220px] mt-3" onClick={e => e.stopPropagation()} data-testid="flashcard-hint-image">
                <WordImage word={word} variant="card" />
              </div>
            )}
            <div className="text-xs mt-4" style={{ color: 'hsl(var(--muted-foreground))' }}>tap card to flip</div>
          </div>
          <div className="flip-back rounded-3xl p-6 flex flex-col items-center justify-center text-center cursor-pointer"
            style={{ minHeight: 280, background: 'linear-gradient(135deg,#FFEDD5,#FEF3C7)', border: '1px solid hsl(var(--border))' }}>
            <div className="text-xs uppercase tracking-wider mb-3" style={{ color: '#92400E' }}>English</div>
            <div className="font-serif text-3xl font-black mb-2" style={{ color: '#451A03' }} data-testid="flashcard-back">
              {word.en}
            </div>
            {word.sentence && (
              <div className="text-xs mt-3 px-2" style={{ color: '#78350F' }}>
                <em>{word.sentence.es}</em>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 mb-5">
        <button data-testid="flashcard-speak" onClick={() => speak(word.es, 'es')}
          className="speak-btn">
          <Volume2 size={12} /> Hear Spanish
        </button>
        {canHint && !flipped && (
          <button data-testid="flashcard-hint-btn" onClick={() => setShowHint(s => !s)}
            className="speak-btn"
            style={{
              background: showHint ? 'hsl(47 91% 95%)' : undefined,
              borderColor: showHint ? 'hsl(47 91% 60%)' : undefined,
              color: showHint ? '#78350F' : undefined,
            }}>
            <ImageIcon size={12} /> {showHint ? 'Hide hint' : 'Show hint'}
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button data-testid="flashcard-still-learning" onClick={() => next(false)}
          className="py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 border-2 transition-all hover:-translate-y-0.5"
          style={{ background: '#FEE2E2', borderColor: '#FCA5A5', color: '#991B1B' }}>
          <X size={16} /> Still learning
        </button>
        <button data-testid="flashcard-knew-it" onClick={() => next(true)}
          className="py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 border-2 transition-all hover:-translate-y-0.5"
          style={{ background: '#DCFCE7', borderColor: '#86EFAC', color: '#14532D' }}>
          <Check size={16} /> I knew it
        </button>
      </div>
    </DrillShell>
  );
}
