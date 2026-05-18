# 🐾 Milo — Task List
*Open in VS Code split screen alongside the file you are working on*
*Check boxes as you go: change `[ ]` to `[x]`*
*Last updated: May 2026*

---

## ⚡ PHASE 0 — Decisions needed before anything else
*These block later phases. Make them first.*

- [ ] **0.1 — Brand name decision** — "Milo Speaks Spanish" or "Milo Speaks" as umbrella?
      → Check milospeaks.com / milospeaks.ca domain availability first
      → Take to: Milo — Planning & Decisions chat

- [ ] **0.2 — Log tab** — keep it, rename to "Records", or remove?
      → Blocks Emergent wiring. Decide before Session 1.
      → Take to: Milo — Planning & Decisions chat

- [ ] **0.3 — sofia → Milo tab ID rename** — schedule as its own dedicated Emergent session
      → Do NOT bundle with a feature build. Pick a date.
      → Add to schedule once decided.

- [ ] **0.4 — Video production method** — Frameloop ($75–200 outsourced) or AI tools ($65–95 one month)?
      → Take to: Milo — YouTube & Growth chat

---

## 🔧 PHASE 1 — Manual tasks
*5–15 min each. Free. Do these first — no tools required.*

- [ ] **1.1** — Delete `.gitconfig` from the root of Spanish-Hub if present (~5 min)
- [ ] **1.2** — Rename `FRONTEND > SRC > COMPONENTS > Header.jsx` → `Header.old.jsx` in VS Code (~5 min)
- [ ] **1.3** — Verify all Vercel environment variables are set (especially `OPENAI_API_KEY` for Plaza moderation) (~15 min)
- [ ] **1.4** — Open live app, go to Trans tab, open DevTools → Console. Write down the exact error message. (~10 min)
- [ ] **1.5** — Open Drills tab, run Type It drill. Write down exactly what the mismatch bug does with an example word. (~10 min)
- [ ] **1.6** — Run Listen & Type drill. Note exactly what audio plays after a correct answer. (~10 min)
- [ ] **1.7** — Run Gender drill. Note the word pool bug — what specific words appear wrong? (~10 min)
- [ ] **1.8** — Take a screenshot of every tab in its current state before any changes. Label: `before-[tabname].png` (~15 min)

---

## 🛠 PHASE 2 — Windsurf tasks
*15–30 min each. Free. Do after Phase 1.*
*Open Milo — Fixes chat for full instructions on each.*

- [ ] **2.1** — Set up `dev` branch in GitHub + confirm Vercel preview URL is working
- [ ] **2.2** — Import `BottomNav` into `SpanishHub.jsx` (render fixed at bottom of app-container div)
- [ ] **2.3** — Add to `DEFAULT_DATA` in `SpanishHub.jsx`:
      ```
      completedPaths: [],
      completedStops: [],
      audioListenEnabled: true,
      audioSpeakEnabled: true,
      ```
- [ ] **2.4** — Install remaining npm packages inside `frontend/`:
      ```
      npm install lucide-react framer-motion canvas-confetti html-to-image lottie-react
      ```
      Then commit `package.json` and `package-lock.json`.

---

## 📝 PHASE 3 — Claude tasks (Content chat)
*30–60 min each. Free. Do one at a time.*
*See Milo-Content-Handoff.md for the exact prompts to paste.*
*Do Task 7 (Emergent Brief) LAST — it depends on all others.*

- [ ] **3.1 — Task 3** — Firebase structure reference document
- [ ] **3.2 — Task 8** — Bones earning logic spec (include explicit Flashcard carve-out)
- [ ] **3.3 — Task 6** — Privacy Policy + Terms of Service text
- [ ] **3.4 — Task 4** — Placement test questions JSON (20 questions)
- [ ] **3.5 — Task 5** — Grammar reference cards JSON
- [ ] **3.6 — Task 10** — Component map (paste SpanishHub.jsx, receive map)
- [ ] **3.7 — Context sentences** — batch generate for all 302 words in words.js
- [ ] **3.8 — Task 1** — 52-week word and phrase of the week schedule JSON
- [ ] **3.9 — Task 7** — Write Emergent brief ← DO THIS LAST

---

## ✅ PHASE 4 — Pre-Emergent validation
*Do this before opening Emergent for the first time.*

- [ ] **4.1** — All Phase 3 outputs saved as project files in VS Code (so every chat can see them)
- [ ] **4.2** — `dev` branch confirmed working with Vercel preview URL
- [ ] **4.3** — All bug error messages documented (from Phase 1.4–1.7)
- [ ] **4.4** — `design_guidelines.json` confirmed in repo root
- [ ] **4.5** — Test app on phone at 360px CSS width — confirm mobile layout
- [ ] **4.6** — Emergent brief (Task 7) complete and saved

---

## 🚀 PHASE 5 — Emergent sessions
*Do in this order. Confirm working on localhost AND deployed before moving to the next.*
*See Milo-Emergent-Prep-Handoff.md for briefs.*

- [ ] **5.1 — Session 1** — Wire MiloHeader, HomeTab, BottomNav, ProfileSheet into SpanishHub.jsx
- [ ] **5.2 — Session 2** — BadgeGrid + LeaderboardNew + badge system (earnedBadges[])
- [ ] **5.3 — Session 3** — Bones earning and streak freeze system (Flashcard carve-out explicit)
- [ ] **5.4 — Session 4** — Fetch game mode (word selection algorithm + UI)
- [ ] **5.5 — Session 5** — Training tab (Paths/Stops UI, progression logic, Firestore)
- [ ] **5.6 — Session 6** — Fix broken features (Translator, Type It, Listen & Type, Gender drill)
- [ ] **5.7 — Session 7** — Milo vocab awareness (completedStops words into system prompt)
- [ ] **5.8 — Session 8** — Rename passes (Drills → Practice, sofia → Milo tab ID)

---

## 🎬 PHASE 6 — YouTube & Growth
*Run alongside Phase 5. See Milo-YouTube-Growth-Handoff.md.*

- [ ] **6.1** — Set up YouTube channel (name, art, description, links) — before any videos uploaded
- [ ] **6.2** — Decide video production method (Phase 0.4 must be decided first)
- [ ] **6.3** — Produce all 25 Stop videos
- [ ] **6.4** — Upload first 3–5 videos to YouTube before Play Store launch
- [ ] **6.5** — NS settlement network outreach for beta testers (ISANS Halifax, YREACH YMCA)
- [ ] **6.6** — Set up Reddit account participation (9:1 rule — 4 weeks before the launch post)

---

## 🏪 PHASE 7 — Play Store prep
*After Phase 5 is complete and beta testing passed.*

- [ ] **7.1** — Beta testing: recruit 20 testers (10 Reddit/contacts + 10 NS newcomers via settlement networks)
- [ ] **7.2** — Fix all P1 bugs from beta feedback
- [ ] **7.3** — Confirm Day-3 retention > 40% in tester group
- [ ] **7.4** — Write App Store listing copy (see Milo-Design-Brand-Handoff.md)
- [ ] **7.5** — Capture Play Store screenshots
- [ ] **7.6** — Build companion workbooks in Canva — 5 Paths × $5–8 PDF + teacher $20 unlimited licence
- [ ] **7.7** — Upload workbooks to Gumroad and Amazon KDP
- [ ] **7.8** — Set up Ko-fi page with full copy (see Milo-Design-Brand-Handoff.md)
- [ ] **7.9** — Register Google Play developer account ($25 USD one-time)
- [ ] **7.10** — Submit app to Google Play
- [ ] **7.11** — PWA manifest.json + service worker (Emergent task, $0, before Play Store)

---

## 📋 PHASE 8 — Legal (before Play Store)

- [ ] **8.1** — Host Privacy Policy at a public URL (Vercel /privacy or Notion page)
- [ ] **8.2** — Host Terms of Service at a public URL
- [ ] **8.3** — Add account deletion mechanism to app settings
- [ ] **8.4** — Set Play Store age rating to 13+
- [ ] **8.5** — Trademark search: "Milo Speaks" via CIPO — cipo.ca (free to search)
- [ ] **8.6** — NS business name registration (~$100) — after Play Store launch

---

## 🗣 PHASE 9 — Launch

- [ ] **9.1** — Reddit launch post — r/languagelearning (Tuesday–Thursday 9am–12pm EST)
- [ ] **9.2** — Reply to every comment for 48 hours
- [ ] **9.3** — Post to r/learnspanish (48 hours after first post)
- [ ] **9.4** — Post to r/Spanish (48 hours after second post)
- [ ] **9.5** — Contextual replies in r/duolingo complaint threads (not a direct post)
- [ ] **9.6** — CBDC Truro consultation call — explore grant options
- [ ] **9.7** — Check Innovacorp/Invest Nova Scotia competition schedule

---

## 🧠 LEARNING DESIGN — Decisions (take to Milo — Learning Design chat)
*Not blocking until Training tab build (Phase 5.5). Decide before that session.*

- [ ] **LD.1** — Does mastery require output success, or is it advisory only?
- [ ] **LD.2** — Should output drills award more XP than input drills? (2× XP option)
- [ ] **LD.3** — Should a Stop require at least one output drill before completion?
- [ ] **LD.4** — How does Fetch select words — output-weak specifically, or low-confidence generally?
- [ ] **LD.5** — 5 new words per day cap — enforce in the app, or advisory only?
- [ ] **LD.6** — 80/20 session composition — build into Fetch word selection?
- [ ] **LD.7** — Contextual Binding post-answer step — all drills, output only, or Paths only?
- [ ] **LD.8** — Situational theme tags — add `theme` field to words.js alongside `category`?
- [ ] **LD.9** — Add `imageUrl` field to words.js now (scaffold for v3)?
- [ ] **LD.10** — Add `contextSentence` field to words.js (needed before Paths build)?

---

## 🕐 PARKING LOT — Not relevant until post-launch
*Good ideas. Come back to these after the app is stable with real users.*

- [ ] Universal Concept IDs for multi-language database (needed before franchise app 2)
- [ ] User-uploaded images and custom hints per word
- [ ] Confidence self-rating after correct answers (Easy / Medium / Hard → spaced repetition)
- [ ] Dynamic scaffolding — strip choices as a word matures
- [ ] Hint button — costs bones, reveals contextSentence with word blanked
- [ ] Performance-based mastery downgrade (missed twice → downgrade tier)
- [ ] Definition Match drill (Spanish description → target word — monolingual thinking)
- [ ] Resend email — add when meaningful user base exists
- [ ] Custom domain — add when ready for Play Store push (~$12/yr)
- [ ] Apple App Store — defer until Android has traction ($99/yr)
- [ ] Bone cosmetics shop — build only if user base grows
- [ ] Revenue projection revisit — at 10,000 MAU with real data

---

## ✅ COMPLETED
*Move items here with the date when done.*

<!-- - [x] Item description — completed YYYY-MM-DD -->
