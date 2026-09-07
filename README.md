# Hej Dansk — brand-guideline clone

An 11-page static clone of the Hej Dansk app, now matching the official
Brand Guideline (colors, fonts, and real logo assets) with click
interactions so you can see how the palette behaves when something
actually happens (selected, checked, pressed, chosen).

## Open it
Open `index.html` in a browser — no build step needed.

## Colors (from the Brand Guideline, 7 Sept)
```
--glacier:   #7fb8cc   Glacier Blue
--orange:    #e8792e   Bright Orange
--paleice:   #b9dde8   Pale Ice Tint
--flagred:   #c8102e   Flag Red
--fjordnavy: #1c2e4a   Fjord Navy
--offwhite:  #d9d9d9   "Pure white" swatch (a soft neutral gray — used for muted borders/surfaces)
```
Fjord Navy drives the header/headings, Bright Orange drives buttons and
links, Pale Ice Tint backs the rule boxes and page background, and Flag
Red is reserved for alerts/incorrect states. Everything else (hover
states, tag tints, the "multiple choice" tag) is a mix of these six.

## Fonts
Inter only, per the guideline's font update:
- **Heading** — Inter ExtraBold, line-height 1.25, letter-spacing 0
- **Subheading** — Inter Bold
- **Body** — Inter Regular

## Logo
Uses your actual brand assets (in `assets/`), not a redrawn placeholder:
- `logo-original-transparent.svg` — the full-color swan mark, used in
  the nav and footer next to the "Hej Dansk" wordmark
- `logo-g_blue-bg.svg` — the swan in a Glacier-blue circle, used as the
  favicon
- `logo-grey-transparent.svg`, `logo_full.svg` — included for
  reference/future use (the grey version for muted contexts, the full
  lockup for light-background placements)

## Live customizer — synced across every page
Hover (or tap) the palette icon, bottom-right: color pickers for Navy /
Orange / Glacier / Red, font selects for headings/body, and a reset.
Changes save to `localStorage` and apply on every page the instant you
open it — no flash of the old palette.

## Interactions — see the colors react to actions
- Every button dips and darkens on click (`:active` state).
- Chapter action buttons (Bookmark / In Progress / Mark Done) toggle
  between an outlined "off" state and a filled Glacier-blue "on" state.
- 12-Week Plan checkboxes fill Orange with a checkmark and strike
  through the task title on click.
- Quiz, quick-check, and reading options are click-to-select — picking
  one fills it with the accent color, clears sibling options, and the
  "N/M answered" counters update live.
- Pricing cards mark themselves "Selected ✓" when clicked.
- Chapter tabs swap active state on click.

## Pages
`index.html` (landing), `dashboard.html`, `plan.html`, `chapters.html`,
`chapter-nouns.html` (full chapter detail), `practice-quiz.html` (20
questions), `mock-tests.html`, `mock-test-intro.html`,
`mock-test-modal.html`, `reading-active.html`, `reading-results.html`.

## Notes
- Running body copy (testimonials, page titles like "Gratis Prøve –
  Prøv Hejdansk") still reads "Hejdansk" as one word, matching the
  real product content you uploaded earlier — only the logo lockup
  itself (nav + footer) switched to the two-word "Hej Dansk" treatment
  shown in the Brand Guideline. Say the word if you'd rather have the
  one-word form everywhere instead.
- "Reading", "Writing", and "Speaking" nav items are inert — no source
  pages were included for those.
- The landing-page hero still uses a CSS-drawn rooftop pattern in
  place of a real product photo.

## Hosting on GitHub Pages
Already set up for this — push the folder as-is (root or a `/docs`
folder), enable Pages in **Settings → Pages**, done. The included
`.nojekyll` file tells GitHub Pages to skip its build step and serve
everything exactly as-is. Every link is relative, so it works whether
it's served at the root of `username.github.io` or at a subpath like
`username.github.io/repo-name/`. And since it's served over `https://`
from one real origin, the customizer's cross-page sync is fully
reliable — more so than opening the files locally via `file://`.
