/**
 * terminalnav/constants.ts
 * ───────────────────────────────────────────────────────────────────────────
 * Shared timing + layout contract for the TerminalNav video (40s @ 30fps).
 * Frame ranges are ABSOLUTE on the 1200-frame master timeline and match the
 * SCENE TABLE in the build brief exactly. Per-scene components receive a LOCAL
 * (0-based) frame via <Sequence>, so use these `.from` values only when driving
 * the persistent terminal bar (which spans scenes) by absolute frame.
 * ───────────────────────────────────────────────────────────────────────────
 */
import { Easing, staticFile } from 'remotion';
import { EASE_SMOOTH, base } from '../tokens';

/**
 * Build an rgba() string from a #RRGGBB token at a custom alpha. Colours are
 * DERIVED from the token (never re-typed), so if a theme accent changes in
 * avenir-tokens.ts every tint/glow in this video tracks it automatically.
 */
export const alpha = (hex: string, a: number): string => {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
};

/** Terminal cursor blink: mostly on, brief hard off (matches the real BlinkingCursor). */
export const cursorVisible = (frame: number): boolean => frame % 16 < 13;

export const FPS = 30;
export const TOTAL_FRAMES = 1200;
export const WIDTH = 1920;
export const HEIGHT = 1080;

/** The house easing curve as a ready-to-use Remotion easing fn. */
export const ease = Easing.bezier(...EASE_SMOOTH);

/** Absolute scene boundaries (frames). from/durationInFrames spread into <Sequence>. */
export const SCENES = {
  traditional: { from: 0, durationInFrames: 180 },
  cut: { from: 180, durationInFrames: 60 },
  home: { from: 240, durationInFrames: 240 },
  commands: { from: 480, durationInFrames: 300 },
  dpad: { from: 780, durationInFrames: 210 },
  close: { from: 990, durationInFrames: 210 },
} as const;

/** The persistent terminal bar appears mid-CUT and lives to the end. */
export const TERMINAL_BAR_START = 195; // absolute frame
/** Path breadcrumb flips HOME → PULSE when the COMMANDS scene begins. */
export const PULSE_PATH_FROM = SCENES.commands.from; // 480

export const PATH_HOME = 'AVENIR/CORE/GUEST/HOME';
export const PATH_PULSE = 'AVENIR/CORE/GUEST/PULSE';

/** Real Avenir screenshots (copied to clean names from public/screenshot/). */
export const HOME_SHOT = staticFile('screenshots/home.png');
export const PULSE_SHOT = staticFile('screenshots/pulse.png');

/** Glass-morphism shell recipe shared by every panel in this video. */
export const GLASS = {
  bg: base.glassBg, // rgba(255,255,255,0.04)
  border: base.glassBorder, // rgba(255,255,255,0.08)
  radius: 12,
} as const;

/** Type-in cadence: ~40ms/char ≈ 1.2 frames/char at 30fps. */
export const CHAR_FRAMES = 1.2;
