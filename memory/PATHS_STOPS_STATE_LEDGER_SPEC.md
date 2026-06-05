# State Ledger Spec — Paths & Stops Progression
# Milo Speaks Spanish — Emergent Session Brief
# Written in Claude. Emergent executes. Emergent does not plan.
# Last updated: 2026-06-05 — four audit passes complete, all gaps resolved

---

## Purpose
Complete architectural specification for Paths & Stops progression in Milo Speaks Spanish.
Emergent reads this and implements exactly what is described.
No architectural decisions are made during the Emergent session.

---

## 🚨 CRITICAL RULES — READ BEFORE WRITING A SINGLE LINE

### Rule 1 — persistData takes the ENTIRE userData object. Never a partial.
persistData calls setDoc which REPLACES the entire Firestore document.
Partial object = user loses all XP, streak, badges, progress. Permanently.

ONLY SAFE PATTERN — copy from recordAnswer line 267:
```javascript
setUserData(prev => {
  const newData = { ...prev, [changes] };
  const { updatedBadges } = evaluateBadges(prev, newData, eventType, payload);
  const finalData = { ...newData, earnedBadges: updatedBadges };
  persistData(finalData);
  return finalData;
});
```
Line 337 in onDrillDone has a direct setDoc — DO NOT copy it.
NEVER: `persistData({ completedStops: ['p1s1'] })` — wipes all user data.

### Rule 2 — Model completeStop on recordAnswer (line 267), NOT completeLesson (line 375).
completeLesson does not call evaluateBadges. Badges will never fire if you copy it.

### Rule 3 — FetchSession NEVER routes to DoneScreen.
FetchSession shows FetchResultScreen via local state only.
DoneScreen is for regular drills only.

### Rule 4 — FetchSession does NOT use view.overrideWords.
overrideWords + DrillRouter supports ONE drill type per session.
Fetch needs 6 rotating drill types. FetchSession renders drill components
directly and receives stopWords as a prop.

### Rule 5 — TAB_ORDER and BottomNav.jsx are INDEPENDENT files. Update BOTH.
TAB_ORDER in SpanishHub.jsx controls swipe. BottomNav.jsx has its own internal
tabs array. Rename 'learn' → 'paths' in both files independently.

### Rule 6 — view.stopId stale closure — add to BOTH closure read AND deps.
```javascript
const stopId = view.stopId;  // ~line 293, alongside dailyKind
// deps array ~line 349:
}, [user, isGuest, view.dailyKind, view.xpMultiplier, view.stopId]);
```

### Rule 7 — key={questionIndex} on every drill component in FetchSession.
ChoiceDrill and TypeDrill use useRef to memoise queue at mount — never reinitialises.
Without key prop, React reuses the instance and the same question repeats forever.
```jsx
<ChoiceDrill key={questionIndex} mode="en-es" words={stopWords} drillLength={1} ... />
<TypeDrill key={questionIndex} mode="type-en-es" words={stopWords} drillLength={1} ... />
<FillBlankDrill key={questionIndex} wordPool={fitbPool} drillLength={1} ... />
// etc — key on every drill component rendered by FetchSession
```

### Rule 8 — wordPool format must match each drill's internal pool format exactly.
FetchSession generates correctly-formatted pools from stopWords — see Pool Generators below.
Do NOT pass MASTER word objects directly as wordPool to any drill component.

### Rule 9 — Read SpanishHub.jsx completely before writing any code.
Find: persistData, setUserData, recordAnswer, onDrillDone (full), evaluateBadges,
startDailyChallenge, practiceLessonWords, view state machine (lines 546–595).
Copy patterns. Do not invent.

### Rule 10 — Commit after every numbered build step.

---

## Decisions Locked

| Decision | Value |
|---|---|
| Fetch architecture | Custom FetchSession — 6 drill types, manages own state, never uses view.overrideWords or DoneScreen |
| Fetch drill scoping | ChoiceDrill + TypeDrill: Stop-scoped via words prop. FillBlankDrill + SentenceBuilderDrill + ConjugationDrill: Stop-scoped via generated wordPool in correct format. All 6 fully Stop-scoped. |
| Fetch session drillId | 'fetch' — matches evaluateBadges, fires fetch_first and fetch_10 |
| Fetch result screen | FetchResultScreen (local state) — never DoneScreen |
| Fetch drill count | Adaptive — early exit at 70% after MIN_QUESTIONS. Hard stop at MAX_QUESTIONS. |
| Pass threshold | 70% correct |
| Fetch retry | Unlimited, no penalty |
| FSRS | Not v2. Architecture supports future FSRS drill weighting without rebuild. |
| YouTube video | Feature flag — videoUrl null = disabled. String = active. Never gates Fetch. |
| Path completion rewards | Badge + 20 bones + Break Free unlock message |
| Stop completion rewards | 5 bones + 50 XP + Stop unlocked |
| Stop/Path sequencing | Linear lock |
| Tab rename | TAB_ORDER 'learn' → 'paths'. BottomNav label 'Learn' → 'Paths'. BOTH files. |
| PathsView location | Replaces LessonsList in 'paths' tab render block |
| Lessons access | StopCard only — LessonsList + LessonView preserved, not deleted |
| stop.lessonId | Does NOT exist in paths.js stop objects. Keep onOpenLesson prop plumbing for future. Omit the Watch Lesson button from StopCard for now. |
| LessonView Practice button | Guard with && onPractice in render condition. Omit prop from StopCard. |
| Continue button | HomeTab onNavigate('study') → onNavigate('paths') |
| completeLesson setTab | Change setTab('learn') → setTab('paths') at ~line 389 |
| Session recording | handleFetchComplete records { drillId: 'fetch', correct, total, date, ts } |
| FlashcardDrill sentence mode | Gate behind completedPaths.length >= 1 — add completedPaths prop to DrillRouter call |

---

## Explicit Imports to Add to SpanishHub.jsx

```javascript
// Add alongside existing words.js import at top of SpanishHub.jsx
import { PATHS, getStopWords, getStop, getPathIdForStop, isPathComplete } from './data/paths';

// Add when new components are built
import PathsView from './components/PathsView';
import StopCard from './components/StopCard';
import FetchSession from './components/FetchSession';
import FetchResultScreen from './components/FetchResultScreen';
import PathCompleteModal from './components/PathCompleteModal';
```
Do not delete any existing imports while adding new ones.

---

## Data Structure

```javascript
// All confirmed present in DEFAULT_DATA
completedStops: [],      // EXACT format: "p1s1" NEVER "path1-stop1"
completedPaths: [],      // EXACT format: "path1" NEVER "path-1"
stopProgress: {          // keyed object — NOT an array
  "p1s1": {
    attempts: 3,
    bestScore: 0.85,     // 0.0–1.0, never decreases
    passed: true,        // never set back to false
    passedAt: "ISO"
  }
},
fetchHistory: {
  totalSessions: 0,
  totalCorrect: 0,
  totalQuestions: 0
}
```

### ID formats
Stop IDs: "p1s1" through "p12s5"
Path IDs: "path1" through "path12" (no underscore)
Badge IDs: "path_1" through "path_12" (with underscore) — in badges.js
evaluateBadges.js pathBadges map translates path1 → path_1 automatically.
evaluateBadges.js is already fixed — do not modify it.

### paths.js helpers
```javascript
getStopWords('p1s1')                     // ['hola', 'adiós', ...]
getPath('path1')                         // full path object
getStop('p1s1')                          // full stop object
getPathIdForStop('p1s1')                 // 'path1'
isPathComplete('path1', completedStops)  // boolean
```
Do NOT hardcode path count. Use PATHS.length.

### Stop word lookup — MASTER only
```javascript
import { MASTER } from './data/words';
const stopWords = getStopWords(stopId)
  .map(es => MASTER.find(w => w.es === es))
  .filter(Boolean);
// Returns full word objects with es, en, contextSentence, imageUrl, theme, type
```

---

## State Ownership
SpanishHub.jsx owns all state. Children receive props only. No child queries Firestore.

---

## TAB_ORDER and BottomNav — BOTH files

### SpanishHub.jsx module level
```javascript
const TAB_ORDER = ['home', 'paths', 'words', 'study']; // 'learn' → 'paths'
```

### BottomNav.jsx internal tabs array
Find the tabs array. Change id 'learn' → 'paths', label 'Learn' → 'Paths'.
Replace existing entry — do not add a new one.

### SpanishHub.jsx render block
```jsx
{tab === 'paths' && (
  <div className="pb-20">
    <PathsView
      paths={PATHS}
      completedStops={userData.completedStops || []}
      completedPaths={userData.completedPaths || []}
      stopProgress={userData.stopProgress || {}}
      onSelectStop={(pathId, stopId) => setView({ page: 'paths-stop', stopId })}
    />
    <KofiSupport />
  </div>
)}
```

### DrillRouter call — add completedPaths prop (~line 562)
```jsx
<DrillRouter
  drillId={view.drillId}
  drillLength={view.drillLength || 10}
  words={activeWords}
  progress={userData.progress}
  completedPaths={userData.completedPaths || []}
  onAnswer={...}
  onDone={...}
  onBack={goHome}
/>
```
DrillRouter spreads all props — completedPaths reaches FlashcardDrill automatically.
In FlashcardDrill.jsx line 89: implement the TODO — gate sentence mode behind
`completedPaths.length >= 1`.

### HomeTab Continue button (HomeTab.jsx line ~79)
```jsx
onClick={() => onNavigate('paths')} // was 'study'
```

### completeLesson (~line 389)
```javascript
setTab('paths'); // was setTab('learn') — 'learn' no longer exists after rename
```

---

## View State Machine — New Page Values

Add as if blocks BEFORE the final tabbed layout return.
Every new view.page block that returns early MUST use app-outer / app-container wrapper:
```jsx
<div className="app-outer">    // custom CSS in index.css — NOT Tailwind
  <div className="app-container">
    {/* content */}
  </div>
</div>
```
Forgetting this wrapper = broken layout, no background, full-width component.

```javascript
if (view.page === 'paths-stop') {
  const stopId = view.stopId;
  return (
    <div className="app-outer"><div className="app-container">
      <StopCard
        stop={getStop(stopId)}
        stopProgress={(userData.stopProgress || {})[stopId]}
        onStartFetch={() => setView({ page: 'paths-fetch', stopId })}
        onOpenLesson={(lessonId) => setView({
          page: 'lesson',
          lessonId,
          returnTo: { page: 'paths-stop', stopId }
        })}
        onBack={() => setTab('paths')}
      />
    </div></div>
  );
}

if (view.page === 'paths-fetch') {
  const stopId = view.stopId;
  const stopWords = getStopWords(stopId)
    .map(es => MASTER.find(w => w.es === es)).filter(Boolean);
  return (
    <div className="app-outer"><div className="app-container">
      <FetchSession
        stopId={stopId}
        stopWords={stopWords}
        progress={userData.progress || {}}
        completedStops={userData.completedStops || []}
        onComplete={(score, questionCount) => {
          handleFetchComplete(stopId, score, questionCount);
        }}
        onBack={() => setView({ page: 'paths-stop', stopId })}
      />
    </div></div>
  );
}
```

### LessonView returnTo pattern
When accessed from StopCard, LessonView onBack must return to StopCard not 'learn' tab.

Update LessonView onBack prop to use view.returnTo if present:
```javascript
onBack={() => {
  if (view.returnTo) {
    setView(view.returnTo);
  } else {
    setView({ page: 'home' });
    setTab('paths'); // was setTab('learn')
  }
}}
```

### LessonView Practice button fix (LessonView.jsx ~line 117)
```jsx
// CURRENT — crashes when onPractice is undefined
{lesson.practice?.length > 0 && (
  <button onClick={() => onPractice(lesson.practice)}>

// FIX — guard with onPractice check
{lesson.practice?.length > 0 && onPractice && (
  <button onClick={() => onPractice(lesson.practice)}>
```
Do NOT pass onPractice prop from StopCard to LessonView.
This one-character addition prevents a crash when onPractice is omitted.

---

## onDrillDone Extensions

### Add stopId to closure and deps
```javascript
// Add at ~line 293 alongside dailyKind:
const stopId = view.stopId;

// Update deps at ~line 349:
}, [user, isGuest, view.dailyKind, view.xpMultiplier, view.stopId]);
```

### Add stop session drillId branch
```javascript
let sessionDrillId = drillId;
if (dailyKind === 'weak') sessionDrillId = 'daily-weak';
else if (dailyKind === 'theme') sessionDrillId = 'daily-theme';
// Fetch records its own sessions in handleFetchComplete — no branch needed here
```

Note: FetchSession does NOT go through onDrillDone at all.

---

## New Handler Functions (SpanishHub.jsx)

Model ALL on recordAnswer line 267. Not on completeLesson.

### handleFetchComplete(stopId, score, questionCount)
```javascript
const handleFetchComplete = useCallback((stopId, score, questionCount) => {
  const passed = score >= 0.70;
  const correct = Math.round(score * questionCount);

  setUserData(prev => {
    const currentProgress = prev.stopProgress?.[stopId] || {
      attempts: 0, bestScore: 0, passed: false, passedAt: null
    };

    // Record session — drillId 'fetch' fires fetch_first and fetch_10 badges
    const today = new Date().toDateString();
    const todayISO = new Date().toISOString().split('T')[0];
    const sessions = [
      { drillId: 'fetch', correct, total: questionCount, date: today, ts: Date.now() },
      ...(prev.sessions || []).slice(0, 49)
    ];
    const newActiveDays = (prev.activeDays || []).includes(todayISO)
      ? (prev.activeDays || [])
      : [...(prev.activeDays || []), todayISO];

    let newData = {
      ...prev,
      sessions,
      activeDays: newActiveDays,
      stopProgress: {
        ...prev.stopProgress,
        [stopId]: {
          attempts: currentProgress.attempts + 1,
          bestScore: Math.max(currentProgress.bestScore, score),
          passed: currentProgress.passed || passed,
          passedAt: currentProgress.passed
            ? currentProgress.passedAt
            : passed ? new Date().toISOString() : null,
        }
      },
      fetchHistory: {
        totalSessions: (prev.fetchHistory?.totalSessions || 0) + 1,
        totalCorrect: (prev.fetchHistory?.totalCorrect || 0) + correct,
        totalQuestions: (prev.fetchHistory?.totalQuestions || 0) + questionCount,
      }
    };

    if (passed && !prev.completedStops.includes(stopId)) {
      newData = {
        ...newData,
        completedStops: [...prev.completedStops, stopId],
        bones: (prev.bones || 0) + 5,
        xp: (prev.xp || 0) + 50,
      };
    }

    // Check path completion synchronously — newData.completedStops already updated
    const pathId = getPathIdForStop(stopId);
    const pathNowComplete = passed
      && !prev.completedPaths.includes(pathId)
      && isPathComplete(pathId, newData.completedStops);

    // evaluateBadges — covers fetch_first, fetch_10, stop_1_1, xp thresholds
    const { updatedBadges: badges1 } = evaluateBadges(prev, newData, 'drill_complete', {
      drillId: 'fetch', correct, total: questionCount, ts: Date.now()
    });
    const { updatedBadges: badges2 } = evaluateBadges(
      prev, { ...newData, earnedBadges: badges1 }, 'stop_complete', { stopId }
    );
    newData = { ...newData, earnedBadges: badges2 };

    persistData(newData);

    // Call handlePathComplete synchronously after persistData — no setTimeout
    if (pathNowComplete) {
      // handlePathComplete is called outside setUserData below
    }

    return newData;
  });

  // Determine path completion from current state synchronously
  // handlePathComplete reads its own prev inside its own setUserData
  setTimeout(() => handlePathComplete(getPathIdForStop(stopId)), 0);

  return { passed, score };
}, [persistData, handlePathComplete]);
```

Note on deps: include persistData and handlePathComplete to avoid stale closures.
Define handlePathComplete before handleFetchComplete in the file.

### handlePathComplete(pathId)
```javascript
const handlePathComplete = useCallback((pathId) => {
  setUserData(prev => {
    if (prev.completedPaths.includes(pathId)) return prev;
    let newData = {
      ...prev,
      completedPaths: [...prev.completedPaths, pathId],
      bones: (prev.bones || 0) + 20,
    };
    const { updatedBadges } = evaluateBadges(prev, newData, 'path_complete', { pathId });
    newData = { ...newData, earnedBadges: updatedBadges };
    persistData(newData);
    return newData;
  });
  // PathCompleteModal triggered via local state in FetchSession
}, [persistData]);
```

### handleStandaloneFetch(score, questionCount)
```javascript
const handleStandaloneFetch = useCallback((score, questionCount) => {
  const correct = Math.round(score * questionCount);
  setUserData(prev => {
    const today = new Date().toDateString();
    const todayISO = new Date().toISOString().split('T')[0];
    const sessions = [
      { drillId: 'fetch', correct, total: questionCount, date: today, ts: Date.now() },
      ...(prev.sessions || []).slice(0, 49)
    ];
    const newActiveDays = (prev.activeDays || []).includes(todayISO)
      ? (prev.activeDays || []) : [...(prev.activeDays || []), todayISO];
    let newData = {
      ...prev,
      sessions,
      activeDays: newActiveDays,
      xp: (prev.xp || 0) + Math.round(score * questionCount * 10),
      fetchHistory: {
        totalSessions: (prev.fetchHistory?.totalSessions || 0) + 1,
        totalCorrect: (prev.fetchHistory?.totalCorrect || 0) + correct,
        totalQuestions: (prev.fetchHistory?.totalQuestions || 0) + questionCount,
      }
    };
    const { updatedBadges } = evaluateBadges(prev, newData, 'drill_complete', {
      drillId: 'fetch', correct, total: questionCount, ts: Date.now()
    });
    newData = { ...newData, earnedBadges: updatedBadges };
    persistData(newData);
    return newData;
  });
}, [persistData]);
```

---

## Drill Component Modifications

### ChoiceDrill and TypeDrill — unchanged
Both already accept words prop. Pass stopWords directly.

### FillBlankDrill, SentenceBuilderDrill, ConjugationDrill
Add optional wordPool prop. When passed, use it instead of internal pool.
When null, fall back to existing pool — existing behavior completely unchanged.

```javascript
// FillBlankDrill
export default function FillBlankDrill({
  onAnswer, onDone, onBack, drillLength = 10, wordPool = null
})
const queue = useMemo(() => {
  const pool = wordPool ? wordPool : FITB_POOL;
  return shuffle(pool).slice(0, total);
}, [total, wordPool]);
```
Same pattern for SentenceBuilderDrill (falls back to SENT_POOL) and
ConjugationDrill (falls back to CONJ).

---

## FetchSession — Pool Generators

FetchSession generates correctly-formatted pools from stopWords.
These are utility functions inside FetchSession.jsx.
All required data (contextSentence, en, type, es) exists on every MASTER word object.

```javascript
// Generate FITB_POOL-format items from stopWords
function generateFitbPool(stopWords) {
  return stopWords
    .filter(w => w.contextSentence)
    .map(w => {
      const sentence = w.contextSentence;
      const idx = sentence.toLowerCase().indexOf(w.es.toLowerCase());
      if (idx === -1) return null;
      const before = sentence.slice(0, idx);
      const after = sentence.slice(idx + w.es.length);
      // Distractors: other stop words + shuffle
      const choices = shuffle([
        w.es,
        ...stopWords.filter(x => x.es !== w.es).map(x => x.es).slice(0, 3)
      ]);
      return { before, blank: w.es, after, choices, hint: w.en };
    })
    .filter(Boolean);
}

// Generate SENT_POOL-format items from stopWords
function generateSentPool(stopWords) {
  return stopWords
    .filter(w => w.contextSentence)
    .map(w => ({
      words: w.contextSentence.replace(/[¿¡.,!?]/g, '').split(' ').filter(Boolean),
      hint: w.en
    }));
}

// Generate CONJ-format items from stopWords (verbs only)
function generateConjPool(stopWords) {
  const verbs = stopWords.filter(w => w.type === 'verb');
  if (verbs.length < 2) return null; // fall back to global pool if insufficient verbs
  const distractors = stopWords.map(w => w.es);
  return verbs.map(w => ({
    q: `→ ${w.es}`,
    verb: w.es,
    ans: w.es,
    hint: w.en,
    pool: shuffle([w.es, ...distractors.filter(d => d !== w.es).slice(0, 3)])
  }));
}
```

Usage in FetchSession:
```javascript
const fitbPool = generateFitbPool(stopWords);
const sentPool = generateSentPool(stopWords);
const conjPool = generateConjPool(stopWords); // null if < 2 verbs

// Pass to drill components:
<FillBlankDrill key={questionIndex} wordPool={fitbPool} drillLength={1} ... />
<SentenceBuilderDrill key={questionIndex} wordPool={sentPool} drillLength={1} ... />
<ConjugationDrill key={questionIndex} wordPool={conjPool} drillLength={1} ... />
// conjPool null → ConjugationDrill falls back to global CONJ pool automatically
```

---

## Fetch Drill Types — All Safe for PRACTICE_DRILL_IDS

PRACTICE_DRILL_IDS in evaluateBadges.js:
`'es-en', 'en-es', 'type-es-en', 'type-en-es', 'conjugation', 'listen-type', 'sent-build', 'fill-blank', 'gender'`

All 6 Fetch drill types confirmed safe:
- ChoiceDrill mode="en-es" ✅
- TypeDrill mode="type-en-es" ✅
- TypeDrill mode="listen-type" ✅
- FillBlankDrill → 'fill-blank' ✅
- SentenceBuilderDrill → 'sent-build' ✅
- ConjugationDrill → 'conjugation' ✅

Do NOT use hear-choose or matching — not in PRACTICE_DRILL_IDS.

---

## New Components

### PathsView — src/components/PathsView.jsx
```
Props: paths, completedStops[], completedPaths[], stopProgress{}, onSelectStop(pathId, stopId)
- List all paths — use paths.length, never hardcode 12
- Each path: title, titleEn, subLevel, X/5 progress
- Stop nodes: locked | available | complete
- Stop 1 of Path 1: always available
- Stop N available: Stop N-1 in completedStops[]
- Path N+1 Stop 1 available: isPathComplete(pathN, completedStops) === true
- Locked tap: "Complete the previous Stop first 🐾"
- Available/complete tap: onSelectStop(pathId, stopId)
```

### StopCard — src/components/StopCard.jsx
```
Props: stop, stopProgress, onStartFetch(), onOpenLesson(lessonId), onBack()
- Stop title + 5 words (look up English from MASTER)
- Do NOT render Watch Lesson button — stop.lessonId does not exist in paths.js
  Keep onOpenLesson prop for future use but do not wire a button to it
- VIDEO FLAG: stop.videoUrl string → active button | null → disabled "Coming soon 🐾"
  Video never gates Fetch
- Best score if stopProgress exists
- "Passed ✓" if stopProgress.passed === true
- "Start Fetch 🐾" → onStartFetch()
- Back → onBack()
- Do NOT pass onPractice to LessonView
```

### FetchSession — src/components/FetchSession.jsx
```
Props: stopId (null=standalone), stopWords[], progress{}, completedStops[],
       onComplete(score, total), onBack()
FSM: idle → active → complete (FetchResultScreen as local state)

DrillShell is safe as layout wrapper — purely presentational.
DrillRouter is safe to bypass — pure switch, no side effects.
Import drill components directly from src/components/drills/

Generate pools on mount using generateFitbPool, generateSentPool, generateConjPool.
Use key={questionIndex} on EVERY drill component rendered.

Drill type rotation (6 types, shuffled at session start):
  ChoiceDrill mode="en-es" words={stopWords} drillLength={1}
  TypeDrill mode="type-en-es" words={stopWords} drillLength={1}
  TypeDrill mode="listen-type" words={stopWords} drillLength={1}
  FillBlankDrill wordPool={fitbPool} drillLength={1}
  SentenceBuilderDrill wordPool={sentPool} drillLength={1}
  ConjugationDrill wordPool={conjPool} drillLength={1}

MIN_QUESTIONS = 10, MAX_QUESTIONS = 20
Early exit: currentIndex >= MIN_QUESTIONS AND score >= 0.70
On complete: call onComplete(score, questionCount) — triggers handleFetchComplete in parent

Standalone word selection (stopId === null):
  const allWords = completedStops.flatMap(id =>
    getStopWords(id).map(es => MASTER.find(w => w.es === es)).filter(Boolean)
  );
  const words = allWords.length > 0 ? allWords : getStopWords('p1s1')
    .map(es => MASTER.find(w => w.es === es)).filter(Boolean);
  Call onComplete → parent calls handleStandaloneFetch
```

### FetchResultScreen — src/components/FetchResultScreen.jsx
```
Props: passed, score, bonesAwarded, xpAwarded, onRetry(), onContinue()
- passed: canvas-confetti + "¡Fetch! 🐾" + bones + XP display
  confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } })
  import confetti from 'canvas-confetti'
- failed: Milo encouragement + score + "Try again 🐾"
- PathCompleteModal shown after if path just completed (local boolean state)
```

### PathCompleteModal — src/components/PathCompleteModal.jsx
```
Props: pathId, badgeAwarded, bonesAwarded, onClose()
- canvas-confetti (same pattern as FetchResultScreen)
- Path title + "Complete! 🐾"
- Badge display + bones awarded
- "Break Free unlocked! ¡Libre! 🔗" — message only, do not build mechanic
- "Continue to next Path" or "Return to Paths" → onClose()
```

---

## Navigation Flow
```
BottomNav 'Paths' OR HomeTab Continue
  → tab='paths' → PathsView
      → onSelectStop() → view.page='paths-stop' → StopCard
            → onOpenLesson() → view.page='lesson' (with returnTo)
                  → LessonView onBack → returns to paths-stop (via view.returnTo)
            → onStartFetch() → view.page='paths-fetch' → FetchSession
                  → onComplete() → handleFetchComplete() → FetchResultScreen (local)
                        → [path complete] PathCompleteModal (local)
                              → onClose() → setTab('paths')
```

---

## What Emergent Must NOT Do
- Call persistData with a partial object
- Model completeStop on completeLesson
- Copy setDoc from line 337 in onDrillDone
- Route FetchSession through DoneScreen
- Use view.overrideWords for Fetch
- Update only TAB_ORDER without also updating BottomNav.jsx tabs array
- Update only BottomNav without also updating TAB_ORDER
- Forget view.stopId in onDrillDone closure AND deps
- Forget key={questionIndex} on drill components in FetchSession
- Pass MASTER word objects directly as wordPool — use pool generators
- Query Firestore from child components
- Edit src/components/v0/
- Modify Firebase Auth, api/chat.js, Firestore security rules
- Modify evaluateBadges.js
- Delete LessonsList.jsx, LessonView.jsx, or Certificate.jsx
- Delete onPractice from LessonView.jsx — guard with && onPractice instead
- Render Watch Lesson button in StopCard — stop.lessonId does not exist
- Hardcode path count
- Use hear-choose or matching as Fetch drill types
- Forget app-outer / app-container wrapper on new view.page blocks
- Skip FlashcardDrill.jsx line 89 TODO — gate sentence mode behind completedPaths.length >= 1
- Leave setTab('learn') in completeLesson — change to setTab('paths')

---

## Prerequisites — All Confirmed ✅
- [x] paths.js — 12 Paths × 5 Stops × 5 words, SUBTLEX-ESP validated (commit 442f2e4)
- [x] words.js — 398 words, all fields including contextSentence (used by pool generators)
- [x] completedStops, completedPaths, stopProgress, fetchHistory in DEFAULT_DATA
- [x] path_1 through path_12 badges in badges.js
- [x] evaluateBadges.js — fixed, do not touch
- [x] canvas-confetti installed, usage pattern confirmed
- [x] DrillShell confirmed safe layout wrapper
- [x] DrillRouter confirmed safe to bypass (pure switch)
- [x] All 6 Fetch drill IDs confirmed in PRACTICE_DRILL_IDS
- [x] LessonView Practice button crash fix specified
- [x] pool generators specified for all 3 fixed-pool drills
- [x] key={questionIndex} requirement specified
- [ ] Firebase emulator running
- [ ] git commit -m "pre-emergent-paths"

---

## Emergent Opening Prompt — Paste Verbatim

I am building Paths & Stops progression for Milo Speaks Spanish.
Complete State Ledger spec follows. Execute exactly. No architectural decisions.

🚨 RULE 1 — NEVER call persistData with a partial object.
setDoc replaces the ENTIRE Firestore document. Always:
  setUserData(prev => { const newData = {...prev, changes}; persistData(newData); return newData; })
Line 337 in onDrillDone uses direct setDoc — DO NOT copy it.

🚨 RULE 2 — Model on recordAnswer (line 267), NOT completeLesson (line 375).
completeLesson skips evaluateBadges. Badges will never fire if you copy it.

🚨 RULE 3 — FetchSession NEVER routes to DoneScreen. FetchResultScreen only.

🚨 RULE 4 — TAB_ORDER and BottomNav.jsx are INDEPENDENT. Update BOTH.

🚨 RULE 5 — view.stopId stale closure. Add to closure read AND deps array.

🚨 RULE 6 — key={questionIndex} on EVERY drill component in FetchSession.
ChoiceDrill/TypeDrill use useRef — without key, same question repeats forever.

🚨 RULE 7 — wordPool must be correctly formatted. Use pool generators in spec.
Do NOT pass MASTER word objects directly to FillBlankDrill/SentenceBuilderDrill/ConjugationDrill.

STEP 0 — Read SpanishHub.jsx completely before writing any code.
Understand: persistData, recordAnswer, onDrillDone (full), evaluateBadges,
startDailyChallenge, view state machine (lines 546–595).
Copy patterns. Do not invent.

Architecture:
- SpanishHub.jsx single source of truth. No child queries Firestore.
- FetchSession receives stopWords as prop — does NOT use view.overrideWords
- DrillShell is safe layout wrapper. DrillRouter safe to bypass (pure switch).
- LessonsList, LessonView, Certificate.jsx: do NOT delete or modify internals.
- LessonView.jsx line ~117: add && onPractice to Practice button render condition.
- evaluateBadges.js: already fixed — do not touch.
- Stop IDs: "p1s1" format. Path IDs: "path1" format. Never hyphenated.
- Never hardcode path count — use PATHS.length.
- app-outer + app-container wrapper required on every new view.page block.
- Commit after every step.

Build order:
1. Read SpanishHub.jsx fully — confirm persistData and evaluateBadges understood
2. Add imports: paths.js helpers, new component files
3. Define handlePathComplete() in SpanishHub.jsx
4. Define handleFetchComplete() in SpanishHub.jsx (after handlePathComplete)
5. Define handleStandaloneFetch() in SpanishHub.jsx
6. Extend onDrillDone — add view.stopId to closure read and deps
7. Rename 'learn'→'paths' in TAB_ORDER AND BottomNav.jsx tabs array
8. Replace learn tab render block with PathsView render block
9. Add completedPaths prop to DrillRouter call. Implement FlashcardDrill sentence gate.
10. Add view.page 'paths-stop' and 'paths-fetch' blocks to SpanishHub.jsx
11. Update LessonView onBack to use view.returnTo. Fix Practice button guard.
12. Update HomeTab Continue button. Update completeLesson setTab call.
13. Add optional wordPool prop to FillBlankDrill, SentenceBuilderDrill, ConjugationDrill
14. Build PathsView (src/components/PathsView.jsx)
15. Build StopCard (src/components/StopCard.jsx)
16. Build FetchSession with pool generators (src/components/FetchSession.jsx)
17. Build FetchResultScreen (src/components/FetchResultScreen.jsx)
18. Build PathCompleteModal (src/components/PathCompleteModal.jsx)
19. Test: Path 1 → Stop 1 → Fetch → pass → Stop 2 unlocks → complete Path 1 → badge awarded

[paste full spec here]

---

## Post-Session Ledger Update
After session update CURRENT_STATE_LEDGER.md with:
- File paths of all new and modified components
- TAB_ORDER as actually implemented
- BottomNav tabs as actually implemented
- Any deviations from this spec
- New bugs introduced
- Firestore schema as actually implemented
