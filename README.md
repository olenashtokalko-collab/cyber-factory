# Cyber Factory — website

Four sections so far: the hero, "How it works", the benefits block
and the agents grid.

The current comp is Figma **`122:14876`** ("Website - new") in file
`UU2xRO2N9m9OUCuLvHjM8p`. It supersedes the earlier hero frame
`94:19741` and the agents frame `95:29873` for layout, type, buttons
and spacing. Node ids in the CSS comments point at it.

Its geometry, carried in `tokens.css`:

| | value | token |
| --- | --- | --- |
| page gutter | 120px, content 1200px | `--cf-page-gutter` |
| section padding | 170px block | `--cf-section-pad` |
| headline block | 620px measure, centred, ranged left | `--cf-hblock` |
| headline → content | 56px | `--cf-block-gap` |
| headline → subline | 24px | `--cf-head-gap` |
| section rule | 1px `rgba(193,168,117,.1)` on top | `--cf-section-line` |

`--cf-page-gutter` is applied by `.hero, .hiw, .bn, .ag` overriding
`--cf-gutter` for their own subtree, so `.cf-shell` widens on the
homepage while the header and the catalogue pages keep the 48px
gutter they were built to.

The type scale, all PP Mori:

| role | weight | size / line-height / tracking |
| --- | --- | --- |
| hero title | Regular 400 | 82 / 115.4% / -3% |
| section headline (`.cf-headline`) | Regular 400 | 54 / 116% / -2.8% |
| subline (`.cf-subline`) | Regular 400 | 20 / 135% (hero 150%), 70% white |
| item title (`.cf-item-title`) | ExtraLight 200 | 28 / 105% / -2% |
| item body (`.cf-item-body`) | Regular 400 | 15 / 160%, `#a3a3a3` |
| button (`.cf-cta`) | SemiBold 600 | 16 / 20px |

Two buttons, both on 2px corners with 16px padding all round and an
8px gap: `.cf-cta--solid` (`#ccae70` on `#0b0d10`) and
`.cf-cta--ghost` (`#181818`, 1px `rgba(204,174,112,.15)`, gold label).
The hero pairs them; "Browse all" is the ghost one.

Cards use `.cf-tile` — `#0c0c0c`, 1px `rgba(255,255,255,.1)`, 2px
corners. **Not `.cf-card`**: that name is already the catalogue card
in `home.css`, which is imported after `base.css` and carries a
`min-height: 292px`. Naming the new one `.cf-card` silently stretched
every benefit card by 93px.

From "How it works" down, every section opens with the same two-tone
headline — lead sentence in the foreground colour, the rest dropping
to `#8b8c89`. It is one component, `SectionHeadline`, styled by
`.cf-headline` in `base.css`; each section adds `is-in` when it
scrolls into view to trigger the reveal.

The lead sentence carries the hero's lit treatment: three stacked
copies of the text — an outer bloom, a contact shadow, and the solid
face. The frame specifies 60px and 10px shadows on 96px type, so
`.cf-lit` expresses them in `em` (`0.62em` / `0.104em`) and the same
effect carries to the 54px headlines without going heavy. The bloom
layer breathes on a 9s alternate loop.

Because the effect needs the text three times over, the headline
subtree is `aria-hidden` and the heading carries an explicit
`aria-label`, so it is announced as one clean sentence pair. The hero
`h1` does the same for "Cyber Factory".

Every section shares one vertical rhythm: `--cf-section-pad` (170px)
in `tokens.css`. New sections should use the token rather than their
own values.

The hero (`122:14877`) is **ranged left** on the 1200px measure, with
170px of clearance under the 72px header. It is no longer tied to the
viewport: the comp's 826px is 72 + 170 + content + 170, so padding
defines the height and that clearance holds at any window size
(`min-height: 640px` is only a floor for very short windows). The
comp's own bottom is 194px; 170 is used instead so the section keeps
the shared rhythm.

`home.css` still carries the legacy homepage's `.hero` rule, which
sets `flex-direction: column`. `hero.css` is imported after it and so
wins on every property it declares — but the old hero.css never
declared `flex-direction`, so column leaked through. It is now
declared explicitly as `row`.

Hero lockup, top to bottom:

- Title — *"Measurable cyber outcomes."* (white, lit) over *"One
  national system."* (`#8b8c89`). The lit sentence leads now; it used
  to be second. PP Mori Regular 82 / 94.6px / -3%.
- 32px, then the description — PP Mori Regular 20 / 150% at 70%
  white, on an 858px measure. Two lines at 1440, as in the comp.
- 56px, then the CTAs — filled *Launch* with a 20px Rocket, and ghost
  *Explore the repository* with no icon.

The right-edge scroll mark is gone: the comp does not carry one.

The warm core behind the type was measured off the comp's render — a
bloom peaking at about 24% alpha over a 352x375 footprint centred at
(731, 307), i.e. just above and across the title rather than washing
the whole section. `.hero__core` reproduces it with a four-stop ramp;
a seven-stop ramp traced the measured falloff more closely but banded
into visible rings, because 57 levels of alpha spread over 200px
quantises at roughly 3px per step.

The hero backdrop does **not** follow the earlier lamp frame. The frame's hanging
lamp was dropped, and the current backdrop is the agents section's dot
grid moved onto a canvas so it can answer the cursor — the way
mesh3d.gallery leads its hero.

`DotField.jsx` draws it. Same 20x17 grid as the agents section. Dots
rest at 0.65px / 7% alpha and, within 190px of the pointer, grow to
2.1px and brighten to 92% on a smoothstep falloff; the pointer is
damped so the pool of light trails the cursor. Measured falloff, at
the cursor and outward: 228 / 194 / 114 / 52 / base alpha at 0 / 60 /
120 / 180 / 240px.

Both the hero and the agents section mount it. The pointer is tracked
on the window rather than on the canvas's own box: section content
sits above the field as a sibling, so events over a headline or a card
never reach it — before that fix the hero's whole centre was a dead
zone. Pointer movement inside the host also starts the loop, so the
field never waits on the observer to report visibility first.

The resting values were set against mesh3d's idle field, sampled off
its canvas: a core alpha of 36/255 on roughly 1px dots at ~23px
spacing. Copying that alpha read much brighter here — a 0.9px radius
covers ~3x the area and this grid is denser — so the dot is smaller
and fainter instead, landing at 16/255 in place of the 30–33 it
started at. Both ramps start from the resting values, so a lit dot
fades into the field rather than leaving an edge at the influence
boundary.

Two things keep it cheap. The whole static field is one prebuilt
`Path2D` filled in a single call, so only the ~500 dots near the
cursor are drawn individually. And with no hover — touch, or
`prefers-reduced-motion` — the field is painted once and no frame loop
is opened at all.

Entrance timings still come from the motion references: staged,
600–2000ms on `cubic-bezier(.16, 1, .3, 1)`, 150ms interaction
states, everything landing on the finished frame under
`prefers-reduced-motion`.

The previous aurora-column hero is kept in
`components/home/_variants/` while the direction is being decided.

## Header

Pinned — `position: fixed`, so it stays visible for the whole scroll.
Cosmoq's own header does not stick (it is `position: relative` and
scrolls away), so this part is not from the reference.

Because content now passes underneath, the bar needs a ground. The
frame has it flat on the hero, so the glass only fades in past the
first 24px of scroll (`.is-stuck`): `--cf-bg-glass` plus a 14px
backdrop blur and a hairline bottom border.

The search field takes the glass properties off the reference's nav
pill (`.framer-199y88y`), which is what makes content read through it:

| | reference | here |
| --- | --- | --- |
| backdrop blur | `8px` | `8px` |
| inset highlight | `inset -3px -2px 8px rgba(255,255,255,.07)` | same |
| fill | none | `rgba(255,255,255,.035)` |
| corner radius | `999px` | `2px` |

The pill carries no fill at all — on Cosmoq's aurora the blur alone
reads as glass. On near-black it would not, so a little tint stays so
the field still looks like an input. Corners keep the frame's 2px
rather than the reference's pill shape.

Note on `color-mix`: `color-mix(in srgb, X 62%, transparent)` resolved
to alpha 0 in this build, so the translucent grounds are explicit
per-theme `--cf-bg-glass` tokens instead.

## How it works

`122:19866`. Discover → Launch → Get results on three columns of
**310 / 500 / 310** with 40px gutters — 1200 at the comp width. The
middle bay is wider than its copy, which sits centred in it; the
other two range left. Above them the hairline path.

Copy is set from the comp: each step is an ExtraLight 28px title over
a 15/160% grey line.

The path is a hairline and nothing else. The weight people read in a
"thick" line is almost never the line — it is the halo around it, so
the vertical bloom is gone and the core carries no glow at all. Rail
and core are both 1px; the comp's own "rail (lit)" is a single 1px run
at 50% gold.

Markers follow Griffin: an 8px dot ringed by stacked `box-shadow`
spreads — a gap in the page colour, then a thin ring, then more page
colour — so no extra elements are needed and the rail passes cleanly
behind. The spreads are 2.5 / 3.5 / 7px, which puts the ring band at
13–15px against the comp's 14px. The step icons went with an earlier
change to this marker size; re-adding them means restoring an `icon`
field on `STEPS` and an `<Icon>` inside `.hiw__node`.

`SectionHeadline` takes `rest` as an array when the break between its
lines should be deliberate rather than wherever the measure falls —
this section breaks after "Discover,". `sub` takes an array for the
same reason.

**Marker positions are the comp's own, not derived from the columns.**
The comp places them at 8 / 489 / 952 on the 1200px measure, while the
step copy starts at 0 / 445 / 890 — so they drift +8 / +44 / +62 from
their own columns. That was checked twice: read off the nodes, then
measured again from the rendered PNG (124 / 607 / 1067 absolute, which
is the same three numbers). It is hand-nudged rather than systematic,
so it is carried literally as percentages (`--n1/--n2/--n3` =
0.667% / 40.75% / 79.333%) and holds its proportions at any width. If
the intent was one marker per column, set `--n*` to the column left
edges instead.

The rail starts on marker 1 and ends on marker 3 — there is nothing
after "Get results", so it does not carry on and imply one.
`.hiw__span` is positioned between those two and everything inside
measures against it, which makes the reveal a plain 0 to 100%.

The head takes 1050ms to marker 2, **holds there for a second**, then
1050ms to marker 3; each leg eases, the hold is linear. `hiw-run` and
`hiw-reveal` share those keyframe stops so the trail tracks the head
exactly, and the markers ignite on arrival (520 / 1570 / 3620ms) with
their copy following ~150ms later. A slow pulse every 9s keeps the
finished line alive. The hold sits at 50.95% of the span, which is
where marker 2 falls between markers 1 and 3 — not 50%.

The run is latched: it plays once, not on every scroll-by. There are
no step numbers and no background gridlines.

Below 880px the rail becomes a vertical timeline — the only way a
three-stop diagram stays legible on a phone.

## Benefits

`122:19892`. The client's four points on a **2x2 grid of hairline
cards**, 24px apart — it used to be four columns split by rules. Each
card is 24px padded with a uniform 20px rhythm inside: a 32px accent
mark, the ExtraLight lead, the grey supporting line. That comes to
199px tall against the comp's 197.

Headline and subline are the comp's, replacing the written stand-in
that was here before:

> **Why it matters.** Build once. Protect many. Improve always.
>
> Four things change when every agent your team uses runs in one
> place.

Two things about that headline. It wraps to three lines on the 620px
measure, and Chrome sets *"Why it matters. Build once."* about 6px
wider than Figma does — at 620 the line broke a word early, so
`--cf-hblock` is **640px**. That shifts the block 10px left of the
comp's x and is invisible. And `text-wrap: balance` was removed from
`.cf-headline`: the comp's breaks come from the measure, and balancing
moves them.

The mark is `ShieldCheck` at 32px with `strokeWidth={1.6}`, which
renders at the comp's 2.133 visual stroke (1.6 x 32/24). **All four
cards carry the same mark**, as the comp does — worth a look, since
four identical icons for four different points may have been a
placeholder.

The reveal is quieter than the timeline above it: the headline
resolves out of blur, then the cards arrive 90ms apart. 2x2 becomes a
single column below 760px.

## Agents

`122:19921`. **Three** hairline cards 16px apart — it used to be four
full-bleed cells with dividers, after armory.framer.ai. The comp's own
row overflows (3 x 400 + 32 = 1232 in a 1200 frame), so the cards are
three equal columns of the measure instead: 389px at 1440.

Card, per `122:19926`: 24px padding, a 352x199 illustration plate,
40px, then the name (ExtraLight 28) and its one-liner (15/160%) 12px
apart. No category tag and no per-card Launch button — the comp drops
both. `.cf-cta--ghost` "Browse all" sits 56px below the row, centred,
with a 20px arrow.

The plate carries the dot grid at the comp's **21px** step in
`#36312b`, which on `#0c0c0c` is `rgba(234,204,160,.19)`. Full bleed
across the plate, not inset. It is a CSS radial gradient rather than
the comp's tiled ellipses, which costs nothing and stays crisp.
Static: a card plate has nothing to react to, so there is no canvas
and no frame loop. The section background is plain — no dot field and
no ambient motion.

The illustration is 55.1% of the plate width, which is the comp's
194 of 352.

**Illustrations are vector, not a raster export.** `IsoArt` carries
the twelve motifs as SVG, so the cards render from that: crisp at any
density, no crop offsets to maintain and nothing tied to an export URL
that expires.

### Content — the three cards, and one thing to decide

Cards render from `data/catalog.js`, keyed by three `SLUGS` in
`Agents.jsx`, so the homepage and `/catalog` can never disagree about
what an agent is called or does.

**The comp names two of them differently.** It shows *Arabify*,
*"Brand Guard"* and *"Policy Review"*; the catalogue has `arabify`,
`brand-protection` (**Brand Protection**) and
`security-policy-drafter` (**Security Policy Drafter**). The comp's
descriptions match those two agents closely, so they read as the same
products under new names rather than new products.

The catalogue names are used, because a homepage card and its own
detail page disagreeing on the product name is a real defect and
because renaming products is not a layout change. **If the comp's
names are the intended rename, change them in `data/catalog.js` and
they will follow everywhere.** The comp's longer descriptions would
belong in the same place, as those agents' `tagline`.

One consequence: the catalogue taglines are one or two lines where the
comp's are three, so the cards come out 368px tall against the comp's
400. The height is content-driven, not fixed.

## Running it

Node is **not** installed system-wide on this machine. A userland copy was
installed at `~/.local/node` (nothing was written outside your home folder,
and removing that one directory undoes it completely).

Start the dev server:

```bash
PATH="$HOME/.local/node/bin:$PATH" npm run dev
```

Then open http://localhost:5173

Production build:

```bash
PATH="$HOME/.local/node/bin:$PATH" npm run build
```

To make `node` available without the prefix, add this to `~/.zshrc`:

```bash
export PATH="$HOME/.local/node/bin:$PATH"
```

## Why the project was rebuilt from source

The folder contained only build output — a minified `index.js`, a compiled
`index.css`, and an `index.html` pointing at an `/assets/` directory that was
not present. There was no source tree, no `package.json`, and no sourcemap,
so the original components could not be edited or reused. Those files are
kept untouched in `legacy/` for reference.

The stack matches what the old bundle was built with: Vite + React +
React Router, with lucide-react for icons.

## Fonts

PP Mori and Neue Montreal are licensed retail faces (Pangram Pangram).
`public/fonts/` holds the four weights the design uses, copied from
this machine's own font library for local development —
**replace them with a licensed webfont kit before deploying
anywhere public.**

## Structure

```
src/
  styles/
    tokens.css        design tokens taken from the Figma file
    base.css          resets, type utilities, the shared headline
                      block, .cf-cta buttons, .cf-tile card, layout
    components.css    top bar, agent card, hairline grid, tabs, footer
    fonts.css         @font-face for PP Mori / Neue Montreal
    hero.css          the hero and its motion
    how.css           the How it works timeline and its run
    benefits.css      the benefits block
    agents.css        the agents grid
    home.css          the not-yet-mounted section components
    pages.css         catalog, agent detail, launched agent
  data/catalog.js     agents, categories, use cases
  components/
    SectionHeadline.jsx  the 620px headline block: lit lead, dim
                      rest, optional subline; `rest`/`sub` take
                      arrays for deliberate line breaks
    TopBar.jsx        logo, search with suggestions, tools, theme toggle
    IsoArt.jsx        isometric line illustrations (shared slab + motif)
    AgentCard.jsx     catalog card
    Reveal.jsx        reveal-on-scroll wrapper
    home/
      Hero.jsx        the live hero
      HowItWorks.jsx  the timeline section
      Benefits.jsx    the benefits block
      Agents.jsx      the agents grid
      ...             the other section components, not mounted yet
  pages/
    Home.jsx          renders the hero, How it works, Benefits, Agents
    Catalog.jsx       full catalogue with search, filters, saved view
    AgentDetail.jsx   agent page
    LaunchedAgent.jsx the launched-agent workspace
  lib/                theme, bookmarks, in-view helpers
```

## Design tokens

| Token | Value |
| --- | --- |
| Background | `#0c0c0c` |
| Surfaces | `#101010` · `#171614` · `#1d1d1d` |
| CTA gold | `#ccae70` |
| Line / mark gold | `#c1a875` |
| Light field | `rgba(234, 204, 160, …)` |
| Foreground | `#fafafa` |
| Muted | `#a3a3a3` |
| "Factory" | `#8b8c89` |
| Type | PP Mori · Neue Montreal (UI) |
| CTA / field / card corners | 2px |
| Subline / hero body | `rgba(255,255,255,.7)` |
| Card hairline | `rgba(255,255,255,.1)` |
| Section rule | `rgba(193,168,117,.1)` |
| Ghost button ground | `#181818` |
| Page gutter | 120px (48px in the header) |

A light theme is defined alongside the dark one so the existing theme
toggle keeps working; the dark palette is the approved direction.

## Assets

`public/hero/` holds the SVGs exported from the earlier frame. Only
the logo mark is still used: the CTA icons are now lucide `Rocket`
and `ArrowRight` (matching the comp's `Icon / Rocket` and
`Icon / ArrowRight` instances), and `mark-lines.svg` went with the
scroll mark. The lamp artwork was removed with the lamp; the header
icons use the identical lucide glyphs the frame names, via the
project's existing `lucide-react` dependency.

## Content

Section headlines, sublines, step copy and the four benefit points are
the comp's, verbatim — except `122:19907`, which reads *"Widert"* and
is set as **Wider**.

Agent names and one-line descriptions come from `data/catalog.js`; see
the note under **Agents** about the two the comp renames. Other agent
copy comes from the approved Figma screens and from strings already
present in the old build. Where the client has not
supplied final copy, the placeholder sentence that already appears in the
approved design is reused rather than inventing capabilities. No platform
metrics or claims were invented; the counters on the page are derived from
the catalogue itself.

The "In action" block is labelled **Example run** — it demonstrates the
interaction, not a measured result.

## Not covered

The admin console (`/console/*`) from the old build is out of scope for this
redesign, as is authentication. The portal here starts from the signed-in
state.
