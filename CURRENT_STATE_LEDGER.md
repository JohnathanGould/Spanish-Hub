# CURRENT_STATE_LEDGER.md
# Milo Speaks Spanish â Compressed Project Memory
*Paste this into any new chat session. Update after every milestone.*
*Last updated: 2026-06-01*

---

## THE APP
- **Name:** Milo Speaks Spanish
- **Live URL:** spanish-hub-zeta.vercel.app
- **Repo:** github.com/JohnathanGould/Spanish-Hub (johnathangould@gmail.com)
- **Stack:** React + Tailwind + CRACO / Firebase Auth + Firestore / Gemini 2.5 Flash / Vercel
- **Firebase project:** my-spanish-hub â northamerica-northeast1 (Montreal)
- **Current MEOS stage:** Stabilize (Stage 3) â bugs fixed, moving to Learn phase

---

## NAVIGATION (confirmed)
5 tabs: **Home Â· Learn Â· My Words Â· Study Â· Talk to Milo**
- Home = default landing tab
- Learn = Paths curriculum (replaces 14 lessons)
- My Words = vocabulary browser
- Study = drill hub (Warm Up / Practice / Review sub-tabs)
- Talk to Milo = Gemini AI chat

**Internal tab IDs:** `home`, `learn`, `words`, `drills` (rename pending â `study`), `milo` (renamed from `sofia` â)

---

## DRILL STRUCTURE (confirmed, research-backed)

### Study tab â 3 sub-tabs: Warm Up Â· Practice Â· Review

**Practice** â bones + XP earned:
1. Fill in the Blank
2. Type It â ENâSP direction, toggle to SPâEN
3. Listen & Type â word/sentence toggle (sentence locked until contextSentence populated)
4. Sentence Builder
5. Conjugation
6. Multiple Choice â ENâSP default, toggle to SPâEN

**Review** â no bones, no XP:
- Flashcard (word) â active retrieval with self-rating, FSRS-scored
- Flashcard (sentence) â locked until contextSentence populated

**Warm Up** â no bones, no XP:
- Matching
- Hear & Choose
- Gender Drill â no gender color coding (strips the crutch)

**Removed from drill set:**
- Word Sort â semantic interference (research)
- Type It SPâEN â trains translation reflex wrong direction
- Translate drill â removed entirely

**Fetch** â embedded in every Stop. Uses FSRS `due` date for word selection. Defaults to 6 Practice drills. FSRS may surface Warm Up/Review drill for persistently difficult words (individual cognitive architecture adaptation).

---

## LEARNING ARCHITECTURE (confirmed)

**FSRS** (ts-fsrs npm library) â confirmed for Learn phase
- Fields per word per user: `stability`, `difficulty`, `due`, `lastReview`
- Rating inferred from drill performance â never shown to user
- Handles 80/20 session composition automatically
- `due` date drives Fetch word selection

**Three mastery tiers:** Learning â Strong â Mastered
- Mastery requires success on at least one Practice drill (not recognition alone)
- Stop hard-gates on at least one Practice drill attempt

**No-English rule:** English is never the primary retrieval trigger after Phase 1 introduction. Image + audio + Spanish word â active production.

**Contextual Binding:** After correct answer on any Practice drill, word shown in contextSentence for 2â3 seconds. Practice drills only â not Warm Up.

**3-strike retry system:** 1st wrong = try again, 2nd wrong = try again + hint, 3rd wrong = reveal answer. Research-supported (retrieval attempt effect + hypercorrection effect).

**Hint system (Flashcard):** Hint 1 â image, Hint 2 â multiple choice, Show Answer. FSRS rating: no hints = Good, image hint = Hard, choice hint = Again.

**Paths structure:** 5 Paths Ã 5 Stops Ã ~5 words. A1âA2. paths.js complete. contextSentence populated for all 300 words. theme values assigned. imageUrl scaffolded empty.

---

## FIRESTORE SCHEMA (confirmed)

```
users/{uid}:
  displayName: string          â from Firebase Auth
  photoURL: string|null        â from auth.currentUser.photoURL
  xp: number                   â permanent, never resets
  weeklyXP: number             â resets weekly
  streak: number
  dailyGoal: number
  bones: number                â spendable currency
  earnedBadges: string[]
  completedStops: string[]
  completedPaths: string[]
  lessonsCompleted: string[]
  friends: string[]            â hidden from UI in v2/v3, active in v4
  audioListenEnabled: boolean
  audioSpeakEnabled: boolean
  customWords: array           â user word list (Add to word list feature)
  votedRequests: string[]      â IDs of customWordRequests upvoted by this user (prevents duplicate votes)
  approvedRequestCount: number â approved word requests count (drives Pioneer badge logic)
  progress: {
    es: {
      [wordId]: {
        c: number,             â correct answers
        w: number,             â wrong answers
        s: number,             â confidence score
        stability: number,     â FSRS field
        difficulty: number,    â FSRS field
        due: string,           â FSRS next review date
        lastReview: string     â FSRS last review date
      }
    }
  }

customWordRequests/{docId}: es, en, uid, contributorName, timestamp, count, votes, exampleSentence, status, approvedDate
  â community word requests. count = how many users want it. votes = upvotes.
  â status: pending / approved / rejected
  â on approval: 5 bones + Pioneer badge awarded to requester
  â approved words auto-upgrade all users' custom word entries to full cards
  â Words tab Community sub-tab shows Requested / Recently Added / Pioneers sections

leaderboard/{uid}: displayName, photoURL, xp, weeklyXP
chatUsage/{uid}: count, date   â 30 msg/day limit
plaza/{postId}: uid, displayName, text, timestamp, likes  â Plaza removed from nav but data preserved
```

**Parent Fan-Out pattern always:** SpanishHub.jsx is the ONLY file that reads/writes Firestore.

---

## REWARDS ECONOMY (confirmed)

### Bones â earning
- 1 bone per correct Practice tier answer
- Stop completed: 5 bones (loot drop)
- Path completed: 15 bones (loot drop)
- Break Free success: 25 bones (loot drop)
- Fetch session completed: 8 bones (loot drop)
- Sub-level completed: 50 bones
- Tier capstone: 100 bones
- Streak freeze deduction: 5 bones per missed day (stackable)

### Bones â spending
- Skip a question: 5 bones
- Streak freeze: 30 bones
- Milo skin 50% off: 50 bones â $2.00 becomes $1.00 (min $1.00 paid)
- Companion character 50% off: 200 bones â $9.99 becomes $4.99 (min $4.99 paid)
- Bones NEVER make anything free â minimum payment always applies

### XP
- D&D personal growth model â never competitive
- 1 XP per correct Practice answer + event bonuses
- Permanent, never resets, never spent
- Drives milestone badges

---

## COMPANION CHARACTERS (confirmed)

Milo's real family. Purchasable characters. Appear in Fetch once purchased.
Each assigned to one Practice drill. Molly appears randomly across all 6.

| Character | Species | Assigned drill |
|---|---|---|
| Ruby | Dog ð | Fill in the Blank â BUILD FIRST | Rescue â Texas |
| Lola | Dog ð | Type It | Rescue â Texas |
| Junny | Dog ð | Listen & Type | Rescue â Texas |
| Maz | Cat ð | Sentence Builder | NS SPCA Colchester |
| Bela | Cat ð | Conjugation | From a litter â friend's cat |
| Delilah | Cat ð | Multiple Choice ENâSP | NS SPCA Colchester |
| Molly | Cat ð | All drills â random, rare. Died one month before Milo. | NS SPCA Colchester |

Maz, Delilah, Molly adopted from NS SPCA Colchester (same shelter that gets 10% charity share).

---

## BREAK FREE â Â¡LIBRE! (confirmed)
- Trigger: Path completion
- Version A: countdown timer speed round
- Milo strains at chain â chain snaps â Milo runs free
- Success: 25 bones loot drop + Unchained badge
- Failure: no penalty, gentle message
- Spanish name: Â¡Libre!
- Emergent task â Milo straining + free-running poses must exist first

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
- "Free to learn" â not "always free"
- Code uses generic vars: mascotName, mascotMessage, companionReaction
- Language-agnostic content files from day one

---

## ARCHITECTURE RULES
- SpanishHub.jsx = single source of truth. All global state lives here.
- v0 components in src/components/v0/ â never edit directly. Wrapper Pattern only.
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

## STABILIZE â COMPLETED (as of 2026-05-30)
- â Leaderboard removed entirely
- â Plaza, Trans, Top, Log tabs removed from navigation
- â Treats removed from DEFAULT_DATA
- â Navigation cleaned: Home Â· Learn Â· My Words Â· Study Â· Talk to Milo
- â WordSort drill removed
- â Sofia â Milo rename complete
- â ts-fsrs installed, FSRS fields added to DEFAULT_DATA
- â completedStops[], completedPaths[] added to DEFAULT_DATA
- â contextSentence populated for all 300 words
- â theme values assigned for all 300 words
- â 11 drill fixes shipped (Task 8A)
- â BottomNav wired â outside app-container
- â WordDetail modal fixed â viewport centered
- â DrillsGrid restructured â three sub-tabs Warm Up / Practice / Review
- â Study tab options screen removed from SpanishHub.jsx (sub-tabs now internal to DrillsGrid)
- â Drill length selector restored (4/6/8/10 for Matching, 10/20/30 for all others)
- â Flashcard sentence routing fixed in DrillRouter
- â HomeTab wired â daily challenges moved to home
- â DoneScreen scroll fix + button colours
- â Word mastery filter â tappable stat boxes
- â Ko-fi button on home screen
- â Correct + Almost audio feedback wired
- â Vercel auto-deploy confirmed working
- â Firebase emulator set up â Auth port 9099, Firestore port 8080
- â .gitignore cleaned
- â CURRENT_STATE_LEDGER.md created at repo root

---

## STABILIZE â STILL OPEN
- [ ] **Bones earn logic â NEXT SESSION** â Practice drills must increment `userData.bones` in Firestore after correct answer. Confirm if ever built or is a fresh task. Wire into DrillShell or SpanishHub.jsx as appropriate.
- [ ] Listen & Type â translation display + sentence toggle
- [ ] Hear & Choose â show Spanish spelling after selection
- [ ] Type It â hear word + sentence toggle
- [ ] Fill in the Blank â listen button after completion
- [ ] Conjugation drill â verb type filter toggles
- [ ] Add theme tag field to Add Word form
- [ ] Milo vocabulary awareness fix (test in AI Studio first)
- [ ] Log tab â implement decision (keep/rename/remove)
- [ ] Word detail page â full page spec written â, Emergent build pending
- [ ] v0 components: MiloHeader, ProfileSheet, BadgeGrid â review and regenerate if needed

---

## DOCUMENTS PRODUCED (save all to repo root)
- MILO_FIREBASE_STRUCTURE.md â in repo
- MILO_WORD_DETAIL_PAGE_SPEC.md â in repo
- MILO_TERMS_AND_PRIVACY.md â in repo
- MILO_BONES_LOGIC_SPEC.md â in repo
- MILO_COMMUNITY_WORD_SPEC.md â in repo
- DRILLSGRID_REDESIGN_SPEC.md â in repo
- MILO_ADMIN_DASHBOARD_SPEC.md â saved locally in Milo folder (move to milo-admin repo at 500 MAU)
- FSRS-SCHEMA-SPEC.md â from previous sessions
- PATHS-STATE-LEDGER.md â from previous sessions
- MILO-MASTER-REFERENCE.md â from previous sessions
- MILO-DRILL-PROTOCOLS.md â from previous sessions
- MILO-REWARDS-ECONOMY.md â in repo
- MILO-CURRICULUM-ARCHITECTURE.md â from previous sessions
- PATHS-LEARNING-DESIGN.md â from previous sessions
- MILO-IMAGE-PROMPTS.md â in repo

---

## FUTURE APPS & SPECS
- **Milo Admin Dashboard** â spec saved locally in Milo folder on laptop. Move to `milo-admin` repo when created. Build trigger: 500 MAU on Play Store.
- **Milo Speaks Code (Dev Dashboard)** â spec in action list. Separate brand, separate repo, separate audience. Build after Spanish app is stable.
- **Milo Speaks French / Italian / etc.** â same Firebase project, new repo per language. Universal Concept IDs needed before second language starts.

---

## SESSION CLOSE — 2026-06-02

**Completed this session:**
- Full drill sweep: Gender, Flashcard, Fill in the Blank, Type It, Listen & Type, Conjugation, Multiple Choice, Matching, Sentence Builder — all audio/reveal fixes shipped
- Sentence flashcard mode built and wired into FlashcardDrill.jsx and DrillsGrid
- GenderDrill colour states redesigned — correct always green, noun container turns gender colour on reveal
- HomeTab rebuilt — Milo hero card, stat cards (Continue / Daily Goal / Words Mastered), Word of Day, Daily Challenges, Ko-fi button
- ProfileSheet built in plain JSX — stats, badges row, audio toggles, daily goal, notifications, sign out
- BadgeGrid built — 43 badges across 8 categories, earned/locked tiles, stackable counter
- Badge earn logic in evaluateBadges.js — pure function, idempotent, wired into recordAnswer and onDrillDone
- Bones display added to Header
- Chat/Translate toggle in MiloChat — direction swap, voice input respects direction, fixed bottom layout
- vercel dev configured for local API testing
- .env file populated with all API keys
- Translation confirmed working end to end via DeepL

**Bugs added:**
- None

**Decisions made:**
- Badge model A (stacked ×N counter) for all badges except Milo Monday (annual collectible)
- Mastery badges track all MASTER words not path-only words
- Founding Paw badge implemented — awarded before 1,000 MAU
- Ko-fi badges skipped until webhook is built
- Hidden badges show as 🔒 mystery tiles

**Architecture notes:**
- vercel dev required for local API testing (not npm start)
- .env file at frontend/.env (not .env.local — vercel dev ignores .env.local)
- All debug logs removed from api/translate-deepl.js and MiloChat.jsx
- GoalModal renders outside ProfileSheet to avoid stacking context trap

**First task next session:**
Commit and push all changes to GitHub, then confirm production deploy to Vercel is live.

---
*Update this file after every milestone. Paste into every new chat session.*
