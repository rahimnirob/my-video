import React from 'react';
import { AbsoluteFill } from 'remotion';
import { BG } from './constants';
import { GrainOverlay, Vignette } from './components';
import { S1Launch, S2Machine, S3Cut, S4Answer, S5Proof, S6Close } from './scenes';

/**
 * PHComparison — 30s (900f @ 30fps) pure kinetic-typography cut.
 * Mute-first. Color carries the narrative: PROBLEM dim/warm → PIVOT violet void
 * → ANSWER silver/alive. All six scenes are always mounted and self-clip to
 * their own frame windows (S2→S3 is a hard cut; everything else is continuous).
 */
export const PHComparison: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      <S1Launch />
      <S2Machine />
      <S3Cut />
      <S4Answer />
      <S5Proof />
      <S6Close />

      {/* Atmosphere — always on, above content, non-interactive. */}
      <Vignette />
      <GrainOverlay />
    </AbsoluteFill>
  );
};

export default PHComparison;
