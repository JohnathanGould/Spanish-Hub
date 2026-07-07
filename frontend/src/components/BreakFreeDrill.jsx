import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { buildFetchQueue } from './PathsTab';
import { shuffle, playConfetti } from '../utils/helpers';
import ChoiceDrill from './drills/ChoiceDrill';
import TypeDrill from './drills/TypeDrill';
import GenderDrill from './drills/GenderDrill';
import VocabFillBlankDrill from './drills/VocabFillBlankDrill';

const BREAK_FREE_LENGTH = 10;
const BREAK_FREE_SECONDS = 60;

// Milo poses — real files swapped in later; milo_idle.gif is the approved placeholder
const POSE = {
  straining: '/animations/milo_straining.gif',
  free: '/animations/milo_free.gif',
  wrongTilt: '/animations/milo_idle.gif',    // placeholder for milo_wrong_tilt.gif
  encouraging: '/animations/milo_idle.gif',  // placeholder for milo_encouraging.gif
};

export default function BreakFreeDrill({
  words = [],
  progress = {},
  strictTyping = false,
  onSuccess,
  onFail,
  onExit,
}) {
  const [phase, setPhase] = useState('countdown'); // countdown | active | success | fail
  const [countdownNum, setCountdownNum] = useState(3);
  const [timeLeft, setTimeLeft] = useState(BREAK_FREE_SECONDS);
  const [index, setIndex] = useState(0);
  const [showEncouraging, setShowEncouraging] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  const queueRef = useRef([]);
  const finishedRef = useRef(false);

  // Build the queue once on mount
  if (queueRef.current.length === 0) {
    queueRef.current = buildFetchQueue(words, progress, BREAK_FREE_LENGTH);
  }

  // ── Countdown ──
  useEffect(() => {
    if (phase !== 'countdown') return;
    if (countdownNum <= 0) { setPhase('active'); return; }
    const t = setTimeout(() => setCountdownNum((n) => n - 1), 1000);
    return () => clearTimeout(t);
  }, [countdownNum, phase]);

  // ── Timer ──
  useEffect(() => {
    if (phase !== 'active') return;
    if (timeLeft <= 0) {
      if (!finishedRef.current) {
        finishedRef.current = true;
        setPhase('fail');
        if (onFail) onFail();
      }
      return;
    }
    const t = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, phase, onFail]);

  // ── Success auto-advance ──
  useEffect(() => {
    if (phase !== 'success') return;
    setTimeout(() => { confetti({ particleCount: 160, spread: 80, origin: { y: 0.6 } }); playConfetti(); }, 200);
    const t = setTimeout(() => { if (onExit) onExit(); }, 3000);
    return () => clearTimeout(t);
  }, [phase, onExit]);

  // ── Fail: show encouraging pose after 1.5s ──
  useEffect(() => {
    if (phase !== 'fail') return;
    const t = setTimeout(() => setShowEncouraging(true), 1500);
    return () => clearTimeout(t);
  }, [phase]);

  const triggerSuccess = () => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setPhase('success');
    if (onSuccess) onSuccess();
  };

  // ── Countdown screen ──
  if (phase === 'countdown') {
    return (
      <div className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-amber-50">
        <button onClick={onExit} data-testid="bf-countdown-back" className="absolute top-4 left-4 text-amber-700 font-medium">← Back</button>
        <img src={POSE.straining} alt="Milo straining" className="w-40 h-40 object-contain" />
        <div className="text-amber-800 font-bold text-lg mt-2">Get ready to Break Free!</div>
        <div className="text-7xl font-extrabold text-amber-600 mt-4" data-testid="bf-countdown">
          {countdownNum > 0 ? countdownNum : '¡Vamos!'}
        </div>
      </div>
    );
  }

  // ── Active screen ──
  if (phase === 'active') {
    const queue = queueRef.current;
    const currentItem = queue[index];
    if (!currentItem) return null;
    const target = currentItem.word;
    const isLast = index >= queue.length - 1;

    const handleAnswer = () => { /* speed matters, not accuracy — no per-answer tracking */ };
    const handleDone = () => {
      if (isLast) triggerSuccess();
      else setIndex((i) => i + 1);
    };
    const requestBack = () => setShowExitConfirm(true);

    let drillType = currentItem.drillType;
    const hasSentence = Array.isArray(target.contextSentence) && target.contextSentence.length > 0;
    if (drillType.includes('sentence') && !hasSentence) drillType = 'type-en-es';
    if (drillType === 'gender' && !(target.type === 'noun' && (target.gender === 'm' || target.gender === 'f'))) drillType = 'en-es';

    const distractors = shuffle(words.filter((w) => w.es !== target.es && w.en)).slice(0, 14);
    const drillWords = [target, ...distractors];
    const forcedProgress = {};
    drillWords.forEach((w, i) => { forcedProgress[w.es] = i === 0 ? { s: 0, c: 0, w: 999 } : { s: 6, c: 99, w: 0 }; });

    const shared = {
      words: drillWords,
      progress: forcedProgress,
      drillLength: 1,
      counterOverride: `${index + 1} / ${BREAK_FREE_LENGTH}`,
      onAnswer: handleAnswer,
      onDone: handleDone,
      onBack: requestBack,
      strictMode: strictTyping,
    };
    const drillKey = `bf-${index}-${target.es}`;

    let drillEl;
    if (drillType === 'type-en-es') drillEl = <TypeDrill key={drillKey} mode="type-en-es" {...shared} headerOffset={90} />;
    else if (drillType === 'listen-type-es') drillEl = <TypeDrill key={drillKey} mode="listen-type" {...shared} headerOffset={90} />;
    else if (drillType === 'listen-type-en') drillEl = <TypeDrill key={drillKey} mode="listen-type-en-es" {...shared} headerOffset={90} />;
    else if (drillType === 'listen-type-sentence-es') drillEl = <TypeDrill key={drillKey} mode="listen-type-sentence" {...shared} headerOffset={90} />;
    else if (drillType === 'listen-type-sentence-en') drillEl = <TypeDrill key={drillKey} mode="listen-type-sentence-en-es" {...shared} headerOffset={90} />;
    else if (drillType === 'hear-choose-es') drillEl = <ChoiceDrill key={drillKey} mode="hear-choose" {...shared} headerOffset={80} />;
    else if (drillType === 'hear-choose-en') drillEl = <ChoiceDrill key={drillKey} mode="hear-choose-en-es" {...shared} headerOffset={80} />;
    else if (drillType === 'gender') drillEl = <GenderDrill key={drillKey} {...shared} />;
    else if (drillType === 'vocab-fill-blank-typed' || drillType === 'vocab-fill-blank-choice') drillEl = <VocabFillBlankDrill key={drillKey} mode={drillType === 'vocab-fill-blank-typed' ? 'typed' : 'choice'} {...shared} headerOffset={90} />;
    else drillEl = <ChoiceDrill key={drillKey} mode={drillType} {...shared} headerOffset={80} />;

    const urgent = timeLeft <= 10;
    return (
      <div className="fixed inset-0 z-[10000] bg-white flex flex-col">
        {/* Break Free header — Milo straining + timer */}
        <div className="flex flex-col items-center pt-4 pb-2 bg-amber-50 border-b border-amber-200">
          <img src={POSE.straining} alt="Milo straining" className="w-20 h-20 object-contain" />
          <div
            className="text-4xl font-extrabold tabular-nums"
            style={{ color: urgent ? '#dc2626' : '#b45309' }}
            data-testid="bf-timer"
          >
            {timeLeft}s
          </div>
          <div className="text-xs text-amber-600 font-bold" data-testid="bf-progress">{index + 1} / {BREAK_FREE_LENGTH}</div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {drillEl}
        </div>
        {showExitConfirm && (
          <div className="fixed inset-0 z-[10001] flex items-center justify-center bg-black/40 p-6">
            <div className="rounded-2xl p-6 w-full max-w-sm bg-white text-center">
              <p className="font-bold text-lg text-gray-900">Leave Break Free?</p>
              <p className="text-sm text-gray-500 mt-1">Milo stops straining. This attempt ends.</p>
              <div className="flex gap-2 mt-5">
                <button onClick={() => setShowExitConfirm(false)} data-testid="bf-exit-cancel" className="flex-1 rounded-full py-2.5 font-bold border border-gray-200 text-gray-700 active:scale-95">Keep going</button>
                <button
                  onClick={() => {
                    setShowExitConfirm(false);
                    if (!finishedRef.current) { finishedRef.current = true; if (onFail) onFail(); }
                    if (onExit) onExit();
                  }}
                  data-testid="bf-exit-confirm"
                  className="flex-1 rounded-full py-2.5 font-bold text-white active:scale-95"
                  style={{ background: '#dc2626' }}
                >
                  Leave
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ── Success screen ──
  if (phase === 'success') {
    return (
      <div className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-white p-6 text-center" data-testid="bf-success">
        <img src={POSE.free} alt="Milo free" className="w-44 h-44 object-contain" />
        <div className="text-5xl font-extrabold mt-2" style={{ color: '#16a34a', fontFamily: "'Fredoka', sans-serif" }}>¡Libre!</div>
        <div className="text-2xl font-bold text-amber-600 mt-3">+10 🦴 bones</div>
        <div className="text-sm text-gray-500 mt-2">Fetch unlocked</div>
        <button
          onClick={onExit}
          data-testid="bf-success-continue"
          className="mt-6 rounded-full py-3 px-10 text-white font-bold active:scale-95"
          style={{ background: '#16a34a' }}
        >
          Continue
        </button>
      </div>
    );
  }

  // ── Fail screen ──
  if (phase === 'fail') {
    return (
      <div className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-white p-6 text-center" data-testid="bf-fail">
        <img src={showEncouraging ? POSE.encouraging : POSE.wrongTilt} alt="Milo" className="w-40 h-40 object-contain" />
        <div className="text-2xl font-bold text-gray-800 mt-3">So close! Milo believes in you 🐾</div>
        <div className="text-sm text-gray-500 mt-2">No bones lost — try again later.</div>
        <button
          onClick={onExit}
          data-testid="bf-fail-back"
          className="mt-6 rounded-full py-3 px-10 font-bold active:scale-95"
          style={{ background: 'hsl(var(--card))', color: 'hsl(var(--foreground))', border: '1px solid hsl(var(--border))' }}
        >
          Try again later
        </button>
      </div>
    );
  }

  return null;
}
