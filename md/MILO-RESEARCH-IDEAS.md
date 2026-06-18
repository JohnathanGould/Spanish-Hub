# Milo — Language Research Ideas
*Drafted by language-researcher pass — for review before merging into MILO-ACTION-LIST.md*

---

1. **Ear training drill (High Variability Phonetic Training)**
   New drill type using minimal-pair words (pero/perro, vowel-length contrasts) read by 3-4 different voices instead of one.
   Research basis: multi-voice exposure trains perceptual discrimination far better than single-voice repetition (Bradlow/Logan line of research).
   Effort: moderate — needs multiple TTS voices or recorded clips plus a new drill component; no architecture change.

2. **Pretest-before-instruction flip in Intro phase**
   Reorder the Intro screen so the first exposure to a new word asks for a guess (multiple choice from image context, no penalty) before showing the Spanish word/audio/English label, instead of instruction-first.
   Research basis: the pretesting/generation effect — guessing wrong before being shown the answer strengthens later encoding.
   Modality specification — audio-first: the guess should be elicited by audio, not by showing Spanish text. Don't display the written Spanish word until after audio has played and the user has attempted a guess — humans acquire spoken language before written language, so this should be a design philosophy across Intro, not just a one-off sequencing tweak.
   Effort: low — sequencing change to an existing screen, no new data model.

3. **Evening review nudge (sleep-timed consolidation)**
   A separate notification type, distinct from the generic streak reminder, that offers that day's due words specifically as a pre-bedtime review window.
   Research basis: sleep-dependent memory consolidation — material reviewed shortly before sleep retains better.
   Effort: low-moderate — notification logic + timing, no new content.

4. **Narrative-stakes task simulation ("Milo's World")**
   Extend the companion concept beyond drills/chat into a persistent town with recurring characters and ongoing low-stakes "Milo needs something" tasks (e.g., Milo forgot to buy bread for Grandma Lola, Milo needs a vet visit) where correct Spanish production changes a simulated outcome rather than just scoring an answer.
   Research basis: task-based language teaching with real consequence plus narrative-transfer research — people retain material attached to story and emotion far better than isolated content. This is a more developed version of plain scenario-based roleplay (see table stakes below): the difference is persistence and stakes, not the scenario itself.
   Content design rule — scenario re-encounter: don't just resurface vocabulary later (FSRS already does that). Deliberately reintroduce the same communicative *structure* (a request, a complaint, an apology) inside a different Stop's story beat days later, in a different emotional/practical context. This is the spaced-repetition principle applied to structures, not just words, and costs nothing extra once Milo's World content is being written — it's a writing rule, not a new system.
   v2 enhancement (not v1): give the learner occasional agency over story turns — choose the next event, solve a problem, explain a consequence in Spanish — rather than only reacting inside a fixed scene. Real engagement value, but it's branching-state complexity layered onto a system that doesn't exist yet. Build the linear version first and validate the core mechanic before adding branching.
   Effort: high — a content-generation pipeline and recurring-character state management, not a feature toggle.
   Sequencing note: build after Break Free ships and the persistent-companion mechanic is validated with real users.

5. **Cooperative (non-competitive) social mode**
   A shared-goal mechanic where two friends alternate turns contributing to one combined outcome (e.g., Milo's combined walk distance for the week), instead of competitive leaderboards.
   Research basis: social accountability without competitive anxiety, which most gamified language apps don't offer as an alternative.
   Effort: moderate — extends existing friends/Community architecture, needs a new shared-state model.

6. **Personalized daily narrative ("Milo's Diary")**
   Gemini-generated short daily story using only the user's actually-mastered words, built on the `contextSentence` field.
   Honesty flag: not novel industry-wide — Langua and MeloLingua already ship versions of this. Worth doing for parity/retention value, not as a differentiator claim.
   Content parameter — i+1 ratio: don't gate the generation prompt on "mastered words only." Target roughly 80% known vocabulary / 20% words just outside current mastery (Krashen's i+1), so the diary entry sits at the edge of comprehension rather than strictly inside it. Apply the same ratio to any other generated content (stories, reading passages, AI conversation prompts) — this is a content-difficulty targeting rule, not feature-specific.
   Effort: moderate — needs a prompt-engineered Gemini call gated on mastery data, plus a new UI surface.

---

## To explore further (new, genuinely additive)

7. **Retrieval-speed tracking as a mastery signal**
   Add a response-time field to the existing `progress{ c, w, s }` schema, captured per answer like `c`/`w` already are. Use response-time trend as an additional, secondary input to mastery tier and Fetch word selection.
   Research basis: automaticity/processing speed (Segalowitz, DeKeyser) predicts fluency better than raw accuracy or word count — fluent speakers don't know more words, they retrieve them faster.
   Citation-check caution: a directly-relevant methodological paper (Hui & Jia, 2024, *Annual Review of Applied Linguistics*) warns that response-time data shouldn't be trusted as a standalone individual proficiency signal — a fast responder may simply be trading accuracy for speed, not demonstrating more mastery. Implication: treat RT as a *tiebreaker* between words of similar stability, not a primary driver that can override accuracy-based mastery on its own.
   Effort: low-moderate — schema field addition plus a read on existing per-answer write path (`onUpdateWordProgress`); no new UI required to start, though a "speed" badge or display is a natural follow-on.
   Note: this generalizes what Break Free already does as a one-off speed round into a standing mastery signal — strong synergy with an existing mechanic rather than a competing one.
   Widened scope — adaptive explanation depth: the same signal (response time, plus hesitation/retry count where capturable) should also feed the existing Gemini chat tutor's adaptiveness, not just drill mastery. Concrete behavior rule: fast + correct → lighter hints, less translation, faster pacing; slow or hesitant → more context, narrower choices, a visual cue. Same data, second consumer — no separate system needed.

8. **Opt-in "Immersion Mode" — UI shifts toward Spanish as proficiency grows**
   An optional toggle (not silent/automatic) that progressively replaces app UI strings — buttons, menus, notifications, Milo's own lines — from English to Spanish as the user's mastery data crosses thresholds.
   Research basis: full immersion outperforms translated scaffolding; this is the automated version of a manual technique some learners already do (setting a phone's OS language to the target language).
   Effort: moderate-high — fits Milo's existing language-agnostic content architecture and generic UI-string variables well, but UI vocabulary (Settings, Continue, Log out) isn't the same as taught vocabulary, so this needs its own small "interface glossary" taught separately from lesson words.
   Phasing constraint: don't translate every UI string at once. Start with Milo's own speech and high-frequency navigation strings only; expand gradually as proficiency thresholds are crossed. Translating all settings/menu labels in one jump risks UI overwhelm that defeats the immersion benefit it's meant to create.
   Risk flag: must be opt-in, not automatic — silent UI language migration risks confusion and support load that cuts against the rest of Milo's low-friction design. Frame as an advanced/immersion toggle for users who ask for it, not a default progression.

9. **Noticing feedback (Schmidt's noticing hypothesis)**
   On a wrong answer in output drills, show the user's exact attempt next to the correct native form with no grammar explanation attached — e.g. "You wrote: Yo es feliz. Native speakers say: Yo soy feliz." Let the contrast itself do the work.
   Research basis: Schmidt's noticing hypothesis — learners often improve by noticing a gap between their output and the target form, independent of explicit rule explanation.
   Effort: low — a feedback-copy/format change on existing output drills (Type It, Fill in the Blank, Sentence Builder); no new data model.

10. **Forgetting Index**
    A weekly stats surface using existing progress data, framed around normal forgetting rather than only mastery: "Words strengthened this week: 42. Words slipping: 11. Words rescued: 7."
    Research basis: normalizing forgetting (rather than only celebrating mastery) reduces learner frustration and matches how memory actually behaves.
    Effort: low — read/aggregation on data already tracked in `progress{ s }`; no new tracking required. Fits the project's existing no-punishment philosophy (Break Free's failure framing, no XP penalties) better than most items on this list.

12. **Error Pattern Detection**
    Track *why* a word or structure is missed, not just that it was missed — e.g. surfacing "your most common mistake this month is ser vs. estar" rather than only a per-word correct/incorrect count, then generating targeted remediation.
    Research basis: error-pattern-aware tutoring moves the system closer to what a human tutor does (diagnosing a category of mistake) rather than a flashcard engine tracking isolated items.
    Prerequisite — not yet buildable as-is: Milo's content is mostly word-level vocabulary plus one Conjugation drill, with no general grammar-category tagging on drill content. This needs grammar-pattern metadata added to relevant drills first (which structure each question is testing), not just a new query on existing per-word data.
    Effort: moderate-high once the content prerequisite is met.

13. **"Teach Milo" drill (protégé effect)**
    Milo pretends not to know a word or gets it wrong, and the user corrects or teaches him — e.g. "I think casa means car?" — user corrects it.
    Research basis: the protégé effect — people retain material better when they teach it, even to a non-real "student."
    Why this is the standout: this isn't just well-grounded research, it's the most direct mechanical expression available of Milo's own stated core identity — `NEW_MILO_PRODUCT.md` already establishes "Milo is a black lab who learns Spanish alongside the user. He does not already know Spanish." Right now that's narrative flavor; this drill would make it something the user actually experiences, not just reads. Strong brand fit, not just research fit.
    Effort: moderate — new drill type, but reuses existing word/drill data; the work is mostly in writing Milo's "wrong guesses" naturally.

14. **Conversation memory in the AI tutor**
    The Gemini chat tutor should remember facts the user has shared across sessions — "I have two sons" in week 1 surfacing as "how are your sons doing?" in week 4 — instead of starting fresh every conversation.
    Research basis: this is less an SLA-specific finding and more a real product gap — most AI language tutors have no persistent memory, and continuity is what makes a conversation feel real rather than transactional.
    Effort: high relative to the rest of this list — needs a persistent per-user fact store, retrieval/relevance logic to decide what's worth injecting into a given prompt, careful Firestore read/write budgeting against the project's own cost rules (parent fan-out, no large-collection listeners), and privacy handling for stored personal details. Not a small add — flag as its own scoped build, not a drill-level tweak.

**Note — confidence tracking already covered:** both AI passes independently suggested a post-answer confidence rating (Certain/Unsure/Guess). This isn't new — it's already in `MILO-ACTION-LIST.md` under Discuss Later as "Confidence self-rating after correct answers" (Easy/Medium/Hard). Worth treating as confirmation that decision deserves a revisit, not as a new item here.

## Expansions on what's already planned

- **`customWords[]` (personal vocabulary)** — already exists in Firestore for this purpose. Add: automatic vision-based labeling of a user-uploaded photo (e.g., their kitchen or their own dog) instead of manual entry only, using a vision-capable model to suggest words for one-tap add. Lowers friction on a feature that already exists rather than introducing a new one.
- **Community Word Packs (currently buggy, known bug #7)** — once the import bug is fixed, extend with AI-generated profession/interest-specific packs (e.g., a childcare-worker pack, a healthcare pack) generated on request rather than only user-submitted. Personal relevance is a real motivation lever, but this rides on a feature already in the codebase, not a new pillar.

## Table stakes — not differentiating, but should still exist

These are now standard in the category (Duolingo Stories, Babbel, Mondly, Langua all do versions of them). Milo shouldn't skip them just because they aren't novel — their absence would read as a gap to anyone who's used a competitor.

- **Standard scenario task chains** — ordering food, checking into a hotel, buying a bus ticket. Plain task-based scenario content, distinct from the persistent "Milo's World" version above which adds stakes and continuity. Worth having as baseline content regardless of whether Milo's World gets built.
- **Conversational gap-filling in the AI tutor** — letting a user mid-chat say "how do I say this" and getting just the missing piece, rather than only structured Q&A. This is close to what Milo's existing Gemini chat tutor could already support with the right prompting — treat as a chat-tutor prompt refinement, not a new feature.

## Flagged — low confidence, needs validation before any real build

14. **No-detection gesture cueing for pronunciation**
   Milo visually demonstrates a mouth-shape or hand cue tied to a difficult sound, and the user mimics it with no camera detection or verification at all — purely for whatever elaborative-encoding benefit comes from the user performing the cue themselves.
   Research basis check: the underlying research (gesture aiding pronunciation noticing/correction) is real and peer-reviewed, but it studies classroom settings with a teacher present and explicitly calls for more robust research designs in future work — this is a promising, early-stage area, not a settled one.
   Why this version, not full gesture recognition: a real-time camera-based gesture-detection feature would be a major technical lift for Milo's current stack (no ML vision pipeline) chasing evidence that isn't mature enough at the self-study, unsupervised level to justify it. The no-detection version captures some of the hypothesized benefit at near-zero engineering cost.
   Status: flag only — worth a cheap internal test (does anyone actually do the gesture?) before committing any roadmap space to it.

---

## Next step
Decide which items move into `MILO-ACTION-LIST.md` and under which section. Most of these read as **Discuss later** given current beta-stabilization priorities. Lowest-effort / sooner-consideration candidates: #2 (pretest flip, now audio-first), #9 (noticing feedback), #10 (Forgetting Index), and #7 (retrieval-speed tracking, now scoped as a tiebreaker rather than a primary signal per the citation-check caution). #12 (Teach Milo) is the standout for brand fit and deserves a look even though it's moderate effort. #11 (Error Pattern Detection) and #13 (conversation memory) are good but should wait on their stated prerequisites. #14 (gesture cueing) should not be scheduled at all — it's a flag, not a commitment.
