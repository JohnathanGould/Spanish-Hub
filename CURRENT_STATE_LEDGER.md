# Current State Ledger — Milo Speaks Spanish
# Last updated: 2026-06-14

## Session Notes — 2026-06-14

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

"Path"/"Tier"/"Stage" terminology stays internal/code-only; user-facing screens never say these words — but "Stop" DOES appear in StopView UI ("STOP 2 OF 5"), which needs auditing against this principle
Locked Stage/Tier pills remain fully tappable (no new gating) — color is informational only; only Stops remain hard-gated
Color system: green = current/in-progress, cyan = complete, grey = locked, consistent across Stage/Tier/Path/Stop — vivid/white-text treatment (not pastel), established as the standard going forward
drill-card confirmed used only in the Stops view — safe to modify without side effects elsewhere

Tools assessed:

None new this session (Cursor remains on hold per token budget; Claude Code handled all work)

First task next session:

"Stop"/"Path" terminology audit — search for other user-facing instances of internal hierarchy vocabulary (starting from the confirmed "STOP X OF Y" in StopView header), decide whether to keep, rename, or remove

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

Tomorrow's tasks:

Paths page scrolling — the path list itself needs work
Add mastery tier grouping layer above Paths: Beginner I, Beginner II, Beginner III, Advanced Beginner I, etc. — each tier is a pill that expands to show its Paths
This is a data model + UI decision — needs RFC before code

Decisions to make:

How many tiers, what are they called, how many Paths per tier
Does tapping a tier expand inline or navigate to a new screen

First task next session:

Fix Paths list scrolling
Then RFC for mastery tier grouping

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

### Paths & Stops (built 2026-06-07 — 10 Emergent sessions)
Full dynamic learning loop complete:
- PathsTab: 12 Paths × 5 Stops, lock/unlock driven by completedStops[]
- StopView: word list with audio speaker buttons
- Phase 1: word introduction — image (word.imageUrl), Spanish word, auto-audio (speak(word.es)), English label, Next button. Only screen where English appears.
- Phase 2: Hear & Choose SP→EN + Multiple Choice SP→EN — warm up tier, no FSRS, no bones
- Phase 3: FSRS-driven dynamic drill selection via buildDrillQueue:
  - stability === 0 → Type It EN→SP
  - stability < 7 → Hear & Choose EN→SP
  - stability >= 7 → Multiple Choice SP→EN
- fetchStopWords: sorts Stop words by FSRS stability ascending (weakest first)
- FSRS: ts-fsrs@5.4.1, called after every Phase 3 answer, Rating.Good/Hard/Again
- Bones: +1 correct Phase 3, +2 Stop complete (Path complete bones TBD)
- Stop completion: writes stopId to completedStops[] via persistData, next Stop unlocks
- Path completion: writes pathId to completedPaths[] via persistData
- StopCompleteScreen: bones summary, path completion message, Certificate button
- Certificate: Certificate.jsx wired, shows on Path completion, accessible from Path list
- Continue button on Home: calls getCurrentStop() → first incomplete Stop → navigates directly

### Audio (updated 2026-06-07)
initAudio() called on app mount — preloads correctBuffer, almostBuffer, confettiBuffer.
Race condition fixed — buffers ready before first user interaction.
speak() defaults to languageConfig.sourceLanguage ("es"). Call speak(word.es) for Spanish TTS.

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
progress{ wordEs: { c, w, s, stability, difficulty, due, lastReview, outputCorrect } }
xp, weeklyXP, streak, dailyGoal, bones
earnedBadges[], completedStops[], completedPaths[], lessonsCompleted[]
sessions[], activeDays[], friends[], reminderEnabled
audioListenEnabled, audioSpeakEnabled

leaderboard/{uid}: displayName, photoURL, xp, weeklyXP
chatUsage/{uid}: count, date (rate limit: 30/day)

## Known Bugs (fix before adding features)
1. Scroll issue in PathsTab — WordIntroCard and dynamic-drill container require scrolling to see buttons. Claude Code CSS fix queued — next task.
2. ChoiceDrill has no correct/almost sound effects — playCorrect/playAlmost not imported or called.
3. Word mastery filter buttons in Words tab not wired.
4. Word detail card opens at screen center (should open at tap position).
5. Sentence Builder — distractors bug.
6. Community Word Packs import broken.
7. Community Word Packs entry form — ES/EN fields need side by side layout.
8. Pre-existing ESLint error SpanishHub.jsx line 242 (if isGuest / react-hooks/immutability) — do not touch.

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
1. Scroll fix in PathsTab — Claude Code CSS (free, no Emergent tokens) — NEXT
2. Bones display verification — confirm bones increment visibly in header
3. ChoiceDrill sound effects — wire playCorrect/playAlmost
4. Word mastery filter buttons — wire in Words tab
5. Test full Paths loop end to end — report bugs
6. Next month Emergent: Stop completion polish, Break Free mechanic, badges, friend notifications

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
- Scroll fix in PathsTab (Claude Code — this week)
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
