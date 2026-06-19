# Bones Logic Spec
*Pre-Emergent specification for Session C — bones/freeze system*
*Feed this document to Emergent alongside the Session C brief.*

---

## What Bones Are
Bones are Milo's primary reward currency. They are earned through effort and spent on meaningful protections. They are never purchased. They are never awarded for passive activity.

**Firestore field:** `users/{uid}.bones` (number, default 0)

---

## Earning Bones

| Event | Bones awarded | Where triggered |
|---|---|---|
| Stop pass (Fetch round ≥ 80%) | +2 | `onAwardBones(2)` in PathsTab.jsx results phase |
| Path pass (Path Fetch round ≥ 80%) | +15 | `completePathFetch` in SpanishHub.jsx |
| Break Free success | +10 | New — Break Free completion handler |

**Rules:**
- Bones are awarded only on pass, never on fail or retry
- No bones for standalone DrillsGrid drills (only Paths flow awards bones)
- No bones for Flashcard review (passive, no XP either)
- Warm Up drills (Matching, Word Sort, Gender el/la) award no bones — by design

---

## Spending Bones

### Streak Freeze — 10 bones
Protects the user's streak for one day if they miss their daily goal.

**How it works:**
- User purchases a streak freeze from the Profile Sheet or a dedicated Bones shop screen
- A `streakFreezeActive: true` field is written to `users/{uid}`
- If the user misses their daily goal, the streak is not reset — freeze is consumed
- `streakFreezeActive` is set back to `false` after consumption
- Only one freeze can be held at a time — purchasing again while one is active does nothing (or shows a message)

**Firestore fields needed:**
- `streakFreezeActive: boolean` (new field, default false)

### Word Skip — 20 bones
Skip a word the user doesn't want to see in the current drill session.

**How it works:**
- A skip button appears during drill question display (not during feedback state)
- Tapping skip deducts 20 bones and advances to the next word
- The skipped word is not marked wrong — it is simply removed from the current queue
- Skip does not persist between sessions — the word reappears next time
- Skip is available in Stop Fetch rounds and Path Fetch rounds only
- Skip is NOT available in standalone DrillsGrid drills

**UI placement:** small bone icon + cost shown in drill header during question state only. Hidden during feedback state and results screen.

---

## Break Free — XP Trigger (not bones)

Break Free availability is triggered by XP, not bones.

**Firestore field:** `users/{uid}.breakFreeXP` (number, default 0)

**How it works:**
1. Every correct answer that awards XP also increments `breakFreeXP` by the same amount
2. When `breakFreeXP >= 50`, Break Free becomes available (not auto-triggered)
3. A visual indicator appears — Milo straining at his chain — inviting the user to start
4. User taps to start Break Free voluntarily (respects no-interruption principle)
5. On Break Free success: `breakFreeXP` resets to 0, +10 bones awarded
6. On Break Free failure: `breakFreeXP` is NOT reset — user can try again immediately
7. After a successful Break Free, a Fetch standalone session unlocks

**Note:** `breakFreeXP` is separate from `xp` and `weeklyXP`. It is a counter only, not displayed to the user.

---

## Bones Display

Bones are displayed in the app header alongside XP and streak. Already implemented — `userData.bones` is read in SpanishHub.jsx and passed to the header component.

The header shows the current bone count. It updates in real time via the parent fan-out pattern — no child component reads Firestore directly.

---

## Bones Economy — Design Principles

1. **Never purchasable.** Bones are earned through learning effort only.
2. **Never lost on wrong answers.** Wrong answers cost 0 bones. Only spending actions reduce bones.
3. **Milestone currency, not per-answer currency.** XP is the per-answer feedback channel. Bones are the milestone reward.
4. **Spends feel meaningful.** 10 bones = ~5 Stops of effort for a streak freeze. 20 bones = ~1 full Path's Stop bones for a word skip. Neither is trivial.
5. **No bones for passive review.** Flashcards, Warm Up drills, and browsing the Words tab award no bones.

---

## Firestore Changes Required

| Field | Collection | Type | Default | Notes |
|---|---|---|---|---|
| `streakFreezeActive` | `users/{uid}` | boolean | false | New field |
| `breakFreeXP` | `users/{uid}` | number | 0 | New field |

No other schema changes. `bones` field already exists.

---

## What Emergent Must NOT Change

- The existing `onAwardBones(2)` call in PathsTab.jsx — leave exactly as-is
- The existing `completePathFetch` +15 bones logic in SpanishHub.jsx — leave exactly as-is
- The existing bones display in the header — leave exactly as-is
- Flashcard drill behavior — no bones, no XP, confirmed by design
- Warm Up drill behavior — no bones, no XP, confirmed by design

---

## Emergent Session C Scope

Build in this order:

1. **Streak freeze purchase UI** — in ProfileSheet.jsx, add a "Buy Streak Freeze" button showing cost (10 🦴) and current bone count. Deduct bones, write `streakFreezeActive: true` to Firestore via the existing `persistData` pattern.

2. **Streak freeze consumption logic** — in SpanishHub.jsx, where streak reset currently happens on missed daily goal: check `streakFreezeActive` first. If true, skip the reset and set `streakFreezeActive: false`.

3. **Word skip button** — in PathsTab.jsx drill question display, add a skip button (bone icon + "20 🦴") visible during question state only. On tap: deduct 20 bones, advance queue.

4. **Break Free XP counter** — in SpanishHub.jsx `onUpdateWordProgress`, increment `breakFreeXP` by the same amount as XP awarded on correct answers. Check if `breakFreeXP >= 50` and set a `breakFreeAvailable` flag in local state (not Firestore — no need to persist this across sessions).

5. **Break Free entry point** — a visual indicator when `breakFreeAvailable` is true. Milo straining pose. User taps to start. (Full Break Free mechanic is Emergent Session G — this session only wires the trigger and entry point.)

Do not build the full Break Free speed round in this session — that is Session G.

---

*Last updated: 2026-06-19*
