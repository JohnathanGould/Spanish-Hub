## Emergent Session D — Milo Vocabulary Awareness

### Classification
- **Type:** Wiring + prompt engineering
- **Risk:** Low-medium. Two files touched. No new components. API payload change is additive — existing fields unchanged.
- **Stage:** 3 — stabilization
- **Affected files:** SpanishHub.jsx, MiloChat.jsx, frontend/api/chat.js
- **Pattern:** Serverless Proxy — secrets stay in api/chat.js, context flows from SpanishHub → MiloChat → api/chat.js

---

### What the problem is

Milo receives only three fields per message: the user's message, conversation history, and UID. He has no knowledge of:
- The user's name
- Which words they have learned or mastered
- Which Paths they have completed
- Their streak or XP
- Their weakest words

Every user gets the same generic beginner experience regardless of how far they've progressed.

---

### Pre-flight confirmation — Emergent must report first 3 lines of each file before touching anything
frontend/src/SpanishHub.jsx

frontend/src/MiloChat.jsx

frontend/api/chat.js

---

### Task 1 — Compute learnerContext in SpanishHub.jsx and pass to MiloChat

Import at the top of SpanishHub.jsx if not already present:
```js
import { MASTER } from './content/es-en/words';
import { masteryLevel } from './utils/helpers';
```

Compute `learnerContext` as a derived value inside the component, after `userData` is available. Do not use `useMemo` — compute inline where MiloChat is rendered:

```js
const learnedWords = MASTER
  .filter(w => (userData.progress?.[w.es]?.c || 0) > 0)
  .map(w => ({
    es: w.es,
    en: w.en,
    level: masteryLevel(userData.progress, w.es),
  }));

const weakestWords = [...learnedWords]
  .filter(w => w.level === 'learning' || w.level === 'new')
  .sort((a, b) => {
    const sA = userData.progress?.[a.es]?.s || 0;
    const sB = userData.progress?.[b.es]?.s || 0;
    return sA - sB;
  })
  .slice(0, 10)
  .map(w => ({ es: w.es, en: w.en }));

const learnerContext = {
  displayName: userData.displayName || 'Estudiante',
  streak: userData.streak?.count || 0,
  xp: userData.xp || 0,
  completedPaths: userData.completedPaths || [],
  totalWordsLearned: learnedWords.length,
  masteredWords: learnedWords.filter(w => w.level === 'mastered').map(w => ({ es: w.es, en: w.en })),
  weakestWords,
};
```

Update the MiloChat mount in SpanishHub.jsx from:
```jsx
<MiloChat userUid={effectiveUser.uid} />
```

To:
```jsx
<MiloChat userUid={effectiveUser.uid} learnerContext={learnerContext} />
```

---

### Task 2 — Include learnerContext in the API request body in MiloChat.jsx

Find the request body in MiloChat.jsx:
```js
body: JSON.stringify({
  message: userMessage.content,
  conversationHistory: messages.slice(-10).map((m) => ({
    role: m.role === "user" ? "user" : "assistant",
    content: m.content,
  })),
  userUid: userUid || "anonymous",
})
```

Replace with:
```js
body: JSON.stringify({
  message: userMessage.content,
  conversationHistory: messages.slice(-10).map((m) => ({
    role: m.role === "user" ? "user" : "assistant",
    content: m.content,
  })),
  userUid: userUid || "anonymous",
  learnerContext: learnerContext || null,
})
```

Add `learnerContext` to MiloChat's prop definition:
```js
function MiloChat({ userUid, learnerContext }) {
```

---

### Task 3 — Inject learnerContext into the system prompt in frontend/api/chat.js

In `api/chat.js`, read `learnerContext` from the request body:
```js
const { message, conversationHistory, userUid, learnerContext } = req.body;
```

Build a context block to inject into the Gemini contents array, immediately after the system prompt and before the conversation history:

```js
const contextBlock = learnerContext ? `
LEARNER PROFILE — read this before every response:
- Name: ${learnerContext.displayName}
- Current streak: ${learnerContext.streak} day${learnerContext.streak !== 1 ? 's' : ''}
- Total XP: ${learnerContext.xp}
- Paths completed: ${learnerContext.completedPaths.length > 0 ? learnerContext.completedPaths.join(', ') : 'none yet'}
- Words learned: ${learnerContext.totalWordsLearned}
- Words mastered: ${learnerContext.masteredWords.length}

WEAKEST WORDS (prioritise these in practice suggestions):
${learnerContext.weakestWords.length > 0
  ? learnerContext.weakestWords.map(w => `- ${w.es} (${w.en})`).join('\n')
  : '- None yet — learner is just getting started'}

MASTERED WORDS (use freely in conversation — learner knows these well):
${learnerContext.masteredWords.length > 0
  ? learnerContext.masteredWords.map(w => w.es).join(', ')
  : 'none yet'}

Use the learner's name naturally in conversation. Celebrate streak milestones. When suggesting practice, prioritise the weakest words listed above. Use mastered words freely in Spanish without translation. Always translate words the learner has not yet learned.
` : '';
```

Inject `contextBlock` into the Gemini `contents` array as a user turn immediately before the conversation history, if `contextBlock` is non-empty:

```js
const contents = [
  // existing system prompt turn
  { role: 'user', parts: [{ text: systemPrompt }] },
  { role: 'model', parts: [{ text: miloGreeting }] },
  // inject learner context if available
  ...(contextBlock ? [{ role: 'user', parts: [{ text: contextBlock }] }, { role: 'model', parts: [{ text: '¡Entendido! I know who I\'m talking to.' }] }] : []),
  // existing conversation history
  ...conversationHistory.map(m => ({
    role: m.role === 'user' ? 'user' : 'model',
    parts: [{ text: m.content }],
  })),
  // current message
  { role: 'user', parts: [{ text: message }] },
];
```

---

### What Emergent must NOT do

- Do not read `users/{uid}` from Firestore in api/chat.js — context comes from the client
- Do not pass the raw `progress` object to MiloChat — use the slimmed `learnerContext` only
- Do not modify the rate limiting logic in api/chat.js
- Do not modify the child safety guardrails in the system prompt
- Do not touch Firebase Auth logic or Firestore security rules
- Do not add new Firestore collections or fields

---

### Edge cases Emergent must handle

1. **Guest user** — `learnerContext` may be null or have empty arrays. `contextBlock` handles this gracefully with fallback strings.
2. **No words learned yet** — `weakestWords` and `masteredWords` will be empty arrays. Fallback strings already handle this.
3. **Very long masteredWords list** — at 500 mastered words, the mastered list becomes large. Cap `masteredWords` sent to API at 50 most recent — sort by `userData.progress[w.es].s` descending, slice to 50.
4. **displayName empty** — falls back to 'Estudiante' in learnerContext computation.
5. **learnerContext null in api/chat.js** — contextBlock is empty string, contents array skips the context turns entirely. Existing behaviour preserved.

---

### Verification steps

1. Open Milo chat — Milo greets user by name on first message
2. Ask Milo "what should I practice?" — Milo references weakest words by name
3. Ask Milo "how am I doing?" — Milo mentions streak count, XP, paths completed
4. Complete a new word, reopen chat — Milo's context reflects updated progress
5. Guest user opens chat — Milo behaves normally, no crash, no name reference
6. User with 0 words learned opens chat — Milo encourages starting, no crash

---

### Estimated tokens: 6–8

Three files, all additive changes. No new components. Largest cost is prompt engineering iteration if Gemini needs tuning. Pre-flight check mandatory.

---

---
