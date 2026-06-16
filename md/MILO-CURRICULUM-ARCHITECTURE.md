# 🐾 Milo Speaks Spanish — Curriculum Architecture
*All Stage 0 curriculum decisions. Established before any paths.js rewrite or Emergent session.*
*Built in Learning Design chat — 2026-05-24*

---

## The Learning Model

Milo is built around the research-backed optimal language learning sequence:

| Layer | What it does | Where in Milo |
|---|---|---|
| **Input** | Meaningful exposure to Spanish in context | Stop video + text dialogue |
| **Anchor** | Multimodal introduction of specific words | Phase 1 — Introduce |
| **Recognise** | Input recognition drills | Phase 2 — Hear & Choose |
| **Produce** | Output retrieval drills | Phase 3 — 6 Practice drills |
| **Review** | FSRS-scheduled active retrieval | Flashcard + Fetch |

---

## Path Structure

Each Path contains 7 units:

| Unit | Purpose | Learning? |
|---|---|---|
| **Start** | Navigation screen — lists all 25 words by Stop, links to video, Continue button | ❌ Navigation only |
| **Stop 1** | Introduce + drill words 1–5 | ✅ |
| **Stop 2** | Introduce + drill words 6–10 | ✅ |
| **Stop 3** | Introduce + drill words 11–15 | ✅ |
| **Stop 4** | Introduce + drill words 16–20 | ✅ |
| **Stop 5** | Introduce + drill words 21–25 | ✅ |
| **Finish** | Reviews all 25 Path words | ✅ Review only |

**25 words per Path. 5 words per Stop. 7 units per Path.**

### Start Screen
- Lists all 25 words divided by Stop
- Continue button — next incomplete Stop
- All 5 Stops listed with status (completed / in progress / locked)
- Completed Stops are tappable — user can jump back and redo
- Links to the Path's corresponding video content when available

### Stop Structure (each Stop)
1. **Video** — Input layer (~90 seconds, 5 words in natural Spanish context)
2. **Text dialogue** — Short Spanish dialogue/paragraph using the Stop's 5 words (shown alongside video or as fallback when video not yet produced)
3. **Phase 1 — Introduce** — Passive introduction of each word (image + audio + Spanish + English label once)
4. **Phase 2 — Recognise** — Hear & Choose drill
5. **Phase 3 — Produce** — Practice drills (Fill in the Blank, Type It, etc.)

### Finish Screen
- Reviews all 25 Path words
- No new words — consolidation only
- Uses all 6 Practice drill types across the 25-word set

---

## Stop Video

- **Length:** ~90 seconds per Stop
- **Content:** Short story or dialogue in natural Spanish using all 5 Stop words
- **Language:** Spanish only — no translation, no English
- **Each target word:** Used at least twice in context
- **Production:** Milo original content — produced over time, one Path at a time
- **Fallback:** Text dialogue (always present) serves as Input layer when video not yet produced
- **YouTube:** Each Stop video is uploaded to "Milo Speaks Spanish" YouTube channel
- **Monetisation:** YouTube Partner Program per-channel (requires 1,000 subscribers + 4,000 watch hours per channel independently)

---

## Level Structure

### 20 Sub-levels — Full System

| Tier | Sub-levels | CEFR |
|---|---|---|
| **Beginner** | Beginner I · Beginner II · Beginner III | A1 |
| **Advanced Beginner** | Advanced Beginner I · II · III | A2 |
| **Intermediate** | Intermediate I · II · III | B1 |
| **Advanced Intermediate** | Advanced Intermediate I · II · III | B2 |
| **Advanced** | Advanced I · II · III · IV | C1 |
| **Mastery** | Mastery I · II · III · IV | C2 |

**20 sub-levels total. Advanced and Mastery have 4 sub-levels each — their larger word bases justify more frequent dopamine hits from level advancement.**

### Naming Rationale
- Numbered format (I, II, III, IV) is consistent across all tiers
- Every level name is universally legible — understood by non-users
- Social signalling is part of the reward system: "I'm at Intermediate II" tells a stranger exactly where you are
- Dopamine hit is amplified when you can share your achievement and be understood

### Paths Per Sub-level
4 Paths per sub-level × 25 words per Path = **100 words per sub-level**

### Total System Numbers
- **80 Paths** (4 × 20 sub-levels)
- **2,000 words** (100 × 20 sub-levels)
- **400 Stop videos** (5 × 80 Paths) — produced over time

---

## Word Counts

| Tier | Sub-levels | Words |
|---|---|---|
| Beginner | 3 | 300 |
| Advanced Beginner | 3 | 300 |
| Intermediate | 3 | 300 |
| Advanced Intermediate | 3 | 300 |
| Advanced | 4 | 400 |
| Mastery | 4 | 400 |
| **Total** | **20** | **2,000** |

---

## V3 Scope — Beginner Tier

**Target for v3: all 12 Beginner Paths complete.**

| | |
|---|---|
| Sub-levels | Beginner I · II · III |
| Paths | 12 |
| Stops | 60 |
| Stop videos to produce | 60 |
| Words | 300 |
| Path Finish sessions | 12 |

The existing 300+ words in `words.js` maps approximately to the Beginner tier. The work is resequencing them by frequency order, assigning to correct Paths/Stops, generating contextSentences, sourcing images, and producing 60 videos.

---

## Word Sequence

**Method:** Frequency-first with thematic clustering.

**Reference:** SUBTLEX-ESP frequency list (based on Spanish film and TV subtitles — reflects real conversational Spanish, not textbook Spanish).

**Principles:**
- High-frequency words come first — they unlock the most speech for the least learning effort
- Within themes, words are ordered by frequency
- High-frequency themes come before low-frequency themes
- The existing `words.js` was organised thematically — it must be resequenced before paths.js is rewritten

**Content task:** Audit existing word list against SUBTLEX-ESP. Remove low-frequency outliers. Identify missing high-frequency words. Resequence by frequency-first thematic clustering. Assign all Beginner tier words to 12 Paths × 5 Stops. Do in Content chat before paths.js rewrite.

---

## Three-Phase Word Introduction (Per Stop)

Every word in a Stop is introduced in three phases. This is not optional — it is the core learning loop.

### Phase 1 — Introduce (passive)

One screen per word. No interaction beyond tapping Next.

- Large image (from `word.imageUrl`)
- Spanish word in large text with definite article ("**el perro**")
- Audio plays automatically
- English confirmation in small text below (small label only — not a prompt)

**This is the ONLY screen where English appears for this word.**

### Phase 2 — Recognise (input)

- Hear & Choose: audio plays — user selects the correct written Spanish word
- Warm Up tier — no FSRS update, no bones

### Phase 3 — Produce (output)

- Practice drills: Fill in the Blank, Type It EN→SP, Listen & Type, Multiple Choice EN→SP, Sentence Builder, Conjugation
- FSRS updates after every correct answer
- Bones awarded on correct answers
- Contextual Binding fires after every correct answer (shows contextSentence for 2–3 seconds)

---

## The No-English Rule

English appears **once** per word — as a small confirmation label on the Phase 1 Introduction screen. After that:

- Phase 2 drills: audio or image as trigger — never English
- Phase 3 drills: image, audio, or Spanish sentence as trigger
- Exception: Multiple Choice EN→SP uses English as the production trigger (research-validated — Kroll & Stewart, 1994)
- Contextual Binding shows contextSentence in Spanish only

---

## The Gender Article Rule

Every Spanish noun appears with its definite article in every drill, every time — "el perro" not "perro", "la ciudad" not "ciudad".

**Production rule:** Article is shown in context everywhere. In isolated word production (Type It EN→SP), user types the noun stem only — the article is visible on screen but not required in the typed answer. In sentence-level drills, the article appears naturally and is produced naturally.

---

## Conjugation Scope

### Latin American Spanish — 5 Forms Only

Vosotros does not exist. Ustedes covers all second person plural.

The 5 forms drilled:
- yo / tú / él-ella-usted / nosotros / ellos-ellas-ustedes

This constraint applies to: Conjugation drill content, paths.js, drillData.js, words.js contextSentences, Milo AI system prompt, all video and text content.

### Tense-to-Path Mapping

| Tense | Path range | Sub-level |
|---|---|---|
| Present tense | Paths 1–4 | Beginner I–III early |
| Preterite | Path 5 | Beginner III |
| Imperfect | Advanced Beginner I–II | |
| Future | Intermediate I | |
| Subjunctive | Advanced Intermediate+ | |

Tense scope is **Path-gated, not mastery-gated.** A learner in Paths 1–4 never sees a preterite question regardless of FSRS stability.

### Regular vs Irregular Verbs

**Category A — High-frequency irregulars (ser, estar, ir, tener, querer, poder, hacer)**
Appear in early Paths regardless of regularity. Taught as complete patterns on their own terms.

**Category B — Lower-frequency irregulars (stem-changers, yo-go verbs, etc.)**
Mastery of the regular pattern gates introduction of irregular variants:

| Mastery tier | Drill content |
|---|---|
| Learning 🌱 | Regular -AR/-ER/-IR endings only |
| Strong 💪 | Regular + common irregular variants introduced |
| Mastered ⭐ | Full irregular pattern production expected |

---

## Stop Unlock Logic

```
Stop 1 of Path 1 — always unlocked

Stop N unlocked when:
  - Stop N-1 is in completedStops[]

First Stop of subsequent Paths unlocked when:
  - Final Stop of the previous Path is in completedStops[]

Locked Stop: shows lock icon
Tapping locked Stop: "Complete the previous Stop to unlock this one 🐾"
```

---

## Certificate Logic

```
Path complete when:
  - All 5 Stop IDs for that Path are in completedStops[]
  - Path ID written to completedPaths[]
  - Path certificate screen shown

Grand Certificado Básico awarded when:
  - All 5 Path IDs of the current tier in completedPaths[]
```

---

## Content Tasks (Before paths.js Rewrite)

These must be completed in the Content chat before Emergent builds the Paths system:

1. **Word list audit** — audit existing `words.js` against SUBTLEX-ESP. Remove outliers, identify gaps, resequence.
2. **Assign words to Paths/Stops** — map 300 Beginner words across 12 Paths × 5 Stops in frequency order.
3. **Batch-generate `contextSentence`** — one high-constraint Spanish sentence per word. Each sentence must clearly indicate the target word through context. Simple Spanish, everyday situations.
4. **Assign `theme` values** — situational groupings for each word (e.g., "morning routine", "at a restaurant").
5. **Scaffold `imageUrl` field** — add empty field to every word entry. Population happens in a separate image sourcing sprint.
6. **Rewrite paths.js** — rebuild from the new word assignments. The existing paths.js is built on the old structure and cannot be used.
7. **Audit drillData.js** — remove all vosotros forms. Confirm 5-form conjugation tables only. Sequence regular before irregular for Category B verbs.
8. **Audit paths.js quiz questions** — replace SP→EN recognition questions with EN→SP or cloze-style where possible.

---

## Open Stage 0 Decisions (Curriculum)

- [ ] **5 new words per day cap** — soft suggestion from Milo or hard limit? Soft suggestion fits Milo's identity better ("You've seen 5 new words today — want to review these first? 🐾").
- [ ] **contextSentence style guide** — what constraints? Simple present tense only at Beginner tier? Max word count? A1 vocabulary only in the sentence itself?
- [ ] **imageUrl sourcing strategy** — AI-generated? Royalty-free stock? Who sources them? What visual style? When?
- [ ] **theme field value list** — what are the situational groupings? Need a defined list before batch generation runs.
