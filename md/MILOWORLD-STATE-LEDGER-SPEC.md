# Milo's World — State Ledger Spec
*Drafted ahead of build per MEOS Stage 1 (Planning). Filed for later — NOT to be fed to Emergent until prerequisites below are met.*

---

## Status: NOT READY TO BUILD
Sequencing note carried over from `MILO-RESEARCH-IDEAS.md`: build after Break Free ships and the persistent-companion/timed-overlay mechanic is validated with real users. Milo's World is not on the current 7-session Emergent list (A–G). This spec exists so the architecture isn't reinvented later — not as a green light.

---

## 1. Core architectural rule
Milo's World does NOT maintain its own copy of vocabulary mastery data. It reads `progress{}` for content decisions (which words/structures to surface) and writes mastery updates through the existing `onUpdateWordProgress` path, the same one drills already use. A Milo's World scene is a different *presentation* of a production check — narratively framed — not a parallel data system. This is the direct answer to "should vocabulary and Milo's World be separate Firebase projects": no, and they shouldn't even be separate collections.

## 2. Firestore schema
Lives as a sub-object on the existing `users/{uid}` document. Not a new top-level collection — no new read cost, folds into the single fan-out read SpanishHub.jsx already performs at mount.

```
users/{uid}.miloWorld: {
  currentSceneId: string | null,      // active scene, null when idle
  sceneStatus: 'idle' | 'offered' | 'active' | 'resolved',
  completedSceneIds: string[],        // capped at 50, truncate oldest on overflow
  structureExposure: {
    [structureId]: {                  // e.g. "request", "complaint", "apology"
      lastSceneId: string,
      lastSeenAt: timestamp,
      count: number
    }
  },
  charactersMet: string[],            // recurring character IDs introduced so far
  lastSceneAt: timestamp              // pacing/trigger cooldown
}
```

`completedSceneIds` is capped to bound document size. If a "story so far" recap screen is wanted later, that's a separate lightweight subcollection (write-only on completion, read only when the recap screen is opened) — explicitly deferred, not part of v1.

## 3. State ownership
**Global (SpanishHub.jsx):** owns `miloWorldState`, fetched in the same one-time read as the rest of the user document. Passes `miloWorldState` and an `onResolveScene` callback down as props — Parent Fan-Out, no child queries Firestore directly.

**Component:** a new `MiloWorldOverlay.jsx`, modeled on Break Free's existing precedent ("a timed overlay mode inside DrillShell.jsx") — an overlay triggered from an existing screen, not a new permanent tab, pending the trigger-condition decision below.

**Local (inside the overlay):** scene-internal UI state — current dialogue line index, input field value, animation state — lives in the component itself and is never persisted mid-scene. Optimistic UI: show the resolution outcome immediately on answer, persist after.

## 4. Finite State Machine — scene lifecycle
```
idle → offered → active → resolved → idle
```
- **idle:** no active scene. `currentSceneId` is null.
- **offered:** Milo presents the need (e.g. "Milo needs bread for Grandma Lola"). No data written yet.
- **active:** user attempts the production. Input is checked through the same evaluation logic existing output drills use.
- **resolved:** success — simulated outcome shown, `structureExposure` updated, `completedSceneIds` appended, reward granted through the existing bones/XP path (see §7). Failure — no-penalty message, retry allowed, no `progress.w` increment beyond normal drill-failure semantics.

## 5. Content design rule — carried over, must be respected by the scene bank
Don't just resurface vocabulary (FSRS already does that). Each scene's `structureId` should be deliberately reintroduced in a different scene's context days later — the `structureExposure` map exists specifically to let the scene-selection logic check "when did the user last see a request/complaint/apology structure" and choose accordingly.

## 5a. Visual framing — v1 scene overlay vs. v2 persistent town
**v1: single-scene overlay, swappable setting.** One full-screen scene at a time — e.g. a bakery interior with Milo and a recurring character (Jess), a dialogue line, and a production check — rendered by `MiloWorldOverlay.jsx` (§3). Visually distinct from the Paths trail on purpose: warm/intimate framing instead of the trail's spatial/structured framing, so the user's mode-switch is legible at a glance, not just in copy. The background/character set swaps per `currentSceneId`; nothing about it persists as an explorable space.

**v2 (not v1): persistent town map.** A hub screen where the user chooses which location to visit, with characters and locations remembered across visits. This is a real scope increase — a navigation layer, persistent per-location state, and one background asset per location instead of one at a time — not a styling change. Bundle this with the other item already marked "v2 enhancement, not v1" in `MILO-RESEARCH-IDEAS.md` (user agency over story turns): both are "give the world more permanence and player choice" upgrades on the same v1 base, and both should wait until v1 is validated.

**What doesn't change between v1 and v2:** the FSM in §4 and the schema in §2. A town map only changes *how a scene gets invoked* (player-chosen from a map vs. auto-triggered) — it doesn't change the scene lifecycle or the data written when a scene resolves.

## 6. Content authoring approach — OPEN DECISION
Pre-authored/templated scene bank (hand-written or one-time Gemini batch-generated, stored as static content like `paths.js`) vs. live per-interaction Gemini generation.
**Recommendation: pre-authored for v1.** The scenario re-encounter rule (§5) is something you can deliberately write into a fixed scene bank; it's hard to guarantee from a live LLM call without significant prompt validation, and it avoids unbounded per-scene Gemini token cost while the mechanic is still unvalidated.

## 7. Reward sizing — OPEN DECISION
Needs to be calibrated against existing values so the bones/XP economy stays coherent: +2 bones/Stop pass, +15 bones/Path pass are the existing anchors. A Milo's World scene resolution should probably sit between these, not above the Path-level reward, since a single scene is a smaller unit of work than a full Path.

## 8. Trigger condition — OPEN DECISION, shared with Break Free
Same category of decision as Break Free's still-unresolved trigger (see `MILO-ACTION-LIST.md`): daily cap, bones threshold, post-Stop completion, or a random "Milo's restless today" event. Recommend deciding both together — two separate narrative-overlay systems firing on unrelated schedules risks crowding a single session.

## 9. Cost analysis
- **Reads:** zero additional — folds into the existing single user-document read at SpanishHub.jsx mount.
- **Writes:** one combined write per scene resolution (current scene fields + `completedSceneIds` + `structureExposure`, batched into a single update call, same pattern as Stop completion's combined write) plus whatever the reused `onUpdateWordProgress` path already costs per answer. No new write pattern, no new cost category.
- **Storage:** zero from this spec. New character/scene art is a separate Storage cost question, independent of this schema.

## 10. Prerequisites before this spec is executed
1. Break Free ships and the timed-overlay/persistent-companion mechanic is validated with real users.
2. Trigger-condition decision made (§8), ideally jointly with Break Free's.
3. v1 scene bank authored — minimum 10–15 scenes, written against the structure re-encounter rule (§5).
4. Reward sizing decided (§7) and checked against existing bones/XP values.

## 11. Docs to update once this moves forward
- `CURRENT_STATE_LEDGER.md` — add the `miloWorld` schema field once implemented.
- `MILO-ACTION-LIST.md` — move Milo's World from the research doc into the real roadmap, likely as a new Emergent session after Session G (Break Free), not before.
