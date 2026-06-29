# Milo Speaks Spanish — UI Design Spec
# Last updated: 2026-06-28
# Status: LOCKED — use this as the brief for all UI redesign sessions

---

## 1. Design Philosophy

Warm, dog-world feel — AND polished and premium.
Not childish. Not corporate. Think Duolingo's warmth with more sophistication.
Every screen should feel like Milo's world, not a generic app.
Cards float on a deep black background — Milo's coat. White surfaces, black gutters.

---

## 2. Colour Palette (locked)

| Role | Hex | Used for |
|---|---|---|
| App background | `#1a1a1a` | Page background — the black gutter between all cards |
| Cream | `#F5F0E8` | Card interior backgrounds, secondary button text |
| Hero ochre | `#C8A96E` | Hero card background — warm golden tan |
| Forest green | `#3B6D11` | Primary action buttons, progress bars, streak dots |
| Sage green | `#C0DD97` | Correct answer states, light fills |
| Light green | `#EAF3DE` | Pill backgrounds, inactive dots, secondary button bg |
| Terracotta | `#D85A30` | Needs review label, Ko-fi button, accent alerts |
| Teal | `#1D9E75` | Section labels, word of the day bg end, teal Go button |
| Deep navy | `#26215C` | Headings, hero headline, primary body text |
| Muted grey | `#888780` | Secondary text, labels, footer text |
| Amber dark | `#4A3B00` | Hero date text (on ochre background) |

### Rules
- App background is always `#1a1a1a` — Milo's coat — never cream, never white
- All cards are white `#fff` with `border-radius: 14px`
- Hero card matches all other cards — rounded corners, black gutter on all sides
- Spanish words in drills render in terracotta `#D85A30`
- Primary action buttons always forest green `#3B6D11` with cream text
- Section labels always teal `#1D9E75`, uppercase, Nunito 9px, letter-spacing 0.06em
- "Needs review" label renders in terracotta — it is a soft alert, not a neutral label
- Never use the old dark brown/maroon colour scheme

---

## 3. Typography (locked)

| Role | Font | Size | Weight | Colour |
|---|---|---|---|---|
| Hero headline | Nunito | 20px | 800 | Deep navy `#26215C` |
| Spanish target word (drills) | Fraunces (serif) | 32–48px | 700 | Terracotta `#D85A30` |
| Word type label | Nunito | 11px | 600 | Teal `#1D9E75`, uppercase, letter-spaced |
| English translation | Nunito | 12–15px | 400 | Muted grey `#888780` |
| Section labels | Nunito | 9px | 700 | Teal `#1D9E75`, uppercase, letter-spacing 0.06em |
| Big stat numbers | Fraunces | 24–38px | 700 | Varies by role (see colour palette) |
| Body text | Nunito | 12–14px | 400 | Deep navy `#26215C` |
| Button text | Nunito | 11–13px | 700 | Cream `#F5F0E8` or role colour |
| Footer text | Nunito | 12px | 400 italic | Muted grey `#888780` |

### Rules
- Fraunces is used ONLY for Spanish target words and big stat numbers
- Nunito is used for everything else
- Both fonts load from Google Fonts
- Section labels are always 9px, uppercase, teal, letter-spaced — consistent across all cards

---

## 4. Milo Character Spec (locked)

- Senior black Labrador — white and grey fur on chin and muzzle
- Purple collar with gold MILO bone tag
- Style B — realistic painterly illustration (NOT cartoon, NOT puppy)
- No bandana. Tie for special events only.
- White circle container: `border-radius: 50%`, white background, green-tinted border
- On home screen: 110–130px diameter circle, vertically centred in hero card

### Poses completed
- `milo_idle.gif` — default, watching
- `milo_straining.gif` — Break Free, pulling at chain
- `milo_breaking.gif` — chain snap moment
- `milo_free.gif` — running free after Break Free

### Poses still needed
- `milo_celebrate.gif` — Stop/Path complete, achievements
- `milo_encourage.gif` — failed attempt, try again
- `milo_fetch.gif` — Fetch session active

---

## 5. Milo Presence Map (locked)

| Screen | Milo present? | Pose |
|---|---|---|
| Home | Yes — hero card, circle | Idle |
| Paths tab | Yes — header | Idle |
| Stop preview | Yes — header | Idle |
| Study tab | Yes — header | Idle |
| Friends tab | Yes — header | Idle |
| Milo tab | Yes — prominent | Idle / reactive |
| All drill screens | NO — absent while user works | — |
| Stop complete | Yes — full | Celebrate |
| Path complete | Yes — full | Celebrate |
| Failed attempt / try again | Yes | Encourage |
| Fetch session active | Yes — header | Fetch pose |

Pattern: Milo accompanies you → disappears while you work → reappears to celebrate or encourage.

---

## 6. Home Screen Layout Spec (locked 2026-06-28)

### Card system
- All cards: `background: #fff`, `border-radius: 14px`, `padding: 14px 12px`
- All gutters: `8px` between cards, `12px` on left/right edges
- Top of screen: `12px` gutter above hero card
- App background `#1a1a1a` shows through all gutters — this IS the design

### Hero card (top)
- Same rounded corners as all other cards — `border-radius: 14px`, `overflow: hidden`
- Background: warm ochre radial gradient `#8B6914 → #C8A96E → #E8C97A`
- Left side content (max-width 190px):
  - Headline: "¡Hola, Estudiante! 🐾" — Nunito 20px 800 deep navy
  - Subline: "¡Vamos! ¡Tú puedes!" — Nunito 12px 600 forest green
  - Date: localised Spanish date — Nunito 10px amber dark `#4A3B00`
  - CTA button: "🐾 Continue learning" — forest green, cream text, border-radius 24px
- Right side: Milo circle — 110px diameter, vertically centred, white bg, white border
- Speech bubble: removed (was cluttering the card)
- "Learn · Practice · Master" tagline: removed (already in header)

### Streak + My Words row (two columns, equal width)
- Both cards share identical fixed-height rows for pixel-perfect alignment:
  - Header row: `height: 24px` — "Streak" label left + pulsing 🔥 right / "📚 My Words" label left
  - Stat row: `height: 44px` — "12 days" baseline / "142 · 23 · 89" baseline-aligned numbers
- Streak card: 12 days, week dots (M T W T F S S), "Keep it up!" in terracotta
- My Words card: three stats — learned (green), needs review (terracotta + bold), mastered (teal)
- My Words card: "View all words →" button in sage green at bottom
- "Needs review" renders in terracotta — it is a call to action, not a neutral count

### Word of the day card (full width)
- Background: forest green → teal gradient, `border-radius: 14px`
- Left: "⭐ WORD OF THE DAY" label, Spanish word in Fraunces 32px white, type label, context sentence italic
- Right: emoji representing the word in a translucent circle
- "Practice this word →" ghost button at bottom

### Daily challenges card (full width, white)
- Two challenge rows, each in a cream `#F5F0E8` rounded sub-card:
  - Fetch — weakest 5 words: terracotta Go button
  - Today's theme — [theme name]: teal Go button
- Each row: emoji icon circle left, title + description middle, Go button right

### Ko-fi + Achievements row (two columns, equal width)
- Ko-fi card: paw emoji, "Milo learns free.", "Enjoy the app? Support Milo on Ko-fi.", red ☕ button
  - NOTE: Charity line ("80% goes to...") is NOT shown until 500 MAU — do not add until that threshold
- Achievements card: three rows — shield/flame/star badge, name, description

### Footer
- Centred, muted grey, italic
- Text: "🐾 Every word you learn is an adventure we share together. 🐾"
- Padding: 12px top and bottom — tight, no excessive black gutter below

---

## 7. Language Rules (locked)

- UI chrome is English throughout
- Spanish appears ONLY where it teaches: word of the day, context sentences, hero subline (¡Vamos! ¡Tú puedes!), drill content
- Hero headline is English with a Spanish greeting: "¡Hola, Estudiante! 🐾" is intentional — it IS a teaching moment
- Date in hero: localised Spanish format (Domingo, 28 de junio de 2026) — also intentional teaching
- Section labels, buttons, stat labels, achievement names: always English

---

## 8. Friends / Animal Characters (locked)

- NOT on the home screen
- Reserved for the Bones page when it is built
- Friends are Milo's animal companions — they unlock as part of the Bones economy

---

## 9. Tool Assignment

| Task | Tool |
|---|---|
| CSS variables + Google Fonts import | Claude Code |
| Milo pose state logic in SpanishHub.jsx | Claude Code |
| HomeTab.jsx React component build | Claude Code (Wrapper Pattern) |
| Word card redesign | v0 → Wrapper Pattern |
| Stop/Path complete screen updates | Claude Code |

---

## 10. CSS Variables (ready to paste into index.css)

```css
:root {
  --color-bg: #1a1a1a;
  --color-cream: #F5F0E8;
  --color-hero: #C8A96E;
  --color-green-forest: #3B6D11;
  --color-green-sage: #C0DD97;
  --color-green-light: #EAF3DE;
  --color-terracotta: #D85A30;
  --color-teal: #1D9E75;
  --color-navy: #26215C;
  --color-grey: #888780;
  --color-amber-dark: #4A3B00;
  --card-radius: 14px;
  --card-bg: #ffffff;
  --gutter: 8px;
  --gutter-edge: 12px;
}
```
