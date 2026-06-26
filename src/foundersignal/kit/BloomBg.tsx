import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { FS } from '../foundersignal-tokens';

/**
 * BloomBg — PROBLEM/END background for FounderSignal: a tall violet column that DRIFTS
 * horizontally and morphs, near-black at the frame edges — a living gradient.
 * Two violet ellipses drift on different slow phases for organic motion.
 * Adapted from Ella BloomBg (emerald → violet).
 */
const BloomBg: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  const x1 = 50 + 10 * Math.sin(t * 0.45) + 4 * Math.sin(t * 0.97 + 1.3);
  const x2 = 50 - 8 * Math.sin(t * 0.38 + 0.7);
  const wob = 1 + 0.03 * Math.sin(t * 0.6);
  return (
    <AbsoluteFill style={{ background: FS.bloomBase }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse ${58 * wob}% 130% at ${x1}% 50%, ${FS.bloom} 0%, rgba(124,58,237,0.82) 32%, rgba(124,58,237,0.30) 56%, rgba(13,13,24,0) 80%)`,
        }}
      />
      <AbsoluteFill
        style={{ background: `radial-gradient(ellipse 40% 112% at ${x2}% 48%, rgba(124,58,237,0.34) 0%, rgba(124,58,237,0) 60%)` }}
      />
    </AbsoluteFill>
  );
};

export default BloomBg;
