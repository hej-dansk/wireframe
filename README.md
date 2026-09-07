# Hejdansk — theming mockup

A 6-page static mockup (Dashboard, Grammar, Vocabulary, Quiz, Progress, Notes)
built so you can restyle the whole thing from one place and see how it feels.

## Open it
Just open `index.html` in a browser — no build step, no server needed.
Click the three dots at the bottom of the left rail to live-swap between
three example palettes (Glacier / Sunset / Mono) and watch every page,
component and icon re-color at once.

## How theming works
Everything visual lives in `theme.css`, inside the `:root { ... }` block at
the top:

- **Colors** — `--color-primary`, `--color-accent`, `--color-alert`, plus
  neutral tones. Change a hex value and every button, tag, bar, and icon
  that references it updates everywhere, on all 6 pages.
- **Fonts** — `--font-display` (headings, big numbers) and `--font-body`
  (everything else). Swap the font-family stack and the whole site follows.
  Both League Spartan and Inter are loaded from Google Fonts in each page's
  `<head>`; add another `<link>` there if you swap to a different typeface.
- **Icons** — every icon is an inline SVG with `stroke="currentColor"`, so it
  always matches the text color of whatever container it's in — no separate
  icon-color variable to maintain, and no icon font/sprite sheet to swap out.
- **Shape** — `--radius-sm/md/lg` and the `--space-*` scale control corner
  rounding and spacing rhythm site-wide.

To try a full alternate look without touching a single page, duplicate one of
the `html[data-theme="…"] { ... }` blocks near the top of `theme.css`,
override whichever variables you want, and add a matching swatch button in
each page's `.theme-switch__row` (or just set
`document.documentElement.dataset.theme = "yourtheme"` in the console).

## Files
```
index.html        Dashboard
grammar.html      Grammar lesson list
vocabulary.html   Vocabulary topics + flashcard
quiz.html         Quiz question flow
progress.html     Weekly activity + level progress
notes.html        Personal notes
theme.css         All design tokens + component styles (edit this to reskin)
theme-switch.js   Powers the live palette switcher in the rail
assets/logo.svg   Standalone swan logo asset
```

## Design notes
- Palette: Glacier Blue (#7fb8cc) as the calm primary chrome color, Bright
  Orange (#e8792e) reserved for calls-to-action and highlights, Flag Red
  (#c8102e) reserved for alerts/errors only, so it never gets diluted.
- Type: League Spartan for headings and big stats (confident, geometric),
  Inter for body and UI text (neutral, highly legible at small sizes).
- Layout: fixed left rail for navigation + the theme switcher, content
  left-aligned in the main pane rather than centered, so it reads like a
  working product rather than a landing page.
- Cards use a hairline border ("sheet") rather than drop shadows, to keep the
  surface calm and let color/type carry the personality instead.
