## Emergent Session B — Toast Notifications + Friend Badge Fix

### Classification
- **Type:** Wiring + mount
- **Risk:** Low. Toast infrastructure is fully installed, just never mounted. One new mount, three consumption points, one badge fix.
- **Stage:** 3 — stabilization
- **Affected files:** SpanishHub.jsx, frontend/src/components/FriendsList.jsx
- **Pattern:** Parent Fan-Out — SpanishHub owns all state mutations and toast triggers

---

### What the problem is

1. `evaluateBadges()` returns `newlyEarned` at every call site. It is discarded every time. Users earn badges silently — no feedback.
2. `<Toaster />` from `frontend/src/components/ui/toaster.jsx` is installed but never mounted. No toast can appear anywhere in the app.
3. `first_friend` badge checks `friends.length` on `login` event only — never fires when a friend is actually added.
4. `sonner.jsx` imports `next-themes` (on security cleanup list) and is never used.

---

### Pre-flight confirmation — Emergent must report first 3 lines of each file before touching anything
frontend/src/SpanishHub.jsx

frontend/src/components/ui/toaster.jsx

frontend/src/hooks/use-toast.js

frontend/src/components/FriendsList.jsx

---

### Task 1 — Mount the toaster in frontend/src/SpanishHub.jsx

Import `Toaster` at the top of SpanishHub.jsx:

```js
import { Toaster } from './components/ui/toaster';
```

Add `<Toaster />` once inside the return, at the root level alongside the existing modal stack. It must be outside all conditional renders so it is always present.

---

### Task 2 — Import toast and consume newlyEarned at all three evaluateBadges call sites

Import at the top of SpanishHub.jsx:

```js
import { useToast } from './hooks/use-toast';
```

Add inside the component function, near the top with other hooks:

```js
const { toast } = useToast();
```

**Call site 1 — login (line ~251)**

Find:
```js
const { updatedBadges } = evaluateBadges({}, merged, 'login', {});
```

Replace with:
```js
const { updatedBadges, newlyEarned: loginBadges } = evaluateBadges({}, merged, 'login', {});
loginBadges.forEach(id => {
  const def = BADGES.find(b => b.id === id);
  if (def) toast({ title: `${def.emoji} Badge Earned`, description: def.name });
});
```

Note: `toast` is not available inside `setUserData` callbacks (they run outside React render). The login call site already runs outside `setUserData` so toast is safe to call here directly.

**Call site 2 — answer (line ~466, inside updateWordProgress → setUserData)**

The answer call site runs inside `setUserData`. Toasts cannot be called inside `setUserData`. Use a ref to queue badges and fire after the state update settles.

Add near the top of the component:

```js
const pendingBadgeToasts = useRef([]);
```

Find:
```js
const { updatedBadges } = evaluateBadges(prev, newData, 'answer', {});
```

Replace with:
```js
const { updatedBadges, newlyEarned: answerBadges } = evaluateBadges(prev, newData, 'answer', {});
if (answerBadges.length > 0) pendingBadgeToasts.current = [...pendingBadgeToasts.current, ...answerBadges];
```

Then after the `setUserData` call in `updateWordProgress`, add:

```js
if (pendingBadgeToasts.current.length > 0) {
  pendingBadgeToasts.current.forEach(id => {
    const def = BADGES.find(b => b.id === id);
    if (def) toast({ title: `${def.emoji} Badge Earned`, description: def.name });
  });
  pendingBadgeToasts.current = [];
}
```

**Call site 3 — drill_complete (line ~531, inside onDrillDone → setUserData)**

Same pattern as call site 2 — inside `setUserData`, use the same `pendingBadgeToasts` ref.

Find:
```js
const { updatedBadges } = evaluateBadges(prev, newData, 'drill_complete', { drillId, correct, total, ts: Date.now() });
```

Replace with:
```js
const { updatedBadges, newlyEarned: drillBadges } = evaluateBadges(prev, newData, 'drill_complete', { drillId, correct, total, ts: Date.now() });
if (drillBadges.length > 0) pendingBadgeToasts.current = [...pendingBadgeToasts.current, ...drillBadges];
```

Then after the `setUserData` call in `onDrillDone`, flush the same way as call site 2.

---

### Task 3 — Friend toast + first_friend badge fix in frontend/src/SpanishHub.jsx

The `addFriend` function never calls `evaluateBadges`, so `first_friend` never triggers. Fix both the badge and add a toast.

Find:
```js
const addFriend = useCallback((fid) => {
  setUserData(prev => {
    if ((prev.friends || []).includes(fid)) return prev;
    const newData = { ...prev, friends: [...(prev.friends || []), fid] };
    persistData(newData);
    return newData;
  });
}, [persistData]);
```

Replace with:
```js
const addFriend = useCallback((fid) => {
  let friendBadges = [];
  setUserData(prev => {
    if ((prev.friends || []).includes(fid)) return prev;
    let newData = { ...prev, friends: [...(prev.friends || []), fid] };
    const { updatedBadges, newlyEarned } = evaluateBadges(prev, newData, 'login', {});
    newData = { ...newData, earnedBadges: updatedBadges };
    friendBadges = newlyEarned;
    persistData(newData);
    return newData;
  });
  setTimeout(() => {
    toast({ title: '🐾 Friend Added', description: 'Your pack is growing!' });
    friendBadges.forEach(id => {
      const def = BADGES.find(b => b.id === id);
      if (def) toast({ title: `${def.emoji} Badge Earned`, description: def.name });
    });
  }, 0);
}, [persistData, toast]);
```

Note: `setTimeout(..., 0)` defers the toast until after the `setUserData` callback completes. This is the same pattern as `pendingBadgeToasts` but scoped locally since this is a one-off callback rather than a hot path.

---

### Task 4 — Delete frontend/src/components/ui/sonner.jsx

This file imports `next-themes` (flagged for security cleanup) and is never used anywhere in the app. Delete it. Confirm no import of sonner exists in any other file before deleting.

---

### What Emergent must NOT do

- Do not build a notification bell, notification drawer, or notification history UI — that is a future session
- Do not build admin alerts — no admin system exists yet
- Do not modify the toast component files (toaster.jsx, toast.jsx, use-toast.js) — use them as-is
- Do not touch Firebase Auth logic, Firestore security rules, or api/chat.js
- Do not add any new Firestore collections or documents

---

### Verification steps

1. Complete a drill → toast appears with badge name and emoji if badge earned
2. Complete Stop p1s1 → stop_1_1 badge toast appears
3. Complete Path 1 → path_1 badge toast appears
4. Add a friend → "Your pack is growing!" toast appears
5. Add first friend ever → first_friend badge toast also appears
6. Log in with founding_paw flag set → founding_paw badge toast appears on login
7. Open BadgeGrid → earned badges show correctly, not duplicated
8. Confirm sonner.jsx is deleted and no import errors in build

---

### Estimated tokens: 6–8

No new components. One mount, three wiring changes, one badge fix, one file deletion. Pre-flight check mandatory.

---

---
