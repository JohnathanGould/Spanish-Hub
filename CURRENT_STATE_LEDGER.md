# CURRENT_STATE_LEDGER.md
# Milo Speaks Spanish — Compressed Project Memory
*Paste this into any new chat session. Update after every milestone.*
*Last updated: 2026-06-01*

---

## THE APP
- **Name:** Milo Speaks Spanish
- **Live URL:** spanish-hub-zeta.vercel.app
- **Repo:** github.com/JohnathanGould/Spanish-Hub (johnathangould@gmail.com)
- **Stack:** React + Tailwind + CRACO / Firebase Auth + Firestore / Gemini 2.5 Flash / Vercel
- **Firebase project:** my-spanish-hub — northamerica-northeast1 (Montreal)
- **Current MEOS stage:** Stabilize (Stage 3) — bugs fixed, moving to Learn phase

---

## NAVIGATION (confirmed)
5 tabs: **Home · Learn · My Words · Study · Talk to Milo**
- Home = default landing tab
- Learn = Paths curriculum (replaces 14 lessons)
- My Words = vocabulary browser
- Study = drill hub (Warm Up / Practice / Review sub-tabs)
- Talk to Milo = Gemini AI chat

**Internal tab IDs:** `home`, `learn`, `words`, `drills` (rename pending → `study`), `sofia` (renamed → `milo`)

---

## DRILL STRUCTURE (confirmed, research-backed)

### Study tab — 3 sub-tabs: Warm Up · Practice · Review

**Practice** — bones + XP earned:
1. Fill in the Blank
2. Type It — EN→SP direction, toggle to SP→EN
3. Listen & Type — word/sentence toggle (sentence locked until contextSentence populated)
4. Sentence Builder
5. Conjugation
6. Multiple Choice — EN→SP default, toggle to SP→EN

**Review** — no bones, no XP:
- Flashcard (word) — active retrieval with self-rating, FSRS-scored
- Flashcard (sentence) — locked until contextSentence populated

**Warm Up** — no bones, no XP:
- Matching
- Hear & Choose
- Gender Drill — no gender color coding (strips the crutch)

**Removed from drill set:**
- Word Sort — semantic interference (research)
- Type It SP→EN — trains translation reflex wrong direction
- Translate drill — removed entirely

**Fetch** — embedded in every Stop. Uses FSRS `due` date for word selection. Defaults to 6 Practice drills. FSRS may surface Warm Up/Review drill for persistently difficult words (individual cognitive architecture adaptation).

---

## LEARNING ARCHITECTURE (confirmed)

**FSRS** (ts-fsrs npm library) — confirmed for Learn phase
- Fields per word per user: `stability`, `difficulty`, `due`, `lastReview`
- Rating inferred from drill performance — never shown to user
- Handles 80/20 session composition automatically
- `due` date drives Fetch word selection

**Three mastery tiers:** Learning → Strong → Mastered
- Mastery requires success on at least one Practice drill (not recognition alone)
- Stop hard-gates on at least one Practice drill attempt

**No-English rule:** English is never the primary retrieval trigger after Phase 1 introduction. Image + audio + Spanish word → active production.

**Contextual Binding:** After correct answer on any Practice drill, word shown in contextSentence for 2–3 seconds. Practice drills only — not Warm Up.

**3-strike retry system:** 1st wrong = try again, 2nd wrong = try again + hint, 3rd wrong = reveal answer. Research-supported (retrieval attempt effect + hypercorrection effect).

**Hint system (Flashcard):** Hint 1 → image, Hint 2 → multiple choice, Show Answer. FSRS rating: no hints = Good, image hint = Hard, choice hint = Again.

**Paths structure:** 5 Paths × 5 Stops × ~5 words. A1–A2. paths.js complete. contextSentence populated for all 300 words. theme values assigned. imageUrl scaffolded empty.

---

## FIRESTORE SCHEMA (confirmed)

```
users/{uid}:
  displayName: string          — from Firebase Auth
  photoURL: string|null        — from auth.currentUser.photoURL
  xp: number                   — permanent, never resets
  weeklyXP: number             — resets weekly
  streak: number
  dailyGoal: number
  bones: number                — spendable currency
  earnedBadges: string[]
  completedStops: string[]
  completedPaths: string[]
  lessonsCompleted: string[]
  friends: string[]            — hidden from UI in v2/v3, active in v4
  audioListenEnabled: boolean
  audioSpeakEnabled: boolean
  customWords: array           — user word list (Add to word list feature)
  progress: {
    es: {
      [wordId]: {
        c: number,             — correct answers
        w: number,             — wrong answers
        s: number,             — confidence score
        stability: number,     — FSRS field
        difficulty: number,    — FSRS field
        due: string,           — FSRS next review date
        lastReview: string     — FSRS last review date
      }
    }
  }

leaderboard/{uid}: displayName, photoURL, xp, weeklyXP
chatUsage/{uid}: count, date   — 30 msg/day limit
plaza/{postId}: uid, displayName, text, timestamp, likes  — Plaza removed from nav but data preserved
```

**Parent Fan-Out pattern always:** SpanishHub.jsx is the ONLY file that reads/writes Firestore.

---

## REWARDS ECONOMY (confirmed)

### Bones — earning
- 1 bone per correct Practice tier answer
- Stop completed: 5 bones (loot drop)
- Path completed: 15 bones (loot drop)
- Break Free success: 25 bones (loot drop)
- Fetch session completed: 8 bones (loot drop)
- Sub-level completed: 50 bones
- Tier capstone: 100 bones
- Streak freeze deduction: 5 bones per missed day (stackable)

### Bones — spending
- Skip a question: 5 bones
- Streak freeze: 30 bones
- Milo skin 50% off: 50 bones — $2.00 becomes $1.00 (min $1.00 paid)
- Companion character 50% off: 200 bones — $9.99 becomes $4.99 (min $4.99 paid)
- Bones NEVER make anything free — minimum payment always applies

### XP
- D&D personal growth model — never competitive
- 1 XP per correct Practice answer + event bonuses
- Permanent, never resets, never spent
- Drives milestone badges

---

## COMPANION CHARACTERS (confirmed)

Milo's real family. Purchasable characters. Appear in Fetch once purchased.
Each assigned to one Practice drill. Molly appears randomly across all 6.

| Character | Species | Assigned drill |
|---|---|---|
| Ruby | Dog 🐕 | Fill in the Blank — BUILD FIRST |
| Lola | Dog 🐕 | Type It |
| Junny | Dog 🐕 | Listen & Type |
| Maz | Cat 🐈 | Sentence Builder |
| Bela | Cat 🐈 | Conjugation |
| Delilah | Cat 🐈 | Multiple Choice EN→SP |
| Molly | Cat 🐈 | All drills — random, rare. Died one month before Milo. |

Maz, Delilah, Molly adopted from NS SPCA Colchester (same shelter that gets 10% charity share).

---

## BREAK FREE — ¡LIBRE! (confirmed)
- Trigger: Path completion
- Version A: countdown timer speed round
- Milo strains at chain — chain snaps — Milo runs free
- Success: 25 bones loot drop + Unchained badge
- Failure: no penalty, gentle message
- Spanish name: ¡Libre!
- Emergent task — Milo straining + free-running poses must exist first

---

## CHARITABLE MODEL (confirmed, not yet public)
80% of net surplus to 4 CRA-registered charities. 20% to developer.

| Charity | % |
|---|---|
| NS SPCA Colchester | 10% |
| ElderDog Canada | 15% |
| Room to Read Canada | 25% |
| UNHCR Canada | 25% |

Goes public only after: app stable on Play Store, 1,000+ MAU for 60 days, revenue generating, first distribution made.

---

## PRODUCT IDENTITY (non-negotiables)
- No energy systems, no lesson locks, no pay-to-learn. Ever.
- No interruptive ads. Ever.
- Bones earned, never purchased.
- "Free to learn" — not "always free"
- Code uses generic vars: mascotName, mascotMessage, companionReaction
- Language-agnostic content files from day one

---

## ARCHITECTURE RULES
- SpanishHub.jsx = single source of truth. All global state lives here.
- v0 components in src/components/v0/ — never edit directly. Wrapper Pattern only.
- Never modify without dedicated session: Firebase Auth logic, api/chat.js, Firestore security rules.
- Fixed modals/overlays render OUTSIDE app-container (backdrop-filter traps position:fixed children).
- git push triggers Vercel auto-deploy. Never npx vercel --prod.
- Before Cursor Composer: git commit checkpoint. Roll back with git checkout .

---

## GIT WORKFLOW
- Terminal: use VS Code or Cursor terminal for git add/commit
- Push: GitHub Desktop (SSL broken in Cursor terminal for push)
- PowerShell: use separate commands, not && chaining

---

## STABILIZE — COMPLETED (as of 2026-05-30)
- ✅ Leaderboard removed entirely
- ✅ Plaza, Trans, Top, Log tabs removed from navigation
- ✅ Treats removed from DEFAULT_DATA
- ✅ Navigation cleaned: Home · Learn · My Words · Study · Talk to Milo
- ✅ WordSort drill removed
- ✅ Sofia → Milo rename complete
- ✅ ts-fsrs installed, FSRS fields added to DEFAULT_DATA
- ✅ completedStops[], completedPaths[] added to DEFAULT_DATA
- ✅ contextSentence populated for all 300 words
- ✅ theme values assigned for all 300 words
- ✅ 11 drill fixes shipped (Task 8A)
- ✅ BottomNav wired — outside app-container
- ✅ WordDetail modal fixed — viewport centered
- ✅ DrillsGrid restructured — three tiers
- ✅ Study tab options screen built
- ✅ HomeTab wired — daily challenges moved to home
- ✅ DoneScreen scroll fix + button colours
- ✅ Word mastery filter — tappable stat boxes
- ✅ Ko-fi button on home screen
- ✅ Correct + Almost audio feedback wired
- ✅ Vercel auto-deploy confirmed working
- ✅ Firebase emulator set up — Auth port 9099, Firestore port 8080
- ✅ .gitignore cleaned
- ✅ CURRENT_STATE_LEDGER.md created at repo root

---

## STABILIZE — STILL OPEN
- [ ] Listen & Type — translation display + sentence toggle
- [ ] Hear & Choose — show Spanish spelling after selection
- [ ] Type It — hear word + sentence toggle
- [ ] Fill in the Blank — listen button after completion
- [ ] Conjugation drill — verb type filter toggles
- [ ] Add theme tag field to Add Word form
- [ ] Milo vocabulary awareness fix (test in AI Studio first)
- [ ] Log tab — implement decision (keep/rename/remove)
- [ ] DrillsGrid redesign — full spec and Emergent brief pending
- [ ] Word detail page — full page spec written ✅, Emergent build pending
- [ ] v0 components: MiloHeader, ProfileSheet, BadgeGrid — review and regenerate if needed

---

## DOCUMENTS PRODUCED (save all to repo root)
- MILO_FIREBASE_STRUCTURE.md — in repo
- MILO_WORD_DETAIL_PAGE_SPEC.md — in repo
- MILO_TERMS_AND_PRIVACY.md — in repo
- MILO_BONES_LOGIC_SPEC.md — in repo
- FSRS-SCHEMA-SPEC.md — from previous sessions
- PATHS-STATE-LEDGER.md — from previous sessions
- MILO-MASTER-REFERENCE.md — from previous sessions
- MILO-DRILL-PROTOCOLS.md — from previous sessions
- MILO-REWARDS-ECONOMY.md — from previous sessions
- MILO-CURRICULUM-ARCHITECTURE.md — from previous sessions
- PATHS-LEARNING-DESIGN.md — from previous sessions
- MILO-IMAGE-PROMPTS.md — from previous sessions

---

## NEXT SESSION — FIRST TASK
DrillsGrid redesign spec + Emergent brief. Full drill inventory confirmed. Ready to write.

---
*Update this file after every milestone. Paste into every new chat session.*
