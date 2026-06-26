import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import LavenderBg from './LavenderBg';
import BloomBg from './BloomBg';

/**
 * RestyleBg — the single, continuous background for the whole video. Lavender is
 * the base; the blue bloom rides on top and cross-dissolves ONLY at the two real
 * boundaries (bloom→lavender f188–198, lavender→bloom f704–714). One continuous
 * lavender run between — no needless re-dissolves. Global frame.
 */
const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

const RestyleBg: React.FC = () => {
  const f = useCurrentFrame();
  const bloomOp =
    f < 188 ? 1 : f < 198 ? interpolate(f, [188, 198], [1, 0], clamp) : f < 704 ? 0 : f < 714 ? interpolate(f, [704, 714], [0, 1], clamp) : 1;
  return (
    <AbsoluteFill>
      <LavenderBg />
      <AbsoluteFill style={{ opacity: bloomOp }}>
        <BloomBg />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export default RestyleBg;
