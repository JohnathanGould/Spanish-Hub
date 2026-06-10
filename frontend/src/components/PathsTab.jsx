import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronRight, Lock, Check, Volume2, ImageOff } from 'lucide-react';
import {
  PATHS,
  getPath,
  getStop,
  getPathIdForStop,
  getStopWords,
  isPathComplete,
} from '../content/es-en/paths';
import { MASTER } from '../content/es-en/words';
import { speak } from '../utils/helpers';
import ChoiceDrill from './drills/ChoiceDrill';
import TypeDrill from './drills/TypeDrill';

// ─────────────────────────────────────────────
// Lock logic
// Path 1 Stop 1 (p1s1) — always unlocked
// Stop N unlocked when Stop N-1 ID is in completedStops[]
// First Stop of Path 2–12 unlocked when final Stop of previous Path is in completedStops[]
// ─────────────────────────────────────────────
function isStopUnlocked(stopId, completedStops) {
  if (stopId === 'p1s1') return true;
  if (completedStops.includes(stopId)) return true;

  const pathId = getPathIdForStop(stopId);
  if (!pathId) return false;
  const path = getPath(pathId);
  if (!path) return false;

  const stopIndex = path.stops.findIndex((s) => s.id === stopId);
  if (stopIndex === -1) return false;

  // First stop of a path (not Path 1) — unlocked when final stop of previous Path is completed
  if (stopIndex === 0) {
    const pathArrayIndex = PATHS.findIndex((p) => p.id === pathId);
    if (pathArrayIndex <= 0) return false;
    const prevPath = PATHS[pathArrayIndex - 1];
    const prevFinalStopId = prevPath.stops[prevPath.stops.length - 1].id;
    return completedStops.includes(prevFinalStopId);
  }

  // Otherwise — unlocked when previous stop in same path is completed
  const prevStopId = path.stops[stopIndex - 1].id;
  return completedStops.includes(prevStopId);
}

function isPathUnlocked(pathId, completedStops) {
  const path = getPath(pathId);
  if (!path) return false;
  return isStopUnlocked(path.stops[0].id, completedStops);
}

// ─────────────────────────────────────────────
// WordIntroCard — Phase 1 single-word introduction card
// Audio plays automatically 50ms after mount
// ─────────────────────────────────────────────
function WordIntroCard({ word, isLast, onNext }) {
  const [imgErr, setImgErr] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => speak(word.es), 50);
    return () => clearTimeout(t);
  }, [word.es]);

  return (
    <div className="flex flex-col items-center pt-2 gap-2">
      {/* Image with overlaid audio button */}
      <div style={{ position: 'relative', width: '100%', maxWidth: '320px', margin: '0 auto' }}>
        {!imgErr && word.imageUrl ? (
          <img
            src={word.imageUrl}
            alt={word.es}
            onError={() => setImgErr(true)}
            data-testid={`word-intro-image-${word.es}`}
            style={{ width: '100%', maxHeight: '55vw', objectFit: 'cover', borderRadius: '16px', display: 'block' }}
          />
        ) : (
          <div
            style={{ width: '100%', maxHeight: '55vw', borderRadius: '16px', background: 'hsl(var(--muted))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            data-testid={`word-intro-image-fallback-${word.es}`}
          >
            <ImageOff className="w-10 h-10" style={{ color: 'hsl(var(--muted-foreground))' }} />
          </div>
        )}
        {/* Audio button overlaid bottom-right */}
        <button
          type="button"
          aria-label={`Hear ${word.es}`}
          onClick={() => speak(word.es)}
          data-testid={`word-intro-speak-${word.es}`}
          className="flex items-center justify-center transition-transform active:scale-95"
          style={{
            position: 'absolute',
            bottom: '10px',
            right: '10px',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'rgba(0,0,0,0.55)',
            color: 'white',
            border: 'none',
            backdropFilter: 'blur(4px)',
          }}
        >
          <Volume2 className="w-5 h-5" />
        </button>
      </div>

      {/* Word and translation below image */}
      <div className="text-center">
        <p
          className="text-3xl font-bold"
          style={{ color: 'hsl(var(--foreground))' }}
          data-testid={`word-intro-es-${word.es}`}
        >
          {word.es}
        </p>
        <p
          className="text-base mt-1"
          style={{ color: 'hsl(var(--muted-foreground))' }}
          data-testid={`word-intro-en-${word.es}`}
        >
          {word.en}
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// buildFetchQueue — 20-item interleaved drill queue
// 4 rounds × 5 words, shuffled within each round
// ─────────────────────────────────────────────
function buildFetchQueue(words) {
  const drillTypes = ['es-en', 'en-es', 'hear-choose', 'type-en-es'];
  const queue = [];
  for (const drillType of drillTypes) {
    const round = words.map((word) => ({ wordId: word.es, drillType, word }));
    for (let i = round.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [round[i], round[j]] = [round[j], round[i]];
    }
    queue.push(...round);
  }
  for (let i = queue.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [queue[i], queue[j]] = [queue[j], queue[i]];
  }
  return queue;
}

const PASS_THRESHOLD = 0.80;

// ─────────────────────────────────────────────
// StopView — Stop detail screen + intro + fetch drill flow
// ─────────────────────────────────────────────
function StopView({
  stopId,
  onBack,
  onNextStop,
  onUpdateWordProgress,
  onAwardBones,
  onCompleteStop,
  fetchStopWords,
  progress = {},
  completedStops = [],
  completedPaths = [],
  onShowCertificate,
  onDrillAnswer,
}) {
  const stop = getStop(stopId);
  const pathId = getPathIdForStop(stopId);
  const path = getPath(pathId);

  const [phase, setPhase] = useState('preview'); // 'preview' | 'intro' | 'transition' | 'fetch' | 'results' | 'stop-complete' | 'intro-complete'
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [fetchQueue, setGauntletQueue] = useState([]);
  const [fetchIndex, setGauntletIndex] = useState(0);
  const [fetchCorrect, setGauntletCorrect] = useState(0);
  const fetchQueueRef = useRef([]);
  const [finalScore, setFinalScore] = useState(null);
  const [finalTotal, setFinalTotal] = useState(null);

  // ── Initial word list (for preview screen, before Begin reorders by FSRS weakness) ──
  const initialWordStrings = getStopWords(stopId);
  const initialWords = initialWordStrings.map((es) => {
    const entry = MASTER.find((w) => w.es === es);
    return entry || { es, en: es };
  });
  const [words, setWords] = useState(initialWords);

  if (!stop || !path) {
    return (
      <div className="p-6">
        <button
          type="button"
          data-testid="stop-view-back-btn"
          onClick={onBack}
          className="text-sm font-medium underline"
          style={{ color: 'hsl(var(--primary))' }}
        >
          ← Back to Paths
        </button>
        <p className="mt-6 text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
          Stop not found.
        </p>
      </div>
    );
  }

  // Resolve word strings into full MASTER entries; fall back to {es, en: es} if missing
  // (words state initialised at top; reordered by fetchStopWords on Begin tap)

  const startIntro = () => {
    setCurrentWordIndex(0);
    setPhase('intro');
  };

  const handleNext = () => {
    if (currentWordIndex >= words.length - 1) {
      setPhase('transition');
    } else {
      setCurrentWordIndex((i) => i + 1);
    }
  };

  // ── Phase: transition ──────────────────────────────────────────────
  if (phase === 'transition') {
    const startGauntlet = () => {
      const queue = buildFetchQueue(words);
      fetchQueueRef.current = queue;
      setGauntletQueue(queue);
      setGauntletIndex(0);
      setGauntletCorrect(0);
      setPhase('fetch');
    };

    return (
      <div className="p-4 pb-24" data-testid="stop-view-transition">
        <button
          type="button"
          data-testid="stop-view-back-btn"
          onClick={onBack}
          className="inline-flex items-center gap-1 text-sm font-medium mb-4"
          style={{ color: 'hsl(var(--primary))' }}
        >
          ← Back to Paths
        </button>
        <div
          className="rounded-2xl p-8 flex flex-col items-center text-center"
          style={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
        >
          <p className="text-2xl font-bold" style={{ color: 'hsl(var(--foreground))' }}>
            Now let&apos;s practice!
          </p>
          <button
            type="button"
            data-testid="stop-view-lets-go-btn"
            onClick={startGauntlet}
            className="w-full rounded-full py-3 mt-8 text-white font-bold transition-transform active:scale-95"
            style={{ background: 'hsl(var(--primary))' }}
          >
            Let&apos;s Go 🐾
          </button>
        </div>
      </div>
    );
  }

  // ── Phase: fetch ────────────────────────────────────────────────
  if (phase === 'fetch') {
    const currentItem = fetchQueueRef.current[fetchIndex];
    if (!currentItem) {
      return null;
    }

    const isLast = fetchQueueRef.current.length > 0 && fetchIndex >= fetchQueueRef.current.length - 1;

    const handleGauntletAnswer = (wordEs, isCorrect) => {
      if (onUpdateWordProgress) onUpdateWordProgress(wordEs, isCorrect, true);
      if (onDrillAnswer) onDrillAnswer(isCorrect);
      if (isCorrect) setGauntletCorrect((n) => n + 1);
    };

    const handleGauntletDone = () => {
      if (fetchQueueRef.current.length === 0) return;
      if (isLast) {
        setPhase('results');
      } else {
        setGauntletIndex((i) => i + 1);
      }
    };

    const handleGauntletBack = () => {
      if (fetchIndex > 0) {
        setGauntletIndex((i) => i - 1);
      } else {
        setPhase('transition');
      }
    };

    const drillWords = [currentItem.word, ...words.filter(w => w.es !== currentItem.word.es)];

    if (currentItem.drillType === 'type-en-es') {
      return (
        <TypeDrill
          key={`fetch-${fetchIndex}-${currentItem.word.es}`}
          mode="type-en-es"
          words={drillWords}
          progress={{}}
          drillLength={1}
          onAnswer={handleGauntletAnswer}
          onDone={handleGauntletDone}
          onBack={handleGauntletBack}
        />
      );
    }

    return (
      <ChoiceDrill
        key={`fetch-${fetchIndex}-${currentItem.word.es}`}
        mode={currentItem.drillType}
        words={drillWords}
        progress={{}}
        drillLength={1}
        onAnswer={handleGauntletAnswer}
        onDone={handleGauntletDone}
        onBack={handleGauntletBack}
      />
    );
  }

  // ── Phase: results ─────────────────────────────────────────────────
  if (phase === 'results') {
    const passed = fetchQueue.length > 0 &&
      (fetchCorrect / fetchQueue.length) >= PASS_THRESHOLD;

    if (passed) {
      setFinalScore(fetchCorrect);
      setFinalTotal(fetchQueue.length);
      if (onCompleteStop) onCompleteStop(stopId);
      if (onAwardBones) onAwardBones(2);
      setPhase('stop-complete');
      return null;
    }

    const handleRetry = () => {
      const queue = buildFetchQueue(words);
      fetchQueueRef.current = queue;
      setGauntletQueue(queue);
      setGauntletIndex(0);
      setGauntletCorrect(0);
      setPhase('transition');
    };

    return (
      <div className="p-4 pb-24" data-testid="stop-view-results">
        <button type="button" data-testid="stop-view-back-btn" onClick={onBack}
          className="inline-flex items-center gap-1 text-sm font-medium mb-4"
          style={{ color: 'hsl(var(--primary))' }}>
          ← Back to Paths
        </button>
        <div className="rounded-2xl p-8 flex flex-col items-center text-center"
          style={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}>
          <p className="text-2xl font-bold" style={{ color: 'hsl(var(--foreground))' }}
            data-testid="results-title">
            Almost there! 🐾
          </p>
          <p className="text-base mt-3" style={{ color: 'hsl(var(--muted-foreground))' }}
            data-testid="results-score">
            You got {fetchCorrect} of {fetchQueue.length} correct — you need 80% to advance
          </p>
          <button type="button" data-testid="results-retry-btn" onClick={handleRetry}
            className="w-full rounded-full py-3 mt-8 text-white font-bold transition-transform active:scale-95"
            style={{ background: 'hsl(var(--primary))' }}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // ── Phase: stop-complete (only reachable on pass) ─────────────────
  if (phase === 'stop-complete') {
    // Detect path completion deterministically (don't rely on prop-update timing)
    const pathDoneNow =
      isPathComplete(path.id, [...completedStops, stopId]) ||
      completedPaths.includes(path.id);

    return (
      <div className="p-4 pb-24" data-testid="stop-complete">
        <button
          type="button"
          data-testid="stop-view-back-btn"
          onClick={onBack}
          className="inline-flex items-center gap-1 text-sm font-medium mb-4"
          style={{ color: 'hsl(var(--primary))' }}
        >
          ← Back to Paths
        </button>

        <div
          className="rounded-2xl p-8 flex flex-col items-center text-center"
          style={{
            background: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
          }}
        >
          <p
            className="text-2xl font-bold"
            style={{ color: 'hsl(var(--foreground))' }}
            data-testid="stop-complete-title"
          >
            Stop Complete! 🐾
          </p>
          <p
            className="text-base mt-2"
            style={{ color: 'hsl(var(--muted-foreground))' }}
            data-testid="stop-complete-stop-title"
          >
            {stop.title}
          </p>

          <p
            className="text-base font-semibold mt-6"
            style={{ color: 'hsl(var(--foreground))' }}
            data-testid="stop-complete-bones"
          >
            You earned 2 bones 🦴
          </p>
          {finalScore !== null && (
            <p className="text-sm mt-1" style={{ color: 'hsl(var(--muted-foreground))' }}>
              You scored {finalScore} of {finalTotal} — {Math.round((finalScore/finalTotal)*100)}%
            </p>
          )}
          <p
            className="text-sm mt-2"
            style={{ color: 'hsl(var(--muted-foreground))' }}
          >
            Keep going — the next Stop is unlocked
          </p>

          {pathDoneNow && (
            <p
              className="text-base font-semibold mt-6"
              style={{ color: 'hsl(var(--primary))' }}
              data-testid="stop-complete-path-done"
            >
              🎉 You completed {path.title}!
            </p>
          )}

          {pathDoneNow && onShowCertificate && (
            <button
              type="button"
              onClick={() => onShowCertificate(path.id)}
              className="w-full rounded-full font-bold py-3 mt-2"
              style={{ background: 'hsl(var(--primary))', color: 'white' }}
              data-testid="stop-complete-certificate-btn"
            >
              🎓 View Certificate →
            </button>
          )}

          <button
            type="button"
            data-testid="stop-complete-continue-btn"
            onClick={onNextStop || onBack}
            className="w-full rounded-full py-3 mt-8 text-white font-bold transition-transform active:scale-95"
            style={{ background: 'hsl(var(--primary))' }}
          >
            Continue to Next Stop →
          </button>
          <button
            type="button"
            data-testid="stop-complete-back-btn"
            onClick={onBack}
            className="mt-3 text-sm font-medium"
            style={{ color: 'hsl(var(--muted-foreground))' }}
          >
            Back to Paths
          </button>
        </div>
      </div>
    );
  }

  // ── Phase: intro-complete (reachable via Hear & Choose back) ─────
  if (phase === 'intro-complete') {
    return (
      <div className="p-4 pb-24" data-testid="stop-view-intro-complete">
        <button
          type="button"
          data-testid="stop-view-back-btn"
          onClick={onBack}
          className="inline-flex items-center gap-1 text-sm font-medium mb-4"
          style={{ color: 'hsl(var(--primary))' }}
        >
          ← Back to Paths
        </button>

        <div
          className="rounded-2xl p-8 flex flex-col items-center text-center"
          style={{
            background: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
          }}
        >
          <p
            className="text-xl font-semibold"
            style={{ color: 'hsl(var(--foreground))' }}
          >
            You&apos;ve met all the words in this Stop 🐾
          </p>
          <p
            className="text-sm mt-2"
            style={{ color: 'hsl(var(--muted-foreground))' }}
          >
            Drills coming soon
          </p>

          <button
            type="button"
            data-testid="stop-view-back-to-stop-btn"
            onClick={() => {
              setPhase('preview');
              setCurrentWordIndex(0);
            }}
            className="mt-8 inline-flex items-center gap-1 text-sm font-medium"
            style={{ color: 'hsl(var(--primary))' }}
          >
            ← Back to Stop
          </button>
        </div>
      </div>
    );
  }

  // ── Phase: intro (word cards) ────────────────────────────────────
  if (phase === 'intro') {
    const word = words[currentWordIndex];
    const isLast = currentWordIndex === words.length - 1;

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: 'calc(100vh - 136px)',
          padding: '16px',
          boxSizing: 'border-box',
        }}
      >
        <div>
          <button type="button" data-testid="stop-view-back-btn" onClick={onBack}
            className="inline-flex items-center gap-1 text-sm font-medium mb-4"
            style={{ color: 'hsl(var(--primary))' }}>
            ← Back to Paths
          </button>
          <p className="text-xs uppercase tracking-wider mb-3"
            style={{ color: 'hsl(var(--muted-foreground))' }}
            data-testid="word-intro-progress">
            {stop.title} · Word {currentWordIndex + 1} of {words.length}
          </p>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '100%' }}>
            <WordIntroCard key={word.es} word={word} isLast={isLast} onNext={handleNext} />
          </div>
        </div>
        <div style={{ paddingTop: '12px' }}>
          <button type="button" data-testid="word-intro-next-btn" onClick={handleNext}
            className="w-full rounded-full py-3 text-white font-bold transition-transform active:scale-95"
            style={{ background: 'hsl(var(--primary))' }}>
            {isLast ? 'Ready to Practice →' : 'Next →'}
          </button>
        </div>
      </div>
    );
  }

  // ── Phase: preview (default — word list + Begin) ─────────────────
  return (
    <div className="p-4 pb-24" data-testid={`stop-view-${stopId}`}>
      <button
        type="button"
        data-testid="stop-view-back-btn"
        onClick={onBack}
        className="inline-flex items-center gap-1 text-sm font-medium mb-4"
        style={{ color: 'hsl(var(--primary))' }}
      >
        ← Back to Paths
      </button>

      {/* Header card — matches Path header gradient style */}
      <div
        className="rounded-2xl p-5 mb-5 text-white relative overflow-hidden"
        style={{
          background:
            'linear-gradient(135deg, hsl(var(--primary)), hsl(352 75% 65%))',
        }}
      >
        <p className="text-[11px] uppercase tracking-wider opacity-80">
          {path.title}
        </p>
        <h2 className="text-2xl font-semibold mt-1" data-testid="stop-view-title">
          {stop.title}
        </h2>
        <p className="text-sm opacity-90 mt-1" data-testid="stop-view-subtitle">
          {stop.titleEn}
        </p>
      </div>

      {/* Word list */}
      <div className="flex flex-col gap-2 mb-6" data-testid="stop-view-word-list">
        {words.map((word, idx) => (
          <div
            key={`${word.es}-${idx}`}
            className="rounded-2xl p-4 flex items-center justify-between gap-3"
            style={{
              background: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
            }}
            data-testid={`stop-view-word-${word.es}`}
          >
            <div className="flex-1 min-w-0">
              <p
                className="text-lg font-bold truncate"
                style={{ color: 'hsl(var(--foreground))' }}
              >
                {word.es}
              </p>
              <p
                className="text-sm truncate"
                style={{ color: 'hsl(var(--muted-foreground))' }}
              >
                {word.en}
              </p>
            </div>
            <button
              type="button"
              aria-label={`Hear ${word.es}`}
              data-testid={`stop-view-speak-${word.es}`}
              onClick={() => speak(word.es)}
              className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-transform active:scale-95"
              style={{
                background: 'hsl(var(--muted))',
                color: 'hsl(var(--primary))',
                border: '1px solid hsl(var(--border))',
              }}
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      {/* Begin button — starts word introduction */}
      <button
        type="button"
        data-testid="stop-view-begin-btn"
        onClick={startIntro}
        className="w-full rounded-full py-3 text-white font-bold transition-transform active:scale-95"
        style={{ background: 'hsl(var(--primary))' }}
      >
        Begin
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────
// Main PathsTab component
// ─────────────────────────────────────────────
export default function PathsTab({
  completedStops = [],
  completedPaths = [],
  progress = {},
  initialStopId = null,
  onSelectStop,
  onUpdateWordProgress,
  onAwardBones,
  onCompleteStop,
  fetchStopWords,
  onShowCertificate,
  onDrillAnswer,
}) {
  const [expandedPathId, setExpandedPathId] = useState(null);
  // Auto-open Stop on mount when parent passes initialStopId (e.g. Home → Continue)
  const [selectedStopId, setSelectedStopId] = useState(() => initialStopId || null);
  const [lockedMessageStopId, setLockedMessageStopId] = useState(null);

  const getNextStopId = (currentStopId) => {
    for (const path of PATHS) {
      for (let i = 0; i < path.stops.length - 1; i++) {
        if (path.stops[i].id === currentStopId) return path.stops[i + 1].id;
      }
      if (path.stops[path.stops.length - 1].id === currentStopId) {
        const pathIndex = PATHS.indexOf(path);
        if (pathIndex < PATHS.length - 1) return PATHS[pathIndex + 1].stops[0].id;
      }
    }
    return null;
  };

  // Render StopView when a stop is selected
  if (selectedStopId) {
    return (
      <StopView
        stopId={selectedStopId}
        onBack={() => setSelectedStopId(null)}
        onNextStop={() => {
          let nextId = getNextStopId(selectedStopId);
          while (nextId && completedStops.includes(nextId)) {
            nextId = getNextStopId(nextId);
          }
          if (nextId) setSelectedStopId(nextId);
          else setSelectedStopId(null);
        }}
        onUpdateWordProgress={onUpdateWordProgress}
        onAwardBones={onAwardBones}
        onCompleteStop={onCompleteStop}
        fetchStopWords={fetchStopWords}
        progress={progress}
        completedStops={completedStops}
        completedPaths={completedPaths}
        onShowCertificate={onShowCertificate}
        onDrillAnswer={onDrillAnswer}
      />
    );
  }

  const togglePath = (pathId, unlocked) => {
    if (!unlocked) return;
    setExpandedPathId((curr) => (curr === pathId ? null : pathId));
  };

  const handleStopTap = (stopId, unlocked) => {
    if (!unlocked) {
      setLockedMessageStopId(stopId);
      // Auto-dismiss the message after 2.5s
      setTimeout(() => {
        setLockedMessageStopId((curr) => (curr === stopId ? null : curr));
      }, 2500);
      return;
    }
    setLockedMessageStopId(null);
    setSelectedStopId(stopId);
    if (typeof onSelectStop === 'function') onSelectStop(stopId);
  };

  return (
    <div className="p-4" data-testid="paths-tab">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
          Paths
        </h1>
        <p className="text-sm mt-1" style={{ color: 'hsl(var(--muted-foreground))' }}>
          Work through each Stop to build your Spanish step by step.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {PATHS.map((path, pathIndex) => {
          const unlocked = isPathUnlocked(path.id, completedStops);
          const complete = isPathComplete(path.id, completedStops) ||
            completedPaths.includes(path.id);
          const expanded = expandedPathId === path.id;

          const completedStopCount = path.stops.filter((s) =>
            completedStops.includes(s.id)
          ).length;

          return (
            <div key={path.id} data-testid={`path-row-${path.id}`}>
              {/* Path header */}
              <button
                type="button"
                data-testid={`path-header-${path.id}`}
                onClick={() => togglePath(path.id, unlocked)}
                disabled={!unlocked}
                className="rounded-2xl p-5 mb-2 text-white relative overflow-hidden w-full text-left transition-opacity"
                style={{
                  background: unlocked
                    ? 'hsl(var(--primary))'
                    : 'hsl(var(--muted))',
                  color: unlocked ? '#fff' : 'hsl(var(--muted-foreground))',
                  cursor: unlocked ? 'pointer' : 'not-allowed',
                  opacity: unlocked ? 1 : 0.75,
                }}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] uppercase tracking-wider opacity-80">
                      Path {pathIndex + 1} · {path.subLevel}
                    </p>
                    <h2 className="text-lg font-semibold mt-0.5 truncate">
                      {path.title}
                    </h2>
                    <p className="text-xs opacity-90 mt-0.5 truncate">
                      {path.titleEn}
                    </p>
                    <p className="text-[11px] mt-2 opacity-90">
                      {completedStopCount} / {path.stops.length} Stops
                      {complete ? ' · Complete' : ''}
                    </p>
                  </div>

                  <div className="flex items-center justify-center shrink-0">
                    {!unlocked ? (
                      <Lock className="w-5 h-5" />
                    ) : complete ? (
                      <Check className="w-5 h-5" />
                    ) : expanded ? (
                      <ChevronDown className="w-5 h-5" />
                    ) : (
                      <ChevronRight className="w-5 h-5" />
                    )}
                  </div>
                </div>
              </button>

              {/* Certificate button — completed Paths only */}
              {completedPaths.includes(path.id) && onShowCertificate && (
                <div className="flex justify-end mb-2">
                  <button
                    type="button"
                    onClick={() => onShowCertificate(path.id)}
                    className="text-xs font-bold px-3 py-1 rounded-full"
                    style={{ background: 'hsl(var(--primary))', color: 'white' }}
                    data-testid={`path-certificate-btn-${path.id}`}
                  >
                    🎓 Certificate
                  </button>
                </div>
              )}

              {/* Stops list (only when expanded and unlocked) */}
              {unlocked && expanded && (
                <div
                  className="flex flex-col gap-2 mb-2"
                  data-testid={`path-stops-${path.id}`}
                >
                  {path.stops.map((stop, stopIndex) => {
                    const stopUnlocked = isStopUnlocked(stop.id, completedStops);
                    const stopComplete = completedStops.includes(stop.id);
                    const showLockedMsg = lockedMessageStopId === stop.id;

                    return (
                      <div key={stop.id}>
                        <button
                          type="button"
                          data-testid={`stop-node-${stop.id}`}
                          onClick={() => handleStopTap(stop.id, stopUnlocked)}
                          className="drill-card w-full text-left"
                          style={{
                            background: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            opacity: stopUnlocked ? 1 : 0.65,
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold shrink-0"
                              style={{
                                background: stopComplete
                                  ? 'hsl(var(--primary))'
                                  : 'hsl(var(--muted))',
                                color: stopComplete
                                  ? '#fff'
                                  : 'hsl(var(--muted-foreground))',
                              }}
                            >
                              {stopComplete ? (
                                <Check className="w-4 h-4" />
                              ) : !stopUnlocked ? (
                                <Lock className="w-4 h-4" />
                              ) : (
                                stopIndex + 1
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p
                                className="text-sm font-semibold truncate"
                                style={{ color: 'hsl(var(--foreground))' }}
                              >
                                {stop.title}
                              </p>
                              <p
                                className="text-xs truncate"
                                style={{ color: 'hsl(var(--muted-foreground))' }}
                              >
                                {stop.titleEn}
                              </p>
                            </div>
                            <ChevronRight
                              className="w-4 h-4 shrink-0"
                              style={{ color: 'hsl(var(--muted-foreground))' }}
                            />
                          </div>
                        </button>

                        {showLockedMsg && (
                          <div
                            data-testid={`stop-locked-msg-${stop.id}`}
                            className="mt-2 px-3 py-2 rounded-lg text-xs"
                            style={{
                              background: 'hsl(var(--muted))',
                              color: 'hsl(var(--muted-foreground))',
                              border: '1px solid hsl(var(--border))',
                            }}
                          >
                            Complete the previous Stop to unlock this one 🐾
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
