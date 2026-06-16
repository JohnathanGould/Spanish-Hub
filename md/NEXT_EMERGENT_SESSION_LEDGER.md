# Next Emergent Session Ledger
# Milo Speaks Spanish
# Written: 2026-06-07
# Purpose: Pre-session preparation checklist, Emergent session plan, and Play Store readiness roadmap

---

## Emergent Session Plan — Next Month (~100 tokens)

| # | Session | What Gets Built | Est. Tokens |
|---|---|---|---|
| A | Badge triggers | earnedBadges[] wired across drill complete, Stop complete, Path complete, streak milestones | 8–12 |
| B | Friend + Admin notifications | Friend added notification, admin alert notification (community pack submissions) | 10–15 |
| C | Bones & streak freeze system | Freeze purchase UI, freeze logic, streak protection, Firestore writes | 10–15 |
| D | YouTube player in Stop UI | Embedded YouTube player per Stop using videoUrl field already in paths.js | 5–8 |
| E | Milo vocabulary awareness | Milo AI chat knows user's learned words, progress, references them in conversation | 8–12 |
| F | Fetch standalone mode | Full Fetch session experience separate from Paths, FSRS-driven across all completed Stops | 10–15 |
| G | Break Free / ¡Libre! | Animation state machine, chain-snap celebration, Milo pose integration, Fetch unlock trigger | 15–20 |
| — | Setup waste budget | Pre-flight repo checks, brief corrections | 5 |
| **Total** | | | **71–102** |

**Session order is locked — do not reorder:**
A → B → C → D → E → F → G
Each session is independent enough to run cleanly. Break Free goes last — highest risk, depends on Milo poses existing.

---

## What Must Be Complete Before Next Emergent Session

Everything below must be done in the next month using Claude Code, Claude Projects, and Google Flow. No Emergent tokens spent on any of this.

### 🔴 Critical — Emergent sessions depend on these

- [ ] **Milo poses generated in Google Flow**
  Required before Session G (Break Free). Minimum poses needed:
  - `milo_straining.gif` — Milo pulling at chain, urgency, effort
  - `milo_free.gif` — Milo running free, joyful, overjoyed
  - `milo_celebrating.gif` — celebration pose for Path/Stop completion
  - `milo_wrong_tilt.gif` — head tilt, uncertain expression
  - `milo_encouraging.gif` — warm, supportive look after wrong answer
  All generated with white background. Same style as milo_idle.gif. Purple collar, gold MILO tag.
  Flow prompt template: "Milo the black lab [pose description], white background, purple collar, gold bone-shaped MILO tag, semi-realistic cartoon style, seamless loop"

- [ ] **Scroll fix in PathsTab**
  WordIntroCard and dynamic-drill container require scrolling to see buttons.
  Claude Code CSS fix — single file, 30 minutes. Do this week.

- [ ] **Full Paths loop tested end to end**
  Go through a complete Stop: Phase 1 → Phase 2 → Phase 3 → Stop complete → next Stop unlocked.
  Document every bug found. Fix all before Emergent.

- [ ] **Bones verified incrementing in header**
  Complete a Phase 3 drill answer correctly. Confirm bones count increments visibly in the header.
  If broken — Claude Code fix before Emergent.

- [ ] **State Ledger specs written for all 7 Emergent sessions**
  Write one spec per session in Claude Projects before Emergent month starts.
  Each spec defines: state ownership, Firestore writes, component changes, props, callbacks.
  Do not open Emergent without a spec. Emergent executes — it does not plan.

### 🟡 Important — improves session quality

- [ ] **ChoiceDrill sounds wired**
  playCorrect and playAlmost not imported or called in ChoiceDrill.
  Claude Code — single file, 15 minutes.

- [ ] **Word mastery filter buttons wired in Words tab**
  Filter by New / Learning / Strong / Mastered using FSRS stability thresholds.
  Claude Code task.

- [ ] **contextSentence populated for all 300+ words**
  Already populated — verify 5 random words have non-empty contextSentence field.
  Blocks: sentence flashcards, Fill in the Blank, Contextual Binding.

- [ ] **imageUrl verified loading in Phase 1**
  Open a Stop, go through Phase 1. Do images load or show ImageOff fallback?
  If all showing fallback — Picsum URLs may need verifying or replacing with real images.

- [ ] **Community Word Packs import fixed**
  Bug 2.10 — import not saving correctly. Claude Code fix.

- [ ] **Community Word Packs entry form**
  ES/EN fields side by side. Claude Code fix.

- [ ] **Word detail card tap position**
  Opens at screen center instead of tap position. Claude Code fix.

- [ ] **Sentence Builder distractors bug**
  Claude Code fix — investigate and repair.

### 🟢 Nice to have — not blocking

- [ ] **Full Milo pose spec built**
  Document every pose needed across the entire app, with Flow prompts for each.
  Do in Claude Projects — one session.

- [ ] **5 new words per day soft nudge**
  After 5 new words in a session, Milo suggests reviewing before adding more.
  Claude Code.

- [ ] **Contextual Binding post-answer step**
  After correct Phase 3 answer, show contextSentence for 2-3 seconds before advancing.
  DrillShell.jsx change — Claude Code.

- [ ] **Streak reminder styling**
  Make streak reminder stand out more visually.
  Claude Code / CSS only.

- [ ] **ProfileSheet milo-speaks.com yellow pill link**
  Add link to landing page in profile header.
  Claude Code.

---

## Play Store Readiness Checklist

Everything needed to submit to Google Play Store. In order.

### 🔴 Technical — app must work

- [ ] **Paths loop stable** — no crashes, no broken navigation, complete Stop flow working
- [ ] **All known bugs fixed** — see Known Bugs in ledger
- [ ] **Firebase emulator testing complete** — run full user journey against emulator before submission
- [ ] **No console.log in production code** — run audit, remove all
- [ ] **Firestore security rules reviewed** — no open reads/writes
- [ ] **Environment variables verified** — all set in Vercel Production + Preview
- [ ] **PWA manifest complete** — name, icons, theme colour, display mode all correct
- [ ] **Offline behaviour defined** — what happens with no connection? At minimum: graceful error, not crash
- [ ] **Performance audit** — Lighthouse score, bundle size, lazy loading critical paths
- [ ] **Sentry error monitoring verified** — errors being captured and reported

### 🔴 Store listing — required by Google

- [ ] **Google Play Developer account** — $25 one-time fee, pay when ready
- [ ] **App icon** — 512×512 PNG, no alpha channel, no rounded corners (Google applies them)
- [ ] **Feature graphic** — 1024×500 PNG (the banner shown in store listing)
- [ ] **Screenshots** — minimum 2, maximum 8, phone screenshots (1080×1920 or similar)
- [ ] **Short description** — 80 characters max
- [ ] **Full description** — 4000 characters max
- [ ] **Privacy Policy URL** — required for any app. Host on milo-speaks.com/privacy
- [ ] **Content rating questionnaire** — Google asks about content type, answer honestly (Educational)
- [ ] **Target audience** — declare age range (13+ recommended, requires COPPA consideration)
- [ ] **App category** — Education

### 🟡 Legal & compliance

- [ ] **Privacy Policy written** — must cover: data collected (email, progress), Firebase, Gemini API, PostHog, Sentry
- [ ] **Terms of Service written** — basic T&S covering app usage
- [ ] **COPPA compliance** — if targeting under 13, strict rules apply. Recommend 13+ to avoid.
- [ ] **GDPR consideration** — if EU users, data handling disclosure required
- [ ] **Charitable giving disclosure** — 80/20 model must be documented somewhere public before it's stated anywhere

### 🟡 Store presence

- [ ] **Milo Speaks Spanish app title** — confirm this is the final name
- [ ] **Package name locked** — `com.milospeaks.spanish` or similar — cannot change after publish
- [ ] **Version numbering** — start at 1.0.0, semantic versioning from here
- [ ] **Release track** — Internal → Closed Testing → Open Testing → Production. Don't go straight to Production.
- [ ] **Play Store listing copy written** — description, short description, what's new

### 🟢 Growth & monetisation readiness

- [ ] **Ko-fi page live and linked** — already exists, verify link in app
- [ ] **Reddit community active** — r/MiloSpeaksSpanish, post before Play Store launch
- [ ] **milo-speaks.com landing page polished** — app store badge added after submission
- [ ] **1,000 MAU for 60 days** — required before charity model goes public
- [ ] **First revenue distribution made** — required before charity model story is told publicly
- [ ] **YouTube channel set up** — Milo Speaks Spanish channel, art, description, links
- [ ] **AdSense application** — after 1,000 subscribers + 4,000 watch hours

### 🔴 Emergent sessions complete

- [ ] **All 7 Emergent sessions done** — badges, notifications, bones/freeze, YouTube, Milo awareness, Fetch, Break Free
- [ ] **Break Free tested** — ¡Libre! chain-snap working, Fetch unlock working
- [ ] **Milo AI tutor stable** — vocabulary awareness working, 30/day limit enforced

---

## Month Plan — June → July 2026

### Week 1 (this week)
- Scroll fix in PathsTab (Claude Code — today)
- Test full Paths loop, document bugs
- Fix bones display
- Fix ChoiceDrill sounds
- Generate 5 Milo poses in Google Flow

### Week 2
- Fix all documented Paths bugs
- Wire mastery filter buttons
- Fix Community Word Packs bugs
- Fix word detail card tap position
- Write State Ledger specs for Emergent Sessions A, B, C

### Week 3
- Contextual Binding post-answer step
- Streak reminder styling
- ProfileSheet link
- 5 new words nudge
- Write State Ledger specs for Emergent Sessions D, E, F, G

### Week 4
- Firebase emulator full journey test
- Privacy Policy + Terms of Service written
- Play Store developer account created
- App icon + feature graphic + screenshots created
- All State Ledger specs reviewed and ready

### Month end
- Emergent tokens reset
- Run all 7 sessions in order
- Push to Play Store internal testing track

---

## Definition of Done — Ready to Clone

The Spanish app is ready to clone when ALL of the following are true:

- [ ] On Google Play Store (internal testing minimum)
- [ ] All 7 Emergent sessions complete
- [ ] All known bugs fixed
- [ ] Paths loop stable for 30+ days with real users
- [ ] At least 500 MAU
- [ ] Monorepo prep P1-P3 complete
- [ ] No open critical bugs
- [ ] Milo AI tutor vocabulary-aware
- [ ] Break Free mechanic live
- [ ] Charitable model publicly activated (1,000 MAU + first distribution)

Estimated clone-ready date: **September–October 2026** if the month plan above is followed.
