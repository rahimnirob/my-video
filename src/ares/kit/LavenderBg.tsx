import React from 'react';
import { AbsoluteFill } from 'remotion';
import { L } from '../ares-tokens';

/**
 * LavenderBg — the reference's PRODUCT/UI background: a flat, calm light-lavender
 * field with a barely-there top sheen so white cards read with depth.
 */
const LavenderBg: React.FC = () => (
  <AbsoluteFill style={{ background: L.bg }}>
    <AbsoluteFill style={{ background: 'radial-gradient(ellipse 90% 70% at 50% 30%, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 60%)' }} />
  </AbsoluteFill>
);

export default LavenderBg;
