# Hejdansk — pixel-matched clone

An 11-page static clone of the real Hejdansk app, rebuilt from your
uploaded screenshots with colors sampled directly off the pixels
(navy `#1c4e79`, green `#1d9e75`, amber/gold rule boxes, red "needs
work" states, purple "multiple choice" tags).

## Open it
Open `index.html` in a browser — no build step needed.

## Pages
- `index.html` — Landing / marketing page
- `dashboard.html` — Readiness dashboard
- `plan.html` — 12-Week Pass Plan
- `chapters.html` — All Chapters grid
- `chapter-nouns.html` — Full chapter detail (Nouns and Articles) with
  RULE tables, mint "pronoun quirk" callouts, and QUICK CHECK boxes
- `practice-quiz.html` — 20-question practice quiz
- `mock-tests.html` — Mock Tests grid
- `mock-test-intro.html` — Section overview card
- `mock-test-modal.html` — Same page with the exercise-breakdown modal open
- `reading-active.html` — Split-view reading exercise, timer running
- `reading-results.html` — Scored results view

## Live customizer
Hover (or tap) the palette icon in the bottom-right corner on any page.
It opens a panel with:
- Color pickers for Navy / Green / Amber / Red / Purple — every button,
  tag, table header, and heading on the page is wired to these five
  CSS variables (plus tints derived automatically with `color-mix()`),
  so one change re-themes the whole page instantly.
- Font selects for the heading and body typefaces (League Spartan,
  Poppins, Space Grotesk, Fraunces, DM Sans for headings; Inter,
  Poppins, DM Sans, Source Sans Pro, System UI for body).
- A "Reset to default" button to snap back to the real Hejdansk look.

## Notes on fidelity
- Content (chapter text, quiz questions, mock-test list, dashboard
  numbers, plan tasks) is transcribed directly from your uploaded
  PDFs.
- The chapter page includes full detail for sections 1–4 (matching the
  RULE table / QUICK CHECK / EXAMPLES components you can see in the
  real screenshots) and condensed single-rule-box summaries for
  sections 5–15, ending with the full "What the Exam Actually Tests"
  section. Let me know if you'd like any of the condensed sections
  expanded to full detail.
- The landing page hero uses a CSS-drawn rooftop pattern as a stand-in
  for your product photo, since I didn't have the original image file
  to reuse.
- "Reading", "Writing", and "Speaking" nav items are left as inert
  links since no corresponding pages were included in your upload set.
