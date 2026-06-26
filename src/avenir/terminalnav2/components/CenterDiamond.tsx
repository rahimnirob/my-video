import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { pulse } from '../../tokens';
import { alpha } from '../constants';

/**
 * D-Pad center crystal: a slowly rotating 45° square inside a ring whose opacity
 * breathes 0.2→0.7→0.2 on a 2.5s sine loop. Frame-driven (deterministic).
 */
const CenterDiamond: React.FC<{ size?: number }> = ({ size = 28 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const phase = (Math.sin((frame / fps / 2.5) * Math.PI * 2) + 1) / 2;
  const ringOpacity = 0.2 + phase * 0.5;
  const spin = (frame / 300) * 360;
  const ring = Math.round(size * 1.3);

  return (
    <div style={{ position: 'relative', width: ring, height: ring, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div
        style={{
          position: 'absolute',
          width: ring,
          height: ring,
          borderRadius: '50%',
          border: `1px solid ${pulse.accentGlow}`,
          opacity: ringOpacity,
        }}
      />
      <div
        style={{
          width: size,
          height: size,
          background: alpha(pulse.accent, 0.15),
          border: `1px solid ${pulse.accent}`,
          transform: `rotate(${45 + spin}deg)`,
          boxShadow: `0 0 16px ${alpha(pulse.accent, 0.5)}`,
          borderRadius: 3,
        }}
      />
    </div>
  );
};

export default CenterDiamond;
