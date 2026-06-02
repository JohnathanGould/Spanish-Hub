import React, { useState, useMemo } from 'react';
import { Volume2, Check, X, Image as ImageIcon } from 'lucide-react';
import DrillShell from '../DrillShell';
import WordImage from '../WordImage';
import { buildNoRepeatQueue, speak } from '../../utils/helpers';

export default function FlashcardDrill({ words, progress, onAnswer, onDone, onBack, drillLength = 10, sentence = false }) {
  const [mode, setMode] = useState(sentence ? 'sentences' : 'words'); // 'words' or 'sentences'
  const [direction, setDirection] = useState('es-en'); // 'es-en' or 'en-es'
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [correct, setCorrect] = useState(0);

  const hasSentences = useMemo(
    () => words.some(w => w.contextSentence && w.contextSentence.trim()),
    [words]
  );

  const wordQueue = useMemo(
    () => buildNoRepeatQueue(words, progress, drillLength),
    [words, progress, drillLength]
  );

  const sentenceQueue = useMemo(() => {
    const filtered = words.filter(w => w.contextSentence && w.contextSentence.trim());
    return buildNoRepeatQueue(filtered, progress, drillLength);
  }, [words, progress, drillLength]);

  const queue = mode === 'sentences' ? sentenceQueue : wordQueue;

  if (queue.length === 0) {
    return <DrillShell title="Flashcards" current={0} total={0} onBack={onBack}>
      <div className="text-center py-10" style={{ color: 'hsl(var(--muted-foreground))' }}>No words available</div>
    </DrillShell>;
  }

  const word = queue[idx] || queue[0];
  const isSentences = mode === 'sentences';
  const isEsEn = direction === 'es-en';
  const isEnEs = direction === 'en-es';

  const article = !isSentences && word.gender === 'm' ? 'el ' : !isSentences && word.gender === 'f' ? 'la ' : '';
  const canHint = !isSentences && (word.type === 'noun' || word.type === 'phrase');

  const frontLabel = isSentences ? 'Spanish sentence' : (isEsEn ? 'Spanish' : 'English');
  const frontText = isSentences ? word.contextSentence : (isEsEn ? `${article}${word.es}` : word.en);
  const backLabel = isSentences ? 'English' : (isEsEn ? 'English' : 'Spanish');
  const backText = isSentences ? (word.sentence?.en || '') : (isEsEn ? word.en : `${article}${word.es}`);
  const speakText = isSentences ? word.contextSentence : word.es;

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setIdx(0);
    setFlipped(false);
    setShowHint(false);
  };

  const handleFlip = () => {
    setFlipped(!flipped);
    if (!flipped) setTimeout(() => speak(speakText, 'es'), 50);
  };

  const next = (knew) => {
    setFlipped(false);
    setShowHint(false);
    setTimeout(() => {
      onAnswer(word.es, knew);
      if (knew) setCorrect(c => c + 1);
      if (idx + 1 >= queue.length) {
        onDone(correct + (knew ? 1 : 0), queue.length);
      } else {
        setIdx(idx + 1);
      }
    }, 520);
  };

  const handleDirectionChange = (dir) => {
    setDirection(dir);
    setFlipped(false);
    setShowHint(false);
  };

  return (
    <DrillShell title="Flashcards" subtitle={`Tap to flip · mark each ${sentence ? 'sentence' : 'word'} as known or learning`}
      current={idx + 1} total={queue.length} onBack={onBack}>

      {/* Mode toggle */}
      {/* TODO: re-lock when Paths built — requires completedPaths.length >= 1 */}
      {hasSentences && !sentence && (
        <div className="flex gap-2 mb-3">
          {[['words', '📝 Words'], ['sentences', '💬 Sentences']].map(([m, label]) => (
            <button
              key={m}
              onClick={() => handleModeChange(m)}
              className="flex-1 py-1.5 rounded-full text-xs font-bold border transition-all"
              style={{
                background: mode === m ? 'hsl(var(--primary))' : 'hsl(var(--card))',
                color: mode === m ? 'white' : 'hsl(var(--muted-foreground))',
                borderColor: mode === m ? 'hsl(var(--primary))' : 'hsl(var(--border))',
              }}>
              {label}
            </button>
          ))}
        </div>
      )}

      {/* Direction toggle — hidden in sentences mode */}
      {!isSentences && (
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => handleDirectionChange('es-en')}
            className="flex-1 py-1.5 rounded-full text-xs font-bold border transition-all"
            style={{
              background: isEsEn ? 'hsl(var(--primary))' : 'hsl(var(--card))',
              color: isEsEn ? 'white' : 'hsl(var(--muted-foreground))',
              borderColor: isEsEn ? 'hsl(var(--primary))' : 'hsl(var(--border))',
            }}>
            🇪🇸 Spanish → English
          </button>
          <button
            onClick={() => handleDirectionChange('en-es')}
            className="flex-1 py-1.5 rounded-full text-xs font-bold border transition-all"
            style={{
              background: isEnEs ? 'hsl(var(--primary))' : 'hsl(var(--card))',
              color: isEnEs ? 'white' : 'hsl(var(--muted-foreground))',
              borderColor: isEnEs ? 'hsl(var(--primary))' : 'hsl(var(--border))',
            }}>
            🇬🇧 English → Spanish
          </button>
        </div>
      )}

      <div className="flip-card mb-5" style={{ minHeight: 280 }}>
        <div className={`flip-inner ${flipped ? 'flipped' : ''}`} style={{ minHeight: 280 }}
          onClick={handleFlip}
          data-testid="flashcard-flip">

          {/* Front */}
          <div className="flip-front rounded-3xl p-6 flex flex-col items-center justify-center text-center cursor-pointer"
            style={{ minHeight: 280, background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
            <div className="text-xs uppercase tracking-wider mb-3" style={{ color: 'hsl(var(--muted-foreground))' }}>
              {frontLabel}
            </div>
            <div
              className={`font-serif font-black mb-3 ${isSentences ? 'text-xl leading-snug' : 'text-4xl'}`}
              style={{ color: 'hsl(var(--foreground))' }}
              data-testid="flashcard-front">
              {frontText}
            </div>
            {showHint && canHint && isEsEn && (
              <div className="w-3/4 max-w-[220px] mt-3" onClick={e => e.stopPropagation()} data-testid="flashcard-hint-image">
                <WordImage word={word} variant="card" />
              </div>
            )}
            <div className="text-xs mt-4" style={{ color: 'hsl(var(--muted-foreground))' }}>tap card to flip</div>
          </div>

          {/* Back */}
          <div className="flip-back rounded-3xl p-6 flex flex-col items-center justify-center text-center cursor-pointer"
            style={{ minHeight: 280, background: 'linear-gradient(135deg,#FFEDD5,#FEF3C7)', border: '1px solid hsl(var(--border))' }}>
            <div className="text-xs uppercase tracking-wider mb-3" style={{ color: '#92400E' }}>
              {backLabel}
            </div>
            <div
              className={`font-serif font-black mb-2 ${isSentences ? 'text-xl leading-snug' : 'text-3xl'}`}
              style={{ color: '#451A03' }}
              data-testid="flashcard-back">
              {backText}
            </div>
            {word.sentence && isEsEn && !isSentences && (
              <div className="text-xs mt-3 px-2" style={{ color: '#78350F' }}>
                <em>{word.sentence.es}</em>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 mb-5">
        <button data-testid="flashcard-speak" onClick={() => speak(speakText, 'es')}
          className="speak-btn">
          <Volume2 size={12} /> Hear Spanish
        </button>
        {canHint && !flipped && isEsEn && (
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

      {flipped && (
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
      )}
    </DrillShell>
  );
}
