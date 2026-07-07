# Current State Ledger — Milo Speaks Spanish
# Last updated: 2026-06-29

## Session Notes — 2026-06-29

### Completed
- Header daily goal number — white fill, now readable
- Milo hero GIF — 120px circle, overflow: hidden, scale(1.4) transform
- Streak card removed, My Words full width
- Achievements card removed from layout
- Ko-fi full width, link fixed to https://ko-fi.com/milospeaks
- Daily challenges — replaced DailyChallengesCard with DailyChallenge.jsx, wired userData.dailyChallenges and startDailyChallenge
- My Words stats — all three on one line
- Fill in the Blank typed mode — inline blank input, grows with typing, SpecialCharBar inside card
- Vocab Fill in the Blank typed mode — same inline blank input treatment
- Stage locking — Advanced Beginner and Intermediate correctly locked until previous stage complete
- Tier locking — tiers respect parent stage lock state
- getStageState / getTierState — full unlock chain corrected
- Drills now use pathWords instead of activeWords — words filtered to completed Stops only

### Bugs Added
None

### Decisions Made
- DailyChallengesCard deleted — DailyChallenge.jsx is canonical going forward
- Achievements card hidden — definition preserved for future use
- DrillRouter and DrillsGrid use pathWords — WordList stays on activeWords

### First Task Next Session
Generate milo_celebrate.gif in Google Flow — blocks Sessions A–F celebration animations

---

## Session Notes — 2026-06-28 (second entry — Milo UI Design)

### Completed
- milo_straining.gif — generated in Flow, approved and saved to frontend/public/animations/
- milo_breaking.gif — generated in Flow, approved and saved to frontend/public/animations/
- milo_free.gif — generated in Flow, approved and saved to frontend/public/animations/
- Animation pipeline established — Google Flow → PNG white background → MP4 → EZGif → GIF
- Character anchor locked — senior black lab, white muzzle, purple collar, MILO bone tag
- Colour palette locked — 9 colours with rules (saved in MILO_UI_DESIGN_SPEC.md)
- Typography locked — Fraunces (display/serif) + Nunito (body/UI)
- Milo presence map locked — which screens Milo appears on and in what pose
- UI Design Spec written — md/MILO_UI_DESIGN_SPEC.md
- Tool assignment decided — Claude Code for CSS variables/fonts/pose logic; v0 for Home screen and Word card redesigns

### Bugs Added
None

### Decisions Made
- Style B locked — realistic painterly senior Milo (no cartoon, no puppy)
- v0 handles Home screen and Word card redesigns
- Claude Code handles CSS variables, fonts, and pose logic
- UI redesign is Stage 4 work — Stage 4 not closed until UI matches vision

### First Task Next Session
Open Flow and generate milo_celebrate.gif. Prompt:
"Milo is celebrating joyfully. Senior black Labrador with white and grey fur on his chin and muzzle. Tail wagging fast, whole body wiggling, mouth open in a huge happy grin, eyes bright and excited. Purple collar with gold MILO bone tag. Realistic painterly illustration. No anatomical details. Appropriate for children. White background."

---

## Session Notes — 2026-06-28

### Completed
- Session A spec written — 103 badges, evaluateBadges wiring, 5 new Firestore fields
- Session B spec written — toaster mount, newlyEarned consumed, first_friend fix, sonner.jsx deleted
- Session C spec written — Streak Shield toggle, per-day consumption, word skip, spendBones
- Session D spec written — learnerContext computed, passed to MiloChat, injected into Gemini
- Session E spec written — FetchTab with config screen, filters, session flow, results
- Session F spec written — BreakFreeDrill, animation FSM, 60s timer, XP gate, bones reward
- BottomNav updated — HOME → PATHS → STUDY → FETCH → MILO → FRIENDS, words tab removed
- TAB_ORDER updated — ['home', 'paths', 'study', 'fetch']
- Dead audio code removed — playCorrect, playAlmost, correctBuffer, almostBuffer, playBuffer
- saber orphaned forms — confirmed closed, non-issue
- Security cleanup — firebase-admin and node-fetch must stay, next-themes + sonner removed after Session B
- Session plan table updated — 64–83 token estimate, all 6 sessions described accurately

### Bugs Added
None

### Decisions Made
- Bones economy locked — freeze 20/day, skip 10, Break Free +10, DrillsGrid 0
- Streak Shield — per-day consumption, 7-day cap, partial coverage
- BottomNav order locked — HOME → PATHS → STUDY → FETCH → MILO → FRIENDS
- Words tab accessible via Home screen only pending Session E
- firebase-admin and node-fetch stay in package.json
- next-themes + sonner removed after Session B

### First Task Next Session
Firebase emulator setup and full journey test — document every bug before Emergent month starts.

### Notes
Tokens reset in 3 days — Emergent month starts then. All 6 session specs (A–F) are written and locked in NEXT_EMERGENT_SESSION_LEDGER.md.

---

## Session Notes — 2026-06-27 (second entry)

### Completed
- **Stage 3 fully closed** — all items resolved (see first entry for detail)
- **Stage 4 fully closed:**
  - contextSentence populated on all 414 words (42 stubs filled this session)
  - lessonText and furtherStudy generated and added to all 13 Paths in paths.js
  - imageUrl scaffolded on all words
  - Stage 4 items 4.4 and 4.5 marked obsolete (architecture changed — Stops contain word arrays, not drill sequences)
- **Stage 5 open** — Pre-Emergent State Ledger phase begun
- Contextual Binding removed everywhere (PathsTab.jsx — component, bindingWord state, render block, both handler branches)
- VocabFillBlankDrill built and deployed (typed + choice modes)
- DrillsGrid lock gates removed for testing (path2/path3 gates gone, Word Sort unlocked)
- DrillsGrid words filtered to completed Stops only, articles/particles/conjunctions/prepositions excluded
- strictMode wired to FillBlankDrill — now fully wired across all typing drills
- audioSpeakEnabled marked for removal (no mic/speech-recognition planned); audioListenEnabled specced for Emergent wiring (gate speak() calls in drills)
- console.log audit — production code confirmed clean
- Bones render body refactor — onAwardBones(2) moved from render body to useEffect with hasFiredRef guard (prevents double-fire in React Strict Mode)
- Stop preview two-button row — ← Paths (red/destructive) + Continue → (green #16a34a) replacing single Begin button; back button removed from top of preview
- All forward-progress buttons changed to green #16a34a (Let's Go, Try Again, Start Path Challenge, Continue to Next Stop, Next / Ready to Practice)
- service-worker chrome-extension guard added (cache.put() guard — fixes Translator tab error)
- Ledgers updated: CURRENT_STATE_LEDGER.md, NEXT_EMERGENT_SESSION_LEDGER.md, MILO-MASTER-REFERENCE.md
- Pre-Emergent July 1st session specced — 3 tasks: Word Sort component, Sentence Builder gender color tiles, lesson card Emergent build
- Lesson card fully specced and content generated (lessonText + furtherStudy for all 13 Paths in paths.js; UI: Skip + Further Study buttons, persistent Path screen access)
- Audio toggle spec defined and wired to Emergent July 1st session

### Stage Status
- Stage 0: CLOSED
- Stage 1: CLOSED
- Stage 2: CLOSED
- Stage 3: CLOSED (2026-06-27)
- Stage 4: OPEN — reopened 2026-06-28. UI overhaul incomplete. See session notes.
- Stage 5: OPEN

### Stage 4 Remaining Tasks

| Task | Stage | Why |
|------|-------|-----|
| Remaining GIFs — celebrate, encourage, fetch | 4 | Retention & UX — emotional reward assets |
| Cursor colour class sweep — fix hardcoded bg-white etc. | 4 | UX — visual identity |
| v0 Home screen redesign | 4 | Retention & UX — first impression, emotional hook |
| v0 Word card redesign | 4 | Retention & UX — core learning moment |
| My Words access from Home screen | 4 | UX — navigation |
| Milo pose swap logic in SpanishHub.jsx | 4 | Retention — emotional feedback |
| Emergent Sessions A–F (badges, Fetch, Break Free etc.) | 4 | Retention & UX — all achievement and reward systems |
| Firebase emulator setup + journey test | 4 | Stability gate before beta |
| Cursor token replenishment | — | Just waiting |
| Flow daily limit reset | — | Just waiting |

---

## Session Notes — 2026-06-27 (first entry)

### Completed
- Contextual Binding removed everywhere (PathsTab.jsx — component, bindingWord state, render block, both handler branches)
- All Stage 0 tasks closed
- Vocab Fill in the Blank drill built and deployed (typed + choice modes) — VocabFillBlankDrill.jsx
- DrillsGrid lock gates removed for testing (path2/path3 gates gone, Word Sort unlocked)
- DrillsGrid words filtered to completed Stops only, articles/particles/conjunctions/prepositions excluded
- contextSentence array handling fixed in VocabFillBlankDrill (pool filter + buildBlank call)
- Stage 3 audit complete — ALL ITEMS CLOSED 2026-06-27:
  - Type It drill — no bug, working fine
  - Listen & Type — no issues observed
  - Log tab — already resolved (one month ago)
  - Translator tab error — fixed (chrome-extension guard added to service-worker.js before cache.put())
  - Word Sort component — deferred to dedicated Emergent session (~2026-07-01, next token reset)
  - Sentence Builder word tile gender color — deferred to same Emergent session
  - debug console.log removed from DrillsGrid (committed 2026-06-27)
- **Stage 3 fully closed.**

### Decisions Made
- DrillsGrid draws from completed Stops only — not full MASTER list
- Excluded types from DrillsGrid words: article, particle, conjunction, preposition
- Lock gates removed — will restore just before beta

---

## Session Notes — 2026-06-19

### Completed
- Removed obsolete P3 sentence pools from drillData.js
- Reworked global SENT_POOL — 34 vocabulary-clean entries against Path 1+2 floor
- pathTiers.js — Path 13 moved to new Intermediate stage
- paths.js — header comment and path13 subLevel corrected
- Gender color coding — [el hombre] single pill implemented across all 6 components
  (WordList, WordDetail, FlashcardDrill, PathsTab, ChoiceDrill, TypeDrill) plus
  SentenceBuilderDrill tiles
- All sentence drills locked at Path 3 (DrillsGrid.jsx)
- Fill in the Blank added to DrillsGrid.jsx
- Word Sort crash fixed — button disabled until component is built
- Regression test passed — full app confirmed working
- contextSentence regeneration — 583 sentences generated via automated script,
  malformed responses cleaned, two truncated sentences manually fixed
- generate-context-sentences.js — reusable script at repo root, reads .env for API key
- Contextual Binding — post-answer overlay implemented in PathsTab.jsx, fires on all
  correct answers with a contextSentence, reads sentence aloud, tap to continue
- MILO_FIREBASE_STRUCTURE.md updated — progress schema, mastery rule, breakFreeXP field
- Grammar reference added to Milo system prompt in api/chat.js
- Terms of Service and Privacy Policy — live at milo-speaks.com/terms and
  milo-speaks.com/privacy
- Bones Logic Spec written — md/bones-logic-spec.md
- Nationality diversity fix — americano replaced with mix of Mexican, Colombian,
  Canadian, Spanish nationalities across words.js and drillData.js
- Anthropic Console account set up, API key working

### Bugs Added
None

### Decisions Made
- Fetch targets output-weak words — weighted by drillStats[dt].w on produce-dimension drills
- 80/20 session composition — 80% confident words, 20% output-weak, small-pool fallback
- Mastery requires output success — outputCorrect threshold, recognition alone caps at Strong
- XP stays flat +1, mastery crossing bonus (+11) is the output reward
- Contextual Binding fires on ALL correct answers (not output only), tap to continue, no timer
- Sentence drills unlock at Path 3 completion
- Placement test deferred to post-launch
- Streak freeze: 10 bones. Word skip: 20 bones. Break Free reward: +10 bones.
  Break Free: XP-gated only (50 XP counter)
- americano appears only as its own vocabulary word — all placeholder uses replaced
  with diverse nationalities

### Tools Assessed
- Anthropic API Console set up and working — generate-context-sentences.js uses it directly

### First Tasks Next Session
1. Firebase emulator setup (before any Emergent session)
2. Fill in the Blank — State Ledger spec + Claude Code build session
3. YouTube decisions (original vs curated, Stop vs Path) — before Session D

---

## Session Notes — 2026-06-18

### Completed
- Removed obsolete P3S1–S5 sentence pools from drillData.js (84 lines, confirmed dead code)
- Reworked global SENT_POOL — replaced 30 out-of-vocabulary entries with 34
  vocabulary-verified sentences using only Path 1+2 words (72-word set, machine-checked)
- pathTiers.js — added new Intermediate stage, Intermediate I tier containing path13;
  used the file's own documented extension point
- paths.js — corrected header comment (Paths 9-12 = Advanced Beginner, Path 13 =
  Intermediate) and path13 subLevel field
- WordList.jsx — gender color coding applied to both noun grid cards and word row list
  items (blue=masculine #1E40AF, pink=feminine #9D174D)

### Bugs Added
None

### Decisions Made
- SENT_POOL fix: minimal (flat pool, Path 1+2 vocab only) — progressive pool logged as
  future backlog
- Article display rule locked: show article whenever word.es is displayed standalone;
  never when Spanish is being produced or tested; never needed inside full sentence strings
- Word tiles in Sentence Builder ARE standalone display — should get gender color
  (separate task, requires MASTER lookup per token)
- Full sentence string highlighting (contextSentence) is a separate, more complex task —
  out of scope for this pass
- saber orphaned forms bug struck — already resolved by curriculum rebuild

### Tools Assessed
None new

### First Tasks Next Session
1. Complete gender color coding — 4 files remaining: WordDetail.jsx, FlashcardDrill.jsx,
   PathsTab.jsx (WordIntroCard), ChoiceDrill.jsx — prompts already designed, continue
   from where we left off
2. Regression test of paths.js — manual walkthrough of live app, several Paths end to end
3. contextSentence audit — Path 1-3 words referencing Path 4+ vocabulary

**Finish gender color coding first next session — we're mid-task and the prompts are
already designed. Stopping here with it partially done is fine; starting something new
before finishing it isn't.**

---

## Session Notes — 2026-06-16 (continuation of 06-15 marathon session)

### Completed
- words.js content gap closed: 185 new entries added (22 of the original
  207 already existed as orphaned nosotros/ellos conjugations from an
  earlier session). Final words.js: 583 entries. Build passing.
- paths.js completely rebuilt from MILO_CURRICULUM_FINAL_V2.md:
  13 Paths, 87 Stops, 522 words, zero duplicates, all words verified
  against words.js exact `es` field matches. All 5 helper functions
  preserved (getStopWords, getPath, getStop, getPathIdForStop,
  isPathComplete). Build passing, +1.45 kB gzipped.
  - Question words use bare forms (dónde/quién/cómo/cuánto) matching
    words.js exactly, not the ¿...? punctuated forms from the design doc
- New SpecialCharBar.jsx component built — Spanish special character
  insertion (á é í ó ú ü ñ ¿ ¡) for any typing drill. Integrated into
  TypeDrill.jsx (covers Type It + all 4 Listen & Type variants).
  - Solved cursor-position insertion despite button-tap stealing focus:
    onPointerDown + preventDefault saves selectionStart before focus
    moves; requestAnimationFrame after onChange sets cursor position
    after React re-renders with new value
  - Edge cases handled: no cursor yet → appends to end; text selected →
    replaces selection; bar hides during feedback state
  - Repositioned above the input (not below) after live device testing
    showed keyboard apps (Typewise tested) push a below-input bar out
    of view, requiring scroll
  - Two-row intentional layout (á é í ó ú ü / ñ ¿ ¡) instead of
    accidental wrap, after live testing showed ¡ orphaning to its own row
  - Tested and confirmed working on real device (Ulefone, Typewise
    keyboard) — all characters insert correctly at cursor position
- Firestore progress reset: completedStops, completedPaths, progress,
  xp, weeklyXP, bones, earnedBadges, lessonsCompleted all zeroed —
  full reset since old IDs now point to different curriculum content
  and this is pre-beta testing, not real user data worth preserving
- Repo housekeeping: all .md files moved into a dedicated folder off root

### Bugs Found (not yet fixed)
- Old P3 sentence pools (P3S1-S5_SENT_POOL in drillData.js) are now
  OBSOLETE — built against the old Path 3 structure before the full
  curriculum rebuild. Need removal or replacement.
- Global SENT_POOL in drillData.js still contains the "al" out-of-vocabulary
  word bug from earlier, AND is now also misaligned with the new 13-Path
  curriculum's sequencing (words may not match new Path/Stop introduction
  order). This is the data source for standalone Sentence Builder (DrillsGrid)
  and needs a full rework against the new curriculum.
- Minor cosmetic: none currently open (¡ wrapping issue was fixed)

### Decisions Made
- Sentence Builder lock gate (completedPaths.includes('path2')) confirmed
  still correct under new curriculum — Path 2 ("Ser") is still the first
  Path with full verb conjugation + enough vocabulary for real sentences.
  No code change needed.
- Curriculum is now considered STABLE at 522 words / 13 Paths / 87 Stops —
  this is the reference structure going forward, documented in
  MILO_CURRICULUM_FINAL_V2.md
- Old MILO_CURRICULUM_CONTENT_RULES.md (12-section rules document) still
  the canonical rules reference — Rule 1 (verb sequencing), gender color
  coding (blue/pink, not yet implemented in UI), and all other rules
  from that doc remain valid and apply to the new 13-Path structure

### Tools Assessed
- Claude in Chrome MCP tools loaded but not used — task was a code change,
  not a browser interaction, tool_search call was a dead end for this case
- Routines feature (Claude Code scheduled runs) explained but not adopted —
  no current recurring task identified as worth automating yet

### First Tasks Next Session
1. Remove obsolete P3S1-S5_SENT_POOL from drillData.js (old Path 3
   structure, no longer valid)
2. Rework global SENT_POOL against new 13-Path curriculum — likely
   regenerate per-Path sentence pools properly this time (Track B,
   revisited), now that paths.js is stable and won't change underneath
   the pools again
3. Implement gender color coding (blue=masculine, pink=feminine pills)
   in UI — decided in rules doc, never built
4. Full app regression test of the new paths.js — walk through several
   Paths/Stops manually, confirm word cards display correctly, confirm
   Fetch/drill flows work against the new Stop structure end to end
5. Audit contextSentence fields in words.js against the NEW curriculum
   sequencing (the original audit item from 06-14/06-15 is still valid,
   just needs to be re-run against the new Path order rather than the old one)

---

## Session Notes — 2026-06-15

Completed:

Bug audit #3-8: all resolved or closed.
- #3 Sound effects: confirmed removed (MatchingDrill, SentenceBuilderDrill, TypeDrill).
- #4 Mastery filter: confirmed live (drillMode state in WordList.jsx).
- #5 Tap position: closed — center modal confirmed good UX via play-test.
- #6 Sentence Builder distractors: Track A shipped — 2 distractor tiles added from queue, excluding target sentence words, fallback for queue.length === 1. Check button changed to disabled={placed.length === 0}.
- #7 Pack import: confirmed working (live test).
- #8 ES/EN side-by-side: confirmed fixed.
Sentence Builder missing from DrillsGrid — fixed (button added after Conjugation).
"Practice" section header removed from DrillsGrid (freed vertical space).
Sentence Builder lock gate added: locked until completedPaths.includes('path2') (Path 2 gate — Path 1 vocabulary insufficient for real sentence construction).
Track B scoped: per-Stop incremental sentence pools starting at Path 3 (Path 3 is first Path with real action verbs — necesitar/tener/querer/poder/hacer).
P3S1-S5 sentence pools generated, revised, and added to drillData.js — confirmed vocabulary-clean (no hablar, no tarea, no eso, no out-of-sequence forms).
Milo Curriculum & Content Rules established (see new project doc).
Verb sequencing rule finalized (Option B + 3-way split: Stop N = infinitive + yo + tú + 2 fillers; Stop N+1 = él/ella + nosotros + ustedes/ellos + 2 fillers).
Gender color coding decided: blue (masculine) / pink (feminine) pills.
Variable-length Paths confirmed (no 5-Stop cap).
Stop naming convention confirmed.

Bugs found (not yet fixed):

Global SENT_POOL (drillData.js) contains out-of-vocabulary words (e.g. "al") — superseded by per-Path pools once Track B complete, not to be patched directly.
contextSentence audit needed: Path 1-3 words have contextSentences using Path 4+ vocabulary (hablar, sabes, etc.).
sabes/sabe/sabemos/saben orphaned in words.js — not assigned to any Path/Stop. Full saber conjugation set needs Stop assignment.
Gender color coding (blue/pink pills) not yet implemented in UI.

Decisions made:

Sentence Builder unlocks when Path 2 complete (completedPaths.includes('path2')).
Track B scope: per-Stop incremental pools from Path 3 onward (cumulative: each Stop's pool = Path 1 + Path 2 + Path 3 up to that Stop).
Global SENT_POOL to be superseded by per-Path pools — not patched.
Gender color coding: masculine = blue pill, feminine = pink pill.
Paths restructuring: all 12 Paths, variable-length, expand verb Stops.
Stop naming: "[Infinitive]" / "[él form], [nosotros form], [ellos form]". TitleEn: "To [verb]" / "He/She [verb], We [verb], They [verb]".
Multi-word phrases treated as single unbreakable vocabulary items.

---

## Session Notes — 2026-06-15 (evening, extended session)

### Completed
- Bug audit closed: #3-8 all resolved (sound effects removed by design,
  mastery filter confirmed live, tap-position modal confirmed working
  as designed, Sentence Builder distractors shipped, pack import confirmed,
  ES/EN layout confirmed)
- Sentence Builder Track A shipped: 2 distractor tiles pulled from queue,
  excluding target words, graceful fallback for single-entry queues,
  Check button changed to disabled={placed.length === 0}
- Sentence Builder missing launch button fixed in DrillsGrid (added after
  Conjugation, "Practice" header removed for vertical space)
- Sentence Builder lock gate added: locked until completedPaths
  includes 'path2' (later superseded by full curriculum redesign — see below)
- MILO_CURRICULUM_CONTENT_RULES.md created — 12 sections covering verb
  sequencing, noun/article rules, gender color coding (blue=masc/pink=fem),
  adjective/question-word/connector/number sequencing, multi-word phrase
  handling, sentence pool architecture
- MAJOR: Entire 12-Path curriculum redesigned from scratch (not patched)
  - Abandoned original paths.js structure entirely — research-based rebuild
  - Verb order based on CORPES XXI frequency ranking (ser>estar>tener>
    hacer>poder>ir>dar>ver>saber>querer>decir>hablar>venir>salir>vivir...)
  - Rule 1 finalized: every verb splits across 2 Stops
    (Stop N: infinitive+yo+tú+3 NEW vocab; Stop N+1: él/ella+nosotros+
    ustedes/ellos+3 NEW vocab) — NO recycled/filler words, every Stop
    contributes exactly 6 genuinely new words
  - hay confirmed via research as legitimate standalone exception to
    Rule 1 (impersonal, invariant, every A1 curriculum treats it this way)
  - Tier structure locked: Tier 1 (Paths 1-4) = 6 Stops/Path,
    Tier 2 (Paths 5-8) = 7 Stops/Path, Tier 3 (Paths 9-12) = 8 Stops/Path
  - Final result: 504 words, 84 Stops, 12 Paths — programmatically
    verified twice, zero duplicate words across entire curriculum
  - Found and fixed 2 duplicate-word bugs (café, oficina) via script,
    plus ~6 more caught manually during generation
  - Removed trabajo-as-noun (Path 4) to eliminate homonym confusion
    with trabajo-as-verb (Path 10, "I work") — beginner clarity prioritized
    over preserving a linguistically-valid homonym
  - Full document: MILO_CURRICULUM_FINAL_V2.md

### Bugs Found (not yet fixed)
- Old Sentence Builder lock gate (completedPaths.includes('path2')) is
  now based on the OLD Path structure — needs revisiting once new
  paths.js is built, since Path boundaries/content have completely changed
- P3 sentence pools generated in earlier session (P3S1-S5_SENT_POOL) are
  now OBSOLETE — based on old Path 3 structure which no longer exists
- Global SENT_POOL in drillData.js still contains out-of-vocabulary
  words (e.g. "al") — not yet addressed, lower priority now given the
  full curriculum rebuild
- contextSentence audit (Path 1-3 words using Path 4+ vocabulary) —
  MOOT — entire vocabulary/Path structure changed, will need redoing
  against new curriculum once paths.js is rebuilt

### Decisions Made
- Curriculum approach: rebuild from research/frequency data, not patch
  existing structure — eliminated cascading dependency problems
- No filler/recycled words in any Stop — every Stop = 6 NEW words always
- Verb Stops pair 3 conjugated forms + 3 new vocabulary (not reused nouns)
- 504-word target achieved and verified (not negotiable anymore — locked)
- trabajo noun removed entirely from curriculum (beginner clarity)
- Gender color coding still pending implementation: blue=masculine,
  pink=feminine pills (decided in rules doc, not yet built in UI)

### Tools Assessed
- None new — Claude Code handled all bug fixes, Claude (this chat)
  handled all curriculum design/verification, bash/python used for
  duplicate-checking the 504-word list (manual tracking proved
  unreliable at this scale — script verification now mandatory for
  any future word-list work)

### First Tasks Next Session
1. Convert MILO_CURRICULUM_FINAL_V2.md into actual paths.js code
   (all 12 Paths, 84 Stops, 504 words)
2. Identify which of the 504 words already exist in words.js vs.
   need new entries created (imageUrl, contextSentence, gender, type)
3. Rebuild Sentence Builder lock gate logic against new Path structure
4. Regenerate sentence pools (Track B) using new curriculum's confirmed
   vocabulary — old P3 pools are obsolete
5. Implement gender color coding (blue/pink pills) in UI
6. Full app test once new paths.js is live — this is a critical-path
   file, test thoroughly before considering it stable

---

## Session Notes — 2026-06-14 (late evening)

Completed:

Removed sound effects entirely: playCorrect/playAlmost calls and imports removed from MatchingDrill.jsx, SentenceBuilderDrill.jsx, and TypeDrill.jsx. All drills now silent on answer (normal tap sounds only). Function definitions left unused in helpers.js (low priority cleanup, not yet removed).
Removed "Hear It" button from Type SP→EN mode (TypeDrill.jsx) — tapping it previously let users hear the Spanish prompt before typing the English answer, turning a recall drill into a listening drill. Type EN→SP and all Listen & Type modes unaffected. isPromptEs remains used elsewhere (display label, prompt text) — no orphaned code.
Moved Relaxed/Strict typing toggle from per-drill local state (TypeDrill.jsx) to a global user preference:
  - SpanishHub.jsx: added strictTyping: false to default userData, added setStrictTyping callback (mirrors awardBones pattern), passed strictMode={userData.strictTyping} to <DrillRouter>, strictTyping={userData.strictTyping} to <PathsTab>, onStrictTypingToggle={setStrictTyping} to <ProfileSheet>
  - PathsTab.jsx: threaded strictTyping through StopView props and both sharedWordProps definitions (fetch + path-fetch phases) as strictMode
  - TypeDrill.jsx: removed local useState and toggle UI block, now reads strictMode from props (default false)
  - ProfileSheet.jsx: added Relaxed/Strict toggle UI (same visual style as removed version), placed below Text-to-speech section, wired to onStrictTypingToggle

Bugs added:

None identified.

Decisions made:

Sound effects: no correct/almost sound effects anywhere in the app — decided after live testing, preference for plain tap sounds. playCorrect/playAlmost remain defined in helpers.js but unused.
Typing strictness is now a global setting (ProfileSheet), not per-drill — applies consistently across Type It and Listen & Type modes everywhere they're rendered.
Type SP→EN should not offer audio of the prompt — preserves it as a recall drill, distinct from Listen & Type modes.
Break Free trigger condition — RESOLVED: Break Free becomes available after the user accumulates 50 XP since the last Break Free trigger (new counter field, e.g. breakFreeXP, starts at 0, resets to 0 on trigger). Chosen over bones-threshold (bones already has spending power: streak freeze, word skips, Break Free rewards — using it as a gate too would create a currency conflict) and over lifetime-XP-multiples (counter-since-reset avoids double-trigger edge cases on large XP jumps, e.g. +75 from Path completion). Trigger makes Break Free available, not auto-triggered — respects no-interruption principle, user chooses when to engage, consistent with how Stop Complete offers "Continue" rather than forcing navigation.
This resolves the "Decide when Break Free triggers" item in MILO-ACTION-LIST.md (Break Free section) and informs Fetch standalone (Session F) — Fetch's entry point is now defined: available after Break Free success.

Tools assessed:

None new — Claude Code handled all edits this session.

First task next session:

Update NEW_MILO_PRODUCT.md "Key Product Decisions (locked)" with the Break Free trigger decision (50 XP counter, resets on trigger, available not auto-triggered).
Then continue down Known Bugs: word mastery filter buttons in Words tab, Word detail card tap position, Sentence Builder distractors bug.
TypeDrill.jsx EN audio rate check (carried over from afternoon session — verify if Listen & Type EN mode needs the same 0.6 rate treatment as Hear & Choose for long phrases).

---

## Session Notes — 2026-06-14 (evening)

Completed:

Audio fix: consolidated duplicate sanitiseForTTS (was in both ChoiceDrill.jsx and TypeDrill.jsx) into single exported function in helpers.js. Added comma-pause for (m)/(f) → ", masculine"/", feminine" and for / separator → , or ,. Lowered Hear & Choose EN audio rate to 0.6. Both "hay" (There is, or, there are) and "el"/"la" (the... masculine/feminine) now confirmed working correctly in both Hear & Choose and Listen & Type.
Image cropping fix: word intro image (PathsTab.jsx) changed from maxHeight: 55vw to aspectRatio: 1/1, then capped at maxWidth: 240px with margin: 0 auto to eliminate a scroll regression introduced by the square fix. Confirmed working on device.

Bugs added:

None new. Two items from "Known Bugs — NEW" (audio, image cropping) are now resolved.

Decisions made:

Bones structure confirmed correct as-is: +2 per Stop pass only, no per-answer bones, XP is the per-answer reward channel (carried over from morning session, restated here).
sanitiseForTTS consolidation pattern established: shared text-transform utilities belong in helpers.js, not duplicated per drill component — prevents the exact drift that caused this session's "feminine pauses but masculine doesn't" confusion.

Tools assessed:

None new — Claude Code handled all edits this session.

First task next session:

TypeDrill.jsx EN audio rate — only ChoiceDrill's Hear & Choose got the 0.6 rate change; verify whether TypeDrill's speak(word.en, ...) calls (Listen & Type EN mode) also need a slower rate for long phrases like "there is / there are", now that they share the same sanitiseForTTS pause logic.
Then continue down Known Bugs list: ChoiceDrill sound effects (playCorrect/playAlmost), word mastery filter buttons.

---

## Session Notes — 2026-06-14 (afternoon)

Completed:

Terminology audit — searched all user-facing strings for "Stop"/"Path"/"Tier"/"Stage". Conclusion: "Stop" and "Path" are correct, intentional learner-facing vocabulary (journey/walk metaphor, matches "Walk with Milo" framing) — kept as-is, no renaming needed.
Removed dead code: frontend/src/components/v0/PathsView.jsx — confirmed zero references anywhere in src/, deleted, build verified, committed.
Bones display verification — confirmed +2 bones on Stop pass increments header counter correctly and StopCompleteScreen displays "You earned 2 bones".
Bones reward structure — decided: +2 bones per Stop pass only. No per-answer bones. Per-answer gratification is XP (already correctly wired). Ledger's old "+1 bone per correct Phase 3" description was inaccurate — corrected below.
Full Paths/Stops architecture re-verified against actual code (see corrected section below) — previous ledger description (Phase 1/2/3 split, FSRS drill-type selection) did not match implementation. Actual system confirmed working and well-designed, just different from what was documented.

Bugs found (not yet fixed):

Audio — "hay" TTS pronunciation runs "There is/There are" together too fast to parse the "or"
Audio — "el" TTS says "the masculine" — sounds like an English description is being read instead of/alongside the Spanish word
Card images — word card images are rectangular, getting cropped; need to be square (object-fit/aspect-ratio CSS fix)

Decisions made:

"Stop"/"Path" terminology: keep as user-facing vocabulary, no changes needed (audit closed)
Bones: +2 per Stop pass only (confirmed correct, not a bug). XP is the per-answer reward channel.

First task next session:

Audio diagnosis — "hay" and "el" TTS issues (need to determine if speak() is reading wrong field/source per word, or if this is a broader content-data issue)
Then: square image cropping fix (CSS, low risk, quick)

---

## CORRECTED — Paths & Stops Architecture (verified 2026-06-14)

**The previous "Phase 1/2/3 + FSRS drill-type selection + +1 bone/correct" description was inaccurate. Actual implementation, verified directly against code:**

### Per-Stop flow
1. **Preview** — word list for the Stop (5 words)
2. **Intro** (Phase 1) — word-by-word: image, Spanish word, auto-audio, English label, Next. Only screen where English appears. Words ordered by `fetchStopWords` (SpanishHub.jsx) — sorted by `progress.stability` ascending (weakest first), tiebreak by `outputCorrect` ascending.
3. **Fetch round** — 20 questions (`FETCH_LENGTH`), built by `buildFetchQueue(words, progress)`:
   - Word pool = this Stop's 5 words, capped/repeated to fill 20, shuffled
   - Drill **type** per question chosen by `buildDrillDeck(progress, words)` — weights `DRILL_TYPES` by per-word/per-type failure rate (`drillStats[dt].w / (c+w)`); no data yet → equal weight
   - `enforceMinGap` ensures same word doesn't repeat within 3 questions
   - `forcedProgress` forces the "weakest" word to be drawn first each cycle via `spacedRepetitionSort`
4. **Results** — pass threshold 80% (`PASS_THRESHOLD`). Fail → "Try Again" rebuilds queue. Pass → `onCompleteStop(stopId)` + `onAwardBones(2)` → Stop Complete.
5. **Stop Complete** — "+2 bones" message, "Continue to Next Stop" (or, on Stop 5, "Start Path Challenge")

### Per-Path flow (after Stop 5 passes)
6. **Path Fetch** — 25 questions (`PATH_FETCH_LENGTH`), `buildPathFetchQueue(buildPathWordPool(pathId), progress)` — same mechanism as Stop fetch but pool = all 25 words across the Path's 5 Stops. Pass threshold 80% (`PATH_FETCH_PASS_THRESHOLD`).
7. Pass → `completePathFetch`: writes `completedPaths[]`, **+15 bones, +75 XP**, Certificate available.

### FSRS — actual role
- `ts-fsrs` imported in SpanishHub.jsx. Used for **word ordering** (intro screen sequencing, "weakest first" via stability), NOT for drill-type selection.
- Drill **type** variety/weighting comes from `buildDrillDeck` (failure-rate based), a separate mechanism from FSRS.

### XP — per-answer reward (confirmed working)
- `onUpdateWordProgress` (SpanishHub.jsx ~line 468): every answer in fetch/path-fetch rounds.
- Correct: +1 XP normally, **+11 XP if word crosses into "mastered" on this answer** (`wasAboutToMaster`)
- Incorrect: 0 XP, but `progress.s` (stability-like score) decreases, `progress.w` (wrong count) increases
- Runs `evaluateBadges` and persists every answer

### Bones — confirmed reward structure
- **+2** per Stop pass (`onAwardBones(2)` in results phase)
- **+15** per Path pass (`completePathFetch`)
- No per-answer bones — by design (XP is per-answer feedback; bones are milestone currency for Break Free / streak freeze economy)

---

## Session Notes — 2026-06-14 (morning)

Completed:

Redesigned Path cards (Level 3 list): 2-line layout (title/subtitle) + progress badge, removed Path N · subLevel line
Replaced inline accordion with full-screen Stops view: removed expandedPathId/togglePath/expanded, added selectedPathId state with "← Back" navigation (FSM pattern, one layer per state)
Added 3-state progress styling (locked=grey, current=vivid green #16A34A, complete=vivid cyan #0891b2) across all 4 hierarchy layers: Stage ("Choose your level"), Tier (Beginner I/II/III), Path cards, and Stops list — derived from completedPaths/completedStops, no new gating logic, everything stays tappable
Restructured Stop row indicators: left circle always shows stop number (all 3 states), right side shows Check/GO/Lock status indicator, removed redundant ChevronRight
Recolored StopView header from red gradient to green gradient, reduced height (p-3→p-2, text-2xl→text-lg)
Fixed real scroll bug in Stops view: container was missing pb-24 (later tuned to pb-12), preventing scroll entirely — confirmed against established codebase pattern
Further compacted Stops view for small viewports (Ulefone Power Armor 16 Pro, 720×1440): drill-card padding 18px→14px, row gap 8px→6px, heading margins mb-4→mb-2 — all 5 Stops now visible without scrolling

Bugs added:

None identified as newly introduced — ChevronRight import now unused (cosmetic ESLint warning only, not touched)

Decisions made:

Color system: green = current/in-progress, cyan = complete, grey = locked, consistent across Stage/Tier/Path/Stop — vivid/white-text treatment (not pastel), established as the standard going forward
Locked Stage/Tier pills remain fully tappable (no new gating) — color is informational only; only Stops remain hard-gated
drill-card confirmed used only in the Stops view — safe to modify without side effects elsewhere

---

## Session Notes — 2026-06-10

Completed this session:

All scrolling eliminated across Fetch drills, preview phase, and intro phase
DrillShell headerOffset prop added — fetch drills pass headerOffset={90} to account for app Header
ChoiceDrill compacted — reduced word card padding, text size, audio button spacing
Removed redundant word/audio from S→E and E→S post-answer feedback
Hear & Choose post-answer card and audio button made more compact
Preview phase: word pills condensed, Begin button pinned above BottomNav
Stop header card padding reduced
feature/fetch-algorithm fully merged to main

---

## Current Stage: 3 → 4 (Paths live, stabilization needed)

pathTiers.js now has 3 live Stages: Beginner, Advanced Beginner, Intermediate.
Intermediate I contains path13 only — designed to grow as Path 14+ are authored
from the 83 orphaned words not yet assigned to the 13-Path curriculum.

## Live App
- URL: spanish-hub-zeta.vercel.app
- Landing page: milo-speaks.com (separate repo: JohnathanGould/milo-speaks)
- Repo: github.com/JohnathanGould/Spanish-Hub
- Stack: React + Tailwind + CRACO / Firebase Auth + Firestore / Gemini / Vercel
- Firebase project: my-spanish-hub — northamerica-northeast1 (Montreal)
- Lockfile: frontend/yarn.lock — authoritative. Do not create root-level lockfile.

## Security
- Aikido configured, PR creation enabled
- CVEs patched: uuid, dompurify, webpack-dev-server
- Flagged for future cleanup: firebase-admin, node-fetch, next-themes in frontend/package.json

## Dev Environment
- OS: Windows
- Terminal: PowerShell
- Never use && to chain commands
- Use Remove-Item instead of rm/rd

## Architecture Rules (immutable)
- SpanishHub.jsx = single source of truth. All global state lives here.
- Children never query Firestore directly — Parent Fan-Out only.
- v0 components never edited directly — Wrapper Pattern always.
- Never modify without dedicated session: Firebase Auth logic, api/chat.js, Firestore security rules.
- WARNING: frontend/public/index.html is React app entry point — never edit for landing page purposes.
- Landing page lives in JohnathanGould/milo-speaks repo only.
- TAB_ORDER lives at module level in SpanishHub.jsx (above component function)

## Key Files
- Main shell: frontend/src/SpanishHub.jsx
- Paths + Stop flow: frontend/src/components/PathsTab.jsx
- Bottom nav: frontend/src/components/BottomNav.jsx
- Words data: frontend/src/content/es-en/words.js (398 words, all imageUrl + contextSentence populated)
- Paths data: frontend/src/content/es-en/paths.js (12 Paths × 5 Stops × 5 words, helper functions exported)
- Drill components: frontend/src/components/drills/
- Animations: frontend/public/animations/milo_idle.gif
- Landing page: JohnathanGould/milo-speaks/index.html
- Language config: frontend/src/config/languageConfig.js
- Context sentence generator: generate-context-sentences.js (repo root) — reads ANTHROPIC_API_KEY from env; reusable if curriculum changes. Use --fix flag to reprocess only broken sentences. Use --test for dry run.
- REMOVED: frontend/src/components/v0/PathsView.jsx (dead code, deleted 2026-06-14)

## Navigation
Tab IDs: home · paths · words · study · friends · milo
TAB_ORDER = ['home', 'paths', 'words', 'study']
Learn tab: still in SpanishHub ternary chain but NOT in BottomNav. Kept because Certificate modal is only accessible via LessonsList. Do not remove the learn tab block.
Swipe: left = advance, right = retreat. No wrap. Disabled during drills.
Header taps: Milo icon → home, 🔥 → StreakModal, ⭐ → leaderboard, avatar → ProfileSheet

## What Is Complete

### Drills (updated 2026-06-07)
Three tabs: Warm Up / Practice / Review.
All drills directional with pill UI. Fixed at 10 questions — no length toggles.
New modes: hear-choose-en-es, listen-type-en-es, listen-type-sentence-en-es.
listen-type-sentence silent null bug fixed.
FlashcardDrill internal toggles removed — direction and mode prop-controlled.
DrillsGrid inline flashcards use progress={{}} — shuffle order, spaced-rep deferred.

Warm Up (no XP, no bones): Matching, Word Sort (button disabled — no component built), Gender el/la
Practice: Multiple Choice SP→EN/EN→SP, Type It SP→EN/EN→SP, Hear & Choose SP→EN/EN→SP, Listen & Type Words SP→EN/EN→SP, Listen & Type Sentences SP→EN/EN→SP, Conjugation Present
Review (no XP, no bones): Flashcards Words SP→EN/EN→SP, Flashcards Sentences SP→EN/EN→SP

### Paths & Stops — see "CORRECTED — Paths & Stops Architecture" section above for verified detail
PathsTab: 12 Paths × 5 Stops, lock/unlock driven by completedStops[]/completedPaths[].
Stop completion: writes stopId to completedStops[] via persistData, next Stop unlocks.
Path completion: writes pathId to completedPaths[] via persistData, +15 bones, +75 XP.
StopCompleteScreen: bones summary, path completion message, Certificate button.
Certificate: Certificate.jsx wired, shows on Path completion, accessible from Path list.
Continue button on Home: calls getCurrentStop() → first incomplete Stop → navigates directly.

### Audio (updated 2026-06-07)
initAudio() called on app mount — preloads correctBuffer, almostBuffer, confettiBuffer.
Race condition fixed — buffers ready before first user interaction.
speak() defaults to languageConfig.sourceLanguage ("es"). Call speak(word.es) for Spanish TTS.
KNOWN ISSUES (2026-06-14): "hay" reads "There is/There are" too fast (unclear "or"); "el" reads "the masculine" — possible English-description leakage into TTS. Needs diagnosis.

### Mastery Modal (built 2026-06-07)
Tapping words mastered pill on Home opens floating modal overlay.
4 tier cards: New (stability=0, outputCorrect=0), Learning, Strong, Mastered.
Each tier tappable → mini drill picker (4 drill options) → launches drill with filtered words.
Post-Fetch: drill picker replaced by Fetch.

### Landing Page (milo-speaks.com)
Animated Milo GIF in white circle container (.milo-container).
milo-banner.png live. Mobile header fixed. Bandana lore removed.

## Firestore Schema (verified)
users/{uid}: displayName, photoURL, customWords[], importedPacks[]
progress{ wordEs: { c, w, s, stability, difficulty, due, lastReview, outputCorrect, drillStats } }
xp, weeklyXP, streak, dailyGoal, bones
earnedBadges[], completedStops[], completedPaths[], lessonsCompleted[]
sessions[], activeDays[], friends[], reminderEnabled
audioListenEnabled, audioSpeakEnabled

leaderboard/{uid}: displayName, photoURL, xp, weeklyXP
chatUsage/{uid}: count, date (rate limit: 30/day)

## Known Bugs (fix before adding features)
1. Pre-existing ESLint error SpanishHub.jsx line 242 (if isGuest / react-hooks/immutability) — do not touch.

Follow-up tasks (not bugs):
- Word Sort — no component built, button currently unlocked in DrillsGrid (tappable, no-op). Dedicated Emergent session scheduled ~2026-07-01 (next token reset).
- Sentence Builder word tiles: gender color requires MASTER lookup per token — same Emergent session as Word Sort (~2026-07-01).

RESOLVED:
- contextSentence audit RESOLVED 2026-06-19: 583 sentences regenerated against curriculum vocabulary floor. Malformed/truncated responses cleaned up (first-line strip + last-punctuation trim added to generator). Two truncated sentences manually corrected (me, se). 115 minor remaining violations are adjective inflections and orphaned-word companions — all linguistically correct, not flagged for fixing.
- Gender color coding 2026-06-18 (complete): design locked — gendered nouns display as single colored pill [el hombre] / [la casa]; masculine #1E40AF on #DBEAFE, feminine #9D174D on #FCE7F3. Applied across WordList.jsx, WordDetail.jsx, FlashcardDrill.jsx, PathsTab.jsx (WordIntroCard + Stop word list), ChoiceDrill.jsx, TypeDrill.jsx.
- SENT_POOL reworked 2026-06-17: obsolete P3S1-S5 pools deleted, SENT_POOL replaced with 34 Path 1+2 aligned sentences (ser conjugations, greetings, nationality, family vocabulary — no out-of-vocabulary words)
- Word mastery filter buttons in Words tab — confirmed live 2026-06-15 (drillMode state in WordList.jsx)
- Word detail card tap position — closed 2026-06-15 (center modal confirmed good UX via play-test)
- Sentence Builder distractors — fixed 2026-06-15 (Track A: 2 distractor tiles from queue, excluded target words, fallback for queue.length===1, Check button disabled={placed.length===0})
- Community Word Packs import — confirmed working 2026-06-15 (live test)
- Community Word Packs ES/EN side-by-side — confirmed fixed 2026-06-15
- Scroll issue in PathsTab — fixed 2026-06-14 (pb-24/pb-12 fix in Stops view)
- Bones display — verified working correctly 2026-06-14 (+2/Stop pass, no per-answer bones by design)
- Audio TTS — "hay"/"el"/"la" unclear — fixed 2026-06-14 (sanitiseForTTS consolidated to helpers.js, comma pauses added, EN rate lowered to 0.6)
- Card images cropped — fixed 2026-06-14 (aspectRatio: 1/1, maxWidth: 240px, margin: 0 auto in PathsTab.jsx WordIntroCard)
- Sound effects (playCorrect/playAlmost) — removed 2026-06-14 (decision: silent answer feedback preferred; calls and imports removed from MatchingDrill, SentenceBuilderDrill, TypeDrill)

## Emergent Session Protocol
Before every session:
1. Open new Emergent session (+button)
2. Say: "Import my existing public GitHub repo: JohnathanGould/Spanish-Hub, branch main. Confirm you can see these exact files before doing anything: frontend/src/SpanishHub.jsx, frontend/src/components/BottomNav.jsx, frontend/src/content/es-en/paths.js, frontend/src/components/PathsTab.jsx. Report the first 3 lines of each file."
3. Only paste brief after all 4 files confirmed.
4. Wait 10 minutes after session before checking token count.
5. Triple-check all file paths in brief — typos cost 2-3 tokens.

## Token Budget
Monthly: 110 tokens (100 subscription + 10 free). Does not roll over.
This month (June 2026): 102.65 tokens used. 7.35 remaining (expires at reset).
Setup waste: 20.56 tokens — wrong repo. Pre-flight check now mandatory.
Average session cost: 6-10 tokens. FSRS/multi-file sessions cost 10-12.

## Next Session Priorities
1. Write Milo Curriculum & Content Rules as formal project document
2. Restructure paths.js per new verb sequencing rule (all 12 Paths)
3. Implement gender color coding (blue/pink pills) across UI
4. contextSentence audit — Path 1-3 words using Path 4+ vocabulary
5. Assign saber conjugation forms to appropriate Path/Stop in words.js/paths.js

## Animation Pipeline
Google Flow → PNG white background → animate to GIF white background. No post-processing.
Storage: frontend/public/animations/ and milo-speaks/animations/
Naming: milo_[pose].gif
Character: black lab, purple collar, gold MILO bone tag, no bandana, tie for special events only.
Display: .milo-container white circle div (background white, border-radius 50%, padding 1.5rem)
Poses complete: milo_idle.gif only. Full pose spec not yet built.
Ruled out: Viggle, Lottie, green screen pipeline.

## Charitable Model (locked)
80% net surplus → NS SPCA Colchester (10%), ElderDog Canada (15%), Room to Read Canada (25%), UNHCR Canada (25%). 20% → developer.
Activates when: stable on Play Store + 1,000 MAU for 60 days + first revenue distribution made.

## Tool Assignment
- Claude Code — free, single/multi-file edits, CSS fixes, bug fixes, content tasks
- Cursor Composer — free, Wrapper Pattern wiring, bounded multi-file changes
- Google AI Studio — free, large codebase diagnosis (2M context)
- Emergent — paid, architectural builds only, always needs State Ledger spec first
- Google Flow — Milo animation generation

---

## Roadmap — Moving Forward
Written: 2026-06-07. Based on 32 days of development to current state.

### Timeline

**Mid-July 2026 — Beta Ready**
- App 95%+ complete
- All 7 Emergent sessions complete (badges, notifications, bones/freeze, YouTube, Milo awareness, Fetch standalone, Break Free)
- All known bugs fixed
- Paths loop stable and tested
- All Milo poses generated
- Play Store internal testing track live
- Privacy Policy + Terms of Service published on milo-speaks.com

**July 15 – September 15 2026 — Active Beta (2 months)**
- Beta recruitment post on r/MiloSpeaksSpanish
- Closed testing track on Google Play
- Systematic feedback collection
- Bug fixes via Claude Code (expect 2-3 sessions per week)
- UX polish based on real user behaviour
- PostHog data drives feature priority
- Sentry drives bug priority
- MAU building toward 1,000 threshold

**September 15 2026 — Production Launch**
- Open testing → Production on Google Play
- Reddit launch posts: r/learnspanish, r/languagelearning, r/dogs, r/languagelearning
- Ko-fi push to all four charities
- milo-speaks.com updated with Play Store badge
- First charitable distribution made if MAU threshold met
- Milo Monday campaign if community has momentum

**October 2026 — Clone Started**
- Spanish app stable, running without constant attention
- Monorepo prep P1-P3 complete
- English for Spanish speakers (en-es) clone begins
- Same chassis, content swap, new charity alignment

### Month-by-Month Plan

**June 2026 (this month — remaining weeks)**
- Audio diagnosis: "hay" and "el" TTS issues
- Square image cropping fix
- Test full Paths loop end to end, document all bugs
- Fix bones display, ChoiceDrill sounds, mastery filter buttons
- Generate all priority Milo poses in Google Flow (1-2 days, 50 tokens/day)
- Fix Community Word Packs bugs
- Fix word detail card tap position
- Fix Sentence Builder distractors
- Contextual Binding post-answer step
- Write all 7 Emergent State Ledger specs

**July 2026 (Emergent month)**
- Week 1: Run Emergent Sessions A-C (badges, notifications, bones/freeze)
- Week 2: Run Emergent Sessions D-F (YouTube, Milo awareness, Fetch standalone)
- Week 3: Run Emergent Session G (Break Free / ¡Libre!)
- Week 3: Firebase emulator full journey test
- Week 3: Store assets created (icon, feature graphic, screenshots)
- Week 4: Privacy Policy + T&S written and published
- Week 4: Google Play developer account created ($25)
- Week 4: Internal testing submission
- Week 4: Beta recruitment post drafted

**August–September 2026 (Beta)**
- Active beta testing with real users
- Weekly bug fix sessions
- UX iteration based on feedback
- MAU growth toward 1,000
- Prepare production launch assets

**September–October 2026 (Launch + Clone)**
- Production launch
- Charitable giving model activated
- Clone architecture begins

### Milo Pose Priority (generate in Flow this month)
All with white background, purple collar, gold MILO tag, semi-realistic cartoon style:
1. `milo_straining.gif` — pulling at chain, urgency (Break Free)
2. `milo_free.gif` — running free, joyful (Break Free chain-snap)
3. `milo_celebrating.gif` — celebration, path/stop completion
4. `milo_wrong_tilt.gif` — head tilt, uncertain (wrong answer beat 1)
5. `milo_encouraging.gif` — warm supportive look (wrong answer beat 2)
6. `milo_thinking.gif` — contemplative, studying (drill loading states)
7. `milo_excited.gif` — ears up, tail wagging fast (streak milestone)

### Next Emergent Session — 7 Sessions, ~100 tokens
See NEXT_EMERGENT_SESSION_LEDGER.md for full briefs.
Session order: A (badges) → B (notifications) → C (bones/freeze) → D (YouTube) → E (Milo awareness) → F (Fetch standalone) → G (Break Free)
Do not reorder. Do not start without State Ledger spec written first.

### Definition of Done — Beta Ready
- [ ] All 7 Emergent sessions complete
- [ ] All known bugs fixed
- [ ] Paths loop tested stable for 2+ weeks
- [ ] All 7 Milo poses generated and in app
- [ ] Break Free mechanic live
- [ ] Milo AI vocabulary-aware
- [ ] Fetch standalone mode live
- [ ] Firebase emulator testing complete
- [ ] Privacy Policy + T&S published
- [ ] Play Store internal testing live
- [ ] No console.log in production code
- [ ] Sentry capturing errors
- [ ] PostHog capturing events

### Definition of Done — Production Ready
- [ ] Beta complete (minimum 4 weeks, minimum 50 testers)
- [ ] All beta bugs fixed
- [ ] 500+ MAU during beta
- [ ] Charitable giving model ready to activate
- [ ] Ko-fi page live and linked
- [ ] YouTube channel set up
- [ ] Reddit community active
- [ ] milo-speaks.com Play Store badge added
- [ ] Launch posts written and scheduled

### Definition of Done — Clone Ready
- [ ] Spanish app stable 30+ days post-production
- [ ] 1,000+ MAU
- [ ] First charitable distribution made
- [ ] Monorepo prep P1-P3 complete
- [ ] No open critical bugs
- [ ] All Emergent sessions complete
- [ ] Team or process in place for ongoing maintenance

### Context
Built in 32 days by a solo developer using AI tools. Production-quality language learning app with FSRS spaced repetition, Gemini AI tutor, Firebase, and a complete Paths learning loop. Named in memory of Milo — a very good boy who saw only goodness in everyone he met. 80% of net surplus goes to NS SPCA, ElderDog Canada, Room to Read Canada, and UNHCR Canada.