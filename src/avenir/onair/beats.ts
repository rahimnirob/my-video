/**
 * onair/beats.ts — the 7-beat frame layout (§6, @30fps). Tuned at assembly.
 * Only beats that are built get rendered in OnAirExplainer.
 */
/** Frames the next beat overlaps the previous one by (cross-dissolve). */
export const XFADE = 16;

export const BEATS = {
  hook: { from: 0, durationInFrames: 130 }, // 00 HOOK (typographic cold-open)
  launch: { from: 114, durationInFrames: 225 }, // 01 LAUNCH (overlaps 00 by XFADE)
  midnight: { from: 324, durationInFrames: 215 }, // 02 MIDNIGHT (overlaps 01 by XFADE)
  graveyard: { from: 524, durationInFrames: 250 }, // 03 GRAVEYARD (overlaps 02 by XFADE)
  turn: { from: 774, durationInFrames: 235 }, // 04 TURN (back-to-back: card→card, no double)
  onair: { from: 994, durationInFrames: 255 }, // 05 ON AIR (overlaps 04 by XFADE)
  proof: { from: 1234, durationInFrames: 205 }, // 06 PROOF (overlaps 05 by XFADE)
  offer: { from: 1424, durationInFrames: 235 }, // 07 OFFER (overlaps 06 by XFADE)
} as const;

export const TOTAL_FRAMES = 1659;
