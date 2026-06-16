# Milo Speaks Spanish — Word Detail Page Spec
*Triggered when a user taps any Spanish word anywhere in the app. Opens as a full page, not a card or modal.*

---

## Trigger
Any tappable word in the app — drill results, vocabulary browser, Paths Stop word list, Plaza, Fetch session — navigates to this page. Pass the `wordId` as the route parameter.

---

## Data Sources
| Data | Source |
|---|---|
| Word, translation, gender, type/category | `data/words.js` — looked up by `wordId` |
| Example sentence | `words.js` — `contextSentence` field — ⚠️ blocked until populated |
| Conjugations | `data/drillData.js` — partial, not available for every word |
| User progress (correct, wrong, score) | `users/{uid}.progress.es[wordId]` |
| Mastery status | Derived from progress score `s` |
| Word list membership | `users/{uid}.customWords[]` |
| Which Stops contain this word | `data/paths.js` — filter Stops by word list |

---

## Page Sections — V2 Launch

### 1. Header
- Spanish word (large, bold)
- Pronunciation audio button — plays TTS audio for the word
- English translation
- Grammar tag (e.g. Noun, Reflexive Verb, Adjective) — sourced from `words.js` type field
- Gender tag where applicable (el / la)

### 2. Example Sentence — ⚠️ BLOCKED — requires `contextSentence` field populated
- Full Spanish sentence with the target word bolded
- English translation in italics below
- "Hear example sentence" audio button
- "Try saying [word]" speech recognition button — already live in app

### 3. Verb Forms — show only for verbs, collapsed by default behind "Show conjugations" tap
- Infinitive, Past Participle, Gerund
- Present Indicative: yo, tú, él/ella
- Sourced from `drillData.js` where available
- If conjugation data not available for this word: hide section entirely, do not show empty table

### 4. Appears In
- List of Stop names that include this word
- Tapping a Stop name navigates to that Stop in Paths
- Sourced by filtering `paths.js` Stop word lists for this `wordId`

### 5. Related Words
- 2–4 words from the same category or theme tag
- Tapping a related word navigates to that word's detail page
- Sourced from `words.js` — match on `category` field

### 6. Your Progress
- Correct answers count
- Wrong answers count  
- Confidence percentage (derived from `s` score)
- Mastery status label — derived from confidence score:
  - 0–39%: Learning 🌱
  - 40–74%: Familiar 🌾
  - 75–100%: Mastered ⭐

### 7. Actions
- **Drill this word** — launches a drill session scoped to this single word. Use existing DrillShell with a filtered word set.
- **Add to word list / Remove from word list** — toggles this `wordId` in `users/{uid}.customWords[]`. Button label updates based on current membership. Write to Firestore via SpanishHub.jsx handler passed as prop.

---

## Navigation
- Back button returns to previous screen
- "Appears In" Stop tap — navigates to that Stop in Training tab
- Related word tap — navigates to that word's detail page (same component, different `wordId`)
- "Drill this word" — launches drill overlay

---

## State Ownership
- Word data: read from `words.js` and `paths.js` — no Firestore reads needed
- Progress data: passed as prop from SpanishHub.jsx — do not read Firestore directly
- `customWords[]`: write only — single array update via handler prop from SpanishHub.jsx
- **This page never queries Firestore directly — Parent Fan-Out pattern**

---

## V3 Additions (do not build now)
- Word illustration image — requires `imageUrl` field in `words.js`
- "How it is used" paragraph — requires new content field, 300+ entries to write
- Full conjugation table always visible — defer until conjugation data is complete
- Confidence self-rating after drill

---

## Emergent Session Notes
- Build as a new route/page component: `WordDetailPage.jsx` in `src/components/`
- Accept `wordId` as prop or route param
- All data passed down from SpanishHub.jsx as props — no direct Firestore access
- `contextSentence` section: build the UI now, render placeholder text "Example sentence coming soon 🌾" until field is populated
- Verb forms section: only render if conjugation data exists for this word — never show an empty table
- Do not build the illustration section — leave space for it with a placeholder if desired

---

*Last updated: 2026-06-01*
