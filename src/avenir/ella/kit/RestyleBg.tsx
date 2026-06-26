import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import FieldBg from './FieldBg';
import BloomBg from './BloomBg';

/**
 * RestyleBg — the single, continuous background for the whole Ella video. Field
 * is the base; the emerald bloom rides on top and cross-dissolves ONLY at the
 * two real boundaries:
 *   bloom→field  f188–198  (s2 PROBLEM-B → s3 INTRODUCING)
 *   field→bloom  f704–714  (s7 PROCESSING → s8 CLOSE)
 * One continuous field run between — no needless re-dissolves.
 * Forked from Ares RestyleBg with identical math.
 */
const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

const RestyleBg: React.FC = () => {
  const f = useCurrentFrame();
  const bloomOp =
    f < 188 ? 1 : f < 198 ? interpolate(f, [188, 198], [1, 0], clamp) : f < 704 ? 0 : f < 714 ? interpolate(f, [704, 714], [0, 1], clamp) : 1;
  return (
    <AbsoluteFill>
      <FieldBg />
      <AbsoluteFill style={{ opacity: bloomOp }}>
        <BloomBg />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export default RestyleBg;
