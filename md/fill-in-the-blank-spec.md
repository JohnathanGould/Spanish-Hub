# Fill in the Blank — State Ledger Spec
*Written 2026-06-22. Hand this to Emergent as the brief preamble before any session prompt.*

---

## What this feature is

A drill that displays a `contextSentence` from `words.js` with the target word blanked out. The English translation of the target word appears below the sentence as the hint. Two modes: typed input and multiple choice. Appears in both DrillsGrid (standalone) and PathsTab (inside Stop fetch rounds).

---

## Data source

Every word in `frontend/src/content/es-en/words.js` has a `contextSentence` field — a complete Spanish sentence using that word in context. Example:

```js
{
  es: "perro",
  en: "dog",
  contextSentence: "El perro es muy grande."
}
```

The drill blanks the target word (`perro`) and shows the hint (`dog`).

**Blanking rule:** Replace the first exact case-insensitive match of `word.es` in `contextSentence` with `_____`. If no match found, fall back to showing the full sentence with the word highlighted — never crash, never show a broken sentence.

---

## Component

New file: `frontend/src/components/drills/FillBlankDrill.jsx`

Follows the exact same prop contract as `TypeDrill.jsx` and `ChoiceDrill.jsx`:

```js
FillBlankDrill.propTypes = {
  words: PropTypes.array.isRequired,        // word pool for this session
  mode: PropTypes.string.isRequired,        // 'typed' or 'choice'
  strictMode: PropTypes.bool,               // from userData.strictTyping
  onComplete: PropTypes.func.isRequired,    // called when drill ends
  onUpdateWordProgress: PropTypes.func.isRequired,
  progress: PropTypes.object.isRequired,
}
```

---

## Two modes

### Typed mode (`mode='typed'`)
- Shows blanked sentence
- Shows English hint below
- User types the missing Spanish word
- Strictness controlled by `strictMode` prop (same Relaxed/Strict logic as TypeDrill)
- `SpecialCharBar.jsx` included — same implementation as TypeDrill

### Multiple choice mode (`mode='choice'`)
- Shows blanked sentence
- Shows English hint below
- Shows 4 option pills — target word + 3 distractors drawn from the current word pool
- Same distractor logic as ChoiceDrill — never include the correct answer as a distractor

---

## Scoring

Identical to existing drills:

- Correct: +1 XP, updates `drillStats` for this drill type, feeds mastery engine via `onUpdateWordProgress`
- Incorrect: 0 XP, updates `drillStats` wrong count
- No per-answer bones — bones are milestone currency only
- 10 questions per session (`DRILL_LENGTH = 10`) — same as all other drills

---

## State ownership

Reads from global state (passed as props from `SpanishHub.jsx`):
- `progress` — per-word mastery data
- `userData.strictTyping` — typing strictness preference
- word pool — passed in as `words` prop

Writes to global state (via callbacks):
- `onUpdateWordProgress(wordEs, isCorrect, drillType)` — same callback as all other drills
- `onComplete()` — signals drill session end

`FillBlankDrill` never queries Firestore directly. Parent fan-out only.

---

## DrillsGrid integration

File: `frontend/src/components/DrillsGrid.jsx`

Two new buttons added:
- **Fill in the Blank — Typed** → launches `FillBlankDrill` with `mode='typed'`
- **Fill in the Blank — Choice** → launches `FillBlankDrill` with `mode='choice'`

Placed in the Output section, after Type It, before Sentence Builder.

**Lock gate:** same as Sentence Builder — locked until `completedPaths.includes('path2')`. Requires `contextSentence` content which assumes Path 2 vocabulary minimum.

---

## PathsTab integration

File: `frontend/src/components/PathsTab.jsx`

`buildDrillDeck` already selects drill types by failure-rate weighting. Two new drill type strings added to the `DRILL_TYPES` array:

```js
'fill-blank-typed'
'fill-blank-choice'
```

DrillRouter (or equivalent switch inside PathsTab) maps these strings to `FillBlankDrill` with the correct `mode` prop.

No changes to the fetch algorithm itself — it already handles new drill types automatically once they're registered in `DRILL_TYPES`.

---

## Fallback rule

If a word has no `contextSentence` (empty string or undefined), exclude it from Fill in the Blank question pool. Fall back to other drill types for that word. Never show a broken or empty sentence.

---

## Files touched

| File | Change |
|---|---|
| `frontend/src/components/drills/FillBlankDrill.jsx` | New file |
| `frontend/src/components/DrillsGrid.jsx` | Add two new drill launch buttons |
| `frontend/src/components/PathsTab.jsx` | Register two new drill types in `DRILL_TYPES`, wire DrillRouter |

**Do not touch:** `SpanishHub.jsx`, `words.js`, `helpers.js`, `ChoiceDrill.jsx`, `TypeDrill.jsx`

---

## Emergent session prompt opener

Paste this before your brief:

> "Before writing any code, confirm you can see these files: `frontend/src/components/drills/FillBlankDrill.jsx` (does not exist yet — you will create it), `frontend/src/components/DrillsGrid.jsx`, `frontend/src/components/PathsTab.jsx`, `frontend/src/components/drills/TypeDrill.jsx`, `frontend/src/components/drills/ChoiceDrill.jsx`. Report the first 3 lines of each existing file before proceeding."
