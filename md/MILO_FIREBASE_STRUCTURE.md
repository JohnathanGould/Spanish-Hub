# Milo Speaks Spanish — Firebase Structure Document
*Reference for all Emergent, Cursor, and Claude Code sessions. Do not modify schema without updating this doc.*

---

## Project
- **Firebase project ID:** my-spanish-hub
- **Region:** northamerica-northeast1 (Montreal)
- **Auth providers:** Google Sign-In, Email/Password

---

## Collections

### `users/{uid}`
One document per authenticated user. Written by SpanishHub.jsx only.

| Field | Type | Description |
|---|---|---|
| `displayName` | string | User's display name, sourced from Firebase Auth on login |
| `photoURL` | string or null | Profile photo URL, sourced from `auth.currentUser.photoURL` on login. null for email/password users without a Google photo |
| `xp` | number | Total XP earned all time |
| `weeklyXP` | number | XP earned this week — resets weekly |
| `streak` | number | Current daily streak in days |
| `dailyGoal` | number | User's daily XP goal |
| `bones` | number | Current bone count |
| `treats` | number | Current treat count |
| `stars` | number | Current star count |
| `earnedBadges` | array of strings | Badge IDs the user has earned |
| `completedStops` | array of strings | Stop IDs completed in Paths |
| `completedPaths` | array of strings | Path IDs completed |
| `lessonsCompleted` | array of strings | Legacy lesson IDs completed |
| `friends` | array of strings | UIDs of friends |
| `audioListenEnabled` | boolean | Whether listen audio is on |
| `audioSpeakEnabled` | boolean | Whether speak audio is on |
| `progress` | map | Word-level progress — see below |
| `customWords` | array | User-added custom words |

#### `progress` map structure
```
progress: {
  es: {
    [wordId]: {
      c: number,   // correct answers
      w: number,   // wrong answers
      s: number    // current confidence score
    }
  }
}
```

**Note:** `progress{ c, w, s }` does not currently distinguish which drill type scored the correct answer. A word can show as mastered from input recognition alone. This is a known open decision — see action list under "Does mastery require output success?"

---

### `leaderboard/{uid}`
One document per user. Kept separate from `users/` to allow cheap public reads without exposing full user data.

| Field | Type | Description |
|---|---|---|
| `displayName` | string | User's display name |
| `photoURL` | string or null | Profile photo URL |
| `xp` | number | Total XP |
| `weeklyXP` | number | Weekly XP for weekly leaderboard view |

---

### `chatUsage/{uid}`
Rate limiting for Milo AI chat (Gemini).

| Field | Type | Description |
|---|---|---|
| `count` | number | Messages sent today |
| `date` | string | Date of last message (YYYY-MM-DD) |

**Rule:** If `date` !== today, reset `count` to 0 before incrementing. Hard limit: 30 messages/day.

---

### `plaza/{postId}`
La Plaza community chat posts.

| Field | Type | Description |
|---|---|---|
| `uid` | string | Author's UID |
| `displayName` | string | Author's display name |
| `text` | string | Post content |
| `timestamp` | timestamp | When posted |
| `likes` | number | Like count |

---

## Guest User
Users who are not logged in receive a synthetic user object — never written to Firestore:
```
{ uid: 'guest', displayName: 'Guest', photoURL: null }
```

---

## Architecture Rules
- **SpanishHub.jsx is the only file that reads from or writes to Firestore.** No child component queries Firestore directly — Parent Fan-Out pattern.
- `leaderboard/` is the only collection safe for public reads.
- `chatUsage/` resets daily client-side before incrementing.
- Never write on every render or keystroke — batch or debounce all writes.
- Free tier limits: 50K reads/day · 20K writes/day · 20K deletes/day.
- Emulator: Auth on port 9099 · Firestore on port 8080 · Dashboard at http://127.0.0.1:4000/

---

## 3 Currencies
| Currency | Field | Notes |
|---|---|---|
| Bones | `bones` | Earned through drills, never purchased |
| Treats | `treats` | Reserved — not yet active |
| Stars | `stars` | Reserved — not yet active |

---

*Last updated: 2026-06-01*
