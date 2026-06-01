# 🐾 Milo Speaks Spanish — Master Project Reference
*Compiled from all project chats — May 2026*
*Pre-Emergent tasks, Windsurf tasks, and hosted image URLs live in PRE-EMERGENT-CHECKLIST.md*

---

## 1. PROJECT IDENTITY

| Field | Detail |
|---|---|
| **App name** | Milo Speaks Spanish |
| **Tagline** | "Learn · Practice · Master" |
| **Theme** | Dog / paw 🐾 |
| **Mascot** | Milo — a black lab who learns Spanish *alongside* the user. He doesn't already know Spanish. |
| **Philosophy** | No energy systems. No lesson locks. No pay-to-learn. Ever. |
| **Branding promise** | "Free to learn" — NOT "always free" (leaves room for optional cosmetics later) |
| **Public commitment** | "No ads, no subscription" |
| **Login screen stat line** | `15 drills · 14 lessons · 300+ words · Free to learn 🐾` |
| **GitHub repo** | `https://github.com/JohnathanGould/Spanish-Hub` |
| **Live URL** | `https://spanish-hub-zeta.vercel.app` |
| **GitHub email** | johnathangould@gmail.com |
| **Ko-fi** | ko-fi.com/milospeaksspanish |
| **Developer** | Johnathan Gould, Halifax NS, Canada |
| **Milo origin** | Named after the developer's late dog — a black lab who wore a green bandana |

**⚠️ Working conventions (ADHD — primarily inattentive):**
- Always number steps sequentially (1, 2, 3…)
- Always include full folder path for every file: `FRONTEND > SRC > COMPONENTS > drills > ChoiceDrill.jsx`
- Keep instructions clearly separated — never bunch multiple tasks together
- One task at a time with clear confirmation before moving on
- When a file is being worked on for the first time, create a markdown copy of it as the working file
- NEVER make line-by-line or partial edits — NEVER ask the user to find a line, search for text, or paste a snippet
- When changes are needed, update the markdown working copy with ALL changes at once and present it as a download
- The only action required from the user is: download the file and replace the existing one
- Do NOT rewrite code from scratch — the markdown is a copy of the actual file with targeted changes applied
- This applies to every file type: markdown docs, JSX components, JSON data files, everything

---

## 2. TECH STACK

| Layer | Tool |
|---|---|
| Frontend | React + Tailwind + CRACO |
| Main shell | `SpanishHub.jsx` |
| Hosting | Vercel |
| Auth | Firebase (Google Sign-In + Email/Password) |
| Database | Firestore |
| AI — Milo chat | Gemini 2.5 Flash via Vercel serverless function (`api/chat.js`) |
| AI — Translator | DeepL via Vercel serverless function (`api/translate-deepl.js`) |
| AI — Plaza moderation | OpenAI Moderation API |
| Animations | canvas-confetti ✅ (drill completions), framer-motion ✅ (installed, not wired), Lottie ✅ (installed, not wired) |
| Icons | lucide-react ✅ |
| Certificates | html-to-image (canvas-rendered PNG download) |
| Voice | Web Speech API — TTS output + mic input for pronunciation |
| Analytics | PostHog + Vercel Speed Insights |
| Error tracking | Sentry (`@sentry/react`, wired in `index.js`) |
| Firebase SDK | `<script>` tag, v12+ |
| Firebase project name | `my-spanish-hub` |
| Firebase region | Montreal (`northamerica-northeast1`) |
| Node packages | node-fetch, firebase-admin |

**Pre-Emergent State Ledger (do this in Claude chat first — free):**
Before every paid Emergent session, ask Claude: "Write a strict technical specification markdown file detailing exactly how global state, local state, and Firebase should track [the feature being built]." Feed that spec into Emergent at session start. Emergent executes rather than plans — sessions cost $100 instead of $300.

**Git commit checkpoint rule (Cursor Composer):**
Run `git commit -m "pre-composer-[feature]"` immediately before hitting Enter on any Composer prompt. If Cursor misinterprets or hallucinates across multiple files, run `git checkout .` to instantly reset to the last clean state. Never skip this step.

**FSRS spaced repetition — open decision:**
The existing `progress{ c, w, s }` is a simple counter. FSRS (the algorithm Anki uses) would add scheduled review intervals per word — `stability`, `difficulty`, `due`, `lastReview` fields in Firestore. Directly answers the Fetch word-selection question and the mastery tier question. Has a JavaScript implementation. Decide before the Paths Emergent session — retrofitting is harder than building in. See PATHS-LEARNING-DESIGN.md for full spec.

**Vercel environment variables:**
- `GEMINI_API_KEY`
- `DEEPL_KEY`
- `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`
- `REACT_APP_POSTHOG_KEY`
- `REACT_APP_SENTRY_DSN`
- `OPENAI_API_KEY` (Plaza moderation)

---

## 3. TOOLS IN USE

### Tool routing — by task type and token cost

**The rule: use the cheapest tool that can do the job well. Claude Pro tokens are for reasoning and judgment, not volume.**

| Task type | Tool | Cost |
|---|---|---|
| Decisions, audits, product thinking | Claude Pro — Planning chat | Pro tokens |
| State Ledger specs | Claude Pro — Planning chat | Pro tokens |
| Batch content generation (contextSentence, theme tags, placement test, grammar cards, T&S text) | Google AI Studio | Free |
| Large codebase debugging (root cause only) | Google AI Studio | Free |
| Gemini system prompt testing | Google AI Studio | Free |
| Single-file code edits | Windsurf | Free tier |
| Multi-file component wiring | Cursor Composer | Free tier |
| Architectural builds (Paths, bones, Break Free, etc.) | Emergent | Per session |
| UI component generation | v0.dev | Free |
| Local dev and Firestore testing | Firebase Emulator Suite | Free |

### Tool detail

| Tool | Notes |
|---|---|
| **Claude Pro** | Reserved for reasoning, judgment, and planning. Never use for volume content generation — that burns tokens on repetitive tasks Google AI Studio handles for free. Start a fresh chat when a thread gets long. |
| **Google AI Studio** | Gemini 2.5 Pro. Completely free. 1M token context window. Use for: all Content chat tasks, large codebase debugging, Gemini system prompt iteration. Paste entire files — it handles the scale. Never burn Claude Pro on tasks that fit here. |
| **Windsurf** | VS Code AI assistant. Single-file edits, quick wiring, one-liners. Free tier. |
| **Cursor** | Multi-file wiring via Composer mode. Wrapper Pattern: save v0.dev components untouched in `src/components/v0/`, wire into SpanishHub.jsx without touching the component. Free tier: 2,000 fast requests/month. Clean `.gitignore` before every session or Cursor indexes build artifacts and burns requests on irrelevant files. |
| **GitHub Copilot** | VS Code inline autocomplete. Passive — no sessions required. |
| **Emergent** | Paid per session. Reserve strictly for multi-file architectural builds that require true orchestration: Paths & Stops, bones system, Break Free, Fetch. Do not use for debugging, single-component wiring, or content tasks. Always write a State Ledger spec in Claude Pro first — Emergent executes, it does not plan. |
| **v0.dev** | UI component generation. Generated components are sacred — never edit directly. Wire via Cursor Composer using the Wrapper Pattern. |
| **Firebase Emulator Suite** | Run Firestore, Auth, and Functions locally. Never burn live Firebase quota while testing. Install: `firebase emulators:start`. All local dev goes here — push to live only when confirmed working. |
| **Firebase Console** | Manage Firestore, Auth, Rules, indexes. |
| **Vercel Dashboard** | Environment variables, deployments, function logs. |
| **Ko-fi** | Voluntary donations from users. |
| **VS Code Extensions** | Firestore Explorer, Console Ninja, Vercel, Thunder Client, SonarQube, Windsurf, Copilot |

---

## 4. FILE STRUCTURE (Key Files)

```
Spanish-Hub/
├── frontend/
│   ├── src/
│   │   ├── SpanishHub.jsx              — Main app shell (tabs, routing, state, DEFAULT_DATA)
│   │   ├── index.js                    — Sentry wired here
│   │   ├── firebase.js
│   │   ├── utils/helpers.js
│   │   ├── SofiaChat.jsx               — Milo AI chat component (reference style for plain JSX)
│   │   ├── components/
│   │   │   ├── DrillsGrid.jsx          — Drill card grid with inline length selector
│   │   │   ├── DrillRouter.jsx         — Routes drill ID to correct component
│   │   │   ├── DrillShell.jsx          — Drill wrapper UI
│   │   │   ├── DoneScreen.jsx          — Post-drill completion screen
│   │   │   ├── LoginScreen.jsx         — Login screen
│   │   │   ├── KofiSupport.jsx         — Ko-fi component (written, not yet on home screen)
│   │   │   ├── Translator.jsx          — Translator (BROKEN — investigate)
│   │   │   ├── WordList.jsx            — Word list display
│   │   │   ├── WordDetail.jsx          — Word card modal (opens at tap position — bug: opens at screen center)
│   │   │   ├── Leaderboard.jsx         — Friends system + leaderboard
│   │   │   ├── Certificate.jsx         — Canvas-rendered certificate
│   │   │   ├── SharedPacks.jsx         — Community word packs
│   │   │   ├── Plaza.jsx               — Community chat
│   │   │   ├── Header.jsx              — OLD header — rename to Header.old.jsx before next session
│   │   │   ├── MiloHeader.jsx          — Header (v0 generated — not yet wired)
│   │   │   ├── HomeTab.jsx             — Home tab (v0 generated — not yet wired)
│   │   │   ├── BottomNav.jsx           — Nav bar (v0 generated — not yet wired)
│   │   │   ├── BadgeGrid.jsx           — Badges (v0 generated — not yet wired)
│   │   │   ├── LeaderboardNew.jsx      — Leaderboard (v0 generated — not yet wired)
│   │   │   ├── ProfileSheet.jsx        — Profile sheet (v0 generated — not yet wired)
│   │   │   └── drills/
│   │   │       ├── ChoiceDrill.jsx          — Multiple Choice (SP→EN, EN→SP, Hear & Choose)
│   │   │       ├── TypeDrill.jsx            — Type It + Listen & Type
│   │   │       ├── FlashcardDrill.jsx       — Flashcards (no XP/bones reward)
│   │   │       ├── ConjugationDrill.jsx     — Conjugation + Past Tense (present + past modes)
│   │   │       ├── GenderDrill.jsx          — Gender drill (el/la)
│   │   │       ├── MatchingDrill.jsx        — Matching game
│   │   │       ├── WordSortDrill.jsx        — Word Sort Spanish
│   │   │       ├── SentenceBuilderDrill.jsx
│   │   │       └── FillBlankDrill.jsx
│   │   └── data/
│   │       ├── words.js                — 302 words, MASTER array, PRESET_PACKS
│   │       ├── drillData.js            — DRILLS array, CONJ, PRETERITE, FITB_POOL etc.
│   │       ├── lessons.js              — 14 lessons (being replaced by paths.js)
│   │       └── paths.js                — ✅ COMPLETE — 5 Paths × 5 Stops, ~200 words, 125 quiz questions
│   └── package.json
├── api/
│   ├── chat.js                         — Milo AI (Gemini) serverless function
│   └── translate-deepl.js             — DeepL translation serverless function
└── design_guidelines.json             — Colours, typography — hand to Emergent every session
```

**Device note:** App is also installed as a PWA on Android phone (720×1600px, ~360px CSS width). Always test mobile layout.

---

## 5. FIRESTORE STRUCTURE

```
users/{uid}:
  displayName, photoURL
  customWords[]              — user-added words
  progress{ [es]: {c,w,s} } — per-word mastery (correct, wrong, streak)
  xp, weeklyXP, weekStart
  streak{ count, lastDate }, dailyGoal, dailyProgress{ count, date }
  sessions[]
  categoryEnabled{}
  lessonsCompleted[]
  completedStops[]           — add via Windsurf Task 2
  completedPaths[]           — add via Windsurf Task 2
  pathWords[]                — words unlocked through Paths
  dailyChallenges{ date, weakDone, themeDone }
  friends[]
  reminderEnabled
  audioListenEnabled, audioSpeakEnabled
  bones: 0 ✅               — in DEFAULT_DATA
  treats: 0 ✅              — in DEFAULT_DATA (use TBD)
  stars: 0 ✅               — in DEFAULT_DATA (use TBD)
  earnedBadges[]             — add via Windsurf Task 10

leaderboard/{uid}:
  displayName, photoURL, xp, weeklyXP, weekStart, updatedAt

sharedPacks/{packId}:
  title, description, authorId, authorName, words[], wordCount, createdAt

chatUsage/{uid}:
  count, date                — Milo rate limit (30/day)

plaza/{postId}:
  uid, displayName, text, timestamp, likes

reports/{reportId}:
  postId, reportedBy, reason
```

**Security rules pattern:**
```javascript
match /users/{userId} {
  allow read, write: if request.auth != null && request.auth.uid == userId;
}
match /chatUsage/{userId} {
  allow read, write: if request.auth != null && request.auth.uid == userId;
}
```

---

## 6. NAVIGATION

**Current 8 tabs (with internal tab IDs):**

| Label | Tab ID | Notes |
|---|---|---|
| Learn | `learn` | 14 lessons — being replaced by Paths & Stops |
| Words | `words` | Word list, mastery, custom words, community packs |
| Drills | `drills` | 14 drill types |
| Milo | `sofia` | AI conversation (tab ID is legacy "sofia" — do not change until Emergent does a full rename pass) |
| Trans | `translate` | DeepL translator — BROKEN |
| Plaza | `plaza` | Community chat |
| Top | `leaderboard` | XP rankings |
| Log | `history` | Session history |

**Target nav bar (6 tabs):**
Learn · Words · Drills · Milo · Plaza · Log

**Header tap targets:**
- 🔥 Streak flame — Streak calendar screen
- ⭐ Star — Leaderboard tab directly (removes need for Top tab)
- 🤖 Avatar — Profile sheet

---

## 7. KEY DESIGN DECISIONS (Locked)

| Decision | Detail |
|---|---|
| Lessons → Paths | 5 Paths × 5 Stops × ~5 words. Gradual — NOT a word dump |
| Drills rename | "Drills" → "Practice" (Emergent task — many instances to rename) |
| Fetch 🐾 | A new mode inside the Training tab. Milo fetches random drills scoped to the user's completed Stop words. Separate from the Practice tab. Not built yet. |
| Milo learns alongside | Milo doesn't already know Spanish. Every word is new to him too. |
| Bones system | Earned, never purchased. 5 bones = 1 streak freeze (stackable). |
| 3 currency types | `bones` / `treats` / `stars` — all 3 in Firestore now, spend logic later |
| No manipulation | No energy systems, no lesson locks, no pay-to-learn. Locked forever. |
| Free to learn | Phrase chosen carefully — not "always free" (leaves room for cosmetics later) |
| Characters | Generic mascot variable names in code (`mascotName`, `mascotMessage`, `companionReaction`) so future characters (Ruby, etc.) slot in cleanly. Build Ruby only after Milo is solid. |
| Multi-language ready | Language-agnostic content files from day one. Don't build other languages yet. |
| Plaza | Live as a real-time chat room now. Full community features deferred years. |
| Ko-fi | Simple badge for donors. Cosmetics shop years away. |

---

## 8. BONE & CURRENCY SYSTEM SPEC

**How bones are earned:**
- Complete a Fetch session — 1 bone
- Perfect score on a Fetch — 2 bones
- Daily login — 1 bone
- Complete a full Path — 3 bones
- Flashcard drill — no bones (passive review)

**Streak freeze:**
- 5 bones deducted automatically per missed day
- Stackable — 15 bones = 3 days protected
- Milo message on return: *"Looks like you missed a few days! I used some of your bones to keep your streak safe 🐾"*

**Other bone uses (future):** Skip a known word, reshuffle a Fetch, hint in harder exercises.

**Treats and stars:** Fields exist in Firestore. Uses TBD.

---

## 9. SCAFFOLDING RULES (Add to Every Emergent Prompt)

1. **Language-agnostic** — all content from data files, not hardcoded. `language` field on Firestore user profile.
2. **Generic mascot vars** — use `mascotName`, `mascotMessage`, `companionReaction` — never hardcoded "Milo".
3. **Multi-currency Firestore** — `bones`, `treats`, `stars` as separate numeric fields on user doc.
4. **Bone deduction** — streak system checks bone balance on each missed day, deducts 5 automatically before breaking streak.

---

## 10. MILO AI (CHAT) SPEC

| Field | Detail |
|---|---|
| Model | Gemini 2.5 Flash |
| Endpoint | `FRONTEND > api > chat.js` (Vercel serverless) |
| Rate limit | 30 messages/user/day — tracked in `chatUsage/{uid}` |
| Input | Web Speech API (`lang: es-ES`) + text fallback |
| Output | Text + Speech Synthesis (Spanish voice preferred) |
| Mute toggle | 🔊/🔇 |
| History window | Last 10 messages only |
| Tab name | "Milo" (tab ID is still legacy `sofia` — leave until Emergent does full rename pass) |
| System prompt location | `FRONTEND > api > chat.js` — test changes in Google AI Studio first |

**System prompt behaviour (current):**
- BEGINNER (default): simple present tense, max 8 words/sentence, each sentence followed by [English translation]
- INTERMEDIATE: present + past tense, no translations
- ADVANCED: natural Spanish, short replies
- Always ask ONE follow-up question to keep conversation going
- Gently correct grammar mistakes inline

**Known bug:** Responds with fluent Spanish even to total beginners — fix by passing user's `completedStops` word list into the system prompt as context.

---

## 11. PATHS & STOPS CURRICULUM

**File:** `FRONTEND > SRC > DATA > paths.js` — ✅ complete and in outputs
**Structure:** 5 Paths × 5 Stops = 25 Stops total, ~200 words, 125 quiz questions
**Scope:** A1 – A2 (beginner to conversational)

| Path | Title | Focus |
|---|---|---|
| 1 🐾 | El Primer Paso | Greetings, pronouns, articles, numbers 1-10, questions |
| 2 🏘️ | El Vecindario | Ser vs estar, tener, adjectives, family, colours |
| 3 🌳 | El Parque | AR/ER/IR verbs, querer/poder, ir+places, yo-go verbs |
| 4 🌿 | El Sendero | Food/me gusta, time/days, weather, body/me duele, numbers 11-100 |
| 5 🏔️ | La Caminata | Reflexives, preterite -AR/-ER/-IR, ser/ir past, connectors, survival phrases |

- Each Path awards a certificate on completion
- All 5 complete — Grand Certificado Básico 🏆
- **Long-term vision:** 25 Paths total (5 per tier: Beginner → Intermediate → Upper-Int → Advanced → Fluency) covering ~2,500 words to functional fluency
- **Emergent prompt ready:** `emergent-training-tab.md` in outputs — use for the Training tab build session

---

## 12. VOICE CLIPS (Independent — Free, Any Time)

Test both tools and pick the better one:
- **OneAI Evolution Suite** — Voice Generator — ElevenLabs Ultra V2
- **Coqui TTS** — open source: `pip install TTS`

**Scripts needed (same 7 clips for both tools):**
1. Correct answer: *"¡Sí! Milo knew you'd get that one!"*
2. Wrong answer: *"Milo got confused by that one too — let's try again"*
3. Fetch complete: *"¡Lo hicimos! Great Fetch session 🐾"*
4. Streak saved: *"Milo used some bones to keep your streak safe!"*
5. Milestone: *"¡Increíble! You and Milo both know this perfectly now!"*
6. Path complete: *"¡Terminamos el camino! Certificate time!"*
7. Ko-fi treat: *"¡Una golosina! Milo is SO happy right now 🐾"*

Host winning clips at: `FRONTEND > PUBLIC > audio/`

---

## 13. WHAT'S CURRENTLY BROKEN / INCOMPLETE

| Item | Status | Fix With |
|---|---|---|
| Translator tab | BROKEN — investigate exact error | Emergent |
| index.css syntax error | `Unexpected token ')' in expression or statement` — check for unclosed blocks in `FRONTEND > SRC > index.css` | Windsurf |
| Drill length wiring | Steps 1-48 done. Steps 49-51 still needed: replace DrillsGrid.jsx, replace DrillRouter.jsx, commit & push | Windsurf |
| Milo vocab awareness | Responds too fluently for beginners — pass completedStops words into system prompt | AI Studio → Emergent |
| Word mastery filter buttons | Not wired — New/Learning/Strong/Mastered tabs don't filter | Emergent |
| Word detail card | Opens at screen center — should open at tap position | Emergent |
| v0 components | Generated but not integrated — still disconnected JSX files | Emergent |
| Ko-fi button | Written but not added to home screen | Emergent |
| Log tab | Whole tab debated — keep/simplify/remove/rename to Records | Decision needed → Emergent |
| Drills → Practice rename | Many instances across codebase | Emergent |
| Header (new) | MiloHeader.jsx exists but old Header.jsx still active | Windsurf → Emergent |
| BottomNav | Written, not imported into SpanishHub.jsx | Windsurf Task 1 |
| friendCode query | Scans full leaderboard — slow at scale | Emergent (add indexed field) |
| Gender drill word pool | Bug — investigate | Emergent |
| Sentence Builder distractors | Bug — investigate | Emergent |
| Type It word/answer mismatch | Bug | Emergent |
| Listen & Type post-correct audio | Bug — wrong audio plays after correct answer | Emergent |

---

## 14. XP MILESTONES & BADGE SYSTEM

Awarded when XP crosses each threshold. Stored in `earnedBadges[]` on user doc.

| XP | Badge | Name |
|---|---|---|
| 100 | 🌱 | First Steps |
| 500 | 🔥 | On Fire |
| 1,000 | ⭐ | Rising Star |
| 2,500 | 🎯 | Dedicated |
| 5,000 | 🏆 | Champion |
| 10,000 | 🐾 | Milo's Best Friend |
| 50,000 | 🥇 | Top of the Pack |
| 100,000 | 🏅 | Leyenda |

- Badge awarded once, never duplicated
- Milo celebration on unlock: *"¡Increíble! You just earned the [Name] badge! 🐾"*
- Badges display in a grid on ProfileSheet
- **Emergent task** — needs milestone check on every XP update, Firestore write, and celebration UI

---

## 15. VERSION ROADMAP

### v1 — LIVE ✅
Full hosted app: 300+ words, 15 drills, 14 lessons, Firebase auth, Milo AI, Plaza.

### v2 — Stable and trustworthy 🚨 In progress
Goal: clean, bug-free, polished app ready for beta testers. Nothing half-built visible.
- All known bugs fixed (Translator, Type It, Listen & Type, index.css, Gender drill, Sentence Builder)
- v0 components wired (MiloHeader, HomeTab, BottomNav, ProfileSheet)
- Treats and stars removed. Bones only.
- Leaderboard removed.
- Drill grid redesigned: Practice / Review / Warm Up tiers
- Drills renamed to Practice across codebase
- Ko-fi on home screen
- Log tab decision resolved

### v3 — Learning architecture ⏳ Planned
Goal: make Milo genuinely better for language learning than anything else at this price point.
- Paths & Stops with three-phase word introduction (introduce → recognise → produce)
- FSRS spaced repetition built into progress tracking
- contextSentence content populated, Contextual Binding post-answer step live
- Sentence flashcards (FlashcardDrill.jsx sentence mode)
- Mastery model using FSRS stability + outputCorrect tracking
- Bones and streak freeze system
- Badge and achievement system
- Milo vocabulary awareness fix (completedStops into Gemini system prompt)

### v4 — Daily habit loop ⏳ Planned
Goal: give users a reason to come back every day, rooted in v3 learning architecture.
- Fetch mode (FSRS due date drives word selection)
- Break Free — ¡Libre! mechanic (timed speed round — chain snaps — Fetch unlocks)
- Animation system (framer-motion + Milo pose library)
- Audio system (Howler.js + ElevenLabs/Coqui voice clips)
- Milestone community feed (replaces Plaza)

### v5 — Growth and charity ⏳ Planned
Goal: get the app in front of more people. Make the giving model visible and real.
- PWA manifest and service worker
- Charitable giving model publicly live (80/20 model, all four charities named)
- Milo Movement public-facing statement
- Google Play Store submission (Capacitor wrap, $25 one-time)
- YouTube channel + Stop videos integrated
- Reddit launch
- Milo Monday campaign infrastructure

---

## 16. RELEASE PHASES

### Phase 1 — Polish & Stability (Current)
Fix broken things. Wire up disconnected components. No half-built features visible to users.

### Phase 2 — Beta Test
Recruit ~20 testers via Reddit (r/learnspanish, r/languagelearning) and personal contacts.
Collect bugs via a simple Google Form. Fix everything reported before public release.

### Phase 3 — PWA
Add service worker + `manifest.json` — app becomes installable from browser.
Free. Emergent task. Do after core features stable.

### Phase 4 — Google Play Store
Wrap PWA with Capacitor — submit to Google Play ($25 USD one-time fee).
Opens organic search discovery — biggest single growth move.
Apple App Store ($99/yr) — defer until Android has traction.

### Phase 5 — Growth
Reddit posts linking to Play Store listing, Ko-fi page updated, respond to every early review.

---

## 17. FRANCHISE VISION (Future — Do Not Build Yet)

Milo Speaks Spanish is the first app in a family — "Milo Speaks French", "Milo Speaks Italian", etc.
- Milo the black lab is the consistent character across all apps
- Each app is a standalone clone with language-specific content swapped in
- Multi-language architecture (language-agnostic content files) baked in from day one so cloning is clean
- Suggested rollout: French → Italian → Portuguese → German → Japanese/Mandarin

**Do not build until Spanish app is fully stable.**

---

## 18. BREAK FREE — ¡LIBRE! SPEED ROUND

| Field | Detail |
|---|---|
| **Name** | Break Free / ¡Libre! |
| **Origin** | Milo the dog broke his chain constantly when tied out as a young dog. Stubborn, determined, always found a way. |
| **Mechanic** | Timed speed round — countdown timer, Milo straining at chain, complete X questions before time runs out |
| **Success** | Chain snaps, Milo runs free, full celebration — confetti, best sound in the app, ¡Libre! on screen |
| **Failure** | Milo slumps, gentle message, no penalty — try again |
| **Gateway** | Break Free unlocks a Fetch session — the two features are narratively connected |
| **Loop** | Learn in Paths → Break Free speed round → Milo breaks free → Fetch session → back to Paths |
| **Rewards** | Bonus bones, Unchained 🔓 badge on first success, free-running Milo idle for rest of session |
| **Poses needed** | Straining/pulling pose + running free/overjoyed pose — generate in ChatGPT before Emergent build |
| **Scope** | v4 — built as timed overlay mode inside DrillShell.jsx |
| **Spanish** | ¡Libre! — Milo learns the word too |

---

## 19. MILO MONDAY

| Field | Detail |
|---|---|
| **Date** | First Monday of May, every year |
| **Origin** | Milo the dog crashed Jessica's Monday conference calls so reliably that colleagues named it Milo Monday. Jessica still uses MiloMonday as her gamer handle. |
| **Purpose** | Annual giving and community event — in-app events, charity push across all four causes, community milestone feed, external hashtag campaign |
| **Launch timing** | After the charitable giving model is publicly active and the app has enough users to generate visible momentum |
| **In-app** | Limited badge (that day only), bonus XP, milestone feed push, Ko-fi campaign directed at all four charities |
| **External** | #MiloMonday hashtag, Reddit posts across language + dog + refugee + literacy communities, coordinate with ElderDog Canada and UNHCR Canada |
| **Vision** | Annual events compound. Year 1 small. Year 5, the hashtag is searchable and organisations post it without being asked. GivingTuesday started the same way. |

---

## 20. DECIDED AGAINST (No Need to Revisit)

| Item | Reason |
|---|---|
| Milo 3D model | Complexity + load time; Lottie 2D achieves same emotional effect |
| StackBlitz | Cursor/Windsurf do the same thing locally |
| Supabase | Firebase is fine; no ecosystem switch mid-build |
| TanStack Query | Premature until Firestore calls get messy |
| Uizard | Redundant with v0.dev |
| Websim.ai | Past the prototyping stage |
| Redux / GraphQL / Docker | Overengineered for current scale |
| Bone cosmetics shop | Deferred — build only if user base grows |
| Lesson/content paywalls | Against core identity — never |
| Energy/blocking systems | Against core identity — never |
| Resend email | Add once there's a meaningful user base |
| Custom domain | ~$12/yr — add when ready for Play Store push |
| Leaderboard | Competitive weekly XP ranking contradicts companion-not-judge identity — removed 2026-05-21 |
| Treats currency | Undefined purpose signals future manipulation. Bones only. Removed 2026-05-21 |
| Stars currency | Same as treats. Removed 2026-05-21 |
| Unsplash dynamic image fetch | Adds API dependency and serverless function for a v4 feature. imageUrl lives in words.js, scaffolded empty — 2026-05-21 |
| Definition Match drill in v2/v3 | Core 6 drills are a complete research-justified set. Definition Match is discuss-later — 2026-05-21 |

---

*For pre-Emergent tasks, Windsurf tasks, hosted image URLs, and what to hand Emergent at session start — see PRE-EMERGENT-CHECKLIST.md*
