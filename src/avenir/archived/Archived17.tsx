import React from 'react';
import { AbsoluteFill } from 'remotion';
import { BG_FLOOR } from './constants';
import { StageBg } from './components';
import { ColdOpen, HookRecap, Reframe, Contrast, Turn, Offer, Outro } from './scenes';

/**
 * Archived17 — "17 PRODUCTS ARCHIVED".
 * ~43s (1280f @ 30fps), 1920×1080, mute-first kinetic typography on the dark
 * Billboard tech stage. Opens as an appreciation post and turns an archiving
 * announcement into proof of permanence, closing on a cinematic Sentinel + the
 * AVENIR wordmark.
 *
 * Words are delivered ONE AT A TIME (replace + slowed flow), spring-settled, in
 * a calm metallic gold. All scenes are always mounted and self-clip via their
 * KineticText enter/exit windows (same pattern as PHComparison).
 */
export const Archived17: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: BG_FLOOR }}>
      <StageBg />
      <ColdOpen />
      <HookRecap />
      <Reframe />
      <Contrast />
      <Turn />
      <Offer />
      <Outro />
    </AbsoluteFill>
  );
};

export default Archived17;
