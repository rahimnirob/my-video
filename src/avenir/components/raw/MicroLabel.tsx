import React from 'react';
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import {
  EASE_SMOOTH,
  REGISTER,
  base,
  duration,
  frames,
  tracking,
  mono,
} from '../../tokens';

export const register = REGISTER.RAW;

export type MicroLabelProps = {
  text: string;
  delayFrames?: number;
  /** Override the default `duration.micro` (ms) entrance. */
  durationMs?: number;
  /** Override accent / color. Defaults to dim secondary. */
  color?: string;
  size?: number;
};

const MicroLabel: React.FC<MicroLabelProps> = ({
  text,
  delayFrames = 0,
  durationMs = duration.micro,
  color = base.textSecondary,
  size = 11,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ease = Easing.bezier(...EASE_SMOOTH);
  const local = frame - delayFrames;
  const inF = frames(durationMs, fps);

  const wipe = interpolate(local, [0, inF], [0, 1], {
    easing: ease,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <span
      style={{
        fontFamily: mono,
        fontSize: size,
        fontWeight: 500,
        textTransform: 'uppercase',
        letterSpacing: tracking.microLabel,
        color,
        display: 'inline-block',
        clipPath: `inset(0 ${(1 - wipe) * 100}% 0 0)`,
      }}
    >
      {text}
    </span>
  );
};

export default MicroLabel;
