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
data/paths.js                ← COMPLETE — 5 Paths × 5 Stops
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
2. Translator tab — broken, exact error unknown (check DevTools console first)
3. Type It drill — word/answer mismatch
4. Listen & Type — wrong audio after correct answer
5. Word detail card — opens at screen center (should open at tap position)
6. Gender drill — word pool bug
7. Sentence Builder — distractors bug
8. Mastery count mismatch — profile shows different count than Words page
9. Community Word Packs import broken — words don't add to list
10. Community Word Packs word entry form — Spanish + English fields need to be side by side
11. Word of the Day re-seeds mid-session — wotd hash uses filtered unmastered pool; changes when words are mastered. Fix: seed against full MASTER array using date string only. Change only once per day at midnight with streak rollover.

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

## V0 COMPONENTS — NOT YET WIRED
Wire in this order using Cursor Composer + Wrapper Pattern:
1. BottomNav
2. HomeTab
3. ProfileSheet
4. BadgeGrid
5. LeaderboardNew

Note: MiloHeader is retired — Header.jsx handles the header directly.

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

**P4 — Firestore Progress Key Migration (Cursor Composer)**
Change progress.es → progress["es-en"] across app and Firestore.
Run migration against emulator first. Then production once verified.
Leave old key 30 days before cleanup.
**THIS MUST COMPLETE BEFORE PATHS IS BUILT.**

Tagalog note: Deferred until post-Stage 5. Difficulty ~4/10 vs Spanish 10/10.
Structurally different from Romance languages — may need 1-2 new drill types.

---

## NEXT ACTIONS (in order)
1. Fix Word of the Day bug — seed against full MASTER array, date string only
2. Fix index.css syntax error — Cursor Composer
3. Investigate Translator tab — DevTools console, note exact error
4. Wire v0 components — Cursor Composer, Wrapper Pattern, in order above
5. Run Monorepo Prep P1 — AI Studio audit before touching anything else
6. Monorepo Prep P2, P3, P4 — in sequence
7. Batch-generate contextSentence — Claude Projects (BLOCKS sentence flashcards)
8. Emergent sessions — only after all above complete + State Ledger spec written first

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
- Paths progression — BLOCKED on Monorepo Prep P4 + State Ledger spec
- Bones & streak freeze — BLOCKED on Paths built first

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
