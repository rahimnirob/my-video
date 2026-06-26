import React from 'react';
import { AbsoluteFill } from 'remotion';
import { FS } from '../foundersignal-tokens';
import FitSentence from '../kit/FitSentence';
import BlurText from '../kit/BlurText';

/**
 * Scene 1 — PROBLEM (s1 f0–108, s2 f108–198) on the violet bloom.
 * Line 1 uses the fit-in-sentence zoom-out ("Built" lands big, the line scales
 * down to fit as the words join); line 2 blur-builds. White text, "Nobody"/
 * "customers" flow the FounderSignal gradient.
 */
const Scene1Problem: React.FC<{ frame: number }> = ({ frame }) => {
  if (frame > 200) return null;
  return (
    <AbsoluteFill>
      {/* s1: "Built it. Nobody bought it." — FitSentence, accent "Nobody" */}
      <FitSentence text="Built it. Nobody bought it." startFrame={2} accentWord="Nobody" outAt={100} maxSize={340} minSize={84} onBloom />
      {/* s2: "Months wasted. Zero customers." — BlurText, accent "wasted" and "customers" */}
      <BlurText text="Months wasted. Zero customers." frame={frame} inAt={104} outAt={188} inDur={12} fontSize={110} color={FS.white} weight={700} emphasis={['wasted', 'customers']} accentMode="bloom" />
    </AbsoluteFill>
  );
};

export default Scene1Problem;
