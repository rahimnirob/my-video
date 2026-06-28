import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';

/**
 * BloomBg — PROBLEM/END background for Billboard Promo: a red/black drifted gradient
 * with two red ellipses that move for a living signal effect.
 */
const BloomBg: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  const x1 = 50 + 10 * Math.sin(t * 0.45) + 4 * Math.sin(t * 0.97 + 1.3);
  const x2 = 50 - 8 * Math.sin(t * 0.38 + 0.7);
  const wob = 1 + 0.03 * Math.sin(t * 0.6);

  return (
    <AbsoluteFill style={{ background: '#0C0C0E' }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse ${58 * wob}% 130% at ${x1}% 50%, rgba(239,68,68,0.98) 0%, rgba(191,18,18,0.84) 32%, rgba(153,27,27,0.38) 56%, rgba(12,12,14,0) 80%)`,
        }}
      />
      <AbsoluteFill
        style={{ background: `radial-gradient(ellipse 40% 112% at ${x2}% 48%, rgba(239,68,68,0.42) 0%, rgba(239,68,68,0) 60%)` }}
      />
      <AbsoluteFill
        style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,0.16) 0%, transparent 45%, rgba(0,0,0,0.25) 100%)',
        }}
      />
    </AbsoluteFill>
  );
};

export default BloomBg;
