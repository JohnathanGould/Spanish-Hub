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

**4a.** Find the default userData object (around line 121 where earnedBadges: [] lives). Add these five fields:

```js
totalDrills: 0,
totalBonesEarned: 0,
perfectStreak: 0,
dailyGoalStreak: 0,
dailyGoalStreakDate: null,
```

**4b.** In onDrillDone, after the sessions array is built, increment totalDrills, perfectStreak, and dailyGoalStreak. Find the line that builds the sessions array:

```js
const sessions = [{ drillId: sessionDrillId, correct, total, date: today, ts: Date.now() }, ...(prev.sessions || []).slice(0, 49)];
```

Immediately after that line, add:

```js
const totalDrills = (prev.totalDrills || 0) + 1;
const isPerfect = total > 0 && correct === total;
const perfectStreak = isPerfect ? (prev.perfectStreak || 0) + 1 : 0;

// Daily goal streak — increment if user hit their daily goal today, reset if they missed yesterday
const today2 = new Date().toDateString();
const yesterday2 = new Date(Date.now() - 86400000).toDateString();
const dailyCount = (prev.dailyProgress?.date === today2 ? prev.dailyProgress.count : 0) + 1;
const dailyGoal = prev.dailyGoal || 10;
const hitGoalToday = dailyCount >= dailyGoal;
const prevGoalDate = prev.dailyGoalStreakDate;
const dailyGoalStreak = hitGoalToday
  ? (prevGoalDate === yesterday2 ? (prev.dailyGoalStreak || 0) + 1 : prevGoalDate === today2 ? (prev.dailyGoalStreak || 0) : 1)
  : (prev.dailyGoalStreak || 0);
const dailyGoalStreakDate = hitGoalToday ? today2 : (prev.dailyGoalStreakDate || null);
```

Then include totalDrills, perfectStreak, dailyGoalStreak, and dailyGoalStreakDate in newData before evaluateBadges is called.

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

---

## Emergent Session B — Toast Notifications + Friend Badge Fix

### Classification
- **Type:** Wiring + mount
- **Risk:** Low. Toast infrastructure is fully installed, just never mounted. One new mount, three consumption points, one badge fix.
- **Stage:** 3 — stabilization
- **Affected files:** SpanishHub.jsx, frontend/src/components/FriendsList.jsx
- **Pattern:** Parent Fan-Out — SpanishHub owns all state mutations and toast triggers

---

### What the problem is

1. `evaluateBadges()` returns `newlyEarned` at every call site. It is discarded every time. Users earn badges silently — no feedback.
2. `<Toaster />` from `frontend/src/components/ui/toaster.jsx` is installed but never mounted. No toast can appear anywhere in the app.
3. `first_friend` badge checks `friends.length` on `login` event only — never fires when a friend is actually added.
4. `sonner.jsx` imports `next-themes` (on security cleanup list) and is never used.

---

### Pre-flight confirmation — Emergent must report first 3 lines of each file before touching anything
frontend/src/SpanishHub.jsx

frontend/src/components/ui/toaster.jsx

frontend/src/hooks/use-toast.js

frontend/src/components/FriendsList.jsx

---

### Task 1 — Mount the toaster in frontend/src/SpanishHub.jsx

Import `Toaster` at the top of SpanishHub.jsx:

```js
import { Toaster } from './components/ui/toaster';
```

Add `<Toaster />` once inside the return, at the root level alongside the existing modal stack. It must be outside all conditional renders so it is always present.

---

### Task 2 — Import toast and consume newlyEarned at all three evaluateBadges call sites

Import at the top of SpanishHub.jsx:

```js
import { useToast } from './hooks/use-toast';
```

Add inside the component function, near the top with other hooks:

```js
const { toast } = useToast();
```

**Call site 1 — login (line ~251)**

Find:
```js
const { updatedBadges } = evaluateBadges({}, merged, 'login', {});
```

Replace with:
```js
const { updatedBadges, newlyEarned: loginBadges } = evaluateBadges({}, merged, 'login', {});
loginBadges.forEach(id => {
  const def = BADGES.find(b => b.id === id);
  if (def) toast({ title: `${def.emoji} Badge Earned`, description: def.name });
});
```

Note: `toast` is not available inside `setUserData` callbacks (they run outside React render). The login call site already runs outside `setUserData` so toast is safe to call here directly.

**Call site 2 — answer (line ~466, inside updateWordProgress → setUserData)**

The answer call site runs inside `setUserData`. Toasts cannot be called inside `setUserData`. Use a ref to queue badges and fire after the state update settles.

Add near the top of the component:

```js
const pendingBadgeToasts = useRef([]);
```

Find:
```js
const { updatedBadges } = evaluateBadges(prev, newData, 'answer', {});
```

Replace with:
```js
const { updatedBadges, newlyEarned: answerBadges } = evaluateBadges(prev, newData, 'answer', {});
if (answerBadges.length > 0) pendingBadgeToasts.current = [...pendingBadgeToasts.current, ...answerBadges];
```

Then after the `setUserData` call in `updateWordProgress`, add:

```js
if (pendingBadgeToasts.current.length > 0) {
  pendingBadgeToasts.current.forEach(id => {
    const def = BADGES.find(b => b.id === id);
    if (def) toast({ title: `${def.emoji} Badge Earned`, description: def.name });
  });
  pendingBadgeToasts.current = [];
}
```

**Call site 3 — drill_complete (line ~531, inside onDrillDone → setUserData)**

Same pattern as call site 2 — inside `setUserData`, use the same `pendingBadgeToasts` ref.

Find:
```js
const { updatedBadges } = evaluateBadges(prev, newData, 'drill_complete', { drillId, correct, total, ts: Date.now() });
```

Replace with:
```js
const { updatedBadges, newlyEarned: drillBadges } = evaluateBadges(prev, newData, 'drill_complete', { drillId, correct, total, ts: Date.now() });
if (drillBadges.length > 0) pendingBadgeToasts.current = [...pendingBadgeToasts.current, ...drillBadges];
```

Then after the `setUserData` call in `onDrillDone`, flush the same way as call site 2.

---

### Task 3 — Friend toast + first_friend badge fix in frontend/src/SpanishHub.jsx

The `addFriend` function never calls `evaluateBadges`, so `first_friend` never triggers. Fix both the badge and add a toast.

Find:
```js
const addFriend = useCallback((fid) => {
  setUserData(prev => {
    if ((prev.friends || []).includes(fid)) return prev;
    const newData = { ...prev, friends: [...(prev.friends || []), fid] };
    persistData(newData);
    return newData;
  });
}, [persistData]);
```

Replace with:
```js
const addFriend = useCallback((fid) => {
  let friendBadges = [];
  setUserData(prev => {
    if ((prev.friends || []).includes(fid)) return prev;
    let newData = { ...prev, friends: [...(prev.friends || []), fid] };
    const { updatedBadges, newlyEarned } = evaluateBadges(prev, newData, 'login', {});
    newData = { ...newData, earnedBadges: updatedBadges };
    friendBadges = newlyEarned;
    persistData(newData);
    return newData;
  });
  setTimeout(() => {
    toast({ title: '🐾 Friend Added', description: 'Your pack is growing!' });
    friendBadges.forEach(id => {
      const def = BADGES.find(b => b.id === id);
      if (def) toast({ title: `${def.emoji} Badge Earned`, description: def.name });
    });
  }, 0);
}, [persistData, toast]);
```

Note: `setTimeout(..., 0)` defers the toast until after the `setUserData` callback completes. This is the same pattern as `pendingBadgeToasts` but scoped locally since this is a one-off callback rather than a hot path.

---

### Task 4 — Delete frontend/src/components/ui/sonner.jsx

This file imports `next-themes` (flagged for security cleanup) and is never used anywhere in the app. Delete it. Confirm no import of sonner exists in any other file before deleting.

---

### What Emergent must NOT do

- Do not build a notification bell, notification drawer, or notification history UI — that is a future session
- Do not build admin alerts — no admin system exists yet
- Do not modify the toast component files (toaster.jsx, toast.jsx, use-toast.js) — use them as-is
- Do not touch Firebase Auth logic, Firestore security rules, or api/chat.js
- Do not add any new Firestore collections or documents

---

### Verification steps

1. Complete a drill → toast appears with badge name and emoji if badge earned
2. Complete Stop p1s1 → stop_1_1 badge toast appears
3. Complete Path 1 → path_1 badge toast appears
4. Add a friend → "Your pack is growing!" toast appears
5. Add first friend ever → first_friend badge toast also appears
6. Log in with founding_paw flag set → founding_paw badge toast appears on login
7. Open BadgeGrid → earned badges show correctly, not duplicated
8. Confirm sonner.jsx is deleted and no import errors in build

---

### Estimated tokens: 6–8

No new components. One mount, three wiring changes, one badge fix, one file deletion. Pre-flight check mandatory.

---

---

## Emergent Session C — Bones & Streak Shield System

### Classification
- **Type:** Feature build — new toggle UI, new spending logic, new streak intercept
- **Risk:** Medium. Touches streak logic (high consequence if broken), bones balance, and ProfileSheet UI.
- **Stage:** 3 — stabilization
- **Affected files:** SpanishHub.jsx, frontend/src/components/ProfileSheet.jsx, frontend/src/components/PathsTab.jsx
- **Pattern:** Parent Fan-Out — SpanishHub owns all bones and streak state. Children receive callbacks.

---

### What gets built

1. **Streak Shield toggle** in ProfileSheet — user enables automatic bone spending to protect streak
2. **Streak Shield consumption logic** in SpanishHub — intercepts missed days on app open, spends 20 bones per missed day, partial coverage if bones run short
3. **Word Skip button** in PathsTab Fetch rounds only — costs 10 bones, skips current word in queue
4. **`spendBones(n)`** function in SpanishHub — guarded spend with balance check, returns success/failure

---

### Pre-flight confirmation — Emergent must report first 3 lines of each file before touching anything
frontend/src/SpanishHub.jsx

frontend/src/components/ProfileSheet.jsx

frontend/src/components/PathsTab.jsx

---

### New Firestore fields — add to default userData in SpanishHub.jsx

```js
streakShieldActive: false,   // user's toggle state — persists across sessions
shieldEventPending: null,    // { bonesSpent, daysCovered, daysTotal } — read on next open, cleared after toast
```

---

### Task 1 — Add spendBones function to SpanishHub.jsx

Add alongside `awardBones`:

```js
const spendBones = useCallback((n) => {
  let success = false;
  setUserData(prev => {
    if ((prev.bones || 0) < n) return prev;
    const newData = { ...prev, bones: (prev.bones || 0) - n };
    persistData(newData);
    success = true;
    return newData;
  });
  return success;
}, [persistData]);
```

Pass as prop wherever needed: `onSpendBones={spendBones}`

---

### Task 2 — Streak Shield consumption logic in SpanishHub.jsx

This runs on app open, immediately after user data is loaded and merged — same location as `maybeRunStreakReminder` calls (lines ~230 and ~257).

Add a new function `maybeApplyStreakShield(data, uid)`:

```js
function maybeApplyStreakShield(data, uid) {
  if (!data?.streakShieldActive) return data;
  if (!data?.streak?.lastDate) return data;
  if ((data.streak?.count || 0) === 0) return data;

  const today = new Date().toDateString();
  const lastDate = new Date(data.streak.lastDate);
  const now = new Date();
  const daysDiff = Math.floor((now - lastDate) / 86400000);

  // Already played today or only missed yesterday (streak logic handles this) — no shield needed
  if (daysDiff <= 1) return data;

  // Gone more than 7 days — shield gives up, reset streak
  if (daysDiff > 7) {
    return {
      ...data,
      streak: { count: 0, lastDate: null },
      shieldEventPending: { bonesSpent: 0, daysCovered: 0, daysTotal: daysDiff - 1, shieldFailed: true },
    };
  }

  const daysMissed = daysDiff - 1;
  const costPerDay = 20;
  const totalCost = daysMissed * costPerDay;
  const availableBones = data.bones || 0;
  const daysCovered = Math.min(daysMissed, Math.floor(availableBones / costPerDay));
  const bonesSpent = daysCovered * costPerDay;
  const daysNotCovered = daysMissed - daysCovered;

  const newStreakCount = Math.max(0, (data.streak?.count || 0) - daysNotCovered);
  const newBones = availableBones - bonesSpent;

  return {
    ...data,
    bones: newBones,
    streak: { count: newStreakCount, lastDate: today },
    shieldEventPending: {
      bonesSpent,
      daysCovered,
      daysTotal: daysMissed,
      daysNotCovered,
      shieldFailed: bonesSpent === 0,
    },
  };
}
```

Call this function after data is merged on login, before `setUserData` is called. If it returns modified data, write back to Firestore via `setDoc`.

---

### Task 3 — Shield event toast on app open

After `maybeApplyStreakShield` runs and `setUserData` is called, check for `shieldEventPending` and fire the appropriate toast:

```js
if (mergedData.shieldEventPending) {
  const { bonesSpent, daysCovered, daysTotal, daysNotCovered, shieldFailed } = mergedData.shieldEventPending;

  if (shieldFailed && daysTotal > 7) {
    toast({ title: '💔 Streak Lost', description: 'You were gone too long — even the Shield couldn\'t help.' });
  } else if (shieldFailed) {
    toast({ title: '💔 Not enough bones', description: `Streak Shield couldn\'t cover ${daysTotal} missed day${daysTotal > 1 ? 's' : ''}. Streak reset.` });
  } else if (daysNotCovered > 0) {
    toast({ title: '🦴 Partial Shield', description: `${daysCovered} day${daysCovered > 1 ? 's' : ''} covered (${bonesSpent} bones). Streak reduced by ${daysNotCovered}.` });
  } else {
    toast({ title: '🦴 Streak Shield Used', description: `${daysCovered} day${daysCovered > 1 ? 's' : ''} protected — ${bonesSpent} bones spent.` });
  }

  // Clear the pending event
  setUserData(prev => {
    const newData = { ...prev, shieldEventPending: null };
    persistData(newData);
    return newData;
  });
}
```

---

### Task 4 — Streak Shield toggle in ProfileSheet.jsx

Add a toggle row in ProfileSheet, in the settings section alongside the existing reminder toggle. Prop contract:

```js
// Props passed from SpanishHub
streakShieldActive={userData.streakShieldActive || false}
onStreakShieldToggle={(val) => setUserData(prev => {
  const newData = { ...prev, streakShieldActive: val };
  persistData(newData);
  return newData;
})}
```

Toggle label: **Streak Shield 🦴**
Toggle sublabel: *Spends 20 bones per missed day to protect your streak*

If `userData.bones < 20`, show the sublabel in amber: *Not enough bones to activate*. Toggle remains functional — user can enable it for when they earn more bones.

---

### Task 5 — Word Skip button in PathsTab.jsx (Fetch rounds only)

The skip button appears during Fetch rounds (Stop fetch and Path fetch) only — not in DrillsGrid standalone drills.

Add a Skip button inside the Fetch question UI. Position: below the answer area, above the progress bar. Style: subtle, small, not competing with the answer UI.

```js
// Only render during fetch phase, not intro or results
{phase === 'fetch' && (
  <button
    onClick={() => {
      if ((userData?.bones || 0) >= 10) {
        onSpendBones(10);
        onSkipWord(); // advances to next question without scoring
      }
    }}
    disabled={(userData?.bones || 0) < 10}
    className="text-sm text-amber-600 underline disabled:opacity-40"
  >
    Skip word 🦴 (10 bones)
  </button>
)}
```

`onSkipWord` prop: advances the fetch queue index without recording an answer. Does not count as correct or incorrect. Does not affect pass threshold calculation — total questions asked increases by 0, correct stays the same.

Prop contract additions to PathsTab:
```js
onSpendBones={spendBones}
onSkipWord={() => { /* advance queue index */ }}
```

Note: `onSkipWord` implementation lives inside PathsTab's fetch queue logic. Emergent must wire it without breaking the existing `FETCH_LENGTH` and `PASS_THRESHOLD` mechanics.

---

### Bones economy — authoritative numbers (resolve md/MILO_BONES_LOGIC_SPEC.md conflict)

| Action | Bones |
|---|---|
| Complete a Stop | +2 |
| Complete a Path | +15 |
| Complete Break Free | +10 |
| Streak Shield | −20 per missed day |
| Word Skip (Fetch only) | −10 |
| DrillsGrid drills | 0 |

The older md/MILO_BONES_LOGIC_SPEC.md numbers are superseded by this table. Do not reference that document.

---

### What Emergent must NOT do

- Do not add bones rewards to DrillsGrid drills
- Do not build a bones purchase flow or monetisation UI
- Do not add random loot drops
- Do not touch Firebase Auth logic, Firestore security rules, or api/chat.js
- Do not modify the streak write logic inside onDrillDone — the shield intercepts on login only
- Do not build Break Free — that is Session G

---

### Edge cases Emergent must handle

1. **Shield on, bones = 0** — shield fires, covers 0 days, streak resets normally. Toast: "Not enough bones."
2. **Shield on, partial bones** — covers as many days as bones allow, streak reduced by remainder
3. **Gone > 7 days** — shield gives up regardless of bones balance, streak resets to 0
4. **lastDate === today** — shield does not run, user already played today
5. **daysDiff === 1** — shield does not run, streak logic in onDrillDone handles this normally
6. **Skip button, bones < 10** — button disabled, no spend attempted
7. **Skip on last question** — advancing past the final question should trigger results phase normally

---

### Verification steps

1. Enable Streak Shield in ProfileSheet — toggle saves to Firestore
2. Simulate 1 missed day (set lastDate to 2 days ago in Firestore) → open app → toast fires, 20 bones deducted, streak preserved
3. Simulate 2 missed days, 30 bones available → open app → toast fires "Partial Shield — 1 day covered", streak reduced by 1, 20 bones spent
4. Simulate 2 missed days, 40 bones available → open app → toast fires "2 days protected — 40 bones spent", streak preserved
5. Simulate 8 missed days → open app → toast fires "gone too long", streak resets to 0, no bones spent
6. Skip a word in Fetch round → question advances, 10 bones deducted, pass threshold unaffected
7. Skip with 0 bones → button disabled, no action
8. Disable shield → missed day → streak resets normally, no toast, no bones spent

---

### Estimated tokens: 12–15

New function, new toggle UI, new skip button, new Firestore fields. Medium complexity. Pre-flight check mandatory. Write State Ledger spec in Claude before opening Emergent.

---

---

## Emergent Session D — Milo Vocabulary Awareness

### Classification
- **Type:** Wiring + prompt engineering
- **Risk:** Low-medium. Two files touched. No new components. API payload change is additive — existing fields unchanged.
- **Stage:** 3 — stabilization
- **Affected files:** SpanishHub.jsx, MiloChat.jsx, frontend/api/chat.js
- **Pattern:** Serverless Proxy — secrets stay in api/chat.js, context flows from SpanishHub → MiloChat → api/chat.js

---

### What the problem is

Milo receives only three fields per message: the user's message, conversation history, and UID. He has no knowledge of:
- The user's name
- Which words they have learned or mastered
- Which Paths they have completed
- Their streak or XP
- Their weakest words

Every user gets the same generic beginner experience regardless of how far they've progressed.

---

### Pre-flight confirmation — Emergent must report first 3 lines of each file before touching anything
frontend/src/SpanishHub.jsx

frontend/src/MiloChat.jsx

frontend/api/chat.js

---

### Task 1 — Compute learnerContext in SpanishHub.jsx and pass to MiloChat

Import at the top of SpanishHub.jsx if not already present:
```js
import { MASTER } from './content/es-en/words';
import { masteryLevel } from './utils/helpers';
```

Compute `learnerContext` as a derived value inside the component, after `userData` is available. Do not use `useMemo` — compute inline where MiloChat is rendered:

```js
const learnedWords = MASTER
  .filter(w => (userData.progress?.[w.es]?.c || 0) > 0)
  .map(w => ({
    es: w.es,
    en: w.en,
    level: masteryLevel(userData.progress, w.es),
  }));

const weakestWords = [...learnedWords]
  .filter(w => w.level === 'learning' || w.level === 'new')
  .sort((a, b) => {
    const sA = userData.progress?.[a.es]?.s || 0;
    const sB = userData.progress?.[b.es]?.s || 0;
    return sA - sB;
  })
  .slice(0, 10)
  .map(w => ({ es: w.es, en: w.en }));

const learnerContext = {
  displayName: userData.displayName || 'Estudiante',
  streak: userData.streak?.count || 0,
  xp: userData.xp || 0,
  completedPaths: userData.completedPaths || [],
  totalWordsLearned: learnedWords.length,
  masteredWords: learnedWords.filter(w => w.level === 'mastered').map(w => ({ es: w.es, en: w.en })),
  weakestWords,
};
```

Update the MiloChat mount in SpanishHub.jsx from:
```jsx
<MiloChat userUid={effectiveUser.uid} />
```

To:
```jsx
<MiloChat userUid={effectiveUser.uid} learnerContext={learnerContext} />
```

---

### Task 2 — Include learnerContext in the API request body in MiloChat.jsx

Find the request body in MiloChat.jsx:
```js
body: JSON.stringify({
  message: userMessage.content,
  conversationHistory: messages.slice(-10).map((m) => ({
    role: m.role === "user" ? "user" : "assistant",
    content: m.content,
  })),
  userUid: userUid || "anonymous",
})
```

Replace with:
```js
body: JSON.stringify({
  message: userMessage.content,
  conversationHistory: messages.slice(-10).map((m) => ({
    role: m.role === "user" ? "user" : "assistant",
    content: m.content,
  })),
  userUid: userUid || "anonymous",
  learnerContext: learnerContext || null,
})
```

Add `learnerContext` to MiloChat's prop definition:
```js
function MiloChat({ userUid, learnerContext }) {
```

---

### Task 3 — Inject learnerContext into the system prompt in frontend/api/chat.js

In `api/chat.js`, read `learnerContext` from the request body:
```js
const { message, conversationHistory, userUid, learnerContext } = req.body;
```

Build a context block to inject into the Gemini contents array, immediately after the system prompt and before the conversation history:

```js
const contextBlock = learnerContext ? `
LEARNER PROFILE — read this before every response:
- Name: ${learnerContext.displayName}
- Current streak: ${learnerContext.streak} day${learnerContext.streak !== 1 ? 's' : ''}
- Total XP: ${learnerContext.xp}
- Paths completed: ${learnerContext.completedPaths.length > 0 ? learnerContext.completedPaths.join(', ') : 'none yet'}
- Words learned: ${learnerContext.totalWordsLearned}
- Words mastered: ${learnerContext.masteredWords.length}

WEAKEST WORDS (prioritise these in practice suggestions):
${learnerContext.weakestWords.length > 0
  ? learnerContext.weakestWords.map(w => `- ${w.es} (${w.en})`).join('\n')
  : '- None yet — learner is just getting started'}

MASTERED WORDS (use freely in conversation — learner knows these well):
${learnerContext.masteredWords.length > 0
  ? learnerContext.masteredWords.map(w => w.es).join(', ')
  : 'none yet'}

Use the learner's name naturally in conversation. Celebrate streak milestones. When suggesting practice, prioritise the weakest words listed above. Use mastered words freely in Spanish without translation. Always translate words the learner has not yet learned.
` : '';
```

Inject `contextBlock` into the Gemini `contents` array as a user turn immediately before the conversation history, if `contextBlock` is non-empty:

```js
const contents = [
  // existing system prompt turn
  { role: 'user', parts: [{ text: systemPrompt }] },
  { role: 'model', parts: [{ text: miloGreeting }] },
  // inject learner context if available
  ...(contextBlock ? [{ role: 'user', parts: [{ text: contextBlock }] }, { role: 'model', parts: [{ text: '¡Entendido! I know who I\'m talking to.' }] }] : []),
  // existing conversation history
  ...conversationHistory.map(m => ({
    role: m.role === 'user' ? 'user' : 'model',
    parts: [{ text: m.content }],
  })),
  // current message
  { role: 'user', parts: [{ text: message }] },
];
```

---

### What Emergent must NOT do

- Do not read `users/{uid}` from Firestore in api/chat.js — context comes from the client
- Do not pass the raw `progress` object to MiloChat — use the slimmed `learnerContext` only
- Do not modify the rate limiting logic in api/chat.js
- Do not modify the child safety guardrails in the system prompt
- Do not touch Firebase Auth logic or Firestore security rules
- Do not add new Firestore collections or fields

---

### Edge cases Emergent must handle

1. **Guest user** — `learnerContext` may be null or have empty arrays. `contextBlock` handles this gracefully with fallback strings.
2. **No words learned yet** — `weakestWords` and `masteredWords` will be empty arrays. Fallback strings already handle this.
3. **Very long masteredWords list** — at 500 mastered words, the mastered list becomes large. Cap `masteredWords` sent to API at 50 most recent — sort by `userData.progress[w.es].s` descending, slice to 50.
4. **displayName empty** — falls back to 'Estudiante' in learnerContext computation.
5. **learnerContext null in api/chat.js** — contextBlock is empty string, contents array skips the context turns entirely. Existing behaviour preserved.

---

### Verification steps

1. Open Milo chat — Milo greets user by name on first message
2. Ask Milo "what should I practice?" — Milo references weakest words by name
3. Ask Milo "how am I doing?" — Milo mentions streak count, XP, paths completed
4. Complete a new word, reopen chat — Milo's context reflects updated progress
5. Guest user opens chat — Milo behaves normally, no crash, no name reference
6. User with 0 words learned opens chat — Milo encourages starting, no crash

---

### Estimated tokens: 6–8

Three files, all additive changes. No new components. Largest cost is prompt engineering iteration if Gemini needs tuning. Pre-flight check mandatory.

---

---

## Emergent Session E — Fetch Standalone Mode

### Classification
- **Type:** Feature build — new tab UI, configurable word pool, session flow
- **Risk:** Medium-high. New tab render block, reuses existing fetch algorithm, touches TAB_ORDER and BottomNav already updated by Claude Code pre-session.
- **Stage:** 4 — retention and UX
- **Affected files:** SpanishHub.jsx, frontend/src/components/FetchTab.jsx (new), frontend/src/components/PathsTab.jsx (reuse fetch algorithm)
- **Pattern:** Parent Fan-Out — SpanishHub owns all state. FetchTab receives words, progress, and callbacks as props. Never queries Firestore directly.

---

### What the problem is

Fetch is currently locked inside PathsTab — only accessible by completing a Stop or Path. Users with learned vocabulary across multiple Paths have no way to run a cross-Path review session. The Fetch tab is in BottomNav but renders nothing. `fetchHistory` field exists in userData but is never written to.

---

### Pre-flight confirmation — Emergent must report first 3 lines of each file before touching anything
frontend/src/SpanishHub.jsx

frontend/src/components/PathsTab.jsx

frontend/src/components/BottomNav.jsx

---

### What gets built

A new `FetchTab.jsx` component with two screens:

**Screen 1 — Configuration**
User selects what to fetch before starting. Milo idle animation shown. Options:

**Filter by mastery level** (multi-select pills, any combination, default = Learning + Strong):
- 🌱 New
- 📖 Learning
- 💪 Strong
- ⭐ Mastered

**Filter by source** (single select, default = All completed Paths):
- All completed Paths
- Specific Path (shows dropdown of completed Path names only)
- My Words (customWords[])
- Community Packs (shows dropdown of importedPacks[] by title — only shown if user has imported packs)

**Session length** (single select, default = Standard):
- Quick — 10 questions
- Standard — 20 questions
- Long — 40 questions

"Start Fetch 🐾" button — disabled if word pool resolves to 0 words, shows "No words match your filters" message below button if so.

**Screen 2 — Fetch session**
Reuses the existing fetch queue algorithm from PathsTab.jsx. Same DrillShell/DrillRouter render pattern as PathsTab fetch phase. Progress bar at top. Back button returns to configuration screen (confirms exit if mid-session). On completion — shows results screen with score, bones awarded if score ≥ 80%, option to run again with same config or reconfigure.

---

### Word pool resolution logic

Compute `fetchWordPool` from selected filters before building the queue:

```js
function resolveFetchWordPool(config, userData, progress) {
  let words = [];

  if (config.source === 'all-paths') {
    // All words from completed Paths only
    words = (userData.completedPaths || []).flatMap(pathId => {
      const path = getPath(pathId);
      if (!path) return [];
      return path.stops.flatMap(stop => getStopWords(stop.id))
        .map(es => MASTER.find(w => w.es === es))
        .filter(Boolean);
    });
  } else if (config.source === 'path' && config.selectedPathId) {
    // Single Path
    const path = getPath(config.selectedPathId);
    if (path) {
      words = path.stops.flatMap(stop => getStopWords(stop.id))
        .map(es => MASTER.find(w => w.es === es))
        .filter(Boolean);
    }
  } else if (config.source === 'custom') {
    // customWords[] — shape: { es, en, type, group }
    words = userData.customWords || [];
  } else if (config.source === 'pack' && config.selectedPackId) {
    // Single imported pack
    const pack = (userData.importedPacks || []).find(p => p.id === config.selectedPackId);
    words = pack ? pack.words : [];
  }

  // Deduplicate by es field
  const seen = new Set();
  words = words.filter(w => {
    if (seen.has(w.es)) return false;
    seen.add(w.es);
    return true;
  });

  // Apply mastery level filter
  words = words.filter(w => {
    const level = masteryLevel(progress, w.es);
    return config.masteryLevels.includes(level);
  });

  return words;
}
```

---

### Fetch session flow inside FetchTab

Reuse `buildFetchQueue` from PathsTab.jsx — import it directly. Do not copy or rewrite it.

Session length maps to queue length:
- Quick → 10
- Standard → 20
- Long → 40

Pass `onDrillAnswer` callback to DrillRouter for per-answer progress updates — same pattern as PathsTab fetch phase. On session complete:

1. Calculate score (correct / total)
2. If score ≥ 0.80 → award bones: Quick = +1, Standard = +2, Long = +3
3. Write to `fetchHistory`:
```js
fetchHistory: {
  totalSessions: (prev.totalBonesEarned || 0) + 1,
  totalCorrect: (prev.fetchHistory?.totalCorrect || 0) + correct,
  totalQuestions: (prev.fetchHistory?.totalQuestions || 0) + total,
}
```
4. Fire `evaluateBadges` with `'drill_complete'` event, `drillId: 'fetch'`
5. Show results screen

---

### Props passed from SpanishHub.jsx to FetchTab

```js
<FetchTab
  userData={userData}
  progress={userData.progress}
  completedPaths={userData.completedPaths || []}
  customWords={userData.customWords || []}
  importedPacks={userData.importedPacks || []}
  onDrillAnswer={updateWordProgress}
  onAwardBones={awardBones}
  onUpdateFetchHistory={(correct, total) => {
    setUserData(prev => {
      const newData = {
        ...prev,
        fetchHistory: {
          totalSessions: (prev.fetchHistory?.totalSessions || 0) + 1,
          totalCorrect: (prev.fetchHistory?.totalCorrect || 0) + correct,
          totalQuestions: (prev.fetchHistory?.totalQuestions || 0) + total,
        }
      };
      persistData(newData);
      return newData;
    });
  }}
  onEvaluateBadges={evaluateBadges}
  onToast={toast}
/>
```

---

### Tab render block — add to SpanishHub.jsx

Add immediately after the study tab render block:

```jsx
{tab === 'fetch' && (
  <div className="pb-[76px]">
    <FetchTab
      userData={userData}
      progress={userData.progress}
      completedPaths={userData.completedPaths || []}
      customWords={userData.customWords || []}
      importedPacks={userData.importedPacks || []}
      onDrillAnswer={updateWordProgress}
      onAwardBones={awardBones}
      onUpdateFetchHistory={(correct, total) => {
        setUserData(prev => {
          const newData = {
            ...prev,
            fetchHistory: {
              totalSessions: (prev.fetchHistory?.totalSessions || 0) + 1,
              totalCorrect: (prev.fetchHistory?.totalCorrect || 0) + correct,
              totalQuestions: (prev.fetchHistory?.totalQuestions || 0) + total,
            }
          };
          persistData(newData);
          return newData;
        });
      }}
      onEvaluateBadges={(prev, next, event, payload) => evaluateBadges(prev, next, event, payload)}
      onToast={toast}
    />
  </div>
)}
```

---

### New Firestore fields — none

`fetchHistory` already exists in DEFAULT_DATA. No schema changes required.

---

### What Emergent must NOT do

- Do not copy or rewrite `buildFetchQueue` — import it from PathsTab.jsx
- Do not add bones to Quick/Standard/Long unless score ≥ 80%
- Do not add a Fetch entry point inside PathsTab — that flow is unchanged
- Do not modify the PathsTab fetch phase in any way
- Do not touch Firebase Auth logic, Firestore security rules, or api/chat.js
- Do not build Break Free inside this session — that is Session F
- Do not remove the words tab render block from SpanishHub.jsx

---

### Edge cases Emergent must handle

1. **No completed Paths** — "All completed Paths" pool is empty. Disable Start button, show "Complete your first Path to unlock Fetch" message.
2. **No imported packs** — hide Community Packs source option entirely.
3. **No custom words** — hide My Words source option if `customWords[]` is empty.
4. **Mastery filter returns 0 words** — disable Start button, show "No words match your filters."
5. **Mid-session back tap** — confirm dialog: "Leave this session? Progress won't be saved." Cancel returns to session. Confirm returns to config screen.
6. **Quick session, only 3 words in pool** — queue repeats words to fill 10 questions, same as PathsTab behaviour.
7. **Pack words have no FSRS progress** — `masteryLevel` returns 'new' for words with no progress entry. These appear under the New filter.
8. **buildFetchQueue expects MASTER-shaped word objects** — pack words and customWords have `{ es, en, type, group }` only, missing `gender`, `imageUrl`, `contextSentence`. Guard drill type selection — if word is missing `gender` field, fall back to `en-es` drill type (same guard already in buildFetchQueue).

---

### Verification steps

1. Tap Fetch tab — configuration screen renders, Milo idle shown
2. Select Learning + Strong, All Paths, Standard → Start → 20-question session runs
3. Complete session ≥ 80% → +2 bones awarded, fetchHistory updated in Firestore
4. Complete session < 80% → no bones awarded
5. Select specific Path → only that Path's words appear
6. Select Community Pack → only pack words appear
7. Select New only, user has no New words → Start button disabled
8. Tap back mid-session → confirm dialog appears
9. Complete 1 Fetch session → fetch_first badge fires
10. Complete 10 Fetch sessions → fetch_10 badge fires
11. No completed Paths → "Complete your first Path" message shown

---

### Estimated tokens: 12–15

New component, configurable word pool, reused algorithm, results screen. Medium-high complexity. State Ledger spec mandatory before opening Emergent. Pre-flight check mandatory.

---

## Emergent Session F — Break Free / ¡Libre!

### Classification
- **Type:** Feature build — new drill mode, animation state machine, XP-gated trigger, bones reward
- **Risk:** High. New animated UI, new state field, touches PathsTab fetch phase, depends on Milo poses existing before session opens.
- **Stage:** 4 — retention and UX
- **Affected files:** SpanishHub.jsx, frontend/src/components/PathsTab.jsx, frontend/src/components/BreakFreeDrill.jsx (new)
- **Pattern:** Finite State Machine — explicit states: idle → available → active → success → fail. Parent Fan-Out — SpanishHub owns all state.

---

### Hard prerequisite — do not open this session without confirming

All five Milo poses must exist in `frontend/public/animations/` before this session opens:
- `milo_straining.gif` — Milo pulling at chain, urgency
- `milo_free.gif` — Milo running free, joyful
- `milo_celebrating.gif` — celebration pose
- `milo_wrong_tilt.gif` — head tilt, uncertain
- `milo_encouraging.gif` — warm, supportive

Emergent must confirm these files exist at session start. If any are missing, stop and report — do not proceed.

---

### Pre-flight confirmation — Emergent must report first 3 lines of each file before touching anything
frontend/src/SpanishHub.jsx

frontend/src/components/PathsTab.jsx

---

### What gets built

Break Free is a timed speed round — 10 questions in 60 seconds. Triggered automatically when the user accumulates 50 XP since their last Break Free attempt. Milo strains at his chain throughout. Success: chain snaps, Milo runs free, +10 bones awarded. Failure: Milo slumps, gentle message, no penalty.

---

### New Firestore field — add to DEFAULT_DATA in SpanishHub.jsx

```js
breakFreeXP: 0,   // XP accumulated since last Break Free trigger. Resets to 0 on trigger.
```

---

### Task 1 — breakFreeXP counter in SpanishHub.jsx

In `updateWordProgress`, wherever XP is added to `newData`, also increment `breakFreeXP`:

```js
breakFreeXP: (prev.breakFreeXP || 0) + xpGain,
```

Break Free becomes AVAILABLE (not auto-triggered) when `breakFreeXP >= 50`. The user chooses when to engage — consistent with the no-interruption principle.

When Break Free is triggered (user taps the available indicator), reset the counter:

```js
breakFreeXP: 0,
```

---

### Task 2 — Break Free availability indicator

When `userData.breakFreeXP >= 50`, show a pulsing indicator on the Fetch tab in BottomNav — a small animated dot on the PawPrint icon, same visual pattern as notification badges. This signals Break Free is available without interrupting the user.

Also show a Break Free entry card at the top of the FetchTab configuration screen when available:

```jsx
{breakFreeAvailable && (
  <div className="bg-amber-50 border border-amber-300 rounded-xl p-4 mb-4 flex items-center justify-between">
    <div>
      <div className="font-bold text-amber-800">¡Libre! is ready 🔗</div>
      <div className="text-sm text-amber-600">Milo is straining at his chain...</div>
    </div>
    <button
      onClick={onStartBreakFree}
      className="bg-amber-500 text-white px-4 py-2 rounded-lg font-bold"
    >
      Break Free
    </button>
  </div>
)}
```

`breakFreeAvailable` = `userData.breakFreeXP >= 50`

---

### Task 3 — Build BreakFreeDrill.jsx

New component. Full-screen overlay, renders on top of FetchTab.

**State machine:**
idle → countdown (3-2-1) → active → success | fail

**Props:**
```js
{
  words,              // word pool — same pool as current FetchTab config, or all learned words if launched from BottomNav indicator
  progress,           // userData.progress
  onSuccess,          // callback — awards +10 bones, resets breakFreeXP, fires badge, fires toast
  onFail,             // callback — resets breakFreeXP only (no penalty)
  onBack,             // callback — exits without triggering (breakFreeXP preserved)
}
```

**Active phase UI:**
- `milo_straining.gif` displayed prominently — fills top third of screen
- Countdown timer: 60 seconds, large, prominent, turns red at 10 seconds
- Current question rendered using same drill dispatch pattern as PathsTab fetch phase
- 10 questions total (`BREAK_FREE_LENGTH = 10`)
- No skip button — Break Free has no bones spending
- Progress: `3 / 10` counter, no pass threshold shown during session

**Drill type selection:**
- Same `buildDrillDeck` + `buildFetchQueue` pattern as PathsTab
- Import `buildFetchQueue` from PathsTab.jsx — do not duplicate

**Success condition:** All 10 questions answered before timer reaches 0, regardless of correct/incorrect count. Speed is the challenge, not accuracy.

**Success screen:**
- `milo_free.gif` — Milo running free, full celebration
- Large `¡Libre!` text in Spanish green
- Confetti (reuse existing `confettiBuffer` pattern from SpanishHub)
- "+10 bones" displayed prominently
- "Fetch unlocked" message — tapping continues to FetchTab session
- Auto-advances to FetchTab after 3 seconds if user doesn't tap

**Fail screen:**
- `milo_wrong_tilt.gif` — head tilt
- "So close! Milo believes in you 🐾" message
- `milo_encouraging.gif` shown after 1.5 seconds
- "Try again later" — returns to FetchTab config
- No penalty, no bones lost, breakFreeXP resets to 0

**Timer logic:**
```js
useEffect(() => {
  if (phase !== 'active') return;
  if (timeLeft <= 0) {
    setPhase('fail');
    onFail();
    return;
  }
  const t = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
  return () => clearTimeout(t);
}, [timeLeft, phase]);
```

---

### Task 4 — Wire Break Free callbacks in SpanishHub.jsx

**`startBreakFree` function:**
```js
const startBreakFree = useCallback(() => {
  setUserData(prev => {
    const newData = { ...prev, breakFreeXP: 0 };
    persistData(newData);
    return newData;
  });
  setView({ page: 'break-free' });
}, [persistData]);
```

**`onBreakFreeSuccess` callback:**
```js
const onBreakFreeSuccess = useCallback(() => {
  setUserData(prev => {
    let newData = { ...prev, bones: (prev.bones || 0) + 10, totalBonesEarned: (prev.totalBonesEarned || 0) + 10 };
    const { updatedBadges, newlyEarned } = evaluateBadges(prev, newData, 'drill_complete', { drillId: 'break-free', correct: 10, total: 10, ts: Date.now() });
    newData = { ...newData, earnedBadges: updatedBadges };
    persistData(newData);
    if (newlyEarned.length > 0) {
      newlyEarned.forEach(id => {
        const def = BADGES.find(b => b.id === id);
        if (def) toast({ title: `${def.emoji} Badge Earned`, description: def.name });
      });
    }
    toast({ title: '¡Libre! 🔗', description: 'Milo broke free — +10 bones earned!' });
    return newData;
  });
}, [persistData, toast]);
```

**`onBreakFreeFail` callback:**
```js
const onBreakFreeFail = useCallback(() => {
  setUserData(prev => {
    const newData = { ...prev, breakFreeXP: 0 };
    persistData(newData);
    return newData;
  });
}, [persistData]);
```

---

### Task 5 — Pass Break Free props to FetchTab in SpanishHub.jsx

Add to FetchTab mount:
```jsx
breakFreeAvailable={userData.breakFreeXP >= 50}
onStartBreakFree={startBreakFree}
onBreakFreeSuccess={onBreakFreeSuccess}
onBreakFreeFail={onBreakFreeFail}
```

---

### Bones economy — Break Free

| Event | Bones |
|---|---|
| Break Free success | +10 |
| Break Free fail | 0 |
| Break Free — no penalty ever | — |

---

### What Emergent must NOT do

- Do not auto-trigger Break Free mid-session — available indicator only, user chooses when
- Do not add a penalty for failing Break Free
- Do not build a chain animation from scratch — use `milo_straining.gif` and `milo_free.gif`
- Do not modify the PathsTab fetch phase in any way
- Do not touch Firebase Auth logic, Firestore security rules, or api/chat.js
- Do not add Break Free to DrillsGrid — it lives in FetchTab only
- Do not proceed if Milo pose files are missing — stop and report

---

### Edge cases Emergent must handle

1. **Word pool empty** — if `breakFreeAvailable` but FetchTab has no words configured yet, use all learned words as fallback pool
2. **Timer reaches 0 on final question** — fail triggers even if 9/10 answered, timer is authoritative
3. **User taps Back during countdown** — exits cleanly, `breakFreeXP` preserved (they didn't start, no reset)
4. **User taps Back during active phase** — confirm dialog, if confirmed: `onFail()` fires (resets counter), returns to FetchTab config
5. **Success screen auto-advance** — if user doesn't tap within 3 seconds, FetchTab config screen shows automatically
6. **Confetti** — reuse existing confetti trigger pattern from SpanishHub, do not add a new audio or animation library

---

### Verification steps

1. Earn 50 XP — Break Free indicator appears on Fetch tab BottomNav icon
2. Open Fetch tab — Break Free card appears at top of config screen
3. Tap Break Free — countdown 3-2-1, then 10-question timed session, `milo_straining.gif` shown
4. Complete all 10 questions before timer — success screen, `milo_free.gif`, ¡Libre! text, +10 bones, confetti
5. Let timer run out — fail screen, `milo_wrong_tilt.gif`, encouraging message, no bones lost
6. Check Firestore — `breakFreeXP` reset to 0 on both success and fail
7. First Break Free success — `break_free` badge fires, Unchained toast appears
8. Tap Back during countdown — exits, `breakFreeXP` unchanged
9. Tap Back during active phase — confirm dialog, confirms → fail callback fires, counter resets

---

### Estimated tokens: 15–20

New component, animation state machine, timer logic, success/fail screens, XP counter, bones award, badge trigger. Highest complexity session in the plan. State Ledger spec mandatory before opening Emergent. Milo poses mandatory before opening Emergent. Pre-flight check mandatory.

---

## Emergent Session Plan (~64–83 tokens)

| # | Session | What Gets Built | Est. Tokens |
|---|---|---|---|
| A | Badge triggers | 103 badges in badges.js, evaluateBadges wired to completeStop + completePathFetch, 5 new Firestore fields | 8–12 |
| B | Toast notifications + friend badge fix | Mount toaster, consume newlyEarned at all 3 call sites, first_friend badge fix, sonner.jsx deleted | 6–8 |
| C | Bones & streak shield system | Shield toggle, per-day consumption logic, word skip button in Fetch, spendBones function | 12–15 |
| D | Milo vocabulary awareness | learnerContext computed in SpanishHub, passed to MiloChat, injected into Gemini system prompt | 6–8 |
| E | Fetch standalone mode | FetchTab.jsx with config screen, mastery filters, source filters, session length, results screen | 12–15 |
| F | Break Free / ¡Libre! | BreakFreeDrill.jsx, animation FSM, 60s timer, XP gate, +10 bones, milo_straining + milo_free poses | 15–20 |
| — | Setup waste budget | Pre-flight repo checks, brief corrections | 5 |
| **Total** | | | **64–83** |

**Session order is locked — do not reorder:**
A → B → C → D → E → F
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
