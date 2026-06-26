/**
 * ella/palette.ts — Validation Emerald palette for the Ella makeover.
 * ───────────────────────────────────────────────────────────────────────────
 * Mirrors the Ares `L` / `aresFill` pattern exactly — same shape, Ella's own
 * colours. Green = "go / worth building / ✓" — maximally distinct from Ares
 * blue while staying a clear sibling.
 *
 * Bloom (problem/end): deep emerald radial on a near-white mint base.
 * Field (product/UI): flat mint-tinted white, white cards, dark ink type.
 * Accent gradient flows inside the one emphasis word per line:
 *   - on bloom → white-anchored (shimmers on the green bg)
 *   - on field → green-anchored (reads on the light bg)
 * ───────────────────────────────────────────────────────────────────────────
 */
import type { CSSProperties } from 'react';
import { Easing } from 'remotion';
import { INTER } from '../../ares/fonts';

export const FPS = 30;
export const EASE_SMOOTH = [0.16, 1, 0.3, 1] as [number, number, number, number];
export const ease = Easing.bezier(...EASE_SMOOTH);
export const FONT_FAMILY = INTER;

/**
 * EL — the LIGHT palette for Ella (mirrors Ares' `L` exactly).
 * Mint field + white cards + emerald bloom + green accent.
 */
export const EL = {
  bg:        '#ECF5F0',   // flat mint — product/UI beats (the field)
  bloomBase: '#EEFFF7',   // near-white base under the emerald bloom
  card:      '#FFFFFF',   // white UI cards
  bloom:     '#10B981',   // emerald radial bloom (problem/end beats)
  bloomDeep: '#059669',   // deeper emerald core
  ink:       '#07130E',   // primary text (on field) — not pure black
  gray:      '#5C6B63',   // secondary text
  accent:    '#6EE7B7',   // light emerald — emphasis colour
  line:      'rgba(7,19,14,0.08)', // hairline borders
  white:     '#F0FFF8',   // near-white text on the emerald bloom (not pure white)
} as const;

/* ===========================================================================
   ACCENT GRADIENT — the OnAir "final-frames" flowing-foil effect, re-toned to
   Ella emerald/mint. The line stays white/ink; only the accent word gets this
   flowing gradient. Bloom variant is white-anchored (shimmers on the green bg);
   field variant is green-anchored (reads on the light bg).
   =========================================================================== */
export const ELLA_GRAD_BLOOM = `linear-gradient(100deg, ${EL.white} 0%, ${EL.accent} 28%, #34D399 50%, ${EL.bloom} 74%, ${EL.white} 100%)`;
export const ELLA_GRAD_FIELD = `linear-gradient(100deg, ${EL.bloom} 0%, #34D399 42%, ${EL.bloomDeep} 72%, #047857 100%)`;

/** Fills text with the flowing Ella gradient (clip to text). Smaller periodF = faster shimmer. */
export const ellaFill = (frame: number, onBloom = true, periodF = 42): CSSProperties => {
  const x = -200 * ((frame % periodF) / periodF);
  return {
    backgroundImage: onBloom ? ELLA_GRAD_BLOOM : ELLA_GRAD_FIELD,
    backgroundSize: '200% auto',
    backgroundPosition: `${x}% center`,
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
  };
};
