import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, Lock, Check, Volume2, ImageOff } from 'lucide-react';
import {
  PATHS,
  getPath,
  getStop,
  getPathIdForStop,
  getStopWords,
} from '../content/es-en/paths';
import { MASTER } from '../content/es-en/words';
import { PATH_STAGES } from '../data/pathTiers';
import { speak, shuffle, sanitiseForTTS } from '../utils/helpers';
import { languageConfig } from '../config/languageConfig';
import ChoiceDrill from './drills/ChoiceDrill';
import TypeDrill from './drills/TypeDrill';
import FillBlankDrill from './drills/FillBlankDrill';
import GenderDrill from './drills/GenderDrill';
import SentenceBuilderDrill from './drills/SentenceBuilderDrill';
import VocabFillBlankDrill from './drills/VocabFillBlankDrill';

// ─────────────────────────────────────────────
// Lock logic
// Path 1 Stop 1 (p1s1) — always unlocked
// Stop N unlocked when Stop N-1 ID is in completedStops[]
// First Stop of Path 2–12 unlocked when final Stop of previous Path is in completedStops[]
// ─────────────────────────────────────────────
function isStopUnlocked(stopId, completedStops, completedPaths = []) {
  if (stopId === 'p1s1') return true;
  if (completedStops.includes(stopId)) return true;

  const pathId = getPathIdForStop(stopId);
  if (!pathId) return false;
  const path = getPath(pathId);
  if (!path) return false;

  const stopIndex = path.stops.findIndex((s) => s.id === stopId);
  if (stopIndex === -1) return false;

  // First stop of a path (not Path 1) — unlocked when previous Path is in completedPaths
  if (stopIndex === 0) {
    const pathArrayIndex = PATHS.findIndex((p) => p.id === pathId);
    if (pathArrayIndex <= 0) return false;
    const prevPath = PATHS[pathArrayIndex - 1];
    return completedPaths.includes(prevPath.id);
  }

  // Otherwise — unlocked when previous stop in same path is completed
  const prevStopId = path.stops[stopIndex - 1].id;
  return completedStops.includes(prevStopId);
}

function isPathUnlocked(pathId, completedStops, completedPaths = []) {
  const path = getPath(pathId);
  if (!path) return false;
  return isStopUnlocked(path.stops[0].id, completedStops, completedPaths);
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
            style={{ width: '100%', maxWidth: '240px', aspectRatio: '1 / 1', objectFit: 'cover', borderRadius: '16px', display: 'block', margin: '0 auto' }}
          />
        ) : (
          <div
            style={{ width: '100%', maxWidth: '240px', aspectRatio: '1 / 1', borderRadius: '16px', background: 'hsl(var(--muted))', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}
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
        <div className="flex items-center justify-center gap-2 flex-wrap mb-1">
          {word.gender ? (
            <p
              className="text-2xl font-bold px-3 py-1 rounded-2xl"
              data-testid={`word-intro-es-${word.es}`}
              style={{
                background: word.gender === 'm' ? '#DBEAFE' : '#FCE7F3',
                color: word.gender === 'm' ? '#1E40AF' : '#9D174D',
              }}
            >
              {word.gender === 'm' ? 'el' : 'la'} {word.es}
            </p>
          ) : (
            <p
              className="text-3xl font-bold"
              style={{ color: 'hsl(var(--foreground))' }}
              data-testid={`word-intro-es-${word.es}`}
            >
              {word.es}
            </p>
          )}
        </div>
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
// buildFetchQueue — two shuffled decks, drawn in parallel
//
// Word deck:  5 Stop words, reshuffled when exhausted.
//   On reshuffle, words are weighted by FSRS weakness —
//   lower stability = higher weight = appears more often.
//
// Drill deck: 4 drill types, reshuffled when exhausted.
//   On reshuffle, drill types are weighted by desirable difficulty —
//   higher failure rate in drillStats = higher weight = appears more often.
//   On first session (no drillStats yet) all drill types are equal weight.
//
// Produces exactly FETCH_LENGTH items.
// ─────────────────────────────────────────────
const FETCH_LENGTH = 20;
const DRILL_TYPES = [
  'es-en',                    // read
  'hear-choose-es',           // hear
  'hear-choose-en',           // hear
  'listen-type-es',           // hear
  'listen-type-sentence-es',  // hear
  'en-es',                    // produce
  'type-en-es',               // produce
  'listen-type-en',           // produce
  'listen-type-sentence-en',  // produce
  'gender',                   // produce
  'vocab-fill-blank-typed',   // produce
  'vocab-fill-blank-choice',  // produce
];

const DRILL_DIMENSION = {
  'es-en':                    'read',
  'hear-choose-es':           'hear',
  'hear-choose-en':           'hear',
  'listen-type-es':           'hear',
  'listen-type-sentence-es':  'hear',
  'en-es':                    'produce',
  'type-en-es':               'produce',
  'listen-type-en':           'produce',
  'listen-type-sentence-en':  'produce',
  'gender':                   'produce',
};

function weightedShuffle(items, weights) {
  // Returns a new array of items ordered by weighted random draw without replacement.
  // Each item's probability of being drawn next is proportional to its weight.
  const pool = items.map((item, i) => ({ item, weight: weights[i] }));
  const result = [];
  while (pool.length > 0) {
    const total = pool.reduce((sum, e) => sum + e.weight, 0);
    let r = Math.random() * total;
    let idx = pool.length - 1; // fallback to last item if floating point never hits 0
    for (let i = 0; i < pool.length; i++) {
      if (r < pool[i].weight) { idx = i; break; }
      r -= pool[i].weight;
    }
    result.push(pool[idx].item);
    pool.splice(idx, 1);
  }
  return result;
}

function buildWordDeck(words, progress) {
  const now = new Date();
  const weights = words.map((word) => {
    const p = progress[word.es] || {};
    if (p.produce?.due && new Date(p.produce.due) <= now) return 3;
    if (p.hear?.due && new Date(p.hear.due) <= now) return 2;
    if (p.read?.due && new Date(p.read.due) <= now) return 1;
    return 0.5;
  });
  return weightedShuffle(words, weights);
}

function buildDrillDeck(progress, words) {
  // Weight each drill type by its aggregate failure rate across the Stop's words.
  // failure rate = w / (c + w) from drillStats[drillType].
  // No drillStats yet → equal weight of 1 for all types.
  const weights = DRILL_TYPES.map((dt) => {
    let totalC = 0;
    let totalW = 0;
    for (const word of words) {
      const stats = progress[word.es]?.drillStats?.[dt];
      if (stats) { totalC += stats.c || 0; totalW += stats.w || 0; }
    }
    const total = totalC + totalW;
    if (total === 0) return 1;
    return Math.max(0.1, totalW / total);
  });
  return weightedShuffle(DRILL_TYPES, weights);
}

function reshuffleWithNoBoundaryRepeat(buildDeck, lastItem, getKey) {
  // Builds a new deck and swaps the first item if it matches the last item
  // from the previous deck — prevents repeats at deck boundaries.
  const deck = buildDeck();
  if (deck.length > 1 && getKey(deck[0]) === getKey(lastItem)) {
    const swapIdx = Math.floor(Math.random() * (deck.length - 1)) + 1;
    [deck[0], deck[swapIdx]] = [deck[swapIdx], deck[0]];
  }
  return deck;
}

const enforceMinGap = (queue, minGap = 3) => {
  const groups = {};
  queue.forEach(item => {
    if (!groups[item.wordId]) groups[item.wordId] = [];
    groups[item.wordId].push(item);
  });
  const sorted = Object.values(groups).sort((a, b) => b.length - a.length);
  const result = [];
  const maxAttempts = queue.length * 10;
  let attempts = 0;
  const pool = [];
  const maxLen = Math.max(...sorted.map(g => g.length));
  for (let i = 0; i < maxLen; i++) {
    sorted.forEach(group => {
      if (group[i]) pool.push(group[i]);
    });
  }
  const remaining = [...pool];
  const deferred = [];
  for (let i = 0; i < queue.length && attempts < maxAttempts; attempts++) {
    const source = deferred.length > 0 && deferred[0].deferredAt <= i - minGap
      ? deferred
      : remaining;
    let placed = false;
    for (let j = 0; j < source.length; j++) {
      const candidate = source[j];
      const recentWords = result.slice(-minGap).map(r => r.wordId);
      if (!recentWords.includes(candidate.wordId)) {
        result.push(candidate);
        source.splice(j, 1);
        placed = true;
        i++;
        break;
      }
    }
    if (!placed && remaining.length > 0) {
      const item = remaining.shift();
      deferred.push({ ...item, deferredAt: i });
    }
  }
  deferred.forEach(item => {
    const { deferredAt, ...clean } = item;
    result.push(clean);
  });
  return result;
};

export function buildFetchQueue(words, progress = {}, length = FETCH_LENGTH) {
  // Deduplicate words by es field to prevent repeats from duplicate entries
  const uniqueWords = words.filter((w, i, arr) => arr.findIndex(x => x.es === w.es) === i);
  if (uniqueWords.length === 0) return [];

  const maxPerWord = Math.ceil(length / uniqueWords.length);
  const cappedWordPool = uniqueWords.flatMap(word => Array(maxPerWord).fill(word)).slice(0, length);
  const shuffledWordPool = shuffle(cappedWordPool);

  let drillDeck = buildDrillDeck(progress, uniqueWords);
  const queue = [];
  for (let i = 0; i < shuffledWordPool.length; i++) {
    if (drillDeck.length === 0) {
      drillDeck = buildDrillDeck(progress, uniqueWords);
    }
    const word = shuffledWordPool[i];
    let drillType = drillDeck.shift();
    if (drillType === 'gender' && !(word.type === 'noun' && (word.gender === 'm' || word.gender === 'f'))) {
      drillType = 'en-es';
    }
    queue.push({ wordId: word.es, drillType, word });
  }

  const spaced = enforceMinGap(queue, 3);
  return spaced;
}

const PATH_FETCH_LENGTH = 25;
const PATH_FETCH_PASS_THRESHOLD = 0.80;

function buildPathWordPool(pathId) {
  const path = getPath(pathId);
  if (!path) return [];
  const wordStrings = path.stops.flatMap((stop) => getStopWords(stop.id));
  return wordStrings
    .map((es) => MASTER.find((w) => w.es === es))
    .filter(Boolean);
}

function buildPathFetchQueue(pathWords, progress) {
  const uniqueWords = pathWords.filter((w, i, arr) => arr.findIndex((x) => x.es === w.es) === i);

  const maxPerWord = Math.ceil(PATH_FETCH_LENGTH / uniqueWords.length);
  const cappedWordPool = uniqueWords.flatMap(word => Array(maxPerWord).fill(word)).slice(0, PATH_FETCH_LENGTH);
  const shuffledWordPool = shuffle(cappedWordPool);

  let drillDeck = buildDrillDeck(progress, uniqueWords);
  const queue = [];
  for (let i = 0; i < shuffledWordPool.length; i++) {
    if (drillDeck.length === 0) {
      drillDeck = buildDrillDeck(progress, uniqueWords);
    }
    const word = shuffledWordPool[i];
    let drillType = drillDeck.shift();
    if (drillType === 'gender' && !(word.type === 'noun' && (word.gender === 'm' || word.gender === 'f'))) {
      drillType = 'en-es';
    }
    queue.push({ wordId: word.es, drillType, word });
  }

  const spaced = enforceMinGap(queue, 3);
  return spaced;
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
  onSpendBones,
  bones = 0,
  onCompleteStop,
  onCompletePathFetch,
  fetchStopWords,
  progress = {},
  completedStops = [],
  completedPaths = [],
  onShowCertificate,
  onDrillAnswer,
  strictTyping,
  onDrillActiveChange,
}) {
  const stop = getStop(stopId);
  const pathId = getPathIdForStop(stopId);
  const path = getPath(pathId);
  const pathNum = PATHS.findIndex(p => p.id === pathId) + 1;

  const [phase, setPhase] = useState('preview'); // 'preview' | 'intro' | 'transition' | 'fetch' | 'results' | 'stop-complete' | 'path-fetch' | 'path-fetch-result' | 'path-fetch-pass' | 'path-fetch-fail' | 'intro-complete'
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [fetchQueue, setFetchQueue] = useState([]);
  const [fetchIndex, setFetchIndex] = useState(0);
  const [fetchCorrect, setFetchCorrect] = useState(0);
  const fetchQueueRef = useRef([]);
  const pathFetchQueueRef = useRef([]);
  const [pathFetchQueue, setPathFetchQueue] = useState([]);
  const [pathFetchIndex, setPathFetchIndex] = useState(0);
  const [pathFetchCorrect, setPathFetchCorrect] = useState(0);
  const [pathFetchWrongWords, setPathFetchWrongWords] = useState([]);
  const [finalScore, setFinalScore] = useState(null);
  const [finalTotal, setFinalTotal] = useState(null);
  const hasFiredRef = useRef(false);

  // ── Initial word list (for preview screen, before Begin reorders by FSRS weakness) ──
  const initialWordStrings = getStopWords(stopId);
  const initialWords = initialWordStrings.map((es) => {
    const entry = MASTER.find((w) => w.es === es);
    return entry || { es, en: es };
  });
  const [words, setWords] = useState(initialWords);

  const stopFetchPassed = fetchQueue.length > 0 && (fetchCorrect / fetchQueue.length) >= PASS_THRESHOLD;

  useEffect(() => {
    if (phase === 'results' && stopFetchPassed && !hasFiredRef.current) {
      hasFiredRef.current = true;
      if (onAwardBones) onAwardBones(2);
    }
  }, [phase, stopFetchPassed, onAwardBones]);

  // ── Signal active-drill state up to SpanishHub so the top Header can hide during Fetch ──
  useEffect(() => {
    onDrillActiveChange?.(phase === 'fetch');
    return () => onDrillActiveChange?.(false);
  }, [phase, onDrillActiveChange]);

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
    const startFetch = () => {
      const queue = buildFetchQueue(words, progress);
      fetchQueueRef.current = queue;
      setFetchQueue(queue);
      setFetchIndex(0);
      setFetchCorrect(0);
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
            onClick={startFetch}
            className="w-full rounded-full py-3 mt-8 text-white font-bold transition-transform active:scale-95"
            style={{ background: '#16a34a' }}
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

    const handleFetchAnswer = (wordEs, isCorrect) => {
      if (onUpdateWordProgress) onUpdateWordProgress(wordEs, isCorrect, true, currentItem.drillType);
      if (onDrillAnswer) onDrillAnswer(isCorrect);
      if (isCorrect) {
        setFetchCorrect((n) => n + 1);
      }
    };

    const handleFetchDone = () => {
      if (fetchQueueRef.current.length === 0) return;
      if (isLast) {
        setPhase('results');
      } else {
        setFetchIndex((i) => i + 1);
      }
    };

    const handleFetchBack = () => {
      if (fetchIndex > 0) {
        setFetchIndex((i) => i - 1);
      } else {
        setPhase('transition');
      }
    };

    // ── Word Skip: costs 10 bones, removes current word from queue without scoring.
    // Removing (not just advancing) keeps the pass ratio fair: the skipped word is
    // not counted toward correct or total. ──
    const handleSkip = () => {
      if ((bones || 0) < 10) return;
      const ok = onSpendBones ? onSpendBones(10) : false;
      if (!ok) return;
      const newQueue = fetchQueueRef.current.filter((_, i) => i !== fetchIndex);
      fetchQueueRef.current = newQueue;
      setFetchQueue(newQueue);
      if (fetchIndex >= newQueue.length) {
        setPhase('results');
      }
      // else: fetchIndex unchanged, now points at the next item; drillKey change remounts drill
    };

    // drillWords: target word first, then distractors for choice display
    const drillWords = [currentItem.word, ...words.filter(w => w.es !== currentItem.word.es)];

    // forcedProgress: give the target word a very high wrong count so spacedRepetitionSort
    // always scores it highest (weight 5 via p.w > p.c * 0.5 branch).
    // Distractors get s:6 so they score 0.5. Max distractor score = 0.5 * 1.0 = 0.5.
    // Min target score = 5 * 0.0001 = 0.0005 — target always wins.
    const forcedProgress = {};
    drillWords.forEach((w, i) => {
      forcedProgress[w.es] = i === 0
        ? { s: 0, c: 0, w: 999 }   // target: weight 5, always drawn first
        : { s: 6, c: 99, w: 0 };   // distractor: weight 0.5, never drawn first
    });

    // Word Skip — rendered in the same row as the drill's Check/Continue button via
    // DrillShell's skipControl slot, so it stays visible above the keyboard on typing drills.
    const skipControl = (
      <button
        type="button"
        data-testid="fetch-skip-word-btn"
        onClick={handleSkip}
        disabled={(bones || 0) < 10}
        className="speak-btn disabled:opacity-40 flex-shrink-0"
        style={{ color: '#b45309' }}
      >
        Skip word 🦴 (10 bones)
      </button>
    );

    const drillKey = `fetch-${fetchIndex}-${currentItem.word.es}`;
    const drillType = currentItem.drillType;
    const sharedWordProps = {
      words: drillWords,
      progress: forcedProgress,
      drillLength: 1,
      counterOverride: `${fetchIndex + 1} / ${FETCH_LENGTH}`,
      skipControl,
      onAnswer: handleFetchAnswer,
      onDone: handleFetchDone,
      onBack: handleFetchBack,
      strictMode: strictTyping,
    };

    const renderDrill = () => {
      if (drillType === 'type-en-es') {
        return <TypeDrill key={drillKey} mode="type-en-es" {...sharedWordProps} headerOffset={90} />;
      }
      if (drillType === 'listen-type-es') {
        return <TypeDrill key={drillKey} mode="listen-type" {...sharedWordProps} headerOffset={90} />;
      }
      if (drillType === 'listen-type-en') {
        return <TypeDrill key={drillKey} mode="listen-type-en-es" {...sharedWordProps} headerOffset={90} />;
      }
      if (drillType === 'listen-type-sentence-es') {
        return <TypeDrill key={drillKey} mode="listen-type-sentence" {...sharedWordProps} headerOffset={90} />;
      }
      if (drillType === 'listen-type-sentence-en') {
        return <TypeDrill key={drillKey} mode="listen-type-sentence-en-es" {...sharedWordProps} headerOffset={90} />;
      }
      if (drillType === 'hear-choose-es') {
        return <ChoiceDrill key={drillKey} mode="hear-choose" {...sharedWordProps} headerOffset={80} />;
      }
      if (drillType === 'hear-choose-en') {
        return <ChoiceDrill key={drillKey} mode="hear-choose-en-es" {...sharedWordProps} headerOffset={80} />;
      }
      if (drillType === 'gender') {
        if (!(currentItem.word.type === 'noun' && (currentItem.word.gender === 'm' || currentItem.word.gender === 'f'))) {
          return <ChoiceDrill key={drillKey} mode="en-es" {...sharedWordProps} headerOffset={80} />;
        }
        return <GenderDrill key={drillKey} {...sharedWordProps} />;
      }
      if (drillType === 'vocab-fill-blank-typed' || drillType === 'vocab-fill-blank-choice') {
        return <VocabFillBlankDrill key={drillKey} mode={drillType === 'vocab-fill-blank-typed' ? 'typed' : 'choice'} {...sharedWordProps} headerOffset={90} />;
      }
      return <ChoiceDrill key={drillKey} mode={drillType} {...sharedWordProps} headerOffset={80} />;
    };

    return renderDrill();
  }

  // ── Phase: results ─────────────────────────────────────────────────
  if (phase === 'results') {
    const passed = fetchQueue.length > 0 &&
      (fetchCorrect / fetchQueue.length) >= PASS_THRESHOLD;

    if (passed) {
      setFinalScore(fetchCorrect);
      setFinalTotal(fetchQueue.length);
      if (onCompleteStop) onCompleteStop(stopId);
      setPhase('stop-complete');
      return null;
    }

    const handleRetry = () => {
      const queue = buildFetchQueue(words, progress);
      fetchQueueRef.current = queue;
      setFetchQueue(queue);
      setFetchIndex(0);
      setFetchCorrect(0);
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
            style={{ background: '#16a34a' }}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // ── Phase: stop-complete (only reachable on pass) ─────────────────
  if (phase === 'stop-complete') {
    const isLastStop = path.stops[path.stops.length - 1].id === stopId;
    const pathAlreadyComplete = completedPaths.includes(path.id);

    const startPathFetch = () => {
      const pathWords = buildPathWordPool(path.id);
      const queue = buildPathFetchQueue(pathWords, progress);
      pathFetchQueueRef.current = queue;
      setPathFetchQueue(queue);
      setPathFetchIndex(0);
      setPathFetchCorrect(0);
      setPathFetchWrongWords([]);
      setPhase('path-fetch');
    };

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

          {pathAlreadyComplete && (
            <p
              className="text-base font-semibold mt-4"
              style={{ color: 'hsl(var(--primary))' }}
              data-testid="stop-complete-path-done"
            >
              🎉 Path {pathNum} — {path.title} complete!
            </p>
          )}

          {isLastStop && !pathAlreadyComplete ? (
            <>
              <p className="text-sm mt-4" style={{ color: 'hsl(var(--muted-foreground))' }}>
                All 5 Stops done — time for the Path Challenge!
              </p>
              <button
                type="button"
                data-testid="stop-complete-path-challenge-btn"
                onClick={startPathFetch}
                className="w-full rounded-full py-3 mt-6 text-white font-bold transition-transform active:scale-95"
                style={{ background: '#16a34a' }}
              >
                Start Path Challenge 🏆
              </button>
            </>
          ) : (
            <>
              {!isLastStop && (
                <p className="text-sm mt-4" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  Keep going — the next Stop is unlocked
                </p>
              )}
              <button
                type="button"
                data-testid="stop-complete-continue-btn"
                onClick={isLastStop ? onBack : onNextStop}
                className="w-full rounded-full py-3 mt-6 text-white font-bold transition-transform active:scale-95"
                style={{ background: '#16a34a' }}
              >
                {isLastStop ? 'Back to Paths' : 'Continue to Next Stop →'}
              </button>
            </>
          )}

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

  // ── Phase: path-fetch ────────────────────────────────────────────
  if (phase === 'path-fetch') {
    const currentItem = pathFetchQueueRef.current[pathFetchIndex];
    if (!currentItem) return null;

    const isLast = pathFetchQueueRef.current.length > 0 && pathFetchIndex >= pathFetchQueueRef.current.length - 1;

    const handlePathFetchAnswer = (wordEs, isCorrect) => {
      if (onUpdateWordProgress) onUpdateWordProgress(wordEs, isCorrect, true, currentItem.drillType);
      if (onDrillAnswer) onDrillAnswer(isCorrect);
      if (isCorrect) {
        setPathFetchCorrect((n) => n + 1);
      } else {
        const word = currentItem.word;
        setPathFetchWrongWords((prev) =>
          prev.some((w) => w.es === word.es) ? prev : [...prev, word]
        );
      }
    };

    const handlePathFetchDone = () => {
      if (pathFetchQueueRef.current.length === 0) return;
      if (isLast) {
        setPhase('path-fetch-result');
      } else {
        setPathFetchIndex((i) => i + 1);
      }
    };

    const handlePathFetchBack = () => {
      if (pathFetchIndex > 0) {
        setPathFetchIndex((i) => i - 1);
      } else {
        setPhase('stop-complete');
      }
    };

    const allPathWords = pathFetchQueueRef.current.reduce((acc, item) => {
      if (!acc.some((w) => w.es === item.word.es)) acc.push(item.word);
      return acc;
    }, []);
    const drillWords = [currentItem.word, ...allPathWords.filter((w) => w.es !== currentItem.word.es)];
    const forcedProgress = {};
    drillWords.forEach((w, i) => {
      forcedProgress[w.es] = i === 0
        ? { s: 0, c: 0, w: 999 }
        : { s: 6, c: 99, w: 0 };
    });

    const drillKey = `path-fetch-${pathFetchIndex}-${currentItem.word.es}`;
    const drillType = currentItem.drillType;
    const sharedWordProps = {
      words: drillWords,
      progress: forcedProgress,
      drillLength: 1,
      counterOverride: `${pathFetchIndex + 1} / ${PATH_FETCH_LENGTH}`,
      onAnswer: handlePathFetchAnswer,
      onDone: handlePathFetchDone,
      onBack: handlePathFetchBack,
      strictMode: strictTyping,
    };

    if (drillType === 'type-en-es') {
      return <TypeDrill key={drillKey} mode="type-en-es" {...sharedWordProps} headerOffset={90} />;
    }
    if (drillType === 'listen-type-es') {
      return <TypeDrill key={drillKey} mode="listen-type" {...sharedWordProps} headerOffset={90} />;
    }
    if (drillType === 'listen-type-en') {
      return <TypeDrill key={drillKey} mode="listen-type-en-es" {...sharedWordProps} headerOffset={90} />;
    }
    if (drillType === 'listen-type-sentence-es') {
      return <TypeDrill key={drillKey} mode="listen-type-sentence" {...sharedWordProps} headerOffset={90} />;
    }
    if (drillType === 'listen-type-sentence-en') {
      return <TypeDrill key={drillKey} mode="listen-type-sentence-en-es" {...sharedWordProps} headerOffset={90} />;
    }
    if (drillType === 'hear-choose-es') {
      return <ChoiceDrill key={drillKey} mode="hear-choose" {...sharedWordProps} headerOffset={80} />;
    }
    if (drillType === 'hear-choose-en') {
      return <ChoiceDrill key={drillKey} mode="hear-choose-en-es" {...sharedWordProps} headerOffset={80} />;
    }
    if (drillType === 'gender') {
      if (!(currentItem.word.type === 'noun' && (currentItem.word.gender === 'm' || currentItem.word.gender === 'f'))) {
        return <ChoiceDrill key={drillKey} mode="en-es" {...sharedWordProps} headerOffset={80} />;
      }
      return <GenderDrill key={drillKey} {...sharedWordProps} />;
    }
    if (drillType === 'vocab-fill-blank-typed' || drillType === 'vocab-fill-blank-choice') {
      return <VocabFillBlankDrill key={drillKey} mode={drillType === 'vocab-fill-blank-typed' ? 'typed' : 'choice'} {...sharedWordProps} headerOffset={90} />;
    }
    return <ChoiceDrill key={drillKey} mode={drillType} {...sharedWordProps} headerOffset={80} />;
  }

  // ── Phase: path-fetch-result (internal transition) ───────────────
  if (phase === 'path-fetch-result') {
    const passed = pathFetchQueue.length > 0 &&
      (pathFetchCorrect / pathFetchQueue.length) >= PATH_FETCH_PASS_THRESHOLD;
    if (passed) {
      if (onCompletePathFetch) onCompletePathFetch(path.id, true);
      setPhase('path-fetch-pass');
    } else {
      setPhase('path-fetch-fail');
    }
    return null;
  }

  // ── Phase: path-fetch-pass ────────────────────────────────────────
  if (phase === 'path-fetch-pass') {
    return (
      <div className="p-4 pb-24" data-testid="path-fetch-pass">
        <div
          className="rounded-2xl p-8 flex flex-col items-center text-center"
          style={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
        >
          <p className="text-2xl font-bold" style={{ color: 'hsl(var(--foreground))' }}
            data-testid="path-fetch-pass-title">
            Path Complete! 🎉
          </p>
          <p className="text-base mt-2" style={{ color: 'hsl(var(--muted-foreground))' }}>
            You mastered all 25 words in Path {pathNum} — {path.title}
          </p>
          <p className="text-base font-semibold mt-6" style={{ color: 'hsl(var(--foreground))' }}
            data-testid="path-fetch-pass-reward">
            +75 XP · 15 bones 🦴
          </p>
          {pathFetchQueue.length > 0 && (
            <p className="text-sm mt-1" style={{ color: 'hsl(var(--muted-foreground))' }}>
              You scored {pathFetchCorrect} of {pathFetchQueue.length} — {Math.round((pathFetchCorrect / pathFetchQueue.length) * 100)}%
            </p>
          )}
          {pathFetchWrongWords.length > 0 && (
            <div className="mt-4 w-full text-left">
              <p className="text-sm font-semibold mb-2" style={{ color: 'hsl(var(--muted-foreground))' }}>
                Words to review:
              </p>
              <div className="flex flex-col gap-1">
                {pathFetchWrongWords.map((w) => (
                  <div key={w.es} className="rounded-lg px-3 py-2 flex justify-between text-sm"
                    style={{ background: 'hsl(var(--muted))', border: '1px solid hsl(var(--border))' }}>
                    <span className="font-semibold" style={{ color: 'hsl(var(--foreground))' }}>{w.es}</span>
                    <span style={{ color: 'hsl(var(--muted-foreground))' }}>{w.en}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          <button
            type="button"
            data-testid="path-fetch-pass-continue-btn"
            onClick={onBack}
            className="w-full rounded-full py-3 mt-3 font-bold transition-transform active:scale-95"
            style={{ background: 'hsl(var(--muted))', color: 'hsl(var(--foreground))' }}
          >
            Back to Paths
          </button>
        </div>
      </div>
    );
  }

  // ── Phase: path-fetch-fail ────────────────────────────────────────
  if (phase === 'path-fetch-fail') {
    return (
      <div className="p-4 pb-24" data-testid="path-fetch-fail">
        <div
          className="rounded-2xl p-8 flex flex-col items-center text-center"
          style={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
        >
          <p className="text-2xl font-bold" style={{ color: 'hsl(var(--foreground))' }}
            data-testid="path-fetch-fail-title">
            Almost there! 🐾
          </p>
          <p className="text-sm mt-2" style={{ color: 'hsl(var(--muted-foreground))' }}>
            You got {pathFetchCorrect} of {pathFetchQueue.length} correct — you need 80% to pass
          </p>
          <p className="text-sm mt-3" style={{ color: 'hsl(var(--muted-foreground))' }}>
            Keep going — you&apos;ve got this! 🐾
          </p>
          {pathFetchWrongWords.length > 0 && (
            <div className="mt-4 w-full text-left">
              <p className="text-sm font-semibold mb-2" style={{ color: 'hsl(var(--muted-foreground))' }}>
                Words to review:
              </p>
              <div className="flex flex-col gap-1">
                {pathFetchWrongWords.map((w) => (
                  <div key={w.es} className="rounded-lg px-3 py-2 flex justify-between text-sm"
                    style={{ background: 'hsl(var(--muted))', border: '1px solid hsl(var(--border))' }}>
                    <span className="font-semibold" style={{ color: 'hsl(var(--foreground))' }}>{w.es}</span>
                    <span style={{ color: 'hsl(var(--muted-foreground))' }}>{w.en}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          <button
            type="button"
            data-testid="path-fetch-fail-keep-practising-btn"
            onClick={onBack}
            className="w-full rounded-full py-3 mt-6 text-white font-bold transition-transform active:scale-95"
            style={{ background: 'hsl(var(--primary))' }}
          >
            Keep Practising
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
          height: 'calc(100vh - 180px)',
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
            style={{ background: '#16a34a' }}>
            {isLast ? 'Ready to Practice →' : 'Next →'}
          </button>
        </div>
      </div>
    );
  }

  // ── Phase: preview (default — word list + Begin) ─────────────────
  return (
    <>
    <div className="p-4 pb-[140px]" data-testid={`stop-view-${stopId}`}>
      {/* Header card — matches Path header gradient style */}
      <div
        className="rounded-2xl p-2 mb-3 text-white relative overflow-hidden"
        style={{
          background:
            'linear-gradient(135deg, #16A34A, #22c55e)',
        }}
      >
        <p className="text-[11px] uppercase tracking-wider opacity-80">
          Path {pathNum} — {path.title} · Stop {path.stops.findIndex(s => s.id === stopId) + 1} of {path.stops.length}
        </p>
        <h2 className="text-lg font-semibold mt-0.5" data-testid="stop-view-title">
          {stop.title}
        </h2>
        <p className="text-sm opacity-90 mt-0.5" data-testid="stop-view-subtitle">
          {stop.titleEn}
        </p>
      </div>

      {/* Word list */}
      <div className="flex flex-col gap-1 mb-3" data-testid="stop-view-word-list">
        {words.map((word, idx) => (
          <div
            key={`${word.es}-${idx}`}
            className="rounded-xl px-3 py-1 flex items-center justify-between gap-2"
            style={{
              background: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
            }}
            data-testid={`stop-view-word-${word.es}`}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                {word.gender ? (
                  <p className="text-sm font-bold px-1.5 py-0.5 rounded-full truncate" style={{
                    background: word.gender === 'm' ? '#DBEAFE' : '#FCE7F3',
                    color: word.gender === 'm' ? '#1E40AF' : '#9D174D',
                  }}>
                    {word.gender === 'm' ? 'el' : 'la'} {word.es}
                  </p>
                ) : (
                  <p
                    className="text-sm font-bold truncate"
                    style={{ color: 'hsl(var(--foreground))' }}
                  >
                    {word.es}
                  </p>
                )}
              </div>
              <p
                className="text-xs truncate"
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
              className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform active:scale-95"
              style={{
                background: 'hsl(var(--muted))',
                color: 'hsl(var(--primary))',
                border: '1px solid hsl(var(--border))',
              }}
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
    <div style={{ position: 'fixed', bottom: '80px', left: 0, right: 0, padding: '8px 16px', zIndex: 50 }}>
      <div className="flex gap-2">
        <button
          type="button"
          data-testid="stop-view-back-btn"
          onClick={onBack}
          className="flex-1 rounded-full py-2 font-bold transition-transform active:scale-95"
          style={{ background: 'hsl(var(--destructive))', color: 'white' }}
        >
          ← Paths
        </button>
        <button
          type="button"
          data-testid="stop-view-begin-btn"
          onClick={startIntro}
          className="flex-1 rounded-full py-2 text-white font-bold transition-transform active:scale-95"
          style={{ background: '#16a34a' }}
        >
          Continue →
        </button>
      </div>
    </div>
    </>
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
  onSpendBones,
  bones = 0,
  onCompleteStop,
  onCompletePathFetch,
  fetchStopWords,
  onShowCertificate,
  onDrillAnswer,
  strictTyping,
  onDrillActiveChange,
}) {
  const [selectedPathId, setSelectedPathId] = useState(null);
  // Auto-open Stop on mount when parent passes initialStopId (e.g. Home → Continue)
  const [selectedStopId, setSelectedStopId] = useState(() => initialStopId || null);
  const [lockedMessageStopId, setLockedMessageStopId] = useState(null);
  const [selectedStage, setSelectedStage] = useState(null);
  const [selectedTier, setSelectedTier] = useState(null);

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
        key={selectedStopId}
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
        onSpendBones={onSpendBones}
        bones={bones}
        onCompleteStop={onCompleteStop}
        onCompletePathFetch={onCompletePathFetch}
        fetchStopWords={fetchStopWords}
        progress={progress}
        completedStops={completedStops}
        completedPaths={completedPaths}
        onShowCertificate={onShowCertificate}
        onDrillAnswer={onDrillAnswer}
        strictTyping={strictTyping}
        onDrillActiveChange={onDrillActiveChange}
      />
    );
  }

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

  if (selectedPathId) {
    const path = getPath(selectedPathId);
    if (path) return (
      <div className="p-4 pb-12" data-testid="paths-tab">
        <button
          type="button"
          onClick={() => setSelectedPathId(null)}
          className="inline-flex items-center gap-1 text-sm font-medium mb-2"
          style={{ color: 'hsl(var(--primary))' }}
        >
          ← Back
        </button>
        <div className="mb-2">
          <h1 className="text-2xl font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
            Path {PATHS.findIndex(p => p.id === path.id) + 1} — {path.title}
          </h1>
          <p className="text-sm mt-1" style={{ color: 'hsl(var(--muted-foreground))' }}>
            {path.titleEn}
          </p>
        </div>
        <div className="flex flex-col gap-1.5" data-testid={`path-stops-${path.id}`}>
          {path.stops.map((stop, stopIndex) => {
            const stopUnlocked = isStopUnlocked(stop.id, completedStops, completedPaths);
            const stopComplete = completedStops.includes(stop.id);
            const showLockedMsg = lockedMessageStopId === stop.id;

            return (
              <div key={stop.id}>
                <button
                  type="button"
                  data-testid={`stop-node-${stop.id}`}
                  onClick={() => handleStopTap(stop.id, stopUnlocked)}
                  className="drill-card w-full text-left"
                  style={
                    stopComplete
                      ? { background: '#0891b2', border: '1px solid #0891b2' }
                      : stopUnlocked
                      ? { background: '#16A34A', border: '1px solid #16A34A' }
                      : { background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', opacity: 0.65 }
                  }
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold shrink-0"
                      style={
                        stopComplete
                          ? { background: 'transparent', color: '#fff' }
                          : stopUnlocked
                          ? { background: 'transparent', color: '#fff' }
                          : { background: 'hsl(var(--muted))', color: 'hsl(var(--muted-foreground))' }
                      }
                    >
                      {stopIndex + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-sm font-semibold truncate"
                        style={{
                          color: stopComplete
                            ? '#fff'
                            : stopUnlocked
                            ? '#fff'
                            : 'hsl(var(--foreground))',
                        }}
                      >
                        {stop.title}
                      </p>
                      <p
                        className="text-xs truncate"
                        style={{
                          color: stopComplete
                            ? 'rgba(255,255,255,0.85)'
                            : stopUnlocked
                            ? 'rgba(255,255,255,0.85)'
                            : 'hsl(var(--muted-foreground))',
                        }}
                      >
                        {stop.titleEn}
                      </p>
                    </div>
                    {stopComplete ? (
                      <Check className="w-4 h-4 shrink-0" style={{ color: '#fff' }} />
                    ) : stopUnlocked ? (
                      <span className="text-xs font-bold shrink-0" style={{ color: '#fff' }}>GO</span>
                    ) : (
                      <Lock className="w-4 h-4 shrink-0" style={{ color: 'hsl(var(--muted-foreground))' }} />
                    )}
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
      </div>
    );
  }

  const getTierState = (tier, allTiers, isStageUnlocked) => {
    if (!isStageUnlocked) return 'locked';
    if (tier.pathIds.every(id => completedPaths.includes(id))) return 'complete';
    const hasProgress = tier.pathIds.some(id => {
      const p = getPath(id);
      return p && p.stops.some(s => completedStops.includes(s.id));
    });
    if (hasProgress) return 'current';
    const tierIndex = allTiers.findIndex(t => t.id === tier.id);
    if (tierIndex === 0) return 'current';
    const prevTier = allTiers[tierIndex - 1];
    if (prevTier.pathIds.every(id => completedPaths.includes(id))) return 'current';
    return 'locked';
  };

  const getStageState = (stage, allStages) => {
    const stageIndex = allStages.findIndex(s => s.id === stage.id);
    let isStageUnlocked = false;
    if (stageIndex === 0) {
      isStageUnlocked = true;
    } else {
      const prevStage = allStages[stageIndex - 1];
      const prevTierStates = prevStage.tiers.map((t) => getTierState(t, prevStage.tiers, true));
      isStageUnlocked = prevTierStates.every(s => s === 'complete');
    }
    if (!isStageUnlocked) return 'locked';
    const tierStates = stage.tiers.map((t) => getTierState(t, stage.tiers, true));
    if (tierStates.every(s => s === 'complete')) return 'complete';
    return 'current';
  };

  const pillBg = (state) => {
    if (state === 'complete') return { background: '#0d9488', color: '#fff' };
    if (state === 'current')  return { background: '#16A34A', color: '#fff' };
    return { background: 'hsl(var(--muted))', color: 'hsl(var(--muted-foreground))', opacity: 0.75 };
  };

  // ── Level 1 — Stage list ─────────────────────────────────────────
  if (selectedStage === null) {
    return (
      <div className="p-4" data-testid="paths-tab">
        <div className="mb-4">
          <h1 className="text-2xl font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
            Choose your level
          </h1>
        </div>
        <div className="flex flex-col gap-3">
          {PATH_STAGES.map((stage) => (
            <button
              key={stage.id}
              type="button"
              onClick={() => setSelectedStage(stage)}
              className="rounded-2xl p-5 mb-2 text-white relative overflow-hidden w-full text-left transition-opacity"
              style={{ ...pillBg(getStageState(stage, PATH_STAGES)), cursor: 'pointer' }}
            >
              <p className="text-xl font-semibold">{stage.emoji} {stage.label}</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ── Level 2 — Tier list ──────────────────────────────────────────
  if (selectedTier === null) {
    return (
      <div className="p-4" data-testid="paths-tab">
        <button
          type="button"
          onClick={() => setSelectedStage(null)}
          className="inline-flex items-center gap-1 text-sm font-medium mb-4"
          style={{ color: 'hsl(var(--primary))' }}
        >
          ← Back
        </button>
        <div className="mb-4">
          <h1 className="text-2xl font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
            {selectedStage.label}
          </h1>
        </div>
        <div className="flex flex-col gap-3">
          {(() => {
            const selectedStageState = getStageState(selectedStage, PATH_STAGES);
            const isSelectedStageUnlocked = selectedStageState !== 'locked';
            return selectedStage.tiers.map((tier) => {
            const tierState = getTierState(tier, selectedStage.tiers, isSelectedStageUnlocked);
            return (
              <div key={tier.id}>
                <button
                  type="button"
                  onClick={() => setSelectedTier(tier)}
                  className="rounded-2xl p-5 mb-2 text-white relative overflow-hidden w-full text-left transition-opacity"
                  style={{ ...pillBg(tierState), cursor: 'pointer' }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-lg font-semibold">{tier.label}</p>
                    {tierState === 'complete' && <Check className="w-5 h-5" />}
                  </div>
                </button>
                {tierState === 'complete' && onShowCertificate && (
                  <button
                    type="button"
                    onClick={() => onShowCertificate(tier.id)}
                    className="w-full rounded-full font-bold py-2 mb-2 text-sm"
                    style={{ background: 'hsl(var(--primary))', color: 'white' }}
                    data-testid={`tier-certificate-btn-${tier.id}`}
                  >
                    🎓 Certificate
                  </button>
                )}
              </div>
            );
          });
          })()}
        </div>
      </div>
    );
  }

  // ── Level 3 — Path list (filtered to selectedTier.pathIds) ───────
  return (
    <div className="p-4" data-testid="paths-tab">
      <button
        type="button"
        onClick={() => setSelectedTier(null)}
        className="inline-flex items-center gap-1 text-sm font-medium mb-4"
        style={{ color: 'hsl(var(--primary))' }}
      >
        ← Back
      </button>
      <div className="mb-4">
        <h1 className="text-2xl font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
          {selectedTier.label}
        </h1>
      </div>

      <div className="flex flex-col gap-3">
        {PATHS.filter((p) => selectedTier.pathIds.includes(p.id)).map((path) => {
          const unlocked = isPathUnlocked(path.id, completedStops, completedPaths);
          const complete = completedPaths.includes(path.id);

          const completedStopCount = path.stops.filter((s) =>
            completedStops.includes(s.id)
          ).length;

          return (
            <div key={path.id} data-testid={`path-row-${path.id}`}>
              {/* Path header */}
              <button
                type="button"
                data-testid={`path-header-${path.id}`}
                onClick={() => unlocked && setSelectedPathId(path.id)}
                disabled={!unlocked}
                className="rounded-2xl p-5 mb-2 text-white relative overflow-hidden w-full text-left transition-opacity"
                style={{
                  background: complete
                    ? '#0891b2'
                    : unlocked
                    ? '#16A34A'
                    : 'hsl(var(--muted))',
                  color: unlocked ? '#fff' : 'hsl(var(--muted-foreground))',
                  cursor: unlocked ? 'pointer' : 'not-allowed',
                  opacity: unlocked ? 1 : 0.75,
                }}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-semibold truncate">
                      Path {PATHS.findIndex(p => p.id === path.id) + 1} — {path.title}
                    </h2>
                    <p className="text-xs opacity-90 mt-0.5 truncate">
                      {path.titleEn}
                    </p>
                  </div>

                  <div className="flex items-center justify-center shrink-0">
                    {!unlocked ? (
                      <Lock className="w-5 h-5" />
                    ) : complete ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <span
                        className="text-xs font-bold px-2 py-1 rounded-full text-center"
                        style={{ background: 'rgba(255,255,255,0.2)', minWidth: '2.5rem' }}
                      >
                        {completedStopCount}/{path.stops.length}
                      </span>
                    )}
                  </div>
                </div>
              </button>

            </div>
          );
        })}
      </div>
    </div>
  );
}
