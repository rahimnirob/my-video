import React from 'react';
import { AbsoluteFill } from 'remotion';
import { EL } from '../palette';
import FitSentence from '../kit/FitSentence';
import BlurText from '../kit/BlurText';

/**
 * Scene 1 — PROBLEM (s1 f0–108, s2 f108–198) on the emerald bloom.
 * Line 1 uses the fit-in-sentence zoom-out ("You" lands big, the line scales
 * down to fit as the words join); line 2 blur-builds. White text, "Nobody"/
 * "Wasted" flow the Ella gradient.
 */
const Scene1Problem: React.FC<{ frame: number }> = ({ frame }) => {
  if (frame > 200) return null;
  return (
    <AbsoluteFill>
      {/* s1: "You built it. Nobody came." — FitSentence, accent "Nobody" */}
      <FitSentence text="You built it. Nobody came." startFrame={2} accentWord="Nobody" outAt={100} maxSize={340} minSize={84} onBloom />
      {/* s2: "Months of work. Wasted." — BlurText, accent "Wasted" */}
      <BlurText text="Months of work. Wasted." frame={frame} inAt={104} outAt={188} inDur={12} fontSize={110} color={EL.white} weight={700} emphasis={['Wasted']} accentMode="bloom" />
    </AbsoluteFill>
  );
};

export default Scene1Problem;
