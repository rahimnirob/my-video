# BILLBOARD — Remotion Reference Spec

> Frame-accurate reproduction spec of the live Billboard broadcast surface
> at `avenirreym.com/billboard`. For the video production team building
> Remotion compositions.
>
> Every value in this document is taken directly from the production source.
> If a hex / px / ms / easing differs from what's here, **trust this doc.**

---

## 0. Global Constants

These appear in every Billboard composition. Memorize.

### Background base color (the "void")
- `#020304` — Pitch-Black void. Floor color behind everything.
- `#060809` — `bb-base`, used in the broadcast ticker bar background.
- `#050608` — used as inner background for the player and ticker copy fade gradient.
- `#080a0d` — used inside the cinema-card radial gradient on tier cards.

### Accent palette (Billboard signature)
- `#E85D3A` — `--bb-primary` — Broadcast Orange. The only color used for live state, primary CTA, accent bars.
- `#F0A868` — `--bb-secondary` — Warm amber-orange. Progress bar tail, hot ember on hover.
- `#FF6B47` — `--bb-ember` — Hot ember (button hover).
- `#C23B22` — `--bb-red-depth` — Deeper red used in slot-counter gradients.
- `#F5C54E` — `--bb-gold` — Gold (rare, premium accent only).
- `#ef4444` — Pure red — used ONLY for the `bb-on-air` pulse dot (canonical "live" red).

### Text scale (Billboard-specific)
- `#F0F2F4` — `--bb-text-hi` — bright text on cards / telemetry values.
- `#8A95A5` — `--bb-text-md` — secondary text.
- `#3E4650` — `--bb-text-lo` — labels, low-priority mono text.
- `#1E2530` — `--bb-text-dim` — dimmest mono text.
- `#E6EAF2` — `--text-primary` — global bright text (when not on a `bb-` element).
- `#8F96A3` — `--text-secondary` — global secondary text.

### Border tokens
- `#1a1f26` — `--bb-border` — default Billboard border.
- `#252c36` — `--bb-border-hi` — hover/highlighted border.

### Fonts
- **Sora** — `var(--font-sora), 'Sora', sans-serif` — all headings, button labels.
- **Manrope** — `var(--font-manrope), 'Manrope', sans-serif` — body copy on cards.
- **JetBrains Mono** — `'JetBrains Mono', 'Fira Code', monospace` — ALL Billboard labels, telemetry, CTAs, tickers, station IDs.

### Easing + duration
- `--ease-smooth: cubic-bezier(0.16, 1, 0.3, 1)` — primary easing for everything.
- Micro: `200ms` · Panel: `350ms` · Page: `500ms`.

---

## 1. The Two Background Images

The Billboard `/billboard` route uses **one** ambient background image (`Tech Aesthetic.jpeg`) and one giant text watermark ("Billboard") that act together as the depth layer. The pricing page `/billboard/apply` uses the same image with a different overlay treatment.

### Image 1 — Ambient background
- **Filename:** `/assets/Tech Aesthetic.jpeg` (file lives at `public/assets/Tech Aesthetic.jpeg`)
- **Layer:** absolutely positioned, fills the entire viewport (`inset: 0`)
- **CSS:** `object-fit: cover; object-position: center center;`
- **Filter:** `brightness(0.92) saturate(0.95)`
- **Opacity:** `0.6`
- **Enter animation:** opacity 0 → 1, `duration: 1600ms`, `ease: [0.16, 1, 0.3, 1]`
- **Z-index:** lowest content layer (sits above the page bg `#020304`, below everything else)

### Image 2 — "Billboard" watermark text (not raster, but functions as a background layer)
- **Element:** giant text `Billboard` (sentence-case, NOT all-caps despite `text-transform: uppercase` resolving the CSS — copy is the literal string "Billboard")
- **Font:** Sora, weight `800`
- **Size:** `clamp(44px, 13vw, 240px)`
- **Letter-spacing:** `0.08em`
- **Line-height:** `0.9`
- **Position:** absolute, centered (`flex items-center justify-center inset: 0`)
- **Transform:** `translateY(-2%)` (sits slightly above geometric center)
- **Fill:** gradient text-clip:
  ```css
  background: linear-gradient(180deg,
    rgba(240,242,244,0.36) 0%,
    rgba(240,242,244,0.18) 50%,
    rgba(232,93,58,0.22) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-stroke: 1px rgba(240,242,244,0.08);
  text-shadow: 0 0 140px rgba(232,93,58,0.18),
               0 0 60px rgba(240,242,244,0.06);
  ```
- **Enter animation:** opacity 0 → 1, `duration: 1400ms`, `delay: 200ms`, `ease: [0.16, 1, 0.3, 1]`. Only animates on after the user has "entered" the stage (loading is complete).

### Sculpting gradient layers (sit BETWEEN image and content)
Two full-screen gradient overlays applied as siblings of the image, after the image, before the watermark. Both are absolutely positioned `inset: 0`, no animation.

**Vertical sculpt (top→bottom):**
```css
background: linear-gradient(180deg,
  rgba(2,3,4,0.55) 0%,
  rgba(2,3,4,0.08) 22%,
  rgba(2,3,4,0.04) 50%,
  rgba(2,3,4,0.45) 78%,
  rgba(2,3,4,0.9) 100%
);
```
This darkens the top edge (above the header) and the bottom edge (below the player), leaving the middle (where the player sits) brightest.

**Horizontal sculpt (left/right vignette):**
```css
background: linear-gradient(90deg,
  rgba(2,3,4,0.5) 0%,
  transparent 30%,
  transparent 70%,
  rgba(2,3,4,0.5) 100%
);
```
Side darkening — frames the centered player column.

**Top fade strip** (sits ABOVE the watermark, clears the header zone):
- Height: `14%` of viewport
- `inset: 0 0 auto 0` (top strip)
- ```css
  background: linear-gradient(180deg,
    rgba(2,3,4,0.5) 0%,
    transparent 100%
  );
  ```

### Layer order (bottom → top) on the Billboard stage

```
0. Body background:   #020304 (the void)
1. Image:             /assets/Tech Aesthetic.jpeg at opacity 0.6, brightness 0.92, saturate 0.95
2. Sculpting gradient: vertical (180deg, 5-stop)
3. Sculpting gradient: horizontal (90deg, 4-stop, vignette)
4. Watermark text:    "Billboard" — Sora 800, gradient-clipped, blurred shadow
5. Top fade strip:    14% height, top→transparent gradient
6. Side header chrome (BillboardSideHeader)
7. Apply orbit (BillboardApplyOrbit) — fixed bottom-right
8. Telemetry strip (BillboardTelemetryStrip) — above player
9. Player frame (BroadcastPlayer with bb-player-border)
10. Data strip (BillboardDataStrip) — below player
11. Bottom info strip
12. Broadcast ticker — bottom of stage (full width)
13. Modals / Season grid overlay (when triggered)
```

For Remotion: composite layers 0–5 as a static `<AbsoluteFill>` background; layers 6+ are independent overlay tracks.

---

## 2. The Player Frame

The player is a rounded `1280×height` (responsive) container with a **rotating conic-gradient border**, plus film-style atmosphere layers (vignette, optional scanlines + grain at the page level).

### Container
- **Class:** `relative w-full rounded-xl bb-player-border`
- **Width:** `max-w-5xl` (Tailwind = 1024px max)
- **Aspect ratio of the video area:** `aspect-video` (16:9) on small viewports, `aspect-[21/9]` on `lg:` (≥1024px). For Remotion, **use 21:9** at full resolution.
- **Background:** `rgba(5, 6, 8, 0.55)` with `backdrop-filter: blur(8px)`
- **Border radius:** `12px` (Tailwind `rounded-xl`)
- **Enter animation:** opacity 0→1 + `y: 16→0`, `duration: 700ms`, `ease: [0.16, 1, 0.3, 1]`

### Animated conic-gradient border (the "halo")

This is the signature look — a slow rotating orange conic-gradient halo around the player.

**Structure:** the player has two pseudo-children that draw the ring:

```html
<div class="bb-player-border">
  <div class="bb-border-glow">           <!-- main visible ring -->
    <div class="bb-border-spinner" />     <!-- rotating conic-gradient -->
    <div class="bb-border-mask" />        <!-- inner mask, hides interior -->
  </div>
  <div class="bb-border-outer">          <!-- soft outer bloom -->
    <div class="bb-border-spinner" />     <!-- same conic gradient, blurred -->
  </div>
  ...rest of player...
</div>
```

**CSS:**

```css
.bb-player-border {
  position: relative;
  isolation: isolate;
  overflow: visible !important;
}

.bb-player-border > .bb-border-glow {
  position: absolute;
  inset: -2px;
  border-radius: 14px;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

.bb-player-border > .bb-border-glow > .bb-border-spinner {
  position: absolute;
  inset: -50%;
  background: conic-gradient(
    from 0deg,
    transparent 0%,
    #E85D3A 8%,
    #F0A868 16%,
    #E85D3A 24%,
    transparent 36%,
    transparent 50%,
    rgba(232, 93, 58, 0.7) 58%,
    #F0A868 66%,
    rgba(232, 93, 58, 0.7) 74%,
    transparent 86%
  );
  animation: bbBorderSpin 8s linear infinite;
}

/* Inner mask — covers inside, leaving only the border ring visible */
.bb-player-border > .bb-border-glow > .bb-border-mask {
  position: absolute;
  inset: 2px;
  border-radius: 12px;
  background: rgba(5, 6, 8, 0.55);
  backdrop-filter: blur(8px);
}

/* Soft outer glow layer */
.bb-player-border > .bb-border-outer {
  position: absolute;
  inset: -6px;
  border-radius: 18px;
  overflow: hidden;
  pointer-events: none;
  z-index: -1;
  filter: blur(8px);
  opacity: 0.5;
}

.bb-player-border > .bb-border-outer > .bb-border-spinner {
  position: absolute;
  inset: -50%;
  background: conic-gradient(
    from 0deg,
    transparent 0%,
    rgba(232, 93, 58, 0.4) 10%,
    rgba(240, 168, 104, 0.3) 20%,
    transparent 35%,
    transparent 50%,
    rgba(232, 93, 58, 0.35) 60%,
    rgba(240, 168, 104, 0.3) 70%,
    transparent 85%
  );
  animation: bbBorderSpin 8s linear infinite;
}

@keyframes bbBorderSpin {
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
```

**Numbers for Remotion:**
- Rotation period: `8000ms`, linear, infinite, never pauses.
- Inner ring (`.bb-border-glow`): inset `-2px` outside the player, border-radius `14px`, mask at `2px` inset with radius `12px`.
- Outer bloom (`.bb-border-outer`): inset `-6px`, border-radius `18px`, blurred `8px`, opacity `0.5`. Conic gradient is the same shape but at lower opacity stops.
- The conic has two "arcs" with a gap, so it reads as two glowing arcs sweeping in tandem, not a solid ring.

### Cinema vignette (inside the video area)

A single radial gradient overlay sitting ON TOP of the video, BELOW the chrome:

```css
position: absolute;
inset: 0;
pointer-events: none;
z-index: 5;
background: radial-gradient(
  ellipse 70% 60% at 50% 50%,
  transparent 20%,
  rgba(5, 6, 8, 0.6) 100%
);
```

Result: center of the video at full brightness, edges fade to ~60% opacity of `#050608`.

### Background gradient bloom (inside video area, behind YouTube iframe)

Sits BELOW the iframe; creates a category-colored halo behind the video.

```css
position: absolute;
inset: 0;
background:
  radial-gradient(ellipse 50% 60% at 50% 45%, {catColor}12 0%, transparent 70%),
  radial-gradient(ellipse 80% 40% at 30% 80%, {catColor}08 0%, transparent 60%),
  radial-gradient(ellipse 60% 50% at 70% 20%, rgba(232, 93, 58, 0.04) 0%, transparent 60%),
  #050608;
transition: all 1000ms ease-out;
```

`{catColor}` is one of:
- AI: `#8b5cf6`
- DevTools: `#3b82f6`
- Productivity: `#22c55e`
- Security: `#ef4444`
- Analytics: `#f59e0b`
- Design: `#ec4899`
- (fallback) `#E85D3A`

`{catColor}12` and `{catColor}08` are the catColor at hex alpha `12` (~7%) and `08` (~3%).

### YouTube iframe dimming
- The actual video iframe sits at `z-index: 3`.
- While the video is playing: `opacity: 0.55` (cinematic dim — the vignette, gradients, and chrome read more strongly).
- While buffering / loading / error: `opacity: 1` (full brightness so loading UI stays legible).
- Transition: `transition: opacity 700ms`.

### Film grain (page-level, not per-player)

Applied to the body of any `.bb-film-grain` container. Disabled on mobile.

```css
.bb-film-grain::after {
  content: '';
  position: fixed;
  inset: 0;
  opacity: 0.035;
  background-image: url("data:image/svg+xml;<svg... fractalNoise baseFrequency='0.9' numOctaves='4' ...>");
  background-size: 200px 200px;
  animation: bbFilmGrain 0.5s steps(3) infinite;
  pointer-events: none;
  z-index: 2;
}

@keyframes bbFilmGrain {
  0%   { background-position: 0 0; }
  33%  { background-position: -20px -15px; }
  66%  { background-position: 15px -25px; }
  100% { background-position: 0 0; }
}
```

For Remotion: pre-bake a 200×200 fractal-noise PNG (SVG `feTurbulence baseFrequency='0.9' numOctaves='4'`), tile it across the frame at `opacity: 0.035`, and shift its position in 3 steps every `500ms` (0/0 → -20/-15 → 15/-25 → 0/0).

### Scanlines (page-level)

```css
.bb-scanline::before {
  content: '';
  position: fixed;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(255, 255, 255, 0.008) 2px,
    rgba(255, 255, 255, 0.008) 4px
  );
  pointer-events: none;
  z-index: 2;
}
```

2px transparent + 2px @ `rgba(255,255,255,0.008)` repeating horizontal stripes. **Extremely subtle** — almost imperceptible directly but adds the CRT feel.

---

## 3. The Telemetry Strip (above the player)

A horizontal pill that sits above the player and reports current broadcast state.

### Container

```css
.bb-telemetry-strip {
  display: inline-flex;
  align-items: center;
  gap: 16px;
  padding: 10px 18px;
  background: rgba(13, 16, 20, 0.88);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(232, 93, 58, 0.22);
  border-radius: 4px;
  box-shadow:
    0 4px 18px rgba(0, 0, 0, 0.5),
    0 0 18px rgba(232, 93, 58, 0.08);
  max-width: calc(100vw - 32px);
}
```

### Cells

Four cells separated by an orange diamond `◆`:

| Cell | Label | Value |
|---|---|---|
| 1 | `SEASON` | `02` (the season number, zero-padded) |
| 2 | `SLOTS` | `{filled}/{total}` (e.g. `0/30`) + mini bar |
| 3 | `STATUS` | `bb-on-air` pulse dot + `LIVE` or `STANDBY` |
| 4 | `ARC` | `30·DAY` (hardcoded) |

### Label + value typography

```css
.bb-telemetry-label {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 9px;
  letter-spacing: 0.18em;
  color: #3E4650;       /* bb-text-lo */
  font-weight: 600;
  text-transform: uppercase;
}

.bb-telemetry-value {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 12px;
  letter-spacing: 0.04em;
  color: #F0F2F4;       /* bb-text-hi */
  font-weight: 600;
}

.bb-telemetry-value-accent { color: #E85D3A; }   /* used on LIVE */

.bb-telemetry-divider {
  color: rgba(232, 93, 58, 0.30);
  font-size: 10px;
}
```

### Mini bar (10 segments inside the SLOTS cell)
- 10 segments, each `5px × 8px`, `gap: 2px`, `border-radius: 1px`.
- Empty segment: `background: rgba(255, 255, 255, 0.06)`.
- Filled segment:
  ```css
  background: linear-gradient(180deg, #E85D3A, #C23B22);
  box-shadow: 0 0 4px rgba(232, 93, 58, 0.4);
  ```
- Filled count = `round(filled / total × 10)`, clamped to 10.

### Cell layout
```css
.bb-telemetry-cell {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
```

### Mobile collapse (≤640px)
- Strip gap → `8px`, padding → `7px 11px`.
- Label font-size → `8px`, letter-spacing → `0.14em`.
- Value font-size → `10px`.
- Divider font-size → `8px`.
- Mini bar: hidden.

---

## 4. The Call-Sign Header (top-left)

The "station ID" pill sitting in the top-left corner of the stage.

### Container
- **Position:** `fixed; top: 20px; left: 20px;` on mobile, `top: 28px; left: 28px;` on `md:` (≥768px).
- **Z-index:** `40`.
- **Padding:** `8px 14px` (`px-3.5 py-2`).
- **Background:** `rgba(10, 12, 16, 0.65)` (idle) / `rgba(14, 17, 22, 0.78)` (hover).
- **Backdrop-filter:** `blur(14px)`.
- **Border:** `1px solid rgba(232, 93, 58, 0.20)` idle / `rgba(232, 93, 58, 0.42)` hover.
- **Border-radius:** `3px` (sharp, broadcast-style).
- **Box-shadow:**
  - Idle: `0 0 22px rgba(232, 93, 58, 0.08), 0 6px 22px rgba(0, 0, 0, 0.45)`.
  - Hover: `0 0 32px rgba(232, 93, 58, 0.20), 0 8px 28px rgba(0, 0, 0, 0.5)`.

### Contents (horizontal flex, `gap: 12px`)

```
[ ● ] [ ON AIR ] | [ AVENIR ] | [ S02 · 02.2026 ] [ ↩ ]
  ^ pulse  ^ mono     ^ wordmark    ^ mono             ^ return arrow
```

1. **ON AIR cluster** — `gap: 6px`:
   - Pulse dot: `6×6px` circle, `background: #E85D3A`, `box-shadow: 0 0 10px rgba(232,93,58,0.8)`, class `bb-on-air` (see §5).
   - Label `ON AIR`: JetBrains Mono `9px`, `letter-spacing: 0.22em`, `font-weight: 700`, `color: #E85D3A` (when active) / `rgba(240,242,244,0.45)` (standby), uppercase.

2. **Divider** — `1px × 14px` rect, `background: rgba(240, 242, 244, 0.18)`.

3. **AVENIR wordmark** — Sora `13px`, `font-weight: 700`, `letter-spacing: 0.22em`, uppercase, `color: rgba(240, 242, 244, 0.92)` idle / `rgba(255, 255, 255, 0.98)` hover, `text-shadow: 0 0 10px rgba(232, 93, 58, 0.10)`.

4. **Divider** — same `1px × 14px` rect at `rgba(240, 242, 244, 0.12)` (hidden below `sm:`).

5. **Frequency stamp** — JetBrains Mono `9px`, `letter-spacing: 0.18em`, `color: rgba(240, 242, 244, 0.55)`, `font-weight: 600`, uppercase. Format: `S{seasonNumber} · {seasonNumber}.{year}` → e.g. `S02 · 02.2026`. The `.` is literal.

6. **Return arrow** — JetBrains Mono `10px`, character `↩`, `color: rgba(232, 93, 58, 0.45)` idle / `#E85D3A` hover, `transform: translateX(2px)` on hover.

---

## 5. ON AIR Pulse Dot, Ticker, Slot-Counter

### ON AIR pulse dot

```css
.bb-on-air {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #ef4444;             /* NOTE: pure red, NOT bb-primary orange */
  animation: onAirPulse 2s ease-in-out infinite;
}

@keyframes onAirPulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.5); }
  50%      { box-shadow: 0 0 0 4px rgba(239, 68, 68, 0); }
}
```

**Key note:** the canonical `.bb-on-air` class uses pure red `#ef4444` for the dot fill, and an expanding box-shadow ring (`0 0 0 0 → 0 0 0 4px`) that fades to transparent.

In some compositions (e.g. the BillboardSideHeader and SeasonIntroOverlay) the dot's `background` is explicitly overridden to `#E85D3A` (Broadcast Orange) while keeping the `.bb-on-air` class for the pulse animation. **Honor whichever fill the parent component sets**:

| Surface | Dot fill | Ring (animated box-shadow) |
|---|---|---|
| Inside player chrome ("LIVE") | `#ef4444` (canonical) | red ring `rgba(239,68,68,*)` |
| Side header station ID | `#E85D3A` | red ring (animation untouched) |
| Telemetry strip STATUS | `#ef4444` (canonical, inherited) | red ring |
| Season intro overlay | `#E85D3A` | red ring |
| Data strip "Broadcast Feed" | `#E85D3A` | red ring (only when `hasActiveSeason`) |

For Remotion: render a small inner red dot, then animate a second outer ring that scales 0→4px while fading 0.5→0 opacity over 2s, ease-in-out, looping.

### The bottom broadcast ticker (page-level, full width)

Sits at the very bottom of the Billboard stage, **outside** the player.

```css
.bb-broadcast-ticker {
  display: flex;
  align-items: center;
  height: 26px;
  flex-shrink: 0;
  overflow: hidden;
  border-top: 1px solid #0d1014;     /* bb-surface */
  border-bottom: 1px solid #0d1014;
  background: rgba(13, 16, 20, 0.35);
  position: relative;
  width: 100%;
}

/* Edge fades (left + right) */
.bb-broadcast-ticker::before {
  content: '';
  position: absolute;
  inset: 0 auto 0 0;
  width: 60px;
  background: linear-gradient(90deg, #020304 0%, transparent 100%);
  z-index: 2;
}
.bb-broadcast-ticker::after {
  content: '';
  position: absolute;
  inset: 0 0 0 auto;
  width: 60px;
  background: linear-gradient(90deg, transparent 0%, #020304 100%);
  z-index: 2;
}

.bb-broadcast-ticker-track {
  display: flex;
  flex-wrap: nowrap;
  white-space: nowrap;
  animation: tickerCrawl 60s linear infinite;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 10px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #3E4650;                    /* bb-text-lo */
  line-height: 1;
}

.bb-broadcast-ticker-token strong {
  color: #E85D3A;
  font-weight: 600;
  margin: 0 4px;
}

@keyframes tickerCrawl {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
```

- **Speed:** `60s` linear loop (translateX 0 → -50% — content is rendered twice so the loop is seamless).
- **Height:** exactly `26px`.
- **Color:** label color `#3E4650`, accented tokens in `#E85D3A`.
- **Font size:** `10px`, mono, uppercase, `letter-spacing: 0.16em`.
- **Edge fade width:** `60px`, fades to `#020304`.
- **Hidden on mobile** (`max-width: 768px`).

### Player-internal ticker (lives INSIDE the player frame, at the bottom)

```css
.bb-ticker {
  overflow: hidden;
  position: relative;
}

.bb-ticker-content {
  display: flex;
  white-space: nowrap;
  animation: tickerCrawl 30s linear infinite;
}
```

- **Loop:** `30s` linear, infinite.
- **Background:** `#050608`.
- **Padding:** `6px 0`.
- **Border-top:** `1px solid rgba(255,255,255,0.04)`.
- **Border-bottom-radius:** `12px` (matches player corner).
- **Edge fades:** left/right `64px` strips fading to `#050608`.
- **Inside text rules:**
  - Font: JetBrains Mono `10px`, `letter-spacing: 0.08em`, uppercase.
  - Default color: `rgba(230, 234, 242, 0.25)`.
  - The product name (NOW BROADCASTING) is highlighted `#E85D3A`.
  - The next-up product name is highlighted `#F0A868`.
  - Token order: `● NOW BROADCASTING: {name}` — `#N of total` — `{seasonLabel}` — `NEXT UP: {nextName}` — `▌▌▌` (separator with `margin: 0 40px`).
  - Content is rendered TWICE (looped) so the animation is seamless.

### Slot-counter fills (used on bottom info strip and pricing surface)

```css
.bb-slot-counter {
  height: 2px;
  background: #14181f;
  border-radius: 1px;
  overflow: hidden;
  position: relative;
}

.bb-slot-counter-fill {
  height: 100%;
  background: linear-gradient(90deg, #C23B22, #E85D3A);   /* red-depth → primary */
  width: 0;
  border-radius: 1px;
  transition: width 1.2s cubic-bezier(0.22, 1, 0.36, 1);
  box-shadow: 0 0 12px rgba(232, 93, 58, 0.4);
}
```

- The fill animates from `width: 0%` to `width: {fillPercent}%` after a `400ms` mount delay.
- Easing: `cubic-bezier(0.22, 1, 0.36, 1)`, duration `1200ms`.
- The fill always has a soft orange glow.

---

## 6. Component Catalog

Every distinct element on the Billboard surface.

### 6.1 BillboardSideHeader (call-sign)
Top-left fixed pill. See §4 for full spec.
- Dimensions: auto-width, `~36px` tall.
- Colors: orange accent on red-pulse + AVENIR wordmark white.
- Motion: hover lifts border opacity + glow brightness; return arrow translates `2px` right.

### 6.2 BillboardApplyOrbit (CTA button — fixed bottom-right)
A circular CTA with rotating "Reserve · Broadcast · Slot ·" text orbiting an orange arrow button.

- **Position:** `fixed right: 16px bottom: 80px` (mobile), `right: 28px bottom: 112px` (md+).
- **Outer size:** `84×84px` (mobile), `116×116px` (desktop).
- **Z-index:** `40`.
- **Radial glow halo:**
  ```css
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: radial-gradient(circle at center,
    rgba(232,93,58,0.30) 0%,
    rgba(232,93,58,0.10) 45%,
    transparent 75%);
  filter: blur(8px);
  opacity: 0.7 (idle) / 1.0 (hover);
  ```
- **Orbiting text** (SVG `<textPath>` along a circle):
  - Font: JetBrains Mono `9px`, `letter-spacing: 0.32em`, weight `700`, uppercase.
  - Fill: `rgba(240,242,244,0.78)` idle / `rgba(255,255,255,0.95)` hover.
  - Path: circle `r=48`, center `(58,58)`.
  - Text: literal string `Reserve · Broadcast · Slot · Reserve · Broadcast · Slot ·`.
  - Animation: `bb-orbit-spin 18s linear infinite` (`transform: rotate(0deg → 360deg)`).
- **Static ring** (inset rule): `1px solid rgba(232,93,58,0.30)` idle / `rgba(232,93,58,0.55)` hover, inset by `16px` (mobile) or `22px` (desktop).
- **Inner button:**
  - Size: `40×40px` (mobile), `56×56px` (desktop).
  - Background: `linear-gradient(135deg, #E85D3A 0%, #C7472B 100%)` idle / `linear-gradient(135deg, #F0A868 0%, #E85D3A 100%)` hover.
  - Box-shadow: `0 0 22px rgba(232,93,58,0.35), inset 0 1px 0 rgba(255,255,255,0.18)` idle / `0 0 32px rgba(232,93,58,0.55), inset 0 1px 0 rgba(255,255,255,0.25)` hover.
  - Icon: `ArrowUpRight` (Lucide), white, stroke-width `2.4`, size `16px` (mobile) / `22px` (desktop), translates `(+1px, -1px)` on hover.
- **Overall hover:** entire orbit scales `1.06`, easing `cubic-bezier(0.16,1,0.3,1)`, `350ms`.

### 6.3 BillboardTelemetryStrip
Above the player. See §3.

### 6.4 BroadcastPlayer
Center stage. See §2 + verbatim JSX in §7.

Major sub-elements:
- **Animated conic-border** (`.bb-player-border` + 4 inner divs).
- **Video area** — 21:9 on desktop, 16:9 on mobile, `border-radius: 12px 12px 0 0`.
- **Category bloom** — 3-stop radial gradient at category color (mostly hidden by vignette).
- **YouTube iframe** at `opacity: 0.55` when playing.
- **Cinema vignette** — radial ellipse `70% × 60%` at `50% 50%`, transparent center → `rgba(5,6,8,0.6)`.
- **Broadcast overlay bar (top of video)** — gradient `rgba(5,6,8,0.7) → transparent`, contains ON AIR pulse + LIVE/PAUSED label + slot position + mute/pause/keyboard buttons.
- **Product info card (bottom-left of video)** — `rgba(5,6,8,0.7)` background, `1px solid rgba(255,255,255,0.06)` border, `border-radius: 8px`, `12px 16px` padding. Contains orange dot + `NOW BROADCASTING` label + tier badge + product name (Sora bold) + one-liner (Manrope, `#8F96A3`).
- **Progress bar** — `3px` tall, `rgba(255,255,255,0.04)` track, fill `linear-gradient(90deg, #E85D3A, #F0A868)`, `box-shadow: 0 2px 8px rgba(232,93,58,0.3)`, tail dot `2×2px` `#F0A868` with `0 0 8px` glow.
- **Controls bar** — `#030405` background, `1px` top border `rgba(255,255,255,0.04)`, contains product name, one-liner, prev / WATCH FULL (orange `#E85D3A`) / next.
- **Ticker** — see §5 (player-internal `bb-ticker`).
- **Transition card** (between videos, `2000ms` total): full-cover `rgba(5,6,8,0.92)`, centered `NEXT` mono label + product name (Sora 24-30px) + category (mono).
- **Keyboard help overlay** (`?` key) — full-cover `rgba(5,6,8,0.9)`, mono shortcut list.

### 6.5 BillboardDataStrip (below the player)
Wide horizontal strip carrying redundant telemetry + "View Season Grid" button.

- Width: `max-w-5xl` (same as player).
- Padding: `10px 16px` (`px-4 py-2.5`).
- Background: `rgba(8, 10, 13, 0.5)`, `backdrop-filter: blur(10px)`.
- Border: `1px solid rgba(232, 93, 58, 0.15)`, border-radius `3px`.
- Contents (left → right, separated by orange `◆` diamonds at `7px` size, `rgba(232,93,58,0.4)`):
  - `● Broadcast Feed` — pulse dot `5×5px` + mono label.
  - `S02 · {month}` — mono `10px`, `letter-spacing: 0.14em`, `color: #F0F2F4`.
  - `Live  {filled} / {total}` — mono cluster, filled value in orange, slash + total dimmed.
  - `Open  {remaining}` — visible at `lg:` only.
- Right: `View Season Grid →` button — mono `10px`, `letter-spacing: 0.18em`, uppercase, `padding: 4px 10px`, border `1px solid rgba(232,93,58,0.25)`, background `rgba(232,93,58,0.04)`. Hover lifts color to `#E85D3A`, border to `0.55`, bg to `0.10`.

### 6.6 BillboardStageBackground
Page-level background composition. See §1.

### 6.7 BillboardOrbs (optional, currently NOT in the active stage render but exists)
6 large radial blobs that float around the background. Use only if requested.

```
Orb 1: 720×720, top -10%, left -8%, rgba(232,93,58,0.18), float-a 22s
Orb 2: 620×620, top 25%, right -12%, rgba(194,59,34,0.14), float-b 28s, -6s delay
Orb 3: 820×820, bottom -18%, left 28%, rgba(232,93,58,0.10), float-c 32s, -10s delay
Orb 4: 520×520, top 58%, left -10%, rgba(255,107,71,0.08), float-a 26s, -14s delay
Orb 5: 540×540, top 8%, left 42%, rgba(232,93,58,0.06), float-b 30s, -4s delay
Orb 6: 460×460, bottom 12%, right 18%, rgba(194,59,34,0.09), float-c 24s, -18s delay
```

All orbs share:
- `position: absolute`, `border-radius: 50%`.
- `filter: blur(80px)` (`60px` on mobile).
- Container has a `transform: translate3d(calc(var(--mx) * -1.2%), calc(var(--my) * -1.2%), 0)` — for Remotion this just means subtle global drift over time.

Float keyframes (each is a soft drift + scale loop):
```css
@keyframes bb-orb-float-a {
  0%,100% { transform: translate(0,0) scale(1); }
  33%     { transform: translate(8%,-12%) scale(1.08); }
  66%     { transform: translate(-6%,6%) scale(0.95); }
}
@keyframes bb-orb-float-b {
  0%,100% { transform: translate(0,0) scale(1); }
  50%     { transform: translate(-10%,8%) scale(1.12); }
}
@keyframes bb-orb-float-c {
  0%,100% { transform: translate(0,0) scale(1); }
  25%     { transform: translate(6%,8%) scale(1.05); }
  75%     { transform: translate(-8%,-10%) scale(0.92); }
}
```

### 6.8 SeasonIntroOverlay (new, for empty active season)
Overlays the player for ~4.2s when the season is active but has no live slots, then fades to reveal house content playing underneath.

- **Position:** absolute, `inset: 0`, `z-index: 20`, `border-radius: 12px`.
- **Background:** `radial-gradient(ellipse at center, rgba(2,3,4,0.92) 0%, rgba(2,3,4,0.78) 60%, rgba(2,3,4,0.55) 100%)`, `backdrop-filter: blur(8px)`.
- **Two horizontal accent lines** (top, bottom): `height: 1px`, `linear-gradient(90deg, transparent, #E85D3A 50%, transparent)`, `box-shadow: 0 0 12px rgba(232,93,58,0.6)`. Sweep in via `scaleX 0→1` over `900ms`, `delay 150ms` (top) and `250ms` (bottom).
- **Center stack** (vertical flex, centered):
  1. Station ID: pulse dot `6×6` `#E85D3A` + `AVENIR BILLBOARD · NOW BROADCASTING` (JetBrains Mono `10px`, `letter-spacing: 0.28em`, `#E85D3A`, `font-weight: 700`).
  2. `SEASON 02` — mono `14px` label (`#rgba(240,242,244,0.45)`) + massive `02` numeral (Sora `clamp(72px, 11vw, 140px)`, weight `700`, line-height `0.95`, letter-spacing `-0.04em`), gradient-filled `linear-gradient(150deg, #F0F2F4 0%, #E6EAF2 40%, #E85D3A 100%)`, text-shadow `0 0 80px rgba(232,93,58,0.25)`.
  3. Month subtitle: Sora `clamp(18px, 1.6vw, 22px)`, weight `500`, `#E6EAF2`.
  4. Status: mono `11px`, `letter-spacing: 0.18em`, `rgba(240,242,244,0.55)`, text `Slots open · 20 available` or `{filled} of {total} slots live`.
  5. Standby tag: mono `10px`, `letter-spacing: 0.20em`, `rgba(240,242,244,0.3)`, text `Standby feed · House content`.
  6. Loading bar: `180×2px`, `rgba(255,255,255,0.06)` track, fill `linear-gradient(90deg, #C23B22, #E85D3A, #F0A868)` with `0 0 8px rgba(232,93,58,0.5)` glow, scaleX 0→1 over `(durationMs - 1400)/1000`s linear, `delay: 1400ms`.
- **Element enter delays** (cumulative): station ID `400ms`, season numeral `550ms`, subtitle `850ms`, status `1050ms`, tag `1200ms`, loading bar `1400ms`.
- **Auto-dismiss:** total `4200ms` from mount, then fade-out `600ms`.

---

## 7. Verbatim Source — Player, Telemetry, Call-Sign

The following are direct verbatim copies of the production source. Use these as the canonical reference; the prose above describes them.

### 7.1 BroadcastPlayer.tsx (verbatim, full render JSX)

```tsx
return (
  <motion.div
    ref={containerRef}
    className="relative w-full rounded-xl bb-player-border"
    style={{ background: 'rgba(5, 6, 8, 0.55)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
    onMouseMove={resetFadeTimer}
    onTouchStart={resetFadeTimer}
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
  >
    {/* ─── Animated gradient border ─── */}
    <div className="bb-border-glow" aria-hidden>
      <div className="bb-border-spinner" />
      <div className="bb-border-mask" />
    </div>
    <div className="bb-border-outer" aria-hidden>
      <div className="bb-border-spinner" />
    </div>

    {/* ─── Main video area ─── */}
    <div className="aspect-video lg:aspect-[21/9] relative overflow-hidden rounded-t-xl" style={{ zIndex: 2 }}>
      {/* Background gradient bloom */}
      <div
        className="absolute inset-0 transition-all duration-1000 ease-out"
        style={{
          background: `
            radial-gradient(ellipse 50% 60% at 50% 45%, ${catColor}12 0%, transparent 70%),
            radial-gradient(ellipse 80% 40% at 30% 80%, ${catColor}08 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 70% 20%, rgba(232, 93, 58, 0.04) 0%, transparent 60%),
            #050608
          `,
        }}
      />

      {/* YouTube iframe (dims to 0.55 while playing) */}
      {currentYTId && !videoError ? (
        <div
          ref={playerContainerRef}
          className="absolute inset-0 w-full h-full transition-opacity duration-700"
          style={{
            zIndex: 3,
            opacity: videoIsPlaying ? 0.55 : 1,
            pointerEvents: 'none',
          }}
        />
      ) : videoError ? (
        <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 3, background: 'rgba(5,6,8,0.85)' }}>
          <div className="text-center">
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'rgba(232,93,58,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>
              SIGNAL LOST
            </p>
            <p style={{ fontFamily: "var(--font-manrope), 'Manrope', sans-serif", fontSize: 12, color: 'rgba(230,234,242,0.3)' }}>
              Video unavailable — skipping to next broadcast
            </p>
          </div>
        </div>
      ) : null}

      {/* Cinema vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 20%, rgba(5,6,8,0.6) 100%)',
          zIndex: 5,
        }}
      />

      {/* Transition card (shown between videos for 2000ms) */}
      <AnimatePresence>
        {showTransition && nextApp && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{ background: 'rgba(5, 6, 8, 0.92)' }}
          >
            <p
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9,
                letterSpacing: '0.25em',
                color: 'rgba(230, 234, 242, 0.3)',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
            >
              NEXT
            </p>
            <h3
              className="text-2xl md:text-3xl font-bold tracking-tight"
              style={{
                fontFamily: "var(--font-sora), 'Sora', sans-serif",
                color: '#E6EAF2',
                textShadow: '0 0 30px rgba(230, 234, 242, 0.1)',
              }}
            >
              {nextApp.product_name}
            </h3>
            <p className="text-xs text-text-dim" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              {nextApp.category}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top overlay bar — ON AIR + slot position + controls */}
      <div
        className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 py-3 z-20 transition-opacity duration-500"
        style={{
          background: 'linear-gradient(to bottom, rgba(5,6,8,0.7) 0%, transparent 100%)',
          opacity: controlsVisible ? 1 : 0.15,
        }}
      >
        <div className="flex items-center gap-2">
          <span className="bb-on-air" />
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9,
              letterSpacing: '0.12em',
              color: 'rgba(239, 68, 68, 0.8)',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            {paused ? 'PAUSED' : 'LIVE'}
          </span>
        </div>

        <span
          className="hidden md:block"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            letterSpacing: '0.15em',
            color: 'rgba(230, 234, 242, 0.2)',
            textTransform: 'uppercase',
          }}
        >
          #{currentVideoIndex + 1} of {videos.length}{seasonLabel ? ` · ${seasonLabel}` : ''}
        </span>

        <div className="flex items-center gap-2">
          {/* Pause / Mute / Keyboard help buttons — Lucide icons, 14px / 13px */}
        </div>
      </div>

      {/* Product info card — bottom-left */}
      <motion.div
        key={currentVideo.id}
        className="absolute bottom-4 left-4 z-10 pointer-events-none max-w-xs md:max-w-sm"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: contentVisible ? 1 : 0, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className="rounded-lg px-4 py-3 backdrop-blur-md"
          style={{
            background: 'rgba(5, 6, 8, 0.7)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ background: '#E85D3A', boxShadow: '0 0 6px rgba(232, 93, 58, 0.5)' }}
            />
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9,
                letterSpacing: '0.2em',
                color: '#E85D3A',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
            >
              {isHouseMode ? 'NOW PLAYING' : 'NOW BROADCASTING'}
            </span>
            {/* Tier badge — STD or PRI */}
          </div>
          <p
            className="text-sm md:text-base font-semibold truncate"
            style={{ fontFamily: "var(--font-sora), 'Sora', sans-serif", color: '#E6EAF2' }}
          >
            {currentApp?.product_name ?? ''}
          </p>
          {currentApp?.one_liner && (
            <p
              className="text-xs truncate mt-0.5"
              style={{ fontFamily: "var(--font-manrope), 'Manrope', sans-serif", color: '#8F96A3' }}
            >
              {currentApp.one_liner}
            </p>
          )}
        </div>
      </motion.div>
    </div>

    {/* Progress bar */}
    <div className="h-[3px] relative" style={{ background: 'rgba(255,255,255,0.04)', zIndex: 2 }}>
      <motion.div
        className="h-full relative"
        style={{
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #E85D3A, #F0A868)',
          boxShadow: '0 2px 8px rgba(232, 93, 58, 0.3)',
        }}
        transition={{ duration: 0 }}
      >
        <span
          className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
          style={{ background: '#F0A868', boxShadow: '0 0 8px rgba(240, 168, 104, 0.6)' }}
        />
      </motion.div>
    </div>

    {/* Controls bar */}
    <div
      className="flex items-center gap-3 px-4 py-3 border-t transition-opacity duration-500"
      style={{
        background: '#030405',
        borderColor: 'rgba(255,255,255,0.04)',
        opacity: controlsVisible ? 1 : 0.15,
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white truncate">
          {currentApp?.product_name ?? '—'}
        </p>
        <p className="text-xs text-text-dim truncate">
          {currentApp?.one_liner ?? ''}
        </p>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {/* SkipBack icon (14px) — text-text-dim, border 1px rgba(255,255,255,0.06), rounded-md */}
        {/* WATCH FULL button:
              background: #E85D3A;
              box-shadow: 0 0 12px rgba(232, 93, 58, 0.2);
              padding: 8px 16px;
              text: 12px white semibold, ExternalLink icon 12px */}
        {/* SkipForward icon (14px) */}
      </div>
    </div>

    {/* Animated ticker (inside the player frame) */}
    <div
      className="bb-ticker border-t rounded-b-xl"
      style={{ background: '#050608', borderColor: 'rgba(255,255,255,0.04)', padding: '6px 0', position: 'relative', zIndex: 2 }}
    >
      <div className="bb-ticker-content">
        {[0, 1].map((copy) => (
          <span
            key={copy}
            className="flex items-center gap-6 px-4"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'rgba(230, 234, 242, 0.25)',
              whiteSpace: 'nowrap',
            }}
          >
            <span className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-[#E85D3A]" />
              {isHouseMode ? 'NOW PLAYING:' : 'NOW BROADCASTING:'}{' '}
              <span style={{ color: '#E85D3A' }}>{currentApp?.product_name ?? '—'}</span>
            </span>
            <span>—</span>
            {!isHouseMode && (
              <>
                <span>#{currentVideoIndex + 1} of {videos.length}</span>
                <span>—</span>
              </>
            )}
            <span>{isHouseMode ? 'HOUSE CONTENT' : (seasonLabel ?? 'Current Season')}</span>
            <span>—</span>
            <span className="flex items-center gap-2">
              NEXT UP:{' '}
              <span style={{ color: '#F0A868' }}>{nextApp?.product_name ?? '—'}</span>
            </span>
            <span style={{ margin: '0 40px' }}>▌▌▌</span>
          </span>
        ))}
      </div>

      <div
        className="absolute left-0 top-0 bottom-0 w-16 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #050608, transparent)', zIndex: 2 }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-16 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #050608, transparent)', zIndex: 2 }}
      />
    </div>
  </motion.div>
)
```

### 7.2 BillboardTelemetryStrip.tsx (verbatim, full component)

```tsx
const SLOT_SEGMENTS = 10

export function BillboardTelemetryStrip({
  seasonNumber,
  totalFilled,
  totalSlots,
  hasActiveSeason,
}: BillboardTelemetryStripProps) {
  const filledSegments =
    totalSlots > 0
      ? Math.min(SLOT_SEGMENTS, Math.round((totalFilled / totalSlots) * SLOT_SEGMENTS))
      : 0

  return (
    <div className="bb-telemetry-strip" aria-hidden>
      {/* SEASON */}
      <div className="bb-telemetry-cell">
        <span className="bb-telemetry-label">Season</span>
        <span className="bb-telemetry-value">{seasonNumber}</span>
      </div>

      <span className="bb-telemetry-divider">◆</span>

      {/* SLOTS with mini bar */}
      <div className="bb-telemetry-cell">
        <span className="bb-telemetry-label">Slots</span>
        <span className="bb-telemetry-value">
          {totalFilled}
          <span style={{ color: 'var(--bb-text-lo)' }}>/{totalSlots}</span>
        </span>
        <span className="bb-telemetry-minibar">
          {Array.from({ length: SLOT_SEGMENTS }).map((_, i) => (
            <span
              key={i}
              className={`bb-telemetry-minibar-segment${i < filledSegments ? ' filled' : ''}`}
            />
          ))}
        </span>
      </div>

      <span className="bb-telemetry-divider">◆</span>

      {/* STATUS */}
      <div className="bb-telemetry-cell">
        <span className="bb-telemetry-label">Status</span>
        <span className="bb-on-air" />
        <span
          className={`bb-telemetry-value${hasActiveSeason ? ' bb-telemetry-value-accent' : ''}`}
        >
          {hasActiveSeason ? 'LIVE' : 'STANDBY'}
        </span>
      </div>

      <span className="bb-telemetry-divider">◆</span>

      {/* DURATION */}
      <div className="bb-telemetry-cell">
        <span className="bb-telemetry-label">Arc</span>
        <span className="bb-telemetry-value">30·DAY</span>
      </div>
    </div>
  )
}
```

**Telemetry strip CSS classes (verbatim from globals.css):**

```css
.bb-telemetry-strip {
  display: inline-flex;
  align-items: center;
  gap: 16px;
  padding: 10px 18px;
  background: rgba(13, 16, 20, 0.88);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(232, 93, 58, 0.22);
  border-radius: 4px;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.5), 0 0 18px rgba(232, 93, 58, 0.08);
  max-width: calc(100vw - 32px);
}
.bb-telemetry-cell { display: inline-flex; align-items: center; gap: 8px; }
.bb-telemetry-label {
  font-size: 9px;
  letter-spacing: 0.18em;
  color: #3E4650;
  font-weight: 600;
  text-transform: uppercase;
}
.bb-telemetry-value {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 12px;
  letter-spacing: 0.04em;
  color: #F0F2F4;
  font-weight: 600;
}
.bb-telemetry-value-accent { color: #E85D3A; }
.bb-telemetry-divider { color: rgba(232, 93, 58, 0.30); font-size: 10px; }
.bb-telemetry-minibar { display: inline-flex; gap: 2px; margin-left: 4px; vertical-align: middle; }
.bb-telemetry-minibar-segment {
  width: 5px; height: 8px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 1px;
}
.bb-telemetry-minibar-segment.filled {
  background: linear-gradient(180deg, #E85D3A, #C23B22);
  box-shadow: 0 0 4px rgba(232, 93, 58, 0.4);
}
```

### 7.3 BillboardSideHeader.tsx — call-sign (verbatim, full component)

```tsx
const MONO = "'JetBrains Mono', 'Fira Code', monospace"

export function BillboardSideHeader({
  seasonNumber,
  frequencyStamp,
  hasActiveSeason,
}: BillboardSideHeaderProps) {
  const [hover, setHover] = useState(false)

  return (
    <header className="fixed top-5 left-5 md:top-7 md:left-7 z-40">
      <Link
        href="/"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="group flex items-center gap-3 px-3.5 py-2 transition-all"
        style={{
          background: hover ? 'rgba(14, 17, 22, 0.78)' : 'rgba(10, 12, 16, 0.65)',
          backdropFilter: 'blur(14px)',
          border: `1px solid ${hover ? 'rgba(232, 93, 58, 0.42)' : 'rgba(232, 93, 58, 0.20)'}`,
          borderRadius: 3,
          boxShadow: hover
            ? '0 0 32px rgba(232, 93, 58, 0.20), 0 8px 28px rgba(0, 0, 0, 0.5)'
            : '0 0 22px rgba(232, 93, 58, 0.08), 0 6px 22px rgba(0, 0, 0, 0.45)',
          textDecoration: 'none',
        }}
      >
        <div className="flex items-center gap-1.5">
          <span
            className={hasActiveSeason ? 'bb-on-air' : ''}
            style={{
              width: 6, height: 6, borderRadius: '50%',
              background: hasActiveSeason ? 'var(--bb-primary)' : 'rgba(240,242,244,0.35)',
              boxShadow: hasActiveSeason ? '0 0 10px rgba(232, 93, 58, 0.8)' : 'none',
            }}
          />
          <span
            style={{
              fontFamily: MONO,
              fontSize: 9,
              letterSpacing: '0.22em',
              color: hasActiveSeason ? 'var(--bb-primary)' : 'rgba(240,242,244,0.45)',
              fontWeight: 700,
              textTransform: 'uppercase',
              lineHeight: 1,
            }}
          >
            On Air
          </span>
        </div>

        <span style={{ width: 1, height: 14, background: 'rgba(240, 242, 244, 0.18)' }} />

        <span
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 13,
            fontWeight: 700,
            color: hover ? 'rgba(255, 255, 255, 0.98)' : 'rgba(240, 242, 244, 0.92)',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            lineHeight: 1,
            textShadow: '0 0 10px rgba(232, 93, 58, 0.10)',
            transition: 'color 0.2s ease',
          }}
        >
          Avenir
        </span>

        <span className="hidden sm:inline-block" style={{ width: 1, height: 14, background: 'rgba(240, 242, 244, 0.12)' }} />

        <span
          className="hidden sm:inline"
          style={{
            fontFamily: MONO,
            fontSize: 9,
            letterSpacing: '0.18em',
            color: 'rgba(240, 242, 244, 0.55)',
            fontWeight: 600,
            textTransform: 'uppercase',
            lineHeight: 1,
          }}
        >
          S{seasonNumber} · {frequencyStamp}
        </span>

        <span
          aria-hidden
          style={{
            fontFamily: MONO,
            fontSize: 10,
            color: hover ? 'var(--bb-primary)' : 'rgba(232, 93, 58, 0.45)',
            transform: hover ? 'translateX(2px)' : 'translateX(0)',
            transition: 'transform 0.25s ease, color 0.2s ease',
            lineHeight: 1,
            marginLeft: 2,
          }}
        >
          ↩
        </span>
      </Link>
    </header>
  )
}
```

---

## 8. Remotion Implementation Checklist

A quick checklist for the video team:

- [ ] Page background: solid `#020304` `<AbsoluteFill>`.
- [ ] Tech Aesthetic image: full-bleed at opacity `0.6`, `brightness(0.92) saturate(0.95)`. Provide `Tech Aesthetic.jpeg` as a static asset.
- [ ] Two sculpting gradient overlays (vertical 5-stop, horizontal 4-stop) — see §1.
- [ ] "Billboard" watermark text: Sora 800, gradient-clipped, blurred shadow, transform `translateY(-2%)`.
- [ ] Optional film grain layer: pre-baked 200×200 noise PNG, tiled, `opacity: 0.035`, 3-step position shift every 500ms.
- [ ] Optional scanlines: `repeating-linear-gradient(0deg, transparent 2px, rgba(255,255,255,0.008) 2px, ... 4px)`, fixed full-bleed.
- [ ] Optional 6-orb atmosphere (see §6.7) if dynamic background is desired.
- [ ] Player container: `max-w-5xl` (1024px), aspect `21:9`, border-radius `12px`, `rgba(5,6,8,0.55)` + `backdrop-blur(8px)`.
- [ ] Conic-gradient border halo: 4 layers (`.bb-border-glow` + spinner + mask + `.bb-border-outer` + spinner), 8s linear spin.
- [ ] Cinema vignette: radial ellipse `70%×60%`, transparent 20% → `rgba(5,6,8,0.6) 100%`.
- [ ] Category bloom: 3-stop radial gradient at `catColor12 / catColor08 / orange`, on `#050608` base.
- [ ] YouTube source video: dim to `opacity: 0.55` while playing.
- [ ] Top overlay bar: ON AIR pulse + LIVE label + slot position. Auto-fade after 3s.
- [ ] Product info card (bottom-left): orange dot, NOW BROADCASTING label, product name (Sora bold), one-liner (Manrope `#8F96A3`).
- [ ] Progress bar: 3px tall, gradient `#E85D3A → #F0A868`, glowing tail dot.
- [ ] Controls bar: `#030405`, prev/next icons, WATCH FULL CTA (`#E85D3A`, shadow `0 0 12px`).
- [ ] Internal ticker: 30s linear loop, render content twice, edge fades 64px to `#050608`.
- [ ] Page-level bottom ticker: 60s linear loop, 26px tall, 60px edge fades to `#020304`.
- [ ] Telemetry strip: 4 cells (SEASON / SLOTS+minibar / STATUS+pulse / ARC), JetBrains Mono throughout.
- [ ] Call-sign header: pulse + ON AIR + AVENIR wordmark + S## · ##.YYYY.
- [ ] Apply orbit (if needed): 116×116, orbiting "Reserve · Broadcast · Slot ·" text at 18s spin, orange button at center.
- [ ] Data strip: telemetry redundant readout + "View Season Grid →" button.
- [ ] Season intro overlay (for empty-active-season composition): see §6.8.

For Remotion compositions specifically:
- Easing for all signature motion: `Easing.bezier(0.16, 1, 0.3, 1)`.
- ON AIR pulse: 2s loop, scale a ring 0→4px while fading opacity 0.5→0.
- Conic spinner: rotate 0→360deg over 8s linear, infinite. Use SVG or CSS conic-gradient as a single layer rotated via transform.
- Ticker: use `interpolate(frame, [0, 60 * fps], [0, -50%])` for an exact 60s loop.

---

## Appendix A — Verbatim source: Background composition

```tsx
export function BillboardStageBackground({ entered }: BillboardStageBackgroundProps) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {/* Tech-aesthetic ambient image */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src="/assets/Tech Aesthetic.jpeg"
          alt=""
          fill
          priority
          quality={90}
          className="object-cover"
          style={{
            opacity: 0.6,
            filter: 'brightness(0.92) saturate(0.95)',
            objectPosition: 'center center',
          }}
        />
      </motion.div>

      {/* Sculpting gradients */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg,
            rgba(2,3,4,0.55) 0%,
            rgba(2,3,4,0.08) 22%,
            rgba(2,3,4,0.04) 50%,
            rgba(2,3,4,0.45) 78%,
            rgba(2,3,4,0.9) 100%
          )`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(90deg,
            rgba(2,3,4,0.5) 0%,
            transparent 30%,
            transparent 70%,
            rgba(2,3,4,0.5) 100%
          )`,
        }}
      />

      {/* Bg watermark — fades in once the stage is entered */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: entered ? 1 : 0 }}
        transition={{ duration: 1.4, delay: entered ? 0.2 : 0, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(44px, 13vw, 240px)',
            fontWeight: 800,
            letterSpacing: '0.08em',
            lineHeight: 0.9,
            margin: 0,
            paddingLeft: '0.08em',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            userSelect: 'none',
            maxWidth: '92vw',
            background: 'linear-gradient(180deg, rgba(240,242,244,0.36) 0%, rgba(240,242,244,0.18) 50%, rgba(232,93,58,0.22) 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(240,242,244,0.08)',
            textShadow: '0 0 140px rgba(232,93,58,0.18), 0 0 60px rgba(240,242,244,0.06)',
            transform: 'translateY(-2%)',
          }}
        >
          Billboard
        </h1>
      </motion.div>

      {/* Top fade — clears the header zone */}
      <div
        className="absolute inset-x-0 top-0"
        style={{
          height: '14%',
          background: 'linear-gradient(180deg, rgba(2,3,4,0.5) 0%, transparent 100%)',
        }}
      />
    </div>
  )
}
```

---

## Appendix B — Verbatim source: Critical CSS animations

```css
/* ON AIR — the 2s expanding-ring pulse */
@keyframes onAirPulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.5); }
  50%      { box-shadow: 0 0 0 4px rgba(239, 68, 68, 0); }
}
.bb-on-air {
  width: 6px; height: 6px; border-radius: 50%;
  background: #ef4444;
  animation: onAirPulse 2s ease-in-out infinite;
}

/* Conic-gradient border — 8s linear spin */
@keyframes bbBorderSpin {
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Ticker — 60s page-level / 30s player-internal */
@keyframes tickerCrawl {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

/* Slot-counter fill (delayed mount → animate to fillPercent) */
.bb-slot-counter-fill {
  background: linear-gradient(90deg, #C23B22, #E85D3A);
  transition: width 1.2s cubic-bezier(0.22, 1, 0.36, 1);
  box-shadow: 0 0 12px rgba(232, 93, 58, 0.4);
}

/* Film grain — 3-step shift every 500ms */
@keyframes bbFilmGrain {
  0%   { background-position: 0 0; }
  33%  { background-position: -20px -15px; }
  66%  { background-position: 15px -25px; }
  100% { background-position: 0 0; }
}

/* Orbit text spin — 18s linear (used on Apply orbit) */
@keyframes bb-orb-float-a {
  0%, 100% { transform: translate(0,0) scale(1); }
  33%      { transform: translate(8%,-12%) scale(1.08); }
  66%      { transform: translate(-6%,6%) scale(0.95); }
}
```

That's the entire frame-accurate spec for the Billboard broadcast surface.
