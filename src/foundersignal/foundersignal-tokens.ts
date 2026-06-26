/**
 * foundersignal-tokens.ts — the single source of truth for the FounderSignal intro.
 * Black & violet aesthetics: deep void black backgrounds, electric violet glows,
 * light gray text. Adapted from Ella/Ares pattern with violet color scheme.
 */
import type { CSSProperties } from 'react';
import { Easing } from 'remotion';
import { INTER } from '../ares/fonts';

export const FPS = 30;
export const TOTAL_FRAMES = 840; // 28s @30 — reference-style restyle (problem→introducing→solution→end)

export const frames = (ms: number): number => Math.round((ms / 1000) * FPS);

/**
 * FS — the FounderSignal palette (black & violet aesthetics).
 * Deep void black field + dark violet-tinted cards + violet radial bloom.
 */
export const FS = {
  bg:        '#0A0A12',   // deep void black — product/UI field
  bloomBase: '#0D0D18',   // near-black base under the violet bloom
  card:      '#14141F',   // dark violet-tinted UI cards
  bloom:     '#7C3AED',   // primary violet radial bloom (problem/end beats)
  bloomDeep: '#6D28D9',   // deep violet core
  ink:       '#E5E7EB',   // light gray primary text (on dark)
  gray:      '#9CA3AF',   // muted secondary text
  accent:    '#A78BFA',   // light violet accent
  line:      'rgba(167,139,250,0.15)', // violet-tinted hairline borders
  white:     '#F3F4F6',   // near-white text on violet bloom
} as const;

export const EASE_SMOOTH = [0.16, 1, 0.3, 1] as [number, number, number, number];
export const ease = Easing.bezier(...EASE_SMOOTH);

export const FONT_FAMILY = INTER;

/* ===========================================================================
   ACCENT GRADIENT — the OnAir "final-frames" flowing-foil effect, re-toned to
   FounderSignal violet. The line stays white/ink; only the accent word gets this
   flowing gradient. Bloom variant is white-anchored (shimmers on violet bg);
   field variant is violet-anchored (reads on dark bg).
   =========================================================================== */
export const FS_GRAD_BLOOM = `linear-gradient(100deg, ${FS.white} 0%, ${FS.accent} 28%, #C4B5FD 50%, ${FS.bloom} 74%, ${FS.white} 100%)`;
export const FS_GRAD_FIELD = `linear-gradient(100deg, ${FS.bloom} 0%, #C4B5FD 42%, ${FS.bloomDeep} 72%, #5B21B6 100%)`;

/** Fills text with the flowing FounderSignal gradient (clip to text). Smaller periodF = faster shimmer. */
export const fsFill = (frame: number, onBloom = true, periodF = 42): CSSProperties => {
  const x = -200 * ((frame % periodF) / periodF);
  return {
    backgroundImage: onBloom ? FS_GRAD_BLOOM : FS_GRAD_FIELD,
    backgroundSize: '200% auto',
    backgroundPosition: `${x}% center`,
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
  };
};
