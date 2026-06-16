# Milo Speaks Spanish — Bones Logic Spec
*Complete specification for the bones economy. Reference for all Emergent and Cursor sessions touching bones, rewards, or the cosmetics shop.*

---

## What Bones Are
Bones are Milo's primary reward currency. They are earned through practice — never purchased. They represent genuine effort and dedication. Every spend mechanic has a minimum real-money component — bones never make anything completely free.

---

## Earning Bones

### Practice Drills — base earn rate
Bones are awarded on drill completion, not per correct answer.

| Drill | Bones earned |
|---|---|
| Fill in the Blank | 1 bone |
| Type It (EN→SP) | 1 bone |
| Listen & Type | 1 bone |
| Sentence Builder | 1 bone |
| Conjugation | 1 bone |
| Multiple Choice EN→SP | 1 bone |

### No bones — passive or warm-up activities
| Activity | Bones |
|---|---|
| Flashcard (word or sentence) | 0 — passive review |
| Hear & Choose | 0 — recognition only |
| Multiple Choice SP→EN | 0 — weak retrieval direction |
| Matching | 0 — warm-up only |

### Bonus bones
| Event | Bones earned |
|---|---|
| Break Free success (¡Libre!) | 5 bones |
| Path completion | 10 bones |
| Stop completion | 3 bones |
| Daily goal met | 2 bones |
| 7-day streak milestone | 5 bones |

### Loot drops
Random bonus bones awarded after drill completion. Keeps the economy feeling alive and unpredictable.

| Drop | Probability | Bones |
|---|---|---|
| Small loot drop | 15% per drill | 2 bones |
| Medium loot drop | 5% per drill | 5 bones |
| Rare loot drop | 1% per drill | 10 bones |

Only one loot drop can occur per drill session. Loot drops stack on top of base earn — they are not a replacement.

---

## Spending Bones

### 1. Skip a question — 5 bones
Appears as a "Skip 🦴" button during any Practice drill question. Costs 5 bones per skip. Skipped questions do not count as wrong — they are simply passed. Bones are deducted immediately on tap. Button is hidden if the user has fewer than 5 bones.

### 2. Streak freeze — 30 bones
Protects the user's streak for one missed day. Purchasable from the Settings or Profile screen. One freeze active at a time. Consumed automatically when a day is missed. If no freeze is active and a day is missed, streak resets to 0. Bones are deducted at purchase, not at use.

### 3. Companion character — 50% discount
Full price: $9.99. With 200 bones: $4.99 (50% off).
Bones are spent at checkout — deducted when the discounted purchase is confirmed.
Bones never make a companion free. Minimum payment is always $4.99.
First companion to unlock: **Ruby** 🐕

### 4. Milo skin — 50% discount
Full price: $2.00. With 50 bones: $1.00 (50% off).
Same mechanic as companion discount — bones spent at checkout.
Bones never make a skin free. Minimum payment is always $1.00.

---

## Companion Characters

Once purchased, companions appear in Fetch. Each is assigned to one of the 6 main Practice drills and appears as the guide/host when that drill type launches.

| Character | Species | Assigned drill |
|---|---|---|
| **Ruby** | Dog 🐕 | Fill in the Blank — *first to build* |
| **Lola** | Dog 🐕 | Type It |
| **Junny** | Dog 🐕 | Listen & Type |
| **Maz** | Cat 🐈 | Sentence Builder |
| **Bela** | Cat 🐈 | Conjugation |
| **Delilah** | Cat 🐈 | Multiple Choice EN→SP |
| **Molly** | Cat 🐈 | *All drills — appears randomly across all 6. She died one month before Milo.* |

**Molly mechanic:** Molly has no assigned drill. Instead she appears randomly across all 6 drill types at a low probability when unlocked. Her appearances are intentionally unpredictable — a surprise visit from a beloved character. She is the rarest companion to encounter during a session.

---

## Firestore — Bones Field
```
users/{uid}: {
  bones: number   // current bone count, never negative
}
```

**Write rules:**
- Earn: increment `bones` after drill completion — written via SpanishHub.jsx handler
- Spend: decrement `bones` at point of spend — written via SpanishHub.jsx handler
- Never allow `bones` to go below 0 — validate before any spend write
- Never write bones from a child component — Parent Fan-Out pattern applies

---

## UI Rules
- Current bone count displayed in the app header (MiloHeader) at all times
- Bone count updates optimistically — update UI immediately, write to Firestore in background
- Loot drop: show a small animation when a loot drop occurs (bone icon bounces, count increments)
- Skip button: only visible during Practice drill questions, hidden if bones < 5
- Streak freeze: purchasable from Settings/Profile screen, show current freeze status (active / none)

---

## Economy Health — Reference Numbers
A dedicated learner completing Path 1 (5 Stops × ~5 words × 6 drills) earns approximately:
- Base drill bones: ~150 bones
- Stop completion bonuses: 5 × 3 = 15 bones
- Path completion bonus: 10 bones
- Estimated loot drops: ~20 bones
- **Total Path 1: ~195 bones**

This means a dedicated learner is within reach of the 200-bone companion discount after completing Path 1. A casual learner may take 3–4 weeks. The wait gives the unlock meaning without making it unreachable.

---

## V3 Additions (do not build now)
- Treat and star currencies — fields exist in Firestore, mechanics TBD
- Bones leaderboard or visible bone count on friend profiles
- Bone gifting between friends

---

*Last updated: 2026-06-01*
