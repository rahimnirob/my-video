import React from 'react';
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import {
  EASE_SMOOTH,
  REGISTER,
  base,
  duration,
  frames,
} from '../../tokens';

export const register = REGISTER.RAW;

export type DividerProps = {
  delayFrames?: number;
  /** Mask-grow duration (ms). */
  durationMs?: number;
  /** Total length in px (or pass 100% via width prop). */
  width?: number | string;
  thickness?: number;
  color?: string;
  /** Which edge the line draws from. */
  origin?: 'left' | 'right' | 'center';
};

const Divider: React.FC<DividerProps> = ({
  delayFrames = 0,
  durationMs = duration.panel,
  width = '100%',
  thickness = 1,
  color = base.glassBorder,
  origin = 'left',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ease = Easing.bezier(...EASE_SMOOTH);
  const local = frame - delayFrames;
  const inF = frames(durationMs, fps);

  const t = interpolate(local, [0, inF], [0, 1], {
    easing: ease,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const clip =
    origin === 'left'
      ? `inset(0 ${(1 - t) * 100}% 0 0)`
      : origin === 'right'
        ? `inset(0 0 0 ${(1 - t) * 100}%)`
        : `inset(0 ${((1 - t) * 100) / 2}% 0 ${((1 - t) * 100) / 2}%)`;

  return (
    <div
      style={{
        width,
        height: thickness,
        background: color,
        clipPath: clip,
      }}
    />
  );
};

export default Divider;
