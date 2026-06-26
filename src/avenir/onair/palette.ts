/**
 * onair/palette.ts
 * ───────────────────────────────────────────────────────────────────────────
 * Colors specific to the OnAirExplainer that aren't in avenir-tokens.ts.
 * Tokens are the source of truth for everything shared; this file only holds
 * values unique to the film (the cold-world void, the per-product aurora
 * colors, and the caption gradients) — all taken verbatim from the frame demos.
 * ───────────────────────────────────────────────────────────────────────────
 */
import { billboard, pulse, sentinel } from '../tokens';

/** Cold old-world background (frames 01–03). Distinct from billboard.void (#020304). */
export const OLD_VOID = '#020305';

/** Lumen's aurora — its product color identity (violet/blue per §4). */
export const lumenAurora =
  'radial-gradient(120% 90% at 80% 20%, rgba(96,165,250,.50), transparent 55%),' + // blue
  'radial-gradient(120% 110% at 16% 96%, rgba(139,92,246,.58), transparent 58%),' + // violet
  'radial-gradient(95% 85% at 58% 62%, rgba(124,58,237,.34), transparent 62%)'; // deep violet

/** Caption gradient + accents per narration subject (§4 color law). */
export const captionSubject = {
  // Lumen era: white → lavender → violet.
  lumen: {
    gradient: `linear-gradient(100deg, ${sentinel.textBright} 0%, #C9B8F5 38%, ${pulse.accent} 60%, ${sentinel.textBright} 100%)`,
    pre: pulse.accent, // the >>> prefix
    cursor: '#C9B8F5', // lavender
    glow: 'rgba(139,92,246,.12)',
  },
  // Billboard era: white → peach → orange (for beats 04+).
  billboard: {
    gradient: `linear-gradient(100deg, ${billboard.textHi} 0%, ${billboard.secondary} 42%, ${billboard.primary} 64%, ${billboard.textHi} 100%)`,
    pre: billboard.primary,
    cursor: billboard.secondary,
    glow: 'rgba(232,93,58,.14)',
  },
  // Product Hunt — its OWN orange→red, the color that dies (hook only). Kept
  // distinct from Avenir ember so PH's color is visibly the one that drains.
  ph: {
    gradient: 'linear-gradient(100deg, #FF8A7E 0%, #FF6154 40%, #DA552F 80%, #FF6154 100%)',
    pre: '#FF6154',
    cursor: '#FF6154',
    glow: 'rgba(255,97,84,.16)',
  },
} as const;

/** Cold caption white for the non-subject runs of a line. */
export const CAPTION_WHITE = '#EAF0FF';

export type CaptionSubject = keyof typeof captionSubject;
