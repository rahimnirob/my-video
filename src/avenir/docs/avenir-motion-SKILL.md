# avenir-motion

Motion design system for producing Avenir's X marketing videos in Remotion.
This skill makes every render look like it was built by a senior AE motion
designer — and keeps it on-brand by enforcing one motion grammar and two
production registers across every video.

**Read this whole file before writing any Remotion component or composition.**

---

## 0. Prerequisites

- `avenir-tokens.ts` MUST be imported for every value. Never hardcode a hex,
  px, ms, or easing curve that exists in tokens. If it's in tokens, import it.
- Source-of-truth docs this skill assumes: `BRAND_SYSTEM.md`,
  `BILLBOARD_REMOTION_SPEC.md`, `CAMPAIGN_01_BILLBOARD.md`, `X_MECHANICS.md`.
- Project fps: 30 unless the composition overrides it. Use `frames(ms)` from
  tokens to convert all durations — never hardcode frame counts.

---

## 1. The Two Registers (decide this FIRST, every time)

Every composition renders in exactly ONE register. Pick before building.

### RAW — `REGISTER.RAW` (V2, earns reach)
The reach engine. Recognition-first, founder-voice, fast, sharp-not-flashy.
- Minimal motion. Text-forward. Sentinel/terminal coding.
- NO Billboard halo, NO grain, NO conic spin, NO spectacle.
- Background: solid `base.bgBase` or a single subtle gradient. That's it.
- Goal: the viewer feels SEEN in the first 3 seconds, not marketed at.
- Looks like: a sharp terminal readout / a calm declarative statement /
  a stat that lands. Closer to "a smart person typed this" than "an agency made this."
- This is what goes out Day 1. It is the part of the plan most likely to fail
  if over-produced — keep it restrained.

### CINEMATIC — `REGISTER.CINEMATIC` (V1, converts warm viewers)
The Billboard converter. Full broadcast register.
- The real Billboard stage: composited background, conic-gradient halo player,
  telemetry, ON AIR pulse, call-sign header, ticker, slot-counter, grain.
- Built frame-accurate to `BILLBOARD_REMOTION_SPEC.md`.
- Only lands on warm viewers (post-click), so polish converts instead of repelling.
- The medium IS the message: Billboard is cinematic broadcast, so showing the
  real cinematic surface = authentic product demo, not an ad.

**Rule:** if you're unsure which register, it's RAW. Cinematic is reserved for
Billboard-surface showcase moments inside V1.

---

## 2. Motion Grammar (the AE craft — applies to BOTH registers)

These are the rules that separate designer-grade from amateur. Non-negotiable.

### 2.1 Easing — linear is banned
- Default curve for ALL signature motion: `Easing.bezier(...EASE_SMOOTH)`
  (`[0.16, 1, 0.3, 1]`). This is a sharp-in / slow-out curve = snappy + premium.
- Slot-counter fills use `EASE_SLOT` (`[0.22, 1, 0.36, 1]`).
- NEVER animate a position/opacity/scale linearly. Linear motion is the #1
  amateur tell. The only linear motion allowed: continuous loops (conic spin,
  ticker crawl) — those are SUPPOSED to be constant-velocity.

### 2.2 Stagger / offset & delay — never enter all at once
- Multiple elements entering a scene cascade `100–300ms` apart
  (`motion.staggerMin`–`motion.staggerMax`). This single technique is what makes
  text reveals look designed.
- Within a line of text, stagger words or characters by `40–80ms`.
- Hierarchy through delay: the most important element enters first, supporting
  elements echo behind it.

### 2.3 Anticipation + overshoot + follow-through — alive, not robotic
- Anticipation: a small (2–6px) backward/contrary move before a main move.
- Overshoot: motion travels slightly PAST its target, then settles. The
  `EASE_SMOOTH` curve already overshoots subtly — lean on it, don't fight it.
- Follow-through: secondary elements (an underline, a cursor, a glow) settle a
  beat AFTER the primary element.
- Discipline (from the calm law): precise and subtle, NEVER cartoonish. If the
  overshoot is visible enough to "bounce," it's too much.

### 2.4 Reveal, don't fade — guide the eye
- Text and UI reveal via MASK / clip, not a flat opacity fade.
  (Wipe up behind a mask, clip-path reveal, width-grow.)
- A flat fade-in is the fallback only for full-screen background layers
  (the ambient image, the watermark).
- Every reveal should direct the viewer's eye exactly where you want it next.

### 2.5 Depth via parallax (CINEMATIC register mainly)
- Foreground / midground / background move at different rates to fake 3D.
- On the Billboard stage: the ambient image drifts slowest, the watermark
  mid, the player/telemetry fastest. Subtle — a few px of drift over seconds.

### 2.6 Pacing over effects (the most important rule)
- One clear idea per scene. Sync cuts to the narrative beat / audio.
- Pacing adjustments beat flashy effects every time. When in doubt, hold a beat
  longer and remove an effect.
- A deliberate moment of stillness/silence mid-video is a feature, not dead air
  (the "breath" frame). Use it before the answer/turn.
- Target runtimes: V2 recognition 15–40s; V1 explainer 60–90s. One CTA, never three.

### 2.7 Reduced motion
- Respect `prefers-reduced-motion` conceptually — keep motion atmospheric and
  slow, never strobing or jarring. Nothing should induce motion discomfort.

---

## 3. Component Library

Build these as reusable Remotion components. All import from `avenir-tokens.ts`.
Each component declares which register(s) it belongs to.

### 3.1 RAW-register components (V2)

**`TerminalLine`** — the Sentinel `>>>` type-in.
- Mono font, accent cursor (blinking, accent-colored per active system).
- Characters reveal in a clip/mask (not opacity), ~`40–60ms`/char stagger.
- `>>>` prefix renders first, then the utterance types in.
- Use for: Sentinel utterances, command-style hooks.

**`MicroLabel`** — the uppercase mono section label.
- `type.microLabel` (mono, 11px, `tracking.microLabel`, uppercase), low opacity.
- Enters with a short mask-wipe + the house curve.

**`KineticHeadline`** — the recognition-hook headline (the core V2 weapon).
- Sora 700, tight tracking. Words reveal staggered behind a mask.
- This carries the "you feel seen" line. Keep it short, high-contrast.
- Optional: a single word swaps color to a system accent on its beat.

**`StatReveal`** — a number/data point that lands.
- Mono value counts up (eased, not linear) to the target; label beneath in
  `type.telemetryLabel`. Use for PH-pain stats from the dossier (e.g. the cliff).

**`Divider`** — a thin line that grows from one edge (width 0→full, masked).
- Never a static line that fades; it draws.

**`DeclarativeCard`** — the calm brand-voice statement frame.
- Generous negative space, one line of Sora, optional mono sub-label.
- The "Avenir-as-platform speaks" register: precise, declarative, no hype.

### 3.2 CINEMATIC-register components (V1)

**`BillboardStage`** — the composited background.
- Layers 0–5 from `billboardStage` tokens / `BILLBOARD_REMOTION_SPEC §1`:
  void → ambient image (op 0.6, brightness 0.92, sat 0.95) → vertical sculpt →
  horizontal sculpt → "Billboard" watermark → 14% top fade.
- Ambient image fades in `1600ms`; watermark `1400ms` delay `200ms`.

**`BroadcastPlayer`** — the halo player frame.
- `max-w-5xl` (1024px), 21:9, radius 12, bg `rgba(5,6,8,0.55)` + blur 8.
- Conic-gradient halo: 4 layers, 8s LINEAR spin (constant velocity — allowed).
- Cinema vignette overlay (`billboardStage.vignette`).
- Player enters opacity 0→1 + y 16→0 over 700ms, house curve.

**`TelemetryStrip`** — 4 mono cells above the player.
- SEASON / SLOTS (+mini-bar) / STATUS (+pulse) / ARC. All JetBrains Mono.
- Values `type.telemetryVal`, labels `type.telemetryLabel`.

**`OnAirDot`** — the canonical live indicator.
- 6px dot, `billboard.onAirRed` (#ef4444), expanding-ring pulse, 2s loop.
- This is the ONLY place pure red appears.

**`CallSignHeader`** — broadcast station-ID treatment.
- OnAirDot + "ON AIR" + AVENIR wordmark (Sora, `tracking.wordmark`) +
  `S## · ##.YYYY` in mono `tracking.billboardCS`.

**`Ticker`** — bottom crawl.
- Page-level 60s loop / player-internal 30s loop, both LINEAR (allowed).
- Render content twice; edge fades to bg. Use `interpolate(frame,[0,60*fps],[0,-50%])`.

**`SlotCounter`** — the scarcity bar.
- Fill gradient `redDepth → primary`, `EASE_SLOT` curve, width grows to fill%,
  glow shadow. Use for "X / 50 slots — Season 02."

**`WordmarkReveal`** — the AVENIR hero entrance.
- Sora 700/800, `tracking.wordmark`. Opacity + slight Y, 700–1200ms, soft halo
  text-shadow. The signature wide-tracking is the whole look — don't compress it.

### 3.3 Shared (both registers)
- **`GrainOverlay`** (cinematic only in practice): 200px noise tile, opacity
  0.035, 3-step shift every 500ms.
- **`Scanlines`** (cinematic only): `atmosphere.scanlines`, fixed full-bleed.

---

## 4. Color discipline (enforced)

- **Billboard orange (`#E85D3A`) appears ONLY on Billboard surfaces** — LIVE
  badge, primary CTA, accent bars, slot fills. Everything else mono. Restraint
  IS the look. Never use Billboard orange in a V2/RAW composition.
- **Picks gold (`#E2C067`) means "we wrote about this"** — editorial only.
- **Pulse/Markets violet (`#8B5CF6`)** — discovery/community surfaces.
- **Sentinel chrome (`#D0D4DC`)** — neutral house / Sentinel character.
- One accent per composition unless there's an intentional editorial reason
  (e.g. a Pick is about a product, so gold + violet can co-exist on that card).
- Long body text is never pure white — use `base.textSecondary`/`textDim`.

---

## 5. Typography discipline (enforced)

- **Sora** = headings, button labels. **Manrope** = body/descriptions.
  **JetBrains Mono** = telemetry, all Billboard labels/CTAs, terminal, micro-tags.
- JetBrains Mono NEVER for body copy. Manrope NEVER for headlines.
- Micro-labels: mono, uppercase, `tracking.microLabel`, low opacity.
- Headlines: tight tracking. Wordmark: wide tracking (`0.24em`) — the signature.

---

## 6. Build workflow (per video)

1. Read the script. Mark each scene's ONE idea and its register.
2. Storyboard beats to time (a beat list with ms in/out per element).
3. Compose from the library — don't hand-roll motion that a component covers.
4. Apply the grammar: easing (§2.1), stagger (§2.2), reveal-don't-fade (§2.4),
   one CTA, breath beat before the turn.
5. Render a still at the key frames; check color + type discipline (§4, §5).
6. Render MP4. Watch at scroll-speed: does it hook in 3s? Is anything linear?
   Is any element entering un-staggered? Fix, re-render.

### Hard checklist before any video ships
- [ ] Register chosen and consistent throughout.
- [ ] No linear easing on signature motion (loops excepted).
- [ ] Nothing enters un-staggered; reveals are masked, not flat fades.
- [ ] First 3 seconds carry the hook (recognition for V2 / the warm payoff for V1).
- [ ] One CTA only.
- [ ] Billboard orange only on Billboard surfaces.
- [ ] Correct fonts per role; mono never on body.
- [ ] Runtime in range (V2 15–40s / V1 60–90s).
- [ ] Link rule honored downstream: the avenirreym.com link goes in the X
      self-reply, NEVER burned into the video as the only CTA path.

---

## 7. What this skill does NOT do
- Does not write scripts (that's `avenir-video-script`).
- Does not write X post copy (that's `avenir-x-post`).
- Does not invent new brand colors, fonts, or motion curves. Everything comes
  from `avenir-tokens.ts`. If a value is missing there, add it there first.
