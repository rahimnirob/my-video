/**
 * lumex.ts — the LumeX brand palette, copied from the brand board and organized
 * for the whole system (typography, background, visuals). Founder direction:
 * use SOFTER / lower shades of the crimson — smooth, not strong. The vivid
 * Electric Crimson is reserved for tiny accents (the ON AIR dot).
 * ───────────────────────────────────────────────────────────────────────────
 */
import type { CSSProperties } from 'react';

/* ── Brand swatches (verbatim) ───────────────────────────────────────────── */
export const lumex = {
  electricCrimson: '#FF0050', // vivid — STRONG accent only, use sparingly
  brightGray: '#DCDCDC', // light neutral
  chineseBlack: '#121212', // dark neutral
  // softer / lower shades derived for everyday use (the smooth look)
  rosePale: '#F6C2CE', // near-white pink highlight
  rose: '#E0526F', // soft crimson — the workhorse mid
  roseDeep: '#9E3550', // deep muted crimson
  void: '#0A0A0C', // background base (near-black)
} as const;

/* ── TYPOGRAPHY: a soft, white-anchored crimson gradient that flows ───────── */
export const LUMEX_GRADIENT =
  `linear-gradient(100deg, #FFFFFF 0%, ${lumex.rosePale} 28%, ${lumex.rose} 52%, ${lumex.roseDeep} 76%, #FFFFFF 100%)`;

/** Fills text with LUMEX_GRADIENT and flows it (smooth, slower than ember). */
export const lumexFill = (frame: number, periodF = 30): CSSProperties => {
  const cycle = Math.max(1, periodF);
  const x = -200 * ((frame % cycle) / cycle);
  return {
    backgroundImage: LUMEX_GRADIENT,
    backgroundSize: '200% auto',
    backgroundPosition: `${x}% center`,
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
  };
};

/** Soft crimson glow + legibility shadow (gentle, never harsh). */
export const LUMEX_SHADOW =
  'drop-shadow(0 2px 3px rgba(0,0,0,0.6))' +
  ' drop-shadow(0 0 20px rgba(224,82,111,0.30))' +
  ' drop-shadow(0 0 56px rgba(158,53,80,0.20))';

/* ── BACKGROUND: two big bleeded orbs on black ───────────────────────────── */
export const LUMEX_ORB_A = 'rgba(228,64,100,0.50)'; // soft crimson
export const LUMEX_ORB_B = 'rgba(150,34,70,0.46)'; // deeper muted

/* ── VISUALS: accents for the player chrome ──────────────────────────────── */
export const LUMEX_ACCENT = lumex.rose; // soft crimson for fills/progress
export const LUMEX_LIVE = lumex.electricCrimson; // the ON AIR dot only
