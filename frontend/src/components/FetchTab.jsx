import React, { useState, useRef } from 'react';
import { getPath, getStopWords } from '../content/es-en/paths';
import { MASTER } from '../content/es-en/words';
import { masteryLevel, shuffle } from '../utils/helpers';
import { buildFetchQueue } from './PathsTab';
import ChoiceDrill from './drills/ChoiceDrill';
import TypeDrill from './drills/TypeDrill';
import GenderDrill from './drills/GenderDrill';
import VocabFillBlankDrill from './drills/VocabFillBlankDrill';

// Session length → queue length
const LENGTH_MAP = { quick: 10, standard: 20, long: 40 };
const BONES_MAP = { quick: 1, standard: 2, long: 3 };
const PASS_THRESHOLD = 0.80;

const MASTERY_OPTIONS = [
  { key: 'new',      label: '🌱 New' },
  { key: 'learning', label: '📖 Learning' },
  { key: 'strong',   label: '💪 Strong' },
  { key: 'mastered', label: '⭐ Mastered' },
];

// ── Word pool resolution ───────────────────────────────────────
export function resolveFetchWordPool(config, userData, progress) {
  let words = [];

  if (config.source === 'all-paths') {
    words = (userData.completedPaths || []).flatMap((pathId) => {
      const path = getPath(pathId);
      if (!path) return [];
      return path.stops
        .flatMap((stop) => getStopWords(stop.id))
        .map((es) => MASTER.find((w) => w.es === es))
        .filter(Boolean);
    });
  } else if (config.source === 'path' && config.selectedPathId) {
    const path = getPath(config.selectedPathId);
    if (path) {
      words = path.stops
        .flatMap((stop) => getStopWords(stop.id))
        .map((es) => MASTER.find((w) => w.es === es))
        .filter(Boolean);
    }
  } else if (config.source === 'custom') {
    words = userData.customWords || [];
  } else if (config.source === 'pack' && config.selectedPackId) {
    const pack = (userData.importedPacks || []).find((p) => p.id === config.selectedPackId);
    words = pack ? pack.words : [];
  }

  // Deduplicate by es
  const seen = new Set();
  words = words.filter((w) => {
    if (!w || seen.has(w.es)) return false;
    seen.add(w.es);
    return true;
  });

  // Apply mastery-level filter
  words = words.filter((w) => config.masteryLevels.includes(masteryLevel(progress, w.es)));

  return words;
}

const PILL = 'rounded-full border px-4 py-2 font-semibold text-sm transition-all active:scale-95';

export default function FetchTab({
  userData,
  progress = {},
  completedPaths = [],
  customWords = [],
  importedPacks = [],
  onDrillAnswer,
  onFetchComplete,
  strictTyping = false,
  // Break Free (Session F)
  breakFreeAvailable = false,
  onStartBreakFree,
}) {
  const completedPathObjs = completedPaths.map((id) => getPath(id)).filter(Boolean);
  const hasPacks = (importedPacks || []).length > 0;
  const hasCustom = (customWords || []).length > 0;

  const [config, setConfig] = useState({
    masteryLevels: ['learning', 'strong'],
    source: 'all-paths',
    selectedPathId: completedPathObjs[0]?.id || null,
    selectedPackId: importedPacks[0]?.id || null,
    length: 'standard',
  });

  const [screen, setScreen] = useState('config'); // config | session | results
  const [fetchIndex, setFetchIndex] = useState(0);
  const [fetchCorrect, setFetchCorrect] = useState(0);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [result, setResult] = useState(null);

  const queueRef = useRef([]);
  const correctRef = useRef(0);

  const pool = resolveFetchWordPool(config, userData, progress);
  const poolEmpty = pool.length === 0;
  const noCompletedPaths = completedPathObjs.length === 0;

  const toggleMastery = (key) => {
    setConfig((c) => {
      const has = c.masteryLevels.includes(key);
      const next = has ? c.masteryLevels.filter((m) => m !== key) : [...c.masteryLevels, key];
      return { ...c, masteryLevels: next };
    });
  };

  const startSession = () => {
    if (poolEmpty) return;
    const length = LENGTH_MAP[config.length];
    const queue = buildFetchQueue(pool, progress, length);
    queueRef.current = queue;
    correctRef.current = 0;
    setFetchIndex(0);
    setFetchCorrect(0);
    setScreen('session');
  };

  const finishSession = () => {
    const total = queueRef.current.length;
    const correct = correctRef.current;
    const length = LENGTH_MAP[config.length];
    let outcome = { passed: false, bonesAward: 0, correct, total };
    if (onFetchComplete) {
      const r = onFetchComplete(correct, total, length);
      outcome = { ...outcome, ...(r || {}) };
    }
    setResult(outcome);
    setScreen('results');
  };

  // ── Config screen ────────────────────────────────────────────
  if (screen === 'config') {
    return (
      <div className="flex flex-col gap-4 pb-4" data-testid="fetch-config">
        {/* Break Free card (Session F) */}
        {breakFreeAvailable && (
          <div className="bg-amber-50 border border-amber-300 rounded-xl p-4 mb-1 flex items-center justify-between" data-testid="break-free-card">
            <div>
              <div className="font-bold text-amber-800">¡Libre! is ready 🔗</div>
              <div className="text-sm text-amber-600">Milo is straining at his chain...</div>
            </div>
            <button
              onClick={onStartBreakFree}
              data-testid="break-free-start-btn"
              className="bg-amber-500 text-white px-4 py-2 rounded-lg font-bold active:scale-95"
            >
              Break Free
            </button>
          </div>
        )}

        <div className="flex flex-col items-center text-center">
          <img src="/animations/milo_idle.gif" alt="Milo" className="w-24 h-24 object-contain" />
          <div className="text-2xl font-bold" style={{ fontFamily: "'Fredoka', sans-serif", color: 'hsl(var(--foreground))' }}>
            Fetch 🐾
          </div>
          <div className="text-xs mt-1" style={{ color: 'hsl(var(--muted-foreground))' }}>
            Review your learned words across every Path
          </div>
        </div>

        {noCompletedPaths ? (
          <div className="rounded-2xl p-6 text-center" style={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}>
            <p className="font-bold" style={{ color: 'hsl(var(--foreground))' }} data-testid="fetch-no-paths">
              Complete your first Path to unlock Fetch
            </p>
            <p className="text-sm mt-2" style={{ color: 'hsl(var(--muted-foreground))' }}>
              Head to the Paths tab and finish a Path to start reviewing.
            </p>
          </div>
        ) : (
          <>
            {/* Mastery filter */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'hsl(var(--muted-foreground))' }}>Filter by mastery</div>
              <div className="flex flex-wrap gap-2">
                {MASTERY_OPTIONS.map((opt) => {
                  const active = config.masteryLevels.includes(opt.key);
                  return (
                    <button
                      key={opt.key}
                      onClick={() => toggleMastery(opt.key)}
                      data-testid={`fetch-mastery-${opt.key}`}
                      className={PILL}
                      style={{
                        background: active ? 'hsl(var(--primary))' : 'hsl(var(--card))',
                        color: active ? 'white' : 'hsl(var(--foreground))',
                        borderColor: active ? 'hsl(var(--primary))' : 'hsl(var(--border))',
                      }}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Source filter */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'hsl(var(--muted-foreground))' }}>Source</div>
              <div className="flex flex-col gap-2">
                <SourceOption label="All completed Paths" active={config.source === 'all-paths'} onClick={() => setConfig((c) => ({ ...c, source: 'all-paths' }))} testid="fetch-source-all-paths" />
                <div>
                  <SourceOption label="Specific Path" active={config.source === 'path'} onClick={() => setConfig((c) => ({ ...c, source: 'path' }))} testid="fetch-source-path" />
                  {config.source === 'path' && (
                    <select
                      value={config.selectedPathId || ''}
                      onChange={(e) => setConfig((c) => ({ ...c, selectedPathId: e.target.value }))}
                      data-testid="fetch-path-select"
                      className="mt-2 w-full rounded-lg border px-3 py-2 text-sm"
                      style={{ background: 'hsl(var(--card))', color: 'hsl(var(--foreground))', borderColor: 'hsl(var(--border))' }}
                    >
                      {completedPathObjs.map((p) => (
                        <option key={p.id} value={p.id}>{p.title || p.name || p.id}</option>
                      ))}
                    </select>
                  )}
                </div>
                {hasCustom && (
                  <SourceOption label="My Words" active={config.source === 'custom'} onClick={() => setConfig((c) => ({ ...c, source: 'custom' }))} testid="fetch-source-custom" />
                )}
                {hasPacks && (
                  <div>
                    <SourceOption label="Community Packs" active={config.source === 'pack'} onClick={() => setConfig((c) => ({ ...c, source: 'pack' }))} testid="fetch-source-pack" />
                    {config.source === 'pack' && (
                      <select
                        value={config.selectedPackId || ''}
                        onChange={(e) => setConfig((c) => ({ ...c, selectedPackId: e.target.value }))}
                        data-testid="fetch-pack-select"
                        className="mt-2 w-full rounded-lg border px-3 py-2 text-sm"
                        style={{ background: 'hsl(var(--card))', color: 'hsl(var(--foreground))', borderColor: 'hsl(var(--border))' }}
                      >
                        {importedPacks.map((p) => (
                          <option key={p.id} value={p.id}>{p.title || p.id}</option>
                        ))}
                      </select>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Session length */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'hsl(var(--muted-foreground))' }}>Session length</div>
              <div className="flex gap-2">
                {[['quick', 'Quick · 10'], ['standard', 'Standard · 20'], ['long', 'Long · 40']].map(([key, label]) => {
                  const active = config.length === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setConfig((c) => ({ ...c, length: key }))}
                      data-testid={`fetch-length-${key}`}
                      className={`flex-1 ${PILL}`}
                      style={{
                        background: active ? 'hsl(var(--primary))' : 'hsl(var(--card))',
                        color: active ? 'white' : 'hsl(var(--foreground))',
                        borderColor: active ? 'hsl(var(--primary))' : 'hsl(var(--border))',
                      }}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              onClick={startSession}
              disabled={poolEmpty}
              data-testid="fetch-start-btn"
              className="w-full rounded-full py-3 text-white font-bold transition-transform active:scale-95 disabled:opacity-40"
              style={{ background: '#16a34a' }}
            >
              Start Fetch 🐾
            </button>
            {poolEmpty && (
              <p className="text-center text-sm" style={{ color: 'hsl(var(--muted-foreground))' }} data-testid="fetch-no-words">
                No words match your filters
              </p>
            )}
            {!poolEmpty && (
              <p className="text-center text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
                {pool.length} word{pool.length === 1 ? '' : 's'} in pool
              </p>
            )}
          </>
        )}
      </div>
    );
  }

  // ── Session screen ───────────────────────────────────────────
  if (screen === 'session') {
    const queue = queueRef.current;
    const currentItem = queue[fetchIndex];
    if (!currentItem) return null;
    const isLast = fetchIndex >= queue.length - 1;
    const target = currentItem.word;

    const handleAnswer = (wordEs, isCorrect) => {
      if (onDrillAnswer) onDrillAnswer(wordEs, isCorrect, true, currentItem.drillType);
      if (isCorrect) {
        correctRef.current += 1;
        setFetchCorrect((n) => n + 1);
      }
    };

    const handleDone = () => {
      if (isLast) finishSession();
      else setFetchIndex((i) => i + 1);
    };

    const requestBack = () => setShowExitConfirm(true);

    // Resolve drill type with guards for pack/custom words
    let drillType = currentItem.drillType;
    const hasSentence = Array.isArray(target.contextSentence) && target.contextSentence.length > 0;
    if (drillType.includes('sentence') && !hasSentence) drillType = 'type-en-es';
    if (drillType === 'gender' && !(target.type === 'noun' && (target.gender === 'm' || target.gender === 'f'))) drillType = 'en-es';

    const distractors = shuffle(pool.filter((w) => w.es !== target.es && w.en)).slice(0, 14);
    const drillWords = [target, ...distractors];
    const forcedProgress = {};
    drillWords.forEach((w, i) => {
      forcedProgress[w.es] = i === 0 ? { s: 0, c: 0, w: 999 } : { s: 6, c: 99, w: 0 };
    });

    const shared = {
      words: drillWords,
      progress: forcedProgress,
      drillLength: 1,
      counterOverride: `${fetchIndex + 1} / ${queue.length}`,
      onAnswer: handleAnswer,
      onDone: handleDone,
      onBack: requestBack,
      strictMode: strictTyping,
    };
    const drillKey = `fetch-${fetchIndex}-${target.es}`;

    let drillEl;
    if (drillType === 'type-en-es') {
      drillEl = <TypeDrill key={drillKey} mode="type-en-es" {...shared} headerOffset={90} />;
    } else if (drillType === 'listen-type-es') {
      drillEl = <TypeDrill key={drillKey} mode="listen-type" {...shared} headerOffset={90} />;
    } else if (drillType === 'listen-type-en') {
      drillEl = <TypeDrill key={drillKey} mode="listen-type-en-es" {...shared} headerOffset={90} />;
    } else if (drillType === 'listen-type-sentence-es') {
      drillEl = <TypeDrill key={drillKey} mode="listen-type-sentence" {...shared} headerOffset={90} />;
    } else if (drillType === 'listen-type-sentence-en') {
      drillEl = <TypeDrill key={drillKey} mode="listen-type-sentence-en-es" {...shared} headerOffset={90} />;
    } else if (drillType === 'hear-choose-es') {
      drillEl = <ChoiceDrill key={drillKey} mode="hear-choose" {...shared} headerOffset={80} />;
    } else if (drillType === 'hear-choose-en') {
      drillEl = <ChoiceDrill key={drillKey} mode="hear-choose-en-es" {...shared} headerOffset={80} />;
    } else if (drillType === 'gender') {
      drillEl = <GenderDrill key={drillKey} {...shared} />;
    } else if (drillType === 'vocab-fill-blank-typed' || drillType === 'vocab-fill-blank-choice') {
      drillEl = <VocabFillBlankDrill key={drillKey} mode={drillType === 'vocab-fill-blank-typed' ? 'typed' : 'choice'} {...shared} headerOffset={90} />;
    } else {
      drillEl = <ChoiceDrill key={drillKey} mode={drillType} {...shared} headerOffset={80} />;
    }

    return (
      <div data-testid="fetch-session">
        {drillEl}
        {showExitConfirm && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/40 p-6">
            <div className="rounded-2xl p-6 w-full max-w-sm bg-white text-center">
              <p className="font-bold text-lg text-gray-900">Leave this session?</p>
              <p className="text-sm text-gray-500 mt-1">Progress won&apos;t be saved.</p>
              <div className="flex gap-2 mt-5">
                <button
                  onClick={() => setShowExitConfirm(false)}
                  data-testid="fetch-exit-cancel"
                  className="flex-1 rounded-full py-2.5 font-bold border border-gray-200 text-gray-700 active:scale-95"
                >
                  Cancel
                </button>
                <button
                  onClick={() => { setShowExitConfirm(false); setScreen('config'); }}
                  data-testid="fetch-exit-confirm"
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

  // ── Results screen ───────────────────────────────────────────
  if (screen === 'results' && result) {
    const pct = result.total > 0 ? Math.round((result.correct / result.total) * 100) : 0;
    return (
      <div className="flex flex-col items-center text-center gap-4 pt-6" data-testid="fetch-results">
        <img src="/animations/milo_idle.gif" alt="Milo" className="w-24 h-24 object-contain" />
        <div className="text-3xl font-bold" style={{ fontFamily: "'Fredoka', sans-serif", color: 'hsl(var(--foreground))' }}>
          {result.passed ? 'Great fetch! 🐾' : 'Nice effort!'}
        </div>
        <div className="rounded-2xl p-6 w-full flex flex-col items-center gap-2" style={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}>
          <div className="text-4xl font-extrabold" style={{ color: '#16a34a' }} data-testid="fetch-score">
            {result.correct} / {result.total}
          </div>
          <div className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>{pct}% correct</div>
          {result.bonesAward > 0 && (
            <div className="text-sm font-bold mt-1" style={{ color: '#b45309' }} data-testid="fetch-bones">
              +{result.bonesAward} 🦴 bones
            </div>
          )}
          {!result.passed && (
            <div className="text-xs mt-1" style={{ color: 'hsl(var(--muted-foreground))' }}>Score 80%+ to earn bones</div>
          )}
        </div>
        <div className="flex gap-2 w-full">
          <button
            onClick={startSession}
            data-testid="fetch-again-btn"
            className="flex-1 rounded-full py-3 text-white font-bold active:scale-95"
            style={{ background: '#16a34a' }}
          >
            Run Again
          </button>
          <button
            onClick={() => setScreen('config')}
            data-testid="fetch-reconfigure-btn"
            className="flex-1 rounded-full py-3 font-bold active:scale-95"
            style={{ background: 'hsl(var(--card))', color: 'hsl(var(--foreground))', border: '1px solid hsl(var(--border))' }}
          >
            Reconfigure
          </button>
        </div>
      </div>
    );
  }

  return null;
}

function SourceOption({ label, active, onClick, testid }) {
  return (
    <button
      onClick={onClick}
      data-testid={testid}
      className="w-full text-left rounded-xl px-4 py-3 text-sm font-semibold transition-all active:scale-[0.98] flex items-center gap-2"
      style={{
        background: active ? 'hsl(var(--primary))' : 'hsl(var(--card))',
        color: active ? 'white' : 'hsl(var(--foreground))',
        border: `1px solid ${active ? 'hsl(var(--primary))' : 'hsl(var(--border))'}`,
      }}
    >
      <span className="w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0" style={{ borderColor: active ? 'white' : 'hsl(var(--border))' }}>
        {active && <span className="w-2 h-2 rounded-full bg-white" />}
      </span>
      {label}
    </button>
  );
}
