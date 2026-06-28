# Next Emergent Session Ledger
# Milo Speaks Spanish
# Written: 2026-06-07
# Last updated: 2026-06-27
# Purpose: Pre-session preparation checklist, Emergent session plan, and Play Store readiness roadmap

---

## Pre-Emergent Cleanup Session — ~2026-07-01

Runs before Session A. Uses separate token budget from the 7 main sessions.

### Task 1 — Audio kill switch + remove dead TTS toggle

- Wire `audioListenEnabled` globally: guard `speak()` in helpers.js, exclude audio drill types from fetch queue in PathsTab.jsx when flag is off
- Remove `audioSpeakEnabled` entirely: delete toggle from ProfileSheet.jsx, remove state and callback from SpanishHub.jsx

### Task 2 — Word Sort drill

- Build `WordSortDrill.jsx` — sentence from `contextSentence`, words scrambled into tappable tiles, user reconstructs in order
- Wire into DrillsGrid.jsx (inline render, Warm Up tab) and PathsTab.jsx (DRILL_TYPES + both routers)
- Prop contract: `{ words, progress, onAnswer, onDone, onBack, drillLength, headerOffset, counterOverride }`

### Task 3 — Sentence Builder word tile gender color

- MASTER lookup per token in Sentence Builder component
- Masculine nouns: blue tile accent, Feminine nouns: pink tile accent
- Pass `masterList` prop from SpanishHub.jsx down to Sentence Builder

**Est. tokens: 15–20**

---

## Lesson Card — Emergent Session (unscheduled)

Not yet slotted into A–G order. Needs UI spec written before session opens.

### What gets built

- Optional lesson card at Path entry point
- Auto-shows on first visit to each Path, skip remembered per Path in Firestore
- Persistent 'Lesson' button on Path screen accessible any time
- Skip button: closes card, goes to Stop 1, never auto-shows again for that Path
- Further Study button: expands to deeper content (grammar notes, cultural context — text only, YouTube deferred to v3)
- Data fields already in paths.js: `lessonText` (100–150 words) and `furtherStudy` (longer form) — content complete for all 13 Paths

**Est. tokens: 10–15**

---

## Emergent Session A — Badge Triggers

### Classification
- **Type:** Wiring + content replacement
- **Risk:** Low. Logic is fully implemented. Two new files, three new Firestore fields, two wiring calls.
- **Stage:** 3 — stabilization
- **Affected files:** SpanishHub.jsx, frontend/src/data/badges.js, frontend/src/utils/evaluateBadges.js
- **Pattern:** Parent Fan-Out — SpanishHub owns all state mutations

---

### What the problem is

evaluateBadges.js fully implements stop_complete and path_complete event handling. BadgeGrid.jsx fully renders earned badges. Two gaps exist:

1. completeStop and completePathFetch in SpanishHub.jsx never call evaluateBadges — stop and path badges never trigger
2. badges.js has 38 badges. The app needs 103.

---

### Pre-flight confirmation — Emergent must report first 3 lines of each file before touching anything
frontend/src/SpanishHub.jsx

frontend/src/utils/evaluateBadges.js

frontend/src/data/badges.js

---

### Task 1 — Replace frontend/src/data/badges.js

Replace the entire file with this content:

```js
export const BADGES = [
  // ── XP Milestones ──────────────────────────────────────────────
  { id: 'xp_500',    emoji: '🐾', name: 'First Steps',         description: 'Earn 500 XP',       category: 'xp',      hidden: false, stackable: false },
  { id: 'xp_2000',   emoji: '🦴', name: 'Finding My Paws',     description: 'Earn 2,000 XP',     category: 'xp',      hidden: false, stackable: false },
  { id: 'xp_5000',   emoji: '🐕', name: 'On the Trail',        description: 'Earn 5,000 XP',     category: 'xp',      hidden: false, stackable: false },
  { id: 'xp_12500',  emoji: '🐾', name: 'Running Free',        description: 'Earn 12,500 XP',    category: 'xp',      hidden: false, stackable: false },
  { id: 'xp_25000',  emoji: '🏆', name: 'Champion',            description: 'Earn 25,000 XP',    category: 'xp',      hidden: false, stackable: false },
  { id: 'xp_50000',  emoji: '⭐', name: 'Legend',              description: 'Earn 50,000 XP',    category: 'xp',      hidden: false, stackable: false },

  // ── Streak ─────────────────────────────────────────────────────
  { id: 'streak_3',   emoji: '🔥', name: 'First Flame',         description: '3-day streak',      category: 'streak',  hidden: false, stackable: false },
  { id: 'streak_7',   emoji: '🔥', name: 'Week Warrior',        description: '7-day streak',      category: 'streak',  hidden: false, stackable: false },
  { id: 'streak_30',  emoji: '🔥', name: 'Unstoppable',         description: '30-day streak',     category: 'streak',  hidden: false, stackable: false },
  { id: 'streak_100', emoji: '🔥', name: 'Legendary Streak',    description: '100-day streak',    category: 'streak',  hidden: false, stackable: false },

  // ── Paths & Stops ───────────────────────────────────────────────
  // First stop of each Path
  { id: 'stop_1_1',  emoji: '🗺️', name: 'First Steps on the Trail', description: 'Complete Path 1, Stop 1',  category: 'path', hidden: false, stackable: false },
  { id: 'stop_2_1',  emoji: '🗺️', name: 'Trail 2 Begins',           description: 'Complete Path 2, Stop 1',  category: 'path', hidden: false, stackable: false },
  { id: 'stop_3_1',  emoji: '🗺️', name: 'Trail 3 Begins',           description: 'Complete Path 3, Stop 1',  category: 'path', hidden: false, stackable: false },
  { id: 'stop_4_1',  emoji: '🗺️', name: 'Trail 4 Begins',           description: 'Complete Path 4, Stop 1',  category: 'path', hidden: false, stackable: false },
  { id: 'stop_5_1',  emoji: '🗺️', name: 'Trail 5 Begins',           description: 'Complete Path 5, Stop 1',  category: 'path', hidden: false, stackable: false },
  { id: 'stop_6_1',  emoji: '🗺️', name: 'Trail 6 Begins',           description: 'Complete Path 6, Stop 1',  category: 'path', hidden: false, stackable: false },
  { id: 'stop_7_1',  emoji: '🗺️', name: 'Trail 7 Begins',           description: 'Complete Path 7, Stop 1',  category: 'path', hidden: false, stackable: false },
  { id: 'stop_8_1',  emoji: '🗺️', name: 'Trail 8 Begins',           description: 'Complete Path 8, Stop 1',  category: 'path', hidden: false, stackable: false },
  { id: 'stop_9_1',  emoji: '🗺️', name: 'Trail 9 Begins',           description: 'Complete Path 9, Stop 1',  category: 'path', hidden: false, stackable: false },
  { id: 'stop_10_1', emoji: '🗺️', name: 'Trail 10 Begins',          description: 'Complete Path 10, Stop 1', category: 'path', hidden: false, stackable: false },
  { id: 'stop_11_1', emoji: '🗺️', name: 'Trail 11 Begins',          description: 'Complete Path 11, Stop 1', category: 'path', hidden: false, stackable: false },
  { id: 'stop_12_1', emoji: '🗺️', name: 'Trail 12 Begins',          description: 'Complete Path 12, Stop 1', category: 'path', hidden: false, stackable: false },
  { id: 'stop_13_1', emoji: '🗺️', name: 'Trail 13 Begins',          description: 'Complete Path 13, Stop 1', category: 'path', hidden: false, stackable: false },

  // Midpoint stop of each Path (Stop 3 of 5)
  { id: 'stop_1_3',  emoji: '🗺️', name: 'Halfway There', description: 'Complete Path 1, Stop 3',  category: 'path', hidden: false, stackable: false },
  { id: 'stop_2_3',  emoji: '🗺️', name: 'Halfway There', description: 'Complete Path 2, Stop 3',  category: 'path', hidden: false, stackable: false },
  { id: 'stop_3_3',  emoji: '🗺️', name: 'Halfway There', description: 'Complete Path 3, Stop 3',  category: 'path', hidden: false, stackable: false },
  { id: 'stop_4_3',  emoji: '🗺️', name: 'Halfway There', description: 'Complete Path 4, Stop 3',  category: 'path', hidden: false, stackable: false },
  { id: 'stop_5_3',  emoji: '🗺️', name: 'Halfway There', description: 'Complete Path 5, Stop 3',  category: 'path', hidden: false, stackable: false },
  { id: 'stop_6_3',  emoji: '🗺️', name: 'Halfway There', description: 'Complete Path 6, Stop 3',  category: 'path', hidden: false, stackable: false },
  { id: 'stop_7_3',  emoji: '🗺️', name: 'Halfway There', description: 'Complete Path 7, Stop 3',  category: 'path', hidden: false, stackable: false },
  { id: 'stop_8_3',  emoji: '🗺️', name: 'Halfway There', description: 'Complete Path 8, Stop 3',  category: 'path', hidden: false, stackable: false },
  { id: 'stop_9_3',  emoji: '🗺️', name: 'Halfway There', description: 'Complete Path 9, Stop 3',  category: 'path', hidden: false, stackable: false },
  { id: 'stop_10_3', emoji: '🗺️', name: 'Halfway There', description: 'Complete Path 10, Stop 3', category: 'path', hidden: false, stackable: false },
  { id: 'stop_11_3', emoji: '🗺️', name: 'Halfway There', description: 'Complete Path 11, Stop 3', category: 'path', hidden: false, stackable: false },
  { id: 'stop_12_3', emoji: '🗺️', name: 'Halfway There', description: 'Complete Path 12, Stop 3', category: 'path', hidden: false, stackable: false },
  { id: 'stop_13_3', emoji: '🗺️', name: 'Halfway There', description: 'Complete Path 13, Stop 3', category: 'path', hidden: false, stackable: false },

  // Final stop of each Path (Stop 5 of 5)
  { id: 'stop_1_5',  emoji: '🗺️', name: 'Ready for the Challenge', description: 'Complete Path 1, Stop 5',  category: 'path', hidden: false, stackable: false },
  { id: 'stop_2_5',  emoji: '🗺️', name: 'Ready for the Challenge', description: 'Complete Path 2, Stop 5',  category: 'path', hidden: false, stackable: false },
  { id: 'stop_3_5',  emoji: '🗺️', name: 'Ready for the Challenge', description: 'Complete Path 3, Stop 5',  category: 'path', hidden: false, stackable: false },
  { id: 'stop_4_5',  emoji: '🗺️', name: 'Ready for the Challenge', description: 'Complete Path 4, Stop 5',  category: 'path', hidden: false, stackable: false },
  { id: 'stop_5_5',  emoji: '🗺️', name: 'Ready for the Challenge', description: 'Complete Path 5, Stop 5',  category: 'path', hidden: false, stackable: false },
  { id: 'stop_6_5',  emoji: '🗺️', name: 'Ready for the Challenge', description: 'Complete Path 6, Stop 5',  category: 'path', hidden: false, stackable: false },
  { id: 'stop_7_5',  emoji: '🗺️', name: 'Ready for the Challenge', description: 'Complete Path 7, Stop 5',  category: 'path', hidden: false, stackable: false },
  { id: 'stop_8_5',  emoji: '🗺️', name: 'Ready for the Challenge', description: 'Complete Path 8, Stop 5',  category: 'path', hidden: false, stackable: false },
  { id: 'stop_9_5',  emoji: '🗺️', name: 'Ready for the Challenge', description: 'Complete Path 9, Stop 5',  category: 'path', hidden: false, stackable: false },
  { id: 'stop_10_5', emoji: '🗺️', name: 'Ready for the Challenge', description: 'Complete Path 10, Stop 5', category: 'path', hidden: false, stackable: false },
  { id: 'stop_11_5', emoji: '🗺️', name: 'Ready for the Challenge', description: 'Complete Path 11, Stop 5', category: 'path', hidden: false, stackable: false },
  { id: 'stop_12_5', emoji: '🗺️', name: 'Ready for the Challenge', description: 'Complete Path 12, Stop 5', category: 'path', hidden: false, stackable: false },
  { id: 'stop_13_5', emoji: '🗺️', name: 'Ready for the Challenge', description: 'Complete Path 13, Stop 5', category: 'path', hidden: false, stackable: false },

  // Path completions
  { id: 'path_1',  emoji: '🗺️', name: '¡Camino Uno!',    description: 'Complete Path 1',                        category: 'path', hidden: false, stackable: false },
  { id: 'path_2',  emoji: '🗺️', name: '¡Camino Dos!',    description: 'Complete Path 2',                        category: 'path', hidden: false, stackable: false },
  { id: 'path_3',  emoji: '🗺️', name: '¡Camino Tres!',   description: 'Complete Path 3',                        category: 'path', hidden: false, stackable: false },
  { id: 'path_4',  emoji: '🗺️', name: '¡Camino Cuatro!', description: 'Complete Path 4',                        category: 'path', hidden: false, stackable: false },
  { id: 'path_5',  emoji: '🗺️', name: '¡Camino Cinco!',  description: 'Complete Path 5 — A1 complete',          category: 'path', hidden: false, stackable: false },
  { id: 'path_6',  emoji: '🗺️', name: '¡Camino Seis!',   description: 'Complete Path 6',                        category: 'path', hidden: false, stackable: false },
  { id: 'path_7',  emoji: '🗺️', name: '¡Camino Siete!',  description: 'Complete Path 7',                        category: 'path', hidden: false, stackable: false },
  { id: 'path_8',  emoji: '🗺️', name: '¡Camino Ocho!',   description: 'Complete Path 8',                        category: 'path', hidden: false, stackable: false },
  { id: 'path_9',  emoji: '🗺️', name: '¡Camino Nueve!',  description: 'Complete Path 9',                        category: 'path', hidden: false, stackable: false },
  { id: 'path_10', emoji: '🗺️', name: '¡Camino Diez!',   description: 'Complete Path 10',                       category: 'path', hidden: false, stackable: false },
  { id: 'path_11', emoji: '🗺️', name: '¡Camino Once!',   description: 'Complete Path 11',                       category: 'path', hidden: false, stackable: false },
  { id: 'path_12', emoji: '🗺️', name: '¡Camino Doce!',   description: 'Complete Path 12 — A2 complete',         category: 'path', hidden: false, stackable: false },
  { id: 'path_13', emoji: '🗺️', name: '¡Camino Trece!',  description: 'Complete Path 13 — Intermediate begins', category: 'path', hidden: false, stackable: false },

  // Tier completions
  { id: 'tier_beginner',          emoji: '🎓', name: 'Beginner Graduate', description: 'Complete all Beginner Paths',          category: 'path', hidden: false, stackable: false },
  { id: 'tier_advanced_beginner', emoji: '🎓', name: 'Advanced Beginner', description: 'Complete all Advanced Beginner Paths', category: 'path', hidden: false, stackable: false },
  { id: 'tier_intermediate',      emoji: '🎓', name: 'Intermediate',      description: 'Complete your first Intermediate Path', category: 'path', hidden: false, stackable: false },

  // ── Mastery ────────────────────────────────────────────────────
  { id: 'mastery_1',   emoji: '📚', name: 'First Word Mastered',    description: 'Master your first word', category: 'mastery', hidden: false, stackable: false },
  { id: 'mastery_10',  emoji: '📚', name: '10 Words Mastered',      description: 'Master 10 words',        category: 'mastery', hidden: false, stackable: false },
  { id: 'mastery_25',  emoji: '📚', name: '25 Words Mastered',      description: 'Master 25 words',        category: 'mastery', hidden: false, stackable: false },
  { id: 'mastery_50',  emoji: '📚', name: '50 Words Mastered',      description: 'Master 50 words',        category: 'mastery', hidden: false, stackable: false },
  { id: 'mastery_75',  emoji: '📚', name: '75 Words Mastered',      description: 'Master 75 words',        category: 'mastery', hidden: false, stackable: false },
  { id: 'mastery_125', emoji: '📚', name: '125 Words Mastered',     description: 'Master 125 words',       category: 'mastery', hidden: false, stackable: false },
  { id: 'mastery_200', emoji: '📚', name: 'Almost There',           description: 'Master 200 words',       category: 'mastery', hidden: false, stackable: false },
  { id: 'mastery_309', emoji: '📚', name: 'Full Vocabulary Master', description: 'Master all words',       category: 'mastery', hidden: true,  stackable: false },

  // ── Drills ─────────────────────────────────────────────────────
  { id: 'drill_first', emoji: '🎯', name: 'First Drill', description: 'Complete your first drill', category: 'drill', hidden: false, stackable: false },
  { id: 'drill_10',    emoji: '🎯', name: '10 Drills',   description: 'Complete 10 drills',        category: 'drill', hidden: false, stackable: false },
  { id: 'drill_50',    emoji: '🎯', name: '50 Drills',   description: 'Complete 50 drills',        category: 'drill', hidden: false, stackable: false },
  { id: 'drill_100',   emoji: '🎯', name: 'Century',     description: 'Complete 100 drills',       category: 'drill', hidden: false, stackable: false },
  { id: 'drill_250',   emoji: '🎯', name: 'Dedicated',   description: 'Complete 250 drills',       category: 'drill', hidden: false, stackable: false },
  { id: 'drill_500',   emoji: '🎯', name: 'Obsessed',    description: 'Complete 500 drills',       category: 'drill', hidden: false, stackable: false },

  { id: 'drill_perfect',          emoji: '🎯', name: 'Perfect Score',     description: '10/10 on any drill',        category: 'drill', hidden: false, stackable: true  },
  { id: 'drill_perfect5',         emoji: '🎯', name: '5 Perfect Scores',  description: 'Get 5 perfect scores',      category: 'drill', hidden: false, stackable: false },
  { id: 'drill_perfect25',        emoji: '🎯', name: '25 Perfect Scores', description: 'Get 25 perfect scores',     category: 'drill', hidden: true,  stackable: false },
  { id: 'drill_perfect_streak_3', emoji: '🎯', name: 'Hat Trick',         description: '3 perfect scores in a row', category: 'drill', hidden: false, stackable: false },
  { id: 'drill_perfect_streak_5', emoji: '🎯', name: 'On Fire',           description: '5 perfect scores in a row', category: 'drill', hidden: false, stackable: false },

  { id: 'drill_first_match',       emoji: '🎯', name: 'Matcher',        description: 'Complete your first Matching drill',          category: 'drill', hidden: false, stackable: false },
  { id: 'drill_first_gender',      emoji: '🎯', name: 'Gender Bender',  description: 'Complete your first Gender drill',            category: 'drill', hidden: false, stackable: false },
  { id: 'drill_first_conjugation', emoji: '🎯', name: 'Conjugator',     description: 'Complete your first Conjugation drill',       category: 'drill', hidden: false, stackable: false },
  { id: 'drill_first_sent_build',  emoji: '🎯', name: 'Sentence Maker', description: 'Complete your first Sentence Builder drill',  category: 'drill', hidden: false, stackable: false },
  { id: 'drill_first_shadow',      emoji: '🎯', name: 'Shadow',         description: 'Complete your first Shadowing drill',         category: 'drill', hidden: false, stackable: false },
  { id: 'drill_first_fill',        emoji: '🎯', name: 'Fill It In',     description: 'Complete your first Fill in the Blank drill', category: 'drill', hidden: false, stackable: false },
  { id: 'drill_first_listen',      emoji: '🎯', name: 'Good Ears',      description: 'Complete your first Listen and Type drill',   category: 'drill', hidden: false, stackable: false },
  { id: 'drill_first_hear',        emoji: '🎯', name: 'Sharp Ears',     description: 'Complete your first Hear and Choose drill',   category: 'drill', hidden: false, stackable: false },

  { id: 'drill_all_types', emoji: '🎯', name: 'Swiss Army Dog', description: 'Complete every standalone drill type at least once', category: 'drill', hidden: false, stackable: false },

  { id: 'break_free',  emoji: '🔗', name: 'Unchained',         description: 'Complete your first Break Free', category: 'drill', hidden: false, stackable: false },
  { id: 'fetch_first', emoji: '🐕', name: 'First Fetch',       description: 'Complete your first Fetch',      category: 'drill', hidden: false, stackable: false },
  { id: 'fetch_10',    emoji: '🐕', name: '10 Fetch Sessions', description: 'Complete 10 Fetch sessions',     category: 'drill', hidden: false, stackable: false },

  // ── Bones ──────────────────────────────────────────────────────
  { id: 'bones_50',  emoji: '🦴', name: 'Bone Collector', description: 'Earn 50 bones in total',  category: 'bones', hidden: false, stackable: false },
  { id: 'bones_100', emoji: '🦴', name: 'Bone Hoarder',   description: 'Earn 100 bones in total', category: 'bones', hidden: false, stackable: false },
  { id: 'bones_250', emoji: '🦴', name: 'Treasure Chest', description: 'Earn 250 bones in total', category: 'bones', hidden: false, stackable: false },
  { id: 'bones_500', emoji: '🦴', name: 'Bone Baron',     description: 'Earn 500 bones in total', category: 'bones', hidden: false, stackable: false },

  // ── Engagement ─────────────────────────────────────────────────
  { id: 'early_bird',   emoji: '🌅', name: 'Early Bird',  description: 'Complete a drill before 8am',         category: 'engagement', hidden: false, stackable: true  },
  { id: 'night_owl',    emoji: '🌙', name: 'Night Owl',   description: 'Complete a drill after 10pm',         category: 'engagement', hidden: false, stackable: true  },
  { id: 'daily_goal_7', emoji: '🎯', name: 'Goal Setter', description: 'Hit your daily goal 7 days in a row', category: 'engagement', hidden: false, stackable: false },

  // ── Social ─────────────────────────────────────────────────────
  { id: 'first_friend', emoji: '🐾', name: 'Pack Member', description: 'Add your first friend', category: 'social', hidden: false, stackable: false },

  // ── Special / Hidden ───────────────────────────────────────────
  { id: 'ghost',            emoji: '💀', name: 'Ghost',              description: 'Missed 7 days then returned',              category: 'special', hidden: true,  stackable: false },
  { id: 'founding_paw',     emoji: '🐾', name: 'Founding Paw',       description: 'Joined before 1,000 users',                category: 'special', hidden: false, stackable: false },
  { id: 'milo_monday_2026', emoji: '🐾', name: 'Milo Monday 2026',   description: 'Celebrated the first Milo Monday',         category: 'special', hidden: false, stackable: false },
  { id: 'milo_monday_2027', emoji: '🐾', name: 'Milo Monday 2027',   description: 'Celebrated Milo Monday 2027',              category: 'special', hidden: false, stackable: false },
  { id: 'perfect_path',     emoji: '⭐', name: 'Flawless',           description: 'Complete all stops in a Path with no wrong answers', category: 'special', hidden: false, stackable: false },
  { id: 'molly',            emoji: '❤️', name: 'In Memory of Molly', description: 'Unlock Molly companion',                   category: 'special', hidden: true,  stackable: false },
];
```

---

### Task 2 — Replace frontend/src/utils/evaluateBadges.js

Replace the entire file with this content:

```js
import { languageConfig } from '../config/languageConfig';
import { BADGES } from '../data/badges';
import { MASTER } from '../content/es-en/words';

const PRACTICE_DRILL_IDS = new Set([
  languageConfig.drillDirectionId, languageConfig.reverseDrillDirectionId,
  'type-es-en', 'type-en-es', 'conjugation', 'listen-type', 'listen-type-en-es',
  'listen-type-sentence', 'listen-type-sentence-en-es', 'sent-build',
  'fill-blank', 'fill-blank-typed', 'gender', 'hear-choose', 'hear-choose-en-es',
  'matching', 'shadow',
]);

const ALL_DRILL_TYPES = new Set([
  'es-en', 'en-es', 'type-es-en', 'type-en-es',
  'hear-choose', 'hear-choose-en-es',
  'listen-type', 'listen-type-en-es',
  'listen-type-sentence', 'listen-type-sentence-en-es',
  'conjugation', 'sent-build', 'fill-blank', 'fill-blank-typed',
  'matching', 'gender', 'word-sort', 'shadow',
]);

const BEGINNER_PATHS = ['path1','path2','path3','path4'];
const ADVANCED_BEGINNER_PATHS = ['path5','path6','path7','path8','path9','path10','path11','path12'];

function addOrUpdate(badges, id, now) {
  const def = BADGES.find(b => b.id === id);
  if (!def) return { badges, isNew: false };
  const idx = badges.findIndex(b => b.id === id);
  if (idx === -1) {
    return { badges: [...badges, { id, count: 1, earnedAt: now }], isNew: true };
  }
  if (!def.stackable) return { badges, isNew: false };
  const updated = [...badges];
  updated[idx] = { ...updated[idx], count: updated[idx].count + 1, earnedAt: now };
  return { badges: updated, isNew: true };
}

export function evaluateBadges(prevData, nextData, eventType, eventPayload) {
  const now = new Date().toISOString();
  let badges = [...(nextData.earnedBadges || [])];
  const newlyEarned = [];

  function earn(id) {
    const { badges: next, isNew } = addOrUpdate(badges, id, now);
    badges = next;
    if (isNew) newlyEarned.push(id);
  }

  function has(id) {
    return badges.some(b => b.id === id);
  }

  function stackCount(id) {
    const b = badges.find(b => b.id === id);
    return b ? b.count : 0;
  }

  if (eventType === 'drill_complete') {
    const { drillId, correct, total, ts } = eventPayload;
    const sessions = nextData.sessions || [];
    const totalDrills = nextData.totalDrills || 0;

    if (totalDrills >= 1   && !has('drill_first')) earn('drill_first');
    if (totalDrills >= 10  && !has('drill_10'))    earn('drill_10');
    if (totalDrills >= 50  && !has('drill_50'))    earn('drill_50');
    if (totalDrills >= 100 && !has('drill_100'))   earn('drill_100');
    if (totalDrills >= 250 && !has('drill_250'))   earn('drill_250');
    if (totalDrills >= 500 && !has('drill_500'))   earn('drill_500');

    if (correct === total && total >= 10) {
      earn('drill_perfect');
      const perfCount = stackCount('drill_perfect');
      if (perfCount >= 5  && !has('drill_perfect5'))  earn('drill_perfect5');
      if (perfCount >= 25 && !has('drill_perfect25')) earn('drill_perfect25');
      const newStreak = nextData.perfectStreak || 0;
      if (newStreak >= 3 && !has('drill_perfect_streak_3')) earn('drill_perfect_streak_3');
      if (newStreak >= 5 && !has('drill_perfect_streak_5')) earn('drill_perfect_streak_5');
    }

    const drillFirstMap = {
      'matching':                   'drill_first_match',
      'gender':                     'drill_first_gender',
      'conjugation':                'drill_first_conjugation',
      'sent-build':                 'drill_first_sent_build',
      'shadow':                     'drill_first_shadow',
      'fill-blank':                 'drill_first_fill',
      'fill-blank-typed':           'drill_first_fill',
      'listen-type':                'drill_first_listen',
      'listen-type-en-es':          'drill_first_listen',
      'listen-type-sentence':       'drill_first_listen',
      'listen-type-sentence-en-es': 'drill_first_listen',
      'hear-choose':                'drill_first_hear',
      'hear-choose-en-es':          'drill_first_hear',
    };
    const firstBadge = drillFirstMap[drillId];
    if (firstBadge && !has(firstBadge)) earn(firstBadge);

    const seenDrillIds = new Set(sessions.map(s => s.drillId));
    if ([...ALL_DRILL_TYPES].every(id => seenDrillIds.has(id)) && !has('drill_all_types')) {
      earn('drill_all_types');
    }

    const hour = new Date(ts).getHours();
    if (hour < 8)   earn('early_bird');
    if (hour >= 22) earn('night_owl');

    const prevLastDate = prevData?.streak?.lastDate;
    if (prevLastDate && !has('ghost')) {
      const daysDiff = (Date.now() - new Date(prevLastDate).getTime()) / 86400000;
      if (daysDiff > 7 && (nextData.streak?.count || 0) > 0) earn('ghost');
    }

    if (drillId === 'break-free' && !has('break_free')) earn('break_free');
    if (drillId === 'fetch') {
      const fetchCount = sessions.filter(s => s.drillId === 'fetch').length;
      if (fetchCount >= 1  && !has('fetch_first')) earn('fetch_first');
      if (fetchCount >= 10 && !has('fetch_10'))    earn('fetch_10');
    }
  }

  if (eventType === 'answer') {
    const xp = nextData.xp || 0;
    for (const [threshold, id] of [[500,'xp_500'],[2000,'xp_2000'],[5000,'xp_5000'],[12500,'xp_12500'],[25000,'xp_25000'],[50000,'xp_50000']]) {
      if (xp >= threshold && !has(id)) earn(id);
    }

    const streakCount = nextData.streak?.count || 0;
    for (const [threshold, id] of [[3,'streak_3'],[7,'streak_7'],[30,'streak_30'],[100,'streak_100']]) {
      if (streakCount >= threshold && !has(id)) earn(id);
    }

    const masteredCount = MASTER.filter(w => (nextData.progress?.[w.es]?.s || 0) >= 6).length;
    for (const [threshold, id] of [[1,'mastery_1'],[10,'mastery_10'],[25,'mastery_25'],[50,'mastery_50'],[75,'mastery_75'],[125,'mastery_125'],[200,'mastery_200'],[MASTER.length,'mastery_309']]) {
      if (masteredCount >= threshold && !has(id)) earn(id);
    }

    const totalBones = nextData.totalBonesEarned || 0;
    for (const [threshold, id] of [[50,'bones_50'],[100,'bones_100'],[250,'bones_250'],[500,'bones_500']]) {
      if (totalBones >= threshold && !has(id)) earn(id);
    }

    const dailyGoalStreak = nextData.dailyGoalStreak || 0;
    if (dailyGoalStreak >= 7 && !has('daily_goal_7')) earn('daily_goal_7');
  }

  if (eventType === 'stop_complete') {
    const { stopId } = eventPayload;
    const firstStopMap = {
      'p1s1':'stop_1_1','p2s1':'stop_2_1','p3s1':'stop_3_1','p4s1':'stop_4_1',
      'p5s1':'stop_5_1','p6s1':'stop_6_1','p7s1':'stop_7_1','p8s1':'stop_8_1',
      'p9s1':'stop_9_1','p10s1':'stop_10_1','p11s1':'stop_11_1','p12s1':'stop_12_1','p13s1':'stop_13_1',
    };
    const midStopMap = {
      'p1s3':'stop_1_3','p2s3':'stop_2_3','p3s3':'stop_3_3','p4s3':'stop_4_3',
      'p5s3':'stop_5_3','p6s3':'stop_6_3','p7s3':'stop_7_3','p8s3':'stop_8_3',
      'p9s3':'stop_9_3','p10s3':'stop_10_3','p11s3':'stop_11_3','p12s3':'stop_12_3','p13s3':'stop_13_3',
    };
    const finalStopMap = {
      'p1s5':'stop_1_5','p2s5':'stop_2_5','p3s5':'stop_3_5','p4s5':'stop_4_5',
      'p5s5':'stop_5_5','p6s5':'stop_6_5','p7s5':'stop_7_5','p8s5':'stop_8_5',
      'p9s5':'stop_9_5','p10s5':'stop_10_5','p11s5':'stop_11_5','p12s5':'stop_12_5','p13s5':'stop_13_5',
    };
    const b1 = firstStopMap[stopId]; if (b1 && !has(b1)) earn(b1);
    const b2 = midStopMap[stopId];   if (b2 && !has(b2)) earn(b2);
    const b3 = finalStopMap[stopId]; if (b3 && !has(b3)) earn(b3);
  }

  if (eventType === 'path_complete') {
    const { pathId } = eventPayload;
    const completedPaths = nextData.completedPaths || [];
    const pathBadgeMap = {
      'path1':'path_1','path2':'path_2','path3':'path_3','path4':'path_4',
      'path5':'path_5','path6':'path_6','path7':'path_7','path8':'path_8',
      'path9':'path_9','path10':'path_10','path11':'path_11','path12':'path_12','path13':'path_13',
    };
    const pathBadge = pathBadgeMap[pathId];
    if (pathBadge && !has(pathBadge)) earn(pathBadge);

    if (BEGINNER_PATHS.every(p => completedPaths.includes(p)) && !has('tier_beginner')) earn('tier_beginner');
    if (ADVANCED_BEGINNER_PATHS.every(p => completedPaths.includes(p)) && !has('tier_advanced_beginner')) earn('tier_advanced_beginner');
    if (pathId === 'path13' && !has('tier_intermediate')) earn('tier_intermediate');
  }

  if (eventType === 'login') {
    if (nextData.foundingPaw && !has('founding_paw')) earn('founding_paw');
    if ((nextData.friends || []).length >= 1 && !has('first_friend')) earn('first_friend');
  }

  return { updatedBadges: badges, newlyEarned };
}
```

---

### Task 3 — Wire evaluateBadges into completeStop and completePathFetch in frontend/src/SpanishHub.jsx

**3a. completeStop** — find this exact block:

```js
const completeStop = useCallback((stopId) => {
  setUserData(prev => {
    const already = (prev.completedStops || []).includes(stopId);
    if (already) return prev;
    const completedStops = [...(prev.completedStops || []), stopId];
    const newData = { ...prev, completedStops };
    persistData(newData);
    return newData;
  });
}, [persistData]);
```

Replace it with:

```js
const completeStop = useCallback((stopId) => {
  setUserData(prev => {
    const already = (prev.completedStops || []).includes(stopId);
    if (already) return prev;
    const completedStops = [...(prev.completedStops || []), stopId];
    let newData = { ...prev, completedStops };
    const { updatedBadges: stopBadges } = evaluateBadges(prev, newData, 'stop_complete', { stopId });
    newData = { ...newData, earnedBadges: stopBadges };
    persistData(newData);
    return newData;
  });
}, [persistData]);
```

**3b. completePathFetch** — find this exact block:

```js
const newData = {
  ...prev,
  completedPaths,
  bones: (prev.bones || 0) + 15,
  xp: (prev.xp || 0) + 75,
  weeklyXP: (sameWeek ? (prev.weeklyXP || 0) : 0) + 75,
  weekStart: ws,
};
persistData(newData);
return newData;
```

Replace it with:

```js
let newData = {
  ...prev,
  completedPaths,
  bones: (prev.bones || 0) + 15,
  xp: (prev.xp || 0) + 75,
  weeklyXP: (sameWeek ? (prev.weeklyXP || 0) : 0) + 75,
  weekStart: ws,
};
const { updatedBadges: pathBadges } = evaluateBadges(prev, newData, 'path_complete', { pathId });
newData = { ...newData, earnedBadges: pathBadges };
persistData(newData);
return newData;
```

---

### Task 4 — Add 3 new fields to default userData and wire their counters in frontend/src/SpanishHub.jsx

**4a.** Find the default userData object (around line 121 where earnedBadges: [] lives). Add these three fields:

```js
totalDrills: 0,
totalBonesEarned: 0,
perfectStreak: 0,
```

**4b.** In onDrillDone, after the sessions array is built, increment totalDrills and perfectStreak. Find the line that builds the sessions array:

```js
const sessions = [{ drillId: sessionDrillId, correct, total, date: today, ts: Date.now() }, ...(prev.sessions || []).slice(0, 49)];
```

Immediately after that line, add:

```js
const totalDrills = (prev.totalDrills || 0) + 1;
const isPerfect = total > 0 && correct === total;
const perfectStreak = isPerfect ? (prev.perfectStreak || 0) + 1 : 0;
```

Then include totalDrills and perfectStreak in newData before evaluateBadges is called.

**4c.** Find the onAwardBones function. Add totalBonesEarned increment alongside the bones increment:

```js
totalBonesEarned: (prev.totalBonesEarned || 0) + amount,
```

---

### What Emergent must NOT do

- Do not modify BadgeGrid.jsx
- Do not add toast or notification UI — that is Session B
- Do not add path_14 or any badge not in the list above
- Do not touch Firebase Auth logic or Firestore security rules
- Do not reorder the session plan

---

### Verification steps

1. Complete Stop p1s1 → stop_1_1 badge appears in BadgeGrid
2. Complete Stop p1s3 → stop_1_3 badge appears
3. Complete Stop p1s5 → stop_1_5 badge appears
4. Complete Path 1 challenge → path_1 badge appears
5. Complete all 4 Beginner Paths → tier_beginner badge appears
6. Complete a standalone drill → drill_first badge appears, totalDrills increments in Firestore
7. Get 10/10 on a drill → drill_perfect badge appears, perfectStreak increments
8. Get 10/10 three times in a row → drill_perfect_streak_3 appears
9. Award bones → totalBonesEarned increments in Firestore
10. Reach 50 total bones earned → bones_50 badge appears
11. Open BadgeGrid → all 103 badges render, unearned show locked state

---

### Estimated tokens: 8–12

Three files touched. No new components. Largest cost is the file replacements — both badge files are long. Pre-flight check mandatory.

---

## Emergent Session Plan (~100 tokens)

| # | Session | What Gets Built | Est. Tokens |
|---|---|---|---|
| A | Badge triggers | earnedBadges[] wired across drill complete, Stop complete, Path complete, streak milestones | 8–12 |
| B | Friend + Admin notifications | Friend added notification, admin alert notification (community pack submissions) | 10–15 |
| C | Bones & streak freeze system | Freeze purchase UI, freeze logic, streak protection, Firestore writes | 10–15 |
| D | YouTube player in Stop UI | DEFERRED — v3. videoUrl field already in paths.js, ready when needed | — |
| E | Milo vocabulary awareness | Milo AI chat knows user's learned words, progress, references them in conversation | 8–12 |
| F | Fetch standalone mode | Full Fetch session experience separate from Paths, FSRS-driven across all completed Stops | 10–15 |
| G | Break Free / ¡Libre! | Animation state machine, chain-snap celebration, Milo pose integration, Fetch unlock trigger | 15–20 |
| — | Setup waste budget | Pre-flight repo checks, brief corrections | 5 |
| **Total** | | | **66–79** |

**Session order is locked — do not reorder:**
A → B → C → E → F → G
Session D deferred to v3. All other sessions unchanged.
Each session is independent enough to run cleanly. Break Free goes last — highest risk, depends on Milo poses existing.

---

## What Must Be Complete Before Emergent Sessions

### 🔴 Critical — Emergent sessions depend on these

- [ ] **Milo poses generated in Google Flow**
  Required before Session G (Break Free). Minimum poses needed:
  - `milo_straining.gif` — Milo pulling at chain, urgency, effort
  - `milo_free.gif` — Milo running free, joyful, overjoyed
  - `milo_celebrating.gif` — celebration pose for Path/Stop completion
  - `milo_wrong_tilt.gif` — head tilt, uncertain expression
  - `milo_encouraging.gif` — warm, supportive look after wrong answer
  All generated with white background. Same style as milo_idle.gif. Purple collar, gold MILO tag.
  Flow prompt template: "Milo the black lab [pose description], white background, purple collar, gold bone-shaped MILO tag, semi-realistic cartoon style, seamless loop"

- [ ] **Full Paths loop tested end to end**
  Go through a complete Stop: Phase 1 → Phase 2 → Phase 3 → Stop complete → next Stop unlocked.
  Document every bug found. Fix all before Emergent.
  Use Firebase emulator — not the live database.

- [ ] **State Ledger specs written for all 6 Emergent sessions (A, B, C, E, F, G)**
  Write one spec per session in Claude Projects before Emergent month starts.
  Each spec defines: state ownership, Firestore writes, component changes, props, callbacks.
  Do not open Emergent without a spec. Emergent executes — it does not plan.

### 🟡 Important — improves session quality

- [ ] **ChoiceDrill sounds wired**
  playCorrect and playAlmost not imported or called in ChoiceDrill.
  Claude Code — single file, 15 minutes.

- [ ] **Word mastery filter buttons wired in Words tab**
  Filter by New / Learning / Strong / Mastered using FSRS stability thresholds.
  Claude Code task.

- [x] **contextSentence verified on all words** — CLOSED 2026-06-27, 414/414 complete

- [ ] **imageUrl verified loading in Phase 1**
  Open a Stop, go through Phase 1. Do images load or show ImageOff fallback?
  If all showing fallback — Picsum URLs may need verifying or replacing with real images.

- [ ] **Community Word Packs import fixed**
  Bug 2.10 — import not saving correctly. Claude Code fix.

- [ ] **Community Word Packs entry form**
  ES/EN fields side by side. Claude Code fix.

- [ ] **Word detail card tap position**
  Opens at screen center instead of tap position. Claude Code fix.

- [ ] **Sentence Builder distractors bug**
  Claude Code fix — investigate and repair.

- [ ] **saber orphaned conjugation forms**
  sabes/sabe/sabemos/saben not assigned to any Path/Stop in paths.js.
  Noted 2026-06-15 — confirm whether swept into curriculum rebuild or still open.

- [ ] **Security cleanup**
  firebase-admin, node-fetch, next-themes flagged for removal from frontend/package.json.
  Claude Code — one command.

### 🟢 Nice to have — not blocking

- [x] **Contextual Binding post-answer step** — CLOSED 2026-06-27, removed entirely (sentence drills surface context naturally)

- [x] **console.log audit** — CLOSED 2026-06-27, one removed, codebase clean

- [x] **Bones verified incrementing in header** — CLOSED 2026-06-27, confirmed working, render body refactored

- [x] **Scroll fix in PathsTab** — CLOSED 2026-06-27, two-button row layout resolves the issue

- [ ] **Full Milo pose spec built**
  Document every pose needed across the entire app, with Flow prompts for each.
  Do in Claude Projects — one session.

- [ ] **5 new words per day soft nudge**
  After 5 new words in a session, Milo suggests reviewing before adding more.
  Claude Code.

- [ ] **Streak reminder styling**
  Make streak reminder stand out more visually.
  Claude Code / CSS only.

- [ ] **ProfileSheet milo-speaks.com yellow pill link**
  Add link to landing page in profile header.
  Claude Code.

---

## Play Store Readiness Checklist

### 🔴 Technical — app must work

- [ ] **Paths loop stable** — no crashes, no broken navigation, complete Stop flow working
- [ ] **All known bugs fixed** — see Known Bugs in ledger
- [ ] **Firebase emulator testing complete** — run full user journey against emulator before submission
- [ ] **No console.log in production code** — CLEAN as of 2026-06-27
- [ ] **Firestore security rules reviewed** — no open reads/writes
- [ ] **Environment variables verified** — all set in Vercel Production + Preview
- [ ] **PWA manifest complete** — name, icons, theme colour, display mode all correct
- [ ] **Offline behaviour defined** — what happens with no connection? At minimum: graceful error, not crash
- [ ] **Performance audit** — Lighthouse score, bundle size, lazy loading critical paths
- [ ] **Sentry error monitoring verified** — errors being captured and reported

### 🔴 Store listing — required by Google

- [ ] **Google Play Developer account** — $25 one-time fee, pay when ready
- [ ] **App icon** — 512×512 PNG, no alpha channel, no rounded corners (Google applies them)
- [ ] **Feature graphic** — 1024×500 PNG (the banner shown in store listing)
- [ ] **Screenshots** — minimum 2, maximum 8, phone screenshots (1080×1920 or similar)
- [ ] **Short description** — 80 characters max
- [ ] **Full description** — 4000 characters max
- [ ] **Privacy Policy URL** — required for any app. Host on milo-speaks.com/privacy
- [ ] **Content rating questionnaire** — Google asks about content type, answer honestly (Educational)
- [ ] **Target audience** — declare age range (13+ recommended, requires COPPA consideration)
- [ ] **App category** — Education

### 🟡 Legal & compliance

- [ ] **Privacy Policy written** — must cover: data collected (email, progress), Firebase, Gemini API, PostHog, Sentry
- [ ] **Terms of Service written** — basic T&S covering app usage
- [ ] **COPPA compliance** — if targeting under 13, strict rules apply. Recommend 13+ to avoid.
- [ ] **GDPR consideration** — if EU users, data handling disclosure required
- [ ] **Charitable giving disclosure** — 80/20 model must be documented somewhere public before it's stated anywhere

### 🟡 Store presence

- [ ] **Milo Speaks Spanish app title** — confirm this is the final name
- [ ] **Package name locked** — `com.milospeaks.spanish` or similar — cannot change after publish
- [ ] **Version numbering** — start at 1.0.0, semantic versioning from here
- [ ] **Release track** — Internal → Closed Testing → Open Testing → Production. Don't go straight to Production.
- [ ] **Play Store listing copy written** — description, short description, what's new

### 🟢 Growth & monetisation readiness

- [ ] **Ko-fi page live and linked** — already exists, verify link in app
- [ ] **Reddit community active** — r/MiloSpeaksSpanish, post before Play Store launch
- [ ] **milo-speaks.com landing page polished** — app store badge added after submission
- [ ] **1,000 MAU for 60 days** — required before charity model goes public
- [ ] **First revenue distribution made** — required before charity model story is told publicly
- [ ] **YouTube channel set up** — Milo Speaks Spanish channel, art, description, links (v3)
- [ ] **AdSense application** — after 1,000 subscribers + 4,000 watch hours (v3)

### 🔴 Emergent sessions complete

- [ ] **All 6 Emergent sessions done** — badges, notifications, bones/freeze, Milo awareness, Fetch, Break Free
- [ ] **Break Free tested** — ¡Libre! chain-snap working, Fetch unlock working
- [ ] **Milo AI tutor stable** — vocabulary awareness working, 30/day limit enforced

---

## Remaining Work Plan — June 27 → July 2026

### This week (June 27 – July 1)
- Firebase emulator full journey test — document every bug found
- Fix ChoiceDrill sounds (Claude Code, 15 min)
- Security cleanup — remove firebase-admin, node-fetch, next-themes
- Confirm saber orphaned conjugation forms open or closed
- Generate 5 Milo poses in Google Flow
- Run Pre-Emergent Cleanup Session (~July 1, 15–20 tokens)

### Week of July 1–7
- Fix all bugs found in emulator journey test
- Wire mastery filter buttons in Words tab
- Fix Community Word Packs bugs
- Fix word detail card tap position
- Fix Sentence Builder distractors bug
- Write State Ledger specs for Sessions A, B, C

### Week of July 7–14
- Streak reminder styling
- ProfileSheet link
- 5 new words nudge
- Write State Ledger specs for Sessions E, F, G
- Review all specs before Emergent

### Week of July 14–21
- Privacy Policy + Terms of Service written
- Play Store developer account created
- App icon + feature graphic + screenshots created
- Firebase emulator re-test after bug fixes

### Month end — July 2026
- Emergent tokens reset
- Run all 6 sessions in order (A → B → C → E → F → G)
- Push to Play Store internal testing track

---

## Definition of Done — Ready to Clone

- [ ] On Google Play Store (internal testing minimum)
- [ ] All 6 Emergent sessions complete
- [ ] All known bugs fixed
- [ ] Paths loop stable for 30+ days with real users
- [ ] At least 500 MAU
- [ ] Monorepo prep P1–P3 complete
- [ ] No open critical bugs
- [ ] Milo AI tutor vocabulary-aware
- [ ] Break Free mechanic live
- [ ] Charitable model publicly activated (1,000 MAU + first distribution)

**Estimated clone-ready date: September–October 2026**
