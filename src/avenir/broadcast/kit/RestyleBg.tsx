import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import FieldBg from './FieldBg';
import BloomBg from './BloomBg';

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

/**
 * RestyleBg — the single, continuous background for the Billboard promo video.
 * Cross-dissolves dynamically between the warm FieldBg (light UI beats) and
 * BloomBg (Broadcast Orange bloom) matching the scene flow.
 */
const RestyleBg: React.FC = () => {
  const f = useCurrentFrame();
  
  let bloomOp = 1;
  
  if (f < 30) {
    bloomOp = 1;
  } else if (f >= 30 && f < 40) {
    bloomOp = interpolate(f, [30, 40], [1, 0], clamp);
  } else if (f >= 40 && f < 155) {
    bloomOp = 0;
  } else if (f >= 155 && f < 165) {
    bloomOp = interpolate(f, [155, 165], [0, 1], clamp);
  } else if (f >= 165 && f < 350) {
    bloomOp = 1;
  } else if (f >= 350 && f < 360) {
    bloomOp = interpolate(f, [350, 360], [1, 0], clamp);
  } else if (f >= 360 && f < 434) {
    bloomOp = 0;
  } else if (f >= 434 && f < 444) {
    bloomOp = interpolate(f, [434, 444], [0, 1], clamp);
  } else if (f >= 444 && f < 686) {
    bloomOp = 1;
  } else if (f >= 686 && f < 696) {
    bloomOp = interpolate(f, [686, 696], [1, 0], clamp);
  } else if (f >= 696 && f < 716) {
    bloomOp = 0;
  } else if (f >= 716 && f < 726) {
    bloomOp = interpolate(f, [716, 726], [0, 1], clamp);
  } else if (f >= 726 && f < 746) {
    bloomOp = 1;
  } else if (f >= 746 && f < 756) {
    bloomOp = interpolate(f, [746, 756], [1, 0], clamp);
  } else if (f >= 756 && f < 830) {
    bloomOp = 0;
  } else if (f >= 830 && f < 840) {
    bloomOp = interpolate(f, [830, 840], [0, 1], clamp);
  } else {
    bloomOp = 1;
  }

  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      <FieldBg />
      <AbsoluteFill style={{ opacity: bloomOp }}>
        <BloomBg />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export default RestyleBg;
