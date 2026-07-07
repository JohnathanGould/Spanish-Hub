// ─────────────────────────────────────────────
// Cognate System — pattern-based cognate drilling
// Runs alongside the Path system. Pattern mastery is tracked
// separately from word mastery (patternProgress on the user doc).
// ─────────────────────────────────────────────

import { shuffle } from './helpers';

export const COGNATE_QUEUE_LENGTH = 10;

// Default patternProgress object — initialised on the user document
// if it does not already exist (see SpanishHub.jsx defaults).
export const DEFAULT_PATTERN_PROGRESS = {
  'al-same':      { seen: 0, correct: 0, mastery: 'new' },
  'near-perfect': { seen: 0, correct: 0, mastery: 'new' },
  'identical':    { seen: 0, correct: 0, mastery: 'new' },
  'cion':         { seen: 0, correct: 0, mastery: 'new' },
  'oso':          { seen: 0, correct: 0, mastery: 'new' },
  'ivo':          { seen: 0, correct: 0, mastery: 'new' },
  'nte':          { seen: 0, correct: 0, mastery: 'new' },
  'dad':          { seen: 0, correct: 0, mastery: 'new' },
  'ado':          { seen: 0, correct: 0, mastery: 'new' },
};

// Display metadata for each pattern group (config screen).
export const PATTERN_META = {
  'al-same':      { label: '-al stays -al',   example: 'hotel → hotel',            emoji: '🏨' },
  'near-perfect': { label: 'Near-perfect',    example: 'música → music',           emoji: '🎵' },
  'identical':    { label: 'Identical twins', example: 'idea → idea',              emoji: '👯' },
  'cion':         { label: '-ción → -tion',   example: 'nación → nation',          emoji: '🌍' },
  'oso':          { label: '-oso → -ous',     example: 'famoso → famous',          emoji: '⭐' },
  'ivo':          { label: '-ivo → -ive',     example: 'activo → active',          emoji: '⚡' },
  'nte':          { label: '-nte → -nt',      example: 'importante → important',   emoji: '❗' },
  'dad':          { label: '-dad → -ty',      example: 'ciudad → city',            emoji: '🏙️' },
  'ado':          { label: '-ado → -ated',    example: 'complicado → complicated', emoji: '🔗' },
  'mente':        { label: '-mente → -ly',    example: 'rápidamente → rapidly',    emoji: '🏃' },
};

// ── Mastery computation ──────────────────────────────────────
// new → learning → strong → mastered
// learning = seen 3+, strong = correct 80%+ over 10+,
// mastered = correct 90%+ over 20+
export function computePatternMastery(seen, correct) {
  const pct = seen > 0 ? correct / seen : 0;
  if (seen >= 20 && pct >= 0.90) return 'mastered';
  if (seen >= 10 && pct >= 0.80) return 'strong';
  if (seen >= 3) return 'learning';
  return 'new';
}

// ── Tier unlock rules ────────────────────────────────────────
const BEGINNER_I = ['al-same', 'near-perfect', 'identical'];
const BEGINNER_II = [...BEGINNER_I, 'cion', 'oso', 'ivo', 'nte', 'dad', 'ado'];

function allComplete(ids, completedPaths) {
  return ids.every((id) => completedPaths.includes(id));
}

// Returns the array of pattern keys unlocked for the user's current tier.
export function getUnlockedPatterns(completedPaths = []) {
  const p1_4 = ['path1', 'path2', 'path3', 'path4'];
  const p5_8 = ['path5', 'path6', 'path7', 'path8'];

  // Beginner I — paths 1-4 not all complete
  if (!allComplete(p1_4, completedPaths)) return BEGINNER_I;

  // Beginner II — paths 1-4 complete, paths 5-8 not all complete
  if (!allComplete(p5_8, completedPaths)) return BEGINNER_II;

  // Advanced Beginner / Intermediate — consolidation, all patterns
  // ('mente' added here once it exists in the word schema)
  return BEGINNER_II;
}

// ── buildCognateQueue ────────────────────────────────────────
// Returns an array of COGNATE_QUEUE_LENGTH question objects for a
// cognate drill session. Each object: { word, drillType }.
// drillType rotates between 'choice' (EN→SP) and 'type' (EN→SP).
export function buildCognateQueue(pattern, words, patternProgress = {}) {
  const isDrillable = (w) => w && w.cognate === true && w.tapToDefine !== true;

  // Primary pool — words matching this exact pattern.
  let pool = words.filter((w) => isDrillable(w) && w.cognatePattern === pattern);

  // Fallback — if the pattern pool is thin (< 5), use all cognate words.
  if (pool.length < 5) {
    pool = words.filter(isDrillable);
  }

  // Deduplicate by es.
  const seen = new Set();
  pool = pool.filter((w) => {
    if (seen.has(w.es)) return false;
    seen.add(w.es);
    return true;
  });

  if (pool.length === 0) return [];

  // Fill to COGNATE_QUEUE_LENGTH, repeating the pool if it is small.
  const maxPerWord = Math.ceil(COGNATE_QUEUE_LENGTH / pool.length);
  const filled = pool
    .flatMap((w) => Array(maxPerWord).fill(w))
    .slice(0, COGNATE_QUEUE_LENGTH);

  const shuffled = shuffle(filled);

  return shuffled.map((word, i) => ({
    word,
    drillType: i % 2 === 0 ? 'choice' : 'type',
  }));
}
