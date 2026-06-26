import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { REGISTER, billboard, frames, motion } from '../../tokens';

export const register = REGISTER.CINEMATIC;

export type OnAirDotProps = {
  /** Override color (call-sign header uses `billboard.primary`). */
  color?: string;
  size?: number;
};

const OnAirDot: React.FC<OnAirDotProps> = ({
  color = billboard.onAirRed,
  size = 6,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cycle = frames(motion.onAirCycle, fps);

  const phase = (frame % cycle) / cycle;
  const ringSize = interpolate(phase, [0, 1], [0, size * 0.7]);
  const ringOpacity = interpolate(phase, [0, 1], [0.5, 0]);

  return (
    <span
      style={{
        display: 'inline-block',
        width: size,
        height: size,
        borderRadius: '50%',
        background: color,
        boxShadow: `0 0 0 ${ringSize}px ${hexWithAlpha(color, ringOpacity)}`,
      }}
    />
  );
};

function hexWithAlpha(color: string, alpha: number): string {
  if (color.startsWith('rgb')) return color.replace(/[\d.]+\)$/, `${alpha})`);
  const m = color.match(/^#([0-9a-f]{6})$/i);
  if (!m) return color;
  const r = parseInt(m[1].slice(0, 2), 16);
  const g = parseInt(m[1].slice(2, 4), 16);
  const b = parseInt(m[1].slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default OnAirDot;
