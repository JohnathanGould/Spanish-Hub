# Milo Speaks Spanish — Community Word Request System
*Spec for the community word pipeline: submissions, voting, Pioneer rewards, and the Words tab Community sub-tab.*
*Last updated: 2026-06-01*

---

## Overview

Users can submit words they want added to the official Milo vocabulary. Submissions feed into an admin-reviewed pipeline. Approved words earn the contributor bones and Pioneer badges. All community words surface in a dedicated Community sub-tab inside the Words tab.

---

## Firestore: `customWordRequests/{docId}`

One document per unique word requested. Written by SpanishHub.jsx only.

| Field | Type | Description |
|---|---|---|
| `es` | string | Spanish word |
| `en` | string | English translation |
| `uid` | string | UID of first requester |
| `contributorName` | string | Display name of first requester |
| `timestamp` | timestamp | When first requested |
| `count` | number | How many users have requested this word — incremented on duplicate |
| `votes` | number | Upvotes from users other than the requester — one per user per word |
| `exampleSentence` | string | Optional sentence contributed by requester |
| `status` | string | `pending` / `approved` / `rejected` |
| `approvedDate` | timestamp | When added to `words.js` — null until approved |

---

## Add Word Flow — Smart Request Detection

When a user submits a word via the Add Word form in the Words tab:

1. App silently checks if the word already exists in `words.js`
2. **Found** — full word detail page renders immediately. Word added to `customWords[]`. No request needed. User gets the card without any friction.
3. **Not found** — word saved to `customWords[]` as a personal custom word. Milo prompts:
   > *"We don't have an official card for [word] yet. Want to request one? 🐾"* — Yes / Skip
   If Yes: write to `customWordRequests`. Pioneer system activates.
4. **Spelling suggestion** — if the submitted word is close but not exact (e.g. "nino" vs "niño"), Milo suggests the correction before saving:
   > *"Did you mean niño? 🐾"*

---

## Duplicate Handling

If a word already exists in `customWordRequests` (status: `pending`):
- Increment `count` on the existing document — do not create a duplicate
- Show user: *"[word] has already been requested! Your vote has been added 🐾"*
- User can also upvote from the Community sub-tab (separate action)

---

## Admin Workflow

Review monthly. Priority order: highest `votes` + `count` combined.

On approval:
1. Add word to `words.js` with full content fields (type, group, gender, sentence, contextSentence, theme, imageUrl)
2. Update `status` → `approved`, set `approvedDate`
3. Trigger Pioneer reward for original requester (see below)
4. All users who have this word in `customWords[]` automatically receive the full card on next visit — no user action required

On rejection:
- Update `status` → `rejected`
- No notification to user — word stays in their `customWords[]` as a personal word

---

## Pioneer Rewards

Rewards fire only on admin approval. Requesting alone awards nothing.

| Event | Reward |
|---|---|
| First word request approved | 5 bones + **Word Pioneer 🗺️** badge |
| 5 word requests approved | **Lexicographer 📖** badge |

**In-app notification on approval:**
> *"Great news — [word] is now an official Milo word! You helped build this 🐾"*
> — with celebration animation

**Contributor credit on word detail page:**
- Subtle "suggested by community" tag on the word card
- If requester's example sentence was used: *"Example sentence contributed by [displayName] 🐾"*

---

## Anti-gaming Rule

Bones and badges are awarded only when the word is merged into `words.js`. Volume of requests does not award anything. This keeps quality above quantity.

---

## Community Sub-tab (Words Tab)

A **Community** sub-tab inside the Words tab alongside My Words / Browse.

### Section 1 — Requested

Words currently pending approval, sorted by vote count descending.

- Any user can upvote an existing request — one upvote per word per user
- Shows: Spanish word, English translation, vote count, date requested
- User's own pending requests show a "you requested this" indicator
- Upvote button disabled after voting (persisted in user state)

### Section 2 — Recently Added

Last 10 community words officially added to `words.js`, sorted by `approvedDate` descending.

- Shows: word, translation, contributor name, approved date
- Each word tappable → full word detail page

### Section 3 — Pioneers

Top contributors by approved word count. Lightweight recognition, not XP competition.

- Shows: display name, photo, count of approved words
- Sorted by approved word count descending
- Top 10 visible; no pagination needed at launch

---

## Custom Word Card — Graceful Degradation

When a user taps a custom word not yet in `words.js`:

| Section | Behaviour |
|---|---|
| Spanish word + translation | Show |
| Your Progress | Show (if drill history exists) |
| Example Sentence | Hide |
| Verb Forms | Hide |
| Appears In | Hide |
| Related Words | Hide |
| Label | "Community word — full card coming soon 🐾" |
| Actions | Drill this word + Remove from word list — both active |

**Automatic upgrade:** When the admin approves the word and adds it to `words.js`, the full card renders automatically on the user's next visit. The word stays in `customWords[]` and now resolves to the full entry — no user action required.

---

## State Ownership

- `customWordRequests`: write only from SpanishHub.jsx handler — never from a child component
- `customWords[]`: write only via SpanishHub.jsx handler — single array update
- Vote state: stored per user (e.g. `votedRequests: string[]` in `users/{uid}`) — prevents double voting
- Community sub-tab data: read from `customWordRequests` via SpanishHub.jsx, passed as props
- **Parent Fan-Out pattern applies — no child component queries Firestore directly**

---

## Suggested `users/{uid}` Additions

| Field | Type | Description |
|---|---|---|
| `votedRequests` | array of strings | `docId`s the user has upvoted — prevents double voting |
| `approvedRequestCount` | number | Count of the user's approved requests — drives Lexicographer badge check |

---

## Component Plan (Emergent session)

| Component | File | Notes |
|---|---|---|
| Community sub-tab | `CommunityWordsTab.jsx` | Three sections: Requested / Recently Added / Pioneers |
| Custom word card (degraded) | `WordDetailPage.jsx` | Graceful degradation already specced — hide sections if not in words.js |
| Upvote button | inline in CommunityWordsTab | Disabled state from `votedRequests[]` |
| Pioneer notification banner | inline in SpanishHub.jsx | Fires when approved word status detected on load |

---

## V3 Additions (do not build now)

- Contributor profile page — all approved words by one user
- Comment thread on pending requests
- Cross-language Pioneer credit (same contributor across future language apps)
- Admin dashboard inside the app for reviewing requests

---

*Last updated: 2026-06-01*
