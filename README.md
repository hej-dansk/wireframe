# Hej Dansk — brand-asset rebuild

An 11-page static site rebuilt around your real brand assets: the
glossy 3D swan logo, the wing-motif scene photos, the mascot sticker
set, and the official 5-color palette. The practice quiz and reading
exercise now do real answer-checking with mascot feedback, and the
whole thing is meant to be clicked through, not just looked at.

**Layout update:** the landing page went through a real structural
redesign, not just a color/font swap — dramatic full-bleed photo hero,
an arched-photo testimonial carousel (with working prev/next + dots),
photo-and-navy-band feature cards, a photo-backed "student journey"
block, and photo-header pricing cards, all matching the Wix/Squarespace
reference videos. Dashboard, Chapters, Mock Tests, and the 12-Week Plan
were all switched from thin-border boxes to soft-shadow "floating"
cards with rounded colored badges, and Mock Tests cards now carry a
photo header too, matching pricing.

**Nav + hero + chapter redesign (latest pass):**
- **Nav** switched from a solid navy bar to a light, modern minimal
  style used site-wide — white background, subtle shadow, navy text
  links with a soft active-state pill, cleaner logout button.
- **Landing hero** is now a true split layout (text on a clean Ice
  background, left; full-bleed vivid photo, right) instead of text
  overlaid on a dimmed photo — the photo is a full, undimmed banner
  now, with the upload/reset controls tucked into a small gradient
  strip at its foot instead of washing out the whole image.
- **Chapter page** (`chapter-nouns.html`) opens with a new magazine-style
  lesson hero — "IN THIS LESSON" kicker, a large headline, a bulleted
  cheat-sheet of the chapter's key rules, and a full vivid photo
  alongside — modeled directly on the reference layout you shared. The
  detailed RULE tables, QUICK CHECKs, and full TOC still follow below
  it for anyone who wants the deep-dive version.

## Open it
Open `index.html` in a browser — no build step needed.

## Colors (official palette)
```
--nordicnavy: #0f2d46   Nordic Navy   — header, headings, big numbers
--skyblue:    #3cb5e9   Sky Blue      — buttons, links, correct/positive state
--lightblue:  #7ed1f3   Light Blue    — secondary highlights, "in progress"
--ice:        #eaf6fc   Ice           — page background
--sand:       #f5f2ec   Sand          — warm card background (mascot cards)
```
A supporting red (`#d62839`, matching the "Incorrect" sticker) is used
only for wrong-answer feedback — it isn't one of your 5 named colors,
but a UI needs *some* red for that state, so I pulled it straight from
the sticker rather than inventing a new one.

## Fonts
**Baloo 2** for headings — the rounded, playful weight that matches the
mascot stickers and the Wix prototype's display type. **Inter** stays
for body copy. Both are swappable in the live customizer.

## Logo & assets (all in `assets/`)
- `logo-3d-swan.png` — the new glossy 3D swan mark, used in the nav and footer
- `scene-bikers.jpg`, `scene-buildings.jpg`, `scene-street.jpg` — your
  three wing-motif Copenhagen photos, compressed for web (~2MB → ~250KB
  each) and used as the landing page's default hero carousel
- `mascot-*.png` — the five swan mascot stickers (did-you-know, well-done,
  incorrect, try-again, conversation), cleaned up (see note below) and
  resized for web
- `logo-original-transparent.svg`, `logo-g_blue-bg.svg` (favicon),
  `logo-grey-transparent.svg`, `logo_full.svg` — kept from the earlier
  brand-guideline pass, still referenced for the favicon

**One fix worth knowing about:** three of your uploaded stickers
(Incorrect, Try Again, Conversation) had a checkerboard pattern baked
directly into the image pixels instead of real transparency — probably
flattened at some point in their export. I wrote a small script to
color-key that checkerboard back out and restore proper alpha
transparency; the other two (Did You Know, Well Done) already had
correct transparency and needed no fix.

## The quiz pages now actually grade you
Both `practice-quiz.html` (20 questions) and `reading-active.html` (the
8-question Sara reading passage) are wired to a real answer key — I
worked out every correct answer from the grammar chapter's own rules
(gender exceptions, plural declensions, genitive forms) and the reading
passage text, and baked them into each option as `data-correct`.

Click an answer and:
- **Correct** → the option fills Sky Blue with a checkmark, the card
  gets a blue glow, and the **Well done!** swan appears with a short note.
  The question locks — no changing your answer after you've got it right.
- **Wrong** → the option fills red with an ✕, the card gets a red glow,
  and the **Incorrect** swan appears with a "Try again" link that clears
  your pick so you can retry. It stays open until you get it right.
- **Progress counters are real**, not decorative — "N/M answered" only
  counts questions you've actually gotten correct, and the Submit button
  stays disabled until all of them are.
- **Get everything right** and a Sand-colored "Well done — all correct!"
  banner appears at the top with a final score.
- **↺ Reset** clears every question on the page in one click and pops a
  "Try Again!" mascot toast at the top of the screen.

This logic lives in `mascot-quiz.js`, separate from the older
`interactions.js` (which still handles the non-graded interactions
below).

## Everything from the earlier build, still here
- **Did you know? card** — added to the dashboard, using the mascot sticker
- **Conversation illustration** — added above the FAQ section on the landing page
- **Live customizer** (palette icon, bottom-right) — color pickers now
  labeled Nordic Navy / Sky Blue / Light Blue / Red, font selects default
  to Baloo 2 / Inter, synced across every page via `localStorage`
- **Chapter action toggles, plan checkboxes, pricing card selection,
  chapter tabs, button press states** — unchanged from before, all still
  interactive (`interactions.js`)
- **Hero cover-photo uploader** — same feature as before, just now ships
  with your 3 real photos as the default carousel instead of one stock
  photo. Upload your own 1–3 images to test other covers; Reset restores
  the 3 brand photos.

## Pages
`index.html` (landing), `dashboard.html`, `plan.html`, `chapters.html`,
`chapter-nouns.html` (full chapter detail — not yet re-graded, see below),
`practice-quiz.html` (20 graded questions), `mock-tests.html`,
`mock-test-intro.html`, `mock-test-modal.html`, `reading-active.html`
(8 graded questions), `reading-results.html`.

## Honest scope note
`chapter-nouns.html`'s inline "QUICK CHECK" boxes still use the older
decorative click-to-select behavior (no right/wrong checking) — I know
the correct answers for those too, but wiring them up would mean
rebuilding that whole 27KB page from scratch, which I scoped out of
this pass to focus on the two real quiz experiences. Say the word if
you'd like those graded the same way.

## Hosting on GitHub Pages
Unchanged from before — push the folder as-is, enable Pages in
**Settings → Pages**, done. The included `.nojekyll` file skips Jekyll's
build step, every link is relative so it works at any subpath, and
`localStorage` sync (customizer + hero photos) is fully reliable once
served over `https://` from one real origin.
