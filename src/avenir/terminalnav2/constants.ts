/**
 * terminalnav2/constants.ts
 * ───────────────────────────────────────────────────────────────────────────
 * TerminalNavV2 — 36s (1080f @ 30fps) Anthropic-style kinetic-typography cut.
 * Typography carries the meaning; screenshots reveal AFTER text resolves; beats
 * cross-dissolve over a continuous world (no hard cuts except the PIVOT).
 *
 * Everything here is ABSOLUTE-frame. Scenes are all-mounted and self-clip with
 * fade windows (overlapping their neighbours) so the frame "never ends".
 * ───────────────────────────────────────────────────────────────────────────
 */
import { Easing, interpolate, staticFile } from 'remotion';
import { EASE_SMOOTH, base, sentinel, pulse, status } from '../tokens';

export const FPS = 30;
export const TOTAL_FRAMES = 1080;
export const WIDTH = 1920;
export const HEIGHT = 1080;

/** House easing curve, ready for interpolate({ easing }). */
export const ease = Easing.bezier(...EASE_SMOOTH);

/** 0→1 eased ramp between two absolute frames (the OnAir `r(a,b)` idiom). */
export const ramp = (frame: number, a: number, b: number): number =>
  interpolate(frame, [a, b], [0, 1], {
    easing: ease,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

/** Cursor blink (brief v2): visible 12 frames, hidden 14 frames. */
export const cursorVisible = (frame: number): boolean => frame % 26 < 12;

/**
 * #RRGGBB token → rgba() at a custom alpha. Colours DERIVE from tokens so a
 * theme change in avenir-tokens.ts propagates to every tint/glow in the video.
 */
export const alpha = (hex: string, a: number): string => {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
};

/** Absolute scene boundaries (frames) — matches the SCENE TABLE exactly. */
export const SCENES = {
  title: { from: 0, to: 90 },
  problem: { from: 90, to: 240 },
  pivot: { from: 240, to: 300 },
  home: { from: 300, to: 480 },
  commands: { from: 480, to: 720 },
  dpad: { from: 720, to: 900 },
  close: { from: 900, to: 1080 },
} as const;

/** The persistent terminal bar slides up mid-PIVOT and lives to the end. */
export const TERMINAL_BAR_START = 240;

export const PATH_HOME = 'AVENIR/CORE/GUEST/HOME';
export const PATH_PULSE = 'AVENIR/CORE/GUEST/PULSE';

export const HOME_SHOT = staticFile('screenshots/home.png');
export const PULSE_SHOT = staticFile('screenshots/pulse.png');

/** Glass shell recipe (terminal bar, D-Pad keys, callout). */
export const GLASS = {
  bg: base.glassBg, // rgba(255,255,255,0.04)
  border: base.glassBorder, // rgba(255,255,255,0.08)
  radius: 12,
} as const;

/** Token-derived colour lock for this video (see brief §11). */
export const C = {
  bg: base.bgBase,
  textPrimary: base.textPrimary,
  textSecondary: base.textSecondary,
  textMuted: base.textMuted,
  silver: sentinel.accent,
  violet: pulse.accent,
  violetHover: pulse.accentHover,
  success: status.success,
} as const;

/** Type-in cadence: 1.2 frames/char ≈ 40ms at 30fps. */
export const CHAR_FRAMES = 1.2;
