# Spanish Hub — Product Requirements Document

## Original Problem Statement
Migrate and enhance a monolithic vanilla JS/HTML Spanish learning app into a modern React app. Add features for spaced repetition, more drills (gender, preterite, matching), engagement (streaks/XP/daily goals/daily challenges), social (leaderboard), audio for sentences, themed packs, search/filter, word details, category toggles, **a hand-authored multi-level Spanish course**, and PWA offline support — all in a beautiful Spanish-centric design. Zero per-user cost (no LLM API calls baked into the runtime).

## User Personas
- **Beginner / casual learner** wanting bite-sized Spanish drills with progress tracking.
- **Returning learner** needing focused review of weak words via spaced repetition.
- **Competitive learner** motivated by XP, streaks, daily challenges, and a global leaderboard.
- **Self-taught learner** wanting structured lessons with grammar explanations and tips.

## Tech Stack
- **Frontend**: React 19, Tailwind, Shadcn UI, Framer Motion, lucide-react.
- **Auth & DB**: Firebase Google Auth + Firestore (`users`, `leaderboard`).
- **Audio**: Web Speech API.
- **Guest mode**: localStorage persistence (no Firestore).

## Implemented (Feb 2026)

### Iteration 1 — MVP
- Firebase Google Auth + **guest mode** (localStorage)
- All **15 drills**: Flashcards, Sp↔En (MC + typing), Conjugation present, **Preterite**, **Gender**, **Matching (tap-to-pair)**, Word Sort EN/ES, Hear & Choose, Listen & Type, Sentence Builder, Fill in the Blank
- Spaced-repetition word selection in every drill
- Engagement: daily streak, XP, customizable daily goal w/ animated progress ring, session history
- Search/filter, custom words, word detail modal w/ audio + sentence
- Category toggles (13 packs)
- Leaderboard: All-time + Weekly tabs (Firestore)
- Spanish flag bar, terracotta plaster background, Playfair Display, glass-morphism, 660px container

### Iteration 2 — Course + Daily Challenges + Polish
- **300+ word vocabulary** (302 total) — added 75 words across existing categories + new **Weather**, **Animals**, **Clothing** packs.
- **The Spanish Course** — 12 hand-authored levels building progressively:
  1. Greetings & Politeness · 2. Articles & Gender · 3. Subject Pronouns · 4. Present -AR Verbs · 5. Present -ER/-IR Verbs · 6. Ser vs Estar · 7. Asking Questions · 8. Numbers, Days & Time · 9. Travel Survival Phrases · 10. Preterite Past Tense · 11. Connectors & Sounding Fluent · 12. Tips for Real Mastery
  - Each lesson has explanations, audio examples, "Pro tip" callouts, and a one-tap "Practice these words" flashcard drill.
  - Completion gives 15 XP bonus and unlocks the next level visually.
- **Two Daily Challenges** (per-calendar-day):
  - 🔥 **5 weakest words** — multiple choice, 2× XP
  - ✨ **Theme of the Day** (rotates by weekday: Family Sun · Travel Mon · Food Tue · Places Wed · Body Thu · Time Fri · Adjectives Sat) — flashcard sprint, 1.5× XP
- **Session History tab** — full filterable timeline of every drill (last 50)
- **Quick Preset Packs** in category modal — Everything · Travel · Restaurant · Survival 101 · Beginner
- 5-tab navigation: Drills · Learn · Words · Top · History

### Testing
- Iteration 1: 100% frontend pass (all 15 drills + tabs + modals)
- Iteration 2: 100% frontend pass (all new features verified — 12 lessons, 2 daily challenges with multipliers, presets, history, 5-tab nav)

## Backlog

### P2 — Quality & Reach
- [ ] PWA + Service Worker for offline support
- [ ] Curated/shared community word packs (Firestore)
- [ ] Friend system + push notifications for streaks
- [ ] Refactor SpanishHub.jsx (~530 lines): extract LoginScreen + GoalModal
- [ ] Add data-testids to individual word rows for deterministic testing
- [ ] Imperfect past tense lesson + drill (Lesson 13)
- [ ] Future tense lesson + drill (Lesson 14)
- [ ] Audio recording for pronunciation comparison

## Architecture
```
/app/frontend/src/
├── App.js
├── SpanishHub.jsx              # main orchestrator
├── firebase.js
├── data/
│   ├── words.js                # MASTER (302), NOUN_GROUPS, PRESET_PACKS, TOGGLEABLE_CATEGORIES
│   ├── drillData.js            # DRILLS, CONJ, PRETERITE, SENT_POOL, FITB_POOL, EN_POOL
│   └── lessons.js              # LESSONS (12), DAILY_THEMES (7-day rotation)
├── utils/
│   └── helpers.js              # masteryLevel, spacedRepetitionSort, levenshtein, speak
└── components/
    ├── Header.jsx
    ├── DrillsGrid.jsx
    ├── DrillRouter.jsx
    ├── DrillShell.jsx
    ├── DoneScreen.jsx
    ├── DailyChallenge.jsx      # 2 daily challenge cards on Drills tab
    ├── LessonsList.jsx         # 12-lesson list with progress banner
    ├── LessonView.jsx          # lesson body renderer (p/h/examples/rules/tip)
    ├── SessionHistory.jsx      # full session timeline
    ├── WordList.jsx
    ├── WordDetail.jsx
    ├── CategoryToggles.jsx     # presets + 16 categories
    ├── Leaderboard.jsx
    └── drills/                 # 9 drill components handling all 15 drill IDs
```

## Firestore Schema
```
users/{uid}: {
  displayName, photoURL, customWords[], progress: { [es]: { c, w, s } },
  xp, weeklyXP, weekStart, streak: { count, lastDate },
  dailyGoal, dailyProgress: { count, date },
  sessions[], categoryEnabled,
  lessonsCompleted: string[],
  dailyChallenges: { date, weakDone, themeDone }
}

leaderboard/{uid}: {
  displayName, photoURL, xp, weeklyXP, weekStart, updatedAt
}
```
