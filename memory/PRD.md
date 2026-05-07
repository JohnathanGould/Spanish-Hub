# Spanish Hub — Product Requirements Document

## Original Problem Statement
Migrate and enhance a monolithic vanilla JS/HTML Spanish learning app into a modern React app. Add features for spaced repetition, more drills (gender, preterite, matching), engagement (streaks/XP/daily goals/daily challenges), social (leaderboard, friends, community packs), audio for sentences, themed packs, search/filter, word details, category toggles, **a hand-authored multi-level Spanish course with mastery certificate**, **PWA offline support**, and **pronunciation practice** — all in a beautiful Spanish-centric design. Zero per-user cost (no LLM API calls baked into the runtime).

## User Personas
- **Beginner / casual learner** wanting bite-sized Spanish drills with progress tracking.
- **Returning learner** needing focused review of weak words via spaced repetition.
- **Competitive learner** motivated by XP, streaks, daily challenges, leaderboard, and friends.
- **Self-taught learner** wanting structured lessons with grammar explanations and tips.
- **Community contributor** wanting to publish and import shared word packs.

## Tech Stack
- **Frontend**: React 19, Tailwind, Shadcn UI, Framer Motion, lucide-react.
- **Auth & DB**: Firebase Google Auth + Firestore (`users`, `leaderboard`, `sharedPacks`).
- **Audio out**: Web Speech API (`speechSynthesis`).
- **Audio in**: Web Speech Recognition (Chromium browsers) for pronunciation practice.
- **Notifications**: Browser Notification API for streak reminders (no push backend).
- **Offline**: Custom service worker with cache-first strategy.
- **Guest mode**: localStorage persistence (no Firestore).

## Implemented (Feb 2026)

### Iteration 1 — MVP
- Firebase Google Auth + **guest mode** (localStorage)
- All **15 drills**: Flashcards, Sp↔En (MC + typing), Conjugation present, Preterite, Gender, **Matching (tap-to-pair)**, Word Sort EN/ES, Hear & Choose, Listen & Type, Sentence Builder, Fill in the Blank
- Spaced-repetition word selection in every drill
- Engagement: daily streak, XP, customizable daily goal, session history
- Search/filter, custom words, word detail modal w/ audio + sentence
- Category toggles (13 packs)
- Leaderboard: All-time + Weekly tabs (Firestore)
- Spanish flag bar, terracotta plaster background, Playfair Display, glass-morphism, 660px container

### Iteration 2 — Course + Daily Challenges + Polish
- **300+ word vocabulary** (302 total) — 75 new words + Weather/Animals/Clothing packs (16 categories)
- **The Spanish Course** — 12 hand-authored levels with audio examples, "Pro tip" callouts, one-tap practice drill
- **Two Daily Challenges**: 5 weakest (2× XP) + Theme of the Day rotating (1.5× XP)
- **Session History** tab + **Quick Preset Packs** (Travel/Restaurant/Survival/Beginner/Everything)
- 5-tab navigation (Drills · Learn · Words · Top · History)

### Iteration 3 — Community + Mastery + Offline
- **Refactored**: extracted `LoginScreen.jsx` + `GoalModal.jsx` from SpanishHub (now ~534 lines, well under 700)
- **2 new lessons** → 14-level course total: **Imperfect Past** (L13) + **Future Tense** (L14)
- **Lesson Mastery Certificate**: gorgeous canvas-rendered certificate (Spanish flag bar, gold/red border, Playfair italic, user's name, XP/streak/levels stats) with one-click PNG download + share-text copy. Banner appears on Learn tab when all 14 lessons complete.
- **PWA**: manifest.json + service-worker.js (cache-first for static, network-first for navigation, never caches Firebase) → app fully installable + works offline.
- **Pronunciation Practice**: Web Speech Recognition on each word in WordDetail. Tap "Try saying X" → mic listens → levenshtein-tolerant accuracy check. Graceful fallback for unsupported browsers (Firefox, Safari).
- **Community Shared Packs**: signed-in users can publish their custom word lists (title, desc, words). Browse + import others' packs. Backed by `sharedPacks` Firestore collection. Guest fallback message.
- **Friends System**: deterministic 6-char friend code per user. Add friend by code → friend's XP/avatar shown in Friends sub-tab of Leaderboard. Remove friend with one tap.
- **Streak Reminder**: optional browser notification (toggle in Goal modal). Fires on app open if streak is at risk and user has granted permission. Zero backend, no FCM cost.

### Testing
- Iteration 1: 100% frontend pass (15 drills + tabs + modals)
- Iteration 2: 100% frontend pass (course + daily challenges + presets + history)
- Iteration 3: 100% frontend pass (refactor + 2 new lessons + certificate + PWA + pronunciation + shared packs + friends + reminder)

## Backlog

### P2
- [ ] Indexed `friendCode` field on user docs (current implementation scans full leaderboard)
- [ ] Rate-limit / dedupe SharedPacks publishing
- [ ] Imperfect/Future drill cards (data already in `lessons.js`; need drillData configs)
- [ ] Audio recording playback (record yourself + listen back side-by-side)
- [ ] Custom themed daily challenge selection by user
- [ ] Real push notifications via Firebase Cloud Messaging (requires VAPID setup)

## Architecture
```
/app/frontend/
├── public/
│   ├── index.html              # PWA meta, manifest link, theme-color
│   ├── manifest.json           # PWA manifest
│   ├── service-worker.js       # offline shell + smart cache
│   └── icon.svg                # Spanish-flag SH icon
└── src/
    ├── App.js · index.js (registers SW in production)
    ├── SpanishHub.jsx          # main orchestrator (~534 lines)
    ├── firebase.js
    ├── data/
    │   ├── words.js            # 302 words, NOUN_GROUPS, PRESET_PACKS, 16 TOGGLEABLE_CATEGORIES
    │   ├── drillData.js        # CONJ, PRETERITE, SENT_POOL, FITB_POOL, EN_POOL
    │   └── lessons.js          # LESSONS (14), DAILY_THEMES (7-day rotation)
    ├── utils/helpers.js        # masteryLevel, spacedRepetitionSort, levenshtein, speak
    └── components/
        ├── LoginScreen.jsx     # Google + Guest CTAs
        ├── GoalModal.jsx       # daily goal + reminder toggle
        ├── Header.jsx
        ├── DrillsGrid.jsx · DrillRouter.jsx · DrillShell.jsx · DoneScreen.jsx
        ├── DailyChallenge.jsx  # 2 daily cards
        ├── LessonsList.jsx     # 14-lesson list + certificate banner
        ├── LessonView.jsx
        ├── Certificate.jsx     # canvas-rendered + PNG download + share
        ├── SessionHistory.jsx
        ├── WordList.jsx        # search + community btn
        ├── WordDetail.jsx      # sentence + audio + pronunciation practice
        ├── CategoryToggles.jsx # presets + 16 categories
        ├── SharedPacks.jsx     # browse + publish + import
        ├── Leaderboard.jsx     # all-time + weekly + friends sub-tab
        ├── FriendsList.jsx     # friend code + add + list
        └── drills/             # 9 drill components handling all 15 drill IDs
```

## Firestore Schema
```
users/{uid}: {
  displayName, photoURL, customWords[], progress: { [es]: { c, w, s } },
  xp, weeklyXP, weekStart, streak: { count, lastDate },
  dailyGoal, dailyProgress: { count, date }, sessions[],
  categoryEnabled, lessonsCompleted: string[],
  dailyChallenges: { date, weakDone, themeDone },
  friends: string[], reminderEnabled: boolean
}

leaderboard/{uid}: {
  displayName, photoURL, xp, weeklyXP, weekStart, updatedAt
}

sharedPacks/{packId}: {
  title, description, authorId, authorName,
  words: [{ es, en, type, gender }], wordCount, createdAt
}
```
