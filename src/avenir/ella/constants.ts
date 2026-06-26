/**
 * ella/constants.ts — timing + scene boundaries for the Ella makeover.
 * ───────────────────────────────────────────────────────────────────────────
 * 9 beats tiling 0→840 (28s @30fps). Same problem→introducing→solution→end
 * arc as Ares, with Ella's own content (validate before you build).
 * ───────────────────────────────────────────────────────────────────────────
 */
import { Easing, interpolate } from 'remotion';
import { EASE_SMOOTH } from './palette';

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const TOTAL_FRAMES = 840; // 28s @30fps

export const ease = Easing.bezier(...EASE_SMOOTH);

/** 0→1 eased ramp between two frames (the house curve), clamped both ends. */
export const ramp = (frame: number, a: number, b: number): number =>
  interpolate(frame, [a, b], [0, 1], {
    easing: ease,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

/* Scene boundaries (absolute frames) — the 9-beat table from §6. */
export const SCENES = {
  problemA:     { from: 0,   to: 108 },  // s1  PROBLEM-A       (bloom)
  problemB:     { from: 108, to: 198 },  // s2  PROBLEM-B       (bloom → field)
  introducing:  { from: 198, to: 318 },  // s3  INTRODUCING     (field)
  input:        { from: 318, to: 414 },  // s4  INPUT           (field)
  signature:    { from: 420, to: 540 },  // s5  SIGNATURE       (field)
  verdict:      { from: 540, to: 666 },  // s6  VERDICT         (field)
  processing:   { from: 668, to: 714 },  // s7  PROCESSING      (field → bloom)
  close:        { from: 714, to: 792 },  // s8  CLOSE           (bloom)
  lockup:       { from: 792, to: 840 },  // s9  LOCKUP          (bloom)
} as const;
