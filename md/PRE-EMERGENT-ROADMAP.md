# PRE-EMERGENT-ROADMAP.md
*Everything that must be done before the first paid Emergent session.*
*Emergent is reserved strictly for multi-file architectural builds: Paths & Stops, bones system, Break Free.*
*Do not open Emergent until every stage below is marked complete.*

---

## How to use this file
- Work top to bottom. No stage starts until the previous is confirmed complete.
- Each item has a tool assignment. Use the cheapest tool that can do the job.
- Mark items ✅ when done. Update CURRENT_STATE_LEDGER.md after each stage.
- When in doubt: Architecture before code. Diagnosis before fixes. Free tools first.

---

## STAGE 0 — Foundation & Tooling
*Everything the dev environment needs before a single line of app code is touched.*

- [ ] **0.1** Firebase emulator running locally — `firebase emulators:start` confirms dashboard opens. All feature testing runs here, never against live database. **Tool: Terminal**
- [ ] **0.2** `.gitignore` confirmed clean — `node_modules/ .next/ build/ dist/ .vercel/ .env.local .turbo/ *.log .DS_Store` all present in `frontend/.gitignore`. **Tool: Claude Code CLI**
- [ ] **0.3** `git commit -m "pre-composer-[feature]"` discipline established — run before every Cursor Composer prompt without exception. **Tool: Terminal habit**
- [ ] **0.4** Google AI Studio confirmed accessible — gemini.google.com, free, 1M context. Use for large codebase diagnosis before any Emergent session. **Tool: Browser**

---

## STAGE 1 — Architecture Decisions
*Decisions that must be locked before any code is written. No tickets until these are answered.*

- [ ] **1.1** FSRS spaced repetition — adopt or defer? Directly affects Firestore schema, Paths build, and Fetch word selection. Decide before Monorepo Prep Stage P4 and before any Paths code. **Tool: Claude Projects planning chat**
- [ ] **1.2** Output drills award 2× XP? — decide before XP system is touched. **Tool: Claude Projects planning chat**
- [ ] **1.3** contextSentence — Claude batch-generates or written manually? Unblocks sentence flashcards and Fill in the Blank. **Tool: Claude Projects planning chat**
- [ ] **1.4** 5 new words/day cap — enforce in app or leave to user? Affects Paths progression logic. **Tool: Claude Projects planning chat**
- [ ] **1.5** Stop gate — must a user attempt at least one output drill before a Stop can be completed? Soft gate (warning) or hard gate (blocked)? **Tool: Claude Projects planning chat**
- [ ] **1.6** Contextual Binding — after correct answer in output drills, show contextSentence for 2–3 seconds before moving on. All drills, output drills only, or Paths only? Affects DrillShell.jsx scope. **Tool: Claude Projects planning chat**

---

## STAGE 2 — Bug Fixes
*Fix before adding features. Bugs compound. A broken foundation makes everything harder.*

- [ ] **2.1** `index.css` syntax error — `Unexpected token` — find and fix. **Tool: Cursor Composer**
- [ ] **2.2** Word of the Day re-seeds mid-session — fix seed to use full `MASTER` array with date string only. Does not change based on mastered words. **Tool: Cursor Composer**
- [ ] **2.3** Translator tab — open live app → Trans tab → DevTools → Console → note exact error. Then fix. **Tool: DevTools diagnosis → Cursor Composer fix**
- [ ] **2.4** Type It drill — word/answer mismatch. Document exact observed behaviour first, then fix. **Tool: Cursor Composer**
- [ ] **2.5** Listen & Type — wrong audio plays after correct answer. Document exact behaviour first, then fix. **Tool: Cursor Composer**
- [ ] **2.6** Word detail card — opens at screen center, should open at tap position. **Tool: Cursor Composer**
- [ ] **2.7** Gender drill — word pool bug. Document exact behaviour, then fix. **Tool: Cursor Composer**
- [ ] **2.8** Sentence Builder — distractors bug. Document exact behaviour, then fix. **Tool: Cursor Composer**
- [ ] **2.9** Mastery count mismatch — profile and Words page show different counts. Find root cause (two different counting methods), unify. **Tool: Cursor Composer**
- [ ] **2.10** Community Word Packs import broken — words don't add to list. **Tool: Cursor Composer**
- [ ] **2.11** Community Word Packs entry form — Spanish + English fields need to be side by side. **Tool: Cursor Composer**

---

## STAGE 3 — Stabilization & Component Wiring
*Wire disconnected components. No half-built UI visible to users.*

- [ ] **3.1** Wire BottomNav — Cursor Composer, Wrapper Pattern. Confirm on localhost before pushing. **Tool: Cursor Composer**
- [ ] **3.2** Wire HomeTab — depends on stable shell from 3.1. **Tool: Cursor Composer**
- [ ] **3.3** Wire ProfileSheet — depends on 3.2. **Tool: Cursor Composer**
- [ ] **3.4** Wire BadgeGrid — reads from Firestore earnedBadges[]. Wire after badge logic exists. **Tool: Cursor Composer**
- [ ] **3.5** Wire LeaderboardNew — data-dependent. Wire last. **Tool: Cursor Composer**
- [ ] **3.6** Ko-fi button — add KofiSupport component to HomeTab. **Tool: Cursor Composer**
- [ ] **3.7** Milo vocabulary awareness fix — pass completedStops word list into Gemini system prompt in `api/chat.js` so Milo responds at the user's current level. **Tool: Cursor Composer**

  Prerequisites: Paths built and `completedStops[]` being populated with real data. Do not attempt before Paths Emergent session is complete.

  Implementation: Read `completedStops[]` from the user's Firestore doc in SpanishHub.jsx and pass it as a prop into MiloChat. In `api/chat.js`, inject the list into the system prompt as a new block:

  *"The user has completed the following Stops: [completedStops list]. Only use vocabulary and grammar structures from these Stops in your responses. If the user uses a word or structure beyond their current level, gently simplify your response rather than matching their complexity. Never use vocabulary the user has not yet encountered in their Stops."*

  This is the same api/chat.js file that holds the safety system prompt — add the vocabulary block after the safety rules, not before. The safety rules are immutable and always take precedence.

---

## STAGE 4 — Content Generation
*Claude generates all content before Emergent builds the features that need it.*

- [ ] **4.1** Batch-generate `contextSentence` for all 300+ words in `data/words.js` — one simple Spanish sentence per word showing it in context. **Tool: Google AI Studio (free, paste entire words.js)**
- [ ] **4.2** Add `contextSentence` field to every word entry in `data/words.js`. Paste AI Studio output. **Tool: Claude Code CLI**
- [ ] **4.3** Add `imageUrl` field scaffold to every word entry in `data/words.js` — empty string for now, ready for v3. **Tool: Claude Code CLI**
- [ ] **4.4** Review `data/paths.js` quiz questions — confirm output-direction questions are included alongside recognition questions. **Tool: Claude Projects review**
- [ ] **4.5** Confirm each Stop's drill sequence arcs from input → output (Stop 1 recognition-heavy, Stop 5 output-heavy). **Tool: Claude Projects review**
- [ ] **4.6** Write 5 Path lesson texts — one textbook-style lesson per Path, covering the grammar theme of that Path. These become the lesson card shown before the first Stop. **Tool: Google AI Studio**

---

## STAGE P1 — Monorepo Audit
*Diagnosis only. No changes. Must complete before P2.*

- [ ] **P1.1** Paste full codebase into Google AI Studio. Ask: "List every hardcoded language reference — 'Spanish', 'es', 'EN', 'SP', DeepL language codes, UI copy with language names, Firestore keys with language assumptions, any component that knows it is teaching Spanish." **Tool: Google AI Studio**
- [ ] **P1.2** Save findings as `MONOREPO_AUDIT.md` at repo root. Number every finding. **Tool: Claude Projects or manual**
- [ ] **P1.3** Review findings. Classify each as Tier 1 (trivial substitution), Tier 2 (logic change needed), or Tier 3 (schema migration). **Tool: Claude Projects planning chat**

---

## STAGE P2 — Language Config Object
*Replace hardcoded language values with a single config. No logic changes.*

- [ ] **P2.1** Create `frontend/src/config/languageConfig.js`:
```javascript
export const languageConfig = {
  appId: "milo-es-en",
  sourceLanguage: "es",
  targetLanguage: "en",
  uiLocale: "en",
  displayName: "Milo Speaks Spanish",
  drillDirectionLabel: "SP→EN",
  deeplSourceCode: "ES",
  deeplTargetCode: "EN-US",
  firestoreProgressKey: "es-en",
}
```
**Tool: Claude Code CLI**
- [ ] **P2.2** Replace every Tier 1 hardcoded value from MONOREPO_AUDIT.md with a reference to languageConfig. One file at a time. One session at a time. No logic changes. **Tool: Claude Code CLI**
- [ ] **P2.3** Confirm app behaves identically after substitutions. Test on localhost. **Tool: Firebase Emulator + browser**

---

## STAGE P3 — Content File Relocation
*Move content files into language-namespaced folder. No content changes.*

- [ ] **P3.1** Create folder `frontend/src/content/es-en/` **Tool: Claude Code CLI**
- [ ] **P3.2** Move `data/words.js` → `src/content/es-en/words.js` **Tool: Claude Code CLI**
- [ ] **P3.3** Move `data/paths.js` → `src/content/es-en/paths.js` **Tool: Claude Code CLI**
- [ ] **P3.4** Move `data/drillData.js` → `src/content/es-en/drillData.js` **Tool: Claude Code CLI**
- [ ] **P3.5** Update every import path across the codebase that references the old file locations. **Tool: Cursor Composer**
- [ ] **P3.6** Confirm app builds and runs. No content changes — only paths. **Tool: Firebase Emulator + browser**

---

## STAGE P4 — Firestore Progress Key Migration
*The only stage with live data risk. Emulator first. Always.*

- [ ] **P4.1** Write State Ledger spec for the migration — exactly how `progress.es` becomes `progress["es-en"]`, what the migration function does, what rollback looks like. **Tool: Claude Projects**
- [ ] **P4.2** Update all app code to read/write `progress["es-en"]` instead of `progress.es`. **Tool: Cursor Composer**
- [ ] **P4.3** Write one-time migration function — reads `progress.es`, writes to `progress["es-en"]`, leaves old key in place. **Tool: Cursor Composer**
- [ ] **P4.4** Run migration against Firebase Emulator. Verify existing progress data migrates correctly. **Tool: Firebase Emulator**
- [ ] **P4.5** Run migration against production Firestore. **Tool: Firebase Console + Terminal**
- [ ] **P4.6** Verify live app reads mastery data correctly after migration. **Tool: Live app**
- [ ] **P4.7** Schedule old `progress.es` key cleanup — 30 days after migration confirmed. **Tool: Calendar reminder**

---

## STAGE 5 — Pre-Emergent State Ledger
*Write the spec before opening Emergent. Emergent executes. It does not plan.*

- [ ] **5.1** Write Paths & Stops State Ledger spec — exactly how global state, local state, and Firestore track Stop progression, completion, and unlocking. **Tool: Claude Projects**
- [ ] **5.2** Write Bones & Streak Freeze State Ledger spec — exactly how bones are earned, deducted, and stored; how streak freeze logic works at midnight. **Tool: Claude Projects**
- [ ] **5.3** Confirm Milo straining pose and running-free pose have been generated. These must exist before the Break Free Emergent session. **Tool: ChatGPT image generation**
- [ ] **5.4** Confirm all voice clips have been generated and hosted at `frontend/public/audio/`. **Tool: ElevenLabs or Coqui**
- [ ] **5.5** Hand Emergent: State Ledger spec + design_guidelines.json + MILO-MASTER-REFERENCE.md + this file. Do not open Emergent without all four.

---

## EMERGENT — RESERVED SESSIONS (in order)
*Only after every stage above is marked complete.*

1. Paths & Stops progression logic
2. Bones & streak freeze system
3. Break Free — ¡Libre! mechanic
4. Milo vocabulary awareness fix (if not resolved in Stage 3)
5. DrillsGrid redesign — Input / Output / Warm Up sections

---

## LONG-TERM — MONOREPO MIGRATION (Post Stage 5)
*Do not start until Spanish is live, stable, and running without constant attention.*

- [ ] Write full monorepo blueprint document — structure, naming conventions, Turborepo config, Vercel deployment strategy per app, content file schema, language config shape. Save as `MONOREPO-BLUEPRINT.md`. **Tool: Claude Projects**
- [ ] Create Turborepo monorepo shell — `milo-platform/` with `packages/engine/`, `content/`, `apps/` structure. **Tool: Claude Code CLI + Terminal**
- [ ] Move Spanish app into `apps/milo-es-en/` as first tenant. **Tool: Claude Code CLI**
- [ ] Extract shared engine into `packages/engine/`. **Tool: Emergent**
- [ ] Build English for Spanish speakers (`en-es`) as first clone — proves the platform. **Tool: Content (Claude) + config change**
- [ ] French, German, Italian, Portuguese — content generation only, no new engineering. **Tool: Google AI Studio**

---

*This file is read-only during Emergent sessions — hand it as context, never ask Emergent to edit it.*
*Update CURRENT_STATE_LEDGER.md after each stage completes. This file tracks what needs doing. The ledger tracks what is done.*
