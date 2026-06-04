# CURRENT_STATE_LEDGER.md
*Milo Speaks Spanish — compressed project memory. Update after every milestone.*
*Last updated: 2026-06-04 (session 4)*

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
  sessions[]           ← drill history, last 50, { drillId, correct, total, date, ts }
  activeDays[]         ← ISO date strings (YYYY-MM-DD), date-deduped, set on drill complete
  friends[]
  reminderEnabled
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
8. Mastery count mismatch — profile shows 374/340, Words page shows 317 (two different counting methods)
9. Community Word Packs Import broken — words don't add to list
10. Community Word Packs word entry form — Spanish + English fields need to be side by side
11. Translator tab console error — not yet investigated

---

## VERCEL ENVIRONMENT VARIABLES
✅ All confirmed set in Vercel (Production + Preview) — 2026-06-03
GEMINI_API_KEY · DEEPL_KEY · FIREBASE_PROJECT_ID · FIREBASE_CLIENT_EMAIL · FIREBASE_PRIVATE_KEY · REACT_APP_POSTHOG_KEY · REACT_APP_SENTRY_DSN · OPENAI_API_KEY

---

## DISCORD INTEGRATIONS STATUS
- ✅ **Linear → Discord `#linear`** — LIVE via Make scenario "Linear → Discord #linear". Message format: 🔔 action | title | identifier | url
- ✅ **Sentry → Discord `#errors`** — LIVE direct (Sentry custom integration → discord.com webhook). Fires on new issue created + escalates + resolved becomes unresolved. Will fire when next new real error hits the app.
- ⬜ **UptimeRobot → Discord `#ops-log`** — UptimeRobot account needed first
- ⬜ **PostHog → Discord `#analytics`** — wire after 500+ MAU
- ⬜ **Firebase quota → Discord `#firebase`** — wire before Play Store launch
- ⬜ **Ko-fi → Discord `#revenue`** — wire when Ko-fi is live
- ⬜ **Vercel → Discord `#deploys`** — blocked on Vercel paid plan (see FUTURE section)

**Make:** us2.make.com — one active scenario: "Linear → Discord #linear". Unused Sentry scenario deleted.

---

## FUTURE — REQUIRES PAID PLAN
- **Vercel → Discord deploy notifications** — blocked on Vercel free tier. Needs either Vercel Pro ($20/month) for webhooks/log drains, or accept 15-min polling delay via Make. Revisit when upgrading Vercel plan. Make scenario canvas already set up at us2.make.com, webhook URL ready.

---

## NEXT ACTIONS (in order)
1. **Item 6 — Header layout redesign** — 3 horizontal lines, Milo icon left, profile icon right — TEST ON LOCALHOST before pushing
3. **Item 7 — Continue button → "Continue Path"** — locked until Paths built
4. **Fix index.css syntax error** — Cursor Composer
5. **Investigate Translator tab** — browser DevTools console, note exact error
6. **Wire v0 components** — Cursor Composer, Wrapper Pattern, in order above
7. **Batch-generate contextSentence** — Claude Projects (BLOCKS sentence flashcards)
8. **Emergent sessions** — only after all above complete + State Ledger spec written first

Items 11/12 (Reddit + Ko-Fi), 15 (Discord community) — manual, no code.
Item 16 (Mutual friends notification badge) — blocked on State Ledger spec.

Note: DEFAULT_DATA missing fields from prior ledger are already present — completedPaths, completedStops, audioListenEnabled, audioSpeakEnabled all confirmed in DEFAULT_DATA. That item is closed.

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

---

## SESSION SUMMARY — 2026-06-04

**Completed:**
- Full smoke test of leaderboard and friends restore — all 7 items passing
- Logout button fixed — pb-8 → pb-24 in src/components/ProfileSheet.jsx
- Leaderboard subtitle updated — "See how your friends stack up"
- Confirmed Claude Code agent as the tool for this workflow

**Bugs fixed:**
- Sign Out button hidden behind BottomNav — resolved

**Decisions made:**
- Path-based leaderboard matchmaking logged as v3 RFC — requires completedPaths[] populated first
- Badge expansion confirmed as next feature after stabilization — RFC needed before any code

**Tools assessed:**
- Claude Code agent confirmed working for targeted single-file edits

**First task next session:**
Translator tab console error — open live app → Translator tab → F12 → Console → paste exact error

---

## SESSION CLOSE — 2026-06-04 (this session)

**Completed:**
- Item 1: Theme Challenge now triggers confetti + fanfare on completion — `drillId !== 'flashcard' || dailyKind` condition in SpanishHub.jsx `onDrillDone`
- Item 2: No change needed — 10-question queue over 5 words (2× repeat via `buildNoRepeatQueue`) is correct behaviour
- Item 3: Mastery filter pills wired to global `drillMode` state in SpanishHub.jsx. Pills now live exclusively on Words page (ProgressPanel inside WordList.jsx). Removed from DrillsGrid.jsx. Tapping a tier filters all drills; persists across pages until changed. Five modes: all / new / learning / strong / mastered. `getActiveWords()` filtering updated to match.
- Item 4: Daily Goal ring card removed from homepage. Homepage now shows 2-column grid (Continue + Words Mastered). Ring SVG variables cleaned up.
- Item 8: ¡Hola, Amigo! → ¡Hola, Estudiante!
- Item 10: Palabra del Día — word speaker button compacted to 26×26px; inline sentence speaker button added (18×18px) directly right of example sentence
- Homepage compact pass: outer gap reduced, Palabra del Día card tightened, "Fetch this word" disabled button removed, hero section unchanged

**Bugs fixed:**
- Word mastery filter buttons not wired — CLOSED (now ProgressPanel controls global drillMode)

**First task next session:**
Item 5 — Streak loss notification: remove from Daily Goal tab, make it a function of the streak icon in Header

---

## SESSION CLOSE — 2026-06-06

**Completed this session:**
- Root cleanup: deleted node_modules/ and package-lock.json at repo root; confirmed frontend/.gitignore already had all required entries
- startDailyChallenge weak branch fixed — pool fallback added: if fewer than 5 non-mastered words, falls back to full enabled word list instead of silently bailing. Fixes "Daily Challenge won't open" bug.
- Friends tab added to BottomNav (Users icon); FriendsList.jsx wired into SpanishHub.jsx
- Leaderboard.jsx restored verbatim from git commit ee7aceb (had been removed in 64fac24). Now a full tab navigated to via XP star tap in Header. XP ⭐ changed from display div to tappable button → setTab('leaderboard').
- Leaderboard has internal tabs: All-time / This week / Friends. Friends sub-tab delegates to FriendsList (no duplication).
- Active word pack indicator added: CategoryToggles shows amber highlight + checkmark on active preset; WordList button shows active pack name and turns amber when non-Everything pack is active.
- ProfileSheet "Words" label → "Mastered"; now shows masteredCount/totalWords (e.g. 323/396). totalWords passed from SpanishHub as activeWords.length.
- GitHub Actions workflow created: .github/workflows/discord-deploy-notify.yml — fires on deployment_status success/failure, posts embed to Discord #deploys via DISCORD_DEPLOYS_WEBHOOK secret. (Still blocked on Vercel paid plan for webhooks — workflow is ready when that's resolved.)
- FIREBASE_DISCORD_TASK.md created at repo root — spec for Firebase Cloud Function notifyNewUser (Firestore onCreate → Discord webhook). Webhook URL stored in env, not in file.

**Bugs fixed:**
- Daily Challenge won't open — CLOSED (pool fallback in startDailyChallenge)

**Architecture notes:**
- Leaderboard tab is accessed via XP star only — no BottomNav entry. Friends tab (BottomNav) is for managing friend codes; Leaderboard tab is for rankings. These are separate on purpose.
- activeWords.length now flows to ProfileSheet as totalWords prop — single source of truth from SpanishHub.

**First task next session:**
Fix index.css syntax error — open in Cursor Composer, find Unexpected token, resolve.

---

## SESSION CLOSE — 2026-06-04 (session 4)

**Completed this session:**
- Item 5 fully built — Streak Modal (StreakModal.jsx) with monthly calendar, back/forward navigation, active days highlighted in amber
- `activeDays[]` field added to Firestore schema and DEFAULT_DATA — ISO date strings, date-deduped, written on every drill complete via `onDrillDone`
- Reminder toggle moved from Set Goal modal to Streak Modal — full notification permission request logic preserved; `onReminderToggle` writes to Firestore via `persistData`
- Set Goal modal updated — minimum goal floor raised to 10 (enforced via `min={10}` + `onBlur` snap), streak explanation line added below input, dead Bell/BellOff/toggleReminder/supported code cleaned up
- Living flame — three-level pulsing animation (`flame-risk-1/2/3`) tied to time of day (8am/2pm/6pm thresholds) + daily goal completion state; reverts instantly when goal is met. Defined in Header.jsx `<style>` block via keyframes `flamePulse1/2/3`
- Streak icon in Header now tappable — `onClick={onStreakClick}` opens StreakModal; `streakRiskLevel` prop controls animation class

**Bugs added:** None known.

**Decisions made:**
- Daily goal minimum = 10 (enforced in input)
- Streak reminder time presets scrapped in favour of automatic three-level flame — no user configuration needed
- Streak loss happens at midnight — 6pm is the latest reminder trigger, giving 6 hours to act
- `activeDays` is date-deduped ISO strings, separate from `sessions` drill history

**Tools assessed:** None new.

**First task next session:**
Item 6 — Header layout redesign (Milo icon left, profile icon right, 3-line horizontal layout). Test on localhost before pushing.
