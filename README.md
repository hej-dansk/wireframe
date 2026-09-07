# Hejdansk — brand-colored, interactive clone

An 11-page static clone of the Hejdansk app, restyled with your brand
palette and fonts, with click interactions added so you can see how
the colors behave when something actually happens (selected, checked,
pressed, chosen) — not just on a static screen.

## Open it
Open `index.html` in a browser — no build step needed.

## Colors
Everything derives from three variables, set in `site.css`:

```
--glacier: #7fb8cc   Glacier Blue
--orange:  #e8792e   Bright Orange
--flagred: #c8102e   Flag Red
```

Every other color on the site is a mix of these three (plus black/white
for shading) — including the dark header/heading color, which is just
a darkened Glacier Blue, and the "multiple choice" tag, which is a
Flag-Red/navy blend. Nothing introduces an outside hue.

## Fonts
League Spartan (headings) + Inter (body), loaded from Google Fonts.

## Live customizer — now synced across every page
Hover (or tap) the palette icon, bottom-right. It opens a panel with:
- Color pickers for **Navy**, **Orange**, **Glacier**, **Red**
- Font selects for headings and body text
- A "Reset to default" button

Any change is saved to `localStorage` and re-applied the instant you
open (or click into) any other page — so recoloring the dashboard and
then clicking through to Chapters or the Practice Quiz shows the same
new palette immediately, with no flash of the old colors. "Reset to
default" clears the saved theme everywhere.

## Interactions — see the colors react to actions
- **Every button** dips and darkens on click (`:active` state) —
  solid, outline, and ghost buttons alike.
- **Chapter action buttons** (Bookmark / In Progress / Mark Done) are
  real toggles — click to flip between an outlined "off" state and a
  filled Glacier-blue "on" state.
- **12-Week Plan checkboxes** fill in Orange with a checkmark on
  click, and strike through the task title.
- **Quiz and reading options** (practice quiz, quick-checks, the
  reading exercise) are click-to-select — picking one fills it with
  the accent color and clears any sibling selection in that question.
  The "N/M answered" counters update live as you select.
- **Chapter tabs** ("Short Version / Notes" vs "Full Chapter") swap
  their active state on click.
- **Pricing cards**: clicking "Get Basic/Advanced/Pro" marks that plan
  as chosen (solid fill + "Selected ✓") and clears the others.
- The FAQ accordion on the landing page was already interactive.

## Pages
`index.html` (landing), `dashboard.html`, `plan.html`, `chapters.html`,
`chapter-nouns.html` (full chapter detail), `practice-quiz.html` (20
questions), `mock-tests.html`, `mock-test-intro.html`,
`mock-test-modal.html`, `reading-active.html`, `reading-results.html`.

## Notes
- "Reading", "Writing", and "Speaking" nav items are inert — no source
  pages were included for those.
- The landing-page hero uses a CSS-drawn rooftop pattern in place of a
  real product photo.

## Hosting on GitHub Pages
This site is already set up to drop straight into GitHub Pages with
no changes:

1. Create a repo and push everything in this folder to it (root of
   the repo, or a `/docs` folder — either works).
2. A blank `.nojekyll` file is included, which tells GitHub Pages to
   serve every file exactly as-is and skip its Jekyll build step
   entirely — not required for plain HTML/CSS/JS like this, but it
   avoids edge cases (e.g. folders starting with `_` being ignored)
   and makes deploys a bit faster.
3. In the repo's **Settings → Pages**, set the source to that branch
   and folder. The site will be live at
   `https://<username>.github.io/<repo-name>/`.
4. Every link in the site is relative (no leading `/`), so it works
   correctly whether it's served from the root of `username.github.io`
   or from a subpath like `username.github.io/repo-name/` — no path
   edits needed either way.
5. **The cross-page color/font sync gets more reliable, not less** —
   `localStorage` is scoped per-origin, and `file://` pages sometimes
   get treated as separate origins by the browser (which is why the
   note below existed). Once this is served over `https://` from one
   real domain, that caveat goes away completely: recoloring the site
   on one page and clicking through to any other will always show the
   new palette.
6. Google Fonts are loaded over `https://`, which GitHub Pages serves
   natively — no extra setup needed.
