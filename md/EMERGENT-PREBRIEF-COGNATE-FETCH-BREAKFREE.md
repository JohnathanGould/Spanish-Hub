# Emergent Pre-Brief — Cognate System + Fetch Standalone + Break Free
# Milo Speaks Spanish — Spanish-Hub repo
# Status: READY TO RUN
# Written in Claude. Fed to Emergent before any session opens. Emergent executes — never plans.
# Last updated: 2026-07-07

---

# EMERGENT PRE-BRIEF — Three Sessions
# Milo Speaks Spanish — Spanish-Hub repo
# Branch: main — import before starting

## MANDATORY PRE-FLIGHT
Before doing anything:
1. Import repo: JohnathanGould/Spanish-Hub, branch main
2. Confirm these exact files exist:
   - frontend/src/SpanishHub.jsx
   - frontend/src/components/PathsTab.jsx
   - frontend/src/components/BottomNav.jsx
   - frontend/src/content/es-en/words.js
   - frontend/src/content/es-en/paths.js
3. Confirm words.js contains an entry with es: 'mercado'
4. Confirm words.js contains an entry with es: 'hotel'
   AND that entry has cognate: true
5. Report first 3 lines of SpanishHub.jsx before proceeding
Do not write any code until all 5 checks are confirmed.

---

## ARCHITECTURE RULES — never violate these
- SpanishHub.jsx is the single source of truth for all global state
- Children never query Firestore directly — parent fan-out only
- Never edit v0 components directly — wrapper pattern always
- TAB_ORDER lives at module level in SpanishHub.jsx
- OS: Windows. Terminal: PowerShell. Never use && to chain commands.

---

## CURRENT STATE
- 13 Paths, 65 Stops, 390 words in paths.js
- words.js has cognate: true/false and cognatePattern fields
  on all words (added 2026-07-07)
- Firestore user document current fields:
  xp, weeklyXP, streak, dailyGoal, bones,
  earnedBadges[], completedStops[], completedPaths[],
  lessonsCompleted[], progress{}, sessions[], activeDays[],
  friends[], reminderEnabled, audioListenEnabled,
  audioSpeakEnabled, strictTyping, breakFreeXP
- milo_idle.gif exists at frontend/public/animations/
  Use as placeholder wherever milo_celebrate.gif is referenced
  until the real file is generated
- milo_straining.gif, milo_breaking.gif, milo_free.gif
  all exist at frontend/public/animations/

---

## SESSION 1 — COGNATE SYSTEM

### What to build
A parallel vocabulary track that runs alongside the existing
Path system. Users discover and drill English-Spanish cognate
patterns grouped by tier. Pattern mastery is tracked separately
from word mastery.

### Firestore — one new field on users/{uid}
Add patternProgress to the user document:

```js
patternProgress: {
  'al-same':      { seen: 0, correct: 0, mastery: 'new' },
  'near-perfect': { seen: 0, correct: 0, mastery: 'new' },
  'identical':    { seen: 0, correct: 0, mastery: 'new' },
  'cion':         { seen: 0, correct: 0, mastery: 'new' },
  'oso':          { seen: 0, correct: 0, mastery: 'new' },
  'ivo':          { seen: 0, correct: 0, mastery: 'new' },
  'nte':          { seen: 0, correct: 0, mastery: 'new' },
  'dad':          { seen: 0, correct: 0, mastery: 'new' },
  'ado':          { seen: 0, correct: 0, mastery: 'new' },
}
```

Mastery levels: 'new' → 'learning' → 'strong' → 'mastered'
Thresholds: learning = seen 3+, strong = correct 80%+ over 10+,
mastered = correct 90%+ over 20+

Initialise patternProgress to the default object above if it
does not exist on the user document. Do this in the same
place userData defaults are set in SpanishHub.jsx.

### buildCognateQueue — new function
Location: create frontend/src/utils/cognateQueue.js

```js
// buildCognateQueue(pattern, words, patternProgress)
// Returns array of 10 question objects for a cognate drill session
// Selects words where:
//   word.cognate === true
//   word.cognatePattern === pattern
//   word.tapToDefine !== true
// Shuffles selection
// Each question object: { word, drillType }
// drillType: rotate between 'choice' (EN→SP) and 'type' (EN→SP)
// Falls back to all cognate words if pattern pool < 5 words
```

### CognateFetch component
Location: frontend/src/components/CognateFetch.jsx

Behaviour:
- Config screen: show available cognate pattern groups
  unlocked for current tier (see unlock rules below)
- User selects a pattern group
- Drill runs 10 questions using buildCognateQueue
- Uses existing ChoiceDrill and TypeDrill components
  via DrillRouter — pass mode prop as normal
- On completion: update patternProgress in Firestore
  via SpanishHub.jsx onUpdatePatternProgress callback
- Award +1 XP per correct answer (same as input drills)
- No bones awarded (pattern drills are recognition practice)
- Show pattern mastery level at end of session

### Tier unlock rules for cognate groups
Read completedPaths from userData to determine current tier.

Beginner I (paths 1-4 not all complete):
  Unlock: 'al-same', 'near-perfect', 'identical'

Beginner II (paths 1-4 complete, paths 5-8 not all complete):
  Unlock: all Beginner I patterns PLUS
  'cion', 'oso', 'ivo', 'nte', 'dad', 'ado'

Advanced Beginner (paths 9-12 not all complete):
  Unlock: all previous patterns (no new ones — consolidation)

Intermediate (path13 in progress):
  Unlock: all patterns PLUS 'mente' when added to schema

### SpanishHub.jsx changes
1. Add patternProgress to userData default object
2. Add onUpdatePatternProgress callback (mirrors onAwardBones pattern)
3. Pass patternProgress and onUpdatePatternProgress as props
   to CognateFetch
4. Persist patternProgress changes to Firestore via persistData

### DrillsGrid.jsx changes
Add a new section below the existing Practice sections:

"Pattern Practice" section header
One entry: "Cognate Patterns 🔤"
Tapping launches CognateFetch component
Gate: only show if at least one pattern group is unlocked
(i.e. user has started Path 1 — always true after onboarding)

### Sentence Builder braided reinforcement
In the existing Sentence Builder word pool selection:
Add cognate words to the supporting tile pool when:
  word.cognate === true
  AND patternProgress[word.cognatePattern].mastery === 'strong'
  OR patternProgress[word.cognatePattern].mastery === 'mastered'

These words appear as supporting tiles only — never as
the target word being tested.

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

## SESSION ORDER
Run in this exact order:
1. Session 1 — Cognate System
2. Session 2 — Fetch Standalone
3. Session 3 — Break Free

Do not start Session 2 until Session 1 build is confirmed
working on localhost.
Do not start Session 3 until Session 2 is confirmed.

---

## AFTER ALL THREE SESSIONS
Run yarn build in frontend/
Confirm no errors before closing.
Report any unresolved warnings.
