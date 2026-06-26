import React from 'react';
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import {
  EASE_SMOOTH,
  REGISTER,
  base,
  frames,
  motion,
  tracking,
  type,
  mono,
} from '../../tokens';

export const register = REGISTER.RAW;

export type StatRevealProps = {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  delayFrames?: number;
  /** Count-up duration (ms). */
  durationMs?: number;
  valueSize?: number;
  accent?: string;
};

const StatReveal: React.FC<StatRevealProps> = ({
  value,
  label,
  prefix = '',
  suffix = '',
  decimals = 0,
  delayFrames = 0,
  durationMs = motion.heroRevealMin,
  valueSize = 88,
  accent = base.textPrimary,
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
  const current = (value * t).toFixed(decimals);

  const labelWipe = interpolate(local, [inF * 0.35, inF * 0.9], [0, 1], {
    easing: ease,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 12 }}>
      <div
        style={{
          fontFamily: mono,
          fontSize: valueSize,
          fontWeight: 500,
          lineHeight: 1,
          color: accent,
          letterSpacing: '-0.02em',
          fontVariantNumeric: 'tabular-nums',
          clipPath: `inset(0 0 ${(1 - t) * 100}% 0)`,
        }}
      >
        {prefix}
        {current}
        {suffix}
      </div>
      <span
        style={{
          fontFamily: mono,
          fontSize: type.telemetryLabel.size,
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: tracking.microLabel,
          color: base.textSecondary,
          clipPath: `inset(0 ${(1 - labelWipe) * 100}% 0 0)`,
          display: 'inline-block',
        }}
      >
        {label}
      </span>
    </div>
  );
};

export default StatReveal;
