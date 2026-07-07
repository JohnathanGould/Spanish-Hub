import React, { useState, useRef } from 'react';
import ChoiceDrill from './drills/ChoiceDrill';
import TypeDrill from './drills/TypeDrill';
import { shuffle } from '../utils/helpers';
import { MASTER } from '../content/es-en/words';
import {
  buildCognateQueue,
  getUnlockedPatterns,
  computePatternMastery,
  PATTERN_META,
  COGNATE_QUEUE_LENGTH,
  DEFAULT_PATTERN_PROGRESS,
} from '../utils/cognateQueue';

const MASTERY_STYLE = {
  new:      { label: 'New',      bg: '#f1f5f9', color: '#64748b' },
  learning: { label: 'Learning', bg: '#fef3c7', color: '#b45309' },
  strong:   { label: 'Strong',   bg: '#dbeafe', color: '#1d4ed8' },
  mastered: { label: 'Mastered', bg: '#dcfce7', color: '#15803d' },
};

function MasteryBadge({ level }) {
  const s = MASTERY_STYLE[level] || MASTERY_STYLE.new;
  return (
    <span
      className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide"
      style={{ background: s.bg, color: s.color }}
    >
      {s.label}
    </span>
  );
}

export default function CognateFetch({
  allWords = [],
  patternProgress = {},
  completedPaths = [],
  onUpdatePatternProgress,
  onAwardXp,
  strictTyping = false,
  onExit,
}) {
  const [screen, setScreen] = useState('config'); // config | drill | results
  const [selectedPattern, setSelectedPattern] = useState(null);
  const [index, setIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  const queueRef = useRef([]);
  const correctRef = useRef(0);
  const seenRef = useRef(0);

  // Cognate pool always drawn from the full MASTER list so category
  // toggles never hide cognate words. allWords still used for distractors.
  const wordSource = MASTER;
  const distractorSource = allWords.length > 0 ? allWords : MASTER;

  const unlocked = getUnlockedPatterns(completedPaths);
  const pp = { ...DEFAULT_PATTERN_PROGRESS, ...patternProgress };

  // ── Start a drill session for a pattern ──────────────────────
  const startDrill = (pattern) => {
    const queue = buildCognateQueue(pattern, wordSource, patternProgress);
    if (queue.length === 0) return;
    queueRef.current = queue;
    correctRef.current = 0;
    seenRef.current = 0;
    setSelectedPattern(pattern);
    setIndex(0);
    setCorrectCount(0);
    setScreen('drill');
  };

  const finishSession = () => {
    if (onUpdatePatternProgress) {
      onUpdatePatternProgress(selectedPattern, seenRef.current, correctRef.current);
    }
    setScreen('results');
  };

  // ── Config screen ────────────────────────────────────────────
  if (screen === 'config') {
    return (
      <div className="flex flex-col gap-3" data-testid="cognate-config">
        <button
          type="button"
          onClick={onExit}
          className="inline-flex items-center gap-1 text-sm font-medium self-start"
          style={{ color: 'hsl(var(--primary))' }}
          data-testid="cognate-back-btn"
        >
          ← Back
        </button>
        <div className="text-center mb-1">
          <div className="text-2xl font-bold" style={{ fontFamily: "'Fredoka', sans-serif", color: 'hsl(var(--foreground))' }}>
            Cognate Patterns 🔤
          </div>
          <div className="text-xs mt-1" style={{ color: 'hsl(var(--muted-foreground))' }}>
            Spot the patterns that turn English into Spanish
          </div>
        </div>

        {unlocked.map((pattern) => {
          const meta = PATTERN_META[pattern] || { label: pattern, example: '', emoji: '🔤' };
          const prog = pp[pattern] || { seen: 0, correct: 0, mastery: 'new' };
          return (
            <button
              key={pattern}
              type="button"
              onClick={() => startDrill(pattern)}
              data-testid={`cognate-pattern-${pattern}`}
              className="w-full rounded-2xl p-4 flex items-center justify-between transition-all hover:opacity-90 active:scale-[0.98]"
              style={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
            >
              <div className="flex items-center gap-3 text-left">
                <span className="text-2xl">{meta.emoji}</span>
                <div>
                  <div className="font-bold text-sm" style={{ color: 'hsl(var(--foreground))' }}>{meta.label}</div>
                  <div className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>{meta.example}</div>
                </div>
              </div>
              <MasteryBadge level={prog.mastery || 'new'} />
            </button>
          );
        })}
      </div>
    );
  }

  // ── Drill screen — one question at a time ────────────────────
  if (screen === 'drill') {
    const currentItem = queueRef.current[index];
    if (!currentItem) return null;

    const isLast = index >= queueRef.current.length - 1;
    const target = currentItem.word;

    const handleAnswer = (wordEs, isCorrect) => {
      seenRef.current += 1;
      if (isCorrect) {
        correctRef.current += 1;
        setCorrectCount((n) => n + 1);
        if (onAwardXp) onAwardXp(1);
      }
    };

    const handleDone = () => {
      if (isLast) finishSession();
      else setIndex((i) => i + 1);
    };

    const handleBack = () => {
      if (index > 0) setIndex((i) => i - 1);
      else setScreen('config');
    };

    // Distractors for choice options — broad pool, target forced first.
    const distractorPool = distractorSource.filter((w) => w.es !== target.es && w.en);
    const drillWords = [target, ...shuffle(distractorPool).slice(0, 12)];

    const forcedProgress = {};
    drillWords.forEach((w, i) => {
      forcedProgress[w.es] = i === 0
        ? { s: 0, c: 0, w: 999 }
        : { s: 6, c: 99, w: 0 };
    });

    const shared = {
      words: drillWords,
      progress: forcedProgress,
      drillLength: 1,
      counterOverride: `${index + 1} / ${COGNATE_QUEUE_LENGTH}`,
      onAnswer: handleAnswer,
      onDone: handleDone,
      onBack: handleBack,
      strictMode: strictTyping,
    };

    const drillKey = `cognate-${index}-${target.es}`;
    if (currentItem.drillType === 'type') {
      return <TypeDrill key={drillKey} mode="type-en-es" {...shared} headerOffset={90} />;
    }
    return <ChoiceDrill key={drillKey} mode="en-es" {...shared} headerOffset={80} />;
  }

  // ── Results screen ───────────────────────────────────────────
  if (screen === 'results') {
    const meta = PATTERN_META[selectedPattern] || { label: selectedPattern };
    const prevProg = pp[selectedPattern] || { seen: 0, correct: 0 };
    const newSeen = (prevProg.seen || 0) + seenRef.current;
    const newCorrect = (prevProg.correct || 0) + correctRef.current;
    const newMastery = computePatternMastery(newSeen, newCorrect);

    return (
      <div className="flex flex-col items-center text-center gap-4 pt-6" data-testid="cognate-results">
        <div className="text-3xl font-bold" style={{ fontFamily: "'Fredoka', sans-serif", color: 'hsl(var(--foreground))' }}>
          Pattern Practice Complete!
        </div>
        <div className="text-lg" style={{ color: 'hsl(var(--muted-foreground))' }}>
          {meta.label}
        </div>
        <div
          className="rounded-2xl p-6 w-full flex flex-col items-center gap-3"
          style={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
        >
          <div className="text-4xl font-extrabold" style={{ color: '#16a34a' }} data-testid="cognate-score">
            {correctCount} / {COGNATE_QUEUE_LENGTH}
          </div>
          <div className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>+{correctCount} XP earned</div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>Pattern mastery:</span>
            <MasteryBadge level={newMastery} />
          </div>
        </div>
        <div className="flex gap-2 w-full">
          <button
            type="button"
            onClick={() => startDrill(selectedPattern)}
            data-testid="cognate-again-btn"
            className="flex-1 rounded-full py-3 text-white font-bold transition-transform active:scale-95"
            style={{ background: '#16a34a' }}
          >
            Practice Again
          </button>
          <button
            type="button"
            onClick={() => setScreen('config')}
            data-testid="cognate-choose-btn"
            className="flex-1 rounded-full py-3 font-bold transition-transform active:scale-95"
            style={{ background: 'hsl(var(--card))', color: 'hsl(var(--foreground))', border: '1px solid hsl(var(--border))' }}
          >
            Choose Pattern
          </button>
        </div>
      </div>
    );
  }

  return null;
}
