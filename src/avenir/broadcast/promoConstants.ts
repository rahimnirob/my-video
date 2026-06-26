/**
 * promoConstants.ts — timing + scene boundaries for BillboardPromo.
 * 13 beats tiling 0→1071 (35.7s @30fps).
 * Arc: hook → alternatives → bridge → decay → apply → player → forever → features → production → kinetic → automation → grid → outro
 */
import { Easing, interpolate } from 'remotion';

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const TOTAL_FRAMES = 1071;

export const EASE_SMOOTH = [0.16, 1, 0.3, 1] as [number, number, number, number];
export const ease = Easing.bezier(...EASE_SMOOTH);

export const ramp = (frame: number, a: number, b: number): number =>
  interpolate(frame, [a, b], [0, 1], {
    easing: ease,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

export const SCENES = {
  hook:         { from: 0,   to: 30  },  // S1  "Launch." on bloom
  alternatives: { from: 30,  to: 135 },  // S2  Rolling channels list, cursor picks Billboard
  bridge:       { from: 135, to: 165 },  // S3  "without the" center text
  decay:        { from: 165, to: 204 },  // S4  "24-hour decay" zoom-out on bloom
  apply:        { from: 204, to: 240 },  // S5  /billboard/apply form, cursor clicks submit
  player:       { from: 240, to: 360 },  // S6  Live broadcast player showcase
  forever:      { from: 360, to: 444 },  // S7  "your launch lasts forever"
  features:     { from: 444, to: 510 },  // S8  Curved 3D features list
  production:   { from: 510, to: 660 },  // S9  Briefing & production editor
  kinetic:      { from: 660, to: 840 },  // S10 Rapid-fire words
  automation:   { from: 840, to: 906 },  // S11 Automation queue
  grid:         { from: 906, to: 975 },  // S12 Season 01 archive
  outro:        { from: 975, to: 1071 }, // S13 Brand lockup
} as const;
