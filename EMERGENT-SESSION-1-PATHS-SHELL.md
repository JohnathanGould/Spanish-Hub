# Emergent Session 1 — Paths Navigation Shell
# Milo Speaks Spanish
# Status: READY TO RUN
# Estimated tokens: 20–25
# Last updated: 2026-06-07

---

## Session Goal

Build the Paths navigation shell only. No drill logic, no FSRS, no bones, no phase sequencing. The result is a working Paths tab where users can see all 12 Paths, see their Stops, and tap into a placeholder Stop screen. Nothing more.

---

## Pre-Session Checklist (verify before pasting this brief)

- [ ] `frontend/src/content/es-en/words.js` — all 398 imageUrl fields populated
- [ ] `frontend/src/content/es-en/paths.js` — 12 Paths × 5 Stops confirmed
- [ ] `completedStops: []` and `completedPaths: []` in DEFAULT_DATA — confirmed present
- [ ] Session 1 audit complete — all flags resolved

---

## Paste This To Emergent

Read `PATHS-STATE-LEDGER.md` and `frontend/src/content/es-en/paths.js` before writing any code. Every architectural decision is pre-made. Emergent executes — it does not plan.

---

### WHAT THIS SESSION BUILDS

Three changes only. Nothing else.

---

**1. New file — `frontend/src/components/PathsTab.jsx`**

Top-level Paths screen. Shows all 12 Paths with title, lock state, and Stop progress. Tapping an unlocked Path expands it to show its 5 Stops. Tapping a Stop calls `onSelectStop(stopId)`. Tapping a locked Stop shows: `"Complete the previous Stop to unlock this one 🐾"`

**2. Modified file — `frontend/src/components/BottomNav.jsx`**

- Remove `BookOpen` from the lucide-react import
- Add `Map` to the lucide-react import
- Swap `{ id: 'learn', label: 'Learn', icon: BookOpen }` with `{ id: 'paths', label: 'Paths', icon: Map }`
- The existing `cn` helper stays unchanged
- No other changes to BottomNav

**3. Modified file — `frontend/src/SpanishHub.jsx`**

Three changes only:

(a) Add import at the top:
`import PathsTab from './components/PathsTab';`

(b) Add new state variable:
`const [activeStop, setActiveStop] = useState(null);`

(c) Add paths tab block between the learn block (line 639) and words block (line 646):
```
{tab === 'paths' && (
  <div className="pb-20">
    <PathsTab
      completedStops={userData.completedStops || []}
      completedPaths={userData.completedPaths || []}
      onSelectStop={(stopId) => setActiveStop(stopId)}
    />
  </div>
)}
```

(d) Update TAB_ORDER at line 125:
From: `const TAB_ORDER = ['home', 'learn', 'words', 'study'];`
To: `const TAB_ORDER = ['home', 'paths', 'words', 'study'];`

---

### CORRECTED FILE PATHS

- `words.js` and `paths.js` live at `frontend/src/content/es-en/` — not `data/`
- All drill components live at `frontend/src/components/drills/` — not root `components/`
- `PathsTab.jsx` goes in root `frontend/src/components/` — not in a `paths/` subdirectory

---

### ID FORMAT — CRITICAL

Path IDs and Stop IDs use **different formats** — this is intentional, not a bug:
- Path IDs: `path1`, `path2`, … `path12`
- Stop IDs: `p1s1`, `p1s2`, … `p12s5`

Do not assume consistency between them. Use exact IDs from paths.js.

---

### PATHS HELPERS — USE THESE, DO NOT REWRITE

```javascript
import { getPath, getStop, getPathIdForStop, isPathComplete } from '../content/es-en/paths'
```

- `getPath(pathId)` → full Path object `{ id, title, titleEn, subLevel, videoUrl, stops[] }`
- `getStop(stopId)` → full Stop object `{ id, title, titleEn, videoUrl, words[] }`
- `getPathIdForStop(stopId)` → parent pathId string
- `isPathComplete(pathId, completedStops)` → boolean

PATHS array is also exported: `import { PATHS } from '../content/es-en/paths'`

---

### LOCK LOGIC

```
Path 1 Stop 1 (p1s1) — always unlocked

Stop N unlocked when:
  Stop N-1 ID is in completedStops[]

First Stop of Path 2–12 unlocked when:
  Final Stop of previous Path is in completedStops[]
```

Locked Stop: show lock icon. Tapping shows: `"Complete the previous Stop to unlock this one 🐾"`

---

### PLACEHOLDER STOPVIEW

When a Stop is tapped, render a placeholder screen showing:
- Stop title and Path title
- Back button that returns to PathsTab

No drill logic. No words. No audio. No images. Just navigation proof.
This placeholder will be replaced in Session 2.

---

### STYLING

- Match existing app style — Tailwind only, mobile-first
- Use CSS custom properties: `hsl(var(--card))`, `hsl(var(--border))`, `hsl(var(--primary))`, `hsl(var(--muted))` — never hardcoded hex
- Interactive card pattern (use for Path rows and Stop nodes):
  `className="drill-card"` with `style={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}`
- Section header pattern (use for Path titles):
  `className="rounded-2xl p-5 mb-4 text-white relative overflow-hidden"`

---

### CRITICAL CONSTRAINTS

**DRILLROUTER:** Session 1 builds navigation only — no new drill IDs are created. Do not add any new cases to DrillRouter. Do not route anything through DrillRouter. PathsTab renders directly from SpanishHub's tab chain — DrillRouter is not involved in this session.

**V0/PATHSVIEW.JSX:** Ignore `frontend/src/components/v0/PathsView.jsx` entirely. It is a corrupted raw HTML prototype with no imports and no export. Do not reference it, convert it, or use it as a starting point.

**MASTER WORD FIELDS:** Five words in MASTER have numeric `path` and `stop` fields (e.g. `path: 6, stop: 5`). These are orphaned metadata — ignore them. The authoritative source for which words belong to which Stop is `paths.js` only.

**LEARN TAB BLOCK:** Do not remove the `{tab === 'learn' && <LessonsList ... />}` block from SpanishHub.jsx. Keep it in the ternary chain even though `learn` is no longer in BottomNav. The Certificate modal (`setShowCertificate(true)`) is only accessible via LessonsList — removing the block kills the feature silently. The learn tab stays in the codebase, just not in the bottom nav.

**SETAB PATHS:** `setTab('paths')` already fires in two places in SpanishHub.jsx — inside `completeLesson` (line 391) and inside LessonView's `onBack` handler (line 556). Both will start working correctly once the paths tab block is added. Do not change either call.

**XP:** Do not add XP anywhere. Do not modify the `xp` field.

---

### WHAT THIS SESSION DOES NOT INCLUDE

- No drill logic of any kind
- No FSRS
- No bones
- No phase sequencing (Introduce / Recognise / Produce)
- No Contextual Binding
- No Certificate integration
- No thinkFirst
- No audio
- No image display
- StopView is a placeholder only — Stop title + Back button

---

### DO NOT TOUCH

- Auth logic in SpanishHub.jsx
- `api/chat.js` Gemini function
- Firestore security rules
- Any existing drill components
- `DrillShell.jsx`
- `Certificate.jsx`
- `{tab === 'learn' && ...}` block in SpanishHub.jsx
- `completeLesson` callback
- LessonView `onBack` handler

---

## Session End Checklist

After Emergent completes, verify:

- [ ] Paths tab appears in bottom nav replacing Learn
- [ ] All 12 Paths visible on Paths screen
- [ ] Lock/unlock logic works based on completedStops
- [ ] Tapping an unlocked Stop opens placeholder screen with Stop title and Back button
- [ ] Back button returns to PathsTab
- [ ] Swipe navigation still works (TAB_ORDER updated to include paths)
- [ ] Learn tab still renders when `setTab('learn')` is called even though not in BottomNav
- [ ] Certificate modal still accessible via lessons flow
- [ ] completeLesson redirect to paths tab now works
- [ ] No existing features broken

---

## Next Session (Session 2 — StopView)

Estimated tokens: 10
Goal: Replace placeholder StopView with a real Stop detail screen showing word cards and a Begin button.