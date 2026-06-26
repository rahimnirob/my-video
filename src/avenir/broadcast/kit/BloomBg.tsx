import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { BB } from '../palette';

/**
 * BloomBg — PROBLEM/END background for Billboard Promo: a tall orange column that DRIFTS
 * horizontally and morphs, orange-white at the frame edges — a living gradient.
 * Two orange ellipses drift on different slow phases for organic motion.
 */
const BloomBg: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  
  const x1 = 50 + 10 * Math.sin(t * 0.45) + 4 * Math.sin(t * 0.97 + 1.3);
  const x2 = 50 - 8 * Math.sin(t * 0.38 + 0.7);
  const wob = 1 + 0.03 * Math.sin(t * 0.6);
  return (
    <AbsoluteFill style={{ background: BB.bloomBase }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse ${58 * wob}% 130% at ${x1}% 50%, ${BB.bloom} 0%, rgba(232,93,58,0.82) 32%, rgba(232,93,58,0.30) 56%, rgba(255,248,246,0) 80%)`,
        }}
      />
      <AbsoluteFill
        style={{ background: `radial-gradient(ellipse 40% 112% at ${x2}% 48%, rgba(232,93,58,0.34) 0%, rgba(232,93,58,0) 60%)` }}
      />
    </AbsoluteFill>
  );
};

export default BloomBg;
