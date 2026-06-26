/**
 * onair/world.ts — the controllable "world" state (replaces the bg image).
 * Each beat renders <Bloom> with one of these states; because beats share the
 * exact same values at their boundaries, cuts stay perfectly in sync.
 */

export type BloomState = { rgb: string; intensity: number };

export const BLOOM = {
  /** Violet, alive — the launch world (Frame 01 → start of 02). */
  life: { rgb: '139,92,246', intensity: 1.0 } as BloomState,
  /** Cold grey-blue, dim — the day has ended (end of 02 → start of 03). */
  drained: { rgb: '78,86,104', intensity: 0.36 } as BloomState,
  /** Near-dark — buried in the graveyard (end of 03). */
  dead: { rgb: '54,60,76', intensity: 0.1 } as BloomState,
};

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Mix two 'r,g,b' strings. */
export const mixRgb = (a: string, b: string, t: number): string => {
  const pa = a.split(',').map(Number);
  const pb = b.split(',').map(Number);
  return pa.map((v, i) => Math.round(v + (pb[i] - v) * t)).join(',');
};

/** Interpolate a whole bloom state. */
export const mixBloom = (a: BloomState, b: BloomState, t: number): BloomState => ({
  rgb: mixRgb(a.rgb, b.rgb, t),
  intensity: lerp(a.intensity, b.intensity, t),
});
