# AVENIR — Brand System Reference

> The visual and verbal identity of Avenir. Cinematic. Calm. Premium.
> Anti-feed, anti-flash, anti-growth-bro.

---

## The Visual Law

Before colors and fonts, the rules:

- **Cinematic.** Wide compositions, generous negative space, vignette-driven atmosphere, scanlines, subtle film grain on Billboard. Every screen should feel like it could be a still from a tech documentary.
- **Calm.** Monochrome base, restrained accents, low-contrast micro-labels. No bright primaries except where the system demands it (Billboard's broadcast orange on the LIVE state and primary CTA — and even then, sparingly).
- **Futuristic but restrained.** Monospace labels, telemetry-style readouts, frame/console motifs. Inspired by broadcast control rooms and terminals — not sci-fi neon.
- **Premium.** Glass morphism (transparent surfaces with blurred backdrops + gradient borders + left-edge accent spines), generous padding, careful typography hierarchy.

**Explicitly NOT:**
- Not TikTok-flashy. No autoplay-everywhere, no swipe-feeds, no jump-cut transitions.
- Not overstimulating. No badge counts, no notification dots screaming, no rainbow gradients.
- Not growth-bro. No "🚀 Launch Day 🔥", no rocket emojis, no upvote counts, no growth-hack copy ("10x your reach!"), no exclamation-mark CTAs.
- Not minimal-for-minimal's-sake. There is craft and detail — just calm craft.

If a design choice would look at home on Product Hunt or a SaaS landing template, it is wrong.

---

## The Four Color Themes

Each system on Avenir has its own theme color. The base palette (deep monochrome) stays constant; the accent changes per system.

### Base palette (shared)

```
--bg-base         #07090D    page background (near-black, slight blue cast)
--bg-elevated     #0B0E12    panels and cards
--bg-surface      #0F1218    sub-surfaces
--glass-bg        rgba(255,255,255,0.04)   glass panel base
--glass-border    rgba(255,255,255,0.08)   glass panel border
--text-primary    #E6EAF2    main text
--text-secondary  #8F96A3    secondary text
--text-dim        rgba(230,234,242,0.5)    dim text
--text-muted      #555B69    muted text
```

### 1. Sentinel — Chrome / Mono (Home + Sentinel character + Frame system)

```
--frame-accent          #D0D4DC    silver / chrome accent
--frame-text-bright     #F0F2F5
--text-bright           #FFFFFF
--text-silver           #C8CCD4
```

Used on: the prehome gateway, the AVENIR wordmark hero, the Frame chrome (Navbar, CommandSidebar, Terminal), the home page when no system mode is active. This is the "neutral house" theme. Particles, scanlines, and glow effects use silver tones.

### 2. Pulse + Markets — Plasma Violet

```
--accent          #8B5CF6    plasma violet
--accent-hover    #A78BFA    lighter violet
--accent-glow     rgba(139,92,246,0.5)
--accent-soft     rgba(139,92,246,0.15)
--accent-subtle   rgba(139,92,246,0.08)
```

Used on: Pulse cards, Pulse spotlight, Markets cards, Markets steward chrome, terminal cursor when in pulse/markets mode, primary CTAs on those surfaces. This is the "discovery + community" accent — distinct from Picks (gold = editorial) and Billboard (orange = broadcast).

### 3. Picks — Editorial Gold

```
--picks-accent    #E2C067    warm gold (legacy AVENIR amber)
--picks-hover     #F0D080
```

Used on: Pick cards, score bars, editorial spines, the PICK badge that attaches to a product anywhere on the platform, terminal cursor when in picks mode. Gold means editorial — chosen, written-up, scored. Gold appears nowhere else in the system; it is the "we wrote about this" signal.

### 4. Billboard — Broadcast Orange (a.k.a. cinematic red-orange)

```
--bb-primary       #E85D3A    broadcast orange (the main Billboard accent)
--bb-secondary     #F0A868    warm amber-orange
--bb-ember         #FF6B47    hot ember (hover state)
--bb-red-depth     #C23B22    deeper red (used in slot-counter gradients)
--bb-gold          #F5C54E    gold (used very rarely, for premium accents)
--bb-glow          rgba(232,93,58,0.5)
--bb-void          #020304    Billboard background (deeper than core)
--bb-base          #060809
--bb-surface       #0d1014
```

Used on: anything Billboard. ON AIR pulse dot uses red `#ef4444` specifically. Note: the platform shorthand sometimes calls this "Billboard red" — the exact token is `#E85D3A`, an orange-red. The full Billboard surface uses a darker base (`#020304`) than the rest of Avenir.

**Billboard color discipline (important):** Orange is used *sparingly* in the Pitch-Black Premium system. It appears on the LIVE badge, the primary CTA, and slot-counter fills. Everything else (labels, readouts, card chrome) is monochrome. Restraint is the look.

### Status colors (shared)
```
--success  #22c55e    green
--error    #ef4444    red (also: ON AIR pulse)
--warning  #f59e0b    amber
```

---

## Typography

Three fonts. Hard rules.

### `Sora` — `var(--font-sora)`
**Used for:** all headings (`heading-xl`, `heading-lg`, `heading-md`), micro-labels (`.micro-label`), all UI button text, navigation labels. Tracking is tight (`letter-spacing: -0.01em` to `-0.02em`) on large headings; loose (`letter-spacing: 0.08em-0.22em`, uppercase) on micro-labels.

### `Manrope` — `var(--font-manrope)`
**Used for:** body copy, descriptions, paragraph text on editorial surfaces, subtitle text. Reading-comfortable, neutral, no character. Sora has the personality; Manrope is the substrate.

### `JetBrains Mono` — `'JetBrains Mono', 'Fira Code', monospace`
**Used for:** terminal output, all telemetry readouts (`.bb-readout-value`, `.bb-readout-label`), all Billboard labels and CTAs (Billboard's CTA buttons are monospace by design), micro-tags on cards, the Sentinel terminal interface, mono "broadcast" labels (`SEASON · 02 · BROADCASTING`), price counters, slot remaining displays. JetBrains Mono = "this is a system speaking." Never use it for body copy.

### Hierarchy rules
- Headlines: Sora, 700 weight, tight tracking, often paired with a violet/orange gradient text-fill on hero sections.
- Section labels (top of a section): JetBrains Mono, 10–11px, uppercase, letter-spacing 0.18–0.22em, low-opacity chrome or accent color.
- Body: Manrope, 13–16px, line-height ~1.6, secondary or dim color (never pure white for long blocks).
- Buttons + CTAs in body areas: Sora. Buttons in Billboard / terminal contexts: JetBrains Mono.

---

## The Sentinel — Character & Voice

The Sentinel is Avenir's in-product assistant character. It lives in the Terminal (desktop) and is the voice of the platform.

### Identity (canon)
- Name: **The Sentinel.**
- Self-description: *"I am the Sentinel. I know AVENIR. I do not know whatever that is, and I have no intention of learning."*
- Role: guides founders through Avenir's systems. Answers questions about Pulse, Picks, Markets, Billboard, dashboards, submission flow, payment flow, philosophy.
- Domain: **strictly Avenir.** It refuses everything else — sarcastically.

### Tone
- **Dry. Confident. Slightly sarcastic when off-topic.**
- Never apologizes. Never says "I'm sorry I can't help with that" — it says "Outside my jurisdiction" or "I do AVENIR. The Pulse, The Picks, Billboard, Marketspace — choose your topic."
- On-topic, it is precise, direct, and informational. No filler. No "Great question!" energy.
- Refers to systems by their proper names: "The Pulse" (not "pulse"), "The Picks" (not "picks"), "Billboard" (not "the billboard"), "Marketspace" (not "markets" in copy).

### Sample voice (off-topic refusals)
- "I deal in infrastructure, not trivia. Ask me something about AVENIR."
- "That has zero relevance to curated product distribution. Zero."
- "I was built to know one thing deeply, not everything shallowly. That one thing is AVENIR."
- "I am not a general-purpose assistant. I am the Sentinel."

### Sample voice (on-topic answer)
- *"The Pulse is AVENIR's primary product discovery interface. A curated, searchable database of approved products displayed in a 3-card carousel. No algorithms, no upvotes — manual curation only. Every approved product gets permanent visibility."*

### The terminal prefix
The Sentinel speaks **inside the Terminal** — the desktop-bottom bar with JetBrains Mono text, a blinking accent-colored cursor, a status diamond, and command-style affordances.

While the platform uses `>` and `<` as carousel navigation commands and `exec.something==value` as filter commands, prompt input in marketing/social should evoke the same aesthetic:

- `>>> [Sentinel utterance]` — for the Sentinel speaking on social.
- Use the `>` glyph in chevron-style copy for forward-motion CTAs.
- Use monospace for any "command" or "telemetry" text in posts.

### When voicing the brand (vs. the Sentinel)
Avenir-as-platform speaks differently than the Sentinel-as-character:
- **Brand voice:** precise, calm, declarative. "A curated distribution layer for serious products." "Permanent visibility for the products you actually build."
- **Sentinel voice:** dry, slightly arch, refuses scope creep. Use the Sentinel when the post is *interactive* or *responsive*; use brand voice for *declarations.*

---

## Motion & Easing

Established conventions in code (use these in any animated content):

```
--ease-smooth     cubic-bezier(0.16, 1, 0.3, 1)    primary easing for almost everything
--duration-micro  200ms    button hovers, focus rings
--duration-panel  350ms    panel slides, modal opens
--duration-page   500ms    page transitions
```

Patterns:
- **Card hover:** `translateY(-2px to -4px)` + soft glow shadow. Never scale.
- **Brand reveal (hero entrances):** opacity + slight Y translation, 700–1200ms, delays staggered 100–300ms.
- **Billboard ON AIR dot:** pulse animation, 2s cycle.
- **Billboard player border:** slow conic-gradient spin (8s linear).
- **Ticker (Billboard):** linear scroll, 30–60s loop.
- **Scan lines + film grain on Billboard:** subtle steps animations, never enough to be distracting.
- **Reduced motion respected** everywhere — all animations disabled under `prefers-reduced-motion`.

Motion is used to evoke a *broadcast control room*. Not a game UI. Not a delight-moment library. It is restrained, slow, atmospheric.

---

## Logo & Mark Usage

- **AVENIR wordmark:** Sora 700, hero size, letter-spacing 0.22–0.25em. The wide tracking is the signature.
- On the prehome gateway: massive, centered, with `text-shadow: 0 0 120px rgba(208,212,220,0.08)` for soft halo.
- The logomark exists at `/assets/Logo-removebg-preview.png` and is used at small sizes (mobile entry, favicon).

### Per-system mark conventions
- **Pulse:** wordmark + violet underline accent.
- **Picks:** wordmark + gold spine. The PICK badge is a small gold pill that attaches to products.
- **Markets:** wordmark + violet (same family as Pulse — they share a theme).
- **Billboard:** "BILLBOARD" set in Sora bold with a station-ID style mono label below (e.g. `BILLBOARD · SEASON 02`) — orange dot prefix, JetBrains Mono, uppercase, letterspacing 0.22em. This is the broadcast call-sign treatment and is canonical for Billboard headers.

### Avoid
- Logo on bright backgrounds. Always on dark base.
- Logo with effects (drop-shadow at large size, outlines, stroke). The wordmark is meant to feel quiet and chromed.
- Mixing Picks gold and Pulse violet on the same surface unless it's intentional (the editorial card uses both because Picks are *about* products, which live in Pulse).
- Billboard orange anywhere outside Billboard surfaces. It's a system signal — not a brand color for Avenir as a whole.
