# Paths & Stops — State Ledger Specification
# Milo Speaks Spanish — v3
# Written: 2026-05-21
# For use by Emergent at session start. Read this before touching any file.

---

## Purpose of This Document

This spec defines exactly how state flows for the Paths & Stops feature. Emergent executes from this document — it does not plan. Every architectural decision is already made. Every ambiguity is resolved here.

---

## Reference Documents

Read these alongside this spec:
- `FSRS-SCHEMA-SPEC.md` — FSRS field definitions, rating inference table, ts-fsrs usage
- `words.js` — 300 word entries, each with `contextSentence`, `imageUrl`, `theme`
- `paths.js` — 5 Paths × 5 Stops, quiz questions, word lists per Stop

---

## What Is Already Built (Do Not Rebuild)

- `paths.js` — complete. 5 Paths × 5 Stops × ~5 words. 125 quiz questions. Do not modify.
- `words.js` — complete. All words have `contextSentence`, `imageUrl`, `theme`.
- `DEFAULT_WORD_PROGRESS` constant in `SpanishHub.jsx` — FSRS fields defined.
- `completedStops: []` and `completedPaths: []` in `DEFAULT_DATA` — already in Firestore schema.
- `ts-fsrs` — installed in `frontend/package.json`.

---

## Do Not Touch

- `SpanishHub.jsx` auth logic
- `api/chat.js` Gemini function
- Firestore security rules
- Any existing drill component internals (ChoiceDrill, TypeDrill, etc.)
- `DEFAULT_WORD_PROGRESS` constant — already correct

---

## Core Architecture Decisions

### State ownership

| State | Lives in | Notes |
|---|---|---|
| `completedStops[]` | Firestore — SpanishHub.jsx userData | Persisted. Array of Stop IDs e.g. `["path1-stop1", "path1-stop2"]` |
| `completedPaths[]` | Firestore — SpanishHub.jsx userData | Persisted. Array of Path IDs e.g. `["path1"]` |
| `progress[word]` FSRS fields | Firestore — SpanishHub.jsx userData | Updated after every Practice drill answer |
| Current Path/Stop view | Local component state | Not persisted. On reload, user returns to Paths home screen |
| Current word index within a Stop | Local component state | Not persisted |
| Current phase (Introduce/Recognise/Produce) | Local component state | Not persisted |
| Think First mode (options hidden/visible) | Local drill component state | Not persisted |

### Parent fan-out pattern

SpanishHub.jsx owns all global state. The Paths UI receives data as props:
- `completedStops` — which Stops are unlocked
- `completedPaths` — which Paths are complete
- `progress` — FSRS fields per word for mastery display
- `userData.bones` — bone count for display
- Callbacks: `onStopComplete`, `onPathComplete`, `onDrillAnswer`

No child component queries Firestore directly.

---

## Firestore Write Events

| Event | What gets written | When |
|---|---|---|
| Practice drill correct answer | `progress[word]` FSRS fields updated | Immediately via `persistData` with 1500ms debounce |
| Stop completed | Stop ID appended to `completedStops[]` | After Stop completion screen is shown |
| Path completed | Path ID appended to `completedPaths[]` | After all 5 Stops of a Path are in `completedStops[]` |
| Certificate viewed | No write needed | Certificate is derived from `completedPaths[]` |

---

## XP Is Removed

There is no XP in this feature. Do not add XP tracking, xpGain, or xpBonus anywhere in the Paths implementation. Bones are the only reward currency. Remove any existing XP references encountered during this session.

---

## The Three-Phase Word Introduction Model

Every word in a Stop is introduced in three phases. This is not optional — it is the core learning loop.

### Phase 1 — Introduce (passive)

One screen per word. No interaction required beyond tapping Next.

**Content shown:**
- Large image (from `word.imageUrl` — if empty, show a placeholder)
- Spanish word in large text (e.g. `perro`)
- Audio plays automatically (TTS using `word.es`)
- English confirmation in small text below (e.g. `dog`)

**English rule:** This is the ONLY screen where English appears. It appears as a small confirmation label, not as a prompt. After this screen, English is never shown for this word in this session.

**No drill. No FSRS update. No bones.**

### Phase 2 — Recognise (input)

One or two drills per word using image or audio as the trigger — never English.

**Permitted drill types for Phase 2:**
- Hear & Choose: audio plays — user selects the correct Spanish word from options
- Multiple Choice SP→EN is NOT used (English as answer violates the no-English rule)

**FSRS:** Phase 2 drills are Warm Up tier — no FSRS update, no bones.

### Phase 3 — Produce (output)

One or more Practice drills per word. This phase is what unlocks the Stop.

**Permitted drill types for Phase 3:**
- Type It: image shown — user types the Spanish word
- Fill in the Blank: Spanish contextSentence shown with word blanked — user types or selects
- Multiple Choice EN→SP: English prompt — user selects correct Spanish (this is the one permitted English-prompt drill — English as trigger for production is research-validated at Kroll & Stewart 1994)
- Conjugation (with Think First mode — see below)

**FSRS update:** After every Phase 3 drill answer, call ts-fsrs with the inferred rating. See FSRS-SCHEMA-SPEC.md for the full rating inference table.

**Contextual Binding:** After every correct Phase 3 answer, display `word.contextSentence` for 2–3 seconds before advancing. This is a DrillShell.jsx change — add a post-correct binding step to the Phase 3 drill flow only.

**Bones:** Awarded on correct Phase 3 answer. 1 bone per correct answer.

**Stop gate:** A Stop cannot be marked complete until the user has attempted at least one Phase 3 drill per word in the Stop successfully. Partial completion is not penalised — the user can leave and return.

---

## Think First Mode (Conjugation and Multiple Choice EN→SP)

These two drill types show options. Options provide elimination cues that reduce retrieval effort. Think First mode hides options until the user commits.

**UI flow:**
1. Prompt appears (e.g. `yo → comer`)
2. Options are hidden — a single button shows: `I have my answer →`
3. User taps the button — options appear
4. User selects their remembered answer
5. Result shown with Contextual Binding on correct

**FSRS rating inference for Think First:**

| Outcome | Rating |
|---|---|
| Selected correctly (having committed before seeing options) | Good |
| Tapped through without pausing (under 2 seconds before reveal) | Hard |
| Selected incorrectly | Again |

**Implementation:** Think First is the default mode for Conjugation and Multiple Choice EN→SP inside the Paths flow. It does not apply to these drills in the standalone Drills tab (where users may want to see options freely). A `thinkFirst` prop on the drill component toggles the behaviour.

---

## Stop Unlock Logic

```
Stop 1 of Path 1 — always unlocked (entry point)

Stop N unlocked when:
  - Stop N-1 ID is in completedStops[]

First Stop of Path 2–5 unlocked when:
  - Final Stop of the previous Path is in completedStops[]
```

A locked Stop shows a lock icon. Tapping it shows: `"Complete the previous Stop to unlock this one 🐾"`

---

## Path and Certificate Logic

```
Path N complete when:
  - All 5 Stop IDs for Path N are in completedStops[]
  - Path N ID is written to completedPaths[]
  - Path certificate screen is shown

Grand Certificado Básico awarded when:
  - All 5 Path IDs are in completedPaths[]
```

The Certificate component already exists (`Certificate.jsx`). Reuse it. Pass the Path name and completion date.

---

## Navigation and View Structure

### New components required

| Component | Purpose |
|---|---|
| `PathsTab.jsx` | Top-level Paths view. Shows 5 Paths with progress and lock state. |
| `StopView.jsx` | Individual Stop — runs the Introduce → Recognise → Produce sequence for its words. |
| `WordIntroScreen.jsx` | Phase 1 introduction card (image + word + audio + English label). |
| `StopCompleteScreen.jsx` | Shown after Stop is complete. Bone reward, progress to next Stop. |

### Existing components modified

| Component | Change |
|---|---|
| `SpanishHub.jsx` | Add Paths tab navigation. Pass completedStops/completedPaths/progress as props to PathsTab. Add `onStopComplete` and `onPathComplete` callbacks. |
| `DrillShell.jsx` | Add Contextual Binding post-correct step (Phase 3 only, controlled by prop). |
| `ChoiceDrill.jsx` | Add `thinkFirst` prop — when true, hide options until user taps reveal button. |
| `ConjugationDrill.jsx` | Add `thinkFirst` prop — same behaviour. |

### Tab placement

Replace the existing `Learn` tab (lessons system) with `Paths`. The tab ID changes from `learn` to `paths`. The old lessons system remains in the codebase but is no longer in the primary nav.

---

## FSRS Integration (Detailed)

After every Phase 3 drill answer inside a Stop, call ts-fsrs:

```javascript
import { createEmptyCard, fsrs, generatorParameters, Rating } from 'ts-fsrs';

// Reconstruct card from current progress fields
const currentProgress = userData.progress[wordEs] || { ...DEFAULT_WORD_PROGRESS };
const card = {
  stability: currentProgress.stability || 0,
  difficulty: currentProgress.difficulty || 0,
  due: currentProgress.due ? new Date(currentProgress.due) : new Date(),
  last_review: currentProgress.lastReview ? new Date(currentProgress.lastReview) : null,
  reps: currentProgress.c || 0,
  lapses: currentProgress.w || 0,
  state: currentProgress.stability > 0 ? 2 : 0, // Review or New
};

const f = fsrs(generatorParameters());
const rating = inferRating(drillId, isCorrect, wasFirstAttempt); // from inference table
const result = f.next(card, new Date(), rating);

const updatedProgress = {
  ...currentProgress,
  stability: result.card.stability,
  difficulty: result.card.difficulty,
  due: result.card.due.toISOString(),
  lastReview: new Date().toISOString(),
  c: isCorrect ? currentProgress.c + 1 : currentProgress.c,
  w: isCorrect ? currentProgress.w : currentProgress.w + 1,
  outputCorrect: isCorrect ? currentProgress.outputCorrect + 1 : currentProgress.outputCorrect,
};

// Write via persistData (debounced Firestore write)
persistData({ ...userData, progress: { ...userData.progress, [wordEs]: updatedProgress } });
```

**Rating inference:** See FSRS-SCHEMA-SPEC.md table. For Think First drills, use the Think First rating inference above.

**Phase 2 drills (Warm Up):** No FSRS update. No bones. No Contextual Binding.

---

## Mastery Tier Display

Mastery tier display on word cards uses FSRS stability + outputCorrect:

| Tier | Condition |
|---|---|
| New 🌱 | No FSRS data (stability === 0 AND outputCorrect === 0) |
| Learning 🌱 | stability < 7 OR outputCorrect === 0 |
| Strong 💪 | stability >= 7 AND outputCorrect >= 1 |
| Mastered ⭐ | stability >= 30 AND outputCorrect >= 3 |

Display this on the word list view (WordList.jsx). The filter buttons (New/Learning/Strong/Mastered) should filter by these thresholds.

---

## Bones Logic Within Paths

| Event | Bones |
|---|---|
| Correct Phase 3 answer | +1 bone |
| Stop completed (all words through Phase 3) | +2 bones |
| Path completed (all 5 Stops) | +3 bones |
| Phase 1 or Phase 2 | 0 bones |
| Incorrect answer | 0 bones (no penalty) |

Bones are stored in `userData.bones` and written via `persistData`.

---

## The No-English Rule — Implementation Checklist

- [ ] Phase 1 intro screen: English appears ONLY as small label below Spanish word
- [ ] Phase 2 drills: trigger is audio or image — never English text
- [ ] Phase 3 drills: trigger is image or audio, except Multiple Choice EN→SP which uses English as the production trigger (research-validated exception)
- [ ] No drill within Paths shows English as the primary answer option
- [ ] Contextual Binding step shows `contextSentence` in Spanish only

---

## Emergent Session Brief

Tell Emergent at session start:

> "Read PATHS-STATE-LEDGER.md, FSRS-SCHEMA-SPEC.md, and paths.js before writing any code. Every architectural decision is pre-made. Emergent executes — it does not plan.
>
> Key constraints:
> - XP is removed. Do not add XP anywhere.
> - English is never the primary retrieval trigger after Phase 1 introduction.
> - FSRS must be called after every Phase 3 drill answer using ts-fsrs.
> - Think First mode is default for Conjugation and Multiple Choice EN→SP inside Paths.
> - Contextual Binding (contextSentence display) fires after every correct Phase 3 answer.
> - SpanishHub.jsx is the single source of truth. No child component queries Firestore.
> - Do not touch: auth logic, api/chat.js, Firestore security rules, existing drill component internals."

---

## What This Session Does NOT Include

These are separate Emergent sessions:
- Bones and streak freeze system (needs its own State Ledger spec)
- Fetch mode (needs FSRS to be live and Stops completed first)
- Break Free mechanic (needs Fetch to exist first)
- Animation and audio systems (v4)
- Badge achievement triggers (separate session after Paths ships)
