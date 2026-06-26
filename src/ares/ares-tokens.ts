/**
 * ares-tokens.ts — the single source of truth for the Ares intro.
 * Dark cosmic luxury: deep space void, electric cyan + vibrant purple glows,
 * starlight text. Verbatim from the build brief §4. No warm tones, no pure
 * black (#000000), no white-white — palette only.
 */
import type { CSSProperties } from 'react';
import { Easing } from 'remotion';
import { INTER } from './fonts';

export const FPS = 30;
export const TOTAL_FRAMES = 840; // 28s @30 — reference-style restyle (problem→introducing→solution→end)

export const frames = (ms: number): number => Math.round((ms / 1000) * FPS);

export const C = {
  void: '#02050F', // deep space black — base background everywhere
  depth: '#0A1A3F', // midnight blue — depth layers, glass panel base
  cyan: '#00E5FF', // electric cyan — highlights, data flows, glow, primary accent
  purple: '#A020F0', // vibrant purple — gradient partner to cyan, energy bursts
  starlight: '#E0F8FF', // soft starlight white — all body text, icon fills
  cyanGlow: 'rgba(0,229,255,0.15)',
  purpleGlow: 'rgba(160,32,240,0.12)',
  cyanBorder: 'rgba(0,229,255,0.2)',
  glassBg: 'rgba(10,26,63,0.55)',
} as const;

/**
 * L — the LIGHT palette for the restyle (cloning the reference SaaS explainer).
 * Lavender bg + white cards + a royal-blue bloom + cyan emphasis. Replaces the
 * dark-cosmic `C` look. cyan === Ares' cyan, the one shared accent.
 */
export const L = {
  bg: '#ECEDF8', // flat lavender — product/UI beats
  bloomBase: '#EAF0FF', // near-white base under the blue bloom
  card: '#FFFFFF', // white UI cards
  bloom: '#2563EB', // royal-blue radial bloom (problem/end beats)
  bloomDeep: '#1D4ED8', // deeper blue core
  ink: '#0B1020', // primary text (on lavender) — not pure black
  gray: '#5B6172', // secondary text
  accent: '#00E5FF', // cyan — the one italic emphasis colour
  purple: '#A020F0', // rare secondary accent
  line: 'rgba(11,16,32,0.08)', // hairline borders
  white: '#F4F8FF', // near-white text on the blue bloom (not pure white)
} as const;

export const EASE_SMOOTH = [0.16, 1, 0.3, 1] as [number, number, number, number];
export const ease = Easing.bezier(...EASE_SMOOTH);

export const FONT_FAMILY = INTER;

/* ===========================================================================
   ACCENT GRADIENT — the OnAir "final-frames" flowing-foil effect, re-toned to
   Ares blue/cyan. The line stays white/ink; only the accent word gets this
   flowing gradient. Bloom variant is white-anchored (shimmers on the blue bg);
   lavender variant is blue-anchored (reads on the light bg).
   =========================================================================== */
export const ARES_GRAD_BLOOM = `linear-gradient(100deg, ${L.white} 0%, #A8ECFF 28%, ${L.accent} 50%, ${L.bloom} 74%, ${L.white} 100%)`;
export const ARES_GRAD_LAV = `linear-gradient(100deg, ${L.bloom} 0%, ${L.accent} 42%, ${L.bloom} 72%, #1D4ED8 100%)`;

/** Fills text with the flowing Ares gradient (clip to text). Smaller periodF = faster shimmer. */
export const aresFill = (frame: number, onBloom = true, periodF = 42): CSSProperties => {
  const x = -200 * ((frame % periodF) / periodF);
  return {
    backgroundImage: onBloom ? ARES_GRAD_BLOOM : ARES_GRAD_LAV,
    backgroundSize: '200% auto',
    backgroundPosition: `${x}% center`,
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
  };
};
