/**
 * phcomparison/constants.ts
 * ───────────────────────────────────────────────────────────────────────────
 * PHComparison — 30s (900f @ 30fps) pure kinetic-typography cut.
 * "Product Hunt gives you 24 hours. Avenir gives you a permanent archive."
 *
 * Typography only. Color carries the narrative:
 *   PROBLEM (S1–S2) = dim / warm / dying.
 *   PIVOT   (S3)    = pure violet void.
 *   ANSWER  (S4–S6) = silver / violet / alive.
 *
 * Everything here is ABSOLUTE-frame. Scenes are all-mounted and self-clip with
 * their own fade/dim windows. The PROBLEM palette is bespoke to this video
 * (warm browns that exist nowhere else); the ANSWER palette derives from the
 * shared avenir-tokens so a brand change propagates here too.
 * ───────────────────────────────────────────────────────────────────────────
 */
import { Easing, interpolate } from 'remotion';
import { EASE_SMOOTH, base, sentinel, pulse } from '../tokens';
import { sora, mono } from '../tokens/fonts';

export const FPS = 30;
export const TOTAL_FRAMES = 900;
export const WIDTH = 1920;
export const HEIGHT = 1080;

/** Left margin for the left-aligned scenes (brief: x:160px). */
export const MARGIN_X = 160;

/* ===========================================================================
   FONTS — the actually-loaded @remotion/google-fonts families.
   =========================================================================== */
export const SORA = sora;
export const MONO = mono;

/* ===========================================================================
   COLOR
   =========================================================================== */
export const BG = base.bgBase; // '#07090D' — the only background

/** PROBLEM palette (Beats 1–2) — dim, warm, dying. Bespoke to this video. */
export const PROB_TEXT_HI = '#C4B8A8'; // warm dim white — primary problem text
export const PROB_TEXT_MD = '#8A7B6E'; // warmer grey — secondary problem lines
export const PROB_TEXT_LO = '#5C5048'; // dim warm — least important lines
export const PH_LABEL = '#9B5E45'; // muted orange-brown — "PRODUCT HUNT" label
export const PH_LABEL_DIM = '#5C3828'; // even dimmer — PH label as it fades

/** PIVOT (Beat 3) — pure void. */
export const CURSOR_COLOR = pulse.accent; // '#8B5CF6' violet cursor
export const CURSOR_GLOW = 'rgba(139,92,246,0.8)';

/** ANSWER palette (Beats 4–6) — silver, alive, clean. Derived from tokens. */
export const ANS_TEXT_HI = base.textPrimary; // '#E6EAF2' full white
export const ANS_TEXT_MD = base.textSecondary; // '#8F96A3' silver-grey
export const ANS_ACCENT = sentinel.accent; // '#D0D4DC' chrome silver
export const ANS_VIOLET = pulse.accent; // '#8B5CF6' violet
export const ANS_DIM = 'rgba(208,212,220,0.45)'; // dim silver — "ATHENA LABS"

export const GRAIN_OPACITY = 0.035;

/* ===========================================================================
   MOTION
   =========================================================================== */
/** The single house curve for ALL motion in this video. */
export const ease = Easing.bezier(...EASE_SMOOTH);

/** 0→1 eased ramp between two absolute frames, clamped both ends. */
export const ramp = (frame: number, a: number, b: number): number =>
  interpolate(frame, [a, b], [0, 1], {
    easing: ease,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

/** Linear 0→1 ramp (for dims that should not over/undershoot). */
export const lerp = (frame: number, a: number, b: number): number =>
  interpolate(frame, [a, b], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

/** Hard cursor blink: visible 12 frames, hidden 14 (period 26). */
export const cursorVisible = (frame: number): boolean => frame % 26 < 12;

/** Standard reveal duration (frames) and inter-line stagger. */
export const REVEAL_FRAMES = 14;
export const STAGGER = 16;

/* ===========================================================================
   SCENE BOUNDARIES (frames) — matches the SCENE TABLE exactly.
   =========================================================================== */
export const SCENES = {
  launch: { from: 0, to: 120 },
  machine: { from: 120, to: 270 },
  cut: { from: 270, to: 330 },
  answer: { from: 330, to: 540 },
  proof: { from: 540, to: 690 },
  close: { from: 690, to: 900 },
} as const;
