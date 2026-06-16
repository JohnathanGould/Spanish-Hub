# Milo Curriculum & Content Rules
# Version 1.0 — Established 2026-06-15
# Single source of truth for all content sequencing, vocabulary decisions,
# UI display rules, and paths.js restructuring standards.
# Update this document before changing any content architecture decision.

---

## STATUS
- Established: 2026-06-15
- Applies to: paths.js, words.js, drillData.js, all contextSentence fields,
  all drill UI components displaying vocabulary
- All 12 Paths to be restructured per these rules before beta

---

## SECTION 1 — VERB SEQUENCING RULE (Rule 1)

### The Rule
Every verb introduced in Paths is split across exactly 2 consecutive Stops.

```
Stop N:   infinitive + yo form + tú form + 2 non-verb fillers
Stop N+1: él/ella form + nosotros form + ustedes/ellos form + 2 non-verb fillers
```

### Rationale
- Infinitive is the dictionary anchor — learners need it before conjugated forms
- yo + tú forms are speaker-centred (I/You) — the forms beginners use in real
  conversation first
- él/ella + nosotros + ustedes/ellos are third-party/collective forms — naturally
  follow self-expression
- ustedes = ellos form (same conjugation) — teaching together gives 2 pronouns
  for 1 form, reducing cognitive load
- Research basis: Chatterbug, Lingvist, StoryLearning, SLA morpheme acquisition
  studies all confirm singular-before-plural, speaker-before-observer ordering

### Stop Naming Convention
```
Stop N:   title    = "[Infinitive]"
          titleEn  = "To [English verb]"
          words    = [infinitive, yo_form, tú_form, filler1, filler2]

Stop N+1: title    = "[él form], [nosotros form], [ellos form]"
          titleEn  = "He/She [verb], We [verb], They [verb]"
          words    = [él_form, nosotros_form, ellos_form, filler1, filler2]
```

### Examples
```javascript
// CORRECT
{ id: 'p3s1', title: 'Necesitar', titleEn: 'To Need',
  words: ['necesitar', 'necesito', 'necesitas', 'disculpe', 'nombre'] }
{ id: 'p3s2', title: 'Necesita, Necesitamos, Necesitan',
  titleEn: 'He/She Needs, We Need, They Need',
  words: ['necesita', 'necesitamos', 'necesitan', 'amigo', 'aquí'] }

// WRONG — infinitive and all conjugations in one Stop
{ id: 'p3s1', title: 'Necesitar',
  words: ['necesitar', 'necesito', 'necesitas', 'necesita', 'disculpe'] }
```

### Non-Verb Fillers
Fillers must be words already confirmed in the learner's vocabulary at that
point in the Path sequence. Never introduce a new word as a filler.
Prefer: nouns, connectors, pronouns, adverbs already introduced in earlier Stops.

### ustedes/ellos Label
In the app's word card, drill tiles, and Stop preview for the ellos form,
display as "ustedes/ellos" with both pronouns shown — reinforces equivalence
without requiring metalanguage.

### Irregular Verbs
Same 2-Stop rule applies. Irregular forms are still grouped by person:
- Stop N: infinitive + yo (irregular if applicable) + tú + 2 fillers
- Stop N+1: él/ella + nosotros + ustedes/ellos + 2 fillers
Exception: highly irregular verbs (ser, ir, estar) where yo form is radically
different — these may need an explicit note in the Stop's intro screen:
"Watch out — yo form is irregular!"

---

## SECTION 2 — NOUN DISPLAY RULE (Rule 2)

### The Rule
All nouns are always introduced and displayed with their definite article.
Never display a noun as a bare word.

```
CORRECT:  el taxi    la reserva    el hombre    la mujer
WRONG:    taxi       reserva       hombre       mujer
```

### Where This Applies
- contextSentence fields in words.js — noun must appear with article in sentence
- Stop preview word pills
- Drill tiles in all drill types
- Word cards in Words tab
- Mastery Modal tier cards
- Flashcard drill (front face shows article + noun)

### Exception
Proper nouns (names, countries, cities) — no article needed.
Words introduced as vocabulary items for the article itself (el, la, un, una
in Path 1 p1s4/p1s5) — displayed bare since the article IS the word being learned.

### Research Basis
Universal consensus across SLA research: learning nouns with their articles
from day one builds gender association automatically and prevents persistent
gender errors at advanced levels. Migaku, CliffsNotes, multiple SLA studies.

---

## SECTION 3 — GENDER COLOR CODING (UI Rule, extends Rule 2)

### The Rule
All vocabulary pills, word tiles, and word cards are colored by grammatical gender.

```
Masculine nouns → BLUE pill background
Feminine nouns  → PINK pill background
Verbs           → default/neutral styling (no gender color)
Adverbs         → default/neutral styling
Connectors      → default/neutral styling
Pronouns        → default/neutral styling
Phrases         → default/neutral styling (multi-word, no single gender)
Articles        → styled to match their gender (el/un = blue, la/una = pink)
```

### Where This Applies
- Word pills in WordList.jsx (Words tab)
- Stop preview word pills in PathsTab.jsx
- Drill tiles in SentenceBuilderDrill.jsx
- Word cards in WordDetail.jsx
- Mastery Modal tier cards
- Flashcard drill word tiles
- DrillsGrid tier pills where words are shown

### Sentence Builder Tiles
Multi-word phrases and non-noun words → neutral/default styling.
Noun tiles within Sentence Builder → colored by gender.
This creates a visual reinforcement layer: learner sees blue/pink tiles
and begins to associate color with grammatical gender passively.

### Implementation Note
Gender is stored in words.js as `gender: 'm'` or `gender: 'f'`.
Words without a gender field (verbs, adverbs, phrases) → default styling.
CSS variables to define:
```css
--pill-masculine: [blue value]
--pill-feminine:  [pink value]
--pill-neutral:   [current default]
```

---

## SECTION 4 — ADJECTIVE SEQUENCING RULE (Rule 3)

### The Rule
Adjectives are always introduced in a contextSentence that pairs them with
a noun already confirmed in the learner's vocabulary at that Stop.

```
CORRECT (hombre known before rápido introduced):
  contextSentence: "El hombre es muy rápido."

WRONG (using a noun not yet in vocabulary):
  contextSentence: "El automóvil es muy rápido." (automóvil not yet known)
```

### In paths.js
Adjective Stops should always follow the noun Stops whose vocabulary they
can naturally modify. Do not place adjective Stops before the nouns they
would naturally describe.

---

## SECTION 5 — QUESTION WORD SEQUENCING RULE (Rule 4)

### The Rule
Question words are introduced only after the grammatical structure they
trigger is already confirmed in the learner's vocabulary.

```
dónde  → requires estar forms known (¿Dónde está el hotel?)
quién  → requires ser forms known (¿Quién es?)
cuánto → requires quantity/shopping vocabulary known
cómo   → requires ser/estar known (¿Cómo estás?)
cuándo → requires time vocabulary known
```

### Verification Check
Before placing any question word in a Stop, confirm:
1. The verb its natural question uses is already introduced
2. The nouns in its most common contextSentence are already introduced
If either condition fails, move the question word to a later Stop/Path.

---

## SECTION 6 — PRONOUN SEQUENCING RULE (Rule 5)

### The Rule
Subject pronouns before object pronouns. Always.

```
Introduce first:  yo, tú, él, ella (subject — who does the action)
Introduce after:  me, te, se, le, lo, la (object — who receives the action)
```

### Current paths.js status
Path 1 p1s5: yo, tú ✅ (subject pronouns, correct)
Path 2 p2s1: él, ella, me, se, su ✅ (extends subjects + introduces objects,
acceptable since Path 1 establishes the subject pronoun concept first)

---

## SECTION 7 — CONNECTOR/ADVERB SEQUENCING RULE (Rule 6)

### The Rule
Connectors (y, o, pero, porque, también, cuando, si) are introduced only
after enough vocabulary exists on both sides of the connection to make
the connector meaningful in a real sentence.

```
CORRECT: "y" introduced after nouns like pan, agua exist
  → "Pan y agua, por favor" makes immediate sense

WRONG: "pero" introduced before any noun/verb pairs exist
  → No natural sentence possible with known vocabulary
```

### Verification Check
Before placing a connector in a Stop, write one natural sentence using
only confirmed in-vocabulary words that demonstrates the connector's meaning.
If you cannot write such a sentence, the connector is too early.

---

## SECTION 8 — NUMBER SEQUENCING RULE (Rule 7)

### The Rule
Numbers always introduced in ascending sequence. Never out of order.
Numbers should appear near quantity or shopping vocabulary so they are
immediately useful in context.

```
1-5   → introduced together (one Stop)
6-10  → introduced together (next Stop)
Larger numbers (20, 100, 0) → introduced with quantity adverbs (cuánto, menos)
Numbers near shopping/quantity vocabulary → always
```

### Current paths.js status
p7s1: uno-cinco ✅
p7s2: seis-diez ✅
p7s3: veinte, cien, cero, cuánto, menos ✅
p7s4-s5: shopping/city vocabulary ✅
Correct as-is. Do not reorder.

---

## SECTION 9 — MULTI-WORD PHRASE RULE (Rule 8)

### The Rule
Fixed multi-word expressions are treated as single unbreakable vocabulary
items throughout the entire app. They are never split, deconstructed,
or displayed as component words.

```
Treated as single items:
  buenos días     buenas tardes    buenas noches
  mucho gusto     hasta luego      lo siento
  de nada         por favor        mucho gusto
```

### Where This Applies
- Sentence Builder tiles: multi-word phrases = one tile, never split into
  individual word tiles ("buenos" + "días" would be wrong — "buenos días" is one tile)
- Drill display: always shown as complete phrase
- Word cards: phrase displayed as complete unit
- contextSentence: phrase appears as complete unit, never reconstructed

### Implementation Note
Multi-word entries in words.js (es field contains a space) = phrase.
Sentence Builder tile generation must check for spaces in the es field
and treat the entire string as one tile token.

---

## SECTION 10 — SENTENCE POOL RULES (Track B)

### When Sentence Drills Unlock
Sentence-based drills (Sentence Builder, Flashcard Sentences) unlock when
Path 2 is complete: `completedPaths.includes('path2')`

Rationale: Path 1 vocabulary (greetings, articles, pronouns) lacks the
verb forms needed for real sentence construction. Path 2 introduces
ser/estar — the first real sentence-building vocabulary.

### Pool Architecture
Each Path from Path 3 onward has a per-Stop incremental sentence pool:
- P3S1_SENT_POOL = Path 1 (25) + Path 2 (25) + Path 3 Stop 1 (5) words = 55 words
- P3S2_SENT_POOL = Path 1 (25) + Path 2 (25) + Path 3 Stops 1-2 (10) words = 60 words
- etc. (cumulative within Path, always including all prior Paths as base)

### Pool Vocabulary Rules
Every word in every sentence pool entry MUST be:
1. Confirmed in words.js as a standalone vocabulary entry
2. Assigned to a Path/Stop at or before the current Stop
3. Not a conjugated form whose infinitive hasn't yet been introduced

Verification: before adding any sentence to a pool, check each word
against the confirmed vocabulary list for that cumulative Stop.
When in doubt, replace the word — never assume it's in vocabulary.

### Pool Format
```javascript
export const P3S1_SENT_POOL = [
  { words: ['yo', 'necesito', 'mi', 'pasaporte'], hint: 'I need my passport' },
  // words array: individual tokens, lowercase, no punctuation
  // hint: natural English translation
  // minimum 8 entries per pool, target 10-12
  // sentence length: 3-6 words
];
```

### Global SENT_POOL Status
The existing global SENT_POOL in drillData.js is superseded by per-Path pools.
It contains out-of-vocabulary words (confirmed: "al" appears as target tile).
Do NOT patch it — replace it with per-Path pools as Track B progresses.
Standalone Sentence Builder drill in DrillsGrid uses the most recently
unlocked Path's pool as its source once Track B pools are wired in.

---

## SECTION 11 — PATHS RESTRUCTURING PLAN

### Scope
All 12 Paths restructured per Rule 1 (verb sequencing).
Variable-length Paths — no 5-Stop cap enforced.
Each verb-introducing Stop splits into 2 Stops.

### Current Violations (Rule 1) — 24 of 60 Stops
```
p2s2: ser, soy, eres, es, hombre         → split required
p2s4: estar, estoy, estás, está, aquí    → split required
p3s1: necesitar, necesito, necesitas, necesita, disculpe → split required
p3s2: tener, tengo, tienes, tiene, nombre → split required
p3s3: querer, quiero, quieres, quiere, amigo → split required
p3s4: poder, puedo, puedes, puede, amiga → split required
p3s5: hacer, hago, haces, hace, saber    → split + saber needs own Stop
p4s1: ir, voy, vas, va, sé               → split required
p4s2: hablar, hablo, hablas, habla, más  → split required
p4s3: ver, veo, ves, ve, muy             → split required
p4s4: decir, digo, dices, dice, pero     → split required
p5s4: noche, vivir, vivo, vives, vive    → split required
p5s5: trabajar, trabajo, trabajas, trabaja, año → split required
p6s1: comer, como, comes, come, beber    → split + beber needs own Stop
p6s2: bebo, bebes, bebe, agua, leche     → conjugations without infinitive in same Stop
p7s4: comprar, compro, compras, compra, tienda → split required
p8s3: tren, autobús, llegar, llego, llegas → split required
p8s4: llega, llevar, llevo, llevas, lleva → split required
p10s4: dormir, duermo, duermes, duerme, cansado → split required
p10s5: venir, vengo, vienes, viene, hoy  → split required
p11s4: salir, salgo, sales, sale, ahora  → split required
p11s5: escuchar, escucho, escuchas, escucha, después → split required
p12s3: leer, leo, lees, lee, escribir    → two infinitives mixed
p12s4: escribo, escribes, escribe, caminar, camino → conjugations + new infinitive
```

### Restructuring Session Protocol
1. Write complete restructured paths.js in a dedicated content session
2. Verify every Stop against all 8 curriculum rules before committing
3. Update all sentence pool references after restructuring
4. Run full app test after restructuring — paths.js is critical path

---

## SECTION 12 — CONTENT AUDIT TASKS (outstanding)

### contextSentence Audit
Many Path 1-3 words have contextSentences using Path 4+ vocabulary.
Known confirmed violations:
- puedo contextSentence uses "hablar" (Path 4)
- quiero contextSentence uses "hablar" (Path 4)
- soy contextSentence uses "español" and "estudiante" (not in P1-3 vocabulary)
- Multiple Path 2-3 words use "hablar" in contextSentences

Audit task: for every word in Path 1-3, verify its contextSentence uses
only vocabulary confirmed at or before that word's Stop. Replace any
contextSentence that fails this check.

### Orphaned Words in words.js
The following words exist in words.js but are not assigned to any Path/Stop:
- sabes (you know) — saber conjugation, not in any paths.js Stop
- sabe (he/she knows) — same
- necesitamos, necesitan — saber/necesitar plurals, not confirmed in Stops

Action: assign full conjugation sets for saber and other incomplete verbs
to appropriate Stops during paths.js restructuring session.

---

## VERSION HISTORY
- 1.0 (2026-06-15): Initial document established from session decisions
