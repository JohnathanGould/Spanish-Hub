# Spanish Hub — Product Requirements Document

## Original Problem Statement
Migrate and enhance a monolithic vanilla JS/HTML Spanish learning app into a modern React app. Add features for spaced repetition, more drills (gender, preterite, matching), engagement (streaks/XP/daily goals), social (leaderboard), audio for sentences, themed packs, search/filter, word details, category toggles, and PWA offline support — all in a beautiful Spanish-centric design.

## User Personas
- **Beginner / casual learner** wanting bite-sized Spanish drills with progress tracking.
- **Returning learner** needing focused review of weak words via spaced repetition.
- **Competitive learner** motivated by XP, streaks, and a global leaderboard.

## Tech Stack
- **Frontend**: React 19, Tailwind CSS, Shadcn UI primitives, Framer Motion, lucide-react icons.
- **Auth & DB**: Firebase Google Auth + Firestore (collections: `users`, `leaderboard`).
- **Audio**: Web Speech API (`speechSynthesis`).
- **Guest mode**: localStorage persistence (no Firestore).

## Implemented (Feb 2026 — initial MVP)

### Auth
- Firebase Google Auth + **Continue as guest** mode (localStorage-backed).
- Sign-out works for both authenticated and guest users.

### Drills (all 15)
1. Flashcards (tap-to-flip, "knew it"/"still learning")
2. Spanish → English (multiple choice)
3. English → Spanish (multiple choice)
4. Type Sp → En (levenshtein-tolerant)
5. Type En → Sp (levenshtein-tolerant)
6. Conjugation — Present tense
7. **Past tense (Preterite)** — separate drill from #6 ✅
8. **Gender Drill** (el / la) ✅
9. **Matching Game** — tap-to-pair, 6 pairs ✅
10. Word Sort — Spanish (noun/verb/adj/adv/pronoun)
11. Word Sort — English (sentence-context)
12. Hear & Choose (audio prompt → English meaning)
13. Listen & Type (audio prompt → spell back)
14. Sentence Builder (drag-tap word tiles)
15. Fill in the Blank

All drills use **spaced repetition** sort to prioritize weak words.

### Engagement
- Daily streak counter (gold flame, resets on missed day)
- XP system (1 XP per correct + 10 XP bonus on mastery + drill-completion bonus)
- Daily goal — customizable in goal modal, animated progress ring in header
- Session history (last 50 sessions, recent shown in DoneScreen)
- Weekly XP tracked separately for leaderboard

### Usability
- Search/filter in My Words
- Category toggles (13 packs: Food, Family, Travel, Places, Numbers, Days, Months, Colours, Body, Adjectives, Time, Questions, Connectors)
- Word detail modal with example sentence + audio playback + mastery stats
- Mode filters: All / Weak only / Mastered only

### Content
- 200+ master words with example sentences (most have audio-ready Spanish sentence)
- Add custom words (Spanish, English, type, gender)
- Verb conjugation tables (present + preterite, 12+ verbs)

### Social
- Leaderboard: All-time + Weekly tabs (top 20)
- Crown/medal icons for top 3, current user highlighted

### Design
- 660px max-width centered glass container
- Spanish flag bar (red/gold/red) at top of header
- Terracotta plaster wall background (light) / Spanish flag geometric (dark)
- Playfair Display serif headings + Inter body
- Earthy/warm palette (terracotta, cream, ivory, gold accents)
- Framer Motion stagger animation on drill grid

## Backlog (Not Yet Implemented)

### P1 — Engagement & UX
- [ ] Detailed session history view (full list, filterable)
- [ ] Themed preset word packs (e.g., "Travel only", "Restaurant pack") — preset bundles of category toggles
- [ ] More common phrases (greetings, restaurant, emergencies)

### P2 — Social & Offline
- [ ] Curated/shared community word packs
- [ ] PWA + Service Worker for offline support
- [ ] Friend system (optional)
- [ ] Push notifications for daily goal reminders

### P2 — Quality / Refactor
- [ ] Split SpanishHub.jsx (419 lines) into auth/state/routing modules
- [ ] Add data-testid to individual word rows in WordList for deterministic testing
- [ ] Add automated unit tests for spacedRepetitionSort, levenshtein, masteryLevel

## Architecture
```
/app/frontend/src/
├── App.js                    # mounts SpanishHub
├── SpanishHub.jsx            # main orchestrator (auth, state, routing)
├── firebase.js               # Firebase init
├── data/
│   ├── words.js              # MASTER list, NOUN_GROUPS, VERB_TABLE, TOGGLEABLE_CATEGORIES
│   └── drillData.js          # DRILLS, CONJ, PRETERITE, SENT_POOL, FITB_POOL, EN_POOL
├── utils/
│   └── helpers.js            # masteryLevel, spacedRepetitionSort, levenshtein, speak
└── components/
    ├── Header.jsx            # sticky header
    ├── DrillsGrid.jsx        # 15-card grid with mode filters
    ├── DrillRouter.jsx       # dispatches drillId
    ├── DrillShell.jsx        # progress + back-button wrapper
    ├── DoneScreen.jsx        # end-of-drill summary
    ├── WordList.jsx          # search, custom add, category toggles
    ├── WordDetail.jsx        # modal w/ sentence + audio
    ├── CategoryToggles.jsx   # modal w/ 13 packs
    ├── Leaderboard.jsx       # All-time + Weekly tabs
    └── drills/
        ├── FlashcardDrill.jsx
        ├── ChoiceDrill.jsx        # es-en, en-es, hear-choose
        ├── TypeDrill.jsx          # type-es-en, type-en-es, listen-type
        ├── ConjugationDrill.jsx   # present + past
        ├── GenderDrill.jsx
        ├── MatchingDrill.jsx
        ├── WordSortDrill.jsx      # ES + EN
        ├── SentenceBuilderDrill.jsx
        └── FillBlankDrill.jsx
```

## Firestore Schema
```
users/{uid}: {
  displayName, photoURL, customWords[], progress: { [es]: { c, w, s } },
  xp, weeklyXP, weekStart, streak: { count, lastDate },
  dailyGoal, dailyProgress: { count, date }, sessions[], categoryEnabled
}

leaderboard/{uid}: {
  displayName, photoURL, xp, weeklyXP, weekStart, updatedAt
}
```

## Testing
- Iteration 1 (Feb 2026): 100% frontend integration pass via guest mode. All 15 drills, tabs, modals, search, custom words, leaderboard guest banner, daily goal, sign out flows verified.
