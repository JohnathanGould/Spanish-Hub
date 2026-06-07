# CURRENT_STATE_LEDGER.md
*Milo Speaks Spanish — compressed project memory. Update after every milestone.*
*Last updated: 2026-06-04 (session 5)*

---

## CURRENT STAGE
**2.5 → 3** — Stabilization + wiring disconnected v0 components
Do not advance to Stage 4 until all known bugs are resolved and v0 components are wired.

---

## LIVE APP
- URL: spanish-hub-zeta.vercel.app
- Repo: github.com/JohnathanGould/Spanish-Hub
- Stack: React + Tailwind + CRACO / Firebase Auth + Firestore / Gemini 2.5 Flash / Vercel
- Firebase project: my-spanish-hub — northamerica-northeast1 (Montreal)

---

## AUTHORITATIVE LOCKFILE
- **frontend/yarn.lock** — single authoritative lockfile as of 2026-06-03
- Root package-lock.json deleted from repo
- Do not create a root-level lockfile again

---

## SECURITY (last updated 2026-06-03)
- Aikido security scan: configured, PR creation enabled
- CVEs patched: uuid 9.0.1→11.1.1, dompurify 3.4.3→3.4.7, webpack-dev-server 4.15.2→5.2.1
- 3 fix PRs merged
- Aikido showing 6 "PR Open" badges — sync delay, not an action item
- **Flagged for future cleanup:** firebase-admin, node-fetch, next-themes in frontend/package.json belong server-side or not at all

---

## ARCHITECTURE RULES (immutable)
- SpanishHub.jsx = single source of truth. All global state lives here.
- Children never query Firestore directly — Parent Fan-Out only.
- v0 components (src/components/v0/) never edited directly — Wrapper Pattern always.
- Tab ID rename (sofia → milo) — ✅ DONE
- Log tab — ✅ REMOVED
- Never modify without a dedicated session: Firebase Auth logic, api/chat.js, Firestore security rules.
- TAB_ORDER constant lives at module level in SpanishHub.jsx (above component function)

---

## KEY FILES
```
SpanishHub.jsx               ← main shell, all global state
api/chat.js                  ← Gemini serverless function (never modify casually)
api/translate-deepl.js       ← DeepL serverless function
data/words.js                ← 302 words, MASTER array (future: src/content/es-en/words.js)
data/paths.js                ← COMPLETE — 12 Paths × 5 Stops × 5 words (commit f0f307b)
data/drillData.js            ← drills, conjugation, FITB pool
src/components/Header.jsx    ← three-row layout, milo-icon.jpg, dark mode, LIVE
src/components/HomeTab.jsx   ← dark mode hero card, live
src/components/v0/           ← generated components, never edit directly
src/index.css                ← dark mode forced permanently — no prefers-color-scheme
frontend/.gitignore          ← canonical gitignore location
```

---

## FIRESTORE SCHEMA (verified)
```
users/{uid}:
  displayName, photoURL, customWords[]
  progress{ es: { c, w, s } }        ← key changes to "es-en" in Monorepo Prep Stage P4
  xp, weeklyXP, streak, dailyGoal
  bones, treats, stars
  earnedBadges[]
  completedStops[], completedPaths[]
  lessonsCompleted[]
  sessions[]        ← drill history, last 50, { drillId, correct, total, date, ts }
  activeDays[]      ← ISO date strings (YYYY-MM-DD), date-deduped, set on drill complete
  friends[]
  reminderEnabled
  audioListenEnabled, audioSpeakEnabled

leaderboard/{uid}: displayName, photoURL, xp, weeklyXP
chatUsage/{uid}: count, date  (rate limit: 30/day)
plaza/{postId}: uid, displayName, text, timestamp, likes
```

---

## NAVIGATION
**Tab IDs:** home · learn · words · study · friends · leaderboard · milo

**Swipe gesture (live as of 2026-06-04):**
- Left = advance, Right = retreat
- Order: home → learn → words → study (no wrap)
- friends and milo: tap only, never entered via swipe
- Disabled when view.page !== 'home' (drill or sub-page active)
- TAB_ORDER = ['home', 'learn', 'words', 'study'] at module level in SpanishHub.jsx

**Header tap targets:**
- Milo icon (left) → home tab
- 🔥 Streak flame → StreakModal
- ⭐ XP star → leaderboard tab
- Avatar (right) → ProfileSheet

---

## KNOWN BUGS (fix before adding features, in priority order)
1. index.css — syntax error: Unexpected token (highest risk)
2. Community modal on Words page — opens at bottom of page instead of at tap position. Should open anchored to the point where the Community button was tapped, not scroll to bottom of word list.
3. Gender drill — word pool bug
4. Mastery count mismatch — profile shows different count than Words page
5. Community Word Packs import broken — words don't add to list
6. Community Word Packs word entry form — Spanish + English fields need to be side by side
7. Word of the Day re-seeds mid-session — wotd hash uses filtered unmastered pool; changes when words are mastered. Fix: seed against full MASTER array using date string only. Change only once per day at midnight with streak rollover.

---

## VERCEL ENVIRONMENT VARIABLES
✅ All confirmed set (Production + Preview) — 2026-06-03
GEMINI_API_KEY · DEEPL_KEY · FIREBASE_PROJECT_ID · FIREBASE_CLIENT_EMAIL · FIREBASE_PRIVATE_KEY · REACT_APP_POSTHOG_KEY · REACT_APP_SENTRY_DSN · OPENAI_API_KEY

---

## DISCORD INTEGRATIONS STATUS
- ✅ Linear → Discord #linear — LIVE
- ✅ Sentry → Discord #errors — LIVE
- ⬜ UptimeRobot → Discord #ops-log — UptimeRobot account needed
- ⬜ PostHog → Discord #analytics — wire after 500+ MAU
- ⬜ Firebase quota → Discord #firebase — wire before Play Store launch
- ⬜ Ko-fi → Discord #revenue — wire when Ko-fi is live
- ⬜ Vercel → Discord #deploys — blocked on Vercel paid plan

**Make:** us2.make.com — one active scenario: Linear → Discord #linear.

---

## PATHS ARCHITECTURE (locked)
- Learn tab stays as-is for v2
- Paths built as a new tab alongside Learn in v3
- Learn tab retired after Paths is validated
- Tab rename (Learn → Paths) happens last — not before Paths is complete
- Paths flow: Path list → Path overview → [Watch Lesson button] → Stop list → Stop drills
- One lesson video per Path (not per Stop) for v2
- contextSentence batch generation BLOCKS sentence flashcards — do before Emergent

---

## MONOREPO READINESS — Pre-Stages (Do Before Paths)
Decision locked: Full Turborepo monorepo — but not yet. Spanish must reach Stage 5 first.

Six target language pairs:
- es-en (current) — Spanish for English speakers
- en-es — English for Spanish speakers (first clone)
- en-fr, en-de, en-it, en-pt — content swap, no new engineering

Final monorepo shape (future):
```
milo-platform/
  packages/engine/       ← shared drill logic
  content/
    es-en/               ← current Spanish content
    en-es/, en-fr/, en-de/, en-it/, en-pt/
  apps/
    milo-es-en/          ← thin shell: config + content + branding
    milo-en-es/, ...
```

**Four preparatory stages — in sequence, after bug fixes, BEFORE Paths:**

**P1 — Audit (AI Studio, free)**
Paste full codebase into Google AI Studio. List every hardcoded language reference.
Save as MONOREPO_AUDIT.md. No changes — diagnosis only.

**P2 — Language Config Object (Windsurf)**
Create src/config/languageConfig.js:
```javascript
export const languageConfig = {
  appId: "milo-es-en",
  sourceLanguage: "es",
  targetLanguage: "en",
  uiLocale: "en",
  displayName: "Milo Speaks Spanish",
  drillDirectionLabel: "SP→EN",
  deeplSourceCode: "ES",
  deeplTargetCode: "EN-US",
  firestoreProgressKey: "es-en",
}
```
Replace every hardcoded value from audit with config references. No logic changes.

**P3 — Content File Relocation (Windsurf)**
Move words.js, paths.js, drillData.js → src/content/es-en/
Update all import paths. No content changes.

**P4 — Firestore Progress Key Migration**
P4 is deferred — progress is already flat and word-keyed. No migration needed until a second language is actively being built. Do not run P4 until monorepo structure exists and emulator testing is complete.

Tagalog note: Deferred until post-Stage 5. Difficulty ~4/10 vs Spanish 10/10.
Structurally different from Romance languages — may need 1-2 new drill types.

---

## NEXT ACTIONS (in order)
1. Fix Word of the Day bug — seed against full MASTER array, date string only
2. Fix index.css syntax error — Cursor Composer
3. Wire v0 components — Cursor Composer, Wrapper Pattern, in order above
4. Run Monorepo Prep P1 — AI Studio audit before touching anything else
5. Monorepo Prep P2, P3, P4 — in sequence
6. Batch-generate contextSentence — Claude Projects (BLOCKS sentence flashcards)
7. Emergent sessions — only after all above complete + State Ledger spec written first
8. Content audit — review contextSentence values against Stop-sequenced vocabulary. Sentences used in Fill in the Blank drills are highest priority. Flag any sentence that uses vocabulary not yet introduced at that Stop. Stage 4 task, after Paths is built.
9. Build milo-speaks.com landing page — static Vercel deployment, separate repo. One card per language app, Milo photo, Ko-fi link, "more languages coming soon". Point milo-speaks.com domain at Vercel when live. Build after Paths is stable.
10. Add Firebase Auth providers — Facebook, Apple, Email/password. Dedicated session only. Emulator required. Do after Emergent session and any resulting bug fixes are resolved.

---

## OPEN DECISIONS
All Stage 1 decisions locked 2026-06-04. No open decisions remaining.

| # | Decision | Outcome |
|---|---|---|
| 1.1 | FSRS spaced repetition | Adopt now — wire during P4 alongside progress key migration. Adds stability, difficulty, due, lastReview per word entry in Firestore. |
| 1.2 | Output drills 2× XP | type-it, listen-type, fill-blank, sentence-builder, conjugation, gender all award 2× XP |
| 1.3 | contextSentence generation | Claude batch-generates via Google AI Studio — one simple A1-A2 sentence per word |
| 1.4 | 5 new words/day cap | Soft nudge only after 5 new words in a session. Never a hard block. |
| 1.5 | Stop completion gate | Soft nudge if no output drill attempted — "You haven't practiced these words yet — want to give Type It a go before moving on? 🐾" Never blocks. |
| 1.6 | Contextual Binding | Output drills only — contextSentence shown 2–3 seconds after correct answer before advancing |
| 1.7 | Fetch word selection | Output-weak words only until Path 2 complete, then blended 80/20 with due words |
| 1.8 | Mastery tier thresholds | New = no attempts / Learning = 0–3 days stability / Strong = 4–21 days / Mastered = 22+ days AND outputCorrect: true |
| 1.9 | Output-weak tracking | FSRS + outputCorrect boolean per word. Mastery requires stability ≥ 22 days AND outputCorrect: true. A word cannot reach Mastered on recognition alone. |
| 1.10 | FSRS rating input | Togglable Smart Scheduling, default off. Off = correct/wrong maps to Good/Again silently. On = Hard/Good/Easy continue buttons after every correct answer with message: "Tap how that felt — Milo uses it to know if you want more help learning this word 🐾". Wrong always auto-rates Again and auto-advances regardless of toggle. |

---

## BLOCKED FEATURES (prerequisites not met)
- Sentence flashcards — BLOCKED on contextSentence populated
- Break Free / ¡Libre! — BLOCKED on Milo poses generated
- Paths progression — UNBLOCKED. paths.js complete, State Ledger spec written. Emergent session next.
- Bones & streak freeze — BLOCKED on Paths built first

---

## QUEUED TASKS & DECISIONS

### Tomorrow's session order
1. ✅ Claude Code: Replace milo-icon.jpg in Header.jsx with `/animations/milo_idle.gif` (48px circular styling)
2. ✅ Claude Code: Replace Milo avatar in HomeTab.jsx with `/animations/milo_idle.gif`
3. ✅ Claude Code: Add yellow pill link to milo-speaks.com in ProfileSheet.jsx header. Style: background #F5C518, color #3D2B1F, font-weight 700, border-radius 50px, padding 0.3rem 1rem, font-size 0.85rem, centered above user name, opens in new tab
4. Windsurf: Change 'No ads' text near Ko-fi button to 'No interrupting ads'
5. Windsurf: Lower confetti music volume
6. Windsurf: Set default drill count to 10
7. Cursor Composer: Remove language toggles and 10/20/30 toggles from drill buttons. Replace with 2 pills (EN>SP | SP>EN) for the 3 drills that have direction split. Other 3 drills full width. Drill starts when pill is tapped from practice page.
8. Cursor Composer: Split review drills — Words and Sentences on separate lines, each with 2 direction pills
9. Cursor Composer: Make streak reminder stand out more visually
10. Flow: Regenerate milo_idle.gif with white background, senior dog style matching milo-banner.png

### Emergent tasks (do not build before Emergent)
- Paths in BottomNav replacing Learning tab
- Path Certificates
- Continue button → Paths progress indicator showing where user is on Paths
- Friend added notification
- Admin alert notification (community pack submissions + future admin functions)
- Clicking friend in friends list opens that friend's profile card
- More badges

### Needs RFC before anyone touches it
- Review drills split (Words/Sentences separate lines with direction pills) — UX redesign, spec first

### Deferred — revisit at 1,000 MAU
- Bones button → in-app purchases. Bones are earned never purchased per non-negotiables. Reframe bones button as How To Earn Bones explainer screen for now. Full purchase RFC needed before any payment infrastructure is built. Touches RevenueCat/Stripe/Google Play Billing, Firestore security rules, server-side verification, legal T&S.

### Haptics
Research whether haptics are supported in React PWA before building. If yes, Cursor Composer task for correct answer feedback.

---

## MILO ANIMATION PIPELINE

**Pipeline:** All Milo animations generated in Google Flow. Two steps:
1. Generate pose PNG with white background.
2. Animate PNG to GIF in Flow with white background. No post-processing, no transparency needed.

**File storage:**
- Spanish-Hub repo: `frontend/public/animations/`
- milo-speaks repo: `animations/`

**Naming convention:** `milo_[pose].gif`

**Character canon:** Black lab, purple collar, gold MILO bone tag, no bandana, tie only for special event poses. Senior dog feel — greying muzzle, warm brown eyes.

**Display pattern:** All Milo GIFs wrapped in `.milo-container` white circle div. CSS: `background: white; border-radius: 50%; padding: 1.5rem; box-shadow: 0 4px 24px rgba(0,0,0,0.3)`. Works on any background colour.

**Poses complete:**
- `milo_idle.gif` — sitting, tail wagging, subtle breathing. Live on milo-speaks.com/#about.

**Poses pending:**
- `milo_wrong_tilt.gif`, `milo_encouraging.gif` — two-beat wrong answer sequence.
- All other poses — full pose spec not yet built.

**Ruled out:**
- Viggle ❌ — broken quadruped motion
- Lottie ❌ — wrong format for rendered character style
- Google Flow video → Lottie conversion ❌ — wrong format

**Repos:** Landing page lives in `JohnathanGould/milo-speaks` repo, NOT in Spanish-Hub.
⚠️ `frontend/public/index.html` in Spanish-Hub is the React app entry point — never edit it for landing page purposes.

**Banner:** Needs regenerating in Flow — current banner Milo looks too young and cartoony vs the animated GIF style. Match `milo_default.jpg` style.

**First task next session:** Regenerate `milo_idle.gif` with correct senior dog style matching banner. Then build full pose spec and batch all Flow prompts.

---

## TOOL ASSIGNMENT RULES
- Claude Code CLI — free (Claude Pro), single and multi-file edits, config files, content relocation, component wiring, bug fixes
- Cursor Composer — free, Wrapper Pattern wiring, bug fixes, multi-file bounded changes
- Claude Projects — free, content generation (contextSentence batch), State Ledger specs
- Google AI Studio — free, large codebase diagnosis (2M context), use before Emergent
- Emergent — paid, Stage 5 only, never for diagnosis, always needs State Ledger spec first

---

## CHARITABLE MODEL (locked)
80% net surplus → NS SPCA Colchester (10%), ElderDog Canada (15%), Room to Read Canada (25%), UNHCR Canada (25%). 20% → developer. Activates when: stable on Play Store + 1,000 MAU for 60 days + first revenue distribution made.

---

## SESSION CLOSE — 2026-06-04 (session 5)

**Completed:**
- Header.jsx fully redesigned — three-row layout (title / stats / tagline), milo-icon.jpg replacing SpanishFlag, avatar bumped to 48px, live on Vercel
- Dark mode forced permanently in index.css — prefers-color-scheme removed, unconditional dark rules for app-container and app-header
- HomeTab hero card — dark gold gradient (#7a6000 → #a07c00 landed), gold text, F5C518 border on Milo image
- Swipe navigation added to SpanishHub.jsx — TAB_ORDER at module level, useEffect with touchstart/touchend, threshold 50px, vertical scroll guard, no wrap, disabled during drills
- TAB_ORDER ESLint fix — moved to module level to resolve react-hooks/exhaustive-deps build failure
- Monorepo architecture decision locked — full Turborepo, four prep stages before Paths
- Master reference update prompted — MILO-MASTER-REFERENCE.md Claude Code prompt written
- Paths architecture locked — Learn stays for v2, Paths in v3 alongside, Learn retired after

**Bugs added:**
- Word of the Day re-seeds mid-session (bug #11 above)

**Decisions made:**
- Swipe does not include Friends or Milo tabs
- Swipe does not wrap at either end
- Paths tab replaces Learn tab eventually — not yet, Learn stays for v2
- One lesson video per Path, not per Stop, for v2
- Monorepo prep (P1–P4) runs before Paths, after bug fixes

**First task next session:**
Fix Word of the Day bug — seed wotd against full MASTER array using date string only

---

## SESSION CLOSE — 2026-06-04 (session 6)

**Completed:**
- Stage 0 fully complete — Firebase emulator running from repo root, warnings resolved, firestore.rules + firestore.indexes.json created, firebase.json updated
- Firebase CLI updated 15.19.0 → 15.19.1
- Stage 1 fully complete — all 10 architecture decisions locked (see OPEN DECISIONS section)
- 2.1 — index.css syntax error fixed (lines 254, 307 — hsl slash-alpha syntax)
- 2.2 — Word of the Day reseeding fixed — full MASTER array, date string only
- 2.3 — Translator tab closed — feature lives inside MiloChat as toggle, no component to fix
- 2.4 — Type It drill — confirmed already fixed, closed
- 2.5 — Listen & Type — confirmed already fixed, closed
- 2.6 — Gender drill — confirmed already fixed, closed
- 2.7 — Sentence Builder distractors — confirmed working, closed
- 2.8 — Community modal tap position — fixed, anchors near tap using getBoundingClientRect
- 2.9 — Mastery count mismatch — fixed, single source of truth in SpanishHub, activeWords intersection, 332 across all three displays
- Milo chat safety system prompt — 8 safety blocks added (identity lock, topic restriction, family-safe language, explicit content, personal info, external contact, distress recognition, manipulation resistance)
- Milo correction language — corrections now in English except quoted Spanish
- MiloChat input padding — 24px → 96px, clears BottomNav
- Leaderboard — friends-only default with 🌍 Global toggle, dead FriendsList import removed
- Windsurf removed from dev stack — Claude Code CLI handles all those tasks
- Claude Code terminal set up alongside normal terminal in VS Code split screen
- TAB_ORDER ESLint fix pushed — module level constant

**Bugs closed this session:**
- 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9 — 9 bugs resolved

**Bugs remaining:**
- 2.10 — Community Word Packs import broken
- 2.11 — Community Word Packs entry form layout

**Decisions made:**
- All Stage 1 decisions locked — FSRS adopt now, 2× XP output drills, Claude batch-generates contextSentence, soft nudge for 5-word cap and Stop gate, Contextual Binding output drills only, Fetch blended 80/20 from Path 2, mastery thresholds 0-3/4-21/22+ days, outputCorrect boolean required for Mastered, Smart Scheduling togglable default off
- Leaderboard is friends-only by default, global toggle available
- Friends exchanged in real life only — no in-app sharing mechanism needed
- Mastery count canonical source = activeWords intersection in SpanishHub

**First task next session:**
2.10 — Community Word Packs import broken — reproduce and fix

---

## SESSION CLOSE — 2026-06-05 (Session 7)

**Completed:**
- Bug 2.10 closed — import now saves correctly as a pack unit in importedPacks[]
- Bug 2.11 closed — publish form rebuilt as ES/EN pair input, 15 word limit
- Community Word Packs fully rebuilt — Option B architecture (packs as units not flat merge)
- Admin Panel built — separate /admin route, UID-gated, approve/reject with Pack Pioneer badge auto-award
- Firestore composite index created — (status ASC, createdAt DESC) on sharedPacks
- React Router wired in App.js for the first time
- Pack Pioneer 🎒 badge wired to approval action

**Bugs added:** None

**Decisions made:**
- Community packs store as units in importedPacks[] not flat merge into customWords[]
- 15 word limit per pack
- Admin approval required before packs appear in Browse
- Admin screen is a separate /admin route, not embedded in ProfileSheet
- Auto-moderation deferred until high user volume
- Pack Pioneer badge awarded automatically on admin approval
- Pack-scoped drill mode logged in Linear as v2+ backlog

**Tools assessed:** Claude Code handled everything Cursor would have — no capability gap

**First task next session:**
Paths & Stops progression logic — this is the big Stage 5 Emergent task. Write the State Ledger spec in Claude first before opening Emergent.

---

## SESSION END — 2026-06-05

**Completed:**
- State Ledger spec written: PATHS_STOPS_STATE_LEDGER_SPEC.md — complete Emergent brief for Paths & Stops progression
- paths.js created and committed: frontend/src/data/paths.js — 12 Paths × 5 Stops × 5 words, all 300 words assigned, videoUrl: null feature flag on every Stop, 5 helper functions exported (commit f0f307b)
- All Emergent prerequisites confirmed complete: completedStops[] and completedPaths[] already in DEFAULT_DATA, paths.js now exists, git checkpoint ready
- Windsurf removed from stack — replaced by Claude Code CLI and Claude Terminal everywhere

**Decisions locked:**
- Fetch scoring: % correct, 70% to pass, 90% strict mode (future toggle)
- Fetch drill count: adaptive — early exit once 70% hit, min 10 questions, max 20
- Fetch word pool: Stop's own words as answer targets only; prior words allowed as sentence distractors
- FSRS: not in v2 — simple confidence scoring only
- Learn tab: optional, no gate on Fetch
- YouTube video: feature flag — videoUrl: null until video exists, button activates automatically, never gates Fetch
- Path completion triggers: badge + bones + Break Free unlock message
- Stop/Path sequencing: linear lock
- Full system scope confirmed: 80 Paths, 20 sub-levels, 2,000 words (A1→C2) — engine built tomorrow serves all 80 without modification

**Bugs added:** None this session

**Tools assessed:** Windsurf removed from stack. Claude Code CLI handles all single and multi-file tasks. Claude Terminal handles git operations.

**First task next session:**
Open Emergent. Paste PATHS_STOPS_STATE_LEDGER_SPEC.md as your first message. The spec is complete, paths.js exists, prerequisites are done. Emergent executes — it does not plan.

---

## SESSION END — 2026-06-05 (Session 8)

**Completed:**
- paths.js fully rebuilt — SUBTLEX-ESP validated, 300 words, 12 Paths, 60 Stops, zero duplicates (commit 442f2e4)
- words.js — added me, se, su (top-30 frequency pronouns, were missing)
- evaluateBadges.js — fixed stopId format (path_1_stop_1 → p1s1), pathBadges map expanded to path1–path12
- DEFAULT_DATA — added stopProgress: {} and fetchHistory: { totalSessions: 0, totalCorrect: 0, totalQuestions: 0 }
- badges.js — added path_6 through path_12
- memory/PATHS_STOPS_STATE_LEDGER_SPEC.md — complete Emergent brief, 817 lines, four audit passes
- memory/PRE_EMERGENT_AUDIT_PROMPT.md — reusable audit template for all future Emergent sessions
- Windsurf removed from stack everywhere — Claude Code CLI and Claude Terminal only
- Stale ledger entries cleaned

**Decisions locked:**
- Fetch: 70% pass, adaptive 10–20 questions, 6 drill types, custom FetchSession
- Pool generators for FillBlank/SentenceBuilder/Conjugation — correctly formatted from contextSentence
- FSRS: not in v2
- Tab rename: 'learn' → 'paths', both TAB_ORDER and BottomNav
- Lessons: StopCard access only, components preserved
- Session drillId for Fetch: 'fetch'
- Full system: 80 Paths, 2,000 words, A1→C2 — engine built once, serves all

**Bugs added:** None

**Tools assessed:** Windsurf removed. Claude Code CLI handles everything it did.

**First task next session:**
Open Emergent (tokens renew day after tomorrow). Paste memory/PATHS_STOPS_STATE_LEDGER_SPEC.md as first message.

---

## SESSION END — 2026-06-05 (Session 9)

**Completed:**
- P1 ✅ — MONOREPO_AUDIT.md committed — 66 hardcoded language references across 14 files, all LOW-MEDIUM effort
- P2 ✅ — languageConfig.js created at src/config/languageConfig.js, all 66 references migrated across 15 files
- P3 ✅ — content files moved to src/content/es-en/ (words.js, lessons.js, drillData.js, paths.js), all import paths updated, build verified clean
- memory/PATHS_STOPS_STATE_LEDGER_SPEC.md committed — 817 lines, four audit passes, ready for Emergent
- memory/PRE_EMERGENT_AUDIT_PROMPT.md committed — reusable template for all future Emergent sessions

**Decisions locked:**
- P4 (Firestore progress key migration) — dedicated session only, emulator required, never rushed
- Original files in src/data/ — kept intact pending app verification before removal

**Bugs added:** None

**Tools assessed:** Nothing new

**First task next session:**
Open Emergent (tokens renew tomorrow). Paste memory/PATHS_STOPS_STATE_LEDGER_SPEC.md as first message. Prerequisites all confirmed complete.

---

## SESSION END — 2026-06-06 (Session 10)

**Completed:**
- PathsView v0 component built and committed — three layer navigation (overview → path focus → stop detail), time of day auto-detected from device, no toggle buttons
- Stop detail design finalised — Learn/Watch tabs, 5 word cards with expandable image, green Fetch button, YouTube coming soon state
- Word card detail design finalised — type badge, image top right, meaning, example sentence with audio, mini tip, progress stats
- ¡Prueba! review node added as 6th node on every Path — dashed connector, red when active, trophy when complete
- paths.js needs updating — add 6th review stop per Path with type:'review' flag (Claude Code task before Emergent)

**Decisions locked:**
- No Learn tab — Stop IS the lesson, word cards replace lesson content
- Watch/Listen is a proper tab alongside Learn — YouTube embed when videoUrl exists, coming soon state otherwise
- Fetch button is green (#2D9E5F) — green for go
- Time of day theming is silent — no UI, auto-detected from device clock
- ¡Prueba! node — 6th stop per Path, type:'review', pulls all 25 Path words, 70% to pass

**First task next session:**
Update paths.js — add 6th review stop per Path with type:'review' and id format 'p1r' through 'p12r'
Then open Emergent — paste memory/PATHS_STOPS_STATE_LEDGER_SPEC.md as first message

---

## SESSION END — 2026-06-06 (Session 11)

**Completed:**
- Full animation pipeline proven end to end
- Milo live on milo-speaks.com/#about, tail wagging
- GIF file location confirmed: frontend/public/animations/milo_idle.gif
- Background colour strategy confirmed: bake target screen colour into Flow prompt, no post-processing
- Bandana lore fixed in index.html
- vercel.json routing updated with filesystem handler

**Decisions locked:**
- Animation format: GIF with baked background colour matched to target screen
- No transparency pipeline needed
- Idle animation background needs regenerating with #3D2B1F tomorrow

**Tools assessed:**
- Google Flow ✅ — confirmed pipeline tool for all Milo animation
- Viggle ❌ — ruled out, broken quadruped motion
- Lottie ❌ — ruled out, wrong format for rendered character
- Unscreen.com ❌ — not needed, baked background approach eliminates green screen step

**Bugs added:** None

**First task next session:**
Regenerate milo_idle.gif with #3D2B1F background in Flow → push → white box gone → then build full pose spec

---

## SESSION END — 2026-06-07 (Session 12)

**Completed:**
- Drill separation complete — all drills now directional with pill UI, Warm Up / Practice / Review tab sections restored, 10/20/30 length toggles removed, drillLength fixed at 10 everywhere
- New drill modes added: hear-choose-en-es, listen-type-en-es, listen-type-sentence-en-es — wired in ChoiceDrill, TypeDrill, and DrillRouter
- listen-type-sentence silent bug fixed — was routed by DrillRouter but missing from TypeDrill titles causing silent null return
- FlashcardDrill initialDirection prop added — useState now uses initialDirection || languageConfig.drillDirectionId
- ChoiceDrill and TypeDrill updated to support EN→SP audio modes — correct TTS language used per mode in prompt auto-play, feedback reveal, and replay buttons
- DrillsGrid progress={{}} fix — inline flashcards use shuffle order only; spaced-rep ordering deferred until userData.progress is passed from SpanishHub (notes in memory ledger)
- Three pre-Emergent audits complete — 33 audit points across all areas, all flags resolved or documented
- EMERGENT-SESSION-1-PATHS-SHELL.md ready at repo root — Emergent tokens reset in 3 hours, Session 1 ready to run

**Decisions locked:**
- DrillsGrid inline FlashcardDrill uses progress={{}} — shuffle order only until userData.progress plumbed through SpanishHub
- DrillsGrid tab default: Practice

**Bugs added:** None

**First task next session:**
Open Emergent — paste EMERGENT-SESSION-1-PATHS-SHELL.md as first message. Session 1: PathsTab shell, BottomNav swap, SpanishHub wiring.
