# MONOREPO_AUDIT.md
# Milo Speaks Spanish — Monorepo Readiness Audit
# Stage P1 — Diagnosis only. No code changes.
# Completed: 2026-06-05

---

## Summary

Total hardcoded language references: 66
Files affected: 14
All migration effort ratings: LOW or MEDIUM — no HIGH effort items found.
The codebase is in good shape for monorepo migration.

---

## Migration effort by category

| Category | Count | Effort | Migration action |
|---|---|---|---|
| speak() language argument | 28 | LOW | Replace 'es' with languageConfig.sourceLanguage |
| Voice/TTS language codes | 6 | LOW–MEDIUM | Replace hardcoded codes with languageConfig fields |
| Drill direction ID strings | 18 | MEDIUM | Replace 'es-en'/'en-es' with languageConfig.drillDirectionId |
| UI display strings | 14 | LOW | Replace with languageConfig.sourceLanguageName / targetLanguageName |

---

## languageConfig.js fields needed (P2 task)

```javascript
export const languageConfig = {
  appId: "milo-es-en",
  sourceLanguage: "es",            // replaces hardcoded 'es' in speak() calls
  targetLanguage: "en",            // replaces hardcoded 'en'
  sourceLanguageCode: "es-ES",     // replaces hardcoded 'es-ES' in TTS/recognition
  targetLanguageCode: "en-US",     // replaces hardcoded 'en-US' in TTS
  sourceLanguageName: "Spanish",   // replaces 'Spanish' in UI labels
  targetLanguageName: "English",   // replaces 'English' in UI labels
  drillDirectionId: "es-en",       // replaces 'es-en' as primary drill direction ID
  reverseDrillDirectionId: "en-es",// replaces 'en-es'
  drillDirectionLabel: "SP→EN",    // replaces direction label strings
  reverseDrillDirectionLabel: "EN→SP",
  deeplSourceCode: "ES",           // DeepL API source language
  deeplTargetCode: "EN-US",        // DeepL API target language
  uiLocale: "en",                  // UI language
  displayName: "Milo Speaks Spanish",
  dateLocale: "es-ES",             // replaces toLocaleDateString('es-ES')
}
```

---

## Complete reference list

### speak() calls — 28 occurrences
All become: speak(x, languageConfig.sourceLanguage)

| File | Line | Current call |
|---|---|---|
| ChoiceDrill.jsx | 33 | speak(word.es, 'es') |
| ChoiceDrill.jsx | 67 | speak(promptText, 'es') |
| ChoiceDrill.jsx | 81 | speak(promptText, 'es') |
| ChoiceDrill.jsx | 113 | speak(word.es, 'es') |
| ChoiceDrill.jsx | 124 | speak(word.es, 'es') |
| TypeDrill.jsx | 26 | speak(word.es, 'es') |
| TypeDrill.jsx | 37 | speak(currentWord.es, 'es') |
| TypeDrill.jsx | 131 | speak(word.es, 'es') |
| TypeDrill.jsx | 146 | speak(promptText, 'es') |
| TypeDrill.jsx | 176 | speak(word.es, 'es') |
| TypeDrill.jsx | 184 | speak(word.es, 'es') |
| TypeDrill.jsx | 195 | speak(word.es, 'es') |
| ConjugationDrill.jsx | 48 | speak(item.ans, 'es') |
| ConjugationDrill.jsx | 70 | speak(item.verb, 'es') |
| ConjugationDrill.jsx | 92 | speak(item.ans, 'es') |
| FillBlankDrill.jsx | 41 | speak(sentence, 'es', 0.72) |
| FillBlankDrill.jsx | 99 | speak(sentence, 'es', 0.72) |
| SentenceBuilderDrill.jsx | 25 | speak(feedback.target, 'es', 0.72) |
| SentenceBuilderDrill.jsx | 109 | speak(feedback.target, 'es', 0.72) |
| FlashcardDrill.jsx | 61 | speak(speakText, 'es') |
| FlashcardDrill.jsx | 181 | speak(speakText, 'es') |
| GenderDrill.jsx | 25 | speak('el/la' + n.es, 'es') |
| GenderDrill.jsx | 102 | speak(correctLabel + word.es, 'es') |
| MatchingDrill.jsx | 86 | speak(id, 'es') |
| LessonView.jsx | 68 | speak(ex.es, 'es') |
| HomeTab.jsx | 134 | speak(wotd.contextSentence, 'es') |
| HomeTab.jsx | 145 | speak(wotd.es, 'es') |
| WordDetail.jsx | 107 | speak(word.es, 'es') |
| WordDetail.jsx | 123 | speak(word.sentence.es, 'es') |

### Voice/TTS language codes — 6 occurrences

| File | Line | Current value | Replace with |
|---|---|---|---|
| helpers.js | 139 | 'es-ES' (voice lookup) | languageConfig.sourceLanguageCode |
| helpers.js | 150 | 'es-ES' (TTS fallback) | languageConfig.sourceLanguageCode |
| helpers.js | 154 | 'en-US' (English TTS) | languageConfig.targetLanguageCode |
| WordDetail.jsx | 38 | 'es-ES' (SpeechRecognition) | languageConfig.sourceLanguageCode |
| HomeTab.jsx | 33 | toLocaleDateString('es-ES') | languageConfig.dateLocale |
| ProfileSheet.jsx | 14 | toLocaleDateString('en-US') | languageConfig.targetLanguageCode |
| MiloChat.jsx | 127 | 'en-US' (English utterance) | languageConfig.targetLanguageCode |
| MiloChat.jsx | 163–164 | 'en-US' / 'es-ES' conditional | languageConfig fields |

### Drill direction ID strings — 18 occurrences

| File | Line | Value | Notes |
|---|---|---|---|
| drillData.js | 6 | id: 'es-en' | DRILLS metadata |
| drillData.js | 7 | id: 'en-es' | DRILLS metadata |
| evaluateBadges.js | 5 | 'es-en', 'en-es' | PRACTICE_DRILL_IDS |
| SpanishHub.jsx | 363 | drillId: 'es-en' | startDailyChallenge |
| DoneScreen.jsx | 7 | 'es-en', 'en-es' | DRILL_NAMES map |
| DrillRouter.jsx | 27–28 | case 'es-en', 'en-es' | switch cases |
| DrillsGrid.jsx | 47–48 | metaId: 'en-es' | toggle options |
| ChoiceDrill.jsx | 6, 19, 44–45 | 'es-en', 'en-es' | mode values + titles |
| FlashcardDrill.jsx | 9, 40–41, 112, 122 | 'es-en', 'en-es' | direction state |
| MiloChat.jsx | 18, 44, 163, 189, 279–292 | 'en-es' | translate direction |

### UI display strings — 14 occurrences

| File | Line | Value | Replace with |
|---|---|---|---|
| ChoiceDrill.jsx | 44 | 'Spanish → English' | languageConfig.drillDirectionLabel |
| ChoiceDrill.jsx | 45 | 'English → Spanish' | languageConfig.reverseDrillDirectionLabel |
| ChoiceDrill.jsx | 75 | 'Spanish' / 'English' | languageConfig.sourceLanguageName / targetLanguageName |
| TypeDrill.jsx | 65 | 'Type — Sp → En' | derived from languageConfig |
| TypeDrill.jsx | 66 | 'Type — En → Sp' | derived from languageConfig |
| TypeDrill.jsx | 139 | 'Spanish' / 'English' | languageConfig.sourceLanguageName / targetLanguageName |
| TypeDrill.jsx | 158 | 'Type English…' / 'Type Spanish…' | derived from languageConfig |
| FlashcardDrill.jsx | 46, 48 | 'Spanish' / 'English' | languageConfig fields |
| FlashcardDrill.jsx | 119, 129 | 🇪🇸 Spanish → English / 🇬🇧 English → Spanish | languageConfig fields |
| MatchingDrill.jsx | 76 | 'Tap a Spanish word, then its English match' | derived from languageConfig |
| DoneScreen.jsx | 7 | 'Spanish → English', 'English → Spanish' | languageConfig.drillDirectionLabel |
| drillData.js | 6–13 | drill name/desc strings | languageConfig fields |

---

## Files that need NO changes

| File | Reason |
|---|---|
| helpers.js (mastery/SRS functions) | Language-agnostic — uses word.es as key only |
| evaluateBadges.js (badge logic) | Language-agnostic except PRACTICE_DRILL_IDS strings |
| FillBlankDrill.jsx (pool logic) | Language-agnostic — pool comes from drillData |
| SentenceBuilderDrill.jsx (pool logic) | Language-agnostic — pool comes from drillData |
| ConjugationDrill.jsx (drill logic) | Language-agnostic — pool comes from drillData |
| Firebase.js | Language-agnostic |
| Leaderboard.jsx | Language-agnostic |
| FriendsList.jsx | Language-agnostic |

---

## Files requiring significant restructuring (P3/P4 scope)

| File | Work required |
|---|---|
| data/words.js | Move to src/content/es-en/words.js — content file, not engine |
| data/lessons.js | Move to src/content/es-en/lessons.js — content file |
| data/drillData.js | Move to src/content/es-en/drillData.js — content file |
| data/paths.js | Move to src/content/es-en/paths.js — content file |
| helpers.js speak() | esVoice singleton becomes targetVoice, initialised from languageConfig |
| SpanishHub.jsx | localStorage key 'spanish-hub-guest' → languageConfig.appId + '-guest' |
| SpanishHub.jsx | Streak notification string references Spanish explicitly |

---

## P2 implementation order (lowest risk first)

1. Create src/config/languageConfig.js with all fields above
2. Import languageConfig in helpers.js — replace esVoice with targetVoice, replace 'es-ES'/'en-US' hardcodes
3. Import languageConfig in every drill component — replace all speak() second arguments
4. Import languageConfig in ChoiceDrill, TypeDrill, FlashcardDrill, MatchingDrill — replace UI strings
5. Import languageConfig in DoneScreen, DrillsGrid, drillData.js — replace direction labels
6. Import languageConfig in MiloChat — replace translate direction codes
7. Import languageConfig in SpanishHub — replace localStorage key and notification string
8. Verify: grep -r '"es"' src/ and grep -r "'Spanish'" src/ should return zero hits in logic files
