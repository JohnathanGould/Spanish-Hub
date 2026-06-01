# FSRS Schema Specification
# Milo Speaks Spanish — v2
# Written: 2026-05-21
# Decision basis: Ebbinghaus (1885), Cepeda et al. (2006)

---

## What FSRS Is

Free Spaced Repetition Scheduler — the algorithm Anki uses since 2022.
Calculates the optimal next review date per word based on how confidently the user recalled it.
Words retained well get longer intervals. Words recalled poorly get shorter intervals.
The user never sees the algorithm. It runs silently.

npm library: `ts-fsrs`
Install: `npm install ts-fsrs` in `frontend/`

---

## Updated progress{} Schema

Current structure per word:
```
progress: {
  [spanishWord]: {
    c: number,   — correct answers (keep)
    w: number,   — wrong answers (keep)
    s: number    — streak (keep)
  }
}
```

Updated structure per word:
```
progress: {
  [spanishWord]: {
    c: number,            — correct answers total (keep — supporting data)
    w: number,            — wrong answers total (keep — supporting data)
    s: number,            — streak (keep — supporting data)
    outputCorrect: number — correct answers on Practice drills only (NEW — required for mastery)
    stability: number,    — FSRS: predicted days until 90% retention drops below threshold
    difficulty: number,   — FSRS: intrinsic hardness of this word for this user (1–10)
    due: string,          — FSRS: ISO date string — next scheduled review date
    lastReview: string    — FSRS: ISO date string — when last reviewed
  }
}
```

### DEFAULT_DATA addition (SpanishHub.jsx)

When a word is first seen, initialise its FSRS fields as:
```javascript
stability: 0,
difficulty: 0,
due: new Date().toISOString(),   // due immediately — new words are always reviewable
lastReview: null,
outputCorrect: 0
```

---

## The FSRS Rating System

FSRS requires a 4-point rating after each recall attempt:
`Again` / `Hard` / `Good` / `Easy`

**The user never chooses this rating.** It is inferred from drill performance automatically.

### Rating inference table

| Drill | Result | FSRS Rating |
|---|---|---|
| Type It | Correct, first attempt | Good |
| Type It | Correct after hint or retry | Hard |
| Type It | Incorrect | Again |
| Fill in the Blank | Correct, first attempt | Good |
| Fill in the Blank | Incorrect | Again |
| Listen & Type | Correct, first attempt | Good |
| Listen & Type | Correct after replay | Hard |
| Listen & Type | Incorrect | Again |
| Sentence Builder | Correct, fast (under median time) | Easy |
| Sentence Builder | Correct, slow | Good |
| Sentence Builder | Incorrect | Again |
| Conjugation | Correct, first attempt | Good |
| Conjugation | Incorrect | Again |
| Multiple Choice EN→SP | Correct | Good |
| Multiple Choice EN→SP | Incorrect | Again |
| Gender drill | Correct | Good |
| Gender drill | Incorrect | Again |
| Flashcard (Review) | — | Not rated — passive review, no FSRS update |
| Matching / Word Sort / Hear & Choose | — | Not rated — Warm Up, no FSRS update |

---

## How ts-fsrs Is Called

After each Practice drill answer, call the library:

```javascript
import { createEmptyCard, fsrs, generatorParameters, Rating } from 'ts-fsrs';

// On first encounter with a word — create empty card
const card = createEmptyCard();

// After a drill attempt — update the card
const f = fsrs(generatorParameters());
const result = f.next(card, new Date(), Rating.Good); // or Again / Hard / Easy

// result.card contains the updated fields
const updatedFields = {
  stability: result.card.stability,
  difficulty: result.card.difficulty,
  due: result.card.due.toISOString(),
  lastReview: new Date().toISOString()
};

// Write updatedFields back to progress[word] in Firestore
```

The `Rating` value comes from the inference table above.
The `card` passed in is reconstructed from the current `progress[word]` FSRS fields.

---

## How Fetch Uses the due Date

Fetch word selection algorithm:

```
1. Get all words in the user's completedStops word pool
2. Filter to words where due <= today (overdue or due today)
3. Among those, prioritise words where outputCorrect === 0 (never succeeded on a Practice drill)
4. Fill remaining session slots with words due soonest after today
5. Cap session at 20 words (or user's daily goal setting)
```

This naturally produces the 80/20 session composition without custom logic:
- Well-retained words have long intervals and rarely appear
- Struggling words have short intervals and appear frequently
- New words (due immediately) always appear until first successful recall

---

## How stability Maps to Mastery Tiers

The mastery tier display (New / Learning / Strong / Mastered) maps to FSRS stability:

| Display tier | Condition |
|---|---|
| New 🌱 | Word not yet seen (no FSRS data) |
| Learning 🌱 | stability < 7 OR outputCorrect === 0 |
| Strong 💪 | stability >= 7 AND outputCorrect >= 1 |
| Mastered ⭐ | stability >= 30 AND outputCorrect >= 3 |

A word is Mastered when the algorithm predicts the user will retain it for at least 30 days
AND they have successfully recalled it on a Practice drill at least 3 times.
Streak counts alone cannot produce a Mastered rating.

---

## What Changes in the Codebase

| File | Change |
|---|---|
| `frontend/package.json` | Add `ts-fsrs` dependency |
| `SpanishHub.jsx` | Add FSRS fields to DEFAULT_DATA `progress{}` initialisation |
| `DrillShell.jsx` | After Practice drill completion, call FSRS update function with inferred rating |
| `WordList.jsx` | Update mastery tier display logic to use stability + outputCorrect thresholds |
| Firestore | `progress[word]` gains 5 new fields — no migration needed for existing users, fields initialise on first review |

---

## What Does NOT Change

- Existing `c`, `w`, `s` fields stay — they are still useful as supporting data
- Flashcard, Matching, Word Sort, Hear & Choose drill components — no changes (not rated)
- Firestore security rules — no changes
- The `api/chat.js` Gemini function — no changes

---

## Sequencing

1. Install `ts-fsrs` — Windsurf task
2. Add FSRS fields to DEFAULT_DATA — Windsurf task
3. Write Paths State Ledger spec referencing this document — Claude task
4. Paths & Stops Emergent session — references State Ledger spec
5. DrillShell.jsx FSRS update call — part of Paths Emergent session or dedicated Windsurf task
