import React from 'react';
import { AbsoluteFill } from 'remotion';
import { L } from '../ares-tokens';
import FitSentence from '../kit/FitSentence';
import BlurText from '../kit/BlurText';

/**
 * Scene 1 — PROBLEM (s1 f0–108, s2 f108–198) on the blue bloom. Line 1 uses the
 * fit-in-sentence zoom-out ("Still" lands big, the line scales down to fit as the
 * words join); line 2 blur-builds. White text, "ten"/"day" flow the Ares gradient.
 */
const Scene1Problem: React.FC<{ frame: number }> = ({ frame }) => {
  if (frame > 200) return null;
  return (
    <AbsoluteFill>
      <FitSentence text="Still juggling ten tools at once?" startFrame={2} accentWord="ten" outAt={100} maxSize={340} minSize={84} onBloom />
      <BlurText text="Switching tabs all day." frame={frame} inAt={104} outAt={188} inDur={12} fontSize={110} color={L.white} weight={700} emphasis={['day']} accentMode="bloom" />
    </AbsoluteFill>
  );
};

export default Scene1Problem;
