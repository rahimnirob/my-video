/**
 * archived/constants.ts
 * ───────────────────────────────────────────────────────────────────────────
 * "17 PRODUCTS ARCHIVED" — a 24s (720f @ 30fps) pure kinetic-typography cut on
 * a FULLY WHITE field, closing on a cinematic reveal of the Billboard Sentinel.
 *
 * It opens as an appreciation post, not a sales post: an ARCHIVING announcement
 * that subverts "archive = ending" into "archive = permanence". Register =
 * restrained gold (not screaming orange).
 *
 * Typography law (founder direction for THIS film):
 *   • Background is ALWAYS pure white.
 *   • The animated gradient fills the WHOLE sentence — not just accent words
 *     (this is the deliberate departure from the onair KineticHeadline).
 *   • Gold is retuned DEEP so it reads on white (the onair white-anchored
 *     gradient would vanish here). Bronze anchors carry legibility; a bright
 *     gold band sweeps through as foil shimmer.
 *   • Everything is centered, sized for a comfortable ratio in the frame.
 *
 * Absolute-frame throughout. Scenes are all-mounted and self-clip to their own
 * windows (like PHComparison).
 * ───────────────────────────────────────────────────────────────────────────
 */
import type { CSSProperties } from 'react';
import { Easing, interpolate } from 'remotion';
import { EASE_SMOOTH } from '../tokens';
import { sora, mono } from '../tokens/fonts';

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const TOTAL_FRAMES = 1140; // 38s — tightened pacing, one effect per beat

/* ===========================================================================
   FONTS — the actually-loaded @remotion/google-fonts families.
   =========================================================================== */
export const SORA = sora;
export const MONO = mono;

/* ===========================================================================
   COLOR — the dark Billboard tech stage + a refined gold for dark.
   =========================================================================== */
/** Floor under the ambient image (tech.jpg) before it loads / at edges. */
export const BG_FLOOR = '#0a0405';

/**
 * The foil, retuned for a DARK stage and a HIGH-QUALITY, calm read:
 * a STATIC vertical metallic gold (highlight crown → gold → deep gold base).
 * No constant horizontal sweep in the base — the life comes from the word
 * kinematics. A subtle slow glint is layered on top by `goldFill()`.
 */
export const GOLD_METALLIC =
  'linear-gradient(180deg,' +
  ' #FCEEC8 0%,' + // top highlight crown
  ' #F3D389 26%,' +
  ' #E3B65C 52%,' +
  ' #C9963A 78%,' +
  ' #B07E28 100%)'; // deep base

/** Deep anchor tone — for the wordmark underline + any solid gold mark. */
export const GOLD_INK = '#C9963A';
export const GOLD_DEEP = '#8A5614';

/** Warm halo behind the outro character (cinematic grounding on the stage). */
export const EMBER_GLOW = 'rgba(224,120,72,0.34)';

/**
 * goldFill — the shared gold text fill. Static metallic base + a single soft
 * glint that drifts across VERY slowly (long period, low contrast) so it reads
 * as living foil without the distracting fast sweep of the first cut.
 */
export const goldFill = (frame: number, sheenPeriodF = 300): CSSProperties => {
  const t = (frame % sheenPeriodF) / sheenPeriodF; // 0..1
  const pos = 150 - 200 * t; // glint drifts left→right across the glyphs
  const sheen =
    'linear-gradient(100deg,' +
    ' rgba(255,251,238,0) 45%,' +
    ' rgba(255,253,246,0.26) 50%,' +
    ' rgba(255,251,238,0) 55%)';
  return {
    backgroundImage: `${sheen}, ${GOLD_METALLIC}`,
    backgroundSize: '260% 100%, 100% 100%',
    backgroundPosition: `${pos}% 0, 0 0`,
    backgroundRepeat: 'no-repeat',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
  };
};

/** Soft glow + legibility shadow so gold sits cleanly over the busy stage. */
export const GOLD_SHADOW =
  'drop-shadow(0 2px 2px rgba(0,0,0,0.55))' +
  ' drop-shadow(0 8px 26px rgba(0,0,0,0.45))' +
  ' drop-shadow(0 0 30px rgba(226,170,84,0.20))';

/* ===========================================================================
   EMBER — red + white typography (the new house look; matches onair + tech.jpg)
   White-hot crest sweeping through red. The shine is FAST and clearly visible —
   the life of the type lives in this moving band + the word kinematics.
   =========================================================================== */
/**
 * The onair closing-frames gradient (OnAirExplainer Frame07Offer): a flowing
 * white→peach→amber→ember→white sweep, white-anchored at both ends so a white
 * shimmer travels through the warm ember as it moves. THIS is the house in-text
 * gradient — the founder's reference look.
 */
export const ONAIR_GRADIENT =
  'linear-gradient(100deg, #FFFFFF 0%, #FFD9C2 30%, #F0A868 55%, #E85D3A 76%, #FFFFFF 100%)';

/**
 * emberFill — fills text with ONAIR_GRADIENT and FLOWS it via background-position
 * (same mechanic as the onair KineticHeadline). `periodF` = frames per cycle;
 * small = fast. onair uses ~700ms ≈ 21f.
 */
export const emberFill = (frame: number, periodF = 21): CSSProperties => {
  const cycle = Math.max(1, periodF);
  const x = -200 * ((frame % cycle) / cycle);
  return {
    backgroundImage: ONAIR_GRADIENT,
    backgroundSize: '200% auto',
    backgroundPosition: `${x}% center`,
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
  };
};

/** Edge glow — simple warm light around CRISP glyphs (never a full-word blur). */
export const EMBER_GLOW_EDGE =
  'drop-shadow(0 0 9px rgba(255,140,96,0.6))' +
  ' drop-shadow(0 0 26px rgba(232,93,58,0.46))' +
  ' drop-shadow(0 0 62px rgba(200,70,46,0.34))';

/** Restrained warm glow + legibility shadow for body/flow lines on the stage. */
export const EMBER_SHADOW =
  'drop-shadow(0 2px 3px rgba(0,0,0,0.6))' +
  ' drop-shadow(0 0 22px rgba(232,93,58,0.38))' +
  ' drop-shadow(0 0 60px rgba(200,70,46,0.26))';

/** Underline / solid-mark ember. */
export const EMBER_INK = '#E85D3A';

/* ===========================================================================
   MOTION
   =========================================================================== */
export const ease = Easing.bezier(...EASE_SMOOTH);

/** ms → frames at this comp's fps. */
export const f = (ms: number): number => Math.round((ms / 1000) * FPS);

/** 0→1 eased ramp between two absolute frames, clamped both ends. */
export const ramp = (frame: number, a: number, b: number): number =>
  interpolate(frame, [a, b], [0, 1], {
    easing: ease,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

/** Linear 0→1 ramp (for plain dims/fades that should not overshoot). */
export const lerp = (frame: number, a: number, b: number): number =>
  interpolate(frame, [a, b], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

/* ===========================================================================
   SCENE BOUNDARIES (absolute frames). Beats are from the founder's brief.
   The TURN (Season 02) is a HARD cut — the only one; the rest cross on the
   word reveal/exit so the white never breaks.
   =========================================================================== */
export const SCENES = {
  /** Beat 1 — COLD OPEN: "We archived 17 products today." Fast, one word/side at a time. */
  coldOpen: { from: 0, to: 100 },
  /** Beat 1b — RECAP: the whole sentence held normally (safety net). */
  recap: { from: 100, to: 185 },
  /** Beat 2 — THE REFRAME: flow + "That's the record." on the bottom-gradient (D). */
  reframe: { from: 185, to: 350 },
  /** Beat 3 — THE CONTRAST: fit-to-frame (A) + the 24h knife on blackout-swipe (B). */
  contrast: { from: 350, to: 655 },
  /** Beat 4 — THE TURN (hard cut): "Season 02 is now open." one-word punch (replace). */
  turn: { from: 655, to: 800 },
  /** Beat 5 — THE OFFER: "50 slots." on bottom-gradient (D) + the promise on flow. */
  offer: { from: 800, to: 985 },
  /** Beat 6 — CLOSE: cinematic Sentinel + AVENIR wordmark with the ember underline. */
  outro: { from: 985, to: 1140 },
} as const;
