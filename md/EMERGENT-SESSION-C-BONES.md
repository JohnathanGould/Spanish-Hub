## Emergent Session C — Bones & Streak Shield System

### Classification
- **Type:** Feature build — new toggle UI, new spending logic, new streak intercept
- **Risk:** Medium. Touches streak logic (high consequence if broken), bones balance, and ProfileSheet UI.
- **Stage:** 3 — stabilization
- **Affected files:** SpanishHub.jsx, frontend/src/components/ProfileSheet.jsx, frontend/src/components/PathsTab.jsx
- **Pattern:** Parent Fan-Out — SpanishHub owns all bones and streak state. Children receive callbacks.

---

### What gets built

1. **Streak Shield toggle** in ProfileSheet — user enables automatic bone spending to protect streak
2. **Streak Shield consumption logic** in SpanishHub — intercepts missed days on app open, spends 20 bones per missed day, partial coverage if bones run short
3. **Word Skip button** in PathsTab Fetch rounds only — costs 10 bones, skips current word in queue
4. **`spendBones(n)`** function in SpanishHub — guarded spend with balance check, returns success/failure

---

### Pre-flight confirmation — Emergent must report first 3 lines of each file before touching anything
frontend/src/SpanishHub.jsx

frontend/src/components/ProfileSheet.jsx

frontend/src/components/PathsTab.jsx

---

### New Firestore fields — add to default userData in SpanishHub.jsx

```js
streakShieldActive: false,   // user's toggle state — persists across sessions
shieldEventPending: null,    // { bonesSpent, daysCovered, daysTotal } — read on next open, cleared after toast
```

---

### Task 1 — Add spendBones function to SpanishHub.jsx

Add alongside `awardBones`:

```js
const spendBones = useCallback((n) => {
  let success = false;
  setUserData(prev => {
    if ((prev.bones || 0) < n) return prev;
    const newData = { ...prev, bones: (prev.bones || 0) - n };
    persistData(newData);
    success = true;
    return newData;
  });
  return success;
}, [persistData]);
```

Pass as prop wherever needed: `onSpendBones={spendBones}`

---

### Task 2 — Streak Shield consumption logic in SpanishHub.jsx

This runs on app open, immediately after user data is loaded and merged — same location as `maybeRunStreakReminder` calls (lines ~230 and ~257).

Add a new function `maybeApplyStreakShield(data, uid)`:

```js
function maybeApplyStreakShield(data, uid) {
  if (!data?.streakShieldActive) return data;
  if (!data?.streak?.lastDate) return data;
  if ((data.streak?.count || 0) === 0) return data;

  const today = new Date().toDateString();
  const lastDate = new Date(data.streak.lastDate);
  const now = new Date();
  const daysDiff = Math.floor((now - lastDate) / 86400000);

  // Already played today or only missed yesterday (streak logic handles this) — no shield needed
  if (daysDiff <= 1) return data;

  // Gone more than 7 days — shield gives up, reset streak
  if (daysDiff > 7) {
    return {
      ...data,
      streak: { count: 0, lastDate: null },
      shieldEventPending: { bonesSpent: 0, daysCovered: 0, daysTotal: daysDiff - 1, shieldFailed: true },
    };
  }

  const daysMissed = daysDiff - 1;
  const costPerDay = 20;
  const totalCost = daysMissed * costPerDay;
  const availableBones = data.bones || 0;
  const daysCovered = Math.min(daysMissed, Math.floor(availableBones / costPerDay));
  const bonesSpent = daysCovered * costPerDay;
  const daysNotCovered = daysMissed - daysCovered;

  const newStreakCount = Math.max(0, (data.streak?.count || 0) - daysNotCovered);
  const newBones = availableBones - bonesSpent;

  return {
    ...data,
    bones: newBones,
    streak: { count: newStreakCount, lastDate: today },
    shieldEventPending: {
      bonesSpent,
      daysCovered,
      daysTotal: daysMissed,
      daysNotCovered,
      shieldFailed: bonesSpent === 0,
    },
  };
}
```

Call this function after data is merged on login, before `setUserData` is called. If it returns modified data, write back to Firestore via `setDoc`.

---

### Task 3 — Shield event toast on app open

After `maybeApplyStreakShield` runs and `setUserData` is called, check for `shieldEventPending` and fire the appropriate toast:

```js
if (mergedData.shieldEventPending) {
  const { bonesSpent, daysCovered, daysTotal, daysNotCovered, shieldFailed } = mergedData.shieldEventPending;

  if (shieldFailed && daysTotal > 7) {
    toast({ title: '💔 Streak Lost', description: 'You were gone too long — even the Shield couldn\'t help.' });
  } else if (shieldFailed) {
    toast({ title: '💔 Not enough bones', description: `Streak Shield couldn\'t cover ${daysTotal} missed day${daysTotal > 1 ? 's' : ''}. Streak reset.` });
  } else if (daysNotCovered > 0) {
    toast({ title: '🦴 Partial Shield', description: `${daysCovered} day${daysCovered > 1 ? 's' : ''} covered (${bonesSpent} bones). Streak reduced by ${daysNotCovered}.` });
  } else {
    toast({ title: '🦴 Streak Shield Used', description: `${daysCovered} day${daysCovered > 1 ? 's' : ''} protected — ${bonesSpent} bones spent.` });
  }

  // Clear the pending event
  setUserData(prev => {
    const newData = { ...prev, shieldEventPending: null };
    persistData(newData);
    return newData;
  });
}
```

---

### Task 4 — Streak Shield toggle in ProfileSheet.jsx

Add a toggle row in ProfileSheet, in the settings section alongside the existing reminder toggle. Prop contract:

```js
// Props passed from SpanishHub
streakShieldActive={userData.streakShieldActive || false}
onStreakShieldToggle={(val) => setUserData(prev => {
  const newData = { ...prev, streakShieldActive: val };
  persistData(newData);
  return newData;
})}
```

Toggle label: **Streak Shield 🦴**
Toggle sublabel: *Spends 20 bones per missed day to protect your streak*

If `userData.bones < 20`, show the sublabel in amber: *Not enough bones to activate*. Toggle remains functional — user can enable it for when they earn more bones.

---

### Task 5 — Word Skip button in PathsTab.jsx (Fetch rounds only)

The skip button appears during Fetch rounds (Stop fetch and Path fetch) only — not in DrillsGrid standalone drills.

Add a Skip button inside the Fetch question UI. Position: below the answer area, above the progress bar. Style: subtle, small, not competing with the answer UI.

```js
// Only render during fetch phase, not intro or results
{phase === 'fetch' && (
  <button
    onClick={() => {
      if ((userData?.bones || 0) >= 10) {
        onSpendBones(10);
        onSkipWord(); // advances to next question without scoring
      }
    }}
    disabled={(userData?.bones || 0) < 10}
    className="text-sm text-amber-600 underline disabled:opacity-40"
  >
    Skip word 🦴 (10 bones)
  </button>
)}
```

`onSkipWord` prop: advances the fetch queue index without recording an answer. Does not count as correct or incorrect. Does not affect pass threshold calculation — total questions asked increases by 0, correct stays the same.

Prop contract additions to PathsTab:
```js
onSpendBones={spendBones}
onSkipWord={() => { /* advance queue index */ }}
```

Note: `onSkipWord` implementation lives inside PathsTab's fetch queue logic. Emergent must wire it without breaking the existing `FETCH_LENGTH` and `PASS_THRESHOLD` mechanics.

---

### Bones economy — authoritative numbers (resolve md/MILO_BONES_LOGIC_SPEC.md conflict)

| Action | Bones |
|---|---|
| Complete a Stop | +2 |
| Complete a Path | +15 |
| Complete Break Free | +10 |
| Streak Shield | −20 per missed day |
| Word Skip (Fetch only) | −10 |
| DrillsGrid drills | 0 |

The older md/MILO_BONES_LOGIC_SPEC.md numbers are superseded by this table. Do not reference that document.

---

### What Emergent must NOT do

- Do not add bones rewards to DrillsGrid drills
- Do not build a bones purchase flow or monetisation UI
- Do not add random loot drops
- Do not touch Firebase Auth logic, Firestore security rules, or api/chat.js
- Do not modify the streak write logic inside onDrillDone — the shield intercepts on login only
- Do not build Break Free — that is Session G

---

### Edge cases Emergent must handle

1. **Shield on, bones = 0** — shield fires, covers 0 days, streak resets normally. Toast: "Not enough bones."
2. **Shield on, partial bones** — covers as many days as bones allow, streak reduced by remainder
3. **Gone > 7 days** — shield gives up regardless of bones balance, streak resets to 0
4. **lastDate === today** — shield does not run, user already played today
5. **daysDiff === 1** — shield does not run, streak logic in onDrillDone handles this normally
6. **Skip button, bones < 10** — button disabled, no spend attempted
7. **Skip on last question** — advancing past the final question should trigger results phase normally

---

### Verification steps

1. Enable Streak Shield in ProfileSheet — toggle saves to Firestore
2. Simulate 1 missed day (set lastDate to 2 days ago in Firestore) → open app → toast fires, 20 bones deducted, streak preserved
3. Simulate 2 missed days, 30 bones available → open app → toast fires "Partial Shield — 1 day covered", streak reduced by 1, 20 bones spent
4. Simulate 2 missed days, 40 bones available → open app → toast fires "2 days protected — 40 bones spent", streak preserved
5. Simulate 8 missed days → open app → toast fires "gone too long", streak resets to 0, no bones spent
6. Skip a word in Fetch round → question advances, 10 bones deducted, pass threshold unaffected
7. Skip with 0 bones → button disabled, no action
8. Disable shield → missed day → streak resets normally, no toast, no bones spent

---

### Estimated tokens: 12–15

New function, new toggle UI, new skip button, new Firestore fields. Medium complexity. Pre-flight check mandatory. Write State Ledger spec in Claude before opening Emergent.

---

---
