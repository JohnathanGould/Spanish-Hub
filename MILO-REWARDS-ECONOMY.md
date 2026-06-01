# 🐾 Milo Speaks Spanish — Rewards Economy
*XP, Bones, Loot Drops, Skins, Companions, and Milestone Badges*
*Established: 2026-05-28 — Updated: 2026-06-01*

---

## Design Philosophy

The reward system is built on a D&D model — not a gamification model. XP measures personal growth, not competition. Bones are earned currency with real spending utility. Milestones mark the journey. Nothing is pay-to-win. Learning is always free.

---

## Two Parallel Currencies

| | Bones 🦴 | XP ⭐ |
|---|---|---|
| **Earned from** | Correct answers (Practice tier) + quest loot drops | Correct answers (Practice tier) + meaningful events |
| **Purpose** | Spendable currency — discounts, skips, streak freezes | Permanent growth record — never spent, never resets |
| **Analogy** | Gold pieces | D&D character XP |
| **Resets?** | 5 bones deducted per missed day (streak freeze) | Never resets |
| **Drives** | Purchases, skips, streak protection | Milestone badges |

---

## Bones — Earning

### Per Answer (Practice tier drills only)
Warm Up and Review tier drills earn no bones.

| Action | Bones |
|---|---|
| Correct answer — Practice tier drill | 1 🦴 |

### Quest Loot Drops
The emotional payoff for completing meaningful milestones. Animated moment — bones cascade on screen, Milo celebrates, counter ticks up dramatically.

| Event | Bones |
|---|---|
| Stop completed | 5 🦴 |
| Path completed | 15 🦴 |
| Break Free success (¡Libre!) | 25 🦴 |
| Fetch session completed | 8 🦴 |
| Sub-level completed | 50 🦴 |
| Tier capstone passed | 100 🦴 |
| Daily goal met | 2 🦴 |
| 7-day streak milestone | 5 🦴 |

### Random Loot Drops
| Drop | Probability | Bones |
|---|---|---|
| Small | 15% per drill | 2 🦴 |
| Medium | 5% per drill | 5 🦴 |
| Rare | 1% per drill | 10 🦴 |

One loot drop maximum per drill session. Stacks on top of base earn.

### Streak Freeze Deduction
5 bones deducted automatically per missed day. Stackable — 30 bones protects 6 days.
Milo message on return: *"Looks like you missed a few days! I used some of your bones to keep your streak safe 🐾"*

---

## Bones — Spending

### Skip a question — 5 bones
Skip button during any Practice drill question. Skipped questions do not count as wrong. Hidden if bones < 5.

### Streak freeze — 30 bones
Protects streak for one missed day. One freeze active at a time. Purchased from Settings/Profile screen. Consumed automatically when a day is missed.

### Milo Skin Discount
| | |
|---|---|
| Full price | $2.00 |
| Spend 50 bones | $1.00 (50% off) |
| Minimum paid | $1.00 — bones never make it free |

### Companion Character Discount
Companion characters are Milo's real family — the pets he lived with. Unlocking one brings them into the learning experience permanently. Requires genuine dedication to earn the discount.

| | |
|---|---|
| Full price | $9.99 |
| Spend 200 bones | $4.99 (50% off) |
| Minimum paid | $4.99 — bones never make it free |

200 bones = roughly one completed Path for a dedicated learner. The wait gives the unlock meaning.

---

## XP — Earning

| Event | XP |
|---|---|
| Correct answer — Practice tier drill | 1 ⭐ |
| Stop completed | 10 ⭐ |
| Path completed | 75 ⭐ |
| Break Free success | 50 ⭐ |
| Fetch session completed | 15 ⭐ |
| First word Mastered | 20 ⭐ |
| Every 10th word Mastered | 20 ⭐ |
| Sub-level completed | 150 ⭐ |

XP is permanent. Never spent. Never resets. Drives milestone badge unlocks.

---

## XP Milestone Badges

| Badge | XP threshold | Meaning |
|---|---|---|
| First Steps 🐾 | 500 XP | ~500 correct answers |
| Finding My Paws 🦴 | 2,000 XP | Consistent early learner |
| On the Trail 🐕 | 5,000 XP | Dedicated practice |
| Running Free 🐾 | 12,500 XP | Serious commitment |
| Champion 🏆 | 25,000 XP | ~100 words genuinely retained |
| Legend ⭐ | 50,000 XP | Elite dedication |

---

## Companion Characters

Once purchased, companions appear in Fetch. Each assigned to one of the 6 Practice drills.

| Character | Species | Assigned drill | Notes |
|---|---|---|---|
| **Ruby** | Dog 🐕 | Fill in the Blank | Rescue — Texas. First to build. |
| **Lola** | Dog 🐕 | Type It | Rescue — Texas |
| **Junny** | Dog 🐕 | Listen & Type | Rescue — Texas |
| **Maz** | Cat 🐈 | Sentence Builder | Adopted from NS SPCA Colchester |
| **Bela** | Cat 🐈 | Conjugation | From a litter — friend's cat |
| **Delilah** | Cat 🐈 | Multiple Choice EN→SP | Adopted from NS SPCA Colchester |
| **Molly** | Cat 🐈 | All drills — random, rare | Adopted from NS SPCA Colchester. Died one month before Milo. |

**Molly mechanic:** No assigned drill. Appears randomly at low probability across all 6 drill types. The rarest companion encounter — a surprise visit.

**Rollout order:** Ruby first. Full sequence to be decided before cosmetics shop ships.

---

## Economy Health — Reference Numbers

A dedicated learner completing Path 1 earns approximately:
- Base drill bones: ~150
- Stop completion bonuses: 5 × 5 = 25
- Path completion bonus: 15
- Random loot drops: ~20
- **Total Path 1: ~210 bones**

This puts the 200-bone companion discount within reach after Path 1 for a dedicated learner. A casual learner may take 3–4 weeks. The wait gives the unlock meaning without making it unreachable.

---

## Firestore Storage

All earn values stored as configurable Firestore constants — never hardcoded in the app.

```
users/{uid}:
  bones: number     — current bone count, never negative
  xp: number        — total XP, permanent, never resets
  weeklyXP: number  — resets weekly (leaderboard use — currently hidden)
  earnedBadges: string[]  — badge IDs earned
```

---

## Rules — Never Violate

- Bones are earned, never purchased
- XP is permanent, never spent, never resets
- Bones never make anything completely free — minimum payment always applies
- Practice tier only for bones and XP — Review and Warm Up earn nothing
- No pay-to-win. No energy systems. No lesson locks. Ever.

---

## Build Sequencing

| Feature | Phase | Prerequisite |
|---|---|---|
| Bones earn + display | Stabilize | DEFAULT_DATA bones field ✅ |
| Skip a question | Stabilize | Bones earn live |
| Streak freeze | Stabilize | Bones earn live |
| Loot drop animation | Habit | Animation system live |
| Cosmetics shop (skins) | Habit | Animation system live |
| Companion characters | Habit | Cosmetics shop live, Ruby poses generated |
| Ko-fi webhook badges | Launch | Badge system live |

---

*Last updated: 2026-06-01*
