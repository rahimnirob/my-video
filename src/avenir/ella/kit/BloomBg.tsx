import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { EL } from '../palette';

/**
 * BloomBg — PROBLEM/END background for Ella: a tall emerald column that DRIFTS
 * horizontally and morphs, mint-white at the frame edges — a living gradient.
 * Two emerald ellipses drift on different slow phases for organic motion.
 * Forked from Ares BloomBg (blue → emerald).
 */
const BloomBg: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  const x1 = 50 + 10 * Math.sin(t * 0.45) + 4 * Math.sin(t * 0.97 + 1.3);
  const x2 = 50 - 8 * Math.sin(t * 0.38 + 0.7);
  const wob = 1 + 0.03 * Math.sin(t * 0.6);
  return (
    <AbsoluteFill style={{ background: EL.bloomBase }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse ${58 * wob}% 130% at ${x1}% 50%, ${EL.bloom} 0%, rgba(16,185,129,0.82) 32%, rgba(16,185,129,0.30) 56%, rgba(238,255,247,0) 80%)`,
        }}
      />
      <AbsoluteFill
        style={{ background: `radial-gradient(ellipse 40% 112% at ${x2}% 48%, rgba(16,185,129,0.34) 0%, rgba(16,185,129,0) 60%)` }}
      />
    </AbsoluteFill>
  );
};

export default BloomBg;
