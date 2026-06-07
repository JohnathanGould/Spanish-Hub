import React, { useState, useEffect } from 'react';
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
    <div
      className="rounded-2xl p-6 flex flex-col items-center text-center"
      style={{
        background: 'hsl(var(--card))',
        border: '1px solid hsl(var(--border))',
      }}
      data-testid={`word-intro-card-${word.es}`}
    >
      {/* Image */}
      <div
        className="w-full rounded-2xl overflow-hidden flex items-center justify-center mb-6"
        style={{
          background: 'hsl(var(--muted))',
          maxHeight: '12rem',
        }}
      >
        {!imgErr && word.imageUrl ? (
          <img
            src={word.imageUrl}
            alt={word.es}
            onError={() => setImgErr(true)}
            className="rounded-2xl w-full max-h-48 object-cover"
            data-testid={`word-intro-image-${word.es}`}
          />
        ) : (
          <div
            className="flex items-center justify-center w-full"
            style={{ height: '12rem', color: 'hsl(var(--muted-foreground))' }}
            data-testid={`word-intro-image-fallback-${word.es}`}
          >
            <ImageOff className="w-10 h-10" />
          </div>
        )}
      </div>

      {/* Spanish word */}
      <p
        className="text-3xl font-bold"
        style={{ color: 'hsl(var(--foreground))' }}
        data-testid={`word-intro-es-${word.es}`}
      >
        {word.es}
      </p>

      {/* English label — only screen in the Paths flow where English appears */}
      <p
        className="text-sm mt-1"
        style={{ color: 'hsl(var(--muted-foreground))' }}
        data-testid={`word-intro-en-${word.es}`}
      >
        {word.en}
      </p>

      {/* Speaker button */}
      <button
        type="button"
        aria-label={`Hear ${word.es}`}
        onClick={() => speak(word.es)}
        data-testid={`word-intro-speak-${word.es}`}
        className="w-12 h-12 rounded-full flex items-center justify-center mt-6 transition-transform active:scale-95"
        style={{
          background: 'hsl(var(--muted))',
          color: 'hsl(var(--primary))',
          border: '1px solid hsl(var(--border))',
        }}
      >
        <Volume2 className="w-6 h-6" />
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────
// buildDrillQueue — assigns drill type per word based on FSRS stability
//   stability === 0   → 'type-en-es'        (Produce, written)
//   stability < 7     → 'hear-choose-en-es' (Produce, recognition)
//   stability ≥ 7     → 'es-en'             (Recognition, SP→EN)
// ─────────────────────────────────────────────
function buildDrillQueue(words, progress) {
  return words.map((word) => {
    const prog = progress[word.es] || { stability: 0, outputCorrect: 0 };
    if (prog.stability === 0) return { word, drillType: 'type-en-es' };
    if (prog.stability < 7) return { word, drillType: 'hear-choose-en-es' };
    return { word, drillType: 'es-en' };
  });
}

// ─────────────────────────────────────────────
// StopView — Stop detail screen + Phase 1 word introduction + dynamic drill flow
// ─────────────────────────────────────────────
function StopView({
  stopId,
  onBack,
  onUpdateWordProgress,
  onAwardBones,
  onCompleteStop,
  fetchStopWords,
  progress = {},
  completedStops = [],
  completedPaths = [],
}) {
  const stop = getStop(stopId);
  const pathId = getPathIdForStop(stopId);
  const path = getPath(pathId);

  const [phase, setPhase] = useState('preview'); // 'preview' | 'intro' | 'dynamic-drill' | 'stop-complete' | 'intro-complete'
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [drillQueue, setDrillQueue] = useState([]);
  const [drillQueueIndex, setDrillQueueIndex] = useState(0);

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
    const orderedWords = fetchStopWords ? fetchStopWords(stopId) : words;
    setWords(orderedWords);
    setCurrentWordIndex(0);
    setPhase('intro');
  };

  const handleNext = () => {
    if (currentWordIndex >= words.length - 1) {
      const queue = buildDrillQueue(words, progress);
      setDrillQueue(queue);
      setDrillQueueIndex(0);
      setPhase('dynamic-drill');
    } else {
      setCurrentWordIndex((i) => i + 1);
    }
  };

  // ── Phase: dynamic-drill (FSRS-driven per-word drill selection) ──
  if (phase === 'dynamic-drill') {
    const currentDrill = drillQueue[drillQueueIndex];
    if (!currentDrill) {
      // Defensive: empty queue → bounce back to intro-complete
      setPhase('intro-complete');
      return null;
    }

    const isLast = drillQueueIndex >= drillQueue.length - 1;

    const handleAnswer = (wordEs, isCorrect) => {
      if (onUpdateWordProgress) onUpdateWordProgress(wordEs, isCorrect, true);
      if (isCorrect && onAwardBones) onAwardBones(1);
    };

    const handleDone = () => {
      if (isLast) {
        if (onCompleteStop) onCompleteStop(stopId);
        if (onAwardBones) onAwardBones(2);
        setPhase('stop-complete');
      } else {
        setDrillQueueIndex((i) => i + 1);
      }
    };

    const handleDrillBack = () => {
      if (drillQueueIndex > 0) {
        setDrillQueueIndex((i) => i - 1);
      } else {
        setPhase('intro-complete');
      }
    };

    const singleWord = [currentDrill.word];

    if (currentDrill.drillType === 'type-en-es') {
      return (
        <TypeDrill
          key={`drill-${drillQueueIndex}-${currentDrill.word.es}`}
          mode="type-en-es"
          words={singleWord}
          progress={{}}
          drillLength={1}
          onAnswer={handleAnswer}
          onDone={handleDone}
          onBack={handleDrillBack}
        />
      );
    }

    if (currentDrill.drillType === 'hear-choose-en-es') {
      return (
        <ChoiceDrill
          key={`drill-${drillQueueIndex}-${currentDrill.word.es}`}
          mode="hear-choose-en-es"
          words={singleWord}
          progress={{}}
          drillLength={1}
          onAnswer={handleAnswer}
          onDone={handleDone}
          onBack={handleDrillBack}
        />
      );
    }

    // 'es-en' (recognition, SP→EN)
    return (
      <ChoiceDrill
        key={`drill-${drillQueueIndex}-${currentDrill.word.es}`}
        mode="es-en"
        words={singleWord}
        progress={{}}
        drillLength={1}
        onAnswer={handleAnswer}
        onDone={handleDone}
        onBack={handleDrillBack}
      />
    );
  }

  // ── Phase: stop-complete (after Phase 3 Type It EN→SP) ────────────
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

          <button
            type="button"
            data-testid="stop-complete-continue-btn"
            onClick={onBack}
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

  // ── Phase: intro (Phase 1 word cards) ───────
  if (phase === 'intro') {
    const word = words[currentWordIndex];
    const isLast = currentWordIndex === words.length - 1;

    return (
      <div className="p-4 pb-24" data-testid={`stop-view-intro-${stopId}`}>
        <button
          type="button"
          data-testid="stop-view-back-btn"
          onClick={onBack}
          className="inline-flex items-center gap-1 text-sm font-medium mb-4"
          style={{ color: 'hsl(var(--primary))' }}
        >
          ← Back to Paths
        </button>

        <p
          className="text-xs uppercase tracking-wider mb-3"
          style={{ color: 'hsl(var(--muted-foreground))' }}
          data-testid="word-intro-progress"
        >
          {stop.title} · Word {currentWordIndex + 1} of {words.length}
        </p>

        <WordIntroCard
          key={word.es}
          word={word}
          isLast={isLast}
          onNext={handleNext}
        />

        <button
          type="button"
          data-testid="word-intro-next-btn"
          onClick={handleNext}
          className="w-full rounded-full py-3 mt-6 text-white font-bold transition-transform active:scale-95"
          style={{ background: 'hsl(var(--primary))' }}
        >
          {isLast ? 'Ready to Practice →' : 'Next →'}
        </button>
      </div>
    );
  }

  // ── Phase: preview (default — word list + Begin) ─────
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

      {/* Begin button — starts Phase 1 word introduction */}
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
  onSelectStop,
  onUpdateWordProgress,
  onAwardBones,
  onCompleteStop,
  fetchStopWords,
}) {
  const [expandedPathId, setExpandedPathId] = useState(null);
  const [selectedStopId, setSelectedStopId] = useState(null);
  const [lockedMessageStopId, setLockedMessageStopId] = useState(null);

  // Render StopView when a stop is selected
  if (selectedStopId) {
    return (
      <StopView
        stopId={selectedStopId}
        onBack={() => setSelectedStopId(null)}
        onUpdateWordProgress={onUpdateWordProgress}
        onAwardBones={onAwardBones}
        onCompleteStop={onCompleteStop}
        fetchStopWords={fetchStopWords}
        progress={progress}
        completedStops={completedStops}
        completedPaths={completedPaths}
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
