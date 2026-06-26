/**
 * broadcast/palette.ts — Broadcast Orange palette for the Billboard promo.
 * ───────────────────────────────────────────────────────────────────────────
 * Mirrors the Ares/Ella palette pattern exactly.
 * Broadcast Orange = the cinematic signal.
 *
 * Bloom (problem/end): deep orange radial on a near-white base.
 * Field (product/UI): flat warm-tinted white, white cards, dark ink type.
 * Accent gradient flows inside the emphasis word per line:
 *   - on bloom → white-anchored (shimmers on the orange bg)
 *   - on field → orange-anchored (reads on the light bg)
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
 * BB — the LIGHT palette for Billboard promo.
 * Warm field + white cards + orange bloom + orange/amber accent.
 */
export const BB = {
  bg:        '#FDF6F4',   // flat orange-tinted off-white — product/UI beats (the field)
  bloomBase: '#FFF8F6',   // near-white base under the orange bloom
  card:      '#FFFFFF',   // white UI cards
  bloom:     '#E85D3A',   // Broadcast Orange radial bloom
  bloomDeep: '#C23B22',   // deeper red-orange core
  ink:       '#1E0E0A',   // primary text (on field) — comfortable dark warm-brown
  gray:      '#7A605A',   // secondary text
  accent:    '#F0A868',   // light amber-orange — emphasis colour
  line:      'rgba(30,14,10,0.08)', // hairline borders
  white:     '#FFFBFB',   // near-white text on the orange bloom
} as const;

/* ===========================================================================
   ACCENT GRADIENT — the OnAir flowing-foil effect, re-toned to Broadcast Orange.
   =========================================================================== */
export const BB_GRAD_BLOOM = `linear-gradient(100deg, ${BB.white} 0%, ${BB.white} 48%, ${BB.accent} 72%, #FFF3F0 88%, ${BB.white} 100%)`;
export const BB_GRAD_FIELD = `linear-gradient(100deg, ${BB.bloom} 0%, #FF7F5E 42%, ${BB.bloomDeep} 72%, #A32D17 100%)`;

/** Fills text with the flowing Billboard gradient (clip to text). */
export const bbFill = (frame: number, onBloom = true, periodF = 42): CSSProperties => {
  const x = -200 * ((frame % periodF) / periodF);
  return {
    backgroundImage: onBloom ? BB_GRAD_BLOOM : BB_GRAD_FIELD,
    backgroundSize: '200% auto',
    backgroundPosition: `${x}% center`,
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
  };
};
export type BBPalette = typeof BB;
