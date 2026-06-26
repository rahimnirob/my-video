/**
 * avenir-tokens.ts
 * ───────────────────────────────────────────────────────────────────────────
 * THE single source of truth for every Avenir Remotion render.
 * Every component, background, and type animation inherits from this file.
 * Values are taken verbatim from BRAND_SYSTEM.md and BILLBOARD_REMOTION_SPEC.md.
 * If a hex / px / ms / easing differs anywhere else, TRUST THIS FILE.
 *
 * Assumes 30fps unless overridden. Use frames(ms) to convert durations.
 * ───────────────────────────────────────────────────────────────────────────
 */

export const FPS = 30;

/** Convert a duration in milliseconds to a frame count at the project fps. */
export const frames = (ms: number, fps: number = FPS): number =>
  Math.round((ms / 1000) * fps);

/* ===========================================================================
   COLOR — BASE PALETTE (shared across all systems)
   =========================================================================== */
export const base = {
  bgBase:      '#07090D', // page background (near-black, slight blue cast)
  bgElevated:  '#0B0E12', // panels and cards
  bgSurface:   '#0F1218', // sub-surfaces
  glassBg:     'rgba(255,255,255,0.04)',
  glassBorder: 'rgba(255,255,255,0.08)',
  textPrimary:   '#E6EAF2',
  textSecondary: '#8F96A3',
  textDim:       'rgba(230,234,242,0.5)',
  textMuted:     '#555B69',
} as const;

/* ===========================================================================
   COLOR — THE FOUR SYSTEM THEMES
   Base palette stays constant; the accent changes per system.
   =========================================================================== */

/** 1. SENTINEL — chrome / mono. Home, Sentinel character, Frame system. */
export const sentinel = {
  accent:      '#D0D4DC', // silver / chrome
  textBright:  '#F0F2F5',
  white:       '#FFFFFF',
  silver:      '#C8CCD4',
} as const;

/** 2. PULSE + MARKETS — plasma violet (shared theme). */
export const pulse = {
  accent:      '#8B5CF6',
  accentHover: '#A78BFA',
  accentGlow:  'rgba(139,92,246,0.5)',
  accentSoft:  'rgba(139,92,246,0.15)',
  accentSubtle:'rgba(139,92,246,0.08)',
} as const;
export const markets = pulse; // identical theme

/** 3. PICKS — editorial gold. "We wrote about this." Appears nowhere else. */
export const picks = {
  accent: '#E2C067',
  hover:  '#F0D080',
} as const;

/** 4. BILLBOARD — broadcast orange (orange-red, NOT pure red). Use sparingly. */
export const billboard = {
  primary:   '#E85D3A', // the only color for live state, primary CTA, accent bars
  secondary: '#F0A868', // progress-bar tail, warm amber-orange
  ember:     '#FF6B47', // hover state
  redDepth:  '#C23B22', // slot-counter gradients
  gold:      '#F5C54E', // rare premium accent
  glow:      'rgba(232,93,58,0.5)',
  onAirRed:  '#ef4444', // ONLY for the ON AIR pulse dot (canonical live red)
  // Billboard surface bases (deeper than the rest of Avenir)
  void:      '#020304', // the pitch-black floor
  bgBase:    '#060809', // ticker bar bg
  bgInner:   '#050608', // player / ticker copy fade base
  bgCard:    '#080a0d', // cinema-card radial base
  // Billboard text scale
  textHi:    '#F0F2F4',
  textMd:    '#8A95A5',
  textLo:    '#3E4650',
  textDim:   '#1E2530',
  // Billboard borders
  border:    '#1a1f26',
  borderHi:  '#252c36',
} as const;

/* ===========================================================================
   COLOR — STATUS (shared)
   =========================================================================== */
export const status = {
  success: '#22c55e',
  error:   '#ef4444',
  warning: '#f59e0b',
} as const;

/* ===========================================================================
   TYPOGRAPHY
   Three fonts, hard rules. Sora = personality. Manrope = substrate.
   JetBrains Mono = "this is a system speaking" (never body copy).
   =========================================================================== */
export const font = {
  sora:    "var(--font-sora), 'Sora', sans-serif",       // headings, button labels
  manrope: "var(--font-manrope), 'Manrope', sans-serif",  // body, descriptions
  mono:    "'JetBrains Mono', 'Fira Code', monospace",    // telemetry, Billboard labels/CTAs
} as const;

/** Tracking rules from BRAND_SYSTEM.md */
export const tracking = {
  headlineTight: '-0.02em', // large Sora headlines
  headline:      '-0.01em',
  bodyNormal:    '0em',
  microLabel:    '0.20em',  // JetBrains Mono uppercase micro-labels (0.18–0.22em)
  wordmark:      '0.24em',  // AVENIR wordmark (0.22–0.25em) — the signature wide tracking
  billboardCS:   '0.22em',  // BILLBOARD call-sign label
} as const;

/** Type scale (px). Headlines Sora 700; section labels mono 10–11; body Manrope 13–16. */
export const type = {
  heroXl:        { family: font.sora, weight: 800, size: 240, tracking: tracking.wordmark },
  headingXl:     { family: font.sora, weight: 700, size: 64,  tracking: tracking.headlineTight },
  headingLg:     { family: font.sora, weight: 700, size: 44,  tracking: tracking.headlineTight },
  headingMd:     { family: font.sora, weight: 700, size: 28,  tracking: tracking.headline },
  microLabel:    { family: font.mono, weight: 500, size: 11,  tracking: tracking.microLabel, uppercase: true },
  body:          { family: font.manrope, weight: 400, size: 16, lineHeight: 1.6 },
  bodySm:        { family: font.manrope, weight: 400, size: 13, lineHeight: 1.6 },
  telemetryVal:  { family: font.mono, weight: 500, size: 14 },
  telemetryLabel:{ family: font.mono, weight: 500, size: 10, tracking: tracking.microLabel, uppercase: true },
} as const;

/* ===========================================================================
   MOTION — EASING + DURATIONS
   --ease-smooth is the house curve. Linear is forbidden for signature motion.
   =========================================================================== */

/** Remotion-ready bezier args for the house curve. Use with Easing.bezier(...EASE_SMOOTH). */
export const EASE_SMOOTH = [0.16, 1, 0.3, 1] as const;

/** Slot-counter fill uses a slightly different curve (from spec). */
export const EASE_SLOT = [0.22, 1, 0.36, 1] as const;

export const duration = {
  micro: 200, // button hovers, focus rings
  panel: 350, // panel slides, modal opens
  page:  500, // page transitions
} as const;

/** Common reveal/animation timings (ms) from the docs + Billboard spec. */
export const motion = {
  // Hero / brand reveals: opacity + slight Y, 700–1200ms, stagger 100–300ms
  heroRevealMin: 700,
  heroRevealMax: 1200,
  staggerMin: 100,
  staggerMax: 300,
  // Billboard signature timings
  imageFadeIn:   1600, // Tech Aesthetic ambient image opacity 0→1
  watermarkIn:   1400, // "Billboard" watermark, delay 200ms
  watermarkDelay: 200,
  playerEnterY:  16,   // px, player slides up 16→0
  playerEnter:   700,
  onAirCycle:    2000, // ON AIR pulse loop
  conicSpin:     8000, // player border conic-gradient full rotation
  tickerPage:    60000,// page-level bottom ticker loop
  tickerPlayer:  30000,// player-internal ticker loop
  slotFill:      1200, // slot-counter width fill
  filmGrainStep: 500,  // grain position shift cadence
  applyOrbit:    18000,// apply-orbit text spin
} as const;

/** Card hover: translateY only (never scale) + soft glow. */
export const cardHover = {
  translateYMin: -2, // px
  translateYMax: -4, // px
  // glow shadow applied per-system using that system's accentGlow
} as const;

/* ===========================================================================
   BILLBOARD STAGE — composited background recipe (from BILLBOARD_REMOTION_SPEC §1)
   Layers 0–5 composite as a static AbsoluteFill; layers 6+ are overlay tracks.
   =========================================================================== */
export const billboardStage = {
  ambientImage: {
    src: '/assets/Tech Aesthetic.jpeg',
    opacity: 0.6,
    filter: 'brightness(0.92) saturate(0.95)',
    objectPosition: 'center center',
  },
  sculptVertical:
    'linear-gradient(180deg, rgba(2,3,4,0.55) 0%, rgba(2,3,4,0.08) 22%, rgba(2,3,4,0.04) 50%, rgba(2,3,4,0.45) 78%, rgba(2,3,4,0.9) 100%)',
  sculptHorizontal:
    'linear-gradient(90deg, rgba(2,3,4,0.5) 0%, transparent 30%, transparent 70%, rgba(2,3,4,0.5) 100%)',
  topFade:
    'linear-gradient(180deg, rgba(2,3,4,0.5) 0%, transparent 100%)', // height 14%
  watermark: {
    text: 'Billboard',
    family: font.sora,
    weight: 800,
    size: 'clamp(44px, 13vw, 240px)',
    letterSpacing: '0.08em',
    lineHeight: 0.9,
    transform: 'translateY(-2%)',
    fill: 'linear-gradient(180deg, rgba(240,242,244,0.36) 0%, rgba(240,242,244,0.18) 50%, rgba(232,93,58,0.22) 100%)',
    stroke: '1px rgba(240,242,244,0.08)',
    textShadow: '0 0 140px rgba(232,93,58,0.18), 0 0 60px rgba(240,242,244,0.06)',
  },
  player: {
    maxWidth: 1024,            // max-w-5xl
    aspect: '21 / 9',          // use 21:9 at full res for Remotion
    radius: 12,
    bg: 'rgba(5,6,8,0.55)',
    backdropBlur: 8,
  },
  vignette:
    'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 20%, rgba(5,6,8,0.6) 100%)',
} as const;

/* ===========================================================================
   FILM GRAIN + SCANLINES (optional atmosphere, Billboard register only)
   =========================================================================== */
export const atmosphere = {
  grain: {
    tileSize: 200,    // px noise PNG, tiled
    opacity: 0.035,
    stepMs: motion.filmGrainStep,
  },
  scanlines:
    'repeating-linear-gradient(0deg, transparent 2px, rgba(255,255,255,0.008) 2px, rgba(255,255,255,0.008) 4px)',
} as const;

/* ===========================================================================
   TWO PRODUCTION REGISTERS (the strategic split — see CAMPAIGN_01)
   The library produces in ONE of these two registers per scene.
   =========================================================================== */
export const REGISTER = {
  /** V2 — earns reach. Recognition-first, founder-voice, fast, sharp-not-flashy.
   *  Minimal motion, text-forward, Sentinel/terminal coding, no spectacle. */
  RAW: 'raw',
  /** V1 — converts warm viewers. Full cinematic Billboard broadcast register:
   *  the real player, telemetry, ON AIR, ticker, conic halo, grain. */
  CINEMATIC: 'cinematic',
} as const;
export type Register = (typeof REGISTER)[keyof typeof REGISTER];

/* ===========================================================================
   CONVENIENCE: theme lookup by system
   =========================================================================== */
export const theme = {
  sentinel,
  pulse,
  markets,
  picks,
  billboard,
} as const;

export const tokens = {
  FPS, frames, base, theme, sentinel, pulse, markets, picks, billboard,
  status, font, tracking, type, EASE_SMOOTH, EASE_SLOT, duration, motion,
  cardHover, billboardStage, atmosphere, REGISTER,
} as const;

export default tokens;
