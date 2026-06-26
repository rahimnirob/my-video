# ELLA — MAKEOVER PLAN (build next session)

> Goal: rebuild **Ella** in the same kinetic-light SaaS-explainer style we just nailed for **Ares**
> (the Klickpin-inspired look). Same *approach & motion system*, Ella's own *content + identity*.
> This doc is build-ready — start at §8. Drafts are marked `(DRAFT — refine)`.

---

## 1. What Ella is (message)
Ella helps founders **validate an idea before they build it** — "see the market, see the
competition, see if it's worth building." Audience: founders who waste months building the wrong
thing. Core line (keep): **"Build what people actually want."** Arc, same shape as Ares:
**problem → introducing → solution → end.** Target ~**28s (840f)**, 1920×1080, 30fps.

## 2. The style system we're cloning (from Ares — `src/ares/`)
The whole look is already built and proven. Reuse it:
- **Backgrounds:** `RestyleBg` = one continuous bg, a vivid **bloom** (problem/end beats) that
  drifts + breathes, cross-dissolving to a flat **field** (product beats) at only the two real
  boundaries (~f188–198 and ~f704–714). One continuous field run between.
- **Typography motion:** `BlurText` = words **build in one at a time** (blur+rise, staggered),
  whole line blurs out on swap. ONE accent word per line flows a gradient (`aresFill` →
  `ellaFill`). `FitSentence` = first line lands BIG then **zooms out to fit** (the avenir
  `FitToFrame` technique). Blinking cursor on "Introducing".
- **UI:** `GlassCard` (white, soft shadow, slide+scale+blur entrance, gentle float),
  `ProcessingPill` (pill + loader-dot "working" beat), brand `Lockup` (mark + wordmark + sub + url),
  a **signature converge/reveal** beat (`ToolHub` in Ares — Ella needs its own, see §7).
- **Rules that made it good:** exactly one accent word/line; accent gradient is bloom-variant on
  the bloom (light-anchored) and field-variant on the light bg (dark-anchored, so it reads);
  honest UI (structure-only placeholder bars, NO fake metrics/percentages); house easing
  `cubic-bezier(0.16,1,0.3,1)`; converge uses **ease-IN** (magnetic snap, stays readable);
  beats tile 0→840 with ~4f cross-blur overlaps, no empty frames.

## 3. Ella palette — **THE main decision** (pick at session start)
Ares = cool blue (`#2563EB`/cyan `#00E5FF`). Ella should be a clear **sibling, not a clone**.
Options (recommend **A**):
- **A. Validation Emerald (recommended).** bloom `#10B981`/`#059669`, accent gradient
  `white→#6EE7B7→#10B981→#047857`, field `#ECF5F0` (mint-tinted), ink `#07130E`, gray `#5C6B63`.
  Thematically perfect — green = "go / worth building / ✓"; maximally distinct from Ares.
- **B. Warm heritage.** Reuse Ella's original taupe/rose roots: bloom warm coral `#FF6B5C` or
  amber `#F59E0B`, field warm cream `#F4EEE9`, ink `#2A0800`. Keeps Ella's warmth; less "validation".
- **C. Indigo/violet.** bloom `#6D28D9`, accent violet→fuchsia. Premium, distinct, neutral message.
> Decision also: **font.** Ares uses Inter. Ella's heritage was **Anton all-caps, big**. Recommend
> **Inter** for the clean kinetic consistency, BUT optionally keep **Anton for the big bloom
> statement lines** (problem/close) to preserve Ella's bold signature. Confirm at start.

## 4. Kit reuse plan (do this first — §8 step 1)
The Ares kit is themed to `L`/`aresFill` in `src/ares/`. Two ways to reuse — **recommend (a)**:
- **(a) Generalize to a shared themed kit (cleaner).** Move `BlurText, FitSentence, BloomBg,
  RestyleBg, GlassCard, ProcessingPill, Lockup` to `src/kit/`, each taking a `theme` object:
  `{ bloom, bloomBase, field, ink, gray, accent, white, line, fill(frame,onBloom) }`. Ares passes its
  theme; Ella passes hers. ~1–2h, no duplication, both videos benefit.
- **(b) Fork (faster, ~30m).** Copy `src/ares/kit` → `src/avenir/ella/kit`, swap `L`/`aresFill`
  for Ella tokens. Zero risk to Ares; duplicates code. Use if credits are tight.
Either way: keep the existing `EllaIntro` composition id; replace the old warm-Anton scenes.

## 5. Assets (already in repo)
- **Logo mark:** `public/download (1).jpeg` (black swirl on white) or `public/Logo-removebg-preview.png`
  (transparent). Same swirl Ares uses. Tint to Ella's accent (filter `brightness(0)` for ink,
  `brightness(0) invert(1)` for on-bloom). If Ella needs a distinct mark, source one; else reuse.
- **Font:** Inter already loaded (`@remotion/google-fonts/Inter`); Anton available in
  `src/avenir/archived/fonts.ts` if we keep it for hero lines.
- No video/image clips needed (bg is CSS, like Ares). The original Ella `bloom.jpg` (purple) is NOT
  used in the Ares-style bg.

## 6. Scene-by-scene plan (DRAFT — refine copy/timing at build). 9 beats, tile 0→840.
| # | Beat | Frames | Bg | Copy (draft) | Accent | Visual |
|---|---|---|---|---|---|---|
| s1 | PROBLEM-A | 0–108 | bloom | **FitSentence:** "You built it. Nobody came." | `Nobody` | type only |
| s2 | PROBLEM-B | 108–198 | bloom | "Months of work. Wasted." | `Wasted` | type only |
| s3 | INTRODUCING | 198–318 | field | "Introducing ⟁ Ella" → sub "Validate before you build." | `Validate` | mark builds in beside wordmark + cursor |
| s4 | INPUT | 318–414 | field | command bar: types an idea, e.g. "A CRM for indie founders" | `idea` | GlassCard command bar (accent chrome) |
| s5 | **SIGNATURE / VALIDATION** | 420–540 | field | caption "See if it's real." | `real` | the hero beat — see §7 |
| s6 | VERDICT | 540–666 | field | caption "Know before you build." | `before` | 3 verdict cards: Market / Competition / Verdict ✓ |
| s7 | PROCESSING | 668–714 | field | "Validating your idea" (pill + loader) | `idea` | ProcessingPill |
| s8 | CLOSE | 714–792 | bloom | "Build what people actually want." | `want` | type only |
| s9 | LOCKUP | 792–840 | bloom | "Ella" / "Validate before you build." / url | — | brand lockup, held freeze |

## 7. Ella's signature visual (s5) — the analog of Ares' tools-converge
Pick one (recommend **A**), build like `ToolHub` (self-gating, ease-in, honest):
- **A. Idea → verdict scan (recommended).** The typed idea card sits center; a **scan line sweeps**
  it; three **signal meters** fill (Market demand / Competition / Willingness to pay) using the
  gradient; a confident **"✓ WORTH BUILDING"** stamp lands (scale-settle + accent pulse). This is
  literally Ella's promise. (We built a v1 `VerdictReveal` in the old Ella — port the idea, new style.)
- **B. Graveyard → one lights up.** A field of ~12 idea cards greys out / falls ("most ideas die"),
  ONE lights up in the accent ("validated"). Strong "build the *right* thing" metaphor; more work.
- Then s6 reinforces with the 3 verdict cards (structure-only meters + a ✓), like Ares' panels.

## 8. Build steps (ordered, next session)
1. **Kit:** generalize Ares kit to `src/kit/` with a `theme` prop (§4a), or fork (§4b). Verify Ares
   still renders unchanged.
2. **Ella theme:** `src/avenir/ella/theme.ts` — palette (chosen §3) + `ellaFill(frame,onBloom)`
   (mirror `aresFill`), + Inter (and Anton if kept).
3. **Scenes:** rebuild `src/avenir/ella/scenes/` (Problem, Introducing, Solution, Close) using the
   themed kit + the §6 timings; build the §7 signature component.
4. **Wire:** rewrite `EllaIntro.tsx` as one continuous timeline (global frame, RestyleBg + 4 scenes,
   no Sequences), `TOTAL_FRAMES = 840`. Keep the `EllaIntro` id in `Root.tsx` and the minimal
   `src/ella.entry.tsx`.
5. **Verify:** `npx tsc --noEmit`; render key stills (see §9) and eyeball each beat; fix; final MP4.

## 9. Render / infra (proven this session)
- **C: drive is full → bypass it.** Set temp to E: before any render:
  `$env:TEMP='E:\tmp'; $env:TMP='E:\tmp'; $env:TMPDIR='E:\tmp'` then run. (Also free some C: when convenient.)
- **Low-RAM:** render via the minimal entry, not the full Root. Stills:
  `node scripts/ella-stills.mjs <frames…>` (exists). MP4:
  `npx remotion render src/ella.entry.tsx EllaIntro out/ella-intro.mp4 --codec=h264 --crf=16 --image-format=png --concurrency=3`
- Studio preview: `npx remotion studio src/ella.entry.tsx`.

## 10. Open decisions to confirm at session start
1. **Palette** (§3): A Emerald / B Warm / C Indigo. *(recommend A)*
2. **Font** (§3): Inter throughout, or Anton for hero statement lines. *(recommend Inter, Anton optional)*
3. **Kit** (§4): generalize shared kit *(recommend)* vs fork.
4. **Signature visual** (§7): A idea→verdict scan *(recommend)* vs B graveyard→one.
5. Final copy pass on §6 lines.

— Plan written end of the Ares session. Next session: confirm §10, then run §8.
