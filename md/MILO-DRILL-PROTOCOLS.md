# 🐾 Milo Speaks Spanish — Drill Protocols
*Science-backed design decisions for every drill in the system*
*Built in Learning Design chat — add to Project Files when all drills are complete*
*Last updated: 2026-05-24*

---

## Foundational Principles
*These apply to every drill. Established before individual drill protocols.*

---

### The Multi-Channel vs Multi-Task Principle

**Multi-channel is good. Multi-task is bad.**

Multi-channel means multiple sensory inputs all pointing at the same target simultaneously — image + audio + Spanish word reinforcing the same concept. This is Paivio's Dual Coding Theory: information encoded through multiple channels builds more retrieval pathways. More ways in means more ways back out.

Multi-task means two different cognitive jobs competing for the same limited working memory. Adding English meaning to a Spanish-output drill is not multi-channel — it is multi-task. It routes the brain through a translation reflex while it should be building a direct Spanish retrieval pathway.

**The test for every drill element:** Does this addition point at the same target as the drill's core skill — or does it redirect to a different cognitive job?

---

### The Drill Tier System

| Tier | Drills | XP / Bones | FSRS Update |
|---|---|---|---|
| **Practice** | Fill in the Blank, Type It EN→SP, Listen & Type, Sentence Builder, Conjugation, Multiple Choice EN→SP | ✅ Yes | ✅ Yes |
| **Warm Up** | Matching, Hear & Choose | ❌ No | ❌ No |
| **Review** | Flashcard | ❌ No | ❌ No |

**Research basis:** Retrieval practice (Roediger & Karpicke, 2006) and the testing effect are the most robustly supported learning techniques in cognitive psychology. Practice tier drills are where real learning happens. Warm Up and Review drills are entry points and passive review — valuable, but not the primary learning engine.

---

### The No-English Rule

English is never the primary retrieval trigger after Phase 1 introduction. It appears once — as a small confirmation label on the Phase 1 Introduction screen — and is never shown as a prompt or answer in Practice drills, with one research-validated exception: Multiple Choice EN→SP, where English functions as the production trigger (Kroll & Stewart, 1994).

---

### The Gender Article Rule

Every Spanish noun is shown with its definite article in every drill, every time — "el perro" not "perro", "la ciudad" not "ciudad". The article is treated as part of the word's identity from first encounter.

**Research basis:** Gender must be learned with the word, not added later as a separate fact. English speakers have no grammatical gender in their L1, making Spanish gender acquisition particularly difficult. Consistent exposure to el/la from Phase 1 embeds gender as part of the word's mental representation. Learners who correctly assign gender to nouns do not automatically exhibit correct gender agreement — consistent exposure from first encounter is the most reliable way to build this connection (sequential acquisition research).

**Production rule:** The article is shown in context everywhere but only required in production where it appears naturally in the sentence. In Type It EN→SP (isolated word production), the user types the noun stem only — the article is visible on screen as context but not required in the typed answer. In sentence-level drills (Fill in the Blank, Sentence Builder, Listen & Type), the article appears as part of the sentence and is produced naturally.

| Drill | Article shown | Article produced |
|---|---|---|
| Phase 1 Introduce | ✅ "el perro" | ❌ No production |
| Type It EN→SP | ✅ Visible as context | ❌ Stem only typed |
| Fill in the Blank | ✅ In sentence | ✅ Natural sentence context |
| Listen & Type | ✅ Audio says "el perro" | ✅ User types "el perro" |
| Sentence Builder | ✅ Article tile included | ✅ Must place article tile |
| Multiple Choice EN→SP | ✅ Options show "el perro" | ❌ Recognition only |
| Flashcard | ✅ "el perro" on front | ❌ No production |
| Matching | ✅ "el perro" on card | ❌ No production |
| Hear & Choose | ✅ Audio says "el perro" | ❌ Recognition only |

---

### The 3-Strike Error Model

Applies to all Practice drills where the answer is not visible on screen.

| Attempt | Response | Notes |
|---|---|---|
| 1st wrong | "Try again 🐾" — no answer shown | Retrieval attempt primes the brain |
| 2nd wrong | "Almost — try once more 🐾" | Optional: small hint depending on drill |
| 3rd wrong | "Good try! The answer is [word] 🐾" | Warm, never punishing |

**Research basis:** Kornell et al. (2009) — even failed retrieval attempts improve retention of the correct answer more than passive exposure. The hypercorrection effect (Butterfield & Metcalfe, 2001) — correction after a confident wrong answer is remembered better than correction after uncertainty. Ceiling at 3 attempts — beyond this, diminishing returns and anxiety increase (Krashen's affective filter).

**FSRS rating mapping:**
- Correct on attempt 1 → Rating: Good
- Correct on attempt 2 or 3 → Rating: Hard
- All 3 wrong → Rating: Again

For recognition drills where options are visible (Multiple Choice, Hear & Choose): move on after one wrong answer. Options are already displayed — retrying has minimal additional retrieval value.

---

### The Unified Scaffolding Principle

Every Practice drill scales difficulty automatically based on the word's FSRS mastery tier. No new Firestore fields required — derives directly from existing `stability` and `outputCorrect` values.

| Mastery Tier | FSRS Condition | Word / Hint Support | Image Support |
|---|---|---|---|
| **Learning** 🌱 | stability < 7 OR outputCorrect = 0 | Maximum support (word bank, full options) | Full image |
| **Strong** 💪 | stability ≥ 7 AND outputCorrect ≥ 1 | Reduced support (first letter, fewer options, Think First) | Partial / fractured image |
| **Mastered** ⭐ | stability ≥ 30 AND outputCorrect ≥ 3 | No support — pure recall | No image |

**Research basis:** Robert Bjork's desirable difficulties principle — harder retrieval conditions for well-known material produce dramatically stronger long-term retention than easy retrieval conditions. Removing scaffolding as mastery increases is the scientifically optimal path to durable memory. Each user gets a personalised difficulty curve per word, automatically.

---

### Contextual Binding (Phase 3 Only)

After every correct Phase 3 answer, the word's `contextSentence` is displayed in Spanish for 2–3 seconds before advancing. This is not a drill — it is a consolidation step. English does not appear.

**Research basis:** Words learned in sentence context are retained significantly better than isolated words (Nation, 2001). The post-correct moment is a low-cognitive-load window where contextual anchoring is most effective.

---

## Practice Drills — Full Protocols

---

### Drill 1 — Fill in the Blank

**Core skill:** Contextual recall. User sees a Spanish sentence with the target word blanked and types it from memory.

**Drill direction:** Spanish sentence → Spanish word production

**Phase:** Phase 3 (Produce) only. Never used before Phase 1 introduction.

**Research basis:** Cloze tests outperform multiple-choice tests for productive vocabulary acquisition (Amini & Ibrahim-González). Cloze forces the learner to draw on grammar, word order, and sentence context simultaneously — the same cognitive process used in real conversation (Oller, 1979).

---

#### Sentence Design Rules

- 5–15 words per sentence (Migaku cloze deletion research)
- One blank per sentence — one target word, one cognitive job
- Context clues within the sentence must clearly indicate which word belongs
- Source: `contextSentence` field from `words.js`
- Language: simple Spanish, everyday situations, relatable context
- Topic familiarity reduces anxiety and increases accuracy (Chae & Shin, 2015)

---

#### Multi-Channel Additions (all point at the same target — no multi-task)

| Addition | Rationale |
|---|---|
| **Audio** — full sentence plays automatically | Reinforces the same word through auditory channel. Same target, second pathway. |
| **Image** — illustrates the sentence context (not just the isolated word) | Visual grounding of the target word in its usage context (MultiSubs research, 2021). |

**Not added:** English translation of the sentence or English meaning of the blank word. Both redirect to a translation task — a different cognitive job than contextual Spanish recall.

---

#### Unified Scaffolding Applied

| Mastery Tier | Hint | Image |
|---|---|---|
| **Learning** 🌱 | 2–3 word options shown beside the blank | Full image |
| **Strong** 💪 | First letter of the target word shown | Partial / fractured image |
| **Mastered** ⭐ | No hint — blank only, pure recall | No image |

**Research basis for word bank scaffold:** Participants scored best on cloze passages given alongside pictures AND a small word selection (Amini & Ibrahim-González). Providing 2–3 words at sentence level maintains retrieval effort while reducing anxiety for lower-stability words. SuperMemo's 20 rules: "Use imagery — a picture is worth a thousand words. Combat interference using context cues and vivid illustrations."

**Research basis for image fracturing:** Removing visual scaffolding as mastery increases applies Bjork's desirable difficulties principle. The brain must work harder to retrieve the word without the image cue — harder retrieval at higher stability produces stronger long-term retention.

---

#### Error Handling

3-strike model applies. On attempt 2, show first letter as hint regardless of mastery tier (minimum scaffold during active error recovery).

---

### Drill 2 — Type It EN→SP

**Core skill:** Production recall. User sees an English word and types the Spanish equivalent from memory.

**Drill direction:** English prompt → Spanish word production

**Research-validated exception to No-English Rule:** English as production trigger is valid at the word level (Kroll & Stewart, 1994). This drill tests whether the user can retrieve the Spanish word when given the English meaning — a legitimate and important production skill.

**Note:** Type It SP→EN (see Spanish, type English) has been removed from the system. It trains the translation reflex in the wrong direction and has low retrieval value. Only EN→SP direction exists.

---

#### Finding 1 — Free Recall: Confirmed High Value

Training conditions that encourage retrieval facilitate free recall significantly better than study trials or recognition practice alone (Smoker, Murphy & Rockwell, 2009; Rawson & Zamary, 2019). Type It EN→SP is correctly placed as the highest-effort Practice drill in the system.

---

#### Finding 2 — The Direction Problem (Proficiency Dependency)

For lower-proficiency learners, L2→L1 production is more effective than L1→L2 production. For higher-proficiency learners, L1→L2 becomes more effective (Schneider et al., 2002; Terai, Yamashita & Pasich).

**What this means:** For Milo's Beginner tier, EN→SP production is cognitively harder than the learner's current level can support without support. The image cue at Learning tier is therefore not merely helpful — it is necessary to bridge the gap between the learner's current L2 strength and the retrieval demand. As FSRS stability increases and proficiency grows, the direction difficulty becomes appropriate and image scaffolding can be reduced.

**Type It SP→EN was correctly removed.** But its removal must be compensated by strong image scaffolding at lower stability levels, not by difficulty reduction.

---

#### Finding 3 — Images Are Stronger Cues Than English Text

Pictures are more effective than L1 words as cues for eliciting L2 vocabulary items — learners score higher in response to pictures than L1 words in both accuracy and retrieval speed (Chen, 1990; Lotto & De Groot, 1998; Turkish EFL study, 2015).

Semi-contextualized encoding — picture-supported instruction — equips learners with two distinct retrieval cues and facilitates both immediate and long-term retention. Word-only L1-L2 pairs are effective short-term but fail to improve long-term retention (productive vocabulary study, 2016).

**What this means:** The image is the PRIMARY cue. English text is the SECONDARY cue. The drill should be designed with this hierarchy:
- Image → Spanish (concept-direct pathway, stronger)
- English → Spanish (L1-mediated pathway, weaker but important for production)

Both present together at Learning tier provides maximum retrieval pathways.

---

#### Finding 4 — L1 Pairing Creates Weaker Direct Representations

L2 words frequently paired with L1 translations result in weaker representations not directly linked to word meaning — the words are connected to underlying concepts through alternate routes via the L1 lexicon rather than directly (Li & Jeong, 2020).

**What this means for the Mastered tier:** At Mastered level, removing the image and leaving only English forces retrieval through the L1-mediated pathway — which research identifies as weaker. This means English-only at Mastered is not the optimal endpoint.

**Revised Mastered tier:** Image only — no English. This forces concept→L2 retrieval directly, bypassing L1 mediation entirely. The strongest possible retrieval pathway at peak mastery.

---

#### Finding 5 — Image Vividness Matters

A comprehensive review of nearly 50 studies on the keyword method confirmed that image vividness matters more than image bizarreness for recall (Pressley et al.). Clear, vivid, concrete images produce stronger retrieval than abstract or low-contrast images.

**Content guideline:** Images sourced for `words.js` must be clear, vivid, and concrete. This is a hard constraint for the image sourcing sprint.

---

#### Finding 6 — Handwriting vs Typing (and Why a Font Cannot Help)

Handwriting produces stronger memory than typing because the benefit comes from motor production — the sensorimotor loop of forming letters by hand, not from seeing handwritten text (Smoker et al., 2009; Van der Meer & Van der Weel, 2024).

A cursive or handwriting-style font displayed on screen changes what the user sees, not what their motor system does. There is a negligible motor simulation effect from reading handwritten text, but the readability cost — cursive is harder for learners to decode — outweighs any minor benefit.

**What does work:** Handwriting on a touchscreen activates the same brain regions as pen and paper (Van der Meer, 2024). A Draw mode — user traces the Spanish word with finger — would capture the full handwriting benefit on mobile.

**Logged as Discuss Later:** Type It — Draw mode variant. User writes Spanish word with finger on touchscreen canvas instead of typing. Full sensorimotor loop. Research-backed memory advantage. No other consumer language app at this level offers it. Build after core system is stable.

---

#### Multi-Channel Additions

| Addition | Rationale |
|---|---|
| **Image** — primary cue, shown alongside English prompt | Concept → Spanish pathway. Stronger than English cue alone. Bridges L1→L2 difficulty gap for beginners. |
| **Audio** of correct Spanish word after correct answer | Reinforces the sound immediately after successful recall. Multimodal confirmation. |

**Not added:** Context sentence during the prompt (adds reading load before recall). Additional English text (doubles down on L1-mediated pathway).

---

#### Unified Scaffolding Applied — Revised

| Mastery Tier | Cues Shown | Retrieval Pathway |
|---|---|---|
| **Learning** 🌱 | Full image + English text | Concept + L1 → Spanish (maximum support) |
| **Strong** 💪 | Partial image + English text | Weakened concept + L1 → Spanish |
| **Mastered** ⭐ | Image only — English removed | Concept → Spanish directly (no L1 mediation) |

**Key revision from pre-audit protocol:** Mastered tier is image-only, not English-only. Removing English at peak mastery forces the stronger direct concept→L2 pathway rather than the weaker L1-mediated pathway.

---

#### Error Handling

3-strike model applies. No additional text hint on attempt 2 — the image (if shown at Learning or Strong tier) is already functioning as the hint. At Mastered tier where image is the only cue, attempt 2 may briefly intensify the image (full colour restored from partial) as the minimum scaffold during active error recovery.

---

#### Open Question

At Mastered tier with image-only cueing, the drill is functionally closer to Phase 2 Recognise than Phase 3 Produce — the concept is shown and the user produces the word. Should there be a tier beyond Mastered where no cue exists at all — blank screen, pure recall with nothing shown? This maps to the research finding that uncued free recall produces the strongest long-term retention of all retrieval conditions. Flag for review once Mastered-tier user data exists.

---

### Drill 3 — Listen & Type

**Core skill:** Phonological-to-orthographic mapping. User hears a Spanish word and types the Spanish spelling from memory.

**Drill direction:** Spanish audio → Spanish spelling production

**What makes this drill categorically distinct:** This is the only drill in the system that trains the connection between how a word sounds and how it is written. It builds the skill required to recognise spoken Spanish in real conversation and connect it to written form. It is not a variation of Type It. It trains a separate cognitive skill that no other drill covers.

**Phase:** Phase 3 (Produce) only. Words must have passed through Phase 1 introduction and Phase 2 recognition before appearing here. Using it with new vocabulary reduces it from a retrieval drill to a guessing exercise (Nation, 1991).

---

#### Finding 1 — Dictation Is High Value But Condition-Dependent

Dictation combines listening comprehension, spelling accuracy, and phonetic processing in one meaningful context (reading-dictation research, Chinese L2 study). It is most effective when used with known vocabulary — not words being introduced for the first time (Nation, 1991).

**Sequencing rule confirmed:** Phase 3 only. Never before Phase 1 and Phase 2.

---

#### Finding 2 — Reading-Dictation Outperforms Dictation-Only

The coupling of comprehension with production raises learners' awareness and noticing of target words, producing better retention than audio-only dictation (reading-dictation study, Chinese L2). Reading-dictation means: see the word first, then hear it and spell it.

**The tension:** Showing the written word reduces retrieval demand — which is the drill's primary value. **Resolved by scaffolding:** the written word appears as a hint only at Learning tier error recovery (attempt 2 auto-replay with no text shown; written form only revealed on attempt 3). The scaffolding model handles this correctly without compromising retrieval demand at the primary attempt.

---

#### Finding 3 — Audio-Visual Outperforms Audio-Only

Multimodal combination of audio and congruent visual input has greater effect on comprehension and retention than audio alone. Mismatched or irrelevant visual information interferes rather than helps (systematic literature review, Frontiers in Psychology, 2022).

**Implication:** A concept-matched image shown while audio plays is congruent multimodal support — audio and image both pointing at the same target. This is multi-channel, not multi-task. A random or decorative image would be harmful. A semantically matched image is beneficial and should be used at Learning and Strong tiers.

---

#### Finding 4 — Audio Repetition Scaffolded by Mastery Tier

A minimum of two to three meaningful repetitions represents the threshold for significant vocabulary learning gains (Vidal, 2011; Horst et al., 1998). Unlimited replays eliminate retrieval demand and undermine the drill's purpose.

**Resolution:** Scaffold replay availability by mastery tier. Retrieval effort increases as stability increases.

---

#### Finding 5 — Relaxed vs Strict Spelling Maps to Mastery Tier

Krashen's affective filter: penalising near-correct spelling at lower proficiency creates anxiety that inhibits acquisition. At higher mastery, exact spelling is the appropriate and achievable standard.

The Relaxed/Strict toggle currently operates as a global user setting. For this drill, spelling precision should be a function of demonstrated mastery per word — not a session-wide user preference. This is a state architecture note for the State Ledger.

---

#### Finding 6 — L1 Phonological Filtering

L1-based processing interferes with accurate L2 sound perception in adulthood. English speakers learning Spanish will initially filter Spanish sounds through English phonological categories, making some sounds harder to distinguish and spell (phonological processing research, Cambridge Core, 2024).

**Practical implication:** Audio plays at slightly reduced TTS speed at Learning tier, giving more phonological processing time. Natural speed at Strong and Mastered.

---

#### Multi-Channel Additions

| Addition | Rationale |
|---|---|
| **Image** — concept-matched, shown while audio plays | Congruent audiovisual input. Audio + image both point at same target. Multi-channel, not multi-task. Scaffolded by mastery tier. |
| **Audio replay** — scaffolded availability | Meaningful repetition supports retention. Replay access reduced as mastery increases to maintain retrieval demand. |

**Not added:** Written form of the word shown alongside audio (reduces retrieval demand — defeats the drill's purpose). English meaning at any point (multi-task — translation job competing with phonological processing job).

---

#### Unified Scaffolding Applied

| Mastery Tier | Image | Audio Replay | Spelling Mode | Audio Speed |
|---|---|---|---|---|
| **Learning** 🌱 | Full image shown while audio plays | 2 manual replays available | Relaxed — typos forgiven, "Almost! ✓" shown | Slightly reduced TTS speed |
| **Strong** 💪 | Partial image | 1 manual replay available | Relaxed — typos forgiven | Natural speed |
| **Mastered** ⭐ | No image | No replay — first hearing only | Strict — exact spelling required, accents included | Natural speed |

---

#### Error Handling

3-strike model applies. Audio replays automatically on wrong attempts — meaningful repetition following an error strengthens the phonological-orthographic connection rather than simply revealing the answer.

| Attempt | Response | Audio |
|---|---|---|
| 1st wrong | "Try again 🐾" — no spelling shown | Auto-replays once |
| 2nd wrong | "Almost — try once more 🐾" | Auto-replays again |
| 3rd wrong | "Good try! The answer is [word] 🐾" — correct spelling shown | Plays one final time |

---

#### Open Question

The Relaxed/Strict spelling mode currently operates as a global session toggle. Mapping it to FSRS mastery tier requires per-word mode switching rather than a session-wide setting. State architecture decision — flag for State Ledger before Emergent builds this.

---

### Drill 4 — Multiple Choice EN→SP

**Core skill:** Production-direction recognition with cued recall. User sees an English word, attempts to recall the Spanish equivalent, then selects from options.

**Drill direction:** English prompt → Spanish word selection

**Position in the Practice tier:** Lowest-value Practice drill. Correct role — entry point for words at Learning stability, before the user is ready for free production drills. Not the primary learning vehicle. Think First mode significantly closes the gap with higher-value drills.

---

#### Finding 1 — Stepwise MCQ (Think First) Is Directly and Strongly Confirmed

Think First mode has its own dedicated research name — Stepwise MCQ — with a specific body of evidence.

Stepwise MCQs present the question before the answer options, creating an opportunity for cued recall. In three of four experiments, this format significantly enhanced vocabulary retention compared to standard MCQs, measured by a posttest several days after practice (Stepwise MCQ research, multiple experiments, N = 45–75+). Students who completed the Stepwise format also showed higher metacognitive accuracy — better awareness of what they did and did not know.

Why it works: Standard MCQ is a recognition task — see options, find the right one. Stepwise MCQ converts it into cued recall — attempt retrieval from memory, then confirm or correct with options. The retrieval attempt before options appear is where learning happens. Think First is a direct implementation of this principle.

---

#### Finding 2 — Three Options Is Optimal — Not Four

Rodriguez (2005) meta-analysis of 80 years of research: three options — one correct answer and two distractors — strikes the best balance between quality and efficiency. The original confirmed protocol had 4 options at Learning tier. Research does not support starting at 4.

**Revised from original confirmed decisions:** Learning tier uses 3 options immediately (not 4). Scaffolding reduces from 3 to 2 as mastery increases, combined with Think First.

---

#### Finding 3 — Distractor Quality Is Critical

Competitive answer choices — where students cannot easily guess the correct answer — lead to better learning outcomes than non-competitive choices. When options are easy to eliminate, retrieval effort is reduced and the learning benefit diminishes (Stepwise MCQ research). Plausible distractors based on learner misconceptions and errors increase the educational value of the item (Haladyna & Downing, 1989; Rodriguez, 2005).

**What makes a good distractor for Spanish vocabulary:**
- Semantically related — same category as the correct answer (for "dog": cat, horse — not airplane)
- Phonologically or orthographically similar — looks or sounds like the correct answer
- Known confusable pairs — words learners typically mix up (ser/estar, por/para, saber/conocer)

**What makes a bad distractor:** Random unrelated words eliminatable without any Spanish knowledge. These reduce the drill to guessing and remove the retrieval benefit.

**Distractor selection is a content task** — must be specified in paths.js alongside the correct answer for every question, not left to random word pool selection.

---

#### Finding 4 — Multiple Choice Is Lower Value Than Free Recall But Think First Closes the Gap

Retrieval practice is more effective when implemented through tests requiring generative responses — free recall or short answers — rather than recognition tests like multiple-choice. Long-term retention is enhanced when open-question or fill-in-the-gap tests are used, as learner retrieval effort plays a crucial role (Frontiers in Psychology, 2025).

Multiple Choice EN→SP is correctly the lowest-value Practice drill. Think First significantly closes the gap — but it remains below Type It, Fill in the Blank, and Listen & Type in retrieval demand. Its correct role is as the entry-point Practice drill.

---

#### Finding 5 — Image Alongside English Prompt

The picture superiority effect established in Drill 2 applies here. Images are stronger cues than L1 text for eliciting L2 words (Chen, 1990; Turkish EFL study, 2015). Showing the concept image alongside the English prompt gives the learner two routes to the correct Spanish option — concept-direct and L1-mediated. Scaffolded by mastery tier.

Audio of the correct Spanish word plays after the answer is revealed as multimodal confirmation. Audio does NOT play during option display — playing audio for all options simultaneously creates cognitive overload.

---

#### Finding 6 — Option Position Must Be Randomised

Research on position effects in MCQ shows correct answer position influences selection behaviour regardless of knowledge level. Correct answer and distractor positions must be randomised on every presentation of the same question to prevent position-based guessing habits.

---

#### Multi-Channel Additions

| Addition | Rationale |
|---|---|
| **Image** — concept-matched, shown alongside English prompt | Two retrieval pathways: concept-direct (image→Spanish) + L1-mediated (English→Spanish). Scaffolded by tier. |
| **Audio** of correct Spanish word after answer revealed | Multimodal confirmation after selection. Not during option display. |

**Not added:** English translations of distractor options (multi-task). Hint text during Think First wait period (defeats cued recall purpose).

---

#### Unified Scaffolding Applied

| Mastery Tier | Think First | Options | Image |
|---|---|---|---|
| **Learning** 🌱 | ❌ Options shown immediately | 3 options (1 correct + 2 plausible distractors) | Full image |
| **Strong** 💪 | ✅ Must commit before options appear | 3 options | Partial image |
| **Mastered** ⭐ | ✅ Must commit before options appear | 2 options (1 correct + 1 plausible distractor) | No image |

**Option position:** Randomised every presentation regardless of tier.

---

#### Distractor Quality Rules (Content Constraint for paths.js)

Distractors must be semantically related to the correct answer, or phonologically/orthographically similar, or a known confusable pair. They must never be random words eliminatable without Spanish knowledge.

---

#### Error Handling

One wrong answer — move on. Options are visible. Retrying after seeing options has low additional retrieval value. Correct answer highlighted immediately. Audio of correct Spanish word plays once.

---

#### FSRS Rating

| Outcome | Rating |
|---|---|
| Correct at Learning tier (no Think First) | Good |
| Correct with Think First — clear pause before reveal | Good |
| Correct with Think First — tapped through under 2 seconds | Hard |
| Incorrect | Again |

---

### Drill 5 — Sentence Builder

**Core skill:** Syntactic construction. User assembles a Spanish sentence from word tiles in the correct grammatical order.

**Drill direction:** Jumbled Spanish word tiles → correctly ordered Spanish sentence

**What makes this drill categorically distinct:** This is the only drill that forces the learner to process Spanish as a syntactic system rather than as isolated words. It trains word order, grammatical agreement, and the structural gestalt of a complete sentence. For Spanish specifically: adjective placement after the noun, verb-subject flexibility, gendered agreement. No other drill trains these skills.

**Phase:** Phase 3 (Produce) only. Words must have passed through Phase 1 and Phase 2 first.

**Sentence source:** `contextSentence` field from `words.js`. High-constraint sentence design required — see Finding 3.

---

#### Finding 1 — Output Hypothesis Directly Applies

Swain's Output Hypothesis (1985, 1995, 1998) is the primary research foundation for this drill. Output prompts learners to notice gaps in their interlanguage knowledge and has a positive impact on the acquisition of language forms. Producing target language forces learners into a more syntactic processing mode than occurs in comprehension alone (multiple SLA studies confirming noticing, hypothesis-testing, and metalinguistic functions of output).

Sentence Builder is one of the purest output tasks in the system. The learner must make grammatical decisions — word order, agreement, structure — rather than simply retrieving a single word. This is the drill's primary scientific justification and what separates it from every other drill in the set.

---

#### Finding 2 — Constrained Production Is Correct for Beginners

Free writing tasks are cognitively more complex than rearrange-and-rewrite tasks. Increasing cognitive complexity beyond learner capacity leads to accuracy breakdown rather than syntactic development (Frontiers in Psychology, 2022).

Sentence Builder with tiles sits correctly between free writing (too cognitively demanding for A1) and recognition drills (too little syntactic engagement). Tiles remove spelling and vocabulary retrieval burden, focusing cognitive load entirely on word order and grammatical structure — the appropriate design for Beginner and Advanced Beginner tiers.

**Scope constraint:** Tile assembly is the correct format for Beginner I through Advanced Beginner III. For Intermediate tier and above, guided free sentence writing may replace tile assembly — flag for future path design when those tiers are built.

---

#### Finding 3 — High-Constraint Sentence Design Is Required

Novel word meanings can be acquired in high-constraint sentences but not in low-constraint sentences. High sentence constraint — where only one word plausibly fits the blank — significantly facilitates L2 word acquisition and is especially effective when it appears early in learning (high-constraint sentence research, multiple ERP and behavioural studies).

**Content constraint for `contextSentence` generation:** Every sentence used in Sentence Builder must be high-constraint — the target word is the only word that fits the sentence meaningfully. Low-constraint sentences where multiple words could logically complete the structure reduce the learning value and confuse the drill's objective. This is a hard guideline for the Content chat batch generation session.

---

#### Finding 4 — Cognitive Load Must Be Managed

High cognitive load impairs grammar acquisition and vocabulary retrieval (cognitive load review, IJHSSI). Sentence Builder is the most cognitively demanding drill in the system — working memory is engaged simultaneously on reading context, selecting correct tiles, word ordering, and evaluating grammatical fit.

Adding both image and audio during construction risks exceeding working memory capacity. Image cannot represent a multi-word sentence as precisely as it represents a single word. Processing a sentence-level image alongside tile arrangement creates extraneous load — distraction rather than reinforcement.

**Multi-channel decision for this drill: audio only during construction — not image.**

---

#### Finding 5 — Audio Priming Before Production

Audio of the full sentence plays once before tiles appear. This applies Krashen's input hypothesis as a primer before Swain's output task — hear the sentence, then construct it. The learner receives the target as auditory input (rhythm, prosody, sound) before being required to produce it in written form.

A replay button is available at all mastery tiers during tile arrangement. Audio access is not scaffolded for this drill — syntactic processing does not benefit from audio removal the way single-word recall does. The audio is a model of the target structure, not a retrieval cue that can be progressively removed.

---

#### Finding 6 — Distractor Tile Quality

Grammatically plausible distractors — words from the same grammatical category as correct tiles — force real syntactic evaluation. Semantically related distractors — words from the same semantic field — force deeper processing. Random unrelated words can be eliminated without engaging syntactic processing, defeating the drill's purpose.

Distractors must not be spelling variants of correct tiles — this creates confusion rather than syntactic challenge.

---

#### Multi-Channel Additions

| Addition | Rationale |
|---|---|
| **Audio** — full sentence plays once before tiles appear | Input primer before output task. Gives rhythm, prosody, and sound of the target sentence. Replay button available during construction. |

**Not added:** Image during tile construction (extraneous cognitive load for sentence-level meaning). English translation during task (translation job competes directly with syntactic processing). Audio of individual tiles on tap (distracts from sentence-level processing).

**After correct answer:** Full assembled sentence displayed with audio playing once. Contextual Binding step is flagged as potentially redundant — see Open Question below.

---

#### Unified Scaffolding Applied

| Mastery Tier | Distractor Tiles | Tile Visual Style |
|---|---|---|
| **Learning** 🌱 | Fewer distractors | Correct tiles may appear slightly grouped or visually distinct |
| **Strong** 💪 | More distractor tiles added | All tiles appear equally styled, no grouping |
| **Mastered** ⭐ | Maximum distractors | No visual distinction or grouping cues whatsoever |

Image scaffolding does not apply to this drill. Audio remains constant across all tiers.

---

#### Error Handling

2 attempts only. Sentence-level tasks carry higher cognitive load than word-level tasks — a third attempt creates frustration rather than additional retrieval value.

| Attempt | Response |
|---|---|
| 1st wrong | "Try again 🐾" — tiles reset to shuffled positions |
| 2nd wrong | "Good try! Here it is 🐾" — tiles animate into correct positions, audio plays correct sentence |

---

#### Open Questions

- [ ] Contextual Binding (showing `contextSentence` after correct answer) is potentially redundant for Sentence Builder — the drill itself IS the contextSentence. Decision: skip Contextual Binding for this drill entirely, or use a different example sentence from the same word. Flag for DrillShell architecture before Emergent builds this.
- [ ] At Intermediate tier and above, should tile assembly be replaced by guided free sentence writing? Confirm when Intermediate tier paths are designed.

---

### Drill 6 — Conjugation

**Core skill:** Grammatical form production. User produces the correctly inflected verb form for a given subject pronoun and tense.

**Drill direction:** Infinitive + subject pronoun → correctly conjugated verb form

**What makes this drill categorically distinct:** Conjugation trains the procedural grammar system — the automatic application of morphological rules under production conditions. No other drill trains this. The gap between knowing a conjugation rule intellectually and producing the correct form fluently is exactly what this drill closes.

**Latin American Spanish — 5 forms only:**
Vosotros does not exist in this app. Ustedes covers all second person plural. Only these 5 forms are ever drilled:
- yo / tú / él-ella-usted / nosotros / ellos-ellas-ustedes

**Phase:** Phase 3 (Produce) only.

---

#### Finding 1 — Skill Acquisition Theory Is the Primary Framework

DeKeyser's Skill Acquisition Theory (1997, 2025) is the foundational research framework for this drill. Grammar knowledge progresses through three stages:

1. **Declarative** — the learner knows the rule consciously
2. **Procedural** — the learner applies the rule under effort, with some inaccuracy
3. **Automatic** — the learner applies the rule quickly and effortlessly without focal attention

The Conjugation drill targets the declarative-to-procedural transition. Procedural knowledge develops through production tuning — incrementally weighing the applicability of known rules in specific contexts until accuracy and speed increase (Cambridge Core, 2025). Think First mode forces this transition — the learner must access declarative knowledge and attempt to produce the form before seeing options. Without Think First, option selection replaces production and no proceduralization occurs.

---

#### Finding 2 — Production Practice Must Match Production Testing

Production-based practice leads to greater gains in grammatical accuracy in production tasks. Performance gains from comprehension-based training do not readily transfer to production (De Jong, 2005; DeKeyser & Sokalski, 1996). The drill must be a production task — Think First is not optional.

---

#### Finding 3 — Decontextualized Drilling Has Limited Transfer

Even a large amount of decontextualized drilling does not appear to be effective for communicative use. Deliberate pattern practice should be linked to communicative activities as quickly as possible (DeKeyser, 2007).

**Contextual Binding is the most critical post-answer step in this drill.** Showing the correctly conjugated verb in a full Spanish sentence immediately after a correct answer bridges decontextualised form practice to meaning-connected use — the transfer that isolated drilling fails to achieve. This must fire after every correct Conjugation answer, without exception.

---

#### Finding 4 — Frequency Order Determines Content Sequencing

The present tense accounts for approximately 40% of verb usage in Spanish — it must be learned before all other tenses. Conjugated forms that are most frequent in teaching produce significantly faster and more accurate production (gustar frequency study, Revista Odisséia, 2023).

**Tense-to-Path mapping (confirmed):**

| Tense | Path range | Sub-level |
|---|---|---|
| Present tense | Paths 1–4 | Beginner I–III early |
| Preterite | Path 5 | Beginner III |
| Imperfect | Advanced Beginner I–II | |
| Future | Intermediate I | |
| Subjunctive | Advanced Intermediate+ | |

Tense scope is Path-gated, not mastery-gated. A learner in Paths 1–4 never sees a preterite Conjugation question regardless of their mastery tier.

**Person priority within present tense:** yo and tú forms first, then él/ella/usted, then nosotros, then ellos/ellas/ustedes. Most conversation at A1 level uses first and second person.

---

#### Finding 5 — Regular vs Irregular Verbs: Different Approaches

Explicit instruction shows a significant advantage for production of simple, categorical rules. Effects on fuzzy, irregular rules are more mixed — irregular forms are better acquired through repeated contextual exposure (consciousness research).

**Two categories for the Conjugation drill:**

**Category A — High-frequency irregulars (ser, estar, ir, tener, querer, poder, hacer)**
These appear in early Paths regardless of regularity because frequency demands it. Their conjugation is taught as a complete pattern on its own terms — not as a deviation from regular forms. They appear in the Conjugation drill from the Path in which they are introduced.

**Category B — Lower-frequency irregular patterns (stem-changers, yo-go verbs, etc.)**
Mastery of the regular pattern is the gate for introducing irregular variants:

| Mastery tier of regular pattern | Conjugation drill content for this verb class |
|---|---|
| **Learning** 🌱 | Regular -AR/-ER/-IR endings only |
| **Strong** 💪 | Regular endings + common irregular variants in same class introduced |
| **Mastered** ⭐ | Full irregular pattern production expected |

This sequences the learner correctly — irregular forms are meaningful only once regular forms are solid. The gate is automatic and data-driven via FSRS.

---

#### Finding 6 — 5-Form Paradigm Reduces Cognitive Load

Latin American Spanish drops vosotros, leaving 5 forms. The "paradigm overload" concern from SLA research is reduced — 5 forms is meaningfully less daunting than 6, and the vosotros irregularities (numerous in many verb classes) disappear entirely.

Full five-form paradigm drilling is still not the right approach. The drill targets specific person/tense combinations relevant to the Path's context — not a full paradigm dump per session. At A1 level: yo, tú, él/ella/usted in present tense. Nosotros and ellos/ellas/ustedes follow as Path level advances.

---

#### Multi-Channel Additions

| Addition | Rationale |
|---|---|
| **Audio of the infinitive** plays when prompt appears | Reinforces the sound of the base verb before production of the inflected form. |
| **Audio of correct conjugated form** after correct answer | Reinforces the sound of the correctly inflected form at the moment of success. |
| **Contextual Binding** — full Spanish sentence using correct conjugated form | Critical for this drill. Bridges decontextualised form practice to meaning-connected use. Must fire after every correct answer. |

**Image:** Concrete action verbs (hablar, comer, correr) can be represented by an action image and should be included where available. Abstract verbs (ser, estar, poder) cannot be meaningfully represented — omit image for these. Flag as optional content decision per verb: include images where they exist and are meaningful, omit where they do not.

**Not added:** English translation of the verb during the prompt (translation job competes with grammatical production). Full paradigm table displayed during the drill (paradigm-as-unit thinking undermines form-by-form proceduralization).

---

#### Unified Scaffolding Applied

| Mastery Tier | Think First | Pronoun Scaffolding | Image | Verb Content |
|---|---|---|---|---|
| **Learning** 🌱 | ❌ Options shown immediately | Subject pronoun displayed prominently | Image if available | Regular patterns only (Category B verbs) |
| **Strong** 💪 | ✅ Must commit before options appear | Subject pronoun shown in smaller text | Partial image if available | Regular + irregular variants introduced (Category B) |
| **Mastered** ⭐ | ✅ Must commit before options appear | Subject pronoun shown in small text only | No image | Full irregular pattern expected |

Category A (high-frequency irregulars) follow their own Path-based introduction — mastery tier does not gate them.

---

#### Error Handling

3-strike model applies with one Conjugation-specific hint on attempt 2:

| Attempt | Response | Hint |
|---|---|---|
| 1st wrong | "Try again 🐾" | Audio of infinitive replays |
| 2nd wrong | "Almost — try once more 🐾" | First letter of the correct ending shown (e.g., for -AR yo form: "o") |
| 3rd wrong | "Good try! The answer is [form] 🐾" | Full correct form shown, audio plays |

---

#### FSRS Rating

| Outcome | Rating |
|---|---|
| Correct at Learning tier (no Think First) | Good |
| Correct with Think First — clear pause before reveal | Good |
| Correct with Think First — tapped through under 2 seconds | Hard |
| Incorrect | Again |

---

#### Latin American Spanish Constraint (Global)

Vosotros does not exist in this app. This constraint applies to: Conjugation drill content, paths.js, drillData.js, words.js contextSentences, Milo AI system prompt, all video and text input content. Any existing vosotros forms in drillData.js must be audited and removed before v3 ships.

---

#### Open Question

Should the Conjugation drill content audit (removing vosotros, confirming 5-form tables, sequencing regular before irregular for Category B verbs) be a Content chat task before the paths.js rewrite, or a Windsurf task on the existing drillData.js? Recommend: Content chat first — generate correct content, then Windsurf replaces the old data.

---

## Warm Up Drills — Protocols

*Warm Up drills earn no XP, no bones, trigger no FSRS update. They are entry points and mental warm-up — not the primary learning engine.*

---

### Drill 7 — Hear & Choose

**Core skill:** Auditory word recognition. User hears a spoken Spanish word and selects the matching written Spanish word from options.

**Drill direction:** Spanish audio → written Spanish word selection

**Tier:** Warm Up. No XP, no bones, no FSRS update.

**Phase in Paths:** Phase 2 (Recognise) only — the sole Phase 2 drill. Bridges Phase 1 passive introduction and Phase 3 active production by building the audio-to-written-form connection before production is required.

**What makes this drill distinct:** This is the only drill that specifically trains the ear to distinguish Spanish words from each other as sounds — the bottom-up auditory processing skill that underlies all real-world listening comprehension.

---

#### Finding 1 — Auditory Word Recognition Is Foundational

Recognising words in L2 speech is the key to comprehending spoken input. Training learners to identify an auditory word from its competing candidates is of great pedagogical significance (ScienceDirect Listening Comprehension overview). When listeners hear the initial syllable of a word, a range of competing lexical candidates is triggered — listeners must attend to segmental details to discriminate the target from phonologically similar words (Cambridge Core, 2023).

This positions Hear & Choose as more than a warm-up. Its low retrieval demand places it in the Warm Up tier. Its genuine learning function — building the phonological lexicon and auditory-orthographic connections — makes it essential to the Paths Phase 2 sequence.

---

#### Finding 2 — Phonological Competitor Selection Is Critical

The auditory word recognition process involves narrowing from competing phonological candidates (Norris & McQueen, 2008). Real discrimination training requires phonologically similar competing words — not obviously different ones.

**Good distractors for Hear & Choose:** Words that sound similar to the target — similar initial phoneme, similar stress pattern, similar syllable count. These force genuine auditory discrimination.

**Bad distractors:** Random unrelated words that can be eliminated from a single phoneme without real discrimination. These reduce the drill to a guessing game with no phonological training value.

**Content constraint:** Distractor selection for Hear & Choose must be phonologically informed — not random. This is a content task for paths.js design. Each question must have phonologically plausible distractors.

---

#### Finding 3 — Written Form Alongside Audio Builds Auditory-Orthographic Connections

Aural-written verification is particularly valuable for developing auditory discrimination skills and for refined word recognition. Matching audio with written text helps listeners develop awareness of form-meaning relationships (Vandergrift, 2007; Osada, 2001).

**Option display:** Written Spanish words only — not images, not English translations. The learner hears the audio and identifies which written Spanish word matches. This is multi-channel (audio + written form) both pointing at the same target — the Spanish word. It simultaneously trains listening discrimination and the audio-to-orthography connection.

---

#### Finding 4 — The Warm Up Priming Function Is Research-Backed

Employing auditory primes improves word recognition speed and efficacy. Word recognition activates and improves other language skills, including listening and vocabulary knowledge (priming research). Hear & Choose activates the auditory representation of a word before the learner encounters it in harder Phase 3 production drills — reducing cold-start cognitive load. The warm-up function is cognitively preparatory, not merely motivational.

---

#### Finding 5 — Vocabulary Breadth Predicts Listening Success

The larger the L2 listener's vocabulary, the more they avoid phantom word activation during listening comprehension (Broersma & Cutler, 2008). **Sequencing constraint confirmed:** Hear & Choose must only use words already introduced in Phase 1. Using new words in this drill triggers phantom activation rather than discrimination training.

---

#### Finding 6 — Limitation: Discrimination Tasks Alone Have Limited Effect

Evidence supporting the effectiveness of standalone discrimination tasks for improving L2 speech perception at the early stage is limited (Frontiers in Psychology, 2025). Hear & Choose in isolation would be a weak learning tool. Its value comes entirely from its placement within the three-phase Paths sequence — Phase 1 establishes the word's audio-image-form connection; Phase 2 reinforces it through recognition. Standalone use outside Paths is honest warm-up only, not a primary learning mechanism.

---

#### Multi-Channel Protocol

| Element | Design | Rationale |
|---|---|---|
| **Audio** | Plays automatically when drill loads | Primary stimulus — the drill itself |
| **Written Spanish options** | Displayed as the selectable choices | Aural-written verification builds auditory-orthographic connection |
| **Replay button** | Always available | Low-stakes drill — replay supports recognition without undermining retrieval demand |

**After correct answer:** Image of the target word appears briefly alongside written form and audio plays once more. Three-channel confirmation — audio + image + written Spanish — reinforcing the full word representation before Phase 3.

**Not shown:** Images of each option during selection (allows visual matching without audio discrimination). English translations of options (turns it into a translation task). English at any point during the drill.

---

#### Scaffolding

Warm Up tier — no FSRS, no mastery-tier scaffolding.

**In Paths Phase 2:** 3 options always. Audio at slightly reduced TTS speed for new words — Phase 2 is an on-ramp, not a mastery challenge.

**In standalone Warm Up tab:** 3 options always. Natural audio speed. Consistent easy entry regardless of word stability.

Full mastery-tier scaffolding does not apply — no FSRS tracking, and complexity escalation would undermine the warm-up function.

---

#### Error Handling

One wrong answer — move on. Options are visible. Retrying has no retrieval value. Correct option highlighted. Audio plays the correct word once. No FSRS update. No bones.

---

### Drill 8 — Matching

**Core skill:** Associative pairing at low retrieval demand. User connects written Spanish words to their corresponding images across a visible set simultaneously.

**Tier:** Warm Up. No XP, no bones, no FSRS update.

**What this drill correctly does:** Activates multiple word representations at once, builds the Spanish word — image association through visual recognition, provides an affective and cognitive warm-up before higher-demand drills, and increases session engagement and completion rates.

**What this drill does not do:** Train retrieval, train production, or build long-term retention independently. Its value is as an entry point — not a learning engine.

---

#### Finding 1 — Involvement Load Hypothesis Explains Its Position

The involvement load hypothesis (Laufer & Hulstijn, 2001) holds that the more cognitively involved a learner is in a word learning task, the greater their retention. Matching has intentionally low involvement load — words are visible, no search is required, and evaluation is shallow visual comparison rather than semantic judgement.

This is not a design flaw — it is the correct design for a Warm Up drill. Low involvement load reduces anxiety and cognitive demand before the session's harder Practice drills begin. The involvement load is deliberately low.

---

#### Finding 2 — The Image-Matching Trap Must Be Avoided

When playing matching games, players prioritise memorising and matching images rather than learning the word that best describes the image — learning the word itself is lost (USPTO language game patent, 2013). If the drill allows visual image-to-image pattern matching, the learner completes it without reading or processing the Spanish words.

**Critical design rule:** The drill pairs written Spanish words with images. The learner reads the Spanish word and connects it to the correct image — not image-to-image, not English-to-image. The Spanish word is always the stimulus that must be actively read and processed. This prevents the image-only bypass.

---

#### Finding 3 — Paired-Associate Learning Supports Vocabulary Breadth

Paired-associate ability correlates significantly with immediate and delayed meaning recognition (ScienceDirect, 2025). Even at low involvement load, Matching forms the Spanish word — concept association that underpins recognition vocabulary. This association is shallow but real — it builds the word's presence in memory before production drills deepen it through retrieval practice.

---

#### Finding 4 — Engagement Is a Legitimate Learning Facilitator

Competition and engaging features in vocabulary games prompt active participation and motivate learners to process more vocabulary on their own volition (gamification research). Matching is inherently engaging — clear goal, visible progress, satisfying completion. A learner arriving at a session with low motivation is more likely to complete a Matching warm-up than to begin directly with production drills. The engagement on-ramp reduces session dropout and increases exposure to the Practice drills that follow.

A mild optional timer adds competitive engagement without adding cognitive load that interferes with learning.

---

#### Finding 5 — Audio at Zero Cognitive Cost

Playing audio for each Spanish word when correctly matched adds multimodal reinforcement at zero additional cognitive load — the matching action is complete when audio plays, freeing working memory to encode the sound. Multi-channel (written Spanish + audio) both pointing at the same concept at the moment of completion.

---

#### Multi-Channel Protocol

| Element | Design | Rationale |
|---|---|---|
| **Written Spanish words** | Primary stimulus — must be read to complete match | Prevents image-only visual matching without word processing |
| **Images** | Targets to match Spanish words to | Concept-direct connection — no translation reflex |
| **Audio** | Plays for each word when correctly matched | Zero-cost multimodal reinforcement at the completion moment |

**Not shown:** English translations (creates translation task, bypasses Spanish processing). Audio during selection process (adds cognitive load mid-task — plays only after successful match).

---

#### Design Constraints

**Word pool:** Only words from the learner's completed Stops. Never new words — Matching cannot introduce vocabulary, only reinforce known words.

**Set size:** 5–8 pairs per round. Fewer than 5 is trivially easy. More than 8 creates visual crowding and cognitive overload.

**Match direction:** Written Spanish word — Image. The Spanish word is always the stimulus the learner must read and process.

**Timer:** Optional. Default off — consistent with Milo's warm, non-pressuring identity. User can enable in settings for competitive engagement mode.

---

#### Scaffolding

Warm Up tier — no FSRS, no mastery-tier scaffolding. Consistent experience regardless of word stability. Complexity scaling would undermine the warm-up function.

---

#### Error Handling

No wrong/right feedback per individual pair during matching. Learner tries connections until all pairs are found. On completion, all connections confirmed with audio playing for each pair. No penalty. No bones. No FSRS update.

---

## Review Drill — Protocol

---

### Drill 9 — Flashcard

**Core skill:** Active recognition retrieval. User sees the front of a card, attempts to recall the back from memory, flips, and self-rates accuracy.

**Tier:** Review. No XP, no bones. FSRS updates on self-rating.

**Two modes — both active:**
- **Word Flashcard** — Spanish word + image → English meaning
- **Sentence Flashcard** — full Spanish contextSentence → English translation

**Phase in Paths:** Between Phase 1 (Introduce) and Phase 3 (Produce). Sequencing within a Stop: Word Flashcard → Sentence Flashcard → Practice drill. Recognition anchored first. Context anchored second. Production last.

**Requires:** `contextSentence` populated in `words.js` for Sentence Flashcard mode.

---

#### Finding 1 — Active Retrieval Massively Outperforms Passive Review

In a meta-analysis of 150+ studies, active recall showed an average effect size of 0.93 — very large — while re-reading showed 0.31 — small to medium. Students using active recall methods consistently outperform those relying on passive review, often by 20–40% (StudyBoost, multiple meta-analyses). Active recall forces retrieval from memory, strengthening neural connections in ways passive review cannot.

**The "flashcard" in all research that shows flashcards outperform other methods is the active retrieval version — not the passive reading version.** When research says flashcards work, it means the retrieval attempt before the flip.

A meta-analysis examining four intentional learning activities — flashcards, word lists, writing, and fill-in-the-blanks — found that flashcard learning was the most effective approach for strengthening form-meaning connections. In the procedure studied, learners first viewed the foreign word and *attempted to recall* its meaning before flipping. The retrieval attempt produces the learning benefit (MDPI Behavioral Sciences, 2025).

---

#### Finding 2 — Passive Review Creates an Illusion of Competence

Passive review feels comfortable but that comfort creates a false sense of mastery — familiarity is mistaken for actual recall ability, which evaporates under test conditions. Passive methods hide gaps in understanding because recognition feels like knowledge (cognitive science literature, multiple studies). There is a documented risk of learners developing a false sense of mastery specifically when engaging with flashcards passively (MedCrave, 2023).

**Milo's passive Flashcard design would create exactly this risk.** Users would feel they have practiced words they have only seen. The original passive design is removed. Active retrieval is the only mode.

---

#### Finding 3 — Self-Rating Accuracy Depends on Retrieval Happening First

Judgements of learning can be unreliable — learners tend toward overconfidence. However, when participants are required to test themselves first, judgements of learning become quite accurate in both resolution and calibration. A virtue of active flashcards is that self-testing is intrinsic to the test-study procedure — the retrieval attempt calibrates the self-rating (Kornell & Bjork, 2008).

Overconfidence produces underachievement: inaccurate self-evaluations undermine learning and retention (Dunlosky & Rawson, 2012).

**The retrieval attempt before flipping is what makes the self-rating trustworthy.** Without it, ratings are unreliable. With it, they are calibrated. The FSRS system also provides a correction mechanism — if a user rates "Got it" but fails Type It on the same word next session, FSRS adjusts stability downward automatically. Inaccurate self-ratings are corrected by production drill performance over time.

---

#### Finding 4 — Active Flashcard Builds Honest Metacognition

Active recall forces learners to accurately gauge their own knowledge, distinguishing material that is genuinely mastered from material that is merely superficially familiar. This metacognitive benefit is significant beyond retention alone — users who actively test themselves develop accurate awareness of what they know and don't know. Passive users develop overconfidence (active recall research literature).

Milo's identity is honest, warm learning. Active retrieval Flashcard is more honest than passive — and warmer in a different way: it tells users the truth about their knowledge rather than letting them feel falsely secure.

---

#### Word Flashcard — Flow

1. Front loads: image + "el perro" + audio plays automatically
2. User thinks: do I know what this means?
3. User flips card
4. Back shows: English meaning + contextSentence in Spanish
5. User self-rates: **"Got it 🐾"** / **"Not yet 🐾"**
6. FSRS updates based on rating

---

#### Sentence Flashcard — Flow

1. Front loads: full Spanish contextSentence (target word highlighted) + audio plays
2. User reads for meaning — do they understand it?
3. User flips card
4. Back shows: English translation of full sentence
5. User self-rates: **"Got it 🐾"** / **"Not yet 🐾"**
6. FSRS updates based on rating

---

#### Multi-Channel Protocol

| Element | Design | Rationale |
|---|---|---|
| **Image** | Shown on front of Word Flashcard | Concept-direct encoding alongside Spanish word |
| **Audio** | Plays automatically when front loads | Multimodal encoding — sound reinforced at the moment of retrieval attempt |
| **Written Spanish** | Word or contextSentence on front | Primary stimulus for retrieval attempt |
| **contextSentence** | Shown on back of Word Flashcard in Spanish | Sentence-level context provided after recognition — additional encoding without cognitive overload |

**Not shown on front:** English meaning (would eliminate the retrieval attempt entirely — recognising English is not recalling Spanish).

---

#### FSRS Rating Mapping

| Self-rating | FSRS Rating | Notes |
|---|---|---|
| Got it 🐾 | Good | Recognised successfully |
| Not yet 🐾 | Again | Word returns sooner in scheduling |

Simplified to two options. Vocabulary recognition at this tier does not warrant Hard/Easy granularity — the finer-grained FSRS signals come from Practice drill performance.

---

#### Scaffolding

Review tier — no mastery-tier scaffolding. Consistent active retrieval experience regardless of word stability. Complexity scaling would undermine the Review function.

---

#### No Bones, No XP

Stays in Review tier below Practice tier in the incentive hierarchy. FSRS updates only. Practice drills remain the primary learning vehicle. The active retrieval requirement adds learning value without blurring the tier boundary.

---

## Open Research Questions

- [ ] Should Type It EN→SP have a fourth tier beyond Mastered — blank screen, no cue, uncued free recall — once Mastered-tier user data exists to validate it?
- [ ] Relaxed/Strict spelling mode currently operates as a global session toggle. Listen & Type requires per-word mode switching tied to FSRS mastery tier. State architecture decision needed — flag for State Ledger before Emergent builds DrillShell.
- [ ] Contextual Binding fires after every correct Phase 3 answer by showing `contextSentence`. Sentence Builder's source IS the `contextSentence`. Does Contextual Binding apply to this drill, or is the completed sentence itself the binding step? Flag for DrillShell UX decision before Emergent builds this.
- [ ] At Intermediate tier and above, should Sentence Builder tile assembly be replaced by guided free sentence writing? Confirm when Intermediate tier paths are designed.

---

## Removed Drills

**Word Sort — removed.** Research verdict: semantic sorting (grouping words by category) produces no significant advantage over structural sorting in vocabulary retention studies. The semantic interference effect — presenting semantically related words simultaneously inhibits learning — poses a genuine risk. Warm Up function already covered by Matching and Hear & Choose. Removed from the system entirely.

---

## Discuss Later

- [ ] **Type It — Draw mode variant (mobile)** — User writes the Spanish word with finger on touchscreen canvas instead of typing. Activates the full sensorimotor loop equivalent to pen and paper handwriting (Van der Meer, 2024). Research-backed memory advantage over typing. No cursive font equivalent exists — the benefit is in motor production, not visual appearance. No other consumer language app at this level offers this. Build after core system is stable. Flag for v4 or later.

- [ ] Should the Conjugation content audit (removing vosotros, confirming 5-form tables, sequencing regular before irregular for Category B verbs) be a Content chat task before the paths.js rewrite, or a Windsurf task on the existing drillData.js? Recommend: Content chat first.

---

*Document status: ✅ ALL 9 DRILLS FULLY AUDITED AND COMPLETE.*
*Ready to add to Project Files.*
