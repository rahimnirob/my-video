/**
 * broadcast/constants.ts
 * ───────────────────────────────────────────────────────────────────────────
 * "What We Broadcast" — a 20s (600f @ 30fps) Billboard CONVERTER, 1080×1350 (4:5
 * portrait, X/social native). Kills the "I don't have a video" objection by
 * showing what gets produced: a 20s intro + a 90s feature, both built by Avenir,
 * both broadcast for 30 days.
 *
 * Base build: near-black void (founder will upgrade the bg later). Typography is
 * the house look (Anton + flowing ember gradient, reused from `archived/`). The
 * signature is Scene 02 — two broadcast bars at very different widths.
 *
 * One thing owns the screen at a time: when type is up, no bars; when bars are
 * up, no body copy.
 * ───────────────────────────────────────────────────────────────────────────
 */
import { Easing, interpolate } from 'remotion';
import { EASE_SMOOTH } from '../tokens';
import { lumex } from '../lumex';

export const FPS = 30;
export const WIDTH = 1920; // horizontal, like the Archive video
export const HEIGHT = 1080;
export const TOTAL_FRAMES = 600;

/** LumeX void (near-black) — the bg orbs supply the colour. */
export const BG = lumex.void;

export const ease = Easing.bezier(...EASE_SMOOTH);
export const ramp = (frame: number, a: number, b: number): number =>
  interpolate(frame, [a, b], [0, 1], { easing: ease, extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

/* Scene boundaries (absolute frames) — from the brief's scene table. */
export const SCENES = {
  hook: { from: 0, to: 120 }, // 01 HOOK (0–105) + exit (105–120)
  bars: { from: 120, to: 465 }, // 02 BARS (120–450) + exit (450–465)
  fact: { from: 465, to: 540 }, // 03 PRODUCTION FACT
  close: { from: 540, to: 600 }, // 04 CLOSE
} as const;
