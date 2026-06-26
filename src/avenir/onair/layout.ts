/**
 * onair/layout.ts
 * ───────────────────────────────────────────────────────────────────────────
 * Shared geometry for the OnAirExplainer — now 1920×1080 (16:9), mute-first.
 *
 * Element pixel sizes are kept tuned via S (decoupled from the comp width), so
 * cards/dials/type stay the size they were dialled in at; only per-scene LAYOUT
 * (positions across the wider frame) changes for 16:9. Percentage positions are
 * relative to the comp, so they were re-placed per scene for landscape.
 * ───────────────────────────────────────────────────────────────────────────
 */

export const COMP = { width: 1920, height: 1080, fps: 30 } as const;

/** Demo authoring width (the frame demos were drawn in a 412px box). */
const DEMO_W = 412;

/** Element scale — fixed (≈2.62), independent of the 16:9 comp width. */
export const S = 1080 / DEMO_W;

/** Scale a demo px value into render px. */
export const s = (n: number): number => n * S;
