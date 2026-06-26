import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { pulse } from '../../tokens';
import { alpha } from '../constants';

export type CenterDiamondProps = {
  /** Edge length of the diamond square (rendered rotated 45°). */
  size?: number;
  accent?: string;
};

/**
 * The D-Pad's center crystal: a 45°-rotated square that slowly rotates, wrapped
 * in a ring that pulses opacity/scale on a ~3s sine loop. Pure frame-driven
 * motion (no CSS keyframes) so it renders deterministically.
 */
const CenterDiamond: React.FC<CenterDiamondProps> = ({
  size = 24,
  accent = pulse.accent,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  // 3s pulse loop: 0.3 → 0.8 → 0.3
  const phase = (Math.sin((t / 3) * Math.PI * 2) + 1) / 2; // 0..1
  const ringOpacity = 0.3 + phase * 0.5;
  const ringScale = 1 + phase * 0.5;
  const spin = (t * 18) % 360; // slow rotation, 18°/s

  const ring = size * 2.2;

  return (
    <div
      style={{
        position: 'relative',
        width: ring,
        height: ring,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* pulsing ring */}
      <div
        style={{
          position: 'absolute',
          width: ring,
          height: ring,
          borderRadius: '50%',
          border: `1px solid ${accent}`,
          opacity: ringOpacity,
          transform: `scale(${ringScale})`,
          boxShadow: `0 0 18px ${alpha(accent, 0.25 + phase * 0.35)}`,
        }}
      />
      {/* rotating crystal */}
      <div
        style={{
          width: size,
          height: size,
          background: accent,
          transform: `rotate(${45 + spin}deg)`,
          boxShadow: `0 0 16px ${alpha(accent, 0.6)}`,
          borderRadius: 3,
        }}
      />
    </div>
  );
};

export default CenterDiamond;
