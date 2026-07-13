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
