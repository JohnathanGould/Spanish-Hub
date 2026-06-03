# CURRENT_STATE_LEDGER.md
*Milo Speaks Spanish — compressed project memory. Update after every milestone.*
*Last updated: 2026-06-03*

---

## CURRENT STAGE
**2.5 → 3** — Stabilization + wiring disconnected v0 components
Do not advance to Stage 4 until all 8 known bugs are resolved and v0 components are wired.

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
- 3 fix PRs merged (frontend/package-lock.json, frontend/yarn.lock, root package-lock.json)
- Aikido showing 6 "PR Open" badges — sync delay, not an action item
- **Flagged for future cleanup session:** firebase-admin, node-fetch, next-themes are in frontend/package.json but belong server-side or not at all

---

## ARCHITECTURE RULES (immutable)
- SpanishHub.jsx = single source of truth. All global state lives here.
- Children never query Firestore directly — Parent Fan-Out only.
- v0 components (src/components/v0/) never edited directly — Wrapper Pattern always.
- Tab ID rename (sofia → Milo) — ✅ DONE
- Log tab — ✅ REMOVED
- Never modify without a dedicated session: Firebase Auth logic, api/chat.js, Firestore security rules.

---

## KEY FILES
```
SpanishHub.jsx           ← main shell, all global state
api/chat.js              ← Gemini serverless function (never modify casually)
api/translate-deepl.js   ← DeepL serverless function
data/words.js            ← 302 words, MASTER array
data/paths.js            ← COMPLETE — 5 Paths × 5 Stops
data/drillData.js        ← drills, conjugation, FITB pool
src/components/v0/       ← generated components, never edit directly
frontend/.gitignore      ← canonical gitignore location
```

---

## FIRESTORE SCHEMA (verified)
```
users/{uid}:
  displayName, photoURL, customWords[]
  progress{ es: { c, w, s } }
  xp, weeklyXP, streak, dailyGoal
  bones, treats, stars
  earnedBadges[]
  completedStops[], completedPaths[]
  lessonsCompleted[]
  friends[]
  audioListenEnabled, audioSpeakEnabled

leaderboard/{uid}: displayName, photoURL, xp, weeklyXP
chatUsage/{uid}: count, date  (rate limit: 30/day)
plaza/{postId}: uid, displayName, text, timestamp, likes
```

---

## DEFAULT_DATA — MISSING FIELDS (add in next Windsurf session)
These fields are in the Firestore schema but not yet in DEFAULT_DATA:
- completedPaths: []
- completedStops: []
- audioListenEnabled: true
- audioSpeakEnabled: true

---

## V0 COMPONENTS — NOT YET WIRED
Wire in this order using Cursor Composer + Wrapper Pattern:
1. BottomNav
2. MiloHeader
3. HomeTab
4. ProfileSheet
5. BadgeGrid
6. LeaderboardNew

---

## KNOWN BUGS (fix before adding features, in priority order)
1. index.css — syntax error: Unexpected token (highest risk — can silently break layout)
2. Translator tab — broken, exact error unknown (check DevTools console first)
3. Type It drill — word/answer mismatch
4. Listen & Type — wrong audio after correct answer
5. Word detail card — opens at screen center (should open at tap position)
6. Gender drill — word pool bug
7. Sentence Builder — distractors bug
8. Word mastery filter buttons — not wired

---

## VERCEL ENVIRONMENT VARIABLES
✅ All confirmed set in Vercel (Production + Preview) — 2026-06-03
GEMINI_API_KEY · DEEPL_KEY · FIREBASE_PROJECT_ID · FIREBASE_CLIENT_EMAIL · FIREBASE_PRIVATE_KEY · REACT_APP_POSTHOG_KEY · REACT_APP_SENTRY_DSN · OPENAI_API_KEY

---

## NEXT ACTIONS (in order)
1. **Windsurf housekeeping** — clean frontend/.gitignore, create this file in repo
2. **Fix index.css syntax error** — Cursor Composer
3. **Investigate Translator tab** — browser DevTools console, note exact error
4. **Add missing DEFAULT_DATA fields** — Windsurf
5. **Wire v0 components** — Cursor Composer, Wrapper Pattern, in order above
6. **Batch-generate contextSentence** — Claude Projects (BLOCKS sentence flashcards)
7. **Emergent sessions** — only after all above complete + State Ledger spec written first

---

## OPEN DECISIONS (resolve before building affected features)
- FSRS spaced repetition — decide before Paths Emergent session
- Output drills award 2× XP? — decide before XP system is touched
- contextSentence — Claude batch-generates or written manually?
- 5 new words/day cap — enforce in app or leave to user?

---

## BLOCKED FEATURES (prerequisites not met)
- Sentence flashcards — BLOCKED on contextSentence field being populated
- Break Free / ¡Libre! — BLOCKED on Milo straining + running poses being generated
- Paths progression — BLOCKED on State Ledger spec + Emergent session
- Bones & streak freeze — BLOCKED on Paths being built first

---

## TOOL ASSIGNMENT RULES
- Windsurf — free, single-file edits, .gitignore, DEFAULT_DATA changes
- Cursor Composer — free, Wrapper Pattern wiring, bug fixes, multi-file bounded changes
- Claude Code CLI — free (Claude Pro), multi-file tasks between Windsurf and Emergent
- Claude Projects — free, content generation (contextSentence batch), State Ledger specs
- Emergent — paid, Stage 5 only, never for diagnosis, always needs State Ledger spec first
- Google AI Studio — free, large multi-file bug diagnosis (2M context), use before Emergent

---

## CHARITABLE MODEL (locked)
80% net surplus → NS SPCA Colchester (10%), ElderDog Canada (15%), Room to Read Canada (25%), UNHCR Canada (25%). 20% → developer. Activates when: stable on Play Store + 1,000 MAU for 60 days + first revenue distribution made.
