import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { L } from '../ares-tokens';

/**
 * BloomBg — PROBLEM/END background, matched to the inspo: NOT a static circle but
 * a tall blue column that DRIFTS horizontally and morphs, white at the frame
 * edges — a living gradient. Two blue ellipses drift on different slow phases for
 * organic motion. Global frame (top-level) so the drift never resets.
 */
const BloomBg: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  const x1 = 50 + 10 * Math.sin(t * 0.45) + 4 * Math.sin(t * 0.97 + 1.3);
  const x2 = 50 - 8 * Math.sin(t * 0.38 + 0.7);
  const wob = 1 + 0.03 * Math.sin(t * 0.6);
  return (
    <AbsoluteFill style={{ background: L.bloomBase }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse ${58 * wob}% 130% at ${x1}% 50%, ${L.bloom} 0%, rgba(37,99,235,0.82) 32%, rgba(37,99,235,0.30) 56%, rgba(234,240,255,0) 80%)`,
        }}
      />
      <AbsoluteFill
        style={{ background: `radial-gradient(ellipse 40% 112% at ${x2}% 48%, rgba(37,99,235,0.34) 0%, rgba(37,99,235,0) 60%)` }}
      />
    </AbsoluteFill>
  );
};

export default BloomBg;
