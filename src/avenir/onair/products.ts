/**
 * onair/products.ts
 * ───────────────────────────────────────────────────────────────────────────
 * The real products that appear in the film. Lumen is the protagonist (§3).
 * Each carries its own aurora (the per-product color identity, §7 ProductCard).
 * ───────────────────────────────────────────────────────────────────────────
 */
import { pulse } from '../tokens';
import { lumenAurora } from './palette';

export type Product = {
  name: string;
  desc: string;
  /** CSS background for the aurora layer. */
  aurora: string;
  /** The product's accent — drives the left spine, outer glow, shine tint. */
  accent: string;
  /** Status pill label + dot color. */
  pillLabel: string;
  pillDot: string;
  /** Mono stat line shown under the desc (bold token marked with **). */
  stat: string;
};

export const LUMEN: Product = {
  name: 'Lumen',
  desc: 'AI writing companion for founders.',
  aurora: lumenAurora,
  accent: pulse.accent, // violet #8B5CF6
  pillLabel: 'LIVE',
  pillDot: '#34d399', // green
  stat: 'day **1** · launch',
};

/** Billboard-era Lumen — branding warms to ember to match the broadcast world. */
export const LUMEN_ONAIR: Product = {
  ...LUMEN,
  aurora:
    'radial-gradient(120% 90% at 80% 20%, rgba(255,140,90,.58), transparent 55%),' +
    'radial-gradient(120% 110% at 16% 96%, rgba(232,93,58,.62), transparent 58%),' +
    'radial-gradient(95% 85% at 58% 62%, rgba(245,158,11,.34), transparent 62%)',
  accent: '#E85D3A',
  pillLabel: 'BACK ON AIR',
  pillDot: '#E85D3A',
};
