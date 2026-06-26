import React from 'react';
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import {
  EASE_SLOT,
  REGISTER,
  billboard,
  frames,
  motion,
} from '../../tokens';

export const register = REGISTER.CINEMATIC;

export type SlotCounterProps = {
  fillPercent: number; // 0–100
  delayFrames?: number;
  height?: number;
  width?: number | string;
};

const SlotCounter: React.FC<SlotCounterProps> = ({
  fillPercent,
  delayFrames = 0,
  height = 2,
  width = 320,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ease = Easing.bezier(...EASE_SLOT);
  const inF = frames(motion.slotFill, fps);
  const local = frame - delayFrames;

  const w = interpolate(local, [0, inF], [0, fillPercent], {
    easing: ease,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'relative',
        width,
        height,
        background: billboard.border,
        borderRadius: height,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: `${w}%`,
          height: '100%',
          background: `linear-gradient(90deg, ${billboard.redDepth}, ${billboard.primary})`,
          boxShadow: `0 0 12px rgba(232, 93, 58, 0.4)`,
        }}
      />
    </div>
  );
};

export default SlotCounter;
