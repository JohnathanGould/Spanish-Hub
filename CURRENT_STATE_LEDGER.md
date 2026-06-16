# Current State Ledger — Milo Speaks Spanish
# Last updated: 2026-06-15

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

Warm Up (no XP, no bones): Matching, Word Sort, Gender el/la
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
1. Global SENT_POOL (drillData.js) contains out-of-vocabulary words (e.g. "al") — superseded by per-Path pools once Track B complete; do not patch directly.
2. contextSentence audit needed: Path 1-3 words have contextSentences using Path 4+ vocabulary (hablar, sabes, etc.).
3. sabes/sabe/sabemos/saben orphaned in words.js — not assigned to any Path/Stop. Full saber conjugation set needs Stop assignment.
4. Gender color coding (blue=masculine, pink=feminine) not yet implemented in UI.
5. Pre-existing ESLint error SpanishHub.jsx line 242 (if isGuest / react-hooks/immutability) — do not touch.

RESOLVED:
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